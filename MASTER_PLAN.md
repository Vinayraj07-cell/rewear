# ReWear Master Plan

## 1. Project Overview
ReWear is a mobile-first web & Android application for fabric waste reuse and zero-waste tailoring. It matches arbitrary scrap piles with product templates, generates aesthetic colorways (60-30-10 rule), and produces 2D tailor blueprints, cutting manifests, and 3D garment previews.

---

## 2. Product Catalog
1. **Zippered Utility Pouch (`pouch`)**
2. **Everyday Tote Bag (`tote_bag`)**
3. **Cushion Cover (`cushion_cover`)**
4. **Kids' Summer Frock (`kids_frock`)**

---

## 3. Architecture & Engine
- Pure JavaScript rule engine in `src/engine/` (zero UI dependencies).
- CIELAB/LCH color harmonies (60% Base Anchor, 30% Secondary, 10% Accent).
- Fabric thickness & stretch compatibility checking.
- Non-overlapping bounding-box sheet marker packing.
- `GarmentSpec` v1 JSON schema and FreeSewing integration proof.

---

## 4. Phase 1: Core Engine & Rules
- Color harmony and contrast scoring.
- Fabric compatibility checks.
- Product templates and 60-30-10 zoning.
- Fitting and off-cut calculation.
- Status: **DONE**

---

## 5. Phase 2: Garment Spec Schema & Adapter Gates
- Gate 1: Baseline verification (117 tests passing).
- Gate 2: Geometry engine & JSON schema contract.
- Gate 3: Transparent normalization adapter (`normalizeGarmentSpec`).
- Gate 4: Hybrid sourcing (`plain_base` vs `scrap`) & non-overlapping sheet packer.
- Status: **DONE**

---

## 6. Phase 3: Pile Verification & Try Pile Audit
- Verification of Piles A, B, C across all 4 products.
- Preserved legacy template compatibility without regressions.
- Status: **DONE**

---

## 7. Phase 4: 2D & Technical Blueprints
- **Stage 4A:** 2D finished product previews from `buildDesign()` data for all 4 products (tote with handles, zippered pouch, soft-edge cushion, frock with gathered skirt). Real patch colors, visible stitch lines, subtle weave texture.
- **Stage 4B:** Technical tailor blueprints for all 4 products:
  - Piece numbers, names, dual cm & inches dimensions.
  - Dashed seam allowance lines (1.0 cm) and grain orientation arrows (`↕ Warp`).
  - Scrap mapping with trimmed cut dimensions.
  - Sequential illustrated stitching steps with audio playback (`soundManager.speak`).
  - Itemized materials checklist & estimated sewing times.
  - Interactive, editable price helper ($\text{Material} + \text{Time} \times \text{Rate} + \text{Extras}$).
  - Vector PDF export (`tailor_blueprint_pouch.pdf`, `tailor_blueprint_tote.pdf`).
  - Mandatory disclaimer: *"Measurements to be verified by a tailor"*.
- Status: **DONE**

---

## 8. Phase 5: 3D Preview by Texture Mapping
- **Spike:** In-app Android shell texture mapping evaluation.
- Shell models: Generic `.glb` models (cushion, pouch, bodice) with CC0 / custom license.
- 2D Canvas dynamic texture painting from engine `buildDesign()` patchwork layout.
- Benchmark: Google `<model-viewer>` vs `Three.js` on Android Capacitor WebView.
- Metrics: Frame rate (FPS), load time (ms), memory/GC behavior.
- Status: **IN PROGRESS (Spike Phase)**

---

## 12. Progress Log

| Phase | Description | Status | Completed Date | Verified By |
| :--- | :--- | :---: | :---: | :--- |
| **Phase 1** | Core Rule Engine, Compatibility & Fitting | **DONE** | 2026-10-19 | 117 Engine Tests |
| **Phase 2** | Garment Spec, Geometry, Sheet Marker (Gates 1–4) | **DONE** | 2026-10-21 | 143 Engine Tests |
| **Phase 3** | Try Pile Verification & Template Parity | **DONE** | 2026-10-21 | try_pile audit |
| **Phase 4** | Stage 4A (2D Previews) & Stage 4B (Tailor Blueprint + PDF) | **DONE** | 2026-10-21 | 7 Test Suites (100% Green) + PDF Exports |
| **Phase 5** | 3D Preview by Texture Mapping (In-App Spike) | **IN PROGRESS** | - | Current Active Phase |

---
