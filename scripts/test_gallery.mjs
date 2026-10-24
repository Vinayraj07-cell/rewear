// scripts/test_gallery.mjs
// Stage 6 / Task A2: Automated Test Suite for Gallery Importer and Inspiration Matching

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {
  runGalleryImport,
  getImageDimensions,
  MAX_FILE_SIZE_BYTES,
  MAX_WIDTH_PX,
  COLOURWAY_PALETTES,
} from './import_gallery.mjs';
import {
  findInspiration,
  computePaletteDistance,
  colorDistance,
} from '../src/gallery/findInspiration.js';
import { GALLERY_TRANSLATIONS } from '../src/i18n/galleryTranslations.js';

function pass(msg) {
  console.log(`  ✅ PASS: ${msg}`);
}

console.log('====================================================');
console.log('🖼️  RUNNING INSPIRATION GALLERY TEST SUITE');
console.log('====================================================\n');

/**
 * Creates a valid, lightweight mock PNG buffer with specified dimensions and byte padding.
 */
function createMockPngBuffer(width = 10, height = 10, paddingBytes = 0) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(25);
  ihdr.writeUInt32BE(13, 0); // chunk length
  ihdr.write('IHDR', 4, 'ascii'); // chunk type
  ihdr.writeUInt32BE(width, 8); // width
  ihdr.writeUInt32BE(height, 12); // height
  ihdr.writeUInt8(8, 16); // bit depth
  ihdr.writeUInt8(2, 17); // truecolor
  ihdr.writeUInt8(0, 18); // compression
  ihdr.writeUInt8(0, 19); // filter
  ihdr.writeUInt8(0, 20); // interlace
  ihdr.writeUInt32BE(0, 21); // crc

  if (paddingBytes > 0) {
    return Buffer.concat([sig, ihdr, Buffer.alloc(paddingBytes, 0x55)]);
  }
  return Buffer.concat([sig, ihdr]);
}

const tempBase = fs.mkdtempSync(path.join(os.tmpdir(), 'rewear_gallery_test_'));
const incomingDir = path.join(tempBase, 'incoming');
const outputDir = path.join(tempBase, 'gallery');

try {
  fs.mkdirSync(incomingDir, { recursive: true });
  fs.mkdirSync(outputDir, { recursive: true });

  // ---------------------------------------------------------------------------
  // 1. Image Header Dimension Parser (Pure JS, zero dependency)
  // ---------------------------------------------------------------------------
  console.log('--- 1. Header Dimension Parser Tests ---');
  const png100 = createMockPngBuffer(100, 200);
  const dims = getImageDimensions(png100);
  assert.strictEqual(dims.width, 100);
  assert.strictEqual(dims.height, 200);
  assert.strictEqual(dims.format, 'png');
  pass('PNG header dimensions accurately parsed without dependencies');

  // ---------------------------------------------------------------------------
  // 2. Mock Fixture Ingestion (Filename & Folder Labeling, Unknown ID Handling)
  // ---------------------------------------------------------------------------
  console.log('\n--- 2. Gallery Import & Manifest Generation ---');

  // Filename labeled files
  fs.writeFileSync(path.join(incomingDir, 'tote_bag__earth__01.png'), createMockPngBuffer(512, 512));
  fs.writeFileSync(path.join(incomingDir, 'tote_bag__indigo__01.png'), createMockPngBuffer(512, 512));
  fs.writeFileSync(path.join(incomingDir, 'pouch__festive__01.png'), createMockPngBuffer(512, 512));
  fs.writeFileSync(path.join(incomingDir, 'cushion_cover__pastel__01.png'), createMockPngBuffer(512, 512));

  // Folder labeled file: <productId>__<colourway>/<filename>.png
  const folderDir = path.join(incomingDir, 'lunch_bag__earth');
  fs.mkdirSync(folderDir, { recursive: true });
  fs.writeFileSync(path.join(folderDir, 'sample_photo.png'), createMockPngBuffer(512, 512));

  // Unknown product file: must be skipped without crashing
  fs.writeFileSync(path.join(incomingDir, 'quantum_spaceship__earth__01.png'), createMockPngBuffer(512, 512));

  const importResult = await runGalleryImport({ incomingDir, outputDir, quiet: true });

  assert.strictEqual(importResult.importedCount, 5, 'Must import exactly 5 valid images');
  assert.strictEqual(importResult.skippedUnknownIds.length, 1, 'Must record 1 skipped unknown product ID');
  assert.strictEqual(importResult.skippedUnknownIds[0], 'quantum_spaceship', 'Skipped product must be quantum_spaceship');
  pass('Successfully imported 5 valid images and skipped unknown product ID');

  // Verify manifest file on disk
  const manifestPath = path.join(outputDir, 'manifest.json');
  assert(fs.existsSync(manifestPath), 'manifest.json must exist in outputDir');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  assert.strictEqual(manifest.length, 5, 'manifest must contain exactly 5 entries');
  for (const item of manifest) {
    assert(item.id, 'item must have an id');
    assert(item.file, 'item must have a file property');
    assert(fs.existsSync(path.join(outputDir, item.file)), `Target file ${item.file} must exist on disk`);
    assert(item.productId, 'item must have a productId');
    assert(item.category, 'item must have a category');
    assert(['earth', 'indigo', 'festive', 'pastel'].includes(item.colourway), 'item must have a valid colourway');
    assert(Array.isArray(item.colours) && item.colours.length === 4, 'item colours must be an array of 4 hex strings');
    assert(item.names && item.names.en && item.names.hi && item.names.te, 'item must have en, hi, and te names');
    assert.strictEqual(item.aiGenerated, true, 'aiGenerated flag must be strictly true');
  }
  pass('manifest.json structure strictly conforms to specification');

  // Verify filename labeled item
  const toteEarth = manifest.find((m) => m.id === 'tote_bag_earth_01');
  assert(toteEarth, 'tote_bag_earth_01 must be present in manifest');
  assert.strictEqual(toteEarth.category, 'bags');
  assert.deepStrictEqual(toteEarth.colours, COLOURWAY_PALETTES.earth);
  pass('Filename labeling correctly extracted productId, colourway, category, and palette');

  // Verify folder labeled item
  const lunchEarth = manifest.find((m) => m.productId === 'lunch_bag' && m.colourway === 'earth');
  assert(lunchEarth, 'lunch_bag item from subfolder must be present in manifest');
  assert.strictEqual(lunchEarth.category, 'bags');
  pass('Folder labeling correctly extracted productId and colourway from parent folder');

  // ---------------------------------------------------------------------------
  // 3. Colour Distance and Palette Ranking (findInspiration)
  // ---------------------------------------------------------------------------
  console.log('\n--- 3. Inspiration Ranking Logic Tests ---');

  // Hand-made terracotta/mustard colors should match earth much closer than indigo
  const earthScraps = ['#C2410C', '#CA8A04'];
  const earthDist = computePaletteDistance(earthScraps, COLOURWAY_PALETTES.earth);
  const indigoDist = computePaletteDistance(earthScraps, COLOURWAY_PALETTES.indigo);
  assert(earthDist < indigoDist, `Earth distance (${earthDist}) must be strictly less than indigo distance (${indigoDist}) for earth scraps`);
  pass(`Colour distance verified: earth scraps are closer to earth palette (${earthDist}) than indigo palette (${indigoDist})`);

  // Query findInspiration for tote_bag with earth scraps:
  // Must return tote_bag_earth_01 FIRST, then tote_bag_indigo_01, then other bags (lunch_bag_earth)
  const results = findInspiration(manifest, { productId: 'tote_bag', colours: earthScraps, limit: 6 });
  assert.strictEqual(results.length, 5, 'Results should return all 5 items up to limit 6');

  assert.strictEqual(results[0].id, 'tote_bag_earth_01', 'Rank 1 must be exact product matching closest colour (tote_bag_earth_01)');
  assert.strictEqual(results[1].id, 'tote_bag_indigo_01', 'Rank 2 must be exact product with further colour (tote_bag_indigo_01)');
  assert.strictEqual(results[2].productId, 'lunch_bag', 'Rank 3 must be category fallback (lunch_bag is also category bags)');

  // Every result item must contain disclaimerKey and honesty strings
  for (const res of results) {
    assert.strictEqual(res.disclaimerKey, 'inspirationDisclaimer');
    assert.strictEqual(res.disclaimer.en, GALLERY_TRANSLATIONS.en.inspirationDisclaimer);
    assert.strictEqual(res.disclaimer.hi, GALLERY_TRANSLATIONS.hi.inspirationDisclaimer);
    assert.strictEqual(res.disclaimer.te, GALLERY_TRANSLATIONS.te.inspirationDisclaimer);
    assert(typeof res.colourDistance === 'number' && !isNaN(res.colourDistance));
  }
  pass('findInspiration correctly ranks matching product first, then category, with honesty disclaimers');

  // ---------------------------------------------------------------------------
  // 4. Safe Empty & Missing Manifest Handling
  // ---------------------------------------------------------------------------
  console.log('\n--- 4. Safe Empty/Missing Manifest Handling ---');
  assert.deepStrictEqual(findInspiration([], { productId: 'tote_bag' }), []);
  assert.deepStrictEqual(findInspiration(null, { productId: 'tote_bag' }), []);
  assert.deepStrictEqual(findInspiration(undefined, { productId: 'tote_bag' }), []);
  assert.deepStrictEqual(findInspiration(manifest, { limit: 0 }), []);
  pass('findInspiration safely returns [] on empty, null, undefined, or zero-limit manifest without throwing');

  // ---------------------------------------------------------------------------
  // 5. Size and Dimension Guards (FAIL on > 150 KB or > 768 px)
  // ---------------------------------------------------------------------------
  console.log('\n--- 5. Size and Dimension Guard Tests ---');

  // Test 5A: Oversized file (> 150 KB)
  const oversizedDir = path.join(tempBase, 'oversized_incoming');
  fs.mkdirSync(oversizedDir, { recursive: true });
  fs.writeFileSync(
    path.join(oversizedDir, 'tote_bag__earth__02.png'),
    createMockPngBuffer(512, 512, 160 * 1024) // ~160 KB
  );

  let caughtSizeError = null;
  try {
    await runGalleryImport({ incomingDir: oversizedDir, outputDir, quiet: true });
  } catch (err) {
    caughtSizeError = err;
  }
  assert(caughtSizeError !== null, 'Import must throw on file over 150 KB');
  assert(
    caughtSizeError.message.includes('exceeding 150 KB limit') &&
    caughtSizeError.message.includes('512 px WebP at quality 75'),
    `Error message must contain conversion advice: ${caughtSizeError.message}`
  );
  pass('File size guard (>150 KB) strictly enforced with exact conversion guidance message');

  // Test 5B: Overly wide file (> 768 px)
  const wideDir = path.join(tempBase, 'wide_incoming');
  fs.mkdirSync(wideDir, { recursive: true });
  fs.writeFileSync(
    path.join(wideDir, 'pouch__indigo__02.png'),
    createMockPngBuffer(1024, 512) // 1024 px wide
  );

  let caughtWidthError = null;
  try {
    await runGalleryImport({ incomingDir: wideDir, outputDir, quiet: true });
  } catch (err) {
    caughtWidthError = err;
  }
  assert(caughtWidthError !== null, 'Import must throw on file with width > 768 px');
  assert(
    caughtWidthError.message.includes('exceeding 768px limit') &&
    caughtWidthError.message.includes('512 px WebP at quality 75'),
    `Error message must contain conversion advice: ${caughtWidthError.message}`
  );
  pass('Dimension guard (>768 px) strictly enforced with exact conversion guidance message');

  console.log('\n====================================================');
  console.log('🎉 ALL INSPIRATION GALLERY TESTS PASSED PERFECTLY!');
  console.log('====================================================\n');
} finally {
  // Always clean up OS temporary test directory
  try {
    fs.rmSync(tempBase, { recursive: true, force: true });
  } catch {
    // Ignore temp cleanup errors
  }
}
