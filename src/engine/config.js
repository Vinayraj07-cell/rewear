/**
 * REWEAR STAGE 2 CONFIGURATION
 * 
 * Plain-words explanation:
 * This file contains every single numerical threshold, weight, and tolerance
 * used across the Stage 2 logic (colour relationships, fabric joining rules,
 * 60-30-10 zoning, seam allowances, and scoring).
 * 
 * Keeping all thresholds in this single file makes it easy to calibrate the engine
 * after user testing with tailors and home sewers.
 */

export const CONFIG = {
  // =========================================================================
  // 1. SEAM & CUTTING THRESHOLDS
  // =========================================================================

  /**
   * Standard seam allowance in centimeters added to each edge of joined pieces.
   * Default: 1.0 cm (standard Indian tailoring scrap piecing allowance).
   */
  SEAM_ALLOWANCE_CM: 1.0,

  /**
   * Cutting clearance in centimeters between pattern piece cut lines on a sheet
   * to accommodate tailor shears. Default: 0.5 cm.
   */
  CUTTING_CLEARANCE_CM: 0.5,

  /**
   * Optional safety margin in centimeters subtracted from each edge of a scrap before fitting
   * when scraps are frayed or uneven.
   * Default: 0 (all existing results identical).
   * Allowed values: 0, 0.5, 1.0 cm per edge.
   */
  SCRAP_SAFETY_MARGIN_CM: 0,

  /**
   * Allowed choices for scrap safety margin in centimeters per edge.
   */
  ALLOWED_SCRAP_SAFETY_MARGINS_CM: [0, 0.5, 1.0],

  /**
   * Standard fabric bolt width in centimeters for continuous plain base fabric yardage calculations.
   * Default: 110 cm (approx 44 inches, standard cotton bolt width).
   */
  BOLT_WIDTH_CM: 110,

  /**
   * Minimum dimension (width or height) in cm for a leftover scrap to be saved
   * and returned to the tailor's stock pile instead of considered waste.
   * Scraps smaller than 3x3 cm are considered trim waste.
   */
  MIN_REUSABLE_SCRAP_DIMENSION_CM: 3.0,

  /**
   * Minimum dimension (cm) for an individual patch piece in a product.
   * Patches smaller than 5 cm are difficult to handle on standard sewing machines
   * and create bulky seams that tailors dislike.
   */
  MIN_RECOMMENDED_PATCH_DIMENSION_CM: 5.0,

  /**
   * Absolute hard floor dimension (cm) for scraps.
   * Scraps where all dimensions are smaller than this floor (e.g. < 5 cm)
   * are rejected because micro-scraps cannot be stitched on sewing machines
   * without extreme fraying, jamming the feed dogs, and creating rigid seam lumps.
   */
  MIN_PIECE_HARD_FLOOR_CM: 5.0,

  /**
   * Minimum ratio of the product's largest zone dimension that an anchor piece
   * should possess for a premium appearance (default: 40%).
   * Does NOT block the product; scraps below this ratio generate a quality warning
   * ("made from many small patches, a bigger piece would look more premium")
   * and incur a design score penalty.
   */
  MIN_ANCHOR_ZONE_RATIO: 0.40,

  /**
   * Score penalty deducted when all pieces in a pile are smaller than the 40% anchor recommendation.
   */
  SMALL_PATCH_WARNING_PENALTY: 15,

  /**
   * Default baseline allowed pieced seams within a single product zone.
   */
  MAX_SEAMS_PER_ZONE: 6,

  /**
   * Default baseline allowed patch pieces pieced together to form a single zone.
   */
  MAX_PATCHES_PER_ZONE: 8,

  /**
   * Absolute cap on patches allowed in any single product zone, regardless of how large the zone is.
   */
  MAX_PATCHES_PER_ZONE_CAP: 24,

  /**
   * Absolute cap on seams allowed in any single product zone.
   */
  MAX_SEAMS_PER_ZONE_CAP: 24,

  /**
   * Minimum patch dimension (cm) used to calculate the dynamic patch limit for a zone.
   * Computed as: min(MAX_PATCHES_PER_ZONE_CAP, max(4, floor(zoneArea / minPatchSize²)))
   */
  MIN_PATCH_SIZE_FOR_LIMIT_CM: 5.0,

  /**
   * Computes the maximum allowed patches for a given zone area (cm²).
   * Scales dynamically with zone size up to MAX_PATCHES_PER_ZONE_CAP (24).
   */
  getMaxPatchesForZone: (cutWidth, cutHeight) => {
    const zoneArea = cutWidth * cutHeight;
    const minPatchArea = (CONFIG.MIN_PATCH_SIZE_FOR_LIMIT_CM || 5.0) ** 2;
    const computed = Math.floor(zoneArea / minPatchArea);
    return Math.min(CONFIG.MAX_PATCHES_PER_ZONE_CAP || 24, Math.max(4, computed));
  },

  // =========================================================================
  // 2. COLOUR & PERCEPTUAL SPACE (CIELAB / LCH) THRESHOLDS
  // =========================================================================

  /**
   * Maximum Chroma (C* in CIELAB/LCH) below which a colour is considered a neutral.
   * Low-chroma colours (black, white, greys, soft beiges, muted navy) lack strong
   * chromatic vibration and act as neutral anchors that go with everything.
   */
  NEUTRAL_CHROMA_MAX: 16.0,

  /**
   * Maximum Lightness (L* in CIELAB) below which dark shades (such as deep navy,
   * charcoal, espresso brown, or jet black) function as dark neutral anchors,
   * even if they carry a subtle hue hint.
   */
  DARK_NEUTRAL_LIGHTNESS_MAX: 22.0,

  /**
   * Minimum Lightness (L* in CIELAB) above which very light tints (pure white,
   * off-white, light cream, pale silver) function as light neutral anchors.
   */
  LIGHT_NEUTRAL_LIGHTNESS_MIN: 90.0,

  /**
   * Maximum hue angle difference (degrees) for two colours to be judged as
   * TONAL or ANALOGOUS (e.g. olive and forest green, or sky blue and royal blue).
   */
  TONAL_HUE_MAX_DIFF_DEG: 42.0,

  /**
   * Target hue angle difference (degrees) for complementary contrast (opposite on color wheel).
   */
  COMPLEMENTARY_HUE_TARGET_DEG: 180.0,

  /**
   * Tolerance around 180 degrees for complementary colours (180 ± 35 = 145° to 215°).
   */
  COMPLEMENTARY_HUE_TOLERANCE_DEG: 35.0,

  /**
   * Minimum Chroma required on BOTH colours for a clash risk to be triggered.
   * If either colour is pastel or muted (chroma < 26), the eye tolerates the pairing.
   */
  CLASH_MIN_CHROMA: 26.0,

  /**
   * Maximum Lightness difference (|L1 - L2|) that allows a clash.
   * If two saturated colours have high lightness contrast (e.g. deep dark purple vs
   * bright light yellow-green, delta L > 32), the value contrast separates them visually,
   * so they do not vibrate harshly.
   */
  CLASH_MAX_LIGHTNESS_DIFF: 32.0,

  /**
   * Minimum hue angle difference to enter potential clash territory (outside tonal).
   */
  CLASH_HUE_MIN_DIFF_DEG: 48.0,

  /**
   * Maximum hue angle difference before entering complementary territory.
   */
  CLASH_HUE_MAX_DIFF_DEG: 142.0,

  // =========================================================================
  // 3. FABRIC COMPATIBILITY THRESHOLDS
  // =========================================================================

  /**
   * Numeric scale for fabric thickness:
   * thin = 1, medium = 2, thick = 3
   */
  THICKNESS_LEVELS: {
    thin: 1,
    medium: 2,
    thick: 3,
  },

  /**
   * Maximum allowed thickness level difference between joined pieces in the same panel.
   * Allowed: thin + medium (diff 1), medium + thick (diff 1).
   * Forbidden: thin + thick (diff 2).
   */
  MAX_ALLOWED_THICKNESS_DIFF: 1,

  // =========================================================================
  // 4. 60-30-10 ZONING GUIDELINE TARGETS & TOLERANCES
  // =========================================================================

  /**
   * Target percentage of visible finished surface area for the BASE / MAIN color.
   */
  ZONE_BASE_TARGET_PCT: 60.0,
  ZONE_BASE_MIN_PCT: 50.0,
  ZONE_BASE_MAX_PCT: 72.0,

  /**
   * Target percentage for the SUPPORTING color.
   */
  ZONE_SUPPORTING_TARGET_PCT: 30.0,
  ZONE_SUPPORTING_MIN_PCT: 18.0,
  ZONE_SUPPORTING_MAX_PCT: 40.0,

  /**
   * Target percentage for the ACCENT color.
   */
  ZONE_ACCENT_TARGET_PCT: 10.0,
  ZONE_ACCENT_MIN_PCT: 5.0,
  ZONE_ACCENT_MAX_PCT: 20.0,

  // =========================================================================
  // 5. DESIGN & AESTHETIC SCORING WEIGHTS (LOOKS FIRST, WASTE SECOND)
  // =========================================================================

  /**
   * Weights used when computing the overall Design / Aesthetic Score (0-100).
   * Notice that looks (colour harmony, clean panels, absence of clashes)
   * account for 75% of the score, while waste accounts for only 25%.
   */
  SCORE_WEIGHTS: {
    COLOR_HARMONY: 0.35,     // 60-30-10 adherence & harmonious hue relations
    SEAM_SIMPLICITY: 0.25,    // Fewer seams = cleaner tailor finish & less sewing bulk
    PATCH_SIZE_QUALITY: 0.15, // Fewer tiny patches (< 5cm)
    FABRIC_UNIFORMITY: 0.10,  // Consistent drape & needle requirements
    MINIMAL_WASTE: 0.15,      // Low fabric waste percentage
  },

  // =========================================================================
  // 6. SEWING TIME ESTIMATION (MINUTES)
  // =========================================================================

  /**
   * Base sewing time in minutes for standard products when assembled from single pieces.
   */
  BASE_SEWING_MINUTES: {
    pouch: 30,
    tote_bag: 50,
    cushion_cover: 40,
    kids_frock: 70,
    child_top: 45,
  },

  /**
   * Additional sewing minutes added for each piece join / seam that must be pieced together.
   */
  MINUTES_PER_EXTRA_SEAM: 3.5,

  /**
   * Additional minutes for handling fraying fabrics (overlocking / zig-zagging edges).
   */
  MINUTES_FOR_FRAYING_FINISH: 5.0,

  // =========================================================================
  // 7. LABOUR & SEAM PENALTY THRESHOLDS (FOR APPAREL & HYBRID GARMENTS)
  // =========================================================================

  /**
   * Labour penalty configuration for apparel garments (e.g. child_top and future hybrid garments).
   * Rectangle home/utility products (pouch, tote_bag, cushion_cover, kids_frock) are exempt
   * to guarantee their existing baseline scores do not change.
   *
   * In apparel tailoring, excessive seams against sensitive skin and long sewing times
   * make full patchwork impractical and uncomfortable, incurring a substantial labour penalty.
   */
  LABOUR_PENALTY: {
    // Exempt classic rectangle products so their scores do not change
    EXEMPT_PRODUCT_IDS: ['pouch', 'tote_bag', 'cushion_cover', 'kids_frock'],

    // Seam threshold above which extra piecing labour penalty begins
    SEAM_THRESHOLD: 12,

    // Points deducted per seam over SEAM_THRESHOLD
    POINTS_PER_EXCESS_SEAM: 1.5,

    // Sewing time threshold in minutes above which labour penalty begins
    TIME_THRESHOLD_MINUTES: 60,

    // Points deducted per 10 minutes exceeding TIME_THRESHOLD_MINUTES
    POINTS_PER_10_MINS_EXCESS: 3.0,

    // Cap on maximum total labour penalty deducted from design score
    MAX_LABOUR_PENALTY: 45,
  },
};
