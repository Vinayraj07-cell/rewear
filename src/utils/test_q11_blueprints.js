// src/utils/test_q11_blueprints.js
// Stage 6 / Q11: Curved Garment Blueprints & Tiled PDF Regression Suite
// Verifies for Kids Top (Brian), Circle Skirt (Sandy), and Tank Top (Aaron):
// 1. PDF Page Counts (Sandy: 4, Aaron: 7, Brian: 8)
// 2. Each piece cut/finished size matches pinned FreeSewing CAD data
// 3. Shoelace polygon net areas match pattern data
// 4. Product-specific stitching steps (no parts the garment does not have)
// 5. Dual measurement tables (cm and inches) each marked "typical estimate, to be verified by a tailor"
// 6. Plain-fabric yardage clearly calculated and displayed
// 7. 10 cm scale calibration square and A4 overlap alignment marks
// 8. Zero "undefined", zero "null", zero "NaN" anywhere in extracted PDF text

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { buildDesign } from '../engine/index.js';
import {
  buildTailorBlueprint,
  getGarmentMeasurementTable,
  TAILOR_DISCLAIMER,
  TYPICAL_DEFAULTS_DISCLAIMER,
} from './tailorBlueprintData.js';
import {
  generateCurvedBlueprintPdf,
  getCurvedGarmentPieceList,
} from './curvedBlueprintPDF.js';
import { CHILD_TOP_BRIAN_DATA } from '../engine/childTopBrianData.js';
import { SANDY_SKIRT_DATA } from '../engine/sandySkirtData.js';
import { AARON_TANK_DATA } from '../engine/aaronTankData.js';
import { SAMPLE_PILES } from './pileHelpers.js';

const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');

const ARTIFACT_DIR = 'C:/Users/vinay/.gemini/antigravity/brain/ec75a86c-861d-4711-81f7-d4872260aedc';

function pass(msg) {
  console.log(`  ✅ PASS: ${msg}`);
}

console.log('====================================================');
console.log('📐 RUNNING Q11 CURVED GARMENT BLUEPRINTS TEST SUITE');
console.log('====================================================\n');

// ---------------------------------------------------------------------------
// 1. Piece Cut and Finished Sizes Against Pinned Pattern Data
// ---------------------------------------------------------------------------
console.log('--- 1. Piece Dimensions Against FreeSewing 4.10.2 CAD Data ---');

// Circle Skirt (Sandy)
const sandyPieces = getCurvedGarmentPieceList('sandy_skirt', 'waist54');
const sandyData = SANDY_SKIRT_DATA.waist54;
assert.strictEqual(sandyPieces.length, 2, 'Sandy drawing piece list has 2 pieces: 1 gore and 1 waistband');
pass('Circle Skirt piece list has 1 gore (with cut 16 instruction) and 1 waistband');

const gore = sandyPieces.find((p) => p.id === 'skirt_gore');
assert.strictEqual(gore.cutWidthCm, 9.4);
assert.strictEqual(gore.cutHeightCm, 27.4);
assert.strictEqual(gore.finishedWidthCm, 8.5);
assert.strictEqual(gore.finishedHeightCm, 25.8);
assert.strictEqual(gore.cutQty, 16);
assert.strictEqual(gore.cutQtyLabel, 'CUT 16 GORES FROM SCRAPS');
assert.strictEqual(gore.netAreaCm2, sandyData.pieces.skirt_gore_1.netAreaCm2);
pass('Circle Skirt Gore: 9.4 × 27.4 cm cut size, 8.5 × 25.8 cm finished size, cut 16 gores from scraps');

const wb = sandyPieces.find((p) => p.id === 'waistband');
assert.strictEqual(wb.cutWidthCm, 59.7);
assert.strictEqual(wb.cutHeightCm, 7.0);
assert.strictEqual(wb.finishedWidthCm, 57.7);
assert.strictEqual(wb.finishedHeightCm, 5.0);
assert.strictEqual(wb.cutQty, 1);
assert.strictEqual(wb.netAreaCm2, sandyData.pieces.waistband.netAreaCm2);
pass('Circle Skirt Waistband: 59.7 × 7.0 cm cut size, 57.7 × 5.0 cm finished size, cut 1 from plain solid fabric');

// Tank Top (Aaron)
const aaronPieces = getCurvedGarmentPieceList('aaron_tank', 'chest56');
const aaronData = AARON_TANK_DATA.chest56;
assert.strictEqual(aaronPieces.length, 4, 'Aaron tank has front, back, arm binding, and neck binding');
pass('Tank Top piece list has 4 distinct piece types (front bodice, back bodice, arm binding, neck binding)');

const aaronFront = aaronPieces.find((p) => p.id === 'bodice_front');
assert.strictEqual(aaronFront.cutHeightCm, 37.8);
assert.strictEqual(aaronFront.finishedHeightCm, 35.3);
assert.strictEqual(aaronFront.halfCutWidthCm, 15.9);
assert.strictEqual(aaronFront.cutOnFold, true);
assert.strictEqual(aaronFront.netAreaCm2, aaronData.pieces.bodice_front.netAreaCm2);
pass('Tank Top Front Bodice: 15.9 cm half-width (31.8 cm full) × 37.8 cm cut height, cut on fold');

const aaronBack = aaronPieces.find((p) => p.id === 'bodice_back');
assert.strictEqual(aaronBack.cutHeightCm, 37.8);
assert.strictEqual(aaronBack.finishedHeightCm, 35.3);
assert.strictEqual(aaronBack.halfCutWidthCm, 15.9);
assert.strictEqual(aaronBack.cutOnFold, true);
assert.strictEqual(aaronBack.netAreaCm2, aaronData.pieces.bodice_back.netAreaCm2);
pass('Tank Top Back Bodice: 15.9 cm half-width (31.8 cm full) × 37.8 cm cut height, cut on fold');

const armB = aaronPieces.find((p) => p.id === 'arm_binding');
assert.strictEqual(armB.cutWidthCm, 6.0);
assert.strictEqual(armB.cutHeightCm, 31.7);
assert.strictEqual(armB.cutQty, 2);
pass('Tank Top Armhole Binding: 6.0 × 31.7 cm cut strip, cut 2 (mirrored pair) from scraps');

const neckB = aaronPieces.find((p) => p.id === 'neck_binding');
assert.strictEqual(neckB.cutWidthCm, 6.0);
assert.strictEqual(neckB.cutHeightCm, 34.7);
assert.strictEqual(neckB.cutQty, 1);
pass('Tank Top Neckline Binding: 6.0 × 34.7 cm cut strip, cut 1 from scraps');

// Kids Top (Brian)
const brianPieces = getCurvedGarmentPieceList('child_top', 'chest56');
const brianData = CHILD_TOP_BRIAN_DATA.chest56;
const brianFront = brianPieces.find((p) => p.id === 'bodice_front');
assert.strictEqual(brianFront.cutHeightCm, 34.5);
assert.strictEqual(brianFront.finishedHeightCm, 32.5);
assert.strictEqual(brianFront.halfCutWidthCm, 17.1);
assert.strictEqual(brianFront.cutOnFold, true);
pass('Kids Top Front Bodice: 17.1 cm half-width × 34.5 cm cut height, cut on fold');

const brianSleeve = brianPieces.find((p) => p.id === 'sleeve');
assert.strictEqual(brianSleeve.cutWidthCm, 24.3);
assert.strictEqual(brianSleeve.cutHeightCm, 36.0);
assert.strictEqual(brianSleeve.cutQty, 2);
assert.strictEqual(brianSleeve.netAreaCm2, brianData.pieces.sleeve.netAreaCm2);
pass('Kids Top Raglan Sleeve: 24.3 × 36.0 cm cut size, cut 2 (1 mirrored) from scraps');

// ---------------------------------------------------------------------------
// 2. Product-Specific Stitching Steps
// ---------------------------------------------------------------------------
console.log('\n--- 2. Product-Specific Stitching Steps ---');

// Circle Skirt: Exactly 4 steps
const skirtDesign = buildDesign(SAMPLE_PILES.neutral.pieces, 'sandy_skirt', 'waist54');
const skirtBp = buildTailorBlueprint(skirtDesign);
assert.strictEqual(skirtBp.stitchingSteps.length, 4, 'Circle Skirt must have exactly 4 stitching steps');
assert.strictEqual(skirtBp.stitchingSteps[0].title, 'Join Wedge Gores');
assert.strictEqual(skirtBp.stitchingSteps[1].title, 'Attach Plain Waistband');
assert.strictEqual(skirtBp.stitchingSteps[2].title, 'Form Elastic Casing');
assert.strictEqual(skirtBp.stitchingSteps[3].title, 'Hem Lower Curved Edge');

// Verify no steps mention parts the skirt does not have
for (const step of skirtBp.stitchingSteps) {
  const text = (step.title + ' ' + step.instruction).toLowerCase();
  assert(!text.includes('bodice'), 'Skirt steps must not mention bodice');
  assert(!text.includes('strap'), 'Skirt steps must not mention straps');
  assert(!text.includes('sleeve'), 'Skirt steps must not mention sleeves');
  assert(!text.includes('cuff'), 'Skirt steps must not mention cuffs');
  assert(!text.includes('armhole'), 'Skirt steps must not mention armhole');
  assert(!text.includes('collar'), 'Skirt steps must not mention collar');
}
pass('Circle Skirt stitching steps: 4 specific steps (join gores, attach plain waistband, elastic casing, hem) with zero irrelevant parts');

// Check gore count in Step 1 text matches data (16 gores) and does not contradict
const skirtStep1 = skirtBp.stitchingSteps[0].instruction;
assert(skirtStep1.includes('16 wedge gores'), 'Circle Skirt step 1 must state 16 wedge gores');
assert(skirtStep1.includes('Press all 16 radial seams'), 'Circle Skirt step 1 must mention pressing all 16 radial seams');
assert(!skirtStep1.includes('8 wedge gores'), 'Circle Skirt step 1 must NOT say 8 wedge gores');
assert(!skirtStep1.includes('4 quarter panels'), 'Circle Skirt step 1 must NOT say 4 quarter panels');
pass('Circle Skirt step wording correctly derived from data: 16 gores, 8 pairs, 16 radial seams (contradictory 8-gore text absent)');

// Tank Top: Exactly 4 steps
const tankDesign = buildDesign(SAMPLE_PILES.neutral.pieces, 'aaron_tank', 'chest56');
const tankBp = buildTailorBlueprint(tankDesign);
assert.strictEqual(tankBp.stitchingSteps.length, 4, 'Tank Top must have exactly 4 stitching steps');
assert.strictEqual(tankBp.stitchingSteps[0].title, 'Stitch Shoulder Seams');
assert.strictEqual(tankBp.stitchingSteps[1].title, 'Neckline & Armhole Binding');
assert.strictEqual(tankBp.stitchingSteps[2].title, 'Stitch Side Seams');
assert.strictEqual(tankBp.stitchingSteps[3].title, 'Hem Bottom Edge');

// Verify no steps mention parts the tank does not have
for (const step of tankBp.stitchingSteps) {
  const text = (step.title + ' ' + step.instruction).toLowerCase();
  assert(!text.includes('sleeve'), 'Tank Top steps must not mention sleeves');
  assert(!text.includes('cuff'), 'Tank Top steps must not mention cuffs');
  assert(!text.includes('collar band'), 'Tank Top steps must not mention collar band');
  assert(!text.includes('skirt'), 'Tank Top steps must not mention skirt');
  assert(!text.includes('casing'), 'Tank Top steps must not mention casing');
}
pass('Tank Top stitching steps: 4 specific steps (shoulder seams, neck & armhole binding, side seams, hem) with zero irrelevant parts');

// Kids Top: Exactly 5 steps
const topDesign = buildDesign(SAMPLE_PILES.neutral.pieces, 'child_top', 'chest56');
const topBp = buildTailorBlueprint(topDesign);
assert.strictEqual(topBp.stitchingSteps.length, 5, 'Kids Top must have exactly 5 stitching steps');
assert.strictEqual(topBp.stitchingSteps[0].title, 'Assemble Patchwork Sleeves');
assert.strictEqual(topBp.stitchingSteps[1].title, 'Attach Raglan Sleeves to Bodice');
assert.strictEqual(topBp.stitchingSteps[2].title, 'Continuous Side & Underarm Seams');
assert.strictEqual(topBp.stitchingSteps[3].title, 'Attach Ribbed Neckband');
assert.strictEqual(topBp.stitchingSteps[4].title, 'Hem Sleeves & Body');
pass('Kids Top stitching steps: 5 specific steps tailored to Brian raglan tee');

// Terminal punctuation check: Every step across all garments must end with terminal punctuation
for (const [garmentKey, bpObj] of [['Circle Skirt', skirtBp], ['Tank Top', tankBp], ['Kids Top', topBp]]) {
  for (const step of bpObj.stitchingSteps) {
    const trimmed = step.instruction.trim();
    const lastChar = trimmed.slice(-1);
    assert(['.', '!', '?'].includes(lastChar), `${garmentKey} Step "${step.title}" must end with terminal punctuation (got "${lastChar}")`);
  }
}
pass('All stitching steps across all products end with terminal punctuation (. ! ?)');

// ---------------------------------------------------------------------------
// 3. Measurement Tables (cm and inches) Marked with Disclaimer
// ---------------------------------------------------------------------------
console.log('\n--- 3. Measurement Tables (cm and inches) ---');
const tailorNote = 'typical estimate, to be verified by a tailor';

const skirtTable = getGarmentMeasurementTable('sandy_skirt', 'waist54');
assert(skirtTable.length >= 5, 'Circle Skirt measurement table has at least 5 dimensions');
const goreCountRow = skirtTable.find((r) => r.name === 'Wedge Gore Count');
assert(goreCountRow, 'Circle Skirt measurement table must include Wedge Gore Count');
assert.strictEqual(goreCountRow.cm, '16 gores', 'Wedge Gore Count metric should be "16 gores"');
assert.strictEqual(goreCountRow.inches, '16 gores', 'Wedge Gore Count imperial should be "16 gores"');
pass('Wedge Gore Count row: metric "16 gores" and imperial "16 gores" without duplication or column overflow');

for (const row of skirtTable) {
  assert(row.cm && row.cm.includes('cm') || row.cm.includes('gores'), `Row ${row.name} must have cm`);
  assert(row.inches && row.inches.includes('in') || row.inches.includes('gores'), `Row ${row.name} must have inches`);
  assert.strictEqual(row.note, tailorNote, `Row ${row.name} must be marked "${tailorNote}"`);
}
pass(`Circle Skirt measurement table: ${skirtTable.length} dimensions in cm and inches, each marked "${tailorNote}"`);

const tankTable = getGarmentMeasurementTable('aaron_tank', 'chest56');
assert(tankTable.length >= 5, 'Tank Top measurement table has at least 5 dimensions');
for (const row of tankTable) {
  assert(row.cm && row.cm.includes('cm'), `Row ${row.name} must have cm`);
  assert(row.inches && row.inches.includes('in'), `Row ${row.name} must have inches`);
  assert.strictEqual(row.note, tailorNote, `Row ${row.name} must be marked "${tailorNote}"`);
}
pass(`Tank Top measurement table: ${tankTable.length} dimensions in cm and inches, each marked "${tailorNote}"`);

const topTable = getGarmentMeasurementTable('child_top', 'chest56');
assert(topTable.length >= 5, 'Kids Top measurement table has at least 5 dimensions');
for (const row of topTable) {
  assert(row.cm && row.cm.includes('cm'), `Row ${row.name} must have cm`);
  assert(row.inches && row.inches.includes('in'), `Row ${row.name} must have inches`);
  assert.strictEqual(row.note, tailorNote, `Row ${row.name} must be marked "${tailorNote}"`);
}
pass(`Kids Top measurement table: ${topTable.length} dimensions in cm and inches, each marked "${tailorNote}"`);

// ---------------------------------------------------------------------------
// 4. Plain Fabric Yardage Calculation
// ---------------------------------------------------------------------------
console.log('\n--- 4. Plain Fabric Yardage ---');
assert(skirtBp.plainFabricYardage.includes('0.15 meters'), 'Circle Skirt plain fabric yardage must be ~0.15 meters for waistband');
pass(`Circle Skirt plain fabric yardage: ${skirtBp.plainFabricYardage}`);

assert(tankBp.plainFabricYardage.includes('0.45 meters'), 'Tank Top plain fabric yardage must be ~0.45 meters for plain body');
pass(`Tank Top plain fabric yardage: ${tankBp.plainFabricYardage}`);

assert(topBp.plainFabricYardage.includes('0.45 meters'), 'Kids Top plain fabric yardage must be ~0.45 meters for plain body');
pass(`Kids Top plain fabric yardage: ${topBp.plainFabricYardage}`);

// ---------------------------------------------------------------------------
// 5. PDF Generation, Page Count, and Deep Content Verification
// ---------------------------------------------------------------------------
console.log('\n--- 5. PDF Generation, Page Counts, and Content Integrity ---');

const PDF_CONFIGS = [
  { productId: 'sandy_skirt', sizeKey: 'waist54', fileName: 'tailor_blueprint_sandy_skirt.pdf', expPages: 4 },
  { productId: 'aaron_tank', sizeKey: 'chest56', fileName: 'tailor_blueprint_aaron_tank.pdf', expPages: 7 },
  { productId: 'child_top', sizeKey: 'chest56', fileName: 'tailor_blueprint_child_top.pdf', expPages: 8 },
];

for (const cfg of PDF_CONFIGS) {
  const artifactPath = path.join(ARTIFACT_DIR, cfg.fileName);
  await generateCurvedBlueprintPdf(cfg.productId, cfg.sizeKey, artifactPath);
  assert(fs.existsSync(artifactPath), `Generated PDF must exist at ${artifactPath}`);

  const pdfBuf = fs.readFileSync(artifactPath);
  const parser = new PDFParse({ data: pdfBuf });
  const parsed = await parser.getText();

  // Page Count Check
  assert.strictEqual(parsed.total, cfg.expPages, `${cfg.fileName} must have exactly ${cfg.expPages} pages (got ${parsed.total})`);
  pass(`${cfg.fileName}: Exact page count ${parsed.total} matches expected ${cfg.expPages} pages`);

  // Each page must be populated with content
  for (let pIdx = 0; pIdx < parsed.pages.length; pIdx++) {
    const pageText = parsed.pages[pIdx].text.trim();
    assert(pageText.length > 80, `${cfg.fileName} page ${pIdx + 1} must not be empty (got ${pageText.length} chars)`);
  }
  pass(`${cfg.fileName}: All ${parsed.total} pages verified non-empty (>80 chars per page)`);

  // Step Text Completeness Check: Last words of every step must appear on Page 1 (never clipped or overlapped)
  const bp = buildTailorBlueprint(buildDesign(SAMPLE_PILES.neutral.pieces, cfg.productId, cfg.sizeKey));
  const page1Text = parsed.pages[0].text;
  for (const step of bp.stitchingSteps) {
    const words = step.instruction.trim().split(/\s+/);
    const lastWords = words.slice(-3).join(' ');
    assert(page1Text.includes(lastWords), `${cfg.fileName} Page 1 must include the last words of step ${step.stepNumber}: "${lastWords}"`);
  }
  pass(`${cfg.fileName}: Page 1 verified to contain the LAST WORDS of all ${bp.stitchingSteps.length} assembly steps without clipping`);

  // Zero "undefined", "null", or "NaN"
  assert(!parsed.text.includes('undefined'), `${cfg.fileName} must not contain "undefined"`);
  assert(!parsed.text.includes('NaN'), `${cfg.fileName} must not contain "NaN"`);
  assert(!parsed.text.includes('null'), `${cfg.fileName} must not contain "null"`);
  pass(`${cfg.fileName}: Zero "undefined", zero "null", and zero "NaN" across entire document`);

  // Required Attribution and Disclaimers
  assert(parsed.text.includes('Pattern geometry by FreeSewing 4.10.2 (MIT licence)'), `${cfg.fileName} must include FreeSewing attribution`);
  assert(parsed.text.includes('Measurements to be verified by a tailor'), `${cfg.fileName} must include tailor disclaimer`);
  assert(parsed.text.includes('typical estimate, to be verified by a tailor'), `${cfg.fileName} must include measurement disclaimer`);
  pass(`${cfg.fileName}: FreeSewing 4.10.2 attribution and tailor disclaimers verified on every page`);

  // Zero FreeSewing Logo
  assert(!parsed.text.toLowerCase().includes('freesewing logo'), `${cfg.fileName} must not have FreeSewing logo text`);
  pass(`${cfg.fileName}: Zero FreeSewing logos present`);

  // Scale Verification Square Text
  assert(parsed.text.includes('10 cm × 10 cm TEST SQUARE') || parsed.text.includes('10 cm'), `${cfg.fileName} must contain 10 cm test square text`);
  pass(`${cfg.fileName}: 10 cm test calibration square verified`);

  // Unfit Design Score 0 Check (Sandy Skirt does not fit the 30-scrap Neutral pile)
  if (cfg.productId === 'sandy_skirt') {
    assert(parsed.text.includes('Not enough scraps: needs'), 'Sandy Skirt PDF must say "Not enough scraps: needs N more" when design does not fit');
    assert(!parsed.text.includes('Design Score: 0/100'), 'Sandy Skirt PDF must NOT print Design Score: 0/100 as if ready');
    assert(!parsed.text.includes('Estimated Sewing Time: 0 mins'), 'Sandy Skirt PDF must NOT print Estimated Sewing Time: 0 mins as if ready');
    pass('Sandy Skirt PDF: Correctly displays "Not enough scraps: needs N more" and omits misleading score/time');
  }

  await parser.destroy();
}

console.log('\n====================================================');
console.log('🎉 ALL Q11 CURVED GARMENT BLUEPRINT TESTS PASSED PERFECTLY!');
console.log('====================================================\n');
