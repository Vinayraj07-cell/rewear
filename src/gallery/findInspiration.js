// src/gallery/findInspiration.js
// Stage 6 / Task A2: Pure Inspiration Matching & Color Distance Ranking Logic
// Prioritizes matching product first, then same category, ranked by palette distance.

import { PRODUCT_TEMPLATES } from '../engine/templates.js';
import { GALLERY_TRANSLATIONS } from '../i18n/galleryTranslations.js';

/**
 * Parses a hex color string into [r, g, b] array.
 * 
 * @param {string} hex
 * @returns {[number, number, number]}
 */
export function parseHex(hex) {
  if (!hex || typeof hex !== 'string') return [128, 128, 128];
  let c = hex.replace('#', '').trim();
  if (c.length === 3) c = c.split('').map((x) => x + x).join('');
  if (c.length !== 6) return [128, 128, 128];
  const num = parseInt(c, 16);
  if (isNaN(num)) return [128, 128, 128];
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

/**
 * Calculates Euclidean RGB distance between two hex colors (0 to ~441.67).
 * 
 * @param {string} hex1
 * @param {string} hex2
 * @returns {number}
 */
export function colorDistance(hex1, hex2) {
  const [r1, g1, b1] = parseHex(hex1);
  const [r2, g2, b2] = parseHex(hex2);
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

/**
 * Computes average minimum Euclidean distance between a design's scrap colors
 * and an image's palette colors.
 * 
 * @param {string[]} designColours - Array of hex strings from user scraps
 * @param {string[]} imageColours - Array of hex strings from gallery item
 * @returns {number} Average minimum distance (smaller = closer match)
 */
export function computePaletteDistance(designColours, imageColours) {
  if (!Array.isArray(designColours) || designColours.length === 0) return 100;
  if (!Array.isArray(imageColours) || imageColours.length === 0) return 200;

  let totalMinDist = 0;
  for (const dColor of designColours) {
    let minDist = Infinity;
    for (const iColor of imageColours) {
      const dist = colorDistance(dColor, iColor);
      if (dist < minDist) minDist = dist;
    }
    totalMinDist += minDist;
  }

  return Number((totalMinDist / designColours.length).toFixed(2));
}

/**
 * Finds and ranks inspiration examples from the gallery manifest.
 * 
 * Ranking order:
 * 1. Exact product matches (same productId), ranked by ascending colour distance.
 * 2. Category fallback matches (same category, different productId), ranked by colour distance.
 * 3. Never throws on missing, null, or empty manifest (returns []).
 * 
 * Every result item is annotated with:
 * - colourDistance: number
 * - disclaimerKey: 'inspirationDisclaimer'
 * - disclaimer: { en, hi, te }
 * 
 * @param {Array<Object>} manifest - Gallery manifest array
 * @param {Object} query
 * @param {string} query.productId - Selected product ID
 * @param {string[]} [query.colours=[]] - Scrap color hex array
 * @param {number} [query.limit=6] - Maximum number of inspiration items to return
 * @returns {Array<Object>} Ranked inspiration items
 */
export function findInspiration(manifest, { productId, colours = [], limit = 6 } = {}) {
  if (!Array.isArray(manifest) || manifest.length === 0 || limit <= 0) {
    return [];
  }

  const targetCategory = PRODUCT_TEMPLATES[productId]?.category || null;

  // Annotate all items with colour distance and honesty disclaimers
  const annotated = manifest.map((item) => {
    const dist = computePaletteDistance(colours, item.colours);
    return {
      ...item,
      colourDistance: dist,
      disclaimerKey: 'inspirationDisclaimer',
      disclaimer: {
        en: GALLERY_TRANSLATIONS.en.inspirationDisclaimer,
        hi: GALLERY_TRANSLATIONS.hi.inspirationDisclaimer,
        te: GALLERY_TRANSLATIONS.te.inspirationDisclaimer,
      },
    };
  });

  // Partition into Tier 1 (same product) and Tier 2 (same category)
  const tier1SameProduct = [];
  const tier2SameCategory = [];
  const tier3Other = [];

  for (const item of annotated) {
    if (item.productId === productId) {
      tier1SameProduct.push(item);
    } else if (targetCategory && item.category === targetCategory) {
      tier2SameCategory.push(item);
    } else {
      tier3Other.push(item);
    }
  }

  // Sort each tier by colourDistance ascending (closest colour match first)
  tier1SameProduct.sort((a, b) => a.colourDistance - b.colourDistance);
  tier2SameCategory.sort((a, b) => a.colourDistance - b.colourDistance);
  tier3Other.sort((a, b) => a.colourDistance - b.colourDistance);

  const combined = [...tier1SameProduct, ...tier2SameCategory, ...tier3Other];
  return combined.slice(0, limit);
}

export default findInspiration;
