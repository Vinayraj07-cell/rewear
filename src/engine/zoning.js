/**
 * REWEAR STAGE 2 — 60-30-10 ZONING ENGINE
 * 
 * Plain-words explanation:
 * In professional interior and fashion design, the "60-30-10" rule prevents a patchwork
 * product from looking like a messy bag of trash:
 * - 60% BASE (Main Anchor): The dominant visual ground. Must be calm, neutral, or dark
 *   (black, navy, beige, denim, olive, grey) with larger pieces so the eye has a resting place.
 * - 30% SUPPORTING: Secondary colour, usually tonal/analogous to the base or a soft neutral,
 *   used for facings, side borders, or lining.
 * - 10% ACCENT: Small, high-energy pops, complementary colors, or eye-catching printed scraps,
 *   used exclusively in accent zones (pockets, tabs, straps, decorative center patches).
 * 
 * This rule is a GUIDELINE with generous tolerance (e.g. base can be 50% to 72%).
 * 
 * When a pile lacks a good base (e.g. only loud neon prints or tiny scraps), the engine does
 * NOT fail blindly: it provides clear tailor advice and concrete suggestions
 * (e.g. "Add 0.5m plain navy cotton", "Make a smaller Zip Pouch", etc.).
 * 
 * Assumptions:
 * - Pieces can be grouped and multiple scraps can together fulfill a single zone.
 * - Printed pieces are priority candidates for Accent (10%), avoiding large overwhelming fields.
 */

import { CONFIG } from './config.js';
import { getColorMetrics, evaluateColorPair } from './color.js';
import { isPieceStretchy, getThicknessLevel } from './fabricCompatibility.js';

/**
 * Calculates raw or usable area of a scrap piece (taking usable inner rectangle into account if irregular,
 * and subtracting 2x safety margin if scraps are frayed/uneven).
 */
export function getPieceArea(piece, scrapSafetyMarginCm = 0) {
  const margin = Number(scrapSafetyMarginCm || 0);
  const rawW = piece.isIrregular && piece.usableWidth ? piece.usableWidth : piece.width;
  const rawH = piece.isIrregular && piece.usableHeight ? piece.usableHeight : piece.height;
  const usableW = margin > 0 ? Math.max(0, rawW - 2 * margin) : rawW;
  const usableH = margin > 0 ? Math.max(0, rawH - 2 * margin) : rawH;
  const qty = Number(piece.quantity) || 1;
  return usableW * usableH * qty;
}

/**
 * Normalizes pieces into a uniform format and extracts colour metrics.
 */
export function enrichPiece(piece, scrapSafetyMarginCm = 0) {
  const margin = Number(scrapSafetyMarginCm || 0);
  const rawW = piece.isIrregular && piece.usableWidth ? piece.usableWidth : piece.width;
  const rawH = piece.isIrregular && piece.usableHeight ? piece.usableHeight : piece.height;
  const qty = Number(piece.quantity) || 1;
  const rawArea = rawW * rawH * qty;

  const usableW = margin > 0 ? Math.max(0, rawW - 2 * margin) : rawW;
  const usableH = margin > 0 ? Math.max(0, rawH - 2 * margin) : rawH;
  const usableArea = usableW * usableH * qty;

  const colorKey = Array.isArray(piece.colors) && piece.colors.length > 0
    ? piece.colors[0]
    : piece.color || 'grey';

  const metrics = getColorMetrics(colorKey);
  const isPrint = piece.print === 'printed' || piece.print === 'patterned';
  const stretchy = isPieceStretchy(piece);
  const thicknessLevel = getThicknessLevel(piece);

  return {
    ...piece,
    rawWidth: rawW,
    rawHeight: rawH,
    rawArea: rawW * rawH,
    effectiveWidth: usableW,
    effectiveHeight: usableH,
    totalArea: usableArea,
    usableArea: usableW * usableH,
    frayedLossArea: (rawW * rawH) - (usableW * usableH),
    dominantColor: colorKey,
    colorMetrics: metrics,
    isNeutral: metrics.isNeutral,
    isPrinted: isPrint,
    stretchy,
    thicknessLevel,
  };
}

/**
 * Evaluates whether a scrap or group of scraps can serve as the 60% Base Anchor.
 */
export function scoreBaseCandidate(piece, targetBaseArea) {
  let score = 0;

  // 1. Colour calm / neutrality (critical for 60% base)
  if (piece.isNeutral) {
    score += 40; // Neutrals (black, navy, beige, grey, white) are prime base anchors
  } else if (piece.colorMetrics.L <= CONFIG.DARK_NEUTRAL_LIGHTNESS_MAX) {
    score += 35; // Deep dark shades anchor well
  } else if (piece.colorMetrics.C < 25) {
    score += 25; // Low-chroma muted tones work as secondary base
  } else {
    score += 5; // Bright saturated colours make risky large base areas
  }

  // 2. Plain vs Printed (Plain is much better for 60% body)
  if (!piece.isPrinted) {
    score += 25;
  } else {
    score -= 15; // Prints in 60% base risk overwhelming the product
  }

  // 3. Piece size / area contribution
  const pieceArea = piece.totalArea;
  const areaRatio = targetBaseArea > 0 ? pieceArea / targetBaseArea : 0;
  if (areaRatio >= 0.4) score += 20;
  else if (areaRatio >= 0.2) score += 10;

  // 4. Structural fabric weight (medium or thick preferred for bags/cushions)
  if (piece.thicknessLevel >= 2) {
    score += 15;
  }

  // 5. Non-stretchy is preferred for structured base panels
  if (!piece.stretchy) {
    score += 10;
  }

  return score;
}

/**
 * Segregates a fabric pile into 60-30-10 role pools (Base, Supporting, Accent)
 * for a specific product requirement.
 */
export function assignZoningRoles(pile, productRequirements, options = {}) {
  const margin = Number(
    (options && typeof options === 'object' && options.scrapSafetyMarginCm !== undefined)
      ? options.scrapSafetyMarginCm
      : (typeof options === 'number' ? options : (CONFIG.SCRAP_SAFETY_MARGIN_CM || 0))
  );
  const enrichedPile = pile.map((p) => enrichPiece(p, margin));
  const totalPileArea = enrichedPile.reduce((sum, p) => sum + p.totalArea, 0);
  const targetTotalArea = productRequirements ? productRequirements.totalAreaNeeded : totalPileArea;
  const targetBaseArea = targetTotalArea * (CONFIG.ZONE_BASE_TARGET_PCT / 100);

  // Check fallbacks first
  const fallbackCheck = checkBaseFeasibilityFallbacks(enrichedPile, targetTotalArea, targetBaseArea, productRequirements);
  if (!fallbackCheck.hasGoodBase) {
    return {
      hasGoodBase: false,
      fallbackReason: fallbackCheck.reason,
      suggestions: fallbackCheck.suggestions,
      basePieces: [],
      supportingPieces: [],
      accentPieces: [],
      breakdown: { basePct: 0, supportingPct: 0, accentPct: 0 },
    };
  }

  // Rank candidate pieces for Base role
  const scoredPieces = enrichedPile.map((p) => ({
    piece: p,
    baseScore: scoreBaseCandidate(p, targetBaseArea),
  }));

  scoredPieces.sort((a, b) => b.baseScore - a.baseScore);

  const basePieces = [];
  const supportingPieces = [];
  const accentPieces = [];

  let currentBaseArea = 0;
  const maxBaseArea = targetTotalArea * (CONFIG.ZONE_BASE_MAX_PCT / 100);

  // 1. Fill Base pool (aiming for roughly 50-70%)
  const unassigned = [];

  scoredPieces.forEach(({ piece }) => {
    // Printed pieces with high chroma are forced into accent / supporting candidates
    if (piece.isPrinted && piece.colorMetrics.C > CONFIG.CLASH_MIN_CHROMA) {
      accentPieces.push(piece);
      return;
    }

    if (currentBaseArea < targetBaseArea || (currentBaseArea < maxBaseArea && basePieces.length < 2)) {
      basePieces.push(piece);
      currentBaseArea += piece.totalArea;
    } else {
      unassigned.push(piece);
    }
  });

  // Reference base colour for harmony checks
  const baseColor = basePieces.length > 0 ? basePieces[0].dominantColor : 'grey';

  // 2. Distribute remaining pieces into Supporting (tonal/neutral) and Accent (pop/print)
  unassigned.forEach((piece) => {
    if (piece.isPrinted) {
      accentPieces.push(piece);
      return;
    }

    const rel = evaluateColorPair(baseColor, piece.dominantColor);
    if (rel.relationship === 'tonal' || rel.relationship === 'neutral-compatible') {
      supportingPieces.push(piece);
    } else if (rel.relationship === 'complementary' || piece.colorMetrics.C > 35) {
      accentPieces.push(piece);
    } else {
      // Moderate contrast
      if (supportingPieces.length <= accentPieces.length) {
        supportingPieces.push(piece);
      } else {
        accentPieces.push(piece);
      }
    }
  });

  // Calculate actual percentage breakdown in available pool
  const assignedTotal =
    basePieces.reduce((s, p) => s + p.totalArea, 0) +
    supportingPieces.reduce((s, p) => s + p.totalArea, 0) +
    accentPieces.reduce((s, p) => s + p.totalArea, 0);

  const baseArea = basePieces.reduce((s, p) => s + p.totalArea, 0);
  const suppArea = supportingPieces.reduce((s, p) => s + p.totalArea, 0);
  const accArea = accentPieces.reduce((s, p) => s + p.totalArea, 0);

  const breakdown = {
    basePct: assignedTotal > 0 ? Math.round((baseArea / assignedTotal) * 100) : 0,
    supportingPct: assignedTotal > 0 ? Math.round((suppArea / assignedTotal) * 100) : 0,
    accentPct: assignedTotal > 0 ? Math.round((accArea / assignedTotal) * 100) : 0,
  };

  return {
    hasGoodBase: true,
    fallbackReason: null,
    suggestions: [],
    warning: fallbackCheck.warning || null,
    warnings: fallbackCheck.warnings || (fallbackCheck.warning ? [fallbackCheck.warning] : []),
    hasAnchorWarning: Boolean(fallbackCheck.hasAnchorWarning),
    basePieces,
    supportingPieces,
    accentPieces,
    breakdown,
    anchorColor: baseColor,
  };
}

/**
 * Detects structural or colour deficiencies in the pile that prevent a clean 60% base.
 */
export function checkBaseFeasibilityFallbacks(enrichedPile, targetTotalArea, targetBaseArea, productRequirements) {
  const totalArea = enrichedPile.reduce((sum, p) => sum + p.totalArea, 0);

  // Defect 1: Insufficient total fabric
  if (totalArea < targetTotalArea * 0.75) {
    return {
      hasGoodBase: false,
      reason: `Insufficient total fabric: Your pile has ${Math.round(totalArea)} cm², but this product requires approximately ${Math.round(targetTotalArea)} cm².`,
      suggestions: [
        'Add more fabric scrap pieces from your stock.',
        'Choose a smaller product size (e.g. switch from Tote Bag to Zip Pouch).',
        'Add a plain base fabric (e.g. 0.5 meter of plain cotton) to form the main body.',
      ],
    };
  }

  const hardFloor = CONFIG.MIN_PIECE_HARD_FLOOR_CM || 5.0;
  const largestPiece = enrichedPile.reduce((max, p) => Math.max(max, Math.max(p.effectiveWidth, p.effectiveHeight)), 0);

  // Hard Floor Check: Scraps smaller than hard floor (e.g. 5 cm) cannot be stitched without needle/feed jamming
  if (largestPiece < hardFloor) {
    return {
      hasGoodBase: false,
      hardFloor,
      reason: `Pieces below minimum usable size: Your largest scrap is only ${largestPiece} cm, which is below the ${hardFloor} cm minimum hard floor. Pieces smaller than this cannot be reliably stitched without excessive seam fraying and needle jamming.`,
      suggestions: [
        `Use scraps that are at least ${hardFloor} cm in width and height.`,
        'Make a smaller craft item suited for micro-scraps (such as fabric twine, scrap beads, or pincushion stuffing).',
        'Add larger scrap pieces to your pile.',
      ],
    };
  }

  // Anchor Size Evaluation (40% of largest zone):
  // Does NOT reject the pile! Turns into a warning and design-score penalty so tailor can proceed if desired.
  let minAnchorDim = 12;
  if (productRequirements && typeof productRequirements.minAnchorDim === 'number') {
    minAnchorDim = productRequirements.minAnchorDim;
  } else if (productRequirements && productRequirements.largestZone) {
    const maxDim = Math.max(productRequirements.largestZone.width, productRequirements.largestZone.height);
    minAnchorDim = Math.max(
      CONFIG.MIN_RECOMMENDED_PATCH_DIMENSION_CM,
      Math.round(maxDim * (CONFIG.MIN_ANCHOR_ZONE_RATIO || 0.40))
    );
  } else if (typeof targetTotalArea === 'number') {
    minAnchorDim = targetTotalArea > 3000 ? 15 : 8;
  }

  let warning = null;
  let hasAnchorWarning = false;
  if (largestPiece < minAnchorDim) {
    warning = 'Made from many small patches, a bigger piece would look more premium.';
    hasAnchorWarning = true;
  }

  // Defect 3: No calm/neutral anchor (100% loud saturated prints)
  const hasNeutralOrDark = enrichedPile.some(
    (p) => p.isNeutral || p.colorMetrics.L <= CONFIG.DARK_NEUTRAL_LIGHTNESS_MAX || (!p.isPrinted && p.colorMetrics.C < 25)
  );

  if (!hasNeutralOrDark && enrichedPile.length >= 3) {
    return {
      hasGoodBase: false,
      reason: 'No grounding base colour: All pieces in your pile are loud, bright prints or highly saturated colours without a calm neutral anchor (like black, navy, grey, or beige).',
      suggestions: [
        'Add a plain neutral fabric (e.g. plain beige, denim, black, or navy cotton) to act as the 60% main body.',
        'Pick another colour palette by separating warm (reds/yellows) and cool (blues/greens) scraps into distinct projects.',
        'Make a smaller accessory where bright multi-colour prints look intentional.',
      ],
    };
  }

  return {
    hasGoodBase: true,
    reason: null,
    suggestions: [],
    warning,
    warnings: warning ? [warning] : [],
    hasAnchorWarning,
  };
}
