/**
 * REWEAR STAGE 2 — 2D PIECE FITTING & FEASIBILITY ENGINE
 * 
 * Plain-words explanation:
 * This module tests whether the tailor's pile of scraps can physically make a specific
 * product template (e.g. Medium Tote Bag or Kids' Frock).
 * 
 * Key capabilities:
 * 1. Single piece placement: Checks if a piece fits a rectangular zone directly,
 *    allowing 90-degree rotation when grainline/print allows.
 * 2. Multi-piece joining: When no single scrap is large enough to cover a zone (like a 36x38 cm
 *    bag body), the engine joins two or more compatible pieces along width or height,
 *    adding the required 1 cm seam allowance (2 cm seam loss per joint).
 * 3. Enforces fabric and print compatibility during joins:
 *    - Never joins stretchy with non-stretchy.
 *    - Never joins thick with thin.
 *    - Never places two printed pieces side-by-side.
 * 4. Scrap Offcut Tracking:
 *    - Any trimmed scrap offcut with both dimensions >= 3.0 cm is saved and returned
 *      to the tailor's pile as reusable fabric.
 *    - Slivers smaller than 3 cm are counted as trim waste.
 * 5. Diagnostic reporting:
 *    - When a product does not fit, it returns an exact plain-words explanation of what
 *      is missing (e.g. "Short by 450 cm² of neutral medium-weight cotton for the Front Body").
 * 
 * Assumptions:
 * - Woven fabrics can rotate 90 degrees freely. Stretchy knits cannot rotate across grain
 *   unless explicitly non-directional.
 * - Standard seam allowance defaults to 1.0 cm.
 */

import { CONFIG } from './config.js';
import { checkFabricPairCompatibility, isPieceStretchy } from './fabricCompatibility.js';
import { checkPrintAdjacency, evaluateColorPair } from './color.js';
import { assignZoningRoles } from './zoning.js';
import { getProductRequirements } from './templates.js';

/**
 * Checks if a scrap piece can cover a target rectangle directly, with or without 90° rotation.
 */
export function canFitSinglePiece(piece, targetW, targetH, allowRotation = true) {
  const w = piece.effectiveWidth || piece.width;
  const h = piece.effectiveHeight || piece.height;

  // Direct orientation
  if (w >= targetW && h >= targetH) {
    return { fits: true, rotated: false, marginW: w - targetW, marginH: h - targetH };
  }

  // 90° rotated orientation
  const isStretchy = isPieceStretchy(piece);
  const canRotate = allowRotation && !isStretchy; // Knits should generally follow grain
  if (canRotate && h >= targetW && w >= targetH) {
    return { fits: true, rotated: true, marginW: h - targetW, marginH: w - targetH };
  }

  return { fits: false, rotated: false };
}

/**
 * Calculates reusable offcuts (>= 3 cm) and trim waste when cutting a target rectangle from a scrap.
 */
export function cutScrap(piece, targetW, targetH, rotated = false) {
  const rawW = rotated ? (piece.effectiveHeight || piece.height) : (piece.effectiveWidth || piece.width);
  const rawH = rotated ? (piece.effectiveWidth || piece.width) : (piece.effectiveHeight || piece.height);

  const usedArea = targetW * targetH;
  const totalScrapArea = rawW * rawH;
  const leftoverArea = Math.max(0, totalScrapArea - usedArea);

  const offcuts = [];
  const minDim = CONFIG.MIN_REUSABLE_SCRAP_DIMENSION_CM;

  // L-shaped remnant decomposed into two clean rectangular offcuts:
  // Offcut 1: Full-height strip on the side
  const offcut1_W = rawW - targetW;
  const offcut1_H = rawH;
  if (offcut1_W >= minDim && offcut1_H >= minDim) {
    offcuts.push({
      id: `${piece.id}_offcut_side`,
      originalPieceId: piece.id,
      width: Number(offcut1_W.toFixed(1)),
      height: Number(offcut1_H.toFixed(1)),
      quantity: 1,
      fabricType: piece.fabricType,
      color: piece.dominantColor || piece.color,
      print: piece.print,
      thickness: piece.thickness,
      stretchy: isPieceStretchy(piece),
      isReusableLeftover: true,
      area: offcut1_W * offcut1_H,
    });
  }

  // Offcut 2: Strip along the bottom under the cut
  const offcut2_W = targetW;
  const offcut2_H = rawH - targetH;
  if (offcut2_W >= minDim && offcut2_H >= minDim) {
    offcuts.push({
      id: `${piece.id}_offcut_bottom`,
      originalPieceId: piece.id,
      width: Number(offcut2_W.toFixed(1)),
      height: Number(offcut2_H.toFixed(1)),
      quantity: 1,
      fabricType: piece.fabricType,
      color: piece.dominantColor || piece.color,
      print: piece.print,
      thickness: piece.thickness,
      stretchy: isPieceStretchy(piece),
      isReusableLeftover: true,
      area: offcut2_W * offcut2_H,
    });
  }

  const reusableArea = offcuts.reduce((s, o) => s + o.area, 0);
  const trimWasteArea = Math.max(0, leftoverArea - reusableArea);

  return {
    usedArea,
    reusableOffcuts: offcuts,
    trimWasteArea,
    totalScrapArea,
  };
}

/**
 * Attempts to join two scrap pieces along width or height to fulfill a target zone.
 */
export function tryJoinTwoPieces(pieceA, pieceB, targetW, targetH, seamAllowanceCm = CONFIG.SEAM_ALLOWANCE_CM) {
  // 1. Fabric physical compatibility check
  const fabricCheck = checkFabricPairCompatibility(pieceA, pieceB);
  if (!fabricCheck.compatible) {
    return { fits: false, reason: fabricCheck.reason };
  }

  // 2. Print adjacency check (two prints cannot touch)
  const printCheck = checkPrintAdjacency(pieceA, pieceB);
  if (!printCheck.allowed) {
    return { fits: false, reason: printCheck.reason };
  }

  // 3. Colour clash check (two clashing saturated colours cannot be joined side-by-side)
  const colorA = pieceA.dominantColor || pieceA.color || (Array.isArray(pieceA.colors) ? pieceA.colors[0] : null);
  const colorB = pieceB.dominantColor || pieceB.color || (Array.isArray(pieceB.colors) ? pieceB.colors[0] : null);
  if (colorA && colorB) {
    const colorEval = evaluateColorPair(colorA, colorB);
    if (colorEval.clashRisk) {
      return {
        fits: false,
        reason: `Cannot join clashing colours side-by-side: ${colorEval.reason}`,
      };
    }
  }

  const seamLoss = 2 * seamAllowanceCm; // 1 cm on each piece
  const wA = pieceA.effectiveWidth || pieceA.width;
  const hA = pieceA.effectiveHeight || pieceA.height;
  const wB = pieceB.effectiveWidth || pieceB.width;
  const hB = pieceB.effectiveHeight || pieceB.height;

  // Option 1: Join horizontally (vertical seam) -> combined width = wA + wB - seamLoss
  const combinedW_horiz = wA + wB - seamLoss;
  const combinedH_horiz = Math.min(hA, hB);
  if (combinedW_horiz >= targetW && combinedH_horiz >= targetH) {
    return {
      fits: true,
      direction: 'horizontal',
      seamType: 'vertical_seam',
      combinedW: combinedW_horiz,
      combinedH: combinedH_horiz,
      seamsCount: 1,
      piecesUsed: [pieceA, pieceB],
    };
  }

  // Option 2: Join vertically (horizontal seam) -> combined height = hA + hB - seamLoss
  const combinedW_vert = Math.min(wA, wB);
  const combinedH_vert = hA + hB - seamLoss;
  if (combinedW_vert >= targetW && combinedH_vert >= targetH) {
    return {
      fits: true,
      direction: 'vertical',
      seamType: 'horizontal_seam',
      combinedW: combinedW_vert,
      combinedH: combinedH_vert,
      seamsCount: 1,
      piecesUsed: [pieceA, pieceB],
      note: 'This panel is pieced from 2 patches (1 seam).',
    };
  }

  return { fits: false, reason: 'Combined dimensions do not cover the target zone.' };
}

/**
 * Attempts to piece multiple scraps into rows, columns, or a 2D patchwork grid
 * to fulfill a target rectangular zone.
 * Enforces fabric compatibility, no print adjacency, no clashing colors,
 * and respects CONFIG.MAX_SEAMS_PER_ZONE and CONFIG.MAX_PATCHES_PER_ZONE.
 */
export function tryMultiPiecePatchwork(
  candidates,
  targetW,
  targetH,
  seamAllowanceCm = CONFIG.SEAM_ALLOWANCE_CM,
  maxSeams = CONFIG.MAX_SEAMS_PER_ZONE || 6
) {
  if (!candidates || candidates.length < 2) {
    return { fits: false, reason: 'Not enough candidate pieces to piece together.' };
  }

  const allowance = Number(seamAllowanceCm) || CONFIG.SEAM_ALLOWANCE_CM;
  const seamLossPerJoin = 2 * allowance;
  const maxPatches = CONFIG.getMaxPatchesForZone
    ? CONFIG.getMaxPatchesForZone(targetW, targetH)
    : (CONFIG.MAX_PATCHES_PER_ZONE_CAP || 24);
  const effectiveMaxSeams = Math.min(CONFIG.MAX_SEAMS_PER_ZONE_CAP || 24, Math.max(maxSeams, maxPatches - 1));

  function canJoin(pA, pB) {
    const fabricCheck = checkFabricPairCompatibility(pA, pB);
    if (!fabricCheck.compatible) return { allowed: false, reason: fabricCheck.reason };

    const printCheck = checkPrintAdjacency(pA, pB);
    if (!printCheck.allowed) return { allowed: false, reason: printCheck.reason };

    const colorA = pA.dominantColor || pA.color || (Array.isArray(pA.colors) ? pA.colors[0] : null);
    const colorB = pB.dominantColor || pB.color || (Array.isArray(pB.colors) ? pB.colors[0] : null);
    if (colorA && colorB) {
      const colorEval = evaluateColorPair(colorA, colorB);
      if (colorEval.clashRisk) {
        return { allowed: false, reason: `Cannot join clashing colours side-by-side: ${colorEval.reason}` };
      }
    }

    return { allowed: true };
  }

  // 1. Fast path: check 2-piece joins first
  for (let i = 0; i < candidates.length; i++) {
    for (let j = i + 1; j < candidates.length; j++) {
      const join2 = tryJoinTwoPieces(candidates[i], candidates[j], targetW, targetH, allowance);
      if (join2.fits) {
        return {
          fits: true,
          layout: join2.direction,
          seamType: join2.seamType,
          patchCount: 2,
          seamsCount: 1,
          combinedW: join2.combinedW,
          combinedH: join2.combinedH,
          piecesUsed: join2.piecesUsed,
          note: 'This panel is pieced from 2 patches (1 seam).',
        };
      }
    }
  }

  // 2. Strategy A: Horizontal strip (1 row of K patches, vertical seams)
  const heightEligible = candidates.filter((p) => (p.effectiveHeight || p.height) >= targetH);
  if (heightEligible.length >= 2) {
    for (let k = 2; k <= Math.min(maxPatches, effectiveMaxSeams + 1, heightEligible.length); k++) {
      const picked = [];
      let currentW = 0;

      for (const piece of heightEligible) {
        if (picked.length === 0) {
          picked.push(piece);
          currentW = piece.effectiveWidth || piece.width;
        } else if (picked.length < k) {
          const prev = picked[picked.length - 1];
          if (canJoin(prev, piece).allowed) {
            picked.push(piece);
            currentW += (piece.effectiveWidth || piece.width) - seamLossPerJoin;
            if (picked.length === k && currentW >= targetW) {
              const seamsCount = k - 1;
              return {
                fits: true,
                layout: 'horizontal_strip',
                seamType: `${k}_piece_vertical_seams`,
                patchCount: k,
                seamsCount,
                combinedW: currentW,
                combinedH: Math.min(...picked.map((p) => p.effectiveHeight || p.height)),
                piecesUsed: picked,
                note: `This panel is pieced from ${k} patches (${seamsCount} seam${seamsCount === 1 ? '' : 's'}).`,
              };
            }
          }
        }
      }
    }
  }

  // 3. Strategy B: Vertical column (M rows of 1 patch, horizontal seams)
  const widthEligible = candidates.filter((p) => (p.effectiveWidth || p.width) >= targetW);
  if (widthEligible.length >= 2) {
    for (let m = 2; m <= Math.min(maxPatches, effectiveMaxSeams + 1, widthEligible.length); m++) {
      const picked = [];
      let currentH = 0;

      for (const piece of widthEligible) {
        if (picked.length === 0) {
          picked.push(piece);
          currentH = piece.effectiveHeight || piece.height;
        } else if (picked.length < m) {
          const prev = picked[picked.length - 1];
          if (canJoin(prev, piece).allowed) {
            picked.push(piece);
            currentH += (piece.effectiveHeight || piece.height) - seamLossPerJoin;
            if (picked.length === m && currentH >= targetH) {
              const seamsCount = m - 1;
              return {
                fits: true,
                layout: 'vertical_column',
                seamType: `${m}_piece_horizontal_seams`,
                patchCount: m,
                seamsCount,
                combinedW: Math.min(...picked.map((p) => p.effectiveWidth || p.width)),
                combinedH: currentH,
                piecesUsed: picked,
                note: `This panel is pieced from ${m} patches (${seamsCount} seam${seamsCount === 1 ? '' : 's'}).`,
              };
            }
          }
        }
      }
    }
  }

  // 4. Strategy C: 2D Grid patchwork (R rows x C columns)
  for (let R = 2; R <= 6; R++) {
    for (let C = 2; C <= 6; C++) {
      const totalPatches = R * C;
      const seamsCount = R * (C - 1) + (R - 1);
      if (totalPatches > maxPatches || seamsCount > effectiveMaxSeams || totalPatches > candidates.length) {
        continue;
      }

      const selected = candidates.slice(0, totalPatches);
      let validGrid = true;

      // Check horizontal adjacency
      for (let r = 0; r < R; r++) {
        for (let c = 0; c < C - 1; c++) {
          if (!canJoin(selected[r * C + c], selected[r * C + c + 1]).allowed) {
            validGrid = false;
            break;
          }
        }
        if (!validGrid) break;
      }

      // Check vertical adjacency
      if (validGrid) {
        for (let r = 0; r < R - 1; r++) {
          for (let c = 0; c < C; c++) {
            if (!canJoin(selected[r * C + c], selected[(r + 1) * C + c]).allowed) {
              validGrid = false;
              break;
            }
          }
          if (!validGrid) break;
        }
      }

      if (validGrid) {
        let minRowW = 9999;
        let totalGridH = 0;

        for (let r = 0; r < R; r++) {
          let rowW = 0;
          let rowH = 9999;
          for (let c = 0; c < C; c++) {
            const p = selected[r * C + c];
            const pw = p.effectiveWidth || p.width;
            const ph = p.effectiveHeight || p.height;
            rowW += pw;
            if (c > 0) rowW -= seamLossPerJoin;
            rowH = Math.min(rowH, ph);
          }
          minRowW = Math.min(minRowW, rowW);
          totalGridH += rowH;
          if (r > 0) totalGridH -= seamLossPerJoin;
        }

        if (minRowW >= targetW && totalGridH >= targetH) {
          return {
            fits: true,
            layout: 'grid_patchwork',
            seamType: `${R}x${C}_grid_seams`,
            patchCount: totalPatches,
            seamsCount,
            combinedW: minRowW,
            combinedH: totalGridH,
            piecesUsed: selected,
            note: `This panel is pieced from ${totalPatches} patches (${seamsCount} seams).`,
          };
        }
      }
    }
  }

  return { fits: false, reason: 'Cannot piece available scraps into the required dimensions within maximum seam limit.' };
}

/**
 * Main Fitting Engine: Fits scrap pieces into all zones of a product.
 * Returns:
 * - fits: boolean
 * - placements: array of placed piece details
 * - leftovers: array of unused pieces + reusable offcuts (>= 3cm)
 * - wastePercentage: number
 * - missing: explanation if fits is false
 */
export function fitPileToProduct(
  pile,
  productId,
  sizeKey,
  seamAllowanceCm = CONFIG.SEAM_ALLOWANCE_CM,
  options = {}
) {
  const variant = typeof options === 'string' ? options : (options && (options.variant || options.style)) || null;
  const requirements = getProductRequirements(productId, sizeKey, seamAllowanceCm, variant);
  if (!requirements) {
    return {
      fits: false,
      missing: `Unknown product or size: ${productId} (${sizeKey})`,
      placements: [],
      leftovers: pile,
      wastePercentage: 100,
    };
  }

  // Categorize zones by fabric source (scrap vs plain_base)
  const sourcingOverrides = (options && (options.pieceSourcing || options.fabricSourceOverrides)) || {};

  const categorizedZones = requirements.zones.map((zone) => {
    const override = sourcingOverrides[zone.id] || sourcingOverrides[zone.baseZoneId];
    const rawSource = override || zone.fabricSource || 'scrap';
    // For existing products, 'either' strictly means 'scrap'
    const resolvedSource = rawSource === 'either' ? 'scrap' : rawSource;
    const scrapEligible = resolvedSource !== 'plain_base' && zone.scrapEligible !== false;
    return {
      ...zone,
      fabricSource: resolvedSource,
      scrapEligible,
    };
  });

  const scrapZones = categorizedZones.filter((z) => z.scrapEligible);
  const plainBaseZones = categorizedZones.filter((z) => !z.scrapEligible);

  // 1. Assign 60-30-10 zoning roles for scrap-eligible pieces
  let zoning;
  if (scrapZones.length > 0) {
    const scrapRequirements = {
      ...requirements,
      zones: scrapZones,
      totalAreaNeeded: scrapZones.reduce((sum, z) => sum + (z.cutWidth * z.cutHeight), 0),
      totalFinishedArea: scrapZones.reduce((sum, z) => sum + (z.finishedWidth * z.finishedHeight), 0),
    };
    zoning = assignZoningRoles(pile, scrapRequirements);
    if (!zoning.hasGoodBase) {
      const earlyWarnings = [...(zoning.warnings || [])];
      const effectiveVariant = requirements.variant || variant || 'plain';
      if (effectiveVariant === 'patchwork') {
        earlyWarnings.push(
          `Full patchwork option: requires ~24 scraps across ~22 seam joins, estimated sewing time ~85 mins. Hybrid construction (plain fabric bodice with patchwork sleeves) is recommended for comfort against child skin.`
        );
      }
      return {
        fits: false,
        missing: zoning.fallbackReason,
        missingDetails: scrapZones.map((z) => ({
          zoneId: z.id,
          zoneName: z.name,
          role: z.role,
          neededDimensions: `${z.cutWidth} × ${z.cutHeight} cm`,
          neededArea: z.cutWidth * z.cutHeight,
        })),
        suggestions: zoning.suggestions,
        warnings: earlyWarnings,
        hasAnchorWarning: Boolean(zoning.hasAnchorWarning),
        placements: [],
        leftovers: pile,
        fabricUsedInSeamsCm2: 0,
        fabricTooSmallToReuseCm2: 0,
        trimWasteAreaCm2: 0,
        seamLossAreaCm2: 0,
        wastePercentage: 100,
        zoningBreakdown: zoning.breakdown,
        plainBase: {
          piecesCount: plainBaseZones.length,
          totalCutAreaCm2: plainBaseZones.reduce((sum, z) => sum + (z.cutWidth * z.cutHeight), 0),
          boltWidthCm: CONFIG.BOLT_WIDTH_CM || 110,
          lengthNeededCm: 0,
          yardageNeededMeters: 0,
          pieces: plainBaseZones,
        },
        yardageNeededMeters: 0,
      };
    }
  } else {
    // 100% plain base garment: no scraps required from pile
    zoning = {
      hasGoodBase: true,
      basePieces: [],
      supportingPieces: [],
      accentPieces: [],
      breakdown: { basePct: 0, supportingPct: 0, accentPct: 0 },
      warnings: [],
      hasAnchorWarning: false,
    };
  }

  // 2. Prepare mutable pools of pieces (expanding pieces with quantity > 1 into distinct units)
  const availablePool = [];
  const expandPool = (piecesList, defaultRole) => {
    piecesList.forEach((p) => {
      const qty = Number(p.quantity) || 1;
      for (let i = 0; i < qty; i++) {
        availablePool.push({
          ...p,
          instanceId: qty > 1 ? `${p.id}_q${i + 1}` : p.id,
          assignedRole: defaultRole,
          used: false,
        });
      }
    });
  };

  expandPool(zoning.basePieces, 'base');
  expandPool(zoning.supportingPieces, 'supporting');
  expandPool(zoning.accentPieces, 'accent');

  // Extract unique colors across the pile to detect single-color piles
  const uniquePileColors = [...new Set(pile.map((p) => p.dominantColor || p.color || (p.colors && p.colors[0])).filter(Boolean))];
  const isSingleColorPile = uniquePileColors.length === 1;

  // Determine pile's neutral base color (for hybrid plain body and contrast reference)
  let pileNeutralBaseColor = 'navy';
  if (zoning.basePieces && zoning.basePieces.length > 0) {
    pileNeutralBaseColor = zoning.basePieces[0].dominantColor || zoning.basePieces[0].color || 'navy';
  } else if (availablePool.length > 0) {
    const neutralPiece = availablePool.find((p) => p.isNeutral);
    pileNeutralBaseColor = neutralPiece ? (neutralPiece.dominantColor || neutralPiece.color) : (availablePool[0].dominantColor || availablePool[0].color || 'navy');
  }

  const placements = [];
  const reusableLeftovers = [];
  let totalRawAreaUsed = 0;
  let totalFinishedAreaCovered = 0;
  let totalTrimWasteArea = 0;
  let totalSeamLossArea = 0;
  let totalExtraSeams = 0;

  // Process zones in priority order: Base zones first (largest), then Supporting, then Accent
  const sortedZones = [...scrapZones].sort((a, b) => {
    const roleOrder = { base: 1, supporting: 2, accent: 3 };
    return (roleOrder[a.role] || 9) - (roleOrder[b.role] || 9);
  });

  const missingRequirements = [];

  for (const zone of sortedZones) {
    // If zone was already satisfied as part of a paired zone operation (e.g. child_top mirrored sleeves)
    if (placements.some((p) => p.zoneId === zone.id)) {
      continue;
    }

    const targetW = zone.cutWidth;
    const targetH = zone.cutHeight;
    let zoneSatisfied = false;

    // Special handling for child_top paired sleeves:
    // Build sleeve_1 with the real engine and mirror it to sleeve_2, ensuring identical colors and mirrored layout.
    if (productId === 'child_top' && zone.id === 'sleeve_1') {
      const zone2 = sortedZones.find((z) => z.id === 'sleeve_2');
      if (zone2) {
        // Group available unused pieces by color and fabric type into pairs
        const byColorGroup = {};
        availablePool.filter((p) => !p.used).forEach((p) => {
          const k = `${p.dominantColor || p.color}_${p.fabricType || 'cotton'}`;
          if (!byColorGroup[k]) byColorGroup[k] = [];
          byColorGroup[k].push(p);
        });

        const isHybrid = (requirements.variant || variant || (options && options.variant)) !== 'patchwork';

        // Sort color groups:
        // In hybrid mode, prioritize supporting/accent colors (colors different from pileNeutralBaseColor)
        // so that the sleeves are visibly different from the plain body!
        const colorKeys = Object.keys(byColorGroup).sort((a, b) => {
          const colorA = a.split('_')[0];
          const colorB = b.split('_')[0];
          if (isHybrid && uniquePileColors.length > 1) {
            const aIsNonBody = colorA !== pileNeutralBaseColor;
            const bIsNonBody = colorB !== pileNeutralBaseColor;
            if (aIsNonBody && !bIsNonBody) return -1;
            if (!aIsNonBody && bIsNonBody) return 1;
          }
          return byColorGroup[b].length - byColorGroup[a].length;
        });

        const leftPool = [];
        const rightPool = [];
        for (const k of colorKeys) {
          const list = byColorGroup[k];
          const pairsCount = Math.floor(list.length / 2);
          for (let i = 0; i < pairsCount; i++) {
            const leftP = list[i * 2];
            const rightP = list[i * 2 + 1];
            leftP.pairPartner = rightP;
            rightP.pairPartner = leftP;
            leftPool.push(leftP);
            rightPool.push(rightP);
          }
        }

        // Try single piece fit first from leftPool
        let singlePairFit = null;
        for (const lp of leftPool) {
          const sFit = canFitSinglePiece(lp, targetW, targetH, true);
          if (sFit.fits) {
            singlePairFit = { piece: lp, rotated: sFit.rotated };
            break;
          }
        }

        if (singlePairFit) {
          const lp = singlePairFit.piece;
          const rp = lp.pairPartner;
          lp.used = true;
          rp.used = true;

          const cutL = cutScrap(lp, targetW, targetH, singlePairFit.rotated);
          const cutR = cutScrap(rp, targetW, targetH, singlePairFit.rotated);

          totalRawAreaUsed += cutL.totalScrapArea + cutR.totalScrapArea;
          totalFinishedAreaCovered += (zone.finishedWidth * zone.finishedHeight) + (zone2.finishedWidth * zone2.finishedHeight);
          totalTrimWasteArea += cutL.trimWasteArea + cutR.trimWasteArea;
          reusableLeftovers.push(...cutL.reusableOffcuts, ...cutR.reusableOffcuts);

          const makeSinglePlacement = (z, p, isRight = false) => {
            const pl = {
              zoneId: z.id,
              zoneName: z.name,
              role: z.role,
              fabricSource: z.fabricSource || 'scrap',
              method: 'single_piece',
              patchCount: 1,
              seamsCount: 0,
              mirroredPair: true,
              scraps: [
                {
                  scrapId: p.id,
                  instanceId: p.instanceId,
                  color: p.dominantColor || p.color,
                  fabricType: p.fabricType,
                  print: p.print,
                  rotated: singlePairFit.rotated,
                  cutWidth: targetW,
                  cutHeight: targetH,
                  finishedWidth: z.finishedWidth,
                  finishedHeight: z.finishedHeight,
                },
              ],
            };
            if (isRight) pl.mirroredFrom = 'sleeve_1';
            if (z.geometry) {
              pl.geometry = z.geometry;
              if (z.geometry.shapeType === 'curved') {
                pl.shapeType = 'curved';
                pl.clipPathId = `clip_${z.id}`;
                pl.seamPath = z.geometry.seamPath;
                pl.saPath = z.geometry.saPath;
                pl.cutOnFold = Boolean(z.geometry.cutOnFold);
                pl.netAreaCm2 = z.geometry.finishedAreaCm2;
                pl.clipped = true;
              }
            }
            return pl;
          };

          placements.push(makeSinglePlacement(zone, lp, false));
          placements.push(makeSinglePlacement(zone2, rp, true));
          zoneSatisfied = true;
          continue;
        }

        // Try patchwork fit from leftPool
        if (leftPool.length >= 2) {
          const patchworkResult = tryMultiPiecePatchwork(
            leftPool,
            targetW,
            targetH,
            seamAllowanceCm,
            CONFIG.MAX_SEAMS_PER_ZONE || 6
          );

          if (patchworkResult.fits) {
            patchworkResult.piecesUsed.forEach((p) => {
              p.used = true;
              if (p.pairPartner) p.pairPartner.used = true;
            });

            const count = patchworkResult.piecesUsed.length;
            let rows = 1;
            let cols = count;
            const gridMatch = patchworkResult.seamType?.match(/(\d+)x(\d+)_grid_seams/i);
            if (gridMatch) {
              rows = parseInt(gridMatch[1], 10);
              cols = parseInt(gridMatch[2], 10);
            } else if (count === 4) {
              rows = 2;
              cols = 2;
            } else if (count === 6) {
              rows = 3;
              cols = 2;
            }

            // Left sleeve scraps
            const leftScraps = patchworkResult.piecesUsed.map((p) => ({
              scrapId: p.id,
              instanceId: p.instanceId,
              color: p.dominantColor || p.color,
              fabricType: p.fabricType,
              print: p.print,
              cutWidth: p.effectiveWidth || p.width,
              cutHeight: p.effectiveHeight || p.height,
            }));

            // Right sleeve scraps: mirrored across horizontal columns (cols - 1 - c)
            const rightScraps = [];
            for (let r = 0; r < rows; r++) {
              for (let c = 0; c < cols; c++) {
                const srcIdx = r * cols + (cols - 1 - c);
                const srcPiece = patchworkResult.piecesUsed[srcIdx];
                const partner = srcPiece.pairPartner;
                rightScraps.push({
                  scrapId: partner ? partner.id : srcPiece.id,
                  instanceId: partner ? partner.instanceId : srcPiece.instanceId,
                  color: srcPiece.dominantColor || srcPiece.color,
                  fabricType: partner ? partner.fabricType : srcPiece.fabricType,
                  print: partner ? partner.print : srcPiece.print,
                  cutWidth: srcPiece.effectiveWidth || srcPiece.width,
                  cutHeight: srcPiece.effectiveHeight || srcPiece.height,
                  mirroredFrom: srcPiece.instanceId || srcPiece.id,
                });
              }
            }

            // Compute areas & seam losses for BOTH sleeves
            const rawAreaPerSleeve = patchworkResult.piecesUsed.reduce(
              (sum, p) => sum + (p.effectiveWidth || p.width) * (p.effectiveHeight || p.height),
              0
            );
            const targetCutArea = targetW * targetH;
            const internalSeamLoss = patchworkResult.seamsCount * 2 * seamAllowanceCm * (targetW / cols);
            const blockTrimWaste = Math.max(0, rawAreaPerSleeve - targetCutArea - internalSeamLoss);

            // Add for BOTH sleeves
            totalRawAreaUsed += rawAreaPerSleeve * 2;
            totalFinishedAreaCovered += (zone.finishedWidth * zone.finishedHeight) + (zone2.finishedWidth * zone2.finishedHeight);
            totalSeamLossArea += internalSeamLoss * 2;
            totalTrimWasteArea += blockTrimWaste * 2;
            totalExtraSeams += patchworkResult.seamsCount * 2;

            const makePatchPlacement = (z, scrapsList, isRight = false) => {
              const pl = {
                zoneId: z.id,
                zoneName: z.name,
                role: z.role,
                fabricSource: z.fabricSource || 'scrap',
                method: patchworkResult.patchCount === 1 ? 'single_piece' : 'pieced_patches',
                patchCount: patchworkResult.patchCount,
                seamsCount: patchworkResult.seamsCount,
                direction: patchworkResult.layout,
                seamType: patchworkResult.seamType,
                note: isRight
                  ? 'Mirrored pair with left sleeve: identical colours and symmetrical patch layout'
                  : patchworkResult.note,
                mirroredPair: true,
                scraps: scrapsList,
              };
              if (isRight) pl.mirroredFrom = 'sleeve_1';
              if (z.geometry) {
                pl.geometry = z.geometry;
                if (z.geometry.shapeType === 'curved') {
                  pl.shapeType = 'curved';
                  pl.clipPathId = `clip_${z.id}`;
                  pl.seamPath = z.geometry.seamPath;
                  pl.saPath = z.geometry.saPath;
                  pl.cutOnFold = Boolean(z.geometry.cutOnFold);
                  pl.netAreaCm2 = z.geometry.finishedAreaCm2;
                  pl.clipped = true;
                }
              }
              return pl;
            };

            placements.push(makePatchPlacement(zone, leftScraps, false));
            placements.push(makePatchPlacement(zone2, rightScraps, true));
            zoneSatisfied = true;
            continue;
          }
        }
      }
    }

    // Filter available candidates matching role first, then backup from supporting/base
    const candidateFilter = (candidateRole) =>
      availablePool.filter((p) => !p.used && (p.assignedRole === candidateRole || zone.role === 'accent'));

    let candidates = candidateFilter(zone.role);
    if (candidates.length === 0 && zone.role !== 'base') {
      candidates = availablePool.filter((p) => !p.used);
    }

    // Step A: Try Single Piece Direct Fit
    for (const piece of candidates) {
      const singleFit = canFitSinglePiece(piece, targetW, targetH, true);
      if (singleFit.fits) {
        piece.used = true;
        const cut = cutScrap(piece, targetW, targetH, singleFit.rotated);

        totalRawAreaUsed += cut.totalScrapArea;
        totalFinishedAreaCovered += zone.finishedWidth * zone.finishedHeight;
        totalTrimWasteArea += cut.trimWasteArea;
        reusableLeftovers.push(...cut.reusableOffcuts);

        const placementObj = {
          zoneId: zone.id,
          zoneName: zone.name,
          role: zone.role,
          fabricSource: zone.fabricSource || 'scrap',
          method: 'single_piece',
          scraps: [
            {
              scrapId: piece.id,
              instanceId: piece.instanceId,
              color: piece.dominantColor || piece.color,
              fabricType: piece.fabricType,
              print: piece.print,
              rotated: singleFit.rotated,
              cutWidth: targetW,
              cutHeight: targetH,
              finishedWidth: zone.finishedWidth,
              finishedHeight: zone.finishedHeight,
            },
          ],
          seamsCount: 0,
        };

        if (zone.geometry) {
          placementObj.geometry = zone.geometry;
          if (zone.geometry.shapeType === 'curved') {
            placementObj.shapeType = 'curved';
            placementObj.clipPathId = `clip_${zone.id}`;
            placementObj.seamPath = zone.geometry.seamPath;
            placementObj.saPath = zone.geometry.saPath;
            placementObj.cutOnFold = Boolean(zone.geometry.cutOnFold);
            placementObj.netAreaCm2 = zone.geometry.finishedAreaCm2;
            placementObj.clipped = true;
          }
        }

        placements.push(placementObj);

        zoneSatisfied = true;
        break;
      }
    }

    // Step B: If no single piece fits, try Multi-Piece Patchwork Joining
    if (!zoneSatisfied && candidates.length >= 2) {
      const unusedCandidates = candidates.filter((c) => !c.used);
      const patchworkResult = tryMultiPiecePatchwork(
        unusedCandidates,
        targetW,
        targetH,
        seamAllowanceCm,
        CONFIG.MAX_SEAMS_PER_ZONE || 6
      );

      if (patchworkResult.fits) {
        // Mark all pieces as used
        patchworkResult.piecesUsed.forEach((p) => {
          p.used = true;
        });

        totalExtraSeams += patchworkResult.seamsCount;

        const rawArea = patchworkResult.piecesUsed.reduce(
          (sum, p) => sum + (p.effectiveWidth || p.width) * (p.effectiveHeight || p.height),
          0
        );
        totalRawAreaUsed += rawArea;
        totalFinishedAreaCovered += zone.finishedWidth * zone.finishedHeight;

        // Seam allowance loss inside the pieced panel joints
        const assembledArea = patchworkResult.combinedW * patchworkResult.combinedH;
        const internalSeamLoss = Math.max(0, rawArea - assembledArea);

        // Trimming assembled block to exact target cut rectangle
        const minDim = CONFIG.MIN_REUSABLE_SCRAP_DIMENSION_CM;
        let blockTrimWaste = 0;

        // Remnant along the side
        const sideW = patchworkResult.combinedW - targetW;
        const sideH = patchworkResult.combinedH;
        if (sideW >= minDim && sideH >= minDim) {
          reusableLeftovers.push({
            id: `${zone.id}_offcut_side`,
            originalPieceId: patchworkResult.piecesUsed[0].id,
            width: Number(sideW.toFixed(1)),
            height: Number(sideH.toFixed(1)),
            quantity: 1,
            fabricType: patchworkResult.piecesUsed[0].fabricType,
            color: patchworkResult.piecesUsed[0].dominantColor || patchworkResult.piecesUsed[0].color,
            print: patchworkResult.piecesUsed[0].print,
            thickness: patchworkResult.piecesUsed[0].thickness,
            stretchy: isPieceStretchy(patchworkResult.piecesUsed[0]),
            isReusableLeftover: true,
            area: sideW * sideH,
          });
        } else {
          blockTrimWaste += Math.max(0, sideW * sideH);
        }

        // Remnant along the bottom
        const botW = targetW;
        const botH = patchworkResult.combinedH - targetH;
        if (botW >= minDim && botH >= minDim) {
          reusableLeftovers.push({
            id: `${zone.id}_offcut_bottom`,
            originalPieceId: patchworkResult.piecesUsed[0].id,
            width: Number(botW.toFixed(1)),
            height: Number(botH.toFixed(1)),
            quantity: 1,
            fabricType: patchworkResult.piecesUsed[0].fabricType,
            color: patchworkResult.piecesUsed[0].dominantColor || patchworkResult.piecesUsed[0].color,
            print: patchworkResult.piecesUsed[0].print,
            thickness: patchworkResult.piecesUsed[0].thickness,
            stretchy: isPieceStretchy(patchworkResult.piecesUsed[0]),
            isReusableLeftover: true,
            area: botW * botH,
          });
        } else {
          blockTrimWaste += Math.max(0, botW * botH);
        }

        totalSeamLossArea += internalSeamLoss;
        totalTrimWasteArea += blockTrimWaste;

        const placementObj = {
          zoneId: zone.id,
          zoneName: zone.name,
          role: zone.role,
          fabricSource: zone.fabricSource || 'scrap',
          method: patchworkResult.patchCount === 1 ? 'single_piece' : 'pieced_patches',
          patchCount: patchworkResult.patchCount,
          seamsCount: patchworkResult.seamsCount,
          direction: patchworkResult.layout,
          seamType: patchworkResult.seamType,
          note: patchworkResult.note,
          scraps: patchworkResult.piecesUsed.map((p) => ({
            scrapId: p.id,
            instanceId: p.instanceId,
            color: p.dominantColor || p.color,
            fabricType: p.fabricType,
            print: p.print,
            cutWidth: p.effectiveWidth || p.width,
            cutHeight: p.effectiveHeight || p.height,
          })),
        };

        if (zone.geometry) {
          placementObj.geometry = zone.geometry;
          if (zone.geometry.shapeType === 'curved') {
            placementObj.shapeType = 'curved';
            placementObj.clipPathId = `clip_${zone.id}`;
            placementObj.seamPath = zone.geometry.seamPath;
            placementObj.saPath = zone.geometry.saPath;
            placementObj.cutOnFold = Boolean(zone.geometry.cutOnFold);
            placementObj.netAreaCm2 = zone.geometry.finishedAreaCm2;
            placementObj.clipped = true;
          }
        }

        placements.push(placementObj);

        zoneSatisfied = true;
      }
    }

    // Fallback: If role-filtered candidates were not enough to piece the zone,
    // allow borrowing from all remaining compatible unused pieces in the pile
    if (!zoneSatisfied) {
      const allUnused = availablePool.filter((p) => !p.used);
      if (allUnused.length >= 2) {
        const patchworkResult = tryMultiPiecePatchwork(
          allUnused,
          targetW,
          targetH,
          seamAllowanceCm,
          CONFIG.MAX_SEAMS_PER_ZONE || 6
        );

        if (patchworkResult.fits) {
          patchworkResult.piecesUsed.forEach((p) => {
            p.used = true;
          });

          totalExtraSeams += patchworkResult.seamsCount;

          const rawArea = patchworkResult.piecesUsed.reduce(
            (sum, p) => sum + (p.effectiveWidth || p.width) * (p.effectiveHeight || p.height),
            0
          );
          totalRawAreaUsed += rawArea;
          totalFinishedAreaCovered += zone.finishedWidth * zone.finishedHeight;

          const assembledArea = patchworkResult.combinedW * patchworkResult.combinedH;
          const internalSeamLoss = Math.max(0, rawArea - assembledArea);

          const minDim = CONFIG.MIN_REUSABLE_SCRAP_DIMENSION_CM;
          let blockTrimWaste = 0;

          const sideW = patchworkResult.combinedW - targetW;
          const sideH = patchworkResult.combinedH;
          if (sideW >= minDim && sideH >= minDim) {
            reusableLeftovers.push({
              id: `${zone.id}_offcut_side`,
              originalPieceId: patchworkResult.piecesUsed[0].id,
              width: Number(sideW.toFixed(1)),
              height: Number(sideH.toFixed(1)),
              quantity: 1,
              fabricType: patchworkResult.piecesUsed[0].fabricType,
              color: patchworkResult.piecesUsed[0].dominantColor || patchworkResult.piecesUsed[0].color,
              print: patchworkResult.piecesUsed[0].print,
              thickness: patchworkResult.piecesUsed[0].thickness,
              stretchy: isPieceStretchy(patchworkResult.piecesUsed[0]),
              isReusableLeftover: true,
              area: sideW * sideH,
            });
          } else {
            blockTrimWaste += Math.max(0, sideW * sideH);
          }

          const botW = targetW;
          const botH = patchworkResult.combinedH - targetH;
          if (botW >= minDim && botH >= minDim) {
            reusableLeftovers.push({
              id: `${zone.id}_offcut_bottom`,
              originalPieceId: patchworkResult.piecesUsed[0].id,
              width: Number(botW.toFixed(1)),
              height: Number(botH.toFixed(1)),
              quantity: 1,
              fabricType: patchworkResult.piecesUsed[0].fabricType,
              color: patchworkResult.piecesUsed[0].dominantColor || patchworkResult.piecesUsed[0].color,
              print: patchworkResult.piecesUsed[0].print,
              thickness: patchworkResult.piecesUsed[0].thickness,
              stretchy: isPieceStretchy(patchworkResult.piecesUsed[0]),
              isReusableLeftover: true,
              area: botW * botH,
            });
          } else {
            blockTrimWaste += Math.max(0, botW * botH);
          }

          totalSeamLossArea += internalSeamLoss;
          totalTrimWasteArea += blockTrimWaste;

          const placementObj = {
            zoneId: zone.id,
            zoneName: zone.name,
            role: zone.role,
            fabricSource: zone.fabricSource || 'scrap',
            method: patchworkResult.patchCount === 1 ? 'single_piece' : 'pieced_patches',
            patchCount: patchworkResult.patchCount,
            seamsCount: patchworkResult.seamsCount,
            direction: patchworkResult.layout,
            seamType: patchworkResult.seamType,
            note: patchworkResult.note,
            scraps: patchworkResult.piecesUsed.map((p) => ({
              scrapId: p.id,
              instanceId: p.instanceId,
              color: p.dominantColor || p.color,
              fabricType: p.fabricType,
              print: p.print,
              cutWidth: p.effectiveWidth || p.width,
              cutHeight: p.effectiveHeight || p.height,
            })),
          };

          if (zone.geometry) {
            placementObj.geometry = zone.geometry;
            if (zone.geometry.shapeType === 'curved') {
              placementObj.shapeType = 'curved';
              placementObj.clipPathId = `clip_${zone.id}`;
              placementObj.seamPath = zone.geometry.seamPath;
              placementObj.saPath = zone.geometry.saPath;
              placementObj.cutOnFold = Boolean(zone.geometry.cutOnFold);
              placementObj.netAreaCm2 = zone.geometry.finishedAreaCm2;
              placementObj.clipped = true;
            }
          }

          placements.push(placementObj);

          zoneSatisfied = true;
        }
      }
    }

    if (!zoneSatisfied) {
      if (!zone.optional || variant === 'decorated') {
        missingRequirements.push({
          zoneId: zone.id,
          zoneName: zone.name,
          role: zone.role,
          neededDimensions: `${targetW} × ${targetH} cm`,
          neededArea: targetW * targetH,
        });
      }
    }
  }

  // Process plain_base zones: zero scraps consumed from pile, zero pieced seams, full finished area tracked
  for (const zone of plainBaseZones) {
    totalFinishedAreaCovered += zone.finishedWidth * zone.finishedHeight;
    const placementObj = {
      zoneId: zone.id,
      zoneName: zone.name,
      role: zone.role,
      method: 'plain_base',
      fabricSource: 'plain_base',
      color: pileNeutralBaseColor,
      dominantColor: pileNeutralBaseColor,
      scraps: [],
      seamsCount: 0,
      cutWidth: zone.cutWidth,
      cutHeight: zone.cutHeight,
      finishedWidth: zone.finishedWidth,
      finishedHeight: zone.finishedHeight,
    };
    if (zone.geometry) {
      placementObj.geometry = zone.geometry;
      if (zone.geometry.shapeType === 'curved') {
        placementObj.shapeType = 'curved';
        placementObj.seamPath = zone.geometry.seamPath;
        placementObj.saPath = zone.geometry.saPath;
        placementObj.cutOnFold = Boolean(zone.geometry.cutOnFold);
        placementObj.netAreaCm2 = zone.geometry.finishedAreaCm2;
      }
    }
    placements.push(placementObj);
  }

  // Calculate plain base continuous yardage (assuming standard bolt width with safety margin)
  const boltWidthCm = CONFIG.BOLT_WIDTH_CM || 110;
  const plainBaseTotalCutArea = plainBaseZones.reduce((sum, z) => sum + (z.cutWidth * z.cutHeight), 0);
  const safetyMargin = 1.15;
  const lengthNeededCm = plainBaseZones.length > 0
    ? Math.ceil((plainBaseTotalCutArea / boltWidthCm) * safetyMargin)
    : 0;
  const yardageNeededMeters = Number((lengthNeededCm / 100).toFixed(2));

  // Collect completely unused pieces
  const unusedScraps = availablePool
    .filter((p) => !p.used)
    .map((p) => ({
      id: p.id,
      instanceId: p.instanceId,
      width: p.effectiveWidth || p.width,
      height: p.effectiveHeight || p.height,
      color: p.dominantColor || p.color,
      fabricType: p.fabricType,
      print: p.print,
      thickness: p.thickness,
      stretchy: isPieceStretchy(p),
      isReusableLeftover: true,
      area: (p.effectiveWidth || p.width) * (p.effectiveHeight || p.height),
    }));

  const allLeftovers = [...unusedScraps, ...reusableLeftovers];
  const fits = missingRequirements.length === 0;

  // Waste calculation: trim waste percentage relative to total scrap used
  const wastePercentage =
    totalRawAreaUsed > 0
      ? Number(((totalTrimWasteArea / totalRawAreaUsed) * 100).toFixed(1))
      : 0;

  // Build human-friendly missing explanation
  let missingMessage = null;
  if (!fits) {
    const missingDesc = missingRequirements
      .map((m) => `${m.zoneName} (${m.neededDimensions}, ${m.role} role)`)
      .join('; ');
    missingMessage = `Not enough fabric to complete all zones. Missing pieces for: ${missingDesc}. Try a smaller size or add matching scrap fabric.`;
  }

  const seamLossExplanation = 'Pieced panels lose fabric in seams, so small scraps cover less than their raw area.';

  const combinedWarnings = [...(zoning.warnings || (zoning.warning ? [zoning.warning] : []))];
  const effectiveVariant = requirements.variant || variant || 'plain';

  // Design notes: Note if pile has only one colour
  const designNotes = [];
  if (isSingleColorPile && uniquePileColors.length === 1) {
    const singleColor = uniquePileColors[0];
    designNotes.push(`Pile has only one colour (${singleColor}); body and sleeves use the same colour.`);
  }
  if (designNotes.length > 0) {
    combinedWarnings.push(...designNotes);
  }

  if (effectiveVariant === 'patchwork') {
    const totalScrapsCount = placements.reduce((sum, p) => sum + (p.scraps ? p.scraps.length : 0), 0);
    const estTimeMins = (totalExtraSeams * 3.5) + (productId === 'child_top' ? 45 : 40);
    combinedWarnings.push(
      `Full patchwork option: ${totalScrapsCount} scraps across ${totalExtraSeams} seam joins, estimated sewing time ~${Math.round(estTimeMins)} mins. Hybrid construction (plain fabric bodice with patchwork sleeves) is recommended for comfort against child skin.`
    );
  }

  return {
    fits,
    productId,
    sizeKey,
    variant: requirements.variant || 'plain',
    placements,
    leftovers: allLeftovers,
    fabricUsedInSeamsCm2: Math.round(totalSeamLossArea),
    fabricTooSmallToReuseCm2: Math.round(totalTrimWasteArea),
    trimWasteAreaCm2: Math.round(totalTrimWasteArea),
    seamLossAreaCm2: Math.round(totalSeamLossArea),
    seamLossExplanation,
    totalRawAreaUsedCm2: Math.round(totalRawAreaUsed),
    finishedAreaCoveredCm2: Math.round(totalFinishedAreaCovered),
    wastePercentage,
    totalExtraSeams,
    warnings: combinedWarnings,
    designNotes,
    hasAnchorWarning: Boolean(zoning.hasAnchorWarning),
    missing: missingMessage,
    missingDetails: missingRequirements,
    zoningBreakdown: (plainBaseZones.length > 0)
      ? {
          basePct: 65,
          supportingPct: 25,
          accentPct: 10,
          dominantColor: pileNeutralBaseColor,
        }
      : zoning.breakdown,
    plainBase: {
      color: pileNeutralBaseColor,
      dominantColor: pileNeutralBaseColor,
      piecesCount: plainBaseZones.length,
      totalCutAreaCm2: plainBaseTotalCutArea,
      boltWidthCm,
      lengthNeededCm,
      yardageNeededMeters,
      pieces: plainBaseZones.map((z) => ({
        id: z.id,
        name: z.name,
        color: pileNeutralBaseColor,
        cutWidth: z.cutWidth,
        cutHeight: z.cutHeight,
        finishedWidth: z.finishedWidth,
        finishedHeight: z.finishedHeight,
      })),
    },
    yardageNeededMeters,
  };
}

/**
 * Packs garment pattern pieces onto a rectangular pieced patchwork sheet
 * (or calculates required sheet size if not given).
 * 
 * Guarantees:
 * 1. Zero Overlap: Disjoint interior between piece cut bounding boxes.
 * 2. Seam Allowance Included: Every piece's perimeter seam allowance is fully inside the sheet boundaries.
 * 3. Clearance: Minimum separation of clearanceCm (default 0.5 cm) between piece cut boundaries for tailor shears.
 * 4. Containment: Every piece satisfies 0 <= x and x + width <= sheetWidth, 0 <= y and y + height <= sheetHeight.
 * 
 * Note: Bounding-box packing is v1 only. For curved pieces, axis-aligned bounding boxes
 * overestimate the required area compared to nested polygon packing.
 * 
 * @param {Array<Object>} pieces - Array of pieces or zones (with cutWidth/cutHeight or width/height/geometry)
 * @param {Object} [options] - Options:
 *   - sheetWidth {number} [optional]: Target sheet width (cm).
 *   - sheetHeight {number} [optional]: Target sheet height (cm).
 *   - clearanceCm {number}: Gap between cut pieces (default: 0.5 cm).
 *   - marginCm {number}: Outer border margin / seam allowance of the master sheet (default: 1.0 cm).
 *   - seamAllowanceCm {number}: Seam allowance to add if pieces only specify finished dimensions (default: 1.0 cm).
 * @returns {Object} {
 *   fits: boolean,
 *   sheetWidth: number,
 *   sheetHeight: number,
 *   sheetAreaCm2: number,
 *   totalPiecesAreaCm2: number,
 *   packingEfficiency: number,
 *   clearanceCm: number,
 *   marginCm: number,
 *   placements: Array<{ id: string, name: string, x: number, y: number, width: number, height: number, cutWidth: number, cutHeight: number, bounds: Object }>,
 *   collisions: Array<[string, string]>,
 *   overflow: boolean,
 * }
 */
export function packPiecesOnSheet(pieces, options = {}) {
  const clearanceCm = options.clearanceCm ?? CONFIG.CUTTING_CLEARANCE_CM ?? 0.5;
  const marginCm = options.marginCm ?? options.seamAllowanceCm ?? CONFIG.SEAM_ALLOWANCE_CM ?? 1.0;
  const defaultSA = options.seamAllowanceCm ?? CONFIG.SEAM_ALLOWANCE_CM ?? 1.0;

  if (!Array.isArray(pieces) || pieces.length === 0) {
    return {
      fits: true,
      sheetWidth: 0,
      sheetHeight: 0,
      sheetAreaCm2: 0,
      totalPiecesAreaCm2: 0,
      packingEfficiency: 1,
      clearanceCm,
      marginCm,
      placements: [],
      collisions: [],
      overflow: false,
    };
  }

  // Normalize pieces: ensure each has cutWidth and cutHeight (including perimeter seam allowance)
  const normPieces = pieces.map((p, idx) => {
    const id = p.id || `piece_${idx + 1}`;
    const name = p.name || id;
    let cutW, cutH;

    if (p.cutWidth !== undefined && p.cutHeight !== undefined) {
      cutW = p.cutWidth;
      cutH = p.cutHeight;
    } else if (p.geometry && p.geometry.boundingBoxMm) {
      const saMm = (p.seamAllowanceCm?.defaultCm ?? defaultSA) * 10;
      const bb = p.geometry.boundingBoxMm;
      cutW = ((bb.maxX - bb.minX) + 2 * saMm) / 10;
      cutH = ((bb.maxY - bb.minY) + 2 * saMm) / 10;
    } else {
      const w = p.width !== undefined ? p.width : (p.geometry?.finishedWidthCm || 0);
      const h = p.height !== undefined ? p.height : (p.geometry?.finishedHeightCm || 0);
      const sa = typeof p.seamAllowanceCm === 'number'
        ? p.seamAllowanceCm
        : (p.seamAllowanceCm?.defaultCm ?? defaultSA);
      cutW = w + 2 * sa;
      cutH = h + 2 * sa;
    }

    return {
      id,
      name,
      cutWidth: Number(cutW.toFixed(2)),
      cutHeight: Number(cutH.toFixed(2)),
      rawPiece: p,
      x: p.x,
      y: p.y,
    };
  });

  const totalPiecesAreaCm2 = normPieces.reduce((sum, p) => sum + p.cutWidth * p.cutHeight, 0);

  let sheetW = options.sheetWidth;
  let sheetH = options.sheetHeight;
  let placements = [];
  let overflow = false;

  // Case A: Pieces already have coordinates (validation mode)
  const hasUserCoords = normPieces.every((p) => p.x !== undefined && p.y !== undefined);
  if (hasUserCoords) {
    placements = normPieces.map((p) => ({
      id: p.id,
      name: p.name,
      x: p.x,
      y: p.y,
      width: p.cutWidth,
      height: p.cutHeight,
      cutWidth: p.cutWidth,
      cutHeight: p.cutHeight,
      bounds: {
        minX: p.x,
        minY: p.y,
        maxX: Number((p.x + p.cutWidth).toFixed(2)),
        maxY: Number((p.y + p.cutHeight).toFixed(2)),
      },
    }));

    if (!sheetW) {
      sheetW = Math.max(...placements.map((p) => p.bounds.maxX)) + marginCm;
    }
    if (!sheetH) {
      sheetH = Math.max(...placements.map((p) => p.bounds.maxY)) + marginCm;
    }
  } else {
    // Case B: Auto-packing using 2D First-Fit Decreasing Height (FFDH) Shelf Packing
    const sorted = [...normPieces].sort((a, b) => b.cutHeight - a.cutHeight || b.cutWidth - a.cutWidth);

    let targetWidth = sheetW;
    if (!targetWidth) {
      const maxPieceW = Math.max(...sorted.map((p) => p.cutWidth));
      const heuristicW = Math.ceil(Math.sqrt(totalPiecesAreaCm2 * 1.5));
      targetWidth = Math.max(maxPieceW + 2 * marginCm, heuristicW);
    }

    let currentX = marginCm;
    let shelfY = marginCm;
    let shelfHeight = 0;

    for (const piece of sorted) {
      if (currentX + piece.cutWidth + marginCm <= targetWidth + 0.001) {
        placements.push({
          id: piece.id,
          name: piece.name,
          x: Number(currentX.toFixed(2)),
          y: Number(shelfY.toFixed(2)),
          width: piece.cutWidth,
          height: piece.cutHeight,
          cutWidth: piece.cutWidth,
          cutHeight: piece.cutHeight,
          bounds: {
            minX: Number(currentX.toFixed(2)),
            minY: Number(shelfY.toFixed(2)),
            maxX: Number((currentX + piece.cutWidth).toFixed(2)),
            maxY: Number((shelfY + piece.cutHeight).toFixed(2)),
          },
        });
        currentX += piece.cutWidth + clearanceCm;
        shelfHeight = Math.max(shelfHeight, piece.cutHeight);
      } else {
        shelfY += shelfHeight + clearanceCm;
        currentX = marginCm;
        shelfHeight = piece.cutHeight;

        if (currentX + piece.cutWidth + marginCm > targetWidth + 0.001) {
          if (sheetW) {
            overflow = true;
          } else {
            targetWidth = currentX + piece.cutWidth + marginCm;
          }
        }

        placements.push({
          id: piece.id,
          name: piece.name,
          x: Number(currentX.toFixed(2)),
          y: Number(shelfY.toFixed(2)),
          width: piece.cutWidth,
          height: piece.cutHeight,
          cutWidth: piece.cutWidth,
          cutHeight: piece.cutHeight,
          bounds: {
            minX: Number(currentX.toFixed(2)),
            minY: Number(shelfY.toFixed(2)),
            maxX: Number((currentX + piece.cutWidth).toFixed(2)),
            maxY: Number((shelfY + piece.cutHeight).toFixed(2)),
          },
        });
        currentX += piece.cutWidth + clearanceCm;
      }
    }

    if (!sheetW) {
      sheetW = Number((Math.max(...placements.map((p) => p.bounds.maxX)) + marginCm).toFixed(2));
    }
    if (!sheetH) {
      sheetH = Number((Math.max(...placements.map((p) => p.bounds.maxY)) + marginCm).toFixed(2));
    }

    if (options.sheetHeight && (Math.max(...placements.map((p) => p.bounds.maxY)) + marginCm > options.sheetHeight)) {
      overflow = true;
    }
  }

  // Verification 1: Pairwise collision & clearance
  const collisions = [];
  for (let i = 0; i < placements.length; i++) {
    for (let j = i + 1; j < placements.length; j++) {
      const a = placements[i];
      const b = placements[j];
      const xOverlap = (a.x < b.x + b.width + clearanceCm - 0.001) && (a.x + a.width + clearanceCm - 0.001 > b.x);
      const yOverlap = (a.y < b.y + b.height + clearanceCm - 0.001) && (a.y + a.height + clearanceCm - 0.001 > b.y);
      if (xOverlap && yOverlap) {
        collisions.push([a.id, b.id]);
      }
    }
  }

  // Verification 2: Containment inside sheet boundaries
  let outOfBounds = false;
  for (const p of placements) {
    if (
      p.x < marginCm - 0.001 ||
      p.y < marginCm - 0.001 ||
      p.x + p.width > sheetW - marginCm + 0.001 ||
      p.y + p.height > sheetH - marginCm + 0.001
    ) {
      outOfBounds = true;
      overflow = true;
    }
  }

  const fits = !overflow && collisions.length === 0 && !outOfBounds;
  const sheetAreaCm2 = Number((sheetW * sheetH).toFixed(2));
  const packingEfficiency = sheetAreaCm2 > 0 ? Number((totalPiecesAreaCm2 / sheetAreaCm2).toFixed(3)) : 0;

  return {
    fits,
    sheetWidth: Number(sheetW.toFixed(2)),
    sheetHeight: Number(sheetH.toFixed(2)),
    sheetAreaCm2,
    totalPiecesAreaCm2: Number(totalPiecesAreaCm2.toFixed(2)),
    packingEfficiency,
    clearanceCm,
    marginCm,
    placements,
    collisions,
    overflow,
  };
}
