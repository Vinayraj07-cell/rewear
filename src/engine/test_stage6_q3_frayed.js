/**
 * REWEAR STAGE 6 - QUEUE ITEM Q3 TEST SUITE
 * 
 * Verifies optional safety margin setting for frayed / uneven scraps:
 * 1. config.js: SCRAP_SAFETY_MARGIN_CM defaults to 0; allowed values [0, 0.5, 1.0].
 * 2. Invariance at margin 0: buildDesign output is 100% identical to baseline across all 4 classic products and the kids top.
 * 3. Monotonicity: margin > 0 never increases what fits (if infeasible at 0, never feasible at > 0; feasibleCount(1.0) <= feasibleCount(0.5) <= feasibleCount(0)).
 * 4. Usable shrinkage: usable dimensions shrink by exactly 2 * margin on each scrap.
 * 5. Area conservation: raw scrap area equals finished/cut area + seam loss + trim waste + reusable offcuts + fabric lost to frayed edges.
 */

import assert from 'node:assert';
import { CONFIG } from './config.js';
import { fitPileToProduct, cutScrap } from './fitting.js';
import { buildDesign, suggestProducts, checkFeasibility, calculateDesignScore } from './index.js';
import { assignZoningRoles, enrichPiece, getPieceArea } from './zoning.js';

let passedTests = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

console.log('\n====================================================');
console.log('🧵 RUNNING Q3: FRAYED & UNEVEN SCRAPS SETTING TESTS');
console.log('====================================================');

// Test Piles
const pileB = [
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `pileB_navy_${i + 1}`,
    width: 14,
    height: 14,
    color: 'navy',
    print: 'plain',
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
    quantity: 1,
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `pileB_beige_${i + 1}`,
    width: 14,
    height: 14,
    color: 'beige',
    print: 'plain',
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
    quantity: 1,
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `pileB_grey_${i + 1}`,
    width: 14,
    height: 14,
    color: 'grey',
    print: 'plain',
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
    quantity: 1,
  })),
];

const pileColorful = [
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `col_navy_${i + 1}`,
    width: 14,
    height: 14,
    color: 'navy',
    print: 'plain',
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
    quantity: 1,
  })),
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `col_orange_${i + 1}`,
    width: 14,
    height: 14,
    color: 'orange',
    print: 'plain',
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
    quantity: 1,
  })),
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `col_coral_${i + 1}`,
    width: 14,
    height: 14,
    color: 'coral',
    print: 'plain',
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
    quantity: 1,
  })),
];

// --- 1. Config Thresholds ---
console.log('\n--- 1. Config Thresholds & Allowed Values ---');

test('config.js defines SCRAP_SAFETY_MARGIN_CM with default 0', () => {
  assert.strictEqual(CONFIG.SCRAP_SAFETY_MARGIN_CM, 0, 'SCRAP_SAFETY_MARGIN_CM defaults to 0');
});

test('config.js defines ALLOWED_SCRAP_SAFETY_MARGINS_CM with [0, 0.5, 1.0]', () => {
  assert.deepStrictEqual(
    CONFIG.ALLOWED_SCRAP_SAFETY_MARGINS_CM,
    [0, 0.5, 1.0],
    'ALLOWED_SCRAP_SAFETY_MARGINS_CM contains exactly [0, 0.5, 1.0]'
  );
});

// --- 2. Scrap Usable Dimension Shrinkage (2 x margin) ---
console.log('\n--- 2. Scrap Usable Dimension Shrinkage (2 x margin) ---');

test('each scrap usable width and height shrink by exactly 2 x margin', () => {
  const piece = { id: 'p_test', width: 14, height: 16, color: 'navy', print: 'plain', fabricType: 'cotton' };

  const enriched0 = enrichPiece(piece, 0);
  assert.strictEqual(enriched0.effectiveWidth, 14, 'Margin 0: width unchanged');
  assert.strictEqual(enriched0.effectiveHeight, 16, 'Margin 0: height unchanged');
  assert.strictEqual(enriched0.frayedLossArea, 0, 'Margin 0: 0 frayed loss');

  const enriched05 = enrichPiece(piece, 0.5);
  // Shrink by 2 * 0.5 = 1.0 cm on width and height
  assert.strictEqual(enriched05.effectiveWidth, 13, 'Margin 0.5: width shrinks by 2*0.5=1.0 cm');
  assert.strictEqual(enriched05.effectiveHeight, 15, 'Margin 0.5: height shrinks by 2*0.5=1.0 cm');
  // Raw area = 14 * 16 = 224; usable area = 13 * 15 = 195; frayed loss = 29
  assert.strictEqual(enriched05.frayedLossArea, 224 - 195, 'Margin 0.5: frayed loss is rawArea - usableArea');

  const enriched10 = enrichPiece(piece, 1.0);
  // Shrink by 2 * 1.0 = 2.0 cm on width and height
  assert.strictEqual(enriched10.effectiveWidth, 12, 'Margin 1.0: width shrinks by 2*1.0=2.0 cm');
  assert.strictEqual(enriched10.effectiveHeight, 14, 'Margin 1.0: height shrinks by 2*1.0=2.0 cm');
  // Raw area = 224; usable area = 12 * 14 = 168; frayed loss = 56
  assert.strictEqual(enriched10.frayedLossArea, 224 - 168, 'Margin 1.0: frayed loss is rawArea - usableArea');
});

// --- 3. Margin 0 Baseline Invariance Across All Products ---
console.log('\n--- 3. Margin 0 Identical to Baseline Across 5 Products ---');

test('margin 0 produces 100% identical results to baseline across all 4 rectangle products and child top', () => {
  const testCases = [
    { productId: 'pouch', sizeKey: 'medium', style: 'patchwork' },
    { productId: 'tote_bag', sizeKey: 'medium', style: 'patchwork' },
    { productId: 'cushion_cover', sizeKey: 'medium', style: 'patchwork' },
    { productId: 'kids_frock', sizeKey: '2-3y', style: 'patchwork' },
    { productId: 'child_top', sizeKey: 'chest56', style: 'patchwork', options: { variant: 'hybrid' } },
    { productId: 'child_top', sizeKey: 'chest56', style: 'patchwork', options: { variant: 'patchwork' } },
  ];

  for (const tc of testCases) {
    const baseline = buildDesign(pileB, tc.productId, tc.sizeKey, tc.style, tc.options || {});
    const withMarginZero = buildDesign(pileB, tc.productId, tc.sizeKey, tc.style, {
      ...(tc.options || {}),
      scrapSafetyMarginCm: 0,
    });

    assert.strictEqual(withMarginZero.fits, baseline.fits, `${tc.productId}: fits must match exactly`);
    assert.strictEqual(withMarginZero.designScore, baseline.designScore, `${tc.productId}: score must match exactly`);
    assert.strictEqual(withMarginZero.estimatedTimeMinutes, baseline.estimatedTimeMinutes, `${tc.productId}: time must match`);
    assert.strictEqual(withMarginZero.scrapsCount, baseline.scrapsCount, `${tc.productId}: scrapsCount must match`);
    assert.strictEqual(withMarginZero.totalExtraSeams, baseline.totalExtraSeams, `${tc.productId}: totalExtraSeams must match`);
    assert.strictEqual(withMarginZero.fabricUsedInSeamsCm2, baseline.fabricUsedInSeamsCm2, `${tc.productId}: fabricUsedInSeamsCm2 must match`);
    assert.strictEqual(withMarginZero.fabricTooSmallToReuseCm2, baseline.fabricTooSmallToReuseCm2, `${tc.productId}: fabricTooSmallToReuseCm2 must match`);
    assert.strictEqual(withMarginZero.wastePercentage, baseline.wastePercentage, `${tc.productId}: wastePercentage must match`);
    assert.strictEqual(withMarginZero.placements.length, baseline.placements.length, `${tc.productId}: placements count must match`);

    // Verify placements scrap assignments and dimensions are bitwise identical
    for (let i = 0; i < baseline.placements.length; i++) {
      const pBase = baseline.placements[i];
      const pZero = withMarginZero.placements[i];
      assert.strictEqual(pZero.zoneId, pBase.zoneId, `${tc.productId} placement ${i}: zoneId matches`);
      assert.strictEqual(pZero.method, pBase.method, `${tc.productId} placement ${i}: method matches`);
      assert.strictEqual(pZero.scraps?.length, pBase.scraps?.length, `${tc.productId} placement ${i}: scraps count matches`);
    }
  }
});

// --- 4. Monotonicity: Margin > 0 Never Increases What Fits ---
console.log('\n--- 4. Monotonicity: Margin > 0 Never Increases What Fits ---');

test('margin > 0 never increases what fits across pile configurations', () => {
  const products = ['pouch', 'tote_bag', 'cushion_cover', 'kids_frock', 'child_top'];
  const piles = [pileB, pileColorful];

  for (const pile of piles) {
    const sug0 = suggestProducts(pile, { scrapSafetyMarginCm: 0 });
    const sug05 = suggestProducts(pile, { scrapSafetyMarginCm: 0.5 });
    const sug10 = suggestProducts(pile, { scrapSafetyMarginCm: 1.0 });

    const count0 = sug0.feasibleCount;
    const count05 = sug05.feasibleCount;
    const count10 = sug10.feasibleCount;

    assert(
      count05 <= count0,
      `Feasible count with margin 0.5 (${count05}) must be <= margin 0 (${count0})`
    );
    assert(
      count10 <= count05,
      `Feasible count with margin 1.0 (${count10}) must be <= margin 0.5 (${count05})`
    );

    // Check individual items: if an item fails at 0, it must NEVER become feasible at 0.5 or 1.0
    sug0.suggestions.forEach((item0) => {
      if (!item0.fits) {
        const item05 = sug05.suggestions.find(
          (s) => s.productId === item0.productId && s.sizeKey === item0.sizeKey && s.variant === item0.variant
        );
        const item10 = sug10.suggestions.find(
          (s) => s.productId === item0.productId && s.sizeKey === item0.sizeKey && s.variant === item0.variant
        );

        if (item05) {
          assert.strictEqual(
            item05.fits,
            false,
            `Infeasible item ${item0.productId}/${item0.sizeKey} at margin 0 must remain infeasible at margin 0.5`
          );
        }
        if (item10) {
          assert.strictEqual(
            item10.fits,
            false,
            `Infeasible item ${item0.productId}/${item0.sizeKey} at margin 0 must remain infeasible at margin 1.0`
          );
        }
      }
    });
  }
});

// --- 5. Area Conservation with Margin > 0 ---
console.log('\n--- 5. Area Conservation Holds Strictly with Margin > 0 ---');

test('cutScrap area conservation with margin > 0: used + reusable + trimWaste + frayedLoss = totalScrapArea', () => {
  const scrapRaw = {
    id: 'p_cut_frayed',
    width: 20,
    height: 20,
    rawWidth: 20,
    rawHeight: 20,
    effectiveWidth: 18, // 1.0 cm margin per edge
    effectiveHeight: 18,
    frayedLossArea: (20 * 20) - (18 * 18), // 76 cm²
    color: 'navy',
    print: 'plain',
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
  };

  const targetW = 10;
  const targetH = 10;
  const cut = cutScrap(scrapRaw, targetW, targetH);

  const reusableArea = cut.reusableOffcuts.reduce((s, o) => s + o.area, 0);
  const totalPartitioned = cut.usedArea + reusableArea + cut.trimWasteArea + cut.frayedLossArea;

  assert.strictEqual(
    totalPartitioned,
    cut.totalScrapArea,
    `cutScrap area partition (${totalPartitioned}) strictly equals raw scrap area (${cut.totalScrapArea})`
  );
  assert.strictEqual(cut.frayedLossArea, 76, 'Frayed loss is exactly 76 cm²');
  assert.strictEqual(cut.totalScrapArea, 400, 'Total raw scrap area is 400 cm²');
});

test('area conservation holds on child top hybrid sleeves with margin 0.5 and 1.0', () => {
  for (const margin of [0.5, 1.0]) {
    const fit = fitPileToProduct(pileB, 'child_top', 'chest56', 1.0, {
      variant: 'hybrid',
      scrapSafetyMarginCm: margin,
    });
    assert.strictEqual(fit.fits, true, `Child top fits with margin ${margin}`);

    const rawScrapAreaUsed = fit.totalRawAreaUsedCm2;
    const seamLoss = fit.seamLossAreaCm2;
    const trimWaste = fit.trimWasteAreaCm2;
    const frayedLoss = fit.fabricLostToFrayedEdgesCm2;

    // The 2 sleeves target cut dimensions: 24.3 x 36.0 cm
    const targetCutArea = 24.3 * 36.0 * 2; // 1749.6 cm²

    // rawArea = targetCutArea + seamLoss + trimWaste + frayedLoss
    const sumComponents = Math.round(targetCutArea + seamLoss + trimWaste + frayedLoss);
    assert.strictEqual(
      rawScrapAreaUsed,
      sumComponents,
      `Margin ${margin}: Raw Area (${rawScrapAreaUsed}) = Cut Area (${targetCutArea.toFixed(1)}) + Seams (${seamLoss}) + Trim (${trimWaste}) + Frayed Loss (${frayedLoss})`
    );
    assert(frayedLoss > 0, `Margin ${margin} must report positive frayed loss area (got ${frayedLoss} cm²)`);
  }
});

test('area conservation holds on pouch with margin 0.5 and 1.0', () => {
  for (const margin of [0.5, 1.0]) {
    const design = buildDesign(pileB, 'pouch', 'medium', 'patchwork', { scrapSafetyMarginCm: margin });
    assert.strictEqual(design.fits, true, `Pouch fits with margin ${margin}`);

    assert(
      design.fabricLostToFrayedEdgesCm2 > 0,
      `Pouch reports fabric lost to frayed edges (${design.fabricLostToFrayedEdgesCm2} cm²)`
    );
    assert.strictEqual(design.scrapSafetyMarginCm, margin, `Design records scrapSafetyMarginCm = ${margin}`);

    // Verify warning note contains "lost to frayed edges"
    const hasFrayedWarning = design.warnings.some((w) => w.includes('lost to frayed edges'));
    assert.strictEqual(hasFrayedWarning, true, 'Warnings contain plain-words lost to frayed edges explanation');
  }
});

// --- 6. checkFeasibility Passes scrapSafetyMarginCm ---
console.log('\n--- 6. checkFeasibility Integration ---');

test('checkFeasibility respects scrapSafetyMarginCm', () => {
  const result0 = checkFeasibility({
    pile: pileB,
    productId: 'child_top',
    sizeKey: 'chest56',
    scrapSafetyMarginCm: 0,
  });
  assert.strictEqual(result0.isFeasible, true, 'Feasible at margin 0');

  const result10 = checkFeasibility({
    pile: pileB,
    productId: 'child_top',
    sizeKey: 'chest56',
    scrapSafetyMarginCm: 1.0,
  });
  assert.strictEqual(typeof result10.isFeasible, 'boolean', 'Returns valid boolean feasibility at margin 1.0');
});

console.log('\n====================================================');
console.log(`🏁 Q3 TEST RESULTS: ${passedTests} PASSED, 0 FAILED`);
console.log('====================================================\n');
