// src/utils/profileStorage.js
// Stage 6 / Task A20: Safe Local Profile & First-Launch Storage
// Strictly on-device: No server, no password, all data stays on this phone.

export const PROFILE_STORAGE_KEY = 'rewear_local_profile';

export const DATA_PRIVACY_NOTICE = {
  en: 'Your data stays on this phone',
  te: 'మీ డేటా ఈ ఫోన్‌లోనే ఉంటుంది',
  hi: 'आपका डेटा इसी फोन पर सुरक्षित रहता है',
};

// Storage implementation provider (defaults to global window.localStorage)
let storageOverride = null;

export function setStorageImpl(customStorage) {
  storageOverride = customStorage;
}

export function resetStorageImpl() {
  storageOverride = null;
}

function getStorage() {
  if (storageOverride) return storageOverride;
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }
  return null;
}

/**
 * Loads the saved user profile from localStorage.
 * Always wraps in try/catch to protect against incognito/restricted storage.
 * 
 * @returns {Object|null}
 */
export function loadProfile() {
  try {
    const storage = getStorage();
    if (!storage) return null;
    const raw = storage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return parsed;
    }
    return null;
  } catch (err) {
    console.warn('[ProfileStorage] Could not load profile:', err?.message);
    return null;
  }
}

/**
 * Saves or updates the user profile in localStorage.
 * Guaranteed safe: if localStorage throws, returns fallback object without crashing app.
 * 
 * @param {Object} profile - { name, shopName, phoneNumber, lang }
 * @returns {{ success: boolean, profile: Object, error?: string }}
 */
export function saveProfile(profile) {
  const sanitized = {
    name: (profile?.name || '').trim(),
    shopName: (profile?.shopName || '').trim(),
    phoneNumber: (profile?.phoneNumber || '').trim(),
    lang: profile?.lang || 'en',
    updatedAt: new Date().toISOString(),
  };

  try {
    const storage = getStorage();
    if (storage) {
      storage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(sanitized));
      return { success: true, profile: sanitized };
    }
    return { success: false, profile: sanitized, error: 'localStorage not available' };
  } catch (err) {
    console.warn('[ProfileStorage] Could not save profile:', err?.message);
    // Still return the profile in memory so user can proceed
    return { success: false, profile: sanitized, error: err?.message || 'Storage write failed' };
  }
}

/**
 * Clears the user profile and wipes local app storage with safe try/catch.
 * 
 * @returns {boolean}
 */
export function clearProfile() {
  try {
    const storage = getStorage();
    if (storage) {
      storage.removeItem(PROFILE_STORAGE_KEY);
      // Also clear pieces and app state keys if present
      storage.removeItem('rewear_pieces');
      storage.removeItem('rewear_scraps');
      storage.removeItem('rewear_settings');
      return true;
    }
    return false;
  } catch (err) {
    console.warn('[ProfileStorage] Could not clear profile:', err?.message);
    return false;
  }
}

/**
 * Checks if the app is launching for the first time.
 * 
 * @returns {boolean}
 */
export function isFirstLaunch() {
  const profile = loadProfile();
  return !profile;
}
