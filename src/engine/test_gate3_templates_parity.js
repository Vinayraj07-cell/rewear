// ============================================================================
// REWEAR STAGE 2 / STAGE 4 — GATE 3 TEMPLATES & PARITY TEST SUITE
// ============================================================================
// Verifies normalizeGarmentSpec() in templates.js and asserts 100% exact
// mathematical and structural parity for getProductRequirements,
// getProductLargestZone, and getZoneCutDimensions across all 4 products,
// all sizes, and all variants before and after normalization.
// ============================================================================

import assert from 'node:assert';
import {
  PRODUCT_TEMPLATES,
  normalizeGarmentSpec,
  getProductRequirements,
  getProductLargestZone,
  getZoneCutDimensions,
} from './templates.js';
import { CONFIG } from './config.js';

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
console.log('🧩 RUNNING GATE 3: TEMPLATES & SPEC PARITY TESTS');
console.log('====================================================\n');

// ---------------------------------------------------------------------------
// 1. normalizeGarmentSpec Contract & Immutability
// ---------------------------------------------------------------------------
console.log('--- 1. normalizeGarmentSpec Contract & Immutability ---');

test('normalizeGarmentSpec returns null for invalid input', () => {
  assert.strictEqual(normalizeGarmentSpec(null), null);
  assert.strictEqual(normalizeGarmentSpec(undefined), null);
  assert.strictEqual(normalizeGarmentSpec('not_an_object'), null);
});

test('normalizeGarmentSpec generates expected top-level schema attributes', () => {
  const rawTote = PRODUCT_TEMPLATES.tote_bag;
  const spec = normalizeGarmentSpec(rawTote);

  assert.strictEqual(spec.schemaVersion, '1.0.0');
  assert.strictEqual(spec.id, 'tote_bag');
  assert.strictEqual(spec.name, rawTote.name);
  assert.strictEqual(spec.category, 'bags');
  assert.strictEqual(spec.defaultVariant, 'plain');
  assert.strictEqual(spec.tailorVerified, false);
  assert(typeof spec.sizes === 'object' && spec.sizes !== null);
  assert(Array.isArray(spec.stitchingSteps));
});

test('normalizeGarmentSpec does not mutate raw PRODUCT_TEMPLATES', () => {
  const rawTote = PRODUCT_TEMPLATES.tote_bag;
  const originalWidth = rawTote.sizes.medium.zones[0].width;
  const spec = normalizeGarmentSpec(rawTote);

  // Mutate normalized spec
  spec.sizes.medium.zones[0].width = 999;
  spec.sizes.medium.zones[0].geometry.finishedWidthCm = 999;

  // Raw template remains intact
  assert.strictEqual(rawTote.sizes.medium.zones[0].width, originalWidth);
  assert.strictEqual(rawTote.sizes.medium.zones[0].geometry, undefined);
});

// ---------------------------------------------------------------------------
// 2. getZoneCutDimensions Exact Parity
// ---------------------------------------------------------------------------
console.log('\n--- 2. getZoneCutDimensions Exact Parity ---');

const PRODUCTS = ['tote_bag', 'pouch', 'cushion_cover', 'kids_frock'];

PRODUCTS.forEach((prodId) => {
  test(`getZoneCutDimensions parity for product: ${prodId} (all sizes & variants)`, () => {
    const rawProd = PRODUCT_TEMPLATES[prodId];
    const normSpec = normalizeGarmentSpec(rawProd);

    Object.keys(rawProd.sizes).forEach((sizeKey) => {
      const rawSize = rawProd.sizes[sizeKey];
      const normSize = normSpec.sizes[sizeKey];

      const variants = rawSize.variants ? Object.keys(rawSize.variants) : [null];

      variants.forEach((vKey) => {
        const rawZones = vKey ? rawSize.variants[vKey] : rawSize.zones;
        const normZones = vKey ? normSize.variants[vKey] : normSize.zones;

        assert.strictEqual(rawZones.length, normZones.length, `Zone counts match for ${prodId} ${sizeKey} ${vKey}`);

        rawZones.forEach((rawZone, idx) => {
          const normZone = normZones[idx];

          // Test with default seam allowance (1.0 cm)
          const cutRawDef = getZoneCutDimensions(rawZone);
          const cutNormDef = getZoneCutDimensions(normZone);

          assert.strictEqual(cutRawDef.cutWidthCm, cutNormDef.cutWidthCm);
          assert.strictEqual(cutRawDef.cutHeightCm, cutNormDef.cutHeightCm);
          assert.strictEqual(cutRawDef.finishedWidthCm, cutNormDef.finishedWidthCm);
          assert.strictEqual(cutRawDef.finishedHeightCm, cutNormDef.finishedHeightCm);
          assert.strictEqual(cutRawDef.areaSqCm, cutNormDef.areaSqCm);
          assert.strictEqual(cutRawDef.finishedAreaSqCm, cutNormDef.finishedAreaSqCm);

          // Test with custom seam allowance (1.5 cm)
          const cutRawCustom = getZoneCutDimensions(rawZone, 1.5);
          const cutNormCustom = getZoneCutDimensions(normZone, 1.5);

          assert.strictEqual(cutRawCustom.cutWidthCm, cutNormCustom.cutWidthCm);
          assert.strictEqual(cutRawCustom.cutHeightCm, cutNormCustom.cutHeightCm);
          assert.strictEqual(cutRawCustom.areaSqCm, cutNormCustom.areaSqCm);
        });
      });
    });
  });
});

// ---------------------------------------------------------------------------
// 3. getProductLargestZone Exact Parity
// ---------------------------------------------------------------------------
console.log('\n--- 3. getProductLargestZone Exact Parity ---');

PRODUCTS.forEach((prodId) => {
  test(`getProductLargestZone parity for product: ${prodId} (all sizes & variants)`, () => {
    const rawProd = PRODUCT_TEMPLATES[prodId];
    const normSpec = normalizeGarmentSpec(rawProd);

    Object.keys(rawProd.sizes).forEach((sizeKey) => {
      const rawSize = rawProd.sizes[sizeKey];
      const variants = rawSize.variants ? Object.keys(rawSize.variants) : [null];

      variants.forEach((vKey) => {
        const rawLargest = getProductLargestZone(prodId, sizeKey, vKey);
        const normLargest = getProductLargestZone(normSpec, sizeKey, vKey);

        assert.strictEqual(rawLargest.productId, normLargest.productId);
        assert.strictEqual(rawLargest.productName, normLargest.productName);
        assert.strictEqual(rawLargest.sizeKey, normLargest.sizeKey);
        assert.strictEqual(rawLargest.sizeLabel, normLargest.sizeLabel);
        assert.strictEqual(rawLargest.variant, normLargest.variant);
        assert.strictEqual(rawLargest.maxDim, normLargest.maxDim);
        assert.strictEqual(rawLargest.minAnchorDim, normLargest.minAnchorDim);

        assert.strictEqual(rawLargest.largestZone.id, normLargest.largestZone.id);
        assert.strictEqual(rawLargest.largestZone.name, normLargest.largestZone.name);
        assert.strictEqual(rawLargest.largestZone.role, normLargest.largestZone.role);
        assert.strictEqual(rawLargest.largestZone.width, normLargest.largestZone.width);
        assert.strictEqual(rawLargest.largestZone.height, normLargest.largestZone.height);
      });
    });
  });
});

// ---------------------------------------------------------------------------
// 4. getProductRequirements Exact Parity
// ---------------------------------------------------------------------------
console.log('\n--- 4. getProductRequirements Exact Parity ---');

PRODUCTS.forEach((prodId) => {
  test(`getProductRequirements parity for product: ${prodId} (all sizes & variants)`, () => {
    const rawProd = PRODUCT_TEMPLATES[prodId];
    const normSpec = normalizeGarmentSpec(rawProd);

    Object.keys(rawProd.sizes).forEach((sizeKey) => {
      const rawSize = rawProd.sizes[sizeKey];
      const variants = rawSize.variants ? Object.keys(rawSize.variants) : [null];

      variants.forEach((vKey) => {
        const rawReq = getProductRequirements(prodId, sizeKey, CONFIG.SEAM_ALLOWANCE_CM, vKey);
        const normReq = getProductRequirements(normSpec, sizeKey, CONFIG.SEAM_ALLOWANCE_CM, vKey);

        // Top-level requirements metrics
        assert.strictEqual(rawReq.productId, normReq.productId);
        assert.strictEqual(rawReq.productName, normReq.productName);
        assert.strictEqual(rawReq.sizeKey, normReq.sizeKey);
        assert.strictEqual(rawReq.sizeLabel, normReq.sizeLabel);
        assert.strictEqual(rawReq.variant, normReq.variant);
        assert.strictEqual(rawReq.totalAreaNeeded, normReq.totalAreaNeeded);
        assert.strictEqual(rawReq.totalFinishedArea, normReq.totalFinishedArea);
        assert.strictEqual(rawReq.roleAreas.base, normReq.roleAreas.base);
        assert.strictEqual(rawReq.roleAreas.supporting, normReq.roleAreas.supporting);
        assert.strictEqual(rawReq.roleAreas.accent, normReq.roleAreas.accent);
        assert.strictEqual(rawReq.minAnchorDim, normReq.minAnchorDim);

        // Expanded zones length
        assert.strictEqual(rawReq.zones.length, normReq.zones.length);

        // Every expanded zone item
        rawReq.zones.forEach((rawZone, i) => {
          const normZone = normReq.zones[i];

          assert.strictEqual(rawZone.id, normZone.id);
          assert.strictEqual(rawZone.baseZoneId, normZone.baseZoneId);
          assert.strictEqual(rawZone.name, normZone.name);
          assert.strictEqual(rawZone.role, normZone.role);
          assert.strictEqual(rawZone.finishedWidth, normZone.finishedWidth);
          assert.strictEqual(rawZone.finishedHeight, normZone.finishedHeight);
          assert.strictEqual(rawZone.cutWidth, normZone.cutWidth);
          assert.strictEqual(rawZone.cutHeight, normZone.cutHeight);
          assert.strictEqual(rawZone.accentOnly, normZone.accentOnly);
          assert.strictEqual(rawZone.optional, normZone.optional);
          assert.strictEqual(rawZone.fabricSource, normZone.fabricSource);
          assert.strictEqual(rawZone.scrapEligible, normZone.scrapEligible);
        });
      });
    });
  });
});

// ---------------------------------------------------------------------------
// 5. Parametric & Direct Template Passing
// ---------------------------------------------------------------------------
console.log('\n--- 5. Direct Template Object vs Product ID Calling ---');

test('getProductRequirements works interchangeably with ID string or normalized object', () => {
  const byId = getProductRequirements('pouch', 'medium');
  const byRawObj = getProductRequirements(PRODUCT_TEMPLATES.pouch, 'medium');
  const byNormObj = getProductRequirements(normalizeGarmentSpec(PRODUCT_TEMPLATES.pouch), 'medium');

  assert.strictEqual(byId.totalAreaNeeded, byRawObj.totalAreaNeeded);
  assert.strictEqual(byId.totalAreaNeeded, byNormObj.totalAreaNeeded);
  assert.strictEqual(byId.zones.length, byNormObj.zones.length);
});

console.log('====================================================');
console.log(`GATE 3 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('====================================================');

if (failed > 0) {
  process.exit(1);
}
