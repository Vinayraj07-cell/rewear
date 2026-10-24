# ReWear Release Guide 🚀

This document details the exact step-by-step procedure for building, signing, verifying, and publishing the ReWear Android APK (`rewear.apk`) to GitHub Releases.

---

## 1. Pre-Release Quality Checks

Run all automated checks from the project root before building any binaries:

```bash
# 1. Ensure test baseline passes 100% (224+ tests across 18 test suites)
npm test

# 2. Run secret scan to guarantee zero leaked credentials or keys
node scripts/secret_scan.mjs

# 3. Verify clean production web bundle
npm run build
```

---

## 2. Sync Web Assets to Android Native Project

Synchronize the fresh `dist/` web output into the Capacitor Android project:

```bash
npx cap sync android
```

This updates `android/app/src/main/assets/public/` with the latest Vite production assets and plugins.

---

## 3. Generate Release Keystore (One-Time Setup)

If you don't already have a release signing key, create one using `keytool` (included with JDK). Store it securely and **never commit it to git** (guaranteed by `.gitignore`):

```bash
keytool -genkey -v -keystore release.keystore \
  -alias rewear-key \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -storepass YOUR_STRONG_STORE_PASSWORD \
  -keypass YOUR_STRONG_KEY_PASSWORD \
  -dname "CN=Vinay Raj, OU=ReWear, O=ReWear, L=Hyderabad, ST=Telangana, C=IN"
```

> ⚠️ **Security Notice**: Keep `release.keystore` safe and backed up in a secure vault. `.gitignore` blocks `*.keystore` and `*.jks` from ever being committed to source control.

---

## 4. Build and Sign the Release APK

### Step A: Build Unsigned Release APK via Gradle
```bash
cd android
./gradlew assembleRelease
cd ..
```
The unsigned output is generated at:
`android/app/build/outputs/apk/release/app-release-unsigned.apk`

*(Note on Windows PowerShell, use `.\gradlew assembleRelease`)*

### Step B: Align the APK (Android SDK `zipalign`)
```bash
zipalign -v -p 4 \
  android/app/build/outputs/apk/release/app-release-unsigned.apk \
  android/app/build/outputs/apk/release/app-release-aligned.apk
```

### Step C: Sign with `apksigner`
```bash
apksigner sign --ks release.keystore \
  --ks-key-alias rewear-key \
  --ks-pass pass:YOUR_STRONG_STORE_PASSWORD \
  --key-pass pass:YOUR_STRONG_KEY_PASSWORD \
  --out rewear.apk \
  android/app/build/outputs/apk/release/app-release-aligned.apk
```

### Step D: Verify APK Signature
```bash
apksigner verify --verbose rewear.apk
```
*Expected: `Verifies: true` with v2 and v3 signatures verified.*

---

## 5. Physical Device Smoke Test

Before publishing, install and verify the signed APK on a physical Android device:

```bash
# Connect phone via USB with USB Debugging enabled:
adb devices

# Install signed release APK:
adb install -r rewear.apk
```

### Smoke Test Checklist:
1. **First-Run Profile**: App shows `FirstLaunchScreen` asking for language choice, name, optional shop name.
2. **Honesty Pill**: "Your data stays on this phone" is clearly visible in chosen language.
3. **Audio TTS**: Tap speaker button on Home screen to hear voice narration.
4. **Scrap Pile & Feasibility**: Add sample pile; verify products display correct match percentages.
5. **Blueprint PDF**: Open product design -> tap "Download Blueprint" -> verify PDF saves and opens cleanly.
6. **Settings & Data Reset**: Open Settings -> tap "Clear my data" -> confirm clean reset.

---

## 6. Upload to GitHub Releases

### Option A: Using GitHub CLI (`gh`)
```bash
# 1. Tag git release
git tag -a v1.0.0 -m "ReWear Release v1.0.0"
git push origin v1.0.0

# 2. Create release and upload APK
gh release create v1.0.0 rewear.apk \
  --title "ReWear v1.0.0 — Upcycled Tailoring Assistant" \
  --notes "ReWear v1.0.0 official release APK for Android devices. Scan QR in README.md or download rewear.apk directly."
```

### Option B: Using GitHub Web Interface
1. Navigate to: `https://github.com/Vinayraj07-cell/rewear/releases/new`
2. Set **Tag version** to `v1.0.0`.
3. Set **Release title** to `ReWear v1.0.0 — Upcycled Tailoring Assistant`.
4. In the binary attachment area, drag and drop `rewear.apk`.
5. Ensure the uploaded file name is exactly `rewear.apk` so that the direct download link (`https://github.com/Vinayraj07-cell/rewear/releases/latest/download/rewear.apk`) resolves immediately.
6. Click **Publish release**.

---

## 7. Verify QR Code & Direct Link

Once published, verify that:
1. `https://github.com/Vinayraj07-cell/rewear/releases/latest/download/rewear.apk` initiates direct APK download.
2. Scanning the QR code in `docs/qr-download.png` opens the direct download URL on mobile phones.
