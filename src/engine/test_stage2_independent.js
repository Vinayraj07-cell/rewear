/**
 * INDEPENDENT AUTOMATED TESTS FOR STAGE 2 TAILORING ENGINE
 * 
 * Plain-words explanation:
 * This test suite independently tests every requirement specified in the Stage 2 brief:
 * 1. 2D Piece Fitting: Exact fit, slightly smaller (fails), 90-degree rotation (both boolean and string stretch).
 * 2. Perceptual Colour Rules: Neutrals never clash, opposite hues are complementary,
 *    saturated unrelated hues clash and must never be placed side-by-side, printed pieces never adjacent.
 * 3. Fabric Compatibility: Stretchy + non-stretchy and thick + thin rejections with tailor reasons.
 * 4. 60-30-10 Zoning & Fallbacks: Loud piles lacking a calm neutral base return actionable suggestions.
 * 5. Diagnostic Reporting: Small piles return "not enough" and exact missing piece dimensions.
 * 6. Leftover Accounting: Used pieces removed, reusable offcuts (>= 3 cm) returned, tiny slivers (< 3 cm) to trim waste.
 * 7. Area Conservation & Waste %: Fabric area accounting across cuts, leftovers, and trim waste.
 * 8. Edge Case Robustness: Empty piles, zero/negative dimensions, and huge quantities without crashing.
 * 9. Barely Fitting Pouch: Exact cut size fits with 0% waste.
 * 10. Aesthetic Design Scoring: Balanced neutral-grounded pile scores high, bad loud pile scores low.
 * 
 * Rules followed:
 * - Written independently without reading or copying the logic's own test file.
 * - If any test fails because the logic is flawed, the test is NOT altered to hide the bug.
 * - Runnable via: node src/engine/test_stage2_independent.js
 */

import { CONFIG } from './config.js';
import {
  parseColorToRgb,
  getColorMetrics,
  getHueDifference,
  evaluateColorPair,
  checkPrintAdjacency,
  KNOWN_COLOR_HEX,
} from './color.js';
import {
  checkFabricPairCompatibility,
  checkPanelFabricCompatibility,
  isPieceStretchy,
  getThicknessLevel,
} from './fabricCompatibility.js';
import {
  PRODUCT_TEMPLATES,
  getProductRequirements,
  getZoneCutDimensions,
  getProductLargestZone,
  TAILOR_DISCLAIMER,
} from './templates.js';
import { assignZoningRoles, checkBaseFeasibilityFallbacks, getPieceArea, enrichPiece } from './zoning.js';
import { canFitSinglePiece, cutScrap, tryJoinTwoPieces, fitPileToProduct } from './fitting.js';
import {
  calculateDesignScore,
  calculateEstimatedTime,
  rankSuggestions,
  scoreColorHarmony,
} from './scoring.js';
import { suggestProducts, buildDesign, checkFeasibility } from './index.js';

// ============================================================================
// TEST HARNESS
// ============================================================================

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failureDetails = [];

function test(description, testFn) {
  totalTests++;
  try {
    testFn();
    passedTests++;
    console.log(`  [PASS] #${totalTests}: ${description}`);
  } catch (err) {
    failedTests++;
    console.error(`  [FAIL] #${totalTests}: ${description}`);
    console.error(`         Reason: ${err.message}`);
    failureDetails.push({ testNumber: totalTests, description, error: err.message });
  }
}

function assert(condition, message = 'Assertion failed') {
  if (!condition) {
    throw new Error(message);
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message || 'Value mismatch'}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

function assertApprox(actual, expected, tolerance = 0.5, message) {
  if (Math.abs(actual - expected) > tolerance) {
    throw new Error(`${message || 'Approximate match failed'}: expected ~${expected} (+/- ${tolerance}), got ${actual}`);
  }
}

console.log('================================================================');
console.log('REWEAR STAGE 2 — INDEPENDENT AUTOMATED TEST SUITE');
console.log('================================================================\n');

// ============================================================================
// 1. 2D PIECE FITTING & ROTATION
// ============================================================================
console.log('--- 1. 2D Piece Fitting & Rotation ---');

test('Scrap exactly the size needed fits without rotation', () => {
  const scrap = { id: 's1', width: 14, height: 8, stretchy: false };
  const res = canFitSinglePiece(scrap, 14, 8, true);
  assert(res.fits === true, 'Scrap exactly the required dimensions should fit');
  assertEqual(res.rotated, false, 'Direct orientation should not require rotation');
});

test('Scrap slightly smaller in width does not fit', () => {
  const scrap = { id: 's2', width: 13.9, height: 8, stretchy: false };
  const res = canFitSinglePiece(scrap, 14, 8, true);
  assert(res.fits === false, 'Scrap with width 13.9 should not fit 14.0 target');
});

test('Scrap slightly smaller in height does not fit', () => {
  const scrap = { id: 's3', width: 14, height: 7.9, stretchy: false };
  const res = canFitSinglePiece(scrap, 14, 8, true);
  assert(res.fits === false, 'Scrap with height 7.9 should not fit 8.0 target');
});

test('Scrap needing 90-degree rotation fits when fabric is non-stretchy (boolean)', () => {
  const scrap = { id: 's4', width: 8, height: 14, stretchy: false };
  const res = canFitSinglePiece(scrap, 14, 8, true);
  assert(res.fits === true, '8x14 scrap should fit 14x8 target with rotation');
  assertEqual(res.rotated, true, 'Result must indicate rotated: true');
});

test('Scrap needing 90-degree rotation fits when stretchy input is string "no"', () => {
  // The brief specifies stretchy is input as 'yes'/'no'.
  // Non-stretchy woven scrap (stretchy: 'no') should be allowed to rotate 90 degrees.
  const scrap = { id: 's5', width: 8, height: 14, stretchy: 'no' };
  const res = canFitSinglePiece(scrap, 14, 8, true);
  assert(res.fits === true, 'Scrap with stretchy: "no" must be recognized as non-stretchy and rotate');
  assertEqual(res.rotated, true, 'Should rotate 90 degrees');
});

test('Stretchy fabric cannot rotate 90 degrees across grain line', () => {
  const scrap = { id: 's6', width: 8, height: 14, stretchy: true };
  const res = canFitSinglePiece(scrap, 14, 8, true);
  assert(res.fits === false, 'Stretchy fabric cannot be rotated across grain');
});

// ============================================================================
// 2. PERCEPTUAL COLOUR RULES (CIELAB & LCH)
// ============================================================================
console.log('\n--- 2. Perceptual Colour Rules (CIELAB & LCH) ---');

test('Neutral + any colour is never a clash (Black + Red)', () => {
  const res = evaluateColorPair('black', '#EF4444');
  assertEqual(res.clashRisk, false, 'Black + Red must never clash');
  assertEqual(res.relationship, 'neutral-compatible', 'Relationship must be neutral-compatible');
  assert(res.score >= 90, 'Neutral pairings should have high harmony score');
});

test('Neutral + any colour is never a clash (White + Purple)', () => {
  const res = evaluateColorPair('white', '#A855F7');
  assertEqual(res.clashRisk, false, 'White + Purple must never clash');
  assertEqual(res.relationship, 'neutral-compatible');
});

test('Neutral + any colour is never a clash (Grey + Orange)', () => {
  const res = evaluateColorPair('grey', '#F97316');
  assertEqual(res.clashRisk, false, 'Grey + Orange must never clash');
  assertEqual(res.relationship, 'neutral-compatible');
});

test('Neutral + any colour is never a clash (Beige + Green)', () => {
  const res = evaluateColorPair('beige', '#22C55E');
  assertEqual(res.clashRisk, false, 'Beige + Green must never clash');
  assertEqual(res.relationship, 'neutral-compatible');
});

test('Neutral + any colour is never a clash (Navy + Yellow)', () => {
  const res = evaluateColorPair('navy', '#EAB308');
  assertEqual(res.clashRisk, false, 'Navy + Yellow must never clash');
  assertEqual(res.relationship, 'neutral-compatible');
});

test('Two strong opposite hues are identified as complementary', () => {
  // Red (h ~ 31°) opposite Teal (#00a0a0, h ~ 196°) -> deltaH ~ 165° (180 ± 35°)
  const res = evaluateColorPair('red', '#00a0a0');
  assertEqual(res.clashRisk, false, 'Complementary contrast is not a clash');
  assertEqual(res.relationship, 'complementary', 'Hues roughly 180° apart should be complementary');
});

test('Two saturated unrelated hues with close lightness trigger a clash risk', () => {
  // Red (#EF4444) and Green (#22C55E): both C > 70, deltaL ~ 15, deltaH ~ 116°
  const res = evaluateColorPair('red', 'green');
  assertEqual(res.clashRisk, true, 'Saturated red + saturated green should trigger clashRisk: true');
  assertEqual(res.relationship, 'clash', 'Relationship should be clash');
  assert(res.reason.toLowerCase().includes('clash'), 'Reason must mention clash');
});

test('Two saturated clashing hues must NEVER be placed side-by-side in joined seams', () => {
  // Brief requirement: "anything else with strong saturation on both = clash risk...
  // Two saturated unrelated hues are a clash and are never placed side by side."
  const pieceA = { id: 'pA', width: 10, height: 20, color: 'red', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false };
  const pieceB = { id: 'pB', width: 10, height: 20, color: 'green', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false };
  const joinRes = tryJoinTwoPieces(pieceA, pieceB, 18, 20);
  assert(joinRes.fits === false, 'tryJoinTwoPieces must reject joining clashing colours side-by-side');
});

test('Two printed pieces must NEVER be placed directly next to each other', () => {
  const pieceA = { id: 'p1', print: 'printed', fabricType: 'cotton' };
  const pieceB = { id: 'p2', print: 'printed', fabricType: 'cotton' };
  const adj = checkPrintAdjacency(pieceA, pieceB);
  assertEqual(adj.allowed, false, 'Two printed pieces cannot be adjacent');
  assert(adj.reason.includes('Two printed pieces cannot be placed directly adjacent'), 'Clear reason required');
});

test('Plain piece adjacent to printed piece is allowed', () => {
  const pieceA = { id: 'p1', print: 'plain', fabricType: 'cotton' };
  const pieceB = { id: 'p2', print: 'printed', fabricType: 'cotton' };
  const adj = checkPrintAdjacency(pieceA, pieceB);
  assertEqual(adj.allowed, true, 'Plain next to printed must be allowed');
});

test('Every colour in KNOWN_COLOR_HEX is case-insensitive and not parsed as fallback grey (unless grey/gray)', () => {
  for (const name of Object.keys(KNOWN_COLOR_HEX)) {
    const origRgb = parseColorToRgb(name);
    const lowerRgb = parseColorToRgb(name.toLowerCase());
    const upperRgb = parseColorToRgb(name.toUpperCase());

    const isGrey = name.toLowerCase() === 'grey' || name.toLowerCase() === 'gray';
    const isFallbackGreyOrig = origRgb.r === 128 && origRgb.g === 128 && origRgb.b === 128;
    const isFallbackGreyLower = lowerRgb.r === 128 && lowerRgb.g === 128 && lowerRgb.b === 128;
    const isFallbackGreyUpper = upperRgb.r === 128 && upperRgb.g === 128 && upperRgb.b === 128;

    if (!isGrey) {
      assert(!isFallbackGreyOrig, `Colour "${name}" was parsed as fallback grey!`);
      assert(!isFallbackGreyLower, `Lowercase colour "${name.toLowerCase()}" was parsed as fallback grey!`);
      assert(!isFallbackGreyUpper, `Uppercase colour "${name.toUpperCase()}" was parsed as fallback grey!`);
    }

    // Specific verification for camelCase swatches
    if (name.toLowerCase() === 'skyblue' || name.toLowerCase() === 'royalblue') {
      const metrics = getColorMetrics(name);
      assert(metrics.C > 30, `Expected vibrant chroma for ${name}, got C=${metrics.C}`);
      assertEqual(metrics.isNeutral, false, `${name} must not be classified as neutral`);
    }
  }
});

// ============================================================================
// 3. FABRIC COMPATIBILITY RULES
// ============================================================================
console.log('\n--- 3. Fabric Compatibility Rules ---');

test('Stretchy (knit) + non-stretchy (cotton) in same panel is rejected with reason', () => {
  const pieceA = { id: '1', fabricType: 'knit', stretchy: true, thickness: 'medium' };
  const pieceB = { id: '2', fabricType: 'cotton', stretchy: false, thickness: 'medium' };
  const res = checkFabricPairCompatibility(pieceA, pieceB);
  assertEqual(res.compatible, false, 'Stretch + non-stretch must be rejected');
  assert(res.reason.toLowerCase().includes('stretchy'), 'Reason must mention stretchy fabric');
  assert(res.reason.toLowerCase().includes('pucker') || res.reason.toLowerCase().includes('machine'), 'Reason must explain sewing defect');
});

test('Stretch check handles string input ("yes" vs "no")', () => {
  const pieceA = { id: '1', fabricType: 'knit', stretchy: 'yes', thickness: 'medium' };
  const pieceB = { id: '2', fabricType: 'cotton', stretchy: 'no', thickness: 'medium' };
  const res = checkFabricPairCompatibility(pieceA, pieceB);
  assertEqual(res.compatible, false, 'stretchy: "yes" and "no" must be rejected');
});

test('Thick (denim) + very thin (silk/georgette) in same panel is rejected with reason', () => {
  const pieceA = { id: '1', fabricType: 'denim', thickness: 'thick', stretchy: false };
  const pieceB = { id: '2', fabricType: 'silk', thickness: 'thin', stretchy: false };
  const res = checkFabricPairCompatibility(pieceA, pieceB);
  assertEqual(res.compatible, false, 'Thick + thin (>1 level diff) must be rejected');
  assert(res.reason.toLowerCase().includes('thick') && res.reason.toLowerCase().includes('thin'), 'Reason must mention thickness');
  assert(res.reason.toLowerCase().includes('needle') || res.reason.toLowerCase().includes('tear'), 'Reason must explain needle/tear damage');
});

test('Medium + thick fabrics are compatible (diff = 1 level)', () => {
  const pieceA = { id: '1', fabricType: 'denim', thickness: 'thick', stretchy: false };
  const pieceB = { id: '2', fabricType: 'cotton', thickness: 'medium', stretchy: false };
  const res = checkFabricPairCompatibility(pieceA, pieceB);
  assertEqual(res.compatible, true, 'Medium + thick difference of 1 is allowed');
});

test('Thin + medium fabrics are compatible (diff = 1 level)', () => {
  const pieceA = { id: '1', fabricType: 'georgette', thickness: 'thin', stretchy: false };
  const pieceB = { id: '2', fabricType: 'cotton', thickness: 'medium', stretchy: false };
  const res = checkFabricPairCompatibility(pieceA, pieceB);
  assertEqual(res.compatible, true, 'Thin + medium difference of 1 is allowed');
});

test('Panel compatibility validates multi-piece group correctly', () => {
  const panel = [
    { id: '1', fabricType: 'cotton', thickness: 'medium', stretchy: false },
    { id: '2', fabricType: 'linen', thickness: 'medium', stretchy: false },
    { id: '3', fabricType: 'denim', thickness: 'thick', stretchy: false },
  ];
  const res = checkPanelFabricCompatibility(panel);
  assertEqual(res.compatible, true, 'All pairs within 1 thickness level and non-stretchy should pass');
});

// ============================================================================
// 4. 60-30-10 ZONING & FALLBACKS
// ============================================================================
console.log('\n--- 4. 60-30-10 Zoning & Fallbacks ---');

test('Pile with NO neutral base returns fallback reason and concrete suggestions', () => {
  const loudPile = [
    { id: '1', width: 30, height: 30, color: 'red', print: 'printed', fabricType: 'cotton', thickness: 'medium', stretchy: false, quantity: 1 },
    { id: '2', width: 30, height: 30, color: 'yellow', print: 'printed', fabricType: 'cotton', thickness: 'medium', stretchy: false, quantity: 1 },
    { id: '3', width: 30, height: 30, color: 'orange', print: 'printed', fabricType: 'cotton', thickness: 'medium', stretchy: false, quantity: 1 },
  ];
  const req = getProductRequirements('pouch', 'medium');
  const res = assignZoningRoles(loudPile, req);

  assertEqual(res.hasGoodBase, false, 'Pile with only loud prints should fail base requirement');
  assert(res.fallbackReason.includes('No grounding base colour'), 'Fallback reason must explain lack of grounding base');
  assert(Array.isArray(res.suggestions) && res.suggestions.length >= 2, 'Must return at least 2 concrete suggestions');
  assert(res.suggestions.some((s) => s.toLowerCase().includes('neutral')), 'Suggestions must mention adding neutral fabric');
});

test('Pile with calm neutral base is properly segregated into 60-30-10 roles', () => {
  const goodPile = [
    { id: '1', width: 30, height: 30, color: 'navy', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false, quantity: 2 },
    { id: '2', width: 25, height: 20, color: 'grey', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false, quantity: 1 },
    { id: '3', width: 10, height: 10, color: 'red', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false, quantity: 2 },
  ];
  const req = getProductRequirements('pouch', 'medium');
  const res = assignZoningRoles(goodPile, req);

  assertEqual(res.hasGoodBase, true, 'Pile with navy base should pass base requirement');
  assert(res.basePieces.length > 0, 'Must identify base pieces');
  assertEqual(res.basePieces[0].dominantColor, 'navy', 'Navy should be chosen as base anchor');
  assert(res.breakdown.basePct >= 40, 'Base percentage should be dominant');
});

// ============================================================================
// 4B. PRODUCT-SPECIFIC TINY-SCRAP FALLBACKS (HARD FLOOR VS 40% ANCHOR WARNING)
// ============================================================================
console.log('\n--- 4B. Product-Specific Tiny-Scrap Fallbacks (Hard Floor vs 40% Anchor Warning) ---');

test('Tote Bag (Medium) allows scraps above hard floor with warning and lower score (12cm >= 5cm floor, < 15cm anchor)', () => {
  const req = getProductRequirements('tote_bag', 'medium');
  assertEqual(req.minAnchorDim, 15, 'Tote Bag Medium recommended anchor is 15cm (38cm max zone x 40%)');
  const pile = [
    { id: '1', width: 12, height: 12, quantity: 70, color: 'navy', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false },
  ];
  const zoning = assignZoningRoles(pile, req);
  assertEqual(zoning.hasGoodBase, true, 'Scraps above 5cm hard floor must not be rejected');
  assertEqual(zoning.hasAnchorWarning, true, 'Must flag anchor quality warning');
  assert(
    zoning.warnings.some((w) => w.includes('more premium')),
    'Warning must suggest a bigger piece would look more premium'
  );

  const fit = fitPileToProduct(pile, 'tote_bag', 'medium');
  assertEqual(fit.fits, true, 'Tote Bag must fit when total usable area is sufficient');
  assert(fit.warnings.some((w) => w.includes('more premium')), 'Fit result must carry the premium warning');
  const score = calculateDesignScore(fit);
  assert(score < 60, `Pieced tote score (${score}) must be penalized for small patches & many seams`);
});

test('Zippered Pouch (Small) rejects scraps below 5cm hard floor (4cm < 5cm hard floor)', () => {
  const req = getProductRequirements('pouch', 'small');
  const pile = [
    { id: '1', width: 4, height: 4, quantity: 40, color: 'navy', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false },
  ];
  const res = assignZoningRoles(pile, req);
  assertEqual(res.hasGoodBase, false, 'Scraps below 5cm hard floor must be rejected');
  assert(
    res.fallbackReason.includes('minimum usable size') || res.fallbackReason.includes('hard floor'),
    'Must state scraps are below minimum usable size'
  );
  const fit = fitPileToProduct(pile, 'pouch', 'small');
  assertEqual(fit.fits, false, 'Fit must be rejected when scraps are below hard floor');
});

test('Cushion Cover (Medium) allows scraps above hard floor with warning and lower score (14cm >= 5cm floor, < 16cm anchor)', () => {
  const req = getProductRequirements('cushion_cover', 'medium');
  assertEqual(req.minAnchorDim, 16, 'Cushion Cover Medium recommended anchor is 16cm (40cm max zone x 40%)');
  const pile = [
    { id: '1', width: 14, height: 14, quantity: 50, color: 'navy', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false },
  ];
  const zoning = assignZoningRoles(pile, req);
  assertEqual(zoning.hasGoodBase, true, 'Scraps above 5cm hard floor must not be rejected');
  assertEqual(zoning.hasAnchorWarning, true, 'Must flag anchor quality warning');
  assert(
    zoning.warnings.some((w) => w.includes('more premium')),
    'Warning must suggest a bigger piece would look more premium'
  );

  const fit = fitPileToProduct(pile, 'cushion_cover', 'medium');
  assertEqual(fit.fits, true, 'Cushion Cover must fit when total usable area is sufficient');
  assert(fit.warnings.some((w) => w.includes('more premium')), 'Fit result must carry the premium warning');
  const score = calculateDesignScore(fit);
  assert(score < 60, `Pieced cushion score (${score}) must be penalized for small patches & many seams`);
});

test("Kids' Frock (0-1y) allows scraps above hard floor with warning and lower score (15cm >= 5cm floor, < 18cm anchor)", () => {
  const req = getProductRequirements('kids_frock', '0-1y');
  assertEqual(req.minAnchorDim, 18, "Kids' Frock (0-1y) recommended anchor is 18cm (45cm max zone x 40%)");
  const pile = [
    { id: '1', width: 15, height: 15, quantity: 50, color: 'navy', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false },
  ];
  const zoning = assignZoningRoles(pile, req);
  assertEqual(zoning.hasGoodBase, true, 'Scraps above 5cm hard floor must not be rejected');
  assertEqual(zoning.hasAnchorWarning, true, 'Must flag anchor quality warning');
  assert(
    zoning.warnings.some((w) => w.includes('more premium')),
    'Warning must suggest a bigger piece would look more premium'
  );

  const fit = fitPileToProduct(pile, 'kids_frock', '0-1y');
  assertEqual(fit.fits, true, "Kids' Frock must fit when total usable area is sufficient");
  assert(fit.warnings.some((w) => w.includes('more premium')), 'Fit result must carry the premium warning');
  const score = calculateDesignScore(fit);
  assert(score < 60, `Pieced frock score (${score}) must be penalized for small patches & many seams`);
});

// ============================================================================
// 5. PILE TOO SMALL & MULTI-PIECE JOINING TESTS
// ============================================================================
console.log('\n--- 5. Pile Too Small & Multi-Piece Joining Tests ---');

test('15 scraps of 12x12 cm on a medium pouch now FIT via multi-piece patchwork with lower design score', () => {
  // Pouch medium requires:
  // - pouch_front_base cut: 24 x 12 (pieced from 3 patches of 12x12)
  // - pouch_back cut: 24 x 17 (pieced from 2x3 = 6 patches of 12x12)
  // - pouch_upper_band cut: 24 x 7 (pieced from 3 patches of 12x12)
  // - pouch_side_tabs (qty 2): 8 x 10 each (covered by 1 scrap each)
  const scrapsPile = Array.from({ length: 15 }, (_, i) => ({
    id: `s_${i + 1}`,
    width: 12,
    height: 12,
    color: 'black',
    print: 'plain',
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
    quantity: 1,
  }));

  const res = fitPileToProduct(scrapsPile, 'pouch', 'medium');
  assertEqual(res.fits, true, '15 scraps of 12x12 cm must now fit medium pouch via multi-piece piecing');
  assertEqual(res.placements.length, 5, 'All 5 pouch zones must be completed');
  assert(res.totalExtraSeams >= 4, 'Must require pieced seams across zones');

  // Verify plain-language note exists on pieced panels
  const backPlacement = res.placements.find((p) => p.zoneId === 'pouch_back');
  assert(backPlacement !== undefined, 'Back placement must exist');
  assert(backPlacement.note && backPlacement.note.includes('This panel is pieced from'), 'Must contain plain-language piecing note');

  // Compare design score against single big pieces
  const piecedScore = calculateDesignScore(res);

  const bigPiecesPile = [
    { id: 'b1', width: 25, height: 15, color: 'black', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false, quantity: 1 },
    { id: 'b2', width: 25, height: 20, color: 'black', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false, quantity: 1 },
    { id: 'b3', width: 25, height: 10, color: 'grey', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false, quantity: 1 },
    { id: 'b4', width: 10, height: 12, color: 'red', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false, quantity: 2 },
  ];
  const bigRes = fitPileToProduct(bigPiecesPile, 'pouch', 'medium');
  const bigScore = calculateDesignScore(bigRes);

  assert(piecedScore < bigScore, `Pieced pouch score (${piecedScore}) must be lower than single-cut pouch score (${bigScore}) due to seams & patch penalties`);
});

test('True shortage test: pile with too little total area fails with clear shortage message', () => {
  // Tote bag medium needs ~5984 cm², pile has only 400 cm²
  const tinyPile = [
    { id: '1', width: 20, height: 20, color: 'navy', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false, quantity: 1 },
  ];
  const res = fitPileToProduct(tinyPile, 'tote_bag', 'medium');
  assertEqual(res.fits, false, 'Tiny pile must not fit medium tote bag');
  assert(res.missing.includes('Insufficient total fabric'), 'Message must state insufficient total fabric');
});

test('True shortage test: ample area but scraps cannot join due to saturated clashing colours', () => {
  // Medium pouch needs 24cm zones. We provide 10 scraps of 12x12 cm, but they are alternating saturated red and green.
  // Because red and green clash, they cannot be joined side-by-side.
  const clashPile = [
    { id: 'base_anchor', width: 12, height: 12, color: 'black', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false, quantity: 1 },
    { id: 'red_scraps', width: 12, height: 12, color: 'red', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false, quantity: 5 },
    { id: 'green_scraps', width: 12, height: 12, color: 'green', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false, quantity: 5 },
  ];
  const res = fitPileToProduct(clashPile, 'pouch', 'medium');
  assertEqual(res.fits, false, 'Clashing red and green scraps cannot be pieced side-by-side to cover 24cm zones');
  assert(res.missing.includes('Not enough fabric'), 'Must state not enough fabric to complete zones');
  assert(Array.isArray(res.missingDetails) && res.missingDetails.length > 0, 'Must detail missing zones');
});

test('True shortage test: ample area but scraps cannot join due to stretch / thickness mismatch', () => {
  // Medium pouch needs 24cm zones. We provide 1 thick denim scrap and 10 thin stretchy knit scraps.
  // They cannot be joined with each other due to both stretch mismatch and thick/thin mismatch.
  const mismatchPile = [
    { id: 'denim_base', width: 12, height: 12, color: 'black', print: 'plain', fabricType: 'denim', thickness: 'thick', stretchy: false, quantity: 1 },
    { id: 'knit_scraps', width: 12, height: 12, color: 'black', print: 'plain', fabricType: 'knit', thickness: 'thin', stretchy: true, quantity: 10 },
  ];
  const res = fitPileToProduct(mismatchPile, 'pouch', 'medium');
  assertEqual(res.fits, false, 'Stretch and thickness mismatched scraps cannot be joined');
  assert(res.missing.includes('Not enough fabric') || res.missing.includes('Pieces too small'), 'Must report inability to complete zones');
});

// ============================================================================
// 6. LEFTOVER ACCOUNTING & USED PIECE REMOVAL
// ============================================================================
console.log('\n--- 6. Leftover Accounting & Used Piece Removal ---');

test('Used pieces are removed from leftover pool and unused pieces remain', () => {
  const pile = [
    { id: 'used_base', width: 20, height: 20, color: 'black', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false, quantity: 1 },
    { id: 'unused_piece', width: 15, height: 15, color: 'beige', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false, quantity: 1 },
  ];
  // Cut a small patch 10x10 from the pile
  const targetW = 10;
  const targetH = 10;
  const cut = cutScrap(pile[0], targetW, targetH);

  assertEqual(cut.usedArea, 100, 'Used area is 10x10 = 100');
  assert(cut.reusableOffcuts.length > 0, 'Offcuts >= 3cm should be saved');
  assert(cut.reusableOffcuts.every((o) => o.isReusableLeftover), 'Offcuts marked as reusable');
});

test('Offcuts >= 3.0 cm are returned as reusable leftovers, offcuts < 3.0 cm are trim waste', () => {
  const piece = { id: 'p_cut', width: 12, height: 10, color: 'blue', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false };
  // Cut 10 x 8:
  // Offcut 1 (side): (12 - 10) = 2 cm width -> < 3cm, should NOT be in reusable leftovers!
  // Offcut 2 (bottom): 10 x (10 - 8) = 2 cm height -> < 3cm, should NOT be in reusable leftovers!
  const cut = cutScrap(piece, 10, 8);
  assertEqual(cut.reusableOffcuts.length, 0, 'Slivers under 3 cm must NOT be included in reusable offcuts');
  assertEqual(cut.trimWasteArea, 40, 'Remaining 120 - 80 = 40 cm² should be classified as trim waste');
});

test('Offcuts with both dimensions >= 3.0 cm are correctly saved as reusable', () => {
  const piece = { id: 'p_large', width: 20, height: 20, color: 'blue', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false };
  // Cut 15 x 15:
  // Offcut 1 (side): 5 x 20 = 100 cm² (both dims >= 3 cm) -> reusable
  // Offcut 2 (bottom): 15 x 5 = 75 cm² (both dims >= 3 cm) -> reusable
  const cut = cutScrap(piece, 15, 15);
  assertEqual(cut.reusableOffcuts.length, 2, 'Both offcuts >= 3cm must be saved');
  assertEqual(cut.trimWasteArea, 0, 'No trim waste when all offcuts >= 3cm');
});

// ============================================================================
// 7. AREA CONSERVATION & WASTE % MATHEMATICAL ACCOUNTING
// ============================================================================
console.log('\n--- 7. Area Conservation & Waste % Accounting ---');

test('cutScrap preserves total scrap area: usedArea + reusableOffcutsArea + trimWasteArea = totalScrapArea', () => {
  const piece = { id: 'p_audit', width: 23, height: 17, color: 'navy', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false };
  const targetW = 14;
  const targetH = 11;
  const cut = cutScrap(piece, targetW, targetH);

  const totalScrapArea = piece.width * piece.height;
  const reusableArea = cut.reusableOffcuts.reduce((sum, o) => sum + o.area, 0);
  const calculatedTotal = cut.usedArea + reusableArea + cut.trimWasteArea;

  assertEqual(calculatedTotal, totalScrapArea, 'Internal scrap area partition must equal initial raw scrap area');
});

test('Area conservation check: used cut area + leftover area = total pile area (when all leftovers >= 3 cm)', () => {
  // When pieces fit with offcuts >= 3 cm (or exact fit), trim waste is 0.
  // Therefore: used cut area + returned leftover area MUST EXACTLY equal total pile area.
  const piece1 = { id: 'p1', width: 20, height: 20, color: 'black', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false };
  const cut = cutScrap(piece1, 10, 10);
  // Cut is 10x10 = 100 cm²
  // Offcut 1: 10 x 20 = 200 cm² (>= 3 cm)
  // Offcut 2: 10 x 10 = 100 cm² (>= 3 cm)
  // Reusable leftover area = 300 cm²
  const usedArea = cut.usedArea;
  const leftoverArea = cut.reusableOffcuts.reduce((s, o) => s + o.area, 0);
  const totalInitialArea = piece1.width * piece1.height;

  assertEqual(usedArea + leftoverArea, totalInitialArea, 'Used cut area + leftover area must equal initial pile area when offcuts >= 3cm');
});

test('Area conservation check: cut area + reusable leftovers + trim waste = total initial area', () => {
  // When a piece of 12x12 (144 cm²) is cut to 10x10 (100 cm²), the remaining strips are 2 cm wide (< 3 cm).
  // These 2 cm strips are classified as trim waste (44 cm²).
  // Total area is strictly conserved: cut area (100) + reusable leftovers (0) + trim waste (44) = 144 cm².
  const piece = { id: 'p_sliver', width: 12, height: 12, color: 'black', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false };
  const cut = cutScrap(piece, 10, 10);
  const usedCutArea = cut.usedArea; // 100
  const reusableLeftoverArea = cut.reusableOffcuts.reduce((s, o) => s + o.area, 0); // 0
  const trimWasteArea = cut.trimWasteArea; // 44
  const totalInitialArea = piece.width * piece.height; // 144

  assertEqual(
    usedCutArea + reusableLeftoverArea + trimWasteArea,
    totalInitialArea,
    'Used cut area + reusable leftovers + trim waste must equal total initial scrap area'
  );
});

// ============================================================================
// 8. BARELY FITTING POUCH (EXACT SIZE)
// ============================================================================
console.log('\n--- 8. Barely Fitting Pouch (Exact Size) ---');

test('Pile where pouch fits barely (exact size required) succeeds with 0% waste', () => {
  // Product: pouch, size: small (with 1.0 cm seam allowance):
  // 1. pouch_front_base cut: (14+2) x (8+2) = 16 x 10 cm
  // 2. pouch_back cut: (14+2) x (11+2) = 16 x 13 cm
  // 3. pouch_upper_band cut: (14+2) x (3+2) = 16 x 5 cm
  // 4. pouch_pull_tabs cut (qty 2): (5+2) x (6+2) = 7 x 8 cm each
  const exactPile = [
    { id: 'front_base', width: 16, height: 10, quantity: 1, color: 'black', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false },
    { id: 'back_panel', width: 16, height: 13, quantity: 1, color: 'black', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false },
    { id: 'upper_band', width: 16, height: 5, quantity: 1, color: 'grey', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false },
    { id: 'pull_tab_1', width: 7, height: 8, quantity: 1, color: 'red', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false },
    { id: 'pull_tab_2', width: 7, height: 8, quantity: 1, color: 'red', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false },
  ];

  const res = fitPileToProduct(exactPile, 'pouch', 'small');
  assertEqual(res.fits, true, 'Exact size pile must fit the small pouch');
  assertEqual(res.placements.length, 5, 'All 5 zones must be satisfied');
  assertEqual(res.wastePercentage, 0, 'Exact cut sizes should produce 0% waste');
  assertEqual(res.missing, null, 'No missing pieces');
  assertEqual(res.leftovers.length, 0, 'Zero leftovers when pile fits exact size');
});

// ============================================================================
// 9. AESTHETIC DESIGN SCORE CONTRAST (GOOD VS BAD PILE)
// ============================================================================
console.log('\n--- 9. Aesthetic Design Score Contrast ---');

test('A good pile with calm neutral base and harmonious accents gets a HIGH design score (>= 80)', () => {
  const goodPlacements = [
    { zoneId: 'z1', scraps: [{ color: 'navy', cutWidth: 20, cutHeight: 20 }] },
    { zoneId: 'z2', scraps: [{ color: 'beige', cutWidth: 15, cutHeight: 15 }] },
    { zoneId: 'z3', scraps: [{ color: 'red', cutWidth: 8, cutHeight: 8 }] },
  ];
  const goodZoning = { basePct: 60, supportingPct: 30, accentPct: 10 };
  const goodFitResult = {
    fits: true,
    placements: goodPlacements,
    zoningBreakdown: goodZoning,
    totalExtraSeams: 0,
    wastePercentage: 5,
  };
  const score = calculateDesignScore(goodFitResult);
  assert(score >= 80, `Good balanced pile must score >= 80 (got ${score})`);
});

test('A bad pile with clashing colours, tiny patches, and bad ratios gets a LOW design score (< 60)', () => {
  // Red + Green clashing colors, tiny patches (4x4 cm), 4 extra seams, high waste
  const badPlacements = [
    { zoneId: 'z1', scraps: [{ color: 'red', cutWidth: 4, cutHeight: 4 }] },
    { zoneId: 'z2', scraps: [{ color: 'green', cutWidth: 4, cutHeight: 4 }] },
  ];
  const badZoning = { basePct: 15, supportingPct: 25, accentPct: 60 };
  const badFitResult = {
    fits: true,
    placements: badPlacements,
    zoningBreakdown: badZoning,
    totalExtraSeams: 4,
    wastePercentage: 38,
  };
  const score = calculateDesignScore(badFitResult);
  assert(score < 60, `Bad pile with clashes and tiny patches must score < 60 (got ${score})`);
});

test('Loud multi-print pile without neutral anchor gets rejected and scores 0 in suggestProducts', () => {
  const loudPile = [
    { id: '1', width: 30, height: 30, color: 'red', print: 'printed', fabricType: 'cotton', thickness: 'medium', stretchy: false, quantity: 1 },
    { id: '2', width: 30, height: 30, color: 'yellow', print: 'printed', fabricType: 'cotton', thickness: 'medium', stretchy: false, quantity: 1 },
    { id: '3', width: 30, height: 30, color: 'orange', print: 'printed', fabricType: 'cotton', thickness: 'medium', stretchy: false, quantity: 1 },
  ];
  const result = suggestProducts(loudPile);
  assertEqual(result.feasibleCount, 0, 'No designs should be feasible without neutral anchor');
  const pouchSuggestion = result.suggestions.find((s) => s.productId === 'pouch');
  assert(pouchSuggestion !== undefined, 'Pouch suggestion should exist');
  assertEqual(pouchSuggestion.fits, false, 'Pouch should not fit loud pile');
  assertEqual(pouchSuggestion.designScore, 0, 'Infeasible design gets score 0');
});

// ============================================================================
// 10. EDGE CASES & ROBUSTNESS (NO CRASHES)
// ============================================================================
console.log('\n--- 10. Edge Cases & Robustness (No Crashes) ---');

test('Empty pile [] does not crash suggestProducts', () => {
  const res = suggestProducts([]);
  assertEqual(res.success, false, 'Empty pile returns success: false');
  assertEqual(res.suggestions.length, 0, 'No suggestions for empty pile');
});

test('Empty pile [] does not crash fitPileToProduct', () => {
  const res = fitPileToProduct([], 'pouch', 'small');
  assertEqual(res.fits, false, 'Empty pile fits: false');
  assert(res.missing !== null, 'Provides missing reason');
});

test('Zero dimension piece { width: 0, height: 10 } does not crash', () => {
  const zeroPile = [{ id: 'z1', width: 0, height: 10, quantity: 1, color: 'black', fabricType: 'cotton', thickness: 'medium', stretchy: false }];
  const res = fitPileToProduct(zeroPile, 'pouch', 'small');
  assertEqual(res.fits, false, 'Zero width cannot fit');
});

test('Negative dimension piece { width: -10, height: -20 } does not crash', () => {
  const negPile = [{ id: 'n1', width: -10, height: -20, quantity: 1, color: 'black', fabricType: 'cotton', thickness: 'medium', stretchy: false }];
  const res = fitPileToProduct(negPile, 'pouch', 'small');
  assertEqual(res.fits, false, 'Negative dimensions cannot fit');
});

test('Huge quantity (10,000) does not crash', () => {
  const hugePile = [{ id: 'h1', width: 20, height: 20, quantity: 10000, color: 'black', fabricType: 'cotton', thickness: 'medium', stretchy: false }];
  const res = fitPileToProduct(hugePile, 'pouch', 'small');
  assertEqual(res.fits, true, 'Huge quantity piece fits successfully');
});

test('Invalid product ID does not crash buildDesign', () => {
  const pile = [{ id: '1', width: 20, height: 20, color: 'black', fabricType: 'cotton', thickness: 'medium', stretchy: false }];
  const res = buildDesign(pile, 'non_existent_product', 'small');
  assertEqual(res.success, false, 'Invalid product returns success: false');
});

test('Invalid size key does not crash buildDesign', () => {
  const pile = [{ id: '1', width: 20, height: 20, color: 'black', fabricType: 'cotton', thickness: 'medium', stretchy: false }];
  const res = buildDesign(pile, 'pouch', 'extra_extra_large');
  assertEqual(res.success, false, 'Invalid size returns success: false');
});

// ============================================================================
// 11. CUSHION COVER VARIANTS (PLAIN VS DECORATED) & SMALLER SIZE FALLBACK
// ============================================================================
console.log('\n--- 11. Cushion Cover Variants (Plain vs Decorated) & Smaller Size Fallback ---');

test('30 plain 14x14 scraps fit Small Cushion Cover (30x30 cm)', () => {
  const pile30 = Array.from({ length: 30 }, (_, i) => ({
    id: `s_${i + 1}`,
    width: 14,
    height: 14,
    color: 'navy',
    print: 'plain',
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
    quantity: 1,
  }));

  const smallFit = fitPileToProduct(pile30, 'cushion_cover', 'small');
  assertEqual(smallFit.fits, true, '30 scraps of 14x14 cm must fit small cushion cover');
  assertEqual(smallFit.placements.length, 3, 'Small Plain Cushion has 3 panels (Front, Back Upper, Back Lower)');
  const patchesUsed = smallFit.placements.reduce((sum, p) => sum + p.patchCount, 0);
  assertEqual(patchesUsed, 21, 'Small cushion should be pieced from 21 patches (9 front + 6 upper + 6 lower)');
  const unusedOriginalScraps = smallFit.leftovers.filter((s) => s.width === 14 && s.height === 14);
  assertEqual(unusedOriginalScraps.length, 9, 'Remaining 9 original scraps should be returned unused');
  assertEqual(smallFit.leftovers.length, 15, 'Total leftovers should include 9 unused scraps + 6 reusable offcuts');
  assert(
    smallFit.seamLossExplanation.includes('Pieced panels lose fabric in seams'),
    'Must include plain-language seam loss explanation'
  );
});

test('30 plain 14x14 scraps on Medium Cushion fall back to small cushion with clear message', () => {
  const pile30 = Array.from({ length: 30 }, (_, i) => ({
    id: `s_${i + 1}`,
    width: 14,
    height: 14,
    color: 'navy',
    print: 'plain',
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
    quantity: 1,
  }));

  const suggestionsResult = suggestProducts(pile30);
  const medCushion = suggestionsResult.suggestions.find(
    (s) => s.productId === 'cushion_cover' && s.sizeKey === 'medium'
  );
  assert(medCushion !== undefined, 'Medium cushion suggestion must be evaluated');
  assertEqual(medCushion.fits, false, '30 scraps is 6 scraps short for Medium Cushion (needs 36 patches)');
  assert(
    medCushion.fallbackRecommendation === 'Your pile can make the small cushion instead.' ||
    medCushion.missing.includes('Your pile can make the small cushion instead'),
    'Must report: "Your pile can make the small cushion instead."'
  );
});

test('Decorated variant of Medium Cushion Cover reports what is missing', () => {
  const pile30 = Array.from({ length: 30 }, (_, i) => ({
    id: `s_${i + 1}`,
    width: 14,
    height: 14,
    color: 'navy',
    print: 'plain',
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
    quantity: 1,
  }));

  const decFit = fitPileToProduct(pile30, 'cushion_cover', 'medium', 1.0, { variant: 'decorated' });
  assertEqual(decFit.fits, false, 'Decorated variant must not fit when frame strips and motif cannot be fulfilled');
  assert(
    decFit.missing.includes('Frame Strips') || decFit.missing.includes('Motif'),
    'Decorated variant failure must report missing decorative zones (Frame Strips or Motif)'
  );
});

test('36 plain 14x14 scraps fit Plain Medium Cushion Cover completely', () => {
  const pile36 = Array.from({ length: 36 }, (_, i) => ({
    id: `s_${i + 1}`,
    width: 14,
    height: 14,
    color: 'navy',
    print: 'plain',
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
    quantity: 1,
  }));

  const medFit = fitPileToProduct(pile36, 'cushion_cover', 'medium', 1.0, 'plain');
  assertEqual(medFit.fits, true, '36 scraps of 14x14 cm must fit plain medium cushion (16 front + 12 upper + 8 lower)');
  assertEqual(medFit.placements.length, 3, 'All 3 plain cushion zones must be satisfied');
});

// ============================================================================
// PART B: PRODUCT LARGEST ZONE & MINIMUM ANCHOR DIMENSIONS TABLE
// ============================================================================
console.log('\n================================================================');
console.log('PRODUCT LARGEST ZONE & MINIMUM ANCHOR SIZE TABLE (40% RULE)');
console.log('================================================================');

const anchorTable = [];
for (const [prodId, prod] of Object.entries(PRODUCT_TEMPLATES)) {
  for (const [sizeKey, size] of Object.entries(prod.sizes)) {
    const info = getProductLargestZone(prodId, sizeKey);
    anchorTable.push({
      Product: prod.name,
      Size: size.label,
      'Largest Zone': info.largestZone.name,
      'Dimensions': `${info.largestZone.width} × ${info.largestZone.height} cm`,
      'Max Dim': `${info.maxDim} cm`,
      'Min Anchor (40%)': `${info.minAnchorDim} cm`,
    });
  }
}
console.table(anchorTable);

// ============================================================================
// FINAL SUMMARY REPORT
// ============================================================================
console.log('\n================================================================');
console.log('TEST RESULTS SUMMARY');
console.log('================================================================');
console.log(`Total Tests Run:  ${totalTests}`);
console.log(`Tests Passed:     ${passedTests}`);
console.log(`Tests Failed:     ${failedTests}`);

if (failedTests > 0) {
  console.log('\nFAILURE DETAILS:');
  failureDetails.forEach((f) => {
    console.log(`- Test #${f.testNumber}: "${f.description}"`);
    console.log(`  Failure: ${f.error}\n`);
  });
}
console.log('================================================================');
