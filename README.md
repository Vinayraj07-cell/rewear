# ReWear 🧵 — Upcycling Leftover Fabric for Local Tailors

> **Transform fabric offcuts, scrap piles, and surplus textiles into beautiful, sellable goods.**  
> Built for local tailors, neighbourhood sewists, and craftspeople.

[![Build & Test Baseline](https://img.shields.io/badge/tests-224%2B%20passing-emerald.svg)](https://github.com/Vinayraj07-cell/rewear)
[![Platform](https://img.shields.io/badge/platform-Android%20%7C%20Web-blue.svg)](https://github.com/Vinayraj07-cell/rewear)
[![Privacy](https://img.shields.io/badge/privacy-100%25%20Local%20%28No%20Cloud%29-green.svg)](https://github.com/Vinayraj07-cell/rewear)
[![Language](https://img.shields.io/badge/languages-English%20%7C%20Telugu%20%7C%20Hindi-orange.svg)](https://github.com/Vinayraj07-cell/rewear)

---

## 📱 Quick Install on Android (Judge Demo)

You can install ReWear directly on any Android smartphone (no Google Play account required):

### Option A: Scan QR Code with Phone Camera
Point your phone camera or QR scanner at the code below to download the latest signed APK directly:

![Scan to Download ReWear APK](docs/qr-download.png)

### Option B: Direct APK Download Link
Download the direct APK file from GitHub Releases:  
👉 **[Download ReWear Android APK (Latest Release)](https://github.com/Vinayraj07-cell/rewear/releases/latest/download/rewear.apk)**

*Once downloaded, tap the APK in your notification bar or Downloads folder to install. The app runs fully offline on your device.*

---

## 💡 What is ReWear?

Every day, tailoring shops and garment factories generate piles of discarded fabric offcuts. Meanwhile, finding patterns that fit arbitrary rectangular and irregular scraps is time-consuming and difficult.

**ReWear solves this by pairing scrap geometry with real tailor needs:**
1. **Enter Your Scraps**: Log leftover fabric pieces by length, width, color, and fabric type (or snap a photo with Gemini AI vision).
2. **Instant Feasibility Match**: ReWear tests your scrap pile against a verified catalog of **33 products** (tote bags, cushion covers, pouches, raglan tops, circular skirts, aprons, organizers).
3. **Interactive 2D & 3D Preview**: Visualize how contrasting scrap colors piece together before cutting into fabric.
4. **Tailor Blueprint PDF**: Export professional, printable 2-page cutting diagrams with precise seam allowances, piece dimension schedules, and 1:1 scale reference squares.
5. **Voice-First & Multilingual**: Fully narrated in **English, Telugu (తెలుగు), and Hindi (हिन्दी)** with large-touch targets designed for small-shop workspaces.

---

## ✨ Core Features & Technical Highlights

- **📐 Algorithmic Fabric Fitting Engine**: Pure functional layout calculator that validates piece conservation, seam margins, boundary limits, and zero-overlap guarantees across 33 product templates.
- **📱 100% Offline-First & Private**: Zero accounts, zero passwords, zero analytics trackers. All profile settings, scrap piles, and custom designs remain strictly on the user's phone (`localStorage` with quota-exceeded fallback).
- **🎨 Interactive 2D Layout & 3D Look**: Pure SVG layout generator shared between 2D customization and a lightweight Three.js 3D viewer (capped DPR, low-power Lambert lighting, touch-scroll isolation, auto-fallback).
- **📄 Production-Ready PDF Export**: Generates vectorized, printable cutting blueprints client-side via PDFKit without external server round-trips.
- **🔊 Accessibility & Voice Guidance**: Web Speech API audio narration and phonetic assistance for sewists who prefer listening to instructions.
- **✨ Gemini 1.5 Flash AI Vision (Optional)**: Optional vision suggestion tool that analyzes fabric textures and suggests appropriate catalog products.
- **🖼️ Curated Inspiration Gallery**: Built-in visual ideas ranked by color-palette distance to give tailors instant creative direction.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Core Framework** | React 19, Vite 8, JavaScript (ES Modules) |
| **Mobile Runtime** | Capacitor 6 (Android native bridge) |
| **Styling & Icons** | Tailwind CSS, Lucide React Icons |
| **Rendering & 3D** | Three.js (low-power mobile 3D), SVG (2D layout engine) |
| **Document Export** | PDFKit (client-side vector blueprints) |
| **Audio & TTS** | Web Speech API with custom phonetics & synthesized audio |
| **AI Integration** | Google Gemini 1.5 Flash Vision REST API |
| **Testing** | Node.js native test runner (18 test suites, 224+ assertions) |

---

## 💻 How to Build & Test Locally

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Vinayraj07-cell/rewear.git
cd rewear
npm install
```

### 2. Run Test Suite
Run all 18 unit, regression, and geometry validation test suites:
```bash
npm test
```
*Expected result: 224 passed, 0 failed across all products and core services.*

### 3. Build for Production
Bundle the optimized client application via Vite:
```bash
npm run build
```

### 4. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🛡️ Limitations & Honesty Disclaimers

In accordance with our engineering honesty guidelines:
1. **Measurements Require Tailor Verification**: All product piece dimensions, seam allowances, and layout calculations are typical baseline estimates (`tailorVerified: false`). A professional tailor must measure physical fabric stretch, weave direction, and grainline before cutting.
2. **Gemini AI Vision is Suggestive Only**: The optional Gemini AI feature offers visual textile suggestions based on uploaded photos. It is an inspirational aid and does not calculate structural load or dimensional tolerance.
3. **Translation Reviews**: Telugu and Hindi translations have been reviewed for tailoring clarity; final vernacular reviews with local tailoring guilds are ongoing.
4. **Data Stays on Your Device**: ReWear does not store user data on any central server or database. Wiping app cache or using "Clear my data" in Settings permanently erases saved scrap piles.

---

## 📄 License & Credits

Built with ❤️ for sustainable circular fashion and local craft communities.
Licensed under the [MIT License](LICENSE).
