// scripts/import_gallery.mjs
// Stage 6 / Task A2: ReWear Inspiration Gallery Importer
// Reads public/gallery_incoming/, enforces size & dimension guards,
// maps colourways & localized product names, and compiles public/gallery/manifest.json.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRODUCT_TEMPLATES } from '../src/engine/templates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Standard maximum asset bounds
export const MAX_FILE_SIZE_BYTES = 150 * 1024; // 150 KB
export const MAX_WIDTH_PX = 768; // 768 px

// Fixed colourway palettes in code (no image decoding needed)
export const COLOURWAY_PALETTES = {
  earth: ['#C2410C', '#CA8A04', '#65A30D', '#FEF3C7'], // terracotta, mustard, olive, cream
  indigo: ['#1E3A8A', '#60A5FA', '#FFFFFF', '#9CA3AF'], // indigo, light blue, white, grey
  festive: ['#BE185D', '#EA580C', '#0D9488', '#EAB308'], // magenta, orange, teal, gold-yellow
  pastel: ['#FDBA74', '#86EFAC', '#C4B5FD', '#FEF08A'], // peach, mint, lavender, pale yellow
};

// Machine-written product names (listed in docs/gallery_translation_review.md)
export const PRODUCT_NAMES_TRANSLATIONS = {
  tote_bag: { en: 'Quilted Tote Bag', hi: 'क्विल्टेड टोट बैग', te: 'క్విల్టెడ్ టోట్ బ్యాగ్' },
  pouch: { en: 'Zippered Utility Pouch', hi: 'ज़िपर पाउच', te: 'జిప్పర్ పౌచ్' },
  cushion_cover: { en: 'Patchwork Cushion Cover', hi: 'पैचवर्क कुशन कवर', te: 'ప్యాచ్‌వర్క్ కుషన్ కవర్' },
  kids_frock: { en: 'Tiered Kids Frock', hi: 'बच्चों की फ्रॉक', te: 'పిల్లల ఫ్రాక్' },
  child_top: { en: 'Raglan Sleeve Child Top', hi: 'बच्चों का टॉप', te: 'పిల్లల టాప్' },
  drawstring_bag: { en: 'Drawstring Potli Bag', hi: 'पोटली बैग', te: 'మూట సంచి' },
  scrunchie: { en: 'Ruffled Hair Scrunchie', hi: 'हेयर स्क्रंची', te: 'హెయిర్ స్క్రంచీ' },
  table_runner: { en: 'Colorblock Table Runner', hi: 'टेबल रनर', te: 'టేబుల్ రన్నర్' },
  placemat: { en: 'Quilted Dining Placemat', hi: 'डाइनिंग प्लेसमैट', te: 'డైనింగ్ ప్లేస్‌మ్యాట్' },
  coin_purse: { en: 'Squeeze Coin Purse', hi: 'सिक्का पर्स', te: 'నాణేల పర్స్' },
  pencil_case: { en: 'Zippered Pencil Case', hi: 'पेंसिल केस', te: 'పెన్సిల్ కేస్' },
  sandy_skirt: { en: 'Panelled Circle Skirt', hi: 'सर्कल स्कर्ट', te: 'సర్కిల్ స్కర్ట్' },
  aaron_tank: { en: 'Ribbed Knit Tank Top', hi: 'टैंक टॉप', te: 'ట్యాంక్ టాప్' },
  lunch_bag: { en: 'Insulated Lunch Bag', hi: 'लंच बैग', te: 'లంచ్ బ్యాగ్' },
  laptop_sleeve: { en: 'Padded Laptop Sleeve', hi: 'लैपटॉप स्लीव', te: 'ల్యాప్‌టాప్ స్లీవ్' },
  phone_pouch: { en: 'Crossbody Phone Pouch', hi: 'फोन पाउच', te: 'ఫోన్ పౌచ్' },
  passport_holder: { en: 'Travel Passport Holder', hi: 'पासपोर्ट होल्डर', te: 'పాస్‌పోర్ట్ హోల్డర్' },
  pot_holder: { en: 'Quilted Kitchen Pot Holder', hi: 'पॉट होल्डर', te: 'హాట్ పాట్ హోల్డర్' },
  oven_mitt: { en: 'Heat-Resistant Oven Mitt', hi: 'ओवन मिट', te: 'ఓవెన్ మిట్' },
  tea_cosy: { en: 'Insulated Teapot Cosy', hi: 'टी कोज़ी', te: 'టీ కోజీ' },
  apron: { en: 'Utility Work Apron', hi: 'एप्रन', te: 'ఆప్రాన్' },
  napkin_set: { en: 'Dining Napkin Set', hi: 'नेपकिन सेट', te: 'నేప్‌కిన్ సెట్' },
  coaster_set: { en: 'Quilted Coaster Set', hi: 'कोस्टर सेट', te: 'కోస్టర్ సెట్' },
  tote_bag_mini: { en: 'Mini Carry Tote Bag', hi: 'मिनी टोट बैग', te: 'మినీ టోట్ బ్యాగ్' },
  drawstring_pouch: { en: 'Drawstring Gift Pouch', hi: 'ड्रॉस्ट्रिंग पाउच', te: 'డ్రాస్ట్రింగ్ పౌచ్' },
  makeup_bag: { en: 'Cosmetic Makeup Bag', hi: 'मेकअप बैग', te: 'మేకప్ బ్యాగ్' },
  table_mat: { en: 'Quilted Table Mat', hi: 'टेबल मैट', te: 'టేబుల్ మ్యాట్' },
  cushion_cover_large: { en: 'Large Floor Cushion Cover', hi: 'बड़ा कुशन कवर', te: 'పెద్ద కుషన్ కవర్' },
  sling_bag: { en: 'Compact Sling Bag', hi: 'स्लिंग बैग', te: 'స్లింగ్ బ్యాగ్' },
  tool_roll: { en: 'Organizer Tool Roll', hi: 'टूल रोल', te: 'టూల్ రోల్' },
  glasses_case: { en: 'Protective Glasses Case', hi: 'चश्मा केस', te: 'కళ్ళజోడు కేస్' },
  fabric_basket: { en: 'Foldable Fabric Basket', hi: 'कपड़े की टोकरी', te: 'ఫ్యాబ్రిక్ బాస్కెట్' },
  laundry_bag: { en: 'Drawstring Laundry Bag', hi: 'लॉन्ड्री बैग', te: 'లాండ్రీ బ్యాగ్' },
};

/**
 * Extracts width and height from raw image buffer headers without third-party dependencies.
 * Supports PNG, JPEG, WebP, and GIF.
 * 
 * @param {Buffer} buffer
 * @returns {{ width: number, height: number, format: string }}
 */
export function getImageDimensions(buffer) {
  if (!buffer || buffer.length < 10) {
    throw new Error('Buffer too small to determine image dimensions');
  }

  // 1. PNG: 8-byte signature: 0x89 'P' 'N' 'G' 0x0D 0x0A 0x1A 0x0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    return { width, height, format: 'png' };
  }

  // 2. GIF: 'GIF87a' or 'GIF89a'
  if (
    buffer[0] === 0x47 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x38 &&
    (buffer[4] === 0x37 || buffer[4] === 0x39) &&
    buffer[5] === 0x61
  ) {
    const width = buffer.readUInt16LE(6);
    const height = buffer.readUInt16LE(8);
    return { width, height, format: 'gif' };
  }

  // 3. WebP: RIFF ... WEBP
  if (
    buffer.toString('ascii', 0, 4) === 'RIFF' &&
    buffer.toString('ascii', 8, 12) === 'WEBP'
  ) {
    const chunkType = buffer.toString('ascii', 12, 16);
    if (chunkType === 'VP8 ') {
      // Lossy format: start code 0x9D 0x01 0x2A at offset 23
      const width = buffer.readUInt16LE(26) & 0x3fff;
      const height = buffer.readUInt16LE(28) & 0x3fff;
      return { width, height, format: 'webp' };
    } else if (chunkType === 'VP8L') {
      // Lossless format: 1-byte signature 0x2F at offset 20, then 32-bit bitfield
      const b0 = buffer[21];
      const b1 = buffer[22];
      const b2 = buffer[23];
      const b3 = buffer[24];
      const width = 1 + (((b1 & 0x3f) << 8) | b0);
      const height = 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
      return { width, height, format: 'webp' };
    } else if (chunkType === 'VP8X') {
      // Extended format: canvas width at 24 (3 bytes), height at 27 (3 bytes)
      const width = 1 + buffer.readUIntLE(24, 3);
      const height = 1 + buffer.readUIntLE(27, 3);
      return { width, height, format: 'webp' };
    }
  }

  // 4. JPEG: Starts with FF D8
  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset++;
        continue;
      }
      const marker = buffer[offset + 1];
      if (marker === 0xff || marker === 0x00) {
        offset++;
        continue;
      }
      offset += 2;
      // Start of Frame markers containing width & height
      if (
        (marker >= 0xc0 && marker <= 0xc3) ||
        (marker >= 0xc5 && marker <= 0xc7) ||
        (marker >= 0xc9 && marker <= 0xcb) ||
        (marker >= 0xcd && marker <= 0xcf)
      ) {
        const height = buffer.readUInt16BE(offset + 3);
        const width = buffer.readUInt16BE(offset + 5);
        return { width, height, format: 'jpeg' };
      }
      if (offset + 2 > buffer.length) break;
      const length = buffer.readUInt16BE(offset);
      offset += length;
    }
  }

  throw new Error('Unsupported image format or corrupt image header');
}

/**
 * Parses product and colourway metadata from either:
 * - Filename: <productId>__<colourway>__<nn>.<ext>
 * - Parent folder: <productId>__<colourway>/<filename>.<ext>
 *
 * @param {string} relativeFilePath - e.g. "tote_bag__earth__01.webp" or "pouch__indigo/photo.jpg"
 * @returns {{ productId: string, colourway: string, nn: string, ext: string } | null}
 */
export function parseImageMetadata(relativeFilePath) {
  const normPath = relativeFilePath.replace(/\\/g, '/');
  const ext = path.extname(normPath).toLowerCase();
  const baseName = path.basename(normPath, ext);
  const dirName = path.dirname(normPath);

  // Scheme 1: Filename matches <productId>__<colourway>__<nn>
  const fileMatch = baseName.match(/^([a-z0-9_]+)__([a-z0-9_]+)__(.+)$/i);
  if (fileMatch) {
    return {
      productId: fileMatch[1].toLowerCase(),
      colourway: fileMatch[2].toLowerCase(),
      nn: fileMatch[3],
      ext,
    };
  }

  // Scheme 2: Parent folder matches <productId>__<colourway>
  const folderBase = dirName !== '.' ? path.basename(dirName) : '';
  const folderMatch = folderBase.match(/^([a-z0-9_]+)__([a-z0-9_]+)$/i);
  if (folderMatch) {
    return {
      productId: folderMatch[1].toLowerCase(),
      colourway: folderMatch[2].toLowerCase(),
      nn: baseName,
      ext,
    };
  }

  return null;
}

/**
 * Collects all image files in a directory recursively.
 * 
 * @param {string} dir
 * @param {string} [base='']
 * @returns {string[]}
 */
export function collectFilesRecursively(dir, base = '') {
  const fullPath = path.join(dir, base);
  if (!fs.existsSync(fullPath)) return [];
  const entries = fs.readdirSync(fullPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const rel = base ? path.join(base, entry.name) : entry.name;
    if (entry.isDirectory()) {
      files.push(...collectFilesRecursively(dir, rel));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(ext)) {
        files.push(rel);
      }
    }
  }

  return files;
}

/**
 * Main Gallery Importer function.
 * 
 * @param {Object} [options]
 * @param {string} [options.incomingDir] - Defaults to ROOT_DIR/public/gallery_incoming
 * @param {string} [options.outputDir] - Defaults to ROOT_DIR/public/gallery
 * @param {boolean} [options.quiet]
 * @returns {Promise<{ manifest: Array, importedCount: number, skippedUnknownIds: string[] }>}
 */
export async function runGalleryImport({
  incomingDir = path.join(ROOT_DIR, 'public', 'gallery_incoming'),
  outputDir = path.join(ROOT_DIR, 'public', 'gallery'),
  quiet = false,
} = {}) {
  const log = (...args) => {
    if (!quiet) console.log(...args);
  };
  const warn = (...args) => {
    if (!quiet) console.warn(...args);
  };

  if (!fs.existsSync(incomingDir)) {
    log(`Incoming directory does not exist: ${incomingDir}`);
    return { manifest: [], importedCount: 0, skippedUnknownIds: [] };
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Ensure docs/gallery_translation_review.md is maintained
  writeTranslationReviewDoc();

  const allIncomingFiles = collectFilesRecursively(incomingDir);
  const skippedUnknownIds = [];
  const manifest = [];
  let importedCount = 0;

  for (const relFile of allIncomingFiles) {
    const fullSourcePath = path.join(incomingDir, relFile);
    const stat = fs.statSync(fullSourcePath);

    // 1. Guard: Max file size 150 KB
    if (stat.size > MAX_FILE_SIZE_BYTES) {
      const sizeKb = (stat.size / 1024).toFixed(1);
      throw new Error(
        `File "${relFile}" is ${sizeKb} KB, exceeding 150 KB limit. ` +
        `Convert image to 512 px WebP at quality 75 using any free tool (e.g. squoosh.app, sharp, or ffmpeg).`
      );
    }

    // 2. Guard: Max width 768 px
    const buffer = fs.readFileSync(fullSourcePath);
    const dimensions = getImageDimensions(buffer);
    if (dimensions.width > MAX_WIDTH_PX) {
      throw new Error(
        `File "${relFile}" width is ${dimensions.width}px, exceeding 768px limit. ` +
        `Convert image to 512 px WebP at quality 75 using any free tool (e.g. squoosh.app, sharp, or ffmpeg).`
      );
    }

    // 3. Metadata extraction
    const meta = parseImageMetadata(relFile);
    if (!meta) {
      warn(`[WARN] Skipping file "${relFile}": name must follow <productId>__<colourway>__<nn>.<ext> or parent folder <productId>__<colourway>/`);
      continue;
    }

    const { productId, colourway, nn, ext } = meta;

    // 4. Validate productId against engine templates
    if (!PRODUCT_TEMPLATES[productId]) {
      warn(`[WARN] Skipping unknown productId "${productId}" in "${relFile}"`);
      if (!skippedUnknownIds.includes(productId)) {
        skippedUnknownIds.push(productId);
      }
      continue;
    }

    // 5. Validate colourway
    if (!COLOURWAY_PALETTES[colourway]) {
      warn(`[WARN] Skipping invalid colourway "${colourway}" in "${relFile}". Must be one of: earth, indigo, festive, pastel.`);
      continue;
    }

    // 6. Sourcing metadata
    const template = PRODUCT_TEMPLATES[productId];
    const category = template.category || 'home';
    const colours = COLOURWAY_PALETTES[colourway];
    const defaultName = template.name || productId.replace(/_/g, ' ');
    const names = PRODUCT_NAMES_TRANSLATIONS[productId] || {
      en: defaultName,
      hi: defaultName,
      te: defaultName,
    };

    const destFileName = `${productId}_${colourway}_${nn}${ext}`;
    const destFilePath = path.join(outputDir, destFileName);

    // Copy file to gallery destination
    fs.copyFileSync(fullSourcePath, destFilePath);

    manifest.push({
      id: `${productId}_${colourway}_${nn}`,
      file: destFileName,
      productId,
      category,
      colourway,
      colours,
      names,
      aiGenerated: true,
    });

    importedCount++;
  }

  // Sort manifest consistently by id
  manifest.sort((a, b) => a.id.localeCompare(b.id));

  // Write manifest.json
  const manifestPath = path.join(outputDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  log(`✓ Gallery manifest written: ${manifest.length} items to ${manifestPath}`);

  if (skippedUnknownIds.length > 0) {
    warn(`\n[SUMMARY] Skipped unknown product IDs (${skippedUnknownIds.length}): ${skippedUnknownIds.join(', ')}`);
  }

  // Write / update docs/gallery_translation_review.md
  writeTranslationReviewDoc();

  return { manifest, importedCount, skippedUnknownIds };
}

/**
 * Writes docs/gallery_translation_review.md documenting localized names.
 */
export function writeTranslationReviewDoc() {
  const reviewDocPath = path.join(ROOT_DIR, 'docs', 'gallery_translation_review.md');
  const lines = [
    '# Gallery Translations Review Checklist',
    '',
    'The localized names below for gallery inspiration cards are machine-written and need native review.',
    '',
    '| Product ID | English Name | Hindi Name (machine-written, needs native review) | Telugu Name (machine-written, needs native review) |',
    '|---|---|---|---|',
  ];

  for (const [id, t] of Object.entries(PRODUCT_NAMES_TRANSLATIONS)) {
    lines.push(`| \`${id}\` | ${t.en} | ${t.hi} | ${t.te} |`);
  }

  lines.push('');
  lines.push('---');
  lines.push('**Honesty & Accuracy**: Review by native Hindi and Telugu speakers before promotional release.');
  lines.push('');

  fs.writeFileSync(reviewDocPath, lines.join('\n'), 'utf8');
}

// Execute directly if run as main script
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  let incoming = path.join(ROOT_DIR, 'public', 'gallery_incoming');
  let output = path.join(ROOT_DIR, 'public', 'gallery');

  const incomingIdx = process.argv.indexOf('--incoming');
  if (incomingIdx !== -1 && process.argv[incomingIdx + 1]) {
    incoming = path.resolve(process.argv[incomingIdx + 1]);
  }
  const outIdx = process.argv.indexOf('--out');
  if (outIdx !== -1 && process.argv[outIdx + 1]) {
    output = path.resolve(process.argv[outIdx + 1]);
  }

  runGalleryImport({ incomingDir: incoming, outputDir: output })
    .then((res) => {
      console.log(`\n🎉 Gallery import completed: ${res.importedCount} image(s) processed.`);
    })
    .catch((err) => {
      console.error(`\n❌ Gallery import failed: ${err.message}`);
      process.exit(1);
    });
}
