#!/usr/bin/env node
/**
 * Product Pipeline Part 2: Factory Script & Product Lifecycle Test Suite
 * 
 * Verifies:
 * (a) Temporary rectangle config round trip:
 *     - Run new-product
 *     - validateProductSpec passes
 *     - Generic flat preview renders with NO undefined values
 *     - Generic blueprint renders with NO undefined values and real estimatedMinutes
 *     - Run remove-product
 *     - customRegistry.js and customTranslations.js are bitwise identical to before
 * (b) Pinned pattern-library config round trip (design: brian, version: 4.10.2):
 *     - Run new-product
 *     - validateProductSpec passes
 *     - Preview and blueprint render with NO undefined values
 *     - Run remove-product
 *     - customRegistry.js and customTranslations.js are bitwise identical to before
 * (c) Broken configs rejected with zero disk modifications:
 *     - Missing translations (hi/te) is rejected and nothing is written
 *     - Cut size smaller than finished size is rejected and nothing is written
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { validateProductSpec } from './productValidator.js';
import { translations } from '../i18n/translations.js';
import { computeProduct2DLayout } from '../utils/product2DLayout.js';
import { buildTailorBlueprint } from '../utils/tailorBlueprintData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

/**
 * Deep scanner to detect any undefined values, NaN numbers, or strings containing "undefined".
 */
function findUndefinedValues(val, currentPath = '') {
  const problems = [];
  if (val === undefined) {
    problems.push(`${currentPath}: is undefined`);
    return problems;
  }
  if (typeof val === 'number' && isNaN(val)) {
    problems.push(`${currentPath}: is NaN`);
    return problems;
  }
  if (typeof val === 'string' && val.includes('undefined')) {
    problems.push(`${currentPath}: contains "undefined" -> "${val}"`);
  }
  if (val && typeof val === 'object') {
    if (Array.isArray(val)) {
      val.forEach((item, idx) => {
        problems.push(...findUndefinedValues(item, `${currentPath}[${idx}]`));
      });
    } else {
      for (const [key, propVal] of Object.entries(val)) {
        if (propVal === undefined) {
          problems.push(`${currentPath}.${key}: is undefined`);
        } else {
          problems.push(...findUndefinedValues(propVal, `${currentPath}.${key}`));
        }
      }
    }
  }
  return problems;
}

const customRegistryPath = path.resolve(ROOT_DIR, 'src/engine/customRegistry.js');
const customTranslationsPath = path.resolve(ROOT_DIR, 'src/i18n/customTranslations.js');

function safeUnlink(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (let i = 0; i < 6; i++) {
    try {
      fs.unlinkSync(filePath);
      return;
    } catch (e) {
      if ((e.code === 'EBUSY' || e.code === 'EPERM') && i < 5) {
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 60);
      } else {
        try {
          fs.rmSync(filePath, { force: true });
          return;
        } catch (_) {}
      }
    }
  }
}

async function syncTranslations() {
  const transModule = await import(`../i18n/customTranslations.js?t=${Date.now()}`);
  for (const lang of ['en', 'hi', 'te']) {
    if (translations[lang] && transModule.CUSTOM_TRANSLATIONS?.[lang]) {
      Object.assign(translations[lang].productNames, transModule.CUSTOM_TRANSLATIONS[lang].productNames);
      Object.assign(translations[lang].sizeNames, transModule.CUSTOM_TRANSLATIONS[lang].sizeNames);
      Object.assign(translations[lang].zoneNames, transModule.CUSTOM_TRANSLATIONS[lang].zoneNames);
    }
  }
}

function desyncTranslations(productId, spec) {
  for (const lang of ['en', 'hi', 'te']) {
    if (translations[lang]?.productNames) {
      delete translations[lang].productNames[productId];
    }
    if (spec?.sizes && translations[lang]?.sizeNames) {
      for (const sKey of Object.keys(spec.sizes)) {
        delete translations[lang].sizeNames[sKey];
      }
    }
    if (spec?.sizes && translations[lang]?.zoneNames) {
      for (const sVal of Object.values(spec.sizes)) {
        const pieces = sVal.zones || [];
        for (const p of pieces) {
          delete translations[lang].zoneNames[p.id];
          delete translations[lang].zoneNames[p.id.replace(/_\d+$/, '')];
        }
      }
    }
  }
}

console.log('====================================================');
console.log('🧪 RUNNING PRODUCT FACTORY & LIFECYCLE TEST SUITE');
console.log('====================================================\n');

// Capture baseline file contents
const initialRegistry = fs.readFileSync(customRegistryPath, 'utf-8');
const initialTranslations = fs.readFileSync(customTranslationsPath, 'utf-8');

// ---------------------------------------------------------------------------
// (a) Temporary Rectangle Config Round Trip
// ---------------------------------------------------------------------------
console.log('--- (a) Temporary Rectangle Config Round Trip ---');

const tempRectConfigPath = path.resolve(ROOT_DIR, 'products/temp_test_rectangle.json');
const tempRectConfig = {
  id: 'temp_test_rectangle',
  names: {
    en: 'Test Placemat',
    hi: 'परीक्षण प्लेसमैट',
    te: 'పరీక్ష ప్లేస్‌మ్యాట్',
  },
  category: 'home',
  construction: 'flat',
  sizes: {
    standard: {
      names: {
        en: 'Standard',
        hi: 'मानक',
        te: 'ప్రామాణికం',
      },
      finishedDimensions: {
        widthCm: 40,
        heightCm: 30,
      },
      pieces: [
        {
          id: 'mat_body',
          names: {
            en: 'Mat Body',
            hi: 'मैट बॉडी',
            te: 'మ్యాట్ బాడీ',
          },
          role: 'base',
          width: 40,
          height: 30,
          cutWidth: 42,
          cutHeight: 32,
          qty: 1,
          fabricSource: 'scrap',
        },
      ],
    },
  },
  materials: [
    {
      name: 'Cotton Bias Tape',
      qty: '1 pack',
      note: 'Pre-folded edging',
    },
  ],
};

let rectSpec = null;
try {
  fs.writeFileSync(tempRectConfigPath, JSON.stringify(tempRectConfig, null, 2), 'utf-8');

  // 1. Run new-product script
  execSync(`node src/engine/factory/newProduct.js --config products/temp_test_rectangle.json`, {
    cwd: ROOT_DIR,
    stdio: 'pipe',
  });

  // 2. Validate spec using validateProductSpec
  await syncTranslations();
  const regModule = await import(`./customRegistry.js?t=${Date.now()}`);
  rectSpec = regModule.CUSTOM_PRODUCT_TEMPLATES.temp_test_rectangle;
  assert(Boolean(rectSpec), 'newProduct registered "temp_test_rectangle" into CUSTOM_PRODUCT_TEMPLATES');

  const validationResult = validateProductSpec(rectSpec);
  assert(validationResult.valid, 'validateProductSpec passes for newly registered rectangle spec');
  assert(rectSpec.tailorVerified === false, 'Newly registered spec has tailorVerified: false');

  // 3. Generic flat preview layout
  const rectDesign = {
    productId: 'temp_test_rectangle',
    productName: 'Test Placemat',
    sizeKey: 'standard',
    sizeLabel: 'Standard',
    spec: rectSpec,
    placements: [
      {
        zoneId: 'mat_body',
        cutWidth: 42,
        cutHeight: 32,
        finishedWidth: 40,
        finishedHeight: 30,
        role: 'base',
        scraps: [
          { id: 's1', width: 21, height: 32, color: 'navy', colorHex: '#1E3A8A' },
          { id: 's2', width: 21, height: 32, color: 'beige', colorHex: '#D6C0A4' },
        ],
      },
    ],
  };

  const rectLayout = computeProduct2DLayout(rectDesign, 'front');
  assert(rectLayout && !rectLayout.error, 'computeProduct2DLayout renders generic flat layout');
  assert(rectLayout.isGenericLayout === true, 'generic flat layout flagged with isGenericLayout: true');
  assert(rectLayout.panels.length === 1, 'Generic preview contains 1 placed panel');

  const rectLayoutUndefs = findUndefinedValues(rectLayout, 'rectLayout');
  assert(rectLayoutUndefs.length === 0, `Generic flat preview has NO undefined values (found: ${rectLayoutUndefs.length})`);

  // 4. Generic blueprint
  const rectBlueprint = buildTailorBlueprint(rectDesign);
  assert(rectBlueprint && !rectBlueprint.error, 'buildTailorBlueprint generates blueprint for generic flat product');
  assert(rectBlueprint.stitchingSteps.length === 6, 'Generic flat blueprint provides 6 construction steps');
  assert(
    rectBlueprint.stitchingSteps.every((s) => typeof s.estimatedMinutes === 'number' && !isNaN(s.estimatedMinutes) && s.estimatedMinutes > 0),
    'Every generic flat blueprint step has a real positive estimatedMinutes number'
  );

  const rectBlueprintUndefs = findUndefinedValues(rectBlueprint, 'rectBlueprint');
  assert(rectBlueprintUndefs.length === 0, `Generic blueprint has NO undefined values or substrings (found: ${rectBlueprintUndefs.length})`);

  // 5. Run remove-product
  execSync(`node src/engine/factory/removeProduct.js temp_test_rectangle`, {
    cwd: ROOT_DIR,
    stdio: 'pipe',
  });
  desyncTranslations('temp_test_rectangle', rectSpec);

  // 6. Prove customRegistry.js and customTranslations.js are bitwise identical to before
  const afterRectRegistry = fs.readFileSync(customRegistryPath, 'utf-8');
  const afterRectTranslations = fs.readFileSync(customTranslationsPath, 'utf-8');

  assert(afterRectRegistry === initialRegistry, 'customRegistry.js is bitwise identical to before rectangle registration');
  assert(afterRectTranslations === initialTranslations, 'customTranslations.js is bitwise identical to before rectangle registration');
} finally {
  safeUnlink(tempRectConfigPath);
}

// ---------------------------------------------------------------------------
// (b) Pattern-Library Brian Config Round Trip
// ---------------------------------------------------------------------------
console.log('\n--- (b) Pattern-Library Brian Config Round Trip ---');

const tempBrianConfigPath = path.resolve(ROOT_DIR, 'products/temp_test_brian.json');
const tempBrianConfig = {
  id: 'temp_test_brian',
  names: {
    en: 'Test Brian Raglan Top',
    hi: 'टेस्ट ब्रायन टॉप',
    te: 'టెస్ట్ బ్రియాన్ టాప్',
  },
  category: 'garments',
  construction: 'tee',
  patternLibrary: {
    design: 'brian',
    version: '4.10.2',
  },
  sizes: {
    chest56: {
      names: {
        en: 'Chest 56cm',
        hi: 'छाती 56 सेमी',
        te: 'ఛాతీ 56 సెం.మీ',
      },
    },
  },
  materials: [
    {
      name: 'Ribbed Neckband',
      qty: '0.15 m',
    },
  ],
};

let brianSpec = null;
try {
  fs.writeFileSync(tempBrianConfigPath, JSON.stringify(tempBrianConfig, null, 2), 'utf-8');

  // 1. Run new-product script
  execSync(`node src/engine/factory/newProduct.js --config products/temp_test_brian.json`, {
    cwd: ROOT_DIR,
    stdio: 'pipe',
  });

  // 2. Validate spec using validateProductSpec
  await syncTranslations();
  const regModule = await import(`./customRegistry.js?t=${Date.now()}`);
  brianSpec = regModule.CUSTOM_PRODUCT_TEMPLATES.temp_test_brian;
  assert(Boolean(brianSpec), 'newProduct registered "temp_test_brian" into CUSTOM_PRODUCT_TEMPLATES');

  const brianValidation = validateProductSpec(brianSpec);
  assert(brianValidation.valid, 'validateProductSpec passes for Brian CAD pattern-library spec');
  assert(brianSpec.sizes?.chest56?.variants?.hybrid !== undefined, 'Brian spec automatically compiles hybrid variant');
  assert(brianSpec.sizes?.chest56?.variants?.patchwork !== undefined, 'Brian spec automatically compiles patchwork variant');

  // Verify CAD provenance
  const frontBodice = brianSpec.sizes.chest56.zones.find((p) => p.id === 'bodice_front');
  assert(
    frontBodice?.provenance?.patternLibrary === 'FreeSewing' && frontBodice?.provenance?.design?.toLowerCase() === 'brian',
    'Brian CAD pieces retain pinned FreeSewing CAD provenance'
  );

  // 3. Generic preview layout
  const brianDesign = {
    productId: 'temp_test_brian',
    productName: 'Test Brian Raglan Top',
    sizeKey: 'chest56',
    sizeLabel: 'Chest 56cm',
    spec: brianSpec,
    placements: [
      {
        zoneId: 'bodice_front',
        cutWidth: 34.2,
        cutHeight: 34.5,
        finishedWidth: 32.2,
        finishedHeight: 32.5,
        role: 'base',
        scraps: [{ id: 's1', width: 34.2, height: 34.5, color: 'cream', colorHex: '#FEF3C7' }],
      },
      {
        zoneId: 'sleeve',
        cutWidth: 24.3,
        cutHeight: 36.0,
        finishedWidth: 22,
        finishedHeight: 34,
        role: 'supporting',
        scraps: [{ id: 's2', width: 24.3, height: 36.0, color: 'navy', colorHex: '#1E3A8A' }],
      },
    ],
  };

  const brianLayout = computeProduct2DLayout(brianDesign, 'front');
  assert(brianLayout && !brianLayout.error, 'computeProduct2DLayout renders layout for Brian product');
  assert(brianLayout.panels.length > 0, `Brian layout contains panels (count: ${brianLayout.panels.length})`);

  const brianLayoutUndefs = findUndefinedValues(brianLayout, 'brianLayout');
  assert(brianLayoutUndefs.length === 0, `Brian layout has NO undefined values (found: ${brianLayoutUndefs.length})`);

  // 4. Generic blueprint
  const brianBlueprint = buildTailorBlueprint(brianDesign);
  assert(brianBlueprint && !brianBlueprint.error, 'buildTailorBlueprint generates blueprint for Brian product');
  assert(brianBlueprint.stitchingSteps.length === 6, 'Brian tee blueprint provides 6 construction steps');
  assert(
    brianBlueprint.stitchingSteps.every((s) => typeof s.estimatedMinutes === 'number' && !isNaN(s.estimatedMinutes) && s.estimatedMinutes > 0),
    'Every Brian tee blueprint step has a real positive estimatedMinutes number'
  );

  const brianBlueprintUndefs = findUndefinedValues(brianBlueprint, 'brianBlueprint');
  assert(brianBlueprintUndefs.length === 0, `Brian blueprint has NO undefined values or substrings (found: ${brianBlueprintUndefs.length})`);

  // 5. Run remove-product
  execSync(`node src/engine/factory/removeProduct.js temp_test_brian`, {
    cwd: ROOT_DIR,
    stdio: 'pipe',
  });
  desyncTranslations('temp_test_brian', brianSpec);

  // 6. Prove customRegistry.js and customTranslations.js are bitwise identical to before
  const afterBrianRegistry = fs.readFileSync(customRegistryPath, 'utf-8');
  const afterBrianTranslations = fs.readFileSync(customTranslationsPath, 'utf-8');

  assert(afterBrianRegistry === initialRegistry, 'customRegistry.js is bitwise identical to before Brian registration');
  assert(afterBrianTranslations === initialTranslations, 'customTranslations.js is bitwise identical to before Brian registration');
} finally {
  safeUnlink(tempBrianConfigPath);
}

// ---------------------------------------------------------------------------
// (c) Broken Configs Rejected with Zero Disk Writes
// ---------------------------------------------------------------------------
console.log('\n--- (c) Broken Configs Rejected with Zero Disk Writes ---');

// Test Case 1: Missing translations (only English provided)
const brokenTransPath = path.resolve(ROOT_DIR, 'products/broken_trans_test.json');
const brokenTransConfig = {
  id: 'broken_trans_product',
  names: {
    en: 'Broken Placemat',
  },
  category: 'home',
  construction: 'flat',
  sizes: {
    standard: {
      names: { en: 'Standard' },
      finishedDimensions: { widthCm: 30, heightCm: 30 },
      pieces: [
        {
          id: 'mat_body',
          names: { en: 'Mat Body' },
          role: 'base',
          width: 30,
          height: 30,
          cutWidth: 32,
          cutHeight: 32,
        },
      ],
    },
  },
};

try {
  fs.writeFileSync(brokenTransPath, JSON.stringify(brokenTransConfig, null, 2), 'utf-8');
  let threwTrans = false;
  try {
    execSync(`node src/engine/factory/newProduct.js --config products/broken_trans_test.json`, {
      cwd: ROOT_DIR,
      stdio: 'pipe',
    });
  } catch (err) {
    threwTrans = true;
  }

  assert(threwTrans, 'newProduct rejects config with missing Hindi/Telugu translations');

  const regAfterTrans = fs.readFileSync(customRegistryPath, 'utf-8');
  const transAfterTrans = fs.readFileSync(customTranslationsPath, 'utf-8');
  assert(regAfterTrans === initialRegistry, 'customRegistry.js is completely untouched after rejected translation spec');
  assert(transAfterTrans === initialTranslations, 'customTranslations.js is completely untouched after rejected translation spec');
} finally {
  safeUnlink(brokenTransPath);
}

// Test Case 2: Cut smaller than finished (cutWidth: 25 < width: 30)
const brokenCutPath = path.resolve(ROOT_DIR, 'products/broken_cut_test.json');
const brokenCutConfig = {
  id: 'broken_cut_product',
  names: {
    en: 'Broken Cut Mat',
    hi: 'टूटा हुआ मैट',
    te: 'విరిగిన మ్యాట్',
  },
  category: 'home',
  construction: 'flat',
  sizes: {
    standard: {
      names: { en: 'Standard', hi: 'मानक', te: 'ప్రామాణికం' },
      finishedDimensions: { widthCm: 30, heightCm: 30 },
      pieces: [
        {
          id: 'mat_body',
          names: { en: 'Mat Body', hi: 'मैट बॉडी', te: 'మ్యాట్ బాడీ' },
          role: 'base',
          width: 30,
          height: 30,
          cutWidth: 25, // Strictly smaller than finished width (30)!
          cutHeight: 32,
        },
      ],
    },
  },
};

try {
  fs.writeFileSync(brokenCutPath, JSON.stringify(brokenCutConfig, null, 2), 'utf-8');
  let threwCut = false;
  try {
    execSync(`node src/engine/factory/newProduct.js --config products/broken_cut_test.json`, {
      cwd: ROOT_DIR,
      stdio: 'pipe',
    });
  } catch (err) {
    threwCut = true;
  }

  assert(threwCut, 'newProduct rejects config where cut width is smaller than finished width');

  const regAfterCut = fs.readFileSync(customRegistryPath, 'utf-8');
  const transAfterCut = fs.readFileSync(customTranslationsPath, 'utf-8');
  assert(regAfterCut === initialRegistry, 'customRegistry.js is completely untouched after rejected cut size spec');
  assert(transAfterCut === initialTranslations, 'customTranslations.js is completely untouched after rejected cut size spec');
} finally {
  safeUnlink(brokenCutPath);
}

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------
console.log('\n====================================================');
console.log(`🏁 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('====================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL PRODUCT FACTORY & LIFECYCLE TESTS PASSED PERFECTLY!\n');
  process.exit(0);
}
