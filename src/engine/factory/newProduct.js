#!/usr/bin/env node
/**
 * ReWear Product Pipeline Part 2 — Product Factory Script
 * 
 * Usage:
 *   npm run new-product -- --config products/<name>.json
 *   node src/engine/factory/newProduct.js --config products/<name>.json
 * 
 * Reads a short product specification JSON:
 * - id: Unique product identifier
 * - names: Multilingual product names ({ en, hi, te } or single name string)
 * - category: Product category (e.g. 'home', 'bags', 'garments', 'accessories')
 * - construction: Construction type ('tee', 'skirt', 'trousers', 'bag', 'cushion', 'pouch')
 * - sizes: Size specifications with finished dimensions
 * - pieces: Piece list with fabricSource ('scrap', 'plain', 'either') and roles
 * - materials: Bill of materials with default notions
 * - patternLibrary: Optional pinned CAD generator (e.g. { design: "brian", version: "4.10.2" })
 * 
 * Writes a normalized Garment Spec into the product registry (customRegistry.js)
 * with tailorVerified: false and updates customTranslations.js.
 * Validates the spec with validateProductSpec() before saving.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONFIG } from '../config.js';
import { TAILOR_DISCLAIMER, normalizeGarmentSpec } from '../templates.js';
import { CHILD_TOP_BRIAN_DATA, FREESEWING_VERSION, PATTERN_DESIGN } from '../childTopBrianData.js';
import { validateProductSpec } from '../productValidator.js';
import { CUSTOM_PRODUCT_TEMPLATES } from '../customRegistry.js';
import { CUSTOM_TRANSLATIONS } from '../../i18n/customTranslations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../../..');

// ---------------------------------------------------------------------------
// 1. Argument Parsing
// ---------------------------------------------------------------------------
function parseArgs() {
  const args = process.argv.slice(2);
  let configPath = null;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--config' || arg === '-c') {
      configPath = args[i + 1];
      i++;
    } else if (arg.startsWith('--config=')) {
      configPath = arg.slice(9);
    } else if (arg.endsWith('.json') && !configPath) {
      configPath = arg;
    }
  }

  if (!configPath) {
    console.error(`
❌ ERROR: Missing configuration file argument.

Usage:
  npm run new-product -- --config products/<name>.json
  node src/engine/factory/newProduct.js --config <path-to-json>
`);
    process.exit(1);
  }

  const resolvedPath = path.isAbsolute(configPath) ? configPath : path.resolve(ROOT_DIR, configPath);
  if (!fs.existsSync(resolvedPath)) {
    console.error(`❌ ERROR: Config file not found at: ${resolvedPath}`);
    process.exit(1);
  }

  return resolvedPath;
}

// ---------------------------------------------------------------------------
// 2. Load and Validate Raw Configuration
// ---------------------------------------------------------------------------
function loadConfig(filePath) {
  let rawJson;
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    rawJson = JSON.parse(content);
  } catch (err) {
    console.error(`❌ ERROR: Failed to parse JSON config at ${filePath}: ${err.message}`);
    process.exit(1);
  }

  if (!rawJson.id || typeof rawJson.id !== 'string') {
    console.error('❌ ERROR: Config must specify a string "id"');
    process.exit(1);
  }

  if (!rawJson.category) {
    rawJson.category = 'accessories';
  }

  const validConstructions = ['tee', 'skirt', 'trousers', 'bag', 'cushion', 'pouch', 'flat', 'casing'];
  if (!rawJson.construction || !validConstructions.includes(rawJson.construction)) {
    console.error(`❌ ERROR: Config "construction" must be one of: ${validConstructions.join(', ')}`);
    process.exit(1);
  }

  if (!rawJson.sizes || typeof rawJson.sizes !== 'object' || Object.keys(rawJson.sizes).length === 0) {
    console.error('❌ ERROR: Config must define at least one size in "sizes"');
    process.exit(1);
  }

  return rawJson;
}

// ---------------------------------------------------------------------------
// 3. Assemble Normalized Garment Spec
// ---------------------------------------------------------------------------
function assembleGarmentSpec(rawConfig) {
  const {
    id,
    names = {},
    name,
    category,
    construction,
    description,
    materials = [],
    sizes = {},
    patternLibrary,
    design,
    pieces: rootPieces,
    timeEstimateFormula,
    stitchingSteps,
  } = rawConfig;

  const enName = names.en || name || id.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const prodDescription = description || `${enName} made from leftover patchwork and upcycled fabric.`;

  // Pattern library check (e.g. FreeSewing Brian CAD generator)
  const libDesign = (patternLibrary?.design || design || '').toLowerCase();
  const isBrianCad = libDesign.includes('brian');

  const compiledSizes = {};

  for (const [sizeKey, sizeData] of Object.entries(sizes)) {
    const sizeLabel = sizeData.label || sizeData.names?.en || sizeKey;
    const w = sizeData.finishedDimensions?.widthCm ?? sizeData.finishedWidthCm ?? 30;
    const h = sizeData.finishedDimensions?.heightCm ?? sizeData.finishedHeightCm ?? 30;

    const sizeObj = {
      label: sizeLabel,
      finishedWidthCm: w,
      finishedHeightCm: h,
      finishedDimensions: {
        widthCm: w,
        heightCm: h,
      },
    };

    if (sizeData.bodyMeasurements) {
      sizeObj.bodyMeasurements = sizeData.bodyMeasurements;
    }

    // Determine pieces
    let rawPieces = sizeData.pieces || rootPieces || [];

    // If using Brian CAD pattern library
    if (isBrianCad) {
      const brianSizeKey = sizeKey in CHILD_TOP_BRIAN_DATA ? sizeKey : Object.keys(CHILD_TOP_BRIAN_DATA)[0];
      const cadData = CHILD_TOP_BRIAN_DATA[brianSizeKey];
      if (cadData) {
        sizeObj.finishedDimensions = cadData.finishedDimensions;
        sizeObj.finishedWidthCm = cadData.finishedDimensions.widthCm;
        sizeObj.finishedHeightCm = cadData.finishedDimensions.heightCm;
        if (cadData.bodyMeasurements) {
          sizeObj.bodyMeasurements = cadData.bodyMeasurements;
        }

        // Build pieces from CAD data
        rawPieces = Object.values(cadData.pieces).map((cadPiece) => {
          // Check config overrides for piece
          const override = (sizeData.pieces || rootPieces || []).find((p) => p.id === cadPiece.id);
          const fabricSource = override?.fabricSource || override?.source || (cadPiece.id === 'sleeve' ? 'scrap' : 'plain');

          return {
            id: cadPiece.id,
            name: cadPiece.name,
            names: override?.names,
            role: cadPiece.role,
            width: cadPiece.widthCm || (cadPiece.halfWidthCm ? cadPiece.halfWidthCm * 2 : 30),
            height: cadPiece.heightCm || 30,
            cutWidth: cadPiece.cutWidthCm || (cadPiece.cutHalfWidthCm ? cadPiece.cutHalfWidthCm * 2 : 32),
            cutHeight: cadPiece.cutHeightCm || 32,
            qty: cadPiece.cutQty || 1,
            cutQty: cadPiece.cutQty || 1,
            optional: false,
            fabricSource: fabricSource === 'plain' ? 'plain_base' : 'scrap',
            scrapEligible: fabricSource !== 'plain',
            cutOnFold: Boolean(cadPiece.cutOnFold),
            grainLine: cadPiece.grainLine || { orientation: 'vertical', angleDegrees: 90, strict: true },
            geometry: cadPiece.geometry,
            provenance: {
              patternLibrary: 'FreeSewing',
              design: PATTERN_DESIGN,
              version: FREESEWING_VERSION,
              pinned: true,
              generatedWithoutHandTyping: true,
            },
          };
        });
      }
    }

    // Process and normalize piece list
    const processedPieces = rawPieces.map((p) => {
      const pieceId = p.id;
      const pieceName = p.names?.en || p.name || pieceId.replace(/_/g, ' ');
      const role = p.role || 'base';

      // Source mapping: 'plain' -> 'plain_base', 'scrap'/'either' -> 'scrap'
      const srcInput = (p.fabricSource || p.source || 'scrap').toLowerCase();
      let fabricSource = 'scrap';
      let scrapEligible = true;

      if (srcInput === 'plain' || srcInput === 'plain_base') {
        fabricSource = 'plain_base';
        scrapEligible = false;
      }

      // Seam allowance
      const sa = typeof p.seamAllowanceCm === 'number'
        ? p.seamAllowanceCm
        : (p.seamAllowanceCm?.defaultCm ?? CONFIG.SEAM_ALLOWANCE_CM ?? 1.0);

      const pieceW = p.width !== undefined ? p.width : (p.geometry?.finishedWidthCm || 10);
      const pieceH = p.height !== undefined ? p.height : (p.geometry?.finishedHeightCm || 10);
      const qty = p.qty !== undefined ? p.qty : (p.cutQty || 1);

      const cutW = p.cutWidth !== undefined ? p.cutWidth : (pieceW + 2 * sa);
      const cutH = p.cutHeight !== undefined ? p.cutHeight : (pieceH + 2 * sa);

      const geometry = p.geometry || {
        shapeType: 'rectangle',
        finishedWidthCm: pieceW,
        finishedHeightCm: pieceH,
        finishedAreaCm2: pieceW * pieceH,
        cutWidthCm: cutW,
        cutHeightCm: cutH,
      };

      return {
        id: pieceId,
        name: pieceName,
        names: p.names || { en: pieceName },
        role,
        width: pieceW,
        height: pieceH,
        cutWidth: cutW,
        cutHeight: cutH,
        qty,
        cutQty: qty,
        optional: Boolean(p.optional),
        accentOnly: Boolean(p.accentOnly),
        fabricSource,
        scrapEligible,
        seamAllowanceCm: sa,
        cutOnFold: Boolean(p.cutOnFold),
        grainLine: p.grainLine || {
          orientation: p.orientation || 'lengthwise',
          symbol: p.orientation === 'crosswise' ? '↔' : '↕',
          description: `${p.orientation || 'Lengthwise'} grain`,
        },
        geometry,
        provenance: p.provenance || null,
        area: pieceW * pieceH,
        finishedAreaCm2: geometry.finishedAreaCm2 || (pieceW * pieceH),
        cutAreaCm2: geometry.cutAreaCm2 || (cutW * cutH * qty),
      };
    });

    // Check if pieces form a hybrid setup (some plain_base and some scrap)
    const hasPlain = processedPieces.some((p) => p.fabricSource === 'plain_base');
    const hasScrap = processedPieces.some((p) => p.fabricSource === 'scrap');

    if (hasPlain && hasScrap) {
      // Provide hybrid and patchwork variants
      sizeObj.variants = {
        hybrid: processedPieces,
        patchwork: processedPieces.map((p) => ({
          ...p,
          fabricSource: 'scrap',
          scrapEligible: true,
        })),
      };
      sizeObj.zones = processedPieces;
    } else {
      sizeObj.zones = processedPieces;
    }

    compiledSizes[sizeKey] = sizeObj;
  }

  // Materials with typical defaults disclaimer
  const typicalDisclaimer = 'typical default, to be verified by a tailor';
  const compiledMaterials = (materials || []).map((m) => ({
    name: m.name,
    qty: m.qty || '1',
    optional: Boolean(m.optional),
    source: m.source || 'Standard sewing notion',
    disclaimer: typicalDisclaimer,
    note: m.note ? (m.note.includes('tailor') ? m.note : `${m.note} (${typicalDisclaimer})`) : typicalDisclaimer,
  }));

  const hasHybrid = Object.values(compiledSizes).some((s) => s.variants?.hybrid);

  const spec = {
    schemaVersion: '1.0.0',
    id,
    name: enName,
    names: names || { en: enName },
    category,
    construction,
    description: prodDescription,
    defaultVariant: hasHybrid ? 'hybrid' : 'plain',
    tailorVerified: false,
    verifiedByTailor: false,
    disclaimer: TAILOR_DISCLAIMER,
    materials: compiledMaterials.length > 0 ? compiledMaterials : null,
    timeEstimateFormula: timeEstimateFormula || null,
    stitchingSteps: (stitchingSteps && stitchingSteps.length > 0) ? stitchingSteps : null,
    sizes: compiledSizes,
  };

  return normalizeGarmentSpec(spec);
}

// ---------------------------------------------------------------------------
// 4. Extract Translations
// ---------------------------------------------------------------------------
function extractTranslations(rawConfig, spec) {
  const { id, names = {}, sizes = {} } = rawConfig;
  const enProdName = names.en || rawConfig.name;
  const hiProdName = names.hi;
  const teProdName = names.te;

  const extracted = {
    en: { productNames: {}, sizeNames: {}, zoneNames: {} },
    hi: { productNames: {}, sizeNames: {}, zoneNames: {} },
    te: { productNames: {}, sizeNames: {}, zoneNames: {} },
  };

  if (enProdName) extracted.en.productNames[id] = enProdName;
  if (hiProdName) extracted.hi.productNames[id] = hiProdName;
  if (teProdName) extracted.te.productNames[id] = teProdName;

  // Sizes
  const STANDARD_SIZES = {
    small: { en: 'Small', hi: 'छोटा', te: 'చిన్నది' },
    medium: { en: 'Medium', hi: 'मध्यम', te: 'మధ్యస్థం' },
    large: { en: 'Large', hi: 'बड़ा', te: 'పెద్దది' },
  };

  for (const [sizeKey, sizeData] of Object.entries(sizes)) {
    const std = STANDARD_SIZES[sizeKey.toLowerCase()];
    const sEn = std ? std.en : (sizeData.names?.en || sizeData.label);
    const sHi = std ? std.hi : sizeData.names?.hi;
    const sTe = std ? std.te : sizeData.names?.te;

    if (sEn) extracted.en.sizeNames[sizeKey] = sEn;
    if (sHi) extracted.hi.sizeNames[sizeKey] = sHi;
    if (sTe) extracted.te.sizeNames[sizeKey] = sTe;
  }

  // Pieces
  const allPieces = [];
  for (const size of Object.values(spec.sizes || {})) {
    if (size.zones) allPieces.push(...size.zones);
    if (size.variants) {
      for (const vPieces of Object.values(size.variants)) {
        allPieces.push(...vPieces);
      }
    }
  }

  for (const piece of allPieces) {
    const pieceId = piece.id;
    const baseId = pieceId.replace(/_\d+$/, '');

    const pNames = piece.names || {};
    const pEn = pNames.en || piece.name;
    const pHi = pNames.hi;
    const pTe = pNames.te;

    if (pEn) extracted.en.zoneNames[pieceId] = pEn;
    if (pHi) extracted.hi.zoneNames[pieceId] = pHi;
    if (pTe) extracted.te.zoneNames[pieceId] = pTe;

    if (baseId !== pieceId) {
      if (pEn) extracted.en.zoneNames[baseId] = pEn;
      if (pHi) extracted.hi.zoneNames[baseId] = pHi;
      if (pTe) extracted.te.zoneNames[baseId] = pTe;
    }
  }

  return extracted;
}

// ---------------------------------------------------------------------------
// 5. Main Execution
// ---------------------------------------------------------------------------
async function main() {
  const configPath = parseArgs();
  console.log(`📦 Reading product specification from: ${configPath}`);

  const rawConfig = loadConfig(configPath);
  const spec = assembleGarmentSpec(rawConfig);
  const translations = extractTranslations(rawConfig, spec);

  console.log(`📐 Generated Garment Spec for product: "${spec.id}" (${spec.name})`);
  console.log(`   - Category: ${spec.category}`);
  console.log(`   - Construction: ${spec.construction}`);
  console.log(`   - Sizes: ${Object.keys(spec.sizes).join(', ')}`);
  console.log(`   - Tailor Verified: ${spec.tailorVerified}`);

  // Temporarily merge translations into in-memory translations for validation
  const { translations: globalTranslations } = await import('../../i18n/translations.js');
  for (const lang of ['en', 'hi', 'te']) {
    if (globalTranslations[lang]) {
      Object.assign(globalTranslations[lang].productNames, translations[lang].productNames);
      Object.assign(globalTranslations[lang].sizeNames, translations[lang].sizeNames);
      Object.assign(globalTranslations[lang].zoneNames, translations[lang].zoneNames);
    }
  }

  // Validate the generated spec
  console.log('🔍 Validating Garment Spec with productValidator...');
  const validationResult = validateProductSpec(spec);

  if (!validationResult.valid) {
    console.error(`\n❌ ERROR: Spec validation failed with ${validationResult.errors.length} error(s):`);
    validationResult.errors.forEach((err) => console.error(`  - ${err}`));
    process.exit(1);
  }

  console.log(`✅ Spec validation PASSED! (${validationResult.checksPassed.join(', ')})`);

  // Write to customRegistry.js
  const customRegistryPath = path.resolve(ROOT_DIR, 'src/engine/customRegistry.js');
  const updatedCustomTemplates = { ...CUSTOM_PRODUCT_TEMPLATES, [spec.id]: spec };
  const registryCode = `/**
 * ReWear Custom Product Registry
 * 
 * Auto-managed by \`npm run new-product\` and \`npm run remove-product\`.
 * Holds dynamically registered Garment Specs.
 */

export const CUSTOM_PRODUCT_TEMPLATES = ${JSON.stringify(updatedCustomTemplates, null, 2)};
`;
  fs.writeFileSync(customRegistryPath, registryCode, 'utf-8');
  console.log(`💾 Saved Garment Spec to: src/engine/customRegistry.js`);

  // Write to customTranslations.js
  const customTranslationsPath = path.resolve(ROOT_DIR, 'src/i18n/customTranslations.js');
  const updatedTranslations = {
    en: {
      productNames: { ...CUSTOM_TRANSLATIONS.en?.productNames, ...translations.en.productNames },
      sizeNames: { ...CUSTOM_TRANSLATIONS.en?.sizeNames, ...translations.en.sizeNames },
      zoneNames: { ...CUSTOM_TRANSLATIONS.en?.zoneNames, ...translations.en.zoneNames },
    },
    hi: {
      productNames: { ...CUSTOM_TRANSLATIONS.hi?.productNames, ...translations.hi.productNames },
      sizeNames: { ...CUSTOM_TRANSLATIONS.hi?.sizeNames, ...translations.hi.sizeNames },
      zoneNames: { ...CUSTOM_TRANSLATIONS.hi?.zoneNames, ...translations.hi.zoneNames },
    },
    te: {
      productNames: { ...CUSTOM_TRANSLATIONS.te?.productNames, ...translations.te.productNames },
      sizeNames: { ...CUSTOM_TRANSLATIONS.te?.sizeNames, ...translations.te.sizeNames },
      zoneNames: { ...CUSTOM_TRANSLATIONS.te?.zoneNames, ...translations.te.zoneNames },
    },
  };

  const translationsCode = `/**
 * Custom product translations store.
 * Auto-managed by \`npm run new-product\` and \`npm run remove-product\`.
 */
export const CUSTOM_TRANSLATIONS = ${JSON.stringify(updatedTranslations, null, 2)};
`;
  fs.writeFileSync(customTranslationsPath, translationsCode, 'utf-8');
  console.log(`🌐 Saved Multilingual Translations to: src/i18n/customTranslations.js`);

  console.log(`\n🎉 Successfully registered product "${spec.id}"!`);
  console.log(`   Run "npm run check-products" or "npm test" to verify across the entire pipeline.`);
}

main().catch((err) => {
  console.error(`💥 Unexpected error: ${err.stack || err.message}`);
  process.exit(1);
});
