// ============================================================================
// REWEAR STAGE 6 — PHASE 6 STEP 1: CURVED CHILD TOP INTEGRATION TESTS
// ============================================================================
// Verifies:
// 1. Zero overlap: packPiecesOnSheet guarantees >= 0.5 cm clearance between all pieces.
// 2. Containment inside sheet: all pieces strictly inside margins with 1.0 cm seam allowance.
// 3. Area conservation: rawArea = assembledArea + internalSeamLoss on pieced panels,
//    and cut rectangle covers true net curved area.
// 4. plain_base uses zero scraps: bodices use 0 scraps, 0 seams, continuous yardage > 0.
// 5. Hybrid works with small pile: pile too small for full patchwork succeeds in hybrid.
// ============================================================================

import assert from 'node:assert';
import { fitPileToProduct, packPiecesOnSheet } from './fitting.js';
import { CHILD_TOP_BRIAN_DATA, FREESEWING_VERSION, PATTERN_DESIGN, TAILOR_VERIFIED } from './childTopBrianData.js';
import { PRODUCT_TEMPLATES } from './templates.js';

let passed = 0;
let failed = 0;

function test(desc, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${desc}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${desc}`);
    console.error(`     Error: ${err.message}`);
    failed++;
  }
}

console.log('====================================================');
console.log('👶 RUNNING PHASE 6 STEP 1: CURVED CHILD TOP TESTS');
console.log('====================================================\n');

// Standard test pile (Pile B: 30 scraps of 14x14 cm)
const pileB = [
  { id: 'b_navy', width: 14, height: 14, quantity: 10, fabricType: 'cotton', thickness: 'medium', stretchy: false, colors: ['navy'], print: 'plain' },
  { id: 'b_beige', width: 14, height: 14, quantity: 10, fabricType: 'cotton', thickness: 'medium', stretchy: false, colors: ['beige'], print: 'plain' },
  { id: 'b_grey', width: 14, height: 14, quantity: 10, fabricType: 'cotton', thickness: 'medium', stretchy: false, colors: ['grey'], print: 'plain' },
];

// ---------------------------------------------------------------------------
// 0. FreeSewing Brian CAD Data Integrity
// ---------------------------------------------------------------------------
console.log('--- 0. FreeSewing Brian CAD Dataset Verification ---');

test('FreeSewing dataset metadata and mathematical authenticity verified', () => {
  assert.strictEqual(FREESEWING_VERSION, '4.10.2', 'FreeSewing version pinned to 4.10.2');
  assert.strictEqual(PATTERN_DESIGN, 'Brian', 'Design model is Brian');
  assert.strictEqual(TAILOR_VERIFIED, false, 'tailorVerified flag is explicitly false');

  const chest56 = CHILD_TOP_BRIAN_DATA.chest56;
  assert(chest56, 'chest56 dataset exists');
  assert(chest56.pieces.bodice_front.seamPath.startsWith('M 0,41.9'), 'Front seam path extracted from Brian CAD');
  assert(chest56.pieces.bodice_back.seamPath.startsWith('M 0,13'), 'Back seam path extracted from Brian CAD');
  assert(chest56.pieces.sleeve.seamPath.startsWith('M -111.51'), 'Sleeve seam path extracted from Brian CAD');
  assert.strictEqual(chest56.pieces.bodice_front.cutOnFold, true, 'Front bodice is cut-on-fold');
  assert.strictEqual(chest56.pieces.bodice_back.cutOnFold, true, 'Back bodice is cut-on-fold');
  assert.strictEqual(chest56.pieces.sleeve.cutOnFold, false, 'Sleeve is not cut-on-fold');
});

// ---------------------------------------------------------------------------
// 1. Zero Overlap on Sheet Packing
// ---------------------------------------------------------------------------
console.log('\n--- 1. Sheet Packing: Zero Overlap & Clearance ---');

test('no overlap: all cut pieces have >= 0.5 cm clearance on cutting sheet', () => {
  const pieces = [
    { id: 'bodice_front', name: 'Front Bodice', cutWidth: 34.2, cutHeight: 34.5 },
    { id: 'bodice_back', name: 'Back Bodice', cutWidth: 34.2, cutHeight: 34.5 },
    { id: 'sleeve_left', name: 'Left Sleeve', cutWidth: 24.3, cutHeight: 36.0 },
    { id: 'sleeve_right', name: 'Right Sleeve', cutWidth: 24.3, cutHeight: 36.0 },
  ];

  const pack = packPiecesOnSheet(pieces, { clearanceCm: 0.5, marginCm: 1.0 });

  assert.strictEqual(pack.fits, true, 'All pieces fit on auto-calculated cutting sheet');
  assert.strictEqual(pack.collisions.length, 0, 'Zero collisions between pieces');
  assert.strictEqual(pack.placements.length, 4, 'All 4 pieces successfully positioned');

  // Verify pairwise clearance >= 0.5 cm
  for (let i = 0; i < pack.placements.length; i++) {
    for (let j = i + 1; j < pack.placements.length; j++) {
      const a = pack.placements[i];
      const b = pack.placements[j];

      const xGap = Math.max(0, Math.max(a.x - (b.x + b.width), b.x - (a.x + a.width)));
      const yGap = Math.max(0, Math.max(a.y - (b.y + b.height), b.y - (a.y + a.height)));

      assert(xGap >= 0.499 || yGap >= 0.499, `Clearance between ${a.id} and ${b.id} is >= 0.5 cm (xGap: ${xGap.toFixed(2)}, yGap: ${yGap.toFixed(2)})`);
    }
  }
});

// ---------------------------------------------------------------------------
// 2. Containment Inside Sheet Including Seam Allowance
// ---------------------------------------------------------------------------
console.log('\n--- 2. Sheet Packing: Containment with Seam Allowance ---');

test('pieces inside the sheet including seam allowance', () => {
  const pieces = [
    { id: 'bodice_front', name: 'Front Bodice', cutWidth: 34.2, cutHeight: 34.5 },
    { id: 'bodice_back', name: 'Back Bodice', cutWidth: 34.2, cutHeight: 34.5 },
    { id: 'sleeve_left', name: 'Left Sleeve', cutWidth: 24.3, cutHeight: 36.0 },
    { id: 'sleeve_right', name: 'Right Sleeve', cutWidth: 24.3, cutHeight: 36.0 },
  ];

  const margin = 1.0;
  const pack = packPiecesOnSheet(pieces, { clearanceCm: 0.5, marginCm: margin });

  assert.strictEqual(pack.fits, true);

  pack.placements.forEach((p) => {
    // Each piece includes its 1.0 cm seam allowance on both sides (cutWidth = finished + 2cm)
    assert(p.x >= margin - 0.001, `${p.id} left edge respects margin (${p.x} >= ${margin})`);
    assert(p.y >= margin - 0.001, `${p.id} top edge respects margin (${p.y} >= ${margin})`);
    assert(p.x + p.width <= pack.sheetWidth - margin + 0.001, `${p.id} right edge (${p.x + p.width}) within sheet width (${pack.sheetWidth})`);
    assert(p.y + p.height <= pack.sheetHeight - margin + 0.001, `${p.id} bottom edge (${p.y + p.height}) within sheet height (${pack.sheetHeight})`);
  });

  // Rejection when sheet is smaller than piece bounds
  const undersizedPack = packPiecesOnSheet(pieces, { sheetWidth: 30, sheetHeight: 30, clearanceCm: 0.5, marginCm: 1.0 });
  assert.strictEqual(undersizedPack.fits, false, 'Undersized sheet is rejected');
  assert.strictEqual(undersizedPack.overflow, true, 'Overflow flag is true');
});

// ---------------------------------------------------------------------------
// 3. Area Conservation
// ---------------------------------------------------------------------------
console.log('\n--- 3. Area Conservation & Curved Net Area Coverage ---');

test('area conservation: raw scrap area equals cut panel area plus seam loss and trim waste', () => {
  const fit = fitPileToProduct(pileB, 'child_top', 'chest56', 1.0, { variant: 'hybrid' });
  assert.strictEqual(fit.fits, true, 'Child top fits with Pile B in hybrid mode');

  // Verify the sleeve placements
  const sleevePlacements = fit.placements.filter((p) => p.fabricSource === 'scrap');
  assert.strictEqual(sleevePlacements.length, 2, 'Two sleeves pieced from scraps');

  // Check area conservation on each sleeve:
  // Each sleeve is assembled from 6 patches (3x2 grid of 14x14 scraps trimmed).
  // Raw scrap area used across the fit must account for cut area + seam allowance loss + trim waste.
  const rawScrapAreaUsed = fit.totalRawAreaUsedCm2;
  const seamLoss = fit.seamLossAreaCm2;
  const trimWaste = fit.trimWasteAreaCm2;

  // The 2 sleeves target cut dimensions: 24.3 x 36.0 cm
  const targetCutArea = 24.3 * 36.0 * 2; // 1749.6 cm²

  // rawArea = targetCutArea + seamLoss + trimWaste
  const sumComponents = Math.round(targetCutArea + seamLoss + trimWaste);
  assert.strictEqual(
    rawScrapAreaUsed,
    sumComponents,
    `Scrap Raw Area (${rawScrapAreaUsed}) = Cut Panel Area (${targetCutArea.toFixed(1)}) + Seam Loss (${seamLoss}) + Trim Waste (${trimWaste})`
  );

  // Curved net area coverage:
  // The sleeve cut rectangle (24.3 x 36.0 cm = 874.8 cm²) must strictly cover the net curved FreeSewing sleeve area
  const sleeveNetArea = CHILD_TOP_BRIAN_DATA.chest56.pieces.sleeve.netAreaCm2; // 585.5 cm²
  assert.strictEqual(sleeveNetArea, 585.5, 'Shoelace net area of Brian chest 56 sleeve is 585.5 cm²');
  assert(874.8 > sleeveNetArea, 'Bounding cut rectangle (874.8 cm²) fully encloses net curved piece (585.5 cm²)');

  // Placements have curved geometry attached for clipping
  sleevePlacements.forEach((p) => {
    assert.strictEqual(p.shapeType, 'curved', 'Sleeve placement has shapeType: curved');
    assert.strictEqual(p.clipped, true, 'Sleeve placement has clipped: true');
    assert(p.clipPathId.startsWith('clip_sleeve'), 'Sleeve has clipPathId');
    assert(p.seamPath.startsWith('M -111.51'), 'Sleeve has exact FreeSewing seam path');
    assert(p.saPath.startsWith('M -121.42'), 'Sleeve has exact FreeSewing seam allowance path');
  });
});

// ---------------------------------------------------------------------------
// 4. Plain Base Uses Zero Scraps
// ---------------------------------------------------------------------------
console.log('\n--- 4. plain_base Uses Zero Scraps ---');

test('plain_base uses zero scraps, zero pieced seams, and reports continuous yardage', () => {
  const fit = fitPileToProduct(pileB, 'child_top', 'chest56', 1.0, { variant: 'hybrid' });

  assert.strictEqual(fit.plainBase.piecesCount, 2, '2 plain_base pieces (front & back bodice)');
  assert.strictEqual(fit.plainBase.boltWidthCm, 110, 'Standard bolt width 110 cm');
  assert.strictEqual(fit.plainBase.yardageNeededMeters, 0.25, 'Chest 56 needs 0.25 m continuous fabric');

  const plainPlacements = fit.placements.filter((p) => p.fabricSource === 'plain_base');
  assert.strictEqual(plainPlacements.length, 2, 'Two plain_base placements generated');

  plainPlacements.forEach((p) => {
    assert.strictEqual(p.scraps.length, 0, `Bodice piece ${p.zoneId} used 0 scraps`);
    assert.strictEqual(p.seamsCount, 0, `Bodice piece ${p.zoneId} has 0 pieced seams`);
    assert.strictEqual(p.method, 'plain_base', `Bodice piece ${p.zoneId} uses plain_base method`);
    assert.strictEqual(p.shapeType, 'curved', `Bodice piece ${p.zoneId} has curved geometry`);
    assert.strictEqual(p.cutOnFold, true, `Bodice piece ${p.zoneId} is cut-on-fold`);
  });

  // Verify chest62 continuous yardage
  const fit62 = fitPileToProduct(pileB, 'child_top', 'chest62', 1.0, { variant: 'hybrid' });
  assert.strictEqual(fit62.plainBase.yardageNeededMeters, 0.31, 'Chest 62 needs 0.31 m continuous fabric');
});

// ---------------------------------------------------------------------------
// 5. Hybrid Works With Small Pile (Too Small for Full Patchwork)
// ---------------------------------------------------------------------------
console.log('\n--- 5. Hybrid Mode vs Full Patchwork on Small Pile ---');

test('hybrid works with a pile too small for full patchwork', () => {
  // A small pile of 14 scraps (14x14 cm) = 2,744 cm² raw fabric.
  // Full patchwork needs:
  // - 2 sleeves: 12 scraps
  // - front bodice: 6 scraps
  // - back bodice: 6 scraps
  // Total: 24 scraps. 14 scraps will FAIL full patchwork!
  // But hybrid only needs 12 scraps for the sleeves -> FITS with 2 leftovers!
  const smallPile = [
    { id: 'small_navy', width: 14, height: 14, quantity: 7, fabricType: 'cotton', thickness: 'medium', stretchy: false, colors: ['navy'], print: 'plain' },
    { id: 'small_beige', width: 14, height: 14, quantity: 7, fabricType: 'cotton', thickness: 'medium', stretchy: false, colors: ['beige'], print: 'plain' },
  ];

  // 1. Hybrid variant succeeds
  const hybridFit = fitPileToProduct(smallPile, 'child_top', 'chest56', 1.0, { variant: 'hybrid' });
  assert.strictEqual(hybridFit.fits, true, 'Hybrid variant succeeds with small scrap pile');
  assert.strictEqual(hybridFit.plainBase.piecesCount, 2, 'Bodices are plain_base');
  assert.strictEqual(hybridFit.leftovers.length, 2, '2 unused scraps of 14x14 cm tracked as leftovers');

  // 2. Full patchwork variant fails due to missing fabric for bodices
  const fullPatchworkFit = fitPileToProduct(smallPile, 'child_top', 'chest56', 1.0, { variant: 'patchwork' });
  assert.strictEqual(fullPatchworkFit.fits, false, 'Full patchwork variant fails with small scrap pile');
  assert(fullPatchworkFit.missingDetails.length > 0, 'Missing details identify unfulfilled bodice panels');
  assert(
    fullPatchworkFit.missingDetails.some((m) => m.zoneId === 'bodice_back' || m.zoneId === 'bodice_front'),
    'Missing details specify bodice zones'
  );

  // 3. Warning emitted explaining scraps, seams, and time
  assert(
    fullPatchworkFit.warnings.some((w) => w.includes('Full patchwork option') && w.includes('seam') && w.includes('mins')),
    'Warning explains scrap count, extra seams count, and sewing time'
  );
});

// ---------------------------------------------------------------------------
// 6. Mirrored Sleeves Match Test
// ---------------------------------------------------------------------------
console.log('\n--- 6. Mirrored Sleeves Matching Verification ---');

test('both sleeves match: mirrored pair with identical colours and symmetrical patch layout', () => {
  const fit = fitPileToProduct(pileB, 'child_top', 'chest56', 1.0, { variant: 'hybrid' });
  const s1 = fit.placements.find((p) => p.zoneId === 'sleeve_1');
  const s2 = fit.placements.find((p) => p.zoneId === 'sleeve_2');

  assert(s1, 'Left sleeve placement exists');
  assert(s2, 'Right sleeve placement exists');
  assert.strictEqual(s1.scraps.length, s2.scraps.length, 'Both sleeves have identical scrap counts');
  assert.strictEqual(s1.seamsCount, s2.seamsCount, 'Both sleeves have identical seam counts');
  assert.strictEqual(s1.patchCount, s2.patchCount, 'Both sleeves have identical patch counts');
  assert.strictEqual(s1.method, s2.method, 'Both sleeves use identical construction method');

  // Verify total scrap count and seams include both sleeves
  const totalSleeveScraps = s1.scraps.length + s2.scraps.length;
  assert.strictEqual(totalSleeveScraps, 12, '12 scraps total across both sleeves');
  assert.strictEqual(fit.totalExtraSeams, s1.seamsCount + s2.seamsCount, 'Total extra seams includes both sleeves');

  // Verify mirrored color matching across columns
  let rows = 3;
  let cols = 2;
  const gridMatch = s1.seamType?.match(/(\d+)x(\d+)_grid_seams/i);
  if (gridMatch) {
    rows = parseInt(gridMatch[1], 10);
    cols = parseInt(gridMatch[2], 10);
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx2 = r * cols + c;
      const idx1 = r * cols + (cols - 1 - c);
      const color1 = s1.scraps[idx1]?.color;
      const color2 = s2.scraps[idx2]?.color;
      assert.strictEqual(
        color2,
        color1,
        `Sleeve 2 patch at row ${r}, col ${c} (${color2}) mirrors Sleeve 1 at row ${r}, col ${cols - 1 - c} (${color1})`
      );
    }
  }
});

console.log('====================================================');
console.log(`PHASE 6 STEP 1 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('====================================================');

if (failed > 0) {
  process.exit(1);
}
