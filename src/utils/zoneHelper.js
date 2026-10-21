/**
 * REWEAR STAGE 2 — ZONE DIMENSION & TRANSLATION HELPER
 * 
 * Provides robust resolution of zone dimensions (finished and cut sizes in cm and inches)
 * and translations for products, sizes, and pattern zones across English, Telugu, and Hindi.
 */

import { PRODUCT_TEMPLATES, getProductRequirements } from '../engine/templates.js';
import { translations } from '../i18n/translations.js';

/**
 * Resolves accurate finished and cut dimensions (both in cm and inches) for any zone.
 * Guarantees real numbers with a solid fallback so dimensions are never empty.
 */
export function getZoneDimensions(productId, sizeKey, zoneId, placement = {}, variant = 'plain') {
  let width = 0;
  let height = 0;

  // 1. Try finding zone in product templates
  try {
    const product = PRODUCT_TEMPLATES[productId];
    if (product && product.sizes && product.sizes[sizeKey]) {
      const sizeObj = product.sizes[sizeKey];
      let zones = sizeObj.zones || [];
      if (sizeObj.variants && sizeObj.variants[variant]) {
        zones = sizeObj.variants[variant];
      }
      const match = zones.find((z) => z.id === zoneId);
      if (match) {
        width = match.width;
        height = match.height;
      }
    }
  } catch (e) {
    // Fallback to placement
  }

  // 2. Fallbacks from placement object or scraps if not in template
  if (!width || !height) {
    if (placement.finishedWidth && placement.finishedHeight) {
      width = placement.finishedWidth;
      height = placement.finishedHeight;
    } else if (placement.width && placement.height) {
      width = placement.width;
      height = placement.height;
    } else if (placement.scraps && placement.scraps.length > 0) {
      width = Math.max(...placement.scraps.map((s) => s.cutWidth || 10)) - 2;
      height = Math.max(...placement.scraps.map((s) => s.cutHeight || 10)) - 2;
    } else {
      width = 15;
      height = 15;
    }
  }

  // Ensure positive numbers
  width = Math.max(1, Math.round(width));
  height = Math.max(1, Math.round(height));

  const seamAllowance = placement.seamAllowanceCm || 1.0;
  const cutWidth = width + Math.round(2 * seamAllowance);
  const cutHeight = height + Math.round(2 * seamAllowance);

  // Conversion to inches (1 in = 2.54 cm)
  const widthIn = (width / 2.54).toFixed(1);
  const heightIn = (height / 2.54).toFixed(1);
  const cutWidthIn = (cutWidth / 2.54).toFixed(1);
  const cutHeightIn = (cutHeight / 2.54).toFixed(1);

  return {
    finishedWidth: width,
    finishedHeight: height,
    cutWidth,
    cutHeight,
    finishedCmText: `${width} × ${height} cm`,
    finishedInText: `${widthIn} × ${heightIn} in`,
    cutCmText: `${cutWidth} × ${cutHeight} cm`,
    cutInText: `${cutWidthIn} × ${cutHeightIn} in`,
    fullFinishedText: `${width} × ${height} cm (${widthIn} × ${heightIn} in)`,
    fullCutText: `${cutWidth} × ${cutHeight} cm (${cutWidthIn} × ${cutHeightIn} in)`,
  };
}

/**
 * Returns translated product name.
 */
export function getTranslatedProductName(productId, fallbackName, t) {
  if (t?.productNames && t.productNames[productId]) {
    return t.productNames[productId];
  }
  return fallbackName || productId;
}

/**
 * Returns translated size label.
 */
export function getTranslatedSizeLabel(sizeKey, fallbackLabel, t) {
  if (t?.sizeNames && t.sizeNames[sizeKey]) {
    return t.sizeNames[sizeKey];
  }
  return fallbackLabel || sizeKey;
}

/**
 * Returns translated zone name.
 */
export function getTranslatedZoneName(zoneId, fallbackName, t) {
  if (t?.zoneNames && t.zoneNames[zoneId]) {
    return t.zoneNames[zoneId];
  }
  // Try matching by zone name string
  if (fallbackName && t?.zoneNames) {
    if (translations?.en?.zoneNames) {
      for (const [key, enName] of Object.entries(translations.en.zoneNames)) {
        if (enName.toLowerCase() === fallbackName.toLowerCase()) {
          return t.zoneNames[key] || fallbackName;
        }
      }
    }
    for (const [key, translated] of Object.entries(t.zoneNames)) {
      if (key.toLowerCase() === fallbackName.toLowerCase().replace(/[^a-z0-9]/g, '_')) {
        return translated;
      }
    }
  }
  return fallbackName || zoneId;
}

/**
 * Parses the engine's exact failure reason string, extracting missing pieces
 * to list them first with translations, followed by the translated explanation.
 */
export function parseMissingReasonDetails(missingText, productId, sizeKey, t, missingDetails = []) {
  const missingPieces = [];
  let remainingText = typeof missingText === 'string' ? missingText : '';

  // 1. If structured missingDetails array is provided by engine
  if (Array.isArray(missingDetails) && missingDetails.length > 0) {
    missingDetails.forEach((item) => {
      const rawName = item.zoneName || item.zoneId;
      const translatedName = getTranslatedZoneName(item.zoneId, rawName, t);

      let roleLabel = t?.roleBase || 'Main colour (60%)';
      if (item.role === 'supporting') roleLabel = t?.roleSupporting || 'Second colour (30%)';
      else if (item.role === 'accent') roleLabel = t?.roleSmallTouch || t?.roleAccent || 'Small touch (10%)';

      let dimsFormatted = item.neededDimensions || '';
      const dimNumbers = dimsFormatted.match(/(\d+)\s*×\s*(\d+)\s*cm/i);
      if (dimNumbers) {
        const w = parseInt(dimNumbers[1], 10);
        const h = parseInt(dimNumbers[2], 10);
        const wIn = (w / 2.54).toFixed(1);
        const hIn = (h / 2.54).toFixed(1);
        dimsFormatted = `${w} × ${h} cm (${wIn} × ${hIn} in)`;
      }

      missingPieces.push({
        zoneId: item.zoneId,
        rawName,
        translatedName,
        dimensions: dimsFormatted,
        role: roleLabel,
        neededArea: item.neededArea,
      });
    });

    if (remainingText) {
      remainingText = remainingText.replace(/Missing pieces for:\s*[^.]+\.?/i, '').trim();
    }
  } else if (remainingText) {
    // 2. Parse from engine string: "Missing pieces for: Piece1 (W × H cm, role); Piece2..."
    const match = remainingText.match(/Missing pieces for:\s*([^.]+)/i);
    if (match && match[1]) {
      const piecesRaw = match[1].split(';').map((s) => s.trim()).filter(Boolean);
      piecesRaw.forEach((raw) => {
        const itemMatch = raw.match(/^([^(]+)(?:\(([^,]+)(?:,\s*([^)]+))?\))?/);
        if (itemMatch) {
          const rawName = itemMatch[1].trim();
          const rawDims = itemMatch[2] ? itemMatch[2].trim() : '';
          const rawRole = itemMatch[3] ? itemMatch[3].trim() : '';

          const translatedName = getTranslatedZoneName(null, rawName, t);

          let roleLabel = t?.roleBase || 'Main colour (60%)';
          if (rawRole.includes('supporting')) roleLabel = t?.roleSupporting || 'Second colour (30%)';
          else if (rawRole.includes('accent')) roleLabel = t?.roleSmallTouch || t?.roleAccent || 'Small touch (10%)';

          let dimsFormatted = rawDims;
          const dimNumbers = rawDims.match(/(\d+)\s*×\s*(\d+)\s*cm/i);
          if (dimNumbers) {
            const w = parseInt(dimNumbers[1], 10);
            const h = parseInt(dimNumbers[2], 10);
            const wIn = (w / 2.54).toFixed(1);
            const hIn = (h / 2.54).toFixed(1);
            dimsFormatted = `${w} × ${h} cm (${wIn} × ${hIn} in)`;
          }

          missingPieces.push({
            rawName,
            translatedName,
            dimensions: dimsFormatted,
            role: roleLabel,
          });
        }
      });

      remainingText = remainingText.replace(/Missing pieces for:\s*[^.]+\.?/i, '').trim();
    }
  }

  // 3. Translate engine explanation phrases
  let exactReason = remainingText;
  if (!exactReason || exactReason.length === 0) {
    if (t?.engineReasonNotEnoughFabric && t?.engineReasonTrySmallerOrAdd) {
      exactReason = `${t.engineReasonNotEnoughFabric} ${t.engineReasonTrySmallerOrAdd}`;
    } else {
      exactReason = t?.feasibleNoDesc || 'Not enough fabric to complete all zones.';
    }
  } else {
    if (exactReason.includes('Not enough fabric to complete all zones')) {
      if (t?.engineReasonNotEnoughFabric) {
        exactReason = exactReason.replace(/Not enough fabric to complete all zones\.?/i, t.engineReasonNotEnoughFabric);
      }
    }
    if (exactReason.includes('Try a smaller size or add matching scrap fabric')) {
      if (t?.engineReasonTrySmallerOrAdd) {
        exactReason = exactReason.replace(/Try a smaller size or add matching scrap fabric\.?/i, t.engineReasonTrySmallerOrAdd);
      }
    }
  }

  // 4. Construct unified missing summary (missing pieces FIRST)
  let fullMissingSummary = exactReason;
  if (missingPieces.length > 0) {
    const listStr = missingPieces.map((p) => `${p.translatedName} (${p.dimensions}, ${p.role})`).join('; ');
    const heading = t?.missingPiecesHeading || 'Missing pieces:';
    fullMissingSummary = `${heading} ${listStr}. ${exactReason}`;
  }

  return {
    missingPieces,
    exactReason,
    fullMissingSummary,
  };
}

