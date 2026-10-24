import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

console.log('====================================================');
console.log('REWEAR SECRET SCANNER');
console.log('====================================================');

function runGit(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8' }).trim();
  } catch (e) {
    return '';
  }
}

// 1. Check for tracked sensitive file extensions
const keystoreCheck = runGit('git ls-files "*.keystore" "*.jks" "*.p12" "*.key" "*.pem" "*.cert" "*.der"');
console.log('1. Tracked Keystores / Certificates / Keys:');
console.log(keystoreCheck ? `   ⚠️ FOUND: ${keystoreCheck}` : '   [OK] None found in tracked files');

// 2. Check for tracked env files
const envCheck = runGit('git ls-files ".env" ".env.*"');
console.log('\n2. Tracked .env files:');
console.log(envCheck ? `   Files: ${envCheck}` : '   [OK] None found');

// 3. Scan for Google Gemini API key regex (AIzaSy followed by 33 base64 characters)
const aizaCheck = runGit('git grep -n -E "AIzaSy[A-Za-z0-9_-]{33}"');
console.log('\n3. Leaked Gemini API keys (AIzaSy...):');
console.log(aizaCheck ? `   ⚠️ LEAK DETECTED:\n${aizaCheck}` : '   [OK] Zero Gemini API keys found in codebase');

// 4. Scan for hardcoded passwords or bearer tokens
const pwCheck = runGit('git grep -i -n -E "password\\s*=\\s*[\'\\"][^$\'\\"]+[\'\\"]"');
console.log('\n4. Hardcoded password assignments:');
console.log(pwCheck ? `   ⚠️ Review needed:\n${pwCheck}` : '   [OK] None found');

const tokenCheck = runGit('git grep -i -n -E "bearer\\s+[A-Za-z0-9_\\-\\.]+"');
console.log('\n5. Hardcoded Bearer tokens:');
console.log(tokenCheck ? `   ⚠️ Review needed:\n${tokenCheck}` : '   [OK] None found');

// 6. Scan git history for any previous accidental commits of AIzaSy
const historyCheck = runGit('git log -p -S "AIzaSy"');
console.log('\n6. Git History Scan for Gemini API keys:');
console.log(historyCheck ? `   ⚠️ FOUND IN COMMIT HISTORY:\n${historyCheck.substring(0, 300)}...` : '   [OK] Zero occurrences in full commit history');

// 7. Check local untracked files for stray keystores
const untrackedKeystores = runGit('git status --ignored -s | grep -E "\\.keystore|\\.jks"');
console.log('\n7. Untracked / Ignored Keystores:');
console.log(untrackedKeystores ? `   Ignored keystores present: ${untrackedKeystores}` : '   [OK] No keystore files present on disk');

console.log('====================================================');
console.log('SECRET SCAN FINISHED');
console.log('====================================================');
