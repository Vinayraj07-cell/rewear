// src/components/test_error_boundary.js
// Regression test suite for ErrorBoundary component (Stage 6 / Q12c)

import assert from 'node:assert';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ErrorBoundary } from './ErrorBoundary.js';

function pass(msg) {
  console.log(`  ✅ PASS: ${msg}`);
}

console.log('====================================================');
console.log('🛡️  RUNNING ERROR BOUNDARY REGRESSION TEST SUITE');
console.log('====================================================\n');

// 1. Static getDerivedStateFromError
console.log('--- 1. getDerivedStateFromError state transition ---');
const testError = new Error('Simulated crash in tailor blueprint');
const newState = ErrorBoundary.getDerivedStateFromError(testError);
assert.strictEqual(newState.hasError, true, 'hasError must be set to true');
assert.strictEqual(newState.error, testError, 'error object must be stored in state');
pass('ErrorBoundary.getDerivedStateFromError returns { hasError: true, error }');

// 2. Normal rendering (No error)
console.log('\n--- 2. Healthy Child Rendering ---');
const healthyElement = React.createElement(
  ErrorBoundary,
  null,
  React.createElement('div', { id: 'child-content' }, 'Healthy Content')
);
const healthyHtml = renderToString(healthyElement);
assert(healthyHtml.includes('Healthy Content'), 'Must render children when no error exists');
assert(!healthyHtml.includes('Application Crash Detected'), 'Must not render crash UI when healthy');
pass('ErrorBoundary renders children normally when healthy');

// 3. Fallback Crash UI Rendering
console.log('\n--- 3. Crash Fallback UI Verification ---');
const boundaryInstance = new ErrorBoundary({});
boundaryInstance.state = {
  hasError: true,
  error: new Error('ReferenceError: Buffer is not defined in WebView'),
  errorInfo: { componentStack: 'at TailorBlueprintScreen\nat App' },
};
const crashHtml = renderToString(boundaryInstance.render());

assert(crashHtml.includes('Application Crash Detected'), 'Crash UI must display title banner');
assert(crashHtml.includes('ReferenceError: Buffer is not defined in WebView'), 'Crash UI must display exact error message');
assert(crashHtml.includes('Back to Home'), 'Crash UI must have Back to Home button');
assert(crashHtml.includes('Reload'), 'Crash UI must have Reload button');
pass('ErrorBoundary renders detailed readable error diagnostics and Back to Home button');

// 4. Recovery Callback on Reset
console.log('\n--- 4. Recovery Reset Handling ---');
let resetCalled = false;
const recoveringBoundary = new ErrorBoundary({
  onReset: () => {
    resetCalled = true;
  },
});
recoveringBoundary.state = {
  hasError: true,
  error: testError,
  errorInfo: null,
};
recoveringBoundary.handleBackHome();
assert.strictEqual(recoveringBoundary.state.hasError, false, 'hasError must reset to false');
assert.strictEqual(recoveringBoundary.state.error, null, 'error must reset to null');
assert.strictEqual(resetCalled, true, 'onReset callback must be invoked');
pass('handleBackHome resets error state and executes onReset callback');

console.log('\n====================================================');
console.log('🎉 ALL ERROR BOUNDARY TESTS PASSED PERFECTLY!');
console.log('====================================================\n');
