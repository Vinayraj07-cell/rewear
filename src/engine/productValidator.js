/**
 * REWEAR - Product Registry & Garment Spec Validator
 *
 * Implements rigorous automated validation for every product, size, and variant
 * in the ReWear product registry.
 *
 * Checks:
 * 1. Piece areas match pattern / spec
 * 2. No overlaps between placed cut pieces on cutting sheet
 * 3. Pieces inside sheet boundaries including seam allowances
 * 4. plain_base pieces use zero scraps (and zero pieced seams)
 * 5. Hybrid rules (plain body base + scrap accents, mirrored pairs)
 * 6. Translation keys exist in English, Hindi, and Telugu
 * 7. No "verified" text unless tailorVerified is true
 */

import { PRODUCT_TEMPLATES, normalizeGarmentSpec, getProductRequirements } from './templates.js';
import { packPiecesOnSheet } from './fitting.js';
import { translations } from '../i18n/translations.js';
import { CONFIG } from './config.js';

/**
 * Validates a single product specification.
 *
 * @param {Object} productSpec - Raw product template or normalized garment spec
 * @param {Object} [options] - Validation options
 * @returns {Object} { valid: boolean, productId: string, errors: string[], warnings: string[], checksPassed: string[] }
 */
export function validateProductSpec(productSpec, options = {}) {
  const errors = [];
  const warnings = [];
  const checksPassed = [];

  if (!productSpec || typeof productSpec !== 'object') {
    return {
      valid: false,
      productId: 'unknown',
      errors: ['Product spec must be a non-null object'],
      warnings: [],
      checksPassed: [],
    };
  }

  const spec = normalizeGarmentSpec(productSpec);
  const productId = spec.id || productSpec.id || 'unknown';

  if (!spec.id) {
    errors.push('Product spec is missing required "id" field');
  }
  if (!spec.name) {
    errors.push(`Product "${productId}" is missing required "name" field`);
  }
  if (!spec.sizes || Object.keys(spec.sizes).length === 0) {
    errors.push(`Product "${productId}" has no sizes defined`);
  }

  // -------------------------------------------------------------------------
  // Check 7: No "verified" text unless tailorVerified is true
  // -------------------------------------------------------------------------
  const isTailorVerified = Boolean(spec.tailorVerified || productSpec.tailorVerified || productSpec.verifiedByTailor);
  const verificationErrors = checkVerificationHonesty(productSpec, isTailorVerified);
  if (verificationErrors.length > 0) {
    errors.push(...verificationErrors);
  } else {
    checksPassed.push('verification honest');
  }

  // Collect all unique variants across the spec
  const allVariants = new Set();
  if (productSpec.variants) {
    Object.keys(productSpec.variants).forEach((v) => allVariants.add(v));
  }
  for (const s of Object.values(spec.sizes || {})) {
    if (s.variants) {
      Object.keys(s.variants).forEach((v) => allVariants.add(v));
    }
  }
  if (allVariants.size === 0) {
    allVariants.add(spec.defaultVariant || 'plain');
  }

  // Iterate over every size and variant in the spec
  const sizes = spec.sizes || {};
  let totalPiecesChecked = 0;
  let hasHybridVariant = false;
  const allPieceIds = new Set();

  for (const [sizeKey, sizeObj] of Object.entries(sizes)) {
    // Determine variants to test for this size
    const rawVariants = productSpec.sizes?.[sizeKey]?.variants || productSpec.variants || {};
    const variantKeys = Object.keys(rawVariants).length > 0
      ? Object.keys(rawVariants)
      : [spec.defaultVariant || 'plain'];

    for (const variantKey of variantKeys) {
      if (variantKey === 'hybrid') {
        hasHybridVariant = true;
      }

      let req;
      try {
        req = getProductRequirements(productSpec, sizeKey, CONFIG.SEAM_ALLOWANCE_CM, variantKey);
      } catch (err) {
        errors.push(`Size "${sizeKey}" (variant: ${variantKey}) threw error in getProductRequirements: ${err.message}`);
        continue;
      }

      if (!req || !req.zones || req.zones.length === 0) {
        errors.push(`Size "${sizeKey}" (variant: ${variantKey}) failed to return required pattern pieces`);
        continue;
      }

      const pieces = req.zones;
      totalPiecesChecked += pieces.length;

      for (const p of pieces) {
        if (p.id) allPieceIds.add(p.id);
        if (p.baseZoneId) allPieceIds.add(p.baseZoneId);
      }

      // -----------------------------------------------------------------------
      // Check 1: Piece areas match pattern/spec
      // -----------------------------------------------------------------------
      const areaErrors = checkPieceAreas(pieces, productId, sizeKey, variantKey);
      if (areaErrors.length > 0) {
        errors.push(...areaErrors);
      }

      // -----------------------------------------------------------------------
      // Check 2 & 3: Sheet Packing - No overlaps & pieces inside sheet
      // -----------------------------------------------------------------------
      const sheetErrors = checkSheetContainmentAndOverlaps(pieces, productId, sizeKey, variantKey);
      if (sheetErrors.length > 0) {
        errors.push(...sheetErrors);
      }

      // -----------------------------------------------------------------------
      // Check 4: plain_base pieces use zero scraps
      // -----------------------------------------------------------------------
      const plainBaseErrors = checkPlainBaseRules(pieces, productId, sizeKey, variantKey);
      if (plainBaseErrors.length > 0) {
        errors.push(...plainBaseErrors);
      }

      // -----------------------------------------------------------------------
      // Check 5: Hybrid rules
      // -----------------------------------------------------------------------
      if (variantKey === 'hybrid') {
        const hybridErrors = checkHybridRules(pieces, productId, sizeKey);
        if (hybridErrors.length > 0) {
          errors.push(...hybridErrors);
        }
      }
    }
  }

  // -------------------------------------------------------------------------
  // Check 6: Translation keys exist in English, Hindi, and Telugu
  // -------------------------------------------------------------------------
  const translationErrors = checkTranslations(productId, spec, allPieceIds);
  if (translationErrors.length > 0) {
    errors.push(...translationErrors);
  } else {
    checksPassed.push('translations en/hi/te');
  }

  if (errors.length === 0) {
    if (!checksPassed.includes('areas match')) checksPassed.unshift('areas match');
    if (!checksPassed.includes('no overlaps')) checksPassed.splice(1, 0, 'no overlaps');
    if (!checksPassed.includes('sheet bounded')) checksPassed.splice(2, 0, 'sheet bounded');
    if (hasHybridVariant && !checksPassed.includes('plain_base zero scraps')) {
      checksPassed.splice(3, 0, 'plain_base zero scraps');
    }
  }

  return {
    valid: errors.length === 0,
    productId,
    sizesCount: Object.keys(sizes).length,
    variantsCount: allVariants.size,
    totalPiecesChecked,
    errors,
    warnings,
    checksPassed,
  };
}

// ---------------------------------------------------------------------------
// 1. Piece Areas Check
// ---------------------------------------------------------------------------
function checkPieceAreas(pieces, productId, sizeKey, variantKey) {
  const errors = [];
  const seamAllowance = CONFIG.SEAM_ALLOWANCE_CM || 1.0;

  for (const piece of pieces) {
    const w = piece.finishedWidth !== undefined ? piece.finishedWidth : piece.width;
    const h = piece.finishedHeight !== undefined ? piece.finishedHeight : piece.height;

    if (!w || !h || w <= 0 || h <= 0) {
      errors.push(`[Piece Area Mismatch] Piece "${piece.id}" in ${productId} [${sizeKey}:${variantKey}] has non-positive finished dimensions (${w}×${h})`);
      continue;
    }

    // Curved geometry piece
    if (piece.geometry && (piece.geometry.shapeType === 'curved' || piece.geometry.paths || piece.geometry.seamPath)) {
      const geo = piece.geometry;
      if (!geo.finishedAreaCm2 || geo.finishedAreaCm2 <= 0) {
        errors.push(`[Piece Area Mismatch] Curved piece "${piece.id}" in ${productId} [${sizeKey}]: invalid finishedAreaCm2 (${geo.finishedAreaCm2})`);
      }
      if (geo.cutAreaCm2 && geo.cutAreaCm2 <= geo.finishedAreaCm2) {
        errors.push(`[Piece Area Mismatch] Curved piece "${piece.id}" in ${productId} [${sizeKey}]: cut area (${geo.cutAreaCm2}) must be strictly greater than finished area (${geo.finishedAreaCm2})`);
      }
      if (piece.cutWidth < w || piece.cutHeight < h) {
        errors.push(`[Piece Area Mismatch] Piece "${piece.id}" cut size (${piece.cutWidth}×${piece.cutHeight}) cannot be smaller than finished size (${w}×${h})`);
      }
    } else {
      // Rectangular piece
      const expectedCutW = w + 2 * seamAllowance;
      const expectedCutH = h + 2 * seamAllowance;
      const expectedFinishedArea = w * h;
      const expectedCutArea = expectedCutW * expectedCutH;

      if (piece.area !== undefined && Math.abs(piece.area - expectedFinishedArea) > 1.5) {
        errors.push(`[Piece Area Mismatch] Piece "${piece.id}" area mismatch: stated ${piece.area} vs expected ${expectedFinishedArea}`);
      }

      if (piece.finishedAreaCm2 !== undefined && Math.abs(piece.finishedAreaCm2 - expectedFinishedArea) > 1.5) {
        errors.push(`[Piece Area Mismatch] Piece "${piece.id}" finishedAreaCm2 mismatch: stated ${piece.finishedAreaCm2} vs expected ${expectedFinishedArea}`);
      }

      if (piece.geometry?.finishedAreaCm2 && Math.abs(piece.geometry.finishedAreaCm2 - expectedFinishedArea) > 1.5) {
        errors.push(`[Piece Area Mismatch] Piece "${piece.id}" geometry.finishedAreaCm2 mismatch: stated ${piece.geometry.finishedAreaCm2} vs expected ${expectedFinishedArea}`);
      }

      if (piece.cutAreaCm2 !== undefined && Math.abs(piece.cutAreaCm2 - expectedCutArea) > 2.5) {
        errors.push(`[Piece Area Mismatch] Piece "${piece.id}" cutAreaCm2 mismatch: stated ${piece.cutAreaCm2} vs expected ${expectedCutArea}`);
      }

      if (piece.cutWidth !== undefined) {
        if (piece.cutWidth < w) {
          errors.push(`[Piece Area Mismatch] Piece "${piece.id}" cutWidth (${piece.cutWidth}) cannot be smaller than finished width (${w})`);
        } else if (Math.abs(piece.cutWidth - expectedCutW) > 1.5) {
          errors.push(`[Piece Area Mismatch] Piece "${piece.id}" cutWidth mismatch: stated ${piece.cutWidth} vs expected ${expectedCutW}`);
        }
      }

      if (piece.cutHeight !== undefined) {
        if (piece.cutHeight < h) {
          errors.push(`[Piece Area Mismatch] Piece "${piece.id}" cutHeight (${piece.cutHeight}) cannot be smaller than finished height (${h})`);
        } else if (Math.abs(piece.cutHeight - expectedCutH) > 1.5) {
          errors.push(`[Piece Area Mismatch] Piece "${piece.id}" cutHeight mismatch: stated ${piece.cutHeight} vs expected ${expectedCutH}`);
        }
      }
    }
  }

  return errors;
}

// ---------------------------------------------------------------------------
// 2 & 3. Sheet Containment & Zero Overlaps Check
// ---------------------------------------------------------------------------
function checkSheetContainmentAndOverlaps(pieces, productId, sizeKey, variantKey) {
  const errors = [];
  const maxBoltWidth = CONFIG.MAX_SHEET_WIDTH_CM || 150;

  // Convert pieces to sheet cut pieces and check bolt boundary limits
  const cutPieces = pieces.map((p, idx) => {
    const cutW = p.cutWidth || (p.width + 2);
    const cutH = p.cutHeight || (p.height + 2);

    if (cutW > maxBoltWidth && cutH > maxBoltWidth) {
      errors.push(`[Sheet Boundary Overflow] Piece "${p.id || idx}" (${cutW}×${cutH} cm) overflows fabric sheet bolt width (${maxBoltWidth} cm)`);
    }

    return {
      id: p.id || `piece_${idx + 1}`,
      name: p.name || p.id,
      width: cutW,
      height: cutH,
      cutWidth: cutW,
      cutHeight: cutH,
      x: p.x,
      y: p.y,
      stretchy: false,
      grainLine: p.grainLine,
    };
  });

  const pack = packPiecesOnSheet(cutPieces, { clearanceCm: 0.5, marginCm: 1.0 });

  if (!pack || !pack.fits) {
    errors.push(`[Sheet Packing Failure] Pieces for ${productId} [${sizeKey}:${variantKey}] could not be packed into sheet`);
    return errors;
  }

  // Check 2: No overlaps between placed cut pieces
  if (pack.collisions && pack.collisions.length > 0) {
    for (const col of pack.collisions) {
      errors.push(`[Piece Overlap] Overlap detected between pieces "${col.pieceA}" and "${col.pieceB}"`);
    }
  }

  const placed = pack.placements || [];

  // Check 3: Pieces inside sheet including seam allowance
  for (const item of placed) {
    if (item.x < pack.marginCm - 0.001 || item.y < pack.marginCm - 0.001) {
      errors.push(`[Sheet Boundary Overflow] Piece "${item.id}" violates sheet margin at (${item.x}, ${item.y})`);
    }
    if (item.x + item.width > pack.sheetWidth - pack.marginCm + 0.01) {
      errors.push(`[Sheet Boundary Overflow] Piece "${item.id}" width overflows sheet boundary: ${item.x} + ${item.width} > ${pack.sheetWidth}`);
    }
    if (item.y + item.height > pack.sheetHeight - pack.marginCm + 0.01) {
      errors.push(`[Sheet Boundary Overflow] Piece "${item.id}" height overflows sheet boundary: ${item.y} + ${item.height} > ${pack.sheetHeight}`);
    }
  }

  // Verify pairwise clearance >= 0.5 cm
  for (let i = 0; i < placed.length; i++) {
    for (let j = i + 1; j < placed.length; j++) {
      const a = placed[i];
      const b = placed[j];

      const xGap = Math.max(0, Math.max(a.x - (b.x + b.width), b.x - (a.x + a.width)));
      const yGap = Math.max(0, Math.max(a.y - (b.y + b.height), b.y - (a.y + a.height)));

      if (xGap < 0.499 && yGap < 0.499) {
        errors.push(`[Piece Overlap] Pieces "${a.id}" and "${b.id}" violate 0.5 cm clearance on cutting sheet (xGap: ${xGap.toFixed(2)}, yGap: ${yGap.toFixed(2)})`);
      }
    }
  }

  return errors;
}

// ---------------------------------------------------------------------------
// 4. plain_base Pieces Check
// ---------------------------------------------------------------------------
function checkPlainBaseRules(pieces, productId, sizeKey, variantKey) {
  const errors = [];

  for (const piece of pieces) {
    const isPlainBase = piece.fabricSource === 'plain_base';
    if (isPlainBase) {
      // plain_base pieces must NOT be scrapEligible
      if (piece.scrapEligible === true) {
        errors.push(`[Plain Base Scrap Violation] Piece "${piece.id}" in ${productId} [${sizeKey}:${variantKey}] has fabricSource='plain_base' but scrapEligible=true`);
      }
      if (piece.role !== 'base' && piece.fabricSource === 'plain_base') {
        errors.push(`[Plain Base Scrap Violation] Piece "${piece.id}" in ${productId} [${sizeKey}:${variantKey}] has fabricSource='plain_base' but non-base role "${piece.role}"`);
      }
    }
  }

  return errors;
}

// ---------------------------------------------------------------------------
// 5. Hybrid Rules Check
// ---------------------------------------------------------------------------
function checkHybridRules(pieces, productId, sizeKey) {
  const errors = [];

  const plainBasePieces = pieces.filter((p) => p.fabricSource === 'plain_base');
  const scrapPieces = pieces.filter((p) => p.fabricSource !== 'plain_base' && p.scrapEligible !== false);

  if (plainBasePieces.length === 0) {
    errors.push(`[Hybrid Rule Violation] Hybrid variant for ${productId} [${sizeKey}] must contain at least one plain_base piece`);
  }
  if (scrapPieces.length === 0) {
    errors.push(`[Hybrid Rule Violation] Hybrid variant for ${productId} [${sizeKey}] must contain at least one scrap patchwork piece`);
  }

  // Mirrored pairs symmetry check (e.g. left and right sleeves)
  const mirroredPairs = pieces.filter((p) => p.id?.includes('sleeve') || p.name?.toLowerCase().includes('sleeve'));
  if (mirroredPairs.length >= 2) {
    const p1 = mirroredPairs[0];
    const p2 = mirroredPairs[1];
    if (p1.cutWidth !== p2.cutWidth || p1.cutHeight !== p2.cutHeight) {
      errors.push(`[Hybrid Rule Violation] Mirrored pair "${p1.id}" and "${p2.id}" have mismatched dimensions: ${p1.cutWidth}×${p1.cutHeight} vs ${p2.cutWidth}×${p2.cutHeight}`);
    }
  }

  return errors;
}

// ---------------------------------------------------------------------------
// 6. Translations Check
// ---------------------------------------------------------------------------
function checkTranslations(productId, spec, pieceIds = new Set()) {
  const errors = [];
  const requiredLanguages = ['en', 'hi', 'te'];

  for (const lang of requiredLanguages) {
    const t = translations[lang];
    if (!t) {
      errors.push(`[Missing Translation] Language "${lang}" is not defined in translations dictionary`);
      continue;
    }

    // 1. Product name
    const hasName = Boolean(t.productNames?.[productId]);
    if (!hasName) {
      errors.push(`[Missing Translation] Product "${productId}" is missing from translations.${lang}.productNames`);
    }

    // 2. Sizes
    if (spec.sizes) {
      for (const sizeKey of Object.keys(spec.sizes)) {
        const hasSizeName = Boolean(t.sizeNames?.[sizeKey]);
        if (!hasSizeName) {
          errors.push(`[Missing Translation] Size "${sizeKey}" of product "${productId}" is missing from translations.${lang}.sizeNames`);
        }
      }
    }

    // 3. Piece / Zone names
    for (const pieceId of pieceIds) {
      const baseId = pieceId.replace(/_\d+$/, '');
      const hasZoneName = Boolean(t.zoneNames?.[pieceId] || t.zoneNames?.[baseId]);
      if (!hasZoneName) {
        errors.push(`[Missing Translation] Piece "${pieceId}" of product "${productId}" is missing from translations.${lang}.zoneNames`);
      }
    }
  }

  return errors;
}

// ---------------------------------------------------------------------------
// 7. Verification Honesty Check
// ---------------------------------------------------------------------------
function checkVerificationHonesty(productSpec, isTailorVerified) {
  const errors = [];
  if (isTailorVerified) return errors;

  // Unverified claim detection
  const forbiddenPatterns = [
    /\btailor[- ]approved\b/i,
    /\btailor[- ]verified\b/i,
    /\bverified by a tailor\b/i,
    /\bverified pattern\b/i,
    /\bapproved construction\b/i,
  ];

  // Whitelisted exemption phrases
  const allowedNegations = [
    'not yet tailor-verified',
    'not yet tailor verified',
    'to be verified by a tailor',
    'must be verified by a professional tailor',
    'must be verified by a tailor',
    'verified: false',
    'verifiedbytailor: false',
    'tailorverified: false',
  ];

  function inspectString(str, location) {
    if (!str || typeof str !== 'string') return;
    const lower = str.toLowerCase();

    for (const pattern of forbiddenPatterns) {
      if (pattern.test(lower)) {
        // Check if safely negated
        const isExempt = allowedNegations.some((neg) => lower.includes(neg));
        if (!isExempt) {
          errors.push(`[Unverified Claim] Product "${productSpec.id}" contains unverified claim in ${location}: "${str}"`);
        }
      }
    }
  }

  inspectString(productSpec.name, 'name');
  inspectString(productSpec.description, 'description');
  inspectString(productSpec.disclaimer, 'disclaimer');

  if (productSpec.variants) {
    for (const [vKey, vObj] of Object.entries(productSpec.variants)) {
      inspectString(vObj.name, `variants.${vKey}.name`);
      inspectString(vObj.description, `variants.${vKey}.description`);
      inspectString(vObj.warning, `variants.${vKey}.warning`);
    }
  }

  return errors;
}

/**
 * Validates the full registry of products.
 *
 * @param {Object} [registry] - Defaults to PRODUCT_TEMPLATES
 * @returns {Object} Registry validation report with summary line per product
 */
export function validateRegistry(registry = PRODUCT_TEMPLATES) {
  const results = {};
  const oneLineSummaries = [];
  let totalErrors = 0;

  for (const [productId, productSpec] of Object.entries(registry)) {
    const res = validateProductSpec(productSpec);
    results[productId] = res;

    if (!res.valid) {
      totalErrors += res.errors.length;
      oneLineSummaries.push(`✗ ${productId}: FAILED (${res.errors.join('; ')})`);
    } else {
      const sizesText = `${res.sizesCount} size${res.sizesCount === 1 ? '' : 's'}`;
      const variantsText = `${res.variantsCount} variant${res.variantsCount === 1 ? '' : 's'}`;
      const checksText = res.checksPassed.join(', ');
      oneLineSummaries.push(`✓ ${productId}: ${sizesText}, ${variantsText}, all checks passed (${checksText})`);
    }
  }

  return {
    valid: totalErrors === 0,
    totalErrors,
    results,
    oneLineSummaries,
  };
}
