// src/utils/test_ai_suggestion.js
// Regression test suite for AI suggestion service (Task A8 / Task A11 lite)

import assert from 'node:assert';
import { getAiProductSuggestion, AI_SUGGESTION_LABEL } from './aiSuggestionService.js';

console.log('====================================================');
console.log('🤖 RUNNING AI SUGGESTION SERVICE TEST SUITE');
console.log('====================================================\n');

// 1. Safe handling of empty, null, and undefined inputs
console.log('--- 1. Empty / Null Safety ---');
const emptyRes1 = getAiProductSuggestion([]);
assert.strictEqual(emptyRes1.label, AI_SUGGESTION_LABEL);
assert.strictEqual(emptyRes1.totalScrapsCount, 0);
assert.ok(emptyRes1.productName, 'Returns fallback product name');

const emptyRes2 = getAiProductSuggestion(null);
assert.strictEqual(emptyRes2.label, AI_SUGGESTION_LABEL);
assert.strictEqual(emptyRes2.totalScrapsCount, 0);

const emptyRes3 = getAiProductSuggestion(undefined);
assert.strictEqual(emptyRes3.label, AI_SUGGESTION_LABEL);
console.log('  ✅ PASS: Empty, null, and undefined inputs handled safely without throwing');

// 2. Strict label requirement verification
console.log('\n--- 2. Strict Honesty Label Enforcement ---');
const samplePile = [
  { id: 'p1', width: 25, height: 25, quantity: 4, fabricFeel: 'denim', included: true },
  { id: 'p2', width: 30, height: 20, quantity: 4, fabricFeel: 'cotton', included: true },
];
const suggestion1 = getAiProductSuggestion(samplePile, 'en');
assert.strictEqual(
  suggestion1.label,
  'AI suggestion - Tailor always confirms',
  'Must strictly match specified honesty label'
);
assert.strictEqual(suggestion1.productId, 'tote_bag');
assert.strictEqual(suggestion1.totalScrapsCount, 8);
console.log('  ✅ PASS: Strict label "AI suggestion - Tailor always confirms" verified');

// 3. Medium pile recommendation (pouch)
console.log('\n--- 3. Medium Pile Heuristic (Pouch) ---');
const mediumPile = [
  { id: 'm1', width: 20, height: 20, quantity: 4, fabricFeel: 'cotton', included: true },
  { id: 'm2', width: 15, height: 15, quantity: 2, fabricFeel: 'cotton', included: true },
];
const suggestion2 = getAiProductSuggestion(mediumPile, 'en');
assert.strictEqual(suggestion2.label, AI_SUGGESTION_LABEL);
assert.strictEqual(suggestion2.productId, 'pouch');
console.log(`  ✅ PASS: Medium pile correctly suggests "${suggestion2.productName}"`);

// 4. Small leftover pile (scrunchie / zero waste)
console.log('\n--- 4. Small Leftover Pile (Zero Waste) ---');
const smallPile = [
  { id: 's1', width: 10, height: 10, quantity: 2, fabricFeel: 'cotton', included: true },
];
const suggestion3 = getAiProductSuggestion(smallPile, 'hi');
assert.strictEqual(suggestion3.label, AI_SUGGESTION_LABEL);
assert.strictEqual(suggestion3.productId, 'scrunchie');
assert.ok(suggestion3.reason.length > 0);
console.log(`  ✅ PASS: Small pile correctly suggests "${suggestion3.productName}" with localized reason`);

// 5. Excluded pieces respect
console.log('\n--- 5. Excluded Pieces Filtering ---');
const mixedIncludedPile = [
  { id: 'x1', width: 50, height: 50, quantity: 1, included: false },
  { id: 'x2', width: 10, height: 10, quantity: 1, included: true },
];
const suggestion4 = getAiProductSuggestion(mixedIncludedPile, 'te');
assert.strictEqual(suggestion4.totalScrapsCount, 1);
assert.strictEqual(suggestion4.productId, 'scrunchie');
console.log('  ✅ PASS: Excluded scraps are safely ignored in suggestion calculations');

console.log('\n====================================================');
console.log('🎉 ALL 5 AI SUGGESTION TESTS PASSED PERFECTLY!');
console.log('====================================================\n');
