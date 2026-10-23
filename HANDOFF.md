# ReWear Project Handoff

## 1. Project Overview

ReWear is a mobile application built with Capacitor and React (Vite) targeted at Indian tailors, home sewists, and Self-Help Group (SHG) members. Its purpose is to turn post-cutting fabric remnants and scraps into viable products, complete with visual previews and printable tailor-ready blueprints.

- **Input**: Fabric scrap pile dimensions, fabric types, and quantities.
- **Output**: Ranked product recommendations, layout assignments (plain, pieced, or hybrid), interactive previews, and multi-page printable tailor blueprints with seam allowances and step-by-step instructions.
- **Languages**: English, Hindi (`hi`), and Telugu (`te`).
- **Context**: Entry for a competition where all calculations, fitting logic, and demonstrations must remain strictly honest, functional, and reproducible.

---

## 2. Current State

### Recent Commit History (`git log --oneline -6`)
```text
dec67d6 Q11: Curved garment blueprints, true half-circle geometry, and tailor exports
678d230 Q10: Add Circle Skirt and Tank Top via FreeSewing pipeline
4aa308e Q8b: Split table runner center into 3 zones for 4-patch limit
7c0cc94 Q8: Add rectangle products via product pipeline
d12448e Q7b: Pipeline hardening, translation strictness, score guards, and frayed warning
9b57de8 Step 4b / Q7: Product pipeline part 2, factory scripts, generic constructions and docs
```

### Registered Products (13 Total)
1. **Core Products** (`src/engine/templates.js`):
   - `tote_bag` (Tote Bag)
   - `pouch` (Zippered Utility Pouch)
   - `cushion_cover` (Patchwork Cushion Cover)
   - `kids_frock` (Kids A-Line Frock)
   - `child_top` (Child Raglan T-Shirt Top) — *FreeSewing Brian 4.10.2 geometry*
2. **Custom Pipeline Products** (`src/engine/customRegistry.js`):
   - `drawstring_bag` (Drawstring Storage Pouch)
   - `scrunchie` (Hair Scrunchie)
   - `table_runner` (Dining Table Runner)
   - `placemat` (Dining Placemat)
   - `coin_purse` (Coin Purse)
   - `pencil_case` (Stationery Pencil Case)
   - `sandy_skirt` (Circle Skirt) — *FreeSewing Sandy 4.10.2 geometry*
   - `aaron_tank` (Tank Top) — *FreeSewing Aaron 4.10.2 geometry*

### Baseline Test Counts
Running `npm test` executes 16 test suites without failures. Baseline passed counts:
- Stage 2 Logic: **59** passed
- Stage 2 Scoring: **58** passed
- Gate 2 Integration: **20** passed
- Gate 3 Engine: **16** passed
- Gate 4 Integration: **10** passed
- Stage 4A 2D Preview: **100%** passed
- Stage 4B / Q4 Blueprint Regressions: passed
- Phase 6 Step 1 AI Photo Preview: **11** passed
- Q3 Frayed Scrap Warning: **11** passed
- Q5 Pile Helpers: **11** passed
- Product Validator & Pipeline Specs: **155** passed
- Product Factory & Lifecycle (`test_factory.js`): **33** passed
- Q10 Garments Granular Suite (`src/engine/test_q10_garments.js`): all assertions passed
- Q11 Curved Garments & Blueprints (`src/utils/test_q11_blueprints.js`): **16** assertions passed

*Note: Test counts must only increase or stay constant; never remove tests.*

---

## 3. Codebase File Map

- **Scrap Engine & Fitting Core**:
  - `src/engine/index.js`: Main engine API export (`buildDesign`, `scoreGarment`, `fitPileToProduct`).
  - `src/engine/fitting.js`: Scrap-to-zone matching, patch layout generation, sheet packing.
  - `src/engine/scoring.js`: Multi-factor rating (coverage, scrap usage, labour complexity, frayed penalties).
  - `src/engine/templates.js`: Built-in product templates and size mappings.
  - `src/engine/customRegistry.js`: Auto-managed registry of custom products.
  - `src/engine/productValidator.js`: Strict JSON schema and semantic validator for garment specs.
- **Garment CAD Generators & Data**:
  - `src/engine/aaronTankData.js`: Aaron tank CAD geometry and size definitions.
  - `src/engine/sandySkirtData.js`: Sandy circle skirt true half-circle geometry and size definitions.
  - `scripts/generate_aaron_data.mjs` & `scripts/generate_sandy_data.mjs`: Node generator scripts.
- **Product Factory Tooling**:
  - `src/engine/factory/newProduct.js`: CLI tool (`npm run new-product`).
  - `src/engine/factory/removeProduct.js`: CLI tool (`npm run remove-product`).
  - `scripts/checkProducts.mjs`: CLI sanity check (`npm run check-products`).
- **2D Previews & Blueprint Layout**:
  - `src/utils/product2DLayout.js`: 2D SVG piece packing and preview layout generator.
  - `src/components/Product2DPreview.jsx`: UI component rendering SVG garment panels.
- **Printable PDF Export**:
  - `src/utils/curvedBlueprintPDF.js`: PDFKit multi-page tiled pattern generator (English only).
  - `src/utils/tailorBlueprintData.js`: Blueprint data adapter and step instruction generator.
  - `generate_blueprint_pdfs.js`: Headless CLI blueprint generation script.
- **Internationalization (i18n)**:
  - `src/i18n/translations.js`: Base dictionary (English, Hindi, Telugu).
  - `src/i18n/customTranslations.js`: Auto-managed dictionary for custom products.
- **User Interface Screens**:
  - `src/screens/MyPileScreen.jsx`: Fabric scrap inventory entry.
  - `src/screens/DesignViewScreen.jsx`: Recommendation view, piece assignment, PDF export trigger.
  - `src/screens/TailorBlueprintScreen.jsx`: Tailor blueprint review and download.
- **Test Suites**:
  - `src/engine/test_*.js`, `src/utils/test_*.js`.

---

## 4. Known Open Problems

1. **Blueprint PDF Step Text Truncation**:
   In `src/utils/curvedBlueprintPDF.js`, text boxes for step instructions on Page 1 clip trailing characters when text exceeds the box height (e.g. Tank Top step 2 cuts off as `"...Press"`, Circle Skirt step 3 cuts off as `"...and"`). The existing test checks raw string data in memory, not the clipped boundary rendered by PDFKit on the page.
2. **2D Previews for Skirt and Tank**:
   In `src/utils/product2DLayout.js`, the circle skirt gores and tank panels are represented as bounding rectangular blocks rather than actual curved CAD outlines.
3. **Circle Skirt Pile Fit**:
   The half-circle skirt requires 16 gores per size (Small requires 16 cut scraps, Medium requires up to 48 smaller pieces or large offcuts), exceeding typical remnants in sample piles (Neutral 30, Colourful 36, Mixed 30). In all standard piles, score defaults to 0 due to insufficient scraps.
4. **Sandy Skirt Variant Count & Hem Sweep Discrepancy**:
   `products/sandy_skirt.json` was reduced to 1 variant (`hybrid`), but `src/engine/customRegistry.js` currently retains an extra entry in test reporting. Furthermore, hem sweep calculates to 137.05 cm under certain cut seam configurations versus 142.3 cm finished radius arc ($R_{out} \times \pi$).
5. **AI Photo Preview in Mock Mode**:
   `src/utils/aiPreviewService.js` operates purely in offline mock mode. Gemini API billing is unconfigured, and no secure Cloudflare proxy worker is deployed.
6. **Mobile Reachability on Hardware APK**:
   All new screens, SVG views, and PDF download flows have been verified via Vite dev server and Puppeteer headless browser, but have not been deployed and navigated inside a signed APK on a physical Android handset.
7. **Voice Input & Generic Steps**:
   Web Speech API voice transcription fails on native Android WebView without bridge support. Step instruction generation across rectangle products shares repeated generic wording.
8. **Translations & Font Shaping**:
   Hindi and Telugu translations have not been validated by native language speakers. PDF export remains English-only because PDFKit does not support OpenType complex script shaping for Devanagari or Telugu glyphs.
9. **Unused Font Assets**:
   Noto Sans Devanagari and Noto Sans Telugu `.ttf` font files may remain unreferenced in the asset directory.
10. **`src/App.jsx` Reverted**:
    Temporary URL query-parameter routing helpers used for automated screenshots were reverted to maintain base integrity. Automated direct deep-linking into screens is not present in the current production code.

---

## 5. Pending Task Queue

Follow this sequence for subsequent tasks:
1. **Prompt 2**:
   - Fix PDF step box line wrapping and height calculation in `src/utils/curvedBlueprintPDF.js` so no lines end with ellipsis or clipped text.
   - Address the `sandy_skirt` variant count and hem sweep mathematical discrepancy.
   - Verify UI visibility and test coverage for the full product catalog.
   - Build Android APK via Capacitor and check for bundle issues.
2. **3D Preview Integration**:
   - Render actual garment geometry using product templates and 3D wireframes/surfaces.
3. **Polish List**:
   - Improve product-specific construction steps and remove duplicate generic phrasing.
4. **Visual Design & Typography**:
   - Align theme styling, margins, and layout consistency across devices.
5. **Language & Localization Pass**:
   - Review Indic terminology with native speakers and handle font assets cleanly.
6. **Release Readiness**:
   - Run secrets audit (ensure no API keys are embedded), generate production signed APK.
7. **Demonstration Pack**:
   - Prepare end-to-end demo flow, sample piles, and presentation script.

---

## 6. Rules for Continuation

- **Initial Step**: Run `git status` and `git log --oneline -6` before modifying files.
- **File Modifications**: Edit existing files in place. Never delete files or recreate existing components from scratch. Make minimal, surgical edits.
- **Preserve Tests**: Never delete or comment out existing test assertions. All 16 suites must continue to pass.
- **Workflow & Commits**: Work on one task at a time. Do not commit or push to remote repositories unless explicitly instructed.
- **API Keys & Credentials**: Do not print, commit, or hardcode API keys anywhere in the repository, configuration, or APK source.
- **Verification Integrity**: Do not use promotional or marketing language. Every turn must include:
  - `"Problems I found in my own work"` (at least 5 items with file paths).
  - `"Not verified by me"`.
- **Test Output**: When running tests, execute:
  ```powershell
  cmd /c "npm test > test_output.txt 2>&1"
  Get-Content test_output.txt | Select-String "passed|failed"
  ```
  Paste the raw command output verbatim; do not retype or summarize numbers.
- **Estimates**: Mark all unverified tailor measurements or sizes with `"unverified, needs a tailor"`.
