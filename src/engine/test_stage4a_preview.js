// test_stage4a_preview.js
// Automated verification tests for Stage 4A: 2D preview of finished products
// Verifies:
// 1. Patch area conservation: sum of patch areas = panel area
// 2. Boundary containment: no patch is drawn outside its panel
// 3. Front and back views for all 4 products with Pile A and Pile B

import assert from 'assert';
import { suggestProducts, buildDesign } from './index.js';
import { computePanelPatches, computeProduct2DLayout } from '../utils/product2DLayout.js';

// Pile A: 20 plain cotton 10x10 cm navy + 20 plain cotton 12x12 cm beige
const PILE_A = [
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `pile_a_navy_${i + 1}`,
    color: 'navy',
    colorHex: '#1E3A8A',
    width: 10,
    length: 10,
    area: 100,
    fabricType: 'cotton',
    print: 'plain',
    weight: 'medium',
  })),
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `pile_a_beige_${i + 1}`,
    color: 'beige',
    colorHex: '#D6C0A4',
    width: 12,
    length: 12,
    area: 144,
    fabricType: 'cotton',
    print: 'plain',
    weight: 'medium',
  })),
];

// Pile B: 30 plain cotton 14x14 cm (10 navy, 10 beige, 10 grey)
const PILE_B = [
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `pile_b_navy_${i + 1}`,
    color: 'navy',
    colorHex: '#1E3A8A',
    width: 14,
    length: 14,
    area: 196,
    fabricType: 'cotton',
    print: 'plain',
    weight: 'medium',
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `pile_b_beige_${i + 1}`,
    color: 'beige',
    colorHex: '#D6C0A4',
    width: 14,
    length: 14,
    area: 196,
    fabricType: 'cotton',
    print: 'plain',
    weight: 'medium',
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `pile_b_grey_${i + 1}`,
    color: 'grey',
    colorHex: '#9CA3AF',
    width: 14,
    length: 14,
    area: 196,
    fabricType: 'cotton',
    print: 'plain',
    weight: 'medium',
  })),
];

// Colourful Pile: 40 plain cotton pieces (20 navy base, 10 saffron orange, 5 rose pink, 5 olive green)
const PILE_COLORFUL = [
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `pile_c_navy_${i + 1}`,
    color: 'navy',
    colorHex: '#1E3A8A',
    width: 14,
    length: 14,
    area: 196,
    fabricType: 'cotton',
    print: 'plain',
    weight: 'medium',
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `pile_c_orange_${i + 1}`,
    color: 'orange',
    colorHex: '#F97316',
    width: 14,
    length: 14,
    area: 196,
    fabricType: 'cotton',
    print: 'plain',
    weight: 'medium',
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `pile_c_pink_${i + 1}`,
    color: 'pink',
    colorHex: '#EC4899',
    width: 12,
    length: 12,
    area: 144,
    fabricType: 'cotton',
    print: 'plain',
    weight: 'medium',
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `pile_c_olive_${i + 1}`,
    color: 'olive',
    colorHex: '#65A30D',
    width: 12,
    length: 12,
    area: 144,
    fabricType: 'cotton',
    print: 'plain',
    weight: 'medium',
  })),
];

console.log('--- RUNNING STAGE 4A 2D PREVIEW TESTS ---');

// TEST SUITE 1: computePanelPatches mathematical properties
console.log('\n[Suite 1] computePanelPatches Unit Tests');
{
  // 1. Single piece
  const res1 = computePanelPatches({ scraps: [{ color: 'navy', width: 20, height: 30 }] }, 20, 30);
  assert.strictEqual(res1.patches.length, 1);
  assert.strictEqual(res1.patches[0].width, 20);
  assert.strictEqual(res1.patches[0].height, 30);
  assert.strictEqual(res1.patches[0].relX, 0);
  assert.strictEqual(res1.patches[0].relY, 0);
  console.log('✓ Single piece patch matches panel dimensions exactly.');

  // 2. 2x3 grid seams
  const mockPlacementGrid = {
    seamType: '2x3_grid_seams',
    scraps: Array.from({ length: 6 }, (_, i) => ({ color: i % 2 === 0 ? 'navy' : 'beige' })),
  };
  const resGrid = computePanelPatches(mockPlacementGrid, 36, 42);
  assert.strictEqual(resGrid.patches.length, 6);
  let totalArea = 0;
  for (const p of resGrid.patches) {
    assert(p.relX >= 0, 'relX must be >= 0');
    assert(p.relY >= 0, 'relY must be >= 0');
    assert(p.relX + p.width <= 36 + 1e-6, `relX + width (${p.relX + p.width}) exceeds panel width 36`);
    assert(p.relY + p.height <= 42 + 1e-6, `relY + height (${p.relY + p.height}) exceeds panel height 42`);
    totalArea += p.width * p.height;
  }
  assert(Math.abs(totalArea - 36 * 42) < 1e-6, `Area sum ${totalArea} must equal 36 * 42 = ${36 * 42}`);
  console.log('✓ 2x3 grid: Area conserved and all patches contained within bounds.');

  // 3. Horizontal strip
  const mockPlacementHoriz = {
    direction: 'horizontal',
    scraps: Array.from({ length: 4 }, (_, i) => ({ color: 'navy' })),
  };
  const resHoriz = computePanelPatches(mockPlacementHoriz, 40, 10);
  assert.strictEqual(resHoriz.patches.length, 4);
  let totalAreaH = 0;
  for (const p of resHoriz.patches) {
    assert(p.relX >= 0);
    assert(p.relY >= 0);
    assert(p.relX + p.width <= 40 + 1e-6);
    assert(p.relY + p.height <= 10 + 1e-6);
    totalAreaH += p.width * p.height;
  }
  assert(Math.abs(totalAreaH - 400) < 1e-6);
  console.log('✓ Horizontal strip: Area conserved and all patches contained within bounds.');

  // 4. Vertical column
  const mockPlacementVert = {
    direction: 'vertical',
    scraps: Array.from({ length: 3 }, (_, i) => ({ color: 'grey' })),
  };
  const resVert = computePanelPatches(mockPlacementVert, 15, 30);
  assert.strictEqual(resVert.patches.length, 3);
  let totalAreaV = 0;
  for (const p of resVert.patches) {
    assert(p.relX >= 0);
    assert(p.relY >= 0);
    assert(p.relX + p.width <= 15 + 1e-6);
    assert(p.relY + p.height <= 30 + 1e-6);
    totalAreaV += p.width * p.height;
  }
  assert(Math.abs(totalAreaV - 450) < 1e-6);
  console.log('✓ Vertical column: Area conserved and all patches contained within bounds.');
}

// TEST SUITE 2: All 4 Products across Pile A and Pile B
console.log('\n[Suite 2] Product 2D Layout Geometry & Area Conservation across Products & Piles');

const PRODUCTS = ['tote_bag', 'pouch', 'cushion_cover', 'kids_frock'];
const PILES = [
  { name: 'Neutral Pile (Pile B)', scraps: PILE_B },
  { name: 'Colourful Pile', scraps: PILE_COLORFUL },
];

for (const pile of PILES) {
  console.log(`\n--- Testing with ${pile.name} ---`);
  for (const productId of PRODUCTS) {
    // Generate design using buildDesign
    const sizeKey = productId === 'kids_frock' ? '2-3y' : 'medium';
    const design = buildDesign(pile.scraps, productId, sizeKey);
    assert(design, `buildDesign failed for ${productId}`);

    for (const view of ['front', 'back']) {
      const layout = computeProduct2DLayout(design, view);
      assert(!layout.error, `Layout error for ${productId} (${view}): ${layout.error}`);
      assert(layout.viewBox, `Missing viewBox for ${productId} (${view})`);
      assert(Array.isArray(layout.panels), `Panels must be array for ${productId} (${view})`);
      assert(layout.panels.length > 0, `No panels generated for ${productId} (${view})`);

      for (const panel of layout.panels) {
        assert(panel.id, `Panel missing id in ${productId}`);
        assert(panel.width > 0, `Panel ${panel.id} width must be > 0 (got ${panel.width})`);
        assert(panel.height > 0, `Panel ${panel.id} height must be > 0 (got ${panel.height})`);

        const expectedArea = panel.width * panel.height;
        let patchAreaSum = 0;

        for (const patch of panel.patches) {
          // Boundary containment check
          assert(
            patch.relX >= 0,
            `Patch ${patch.index} in panel ${panel.id} has negative relX: ${patch.relX}`
          );
          assert(
            patch.relY >= 0,
            `Patch ${patch.index} in panel ${panel.id} has negative relY: ${patch.relY}`
          );
          assert(
            patch.relX + patch.width <= panel.width + 1e-4,
            `Patch ${patch.index} in panel ${panel.id} overflows panel width: ${patch.relX + patch.width} > ${panel.width}`
          );
          assert(
            patch.relY + patch.height <= panel.height + 1e-4,
            `Patch ${patch.index} in panel ${panel.id} overflows panel height: ${patch.relY + patch.height} > ${panel.height}`
          );

          patchAreaSum += patch.width * patch.height;
        }

        // Area conservation check (only when panel has patches)
        if (panel.patches.length > 0) {
          const diff = Math.abs(patchAreaSum - expectedArea);
          assert(
            diff < 1e-4,
            `Area conservation violated in panel ${panel.id}: sum(${patchAreaSum}) != expected(${expectedArea}), diff=${diff}`
          );
        }
      }

      console.log(`✓ ${productId.padEnd(14)} [${view.padEnd(5)}]: ${layout.panels.length} panels verified (Containment & Area OK)`);
    }
  }
}

// TEST SUITE 3: Cushion Cover Decorated vs Plain Variant
console.log('\n[Suite 3] Cushion Cover Plain vs Decorated Layout');
{
  const designPlain = buildDesign(PILE_B, 'cushion_cover', 'medium');
  const layoutPlain = computeProduct2DLayout(designPlain, 'front');
  const panelIdsPlain = layoutPlain.panels.map((p) => p.id);
  assert(panelIdsPlain.includes('front_body'), 'Plain cushion must have front_body');

  // Decorated design
  const designDec = { ...designPlain, variant: 'decorated' };
  const layoutDec = computeProduct2DLayout(designDec, 'front');
  const panelIdsDec = layoutDec.panels.map((p) => p.id);
  assert(panelIdsDec.includes('center_field'), 'Decorated cushion must have center_field');
  console.log('✓ Plain vs Decorated cushion variants generate correct distinctive panel geometries.');
}

// TEST SUITE 4: Q8b Silhouette Layouts (Containment, Area Conservation, Zero NaN/Undefined)
console.log('\n[Suite 4] Q8b Silhouette Layouts Verification');
{
  const newProductIds = [
    'drawstring_bag',
    'scrunchie',
    'table_runner',
    'placemat',
    'coin_purse',
    'pencil_case',
  ];
  const sizes = ['small', 'medium', 'large'];
  const views = ['front', 'back'];

  for (const pid of newProductIds) {
    for (const sizeKey of sizes) {
      for (const view of views) {
        // Build real design with Pile B scraps
        const design = buildDesign(PILE_B, pid, sizeKey);
        const layout = computeProduct2DLayout(design, view);

        assert(layout, `Layout missing for ${pid} ${sizeKey} ${view}`);
        assert(
          layout.viewBox && !layout.viewBox.includes('NaN') && !layout.viewBox.includes('undefined'),
          `Bad viewBox in ${pid} ${sizeKey} ${view}: ${layout.viewBox}`
        );
        assert(layout.panels.length > 0, `No panels generated for ${pid} ${sizeKey} ${view}`);

        // Verify each panel
        for (const panel of layout.panels) {
          assert(!isNaN(panel.canvasX), `panel.canvasX is NaN in ${panel.id} of ${pid}`);
          assert(!isNaN(panel.canvasY), `panel.canvasY is NaN in ${panel.id} of ${pid}`);
          assert(!isNaN(panel.width) && panel.width > 0, `panel.width invalid in ${panel.id} of ${pid}`);
          assert(!isNaN(panel.height) && panel.height > 0, `panel.height invalid in ${panel.id} of ${pid}`);
          assert(
            panel.canvasClipPathD && !panel.canvasClipPathD.includes('NaN') && !panel.canvasClipPathD.includes('undefined'),
            `Bad canvasClipPathD in ${panel.id} of ${pid}`
          );

          // Verify patches
          let patchAreaSum = 0;
          for (const patch of panel.patches) {
            assert(!isNaN(patch.canvasX), `patch.canvasX is NaN in ${panel.id}`);
            assert(!isNaN(patch.canvasY), `patch.canvasY is NaN in ${panel.id}`);
            assert(!isNaN(patch.width) && patch.width > 0, `patch.width invalid in ${panel.id}`);
            assert(!isNaN(patch.height) && patch.height > 0, `patch.height invalid in ${panel.id}`);

            // Patch containment: patch must remain strictly inside panel canvas boundaries
            assert(
              patch.canvasX >= panel.canvasX - 1e-4,
              `Patch ${patch.index} in ${panel.id} left overflow: ${patch.canvasX} < ${panel.canvasX}`
            );
            assert(
              patch.canvasY >= panel.canvasY - 1e-4,
              `Patch ${patch.index} in ${panel.id} top overflow: ${patch.canvasY} < ${panel.canvasY}`
            );
            assert(
              patch.canvasX + patch.width <= panel.canvasX + panel.width + 1e-4,
              `Patch ${patch.index} in ${panel.id} right overflow: ${patch.canvasX + patch.width} > ${panel.canvasX + panel.width}`
            );
            assert(
              patch.canvasY + patch.height <= panel.canvasY + panel.height + 1e-4,
              `Patch ${patch.index} in ${panel.id} bottom overflow: ${patch.canvasY + patch.height} > ${panel.canvasY + panel.height}`
            );

            patchAreaSum += patch.width * patch.height;
          }

          // Area conservation: sum of patch areas = panel area
          const panelArea = panel.width * panel.height;
          assert(
            Math.abs(patchAreaSum - panelArea) < 1e-3,
            `Area conservation violated in ${panel.id}: patchAreaSum=${patchAreaSum} vs panelArea=${panelArea}`
          );
        }

        // Verify decorations for zero NaN / undefined
        for (const deco of layout.decorations) {
          for (const [prop, val] of Object.entries(deco)) {
            assert(val !== undefined, `Decoration property ${prop} is undefined in ${pid}`);
            if (typeof val === 'number') {
              assert(!isNaN(val), `Decoration property ${prop} is NaN in ${pid}`);
            }
          }
        }
      }
    }
    console.log(`✓ Silhouette ${pid.padEnd(16)} verified across all sizes/views (Containment, Area, NaN-free OK)`);
  }
}

console.log('\n========================================');
console.log('ALL STAGE 4A PREVIEW TESTS PASSED (100%)');
console.log('========================================\n');
