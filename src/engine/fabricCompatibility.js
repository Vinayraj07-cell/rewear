/**
 * REWEAR STAGE 2 — FABRIC COMPATIBILITY RULES
 * 
 * Plain-words explanation:
 * In garment construction and patchwork tailoring, fabrics joined together in the same
 * seam or panel must physically cooperate under the sewing machine needle.
 * 
 * This module enforces two strict physical tailoring rules:
 * 1. STRETCH RULE: Never join stretchy (knit, jersey, lycra) with non-stretchy (woven)
 *    in the same panel without backing, because the differential feed will warp and buckle the seam.
 * 2. THICKNESS RULE: Never join thick (denim, canvas) with thin (chiffon, georgette, thin silk)
 *    because the needle size, thread tension, and seam bulk will tear the delicate fabric.
 * 
 * Whenever a pair is incompatible, a clear tailor-tested explanation is returned so the user
 * understands why the fabrics cannot be joined.
 * 
 * Assumptions:
 * - Fabric thickness is categorized into 'thin', 'medium', 'thick'.
 * - Stretch is a boolean (true/false) or string ('yes'/'no').
 */

import { CONFIG } from './config.js';

/**
 * Normalizes boolean or string stretch input.
 * Accepts boolean true/false, strings 'yes'/'no'/'true'/'false'/'stretchy' (case-insensitive, trimmed).
 * Treats missing/null/undefined as non-stretchy (unless fabricType is 'knit').
 */
export function isPieceStretchy(piece) {
  if (!piece) return false;

  const rawVal = piece.stretchy !== undefined ? piece.stretchy : piece.stretch;

  // 1. Direct boolean check
  if (typeof rawVal === 'boolean') {
    return rawVal;
  }

  // 2. Explicit string check
  if (typeof rawVal === 'string' && rawVal.trim().length > 0) {
    const s = rawVal.trim().toLowerCase();
    if (s === 'yes' || s === 'true' || s === 'stretchy') return true;
    if (s === 'no' || s === 'false') return false;
  }

  // 3. Fabric type fallback when stretch is not explicitly specified
  if (piece.fabricType) {
    const ft = String(piece.fabricType).trim().toLowerCase();
    if (ft === 'knit' || ft === 'stretch' || ft === 'lycra' || ft === 'spandex') {
      return true;
    }
  }

  // Default: non-stretchy
  return false;
}

/**
 * Returns the numeric thickness level (1 = thin, 2 = medium, 3 = thick).
 */
export function getThicknessLevel(piece) {
  if (!piece) return 2;
  const raw = String(piece.thickness || '').toLowerCase();
  return CONFIG.THICKNESS_LEVELS[raw] || 2;
}

/**
 * Checks compatibility between two specific fabric pieces to be stitched in the same panel/seam.
 * Returns:
 * - compatible: boolean
 * - reason: plain-language explanation if rejected
 * - warnings: string[] of cautionary sewing tips
 */
export function checkFabricPairCompatibility(pieceA, pieceB) {
  const isA_Stretch = isPieceStretchy(pieceA);
  const isB_Stretch = isPieceStretchy(pieceB);

  // Rule 1: Stretch mismatch
  if (isA_Stretch !== isB_Stretch) {
    const stretchyPiece = isA_Stretch ? pieceA : pieceB;
    const wovenPiece = isA_Stretch ? pieceB : pieceA;
    return {
      compatible: false,
      reason: `Cannot join stretchy (${stretchyPiece.fabricType || 'knit'}) with non-stretchy (${wovenPiece.fabricType || 'woven'}) in the same seam: the stretchy piece will stretch under the sewing machine foot and create wavy, puckered seams.`,
      warnings: [],
    };
  }

  // Rule 2: Thickness difference > 1 level (e.g. thin + thick)
  const thickA = getThicknessLevel(pieceA);
  const thickB = getThicknessLevel(pieceB);
  const thickDiff = Math.abs(thickA - thickB);

  if (thickDiff > CONFIG.MAX_ALLOWED_THICKNESS_DIFF) {
    const thinPiece = thickA < thickB ? pieceA : pieceB;
    const thickPiece = thickA < thickB ? pieceB : pieceA;
    return {
      compatible: false,
      reason: `Cannot join thick fabric (${thickPiece.fabricType || 'denim/canvas'}) with thin fabric (${thinPiece.fabricType || 'georgette/silk'}) in the same panel: the needle size (size 16-18) and heavy tension needed for thick fabric will punch holes and tear the thin fabric.`,
      warnings: [],
    };
  }

  // Advisory warnings for compatible combinations
  const warnings = [];
  if (thickDiff === 1) {
    warnings.push('Medium and thick/thin combination: press seams open with steam to reduce bulk at the intersection.');
  }

  const fraysA = pieceA.frays !== false;
  const fraysB = pieceB.frays !== false;
  if (fraysA || fraysB) {
    warnings.push('Fraying fabric present: overlock or zig-zag the seam allowance to prevent edge unraveling.');
  }

  return {
    compatible: true,
    reason: 'Fabrics are structurally compatible to be joined in the same panel.',
    warnings,
  };
}

/**
 * Validates an entire group/panel of pieces to verify all pairs can coexist.
 */
export function checkPanelFabricCompatibility(pieces) {
  if (!pieces || pieces.length <= 1) {
    return { compatible: true, reasons: [], warnings: [] };
  }

  const reasons = [];
  const warnings = [];

  for (let i = 0; i < pieces.length; i++) {
    for (let j = i + 1; j < pieces.length; j++) {
      const check = checkFabricPairCompatibility(pieces[i], pieces[j]);
      if (!check.compatible) {
        reasons.push(check.reason);
      } else if (check.warnings.length > 0) {
        warnings.push(...check.warnings);
      }
    }
  }

  return {
    compatible: reasons.length === 0,
    reasons: [...new Set(reasons)],
    warnings: [...new Set(warnings)],
  };
}
