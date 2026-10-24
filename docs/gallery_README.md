# ReWear Inspiration Gallery Specification & Guide

This document specifies the format, import pipeline, dimension guards, and inspiration matching rules for the ReWear Inspiration Gallery.

---

## 1. Gallery Manifest Format (`public/gallery/manifest.json`)

The inspiration gallery manifest is a JSON array of curated example images:

```json
[
  {
    "id": "tote_bag_earth_01",
    "file": "tote_bag_earth_01.webp",
    "productId": "tote_bag",
    "category": "bags",
    "colourway": "earth",
    "colours": ["#C2410C", "#CA8A04", "#65A30D", "#FEF3C7"],
    "names": {
      "en": "Quilted Tote Bag",
      "hi": "क्विल्टेड टोट बैग",
      "te": "క్విల్టెడ్ టోట్ బ్యాగ్"
    },
    "aiGenerated": true
  }
]
```

### Fields
- **`id`**: Unique string identifier (`<productId>_<colourway>_<nn>`).
- **`file`**: Image filename relative to `public/gallery/` (e.g. `tote_bag_earth_01.webp`).
- **`productId`**: Engine product identifier (e.g. `tote_bag`, `pouch`, `cushion_cover`). Validated against `PRODUCT_TEMPLATES`.
- **`category`**: Product category derived from engine templates (e.g. `bags`, `home`, `kids`, `garments`).
- **`colourway`**: One of four supported palettes: `earth`, `indigo`, `festive`, `pastel`.
- **`colours`**: Fixed array of 4 representative hex colors for the colourway.
- **`names`**: Object with localized product names (`en`, `hi`, `te`).
- **`aiGenerated`**: Always `true` for synthetic/inspirational showcase images.

---

## 2. Hard Asset Limits (Guards)

All images placed in `public/gallery_incoming/` must adhere to strict mobile performance bounds:

1. **Max File Size**: **150 KB** (153,600 bytes).
2. **Max Dimension**: **768 px** maximum width.

If an asset exceeds either boundary, `scripts/import_gallery.mjs` immediately terminates with:
> `Error: File <name> is <size>KB, exceeding 150 KB limit. Convert image to 512 px WebP at quality 75 using any free tool (e.g. squoosh.app, sharp, or ffmpeg).`

### Recommended Asset Specs
- Format: **WebP**
- Resolution: **512 × 512 px** (1:1 aspect ratio)
- Quality: **75**
- Target file size: **30 KB – 70 KB**

---

## 3. Supported Colourways & Palettes

The engine and import pipeline use fixed hex palettes in code (no runtime image decoding required):

| Colourway | Description / Tones | Hex Codes |
|-----------|---------------------|-----------|
| **`earth`** | Terracotta, Mustard, Olive, Cream | `["#C2410C", "#CA8A04", "#65A30D", "#FEF3C7"]` |
| **`indigo`** | Indigo, Light Blue, White, Grey | `["#1E3A8A", "#60A5FA", "#FFFFFF", "#9CA3AF"]` |
| **`festive`** | Magenta, Orange, Teal, Gold-Yellow | `["#BE185D", "#EA580C", "#0D9488", "#EAB308"]` |
| **`pastel`** | Peach, Mint, Lavender, Pale Yellow | `["#FDBA74", "#86EFAC", "#C4B5FD", "#FEF08A"]` |

---

## 4. File Ingestion & Labeling Conventions

Raw incoming files are placed in `public/gallery_incoming/` (git-ignored, never committed).  
The import script extracts product and colourway metadata using either of two naming schemes:

1. **Filename (Preferred)**:  
   `<productId>__<colourway>__<nn>.<ext>`  
   *Example*: `tote_bag__earth__01.webp`

2. **Parent Folder**:  
   `<productId>__<colourway>/<filename>.<ext>`  
   *Example*: `pouch__indigo/front_view.webp`

Unknown `productId` values are logged as warnings and skipped (the import does not crash). Valid items are copied to `public/gallery/<productId>_<colourway>_<nn>.<ext>` and indexed in `manifest.json`.

---

## 5. Colour Distance & Ranking Algorithm (`src/gallery/findInspiration.js`)

`findInspiration(manifest, { productId, colours, limit = 6 })` ranks gallery examples:

1. **Matching Product First**: Images sharing the user's selected `productId` are ranked highest, sorted in ascending order of colour distance to the user's scrap pile.
2. **Category Fallback**: Images in the same `category` (e.g. `bags`) are ranked next, sorted by colour distance.
3. **Mandatory Disclaimer**: Every result object includes the label key and localized disclaimer text:
   > *"Inspiration example (AI-generated), not made from your scraps"*
4. **Safety**: Handles missing, null, or empty manifests gracefully, returning `[]` without throwing exceptions.
