// src/utils/test_undefined_identifiers.js
// Regression test to guarantee no undefined identifiers (ReferenceErrors like handlePrint)
// exist in src/screens and src/components. Uses project oxlint with no-undef rule.

import { execSync } from 'node:child_process';
import assert from 'node:assert';

console.log('====================================================');
console.log('🔍 RUNNING UNDEFINED IDENTIFIERS CHECK (oxlint no-undef)');
console.log('====================================================\n');

try {
  const output = execSync('npx oxlint -A all -D no-undef src/screens src/components', {
    encoding: 'utf8',
    stdio: 'pipe',
  });
  console.log(output.trim());
  console.log('  ✅ PASS: 0 undefined identifiers found in src/screens and src/components');
} catch (err) {
  console.error('❌ Undefined identifiers detected in src/screens or src/components:\n');
  console.error(err.stdout || err.stderr || err.message);
  process.exit(1);
}

console.log('\n====================================================');
console.log('🎉 ALL UNDEFINED IDENTIFIER CHECKS PASSED PERFECTLY!');
console.log('====================================================\n');
