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
export function fitPileToProduct(pile, productId, sizeKey, seamAllowanceCm = CONFIG.SEAM_ALLOWANCE_CM) {
  const requirements = getProductRequirements(productId, sizeKey, seamAllowanceCm);
  if (!requirements) {
    return {
      fits: false,
      missing: `Unknown product or size: ${productId} (${sizeKey})`,
      placements: [],
      leftovers: pile,
      wastePercentage: 100,
    };
  }

  // 1. Assign 60-30-10 zoning roles
  const zoning = assignZoningRoles(pile, requirements);
  if (!zoning.hasGoodBase) {
    return {
      fits: false,
      missing: zoning.fallbackReason,
      suggestions: zoning.suggestions,
      warnings: zoning.warnings || [],
      hasAnchorWarning: Boolean(zoning.hasAnchorWarning),
      placements: [],
      leftovers: pile,
      fabricUsedInSeamsCm2: 0,
      fabricTooSmallToReuseCm2: 0,
      trimWasteAreaCm2: 0,
      seamLossAreaCm2: 0,
      wastePercentage: 100,
      zoningBreakdown: zoning.breakdown,
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

  const placements = [];
  const reusableLeftovers = [];
  let totalRawAreaUsed = 0;
  let totalFinishedAreaCovered = 0;
  let totalTrimWasteArea = 0;
  let totalSeamLossArea = 0;
  let totalExtraSeams = 0;

  // Process zones in priority order: Base zones first (largest), then Supporting, then Accent
  const sortedZones = [...requirements.zones].sort((a, b) => {
    const roleOrder = { base: 1, supporting: 2, accent: 3 };
    return (roleOrder[a.role] || 9) - (roleOrder[b.role] || 9);
  });

  const missingRequirements = [];

  for (const zone of sortedZones) {
    const targetW = zone.cutWidth;
    const targetH = zone.cutHeight;
    let zoneSatisfied = false;

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

        placements.push({
          zoneId: zone.id,
          zoneName: zone.name,
          role: zone.role,
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
        });

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

        placements.push({
          zoneId: zone.id,
          zoneName: zone.name,
          role: zone.role,
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
        });

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

          placements.push({
            zoneId: zone.id,
            zoneName: zone.name,
            role: zone.role,
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
          });

          zoneSatisfied = true;
        }
      }
    }

    if (!zoneSatisfied) {
      missingRequirements.push({
        zoneId: zone.id,
        zoneName: zone.name,
        role: zone.role,
        neededDimensions: `${targetW} × ${targetH} cm`,
        neededArea: targetW * targetH,
      });
    }
  }

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

  return {
    fits,
    productId,
    sizeKey,
    placements,
    leftovers: allLeftovers,
    fabricUsedInSeamsCm2: Math.round(totalSeamLossArea),
    fabricTooSmallToReuseCm2: Math.round(totalTrimWasteArea),
    trimWasteAreaCm2: Math.round(totalTrimWasteArea),
    seamLossAreaCm2: Math.round(totalSeamLossArea),
    totalRawAreaUsedCm2: Math.round(totalRawAreaUsed),
    finishedAreaCoveredCm2: Math.round(totalFinishedAreaCovered),
    wastePercentage,
    totalExtraSeams,
    warnings: zoning.warnings || (zoning.warning ? [zoning.warning] : []),
    hasAnchorWarning: Boolean(zoning.hasAnchorWarning),
    missing: missingMessage,
    missingDetails: missingRequirements,
    zoningBreakdown: zoning.breakdown,
  };
}
