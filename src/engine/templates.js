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
import { CHILD_TOP_BRIAN_DATA } from './childTopBrianData.js';

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
    defaultVariant: 'plain',
    verifiedByTailor: false,
    disclaimer: TAILOR_DISCLAIMER,
    sizes: {
      small: {
        label: 'Small (Book/Lunch Tote)',
        finishedWidthCm: 28,
        finishedHeightCm: 30,
        zones: [
          { id: 'body_front', name: 'Front Main Body', role: 'base', width: 28, height: 30, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to side edges)' } },
          { id: 'body_back', name: 'Back Main Body', role: 'base', width: 28, height: 30, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to side edges)' } },
          { id: 'top_facing', name: 'Top Facing Band', role: 'supporting', width: 28, height: 6, qty: 2, optional: false, grainLine: { orientation: 'crosswise', symbol: '↔', description: 'Crosswise grain (weft parallel to rim)' } },
          { id: 'handles', name: 'Carry Handles', role: 'supporting', width: 8, height: 45, qty: 2, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to strap for high tensile strength)' } },
          { id: 'front_pocket', name: 'Accent Patch Pocket', role: 'accent', width: 14, height: 14, qty: 1, accentOnly: true, optional: true, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp)' } },
        ],
      },
      medium: {
        label: 'Medium (Everyday Market Tote)',
        finishedWidthCm: 36,
        finishedHeightCm: 38,
        zones: [
          { id: 'body_front', name: 'Front Main Body', role: 'base', width: 36, height: 38, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to side edges)' } },
          { id: 'body_back', name: 'Back Main Body', role: 'base', width: 36, height: 38, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to side edges)' } },
          { id: 'bottom_gusset', name: 'Bottom Gusset Reinforcement', role: 'supporting', width: 36, height: 10, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to length)' } },
          { id: 'top_facing', name: 'Top Facing Band', role: 'supporting', width: 36, height: 8, qty: 2, optional: false, grainLine: { orientation: 'crosswise', symbol: '↔', description: 'Crosswise grain (weft parallel to rim)' } },
          { id: 'handles', name: 'Carry Handles', role: 'supporting', width: 10, height: 55, qty: 2, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to strap for high tensile strength)' } },
          { id: 'front_pocket', name: 'Accent Patch Pocket', role: 'accent', width: 18, height: 16, qty: 1, accentOnly: true, optional: true, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp)' } },
        ],
      },
      large: {
        label: 'Large (Weekend Carry-All)',
        finishedWidthCm: 44,
        finishedHeightCm: 42,
        zones: [
          { id: 'body_front', name: 'Front Main Body', role: 'base', width: 44, height: 42, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to side edges)' } },
          { id: 'body_back', name: 'Back Main Body', role: 'base', width: 44, height: 42, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to side edges)' } },
          { id: 'bottom_gusset', name: 'Bottom Gusset Reinforcement', role: 'supporting', width: 44, height: 12, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to length)' } },
          { id: 'top_facing', name: 'Top Facing Band', role: 'supporting', width: 44, height: 10, qty: 2, optional: false, grainLine: { orientation: 'crosswise', symbol: '↔', description: 'Crosswise grain (weft parallel to rim)' } },
          { id: 'handles', name: 'Carry Handles', role: 'supporting', width: 10, height: 65, qty: 2, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to strap for high tensile strength)' } },
          { id: 'front_pocket', name: 'Accent Patch Pocket', role: 'accent', width: 22, height: 18, qty: 1, accentOnly: true, optional: true, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp)' } },
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
    defaultVariant: 'plain',
    verifiedByTailor: false,
    disclaimer: TAILOR_DISCLAIMER,
    sizes: {
      small: {
        label: 'Small (Coin & Card Pouch)',
        finishedWidthCm: 14,
        finishedHeightCm: 11,
        zones: [
          { id: 'pouch_front_base', name: 'Front Lower Panel', role: 'base', width: 14, height: 8, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to height)' } },
          { id: 'pouch_back', name: 'Back Full Panel', role: 'base', width: 14, height: 11, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to height)' } },
          { id: 'pouch_upper_band', name: 'Upper Zipper Trim Band', role: 'supporting', width: 14, height: 3, qty: 1, optional: false, grainLine: { orientation: 'crosswise', symbol: '↔', description: 'Crosswise grain (weft parallel to zipper edge)' } },
          { id: 'pouch_pull_tabs', name: 'Zipper End Pull Tabs', role: 'accent', width: 5, height: 6, qty: 2, accentOnly: true, optional: true, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp along tab length)' } },
        ],
      },
      medium: {
        label: 'Medium (Stationery / Makeup Pouch)',
        finishedWidthCm: 22,
        finishedHeightCm: 15,
        zones: [
          { id: 'pouch_front_base', name: 'Front Lower Panel', role: 'base', width: 22, height: 10, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to height)' } },
          { id: 'pouch_back', name: 'Back Full Panel', role: 'base', width: 22, height: 15, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to height)' } },
          { id: 'pouch_upper_band', name: 'Upper Accent Band', role: 'supporting', width: 22, height: 5, qty: 1, optional: false, grainLine: { orientation: 'crosswise', symbol: '↔', description: 'Crosswise grain (weft parallel to zipper edge)' } },
          { id: 'pouch_side_tabs', name: 'Decorative Side Tabs', role: 'accent', width: 6, height: 8, qty: 2, accentOnly: true, optional: true, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp along tab length)' } },
        ],
      },
      large: {
        label: 'Large (Travel Toiletry Kit)',
        finishedWidthCm: 28,
        finishedHeightCm: 19,
        zones: [
          { id: 'pouch_front_base', name: 'Front Lower Panel', role: 'base', width: 28, height: 13, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to height)' } },
          { id: 'pouch_back', name: 'Back Full Panel', role: 'base', width: 28, height: 19, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to height)' } },
          { id: 'pouch_upper_band', name: 'Upper Contrast Band', role: 'supporting', width: 28, height: 6, qty: 1, optional: false, grainLine: { orientation: 'crosswise', symbol: '↔', description: 'Crosswise grain (weft parallel to zipper edge)' } },
          { id: 'pouch_divider', name: 'Front Accent Stripe', role: 'accent', width: 28, height: 4, qty: 1, accentOnly: true, optional: true, grainLine: { orientation: 'crosswise', symbol: '↔', description: 'Crosswise grain (weft along accent stripe)' } },
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
    description: 'Envelope-back cushion cover. Default is Plain pieced; optional Decorated variant adds frame strips and motif.',
    defaultVariant: 'plain',
    verifiedByTailor: false,
    disclaimer: TAILOR_DISCLAIMER,
    sizes: {
      small: {
        label: 'Small (30 × 30 cm)',
        finishedWidthCm: 30,
        finishedHeightCm: 30,
        variants: {
          plain: [
            { id: 'front_body', name: 'Front Main Panel', role: 'base', width: 30, height: 30, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to side edges)' } },
            { id: 'envelope_back_top', name: 'Envelope Back Upper Overlap', role: 'base', width: 30, height: 20, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to side edges)' } },
            { id: 'envelope_back_bottom', name: 'Envelope Back Lower Overlap', role: 'base', width: 30, height: 18, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to side edges)' } },
          ],
          decorated: [
            { id: 'center_field', name: 'Front Main Field', role: 'base', width: 22, height: 22, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp)' } },
            { id: 'frame_top_bottom', name: 'Front Frame Strips (Top & Bottom)', role: 'supporting', width: 30, height: 4, qty: 2, optional: false, grainLine: { orientation: 'crosswise', symbol: '↔', description: 'Crosswise grain (weft parallel to frame)' } },
            { id: 'frame_sides', name: 'Front Frame Strips (Sides)', role: 'supporting', width: 4, height: 22, qty: 2, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to frame)' } },
            { id: 'center_patch', name: 'Center Contrast Motif', role: 'accent', width: 10, height: 10, qty: 1, accentOnly: true, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp)' } },
            { id: 'envelope_back_top', name: 'Envelope Back Upper Overlap', role: 'base', width: 30, height: 20, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to side edges)' } },
            { id: 'envelope_back_bottom', name: 'Envelope Back Lower Overlap', role: 'base', width: 30, height: 18, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to side edges)' } },
          ],
        },
      },
      medium: {
        label: 'Medium (40 × 40 cm)',
        finishedWidthCm: 40,
        finishedHeightCm: 40,
        variants: {
          plain: [
            { id: 'front_body', name: 'Front Main Panel', role: 'base', width: 40, height: 40, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to side edges)' } },
            { id: 'envelope_back_top', name: 'Envelope Back Upper Overlap', role: 'base', width: 40, height: 26, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to side edges)' } },
            { id: 'envelope_back_bottom', name: 'Envelope Back Lower Overlap', role: 'base', width: 40, height: 24, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to side edges)' } },
          ],
          decorated: [
            { id: 'center_field', name: 'Front Main Field', role: 'base', width: 30, height: 30, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp)' } },
            { id: 'frame_top_bottom', name: 'Front Frame Strips (Top & Bottom)', role: 'supporting', width: 40, height: 5, qty: 2, optional: false, grainLine: { orientation: 'crosswise', symbol: '↔', description: 'Crosswise grain (weft parallel to frame)' } },
            { id: 'frame_sides', name: 'Front Frame Strips (Sides)', role: 'supporting', width: 5, height: 30, qty: 2, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to frame)' } },
            { id: 'center_patch', name: 'Center Contrast Motif', role: 'accent', width: 14, height: 14, qty: 1, accentOnly: true, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp)' } },
            { id: 'envelope_back_top', name: 'Envelope Back Upper Overlap', role: 'base', width: 40, height: 26, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to side edges)' } },
            { id: 'envelope_back_bottom', name: 'Envelope Back Lower Overlap', role: 'base', width: 40, height: 24, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to side edges)' } },
          ],
        },
      },
      large: {
        label: 'Large (50 × 50 cm)',
        finishedWidthCm: 50,
        finishedHeightCm: 50,
        variants: {
          plain: [
            { id: 'front_body', name: 'Front Main Panel', role: 'base', width: 50, height: 50, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to side edges)' } },
            { id: 'envelope_back_top', name: 'Envelope Back Upper Overlap', role: 'base', width: 50, height: 32, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to side edges)' } },
            { id: 'envelope_back_bottom', name: 'Envelope Back Lower Overlap', role: 'base', width: 50, height: 30, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to side edges)' } },
          ],
          decorated: [
            { id: 'center_field', name: 'Front Main Field', role: 'base', width: 38, height: 38, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp)' } },
            { id: 'frame_top_bottom', name: 'Front Frame Strips (Top & Bottom)', role: 'supporting', width: 50, height: 6, qty: 2, optional: false, grainLine: { orientation: 'crosswise', symbol: '↔', description: 'Crosswise grain (weft parallel to frame)' } },
            { id: 'frame_sides', name: 'Front Frame Strips (Sides)', role: 'supporting', width: 6, height: 38, qty: 2, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to frame)' } },
            { id: 'center_patch', name: 'Center Contrast Motif', role: 'accent', width: 18, height: 18, qty: 1, accentOnly: true, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp)' } },
            { id: 'envelope_back_top', name: 'Envelope Back Upper Overlap', role: 'base', width: 50, height: 32, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to side edges)' } },
            { id: 'envelope_back_bottom', name: 'Envelope Back Lower Overlap', role: 'base', width: 50, height: 30, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to side edges)' } },
          ],
        },
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
    description: 'Easy-sew rectangular pinafore frock with gathered skirt tier, bodice, and optional accent bow/pocket/border.',
    defaultVariant: 'plain',
    verifiedByTailor: false,
    disclaimer: TAILOR_DISCLAIMER,
    sizes: {
      '0-1y': {
        label: 'Infant (0–1 Year)',
        finishedWidthCm: 45,
        finishedHeightCm: 38,
        zones: [
          { id: 'skirt_front', name: 'Front Gathered Skirt Tier', role: 'base', width: 45, height: 22, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to vertical skirt hang)' } },
          { id: 'skirt_back', name: 'Back Gathered Skirt Tier', role: 'base', width: 45, height: 22, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to vertical skirt hang)' } },
          { id: 'bodice_front', name: 'Front Chest Bodice', role: 'supporting', width: 22, height: 12, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to center)' } },
          { id: 'bodice_back', name: 'Back Chest Bodice', role: 'base', width: 22, height: 12, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to center)' } },
          { id: 'skirt_hem_band', name: 'Skirt Hem Border Band', role: 'supporting', width: 45, height: 5, qty: 2, optional: true, grainLine: { orientation: 'crosswise', symbol: '↔', description: 'Crosswise grain (weft parallel to hem border)' } },
          { id: 'straps_pocket', name: 'Shoulder Ties & Patch Pocket', role: 'accent', width: 6, height: 22, qty: 2, accentOnly: true, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp along tie length for tensile strength)' } },
        ],
      },
      '2-3y': {
        label: 'Toddler (2–3 Years)',
        finishedWidthCm: 55,
        finishedHeightCm: 48,
        zones: [
          { id: 'skirt_front', name: 'Front Gathered Skirt Tier', role: 'base', width: 55, height: 28, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to vertical skirt hang)' } },
          { id: 'skirt_back', name: 'Back Gathered Skirt Tier', role: 'base', width: 55, height: 28, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to vertical skirt hang)' } },
          { id: 'bodice_front', name: 'Front Chest Bodice', role: 'supporting', width: 26, height: 14, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to center)' } },
          { id: 'bodice_back', name: 'Back Chest Bodice', role: 'base', width: 26, height: 14, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to center)' } },
          { id: 'skirt_hem_band', name: 'Skirt Hem Border Band', role: 'supporting', width: 55, height: 6, qty: 2, optional: true, grainLine: { orientation: 'crosswise', symbol: '↔', description: 'Crosswise grain (weft parallel to hem border)' } },
          { id: 'straps_pocket', name: 'Shoulder Ties & Patch Pocket', role: 'accent', width: 6, height: 26, qty: 2, accentOnly: true, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp along tie length for tensile strength)' } },
        ],
      },
      '4-5y': {
        label: 'Young Child (4–5 Years)',
        finishedWidthCm: 65,
        finishedHeightCm: 58,
        zones: [
          { id: 'skirt_front', name: 'Front Gathered Skirt Tier', role: 'base', width: 65, height: 35, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to vertical skirt hang)' } },
          { id: 'skirt_back', name: 'Back Gathered Skirt Tier', role: 'base', width: 65, height: 35, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to vertical skirt hang)' } },
          { id: 'bodice_front', name: 'Front Chest Bodice', role: 'supporting', width: 30, height: 16, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to center)' } },
          { id: 'bodice_back', name: 'Back Chest Bodice', role: 'base', width: 30, height: 16, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to center)' } },
          { id: 'skirt_hem_band', name: 'Skirt Hem Border Band', role: 'supporting', width: 65, height: 7, qty: 2, optional: true, grainLine: { orientation: 'crosswise', symbol: '↔', description: 'Crosswise grain (weft parallel to hem border)' } },
          { id: 'straps_pocket', name: 'Shoulder Ties & Patch Pocket', role: 'accent', width: 7, height: 30, qty: 2, accentOnly: true, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp along tie length for tensile strength)' } },
        ],
      },
      '6-8y': {
        label: 'Child (6–8 Years)',
        finishedWidthCm: 75,
        finishedHeightCm: 68,
        zones: [
          { id: 'skirt_front', name: 'Front Gathered Skirt Tier', role: 'base', width: 75, height: 42, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to vertical skirt hang)' } },
          { id: 'skirt_back', name: 'Back Gathered Skirt Tier', role: 'base', width: 75, height: 42, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to vertical skirt hang)' } },
          { id: 'bodice_front', name: 'Front Chest Bodice', role: 'supporting', width: 34, height: 18, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to center)' } },
          { id: 'bodice_back', name: 'Back Chest Bodice', role: 'base', width: 34, height: 18, qty: 1, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp parallel to center)' } },
          { id: 'skirt_hem_band', name: 'Skirt Hem Border Band', role: 'supporting', width: 75, height: 8, qty: 2, optional: true, grainLine: { orientation: 'crosswise', symbol: '↔', description: 'Crosswise grain (weft parallel to hem border)' } },
          { id: 'straps_pocket', name: 'Shoulder Ties & Contrast Pocket', role: 'accent', width: 8, height: 35, qty: 2, accentOnly: true, optional: false, grainLine: { orientation: 'lengthwise', symbol: '↕', description: 'Lengthwise grain (warp along tie length for tensile strength)' } },
        ],
      },
    },
  },

  // =========================================================================
  // 5. CURVED CHILD TOP (FREESEWING BRIAN CAD SPEC)
  // =========================================================================
  child_top: {
    id: 'child_top',
    name: 'Kids top, patchwork sleeves',
    category: 'garments',
    description: 'Comfortable child raglan top with smooth solid plain fabric body and pieced patchwork sleeves made from upcycled scraps.',
    defaultVariant: 'hybrid',
    verifiedByTailor: false,
    disclaimer: TAILOR_DISCLAIMER,
    variants: {
      hybrid: {
        name: 'Hybrid (Plain Body + Patchwork Sleeves)',
        description: 'Bodice front and back cut from continuous plain fabric for comfort; sleeves pieced from scraps.',
        isDefault: true,
      },
      patchwork: {
        name: 'Full Patchwork',
        description: 'Entire garment (bodice front, back, and sleeves) pieced together from fabric scraps.',
        warning: 'Full patchwork requires piecing large master sheets for bodices, creating many seams and taking substantial sewing time. Hybrid construction is recommended for comfort against child skin.',
      },
    },
    sizes: {
      chest56: {
        label: 'Chest 56 cm (~3–4 Years)',
        finishedWidthCm: 32,
        finishedHeightCm: 33,
        zones: [
          {
            id: 'bodice_front',
            name: 'Front Bodice',
            role: 'base',
            width: 32,
            height: 33,
            cutWidth: 34.2,
            cutHeight: 34.5,
            qty: 1,
            optional: false,
            fabricSource: 'plain_base',
            scrapEligible: false,
            cutOnFold: true,
            grainLine: { orientation: 'vertical', angleDegrees: 90, strict: true },
            geometry: CHILD_TOP_BRIAN_DATA.chest56.pieces.bodice_front.geometry,
          },
          {
            id: 'bodice_back',
            name: 'Back Bodice',
            role: 'base',
            width: 32,
            height: 33,
            cutWidth: 34.2,
            cutHeight: 34.5,
            qty: 1,
            optional: false,
            fabricSource: 'plain_base',
            scrapEligible: false,
            cutOnFold: true,
            grainLine: { orientation: 'vertical', angleDegrees: 90, strict: true },
            geometry: CHILD_TOP_BRIAN_DATA.chest56.pieces.bodice_back.geometry,
          },
          {
            id: 'sleeve',
            name: 'Sleeves',
            role: 'supporting',
            width: 22,
            height: 34,
            cutWidth: 24.3,
            cutHeight: 36.0,
            qty: 2,
            optional: false,
            fabricSource: 'scrap',
            scrapEligible: true,
            cutOnFold: false,
            grainLine: { orientation: 'vertical', angleDegrees: 90, strict: true },
            geometry: CHILD_TOP_BRIAN_DATA.chest56.pieces.sleeve.geometry,
          },
        ],
        variants: {
          hybrid: [
            {
              id: 'bodice_front',
              name: 'Front Bodice',
              role: 'base',
              width: 32,
              height: 33,
              cutWidth: 34.2,
              cutHeight: 34.5,
              qty: 1,
              optional: false,
              fabricSource: 'plain_base',
              scrapEligible: false,
              cutOnFold: true,
              grainLine: { orientation: 'vertical', angleDegrees: 90, strict: true },
              geometry: CHILD_TOP_BRIAN_DATA.chest56.pieces.bodice_front.geometry,
            },
            {
              id: 'bodice_back',
              name: 'Back Bodice',
              role: 'base',
              width: 32,
              height: 33,
              cutWidth: 34.2,
              cutHeight: 34.5,
              qty: 1,
              optional: false,
              fabricSource: 'plain_base',
              scrapEligible: false,
              cutOnFold: true,
              grainLine: { orientation: 'vertical', angleDegrees: 90, strict: true },
              geometry: CHILD_TOP_BRIAN_DATA.chest56.pieces.bodice_back.geometry,
            },
            {
              id: 'sleeve',
              name: 'Sleeves',
              role: 'supporting',
              width: 22,
              height: 34,
              cutWidth: 24.3,
              cutHeight: 36.0,
              qty: 2,
              optional: false,
              fabricSource: 'scrap',
              scrapEligible: true,
              cutOnFold: false,
              grainLine: { orientation: 'vertical', angleDegrees: 90, strict: true },
              geometry: CHILD_TOP_BRIAN_DATA.chest56.pieces.sleeve.geometry,
            },
          ],
          plain: [
            {
              id: 'bodice_front',
              name: 'Front Bodice',
              role: 'base',
              width: 32,
              height: 33,
              cutWidth: 34.2,
              cutHeight: 34.5,
              qty: 1,
              optional: false,
              fabricSource: 'plain_base',
              scrapEligible: false,
              cutOnFold: true,
              grainLine: { orientation: 'vertical', angleDegrees: 90, strict: true },
              geometry: CHILD_TOP_BRIAN_DATA.chest56.pieces.bodice_front.geometry,
            },
            {
              id: 'bodice_back',
              name: 'Back Bodice',
              role: 'base',
              width: 32,
              height: 33,
              cutWidth: 34.2,
              cutHeight: 34.5,
              qty: 1,
              optional: false,
              fabricSource: 'plain_base',
              scrapEligible: false,
              cutOnFold: true,
              grainLine: { orientation: 'vertical', angleDegrees: 90, strict: true },
              geometry: CHILD_TOP_BRIAN_DATA.chest56.pieces.bodice_back.geometry,
            },
            {
              id: 'sleeve',
              name: 'Sleeves',
              role: 'supporting',
              width: 22,
              height: 34,
              cutWidth: 24.3,
              cutHeight: 36.0,
              qty: 2,
              optional: false,
              fabricSource: 'scrap',
              scrapEligible: true,
              cutOnFold: false,
              grainLine: { orientation: 'vertical', angleDegrees: 90, strict: true },
              geometry: CHILD_TOP_BRIAN_DATA.chest56.pieces.sleeve.geometry,
            },
          ],
          patchwork: [
            {
              id: 'bodice_front',
              name: 'Front Bodice',
              role: 'base',
              width: 32,
              height: 33,
              cutWidth: 34.2,
              cutHeight: 34.5,
              qty: 1,
              optional: false,
              fabricSource: 'scrap',
              scrapEligible: true,
              cutOnFold: true,
              grainLine: { orientation: 'vertical', angleDegrees: 90, strict: true },
              geometry: CHILD_TOP_BRIAN_DATA.chest56.pieces.bodice_front.geometry,
            },
            {
              id: 'bodice_back',
              name: 'Back Bodice',
              role: 'base',
              width: 32,
              height: 33,
              cutWidth: 34.2,
              cutHeight: 34.5,
              qty: 1,
              optional: false,
              fabricSource: 'scrap',
              scrapEligible: true,
              cutOnFold: true,
              grainLine: { orientation: 'vertical', angleDegrees: 90, strict: true },
              geometry: CHILD_TOP_BRIAN_DATA.chest56.pieces.bodice_back.geometry,
            },
            {
              id: 'sleeve',
              name: 'Sleeves',
              role: 'supporting',
              width: 22,
              height: 34,
              cutWidth: 24.3,
              cutHeight: 36.0,
              qty: 2,
              optional: false,
              fabricSource: 'scrap',
              scrapEligible: true,
              cutOnFold: false,
              grainLine: { orientation: 'vertical', angleDegrees: 90, strict: true },
              geometry: CHILD_TOP_BRIAN_DATA.chest56.pieces.sleeve.geometry,
            },
          ],
        },
      },
      chest62: {
        label: 'Chest 62 cm (~5–6 Years)',
        finishedWidthCm: 36,
        finishedHeightCm: 37,
        zones: [
          {
            id: 'bodice_front',
            name: 'Front Bodice',
            role: 'base',
            width: 36,
            height: 37,
            cutWidth: 37.7,
            cutHeight: 39.0,
            qty: 1,
            optional: false,
            fabricSource: 'plain_base',
            scrapEligible: false,
            cutOnFold: true,
            grainLine: { orientation: 'vertical', angleDegrees: 90, strict: true },
            geometry: CHILD_TOP_BRIAN_DATA.chest62.pieces.bodice_front.geometry,
          },
          {
            id: 'bodice_back',
            name: 'Back Bodice',
            role: 'base',
            width: 36,
            height: 37,
            cutWidth: 37.7,
            cutHeight: 39.0,
            qty: 1,
            optional: false,
            fabricSource: 'plain_base',
            scrapEligible: false,
            cutOnFold: true,
            grainLine: { orientation: 'vertical', angleDegrees: 90, strict: true },
            geometry: CHILD_TOP_BRIAN_DATA.chest62.pieces.bodice_back.geometry,
          },
          {
            id: 'sleeve',
            name: 'Sleeves',
            role: 'supporting',
            width: 25,
            height: 38,
            cutWidth: 27.0,
            cutHeight: 40.0,
            qty: 2,
            optional: false,
            fabricSource: 'scrap',
            scrapEligible: true,
            cutOnFold: false,
            grainLine: { orientation: 'vertical', angleDegrees: 90, strict: true },
            geometry: CHILD_TOP_BRIAN_DATA.chest62.pieces.sleeve.geometry,
          },
        ],
        variants: {
          hybrid: [
            {
              id: 'bodice_front',
              name: 'Front Bodice',
              role: 'base',
              width: 36,
              height: 37,
              cutWidth: 37.7,
              cutHeight: 39.0,
              qty: 1,
              optional: false,
              fabricSource: 'plain_base',
              scrapEligible: false,
              cutOnFold: true,
              grainLine: { orientation: 'vertical', angleDegrees: 90, strict: true },
              geometry: CHILD_TOP_BRIAN_DATA.chest62.pieces.bodice_front.geometry,
            },
            {
              id: 'bodice_back',
              name: 'Back Bodice',
              role: 'base',
              width: 36,
              height: 37,
              cutWidth: 37.7,
              cutHeight: 39.0,
              qty: 1,
              optional: false,
              fabricSource: 'plain_base',
              scrapEligible: false,
              cutOnFold: true,
              grainLine: { orientation: 'vertical', angleDegrees: 90, strict: true },
              geometry: CHILD_TOP_BRIAN_DATA.chest62.pieces.bodice_back.geometry,
            },
            {
              id: 'sleeve',
              name: 'Sleeves',
              role: 'supporting',
              width: 25,
              height: 38,
              cutWidth: 27.0,
              cutHeight: 40.0,
              qty: 2,
              optional: false,
              fabricSource: 'scrap',
              scrapEligible: true,
              cutOnFold: false,
              grainLine: { orientation: 'vertical', angleDegrees: 90, strict: true },
              geometry: CHILD_TOP_BRIAN_DATA.chest62.pieces.sleeve.geometry,
            },
          ],
          plain: [
            {
              id: 'bodice_front',
              name: 'Front Bodice',
              role: 'base',
              width: 36,
              height: 37,
              cutWidth: 37.7,
              cutHeight: 39.0,
              qty: 1,
              optional: false,
              fabricSource: 'plain_base',
              scrapEligible: false,
              cutOnFold: true,
              grainLine: { orientation: 'vertical', angleDegrees: 90, strict: true },
              geometry: CHILD_TOP_BRIAN_DATA.chest62.pieces.bodice_front.geometry,
            },
            {
              id: 'bodice_back',
              name: 'Back Bodice',
              role: 'base',
              width: 36,
              height: 37,
              cutWidth: 37.7,
              cutHeight: 39.0,
              qty: 1,
              optional: false,
              fabricSource: 'plain_base',
              scrapEligible: false,
              cutOnFold: true,
              grainLine: { orientation: 'vertical', angleDegrees: 90, strict: true },
              geometry: CHILD_TOP_BRIAN_DATA.chest62.pieces.bodice_back.geometry,
            },
            {
              id: 'sleeve',
              name: 'Sleeves',
              role: 'supporting',
              width: 25,
              height: 38,
              cutWidth: 27.0,
              cutHeight: 40.0,
              qty: 2,
              optional: false,
              fabricSource: 'scrap',
              scrapEligible: true,
              cutOnFold: false,
              grainLine: { orientation: 'vertical', angleDegrees: 90, strict: true },
              geometry: CHILD_TOP_BRIAN_DATA.chest62.pieces.sleeve.geometry,
            },
          ],
          patchwork: [
            {
              id: 'bodice_front',
              name: 'Front Bodice',
              role: 'base',
              width: 36,
              height: 37,
              cutWidth: 37.7,
              cutHeight: 39.0,
              qty: 1,
              optional: false,
              fabricSource: 'scrap',
              scrapEligible: true,
              cutOnFold: true,
              grainLine: { orientation: 'vertical', angleDegrees: 90, strict: true },
              geometry: CHILD_TOP_BRIAN_DATA.chest62.pieces.bodice_front.geometry,
            },
            {
              id: 'bodice_back',
              name: 'Back Bodice',
              role: 'base',
              width: 36,
              height: 37,
              cutWidth: 37.7,
              cutHeight: 39.0,
              qty: 1,
              optional: false,
              fabricSource: 'scrap',
              scrapEligible: true,
              cutOnFold: true,
              grainLine: { orientation: 'vertical', angleDegrees: 90, strict: true },
              geometry: CHILD_TOP_BRIAN_DATA.chest62.pieces.bodice_back.geometry,
            },
            {
              id: 'sleeve',
              name: 'Sleeves',
              role: 'supporting',
              width: 25,
              height: 38,
              cutWidth: 27.0,
              cutHeight: 40.0,
              qty: 2,
              optional: false,
              fabricSource: 'scrap',
              scrapEligible: true,
              cutOnFold: false,
              grainLine: { orientation: 'vertical', angleDegrees: 90, strict: true },
              geometry: CHILD_TOP_BRIAN_DATA.chest62.pieces.sleeve.geometry,
            },
          ],
        },
      },
    },
  },
};

/**
 * Normalizes either a legacy product template or a modern Garment Spec object
 * into a standardized, unified format that supports both legacy zones and vector pieces.
 * 
 * Invariants:
 * 1. For legacy templates, produces identical zones, dimensions, areas, and roles.
 * 2. For modern Garment Specs, maps pieces into unified zone/piece items with full geometry.
 * 3. Never mutates input objects (pure function with deep normalization).
 */
export function normalizeGarmentSpec(productOrSpec) {
  if (!productOrSpec || typeof productOrSpec !== 'object') return null;

  const id = productOrSpec.id;
  const name = productOrSpec.name || productOrSpec.nameKey || id;
  const category = productOrSpec.category || 'accessories';
  const description = productOrSpec.description || productOrSpec.descriptionKey || '';
  const defaultVariant = productOrSpec.defaultVariant || 'plain';
  const tailorVerified = Boolean(productOrSpec.tailorVerified);
  const disclaimer = productOrSpec.disclaimer || TAILOR_DISCLAIMER;
  const schemaVersion = productOrSpec.schemaVersion || '1.0.0';

  const normalizedSizes = {};

  if (productOrSpec.sizes && typeof productOrSpec.sizes === 'object') {
    Object.keys(productOrSpec.sizes).forEach((sizeKey) => {
      const rawSize = productOrSpec.sizes[sizeKey];
      if (!rawSize) return;

      const label = rawSize.label || rawSize.labelKey || sizeKey;
      const finishedWidthCm = rawSize.finishedWidthCm ?? rawSize.finishedDimensions?.widthCm ?? 0;
      const finishedHeightCm = rawSize.finishedHeightCm ?? rawSize.finishedDimensions?.heightCm ?? 0;

      // Helper to normalize a list of zones or pieces
      const normalizePieceList = (items) => {
        if (!Array.isArray(items)) return [];
        return items.map((item) => {
          const pieceId = item.id;
          const pieceName = item.name || item.nameKey || pieceId;
          const role = item.role || 'base';

          // Dimensions: handle direct width/height or geometry.finishedWidthCm
          const w = item.width !== undefined ? item.width : (item.geometry?.finishedWidthCm || 0);
          const h = item.height !== undefined ? item.height : (item.geometry?.finishedHeightCm || 0);
          const qty = item.qty !== undefined ? item.qty : (item.cutQty || 1);
          const optional = Boolean(item.optional);
          const accentOnly = Boolean(item.accentOnly);

          // Seam allowance: number or object
          const saDefault = typeof item.seamAllowanceCm === 'number'
            ? item.seamAllowanceCm
            : (item.seamAllowanceCm?.defaultCm ?? CONFIG.SEAM_ALLOWANCE_CM);

          // Sourcing: existing products default to scrap
          const fabricSource = item.fabricSource || 'scrap';
          const scrapEligible = item.scrapEligible !== undefined
            ? Boolean(item.scrapEligible)
            : (fabricSource !== 'plain_base');

          // Geometry
          const geometry = item.geometry || {
            shapeType: 'rectangle',
            finishedWidthCm: w,
            finishedHeightCm: h,
            finishedAreaCm2: w * h,
          };

          return {
            id: pieceId,
            name: pieceName,
            role,
            width: w,
            height: h,
            qty,
            cutQty: qty,
            optional,
            accentOnly,
            fabricSource,
            scrapEligible,
            seamAllowanceCm: typeof item.seamAllowanceCm === 'object'
              ? item.seamAllowanceCm
              : { defaultCm: saDefault },
            grainLine: item.grainLine || { orientation: 'any', angleDegrees: 90, strict: false },
            geometry,
            mapping3D: item.mapping3D || null,
          };
        });
      };

      const normalizedSize = {
        label,
        finishedWidthCm,
        finishedHeightCm,
        finishedDimensions: rawSize.finishedDimensions || {
          widthCm: finishedWidthCm,
          heightCm: finishedHeightCm,
        },
      };

      if (rawSize.bodyMeasurements) {
        normalizedSize.bodyMeasurements = { ...rawSize.bodyMeasurements };
      }

      if (rawSize.variants && typeof rawSize.variants === 'object') {
        normalizedSize.variants = {};
        Object.keys(rawSize.variants).forEach((vKey) => {
          normalizedSize.variants[vKey] = normalizePieceList(rawSize.variants[vKey]);
        });
        normalizedSize.zones = normalizedSize.variants[defaultVariant] || normalizedSize.variants.plain || [];
        normalizedSize.pieces = normalizedSize.zones;
      } else {
        const normalizedItems = normalizePieceList(rawSize.zones || rawSize.pieces || []);
        normalizedSize.zones = normalizedItems;
        normalizedSize.pieces = normalizedItems;
      }

      normalizedSizes[sizeKey] = normalizedSize;
    });
  }

  return {
    schemaVersion,
    id,
    name,
    category,
    description,
    defaultVariant,
    tailorVerified,
    disclaimer,
    materials: productOrSpec.materials || null,
    timeEstimateFormula: productOrSpec.timeEstimateFormula || null,
    stitchingSteps: productOrSpec.stitchingSteps || [],
    sizes: normalizedSizes,
  };
}

/**
 * Returns raw cut dimensions in cm (adding seam allowance on all 4 sides).
 */
export function getZoneCutDimensions(zone, seamAllowanceCm = CONFIG.SEAM_ALLOWANCE_CM) {
  const allowance = Number(seamAllowanceCm) || CONFIG.SEAM_ALLOWANCE_CM;
  const w = zone.width !== undefined ? zone.width : (zone.geometry?.finishedWidthCm || 0);
  const h = zone.height !== undefined ? zone.height : (zone.geometry?.finishedHeightCm || 0);
  const count = zone.qty !== undefined ? zone.qty : (zone.cutQty || 1);

  return {
    cutWidthCm: w + 2 * allowance,
    cutHeightCm: h + 2 * allowance,
    finishedWidthCm: w,
    finishedHeightCm: h,
    areaSqCm: (w + 2 * allowance) * (h + 2 * allowance) * count,
    finishedAreaSqCm: w * h * count,
  };
}

/**
 * Identifies the largest rectangular zone for a product template and size,
 * and calculates the minimum anchor scrap dimension required by the 40% rule.
 */
export function getProductLargestZone(productIdOrObj, sizeKey, variant = null) {
  const product = typeof productIdOrObj === 'object' && productIdOrObj !== null
    ? productIdOrObj
    : PRODUCT_TEMPLATES[productIdOrObj];
  if (!product || !product.sizes || !product.sizes[sizeKey]) return null;

  const size = product.sizes[sizeKey];
  const resolvedVariant = variant || product.defaultVariant || 'plain';

  let zonesToScan = size.zones;
  if (size.variants && size.variants[resolvedVariant]) {
    zonesToScan = size.variants[resolvedVariant];
  } else if (!zonesToScan && size.variants) {
    zonesToScan = size.variants[resolvedVariant] || size.variants.plain;
  }

  let largestZone = null;
  let maxArea = 0;

  if (zonesToScan) {
    zonesToScan.forEach((zone) => {
      const area = (zone.width ?? zone.geometry?.finishedWidthCm ?? 0) * (zone.height ?? zone.geometry?.finishedHeightCm ?? 0);
      if (area > maxArea) {
        maxArea = area;
        largestZone = zone;
      }
    });
  }

  const maxDim = largestZone
    ? Math.max(
        largestZone.width ?? largestZone.geometry?.finishedWidthCm ?? 0,
        largestZone.height ?? largestZone.geometry?.finishedHeightCm ?? 0
      )
    : 20;

  const minAnchorDim = Math.max(
    CONFIG.MIN_RECOMMENDED_PATCH_DIMENSION_CM,
    Math.round(maxDim * (CONFIG.MIN_ANCHOR_ZONE_RATIO || 0.40))
  );

  return {
    productId: product.id,
    productName: product.name,
    sizeKey,
    sizeLabel: size.label,
    variant: resolvedVariant,
    largestZone,
    maxDim,
    minAnchorDim,
  };
}

/**
 * Calculates total target area and 60-30-10 role breakdown for a given product and size.
 */
export function getProductRequirements(productIdOrObj, sizeKey, seamAllowanceCm = CONFIG.SEAM_ALLOWANCE_CM, variant = null) {
  const product = typeof productIdOrObj === 'object' && productIdOrObj !== null
    ? productIdOrObj
    : PRODUCT_TEMPLATES[productIdOrObj];
  if (!product) return null;

  const size = product.sizes[sizeKey];
  if (!size) return null;

  const resolvedVariant = variant || product.defaultVariant || 'plain';

  let sourceZones = size.zones;
  if (size.variants && size.variants[resolvedVariant]) {
    sourceZones = size.variants[resolvedVariant];
  } else if (!sourceZones && size.variants) {
    sourceZones = size.variants[resolvedVariant] || size.variants.plain;
  }

  const anchorInfo = getProductLargestZone(product, sizeKey, resolvedVariant);

  let totalAreaNeeded = 0;
  let totalFinishedArea = 0;
  const roleAreas = { base: 0, supporting: 0, accent: 0 };
  const expandedZones = [];

  if (sourceZones) {
    sourceZones.forEach((zone) => {
      const cut = getZoneCutDimensions(zone, seamAllowanceCm);
      totalAreaNeeded += cut.areaSqCm;
      totalFinishedArea += cut.finishedAreaSqCm;
      roleAreas[zone.role] = (roleAreas[zone.role] || 0) + cut.areaSqCm;

      // Expand zones by quantity for discrete piece-by-piece fitting
      const count = zone.qty !== undefined ? zone.qty : (zone.cutQty || 1);
      const w = zone.width !== undefined ? zone.width : (zone.geometry?.finishedWidthCm || 0);
      const h = zone.height !== undefined ? zone.height : (zone.geometry?.finishedHeightCm || 0);

      for (let i = 0; i < count; i++) {
        expandedZones.push({
          id: count > 1 ? `${zone.id}_${i + 1}` : zone.id,
          baseZoneId: zone.id,
          name: count > 1 ? `${zone.name} (${i + 1}/${count})` : zone.name,
          role: zone.role,
          finishedWidth: w,
          finishedHeight: h,
          cutWidth: zone.cutWidth !== undefined ? zone.cutWidth : (w + 2 * seamAllowanceCm),
          cutHeight: zone.cutHeight !== undefined ? zone.cutHeight : (h + 2 * seamAllowanceCm),
          accentOnly: Boolean(zone.accentOnly),
          optional: Boolean(zone.optional),
          fabricSource: zone.fabricSource || 'scrap',
          scrapEligible: zone.scrapEligible !== undefined ? Boolean(zone.scrapEligible) : true,
          grainLine: zone.grainLine || null,
          geometry: zone.geometry || null,
        });
      }
    });
  }

  return {
    productId: product.id,
    productName: product.name,
    sizeKey,
    sizeLabel: size.label,
    variant: resolvedVariant,
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
