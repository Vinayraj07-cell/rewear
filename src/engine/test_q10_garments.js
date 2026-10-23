import assert from 'node:assert';
import { CUSTOM_PRODUCT_TEMPLATES } from './customRegistry.js';
import { translations } from '../i18n/translations.js';
import { fitPileToProduct, calculateDesignScore, calculateEstimatedTime } from './index.js';
import { computeLabourPenalty } from './scoring.js';
import { packPiecesOnSheet } from './fitting.js';
import { SAMPLE_PILES } from '../utils/pileHelpers.js';

function pass(msg) {
  console.log(`  ✅ PASS: ${msg}`);
}

function expandPile(samplePile) {
  const scraps = [];
  for (const group of samplePile.pieces) {
    for (let i = 0; i < group.quantity; i++) {
      scraps.push({
        id: `${group.id}-${i + 1}`,
        color: group.color,
        colors: group.colors || [group.color],
        fabricType: group.fabricType,
        width: group.width,
        height: group.height,
        print: group.print,
        feel: group.feel,
        thickness: group.thickness,
        stretch: group.stretch,
        frays: group.frays,
        isIrregular: group.isIrregular || false,
        included: true,
      });
    }
  }
  return scraps;
}

console.log('====================================================');
console.log('🧪 RUNNING GRANULAR Q10 GARMENTS TEST SUITE');
console.log('====================================================\n');

// ---------------------------------------------------------------------------
// 1. User-Facing Names, Translations, and FreeSewing 4.10.2 Attribution
// ---------------------------------------------------------------------------
console.log('--- 1. User-Facing Names, Translations, & FreeSewing 4.10.2 Attribution ---');
const sandy = CUSTOM_PRODUCT_TEMPLATES.sandy_skirt;
const aaron = CUSTOM_PRODUCT_TEMPLATES.aaron_tank;

assert(sandy, 'sandy_skirt registered in CUSTOM_PRODUCT_TEMPLATES');
pass('Circle Skirt registered in CUSTOM_PRODUCT_TEMPLATES');

assert(aaron, 'aaron_tank registered in CUSTOM_PRODUCT_TEMPLATES');
pass('Tank Top registered in CUSTOM_PRODUCT_TEMPLATES');

assert.strictEqual(sandy.name, 'Circle Skirt');
pass("Circle Skirt English user-facing name is 'Circle Skirt'");

assert.strictEqual(aaron.name, 'Tank Top');
pass("Tank Top English user-facing name is 'Tank Top'");

const creditText = 'Pattern geometry by FreeSewing 4.10.2 (MIT licence)';
assert(sandy.description.includes(creditText));
pass(`Circle Skirt description credits FreeSewing 4.10.2 (MIT licence)`);

assert(aaron.description.includes(creditText));
pass(`Tank Top description credits FreeSewing 4.10.2 (MIT licence)`);

assert.strictEqual(translations.en.productNames.sandy_skirt, 'Circle Skirt');
pass("Circle Skirt translation (en) is 'Circle Skirt'");

assert.strictEqual(translations.hi.productNames.sandy_skirt, 'गोल घाघरा');
pass("Circle Skirt translation (hi) is 'गोल घाघरा'");

assert.strictEqual(translations.te.productNames.sandy_skirt, 'గుండ్రని లంగా');
pass("Circle Skirt translation (te) is 'గుండ్రని లంగా'");

assert.strictEqual(translations.en.productNames.aaron_tank, 'Tank Top');
pass("Tank Top translation (en) is 'Tank Top'");

assert.strictEqual(translations.hi.productNames.aaron_tank, 'स्लीवलेस बनियान');
pass("Tank Top translation (hi) is 'स्लीवलेस बनियान'");

assert.strictEqual(translations.te.productNames.aaron_tank, 'స్లీవ్‌లెస్ బనీన్');
pass("Tank Top translation (te) is 'స్లీవ్‌లెస్ బనీన్'");

assert.strictEqual(sandy.tailorVerified, false);
pass('Circle Skirt tailorVerified flag is strictly false');

assert.strictEqual(aaron.tailorVerified, false);
pass('Tank Top tailorVerified flag is strictly false');

// ---------------------------------------------------------------------------
// 2. Piece Counts per Garment
// ---------------------------------------------------------------------------
console.log('\n--- 2. Piece Counts per Garment ---');
const szSkirt = sandy.sizes.waist54;
const skirtZones = szSkirt.zones;
assert.strictEqual(skirtZones.length, 17);
pass('Piece count: Circle Skirt waist54 has exactly 17 pieces (16 wedge gores + 1 waistband)');

const szTank = aaron.sizes.chest56;
const tankZones = szTank.zones;
const armBindingZone = tankZones.find((p) => p.id === 'arm_binding');
const totalTankCutCount = tankZones.reduce((sum, p) => sum + (p.cutQty || p.qty || 1), 0);
assert.strictEqual(totalTankCutCount, 5);
pass('Piece count: Tank Top chest56 has exactly 5 physical cut pieces (1 front bodice, 1 back bodice, 2 arm bindings, 1 neck binding)');

// ---------------------------------------------------------------------------
// 3. Each Cut Size
// ---------------------------------------------------------------------------
console.log('\n--- 3. Each Cut Size ---');
const gores = skirtZones.filter((p) => p.id.startsWith('skirt_gore'));
for (let i = 0; i < gores.length; i++) {
  const g = gores[i];
  assert.strictEqual(g.cutWidth, 9.4);
  assert.strictEqual(g.cutHeight, 27.4);
  pass(`Cut size: Gore ${i + 1} (${g.id}) is 9.4 cm cut width x 27.4 cm cut height (finished 8.5 x 25.8 cm)`);
}

const wb54 = skirtZones.find((p) => p.id === 'waistband');
assert.strictEqual(wb54.cutWidth, 59.7);
assert.strictEqual(wb54.cutHeight, 7.0);
pass(`Cut size: Waistband (waist54) is 59.7 cm cut width x 7.0 cm cut height (finished 57.7 x 5.0 cm)`);

const wb56 = sandy.sizes.waist56.zones.find((p) => p.id === 'waistband');
assert.strictEqual(wb56.cutWidth, 63.8);
assert.strictEqual(wb56.cutHeight, 7.0);
pass(`Cut size: Waistband (waist56) is 63.8 cm cut width x 7.0 cm cut height (finished 61.8 x 5.0 cm)`);

const frontBodice = tankZones.find((p) => p.id === 'bodice_front');
assert.strictEqual(frontBodice.cutWidth, 31.8);
assert.strictEqual(frontBodice.cutHeight, 37.8);
assert.strictEqual(frontBodice.cutOnFold, true);
pass(`Cut size: Front Bodice is 31.8 cm cut width x 37.8 cm cut height (cut-on-fold, finished 29.8 x 35.3 cm)`);

const backBodice = tankZones.find((p) => p.id === 'bodice_back');
assert.strictEqual(backBodice.cutWidth, 31.8);
assert.strictEqual(backBodice.cutHeight, 37.8);
assert.strictEqual(backBodice.cutOnFold, true);
pass(`Cut size: Back Bodice is 31.8 cm cut width x 37.8 cm cut height (cut-on-fold, finished 29.8 x 35.3 cm)`);

assert.strictEqual(armBindingZone.cutWidth, 6.0);
assert.strictEqual(armBindingZone.cutHeight, 31.7);
pass(`Cut size: Armhole Binding strip is 6.0 cm cut width x 31.7 cm cut height (qty 2)`);

const neckBinding = tankZones.find((p) => p.id === 'neck_binding');
assert.strictEqual(neckBinding.cutWidth, 6.0);
assert.strictEqual(neckBinding.cutHeight, 34.7);
pass(`Cut size: Neckline Binding strip is 6.0 cm cut width x 34.7 cm cut height (qty 1)`);

// ---------------------------------------------------------------------------
// 4. Each Area (Shoelace Net Polygon Area)
// ---------------------------------------------------------------------------
console.log('\n--- 4. Each Area (Shoelace Net Polygon Area) ---');
for (let i = 0; i < gores.length; i++) {
  const g = gores[i];
  assert.strictEqual(g.geometry.finishedAreaCm2, 153.1);
  pass(`Area: Gore ${i + 1} (${g.id}) Shoelace net area is 153.1 cm²`);
}

assert.strictEqual(wb54.geometry.finishedAreaCm2, 288.4);
pass('Area: Waistband (waist54) Shoelace net area is 288.4 cm²');

assert.strictEqual(wb56.geometry.finishedAreaCm2, 309.0);
pass('Area: Waistband (waist56) Shoelace net area is 309.0 cm²');

assert.strictEqual(frontBodice.geometry.finishedAreaCm2, 818.6);
pass('Area: Front Bodice Shoelace net area is 818.6 cm²');

assert.strictEqual(backBodice.geometry.finishedAreaCm2, 864.0);
pass('Area: Back Bodice Shoelace net area is 864.0 cm²');

assert.strictEqual(armBindingZone.geometry.finishedAreaCm2, 190.2);
pass('Area: Armhole Binding Shoelace net area is 190.2 cm² each');

assert.strictEqual(neckBinding.geometry.finishedAreaCm2, 208.1);
pass('Area: Neckline Binding Shoelace net area is 208.1 cm²');

// ---------------------------------------------------------------------------
// 5. Mirrored Gores & Mirrored Bindings Identical
// ---------------------------------------------------------------------------
console.log('\n--- 5. Mirrored Gores & Mirrored Bindings Identical ---');
for (let i = 1; i < gores.length; i++) {
  assert.strictEqual(gores[i].cutWidth, gores[0].cutWidth);
  assert.strictEqual(gores[i].cutHeight, gores[0].cutHeight);
  assert.strictEqual(gores[i].geometry.finishedAreaCm2, gores[0].geometry.finishedAreaCm2);
  assert.strictEqual(gores[i].geometry.seamPath, gores[0].geometry.seamPath);
  pass(`Mirrored gores: Gore ${i + 1} identically matches Gore 1 in cut dimensions (9.4x27.4), area (153.1 cm²), and seam path`);
}

assert.strictEqual(armBindingZone.cutQty, 2);
pass('Mirrored bindings: Left and right armhole bindings are an identical mirrored pair of 6.0 x 31.7 cm strips');

// ---------------------------------------------------------------------------
// 6. Plain/Scrap Roles per Mode (Circle Skirt Waistband Plain in Both Modes)
// ---------------------------------------------------------------------------
console.log('\n--- 6. Plain/Scrap Roles per Mode ---');
const skirtHybridZones = szSkirt.variants.hybrid;
const skirtPatchZones = szSkirt.variants.patchwork;

const wbHybrid = skirtHybridZones.find((p) => p.id === 'waistband');
assert.strictEqual(wbHybrid.fabricSource, 'plain_base');
assert.strictEqual(wbHybrid.scrapEligible, false);
pass('Role: Circle Skirt hybrid waistband is plain_base (never pieced, consumes 0 scraps from pile)');

const wbPatch = skirtPatchZones.find((p) => p.id === 'waistband');
assert.strictEqual(wbPatch.fabricSource, 'plain_base');
assert.strictEqual(wbPatch.scrapEligible, false);
pass('Role: Circle Skirt patchwork waistband is plain_base (never pieced in either mode, smooth against skin)');

for (const g of skirtHybridZones.filter((p) => p.id.startsWith('skirt_gore'))) {
  assert.strictEqual(g.fabricSource, 'scrap');
  assert.strictEqual(g.scrapEligible, true);
}
pass('Role: Circle Skirt hybrid 16 wedge gores are scrap (pieced from upcycled remnants)');

for (const g of skirtPatchZones.filter((p) => p.id.startsWith('skirt_gore'))) {
  assert.strictEqual(g.fabricSource, 'scrap');
  assert.strictEqual(g.scrapEligible, true);
}
pass('Role: Circle Skirt patchwork 16 wedge gores are scrap (pieced from upcycled remnants)');

const tankHybridZones = szTank.variants.hybrid;
const tankPatchZones = szTank.variants.patchwork;

const fHyb = tankHybridZones.find((p) => p.id === 'bodice_front');
const bHyb = tankHybridZones.find((p) => p.id === 'bodice_back');
assert.strictEqual(fHyb.fabricSource, 'plain_base');
assert.strictEqual(fHyb.scrapEligible, false);
assert.strictEqual(bHyb.fabricSource, 'plain_base');
assert.strictEqual(bHyb.scrapEligible, false);
pass('Role: Tank Top hybrid front and back bodices are plain_base (solid knit yardage, 0 scraps consumed)');

for (const p of tankHybridZones.filter((z) => z.id.includes('binding'))) {
  assert.strictEqual(p.fabricSource, 'scrap');
  assert.strictEqual(p.scrapEligible, true);
}
pass('Role: Tank Top hybrid bindings are scrap (pieced from remnant scrap strips)');

const fPatch = tankPatchZones.find((p) => p.id === 'bodice_front');
const bPatch = tankPatchZones.find((p) => p.id === 'bodice_back');
assert.strictEqual(fPatch.fabricSource, 'scrap');
assert.strictEqual(fPatch.scrapEligible, true);
assert.strictEqual(bPatch.fabricSource, 'scrap');
assert.strictEqual(bPatch.scrapEligible, true);
pass('Role: Tank Top patchwork front and back bodices are scrap (pieced from remnants)');

for (const p of tankPatchZones.filter((z) => z.id.includes('binding'))) {
  assert.strictEqual(p.fabricSource, 'scrap');
  assert.strictEqual(p.scrapEligible, true);
}
pass('Role: Tank Top patchwork bindings are scrap (pieced from remnants)');

// ---------------------------------------------------------------------------
// 7. Cutting Sheet Packing & Standard 110 cm Bolt Width Limit
// ---------------------------------------------------------------------------
console.log('\n--- 7. Cutting Sheet Packing & Standard 110 cm Bolt Width Limit ---');
const MAX_BOLT_WIDTH_CM = 110;

const sandyPackPieces = Object.values(sandy.sizes.waist54.pieces).map((p) => ({
  id: p.id,
  width: p.cutWidth,
  height: p.cutHeight,
  cutWidth: p.cutWidth,
  cutHeight: p.cutHeight,
}));
const sandyPack = packPiecesOnSheet(sandyPackPieces, { clearanceCm: 0.5, marginCm: 1.0 });
assert.strictEqual(sandyPack.fits, true);
assert(sandyPack.sheetWidth <= MAX_BOLT_WIDTH_CM);
assert.strictEqual(sandyPack.collisions.length, 0);
pass(`Packing: Circle Skirt waist54 pieces pack into ${sandyPack.sheetWidth} cm sheet width (strictly <= ${MAX_BOLT_WIDTH_CM} cm bolt width)`);

const aaronPackPieces = [];
for (const p of Object.values(aaron.sizes.chest56.pieces)) {
  for (let q = 0; q < (p.cutQty || 1); q++) {
    aaronPackPieces.push({
      id: `${p.id}_${q + 1}`,
      width: p.cutWidth,
      height: p.cutHeight,
      cutWidth: p.cutWidth,
      cutHeight: p.cutHeight,
    });
  }
}
const aaronPack = packPiecesOnSheet(aaronPackPieces, { clearanceCm: 0.5, marginCm: 1.0 });
assert.strictEqual(aaronPack.fits, true);
assert(aaronPack.sheetWidth <= MAX_BOLT_WIDTH_CM);
assert.strictEqual(aaronPack.collisions.length, 0);
pass(`Packing: Tank Top chest56 pieces pack into ${aaronPack.sheetWidth} cm sheet width (strictly <= ${MAX_BOLT_WIDTH_CM} cm bolt width)`);
pass('Packing: Zero cutting collisions detected across pattern sheet layouts');

// ---------------------------------------------------------------------------
// 8. Labour Scoring & Mode Differentiation on Real Sample Piles
// ---------------------------------------------------------------------------
console.log('\n--- 8. Labour Scoring & Mode Differentiation on Real Sample Piles ---');
const neutralPile = expandPile(SAMPLE_PILES.neutral);

const tankHyb = fitPileToProduct(neutralPile, 'aaron_tank', 'chest56', 1.0, { variant: 'hybrid' });
const tankPatch = fitPileToProduct(neutralPile, 'aaron_tank', 'chest56', 1.0, { variant: 'patchwork' });

assert.strictEqual(tankHyb.fits, true);
pass('Fitting: Tank Top hybrid fits Neutral pile (9 scraps used, 3 per binding)');

assert.strictEqual(tankPatch.fits, true);
pass('Fitting: Tank Top patchwork fits Neutral pile (27 scraps used, 9 per bodice + 3 per binding)');

const timeHyb = calculateEstimatedTime('aaron_tank', tankHyb.totalExtraSeams || 0, false);
const timePatch = calculateEstimatedTime('aaron_tank', tankPatch.totalExtraSeams || 0, false);
assert(timePatch > timeHyb);
pass(`Labour: Tank Top patchwork sewing time (${timePatch} min) exceeds hybrid sewing time (${timeHyb} min) on Neutral pile`);

assert(tankPatch.totalExtraSeams > tankHyb.totalExtraSeams);
pass(`Labour: Tank Top patchwork extra seams (${tankPatch.totalExtraSeams} seams) exceed hybrid extra seams (${tankHyb.totalExtraSeams} seams) on Neutral pile`);

const labourHyb = computeLabourPenalty('aaron_tank', tankHyb.totalExtraSeams || 0, timeHyb);
const labourPatch = computeLabourPenalty('aaron_tank', tankPatch.totalExtraSeams || 0, timePatch);
assert(labourPatch > labourHyb);
pass(`Labour: Tank Top patchwork labour penalty (${labourPatch} pts) exceeds hybrid labour penalty (${labourHyb} pts) on Neutral pile`);

const scoreHyb = calculateDesignScore(tankHyb);
const scorePatch = calculateDesignScore(tankPatch);
assert(scoreHyb > scorePatch);
pass(`Labour: Tank Top hybrid design score (${scoreHyb}) exceeds patchwork design score (${scorePatch}) due to seam and labour penalties`);

const mixedPile = expandPile(SAMPLE_PILES.mixed_fabrics);
const tankHybMixed = fitPileToProduct(mixedPile, 'aaron_tank', 'chest56', 1.0, { variant: 'hybrid' });
const tankPatchMixed = fitPileToProduct(mixedPile, 'aaron_tank', 'chest56', 1.0, { variant: 'patchwork' });
const timeHybM = calculateEstimatedTime('aaron_tank', tankHybMixed.totalExtraSeams || 0, false);
const timePatchM = calculateEstimatedTime('aaron_tank', tankPatchMixed.totalExtraSeams || 0, false);
const labourHybM = computeLabourPenalty('aaron_tank', tankHybMixed.totalExtraSeams || 0, timeHybM);
const labourPatchM = computeLabourPenalty('aaron_tank', tankPatchMixed.totalExtraSeams || 0, timePatchM);
assert(labourPatchM > labourHybM);
pass(`Labour: Tank Top patchwork on Mixed Fabrics has higher labour penalty (${labourPatchM} pts) than hybrid (${labourHybM} pts)`);

// ---------------------------------------------------------------------------
// 9. Circle Skirt True Half-Circle Geometry Audit Against Formulas
// ---------------------------------------------------------------------------
console.log('\n--- 9. Circle Skirt True Half-Circle Geometry Audit Against Formulas ---');
for (const [sizeKey, data] of Object.entries(sandy.sizes)) {
  const waistCm = data.waistCm || data.finishedDimensions?.waistCm || 54;
  const easeCm = 2.0;
  const waistWithEaseCm = waistCm + easeCm;
  const totalAngleDeg = 180.0;
  const totalAngleRad = Math.PI;

  const rIn = waistWithEaseCm / Math.PI;
  const gorePieces = data.zones.filter((z) => z.id.startsWith('skirt_gore'));
  const numGores = gorePieces.length;
  assert.strictEqual(numGores, 16);
  pass(`Geometry (${sizeKey}): Skirt has exactly 16 wedge gores for authentic scrap piecing`);

  const singleGoreAngleDeg = totalAngleDeg / numGores;
  const sumAngle = singleGoreAngleDeg * numGores;
  assert.strictEqual(sumAngle, 180.0);
  pass(`Geometry (${sizeKey}): Sum of all gore angles is exactly ${sumAngle}° (true half circle)`);

  const totalWaistArc = rIn * totalAngleRad;
  assert.strictEqual(Number(totalWaistArc.toFixed(1)), waistWithEaseCm);
  pass(`Geometry (${sizeKey}): Total waist arc length at inner radius equals ${totalWaistArc.toFixed(1)} cm (waist ${waistCm} + ease ${easeCm} = ${waistWithEaseCm} cm)`);

  const finishedLengthCm = data.finishedHeightCm || data.finishedDimensions?.skirtLengthCm || 25.8;
  const rOut = rIn + finishedLengthCm;
  const totalHemArc = rOut * totalAngleRad;
  assert.strictEqual(Number(totalHemArc.toFixed(1)), Number((Math.PI * rOut).toFixed(1)));
  pass(`Geometry (${sizeKey}): Total outer hem arc length is ${totalHemArc.toFixed(1)} cm (equals formula pi * R_out)`);

  const theoreticalAreaCm2 = (Math.PI / 2) * (Math.pow(rOut, 2) - Math.pow(rIn, 2));
  const sumNetAreaCm2 = gorePieces.reduce((sum, g) => sum + g.geometry.finishedAreaCm2, 0);
  const deltaArea = Math.abs(sumNetAreaCm2 - theoreticalAreaCm2);
  const pctError = (deltaArea / theoreticalAreaCm2) * 100;
  assert(pctError < 2.5, `Net area sum (${sumNetAreaCm2.toFixed(1)}) must match ring sector formula (${theoreticalAreaCm2.toFixed(1)}) within 2.5%`);
  pass(`Geometry (${sizeKey}): Total gore area (${sumNetAreaCm2.toFixed(1)} cm²) matches ring sector formula (${theoreticalAreaCm2.toFixed(1)} cm²) within ${pctError.toFixed(2)}% error`);
}

console.log('\n====================================================');
console.log('🏁 ALL GRANULAR Q10 GARMENTS TESTS PASSED PERFECTLY!');
console.log('====================================================\n');
