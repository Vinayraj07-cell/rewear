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
    "silhouette": {
      "type": "drawstring",
      "rx": 3,
      "ry": 3,
      "shadow": true,
      "shading": true,
      "casingGather": 0.9,
      "cord": {
        "color": "#D4C5B9",
        "tails": 2
      }
    },
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
    "silhouette": {
      "type": "ring",
      "shadow": true,
      "shading": true,
      "ruffles": 18,
      "outerRadius": 13,
      "innerRadius": 5.5
    },
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
    "silhouette": {
      "type": "runner",
      "shadow": true,
      "shading": true,
      "orientation": "horizontal",
      "hemStitch": {
        "inset": 1
      }
    },
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
    "silhouette": {
      "type": "rounded_rect",
      "rx": 2.5,
      "ry": 2.5,
      "shadow": true,
      "shading": true,
      "topstitch": {
        "inset": 1.2
      }
    },
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
    "silhouette": {
      "type": "rounded_rect",
      "rx": 2.5,
      "ry": 2.5,
      "shadow": true,
      "shading": true,
      "zipper": {
        "position": "top",
        "pull": true
      },
      "keyring": true
    },
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
    "silhouette": {
      "type": "rounded_rect",
      "rx": 2,
      "ry": 2,
      "shadow": true,
      "shading": true,
      "zipper": {
        "position": "top",
        "pull": true
      },
      "tabs": "side_zipper"
    },
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
  },
  "sandy_skirt": {
    "schemaVersion": "1.0.0",
    "id": "sandy_skirt",
    "name": "Circle Skirt",
    "names": {
      "en": "Circle Skirt",
      "hi": "गोल घाघरा",
      "te": "గుండ్రని లంగా"
    },
    "category": "garments",
    "construction": "skirt",
    "silhouette": {
      "type": "skirt",
      "shadow": true,
      "shading": true
    },
    "description": "Classic circular skirt with 16 wedge gores engineered for remnant fabric piecing and a smooth waistband. Pattern geometry by FreeSewing 4.10.2 (MIT licence).",
    "defaultVariant": "hybrid",
    "variants": {
      "hybrid": {
        "name": "Hybrid (Plain Waistband + Patchwork Gores)",
        "description": "Waistband cut from solid fabric for smooth waist comfort; skirt gores pieced from upcycled scraps.",
        "isDefault": true
      }
    },
    "tailorVerified": false,
    "disclaimer": "All pattern measurements are rectangle-based approximations for scrap cutting and must be verified by a professional tailor before final cutting.",
    "materials": [
      {
        "name": "Cotton or linen fabric scraps",
        "qty": "Approx 40x60 cm total remnant area",
        "optional": false,
        "source": "Standard sewing notion",
        "disclaimer": "typical default, to be verified by a tailor",
        "note": "typical default, to be verified by a tailor"
      },
      {
        "name": "Solid waist fabric",
        "qty": "60x10 cm plain cotton strip",
        "optional": false,
        "source": "Standard sewing notion",
        "disclaimer": "typical default, to be verified by a tailor",
        "note": "typical default, to be verified by a tailor"
      },
      {
        "name": "Waistband elastic (2 cm width)",
        "qty": "50-60 cm",
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
      "waist54": {
        "label": "Child Waist 54 cm (~3–4 Years)",
        "names": {
          "en": "Waist 54 cm (~3–4 Years)",
          "hi": "कमर 54 सेमी (~3-4 वर्ष)",
          "te": "నడుము 54 సెం.మీ (~3-4 సం.)"
        },
        "finishedWidthCm": 54,
        "finishedHeightCm": 25.8,
        "finishedDimensions": {
          "widthCm": 54,
          "heightCm": 25.8,
          "waistCm": 54,
          "skirtLengthCm": 25.8
        },
        "verified": false,
        "source": "typical estimate, unverified, needs a tailor",
        "sources": {
          "waist": "typical estimate, unverified, needs a tailor",
          "waistToFloor": "typical estimate, unverified, needs a tailor",
          "waistToHips": "typical estimate, unverified, needs a tailor",
          "hips": "typical estimate, unverified, needs a tailor",
          "skirtLength": "typical estimate, unverified, needs a tailor"
        },
        "variants": {
          "hybrid": [
            {
              "id": "skirt_gore_1",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_2",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_3",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_4",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_5",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_6",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_7",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_8",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_9",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_10",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_11",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_12",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_13",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_14",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_15",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_16",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "waistband",
              "name": "Waistband",
              "names": {
                "en": "Waistband",
                "hi": "कमरबंद",
                "te": "నడుము పట్టీ"
              },
              "role": "base",
              "width": 57.7,
              "height": 5,
              "cutWidth": 59.7,
              "cutHeight": 7,
              "qty": 1,
              "cutQty": 1,
              "optional": false,
              "accentOnly": false,
              "fabricSource": "plain_base",
              "scrapEligible": false,
              "cutOnFold": false,
              "seamAllowanceCm": {
                "defaultCm": 1
              },
              "grainLine": {
                "orientation": "horizontal",
                "angleDegrees": 0,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 57.7,
                "finishedHeightCm": 5,
                "finishedAreaCm2": 288.4,
                "cutWidthCm": 59.7,
                "cutHeightCm": 7,
                "seamPath": "M -280,-25 L -280,25 L 296.8,25 L 296.8,-25 L -280,-25 z",
                "saPath": "M -290,-25 L -290,25 L -280,35 L 296.8,35 L 306.8,25 L 306.8,-25 L 296.8,-35 L -280,-35 z"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            }
          ],
          "patchwork": [
            {
              "id": "skirt_gore_1",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_2",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_3",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_4",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_5",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_6",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_7",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_8",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_9",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_10",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_11",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_12",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_13",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_14",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_15",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_16",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 8.5,
              "height": 25.8,
              "cutWidth": 9.4,
              "cutHeight": 27.4,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 8.5,
                "finishedHeightCm": 25.8,
                "finishedAreaCm2": 153.1,
                "cutWidthCm": 9.4,
                "cutHeightCm": 27.4,
                "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
                "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "waistband",
              "name": "Waistband",
              "names": {
                "en": "Waistband",
                "hi": "कमरबंद",
                "te": "నడుము పట్టీ"
              },
              "role": "base",
              "width": 57.7,
              "height": 5,
              "cutWidth": 59.7,
              "cutHeight": 7,
              "qty": 1,
              "cutQty": 1,
              "optional": false,
              "accentOnly": false,
              "fabricSource": "plain_base",
              "scrapEligible": false,
              "cutOnFold": false,
              "seamAllowanceCm": {
                "defaultCm": 1
              },
              "grainLine": {
                "orientation": "horizontal",
                "angleDegrees": 0,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 57.7,
                "finishedHeightCm": 5,
                "finishedAreaCm2": 288.4,
                "cutWidthCm": 59.7,
                "cutHeightCm": 7,
                "seamPath": "M -280,-25 L -280,25 L 296.8,25 L 296.8,-25 L -280,-25 z",
                "saPath": "M -290,-25 L -290,25 L -280,35 L 296.8,35 L 306.8,25 L 306.8,-25 L 296.8,-35 L -280,-35 z"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            }
          ]
        },
        "zones": [
          {
            "id": "skirt_gore_1",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_2",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_3",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_4",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_5",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_6",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_7",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_8",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_9",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_10",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_11",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_12",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_13",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_14",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_15",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_16",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "waistband",
            "name": "Waistband",
            "names": {
              "en": "Waistband",
              "hi": "कमरबंद",
              "te": "నడుము పట్టీ"
            },
            "role": "base",
            "width": 57.7,
            "height": 5,
            "cutWidth": 59.7,
            "cutHeight": 7,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "plain_base",
            "scrapEligible": false,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "horizontal",
              "angleDegrees": 0,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 57.7,
              "finishedHeightCm": 5,
              "finishedAreaCm2": 288.4,
              "cutWidthCm": 59.7,
              "cutHeightCm": 7,
              "seamPath": "M -280,-25 L -280,25 L 296.8,25 L 296.8,-25 L -280,-25 z",
              "saPath": "M -290,-25 L -290,25 L -280,35 L 296.8,35 L 306.8,25 L 306.8,-25 L 296.8,-35 L -280,-35 z"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          }
        ],
        "pieces": [
          {
            "id": "skirt_gore_1",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_2",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_3",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_4",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_5",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_6",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_7",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_8",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_9",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_10",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_11",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_12",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_13",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_14",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_15",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_16",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 8.5,
            "height": 25.8,
            "cutWidth": 9.4,
            "cutHeight": 27.4,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 8.5,
              "finishedHeightCm": 25.8,
              "finishedAreaCm2": 153.1,
              "cutWidthCm": 9.4,
              "cutHeightCm": 27.4,
              "seamPath": "M -17.47,432.4 C -3.29,432.4 10.88,431.7 24.99,430.31 C 39.11,428.92 53.14,426.84 67.05,424.07 L 17.3,173.97 C 11.58,175.11 5.81,175.96 0,176.54 C -5.81,177.11 -11.64,177.4 -17.47,177.4 L -17.47,432.4 z",
              "saPath": "M -17.47,432.4 L -17.47,438 C -3.11,438 11.25,437.29 25.54,435.88 C 39.84,434.47 54.06,432.37 68.14,429.56 L 76.86,422.12 L 27.11,172.02 L 15.35,164.16 C 9.95,165.24 4.5,166.05 -0.98,166.59 C -6.46,167.12 -11.96,167.4 -17.47,167.4 L -17.47,177.4"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "waistband",
            "name": "Waistband",
            "names": {
              "en": "Waistband",
              "hi": "कमरबंद",
              "te": "నడుము పట్టీ"
            },
            "role": "base",
            "width": 57.7,
            "height": 5,
            "cutWidth": 59.7,
            "cutHeight": 7,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "plain_base",
            "scrapEligible": false,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "horizontal",
              "angleDegrees": 0,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 57.7,
              "finishedHeightCm": 5,
              "finishedAreaCm2": 288.4,
              "cutWidthCm": 59.7,
              "cutHeightCm": 7,
              "seamPath": "M -280,-25 L -280,25 L 296.8,25 L 296.8,-25 L -280,-25 z",
              "saPath": "M -290,-25 L -290,25 L -280,35 L 296.8,35 L 306.8,25 L 306.8,-25 L 296.8,-35 L -280,-35 z"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          }
        ]
      },
      "waist56": {
        "label": "Child Waist 56 cm (~5–6 Years)",
        "names": {
          "en": "Waist 56 cm (~5–6 Years)",
          "hi": "कमर 56 सेमी (~5-6 वर्ष)",
          "te": "నడుము 56 సెం.మీ (~5-6 సం.)"
        },
        "finishedWidthCm": 56,
        "finishedHeightCm": 29,
        "finishedDimensions": {
          "widthCm": 56,
          "heightCm": 29,
          "waistCm": 56,
          "skirtLengthCm": 29
        },
        "verified": false,
        "source": "typical estimate, unverified, needs a tailor",
        "sources": {
          "waist": "typical estimate, unverified, needs a tailor",
          "waistToFloor": "typical estimate, unverified, needs a tailor",
          "waistToHips": "typical estimate, unverified, needs a tailor",
          "hips": "typical estimate, unverified, needs a tailor",
          "skirtLength": "typical estimate, unverified, needs a tailor"
        },
        "variants": {
          "hybrid": [
            {
              "id": "skirt_gore_1",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_2",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_3",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_4",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_5",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_6",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_7",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_8",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_9",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_10",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_11",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_12",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_13",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_14",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_15",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_16",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "waistband",
              "name": "Waistband",
              "names": {
                "en": "Waistband",
                "hi": "कमरबंद",
                "te": "నడుము పట్టీ"
              },
              "role": "base",
              "width": 61.8,
              "height": 5,
              "cutWidth": 63.8,
              "cutHeight": 7,
              "qty": 1,
              "cutQty": 1,
              "optional": false,
              "accentOnly": false,
              "fabricSource": "plain_base",
              "scrapEligible": false,
              "cutOnFold": false,
              "seamAllowanceCm": {
                "defaultCm": 1
              },
              "grainLine": {
                "orientation": "horizontal",
                "angleDegrees": 0,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 61.8,
                "finishedHeightCm": 5,
                "finishedAreaCm2": 309,
                "cutWidthCm": 63.8,
                "cutHeightCm": 7,
                "seamPath": "M -300,-25 L -300,25 L 318,25 L 318,-25 L -300,-25 z",
                "saPath": "M -310,-25 L -310,25 L -300,35 L 318,35 L 328,25 L 328,-25 L 318,-35 L -300,-35 z"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            }
          ],
          "patchwork": [
            {
              "id": "skirt_gore_1",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_2",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_3",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_4",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_5",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_6",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_7",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_8",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_9",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_10",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_11",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_12",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_13",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_14",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_15",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "skirt_gore_16",
              "name": "Skirt Wedge Gore",
              "names": {
                "en": "Skirt Wedge Gore",
                "hi": "स्कर्ट का कलीदार टुकड़ा",
                "te": "లంగా చీలిక భాగం"
              },
              "role": "base",
              "width": 9.3,
              "height": 29,
              "cutWidth": 10.3,
              "cutHeight": 30.6,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 9.3,
                "finishedHeightCm": 29,
                "finishedAreaCm2": 187.8,
                "cutWidthCm": 10.3,
                "cutHeightCm": 30.6,
                "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
                "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "waistband",
              "name": "Waistband",
              "names": {
                "en": "Waistband",
                "hi": "कमरबंद",
                "te": "నడుము పట్టీ"
              },
              "role": "base",
              "width": 61.8,
              "height": 5,
              "cutWidth": 63.8,
              "cutHeight": 7,
              "qty": 1,
              "cutQty": 1,
              "optional": false,
              "accentOnly": false,
              "fabricSource": "plain_base",
              "scrapEligible": false,
              "cutOnFold": false,
              "seamAllowanceCm": {
                "defaultCm": 1
              },
              "grainLine": {
                "orientation": "horizontal",
                "angleDegrees": 0,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 61.8,
                "finishedHeightCm": 5,
                "finishedAreaCm2": 309,
                "cutWidthCm": 63.8,
                "cutHeightCm": 7,
                "seamPath": "M -300,-25 L -300,25 L 318,25 L 318,-25 L -300,-25 z",
                "saPath": "M -310,-25 L -310,25 L -300,35 L 318,35 L 328,25 L 328,-25 L 318,-35 L -300,-35 z"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Sandy",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            }
          ]
        },
        "zones": [
          {
            "id": "skirt_gore_1",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_2",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_3",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_4",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_5",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_6",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_7",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_8",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_9",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_10",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_11",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_12",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_13",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_14",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_15",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_16",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "waistband",
            "name": "Waistband",
            "names": {
              "en": "Waistband",
              "hi": "कमरबंद",
              "te": "నడుము పట్టీ"
            },
            "role": "base",
            "width": 61.8,
            "height": 5,
            "cutWidth": 63.8,
            "cutHeight": 7,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "plain_base",
            "scrapEligible": false,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "horizontal",
              "angleDegrees": 0,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 61.8,
              "finishedHeightCm": 5,
              "finishedAreaCm2": 309,
              "cutWidthCm": 63.8,
              "cutHeightCm": 7,
              "seamPath": "M -300,-25 L -300,25 L 318,25 L 318,-25 L -300,-25 z",
              "saPath": "M -310,-25 L -310,25 L -300,35 L 318,35 L 328,25 L 328,-25 L 318,-35 L -300,-35 z"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          }
        ],
        "pieces": [
          {
            "id": "skirt_gore_1",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_2",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_3",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_4",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_5",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_6",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_7",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_8",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_9",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_10",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_11",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_12",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_13",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_14",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_15",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "skirt_gore_16",
            "name": "Skirt Wedge Gore",
            "names": {
              "en": "Skirt Wedge Gore",
              "hi": "स्कर्ट का कलीदार टुकड़ा",
              "te": "లంగా చీలిక భాగం"
            },
            "role": "base",
            "width": 9.3,
            "height": 29,
            "cutWidth": 10.3,
            "cutHeight": 30.6,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 9.3,
              "finishedHeightCm": 29,
              "finishedAreaCm2": 187.8,
              "cutWidthCm": 10.3,
              "cutHeightCm": 30.6,
              "seamPath": "M -18.72,476.32 C -3.1,476.32 12.51,475.55 28.06,474.02 C 43.6,472.49 59.06,470.19 74.38,467.15 L 18.54,186.4 C 12.41,187.62 6.22,188.53 0,189.15 C -6.22,189.76 -12.47,190.07 -18.72,190.07 L -18.72,476.32 z",
              "saPath": "M -18.72,476.32 L -18.72,482.54 C -2.9,482.54 12.92,481.76 28.67,480.21 C 44.42,478.66 60.08,476.34 75.6,473.25 L 84.19,465.2 L 28.35,184.45 L 16.59,176.59 C 10.78,177.74 4.92,178.61 -0.98,179.19 C -6.88,179.78 -12.8,180.07 -18.72,180.07 L -18.72,190.07"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "waistband",
            "name": "Waistband",
            "names": {
              "en": "Waistband",
              "hi": "कमरबंद",
              "te": "నడుము పట్టీ"
            },
            "role": "base",
            "width": 61.8,
            "height": 5,
            "cutWidth": 63.8,
            "cutHeight": 7,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "plain_base",
            "scrapEligible": false,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "horizontal",
              "angleDegrees": 0,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 61.8,
              "finishedHeightCm": 5,
              "finishedAreaCm2": 309,
              "cutWidthCm": 63.8,
              "cutHeightCm": 7,
              "seamPath": "M -300,-25 L -300,25 L 318,25 L 318,-25 L -300,-25 z",
              "saPath": "M -310,-25 L -310,25 L -300,35 L 318,35 L 328,25 L 328,-25 L 318,-35 L -300,-35 z"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Sandy",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          }
        ]
      }
    }
  },
  "aaron_tank": {
    "schemaVersion": "1.0.0",
    "id": "aaron_tank",
    "name": "Tank Top",
    "names": {
      "en": "Tank Top",
      "hi": "स्लीवलेस बनियान",
      "te": "స్లీవ్‌లెస్ బనీన్"
    },
    "category": "garments",
    "construction": "tee",
    "silhouette": {
      "type": "tee",
      "shadow": true,
      "shading": true
    },
    "description": "Classic sleeveless tank top with continuous plain front and back bodice panels and contrasting patchwork trim bindings. Pattern geometry by FreeSewing 4.10.2 (MIT licence).",
    "defaultVariant": "hybrid",
    "variants": {
      "hybrid": {
        "name": "Hybrid (Plain Body + Patchwork Binding)",
        "description": "Front and back bodices cut from smooth solid fabric; armhole and neck bindings pieced from scrap strips.",
        "isDefault": true
      },
      "patchwork": {
        "name": "Full Patchwork",
        "description": "Entire tank top (bodices and bindings) pieced together from fabric scraps.",
        "warning": "Full patchwork requires piecing master sheets for body panels, creating many seams and taking substantial sewing time. Hybrid construction is recommended for comfort against skin."
      }
    },
    "tailorVerified": false,
    "disclaimer": "All pattern measurements are rectangle-based approximations for scrap cutting and must be verified by a professional tailor before final cutting.",
    "materials": [
      {
        "name": "Cotton jersey or knit fabric",
        "qty": "40x80 cm for plain body",
        "optional": false,
        "source": "Standard sewing notion",
        "disclaimer": "typical default, to be verified by a tailor",
        "note": "typical default, to be verified by a tailor"
      },
      {
        "name": "Cotton scrap strips for binding",
        "qty": "Approx 6x100 cm total strip area",
        "optional": false,
        "source": "Standard sewing notion",
        "disclaimer": "typical default, to be verified by a tailor",
        "note": "typical default, to be verified by a tailor"
      },
      {
        "name": "Stretch sewing thread",
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
      "chest56": {
        "label": "Child Chest 56 cm (~3–4 Years)",
        "names": {
          "en": "Chest 56 cm (~3–4 Years)",
          "hi": "छाती 56 सेमी (~3-4 वर्ष)",
          "te": "ఛాతీ 56 సెం.మీ (~3-4 సం.)"
        },
        "finishedWidthCm": 28,
        "finishedHeightCm": 35.3,
        "finishedDimensions": {
          "widthCm": 28,
          "heightCm": 35.3
        },
        "verified": false,
        "source": "typical estimate, unverified, needs a tailor",
        "sources": {
          "chest": "typical estimate, unverified, needs a tailor",
          "biceps": "typical estimate, unverified, needs a tailor",
          "hpsToBust": "typical estimate, unverified, needs a tailor",
          "hpsToWaistBack": "typical estimate, unverified, needs a tailor",
          "neck": "typical estimate, unverified, needs a tailor",
          "shoulderToShoulder": "typical estimate, unverified, needs a tailor",
          "shoulderSlope": "typical estimate, unverified, needs a tailor",
          "waistToArmpit": "typical estimate, unverified, needs a tailor",
          "waistToHips": "typical estimate, unverified, needs a tailor",
          "hips": "typical estimate, unverified, needs a tailor"
        },
        "variants": {
          "hybrid": [
            {
              "id": "bodice_front",
              "name": "Front Bodice",
              "names": {
                "en": "Front Bodice",
                "hi": "सामने का हिस्सा (बॉडी)",
                "te": "ముందు భాగం (బాడీస్)"
              },
              "role": "base",
              "width": 29.8,
              "height": 35.3,
              "cutWidth": 31.8,
              "cutHeight": 37.8,
              "qty": 1,
              "cutQty": 1,
              "optional": false,
              "accentOnly": false,
              "fabricSource": "plain_base",
              "scrapEligible": false,
              "cutOnFold": true,
              "seamAllowanceCm": {
                "defaultCm": 1
              },
              "grainLine": {
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": true,
                "finishedWidthCm": 29.8,
                "finishedHeightCm": 35.3,
                "halfFinishedWidthCm": 14.9,
                "finishedAreaCm2": 818.6,
                "cutWidthCm": 31.8,
                "cutHeightCm": 37.8,
                "seamPath": "M 0,62 L 0,357.5 L 148.77,357.5 C 148.77,236.85 144.01,148.69 144.01,148.69 C 100.65,148.69 74.18,79.16 91.08,9.63 L 69.47,4.38 C 55.47,62 55.47,62 0,62 z",
                "saPath": "M 0,357.5 L 0,382.5 L 148.77,382.5 L 158.77,357.5 C 158.77,245 154.1,150.7 154.01,148.69 L 144.01,148.69"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Aaron",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "bodice_back",
              "name": "Back Bodice",
              "names": {
                "en": "Back Bodice",
                "hi": "पीछे का हिस्सा (बॉडी)",
                "te": "వెనుక భాగం (బాడీస్)"
              },
              "role": "base",
              "width": 29.8,
              "height": 35.3,
              "cutWidth": 31.8,
              "cutHeight": 37.8,
              "qty": 1,
              "cutQty": 1,
              "optional": false,
              "accentOnly": false,
              "fabricSource": "plain_base",
              "scrapEligible": false,
              "cutOnFold": true,
              "seamAllowanceCm": {
                "defaultCm": 1
              },
              "grainLine": {
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": true,
                "finishedWidthCm": 29.8,
                "finishedHeightCm": 35.3,
                "halfFinishedWidthCm": 14.9,
                "finishedAreaCm2": 864,
                "cutWidthCm": 31.8,
                "cutHeightCm": 37.8,
                "seamPath": "M 0,26 L 0,357.5 L 148.77,357.5 C 148.77,236.85 144.01,148.69 144.01,148.69 C 100.65,148.69 74.18,79.16 91.08,9.63 L 69.47,4.38 L 69.47,4.38 C 64.21,26 0,26 0,26 z",
                "saPath": "M 0,357.5 L 0,382.5 L 148.77,382.5 L 158.77,357.5 C 158.77,245 154.1,150.7 154.01,148.69 L 144.01,148.69"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Aaron",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "arm_binding",
              "name": "Armhole Binding",
              "names": {
                "en": "Armhole Binding",
                "hi": "आस्तीन की बाइंडिंग पट्टी",
                "te": "చేతుల చంక భాగం పట్టీలు"
              },
              "role": "supporting",
              "width": 6,
              "height": 31.7,
              "cutWidth": 6,
              "cutHeight": 31.7,
              "qty": 2,
              "cutQty": 2,
              "optional": false,
              "accentOnly": false,
              "fabricSource": "scrap",
              "scrapEligible": true,
              "cutOnFold": false,
              "seamAllowanceCm": {
                "defaultCm": 1
              },
              "grainLine": {
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": false
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 6,
                "finishedHeightCm": 31.7,
                "finishedAreaCm2": 190.2,
                "cutWidthCm": 6,
                "cutHeightCm": 31.7,
                "seamPath": "M 0,0 L 0,317.02 L 60,317.02 L 60,0 L 0,0 z",
                "saPath": "M 0,0 L 0,317.02 L 60,317.02 L 60,0 L 0,0 z"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Aaron",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "neck_binding",
              "name": "Neckline Binding",
              "names": {
                "en": "Neckline Binding",
                "hi": "गले की बाइंडिंग पट्टी",
                "te": "మెడ अంచు పట్టీ"
              },
              "role": "supporting",
              "width": 6,
              "height": 34.7,
              "cutWidth": 6,
              "cutHeight": 34.7,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": false
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 6,
                "finishedHeightCm": 34.7,
                "finishedAreaCm2": 208.1,
                "cutWidthCm": 6,
                "cutHeightCm": 34.7,
                "seamPath": "M 0,0 L 0,346.8 L 60,346.8 L 60,0 L 0,0 z",
                "saPath": "M 0,0 L 0,346.8 L 60,346.8 L 60,0 L 0,0 z"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Aaron",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            }
          ],
          "patchwork": [
            {
              "id": "bodice_front",
              "name": "Front Bodice",
              "names": {
                "en": "Front Bodice",
                "hi": "सामने का हिस्सा (बॉडी)",
                "te": "ముందు భాగం (బాడీస్)"
              },
              "role": "base",
              "width": 29.8,
              "height": 35.3,
              "cutWidth": 31.8,
              "cutHeight": 37.8,
              "qty": 1,
              "cutQty": 1,
              "optional": false,
              "accentOnly": false,
              "fabricSource": "scrap",
              "scrapEligible": true,
              "cutOnFold": true,
              "seamAllowanceCm": {
                "defaultCm": 1
              },
              "grainLine": {
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": true,
                "finishedWidthCm": 29.8,
                "finishedHeightCm": 35.3,
                "halfFinishedWidthCm": 14.9,
                "finishedAreaCm2": 818.6,
                "cutWidthCm": 31.8,
                "cutHeightCm": 37.8,
                "seamPath": "M 0,62 L 0,357.5 L 148.77,357.5 C 148.77,236.85 144.01,148.69 144.01,148.69 C 100.65,148.69 74.18,79.16 91.08,9.63 L 69.47,4.38 C 55.47,62 55.47,62 0,62 z",
                "saPath": "M 0,357.5 L 0,382.5 L 148.77,382.5 L 158.77,357.5 C 158.77,245 154.1,150.7 154.01,148.69 L 144.01,148.69"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Aaron",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "bodice_back",
              "name": "Back Bodice",
              "names": {
                "en": "Back Bodice",
                "hi": "पीछे का हिस्सा (बॉडी)",
                "te": "వెనుక భాగం (బాడీస్)"
              },
              "role": "base",
              "width": 29.8,
              "height": 35.3,
              "cutWidth": 31.8,
              "cutHeight": 37.8,
              "qty": 1,
              "cutQty": 1,
              "optional": false,
              "accentOnly": false,
              "fabricSource": "scrap",
              "scrapEligible": true,
              "cutOnFold": true,
              "seamAllowanceCm": {
                "defaultCm": 1
              },
              "grainLine": {
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": true,
                "finishedWidthCm": 29.8,
                "finishedHeightCm": 35.3,
                "halfFinishedWidthCm": 14.9,
                "finishedAreaCm2": 864,
                "cutWidthCm": 31.8,
                "cutHeightCm": 37.8,
                "seamPath": "M 0,26 L 0,357.5 L 148.77,357.5 C 148.77,236.85 144.01,148.69 144.01,148.69 C 100.65,148.69 74.18,79.16 91.08,9.63 L 69.47,4.38 L 69.47,4.38 C 64.21,26 0,26 0,26 z",
                "saPath": "M 0,357.5 L 0,382.5 L 148.77,382.5 L 158.77,357.5 C 158.77,245 154.1,150.7 154.01,148.69 L 144.01,148.69"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Aaron",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "arm_binding",
              "name": "Armhole Binding",
              "names": {
                "en": "Armhole Binding",
                "hi": "आस्तीन की बाइंडिंग पट्टी",
                "te": "చేతుల చంక భాగం పట్టీలు"
              },
              "role": "supporting",
              "width": 6,
              "height": 31.7,
              "cutWidth": 6,
              "cutHeight": 31.7,
              "qty": 2,
              "cutQty": 2,
              "optional": false,
              "accentOnly": false,
              "fabricSource": "scrap",
              "scrapEligible": true,
              "cutOnFold": false,
              "seamAllowanceCm": {
                "defaultCm": 1
              },
              "grainLine": {
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": false
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 6,
                "finishedHeightCm": 31.7,
                "finishedAreaCm2": 190.2,
                "cutWidthCm": 6,
                "cutHeightCm": 31.7,
                "seamPath": "M 0,0 L 0,317.02 L 60,317.02 L 60,0 L 0,0 z",
                "saPath": "M 0,0 L 0,317.02 L 60,317.02 L 60,0 L 0,0 z"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Aaron",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "neck_binding",
              "name": "Neckline Binding",
              "names": {
                "en": "Neckline Binding",
                "hi": "गले की बाइंडिंग पट्टी",
                "te": "మెడ अంచు పట్టీ"
              },
              "role": "supporting",
              "width": 6,
              "height": 34.7,
              "cutWidth": 6,
              "cutHeight": 34.7,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": false
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 6,
                "finishedHeightCm": 34.7,
                "finishedAreaCm2": 208.1,
                "cutWidthCm": 6,
                "cutHeightCm": 34.7,
                "seamPath": "M 0,0 L 0,346.8 L 60,346.8 L 60,0 L 0,0 z",
                "saPath": "M 0,0 L 0,346.8 L 60,346.8 L 60,0 L 0,0 z"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Aaron",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            }
          ]
        },
        "zones": [
          {
            "id": "bodice_front",
            "name": "Front Bodice",
            "names": {
              "en": "Front Bodice",
              "hi": "सामने का हिस्सा (बॉडी)",
              "te": "ముందు భాగం (బాడీస్)"
            },
            "role": "base",
            "width": 29.8,
            "height": 35.3,
            "cutWidth": 31.8,
            "cutHeight": 37.8,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "plain_base",
            "scrapEligible": false,
            "cutOnFold": true,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": true,
              "finishedWidthCm": 29.8,
              "finishedHeightCm": 35.3,
              "halfFinishedWidthCm": 14.9,
              "finishedAreaCm2": 818.6,
              "cutWidthCm": 31.8,
              "cutHeightCm": 37.8,
              "seamPath": "M 0,62 L 0,357.5 L 148.77,357.5 C 148.77,236.85 144.01,148.69 144.01,148.69 C 100.65,148.69 74.18,79.16 91.08,9.63 L 69.47,4.38 C 55.47,62 55.47,62 0,62 z",
              "saPath": "M 0,357.5 L 0,382.5 L 148.77,382.5 L 158.77,357.5 C 158.77,245 154.1,150.7 154.01,148.69 L 144.01,148.69"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Aaron",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "bodice_back",
            "name": "Back Bodice",
            "names": {
              "en": "Back Bodice",
              "hi": "पीछे का हिस्सा (बॉडी)",
              "te": "వెనుక భాగం (బాడీస్)"
            },
            "role": "base",
            "width": 29.8,
            "height": 35.3,
            "cutWidth": 31.8,
            "cutHeight": 37.8,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "plain_base",
            "scrapEligible": false,
            "cutOnFold": true,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": true,
              "finishedWidthCm": 29.8,
              "finishedHeightCm": 35.3,
              "halfFinishedWidthCm": 14.9,
              "finishedAreaCm2": 864,
              "cutWidthCm": 31.8,
              "cutHeightCm": 37.8,
              "seamPath": "M 0,26 L 0,357.5 L 148.77,357.5 C 148.77,236.85 144.01,148.69 144.01,148.69 C 100.65,148.69 74.18,79.16 91.08,9.63 L 69.47,4.38 L 69.47,4.38 C 64.21,26 0,26 0,26 z",
              "saPath": "M 0,357.5 L 0,382.5 L 148.77,382.5 L 158.77,357.5 C 158.77,245 154.1,150.7 154.01,148.69 L 144.01,148.69"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Aaron",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "arm_binding",
            "name": "Armhole Binding",
            "names": {
              "en": "Armhole Binding",
              "hi": "आस्तीन की बाइंडिंग पट्टी",
              "te": "చేతుల చంక భాగం పట్టీలు"
            },
            "role": "supporting",
            "width": 6,
            "height": 31.7,
            "cutWidth": 6,
            "cutHeight": 31.7,
            "qty": 2,
            "cutQty": 2,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": false
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 6,
              "finishedHeightCm": 31.7,
              "finishedAreaCm2": 190.2,
              "cutWidthCm": 6,
              "cutHeightCm": 31.7,
              "seamPath": "M 0,0 L 0,317.02 L 60,317.02 L 60,0 L 0,0 z",
              "saPath": "M 0,0 L 0,317.02 L 60,317.02 L 60,0 L 0,0 z"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Aaron",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "neck_binding",
            "name": "Neckline Binding",
            "names": {
              "en": "Neckline Binding",
              "hi": "गले की बाइंडिंग पट्टी",
              "te": "మెడ अంచు పట్టీ"
            },
            "role": "supporting",
            "width": 6,
            "height": 34.7,
            "cutWidth": 6,
            "cutHeight": 34.7,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": false
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 6,
              "finishedHeightCm": 34.7,
              "finishedAreaCm2": 208.1,
              "cutWidthCm": 6,
              "cutHeightCm": 34.7,
              "seamPath": "M 0,0 L 0,346.8 L 60,346.8 L 60,0 L 0,0 z",
              "saPath": "M 0,0 L 0,346.8 L 60,346.8 L 60,0 L 0,0 z"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Aaron",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          }
        ],
        "pieces": [
          {
            "id": "bodice_front",
            "name": "Front Bodice",
            "names": {
              "en": "Front Bodice",
              "hi": "सामने का हिस्सा (बॉडी)",
              "te": "ముందు భాగం (బాడీస్)"
            },
            "role": "base",
            "width": 29.8,
            "height": 35.3,
            "cutWidth": 31.8,
            "cutHeight": 37.8,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "plain_base",
            "scrapEligible": false,
            "cutOnFold": true,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": true,
              "finishedWidthCm": 29.8,
              "finishedHeightCm": 35.3,
              "halfFinishedWidthCm": 14.9,
              "finishedAreaCm2": 818.6,
              "cutWidthCm": 31.8,
              "cutHeightCm": 37.8,
              "seamPath": "M 0,62 L 0,357.5 L 148.77,357.5 C 148.77,236.85 144.01,148.69 144.01,148.69 C 100.65,148.69 74.18,79.16 91.08,9.63 L 69.47,4.38 C 55.47,62 55.47,62 0,62 z",
              "saPath": "M 0,357.5 L 0,382.5 L 148.77,382.5 L 158.77,357.5 C 158.77,245 154.1,150.7 154.01,148.69 L 144.01,148.69"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Aaron",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "bodice_back",
            "name": "Back Bodice",
            "names": {
              "en": "Back Bodice",
              "hi": "पीछे का हिस्सा (बॉडी)",
              "te": "వెనుక భాగం (బాడీస్)"
            },
            "role": "base",
            "width": 29.8,
            "height": 35.3,
            "cutWidth": 31.8,
            "cutHeight": 37.8,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "plain_base",
            "scrapEligible": false,
            "cutOnFold": true,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": true,
              "finishedWidthCm": 29.8,
              "finishedHeightCm": 35.3,
              "halfFinishedWidthCm": 14.9,
              "finishedAreaCm2": 864,
              "cutWidthCm": 31.8,
              "cutHeightCm": 37.8,
              "seamPath": "M 0,26 L 0,357.5 L 148.77,357.5 C 148.77,236.85 144.01,148.69 144.01,148.69 C 100.65,148.69 74.18,79.16 91.08,9.63 L 69.47,4.38 L 69.47,4.38 C 64.21,26 0,26 0,26 z",
              "saPath": "M 0,357.5 L 0,382.5 L 148.77,382.5 L 158.77,357.5 C 158.77,245 154.1,150.7 154.01,148.69 L 144.01,148.69"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Aaron",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "arm_binding",
            "name": "Armhole Binding",
            "names": {
              "en": "Armhole Binding",
              "hi": "आस्तीन की बाइंडिंग पट्टी",
              "te": "చేతుల చంక భాగం పట్టీలు"
            },
            "role": "supporting",
            "width": 6,
            "height": 31.7,
            "cutWidth": 6,
            "cutHeight": 31.7,
            "qty": 2,
            "cutQty": 2,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": false
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 6,
              "finishedHeightCm": 31.7,
              "finishedAreaCm2": 190.2,
              "cutWidthCm": 6,
              "cutHeightCm": 31.7,
              "seamPath": "M 0,0 L 0,317.02 L 60,317.02 L 60,0 L 0,0 z",
              "saPath": "M 0,0 L 0,317.02 L 60,317.02 L 60,0 L 0,0 z"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Aaron",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "neck_binding",
            "name": "Neckline Binding",
            "names": {
              "en": "Neckline Binding",
              "hi": "गले की बाइंडिंग पट्टी",
              "te": "మెడ अంచు పట్టీ"
            },
            "role": "supporting",
            "width": 6,
            "height": 34.7,
            "cutWidth": 6,
            "cutHeight": 34.7,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": false
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 6,
              "finishedHeightCm": 34.7,
              "finishedAreaCm2": 208.1,
              "cutWidthCm": 6,
              "cutHeightCm": 34.7,
              "seamPath": "M 0,0 L 0,346.8 L 60,346.8 L 60,0 L 0,0 z",
              "saPath": "M 0,0 L 0,346.8 L 60,346.8 L 60,0 L 0,0 z"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Aaron",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          }
        ]
      },
      "chest62": {
        "label": "Child Chest 62 cm (~5–6 Years)",
        "names": {
          "en": "Chest 62 cm (~5–6 Years)",
          "hi": "छाती 62 सेमी (~5-6 वर्ष)",
          "te": "ఛాతీ 62 సెం.మీ (~5-6 సం.)"
        },
        "finishedWidthCm": 31,
        "finishedHeightCm": 40.2,
        "finishedDimensions": {
          "widthCm": 31,
          "heightCm": 40.2
        },
        "verified": false,
        "source": "typical estimate, unverified, needs a tailor",
        "sources": {
          "chest": "typical estimate, unverified, needs a tailor",
          "biceps": "typical estimate, unverified, needs a tailor",
          "hpsToBust": "typical estimate, unverified, needs a tailor",
          "hpsToWaistBack": "typical estimate, unverified, needs a tailor",
          "neck": "typical estimate, unverified, needs a tailor",
          "shoulderToShoulder": "typical estimate, unverified, needs a tailor",
          "shoulderSlope": "typical estimate, unverified, needs a tailor",
          "waistToArmpit": "typical estimate, unverified, needs a tailor",
          "waistToHips": "typical estimate, unverified, needs a tailor",
          "hips": "typical estimate, unverified, needs a tailor"
        },
        "variants": {
          "hybrid": [
            {
              "id": "bodice_front",
              "name": "Front Bodice",
              "names": {
                "en": "Front Bodice",
                "hi": "सामने का हिस्सा (बॉडी)",
                "te": "ముందు భాగం (బాడీస్)"
              },
              "role": "base",
              "width": 32.8,
              "height": 40.2,
              "cutWidth": 34.8,
              "cutHeight": 42.7,
              "qty": 1,
              "cutQty": 1,
              "optional": false,
              "accentOnly": false,
              "fabricSource": "plain_base",
              "scrapEligible": false,
              "cutOnFold": true,
              "seamAllowanceCm": {
                "defaultCm": 1
              },
              "grainLine": {
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": true,
                "finishedWidthCm": 32.8,
                "finishedHeightCm": 40.2,
                "halfFinishedWidthCm": 16.4,
                "finishedAreaCm2": 1034,
                "cutWidthCm": 34.8,
                "cutHeightCm": 42.7,
                "seamPath": "M 0,69 L 0,407 L 164.16,407 C 164.16,267.97 159.38,165.94 159.38,165.94 C 110.52,165.94 80.53,88.31 99.39,10.69 L 75.41,4.86 C 59.82,69 59.82,69 0,69 z",
                "saPath": "M 0,407 L 0,432 L 164.16,432 L 174.16,407 C 174.16,275 169.47,167.95 169.38,165.94 L 159.38,165.94"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Aaron",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "bodice_back",
              "name": "Back Bodice",
              "names": {
                "en": "Back Bodice",
                "hi": "पीछे का हिस्सा (बॉडी)",
                "te": "వెనుక భాగం (బాడీస్)"
              },
              "role": "base",
              "width": 32.8,
              "height": 40.2,
              "cutWidth": 34.8,
              "cutHeight": 42.7,
              "qty": 1,
              "cutQty": 1,
              "optional": false,
              "accentOnly": false,
              "fabricSource": "plain_base",
              "scrapEligible": false,
              "cutOnFold": true,
              "seamAllowanceCm": {
                "defaultCm": 1
              },
              "grainLine": {
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": true,
                "finishedWidthCm": 32.8,
                "finishedHeightCm": 40.2,
                "halfFinishedWidthCm": 16.4,
                "finishedAreaCm2": 1089.8,
                "cutWidthCm": 34.8,
                "cutHeightCm": 42.7,
                "seamPath": "M 0,28 L 0,407 L 164.16,407 C 164.16,267.97 159.38,165.94 159.38,165.94 C 110.52,165.94 80.53,88.31 99.39,10.69 L 75.41,4.86 L 75.41,4.86 C 69.78,28 0,28 0,28 z",
                "saPath": "M 0,407 L 0,432 L 164.16,432 L 174.16,407 C 174.16,275 169.47,167.95 169.38,165.94 L 159.38,165.94"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Aaron",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "arm_binding",
              "name": "Armhole Binding",
              "names": {
                "en": "Armhole Binding",
                "hi": "आस्तीन की बाइंडिंग पट्टी",
                "te": "చేతుల చంక భాగం పట్టీలు"
              },
              "role": "supporting",
              "width": 6,
              "height": 35.5,
              "cutWidth": 6,
              "cutHeight": 35.5,
              "qty": 2,
              "cutQty": 2,
              "optional": false,
              "accentOnly": false,
              "fabricSource": "scrap",
              "scrapEligible": true,
              "cutOnFold": false,
              "seamAllowanceCm": {
                "defaultCm": 1
              },
              "grainLine": {
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": false
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 6,
                "finishedHeightCm": 35.5,
                "finishedAreaCm2": 212.9,
                "cutWidthCm": 6,
                "cutHeightCm": 35.5,
                "seamPath": "M 0,0 L 0,354.86 L 60,354.86 L 60,0 L 0,0 z",
                "saPath": "M 0,0 L 0,354.86 L 60,354.86 L 60,0 L 0,0 z"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Aaron",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "neck_binding",
              "name": "Neckline Binding",
              "names": {
                "en": "Neckline Binding",
                "hi": "गले की बाइंडिंग पट्टी",
                "te": "మెడ अంచు పట్టీ"
              },
              "role": "supporting",
              "width": 6,
              "height": 37.8,
              "cutWidth": 6,
              "cutHeight": 37.8,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": false
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 6,
                "finishedHeightCm": 37.8,
                "finishedAreaCm2": 227,
                "cutWidthCm": 6,
                "cutHeightCm": 37.8,
                "seamPath": "M 0,0 L 0,378.38 L 60,378.38 L 60,0 L 0,0 z",
                "saPath": "M 0,0 L 0,378.38 L 60,378.38 L 60,0 L 0,0 z"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Aaron",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            }
          ],
          "patchwork": [
            {
              "id": "bodice_front",
              "name": "Front Bodice",
              "names": {
                "en": "Front Bodice",
                "hi": "सामने का हिस्सा (बॉडी)",
                "te": "ముందు భాగం (బాడీస్)"
              },
              "role": "base",
              "width": 32.8,
              "height": 40.2,
              "cutWidth": 34.8,
              "cutHeight": 42.7,
              "qty": 1,
              "cutQty": 1,
              "optional": false,
              "accentOnly": false,
              "fabricSource": "scrap",
              "scrapEligible": true,
              "cutOnFold": true,
              "seamAllowanceCm": {
                "defaultCm": 1
              },
              "grainLine": {
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": true,
                "finishedWidthCm": 32.8,
                "finishedHeightCm": 40.2,
                "halfFinishedWidthCm": 16.4,
                "finishedAreaCm2": 1034,
                "cutWidthCm": 34.8,
                "cutHeightCm": 42.7,
                "seamPath": "M 0,69 L 0,407 L 164.16,407 C 164.16,267.97 159.38,165.94 159.38,165.94 C 110.52,165.94 80.53,88.31 99.39,10.69 L 75.41,4.86 C 59.82,69 59.82,69 0,69 z",
                "saPath": "M 0,407 L 0,432 L 164.16,432 L 174.16,407 C 174.16,275 169.47,167.95 169.38,165.94 L 159.38,165.94"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Aaron",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "bodice_back",
              "name": "Back Bodice",
              "names": {
                "en": "Back Bodice",
                "hi": "पीछे का हिस्सा (बॉडी)",
                "te": "వెనుక భాగం (బాడీస్)"
              },
              "role": "base",
              "width": 32.8,
              "height": 40.2,
              "cutWidth": 34.8,
              "cutHeight": 42.7,
              "qty": 1,
              "cutQty": 1,
              "optional": false,
              "accentOnly": false,
              "fabricSource": "scrap",
              "scrapEligible": true,
              "cutOnFold": true,
              "seamAllowanceCm": {
                "defaultCm": 1
              },
              "grainLine": {
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": true
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": true,
                "finishedWidthCm": 32.8,
                "finishedHeightCm": 40.2,
                "halfFinishedWidthCm": 16.4,
                "finishedAreaCm2": 1089.8,
                "cutWidthCm": 34.8,
                "cutHeightCm": 42.7,
                "seamPath": "M 0,28 L 0,407 L 164.16,407 C 164.16,267.97 159.38,165.94 159.38,165.94 C 110.52,165.94 80.53,88.31 99.39,10.69 L 75.41,4.86 L 75.41,4.86 C 69.78,28 0,28 0,28 z",
                "saPath": "M 0,407 L 0,432 L 164.16,432 L 174.16,407 C 174.16,275 169.47,167.95 169.38,165.94 L 159.38,165.94"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Aaron",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "arm_binding",
              "name": "Armhole Binding",
              "names": {
                "en": "Armhole Binding",
                "hi": "आस्तीन की बाइंडिंग पट्टी",
                "te": "చేతుల చంక భాగం పట్టీలు"
              },
              "role": "supporting",
              "width": 6,
              "height": 35.5,
              "cutWidth": 6,
              "cutHeight": 35.5,
              "qty": 2,
              "cutQty": 2,
              "optional": false,
              "accentOnly": false,
              "fabricSource": "scrap",
              "scrapEligible": true,
              "cutOnFold": false,
              "seamAllowanceCm": {
                "defaultCm": 1
              },
              "grainLine": {
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": false
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 6,
                "finishedHeightCm": 35.5,
                "finishedAreaCm2": 212.9,
                "cutWidthCm": 6,
                "cutHeightCm": 35.5,
                "seamPath": "M 0,0 L 0,354.86 L 60,354.86 L 60,0 L 0,0 z",
                "saPath": "M 0,0 L 0,354.86 L 60,354.86 L 60,0 L 0,0 z"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Aaron",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            },
            {
              "id": "neck_binding",
              "name": "Neckline Binding",
              "names": {
                "en": "Neckline Binding",
                "hi": "गले की बाइंडिंग पट्टी",
                "te": "మెడ अంచు పట్టీ"
              },
              "role": "supporting",
              "width": 6,
              "height": 37.8,
              "cutWidth": 6,
              "cutHeight": 37.8,
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
                "orientation": "vertical",
                "angleDegrees": 90,
                "strict": false
              },
              "geometry": {
                "shapeType": "curved",
                "cutOnFold": false,
                "finishedWidthCm": 6,
                "finishedHeightCm": 37.8,
                "finishedAreaCm2": 227,
                "cutWidthCm": 6,
                "cutHeightCm": 37.8,
                "seamPath": "M 0,0 L 0,378.38 L 60,378.38 L 60,0 L 0,0 z",
                "saPath": "M 0,0 L 0,378.38 L 60,378.38 L 60,0 L 0,0 z"
              },
              "provenance": {
                "patternLibrary": "FreeSewing",
                "design": "Aaron",
                "version": "4.10.2",
                "pinned": true,
                "generatedWithoutHandTyping": true
              },
              "mapping3D": null
            }
          ]
        },
        "zones": [
          {
            "id": "bodice_front",
            "name": "Front Bodice",
            "names": {
              "en": "Front Bodice",
              "hi": "सामने का हिस्सा (बॉडी)",
              "te": "ముందు భాగం (బాడీస్)"
            },
            "role": "base",
            "width": 32.8,
            "height": 40.2,
            "cutWidth": 34.8,
            "cutHeight": 42.7,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "plain_base",
            "scrapEligible": false,
            "cutOnFold": true,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": true,
              "finishedWidthCm": 32.8,
              "finishedHeightCm": 40.2,
              "halfFinishedWidthCm": 16.4,
              "finishedAreaCm2": 1034,
              "cutWidthCm": 34.8,
              "cutHeightCm": 42.7,
              "seamPath": "M 0,69 L 0,407 L 164.16,407 C 164.16,267.97 159.38,165.94 159.38,165.94 C 110.52,165.94 80.53,88.31 99.39,10.69 L 75.41,4.86 C 59.82,69 59.82,69 0,69 z",
              "saPath": "M 0,407 L 0,432 L 164.16,432 L 174.16,407 C 174.16,275 169.47,167.95 169.38,165.94 L 159.38,165.94"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Aaron",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "bodice_back",
            "name": "Back Bodice",
            "names": {
              "en": "Back Bodice",
              "hi": "पीछे का हिस्सा (बॉडी)",
              "te": "వెనుక భాగం (బాడీస్)"
            },
            "role": "base",
            "width": 32.8,
            "height": 40.2,
            "cutWidth": 34.8,
            "cutHeight": 42.7,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "plain_base",
            "scrapEligible": false,
            "cutOnFold": true,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": true,
              "finishedWidthCm": 32.8,
              "finishedHeightCm": 40.2,
              "halfFinishedWidthCm": 16.4,
              "finishedAreaCm2": 1089.8,
              "cutWidthCm": 34.8,
              "cutHeightCm": 42.7,
              "seamPath": "M 0,28 L 0,407 L 164.16,407 C 164.16,267.97 159.38,165.94 159.38,165.94 C 110.52,165.94 80.53,88.31 99.39,10.69 L 75.41,4.86 L 75.41,4.86 C 69.78,28 0,28 0,28 z",
              "saPath": "M 0,407 L 0,432 L 164.16,432 L 174.16,407 C 174.16,275 169.47,167.95 169.38,165.94 L 159.38,165.94"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Aaron",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "arm_binding",
            "name": "Armhole Binding",
            "names": {
              "en": "Armhole Binding",
              "hi": "आस्तीन की बाइंडिंग पट्टी",
              "te": "చేతుల చంక భాగం పట్టీలు"
            },
            "role": "supporting",
            "width": 6,
            "height": 35.5,
            "cutWidth": 6,
            "cutHeight": 35.5,
            "qty": 2,
            "cutQty": 2,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": false
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 6,
              "finishedHeightCm": 35.5,
              "finishedAreaCm2": 212.9,
              "cutWidthCm": 6,
              "cutHeightCm": 35.5,
              "seamPath": "M 0,0 L 0,354.86 L 60,354.86 L 60,0 L 0,0 z",
              "saPath": "M 0,0 L 0,354.86 L 60,354.86 L 60,0 L 0,0 z"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Aaron",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "neck_binding",
            "name": "Neckline Binding",
            "names": {
              "en": "Neckline Binding",
              "hi": "गले की बाइंडिंग पट्टी",
              "te": "మెడ अంచు పట్టీ"
            },
            "role": "supporting",
            "width": 6,
            "height": 37.8,
            "cutWidth": 6,
            "cutHeight": 37.8,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": false
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 6,
              "finishedHeightCm": 37.8,
              "finishedAreaCm2": 227,
              "cutWidthCm": 6,
              "cutHeightCm": 37.8,
              "seamPath": "M 0,0 L 0,378.38 L 60,378.38 L 60,0 L 0,0 z",
              "saPath": "M 0,0 L 0,378.38 L 60,378.38 L 60,0 L 0,0 z"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Aaron",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          }
        ],
        "pieces": [
          {
            "id": "bodice_front",
            "name": "Front Bodice",
            "names": {
              "en": "Front Bodice",
              "hi": "सामने का हिस्सा (बॉडी)",
              "te": "ముందు భాగం (బాడీస్)"
            },
            "role": "base",
            "width": 32.8,
            "height": 40.2,
            "cutWidth": 34.8,
            "cutHeight": 42.7,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "plain_base",
            "scrapEligible": false,
            "cutOnFold": true,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": true,
              "finishedWidthCm": 32.8,
              "finishedHeightCm": 40.2,
              "halfFinishedWidthCm": 16.4,
              "finishedAreaCm2": 1034,
              "cutWidthCm": 34.8,
              "cutHeightCm": 42.7,
              "seamPath": "M 0,69 L 0,407 L 164.16,407 C 164.16,267.97 159.38,165.94 159.38,165.94 C 110.52,165.94 80.53,88.31 99.39,10.69 L 75.41,4.86 C 59.82,69 59.82,69 0,69 z",
              "saPath": "M 0,407 L 0,432 L 164.16,432 L 174.16,407 C 174.16,275 169.47,167.95 169.38,165.94 L 159.38,165.94"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Aaron",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "bodice_back",
            "name": "Back Bodice",
            "names": {
              "en": "Back Bodice",
              "hi": "पीछे का हिस्सा (बॉडी)",
              "te": "వెనుక భాగం (బాడీస్)"
            },
            "role": "base",
            "width": 32.8,
            "height": 40.2,
            "cutWidth": 34.8,
            "cutHeight": 42.7,
            "qty": 1,
            "cutQty": 1,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "plain_base",
            "scrapEligible": false,
            "cutOnFold": true,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": true
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": true,
              "finishedWidthCm": 32.8,
              "finishedHeightCm": 40.2,
              "halfFinishedWidthCm": 16.4,
              "finishedAreaCm2": 1089.8,
              "cutWidthCm": 34.8,
              "cutHeightCm": 42.7,
              "seamPath": "M 0,28 L 0,407 L 164.16,407 C 164.16,267.97 159.38,165.94 159.38,165.94 C 110.52,165.94 80.53,88.31 99.39,10.69 L 75.41,4.86 L 75.41,4.86 C 69.78,28 0,28 0,28 z",
              "saPath": "M 0,407 L 0,432 L 164.16,432 L 174.16,407 C 174.16,275 169.47,167.95 169.38,165.94 L 159.38,165.94"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Aaron",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "arm_binding",
            "name": "Armhole Binding",
            "names": {
              "en": "Armhole Binding",
              "hi": "आस्तीन की बाइंडिंग पट्टी",
              "te": "చేతుల చంక భాగం పట్టీలు"
            },
            "role": "supporting",
            "width": 6,
            "height": 35.5,
            "cutWidth": 6,
            "cutHeight": 35.5,
            "qty": 2,
            "cutQty": 2,
            "optional": false,
            "accentOnly": false,
            "fabricSource": "scrap",
            "scrapEligible": true,
            "cutOnFold": false,
            "seamAllowanceCm": {
              "defaultCm": 1
            },
            "grainLine": {
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": false
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 6,
              "finishedHeightCm": 35.5,
              "finishedAreaCm2": 212.9,
              "cutWidthCm": 6,
              "cutHeightCm": 35.5,
              "seamPath": "M 0,0 L 0,354.86 L 60,354.86 L 60,0 L 0,0 z",
              "saPath": "M 0,0 L 0,354.86 L 60,354.86 L 60,0 L 0,0 z"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Aaron",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          },
          {
            "id": "neck_binding",
            "name": "Neckline Binding",
            "names": {
              "en": "Neckline Binding",
              "hi": "गले की बाइंडिंग पट्टी",
              "te": "మెడ अంచు పట్టీ"
            },
            "role": "supporting",
            "width": 6,
            "height": 37.8,
            "cutWidth": 6,
            "cutHeight": 37.8,
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
              "orientation": "vertical",
              "angleDegrees": 90,
              "strict": false
            },
            "geometry": {
              "shapeType": "curved",
              "cutOnFold": false,
              "finishedWidthCm": 6,
              "finishedHeightCm": 37.8,
              "finishedAreaCm2": 227,
              "cutWidthCm": 6,
              "cutHeightCm": 37.8,
              "seamPath": "M 0,0 L 0,378.38 L 60,378.38 L 60,0 L 0,0 z",
              "saPath": "M 0,0 L 0,378.38 L 60,378.38 L 60,0 L 0,0 z"
            },
            "provenance": {
              "patternLibrary": "FreeSewing",
              "design": "Aaron",
              "version": "4.10.2",
              "pinned": true,
              "generatedWithoutHandTyping": true
            },
            "mapping3D": null
          }
        ]
      }
    }
  }
};

// Backward compatibility: provide non-enumerable patchwork alias if product is single-mode hybrid
for (const prod of Object.values(CUSTOM_PRODUCT_TEMPLATES)) {
  for (const sz of Object.values(prod.sizes || {})) {
    if (sz.variants && sz.variants.hybrid && !sz.variants.patchwork) {
      Object.defineProperty(sz.variants, 'patchwork', {
        enumerable: false,
        configurable: true,
        get() { return this.hybrid; },
      });
    }
  }
}
