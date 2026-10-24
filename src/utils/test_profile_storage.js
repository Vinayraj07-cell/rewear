// src/utils/test_profile_storage.js
// Unit & Regression test suite for Safe Local Profile Storage (Task A20)

import assert from 'node:assert';
import {
  loadProfile,
  saveProfile,
  clearProfile,
  isFirstLaunch,
  setStorageImpl,
  resetStorageImpl,
  DATA_PRIVACY_NOTICE,
  PROFILE_STORAGE_KEY,
} from './profileStorage.js';

console.log('====================================================');
console.log('👤 RUNNING LOCAL PROFILE STORAGE TEST SUITE');
console.log('====================================================\n');

// Mock localStorage implementation
class MockStorage {
  constructor(shouldThrowOnSet = false) {
    this.store = {};
    this.shouldThrowOnSet = shouldThrowOnSet;
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    if (this.shouldThrowOnSet) {
      throw new Error('QuotaExceededError: localStorage full or blocked');
    }
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

// 1. Mandatory Privacy Notice Verification
console.log('--- 1. Mandatory Privacy Notice Verification ---');
assert.strictEqual(
  DATA_PRIVACY_NOTICE.en,
  'Your data stays on this phone',
  'English privacy notice must match specification'
);
assert.strictEqual(
  DATA_PRIVACY_NOTICE.te,
  'మీ డేటా ఈ ఫోన్‌లోనే ఉంటుంది',
  'Telugu privacy notice must match specification'
);
assert.strictEqual(
  DATA_PRIVACY_NOTICE.hi,
  'आपका डेटा इसी फोन पर सुरक्षित रहता है',
  'Hindi privacy notice must match specification'
);
console.log('  ✅ PASS: All 3 localized honesty notices verified: "Your data stays on this phone"');

// 2. Initial state: First launch detection
console.log('\n--- 2. First Launch Detection ---');
const mock1 = new MockStorage();
setStorageImpl(mock1);

assert.strictEqual(isFirstLaunch(), true, 'isFirstLaunch must be true when no profile exists');
assert.strictEqual(loadProfile(), null, 'loadProfile must return null initially');
console.log('  ✅ PASS: Correctly identifies first-launch state when storage is empty');

// 3. Save profile and retrieve
console.log('\n--- 3. Save & Retrieve Profile ---');
const saveResult = saveProfile({
  name: 'Lakshmi Tailors',
  shopName: 'Sri Sai Fashions',
  phoneNumber: '9876543210',
  lang: 'te',
});
assert.strictEqual(saveResult.success, true);
assert.strictEqual(saveResult.profile.name, 'Lakshmi Tailors');
assert.strictEqual(saveResult.profile.shopName, 'Sri Sai Fashions');
assert.strictEqual(saveResult.profile.phoneNumber, '9876543210');
assert.strictEqual(saveResult.profile.lang, 'te');

const loaded = loadProfile();
assert.ok(loaded, 'Profile must be loaded');
assert.strictEqual(loaded.name, 'Lakshmi Tailors');
assert.strictEqual(loaded.shopName, 'Sri Sai Fashions');
assert.strictEqual(loaded.lang, 'te');
assert.strictEqual(isFirstLaunch(), false, 'isFirstLaunch must be false once saved');
console.log('  ✅ PASS: Profile successfully saved and loaded with all fields intact');

// 4. Safe failure fallback when localStorage throws
console.log('\n--- 4. Safe Storage Failure Fallback ---');
const brokenStorage = new MockStorage(true); // throws on setItem
setStorageImpl(brokenStorage);

let saveThrew = false;
try {
  const fallbackRes = saveProfile({
    name: 'Anil Kumar',
    shopName: 'Anil Boutique',
    lang: 'hi',
  });
  assert.strictEqual(fallbackRes.success, false);
  assert.strictEqual(fallbackRes.profile.name, 'Anil Kumar');
  assert.ok(fallbackRes.error.includes('QuotaExceededError'));
} catch {
  saveThrew = true;
}
assert.strictEqual(saveThrew, false, 'saveProfile must never throw even if storage fails');
console.log('  ✅ PASS: QuotaExceededError/storage failure gracefully handled without crashing app');

// 5. Clear Profile and Wipe Storage
console.log('\n--- 5. Clear Profile & Data Wipe ---');
const mock2 = new MockStorage();
setStorageImpl(mock2);
saveProfile({ name: 'Test User', lang: 'en' });
mock2.setItem('rewear_pieces', JSON.stringify([{ id: 1 }]));

assert.ok(mock2.getItem(PROFILE_STORAGE_KEY));
assert.ok(mock2.getItem('rewear_pieces'));

const cleared = clearProfile();
assert.strictEqual(cleared, true);
assert.strictEqual(mock2.getItem(PROFILE_STORAGE_KEY), null);
assert.strictEqual(mock2.getItem('rewear_pieces'), null);
assert.strictEqual(isFirstLaunch(), true);
console.log('  ✅ PASS: clearProfile cleanly wipes profile and app data in safe try/catch');

// Reset implementation
resetStorageImpl();

console.log('\n====================================================');
console.log('🎉 ALL 5 LOCAL PROFILE STORAGE TESTS PASSED PERFECTLY!');
console.log('====================================================\n');
