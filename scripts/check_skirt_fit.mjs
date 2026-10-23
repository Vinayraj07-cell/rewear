import { SAMPLE_PILES } from '../src/utils/pileHelpers.js';
import { buildDesign } from '../src/engine/index.js';

console.log('================================================================================');
console.log('CIRCLE SKIRT (16 GORES) FIT AUDIT ON REAL SAMPLE PILES');
console.log('================================================================================\n');

for (const [pileKey, pile] of Object.entries(SAMPLE_PILES)) {
  const design = buildDesign(pile.pieces, 'sandy_skirt', 'waist54');
  const placements = Array.isArray(design.placements) ? design.placements : Object.values(design.placements || {});
  const placedGores = placements.filter(p => p.zoneId && p.zoneId.startsWith('skirt_gore'));
  const wbPlacement = placements.find(p => p.zoneId === 'waistband');
  const totalScraps = placements.reduce((acc, p) => acc + (p.scraps ? p.scraps.length : (p.scrapsUsed ? p.scrapsUsed.length : 0)), 0);

  console.log(`Pile: ${pile.name} (Total scraps available: ${pile.pieces.reduce((sum, p) => sum + (p.quantity || 1), 0)})`);
  console.log(`- Fits: ${design.success && placedGores.length === 16 ? 'YES' : 'NO'}`);
  console.log(`- Placed zones: ${placements.length} / 17 (Gores placed: ${placedGores.length}/16, Waistband: ${wbPlacement ? 'placed (solid fabric yardage)' : 'missing'})`);
  console.log(`- Scraps used: ${totalScraps}`);
  console.log(`- Extra seams: ${design.totalExtraSeams || 0}`);
  console.log(`- Labour penalty: ${design.laborPenalty || 0}`);
  console.log(`- Sewing time: ${design.sewingTimeMin || 0} min`);
  console.log(`- Design score: ${design.designScore}`);
  if (design.error) console.log(`- Error: ${design.error}`);
  console.log(`- Missing details: ${placedGores.length < 16 ? `Missing ${16 - placedGores.length} gores (requires ${ (16 - placedGores.length) * 3 } more 14x14 cm scraps)` : 'None'}`);
  console.log('');
}
