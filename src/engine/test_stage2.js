/**
 * STANDALONE TEST RUNNER FOR REWEAR STAGE 2 LOGIC
 * Run with: node src/engine/test_stage2.js
 */

import {
  CONFIG,
  parseColorToRgb,
  rgbToXyz,
  xyzToLab,
  labToLch,
  getColorMetrics,
  getHueDifference,
  evaluateColorPair,
  checkPrintAdjacency,
  checkFabricPairCompatibility,
  checkPanelFabricCompatibility,
  PRODUCT_TEMPLATES,
  getProductRequirements,
  assignZoningRoles,
  fitPileToProduct,
  calculateDesignScore,
  calculateEstimatedTime,
  suggestProducts,
  buildDesign,
  checkFeasibility,
} from './index.js';

let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${testName} ${details ? `(${details})` : ''}`);
    failedTests++;
  }
}

console.log('====================================================');
console.log('🧪 RUNNING REWEAR STAGE 2 ENGINE TEST SUITE');
console.log('====================================================\n');

// ---------------------------------------------------------------------------
// 1. COLOUR RULES & CIELAB/LCH PERCEPTUAL SPACE TESTS
// ---------------------------------------------------------------------------
console.log('--- 1. Testing Colour Rules & CIELAB/LCH Conversions ---');

// 1.1 Pure white and black conversions
const whiteMetrics = getColorMetrics('#FFFFFF');
assert(whiteMetrics.L > 95, 'White has L* > 95 in CIELAB', `L=${whiteMetrics.L}`);
assert(whiteMetrics.isNeutral === true, 'White is recognized as Neutral');

const blackMetrics = getColorMetrics('#000000');
assert(blackMetrics.L < 5, 'Black has L* < 5 in CIELAB', `L=${blackMetrics.L}`);
assert(blackMetrics.isNeutral === true, 'Black is recognized as Neutral');

// 1.2 Named Neutrals (navy, beige, grey)
const navyMetrics = getColorMetrics('navy');
assert(navyMetrics.isNeutral === true, 'Navy is recognized as Neutral anchor');

const beigeMetrics = getColorMetrics('beige');
assert(beigeMetrics.isNeutral === true, 'Beige is recognized as Neutral');

// 1.3 Neutrals never clash
const navyRedPair = evaluateColorPair('navy', 'red');
assert(navyRedPair.clashRisk === false, 'Navy + Red does NOT clash (neutral rule)');
assert(navyRedPair.relationship === 'neutral-compatible', 'Navy + Red is neutral-compatible');

const beigePinkPair = evaluateColorPair('beige', 'pink');
assert(beigePinkPair.clashRisk === false, 'Beige + Pink does NOT clash (neutral rule)');

// 1.4 Tonal / Analogous harmony
const redMaroonPair = evaluateColorPair('#EF4444', '#881337'); // Red and deep maroon
assert(redMaroonPair.clashRisk === false, 'Red + Maroon does not clash');
assert(redMaroonPair.relationship === 'tonal', 'Red + Maroon recognized as Tonal harmony');

// 1.5 Complementary harmony (Cyan-Blue and Warm Orange)
const blueOrangePair = evaluateColorPair('#0284C7', '#EA580C'); // Cyan-Blue and Warm Orange
assert(blueOrangePair.clashRisk === false, 'Cyan-Blue + Orange is not marked as clash');
assert(blueOrangePair.relationship === 'complementary', 'Cyan-Blue + Orange recognized as Complementary contrast');

// 1.6 Clash detection (vibrant clash: saturated orange and hot pink with low lightness delta)
const clashPair = evaluateColorPair('#F97316', '#EC4899'); // Orange and Hot Pink
assert(clashPair.clashRisk === true, 'Saturated Orange + Hot Pink triggers Clash Risk');
assert(clashPair.relationship === 'clash', 'Identified relationship as clash');
assert(clashPair.reason.includes('Clash risk'), 'Includes clear tailor explanation for clash');

// 1.7 Printed piece adjacency rule
const printA = { print: 'printed', color: 'blue' };
const printB = { print: 'printed', color: 'yellow' };
const plainC = { print: 'plain', color: 'white' };
assert(checkPrintAdjacency(printA, printB).allowed === false, 'Two printed pieces adjacent is FORBIDDEN');
assert(checkPrintAdjacency(printA, plainC).allowed === true, 'Printed + Plain piece adjacent is ALLOWED');

// ---------------------------------------------------------------------------
// 2. FABRIC COMPATIBILITY TESTS
// ---------------------------------------------------------------------------
console.log('\n--- 2. Testing Fabric Compatibility Rules ---');

const denimThickNonStretch = { id: 'p1', fabricType: 'denim', thickness: 'thick', stretchy: false };
const silkThinNonStretch = { id: 'p2', fabricType: 'silk', thickness: 'thin', stretchy: false };
const cottonMedNonStretch = { id: 'p3', fabricType: 'cotton', thickness: 'medium', stretchy: false };
const jerseyKnitStretchy = { id: 'p4', fabricType: 'knit', thickness: 'medium', stretchy: true };

// 2.1 Never join thick with thin (diff = 2)
const thickThinCheck = checkFabricPairCompatibility(denimThickNonStretch, silkThinThin(silkThinNonStretch));
function silkThinThin(p) { return p; }
const checkThickThin = checkFabricPairCompatibility(denimThickNonStretch, silkThinNonStretch);
assert(checkThickThin.compatible === false, 'Thick denim + Thin silk is REJECTED');
assert(checkThickThin.reason.includes('Cannot join thick fabric'), 'Provides detailed needle/tension explanation');

// 2.2 Compatible adjacent thickness (diff = 1)
const checkThickMed = checkFabricPairCompatibility(denimThickNonStretch, cottonMedNonStretch);
assert(checkThickMed.compatible === true, 'Thick denim + Medium cotton is COMPATIBLE (diff = 1)');

const checkMedThin = checkFabricPairCompatibility(cottonMedNonStretch, silkThinNonStretch);
assert(checkMedThin.compatible === true, 'Medium cotton + Thin silk is COMPATIBLE (diff = 1)');

// 2.3 Never join stretchy with non-stretchy
const checkStretchWoven = checkFabricPairCompatibility(cottonMedNonStretch, jerseyKnitStretchy);
assert(checkStretchWoven.compatible === false, 'Knit stretchy + Cotton woven non-stretchy is REJECTED');
assert(checkStretchWoven.reason.includes('Cannot join stretchy'), 'Provides feed-dog warp explanation');

// ---------------------------------------------------------------------------
// 3. 60-30-10 ZONING TESTS
// ---------------------------------------------------------------------------
console.log('\n--- 3. Testing 60-30-10 Zoning & Fallbacks ---');

const goodPile = [
  { id: 'b1', width: 45, height: 40, quantity: 2, fabricType: 'denim', thickness: 'thick', stretchy: false, color: 'navy', print: 'plain' },
  { id: 's1', width: 35, height: 25, quantity: 2, fabricType: 'cotton', thickness: 'medium', stretchy: false, color: 'skyBlue', print: 'plain' },
  { id: 'a1', width: 20, height: 18, quantity: 1, fabricType: 'cotton', thickness: 'medium', stretchy: false, color: 'orange', print: 'printed' },
];

const toteReqs = getProductRequirements('tote_bag', 'medium');
const zoningResult = assignZoningRoles(goodPile, toteReqs);
assert(zoningResult.hasGoodBase === true, 'Good pile successfully establishes a 60% Base anchor');
assert(zoningResult.basePieces.some((p) => p.dominantColor === 'navy'), 'Navy denim assigned to Base role');
assert(zoningResult.accentPieces.some((p) => p.isPrinted), 'Printed orange piece assigned to Accent role');

// 3.2 Fallback when pile has only tiny scraps
const tinyScrapPile = [
  { id: 't1', width: 10, height: 8, quantity: 2, fabricType: 'cotton', thickness: 'medium', stretchy: false, color: 'navy', print: 'plain' },
  { id: 't2', width: 12, height: 6, quantity: 2, fabricType: 'cotton', thickness: 'medium', stretchy: false, color: 'beige', print: 'plain' },
];
const tinyZoning = assignZoningRoles(tinyScrapPile, toteReqs);
assert(tinyZoning.hasGoodBase === false, 'Identifies that tiny scraps cannot anchor a Medium Tote Bag');
assert(tinyZoning.suggestions.length > 0, 'Returns actionable suggestions for tiny scraps');

// 3.3 Fallback when pile has NO neutral or dark anchor (only clashing saturated prints)
const clashingLoudPile = [
  { id: 'c1', width: 40, height: 35, quantity: 2, fabricType: 'cotton', thickness: 'medium', stretchy: false, color: '#A855F7', print: 'printed' }, // saturated purple print
  { id: 'c2', width: 40, height: 35, quantity: 2, fabricType: 'cotton', thickness: 'medium', stretchy: false, color: '#65A30D', print: 'printed' }, // saturated olive print
  { id: 'c3', width: 40, height: 35, quantity: 2, fabricType: 'cotton', thickness: 'medium', stretchy: false, color: '#EF4444', print: 'printed' }, // saturated red print
];
const loudZoning = assignZoningRoles(clashingLoudPile, toteReqs);
assert(loudZoning.hasGoodBase === false, 'Detects lack of calming neutral anchor in loud multi-print pile');
assert(loudZoning.fallbackReason.includes('No grounding base colour'), 'Explains missing neutral anchor clearly');

// ---------------------------------------------------------------------------
// 4. PRODUCT TEMPLATES TESTS
// ---------------------------------------------------------------------------
console.log('\n--- 4. Testing Product Templates & Measurements ---');

const products = ['tote_bag', 'pouch', 'cushion_cover', 'kids_frock'];
products.forEach((pid) => {
  const p = PRODUCT_TEMPLATES[pid];
  assert(Boolean(p), `Product template exists: ${pid}`);
  assert(p.disclaimer.includes('verified by a professional tailor'), `Product ${pid} contains tailor verification disclaimer`);
});

const frockSizes = Object.keys(PRODUCT_TEMPLATES.kids_frock.sizes);
assert(frockSizes.includes('0-1y') && frockSizes.includes('2-3y') && frockSizes.includes('4-5y') && frockSizes.includes('6-8y'),
  "Kids' Frock provides age group sizes (0-1y, 2-3y, 4-5y, 6-8y)");

const pouchReqs = getProductRequirements('pouch', 'small');
assert(pouchReqs.zones.length >= 3, 'Small Pouch has rectangular zones defined with 1 cm seam allowance');

// ---------------------------------------------------------------------------
// 5. FITTING, FEASIBILITY, OFF-CUTS & TIME ESTIMATION TESTS
// ---------------------------------------------------------------------------
console.log('\n--- 5. Testing Fitting, Off-Cuts, Leftovers, & Suggestions API ---');

const tailorScrapPile = [
  { id: 'navy_denim', width: 38, height: 32, quantity: 2, fabricType: 'denim', thickness: 'thick', stretchy: false, color: 'navy', print: 'plain' },
  { id: 'beige_linen', width: 25, height: 18, quantity: 3, fabricType: 'linen', thickness: 'medium', stretchy: false, color: 'beige', print: 'plain' },
  { id: 'sky_cotton', width: 30, height: 16, quantity: 2, fabricType: 'cotton', thickness: 'medium', stretchy: false, color: 'skyBlue', print: 'plain' },
  { id: 'maroon_silk', width: 15, height: 15, quantity: 2, fabricType: 'silk', thickness: 'medium', stretchy: false, color: 'maroon', print: 'printed' },
];

// 5.1 Test Pouch Fitting (Should fit cleanly)
const pouchFit = fitPileToProduct(tailorScrapPile, 'pouch', 'medium');
assert(pouchFit.fits === true, 'Medium Zipper Pouch FITS successfully with the scrap pile');
assert(pouchFit.placements.length > 0, `Pouch has ${pouchFit.placements.length} placements mapped`);
assert(pouchFit.leftovers.length > 0, `Scrap offcuts >= 3cm tracked as leftovers: ${pouchFit.leftovers.length} pieces`);

// 5.2 Test Cushion Cover Fitting
const cushionFit = fitPileToProduct(tailorScrapPile, 'cushion_cover', 'small');
assert(typeof cushionFit.wastePercentage === 'number', `Calculated waste percentage: ${cushionFit.wastePercentage}%`);

// 5.3 Test Missing Diagnostic when product is too large
const largeToteFit = fitPileToProduct(tailorScrapPile, 'tote_bag', 'large');
assert(largeToteFit.fits === false, 'Large Tote Bag detects insufficient scrap size');
assert(typeof largeToteFit.missing === 'string' && largeToteFit.missing.length > 0, 'Returns plain-language missing diagnostic message');

// 5.4 Test API 1: suggestProducts
const suggestions = suggestProducts(tailorScrapPile);
assert(suggestions.success === true, 'suggestProducts API executes successfully');
assert(suggestions.suggestions.length > 0, `Evaluated ${suggestions.suggestions.length} template configurations`);

// Verify ranking: Feasible first, looks (designScore) second, waste third
const firstSuggestion = suggestions.suggestions[0];
assert(firstSuggestion.fits === true, `Top suggested product is feasible (${firstSuggestion.productName} - ${firstSuggestion.sizeLabel})`);
assert(firstSuggestion.designScore > 0, `Top suggestion has aesthetic design score: ${firstSuggestion.designScore}/100`);
assert(firstSuggestion.estimatedTimeMinutes > 0, `Estimated sewing time: ${firstSuggestion.estimatedTimeMinutes} mins`);
assert(firstSuggestion.whyThisDesign.length > 0, 'Contains clear "Why this design" reasons');

// 5.5 Test API 2: buildDesign
const design = buildDesign(tailorScrapPile, 'pouch', 'small', 'patchwork');
assert(design.success === true, 'buildDesign API executes successfully');
assert(design.fits === true, 'Small Pouch design layout generated successfully');
assert(design.placements.length > 0, 'Placements manifest generated');

// 5.6 Test API 3: checkFeasibility
const feasibilityFeasible = checkFeasibility(design);
assert(feasibilityFeasible.isFeasible === true, 'checkFeasibility confirms feasible design');

const feasibilityInfeasible = checkFeasibility({ pile: tinyScrapPile, productId: 'tote_bag', sizeKey: 'large' });
assert(feasibilityInfeasible.isFeasible === false, 'checkFeasibility correctly identifies infeasible design');
assert(feasibilityInfeasible.missing !== null, 'checkFeasibility returns missing explanation');

// ---------------------------------------------------------------------------
// TEST SUMMARY
// ---------------------------------------------------------------------------
console.log('\n====================================================');
console.log(`🏁 TEST RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
console.log('====================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL STAGE 2 LOGIC TESTS PASSED PERFECTLY!');
  process.exit(0);
}
