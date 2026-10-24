// src/utils/test_draw_rectangles.js
// Unit tests for getProductDrawRectangles (Stage 6 / Q12d)
// Verifies pure function determinism:
// 1. Same design gives identical output
// 2. Different designs give different output
// 3. Valid rectangle coordinates for 3D texture mapping (tote_bag, cushion_cover, pouch)

import assert from 'node:assert';
import { getProductDrawRectangles, drawDesignToCanvas } from './product2DLayout.js';

let passedCount = 0;
function pass(msg) {
  passedCount++;
  console.log(`  ✅ PASS: ${msg}`);
}

console.log('====================================================');
console.log('📐 RUNNING PRODUCT DRAW RECTANGLES TEST SUITE');
console.log('====================================================\n');

// Sample design A: Tote bag with Navy scraps
const designToteA = {
  productId: 'tote_bag',
  sizeKey: 'medium',
  variant: 'plain',
  placements: [
    {
      zoneId: 'body_front',
      color: 'navy',
      scraps: [
        { scrapId: 'scrap-navy-1', color: 'navy', colorHex: '#1E3A8A', width: 36, height: 38, print: 'plain' },
      ],
    },
  ],
};

// Sample design B: Tote bag with Red Floral scraps
const designToteB = {
  productId: 'tote_bag',
  sizeKey: 'medium',
  variant: 'plain',
  placements: [
    {
      zoneId: 'body_front',
      color: 'red',
      scraps: [
        { scrapId: 'scrap-red-1', color: 'red', colorHex: '#EF4444', width: 36, height: 38, print: 'floral' },
      ],
    },
  ],
};

// Sample design C: Cushion Cover (different product with 9 patches)
const designCushion = {
  productId: 'cushion_cover',
  sizeKey: 'medium',
  variant: 'plain',
  placements: [
    {
      zoneId: 'front_body',
      seamType: '3x3_grid_seams',
      scraps: [
        { scrapId: 's1', color: 'navy', colorHex: '#1E3A8A' },
        { scrapId: 's2', color: 'beige', colorHex: '#D6C0A4' },
        { scrapId: 's3', color: 'grey', colorHex: '#9CA3AF' },
        { scrapId: 's4', color: 'navy', colorHex: '#1E3A8A' },
        { scrapId: 's5', color: 'beige', colorHex: '#D6C0A4' },
        { scrapId: 's6', color: 'grey', colorHex: '#9CA3AF' },
        { scrapId: 's7', color: 'navy', colorHex: '#1E3A8A' },
        { scrapId: 's8', color: 'beige', colorHex: '#D6C0A4' },
        { scrapId: 's9', color: 'grey', colorHex: '#9CA3AF' },
      ],
    },
  ],
};

// Sample design D: Zippered Utility Pouch
const designPouch = {
  productId: 'pouch',
  sizeKey: 'medium',
  variant: 'plain',
  placements: [
    {
      zoneId: 'pouch_front_base',
      color: 'teal',
      scraps: [
        { scrapId: 'p1', color: 'teal', colorHex: '#0D9488', width: 22, height: 10 },
      ],
    },
    {
      zoneId: 'pouch_upper_band',
      color: 'yellow',
      scraps: [
        { scrapId: 'p2', color: 'yellow', colorHex: '#EAB308', width: 22, height: 5 },
      ],
    },
  ],
};

// 1. Identity / Determinism: Same design gives identical output
console.log('--- 1. Determinism & Identity ---');
const rectsA1 = getProductDrawRectangles(designToteA, 'front');
const rectsA2 = getProductDrawRectangles(designToteA, 'front');
assert.deepStrictEqual(rectsA1, rectsA2, 'Identical calls must return deep equal rectangle lists');
assert.strictEqual(JSON.stringify(rectsA1), JSON.stringify(rectsA2), 'JSON representations must be identical');
pass('Same design gives identical rectangle output on repeat calls');

// 2. Discrimination: Different designs give different output
console.log('\n--- 2. Discrimination between Different Designs ---');
const rectsB = getProductDrawRectangles(designToteB, 'front');
assert.notDeepStrictEqual(rectsA1, rectsB, 'Different scrap designs must return different rectangles');
const mainA = rectsA1.find((r) => r.zoneId === 'body_front');
const mainB = rectsB.find((r) => r.zoneId === 'body_front');
assert(mainA && mainB, 'Both designs must have body_front rectangle');
assert.notStrictEqual(mainA.colorHex, mainB.colorHex, 'Color hexes must differ between design A and B');
assert.strictEqual(mainA.colorHex, '#1E3A8A');
assert.strictEqual(mainB.colorHex, '#EF4444');
assert.strictEqual(mainB.print, 'floral');
pass('Two different designs produce distinct rectangle coordinates, colors, and prints');

// 3. Product differences: Tote vs Cushion vs Pouch
console.log('\n--- 3. Product Geometry Differences ---');
const rectsCushion = getProductDrawRectangles(designCushion, 'front');
const rectsPouch = getProductDrawRectangles(designPouch, 'front');
assert(rectsCushion.length >= 9, '3x3 Cushion must have at least 9 patchwork rectangles');
assert(rectsPouch.length >= 2, 'Pouch must have at least 2 rectangles (tabs + base + band)');
assert.notDeepStrictEqual(rectsA1, rectsCushion, 'Tote and Cushion rectangles must differ completely');
assert.notDeepStrictEqual(rectsCushion, rectsPouch, 'Cushion and Pouch rectangles must differ completely');
pass('Tote, Cushion, and Pouch yield specialized layout rectangle sets');

// 4. Validity of rectangle geometric properties
console.log('\n--- 4. Rectangle Property Integrity ---');
for (const r of [...rectsA1, ...rectsCushion, ...rectsPouch]) {
  assert(typeof r.x === 'number' && !isNaN(r.x), 'x must be valid number');
  assert(typeof r.y === 'number' && !isNaN(r.y), 'y must be valid number');
  assert(typeof r.width === 'number' && r.width > 0, 'width must be positive number');
  assert(typeof r.height === 'number' && r.height > 0, 'height must be positive number');
  assert(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(r.colorHex), `colorHex must be valid hex: ${r.colorHex}`);
}
pass('All extracted rectangles have valid numbers, positive dimensions, and hex colors');

// 5. Defensive Edge Case Handling
console.log('\n--- 5. Defensive Edge Case Handling ---');
assert.deepStrictEqual(getProductDrawRectangles(null), []);
assert.deepStrictEqual(getProductDrawRectangles({}), []);
assert.deepStrictEqual(getProductDrawRectangles({ productId: 'unknown_item' }), []);
pass('Null or invalid designs safely return empty array without exceptions');

// 6. drawDesignToCanvas execution (verifies viewBox string/object handling on canvas)
console.log('\n--- 6. drawDesignToCanvas Canvas Context Execution ---');
const createMockCanvas = () => ({
  width: 512,
  height: 512,
  getContext: () => ({
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
    clearRect: () => {},
    fillRect: () => {},
    strokeRect: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    stroke: () => {},
    setLineDash: () => {},
    createLinearGradient: () => ({ addColorStop: () => {} }),
  }),
});

for (const d of [designToteA, designCushion, designPouch]) {
  const cFront = createMockCanvas();
  assert.doesNotThrow(() => drawDesignToCanvas(cFront, d, 'front'), `drawDesignToCanvas front threw on ${d.productId}`);
  const cBack = createMockCanvas();
  assert.doesNotThrow(() => drawDesignToCanvas(cBack, d, 'back'), `drawDesignToCanvas back threw on ${d.productId}`);
}
pass('drawDesignToCanvas executes cleanly for front & back on tote, cushion, and pouch');

console.log('\n====================================================');
console.log(`🎉 ALL ${passedCount} DRAW RECTANGLES TESTS PASSED PERFECTLY!`);
console.log('====================================================\n');
