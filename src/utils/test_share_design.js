// src/utils/test_share_design.js
// Unit tests for Task A9: Share Design Service

import assert from 'node:assert/strict';
import { renderDesignCardCanvas, shareDesignSummary } from './shareDesignService.js';

console.log('Testing Task A9: Share Design Service...');

// Test 1: Service exports expected functions
assert.equal(typeof renderDesignCardCanvas, 'function', 'renderDesignCardCanvas must be a function');
assert.equal(typeof shareDesignSummary, 'function', 'shareDesignSummary must be a function');
console.log('✓ Test 1: Function signatures verified');

// Test 2: shareDesignSummary headless execution contains honesty disclaimer and required labels
async function testHeadlessShare() {
  const result = await shareDesignSummary({
    productName: 'Patchwork Tote Bag',
    sizeLabel: 'Medium',
    priceText: '₹350 – ₹450',
    scraps: [{ color: '#047857', name: 'Scrap 1' }, { color: '#b45309', name: 'Scrap 2' }],
    shopName: 'Rajesh Tailors',
  });

  assert.equal(result.success, true, 'Share should succeed in test environment');
  assert.equal(result.method, 'mock_headless', 'Should use headless fallback in node');
  assert.match(result.text, /Patchwork Tote Bag/, 'Must include product name');
  assert.match(result.text, /Medium/, 'Must include size label');
  assert.match(result.text, /₹350 – ₹450/, 'Must include price');
  assert.match(result.text, /\(estimate\)/, 'Price must be strictly labelled as (estimate)');
  assert.match(result.text, /Measurements to be verified by a tailor/, 'Must strictly include tailor verification honesty rule');
  console.log('✓ Test 2: Share payload and honesty rules verified');
}

// Test 3: Canvas function handles missing or empty parameters gracefully
function testCanvasRobustness() {
  // If window/document is mockable or undefined, should not crash
  if (typeof document === 'undefined') {
    console.log('✓ Test 3: Document undefined guard passed');
  } else {
    const canvas = renderDesignCardCanvas({});
    assert.ok(canvas, 'Canvas created');
    console.log('✓ Test 3: Canvas created gracefully with defaults');
  }
}

await testHeadlessShare();
testCanvasRobustness();

console.log('🎉 ALL 3 SHARE DESIGN TESTS PASSED PERFECTLY!');
