#!/usr/bin/env node
/**
 * ReWear Product Pipeline — Product Removal Script
 * 
 * Usage:
 *   npm run remove-product -- <productId>
 *   node src/engine/factory/removeProduct.js <productId>
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CUSTOM_PRODUCT_TEMPLATES } from '../customRegistry.js';
import { CUSTOM_TRANSLATIONS } from '../../i18n/customTranslations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../../..');

function parseArgs() {
  const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  if (args.length === 0) {
    console.error(`
❌ ERROR: Missing product ID argument.

Usage:
  npm run remove-product -- <productId>
  node src/engine/factory/removeProduct.js <productId>
`);
    process.exit(1);
  }
  return args[0];
}

async function main() {
  const productId = parseArgs();
  console.log(`🗑️ Removing product "${productId}" from custom registry...`);

  if (!CUSTOM_PRODUCT_TEMPLATES[productId]) {
    console.warn(`⚠️ Warning: Product "${productId}" was not found in CUSTOM_PRODUCT_TEMPLATES.`);
  }

  // 1. Remove from custom templates
  const updatedCustomTemplates = { ...CUSTOM_PRODUCT_TEMPLATES };
  const targetSpec = updatedCustomTemplates[productId];
  delete updatedCustomTemplates[productId];

  const customRegistryPath = path.resolve(ROOT_DIR, 'src/engine/customRegistry.js');
  const registryCode = `/**
 * ReWear Custom Product Registry
 * 
 * Auto-managed by \`npm run new-product\` and \`npm run remove-product\`.
 * Holds dynamically registered Garment Specs.
 */

export const CUSTOM_PRODUCT_TEMPLATES = ${JSON.stringify(updatedCustomTemplates, null, 2)};

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
`;
  fs.writeFileSync(customRegistryPath, registryCode, 'utf-8');
  console.log(`💾 Updated: src/engine/customRegistry.js`);

  // 2. Remove from custom translations
  const updatedTranslations = {
    en: { productNames: { ...CUSTOM_TRANSLATIONS.en?.productNames }, sizeNames: { ...CUSTOM_TRANSLATIONS.en?.sizeNames }, zoneNames: { ...CUSTOM_TRANSLATIONS.en?.zoneNames } },
    hi: { productNames: { ...CUSTOM_TRANSLATIONS.hi?.productNames }, sizeNames: { ...CUSTOM_TRANSLATIONS.hi?.sizeNames }, zoneNames: { ...CUSTOM_TRANSLATIONS.hi?.zoneNames } },
    te: { productNames: { ...CUSTOM_TRANSLATIONS.te?.productNames }, sizeNames: { ...CUSTOM_TRANSLATIONS.te?.sizeNames }, zoneNames: { ...CUSTOM_TRANSLATIONS.te?.zoneNames } },
  };

  for (const lang of ['en', 'hi', 'te']) {
    delete updatedTranslations[lang].productNames[productId];
  }

  // Collect keys still in use by other custom products
  const remainingSizeKeys = new Set();
  const remainingZoneKeys = new Set();
  for (const prod of Object.values(updatedCustomTemplates)) {
    if (!prod?.sizes) continue;
    for (const [sKey, sVal] of Object.entries(prod.sizes)) {
      remainingSizeKeys.add(sKey);
      const pieces = sVal.zones || [];
      for (const p of pieces) {
        remainingZoneKeys.add(p.id);
        remainingZoneKeys.add(p.id.replace(/_\d+$/, ''));
      }
      if (sVal.variants) {
        for (const vPieces of Object.values(sVal.variants)) {
          for (const p of vPieces) {
            remainingZoneKeys.add(p.id);
            remainingZoneKeys.add(p.id.replace(/_\d+$/, ''));
          }
        }
      }
    }
  }

  // Remove sizeNames and zoneNames from removed product if not used elsewhere
  if (targetSpec?.sizes) {
    for (const [sKey, sVal] of Object.entries(targetSpec.sizes)) {
      if (!remainingSizeKeys.has(sKey)) {
        for (const lang of ['en', 'hi', 'te']) {
          delete updatedTranslations[lang].sizeNames[sKey];
        }
      } else {
        for (const prod of Object.values(updatedCustomTemplates)) {
          if (prod?.sizes?.[sKey]?.names) {
            for (const lang of ['en', 'hi', 'te']) {
              if (prod.sizes[sKey].names[lang]) {
                updatedTranslations[lang].sizeNames[sKey] = prod.sizes[sKey].names[lang];
              }
            }
            break;
          }
        }
      }
      const pieces = sVal.zones || [];
      for (const p of pieces) {
        const id1 = p.id;
        const id2 = p.id.replace(/_\d+$/, '');
        if (!remainingZoneKeys.has(id1)) {
          for (const lang of ['en', 'hi', 'te']) delete updatedTranslations[lang].zoneNames[id1];
        } else {
          for (const prod of Object.values(updatedCustomTemplates)) {
            for (const sz of Object.values(prod.sizes || {})) {
              const matched = (sz.zones || []).find((zp) => zp.id === id1);
              if (matched?.names) {
                for (const lang of ['en', 'hi', 'te']) {
                  if (matched.names[lang]) updatedTranslations[lang].zoneNames[id1] = matched.names[lang];
                }
              }
            }
          }
        }
        if (!remainingZoneKeys.has(id2)) {
          for (const lang of ['en', 'hi', 'te']) delete updatedTranslations[lang].zoneNames[id2];
        } else {
          for (const prod of Object.values(updatedCustomTemplates)) {
            for (const sz of Object.values(prod.sizes || {})) {
              const matched = (sz.zones || []).find((zp) => zp.id === id2 || zp.id.replace(/_\d+$/, '') === id2);
              if (matched?.names) {
                for (const lang of ['en', 'hi', 'te']) {
                  if (matched.names[lang]) updatedTranslations[lang].zoneNames[id2] = matched.names[lang];
                }
              }
            }
          }
        }
      }
      if (sVal.variants) {
        for (const vPieces of Object.values(sVal.variants)) {
          for (const p of vPieces) {
            const id1 = p.id;
            const id2 = p.id.replace(/_\d+$/, '');
            if (!remainingZoneKeys.has(id1)) {
              for (const lang of ['en', 'hi', 'te']) delete updatedTranslations[lang].zoneNames[id1];
            }
            if (!remainingZoneKeys.has(id2)) {
              for (const lang of ['en', 'hi', 'te']) delete updatedTranslations[lang].zoneNames[id2];
            }
          }
        }
      }
    }
  }

  const customTranslationsPath = path.resolve(ROOT_DIR, 'src/i18n/customTranslations.js');
  const translationsCode = `/**
 * Custom product translations store.
 * Auto-managed by \`npm run new-product\` and \`npm run remove-product\`.
 */
export const CUSTOM_TRANSLATIONS = ${JSON.stringify(updatedTranslations, null, 2)};
`;
  fs.writeFileSync(customTranslationsPath, translationsCode, 'utf-8');
  console.log(`🌐 Updated: src/i18n/customTranslations.js`);

  console.log(`\n✅ Product "${productId}" successfully removed.`);
}

main().catch((err) => {
  console.error(`💥 Unexpected error: ${err.stack || err.message}`);
  process.exit(1);
});
