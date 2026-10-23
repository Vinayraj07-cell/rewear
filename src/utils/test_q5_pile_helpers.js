/**
 * TEST SUITE: Q5 Pile Helpers & Bulk Add Pure Functions
 *
 * Tests:
 * 1. Size presets definition (10x10, 12x12, 14x14, 15x20, 20x20 cm)
 * 2. 3 Sample piles (neutral, colourful, mixed_fabrics)
 * 3. Dimension & quantity validation
 * 4. Scrap creation with fabric defaults
 * 5. Scrap duplication with unique IDs
 * 6. Storage serialization / deserialization roundtrip and resilience
 */

import assert from 'assert';
import {
  SIZE_PRESETS,
  SAMPLE_PILES,
  validateQuantity,
  validateDimensions,
  findSizePreset,
  createScrapItem,
  duplicateScrapItem,
  serializePile,
  deserializePile,
  FABRIC_DEFAULTS,
  countPiecesTooSmallAfterMargin,
  formatFrayedTooSmallWarning,
} from './pileHelpers.js';

console.log('====================================================');
console.log('🧪 RUNNING Q5 PILE HELPERS & BULK ADD TEST SUITE');
console.log('====================================================\n');

// 1. Size Presets
console.log('--- 1. Testing Size Presets ---');
assert.strictEqual(SIZE_PRESETS.length, 5, 'Must have exactly 5 size presets');
const presetIds = SIZE_PRESETS.map((p) => p.id);
assert(presetIds.includes('10x10'), 'Must include 10x10 preset');
assert(presetIds.includes('12x12'), 'Must include 12x12 preset');
assert(presetIds.includes('14x14'), 'Must include 14x14 preset');
assert(presetIds.includes('15x20'), 'Must include 15x20 preset');
assert(presetIds.includes('20x20'), 'Must include 20x20 preset');

assert.strictEqual(findSizePreset(10, 10), '10x10');
assert.strictEqual(findSizePreset(12, 12), '12x12');
assert.strictEqual(findSizePreset(14, 14), '14x14');
assert.strictEqual(findSizePreset(15, 20), '15x20');
assert.strictEqual(findSizePreset(20, 15), '15x20', 'Rotated 20x15 matches 15x20 preset');
assert.strictEqual(findSizePreset(20, 20), '20x20');
assert.strictEqual(findSizePreset(16, 18), 'custom', 'Arbitrary dimensions return "custom"');
console.log('  ✅ PASS: All 5 size presets and custom matcher verified');

// 2. 3 Ready Sample Piles
console.log('\n--- 2. Testing 3 Ready Sample Piles ---');
assert(SAMPLE_PILES.neutral, 'Neutral sample pile exists');
assert(SAMPLE_PILES.colourful, 'Colourful sample pile exists');
assert(SAMPLE_PILES.mixed_fabrics, 'Mixed fabrics sample pile exists');

// Neutral: navy, beige, grey cotton
const neutral = SAMPLE_PILES.neutral;
const neutralColors = neutral.pieces.map((p) => p.color);
assert(neutralColors.includes('navy'), 'Neutral pile contains navy');
assert(neutralColors.includes('beige'), 'Neutral pile contains beige');
assert(neutralColors.includes('grey'), 'Neutral pile contains grey');
const neutralCount = neutral.pieces.reduce((sum, p) => sum + p.quantity, 0);
assert.strictEqual(neutralCount, 30, 'Neutral pile has 30 pieces total');
console.log(`  ✅ PASS: Neutral sample pile contains navy/beige/grey (total ${neutralCount} pcs)`);

// Colourful: vibrant palette with prints
const colourful = SAMPLE_PILES.colourful;
const colColors = colourful.pieces.map((p) => p.color);
assert(colColors.includes('navy'), 'Colourful pile has neutral base navy');
assert(colColors.includes('orange'), 'Colourful pile has orange accent');
assert(colColors.includes('pink'), 'Colourful pile has pink accent');
assert(colourful.pieces.some((p) => p.print === 'printed'), 'Colourful pile has printed scraps');
const colCount = colourful.pieces.reduce((sum, p) => sum + p.quantity, 0);
assert(colCount >= 30, 'Colourful pile has sufficient scraps for projects');
console.log(`  ✅ PASS: Colourful sample pile has vibrant contrast & prints (total ${colCount} pcs)`);

// Mixed fabrics: denim, cotton, linen, silk
const mixed = SAMPLE_PILES.mixed_fabrics;
const mixedFabrics = mixed.pieces.map((p) => p.fabricType);
assert(mixedFabrics.includes('denim'), 'Mixed pile includes denim');
assert(mixedFabrics.includes('cotton'), 'Mixed pile includes cotton');
assert(mixedFabrics.includes('linen'), 'Mixed pile includes linen');
assert(mixedFabrics.includes('silk'), 'Mixed pile includes silk');
const mixedCount = mixed.pieces.reduce((sum, p) => sum + p.quantity, 0);
assert.strictEqual(mixedCount, 30, 'Mixed pile has 30 pieces total');
console.log(`  ✅ PASS: Mixed fabrics sample pile has denim, cotton, linen, silk (total ${mixedCount} pcs)`);

// 3. Validation Helpers
console.log('\n--- 3. Testing Validation Helpers ---');
assert.strictEqual(validateQuantity(5), 5);
assert.strictEqual(validateQuantity('12'), 12);
assert.strictEqual(validateQuantity(0), 1, 'Quantity clamped to min 1');
assert.strictEqual(validateQuantity(-5), 1, 'Negative quantity clamped to min 1');
assert.strictEqual(validateQuantity(150), 99, 'Quantity clamped to max 99');
assert.strictEqual(validateQuantity('abc'), 1, 'Invalid quantity defaults to min 1');

const v1 = validateDimensions(14, 14);
assert.strictEqual(v1.valid, true);
assert.strictEqual(v1.width, 14);
assert.strictEqual(v1.height, 14);

const v2 = validateDimensions(14.24, 20.76);
assert.strictEqual(v2.valid, true);
assert.strictEqual(v2.width, 14.2);
assert.strictEqual(v2.height, 20.8);

const vInvalid = validateDimensions(-5, 10);
assert.strictEqual(vInvalid.valid, false);
console.log('  ✅ PASS: Quantity and dimension validation work as expected');

// 4. Scrap Creation & Defaults
console.log('\n--- 4. Testing createScrapItem Helper ---');
const item1 = createScrapItem({
  width: 15,
  height: 20,
  fabricType: 'denim',
  color: 'royalBlue',
  print: 'plain',
  quantity: 3,
});
assert(item1.id.startsWith('scrap-'), 'Generates valid scrap ID');
assert.strictEqual(item1.width, 15);
assert.strictEqual(item1.height, 20);
assert.strictEqual(item1.fabricType, 'denim');
assert.strictEqual(item1.color, 'royalBlue');
assert.deepStrictEqual(item1.colors, ['royalBlue']);
assert.strictEqual(item1.quantity, 3);
assert.strictEqual(item1.thickness, 'thick', 'Denim inherits thick default');
assert.strictEqual(item1.feel, 'stiff', 'Denim inherits stiff default');
assert.strictEqual(item1.included, true);

const item2 = createScrapItem({
  fabricType: 'knit',
  color: 'yellow',
  print: 'printed',
  quantity: 1,
});
assert.strictEqual(item2.stretch, true, 'Knit inherits stretch: true');
assert.strictEqual(item2.print, 'printed');
assert.notStrictEqual(item1.id, item2.id, 'IDs are unique');
console.log('  ✅ PASS: createScrapItem correctly applies fabric defaults and creates unique IDs');

// 5. Scrap Duplication
console.log('\n--- 5. Testing duplicateScrapItem Helper ---');
const dup = duplicateScrapItem(item1);
assert.notStrictEqual(dup.id, item1.id, 'Duplicate gets new unique ID');
assert.strictEqual(dup.width, item1.width);
assert.strictEqual(dup.height, item1.height);
assert.strictEqual(dup.color, item1.color);
assert.strictEqual(dup.fabricType, item1.fabricType);
assert.strictEqual(dup.quantity, item1.quantity);
console.log('  ✅ PASS: duplicateScrapItem duplicates piece with new unique ID');

// 6. Serialization / Deserialization
console.log('\n--- 6. Testing Pile Serialization & LocalStorage Resilience ---');
const testPile = [item1, item2, dup];
const json = serializePile(testPile);
assert(typeof json === 'string', 'serializePile returns string');
const restored = deserializePile(json);
assert.strictEqual(restored.length, 3, 'Restores all 3 items');
assert.strictEqual(restored[0].id, item1.id);

// Corrupted json or null
const fallback = [{ id: 'fallback-1' }];
assert.deepStrictEqual(deserializePile(null, fallback), fallback, 'Null JSON returns fallback');
assert.deepStrictEqual(deserializePile('invalid-json{{{', fallback), fallback, 'Corrupt JSON returns fallback');
assert.deepStrictEqual(deserializePile('{"not":"array"}', fallback), fallback, 'Non-array returns fallback');
console.log('  ✅ PASS: Serialization and resilient deserialization verified');

// 7. Frayed Margin Too Small Pieces Warning
console.log('\n--- 7. Testing Frayed Margin Too-Small Pieces Counting & Formatting ---');
const frayedPile = [
  { id: 'p1', width: 6, height: 6, quantity: 2 },   // margin 0.5 -> 5.0 (usable), margin 1.0 -> 4.0 (too small)
  { id: 'p2', width: 5.5, height: 8, quantity: 1 }, // margin 0.5 -> 4.5 (too small), margin 1.0 -> 3.5 (too small)
  { id: 'p3', width: 14, height: 14, quantity: 5 }, // margin 0.5 -> 13.0, margin 1.0 -> 12.0 (never too small)
];

assert.strictEqual(countPiecesTooSmallAfterMargin(frayedPile, 0), 0, 'Margin 0 reports 0 pieces too small');
assert.strictEqual(countPiecesTooSmallAfterMargin(frayedPile, 0.5), 1, 'Margin 0.5 reports 1 piece too small (p2)');
assert.strictEqual(countPiecesTooSmallAfterMargin(frayedPile, 1.0), 3, 'Margin 1.0 reports 3 pieces too small (2 of p1 + 1 of p2)');

// Warning formatting in en, hi, te
assert.strictEqual(
  formatFrayedTooSmallWarning(1, 'en'),
  '1 piece is too small once the frayed edge is removed'
);
assert.strictEqual(
  formatFrayedTooSmallWarning(3, 'en'),
  '3 pieces are too small once the frayed edge is removed'
);
assert(
  formatFrayedTooSmallWarning(1, 'hi').includes('1 टुकड़ा बहुत छोटा है'),
  'Hindi singular warning text matches'
);
assert(
  formatFrayedTooSmallWarning(3, 'hi').includes('3 टुकड़े बहुत छोटे हैं'),
  'Hindi plural warning text matches'
);
assert(
  formatFrayedTooSmallWarning(1, 'te').includes('1 ముక్క చాలా చిన్నది'),
  'Telugu singular warning text matches'
);
assert(
  formatFrayedTooSmallWarning(3, 'te').includes('3 ముక్కలు చాలా చిన్నవిగా మారాయి'),
  'Telugu plural warning text matches'
);
console.log('  ✅ PASS: Frayed margin counting and localized warnings verified in en/hi/te');

console.log('\n====================================================');
console.log('🏁 ALL Q5 PILE HELPERS TESTS PASSED (100%)');
console.log('====================================================\n');
