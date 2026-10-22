// src/utils/test_stage4b_blueprint.js
// Stage 4B / Q4: Complete tailor blueprint regression test suite
// Verifies for all products & sizes:
// 1. Piece cut and finished sizes equal template sizes exactly
// 2. Grain direction from data (not hardcoded)
// 3. Step text and materials line use selected size dimensions
// 4. Summarised long scrap lists
// 5. PDF generation: extracted text contains rupee sign (₹), no '[DIAGRAM]', and page count has no empty page

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { buildDesign } from '../engine/index.js';
import { PRODUCT_TEMPLATES, getProductRequirements } from '../engine/templates.js';
import {
  buildTailorBlueprint,
  TAILOR_DISCLAIMER,
  cmToInch,
  formatDualDimension,
  summarizeScrapsList,
  PRODUCT_STITCHING_STEPS,
  getProductStitchingSteps,
  getProductMaterialsList,
  getProductPriceDefaults,
} from './tailorBlueprintData.js';

const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');

console.log('====================================================');
console.log('📐 RUNNING STAGE 4B / Q4 TAILOR BLUEPRINT REGRESSION TESTS');
console.log('====================================================');

// Generous pile for testing all product sizes
const TEST_PILE = [
  ...Array.from({ length: 24 }, (_, i) => ({
    id: `navy_${i + 1}`,
    width: 14,
    height: 14,
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
    color: 'navy',
    colorHex: '#1E3A8A',
    print: 'plain',
  })),
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `beige_${i + 1}`,
    width: 14,
    height: 14,
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
    color: 'beige',
    colorHex: '#D6C0A4',
    print: 'plain',
  })),
  ...Array.from({ length: 16 }, (_, i) => ({
    id: `grey_${i + 1}`,
    width: 14,
    height: 14,
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
    color: 'grey',
    colorHex: '#9CA3AF',
    print: 'plain',
  })),
];

// --- 1. Unit conversions & Scraps Summary ---
{
  assert.strictEqual(cmToInch(2.54), 1.0, '2.54 cm must equal 1.0 inch');
  assert.strictEqual(cmToInch(25.4), 10.0, '25.4 cm must equal 10.0 inches');
  const dual = formatDualDimension(30, 20);
  assert.strictEqual(dual.cm, '30 × 20 cm');
  assert.strictEqual(dual.inches, '11.8 × 7.9 in');

  // Scraps summarizer
  const scrapsMock = [
    { color: 'navy', trimmedDimensions: { cm: '14 × 14 cm' } },
    { color: 'navy', trimmedDimensions: { cm: '14 × 14 cm' } },
    { color: 'navy', trimmedDimensions: { cm: '14 × 14 cm' } },
    { color: 'beige', trimmedDimensions: { cm: '14 × 14 cm' } },
  ];
  const summary = summarizeScrapsList(scrapsMock);
  assert.strictEqual(summary, '3 scraps: navy 14 × 14 cm, 1 scrap: beige 14 × 14 cm');
  console.log('✓ cm to inch conversion, formatting, and scrap summary verified.');
}

// --- 2. Regression: For EVERY product and size, blueprint piece sizes equal template sizes exactly ---
console.log('\n--- Regression Suite 1: Blueprint piece sizes equal template sizes exactly ---');
const ALL_PRODUCTS = ['pouch', 'tote_bag', 'cushion_cover', 'kids_frock'];

for (const productId of ALL_PRODUCTS) {
  const prod = PRODUCT_TEMPLATES[productId];
  const sizeKeys = Object.keys(prod.sizes);

  for (const sizeKey of sizeKeys) {
    const templateReq = getProductRequirements(productId, sizeKey, 1.0);
    assert(templateReq, `getProductRequirements must succeed for ${productId} ${sizeKey}`);

    const design = buildDesign(TEST_PILE, productId, sizeKey);
    assert(design, `buildDesign must succeed for ${productId} ${sizeKey}`);

    const blueprint = buildTailorBlueprint(design);
    assert(!blueprint.error, `Blueprint build failed for ${productId} ${sizeKey}`);

    // Verify mandatory tailor disclaimer
    assert.strictEqual(blueprint.disclaimer, TAILOR_DISCLAIMER);
    assert.strictEqual(blueprint.disclaimer, 'Measurements to be verified by a tailor');

    // Verify each piece matches the template zone sizes exactly
    blueprint.pieces.forEach((piece) => {
      const zoneDef = templateReq.zones.find((z) => z.id === piece.zoneId) ||
                      templateReq.zones.find((z) => z.baseZoneId === piece.zoneId);

      assert(zoneDef, `Template zone definition must exist for ${piece.zoneId} in ${productId} ${sizeKey}`);

      // Exact numerical size parity
      assert.strictEqual(
        piece.cutWidth,
        zoneDef.cutWidth,
        `Piece ${piece.name} cutWidth mismatch in ${productId} ${sizeKey}: got ${piece.cutWidth}, expected ${zoneDef.cutWidth}`
      );
      assert.strictEqual(
        piece.cutHeight,
        zoneDef.cutHeight,
        `Piece ${piece.name} cutHeight mismatch in ${productId} ${sizeKey}: got ${piece.cutHeight}, expected ${zoneDef.cutHeight}`
      );
      assert.strictEqual(
        piece.finishedWidth,
        zoneDef.finishedWidth,
        `Piece ${piece.name} finishedWidth mismatch in ${productId} ${sizeKey}: got ${piece.finishedWidth}, expected ${zoneDef.finishedWidth}`
      );
      assert.strictEqual(
        piece.finishedHeight,
        zoneDef.finishedHeight,
        `Piece ${piece.name} finishedHeight mismatch in ${productId} ${sizeKey}: got ${piece.finishedHeight}, expected ${zoneDef.finishedHeight}`
      );

      // Exact string dimension format parity
      assert.strictEqual(piece.cutDimensions.cm, `${zoneDef.cutWidth} × ${zoneDef.cutHeight} cm`);
      assert.strictEqual(piece.finishedDimensions.cm, `${zoneDef.finishedWidth} × ${zoneDef.finishedHeight} cm`);

      // Grain line from data
      assert(['↕', '↔'].includes(piece.grainLine.symbol), `Grain symbol must be ↕ or ↔ (got ${piece.grainLine.symbol})`);
      assert(piece.grainLine.description.toLowerCase().includes('grain'), 'Grain description must mention grain');
    });

    console.log(`  ✓ ${productId.padEnd(14)} [${sizeKey.padEnd(7)}]: ${blueprint.pieces.length} pieces match template sizes exactly`);
  }
}

// --- 3. Regression: Step text and materials line use the selected size ---
console.log('\n--- Regression Suite 2: Step text & materials line use selected size ---');
{
  // Tote Bag: Small vs Medium vs Large
  const toteStepsSmall = getProductStitchingSteps('tote_bag', 'small');
  const toteStepsMedium = getProductStitchingSteps('tote_bag', 'medium');
  const toteStepsLarge = getProductStitchingSteps('tote_bag', 'large');

  assert(toteStepsSmall[0].instruction.includes('28 × 30 cm'), 'Small tote step 1 must mention 28 × 30 cm');
  assert(toteStepsMedium[0].instruction.includes('36 × 38 cm'), 'Medium tote step 1 must mention 36 × 38 cm');
  assert(toteStepsLarge[0].instruction.includes('44 × 42 cm'), 'Large tote step 1 must mention 44 × 42 cm');

  assert(toteStepsSmall[5].instruction.includes('4 cm'), 'Small tote step 6 must mention 4 cm gusset');
  assert(toteStepsMedium[5].instruction.includes('6 cm'), 'Medium tote step 6 must mention 6 cm gusset');
  assert(toteStepsLarge[5].instruction.includes('8 cm'), 'Large tote step 6 must mention 8 cm gusset');

  const toteMatSmall = getProductMaterialsList('tote_bag', 'small');
  const toteMatMedium = getProductMaterialsList('tote_bag', 'medium');
  const toteMatLarge = getProductMaterialsList('tote_bag', 'large');

  assert(toteMatSmall.some((m) => m.name.includes('Handle') && m.qty.includes('50 cm')), 'Small tote handles must be 50 cm');
  assert(toteMatMedium.some((m) => m.name.includes('Handle') && m.qty.includes('60 cm')), 'Medium tote handles must be 60 cm');
  assert(toteMatLarge.some((m) => m.name.includes('Handle') && m.qty.includes('70 cm')), 'Large tote handles must be 70 cm');

  // Cushion Cover: Small vs Medium vs Large
  const cushionStepsSmall = getProductStitchingSteps('cushion_cover', 'small');
  const cushionStepsMedium = getProductStitchingSteps('cushion_cover', 'medium');
  const cushionStepsLarge = getProductStitchingSteps('cushion_cover', 'large');

  assert(cushionStepsSmall[0].instruction.includes('30 × 30 cm') && !cushionStepsSmall[0].instruction.includes('40 × 40'), 'Small cushion step 1 must only mention 30 × 30 cm');
  assert(cushionStepsMedium[0].instruction.includes('40 × 40 cm'), 'Medium cushion step 1 must mention 40 × 40 cm');
  assert(cushionStepsLarge[0].instruction.includes('50 × 50 cm'), 'Large cushion step 1 must mention 50 × 50 cm');

  const cushionMatSmall = getProductMaterialsList('cushion_cover', 'small');
  const cushionMatLarge = getProductMaterialsList('cushion_cover', 'large');
  assert(cushionMatSmall.some((m) => m.name.includes('Cushion') && m.qty.includes('30 × 30 cm')), 'Small cushion insert must be 30 × 30 cm');
  assert(cushionMatLarge.some((m) => m.name.includes('Cushion') && m.qty.includes('50 × 50 cm')), 'Large cushion insert must be 50 × 50 cm');

  // Pouch: Small vs Large zipper
  const pouchMatSmall = getProductMaterialsList('pouch', 'small');
  const pouchMatLarge = getProductMaterialsList('pouch', 'large');
  assert(pouchMatSmall.some((m) => m.name.includes('Zipper') && m.qty.includes('15 cm')), 'Small pouch zipper must be 15 cm');
  assert(pouchMatLarge.some((m) => m.name.includes('Zipper') && m.qty.includes('30 cm')), 'Large pouch zipper must be 30 cm');

  // Kids' Frock: 0-1y vs 6-8y
  const frockSteps01 = getProductStitchingSteps('kids_frock', '0-1y');
  const frockSteps68 = getProductStitchingSteps('kids_frock', '6-8y');
  assert(frockSteps01[0].instruction.includes('22 × 12 cm'), '0-1y frock bodice must be 22 × 12 cm');
  assert(frockSteps68[0].instruction.includes('34 × 18 cm'), '6-8y frock bodice must be 34 × 18 cm');

  console.log('  ✓ Tote bag, cushion cover, pouch, and kids frock step text & materials adapt dynamically to size');
}

// --- 4. Regression: PDF Text & Page Quality Verification ---
console.log('\n--- Regression Suite 3: Extracted PDF text contains ₹, no [DIAGRAM], no empty pages ---');
const ARTIFACT_DIR = 'C:/Users/vinay/.gemini/antigravity/brain/ec75a86c-861d-4711-81f7-d4872260aedc';
const PDF_FILES = [
  'tailor_blueprint_pouch.pdf',
  'tailor_blueprint_tote.pdf',
  'tailor_blueprint_cushion.pdf',
  'tailor_blueprint_frock.pdf',
];

for (const pdfFile of PDF_FILES) {
  const filePath = path.join(ARTIFACT_DIR, pdfFile);
  assert(fs.existsSync(filePath), `Generated PDF file must exist: ${filePath}`);

  const pdfBuf = fs.readFileSync(filePath);
  const parser = new PDFParse({ data: pdfBuf });
  const parsed = await parser.getText();

  // Exactly 2 pages per document, no empty page!
  assert.strictEqual(parsed.total, 2, `${pdfFile} must have exactly 2 pages (got ${parsed.total})`);

  for (let pIdx = 0; pIdx < parsed.pages.length; pIdx++) {
    const pageText = parsed.pages[pIdx].text.trim();
    assert(pageText.length > 200, `${pdfFile} page ${pIdx + 1} must not be empty or blank (got ${pageText.length} chars)`);
  }

  // Rupee symbol verified in extracted text
  assert(parsed.text.includes('₹'), `${pdfFile} extracted text must contain the rupee sign ₹`);

  // Zero [DIAGRAM] placeholders
  assert(!parsed.text.includes('[DIAGRAM]'), `${pdfFile} extracted text must not contain [DIAGRAM]`);
  assert(!parsed.text.includes('DIAGRAM'), `${pdfFile} extracted text must not contain DIAGRAM`);

  // Mandatory disclaimer verified
  assert(parsed.text.includes(TAILOR_DISCLAIMER), `${pdfFile} must contain mandatory disclaimer`);

  await parser.destroy();
  console.log(`  ✓ ${pdfFile.padEnd(28)}: 2 pages, contains ₹, 0 placeholders, 0 blank pages`);
}

console.log('\n====================================================');
console.log('🎉 ALL STAGE 4B / Q4 BLUEPRINT REGRESSION TESTS PASSED!');
console.log('====================================================\n');
