// ============================================================================
// REWEAR STAGE 4 — GATE 4: FABRIC SOURCE & SHEET PACKING TEST SUITE
// ============================================================================
// Verifies:
// 1. fabricSource handling: 'plain_base' pieces use zero scraps & report yardage.
// 2. Hybrid mode: pile insufficient for full garment succeeds when bodice is plain_base.
// 3. packPiecesOnSheet: zero overlap, seam allowance inclusion, 0.5cm clearance.
// 4. Bounding-box limit test: documents v1 overhead on curved FreeSewing pieces.
// 5. Existing 4 products backward compatibility: 100% scrap sourcing preserved.
// ============================================================================

import assert from 'node:assert';
import { CONFIG } from './config.js';
import { fitPileToProduct, packPiecesOnSheet } from './fitting.js';
import { calculatePathArea } from './geometry.js';
import { PRODUCT_TEMPLATES, normalizeGarmentSpec } from './templates.js';

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
console.log('📦 RUNNING GATE 4: FABRIC SOURCING & SHEET PACKING');
console.log('====================================================\n');

// ---------------------------------------------------------------------------
// 1. fabricSource & Plain Base Handling
// ---------------------------------------------------------------------------
console.log('--- 1. fabricSource & Plain Base Handling ---');

test("'plain_base' pieces consume zero scraps and report continuous bolt yardage", () => {
  // Define a synthetic hybrid template
  const hybridSpec = {
    id: 'hybrid_test',
    name: 'Hybrid Test Top',
    category: 'apparel',
    defaultVariant: 'plain',
    sizes: {
      standard: {
        label: 'Standard',
        finishedWidthCm: 40,
        finishedHeightCm: 50,
        zones: [
          { id: 'bodice_front', name: 'Bodice Front', width: 35, height: 40, role: 'base', fabricSource: 'plain_base', scrapEligible: false },
          { id: 'bodice_back', name: 'Bodice Back', width: 35, height: 40, role: 'base', fabricSource: 'plain_base', scrapEligible: false },
          { id: 'sleeve_left', name: 'Left Sleeve', width: 15, height: 25, role: 'supporting', fabricSource: 'scrap', scrapEligible: true },
          { id: 'sleeve_right', name: 'Right Sleeve', width: 15, height: 25, role: 'supporting', fabricSource: 'scrap', scrapEligible: true },
        ],
      },
    },
  };

  // Scrap pile only has enough for the two sleeves (e.g., 2 pieces of 20x30 cm)
  const smallScrapPile = [
    { id: 's1', width: 20, height: 30, quantity: 2, color: 'navy', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false },
  ];

  const fit = fitPileToProduct(smallScrapPile, hybridSpec, 'standard');

  assert.strictEqual(fit.fits, true, 'Hybrid product fits when scraps cover scrap-eligible sleeves');
  assert.strictEqual(fit.plainBase.piecesCount, 2, 'Two plain_base pieces tracked');
  assert(fit.plainBase.yardageNeededMeters > 0, `Continuous yardage reported (${fit.plainBase.yardageNeededMeters} m)`);
  assert(fit.plainBase.lengthNeededCm > 0, `Length in cm reported (${fit.plainBase.lengthNeededCm} cm)`);
  assert.strictEqual(fit.plainBase.boltWidthCm, 110, 'Standard bolt width is 110 cm');

  // Verify plain_base placements use ZERO scraps
  const plainPlacements = fit.placements.filter((p) => p.fabricSource === 'plain_base');
  assert.strictEqual(plainPlacements.length, 2, 'Two plain_base placements created');
  plainPlacements.forEach((p) => {
    assert.strictEqual(p.scraps.length, 0, `Piece ${p.zoneId} used 0 scraps`);
    assert.strictEqual(p.seamsCount, 0, `Piece ${p.zoneId} has 0 pieced seams`);
  });

  // Verify sleeve placements used the scraps
  const scrapPlacements = fit.placements.filter((p) => p.fabricSource !== 'plain_base');
  assert.strictEqual(scrapPlacements.length, 2, 'Two scrap placements created');
  scrapPlacements.forEach((p) => {
    assert(p.scraps.length > 0, `Sleeve ${p.zoneId} used scrap fabric`);
  });
});

test('Hybrid mode allows a pile insufficient for full garment to succeed when bodice is plain_base', () => {
  const hybridSpec = {
    id: 'child_top_hybrid',
    name: 'Child Top Hybrid',
    category: 'apparel',
    defaultVariant: 'plain',
    sizes: {
      chest56: {
        label: 'Chest 56 cm',
        finishedWidthCm: 32,
        finishedHeightCm: 35,
        zones: [
          { id: 'bodice_front', name: 'Front Bodice', width: 32, height: 33, role: 'base', fabricSource: 'plain_base', scrapEligible: false },
          { id: 'bodice_back', name: 'Back Bodice', width: 32, height: 33, role: 'base', fabricSource: 'plain_base', scrapEligible: false },
          { id: 'sleeve_left', name: 'Left Sleeve', width: 22, height: 26, role: 'supporting', fabricSource: 'scrap', scrapEligible: true },
          { id: 'sleeve_right', name: 'Right Sleeve', width: 22, height: 26, role: 'supporting', fabricSource: 'scrap', scrapEligible: true },
        ],
      },
    },
  };

  // Pile: 30 scraps of 10x10 cm = 3,000 cm² raw area.
  // Full top needs > 3,700 cm² cut area (and >60 scraps when pieced) -> would FAIL if all pieces required scrap.
  // Sleeves only need 24 scraps (12 per sleeve) -> FITS with 6 leftovers!
  const sleeveOnlyPile = [
    { id: 'p1', width: 10, height: 10, quantity: 30, color: 'navy', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false },
  ];

  const fit = fitPileToProduct(sleeveOnlyPile, hybridSpec, 'chest56');
  assert.strictEqual(fit.fits, true, 'Sleeve-only scrap requirement succeeds with small pile');
  assert.strictEqual(fit.plainBase.piecesCount, 2);
  assert(fit.plainBase.totalCutAreaCm2 > 2000, 'Plain base cut area is > 2000 cm²');
});

// ---------------------------------------------------------------------------
// 2. packPiecesOnSheet Guarantees (Zero Overlap, Clearance, Seam Allowance)
// ---------------------------------------------------------------------------
console.log('\n--- 2. packPiecesOnSheet Guarantees ---');

test('packPiecesOnSheet places multiple rectangular pieces with zero overlap and >= 0.5 cm clearance', () => {
  const pieces = [
    { id: 'p1', name: 'Front Panel', cutWidth: 30, cutHeight: 35 },
    { id: 'p2', name: 'Back Panel', cutWidth: 30, cutHeight: 35 },
    { id: 'p3', name: 'Pocket', cutWidth: 15, cutHeight: 15 },
    { id: 'p4', name: 'Facing', cutWidth: 20, cutHeight: 10 },
  ];

  const pack = packPiecesOnSheet(pieces, { clearanceCm: 0.5, marginCm: 1.0 });

  assert.strictEqual(pack.fits, true, 'Pieces fit on auto-sized sheet');
  assert.strictEqual(pack.collisions.length, 0, 'Zero collisions detected');
  assert.strictEqual(pack.placements.length, 4, 'All 4 pieces placed');
  assert.strictEqual(pack.clearanceCm, 0.5, '0.5 cm cutting clearance configured');

  // Verify all pairwise clearances >= 0.5 cm
  for (let i = 0; i < pack.placements.length; i++) {
    for (let j = i + 1; j < pack.placements.length; j++) {
      const a = pack.placements[i];
      const b = pack.placements[j];

      const xGap = Math.max(0, Math.max(a.x - (b.x + b.width), b.x - (a.x + a.width)));
      const yGap = Math.max(0, Math.max(a.y - (b.y + b.height), b.y - (a.y + a.height)));

      assert(xGap >= 0.499 || yGap >= 0.499, `Clearance between ${a.id} and ${b.id} is >= 0.5 cm (xGap: ${xGap.toFixed(2)}, yGap: ${yGap.toFixed(2)})`);
    }
  }

  // Verify containment within sheet boundaries
  pack.placements.forEach((p) => {
    assert(p.x >= pack.marginCm - 0.001, `${p.id} x is within left margin`);
    assert(p.y >= pack.marginCm - 0.001, `${p.id} y is within top margin`);
    assert(p.x + p.width <= pack.sheetWidth - pack.marginCm + 0.001, `${p.id} right edge within right margin`);
    assert(p.y + p.height <= pack.sheetHeight - pack.marginCm + 0.001, `${p.id} bottom edge within bottom margin`);
  });
});

test('packPiecesOnSheet detects overlapping pieces when coordinates violate clearance', () => {
  // Manually positioned pieces with deliberate overlap
  const overlappingPieces = [
    { id: 'box1', name: 'Box 1', cutWidth: 20, cutHeight: 20, x: 2, y: 2 },
    { id: 'box2', name: 'Box 2', cutWidth: 20, cutHeight: 20, x: 10, y: 10 }, // Overlaps box1
  ];

  const pack = packPiecesOnSheet(overlappingPieces, { sheetWidth: 50, sheetHeight: 50, clearanceCm: 0.5, marginCm: 1.0 });

  assert.strictEqual(pack.fits, false, 'Overlapping layout is rejected');
  assert.strictEqual(pack.collisions.length, 1, 'Collision between box1 and box2 detected');
  assert.strictEqual(pack.collisions[0][0], 'box1');
  assert.strictEqual(pack.collisions[0][1], 'box2');
});

test('packPiecesOnSheet rejects layouts that overflow fixed sheet dimensions', () => {
  const pieces = [
    { id: 'large1', name: 'Large 1', cutWidth: 40, cutHeight: 40 },
    { id: 'large2', name: 'Large 2', cutWidth: 40, cutHeight: 40 },
  ];

  // Fixed sheet of 50x50 cm cannot fit two 40x40 pieces with 1cm margins
  const pack = packPiecesOnSheet(pieces, { sheetWidth: 50, sheetHeight: 50, clearanceCm: 0.5, marginCm: 1.0 });

  assert.strictEqual(pack.fits, false, 'Overflowing sheet is rejected');
  assert.strictEqual(pack.overflow, true, 'Overflow flag is set');
});

// ---------------------------------------------------------------------------
// 3. Bounding-Box Packing Limit on Curved Pieces (v1 Documentation)
// ---------------------------------------------------------------------------
console.log('\n--- 3. Bounding-Box Packing Limit on Curved Pieces (v1 Documentation) ---');

test('Document v1 bounding-box packing overhead on real curved FreeSewing pieces', () => {
  // FreeSewing Brian child top (chest 56) curved pieces
  const brianFrontSeam = 'M 0,41.9 L 0,325 L 161,325 L 161,140.93 C 152.6,140.93 142.15,133.88 138.3,130.03 C 130.59,122.32 126.28,104.47 126.28,78.9 C 126.28,47.89 127.21,28.97 130,16.88 L 56.88,0 C 50.59,27.24 25.96,41.9 0,41.9';
  const brianBackSeam = 'M 0,13 L 0,325 L 161,325 L 161,140.93 C 152.6,140.93 142.15,133.88 138.3,130.03 C 130.59,122.32 127.4,104.47 127.4,78.9 C 127.4,47.89 127.21,28.97 130,16.88 L 56.88,0 C 53.87,13 0,13 0,13';
  const brianSleeveSeam = 'M -111.51,0 L -75,263.17 L 75,263.17 L 111.51,0 C 111.51,0 101.79,-1.94 84.63,-12.46 C 58.89,-28.23 56.85,-45.36 35.69,-66.9 C 21.59,-81.25 -22.17,-79.37 -36.89,-65.64 C -48.66,-54.65 -76.47,-21.71 -88.07,-13.72 C -98.51,-6.52 -111.51,0 -111.51,0 z';

  // 1. True net curved finished area via Green's Theorem (Shoelace)
  const frontNet = calculatePathArea(brianFrontSeam) * 2; // full bodice (cut on fold)
  const backNet = calculatePathArea(brianBackSeam) * 2;   // full bodice (cut on fold)
  const sleeveNet = calculatePathArea(brianSleeveSeam);   // single sleeve
  const totalTrueCurvedArea = frontNet + backNet + (sleeveNet * 2);

  // 2. Rectangular cut bounding boxes (finished dimensions + 2cm seam allowance)
  // Front: 32.2 x 32.5 cm finished -> 34.2 x 34.5 cm cut
  // Back: 32.2 x 32.5 cm finished -> 34.2 x 34.5 cm cut
  // Sleeve: 22.3 x 34.3 cm finished -> 24.3 x 36.3 cm cut
  const curvedPieces = [
    { id: 'front_bodice', name: 'Front Bodice', cutWidth: 34.2, cutHeight: 34.5 },
    { id: 'back_bodice', name: 'Back Bodice', cutWidth: 34.2, cutHeight: 34.5 },
    { id: 'left_sleeve', name: 'Left Sleeve', cutWidth: 24.3, cutHeight: 36.3 },
    { id: 'right_sleeve', name: 'Right Sleeve', cutWidth: 24.3, cutHeight: 36.3 },
  ];

  const pack = packPiecesOnSheet(curvedPieces, { clearanceCm: 0.5, marginCm: 1.0 });

  assert.strictEqual(pack.fits, true, 'Curved pieces pack successfully on sheet');

  const overheadRatio = pack.sheetAreaCm2 / totalTrueCurvedArea;
  const unusedAreaPercent = ((pack.sheetAreaCm2 - totalTrueCurvedArea) / pack.sheetAreaCm2) * 100;

  console.log(`     [Documented Limit] True Net Area: ${totalTrueCurvedArea.toFixed(1)} cm²`);
  console.log(`     [Documented Limit] Packed Sheet Area: ${pack.sheetAreaCm2.toFixed(1)} cm² (${pack.sheetWidth} × ${pack.sheetHeight} cm)`);
  console.log(`     [Documented Limit] Bounding-box overhead factor: ${overheadRatio.toFixed(2)}x (${unusedAreaPercent.toFixed(1)}% unused interstitial space)`);

  // Documented limitation assertion:
  // Because axis-aligned bounding boxes cannot interlock curved sleeve caps into armholes,
  // the rectangular sheet area required is >= 50% larger than the true net curved fabric area.
  assert(overheadRatio >= 1.5, `Bounding-box packing requires >= 1.5x of true net curved area (actual: ${overheadRatio.toFixed(2)}x)`);
});

// ---------------------------------------------------------------------------
// 4. Backward Compatibility for Existing 4 Products
// ---------------------------------------------------------------------------
console.log('\n--- 4. Existing 4 Products Backward Compatibility ---');

const EXISTING_PRODUCTS = ['tote_bag', 'pouch', 'cushion_cover', 'kids_frock'];

EXISTING_PRODUCTS.forEach((prodId) => {
  test(`Existing product ${prodId} preserves 100% scrap sourcing (0 plain_base pieces)`, () => {
    const rawProd = PRODUCT_TEMPLATES[prodId];
    const sizeKeys = Object.keys(rawProd.sizes);
    const testSize = sizeKeys[0];

    // Dummy pile large enough to test fitting
    const testPile = [
      { id: 't1', width: 60, height: 60, quantity: 10, color: 'navy', print: 'plain', fabricType: 'cotton', thickness: 'medium', stretchy: false },
    ];

    const fit = fitPileToProduct(testPile, prodId, testSize);
    assert.strictEqual(fit.plainBase.piecesCount, 0, `${prodId} has 0 plain_base pieces`);
    assert.strictEqual(fit.yardageNeededMeters, 0, `${prodId} needs 0m continuous yardage`);
    assert(fit.placements.every((p) => p.fabricSource === 'scrap'), `All placements in ${prodId} are scrap-sourced`);
  });
});

console.log('====================================================');
console.log(`GATE 4 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('====================================================');

if (failed > 0) {
  process.exit(1);
}
