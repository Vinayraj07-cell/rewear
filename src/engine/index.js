/**
 * REWEAR STAGE 2 — MASTER ENGINE API
 * 
 * Plain-words explanation:
 * This is the public API entry point for the Stage 2 tailoring engine.
 * It provides three primary functions that operate completely independently of any UI:
 * 
 * 1. suggestProducts(pile, options)
 *    Scans the tailor's fabric pile across all product templates (Tote Bag, Pouch,
 *    Cushion Cover, Kids' Frock) and available sizes. Calculates 60-30-10 colour zoning,
 *    physical piece fitting, seam allowances, and aesthetic design scores.
 *    Ranks suggestions by LOOKS FIRST, WASTE SECOND.
 * 
 * 2. buildDesign(pile, productId, sizeKey, style)
 *    Generates the exact cutting and layout blueprint for a chosen product, size,
 *    and pattern style (e.g. patchwork, vertical strips, plain base).
 *    Identifies which scrap goes into which zone, seam allowances, rotation, and
 *    saved offcuts (>= 3 cm).
 * 
 * 3. checkFeasibility(designOrParams)
 *    A strict YES/NO checker that verifies whether a proposed project can physically
 *    and aesthetically be stitched. If NO, provides the exact reason (missing dimensions,
 *    fabric thickness clash, stretch mismatch, or missing base colour) and suggestions.
 * 
 * Assumptions:
 * - Pile input is an array of piece objects containing id, width, height (cm),
 *   quantity, fabricType, thickness, stretchy, and color/print.
 * - Missing fabric calculations assume a 1 cm seam allowance unless configured otherwise.
 */

import { CONFIG } from './config.js';
import { PRODUCT_TEMPLATES } from './templates.js';
import { fitPileToProduct } from './fitting.js';
import { calculateDesignScore, calculateEstimatedTime, rankSuggestions } from './scoring.js';
import { checkPanelFabricCompatibility } from './fabricCompatibility.js';

// Re-export submodules for standalone testing and modular access
export { CONFIG } from './config.js';
export {
  parseColorToRgb,
  rgbToXyz,
  xyzToLab,
  labToLch,
  getColorMetrics,
  getHueDifference,
  evaluateColorPair,
  checkPrintAdjacency,
} from './color.js';
export {
  checkFabricPairCompatibility,
  checkPanelFabricCompatibility,
  isPieceStretchy,
  getThicknessLevel,
} from './fabricCompatibility.js';
export {
  PRODUCT_TEMPLATES,
  getProductRequirements,
  getZoneCutDimensions,
  getProductLargestZone,
  TAILOR_DISCLAIMER,
} from './templates.js';
export { assignZoningRoles } from './zoning.js';
export { fitPileToProduct, canFitSinglePiece, tryJoinTwoPieces, tryMultiPiecePatchwork, cutScrap } from './fitting.js';
export { calculateDesignScore, calculateEstimatedTime, rankSuggestions } from './scoring.js';

/**
 * API 1: suggestProducts(pile, options)
 * Evaluates all available product templates and sizes against the provided fabric pile.
 */
export function suggestProducts(pile, options = {}) {
  if (!pile || pile.length === 0) {
    return {
      success: false,
      message: 'Pile is empty. Please provide at least one fabric piece.',
      suggestions: [],
    };
  }

  const seamAllowanceCm = options.seamAllowanceCm || CONFIG.SEAM_ALLOWANCE_CM;
  const rawSuggestions = [];

  // Iterate through all products and their sizes
  Object.keys(PRODUCT_TEMPLATES).forEach((productId) => {
    const product = PRODUCT_TEMPLATES[productId];
    Object.keys(product.sizes).forEach((sizeKey) => {
      const sizeObj = product.sizes[sizeKey];
      const fitResult = fitPileToProduct(pile, productId, sizeKey, seamAllowanceCm);

      const hasFraying = pile.some((p) => p.frays !== false);
      const designScore = calculateDesignScore(fitResult);
      const estimatedTimeMinutes = calculateEstimatedTime(productId, fitResult.totalExtraSeams, hasFraying);

      // Construct tailored "Why this design" explanation
      const whyReasons = [];
      if (fitResult.fits) {
        whyReasons.push(`All ${fitResult.placements.length} zones covered with compatible fabric weights.`);
        if (designScore >= 80) whyReasons.push('Harmonious 60-30-10 colour balance with calm base.');
        if (fitResult.wastePercentage <= 15) whyReasons.push(`Minimal fabric waste (${fitResult.wastePercentage}% trim).`);
        if (fitResult.totalExtraSeams === 0) {
          whyReasons.push('Clean single-panel cuts with zero extra pieced seams.');
        } else {
          whyReasons.push('Pieced panels lose fabric in seams, so small scraps cover less than their raw area.');
        }
      } else {
        // Fallback exploration: When a product doesn't fit, try plain variant and smaller sizes
        let alternativeNote = null;

        // 1. Try plain variant if currently evaluated as decorated
        if (options.variant === 'decorated' || fitResult.variant === 'decorated') {
          const plainCheck = fitPileToProduct(pile, productId, sizeKey, seamAllowanceCm, { variant: 'plain' });
          if (plainCheck.fits) {
            alternativeNote = `Your pile can make the plain ${productId === 'cushion_cover' ? 'cushion' : product.name.toLowerCase()} instead.`;
          }
        }

        // 2. Try smaller sizes of the same product (in plain variant)
        if (!alternativeNote) {
          const sizeKeys = Object.keys(product.sizes);
          const currentIndex = sizeKeys.indexOf(sizeKey);
          if (currentIndex > 0) {
            for (let i = currentIndex - 1; i >= 0; i--) {
              const smallerKey = sizeKeys[i];
              const smallerFit = fitPileToProduct(pile, productId, smallerKey, seamAllowanceCm, { variant: 'plain' });
              if (smallerFit.fits) {
                if (productId === 'cushion_cover') {
                  alternativeNote = 'Your pile can make the small cushion instead.';
                } else if (productId === 'pouch') {
                  alternativeNote = 'Your pile can make the small pouch instead.';
                } else if (productId === 'tote_bag') {
                  alternativeNote = 'Your pile can make the small tote bag instead.';
                } else {
                  alternativeNote = `Your pile can make the smaller ${product.name} instead.`;
                }
                break;
              }
            }
          }
        }

        if (alternativeNote) {
          fitResult.fallbackRecommendation = alternativeNote;
          if (!fitResult.suggestions) fitResult.suggestions = [];
          fitResult.suggestions.unshift(alternativeNote);
          fitResult.missing = `${fitResult.missing} ${alternativeNote}`;
          whyReasons.push(alternativeNote);
        }

        whyReasons.push(fitResult.missing || 'Partial fit: additional scraps required.');
      }

      rawSuggestions.push({
        productId,
        productName: product.name,
        category: product.category,
        sizeKey,
        sizeLabel: sizeObj.label,
        variant: fitResult.variant || 'plain',
        fits: fitResult.fits,
        designScore,
        estimatedTimeMinutes,
        wastePercentage: fitResult.wastePercentage,
        fabricUsedInSeamsCm2: fitResult.fabricUsedInSeamsCm2 || 0,
        fabricTooSmallToReuseCm2: fitResult.fabricTooSmallToReuseCm2 || 0,
        seamLossExplanation: fitResult.seamLossExplanation,
        fallbackRecommendation: fitResult.fallbackRecommendation || null,
        warnings: fitResult.warnings || [],
        hasAnchorWarning: Boolean(fitResult.hasAnchorWarning),
        placementsCount: fitResult.placements.length,
        totalExtraSeams: fitResult.totalExtraSeams,
        placements: fitResult.placements,
        leftovers: fitResult.leftovers,
        reusableLeftoversCount: fitResult.leftovers.length,
        missing: fitResult.missing,
        suggestions: fitResult.suggestions || [],
        whyThisDesign: whyReasons,
        disclaimer: product.disclaimer,
      });
    });
  });

  // Rank by: fits first, looks (design score) second, waste percentage third
  const ranked = rankSuggestions(rawSuggestions);

  return {
    success: true,
    totalSuggestionsEvaluated: ranked.length,
    feasibleCount: ranked.filter((s) => s.fits).length,
    suggestions: ranked,
  };
}

/**
 * API 2: buildDesign(pile, productId, sizeKey, style)
 * Generates an exact blueprint layout and cutting plan for a chosen product, size, and pattern style.
 */
export function buildDesign(pile, productId, sizeKey, style = 'patchwork', options = {}) {
  const product = PRODUCT_TEMPLATES[productId];
  if (!product) {
    return {
      success: false,
      error: `Invalid product ID: ${productId}`,
    };
  }

  const size = product.sizes[sizeKey];
  if (!size) {
    return {
      success: false,
      error: `Invalid size key: ${sizeKey} for product ${productId}`,
    };
  }

  const seamAllowanceCm = options.seamAllowanceCm || CONFIG.SEAM_ALLOWANCE_CM;
  const fitResult = fitPileToProduct(pile, productId, sizeKey, seamAllowanceCm);

  const hasFraying = pile.some((p) => p.frays !== false);
  const designScore = calculateDesignScore(fitResult);
  const estimatedTimeMinutes = calculateEstimatedTime(productId, fitResult.totalExtraSeams, hasFraying);

  return {
    success: true,
    productId,
    productName: product.name,
    sizeKey,
    sizeLabel: size.label,
    style,
    fits: fitResult.fits,
    designScore,
    estimatedTimeMinutes,
    seamAllowanceCm,
    placements: fitResult.placements,
    leftovers: fitResult.leftovers,
    wastePercentage: fitResult.wastePercentage,
    fabricUsedInSeamsCm2: fitResult.fabricUsedInSeamsCm2 || 0,
    fabricTooSmallToReuseCm2: fitResult.fabricTooSmallToReuseCm2 || 0,
    seamLossExplanation: fitResult.seamLossExplanation,
    variant: fitResult.variant || 'plain',
    warnings: fitResult.warnings || [],
    hasAnchorWarning: Boolean(fitResult.hasAnchorWarning),
    totalExtraSeams: fitResult.totalExtraSeams,
    missing: fitResult.missing,
    missingDetails: fitResult.missingDetails,
    zoningBreakdown: fitResult.zoningBreakdown,
    disclaimer: product.disclaimer,
  };
}

/**
 * API 3: checkFeasibility(designOrParams)
 * Validates whether a design is physically and aesthetically feasible.
 */
export function checkFeasibility(designOrParams) {
  // If already a fitResult / design object
  if (designOrParams && typeof designOrParams.fits === 'boolean') {
    return {
      isFeasible: designOrParams.fits,
      missing: designOrParams.missing || null,
      suggestions: designOrParams.suggestions || [],
      designScore: designOrParams.designScore || 0,
      wastePercentage: designOrParams.wastePercentage || 0,
    };
  }

  // If parameters passed: { pile, productId, sizeKey }
  const { pile, productId, sizeKey, seamAllowanceCm } = designOrParams || {};
  if (!pile || !productId || !sizeKey) {
    return {
      isFeasible: false,
      missing: 'Missing required parameters (pile, productId, sizeKey).',
      suggestions: [],
    };
  }

  const result = buildDesign(pile, productId, sizeKey, 'default', { seamAllowanceCm });
  return {
    isFeasible: result.fits,
    missing: result.missing,
    suggestions: result.missingDetails || [],
    designScore: result.designScore,
    wastePercentage: result.wastePercentage,
  };
}
