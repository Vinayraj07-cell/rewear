/**
 * REWEAR STAGE 2 — PRODUCT TEMPLATES (RECTANGLE-BASED VERSION 1)
 * 
 * Plain-words explanation:
 * In this first version, all garment and accessory patterns are broken down strictly
 * into rectangular zones (panels, strips, bands, pockets). Rectangles are the easiest
 * shapes for tailors and home sewers to piece together cleanly from fabric scraps
 * without complex curved rulers.
 * 
 * DISCLAIMER & HONESTY RULE:
 * Every measurement here is clearly marked as "TO BE VERIFIED BY A TAILOR".
 * The app does not pretend to give millimeter-exact bespoke couture patterns;
 * it provides realistic scrap cutting guides that a tailor can verify before cutting.
 * 
 * Included Products:
 * 1. Tote Bag (Sizes: small, medium, large)
 * 2. Pouch (Sizes: small, medium, large)
 * 3. Cushion Cover (Sizes: small, medium, large - envelope back, no zipper required)
 * 4. Kids' Frock (Sizes: 0-1y, 2-3y, 4-5y, 6-8y - rectangle pinafore/slip frock)
 * 
 * Assumptions:
 * - Seam allowances default to 1.0 cm on all four edges of each rectangular piece.
 * - Envelope cushion covers use two overlapping back rectangles so no zipper is required.
 */

import { CONFIG } from './config.js';

export const TAILOR_DISCLAIMER =
  'All pattern measurements are rectangle-based approximations for scrap cutting and must be verified by a professional tailor before final cutting.';

export const PRODUCT_TEMPLATES = {
  // =========================================================================
  // 1. TOTE BAG
  // =========================================================================
  tote_bag: {
    id: 'tote_bag',
    name: 'Quilted Tote Bag',
    category: 'bags',
    description: 'Sturdy shopping or market bag with reinforced handles and optional front scrap pocket.',
    verifiedByTailor: false,
    disclaimer: TAILOR_DISCLAIMER,
    sizes: {
      small: {
        label: 'Small (Book/Lunch Tote)',
        finishedWidthCm: 28,
        finishedHeightCm: 30,
        zones: [
          { id: 'body_front', name: 'Front Main Body', role: 'base', width: 28, height: 30, qty: 1 },
          { id: 'body_back', name: 'Back Main Body', role: 'base', width: 28, height: 30, qty: 1 },
          { id: 'top_facing', name: 'Top Facing Band', role: 'supporting', width: 28, height: 6, qty: 2 },
          { id: 'handles', name: 'Carry Handles', role: 'supporting', width: 8, height: 45, qty: 2 },
          { id: 'front_pocket', name: 'Accent Patch Pocket', role: 'accent', width: 14, height: 14, qty: 1, accentOnly: true },
        ],
      },
      medium: {
        label: 'Medium (Everyday Market Tote)',
        finishedWidthCm: 36,
        finishedHeightCm: 38,
        zones: [
          { id: 'body_front', name: 'Front Main Body', role: 'base', width: 36, height: 38, qty: 1 },
          { id: 'body_back', name: 'Back Main Body', role: 'base', width: 36, height: 38, qty: 1 },
          { id: 'bottom_gusset', name: 'Bottom Gusset Reinforcement', role: 'supporting', width: 36, height: 10, qty: 1 },
          { id: 'top_facing', name: 'Top Facing Band', role: 'supporting', width: 36, height: 8, qty: 2 },
          { id: 'handles', name: 'Carry Handles', role: 'supporting', width: 10, height: 55, qty: 2 },
          { id: 'front_pocket', name: 'Accent Patch Pocket', role: 'accent', width: 18, height: 16, qty: 1, accentOnly: true },
        ],
      },
      large: {
        label: 'Large (Weekend Carry-All)',
        finishedWidthCm: 44,
        finishedHeightCm: 42,
        zones: [
          { id: 'body_front', name: 'Front Main Body', role: 'base', width: 44, height: 42, qty: 1 },
          { id: 'body_back', name: 'Back Main Body', role: 'base', width: 44, height: 42, qty: 1 },
          { id: 'bottom_gusset', name: 'Bottom Gusset Reinforcement', role: 'supporting', width: 44, height: 12, qty: 1 },
          { id: 'top_facing', name: 'Top Facing Band', role: 'supporting', width: 44, height: 10, qty: 2 },
          { id: 'handles', name: 'Carry Handles', role: 'supporting', width: 10, height: 65, qty: 2 },
          { id: 'front_pocket', name: 'Accent Patch Pocket', role: 'accent', width: 22, height: 18, qty: 1, accentOnly: true },
        ],
      },
    },
  },

  // =========================================================================
  // 2. ZIPPER POUCH
  // =========================================================================
  pouch: {
    id: 'pouch',
    name: 'Zippered Utility Pouch',
    category: 'accessories',
    description: 'Compact pouch for stationery, makeup, tailoring tools, or coins.',
    verifiedByTailor: false,
    disclaimer: TAILOR_DISCLAIMER,
    sizes: {
      small: {
        label: 'Small (Coin & Card Pouch)',
        finishedWidthCm: 14,
        finishedHeightCm: 11,
        zones: [
          { id: 'pouch_front_base', name: 'Front Lower Panel', role: 'base', width: 14, height: 8, qty: 1 },
          { id: 'pouch_back', name: 'Back Full Panel', role: 'base', width: 14, height: 11, qty: 1 },
          { id: 'pouch_upper_band', name: 'Upper Zipper Trim Band', role: 'supporting', width: 14, height: 3, qty: 1 },
          { id: 'pouch_pull_tabs', name: 'Zipper End Pull Tabs', role: 'accent', width: 5, height: 6, qty: 2, accentOnly: true },
        ],
      },
      medium: {
        label: 'Medium (Stationery / Makeup Pouch)',
        finishedWidthCm: 22,
        finishedHeightCm: 15,
        zones: [
          { id: 'pouch_front_base', name: 'Front Lower Panel', role: 'base', width: 22, height: 10, qty: 1 },
          { id: 'pouch_back', name: 'Back Full Panel', role: 'base', width: 22, height: 15, qty: 1 },
          { id: 'pouch_upper_band', name: 'Upper Accent Band', role: 'supporting', width: 22, height: 5, qty: 1 },
          { id: 'pouch_side_tabs', name: 'Decorative Side Tabs', role: 'accent', width: 6, height: 8, qty: 2, accentOnly: true },
        ],
      },
      large: {
        label: 'Large (Travel Toiletry Kit)',
        finishedWidthCm: 28,
        finishedHeightCm: 19,
        zones: [
          { id: 'pouch_front_base', name: 'Front Lower Panel', role: 'base', width: 28, height: 13, qty: 1 },
          { id: 'pouch_back', name: 'Back Full Panel', role: 'base', width: 28, height: 19, qty: 1 },
          { id: 'pouch_upper_band', name: 'Upper Contrast Band', role: 'supporting', width: 28, height: 6, qty: 1 },
          { id: 'pouch_divider', name: 'Front Accent Stripe', role: 'accent', width: 28, height: 4, qty: 1, accentOnly: true },
        ],
      },
    },
  },

  // =========================================================================
  // 3. CUSHION COVER (ENVELOPE BACK - ZERO ZIPPER NEEDED)
  // =========================================================================
  cushion_cover: {
    id: 'cushion_cover',
    name: 'Patchwork Cushion Cover',
    category: 'home',
    description: 'Envelope-back cushion cover with framed patchwork center. No zipper required.',
    verifiedByTailor: false,
    disclaimer: TAILOR_DISCLAIMER,
    sizes: {
      small: {
        label: 'Small (30 × 30 cm)',
        finishedWidthCm: 30,
        finishedHeightCm: 30,
        zones: [
          { id: 'center_field', name: 'Front Main Field', role: 'base', width: 22, height: 22, qty: 1 },
          { id: 'frame_top_bottom', name: 'Front Frame Strips (Top & Bottom)', role: 'supporting', width: 30, height: 4, qty: 2 },
          { id: 'frame_sides', name: 'Front Frame Strips (Sides)', role: 'supporting', width: 4, height: 22, qty: 2 },
          { id: 'center_patch', name: 'Center Contrast Motif', role: 'accent', width: 10, height: 10, qty: 1, accentOnly: true },
          { id: 'envelope_back_top', name: 'Envelope Back Upper Overlap', role: 'base', width: 30, height: 20, qty: 1 },
          { id: 'envelope_back_bottom', name: 'Envelope Back Lower Overlap', role: 'base', width: 30, height: 18, qty: 1 },
        ],
      },
      medium: {
        label: 'Medium (40 × 40 cm)',
        finishedWidthCm: 40,
        finishedHeightCm: 40,
        zones: [
          { id: 'center_field', name: 'Front Main Field', role: 'base', width: 30, height: 30, qty: 1 },
          { id: 'frame_top_bottom', name: 'Front Frame Strips (Top & Bottom)', role: 'supporting', width: 40, height: 5, qty: 2 },
          { id: 'frame_sides', name: 'Front Frame Strips (Sides)', role: 'supporting', width: 5, height: 30, qty: 2 },
          { id: 'center_patch', name: 'Center Contrast Motif', role: 'accent', width: 14, height: 14, qty: 1, accentOnly: true },
          { id: 'envelope_back_top', name: 'Envelope Back Upper Overlap', role: 'base', width: 40, height: 26, qty: 1 },
          { id: 'envelope_back_bottom', name: 'Envelope Back Lower Overlap', role: 'base', width: 40, height: 24, qty: 1 },
        ],
      },
      large: {
        label: 'Large (50 × 50 cm)',
        finishedWidthCm: 50,
        finishedHeightCm: 50,
        zones: [
          { id: 'center_field', name: 'Front Main Field', role: 'base', width: 38, height: 38, qty: 1 },
          { id: 'frame_top_bottom', name: 'Front Frame Strips (Top & Bottom)', role: 'supporting', width: 50, height: 6, qty: 2 },
          { id: 'frame_sides', name: 'Front Frame Strips (Sides)', role: 'supporting', width: 6, height: 38, qty: 2 },
          { id: 'center_patch', name: 'Center Contrast Motif', role: 'accent', width: 18, height: 18, qty: 1, accentOnly: true },
          { id: 'envelope_back_top', name: 'Envelope Back Upper Overlap', role: 'base', width: 50, height: 32, qty: 1 },
          { id: 'envelope_back_bottom', name: 'Envelope Back Lower Overlap', role: 'base', width: 50, height: 30, qty: 1 },
        ],
      },
    },
  },

  // =========================================================================
  // 4. KIDS' FROCK (RECTANGLE PINAFORE / SLIP DRESS)
  // =========================================================================
  kids_frock: {
    id: 'kids_frock',
    name: "Kids' Patchwork Frock",
    category: 'apparel',
    description: 'Easy-sew rectangular pinafore frock with gathered skirt tier, bodice, and accent bow/pocket.',
    verifiedByTailor: false,
    disclaimer: TAILOR_DISCLAIMER,
    sizes: {
      '0-1y': {
        label: 'Infant (0–1 Year)',
        finishedWidthCm: 45,
        finishedHeightCm: 38,
        zones: [
          { id: 'skirt_front', name: 'Front Gathered Skirt Tier', role: 'base', width: 45, height: 22, qty: 1 },
          { id: 'skirt_back', name: 'Back Gathered Skirt Tier', role: 'base', width: 45, height: 22, qty: 1 },
          { id: 'bodice_front', name: 'Front Chest Bodice', role: 'supporting', width: 22, height: 12, qty: 1 },
          { id: 'bodice_back', name: 'Back Chest Bodice', role: 'base', width: 22, height: 12, qty: 1 },
          { id: 'skirt_hem_band', name: 'Skirt Hem Border Band', role: 'supporting', width: 45, height: 5, qty: 2 },
          { id: 'straps_pocket', name: 'Shoulder Ties & Patch Pocket', role: 'accent', width: 6, height: 22, qty: 2, accentOnly: true },
        ],
      },
      '2-3y': {
        label: 'Toddler (2–3 Years)',
        finishedWidthCm: 55,
        finishedHeightCm: 48,
        zones: [
          { id: 'skirt_front', name: 'Front Gathered Skirt Tier', role: 'base', width: 55, height: 28, qty: 1 },
          { id: 'skirt_back', name: 'Back Gathered Skirt Tier', role: 'base', width: 55, height: 28, qty: 1 },
          { id: 'bodice_front', name: 'Front Chest Bodice', role: 'supporting', width: 26, height: 14, qty: 1 },
          { id: 'bodice_back', name: 'Back Chest Bodice', role: 'base', width: 26, height: 14, qty: 1 },
          { id: 'skirt_hem_band', name: 'Skirt Hem Border Band', role: 'supporting', width: 55, height: 6, qty: 2 },
          { id: 'straps_pocket', name: 'Shoulder Ties & Patch Pocket', role: 'accent', width: 6, height: 26, qty: 2, accentOnly: true },
        ],
      },
      '4-5y': {
        label: 'Young Child (4–5 Years)',
        finishedWidthCm: 65,
        finishedHeightCm: 58,
        zones: [
          { id: 'skirt_front', name: 'Front Gathered Skirt Tier', role: 'base', width: 65, height: 35, qty: 1 },
          { id: 'skirt_back', name: 'Back Gathered Skirt Tier', role: 'base', width: 65, height: 35, qty: 1 },
          { id: 'bodice_front', name: 'Front Chest Bodice', role: 'supporting', width: 30, height: 16, qty: 1 },
          { id: 'bodice_back', name: 'Back Chest Bodice', role: 'base', width: 30, height: 16, qty: 1 },
          { id: 'skirt_hem_band', name: 'Skirt Hem Border Band', role: 'supporting', width: 65, height: 7, qty: 2 },
          { id: 'straps_pocket', name: 'Shoulder Ties & Patch Pocket', role: 'accent', width: 7, height: 30, qty: 2, accentOnly: true },
        ],
      },
      '6-8y': {
        label: 'Child (6–8 Years)',
        finishedWidthCm: 75,
        finishedHeightCm: 68,
        zones: [
          { id: 'skirt_front', name: 'Front Gathered Skirt Tier', role: 'base', width: 75, height: 42, qty: 1 },
          { id: 'skirt_back', name: 'Back Gathered Skirt Tier', role: 'base', width: 75, height: 42, qty: 1 },
          { id: 'bodice_front', name: 'Front Chest Bodice', role: 'supporting', width: 34, height: 18, qty: 1 },
          { id: 'bodice_back', name: 'Back Chest Bodice', role: 'base', width: 34, height: 18, qty: 1 },
          { id: 'skirt_hem_band', name: 'Skirt Hem Border Band', role: 'supporting', width: 75, height: 8, qty: 2 },
          { id: 'straps_pocket', name: 'Shoulder Ties & Contrast Pocket', role: 'accent', width: 8, height: 35, qty: 2, accentOnly: true },
        ],
      },
    },
  },
};

/**
 * Returns raw cut dimensions in cm (adding seam allowance on all 4 sides).
 */
export function getZoneCutDimensions(zone, seamAllowanceCm = CONFIG.SEAM_ALLOWANCE_CM) {
  const allowance = Number(seamAllowanceCm) || CONFIG.SEAM_ALLOWANCE_CM;
  return {
    cutWidthCm: zone.width + 2 * allowance,
    cutHeightCm: zone.height + 2 * allowance,
    finishedWidthCm: zone.width,
    finishedHeightCm: zone.height,
    areaSqCm: (zone.width + 2 * allowance) * (zone.height + 2 * allowance) * (zone.qty || 1),
    finishedAreaSqCm: zone.width * zone.height * (zone.qty || 1),
  };
}

/**
 * Identifies the largest rectangular zone for a product template and size,
 * and calculates the minimum anchor scrap dimension required by the 40% rule.
 */
export function getProductLargestZone(productId, sizeKey) {
  const product = PRODUCT_TEMPLATES[productId];
  if (!product || !product.sizes || !product.sizes[sizeKey]) return null;

  const size = product.sizes[sizeKey];
  let largestZone = null;
  let maxArea = 0;

  size.zones.forEach((zone) => {
    const area = zone.width * zone.height;
    if (area > maxArea) {
      maxArea = area;
      largestZone = zone;
    }
  });

  const maxDim = largestZone ? Math.max(largestZone.width, largestZone.height) : 20;
  const minAnchorDim = Math.max(
    CONFIG.MIN_RECOMMENDED_PATCH_DIMENSION_CM,
    Math.round(maxDim * (CONFIG.MIN_ANCHOR_ZONE_RATIO || 0.40))
  );

  return {
    productId,
    productName: product.name,
    sizeKey,
    sizeLabel: size.label,
    largestZone,
    maxDim,
    minAnchorDim,
  };
}

/**
 * Calculates total target area and 60-30-10 role breakdown for a given product and size.
 */
export function getProductRequirements(productId, sizeKey, seamAllowanceCm = CONFIG.SEAM_ALLOWANCE_CM) {
  const product = PRODUCT_TEMPLATES[productId];
  if (!product) return null;

  const size = product.sizes[sizeKey];
  if (!size) return null;

  const anchorInfo = getProductLargestZone(productId, sizeKey);

  let totalAreaNeeded = 0;
  let totalFinishedArea = 0;
  const roleAreas = { base: 0, supporting: 0, accent: 0 };
  const expandedZones = [];

  size.zones.forEach((zone) => {
    const cut = getZoneCutDimensions(zone, seamAllowanceCm);
    totalAreaNeeded += cut.areaSqCm;
    totalFinishedArea += cut.finishedAreaSqCm;
    roleAreas[zone.role] = (roleAreas[zone.role] || 0) + cut.areaSqCm;

    // Expand zones by quantity for discrete piece-by-piece fitting
    const count = zone.qty || 1;
    for (let i = 0; i < count; i++) {
      expandedZones.push({
        id: count > 1 ? `${zone.id}_${i + 1}` : zone.id,
        baseZoneId: zone.id,
        name: count > 1 ? `${zone.name} (${i + 1}/${count})` : zone.name,
        role: zone.role,
        finishedWidth: zone.width,
        finishedHeight: zone.height,
        cutWidth: zone.width + 2 * seamAllowanceCm,
        cutHeight: zone.height + 2 * seamAllowanceCm,
        accentOnly: Boolean(zone.accentOnly),
      });
    }
  });

  return {
    productId,
    productName: product.name,
    sizeKey,
    sizeLabel: size.label,
    totalAreaNeeded: Math.round(totalAreaNeeded),
    totalFinishedArea: Math.round(totalFinishedArea),
    roleAreas: {
      base: Math.round(roleAreas.base),
      supporting: Math.round(roleAreas.supporting),
      accent: Math.round(roleAreas.accent),
    },
    zones: expandedZones,
    largestZone: anchorInfo ? anchorInfo.largestZone : null,
    minAnchorDim: anchorInfo ? anchorInfo.minAnchorDim : 12,
  };
}
