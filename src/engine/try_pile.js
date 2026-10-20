/**
 * REWEAR STAGE 2 — TRY PILES DEMONSTRATION SCRIPT
 *
 * Plain-words explanation:
 * This script demonstrates the Stage 2 tailoring engine by testing three realistic
 * scrap fabric piles against three standard product templates (Medium Pouch,
 * Medium Cushion Cover, and Medium Quilted Tote Bag).
 *
 * Piles evaluated:
 * - Pile A: 20 plain cotton scraps (10x10 cm, navy) + 20 scraps (12x12 cm, beige)
 * - Pile B: 30 plain cotton scraps (14x14 cm) across 3 calm colours (navy, beige, grey)
 * - Pile C: 40 plain cotton scraps (8x8 cm) across 2 colours (navy, beige)
 *
 * For each combination, it prints:
 * 1. Fits (Yes / No)
 * 2. Patches per panel
 * 3. Design score (0 - 100)
 * 4. Fabric used in seams (Seam allowance lost in joins, in cm²)
 * 5. Fabric too small to reuse (Trim waste < 3cm, in cm²)
 * 6. Leftover pieces kept (Reusable offcuts >= 3cm + unused scraps)
 * 7. Quality warnings (e.g. small patch warning)
 * 8. Reason if it fails
 *
 * Run with:
 *   node src/engine/try_pile.js
 */

import { fitPileToProduct, calculateDesignScore } from './index.js';

// ---------------------------------------------------------------------------
// 1. Define the Made-Up Fabric Piles
// ---------------------------------------------------------------------------

// Pile A: 20 plain cotton scraps (medium thickness, non-stretchy) 10x10 cm navy + 20 scraps 12x12 cm beige
const pileA = [
  {
    id: 'pileA_navy',
    width: 10,
    height: 10,
    quantity: 20,
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
    colors: ['navy'],
    print: 'plain',
  },
  {
    id: 'pileA_beige',
    width: 12,
    height: 12,
    quantity: 20,
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
    colors: ['beige'],
    print: 'plain',
  },
];

// Pile B: 30 plain cotton scraps 14x14 cm, in 3 calm colours (navy, beige, grey)
const pileB = [
  {
    id: 'pileB_navy',
    width: 14,
    height: 14,
    quantity: 10,
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
    colors: ['navy'],
    print: 'plain',
  },
  {
    id: 'pileB_beige',
    width: 14,
    height: 14,
    quantity: 10,
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
    colors: ['beige'],
    print: 'plain',
  },
  {
    id: 'pileB_grey',
    width: 14,
    height: 14,
    quantity: 10,
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
    colors: ['grey'],
    print: 'plain',
  },
];

// Pile C: 40 plain cotton scraps 8x8 cm, in 2 colours (navy and beige)
const pileC = [
  {
    id: 'pileC_navy',
    width: 8,
    height: 8,
    quantity: 20,
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
    colors: ['navy'],
    print: 'plain',
  },
  {
    id: 'pileC_beige',
    width: 8,
    height: 8,
    quantity: 20,
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
    colors: ['beige'],
    print: 'plain',
  },
];

const piles = [
  { name: 'Pile A', desc: '20 @ 10x10 navy + 20 @ 12x12 beige', items: pileA },
  { name: 'Pile B', desc: '30 @ 14x14 (10 navy, 10 beige, 10 grey)', items: pileB },
  { name: 'Pile C', desc: '40 @ 8x8 (20 navy, 20 beige)', items: pileC },
];

const products = [
  { id: 'pouch', size: 'medium', label: 'Pouch (Medium)' },
  { id: 'cushion_cover', size: 'medium', label: 'Cushion Cover (Medium)' },
  { id: 'tote_bag', size: 'medium', label: 'Tote Bag (Medium)' },
];

// ---------------------------------------------------------------------------
// 2. Evaluation Helpers
// ---------------------------------------------------------------------------

function formatPatchesPerPanel(placements) {
  if (!placements || placements.length === 0) return 'None (did not fit)';

  // Summarize panels cleanly in plain language
  const panels = [];
  let tabCount = 0;
  let tabPatches = 0;

  placements.forEach((p) => {
    const patchCount = p.patchCount ?? (p.scraps ? p.scraps.length : 1);
    if (p.zoneName.includes('Side Tab') || p.zoneName.includes('Tabs')) {
      tabCount++;
      tabPatches += patchCount;
    } else {
      let label = p.zoneName;
      if (label.includes('Front Lower')) label = 'Front';
      else if (label.includes('Back Full')) label = 'Back';
      else if (label.includes('Upper Accent')) label = 'Upper Band';
      else if (label.includes('Front Main')) label = 'Front';
      else if (label.includes('Back Main')) label = 'Back';
      panels.push(`${label}: ${patchCount}`);
    }
  });

  if (tabCount > 0) {
    panels.push(`Tabs: ${tabPatches / tabCount} each`);
  }

  const totalPatches = placements.reduce((sum, p) => sum + (p.patchCount ?? (p.scraps ? p.scraps.length : 1)), 0);
  return `${panels.join(', ')} (${totalPatches} patches total)`;
}

function countTotalPieces(items) {
  if (!items) return 0;
  return items.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
}

function runEvaluations() {
  const summaryRows = [];

  for (const p of piles) {
    for (const prod of products) {
      const result = fitPileToProduct(p.items, prod.id, prod.size);
      const score = result.fits ? calculateDesignScore(result) : 0;

      const patchesSummary = formatPatchesPerPanel(result.placements);
      const usedInSeams = result.fits ? `${result.fabricUsedInSeamsCm2 || 0} cm²` : '0 cm²';
      const tooSmallToReuse = result.fits ? `${result.fabricTooSmallToReuseCm2 || 0} cm²` : '0 cm²';

      const leftoversCount = result.fits
        ? countTotalPieces(result.leftovers)
        : countTotalPieces(p.items);
      const leftoversKept = result.fits
        ? `${leftoversCount} pieces`
        : `${leftoversCount} pieces (entire pile kept)`;

      const warningText = result.warnings && result.warnings.length > 0
        ? result.warnings.join(' ')
        : (result.fits ? 'None' : '-');

      const failureReason = result.fits ? '-' : (result.missing || 'Does not fit');

      summaryRows.push({
        pileName: p.name,
        pileDesc: p.desc,
        productLabel: prod.label,
        fits: result.fits ? 'YES' : 'NO',
        patchesPerPanel: patchesSummary,
        designScore: result.fits ? `${score}/100` : '0/100',
        usedInSeams,
        tooSmallToReuse,
        leftoversKept,
        warningText,
        failureReason,
      });
    }
  }

  return summaryRows;
}

// ---------------------------------------------------------------------------
// 3. Execution & Output Display
// ---------------------------------------------------------------------------

const rows = runEvaluations();

console.log('\n========================================================================================================================');
console.log('                                      REWEAR STAGE 2 — TRY PILE EVALUATION REPORT                                       ');
console.log('========================================================================================================================\n');

// Standard Node console.table for structured viewing
const consoleTableData = rows.map((r) => ({
  'Pile': r.pileName,
  'Product': r.productLabel,
  'Fits': r.fits,
  'Patches per panel': r.patchesPerPanel,
  'Design Score': r.designScore,
  'Fabric in Seams': r.usedInSeams,
  'Too Small to Reuse': r.tooSmallToReuse,
  'Leftovers Kept': r.leftoversKept,
  'Reason / Notes': r.fits === 'YES'
    ? (r.warningText !== 'None' ? r.warningText : 'Clean fit')
    : (r.failureReason.length > 50 ? r.failureReason.slice(0, 47) + '...' : r.failureReason),
}));
console.table(consoleTableData);

// Markdown table output for documentation and clear copy-pasting
console.log('\n### Summary Table (Markdown):\n');
console.log('| Pile | Product | Fits? | Patches per panel | Design Score | Fabric used in seams | Fabric too small to reuse | Leftover pieces kept | Reason if fails / Quality Note |');
console.log('| :--- | :--- | :---: | :--- | :---: | :---: | :---: | :--- | :--- |');
rows.forEach((r) => {
  const note = r.fits === 'YES'
    ? (r.warningText !== 'None' ? `⚠️ Warning: ${r.warningText}` : 'Clean fit')
    : r.failureReason;
  console.log(`| **${r.pileName}** | ${r.productLabel} | **${r.fits}** | ${r.patchesPerPanel} | ${r.designScore} | ${r.usedInSeams} | ${r.tooSmallToReuse} | ${r.leftoversKept} | ${note} |`);
});

console.log('\n------------------------------------------------------------------------------------------------------------------------');
console.log('DETAILED BREAKDOWN BY COMBINATION:');
console.log('------------------------------------------------------------------------------------------------------------------------\n');

rows.forEach((r, idx) => {
  console.log(`[Combination ${idx + 1}] ${r.pileName} (${r.pileDesc}) ➔ ${r.productLabel}`);
  console.log(`  • Fits:                      ${r.fits}`);
  console.log(`  • Patches per panel:         ${r.patchesPerPanel}`);
  console.log(`  • Design score:              ${r.designScore}`);
  console.log(`  • Fabric used in seams:      ${r.usedInSeams}`);
  console.log(`  • Fabric too small to reuse: ${r.tooSmallToReuse}`);
  console.log(`  • Leftover pieces kept:      ${r.leftoversKept}`);
  if (r.warningText !== 'None' && r.warningText !== '-') {
    console.log(`  • Quality warning:           ${r.warningText}`);
  }
  if (r.fits === 'NO') {
    console.log(`  • Reason for failure:        ${r.failureReason}`);
  }
  console.log('');
});
