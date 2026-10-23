/**
 * REWEAR STAGE 2 — AESTHETIC DESIGN SCORING & TIME ESTIMATOR
 * 
 * Plain-words explanation:
 * Tailors and consumers do not buy or wear a patchwork item just because it saved fabric;
 * they buy it because it LOOKS GOOD and is well made.
 * 
 * This module evaluates how visually appealing and practical a proposed design is:
 * 1. Colour Balance (35%): How well the design follows the 60-30-10 visual rule,
 *    rewards harmonious tonal/neutral palettes, and penalizes clashing vibrations.
 * 2. Seam Simplicity (25%): Fewer seams mean cleaner, less bulky tailoring.
 * 3. Patch Size Quality (15%): Rewards large, clean cuts and penalizes fidgety tiny patches (< 5cm).
 * 4. Fabric Uniformity (10%): Consistent drape and needle weight across panels.
 * 5. Minimal Waste (15%): Efficient scrap utilization.
 * 
 * Ranking Philosophy (Rule from brief):
 * "Rank product suggestions by looks first, waste second."
 * 
 * Estimated Making Time:
 * Calculated from base product construction time + minutes per joined seam + fraying overlock time.
 * 
 * Assumptions:
 * - A single-panel cut is visually superior to a heavily fragmented multi-piece seam.
 * - Standard industrial sewing time per patchwork joint is estimated at 3.5 minutes.
 */

import { CONFIG } from './config.js';
import { evaluateColorPair } from './color.js';
import { PRODUCT_TEMPLATES } from './templates.js';

/**
 * Computes aesthetic score for 60-30-10 balance and colour harmony.
 */
export function scoreColorHarmony(placements, zoningBreakdown) {
  let score = 80;

  // 1. Adherence to 60-30-10 breakdown
  if (zoningBreakdown) {
    const baseDiff = Math.abs((zoningBreakdown.basePct || 60) - CONFIG.ZONE_BASE_TARGET_PCT);
    const suppDiff = Math.abs((zoningBreakdown.supportingPct || 30) - CONFIG.ZONE_SUPPORTING_TARGET_PCT);
    const accDiff = Math.abs((zoningBreakdown.accentPct || 10) - CONFIG.ZONE_ACCENT_TARGET_PCT);

    const totalDeviation = baseDiff + suppDiff + accDiff;
    if (totalDeviation <= 15) score += 15;
    else if (totalDeviation <= 30) score += 5;
    else score -= 15;
  }

  // 2. Check colour pairings across adjacent placements
  let clashCount = 0;
  let harmoniousCount = 0;

  for (let i = 0; i < placements.length; i++) {
    for (let j = i + 1; j < placements.length; j++) {
      const c1 = placements[i].scraps?.[0]?.color || placements[i].color || placements[i].dominantColor;
      const c2 = placements[j].scraps?.[0]?.color || placements[j].color || placements[j].dominantColor;
      if (c1 && c2) {
        const evalResult = evaluateColorPair(c1, c2);
        if (evalResult.clashRisk) clashCount++;
        if (evalResult.relationship === 'tonal' || evalResult.relationship === 'neutral-compatible') {
          harmoniousCount++;
        }
      }
    }
  }

  if (clashCount > 0) score -= clashCount * 25;
  if (harmoniousCount >= 2) score += 10;

  return Math.max(10, Math.min(100, score));
}

/**
 * Computes score for seam simplicity (fewer seams = cleaner look, less bulk).
 */
export function scoreSeamSimplicity(totalExtraSeams) {
  if (totalExtraSeams === 0) return 100;
  if (totalExtraSeams === 1) return 88;
  if (totalExtraSeams === 2) return 76;
  if (totalExtraSeams <= 4) return 60;
  if (totalExtraSeams <= 6) return 48;
  if (totalExtraSeams <= 9) return 35;
  return 20;
}

/**
 * Computes score for patch size quality (penalizes patches < 5 cm and high patch fragmentation).
 */
export function scorePatchSizeQuality(placements) {
  let minDim = 999;
  let totalPatches = 0;

  placements.forEach((p) => {
    totalPatches += p.scraps.length;
    p.scraps.forEach((s) => {
      if (s.cutWidth) minDim = Math.min(minDim, s.cutWidth);
      if (s.cutHeight) minDim = Math.min(minDim, s.cutHeight);
    });
  });

  let score = 100;
  if (minDim < CONFIG.MIN_RECOMMENDED_PATCH_DIMENSION_CM) {
    score = 45; // Tiny patches below 5 cm
  } else if (minDim < 10) {
    score = 70;
  } else if (minDim < 16) {
    score = 85;
  }

  // Fragmentation penalty: designs pieced from many small patches lose points for looking busy
  if (totalPatches > 12) {
    score = Math.max(30, score - 25);
  } else if (totalPatches > 8) {
    score = Math.max(40, score - 15);
  } else if (totalPatches > 5) {
    score = Math.max(50, score - 5);
  }

  return score;
}

/**
 * Computes score for minimal waste.
 */
export function scoreMinimalWaste(wastePercentage) {
  if (wastePercentage <= 8) return 100;
  if (wastePercentage <= 18) return 85;
  if (wastePercentage <= 28) return 70;
  return 45;
}

/**
 * Computes labour penalty derived from seam count and estimated sewing time.
 * Exempts the 4 classic rectangle products so their scores never change.
 */
export function computeLabourPenalty(productId, totalExtraSeams, estimatedTimeMinutes) {
  const cfg = CONFIG.LABOUR_PENALTY;
  if (!cfg) return 0;
  if (cfg.EXEMPT_PRODUCT_IDS && cfg.EXEMPT_PRODUCT_IDS.includes(productId)) {
    return 0;
  }

  let penalty = 0;

  // 1. Seam count penalty
  const numSeams = Number(totalExtraSeams);
  const excessSeams = Math.max(0, (Number.isNaN(numSeams) ? 0 : numSeams) - cfg.SEAM_THRESHOLD);
  penalty += excessSeams * cfg.POINTS_PER_EXCESS_SEAM;

  // 2. Sewing time penalty
  const numTime = Number(estimatedTimeMinutes);
  const excessMins = Math.max(0, (Number.isNaN(numTime) ? 0 : numTime) - cfg.TIME_THRESHOLD_MINUTES);
  penalty += (excessMins / 10) * cfg.POINTS_PER_10_MINS_EXCESS;

  const finalPenalty = Math.min(cfg.MAX_LABOUR_PENALTY, Math.round(penalty));
  return Number.isNaN(finalPenalty) ? 0 : Math.max(0, finalPenalty);
}

/**
 * Calculates the comprehensive Design / Aesthetic Score (0-100).
 */
export function calculateDesignScore(fitResult) {
  if (!fitResult || !fitResult.fits) return 0;

  const sColor = scoreColorHarmony(fitResult.placements, fitResult.zoningBreakdown);
  const sSeams = scoreSeamSimplicity(fitResult.totalExtraSeams || 0);
  const sPatch = scorePatchSizeQuality(fitResult.placements);
  const sWaste = scoreMinimalWaste(fitResult.wastePercentage || 0);
  const sFabric = 90; // Default compatible fabric rating

  const weights = CONFIG.SCORE_WEIGHTS;

  const totalScore =
    sColor * weights.COLOR_HARMONY +
    sSeams * weights.SEAM_SIMPLICITY +
    sPatch * weights.PATCH_SIZE_QUALITY +
    sFabric * weights.FABRIC_UNIFORMITY +
    sWaste * weights.MINIMAL_WASTE;

  let adjustedScore = totalScore;
  if (fitResult.hasAnchorWarning || (fitResult.warnings && fitResult.warnings.some((w) => w.includes('more premium')))) {
    adjustedScore -= (CONFIG.SMALL_PATCH_WARNING_PENALTY || 15);
  }

  // Deduct labour penalty for apparel garments (exempt for 4 rectangle products)
  const estTime = fitResult.estimatedTimeMinutes || calculateEstimatedTime(fitResult.productId, fitResult.totalExtraSeams || 0, false);
  const labourPenalty = computeLabourPenalty(fitResult.productId, fitResult.totalExtraSeams || 0, estTime);
  adjustedScore -= (Number.isNaN(labourPenalty) ? 0 : labourPenalty);

  const finalScore = Math.round(Math.max(15, Math.min(99, adjustedScore)));
  return Number.isNaN(finalScore) ? 15 : finalScore;
}

/**
 * Calculates estimated sewing time in minutes.
 */
export function calculateEstimatedTime(productId, totalExtraSeams, hasFraying) {
  const prod = typeof productId === 'object' && productId !== null
    ? productId
    : PRODUCT_TEMPLATES?.[productId];
  const prodId = typeof productId === 'object' && productId !== null
    ? productId.id
    : productId;
  const baseMinutes = (prodId && CONFIG.BASE_SEWING_MINUTES[prodId]) ||
                      (prod?.construction ? CONFIG.BASE_SEWING_MINUTES[prod.construction] : null) ||
                      45;
  const numSeams = Number(totalExtraSeams);
  const piecingMinutes = (Number.isNaN(numSeams) ? 0 : numSeams) * CONFIG.MINUTES_PER_EXTRA_SEAM;
  const frayingMinutes = hasFraying ? CONFIG.MINUTES_FOR_FRAYING_FINISH : 0;

  const finalTime = Math.round(baseMinutes + piecingMinutes + frayingMinutes);
  return Number.isNaN(finalTime) ? 45 : finalTime;
}

/**
 * Ranks an array of product suggestions by:
 * 1. Feasibility (fits first)
 * 2. Looks / Aesthetic Design Score (looks first!)
 * 3. Waste Percentage (minimal waste second!)
 */
export function rankSuggestions(suggestions) {
  return [...suggestions].sort((a, b) => {
    // 1. Feasible designs first
    if (a.fits && !b.fits) return -1;
    if (!a.fits && b.fits) return 1;

    if (a.fits && b.fits) {
      // 2. Rank by looks first (design score)
      if (b.designScore !== a.designScore) {
        return b.designScore - a.designScore;
      }
      // 3. Rank by waste second (lower waste is better)
      return a.wastePercentage - b.wastePercentage;
    }

    // Both don't fit: prioritize higher potential area match
    return (b.finishedAreaCoveredCm2 || 0) - (a.finishedAreaCoveredCm2 || 0);
  });
}
