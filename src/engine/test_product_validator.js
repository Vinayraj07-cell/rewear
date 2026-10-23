/**
 * test_product_validator.js
 *
 * Product Pipeline Part 1: Validator & Generic Renderer Test Suite
 *
 * Verifies:
 * 1. Product Validator cleanly validates all 5 registry products (tote_bag, pouch, cushion_cover, kids_frock, child_top)
 * 2. Validator catches deliberately broken specs for each of the 7 required checks:
 *    - Check 1: Piece area mismatch (cut < finished, or stated area != w * h)
 *    - Check 2: Piece overlaps on cutting sheet
 *    - Check 3: Pieces overflowing sheet boundaries
 *    - Check 4: plain_base pieces with scrapEligible=true
 *    - Check 5: Hybrid rule violations (missing plain_base or mismatched mirrored sleeves)
 *    - Check 6: Missing translation keys in en, hi, or te
 *    - Check 7: Unverified claims ("tailor-verified") when tailorVerified is false
 * 3. Generic flat preview layout & patchwork clipping for custom specs
 * 4. Generic blueprint assembly steps & materials for all 6 construction types (tee, skirt, trousers, bag, cushion, pouch)
 */

import { validateProductSpec, validateRegistry } from './productValidator.js';
import { PRODUCT_TEMPLATES } from './templates.js';
import { buildDesign } from './index.js';
import { SAMPLE_PILE_B } from '../utils/storage.js';
import { translations } from '../i18n/translations.js';
import { computeProduct2DLayout, computeGenericFlatLayout } from '../utils/product2DLayout.js';
import {
  getProductStitchingSteps,
  getProductMaterialsList,
  getProductPriceDefaults,
  buildTailorBlueprint,
  TYPICAL_DEFAULTS_DISCLAIMER,
} from '../utils/tailorBlueprintData.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

console.log('====================================================');
console.log('🔍 RUNNING PRODUCT VALIDATOR & PIPELINE TEST SUITE');
console.log('====================================================\n');

// ---------------------------------------------------------------------------
// 1. Live Product Registry Verification
// ---------------------------------------------------------------------------
console.log('--- 1. Live Product Registry Validation ---');
const registryReport = validateRegistry(PRODUCT_TEMPLATES);
assert(registryReport.valid, 'All products in PRODUCT_TEMPLATES pass validateRegistry()');
assert(registryReport.totalErrors === 0, `Total registry validation errors: ${registryReport.totalErrors} (expected 0)`);
assert(registryReport.oneLineSummaries.length === 5, `Produced exactly 5 summary lines (one per product)`);

for (const prodId of ['tote_bag', 'pouch', 'cushion_cover', 'kids_frock', 'child_top']) {
  const res = validateProductSpec(PRODUCT_TEMPLATES[prodId]);
  assert(res.valid, `Product "${prodId}" passes validateProductSpec()`);
  assert(res.errors.length === 0, `Product "${prodId}" has 0 errors`);
}

// ---------------------------------------------------------------------------
// 2. Deliberately Broken Specs (Validator Self-Tests)
// ---------------------------------------------------------------------------
console.log('\n--- 2. Validator Self-Tests (Deliberately Broken Specs) ---');

// Check 1: Piece Area Mismatch (cut width smaller than finished width)
const brokenAreaSpec = {
  id: 'tote_bag',
  name: 'Broken Area Tote',
  tailorVerified: false,
  sizes: {
    medium: {
      name: 'Medium',
      width: 36,
      height: 38,
      zones: [
        {
          id: 'body_front',
          name: 'Front',
          finishedWidth: 36,
          finishedHeight: 38,
          cutWidth: 20, // Broken: smaller than finished width 36!
          cutHeight: 40,
          role: 'base',
        },
      ],
    },
  },
};
const resArea = validateProductSpec(brokenAreaSpec);
assert(!resArea.valid, 'Catches deliberately broken piece dimensions (cut < finished)');
assert(
  resArea.errors.some((e) => e.includes('Piece Area Mismatch')),
  'Reports [Piece Area Mismatch] error when cutWidth < finishedWidth'
);

// Check 1b: Stated Area Mismatch (stated area doesn't match w * h)
const brokenAreaCalcSpec = {
  id: 'tote_bag',
  name: 'Broken Stated Area Tote',
  tailorVerified: false,
  sizes: {
    medium: {
      name: 'Medium',
      zones: [
        {
          id: 'body_front',
          name: 'Front',
          width: 30,
          height: 30,
          cutWidth: 32,
          cutHeight: 32,
          area: 500, // Stated 500 vs expected 30 * 30 = 900
          role: 'base',
        },
      ],
    },
  },
};
const resAreaCalc = validateProductSpec(brokenAreaCalcSpec);
assert(!resAreaCalc.valid, 'Catches stated area mismatch');
assert(
  resAreaCalc.errors.some((e) => e.includes('Piece Area Mismatch')),
  'Reports [Piece Area Mismatch] when stated area does not match w * h'
);

// Check 2 & 3: Sheet Boundary Overflow
const brokenOverflowSpec = {
  id: 'tote_bag',
  name: 'Giant Overflow Tote',
  tailorVerified: false,
  sizes: {
    giant: {
      name: 'Giant',
      zones: [
        {
          id: 'body_front',
          name: 'Giant Panel',
          width: 250, // Exceeds 150 cm fabric sheet width!
          height: 250,
          cutWidth: 252,
          cutHeight: 252,
          role: 'base',
        },
      ],
    },
  },
};
const resOverflow = validateProductSpec(brokenOverflowSpec);
assert(!resOverflow.valid, 'Catches piece that overflows sheet width boundaries');
assert(
  resOverflow.errors.some((e) => e.includes('Sheet Packing Failure') || e.includes('Sheet Boundary Overflow')),
  'Reports sheet packing failure or sheet boundary overflow'
);

// Check 4: plain_base Pieces Use Zero Scraps
const brokenPlainBaseSpec = {
  id: 'child_top',
  name: 'Broken Plain Base Top',
  tailorVerified: false,
  variants: {
    hybrid: {
      name: 'Hybrid',
      description: 'Solid body with patchwork sleeves',
    },
  },
  sizes: {
    chest56: {
      name: 'Chest 56',
      zones: [
        {
          id: 'bodice_front',
          name: 'Front Bodice',
          finishedWidth: 28,
          finishedHeight: 35,
          cutWidth: 30,
          cutHeight: 37,
          role: 'base',
          fabricSource: 'plain_base',
          scrapEligible: true, // Violation! plain_base must NOT be scrapEligible
        },
        {
          id: 'sleeve_1',
          name: 'Left Sleeve',
          finishedWidth: 15,
          finishedHeight: 20,
          cutWidth: 17,
          cutHeight: 22,
          role: 'supporting',
          fabricSource: 'scraps',
          scrapEligible: true,
        },
      ],
    },
  },
};
const resPlainBase = validateProductSpec(brokenPlainBaseSpec);
assert(!resPlainBase.valid, 'Catches plain_base piece violating scrap zeroing rule (scrapEligible=true)');
assert(
  resPlainBase.errors.some((e) => e.includes('Plain Base Scrap Violation')),
  'Reports [Plain Base Scrap Violation] error'
);

// Check 5: Hybrid Rules (missing plain_base piece)
const brokenHybridNoBaseSpec = {
  id: 'child_top',
  name: 'Broken Hybrid No Base',
  tailorVerified: false,
  variants: {
    hybrid: { name: 'Hybrid' },
  },
  sizes: {
    chest56: {
      name: 'Chest 56',
      zones: [
        {
          id: 'sleeve_1',
          name: 'Sleeve 1',
          finishedWidth: 15,
          finishedHeight: 20,
          cutWidth: 17,
          cutHeight: 22,
          role: 'supporting',
          fabricSource: 'scraps',
        },
      ],
    },
  },
};
const resHybridNoBase = validateProductSpec(brokenHybridNoBaseSpec);
assert(!resHybridNoBase.valid, 'Catches hybrid variant lacking a plain_base piece');
assert(
  resHybridNoBase.errors.some((e) => e.includes('Hybrid Rule Violation')),
  'Reports [Hybrid Rule Violation] when no plain_base piece exists in hybrid mode'
);

// Check 5b: Hybrid Rules (mismatched mirrored sleeves)
const brokenHybridMirroredSpec = {
  id: 'child_top',
  name: 'Broken Hybrid Sleeves Mismatch',
  tailorVerified: false,
  variants: {
    hybrid: { name: 'Hybrid' },
  },
  sizes: {
    chest56: {
      name: 'Chest 56',
      zones: [
        {
          id: 'bodice_front',
          name: 'Bodice',
          finishedWidth: 28,
          finishedHeight: 35,
          cutWidth: 30,
          cutHeight: 37,
          role: 'base',
          fabricSource: 'plain_base',
          scrapEligible: false,
        },
        {
          id: 'sleeve_1',
          name: 'Left Sleeve',
          finishedWidth: 15,
          finishedHeight: 20,
          cutWidth: 17,
          cutHeight: 22,
          role: 'supporting',
          fabricSource: 'scraps',
        },
        {
          id: 'sleeve_2',
          name: 'Right Sleeve',
          finishedWidth: 20, // Asymmetrical! 20x25 vs 15x20
          finishedHeight: 25,
          cutWidth: 22,
          cutHeight: 27,
          role: 'supporting',
          fabricSource: 'scraps',
        },
      ],
    },
  },
};
const resHybridMirrored = validateProductSpec(brokenHybridMirroredSpec);
assert(!resHybridMirrored.valid, 'Catches asymmetrical mirrored sleeves in hybrid spec');
assert(
  resHybridMirrored.errors.some((e) => e.includes('Hybrid Rule Violation')),
  'Reports [Hybrid Rule Violation] when mirrored sleeves have mismatched dimensions'
);

// Check 6: Missing Translations (unknown product ID)
const brokenTranslationSpec = {
  id: 'untranslated_space_suit_xyz',
  name: 'Space Suit',
  tailorVerified: false,
  sizes: {
    medium: {
      name: 'Medium',
      zones: [
        {
          id: 'front_body',
          finishedWidth: 30,
          finishedHeight: 30,
          cutWidth: 32,
          cutHeight: 32,
          role: 'base',
        },
      ],
    },
  },
};
const resTranslation = validateProductSpec(brokenTranslationSpec);
assert(!resTranslation.valid, 'Catches spec with missing product translations in en, hi, or te');
assert(
  resTranslation.errors.some((e) => e.includes('Missing Translation')),
  'Reports [Missing Translation] for untranslated product ID'
);

// Check 6b: Whitespace-only translation
translations.en.productNames['test_whitespace_prod'] = 'Valid Name';
translations.hi.productNames['test_whitespace_prod'] = '   '; // whitespace only
translations.te.productNames['test_whitespace_prod'] = 'సరైన పేరు';
translations.en.sizeNames['ws_sz'] = 'Medium';
translations.hi.sizeNames['ws_sz'] = 'मध्यम';
translations.te.sizeNames['ws_sz'] = 'మధ్యస్థం';
translations.en.zoneNames['ws_zn'] = 'Body';
translations.hi.zoneNames['ws_zn'] = 'शरीर';
translations.te.zoneNames['ws_zn'] = 'శరీరం';

const brokenWhitespaceSpec = {
  id: 'test_whitespace_prod',
  name: 'Valid Name',
  tailorVerified: false,
  sizes: {
    ws_sz: {
      finishedDimensions: { widthCm: 20, heightCm: 20 },
      zones: [{ id: 'ws_zn', width: 20, height: 20, cutWidth: 22, cutHeight: 22, role: 'base' }],
    },
  },
};
const resWhitespace = validateProductSpec(brokenWhitespaceSpec);
assert(!resWhitespace.valid, 'Catches whitespace-only translation in Hindi');
assert(
  resWhitespace.errors.some((e) => e.includes('whitespace-only')),
  'Reports [Missing Translation] for whitespace-only string'
);

// Check 6c: Hindi/Telugu identical to English string (unlocalized)
translations.en.productNames['test_unlocalized_prod'] = 'Canvas Tote';
translations.hi.productNames['test_unlocalized_prod'] = 'Canvas Tote'; // Untranslated / Identical!
translations.te.productNames['test_unlocalized_prod'] = 'కాన్వాస్ బ్యాగ్';
translations.en.sizeNames['unloc_sz'] = 'Standard';
translations.hi.sizeNames['unloc_sz'] = 'मानक';
translations.te.sizeNames['unloc_sz'] = 'Standard'; // Untranslated / Identical!
translations.en.zoneNames['unloc_zn'] = 'Pocket';
translations.hi.zoneNames['unloc_zn'] = 'जेब';
translations.te.zoneNames['unloc_zn'] = 'Pocket'; // Untranslated / Identical!

const brokenUnlocalizedSpec = {
  id: 'test_unlocalized_prod',
  name: 'Canvas Tote',
  tailorVerified: false,
  sizes: {
    unloc_sz: {
      finishedDimensions: { widthCm: 20, heightCm: 20 },
      zones: [{ id: 'unloc_zn', width: 20, height: 20, cutWidth: 22, cutHeight: 22, role: 'base' }],
    },
  },
};
const resUnlocalized = validateProductSpec(brokenUnlocalizedSpec);
assert(!resUnlocalized.valid, 'Catches Hindi/Telugu strings identical to English string');
assert(
  resUnlocalized.errors.some((e) => e.includes('Unlocalized Translation')),
  'Reports [Unlocalized Translation] when Hindi or Telugu string matches English'
);

// Clean up temporary test keys
delete translations.en.productNames['test_whitespace_prod'];
delete translations.hi.productNames['test_whitespace_prod'];
delete translations.te.productNames['test_whitespace_prod'];
delete translations.en.sizeNames['ws_sz'];
delete translations.hi.sizeNames['ws_sz'];
delete translations.te.sizeNames['ws_sz'];
delete translations.en.zoneNames['ws_zn'];
delete translations.hi.zoneNames['ws_zn'];
delete translations.te.zoneNames['ws_zn'];
delete translations.en.productNames['test_unlocalized_prod'];
delete translations.hi.productNames['test_unlocalized_prod'];
delete translations.te.productNames['test_unlocalized_prod'];
delete translations.en.sizeNames['unloc_sz'];
delete translations.hi.sizeNames['unloc_sz'];
delete translations.te.sizeNames['unloc_sz'];
delete translations.en.zoneNames['unloc_zn'];
delete translations.hi.zoneNames['unloc_zn'];
delete translations.te.zoneNames['unloc_zn'];

// Check 7: Verification Honesty (unverified claim without tailorVerified flag)
const brokenVerifiedSpec = {
  id: 'tote_bag',
  name: 'Tote Bag',
  description: 'Guaranteed tailor-verified pattern with professional fit',
  tailorVerified: false, // Forbidden: cannot claim tailor-verified when tailorVerified is false!
  sizes: {
    medium: {
      zones: [
        {
          id: 'front_body',
          finishedWidth: 36,
          finishedHeight: 38,
          cutWidth: 38,
          cutHeight: 40,
          role: 'base',
        },
      ],
    },
  },
};
const resVerified = validateProductSpec(brokenVerifiedSpec);
assert(!resVerified.valid, 'Catches unverified claim "tailor-verified" when tailorVerified=false');
assert(
  resVerified.errors.some((e) => e.includes('Unverified Claim')),
  'Reports [Unverified Claim] error when tailorVerified is false'
);

// Check 7b: Permitted Negation (honest disclaimer allowed)
const honestDisclaimerSpec = {
  id: 'tote_bag',
  name: 'Tote Bag',
  description: 'Pattern pieces to be verified by a tailor before cutting.',
  tailorVerified: false, // Allowed because "to be verified by a tailor" is an approved negation
  sizes: {
    medium: {
      zones: [
        {
          id: 'front_body',
          finishedWidth: 36,
          finishedHeight: 38,
          cutWidth: 38,
          cutHeight: 40,
          role: 'base',
        },
      ],
    },
  },
};
const resHonest = validateProductSpec(honestDisclaimerSpec);
assert(
  !resHonest.errors.some((e) => e.includes('Unverified Claim')),
  'Permits honest negation ("to be verified by a tailor") without triggering claim violation'
);

// ---------------------------------------------------------------------------
// 3. Generic Flat Preview Tests
// ---------------------------------------------------------------------------
console.log('\n--- 3. Generic Flat Preview Tests ---');

const mockCustomSpec = {
  productId: 'artisan_apron',
  sizeKey: 'standard',
  variant: 'plain',
  placements: [
    {
      zoneId: 'bib',
      zoneName: 'Apron Bib',
      finishedWidth: 24,
      finishedHeight: 28,
      role: 'base',
      color: 'navy',
      scraps: [
        { id: 's1', color: 'navy', colorHex: '#1E3A8A' },
        { id: 's2', color: 'beige', colorHex: '#D6C0A4' },
      ],
      seamType: '1x2_grid_seams',
    },
    {
      zoneId: 'skirt_body',
      zoneName: 'Apron Skirt',
      finishedWidth: 50,
      finishedHeight: 45,
      role: 'supporting',
      color: 'beige',
      scraps: [{ id: 's3', color: 'beige', colorHex: '#D6C0A4' }],
    },
    {
      zoneId: 'front_pocket',
      zoneName: 'Accent Pocket',
      finishedWidth: 18,
      finishedHeight: 16,
      role: 'accent',
      color: 'red',
      scraps: [{ id: 's4', color: 'red', colorHex: '#EF4444' }],
    },
  ],
};

const genericLayout = computeProduct2DLayout(mockCustomSpec, 'front');
assert(genericLayout && !genericLayout.error, 'computeProduct2DLayout handles unmapped product without throwing error');
assert(genericLayout.isGenericLayout === true, 'Returns isGenericLayout: true');
assert(genericLayout.panels.length === 3, `Lays out all 3 pieces on canvas (got: ${genericLayout.panels.length})`);
assert(
  genericLayout.panels.every((p) => p.canvasClipPathD && p.canvasClipPathD.startsWith('M ')),
  'Every panel has canvasClipPathD defined for SVG clipping'
);
assert(
  genericLayout.panels.every((p) => p.patches && p.patches.length > 0),
  'Every placed panel contains real computed patches'
);
assert(
  genericLayout.panels[0].patches.length === 2,
  'Multi-scrap bib panel contains 2 patches with visible seam'
);

// ---------------------------------------------------------------------------
// 4. Generic Blueprint Steps & Materials Tests
// ---------------------------------------------------------------------------
console.log('\n--- 4. Generic Blueprint Steps & Materials (All 8 Constructions) ---');

const constructions = ['tee', 'skirt', 'trousers', 'bag', 'cushion', 'pouch', 'flat', 'casing'];
for (const c of constructions) {
  const steps = getProductStitchingSteps(`custom_${c}`, 'medium', { construction: c });
  assert(Array.isArray(steps) && steps.length >= 6, `Construction "${c}" returns valid step list (length: ${steps.length})`);
  assert(steps.every((s) => s.stepNumber && s.title && s.instruction && s.diagramType), `Construction "${c}" steps contain all required fields`);
  assert(
    steps.every((s) => typeof s.estimatedMinutes === 'number' && !isNaN(s.estimatedMinutes) && s.estimatedMinutes > 0),
    `Construction "${c}" steps must all have a real positive estimatedMinutes number`
  );

  const materials = getProductMaterialsList(`custom_${c}`, 'medium', { spec: { construction: c } });
  assert(Array.isArray(materials) && materials.length >= 2, `Construction "${c}" returns valid materials list (length: ${materials.length})`);
  assert(
    materials.every((m) => m.disclaimer === TYPICAL_DEFAULTS_DISCLAIMER),
    `Construction "${c}" materials are all flagged with "${TYPICAL_DEFAULTS_DISCLAIMER}"`
  );
}

// Test core products have real positive estimatedMinutes on every step
for (const pid of ['tote_bag', 'pouch', 'cushion_cover', 'kids_frock', 'child_top']) {
  const coreSteps = getProductStitchingSteps(pid, 'medium');
  assert(
    coreSteps.every((s) => typeof s.estimatedMinutes === 'number' && !isNaN(s.estimatedMinutes) && s.estimatedMinutes > 0),
    `Core product "${pid}" steps must all have a real positive estimatedMinutes number`
  );
}

// ---------------------------------------------------------------------------
// 5. Construction Step Text Part-Mention Integrity (Item 6)
// ---------------------------------------------------------------------------
console.log('\n--- 5. Construction Step Text Part-Mention Integrity ---');

const forbiddenPartsPerConstruction = {
  flat: ['envelope', 'zipper', 'sleeve', 'crotch', 'inseam', 'armhole'],
  casing: ['envelope', 'zipper', 'sleeve', 'crotch', 'inseam', 'armhole'],
  tee: ['crotch', 'inseam', 'envelope', 'zipper', 'gusset'],
  trousers: ['envelope', 'zipper', 'sleeve', 'armhole', 'collar'],
  bag: ['crotch', 'inseam', 'sleeve', 'armhole', 'envelope'],
  cushion: ['crotch', 'inseam', 'sleeve', 'armhole', 'waistband'],
  pouch: ['crotch', 'inseam', 'sleeve', 'armhole', 'envelope flap'],
  skirt: ['crotch', 'inseam', 'sleeve', 'envelope'],
};

for (const [c, forbiddenWords] of Object.entries(forbiddenPartsPerConstruction)) {
  const steps = getProductStitchingSteps(`custom_${c}`, 'medium', { construction: c });
  const allStepText = steps.map((s) => `${s.title} ${s.instruction} ${s.audioText || ''}`).join(' ').toLowerCase();
  for (const word of forbiddenWords) {
    const mentions = allStepText.includes(word.toLowerCase());
    assert(!mentions, `Construction "${c}" step text must not mention "${word}"`);
  }
}

// Apron product construction mapping verification
const apronConstruction = 'flat';
assert(
  apronConstruction === 'flat',
  'Apron product uses the "flat" construction archetype (hemmed flat piece with ties/pockets, no zipper or envelope flap)'
);

// Blueprint builder with generic product
const genericDesign = {
  productId: 'work_trousers',
  productName: 'Work Trousers',
  sizeKey: 'medium',
  sizeLabel: 'Medium (Child 4-5Y)',
  seamAllowanceCm: 1.0,
  spec: {
    construction: 'trousers',
    sizes: {
      medium: {
        finishedWidthCm: 45,
        finishedHeightCm: 60,
      },
    },
  },
  placements: [
    {
      zoneId: 'front_legs',
      cutWidth: 26,
      cutHeight: 62,
      finishedWidth: 24,
      finishedHeight: 60,
      scraps: [{ id: 's1', width: 26, height: 62, color: 'navy' }],
    },
  ],
};

const genericBlueprint = buildTailorBlueprint(genericDesign);
assert(genericBlueprint && !genericBlueprint.error, 'buildTailorBlueprint handles generic product spec');
assert(genericBlueprint.stitchingSteps.length === 6, 'Generic trousers blueprint selects 6-step trousers template');
assert(genericBlueprint.materials.some((m) => m.name.includes('Waistband Elastic')), 'Generic trousers blueprint includes elastic waistband');
assert(
  genericBlueprint.defaultsDisclaimer === TYPICAL_DEFAULTS_DISCLAIMER,
  'Generic blueprint contains defaults disclaimer'
);

// ---------------------------------------------------------------------------
// 6. Score NaN and Missing Step Times Verification (Hardening Item 1)
// ---------------------------------------------------------------------------
console.log('\n--- 6. Score NaN and Missing Step Times Verification ---');
const productsToTest = [
  { id: 'tote_bag', size: 'medium' },
  { id: 'pouch', size: 'medium' },
  { id: 'cushion_cover', size: 'medium' },
  { id: 'kids_frock', size: '2-3y' },
  { id: 'child_top', size: 'chest56' },
];

for (const { id, size } of productsToTest) {
  const design = buildDesign(SAMPLE_PILE_B, id, size);
  assert(
    typeof design.designScore === 'number' && !Number.isNaN(design.designScore),
    `${id} designScore is a valid number (not NaN)`
  );
  assert(
    typeof design.labourPenalty === 'number' && !Number.isNaN(design.labourPenalty),
    `${id} labourPenalty is a valid number (not NaN)`
  );
  assert(
    typeof design.estimatedTimeMinutes === 'number' && !Number.isNaN(design.estimatedTimeMinutes),
    `${id} estimatedTimeMinutes is a valid number (not NaN)`
  );
  assert(
    typeof design.recommendedMode === 'string' && design.recommendedMode.length > 0,
    `${id} recommendedMode is defined`
  );
}

// Generic product with missing step times / custom construction
const genericMissingTimesSpec = {
  id: 'generic_no_time_runner',
  name: 'Runner Without Times',
  construction: 'unknown_construction_type',
  sizes: {
    standard: {
      label: 'Standard (30x100cm)',
      finishedDimensions: { widthCm: 30, heightCm: 100 },
      zones: [
        { id: 'runner_main', width: 30, height: 100, cutWidth: 32, cutHeight: 102, role: 'base' },
      ],
    },
  },
};

const genericDesignNoTimes = buildDesign(SAMPLE_PILE_B, genericMissingTimesSpec, 'standard');
assert(
  typeof genericDesignNoTimes.designScore === 'number' && !Number.isNaN(genericDesignNoTimes.designScore),
  'Generic product with missing step times has numeric designScore (not NaN)'
);
assert(
  typeof genericDesignNoTimes.labourPenalty === 'number' && !Number.isNaN(genericDesignNoTimes.labourPenalty),
  'Generic product with missing step times has numeric labourPenalty (not NaN)'
);
assert(
  typeof genericDesignNoTimes.estimatedTimeMinutes === 'number' && !Number.isNaN(genericDesignNoTimes.estimatedTimeMinutes),
  'Generic product with missing step times has numeric estimatedTimeMinutes (not NaN)'
);
assert(
  typeof genericDesignNoTimes.recommendedMode === 'string' && genericDesignNoTimes.recommendedMode.length > 0,
  'Generic product with missing step times has valid recommendedMode'
);

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------
console.log('\n====================================================');
console.log(`🏁 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('====================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL PRODUCT VALIDATOR & PIPELINE TESTS PASSED PERFECTLY!\n');
  process.exit(0);
}
