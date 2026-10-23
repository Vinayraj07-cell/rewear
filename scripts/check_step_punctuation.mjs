import { buildTailorBlueprint } from '../src/utils/tailorBlueprintData.js';
import { SAMPLE_PILES } from '../src/utils/pileHelpers.js';
import { buildDesign } from '../src/engine/index.js';

const products = ['sandy_skirt', 'aaron_tank', 'child_top', 'kids_frock', 'tote_bag', 'pouch', 'cushion_cover'];
for (const p of products) {
  const size = p === 'sandy_skirt' ? 'waist54' : (p === 'aaron_tank' || p === 'child_top' ? 'chest56' : (p === 'kids_frock' ? '0-1y' : 'small'));
  const design = buildDesign(SAMPLE_PILES.neutral.pieces, p, size);
  const bp = buildTailorBlueprint(design);
  console.log(`=== ${p} (${bp.stitchingSteps.length} steps) ===`);
  for (const s of bp.stitchingSteps) {
    const text = s.instruction.trim();
    const lastChar = text.slice(-1);
    const endsWithPunct = ['.', '!', '?'].includes(lastChar);
    console.log(`Step ${s.stepNumber}: [${endsWithPunct ? 'OK' : 'FAIL: "' + lastChar + '"'}] ${text}`);
  }
}
