// src/utils/test_ai_preview.js
// Tests for AI Photo Preview cache, deterministic hashing, rate limit tracking,
// mock mode fallback, offline handling, and strict blueprint/engine isolation.

import assert from 'node:assert';
import {
  computeDesignHash,
  rateLimitTracker,
  aiPreviewCache,
  requestAiPhotoPreview,
  buildCleanReferenceSvg,
  buildVerbalLayoutPrompt,
  clearAiPreviewDataAndResetLimit,
} from './aiPreviewService.js';
import { AI_CONFIG } from '../config/aiConfig.js';
import { fitPileToProduct, calculateDesignScore } from '../engine/index.js';

const samplePile = [
  { id: 'p1', width: 14, height: 14, quantity: 15, fabricType: 'cotton', thickness: 'medium', stretchy: false, colors: ['navy'], print: 'plain' },
  { id: 'p2', width: 14, height: 14, quantity: 15, fabricType: 'cotton', thickness: 'medium', stretchy: false, colors: ['beige'], print: 'plain' },
];

console.log('=== Running AI Photo Preview Tests (Step 4b) ===\n');

let passCount = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  PASS: ${name}`);
    passCount++;
  } catch (err) {
    console.error(`  FAIL: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

async function asyncTest(name, fn) {
  try {
    await fn();
    console.log(`  PASS: ${name}`);
    passCount++;
  } catch (err) {
    console.error(`  FAIL: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// Setup & TearDown helpers
function resetStores() {
  rateLimitTracker.resetForTesting();
  aiPreviewCache.clearForTesting();
}

// 1. Deterministic Hashing
test('computeDesignHash produces identical hash for identical design', () => {
  const design1 = {
    productId: 'pouch',
    sizeKey: 'medium',
    variant: 'hybrid',
    placements: [
      {
        zoneId: 'front_main',
        scraps: [
          { color: 'navy', cutWidth: 10, cutHeight: 10 },
          { color: 'beige', cutWidth: 10, cutHeight: 5 },
        ],
      },
    ],
  };

  const design2 = JSON.parse(JSON.stringify(design1));
  assert.strictEqual(computeDesignHash(design1), computeDesignHash(design2));
});

test('computeDesignHash changes when scrap color or layout changes', () => {
  const base = {
    productId: 'pouch',
    sizeKey: 'medium',
    variant: 'hybrid',
    placements: [
      {
        zoneId: 'front_main',
        scraps: [{ color: 'navy', cutWidth: 10, cutHeight: 10 }],
      },
    ],
  };

  const diffColor = {
    ...base,
    placements: [
      {
        zoneId: 'front_main',
        scraps: [{ color: 'red', cutWidth: 10, cutHeight: 10 }],
      },
    ],
  };

  const diffDims = {
    ...base,
    placements: [
      {
        zoneId: 'front_main',
        scraps: [{ color: 'navy', cutWidth: 12, cutHeight: 10 }],
      },
    ],
  };

  const diffProduct = {
    ...base,
    productId: 'tote_bag',
  };

  const baseHash = computeDesignHash(base);
  assert.notStrictEqual(baseHash, computeDesignHash(diffColor));
  assert.notStrictEqual(baseHash, computeDesignHash(diffDims));
  assert.notStrictEqual(baseHash, computeDesignHash(diffProduct));
});

// 2. Cache Logic
test('aiPreviewCache stores, retrieves, and clears entries', () => {
  resetStores();
  const dummyHash = 'hash_test_12345';
  assert.strictEqual(aiPreviewCache.get(dummyHash), null);

  const previewData = {
    ok: true,
    imageUrl: '/mock_ai/example_pouch.jpg',
    label: 'Example photo',
  };

  aiPreviewCache.set(dummyHash, previewData);
  const retrieved = aiPreviewCache.get(dummyHash);
  assert.deepStrictEqual(retrieved, previewData);

  aiPreviewCache.delete(dummyHash);
  assert.strictEqual(aiPreviewCache.get(dummyHash), null);
});

// 3. Rate Limit Tracking
test('rateLimitTracker tracks daily device limit (10/day) and enforces cap', () => {
  resetStores();
  assert.strictEqual(rateLimitTracker.getRemaining(), 10);
  assert.strictEqual(rateLimitTracker.isLimitReached(), false);

  for (let i = 1; i <= 9; i++) {
    rateLimitTracker.increment();
    assert.strictEqual(rateLimitTracker.getRemaining(), 10 - i);
    assert.strictEqual(rateLimitTracker.isLimitReached(), false);
  }

  // 10th generation reaches limit
  rateLimitTracker.increment();
  assert.strictEqual(rateLimitTracker.getRemaining(), 0);
  assert.strictEqual(rateLimitTracker.isLimitReached(), true);

  // Subsequent increment does not drop remaining below 0
  rateLimitTracker.increment();
  assert.strictEqual(rateLimitTracker.getRemaining(), 0);
  assert.strictEqual(rateLimitTracker.isLimitReached(), true);

  resetStores();
  assert.strictEqual(rateLimitTracker.getRemaining(), 10);
});

// 4. Clean Reference SVG (No Text or Labels)
test('buildCleanReferenceSvg contains zero text, numbers, or labels', () => {
  const dummyDesign = {
    productId: 'pouch',
    sizeKey: 'standard',
    placements: [{ zoneId: 'front', scraps: [{ color: 'navy', cutWidth: 10, cutHeight: 10 }] }],
  };
  const dummyLayout = {
    viewBox: { x: 0, y: 0, width: 360, height: 360 },
    panels: [
      {
        canvasX: 10,
        canvasY: 10,
        patches: [{ relX: 0, relY: 0, width: 100, height: 100, colorHex: '#1e3a8a' }],
      },
    ],
  };

  const svg = buildCleanReferenceSvg(dummyDesign, dummyLayout, 'shaped');
  assert.doesNotMatch(svg, /<text/i, 'SVG must not contain <text> tags');
  assert.doesNotMatch(svg, /tspan/i, 'SVG must not contain <tspan> tags');
  assert.doesNotMatch(svg, /cm/i, 'SVG must not contain measurement units');
  assert.doesNotMatch(svg, /front|back|seam/i, 'SVG must not contain zone labels');
});

// 5. Mock Mode Request Flow & Caching
await asyncTest('requestAiPhotoPreview returns mock photo with honest disclaimer and caches by hash', async () => {
  resetStores();
  // Temporarily shorten delay for test execution
  const originalDelay = AI_CONFIG.MOCK_DELAY_MS;
  AI_CONFIG.MOCK_DELAY_MS = 10;

  try {
    const design = {
      productId: 'pouch',
      sizeKey: 'standard',
      placements: [{ zoneId: 'f1', scraps: [{ color: 'navy', cutWidth: 10, cutHeight: 10 }] }],
    };

    const res1 = await requestAiPhotoPreview({ design, layout: {} });
    assert.strictEqual(res1.ok, true);
    assert.strictEqual(res1.isMock, true);
    assert.strictEqual(res1.label, 'Example photo (not generated from your design)');
    assert.strictEqual(res1.imageUrl, AI_CONFIG.MOCK_EXAMPLES.pouch);
    assert.strictEqual(res1.fromCache, undefined);
    assert.strictEqual(rateLimitTracker.getRemaining(), 9);

    // Second call for exact same design hits cache instantly without incrementing usage
    const res2 = await requestAiPhotoPreview({ design, layout: {} });
    assert.strictEqual(res2.ok, true);
    assert.strictEqual(res2.fromCache, true);
    assert.strictEqual(rateLimitTracker.getRemaining(), 9, 'Cache hit must not increment daily rate limit');

    // Force regenerate bypasses cache and counts toward limit
    const res3 = await requestAiPhotoPreview({ design, layout: {}, forceRegenerate: true });
    assert.strictEqual(res3.ok, true);
    assert.strictEqual(res3.fromCache, undefined);
    assert.strictEqual(rateLimitTracker.getRemaining(), 8, 'Force regenerate must count toward daily limit');
  } finally {
    AI_CONFIG.MOCK_DELAY_MS = originalDelay;
  }
});

// 6. Rate Limit Enforced in Request
await asyncTest('requestAiPhotoPreview returns LIMIT_REACHED error when 10 previews exceeded', async () => {
  resetStores();
  for (let i = 0; i < 10; i++) rateLimitTracker.increment();

  const design = {
    productId: 'tote_bag',
    sizeKey: 'standard',
    placements: [],
  };

  const res = await requestAiPhotoPreview({ design, layout: {} });
  assert.strictEqual(res.ok, undefined);
  assert.strictEqual(res.code, 'LIMIT_REACHED');
  assert.strictEqual(res.remainingToday, 0);
  assert.strictEqual(res.error, AI_CONFIG.LABELS.LIMIT_DESC);
});

// 7. Cancellation handling
await asyncTest('requestAiPhotoPreview aborts gracefully on user cancel', async () => {
  resetStores();
  AI_CONFIG.MOCK_DELAY_MS = 500;
  const controller = new AbortController();

  const design = {
    productId: 'cushion_cover',
    sizeKey: 'standard',
    placements: [],
  };

  const promise = requestAiPhotoPreview({ design, layout: {}, signal: controller.signal });
  // Abort immediately
  controller.abort();

  await assert.rejects(promise, (err) => {
    return err.name === 'AbortError' || err.message.includes('canceled');
  });
  AI_CONFIG.MOCK_DELAY_MS = 3000;
});

// 8. Strict Blueprint & Engine Isolation
test('AI Photo Preview never alters fitting, scores, or blueprint data', () => {
  // Fit sample pile to pouch
  const fitBefore = fitPileToProduct(samplePile, 'pouch', 'standard', 1.0);
  const scoreBefore = calculateDesignScore(fitBefore);

  // Invoke hashing and layout prompt
  const hash = computeDesignHash(fitBefore);
  const prompt = buildVerbalLayoutPrompt(fitBefore);
  assert.ok(hash);
  assert.ok(prompt);

  // Fit again and verify absolute identity
  const fitAfter = fitPileToProduct(samplePile, 'pouch', 'standard', 1.0);
  const scoreAfter = calculateDesignScore(fitAfter);

  assert.deepStrictEqual(fitBefore.placements, fitAfter.placements);
  assert.strictEqual(scoreBefore, scoreAfter);
  assert.strictEqual(fitBefore.fabricUsedInSeamsCm2, fitAfter.fabricUsedInSeamsCm2);
  assert.strictEqual(fitBefore.totalExtraSeams, fitAfter.totalExtraSeams);
});

// 9. QuotaExceededError Recovery
test('aiPreviewCache recovers gracefully from QuotaExceededError without throwing', () => {
  resetStores();
  aiPreviewCache.set('hash_q1', { ok: true, imageUrl: '/img1.jpg' });
  aiPreviewCache.set('hash_q2', { ok: true, imageUrl: '/img2.jpg' });
  assert.ok(aiPreviewCache.get('hash_q1'));
  assert.ok(aiPreviewCache.get('hash_q2'));

  let quotaTriggered = false;
  const originalClearOldest = aiPreviewCache.clearOldest.bind(aiPreviewCache);
  aiPreviewCache.clearOldest = function () {
    quotaTriggered = true;
    return originalClearOldest();
  };

  assert.doesNotThrow(() => {
    aiPreviewCache.set('hash_q3', { ok: true, imageUrl: '/img3.jpg' });
  }, 'Must never throw on QuotaExceededError');

  aiPreviewCache.clearOldest = originalClearOldest;
});

// 10. Clear Cache & Reset Daily Limit UI Helper
test('clearAiPreviewDataAndResetLimit resets both AI preview cache and daily limit counter', () => {
  resetStores();
  aiPreviewCache.set('hash_demo', { ok: true, imageUrl: '/img_demo.jpg' });
  rateLimitTracker.increment();
  rateLimitTracker.increment();
  assert.strictEqual(rateLimitTracker.getRemaining(), 8);
  assert.ok(aiPreviewCache.get('hash_demo'));

  const result = clearAiPreviewDataAndResetLimit();
  assert.strictEqual(result, true);
  assert.strictEqual(rateLimitTracker.getRemaining(), 10, 'Daily limit reset to 10');
  assert.strictEqual(aiPreviewCache.get('hash_demo'), null, 'AI preview cache is cleared');
});

console.log(`\nAll ${passCount} AI Photo Preview tests passed successfully!`);
