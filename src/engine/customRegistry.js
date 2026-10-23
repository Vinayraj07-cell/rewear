/**
 * ReWear Custom Product Registry
 * 
 * Auto-managed by `npm run new-product` and `npm run remove-product`.
 * Holds dynamically registered Garment Specs.
 */

export const CUSTOM_PRODUCT_TEMPLATES = {
  "drawstring_bag": {
    "schemaVersion": "1.0.0",
    "id": "drawstring_bag",
    "name": "Drawstring Bag",
    "names": {
      "en": "Drawstring Bag",
      "hi": "डोरी वाला थैला",
      "te": "తాడుతో బిగించే సంచీ"
    },
    "category": "bags",
    "construction": "casing",
    "description": "Versatile drawstring storage pouch made from pieced fabric scraps with a channeled top cord.",
    "defaultVariant": "plain",
    "tailorVerified": false,
    "disclaimer": "All pattern measurements are rectangle-based approximations for scrap cutting and must be verified by a professional tailor before final cutting.",
    "materials": [
      {
        "name": "Cotton or linen fabric scraps",
        "qty": "Approx 35x40 cm total area",
        "optional": false,
        "source": "Standard sewing notion",
        "disclaimer": "typical default, to be verified by a tailor",
        "note": "typical default, to be verified by a tailor"
      },
      {
        "name": "Cotton drawstring cord (4-5 mm)",
        "qty": "1.2 - 1.8 meters",
        "optional": false,
        "source": "Standard sewing notion",
        "disclaimer": "typical default, to be verified by a tailor",
        "note": "typical default, to be verified by a tailor"
      },
      {
        "name": "Safety pin or cord threader",
        "qty": "1 unit",
        "optional": false,
        "source": "Standard sewing notion",
        "disclaimer": "typical default, to be verified by a tailor",
        "note": "typical default, to be verified by a tailor"
      },
      {
        "name": "All-purpose sewing thread",
        "qty": "1 spool",
        "optional": false,
        "source": "Standard sewing notion",
        "disclaimer": "typical default, to be verified by a tailor",
        "note": "typical default, to be verified by a tailor"
      }
    ],
    "timeEstimateFormula": null,
    "stitchingSteps": [],
    "sizes": {
      "small": {
        "label": "Small (15 × 20 cm)",
        "finishedWidthCm": 15,
        "finishedHeightCm": 20,
        "finishedDimensions": {
          "widthCm": 15,
          "heightCm": 20
        },
        "zones": [
          {
            "id": "drawstring_front",
            "name": "Front Body Panel",
            "names": {
              "en": "Front Body Panel",
              "hi": "आगे का मुख्य भाग",
              "te": "ముందు ప్రధాన భాగం"
            },
            "role": "base",
            "width": 15,
            "height": 17,
            "cutWidth": 17,
            "cutHeight": 19,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 15,
              "finishedHeightCm": 17,
              "finishedAreaCm2": 255,
              "cutWidthCm": 17,
              "cutHeightCm": 19
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "drawstring_back",
            "name": "Back Body Panel",
            "names": {
              "en": "Back Body Panel",
              "hi": "पीछे का मुख्य भाग",
              "te": "వెనుక ప్రధాన భాగం"
            },
            "role": "base",
            "width": 15,
            "height": 17,
            "cutWidth": 17,
            "cutHeight": 19,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 15,
              "finishedHeightCm": 17,
              "finishedAreaCm2": 255,
              "cutWidthCm": 17,
              "cutHeightCm": 19
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "casing_channel",
            "name": "Drawstring Casing Channel",
            "names": {
              "en": "Drawstring Casing Channel",
              "hi": "डोरी की केसिंग पट्टी",
              "te": "తాడు పట్టే మార్గం"
            },
            "role": "supporting",
            "width": 15,
            "height": 6,
            "cutWidth": 17,
            "cutHeight": 8,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 15,
              "finishedHeightCm": 6,
              "finishedAreaCm2": 90,
              "cutWidthCm": 17,
              "cutHeightCm": 8
            },
            "provenance": null,
            "mapping3D": null
          }
        ],
        "pieces": [
          {
            "id": "drawstring_front",
            "name": "Front Body Panel",
            "names": {
              "en": "Front Body Panel",
              "hi": "आगे का मुख्य भाग",
              "te": "ముందు ప్రధాన భాగం"
            },
            "role": "base",
            "width": 15,
            "height": 17,
            "cutWidth": 17,
            "cutHeight": 19,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 15,
              "finishedHeightCm": 17,
              "finishedAreaCm2": 255,
              "cutWidthCm": 17,
              "cutHeightCm": 19
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "drawstring_back",
            "name": "Back Body Panel",
            "names": {
              "en": "Back Body Panel",
              "hi": "पीछे का मुख्य भाग",
              "te": "వెనుక ప్రధాన భాగం"
            },
            "role": "base",
            "width": 15,
            "height": 17,
            "cutWidth": 17,
            "cutHeight": 19,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 15,
              "finishedHeightCm": 17,
              "finishedAreaCm2": 255,
              "cutWidthCm": 17,
              "cutHeightCm": 19
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "casing_channel",
            "name": "Drawstring Casing Channel",
            "names": {
              "en": "Drawstring Casing Channel",
              "hi": "डोरी की केसिंग पट्टी",
              "te": "తాడు పట్టే మార్గం"
            },
            "role": "supporting",
            "width": 15,
            "height": 6,
            "cutWidth": 17,
            "cutHeight": 8,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 15,
              "finishedHeightCm": 6,
              "finishedAreaCm2": 90,
              "cutWidthCm": 17,
              "cutHeightCm": 8
            },
            "provenance": null,
            "mapping3D": null
          }
        ]
      },
      "medium": {
        "label": "Medium (20 × 26 cm)",
        "finishedWidthCm": 20,
        "finishedHeightCm": 26,
        "finishedDimensions": {
          "widthCm": 20,
          "heightCm": 26
        },
        "zones": [
          {
            "id": "drawstring_front",
            "name": "Front Body Panel",
            "names": {
              "en": "Front Body Panel",
              "hi": "आगे का मुख्य भाग",
              "te": "ముందు ప్రధాన భాగం"
            },
            "role": "base",
            "width": 20,
            "height": 22,
            "cutWidth": 22,
            "cutHeight": 24,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 20,
              "finishedHeightCm": 22,
              "finishedAreaCm2": 440,
              "cutWidthCm": 22,
              "cutHeightCm": 24
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "drawstring_back",
            "name": "Back Body Panel",
            "names": {
              "en": "Back Body Panel",
              "hi": "पीछे का मुख्य भाग",
              "te": "వెనుక ప్రధాన భాగం"
            },
            "role": "base",
            "width": 20,
            "height": 22,
            "cutWidth": 22,
            "cutHeight": 24,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 20,
              "finishedHeightCm": 22,
              "finishedAreaCm2": 440,
              "cutWidthCm": 22,
              "cutHeightCm": 24
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "casing_channel",
            "name": "Drawstring Casing Channel",
            "names": {
              "en": "Drawstring Casing Channel",
              "hi": "डोरी की केसिंग पट्टी",
              "te": "తాడు పట్టే మార్గం"
            },
            "role": "supporting",
            "width": 20,
            "height": 8,
            "cutWidth": 22,
            "cutHeight": 10,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 20,
              "finishedHeightCm": 8,
              "finishedAreaCm2": 160,
              "cutWidthCm": 22,
              "cutHeightCm": 10
            },
            "provenance": null,
            "mapping3D": null
          }
        ],
        "pieces": [
          {
            "id": "drawstring_front",
            "name": "Front Body Panel",
            "names": {
              "en": "Front Body Panel",
              "hi": "आगे का मुख्य भाग",
              "te": "ముందు ప్రధాన భాగం"
            },
            "role": "base",
            "width": 20,
            "height": 22,
            "cutWidth": 22,
            "cutHeight": 24,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 20,
              "finishedHeightCm": 22,
              "finishedAreaCm2": 440,
              "cutWidthCm": 22,
              "cutHeightCm": 24
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "drawstring_back",
            "name": "Back Body Panel",
            "names": {
              "en": "Back Body Panel",
              "hi": "पीछे का मुख्य भाग",
              "te": "వెనుక ప్రధాన భాగం"
            },
            "role": "base",
            "width": 20,
            "height": 22,
            "cutWidth": 22,
            "cutHeight": 24,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 20,
              "finishedHeightCm": 22,
              "finishedAreaCm2": 440,
              "cutWidthCm": 22,
              "cutHeightCm": 24
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "casing_channel",
            "name": "Drawstring Casing Channel",
            "names": {
              "en": "Drawstring Casing Channel",
              "hi": "डोरी की केसिंग पट्टी",
              "te": "తాడు పట్టే మార్గం"
            },
            "role": "supporting",
            "width": 20,
            "height": 8,
            "cutWidth": 22,
            "cutHeight": 10,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 20,
              "finishedHeightCm": 8,
              "finishedAreaCm2": 160,
              "cutWidthCm": 22,
              "cutHeightCm": 10
            },
            "provenance": null,
            "mapping3D": null
          }
        ]
      },
      "large": {
        "label": "Large (26 × 34 cm)",
        "finishedWidthCm": 26,
        "finishedHeightCm": 34,
        "finishedDimensions": {
          "widthCm": 26,
          "heightCm": 34
        },
        "zones": [
          {
            "id": "drawstring_front",
            "name": "Front Body Panel",
            "names": {
              "en": "Front Body Panel",
              "hi": "आगे का मुख्य भाग",
              "te": "ముందు ప్రధాన భాగం"
            },
            "role": "base",
            "width": 26,
            "height": 30,
            "cutWidth": 28,
            "cutHeight": 32,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 26,
              "finishedHeightCm": 30,
              "finishedAreaCm2": 780,
              "cutWidthCm": 28,
              "cutHeightCm": 32
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "drawstring_back",
            "name": "Back Body Panel",
            "names": {
              "en": "Back Body Panel",
              "hi": "पीछे का मुख्य भाग",
              "te": "వెనుక ప్రధాన భాగం"
            },
            "role": "base",
            "width": 26,
            "height": 30,
            "cutWidth": 28,
            "cutHeight": 32,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 26,
              "finishedHeightCm": 30,
              "finishedAreaCm2": 780,
              "cutWidthCm": 28,
              "cutHeightCm": 32
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "casing_channel",
            "name": "Drawstring Casing Channel",
            "names": {
              "en": "Drawstring Casing Channel",
              "hi": "डोरी की केसिंग पट्टी",
              "te": "తాడు పట్టే మార్గం"
            },
            "role": "supporting",
            "width": 26,
            "height": 8,
            "cutWidth": 28,
            "cutHeight": 10,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 26,
              "finishedHeightCm": 8,
              "finishedAreaCm2": 208,
              "cutWidthCm": 28,
              "cutHeightCm": 10
            },
            "provenance": null,
            "mapping3D": null
          }
        ],
        "pieces": [
          {
            "id": "drawstring_front",
            "name": "Front Body Panel",
            "names": {
              "en": "Front Body Panel",
              "hi": "आगे का मुख्य भाग",
              "te": "ముందు ప్రధాన భాగం"
            },
            "role": "base",
            "width": 26,
            "height": 30,
            "cutWidth": 28,
            "cutHeight": 32,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 26,
              "finishedHeightCm": 30,
              "finishedAreaCm2": 780,
              "cutWidthCm": 28,
              "cutHeightCm": 32
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "drawstring_back",
            "name": "Back Body Panel",
            "names": {
              "en": "Back Body Panel",
              "hi": "पीछे का मुख्य भाग",
              "te": "వెనుక ప్రధాన భాగం"
            },
            "role": "base",
            "width": 26,
            "height": 30,
            "cutWidth": 28,
            "cutHeight": 32,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 26,
              "finishedHeightCm": 30,
              "finishedAreaCm2": 780,
              "cutWidthCm": 28,
              "cutHeightCm": 32
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "casing_channel",
            "name": "Drawstring Casing Channel",
            "names": {
              "en": "Drawstring Casing Channel",
              "hi": "डोरी की केसिंग पट्टी",
              "te": "తాడు పట్టే మార్గం"
            },
            "role": "supporting",
            "width": 26,
            "height": 8,
            "cutWidth": 28,
            "cutHeight": 10,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 26,
              "finishedHeightCm": 8,
              "finishedAreaCm2": 208,
              "cutWidthCm": 28,
              "cutHeightCm": 10
            },
            "provenance": null,
            "mapping3D": null
          }
        ]
      }
    }
  },
  "scrunchie": {
    "schemaVersion": "1.0.0",
    "id": "scrunchie",
    "name": "Fabric Scrunchie",
    "names": {
      "en": "Fabric Scrunchie",
      "hi": "कपड़े की स्क्रंची",
      "te": "బట్టల స్క్రంచీ"
    },
    "category": "accessories",
    "construction": "casing",
    "description": "Gentle hair scrunchie stitched from long cotton, silk, or satin offcuts with elastic inner core.",
    "defaultVariant": "plain",
    "tailorVerified": false,
    "disclaimer": "All pattern measurements are rectangle-based approximations for scrap cutting and must be verified by a professional tailor before final cutting.",
    "materials": [
      {
        "name": "Lightweight fabric scraps (cotton, silk, georgette, satin)",
        "qty": "Approx 10x50 cm flat area",
        "optional": false,
        "source": "Standard sewing notion",
        "disclaimer": "typical default, to be verified by a tailor",
        "note": "typical default, to be verified by a tailor"
      },
      {
        "name": "Braided elastic (6 mm / 1/4 inch)",
        "qty": "18 - 22 cm",
        "optional": false,
        "source": "Standard sewing notion",
        "disclaimer": "typical default, to be verified by a tailor",
        "note": "typical default, to be verified by a tailor"
      },
      {
        "name": "Safety pin for threading elastic",
        "qty": "1 unit",
        "optional": false,
        "source": "Standard sewing notion",
        "disclaimer": "typical default, to be verified by a tailor",
        "note": "typical default, to be verified by a tailor"
      },
      {
        "name": "Fine sewing thread",
        "qty": "1 spool",
        "optional": false,
        "source": "Standard sewing notion",
        "disclaimer": "typical default, to be verified by a tailor",
        "note": "typical default, to be verified by a tailor"
      }
    ],
    "timeEstimateFormula": null,
    "stitchingSteps": [],
    "sizes": {
      "small": {
        "label": "Small (Slim 8 × 40 cm)",
        "finishedWidthCm": 8,
        "finishedHeightCm": 40,
        "finishedDimensions": {
          "widthCm": 8,
          "heightCm": 40
        },
        "zones": [
          {
            "id": "scrunchie_strip",
            "name": "Scrunchie Ruffled Strip",
            "names": {
              "en": "Scrunchie Ruffled Strip",
              "hi": "स्क्रंची की मुख्य पट्टी",
              "te": "స్క్రంచీ కుచ్చుల పట్టీ"
            },
            "role": "base",
            "width": 8,
            "height": 40,
            "cutWidth": 10,
            "cutHeight": 42,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 8,
              "finishedHeightCm": 40,
              "finishedAreaCm2": 320,
              "cutWidthCm": 10,
              "cutHeightCm": 42
            },
            "provenance": null,
            "mapping3D": null
          }
        ],
        "pieces": [
          {
            "id": "scrunchie_strip",
            "name": "Scrunchie Ruffled Strip",
            "names": {
              "en": "Scrunchie Ruffled Strip",
              "hi": "स्क्रंची की मुख्य पट्टी",
              "te": "స్క్రంచీ కుచ్చుల పట్టీ"
            },
            "role": "base",
            "width": 8,
            "height": 40,
            "cutWidth": 10,
            "cutHeight": 42,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 8,
              "finishedHeightCm": 40,
              "finishedAreaCm2": 320,
              "cutWidthCm": 10,
              "cutHeightCm": 42
            },
            "provenance": null,
            "mapping3D": null
          }
        ]
      },
      "medium": {
        "label": "Medium (Classic 10 × 50 cm)",
        "finishedWidthCm": 10,
        "finishedHeightCm": 50,
        "finishedDimensions": {
          "widthCm": 10,
          "heightCm": 50
        },
        "zones": [
          {
            "id": "scrunchie_strip",
            "name": "Scrunchie Ruffled Strip",
            "names": {
              "en": "Scrunchie Ruffled Strip",
              "hi": "स्क्रंची की मुख्य पट्टी",
              "te": "స్క్రంచీ కుచ్చుల పట్టీ"
            },
            "role": "base",
            "width": 10,
            "height": 50,
            "cutWidth": 12,
            "cutHeight": 52,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 10,
              "finishedHeightCm": 50,
              "finishedAreaCm2": 500,
              "cutWidthCm": 12,
              "cutHeightCm": 52
            },
            "provenance": null,
            "mapping3D": null
          }
        ],
        "pieces": [
          {
            "id": "scrunchie_strip",
            "name": "Scrunchie Ruffled Strip",
            "names": {
              "en": "Scrunchie Ruffled Strip",
              "hi": "स्क्रंची की मुख्य पट्टी",
              "te": "స్క్రంచీ కుచ్చుల పట్టీ"
            },
            "role": "base",
            "width": 10,
            "height": 50,
            "cutWidth": 12,
            "cutHeight": 52,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 10,
              "finishedHeightCm": 50,
              "finishedAreaCm2": 500,
              "cutWidthCm": 12,
              "cutHeightCm": 52
            },
            "provenance": null,
            "mapping3D": null
          }
        ]
      },
      "large": {
        "label": "Large (Fluffy 14 × 60 cm)",
        "finishedWidthCm": 14,
        "finishedHeightCm": 60,
        "finishedDimensions": {
          "widthCm": 14,
          "heightCm": 60
        },
        "zones": [
          {
            "id": "scrunchie_strip",
            "name": "Scrunchie Ruffled Strip",
            "names": {
              "en": "Scrunchie Ruffled Strip",
              "hi": "स्क्रंची की मुख्य पट्टी",
              "te": "స్క్రంచీ కుచ్చుల పట్టీ"
            },
            "role": "base",
            "width": 14,
            "height": 60,
            "cutWidth": 16,
            "cutHeight": 62,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 14,
              "finishedHeightCm": 60,
              "finishedAreaCm2": 840,
              "cutWidthCm": 16,
              "cutHeightCm": 62
            },
            "provenance": null,
            "mapping3D": null
          }
        ],
        "pieces": [
          {
            "id": "scrunchie_strip",
            "name": "Scrunchie Ruffled Strip",
            "names": {
              "en": "Scrunchie Ruffled Strip",
              "hi": "स्क्रंची की मुख्य पट्टी",
              "te": "స్క్రంచీ కుచ్చుల పట్టీ"
            },
            "role": "base",
            "width": 14,
            "height": 60,
            "cutWidth": 16,
            "cutHeight": 62,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 14,
              "finishedHeightCm": 60,
              "finishedAreaCm2": 840,
              "cutWidthCm": 16,
              "cutHeightCm": 62
            },
            "provenance": null,
            "mapping3D": null
          }
        ]
      }
    }
  },
  "table_runner": {
    "schemaVersion": "1.0.0",
    "id": "table_runner",
    "name": "Table Runner",
    "names": {
      "en": "Table Runner",
      "hi": "मेज़पोश रनर",
      "te": "డైనింగ్ టేబుల్ రన్నర్"
    },
    "category": "home",
    "construction": "flat",
    "description": "Decorative dining table runner assembled from 3 center patchwork body zones and contrasting border ends.",
    "defaultVariant": "plain",
    "tailorVerified": false,
    "disclaimer": "All pattern measurements are rectangle-based approximations for scrap cutting and must be verified by a professional tailor before final cutting.",
    "materials": [
      {
        "name": "Medium or heavyweight cotton/linen scraps",
        "qty": "Approx 40x140 cm total area",
        "optional": false,
        "source": "Standard sewing notion",
        "disclaimer": "typical default, to be verified by a tailor",
        "note": "typical default, to be verified by a tailor"
      },
      {
        "name": "Lightweight fusible interfacing (optional for body)",
        "qty": "Matching runner dimensions",
        "optional": true,
        "source": "Standard sewing notion",
        "disclaimer": "typical default, to be verified by a tailor",
        "note": "typical default, to be verified by a tailor"
      },
      {
        "name": "Matching topstitching thread",
        "qty": "1 spool (100 m)",
        "optional": false,
        "source": "Standard sewing notion",
        "disclaimer": "typical default, to be verified by a tailor",
        "note": "typical default, to be verified by a tailor"
      }
    ],
    "timeEstimateFormula": null,
    "stitchingSteps": [],
    "sizes": {
      "small": {
        "label": "Small (Coffee Table 30 × 90 cm)",
        "finishedWidthCm": 30,
        "finishedHeightCm": 90,
        "finishedDimensions": {
          "widthCm": 30,
          "heightCm": 90
        },
        "zones": [
          {
            "id": "border_band_left",
            "name": "Left Border Band",
            "names": {
              "en": "Left Border Band",
              "hi": "बाईं किनारी पट्टी",
              "te": "ఎడమ సరిహద్దు పట్టీ"
            },
            "role": "accent",
            "width": 30,
            "height": 10,
            "cutWidth": 32,
            "cutHeight": 12,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 30,
              "finishedHeightCm": 10,
              "finishedAreaCm2": 300,
              "cutWidthCm": 32,
              "cutHeightCm": 12
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "center_left",
            "name": "Center Left Section",
            "names": {
              "en": "Center Left Section",
              "hi": "मध्य बायाँ हिस्सा",
              "te": "మధ్య ఎడమ భాగం"
            },
            "role": "base",
            "width": 30,
            "height": 23,
            "cutWidth": 32,
            "cutHeight": 25,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 30,
              "finishedHeightCm": 23,
              "finishedAreaCm2": 690,
              "cutWidthCm": 32,
              "cutHeightCm": 25
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "center_middle",
            "name": "Center Middle Section",
            "names": {
              "en": "Center Middle Section",
              "hi": "मध्य केंद्रीय हिस्सा",
              "te": "మధ్య కేంద్ర భాగం"
            },
            "role": "base",
            "width": 30,
            "height": 24,
            "cutWidth": 32,
            "cutHeight": 26,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 30,
              "finishedHeightCm": 24,
              "finishedAreaCm2": 720,
              "cutWidthCm": 32,
              "cutHeightCm": 26
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "center_right",
            "name": "Center Right Section",
            "names": {
              "en": "Center Right Section",
              "hi": "मध्य दायाँ हिस्सा",
              "te": "మధ్య కుడి భాగం"
            },
            "role": "base",
            "width": 30,
            "height": 23,
            "cutWidth": 32,
            "cutHeight": 25,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 30,
              "finishedHeightCm": 23,
              "finishedAreaCm2": 690,
              "cutWidthCm": 32,
              "cutHeightCm": 25
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "border_band_right",
            "name": "Right Border Band",
            "names": {
              "en": "Right Border Band",
              "hi": "दाईं किनारी पट्टी",
              "te": "కుడి సరిహద్దు పట్టీ"
            },
            "role": "accent",
            "width": 30,
            "height": 10,
            "cutWidth": 32,
            "cutHeight": 12,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 30,
              "finishedHeightCm": 10,
              "finishedAreaCm2": 300,
              "cutWidthCm": 32,
              "cutHeightCm": 12
            },
            "provenance": null,
            "mapping3D": null
          }
        ],
        "pieces": [
          {
            "id": "border_band_left",
            "name": "Left Border Band",
            "names": {
              "en": "Left Border Band",
              "hi": "बाईं किनारी पट्टी",
              "te": "ఎడమ సరిహద్దు పట్టీ"
            },
            "role": "accent",
            "width": 30,
            "height": 10,
            "cutWidth": 32,
            "cutHeight": 12,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 30,
              "finishedHeightCm": 10,
              "finishedAreaCm2": 300,
              "cutWidthCm": 32,
              "cutHeightCm": 12
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "center_left",
            "name": "Center Left Section",
            "names": {
              "en": "Center Left Section",
              "hi": "मध्य बायाँ हिस्सा",
              "te": "మధ్య ఎడమ భాగం"
            },
            "role": "base",
            "width": 30,
            "height": 23,
            "cutWidth": 32,
            "cutHeight": 25,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 30,
              "finishedHeightCm": 23,
              "finishedAreaCm2": 690,
              "cutWidthCm": 32,
              "cutHeightCm": 25
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "center_middle",
            "name": "Center Middle Section",
            "names": {
              "en": "Center Middle Section",
              "hi": "मध्य केंद्रीय हिस्सा",
              "te": "మధ్య కేంద్ర భాగం"
            },
            "role": "base",
            "width": 30,
            "height": 24,
            "cutWidth": 32,
            "cutHeight": 26,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 30,
              "finishedHeightCm": 24,
              "finishedAreaCm2": 720,
              "cutWidthCm": 32,
              "cutHeightCm": 26
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "center_right",
            "name": "Center Right Section",
            "names": {
              "en": "Center Right Section",
              "hi": "मध्य दायाँ हिस्सा",
              "te": "మధ్య కుడి భాగం"
            },
            "role": "base",
            "width": 30,
            "height": 23,
            "cutWidth": 32,
            "cutHeight": 25,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 30,
              "finishedHeightCm": 23,
              "finishedAreaCm2": 690,
              "cutWidthCm": 32,
              "cutHeightCm": 25
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "border_band_right",
            "name": "Right Border Band",
            "names": {
              "en": "Right Border Band",
              "hi": "दाईं किनारी पट्टी",
              "te": "కుడి సరిహద్దు పట్టీ"
            },
            "role": "accent",
            "width": 30,
            "height": 10,
            "cutWidth": 32,
            "cutHeight": 12,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 30,
              "finishedHeightCm": 10,
              "finishedAreaCm2": 300,
              "cutWidthCm": 32,
              "cutHeightCm": 12
            },
            "provenance": null,
            "mapping3D": null
          }
        ]
      },
      "medium": {
        "label": "Medium (4-6 Seater 35 × 140 cm)",
        "finishedWidthCm": 35,
        "finishedHeightCm": 140,
        "finishedDimensions": {
          "widthCm": 35,
          "heightCm": 140
        },
        "zones": [
          {
            "id": "border_band_left",
            "name": "Left Border Band",
            "names": {
              "en": "Left Border Band",
              "hi": "बाईं किनारी पट्टी",
              "te": "ఎడమ సరిహద్దు పట్టీ"
            },
            "role": "accent",
            "width": 35,
            "height": 15,
            "cutWidth": 37,
            "cutHeight": 17,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 35,
              "finishedHeightCm": 15,
              "finishedAreaCm2": 525,
              "cutWidthCm": 37,
              "cutHeightCm": 17
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "center_left",
            "name": "Center Left Section",
            "names": {
              "en": "Center Left Section",
              "hi": "मध्य बायाँ हिस्सा",
              "te": "మధ్య ఎడమ భాగం"
            },
            "role": "base",
            "width": 35,
            "height": 36,
            "cutWidth": 37,
            "cutHeight": 38,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 35,
              "finishedHeightCm": 36,
              "finishedAreaCm2": 1260,
              "cutWidthCm": 37,
              "cutHeightCm": 38
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "center_middle",
            "name": "Center Middle Section",
            "names": {
              "en": "Center Middle Section",
              "hi": "मध्य केंद्रीय हिस्सा",
              "te": "మధ్య కేంద్ర భాగం"
            },
            "role": "base",
            "width": 35,
            "height": 38,
            "cutWidth": 37,
            "cutHeight": 40,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 35,
              "finishedHeightCm": 38,
              "finishedAreaCm2": 1330,
              "cutWidthCm": 37,
              "cutHeightCm": 40
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "center_right",
            "name": "Center Right Section",
            "names": {
              "en": "Center Right Section",
              "hi": "मध्य दायाँ हिस्सा",
              "te": "మధ్య కుడి భాగం"
            },
            "role": "base",
            "width": 35,
            "height": 36,
            "cutWidth": 37,
            "cutHeight": 38,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 35,
              "finishedHeightCm": 36,
              "finishedAreaCm2": 1260,
              "cutWidthCm": 37,
              "cutHeightCm": 38
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "border_band_right",
            "name": "Right Border Band",
            "names": {
              "en": "Right Border Band",
              "hi": "दाईं किनारी पट्टी",
              "te": "కుడి సరిహద్దు పట్టీ"
            },
            "role": "accent",
            "width": 35,
            "height": 15,
            "cutWidth": 37,
            "cutHeight": 17,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 35,
              "finishedHeightCm": 15,
              "finishedAreaCm2": 525,
              "cutWidthCm": 37,
              "cutHeightCm": 17
            },
            "provenance": null,
            "mapping3D": null
          }
        ],
        "pieces": [
          {
            "id": "border_band_left",
            "name": "Left Border Band",
            "names": {
              "en": "Left Border Band",
              "hi": "बाईं किनारी पट्टी",
              "te": "ఎడమ సరిహద్దు పట్టీ"
            },
            "role": "accent",
            "width": 35,
            "height": 15,
            "cutWidth": 37,
            "cutHeight": 17,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 35,
              "finishedHeightCm": 15,
              "finishedAreaCm2": 525,
              "cutWidthCm": 37,
              "cutHeightCm": 17
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "center_left",
            "name": "Center Left Section",
            "names": {
              "en": "Center Left Section",
              "hi": "मध्य बायाँ हिस्सा",
              "te": "మధ్య ఎడమ భాగం"
            },
            "role": "base",
            "width": 35,
            "height": 36,
            "cutWidth": 37,
            "cutHeight": 38,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 35,
              "finishedHeightCm": 36,
              "finishedAreaCm2": 1260,
              "cutWidthCm": 37,
              "cutHeightCm": 38
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "center_middle",
            "name": "Center Middle Section",
            "names": {
              "en": "Center Middle Section",
              "hi": "मध्य केंद्रीय हिस्सा",
              "te": "మధ్య కేంద్ర భాగం"
            },
            "role": "base",
            "width": 35,
            "height": 38,
            "cutWidth": 37,
            "cutHeight": 40,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 35,
              "finishedHeightCm": 38,
              "finishedAreaCm2": 1330,
              "cutWidthCm": 37,
              "cutHeightCm": 40
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "center_right",
            "name": "Center Right Section",
            "names": {
              "en": "Center Right Section",
              "hi": "मध्य दायाँ हिस्सा",
              "te": "మధ్య కుడి భాగం"
            },
            "role": "base",
            "width": 35,
            "height": 36,
            "cutWidth": 37,
            "cutHeight": 38,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 35,
              "finishedHeightCm": 36,
              "finishedAreaCm2": 1260,
              "cutWidthCm": 37,
              "cutHeightCm": 38
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "border_band_right",
            "name": "Right Border Band",
            "names": {
              "en": "Right Border Band",
              "hi": "दाईं किनारी पट्टी",
              "te": "కుడి సరిహద్దు పట్టీ"
            },
            "role": "accent",
            "width": 35,
            "height": 15,
            "cutWidth": 37,
            "cutHeight": 17,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 35,
              "finishedHeightCm": 15,
              "finishedAreaCm2": 525,
              "cutWidthCm": 37,
              "cutHeightCm": 17
            },
            "provenance": null,
            "mapping3D": null
          }
        ]
      },
      "large": {
        "label": "Large (8-10 Seater 40 × 180 cm)",
        "finishedWidthCm": 40,
        "finishedHeightCm": 180,
        "finishedDimensions": {
          "widthCm": 40,
          "heightCm": 180
        },
        "zones": [
          {
            "id": "border_band_left",
            "name": "Left Border Band",
            "names": {
              "en": "Left Border Band",
              "hi": "बाईं किनारी पट्टी",
              "te": "ఎడమ సరిహద్దు పట్టీ"
            },
            "role": "accent",
            "width": 40,
            "height": 20,
            "cutWidth": 42,
            "cutHeight": 22,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 40,
              "finishedHeightCm": 20,
              "finishedAreaCm2": 800,
              "cutWidthCm": 42,
              "cutHeightCm": 22
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "center_left",
            "name": "Center Left Section",
            "names": {
              "en": "Center Left Section",
              "hi": "मध्य बायाँ हिस्सा",
              "te": "మధ్య ఎడమ భాగం"
            },
            "role": "base",
            "width": 40,
            "height": 46,
            "cutWidth": 42,
            "cutHeight": 48,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 40,
              "finishedHeightCm": 46,
              "finishedAreaCm2": 1840,
              "cutWidthCm": 42,
              "cutHeightCm": 48
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "center_middle",
            "name": "Center Middle Section",
            "names": {
              "en": "Center Middle Section",
              "hi": "मध्य केंद्रीय हिस्सा",
              "te": "మధ్య కేంద్ర భాగం"
            },
            "role": "base",
            "width": 40,
            "height": 48,
            "cutWidth": 42,
            "cutHeight": 50,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 40,
              "finishedHeightCm": 48,
              "finishedAreaCm2": 1920,
              "cutWidthCm": 42,
              "cutHeightCm": 50
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "center_right",
            "name": "Center Right Section",
            "names": {
              "en": "Center Right Section",
              "hi": "मध्य दायाँ हिस्सा",
              "te": "మధ్య కుడి భాగం"
            },
            "role": "base",
            "width": 40,
            "height": 46,
            "cutWidth": 42,
            "cutHeight": 48,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 40,
              "finishedHeightCm": 46,
              "finishedAreaCm2": 1840,
              "cutWidthCm": 42,
              "cutHeightCm": 48
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "border_band_right",
            "name": "Right Border Band",
            "names": {
              "en": "Right Border Band",
              "hi": "दाईं किनारी पट्टी",
              "te": "కుడి సరిహద్దు పట్టీ"
            },
            "role": "accent",
            "width": 40,
            "height": 20,
            "cutWidth": 42,
            "cutHeight": 22,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 40,
              "finishedHeightCm": 20,
              "finishedAreaCm2": 800,
              "cutWidthCm": 42,
              "cutHeightCm": 22
            },
            "provenance": null,
            "mapping3D": null
          }
        ],
        "pieces": [
          {
            "id": "border_band_left",
            "name": "Left Border Band",
            "names": {
              "en": "Left Border Band",
              "hi": "बाईं किनारी पट्टी",
              "te": "ఎడమ సరిహద్దు పట్టీ"
            },
            "role": "accent",
            "width": 40,
            "height": 20,
            "cutWidth": 42,
            "cutHeight": 22,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 40,
              "finishedHeightCm": 20,
              "finishedAreaCm2": 800,
              "cutWidthCm": 42,
              "cutHeightCm": 22
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "center_left",
            "name": "Center Left Section",
            "names": {
              "en": "Center Left Section",
              "hi": "मध्य बायाँ हिस्सा",
              "te": "మధ్య ఎడమ భాగం"
            },
            "role": "base",
            "width": 40,
            "height": 46,
            "cutWidth": 42,
            "cutHeight": 48,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 40,
              "finishedHeightCm": 46,
              "finishedAreaCm2": 1840,
              "cutWidthCm": 42,
              "cutHeightCm": 48
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "center_middle",
            "name": "Center Middle Section",
            "names": {
              "en": "Center Middle Section",
              "hi": "मध्य केंद्रीय हिस्सा",
              "te": "మధ్య కేంద్ర భాగం"
            },
            "role": "base",
            "width": 40,
            "height": 48,
            "cutWidth": 42,
            "cutHeight": 50,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 40,
              "finishedHeightCm": 48,
              "finishedAreaCm2": 1920,
              "cutWidthCm": 42,
              "cutHeightCm": 50
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "center_right",
            "name": "Center Right Section",
            "names": {
              "en": "Center Right Section",
              "hi": "मध्य दायाँ हिस्सा",
              "te": "మధ్య కుడి భాగం"
            },
            "role": "base",
            "width": 40,
            "height": 46,
            "cutWidth": 42,
            "cutHeight": 48,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 40,
              "finishedHeightCm": 46,
              "finishedAreaCm2": 1840,
              "cutWidthCm": 42,
              "cutHeightCm": 48
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "border_band_right",
            "name": "Right Border Band",
            "names": {
              "en": "Right Border Band",
              "hi": "दाईं किनारी पट्टी",
              "te": "కుడి సరిహద్దు పట్టీ"
            },
            "role": "accent",
            "width": 40,
            "height": 20,
            "cutWidth": 42,
            "cutHeight": 22,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 40,
              "finishedHeightCm": 20,
              "finishedAreaCm2": 800,
              "cutWidthCm": 42,
              "cutHeightCm": 22
            },
            "provenance": null,
            "mapping3D": null
          }
        ]
      }
    }
  },
  "placemat": {
    "schemaVersion": "1.0.0",
    "id": "placemat",
    "name": "Dining Placemat",
    "names": {
      "en": "Dining Placemat",
      "hi": "डाइनिंग प्लेसमैट",
      "te": "భోజన పళ్ళెం మ్యాట్"
    },
    "category": "home",
    "construction": "flat",
    "description": "Double-sided quilted dining placemat stitched from colorful patchwork cotton or canvas scraps.",
    "defaultVariant": "plain",
    "tailorVerified": false,
    "disclaimer": "All pattern measurements are rectangle-based approximations for scrap cutting and must be verified by a professional tailor before final cutting.",
    "materials": [
      {
        "name": "Cotton canvas or denim scraps",
        "qty": "Approx 35x45 cm total area",
        "optional": false,
        "source": "Standard sewing notion",
        "disclaimer": "typical default, to be verified by a tailor",
        "note": "typical default, to be verified by a tailor"
      },
      {
        "name": "Plain cotton backing fabric or fleece batting",
        "qty": "Matching finished size",
        "optional": false,
        "source": "Standard sewing notion",
        "disclaimer": "typical default, to be verified by a tailor",
        "note": "typical default, to be verified by a tailor"
      },
      {
        "name": "Bias binding tape (12 mm / 1/2 inch)",
        "qty": "1.2 - 1.8 meters",
        "optional": false,
        "source": "Standard sewing notion",
        "disclaimer": "typical default, to be verified by a tailor",
        "note": "typical default, to be verified by a tailor"
      },
      {
        "name": "Heavy-duty topstitching thread",
        "qty": "1 spool",
        "optional": false,
        "source": "Standard sewing notion",
        "disclaimer": "typical default, to be verified by a tailor",
        "note": "typical default, to be verified by a tailor"
      }
    ],
    "timeEstimateFormula": null,
    "stitchingSteps": [],
    "sizes": {
      "small": {
        "label": "Small (Tea/Snack Mat 30 × 22 cm)",
        "finishedWidthCm": 30,
        "finishedHeightCm": 22,
        "finishedDimensions": {
          "widthCm": 30,
          "heightCm": 22
        },
        "zones": [
          {
            "id": "placemat_front",
            "name": "Placemat Front Surface",
            "names": {
              "en": "Placemat Front Surface",
              "hi": "प्लेसमैट का ऊपरी भाग",
              "te": "మ్యాట్ పై భాగం"
            },
            "role": "base",
            "width": 30,
            "height": 22,
            "cutWidth": 32,
            "cutHeight": 24,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 30,
              "finishedHeightCm": 22,
              "finishedAreaCm2": 660,
              "cutWidthCm": 32,
              "cutHeightCm": 24
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "placemat_back",
            "name": "Placemat Back Lining",
            "names": {
              "en": "Placemat Back Lining",
              "hi": "प्लेसमैट का अस्तर",
              "te": "మ్యాట్ వెనుక భాగం"
            },
            "role": "supporting",
            "width": 30,
            "height": 22,
            "cutWidth": 32,
            "cutHeight": 24,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 30,
              "finishedHeightCm": 22,
              "finishedAreaCm2": 660,
              "cutWidthCm": 32,
              "cutHeightCm": 24
            },
            "provenance": null,
            "mapping3D": null
          }
        ],
        "pieces": [
          {
            "id": "placemat_front",
            "name": "Placemat Front Surface",
            "names": {
              "en": "Placemat Front Surface",
              "hi": "प्लेसमैट का ऊपरी भाग",
              "te": "మ్యాట్ పై భాగం"
            },
            "role": "base",
            "width": 30,
            "height": 22,
            "cutWidth": 32,
            "cutHeight": 24,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 30,
              "finishedHeightCm": 22,
              "finishedAreaCm2": 660,
              "cutWidthCm": 32,
              "cutHeightCm": 24
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "placemat_back",
            "name": "Placemat Back Lining",
            "names": {
              "en": "Placemat Back Lining",
              "hi": "प्लेसमैट का अस्तर",
              "te": "మ్యాట్ వెనుక భాగం"
            },
            "role": "supporting",
            "width": 30,
            "height": 22,
            "cutWidth": 32,
            "cutHeight": 24,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 30,
              "finishedHeightCm": 22,
              "finishedAreaCm2": 660,
              "cutWidthCm": 32,
              "cutHeightCm": 24
            },
            "provenance": null,
            "mapping3D": null
          }
        ]
      },
      "medium": {
        "label": "Medium (Standard Dinner 40 × 30 cm)",
        "finishedWidthCm": 40,
        "finishedHeightCm": 30,
        "finishedDimensions": {
          "widthCm": 40,
          "heightCm": 30
        },
        "zones": [
          {
            "id": "placemat_front",
            "name": "Placemat Front Surface",
            "names": {
              "en": "Placemat Front Surface",
              "hi": "प्लेसमैट का ऊपरी भाग",
              "te": "మ్యాట్ పై భాగం"
            },
            "role": "base",
            "width": 40,
            "height": 30,
            "cutWidth": 42,
            "cutHeight": 32,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 40,
              "finishedHeightCm": 30,
              "finishedAreaCm2": 1200,
              "cutWidthCm": 42,
              "cutHeightCm": 32
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "placemat_back",
            "name": "Placemat Back Lining",
            "names": {
              "en": "Placemat Back Lining",
              "hi": "प्लेसमैट का अस्तर",
              "te": "మ్యాట్ వెనుక భాగం"
            },
            "role": "supporting",
            "width": 40,
            "height": 30,
            "cutWidth": 42,
            "cutHeight": 32,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 40,
              "finishedHeightCm": 30,
              "finishedAreaCm2": 1200,
              "cutWidthCm": 42,
              "cutHeightCm": 32
            },
            "provenance": null,
            "mapping3D": null
          }
        ],
        "pieces": [
          {
            "id": "placemat_front",
            "name": "Placemat Front Surface",
            "names": {
              "en": "Placemat Front Surface",
              "hi": "प्लेसमैट का ऊपरी भाग",
              "te": "మ్యాట్ పై భాగం"
            },
            "role": "base",
            "width": 40,
            "height": 30,
            "cutWidth": 42,
            "cutHeight": 32,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 40,
              "finishedHeightCm": 30,
              "finishedAreaCm2": 1200,
              "cutWidthCm": 42,
              "cutHeightCm": 32
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "placemat_back",
            "name": "Placemat Back Lining",
            "names": {
              "en": "Placemat Back Lining",
              "hi": "प्लेसमैट का अस्तर",
              "te": "మ్యాట్ వెనుక భాగం"
            },
            "role": "supporting",
            "width": 40,
            "height": 30,
            "cutWidth": 42,
            "cutHeight": 32,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 40,
              "finishedHeightCm": 30,
              "finishedAreaCm2": 1200,
              "cutWidthCm": 42,
              "cutHeightCm": 32
            },
            "provenance": null,
            "mapping3D": null
          }
        ]
      },
      "large": {
        "label": "Large (Charger Dinner 45 × 35 cm)",
        "finishedWidthCm": 45,
        "finishedHeightCm": 35,
        "finishedDimensions": {
          "widthCm": 45,
          "heightCm": 35
        },
        "zones": [
          {
            "id": "placemat_front",
            "name": "Placemat Front Surface",
            "names": {
              "en": "Placemat Front Surface",
              "hi": "प्लेसमैट का ऊपरी भाग",
              "te": "మ్యాట్ పై భాగం"
            },
            "role": "base",
            "width": 45,
            "height": 35,
            "cutWidth": 47,
            "cutHeight": 37,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 45,
              "finishedHeightCm": 35,
              "finishedAreaCm2": 1575,
              "cutWidthCm": 47,
              "cutHeightCm": 37
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "placemat_back",
            "name": "Placemat Back Lining",
            "names": {
              "en": "Placemat Back Lining",
              "hi": "प्लेसमैट का अस्तर",
              "te": "మ్యాట్ వెనుక భాగం"
            },
            "role": "supporting",
            "width": 45,
            "height": 35,
            "cutWidth": 47,
            "cutHeight": 37,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 45,
              "finishedHeightCm": 35,
              "finishedAreaCm2": 1575,
              "cutWidthCm": 47,
              "cutHeightCm": 37
            },
            "provenance": null,
            "mapping3D": null
          }
        ],
        "pieces": [
          {
            "id": "placemat_front",
            "name": "Placemat Front Surface",
            "names": {
              "en": "Placemat Front Surface",
              "hi": "प्लेसमैट का ऊपरी भाग",
              "te": "మ్యాట్ పై భాగం"
            },
            "role": "base",
            "width": 45,
            "height": 35,
            "cutWidth": 47,
            "cutHeight": 37,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 45,
              "finishedHeightCm": 35,
              "finishedAreaCm2": 1575,
              "cutWidthCm": 47,
              "cutHeightCm": 37
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "placemat_back",
            "name": "Placemat Back Lining",
            "names": {
              "en": "Placemat Back Lining",
              "hi": "प्लेसमैट का अस्तर",
              "te": "మ్యాట్ వెనుక భాగం"
            },
            "role": "supporting",
            "width": 45,
            "height": 35,
            "cutWidth": 47,
            "cutHeight": 37,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 45,
              "finishedHeightCm": 35,
              "finishedAreaCm2": 1575,
              "cutWidthCm": 47,
              "cutHeightCm": 37
            },
            "provenance": null,
            "mapping3D": null
          }
        ]
      }
    }
  },
  "coin_purse": {
    "schemaVersion": "1.0.0",
    "id": "coin_purse",
    "name": "Coin Purse",
    "names": {
      "en": "Coin Purse",
      "hi": "छोटा सिक्का बटुआ",
      "te": "చిల్లర పైసల పర్స్"
    },
    "category": "accessories",
    "construction": "pouch",
    "description": "Pocket-sized zippered coin and change pouch with a keyring loop tab made from sturdy fabric offcuts.",
    "defaultVariant": "plain",
    "tailorVerified": false,
    "disclaimer": "All pattern measurements are rectangle-based approximations for scrap cutting and must be verified by a professional tailor before final cutting.",
    "materials": [
      {
        "name": "Sturdy cotton, denim, or linen scraps",
        "qty": "Approx 15x15 cm total area",
        "optional": false,
        "source": "Standard sewing notion",
        "disclaimer": "typical default, to be verified by a tailor",
        "note": "typical default, to be verified by a tailor"
      },
      {
        "name": "Closed-bottom nylon coil zipper (#3)",
        "qty": "10 - 14 cm",
        "optional": false,
        "source": "Standard sewing notion",
        "disclaimer": "typical default, to be verified by a tailor",
        "note": "typical default, to be verified by a tailor"
      },
      {
        "name": "Split metal keyring (20-25 mm)",
        "qty": "1 unit",
        "optional": true,
        "source": "Standard sewing notion",
        "disclaimer": "typical default, to be verified by a tailor",
        "note": "typical default, to be verified by a tailor"
      },
      {
        "name": "Sewing thread",
        "qty": "1 spool",
        "optional": false,
        "source": "Standard sewing notion",
        "disclaimer": "typical default, to be verified by a tailor",
        "note": "typical default, to be verified by a tailor"
      }
    ],
    "timeEstimateFormula": null,
    "stitchingSteps": [],
    "sizes": {
      "small": {
        "label": "Small (10 × 8 cm)",
        "finishedWidthCm": 10,
        "finishedHeightCm": 8,
        "finishedDimensions": {
          "widthCm": 10,
          "heightCm": 8
        },
        "zones": [
          {
            "id": "purse_front",
            "name": "Coin Purse Front",
            "names": {
              "en": "Coin Purse Front",
              "hi": "बटुए का अगला हिस्सा",
              "te": "పర్స్ ముందు భాగం"
            },
            "role": "base",
            "width": 10,
            "height": 8,
            "cutWidth": 12,
            "cutHeight": 10,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 10,
              "finishedHeightCm": 8,
              "finishedAreaCm2": 80,
              "cutWidthCm": 12,
              "cutHeightCm": 10
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "purse_back",
            "name": "Coin Purse Back",
            "names": {
              "en": "Coin Purse Back",
              "hi": "बटुए का पिछला हिस्सा",
              "te": "పర్స్ వెనుక భాగం"
            },
            "role": "base",
            "width": 10,
            "height": 8,
            "cutWidth": 12,
            "cutHeight": 10,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 10,
              "finishedHeightCm": 8,
              "finishedAreaCm2": 80,
              "cutWidthCm": 12,
              "cutHeightCm": 10
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "key_tab",
            "name": "Keyring Pull Tab",
            "names": {
              "en": "Keyring Pull Tab",
              "hi": "चाबी का छल्ला टैब",
              "te": "కీరింగ్ లాగే ట్యాబ్"
            },
            "role": "accent",
            "width": 3,
            "height": 6,
            "cutWidth": 5,
            "cutHeight": 8,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 3,
              "finishedHeightCm": 6,
              "finishedAreaCm2": 18,
              "cutWidthCm": 5,
              "cutHeightCm": 8
            },
            "provenance": null,
            "mapping3D": null
          }
        ],
        "pieces": [
          {
            "id": "purse_front",
            "name": "Coin Purse Front",
            "names": {
              "en": "Coin Purse Front",
              "hi": "बटुए का अगला हिस्सा",
              "te": "పర్స్ ముందు భాగం"
            },
            "role": "base",
            "width": 10,
            "height": 8,
            "cutWidth": 12,
            "cutHeight": 10,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 10,
              "finishedHeightCm": 8,
              "finishedAreaCm2": 80,
              "cutWidthCm": 12,
              "cutHeightCm": 10
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "purse_back",
            "name": "Coin Purse Back",
            "names": {
              "en": "Coin Purse Back",
              "hi": "बटुए का पिछला हिस्सा",
              "te": "పర్స్ వెనుక భాగం"
            },
            "role": "base",
            "width": 10,
            "height": 8,
            "cutWidth": 12,
            "cutHeight": 10,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 10,
              "finishedHeightCm": 8,
              "finishedAreaCm2": 80,
              "cutWidthCm": 12,
              "cutHeightCm": 10
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "key_tab",
            "name": "Keyring Pull Tab",
            "names": {
              "en": "Keyring Pull Tab",
              "hi": "चाबी का छल्ला टैब",
              "te": "కీరింగ్ లాగే ట్యాబ్"
            },
            "role": "accent",
            "width": 3,
            "height": 6,
            "cutWidth": 5,
            "cutHeight": 8,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 3,
              "finishedHeightCm": 6,
              "finishedAreaCm2": 18,
              "cutWidthCm": 5,
              "cutHeightCm": 8
            },
            "provenance": null,
            "mapping3D": null
          }
        ]
      },
      "medium": {
        "label": "Medium (12 × 9 cm)",
        "finishedWidthCm": 12,
        "finishedHeightCm": 9,
        "finishedDimensions": {
          "widthCm": 12,
          "heightCm": 9
        },
        "zones": [
          {
            "id": "purse_front",
            "name": "Coin Purse Front",
            "names": {
              "en": "Coin Purse Front",
              "hi": "बटुए का अगला हिस्सा",
              "te": "పర్స్ ముందు భాగం"
            },
            "role": "base",
            "width": 12,
            "height": 9,
            "cutWidth": 14,
            "cutHeight": 11,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 12,
              "finishedHeightCm": 9,
              "finishedAreaCm2": 108,
              "cutWidthCm": 14,
              "cutHeightCm": 11
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "purse_back",
            "name": "Coin Purse Back",
            "names": {
              "en": "Coin Purse Back",
              "hi": "बटुए का पिछला हिस्सा",
              "te": "పర్స్ వెనుక భాగం"
            },
            "role": "base",
            "width": 12,
            "height": 9,
            "cutWidth": 14,
            "cutHeight": 11,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 12,
              "finishedHeightCm": 9,
              "finishedAreaCm2": 108,
              "cutWidthCm": 14,
              "cutHeightCm": 11
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "key_tab",
            "name": "Keyring Pull Tab",
            "names": {
              "en": "Keyring Pull Tab",
              "hi": "चाबी का छल्ला टैब",
              "te": "కీరింగ్ లాగే ట్యాబ్"
            },
            "role": "accent",
            "width": 3,
            "height": 6,
            "cutWidth": 5,
            "cutHeight": 8,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 3,
              "finishedHeightCm": 6,
              "finishedAreaCm2": 18,
              "cutWidthCm": 5,
              "cutHeightCm": 8
            },
            "provenance": null,
            "mapping3D": null
          }
        ],
        "pieces": [
          {
            "id": "purse_front",
            "name": "Coin Purse Front",
            "names": {
              "en": "Coin Purse Front",
              "hi": "बटुए का अगला हिस्सा",
              "te": "పర్స్ ముందు భాగం"
            },
            "role": "base",
            "width": 12,
            "height": 9,
            "cutWidth": 14,
            "cutHeight": 11,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 12,
              "finishedHeightCm": 9,
              "finishedAreaCm2": 108,
              "cutWidthCm": 14,
              "cutHeightCm": 11
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "purse_back",
            "name": "Coin Purse Back",
            "names": {
              "en": "Coin Purse Back",
              "hi": "बटुए का पिछला हिस्सा",
              "te": "పర్స్ వెనుక భాగం"
            },
            "role": "base",
            "width": 12,
            "height": 9,
            "cutWidth": 14,
            "cutHeight": 11,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 12,
              "finishedHeightCm": 9,
              "finishedAreaCm2": 108,
              "cutWidthCm": 14,
              "cutHeightCm": 11
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "key_tab",
            "name": "Keyring Pull Tab",
            "names": {
              "en": "Keyring Pull Tab",
              "hi": "चाबी का छल्ला टैब",
              "te": "కీరింగ్ లాగే ట్యాబ్"
            },
            "role": "accent",
            "width": 3,
            "height": 6,
            "cutWidth": 5,
            "cutHeight": 8,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 3,
              "finishedHeightCm": 6,
              "finishedAreaCm2": 18,
              "cutWidthCm": 5,
              "cutHeightCm": 8
            },
            "provenance": null,
            "mapping3D": null
          }
        ]
      },
      "large": {
        "label": "Large (14 × 10 cm)",
        "finishedWidthCm": 14,
        "finishedHeightCm": 10,
        "finishedDimensions": {
          "widthCm": 14,
          "heightCm": 10
        },
        "zones": [
          {
            "id": "purse_front",
            "name": "Coin Purse Front",
            "names": {
              "en": "Coin Purse Front",
              "hi": "बटुए का अगला हिस्सा",
              "te": "పర్స్ ముందు భాగం"
            },
            "role": "base",
            "width": 14,
            "height": 10,
            "cutWidth": 16,
            "cutHeight": 12,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 14,
              "finishedHeightCm": 10,
              "finishedAreaCm2": 140,
              "cutWidthCm": 16,
              "cutHeightCm": 12
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "purse_back",
            "name": "Coin Purse Back",
            "names": {
              "en": "Coin Purse Back",
              "hi": "बटुए का पिछला हिस्सा",
              "te": "పర్స్ వెనుక భాగం"
            },
            "role": "base",
            "width": 14,
            "height": 10,
            "cutWidth": 16,
            "cutHeight": 12,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 14,
              "finishedHeightCm": 10,
              "finishedAreaCm2": 140,
              "cutWidthCm": 16,
              "cutHeightCm": 12
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "key_tab",
            "name": "Keyring Pull Tab",
            "names": {
              "en": "Keyring Pull Tab",
              "hi": "चाबी का छल्ला टैब",
              "te": "కీరింగ్ లాగే ట్యాబ్"
            },
            "role": "accent",
            "width": 3,
            "height": 6,
            "cutWidth": 5,
            "cutHeight": 8,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 3,
              "finishedHeightCm": 6,
              "finishedAreaCm2": 18,
              "cutWidthCm": 5,
              "cutHeightCm": 8
            },
            "provenance": null,
            "mapping3D": null
          }
        ],
        "pieces": [
          {
            "id": "purse_front",
            "name": "Coin Purse Front",
            "names": {
              "en": "Coin Purse Front",
              "hi": "बटुए का अगला हिस्सा",
              "te": "పర్స్ ముందు భాగం"
            },
            "role": "base",
            "width": 14,
            "height": 10,
            "cutWidth": 16,
            "cutHeight": 12,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 14,
              "finishedHeightCm": 10,
              "finishedAreaCm2": 140,
              "cutWidthCm": 16,
              "cutHeightCm": 12
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "purse_back",
            "name": "Coin Purse Back",
            "names": {
              "en": "Coin Purse Back",
              "hi": "बटुए का पिछला हिस्सा",
              "te": "పర్స్ వెనుక భాగం"
            },
            "role": "base",
            "width": 14,
            "height": 10,
            "cutWidth": 16,
            "cutHeight": 12,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 14,
              "finishedHeightCm": 10,
              "finishedAreaCm2": 140,
              "cutWidthCm": 16,
              "cutHeightCm": 12
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "key_tab",
            "name": "Keyring Pull Tab",
            "names": {
              "en": "Keyring Pull Tab",
              "hi": "चाबी का छल्ला टैब",
              "te": "కీరింగ్ లాగే ట్యాబ్"
            },
            "role": "accent",
            "width": 3,
            "height": 6,
            "cutWidth": 5,
            "cutHeight": 8,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 3,
              "finishedHeightCm": 6,
              "finishedAreaCm2": 18,
              "cutWidthCm": 5,
              "cutHeightCm": 8
            },
            "provenance": null,
            "mapping3D": null
          }
        ]
      }
    }
  },
  "pencil_case": {
    "schemaVersion": "1.0.0",
    "id": "pencil_case",
    "name": "Zippered Pencil Case",
    "names": {
      "en": "Zippered Pencil Case",
      "hi": "पेंसिल पाउच",
      "te": "పెన్సిల్ పౌచ్"
    },
    "category": "accessories",
    "construction": "pouch",
    "description": "Elongated zippered stationery and pen pouch with reinforced tab ends pieced from durable scraps.",
    "defaultVariant": "plain",
    "tailorVerified": false,
    "disclaimer": "All pattern measurements are rectangle-based approximations for scrap cutting and must be verified by a professional tailor before final cutting.",
    "materials": [
      {
        "name": "Durable cotton canvas or denim scraps",
        "qty": "Approx 25x30 cm total area",
        "optional": false,
        "source": "Standard sewing notion",
        "disclaimer": "typical default, to be verified by a tailor",
        "note": "typical default, to be verified by a tailor"
      },
      {
        "name": "Nylon coil zipper (#3 or #5)",
        "qty": "20 - 25 cm",
        "optional": false,
        "source": "Standard sewing notion",
        "disclaimer": "typical default, to be verified by a tailor",
        "note": "typical default, to be verified by a tailor"
      },
      {
        "name": "Medium fusible fleece or interfacing",
        "qty": "Matching case dimensions",
        "optional": true,
        "source": "Standard sewing notion",
        "disclaimer": "typical default, to be verified by a tailor",
        "note": "typical default, to be verified by a tailor"
      },
      {
        "name": "Heavy-duty topstitching thread",
        "qty": "1 spool",
        "optional": false,
        "source": "Standard sewing notion",
        "disclaimer": "typical default, to be verified by a tailor",
        "note": "typical default, to be verified by a tailor"
      }
    ],
    "timeEstimateFormula": null,
    "stitchingSteps": [],
    "sizes": {
      "small": {
        "label": "Small (Slim Sleeve 20 × 6 cm)",
        "finishedWidthCm": 20,
        "finishedHeightCm": 6,
        "finishedDimensions": {
          "widthCm": 20,
          "heightCm": 6
        },
        "zones": [
          {
            "id": "case_front",
            "name": "Pencil Case Front",
            "names": {
              "en": "Pencil Case Front",
              "hi": "केस का अगला हिस्सा",
              "te": "కేసు ముందు భాగం"
            },
            "role": "base",
            "width": 20,
            "height": 6,
            "cutWidth": 22,
            "cutHeight": 8,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 20,
              "finishedHeightCm": 6,
              "finishedAreaCm2": 120,
              "cutWidthCm": 22,
              "cutHeightCm": 8
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "case_back",
            "name": "Pencil Case Back",
            "names": {
              "en": "Pencil Case Back",
              "hi": "केस का पिछला हिस्सा",
              "te": "కేసు వెనుక భాగం"
            },
            "role": "base",
            "width": 20,
            "height": 6,
            "cutWidth": 22,
            "cutHeight": 8,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 20,
              "finishedHeightCm": 6,
              "finishedAreaCm2": 120,
              "cutWidthCm": 22,
              "cutHeightCm": 8
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "zipper_tab_start",
            "name": "Zipper Top Tab",
            "names": {
              "en": "Zipper Top Tab",
              "hi": "ज़िप्पर का ऊपरी टैब",
              "te": "జిప్పర్ పై ట్యాబ్"
            },
            "role": "accent",
            "width": 4,
            "height": 3,
            "cutWidth": 6,
            "cutHeight": 5,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 4,
              "finishedHeightCm": 3,
              "finishedAreaCm2": 12,
              "cutWidthCm": 6,
              "cutHeightCm": 5
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "zipper_tab_end",
            "name": "Zipper Bottom Tab",
            "names": {
              "en": "Zipper Bottom Tab",
              "hi": "ज़िप्पर का निचला टैब",
              "te": "జిప్పర్ కింది ట్యాబ్"
            },
            "role": "accent",
            "width": 4,
            "height": 3,
            "cutWidth": 6,
            "cutHeight": 5,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 4,
              "finishedHeightCm": 3,
              "finishedAreaCm2": 12,
              "cutWidthCm": 6,
              "cutHeightCm": 5
            },
            "provenance": null,
            "mapping3D": null
          }
        ],
        "pieces": [
          {
            "id": "case_front",
            "name": "Pencil Case Front",
            "names": {
              "en": "Pencil Case Front",
              "hi": "केस का अगला हिस्सा",
              "te": "కేసు ముందు భాగం"
            },
            "role": "base",
            "width": 20,
            "height": 6,
            "cutWidth": 22,
            "cutHeight": 8,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 20,
              "finishedHeightCm": 6,
              "finishedAreaCm2": 120,
              "cutWidthCm": 22,
              "cutHeightCm": 8
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "case_back",
            "name": "Pencil Case Back",
            "names": {
              "en": "Pencil Case Back",
              "hi": "केस का पिछला हिस्सा",
              "te": "కేసు వెనుక భాగం"
            },
            "role": "base",
            "width": 20,
            "height": 6,
            "cutWidth": 22,
            "cutHeight": 8,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 20,
              "finishedHeightCm": 6,
              "finishedAreaCm2": 120,
              "cutWidthCm": 22,
              "cutHeightCm": 8
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "zipper_tab_start",
            "name": "Zipper Top Tab",
            "names": {
              "en": "Zipper Top Tab",
              "hi": "ज़िप्पर का ऊपरी टैब",
              "te": "జిప్పర్ పై ట్యాబ్"
            },
            "role": "accent",
            "width": 4,
            "height": 3,
            "cutWidth": 6,
            "cutHeight": 5,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 4,
              "finishedHeightCm": 3,
              "finishedAreaCm2": 12,
              "cutWidthCm": 6,
              "cutHeightCm": 5
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "zipper_tab_end",
            "name": "Zipper Bottom Tab",
            "names": {
              "en": "Zipper Bottom Tab",
              "hi": "ज़िप्पर का निचला टैब",
              "te": "జిప్పర్ కింది ట్యాబ్"
            },
            "role": "accent",
            "width": 4,
            "height": 3,
            "cutWidth": 6,
            "cutHeight": 5,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 4,
              "finishedHeightCm": 3,
              "finishedAreaCm2": 12,
              "cutWidthCm": 6,
              "cutHeightCm": 5
            },
            "provenance": null,
            "mapping3D": null
          }
        ]
      },
      "medium": {
        "label": "Medium (Standard 21 × 9 cm)",
        "finishedWidthCm": 21,
        "finishedHeightCm": 9,
        "finishedDimensions": {
          "widthCm": 21,
          "heightCm": 9
        },
        "zones": [
          {
            "id": "case_front",
            "name": "Pencil Case Front",
            "names": {
              "en": "Pencil Case Front",
              "hi": "केस का अगला हिस्सा",
              "te": "కేసు ముందు భాగం"
            },
            "role": "base",
            "width": 21,
            "height": 9,
            "cutWidth": 23,
            "cutHeight": 11,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 21,
              "finishedHeightCm": 9,
              "finishedAreaCm2": 189,
              "cutWidthCm": 23,
              "cutHeightCm": 11
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "case_back",
            "name": "Pencil Case Back",
            "names": {
              "en": "Pencil Case Back",
              "hi": "केस का पिछला हिस्सा",
              "te": "కేసు వెనుక భాగం"
            },
            "role": "base",
            "width": 21,
            "height": 9,
            "cutWidth": 23,
            "cutHeight": 11,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 21,
              "finishedHeightCm": 9,
              "finishedAreaCm2": 189,
              "cutWidthCm": 23,
              "cutHeightCm": 11
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "zipper_tab_start",
            "name": "Zipper Top Tab",
            "names": {
              "en": "Zipper Top Tab",
              "hi": "ज़िप्पर का ऊपरी टैब",
              "te": "జిప్పర్ పై ట్యాబ్"
            },
            "role": "accent",
            "width": 4,
            "height": 3,
            "cutWidth": 6,
            "cutHeight": 5,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 4,
              "finishedHeightCm": 3,
              "finishedAreaCm2": 12,
              "cutWidthCm": 6,
              "cutHeightCm": 5
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "zipper_tab_end",
            "name": "Zipper Bottom Tab",
            "names": {
              "en": "Zipper Bottom Tab",
              "hi": "ज़िप्पर का निचला टैब",
              "te": "జిప్పర్ కింది ట్యాబ్"
            },
            "role": "accent",
            "width": 4,
            "height": 3,
            "cutWidth": 6,
            "cutHeight": 5,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 4,
              "finishedHeightCm": 3,
              "finishedAreaCm2": 12,
              "cutWidthCm": 6,
              "cutHeightCm": 5
            },
            "provenance": null,
            "mapping3D": null
          }
        ],
        "pieces": [
          {
            "id": "case_front",
            "name": "Pencil Case Front",
            "names": {
              "en": "Pencil Case Front",
              "hi": "केस का अगला हिस्सा",
              "te": "కేసు ముందు భాగం"
            },
            "role": "base",
            "width": 21,
            "height": 9,
            "cutWidth": 23,
            "cutHeight": 11,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 21,
              "finishedHeightCm": 9,
              "finishedAreaCm2": 189,
              "cutWidthCm": 23,
              "cutHeightCm": 11
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "case_back",
            "name": "Pencil Case Back",
            "names": {
              "en": "Pencil Case Back",
              "hi": "केस का पिछला हिस्सा",
              "te": "కేసు వెనుక భాగం"
            },
            "role": "base",
            "width": 21,
            "height": 9,
            "cutWidth": 23,
            "cutHeight": 11,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 21,
              "finishedHeightCm": 9,
              "finishedAreaCm2": 189,
              "cutWidthCm": 23,
              "cutHeightCm": 11
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "zipper_tab_start",
            "name": "Zipper Top Tab",
            "names": {
              "en": "Zipper Top Tab",
              "hi": "ज़िप्पर का ऊपरी टैब",
              "te": "జిప్పర్ పై ట్యాబ్"
            },
            "role": "accent",
            "width": 4,
            "height": 3,
            "cutWidth": 6,
            "cutHeight": 5,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 4,
              "finishedHeightCm": 3,
              "finishedAreaCm2": 12,
              "cutWidthCm": 6,
              "cutHeightCm": 5
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "zipper_tab_end",
            "name": "Zipper Bottom Tab",
            "names": {
              "en": "Zipper Bottom Tab",
              "hi": "ज़िप्पर का निचला टैब",
              "te": "జిప్పర్ కింది ట్యాబ్"
            },
            "role": "accent",
            "width": 4,
            "height": 3,
            "cutWidth": 6,
            "cutHeight": 5,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 4,
              "finishedHeightCm": 3,
              "finishedAreaCm2": 12,
              "cutWidthCm": 6,
              "cutHeightCm": 5
            },
            "provenance": null,
            "mapping3D": null
          }
        ]
      },
      "large": {
        "label": "Large (Wide Art Marker 22 × 12 cm)",
        "finishedWidthCm": 22,
        "finishedHeightCm": 12,
        "finishedDimensions": {
          "widthCm": 22,
          "heightCm": 12
        },
        "zones": [
          {
            "id": "case_front",
            "name": "Pencil Case Front",
            "names": {
              "en": "Pencil Case Front",
              "hi": "केस का अगला हिस्सा",
              "te": "కేసు ముందు భాగం"
            },
            "role": "base",
            "width": 22,
            "height": 12,
            "cutWidth": 24,
            "cutHeight": 14,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 22,
              "finishedHeightCm": 12,
              "finishedAreaCm2": 264,
              "cutWidthCm": 24,
              "cutHeightCm": 14
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "case_back",
            "name": "Pencil Case Back",
            "names": {
              "en": "Pencil Case Back",
              "hi": "केस का पिछला हिस्सा",
              "te": "కేసు వెనుక భాగం"
            },
            "role": "base",
            "width": 22,
            "height": 12,
            "cutWidth": 24,
            "cutHeight": 14,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 22,
              "finishedHeightCm": 12,
              "finishedAreaCm2": 264,
              "cutWidthCm": 24,
              "cutHeightCm": 14
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "zipper_tab_start",
            "name": "Zipper Top Tab",
            "names": {
              "en": "Zipper Top Tab",
              "hi": "ज़िप्पर का ऊपरी टैब",
              "te": "జిప్పర్ పై ట్యాబ్"
            },
            "role": "accent",
            "width": 4,
            "height": 3,
            "cutWidth": 6,
            "cutHeight": 5,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 4,
              "finishedHeightCm": 3,
              "finishedAreaCm2": 12,
              "cutWidthCm": 6,
              "cutHeightCm": 5
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "zipper_tab_end",
            "name": "Zipper Bottom Tab",
            "names": {
              "en": "Zipper Bottom Tab",
              "hi": "ज़िप्पर का निचला टैब",
              "te": "జిప్పర్ కింది ట్యాబ్"
            },
            "role": "accent",
            "width": 4,
            "height": 3,
            "cutWidth": 6,
            "cutHeight": 5,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 4,
              "finishedHeightCm": 3,
              "finishedAreaCm2": 12,
              "cutWidthCm": 6,
              "cutHeightCm": 5
            },
            "provenance": null,
            "mapping3D": null
          }
        ],
        "pieces": [
          {
            "id": "case_front",
            "name": "Pencil Case Front",
            "names": {
              "en": "Pencil Case Front",
              "hi": "केस का अगला हिस्सा",
              "te": "కేసు ముందు భాగం"
            },
            "role": "base",
            "width": 22,
            "height": 12,
            "cutWidth": 24,
            "cutHeight": 14,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 22,
              "finishedHeightCm": 12,
              "finishedAreaCm2": 264,
              "cutWidthCm": 24,
              "cutHeightCm": 14
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "case_back",
            "name": "Pencil Case Back",
            "names": {
              "en": "Pencil Case Back",
              "hi": "केस का पिछला हिस्सा",
              "te": "కేసు వెనుక భాగం"
            },
            "role": "base",
            "width": 22,
            "height": 12,
            "cutWidth": 24,
            "cutHeight": 14,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 22,
              "finishedHeightCm": 12,
              "finishedAreaCm2": 264,
              "cutWidthCm": 24,
              "cutHeightCm": 14
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "zipper_tab_start",
            "name": "Zipper Top Tab",
            "names": {
              "en": "Zipper Top Tab",
              "hi": "ज़िप्पर का ऊपरी टैब",
              "te": "జిప్పర్ పై ట్యాబ్"
            },
            "role": "accent",
            "width": 4,
            "height": 3,
            "cutWidth": 6,
            "cutHeight": 5,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 4,
              "finishedHeightCm": 3,
              "finishedAreaCm2": 12,
              "cutWidthCm": 6,
              "cutHeightCm": 5
            },
            "provenance": null,
            "mapping3D": null
          },
          {
            "id": "zipper_tab_end",
            "name": "Zipper Bottom Tab",
            "names": {
              "en": "Zipper Bottom Tab",
              "hi": "ज़िप्पर का निचला टैब",
              "te": "జిప్పర్ కింది ట్యాబ్"
            },
            "role": "accent",
            "width": 4,
            "height": 3,
            "cutWidth": 6,
            "cutHeight": 5,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "lengthwise",
              "symbol": "↕",
              "description": "Lengthwise grain"
            },
            "geometry": {
              "shapeType": "rectangle",
              "finishedWidthCm": 4,
              "finishedHeightCm": 3,
              "finishedAreaCm2": 12,
              "cutWidthCm": 6,
              "cutHeightCm": 5
            },
            "provenance": null,
            "mapping3D": null
          }
        ]
      }
    }
  }
};
