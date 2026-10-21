// src/utils/test_stage4b_blueprint.js
// Verification tests for Stage 4B: Tailor blueprint data generation
// Verifies for all 4 products:
// 1. Piece number, name, dual dimensions (cm & inches), seam allowance line, grain arrow
// 2. Scrap mappings with original vs trimmed sizes
// 3. Stitching steps in order with picture, text, and audio readout
// 4. Materials list with notions & scrap counts
// 5. Time estimate & editable price helper
// 6. Mandatory disclaimer "Measurements to be verified by a tailor"

import assert from 'assert';
import { buildDesign } from '../engine/index.js';
import {
  buildTailorBlueprint,
  TAILOR_DISCLAIMER,
  cmToInch,
  formatDualDimension,
  PRODUCT_STITCHING_STEPS,
  getProductMaterialsList,
  getProductPriceDefaults,
} from './tailorBlueprintData.js';

console.log('--- RUNNING STAGE 4B TAILOR BLUEPRINT TESTS ---');

// Test Pile (medium cotton, 30 scraps 14x14)
const TEST_PILE = [
  ...Array.from({ length: 10 }, (_, i) => ({
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
  ...Array.from({ length: 10 }, (_, i) => ({
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
  ...Array.from({ length: 10 }, (_, i) => ({
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

// 1. Unit conversions
{
  assert.strictEqual(cmToInch(2.54), 1.0, '2.54 cm must equal 1.0 inch');
  assert.strictEqual(cmToInch(25.4), 10.0, '25.4 cm must equal 10.0 inches');
  const dual = formatDualDimension(30, 20);
  assert.strictEqual(dual.cm, '30 × 20 cm');
  assert.strictEqual(dual.inches, '11.8 × 7.9 in');
  console.log('✓ cm to inch conversion & formatting verified.');
}

// 2. Blueprint generation for all 4 products
const PRODUCTS = [
  { id: 'pouch', size: 'small' },
  { id: 'tote_bag', size: 'small' },
  { id: 'cushion_cover', size: 'small' },
  { id: 'kids_frock', size: '0-1y' },
];

for (const { id: productId, size: sizeKey } of PRODUCTS) {
  const design = buildDesign(TEST_PILE, productId, sizeKey);
  assert(design, `buildDesign must succeed for ${productId}`);

  const blueprint = buildTailorBlueprint(design);
  assert(!blueprint.error, `Blueprint error for ${productId}: ${blueprint.error}`);

  // Mandatory disclaimer check
  assert.strictEqual(
    blueprint.disclaimer,
    TAILOR_DISCLAIMER,
    `Blueprint must include exact disclaimer: "${TAILOR_DISCLAIMER}"`
  );
  assert.strictEqual(blueprint.disclaimer, 'Measurements to be verified by a tailor');

  // Verify pieces
  assert(Array.isArray(blueprint.pieces), `Pieces must be an array for ${productId}`);
  assert(blueprint.pieces.length > 0, `Pieces array must not be empty for ${productId}`);

  blueprint.pieces.forEach((piece, idx) => {
    // Number and name
    assert.strictEqual(piece.pieceNumber, idx + 1, `Piece number must be 1-indexed (got ${piece.pieceNumber})`);
    assert(piece.name && piece.name.length > 0, `Piece ${piece.pieceNumber} must have a name`);

    // Dual dimensions (cm and inches)
    assert(piece.cutDimensions.cm.includes('cm'), `Cut dimension missing cm in piece ${piece.pieceNumber}`);
    assert(piece.cutDimensions.inches.includes('in'), `Cut dimension missing in in piece ${piece.pieceNumber}`);
    assert(piece.finishedDimensions.cm.includes('cm'), `Finished dimension missing cm in piece ${piece.pieceNumber}`);
    assert(piece.finishedDimensions.inches.includes('in'), `Finished dimension missing in in piece ${piece.pieceNumber}`);

    // Seam allowance line
    assert(piece.seamAllowance.cm.includes('cm'), `Seam allowance missing cm in piece ${piece.pieceNumber}`);
    assert(piece.seamAllowance.inches.includes('in'), `Seam allowance missing in in piece ${piece.pieceNumber}`);
    assert(piece.seamAllowanceCm > 0, `Seam allowance cm must be > 0`);

    // Grain arrow
    assert.strictEqual(piece.grainLine.symbol, '↕', `Grain line symbol must be vertical arrow ↕`);
    assert(piece.grainLine.description.includes('grain'), `Grain line description must mention grain`);

    // Scraps with trimmed sizes
    assert(Array.isArray(piece.scraps), `Scraps must be array for piece ${piece.pieceNumber}`);
    piece.scraps.forEach((s) => {
      assert(s.scrapId, `Scrap missing scrapId in piece ${piece.pieceNumber}`);
      assert(s.color, `Scrap missing color in piece ${piece.pieceNumber}`);
      assert(s.originalDimensions.cm.includes('cm'), `Original dimensions missing cm`);
      assert(s.trimmedDimensions.cm.includes('cm'), `Trimmed dimensions missing cm`);
      assert(s.trimmedDimensions.inches.includes('in'), `Trimmed dimensions missing in`);
    });
  });

  // Stitching steps in order (picture + text + audio button)
  assert(Array.isArray(blueprint.stitchingSteps), `Stitching steps must be array for ${productId}`);
  assert(blueprint.stitchingSteps.length >= 4, `Must have at least 4 stitching steps for ${productId}`);
  blueprint.stitchingSteps.forEach((step, sIdx) => {
    assert.strictEqual(step.stepNumber, sIdx + 1, `Step number must be sequential`);
    assert(step.title, `Step ${step.stepNumber} missing title`);
    assert(step.instruction && step.instruction.length > 20, `Step ${step.stepNumber} missing detailed instruction text`);
    assert(step.audioText && step.audioText.length > 10, `Step ${step.stepNumber} missing audio readout text`);
    assert(step.diagramType, `Step ${step.stepNumber} missing picture diagramType`);
  });

  // Materials list
  assert(Array.isArray(blueprint.materials), `Materials must be array for ${productId}`);
  assert(blueprint.materials.length >= 2, `Materials must have fabric and thread`);
  assert(blueprint.materials.some(m => m.name.includes('Fabric Scraps')), `Materials must list fabric scraps`);
  assert(blueprint.materials.some(m => m.name.includes('Thread')), `Materials must list sewing thread`);

  // Product-specific hardware checks
  if (productId === 'pouch') {
    assert(blueprint.materials.some(m => m.name.includes('Zipper')), 'Pouch materials must include Zipper');
  } else if (productId === 'tote_bag') {
    assert(blueprint.materials.some(m => m.name.includes('Handle')), 'Tote materials must include Handle reinforcement');
  } else if (productId === 'cushion_cover') {
    assert(blueprint.materials.some(m => m.name.includes('Cushion')), 'Cushion materials must include Cushion Pad');
  } else if (productId === 'kids_frock') {
    assert(blueprint.materials.some(m => m.name.includes('Buttons') || m.name.includes('Fasteners')), 'Frock materials must include Fasteners');
  }

  // Time estimate
  assert(blueprint.estimatedTimeMinutes > 0, `Time estimate must be > 0 (got ${blueprint.estimatedTimeMinutes})`);

  // Price helper (editable components: material + time + extras)
  assert(blueprint.pricing, `Pricing object must exist for ${productId}`);
  assert(blueprint.pricing.materialCost > 0, `Material cost must be > 0`);
  assert(blueprint.pricing.laborCost > 0, `Labor cost must be > 0`);
  assert(blueprint.pricing.extrasCost > 0, `Extras cost must be > 0`);
  assert.strictEqual(
    blueprint.pricing.suggestedPrice,
    blueprint.pricing.materialCost + blueprint.pricing.laborCost + blueprint.pricing.extrasCost,
    `Suggested price must equal material + labor + extras`
  );

  console.log(`✓ Blueprint verified for ${productId} (${blueprint.pieces.length} pieces, ${blueprint.stitchingSteps.length} steps, ${blueprint.materials.length} materials)`);
}

console.log('\n=============================================');
console.log('ALL STAGE 4B TAILOR BLUEPRINT TESTS PASSED!');
console.log('=============================================\n');
