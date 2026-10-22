# ReWear Execution Queue Log

This log tracks execution items across ReWear development phases and spikes.

| Queue ID | Phase / Step | Description | Status | Completion Date |
| :--- | :--- | :--- | :---: | :---: |
| **Q-P6S1** | Phase 6 Step 1 | FreeSewing Brian child top integration (CAD dataset, hybrid/patchwork toggle, mirrored sleeves, zero-overlap sheet packing) | **DONE** | 2026-10-22 |
| **Q0** | Step 4a | REAL Gemini API Spike (API model evaluation, zero-text prompts, dominant color comparison) | **DONE** | 2026-10-22 |
| **Q0b** | Spike Follow-up | Re-run Real Gemini API Image Generation Spike once pay-as-you-go billing quota is activated | **PENDING** | - |
| **Q1** | Step 4b | AI Photo Preview in App (Mock mode fallback `MOCK_AI=true`, bundled example images, Cloudflare Worker proxy with secret management, deterministic hash cache, per-device rate limiting, side-by-side 2D plan comparison, isolation tests) | **DONE** | 2026-10-22 |
| **Q2** | Phase 6 Step 2 | Score includes labour (penalty derived from seam count and estimated time in config.js), recommended mode matches higher score, hybrid sleeves contrast with neutral base body, 4 rectangle scores unchanged | **DONE** | 2026-10-22 |
| **Q3** | Phase 6 Step 3 | Frayed / uneven scraps safety margin setting (`SCRAP_SAFETY_MARGIN_CM`, default 0, choices [0, 0.5, 1.0] cm/edge, shrinks usable scrap dimensions by 2 x margin, reports "lost to frayed edges", strict mathematical area conservation, toggle switch in My Pile) | **DONE** | 2026-10-22 |
| **Q4** | Stage 4B / Phase 6 | Tailor blueprint repair (in-app screen & PDFs): fix piece sizes from templates.js, size-adaptive step & materials text, real SVG diagrams in PDF, embedded font with ₹ & arrows/glyphs, clean page breaks, summarized scraps, grain from data | **IN PROGRESS** | - |

---

## Detailed Notes on Completed Items

### [Q4 / Stage 4B & Phase 6] Blueprint Repair, All Products & PDFs
- **Bug Audit & In-App Parity Check**:
  - Found that the in-app screen had the exact same root causes as the PDF because both consumed `src/utils/tailorBlueprintData.js`.
  - Piece dimensions: `cutW` and `cutH` previously computed `Math.max(...scraps.map(s => s.cutWidth || 14))`, which returned the scrap size (14x14 cut, 12x12 finished) instead of the product zone template size.
  - Step text and materials hardcoded Medium-size numbers across all sizes.
  - In PDFKit, standard Helvetica lacks WinAnsiEncoding for the rupee sign (₹) and arrow (↕) glyphs.
  - Steps rendered `[DIAGRAM]` placeholders in PDF instead of vector diagrams.
  - Page 2 was blank due to footer coordinate overflow crossing bottom margin (`pageHeight - 28`), triggering an automatic page break before `doc.addPage()`.
- **Engine Templates**:
  - Added declarative `grainLine` metadata to all zone definitions in `src/engine/templates.js` (lengthwise warp ↕ for body panels, handles, ties, and skirts; crosswise weft ↔ for facing bands and hem borders). Zero engine logic modified.
- **Blueprint Data Generator (`src/utils/tailorBlueprintData.js`)**:
  - Exact piece dimensions derived from `getProductRequirements(productId, sizeKey, seamAllowanceCm)` in `templates.js`.
  - `getProductStitchingSteps(productId, sizeKey)` dynamically substitutes exact dimensions into instructions and titles.
  - `getProductMaterialsList` dynamically computes zipper lengths, handles webbing, and cushion inserts based on selected size.
  - `summarizeScrapsList` formats long scrap lists into clean summaries (e.g., `"9 scraps: navy 14 × 14 cm"`).
  - All hand-typed notions, prices, and times explicitly marked with `"typical defaults, to be verified by a tailor"`.
- **PDF Generation (`generate_blueprint_pdfs.js`)**:
  - Embedded Unicode TTF fonts (`src/assets/fonts/NotoSans-Regular.ttf` & `NotoSans-Bold.ttf`, with Windows fallback) rendering ₹ and ↕ crisply.
  - Real vector step diagrams rendered via `svg-to-pdfkit` using shared SVGs from `src/utils/stepDiagramSvg.js`. Zero placeholders.
  - Resolution of footer coordinate (`footerY = 780` with 40 margin) ensures exactly 2 pages per product with zero empty pages.
  - Generated PDFs for all 4 products: pouch, tote_bag, cushion_cover, kids_frock.
- **Test Coverage**:
  - `src/utils/test_stage4b_blueprint.js` regression suite: verified piece dimensions match template sizes for every product and size; verified extracted PDF text contains ₹, has no `[DIAGRAM]`, and has no empty pages. Full test suite passing 100% green (10 test suites, 220+ tests).
- **Config**: Added `SCRAP_SAFETY_MARGIN_CM: 0` (default 0 ensuring 100% invariance on prior results) and `ALLOWED_SCRAP_SAFETY_MARGINS_CM: [0, 0.5, 1.0]` in `src/engine/config.js`.
- **Engine Logic**:
  - In `src/engine/zoning.js` and `src/engine/fitting.js`, each scrap's usable width and height shrink by $2 \times \text{margin}$:
    $$W_{\text{usable}} = \max(0, W - 2m), \quad H_{\text{usable}} = \max(0, H - 2m)$$
  - Border trim loss is tracked as `fabricLostToFrayedEdgesCm2` and reported in plain words: `"X cm² lost to frayed edges (m cm margin per edge)"`.
  - Strict area conservation verified across single piece cuts, mirrored sleeves, and multi-piece pieced panels:
    $$\text{totalRawScrapArea} = \text{targetCutArea} + \text{seamLossArea} + \text{trimWasteArea} + \text{reusableOffcutsArea} + \text{fabricLostToFrayedEdges}$$
- **UI in My Pile**:
  - Switch: `"My scraps are frayed or uneven"` with toggle state in `src/screens/MyPileScreen.jsx`.
  - When enabled: segmented pills for `0.5 cm` and `1.0 cm` safety margin per edge (default `0.5 cm`).
  - One-line explanation: *"Shrinks each scrap before fitting so frayed or uneven edges are safely trimmed away."*
  - Explicit badge: *"This is a safety allowance, not a measurement."*
- **Fabric Numbers Integration**: `FabricNumbersCard.jsx` displays `"Lost to frayed edges: X cm²"` in rose highlight whenever frayed scrap loss is present.
- **Test Coverage**: `src/engine/test_stage6_q3_frayed.js` (9 tests passing green, full suite 220 tests, 0 failures). Ensures margin 0 bitwise matches prior baseline across all 5 products, monotonicity holds, and area conservation is exact.

### [Q1 / Step 4b] AI Photo Preview Mock Mode & Proxy Logic
- **Cloudflare Worker Proxy**: Located in `server/cloudflare-worker/`. Securely stores `GEMINI_API_KEY` as an encrypted secret. Enforces 10/day per-device rate limit and daily global cap. Documented exact deployment steps in `server/cloudflare-worker/README.md`.
- **App Integration**:
  - "Photo preview (AI)" button on `DesignViewScreen`.
  - Online-only guard with "Needs internet" indicator; full offline guarantee for tailoring engine.
  - Zero-text, zero-label clean reference SVG builder in `src/utils/aiPreviewService.js`.
  - Side-by-side comparison modal in `src/components/AiPhotoPreviewModal.jsx` displaying the Exact 2D Plan directly next to the AI photo.
  - Mandatory banners: `"Example photo (not generated from your design)"` and `"AI photo. For inspiration only. Seams and patch positions follow the plan and blueprint."`
  - Deterministic hash caching (`aiPreviewCache`) preventing redundant calls.
  - Unit tests in `src/utils/test_ai_preview.js` passing 100% green without calling live APIs.
