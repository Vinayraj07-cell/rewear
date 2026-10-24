// src/utils/curvedBlueprintPDF.js
// Stage 6 / Q11: Real-Scale Curved Garment Blueprints & A4 Tiled PDF Generator
// For FreeSewing CAD Garments: Circle Skirt (Sandy), Tank Top (Aaron), Kids Top (Brian).
// Features:
// 1. Real-scale 1:1 CAD piece geometries (FreeSewing 4.10.2 mathematical outputs)
// 2. Seam allowance line (dashed inner stitch line, solid outer cut line)
// 3. Grain arrows, notches, piece names, cut/finished sizes, scrap/plain sourcing
// 4. Circle skirt: draws ONE gore labeled "CUT 16 GORES FROM SCRAPS"
// 5. Product-specific stitching steps (no parts the garment does not have)
// 6. Measurement tables in cm and inches marked "typical estimate, to be verified by a tailor"
// 7. A4 tiling with overlap alignment crosshairs and 10 cm print scale calibration square
// 8. Faint blueprint grid background in PDF (no FreeSewing logo)
// 9. 100% English only, zero "undefined", zero broken glyphs

import * as pdfkitModule from 'pdfkit';
import PDFDocument from 'pdfkit';
import SVGtoPDF from 'svg-to-pdfkit';
import Helvetica from 'pdfkit/standard-fonts/Helvetica';
import HelveticaBold from 'pdfkit/standard-fonts/HelveticaBold';
import HelveticaBoldOblique from 'pdfkit/standard-fonts/HelveticaBoldOblique';
import HelveticaOblique from 'pdfkit/standard-fonts/HelveticaOblique';
import Courier from 'pdfkit/standard-fonts/Courier';
import CourierBold from 'pdfkit/standard-fonts/CourierBold';
import TimesRoman from 'pdfkit/standard-fonts/TimesRoman';
import TimesBold from 'pdfkit/standard-fonts/TimesBold';
import SymbolFont from 'pdfkit/standard-fonts/Symbol';
import ZapfDingbats from 'pdfkit/standard-fonts/ZapfDingbats';
import { buildDesign } from '../engine/index.js';
import { computeProduct2DLayout } from './product2DLayout.js';
import {
  buildTailorBlueprint,
  TAILOR_DISCLAIMER,
  TYPICAL_DEFAULTS_DISCLAIMER,
  getGarmentMeasurementTable,
  cmToInch,
} from './tailorBlueprintData.js';
import { getPathBoundingBox } from '../engine/geometry.js';
import { CHILD_TOP_BRIAN_DATA } from '../engine/childTopBrianData.js';
import { SANDY_SKIRT_DATA } from '../engine/sandySkirtData.js';
import { AARON_TANK_DATA } from '../engine/aaronTankData.js';
import { SAMPLE_PILES } from './pileHelpers.js';

// Register standard fonts for browser/WebView environments
const registerFn = pdfkitModule.registerStdFonts || pdfkitModule.default?.registerStdFonts;
if (typeof registerFn === 'function') {
  registerFn(
    Helvetica,
    HelveticaBold,
    HelveticaBoldOblique,
    HelveticaOblique,
    Courier,
    CourierBold,
    TimesRoman,
    TimesBold,
    SymbolFont,
    ZapfDingbats
  );
}

const MM_TO_PT = 72 / 25.4; // 2.83464567 pt per mm
const CM_TO_PT = MM_TO_PT * 10; // 28.3464567 pt per cm

// Standard A4 dimensions in points
const A4_WIDTH_PT = 595.28;
const A4_HEIGHT_PT = 841.89;

// Default sample pile for generating blueprints
const SAMPLE_TEST_PILE = [
  ...Array.from({ length: 24 }, (_, i) => ({
    id: `navy_${i + 1}`,
    width: 14,
    height: 14,
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
    color: 'navy',
    colorHex: '#1E3A8A',
    print: 'plain',
    frays: false,
  })),
  ...Array.from({ length: 18 }, (_, i) => ({
    id: `beige_${i + 1}`,
    width: 14,
    height: 14,
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
    color: 'beige',
    colorHex: '#D6C0A4',
    print: 'plain',
    frays: false,
  })),
  ...Array.from({ length: 14 }, (_, i) => ({
    id: `grey_${i + 1}`,
    width: 14,
    height: 14,
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
    color: 'grey',
    colorHex: '#9CA3AF',
    print: 'plain',
    frays: false,
  })),
];

function escapeXml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapInstruction(text = '', maxChars = 105) {
  if (!text) return [];
  const words = text.trim().split(/\s+/);
  const lines = [];
  let currentLine = '';
  for (const word of words) {
    if (!currentLine) {
      currentLine = word;
    } else if ((currentLine + ' ' + word).length <= maxChars) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

/**
 * Builds the list of pattern pieces to render for a curved garment.
 * For sandy_skirt, returns exactly ONE gore labeled "CUT 16 GORES FROM SCRAPS" + the waistband.
 */
export function getCurvedGarmentPieceList(productId, sizeKey) {
  if (productId === 'sandy_skirt') {
    const data = SANDY_SKIRT_DATA[sizeKey] || SANDY_SKIRT_DATA.waist54;
    return [
      {
        id: 'skirt_gore',
        name: 'Skirt Wedge Gore',
        cutQtyLabel: 'CUT 16 GORES FROM SCRAPS',
        cutQty: 16,
        source: 'Fabric Scraps (Pieced from 3 patches)',
        cutWidthCm: data.pieces.skirt_gore_1.cutWidthCm || 9.4,
        cutHeightCm: data.pieces.skirt_gore_1.cutHeightCm || 27.4,
        finishedWidthCm: data.pieces.skirt_gore_1.widthCm || 8.5,
        finishedHeightCm: data.pieces.skirt_gore_1.heightCm || 25.8,
        netAreaCm2: data.pieces.skirt_gore_1.netAreaCm2 || 153.1,
        seamPath: data.pieces.skirt_gore_1.seamPath,
        saPath: data.pieces.skirt_gore_1.saPath,
        cutOnFold: false,
        grainLine: data.pieces.skirt_gore_1.grainLine || { orientation: 'vertical', symbol: '↕' },
        tilesCount: 1, // Fits on 1 A4 page
      },
      {
        id: 'waistband',
        name: 'Plain Waistband',
        cutQtyLabel: 'CUT 1 FROM PLAIN SOLID FABRIC',
        cutQty: 1,
        source: 'Solid Plain Fabric (Continuous yardage, never pieced)',
        cutWidthCm: data.pieces.waistband.cutWidthCm || 59.7,
        cutHeightCm: data.pieces.waistband.cutHeightCm || 7.0,
        finishedWidthCm: data.pieces.waistband.widthCm || 57.7,
        finishedHeightCm: data.pieces.waistband.heightCm || 5.0,
        netAreaCm2: data.pieces.waistband.netAreaCm2 || 288.4,
        seamPath: data.pieces.waistband.seamPath,
        saPath: data.pieces.waistband.saPath,
        cutOnFold: false,
        grainLine: data.pieces.waistband.grainLine || { orientation: 'horizontal', symbol: '↔' },
        tilesCount: 2, // Tiled across 2 pages
      },
    ];
  }

  if (productId === 'aaron_tank') {
    const data = AARON_TANK_DATA[sizeKey] || AARON_TANK_DATA.chest56;
    return [
      {
        id: 'bodice_front',
        name: 'Front Bodice',
        cutQtyLabel: 'CUT 1 ON FOLD FROM PLAIN SOLID KNIT FABRIC',
        cutQty: 1,
        source: 'Solid Plain Knit Fabric (Continuous yardage, 0 scraps)',
        cutWidthCm: data.pieces.bodice_front.fullCutWidthCm || (data.pieces.bodice_front.cutWidthCm ? data.pieces.bodice_front.cutWidthCm * 2 : 31.8),
        cutHeightCm: data.pieces.bodice_front.cutHeightCm || 37.8,
        finishedWidthCm: data.pieces.bodice_front.fullFinishedWidthCm || (data.pieces.bodice_front.widthCm ? data.pieces.bodice_front.widthCm * 2 : 29.8),
        finishedHeightCm: data.pieces.bodice_front.heightCm || 35.3,
        halfCutWidthCm: data.pieces.bodice_front.cutWidthCm || 15.9,
        netAreaCm2: data.pieces.bodice_front.netAreaCm2 || 818.6,
        seamPath: data.pieces.bodice_front.seamPath,
        saPath: data.pieces.bodice_front.saPath,
        cutOnFold: true,
        grainLine: data.pieces.bodice_front.grainLine || { orientation: 'vertical', symbol: '↕' },
        tilesCount: 2, // Top & Bottom tiles
      },
      {
        id: 'bodice_back',
        name: 'Back Bodice',
        cutQtyLabel: 'CUT 1 ON FOLD FROM PLAIN SOLID KNIT FABRIC',
        cutQty: 1,
        source: 'Solid Plain Knit Fabric (Continuous yardage, 0 scraps)',
        cutWidthCm: data.pieces.bodice_back.fullCutWidthCm || (data.pieces.bodice_back.cutWidthCm ? data.pieces.bodice_back.cutWidthCm * 2 : 31.8),
        cutHeightCm: data.pieces.bodice_back.cutHeightCm || 37.8,
        finishedWidthCm: data.pieces.bodice_back.fullFinishedWidthCm || (data.pieces.bodice_back.widthCm ? data.pieces.bodice_back.widthCm * 2 : 29.8),
        finishedHeightCm: data.pieces.bodice_back.heightCm || 35.3,
        halfCutWidthCm: data.pieces.bodice_back.cutWidthCm || 15.9,
        netAreaCm2: data.pieces.bodice_back.netAreaCm2 || 864.0,
        seamPath: data.pieces.bodice_back.seamPath,
        saPath: data.pieces.bodice_back.saPath,
        cutOnFold: true,
        grainLine: data.pieces.bodice_back.grainLine || { orientation: 'vertical', symbol: '↕' },
        tilesCount: 2, // Top & Bottom tiles
      },
      {
        id: 'arm_binding',
        name: 'Armhole Binding',
        cutQtyLabel: 'CUT 2 (MIRRORED PAIR) FROM FABRIC SCRAPS',
        cutQty: 2,
        source: 'Remnant Fabric Scraps (Trim strips)',
        cutWidthCm: data.pieces.arm_binding.cutWidthCm || 6.0,
        cutHeightCm: data.pieces.arm_binding.cutHeightCm || 31.7,
        finishedWidthCm: data.pieces.arm_binding.widthCm || 2.0,
        finishedHeightCm: data.pieces.arm_binding.heightCm || 29.7,
        netAreaCm2: data.pieces.arm_binding.netAreaCm2 || 190.2,
        seamPath: data.pieces.arm_binding.seamPath,
        saPath: data.pieces.arm_binding.saPath,
        cutOnFold: false,
        grainLine: data.pieces.arm_binding.grainLine || { orientation: 'vertical', symbol: '↕' },
        tilesCount: 1,
      },
      {
        id: 'neck_binding',
        name: 'Neckline Binding',
        cutQtyLabel: 'CUT 1 FROM FABRIC SCRAPS',
        cutQty: 1,
        source: 'Remnant Fabric Scraps (Trim strip)',
        cutWidthCm: data.pieces.neck_binding.cutWidthCm || 6.0,
        cutHeightCm: data.pieces.neck_binding.cutHeightCm || 34.7,
        finishedWidthCm: data.pieces.neck_binding.widthCm || 2.0,
        finishedHeightCm: data.pieces.neck_binding.heightCm || 32.7,
        netAreaCm2: data.pieces.neck_binding.netAreaCm2 || 208.1,
        seamPath: data.pieces.neck_binding.seamPath,
        saPath: data.pieces.neck_binding.saPath,
        cutOnFold: false,
        grainLine: data.pieces.neck_binding.grainLine || { orientation: 'vertical', symbol: '↕' },
        tilesCount: 1,
      },
    ];
  }

  if (productId === 'child_top') {
    const data = CHILD_TOP_BRIAN_DATA[sizeKey] || CHILD_TOP_BRIAN_DATA.chest56;
    return [
      {
        id: 'bodice_front',
        name: 'Front Bodice',
        cutQtyLabel: 'CUT 1 ON FOLD FROM PLAIN SOLID KNIT FABRIC',
        cutQty: 1,
        source: 'Solid Plain Knit Fabric (Continuous yardage, 0 scraps)',
        cutWidthCm: data.pieces.bodice_front.fullWidthCm ? data.pieces.bodice_front.fullWidthCm + 2 : 34.2,
        cutHeightCm: data.pieces.bodice_front.cutHeightCm || 34.5,
        finishedWidthCm: data.pieces.bodice_front.fullWidthCm || 32.2,
        finishedHeightCm: data.pieces.bodice_front.heightCm || 32.5,
        halfCutWidthCm: data.pieces.bodice_front.cutHalfWidthCm || 17.1,
        netAreaCm2: data.pieces.bodice_front.netAreaCm2 || 982.5,
        seamPath: data.pieces.bodice_front.seamPath,
        saPath: data.pieces.bodice_front.saPath,
        cutOnFold: true,
        grainLine: data.pieces.bodice_front.grainLine || { orientation: 'vertical', symbol: '↕' },
        tilesCount: 2, // Top & Bottom tiles
      },
      {
        id: 'bodice_back',
        name: 'Back Bodice',
        cutQtyLabel: 'CUT 1 ON FOLD FROM PLAIN SOLID KNIT FABRIC',
        cutQty: 1,
        source: 'Solid Plain Knit Fabric (Continuous yardage, 0 scraps)',
        cutWidthCm: data.pieces.bodice_back.fullWidthCm ? data.pieces.bodice_back.fullWidthCm + 2 : 34.2,
        cutHeightCm: data.pieces.bodice_back.cutHeightCm || 34.5,
        finishedWidthCm: data.pieces.bodice_back.fullWidthCm || 32.2,
        finishedHeightCm: data.pieces.bodice_back.heightCm || 32.5,
        halfCutWidthCm: data.pieces.bodice_back.cutHalfWidthCm || 17.1,
        netAreaCm2: data.pieces.bodice_back.netAreaCm2 || 1012.0,
        seamPath: data.pieces.bodice_back.seamPath,
        saPath: data.pieces.bodice_back.saPath,
        cutOnFold: true,
        grainLine: data.pieces.bodice_back.grainLine || { orientation: 'vertical', symbol: '↕' },
        tilesCount: 2, // Top & Bottom tiles
      },
      {
        id: 'sleeve',
        name: 'Patchwork Raglan Sleeve',
        cutQtyLabel: 'CUT 2 (MIRRORED PAIR) FROM FABRIC SCRAPS',
        cutQty: 2,
        source: 'Remnant Fabric Scraps (Pieced patchwork)',
        cutWidthCm: data.pieces.sleeve.cutWidthCm || 24.3,
        cutHeightCm: data.pieces.sleeve.cutHeightCm || 36.0,
        finishedWidthCm: data.pieces.sleeve.widthCm || 22.3,
        finishedHeightCm: data.pieces.sleeve.heightCm || 34.0,
        netAreaCm2: data.pieces.sleeve.netAreaCm2 || 585.5,
        seamPath: data.pieces.sleeve.seamPath,
        saPath: data.pieces.sleeve.saPath,
        cutOnFold: false,
        grainLine: data.pieces.sleeve.grainLine || { orientation: 'vertical', symbol: '↕' },
        tilesCount: 2,
      },
      {
        id: 'neckband',
        name: 'Ribbed Neckband',
        cutQtyLabel: 'CUT 1 FROM RIB KNIT FABRIC',
        cutQty: 1,
        source: 'Rib Knit Notion (Stretches to fit neckline)',
        cutWidthCm: 4.0,
        cutHeightCm: 28.0,
        finishedWidthCm: 2.0,
        finishedHeightCm: 26.0,
        netAreaCm2: 112.0,
        seamPath: 'M 0,0 L 40,0 L 40,260 L 0,260 Z',
        saPath: 'M 0,0 L 40,0 L 40,280 L 0,280 Z',
        cutOnFold: false,
        grainLine: { orientation: 'vertical', symbol: '↕' },
        tilesCount: 1,
      },
    ];
  }

  return [];
}

/**
 * Generates the vector SVG for a 10 cm x 10 cm print scale calibration test square.
 */
export function getCalibrationTestSquareSvg(x = 0, y = 0) {
  // 100 mm x 100 mm in points (283.465 pt)
  return `
    <g id="calibration-test-square" transform="translate(${x}, ${y})">
      <rect x="0" y="0" width="283.46" height="283.46" fill="#F8FAFC" stroke="#0F172A" stroke-width="2" />
      <line x1="0" y1="0" x2="283.46" y2="283.46" stroke="#CBD5E1" stroke-width="1" stroke-dasharray="4,4" />
      <line x1="283.46" y1="0" x2="0" y2="283.46" stroke="#CBD5E1" stroke-width="1" stroke-dasharray="4,4" />
      
      <!-- 1 cm tick marks around border -->
      ${Array.from({ length: 9 }, (_, i) => {
        const p = (i + 1) * 28.346;
        return `
          <line x1="${p}" y1="0" x2="${p}" y2="8" stroke="#0F172A" stroke-width="1.2" />
          <line x1="${p}" y1="275.46" x2="${p}" y2="283.46" stroke="#0F172A" stroke-width="1.2" />
          <line x1="0" y1="${p}" x2="8" y2="${p}" stroke="#0F172A" stroke-width="1.2" />
          <line x1="275.46" y1="${p}" x2="283.46" y2="${p}" stroke="#0F172A" stroke-width="1.2" />
          <text x="${p}" y="17" font-family="Helvetica, Arial, sans-serif" font-size="7" fill="#334155" text-anchor="middle" font-weight="bold">${i + 1}</text>
        `;
      }).join('')}

      <!-- Center text -->
      <rect x="42" y="105" width="200" height="74" fill="#FFFFFF" fill-opacity="0.95" stroke="#0F172A" stroke-width="1" rx="4" />
      <text x="142" y="125" font-family="Helvetica, Arial, sans-serif" font-size="11" font-weight="bold" fill="#0F172A" text-anchor="middle">10 cm × 10 cm TEST SQUARE</text>
      <text x="142" y="142" font-family="Helvetica, Arial, sans-serif" font-size="9" font-weight="bold" fill="#047857" text-anchor="middle">(4 in × 4 in Scale Check)</text>
      <text x="142" y="157" font-family="Helvetica, Arial, sans-serif" font-size="7.5" fill="#334155" text-anchor="middle">Measure with physical ruler after printing.</text>
      <text x="142" y="169" font-family="Helvetica, Arial, sans-serif" font-size="7" font-weight="bold" fill="#DC2626" text-anchor="middle">MUST MEASURE EXACTLY 10.0 cm (3.94 in)</text>
    </g>
  `;
}

/**
 * Generates faint blueprint grid lines for A4 page.
 */
export function getBlueprintGridSvg(widthPt = A4_WIDTH_PT, heightPt = A4_HEIGHT_PT, stepMm = 20) {
  const stepPt = stepMm * MM_TO_PT; // ~56.7 pt
  const cols = Math.ceil(widthPt / stepPt);
  const rows = Math.ceil(heightPt / stepPt);

  let gridLines = '';
  for (let c = 0; c <= cols; c++) {
    const x = Number((c * stepPt).toFixed(1));
    gridLines += `<line x1="${x}" y1="0" x2="${x}" y2="${heightPt}" stroke="#E0F2FE" stroke-width="0.75" />`;
  }
  for (let r = 0; r <= rows; r++) {
    const y = Number((r * stepPt).toFixed(1));
    gridLines += `<line x1="0" y1="${y}" x2="${widthPt}" y2="${y}" stroke="#E0F2FE" stroke-width="0.75" />`;
  }

  return `<g id="blueprint-grid" opacity="0.6">${gridLines}</g>`;
}

/**
 * Generates A4 tile alignment border with corner crosshairs and overlap markings.
 */
export function getTileAlignmentBorderSvg(tileLabel = 'Tile 1 of 2', overlapNote = '15 mm Overlap Margin') {
  const margin = 28.35; // 10 mm
  const w = A4_WIDTH_PT - 2 * margin;
  const h = A4_HEIGHT_PT - 2 * margin;

  return `
    <g id="tile-registration-border">
      <!-- Printable Margin Border -->
      <rect x="${margin}" y="${margin}" width="${w}" height="${h}" fill="none" stroke="#CBD5E1" stroke-width="1" stroke-dasharray="6,4" />
      
      <!-- Corner Crosshair Targets -->
      <!-- Top Left -->
      <line x1="${margin - 12}" y1="${margin}" x2="${margin + 12}" y2="${margin}" stroke="#0F172A" stroke-width="1.5" />
      <line x1="${margin}" y1="${margin - 12}" x2="${margin}" y2="${margin + 12}" stroke="#0F172A" stroke-width="1.5" />
      <circle cx="${margin}" cy="${margin}" r="3" fill="none" stroke="#0F172A" stroke-width="1" />

      <!-- Top Right -->
      <line x1="${margin + w - 12}" y1="${margin}" x2="${margin + w + 12}" y2="${margin}" stroke="#0F172A" stroke-width="1.5" />
      <line x1="${margin + w}" y1="${margin - 12}" x2="${margin + w}" y2="${margin + 12}" stroke="#0F172A" stroke-width="1.5" />
      <circle cx="${margin + w}" cy="${margin}" r="3" fill="none" stroke="#0F172A" stroke-width="1" />

      <!-- Bottom Left -->
      <line x1="${margin - 12}" y1="${margin + h}" x2="${margin + 12}" y2="${margin + h}" stroke="#0F172A" stroke-width="1.5" />
      <line x1="${margin}" y1="${margin + h - 12}" x2="${margin}" y2="${margin + h + 12}" stroke="#0F172A" stroke-width="1.5" />
      <circle cx="${margin}" cy="${margin + h}" r="3" fill="none" stroke="#0F172A" stroke-width="1" />

      <!-- Bottom Right -->
      <line x1="${margin + w - 12}" y1="${margin + h}" x2="${margin + w + 12}" y2="${margin + h}" stroke="#0F172A" stroke-width="1.5" />
      <line x1="${margin + w}" y1="${margin + h - 12}" x2="${margin + w}" y2="${margin + h + 12}" stroke="#0F172A" stroke-width="1.5" />
      <circle cx="${margin + w}" cy="${margin + h}" r="3" fill="none" stroke="#0F172A" stroke-width="1" />

      <!-- Tile Coordinate Badge -->
      <rect x="${margin + 16}" y="${margin + 8}" width="260" height="20" fill="#0F172A" rx="3" />
      <text x="${margin + 24}" y="${margin + 22}" font-family="Helvetica, Arial, sans-serif" font-size="8.5" font-weight="bold" fill="#FFFFFF">${escapeXml(tileLabel)}</text>
      <text x="${margin + w - 16}" y="${margin + 22}" font-family="Helvetica, Arial, sans-serif" font-size="7.5" fill="#64748B" text-anchor="end">${escapeXml(overlapNote)}</text>
    </g>
  `;
}

/**
 * Renders a clean 2D vector preview of the finished garment/product for Page 1 of the PDF.
 * Uses computeProduct2DLayout so it precisely reflects actual scrap placements, colors, and seams.
 * 
 * @param {Object} design - Design object returned from buildDesign()
 * @param {number} [targetW=150] - Preview SVG target width in points
 * @param {number} [targetH=108] - Preview SVG target height in points
 * @returns {string} Standalone SVG preview element
 */
export function renderDesignPreviewSvg(design, targetW = 150, targetH = 108) {
  if (!design || !design.productId) return '';
  const layout = computeProduct2DLayout(design, 'front');
  if (!layout) return '';

  let vbX = 0, vbY = 0, vbW = 100, vbH = 100;
  if (typeof layout.viewBox === 'string') {
    const parts = layout.viewBox.trim().split(/\s+/).map(Number);
    if (parts.length === 4) [vbX, vbY, vbW, vbH] = parts;
  } else if (layout.viewBox) {
    vbX = layout.viewBox.x || 0;
    vbY = layout.viewBox.y || 0;
    vbW = layout.viewBox.width || 100;
    vbH = layout.viewBox.height || 100;
  }

  let decoSvg = '';
  for (const deco of layout.decorations || []) {
    if (deco.d) {
      decoSvg += `<path d="${deco.d}" stroke="${deco.stroke || '#94A3B8'}" stroke-width="${deco.strokeWidth || 1}" fill="${deco.fill || 'none'}" stroke-linecap="round" />`;
    } else if (deco.x !== undefined && deco.y !== undefined) {
      decoSvg += `<rect x="${deco.x}" y="${deco.y}" width="${deco.width || 4}" height="${deco.height || 4}" rx="${deco.rx || 1}" fill="${deco.fill || '#CBD5E1'}" stroke="${deco.stroke || '#94A3B8'}" stroke-width="${deco.strokeWidth || 0.6}" />`;
    }
  }

  let panelsSvg = '';
  if (layout.isCurvedGarment) {
    const bodice = (layout.panels || []).find((p) => p.role === 'base') || layout.panels?.[0];
    const leftSleeve = (layout.panels || []).find((p) => p.id === 'sleeve_1');
    const rightSleeve = (layout.panels || []).find((p) => p.id === 'sleeve_2');

    if (bodice) {
      for (const p of bodice.patches || []) {
        panelsSvg += `<rect x="${p.relX}" y="${p.relY}" width="${p.width}" height="${p.height}" fill="${p.colorHex || '#1E3A8A'}" />`;
      }
      if (bodice.seamPath) {
        panelsSvg += `<path d="${bodice.seamPath}" fill="none" stroke="#0F172A" stroke-width="2" />`;
        panelsSvg += `<path d="${bodice.seamPath}" transform="scale(-1, 1)" fill="none" stroke="#0F172A" stroke-width="2" />`;
      }
    }
    if (leftSleeve) {
      for (const p of leftSleeve.patches || []) {
        panelsSvg += `<rect x="${p.relX}" y="${p.relY}" width="${p.width}" height="${p.height}" fill="${p.colorHex || '#1E3A8A'}" />`;
      }
      if (leftSleeve.seamPath) {
        panelsSvg += `<path d="${leftSleeve.seamPath}" fill="none" stroke="#0F172A" stroke-width="2" />`;
      }
    }
    if (rightSleeve) {
      for (const p of rightSleeve.patches || []) {
        panelsSvg += `<rect x="${p.relX}" y="${p.relY}" width="${p.width}" height="${p.height}" fill="${p.colorHex || '#1E3A8A'}" />`;
      }
      if (rightSleeve.seamPath) {
        panelsSvg += `<path d="${rightSleeve.seamPath}" transform="scale(-1, 1)" fill="none" stroke="#0F172A" stroke-width="2" />`;
      }
    }
  } else {
    for (const panel of layout.panels || []) {
      const px = panel.canvasX !== undefined ? panel.canvasX : (panel.x || 0);
      const py = panel.canvasY !== undefined ? panel.canvasY : (panel.y || 0);
      const pw = panel.width || 0;
      const ph = panel.height || 0;
      const rx = panel.rx || 0;

      if (panel.pathD) {
        panelsSvg += `<path d="${panel.pathD}" fill="${panel.colorHex || '#1E3A8A'}" stroke="#334155" stroke-width="0.5" />`;
      } else if (panel.patches && panel.patches.length > 0) {
        for (const pt of panel.patches) {
          const ptX = pt.canvasX !== undefined ? pt.canvasX : (px + (pt.relX || 0));
          const ptY = pt.canvasY !== undefined ? pt.canvasY : (py + (pt.relY || 0));
          panelsSvg += `<rect x="${ptX}" y="${ptY}" width="${pt.width}" height="${pt.height}" fill="${pt.colorHex || '#1E3A8A'}" stroke="#334155" stroke-width="0.3" stroke-opacity="0.4" />`;
        }
      } else {
        panelsSvg += `<rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="${rx}" fill="${panel.colorHex || '#1E3A8A'}" stroke="#334155" stroke-width="0.5" />`;
      }

      for (const s of panel.seams || []) {
        const sx1 = s.canvasX1 !== undefined ? s.canvasX1 : (px + (s.x1 || 0));
        const sy1 = s.canvasY1 !== undefined ? s.canvasY1 : (py + (s.y1 || 0));
        const sx2 = s.canvasX2 !== undefined ? s.canvasX2 : (px + (s.x2 || 0));
        const sy2 = s.canvasY2 !== undefined ? s.canvasY2 : (py + (s.y2 || 0));
        panelsSvg += `<line x1="${sx1}" y1="${sy1}" x2="${sx2}" y2="${sy2}" stroke="#FFFFFF" stroke-width="0.6" stroke-dasharray="1.5,1.5" stroke-opacity="0.8" />`;
      }

      if (panel.canvasClipPathD) {
        panelsSvg += `<path d="${panel.canvasClipPathD}" fill="none" stroke="#475569" stroke-width="0.8" />`;
      } else if (panel.pathD) {
        panelsSvg += `<path d="${panel.pathD}" fill="none" stroke="#475569" stroke-width="0.8" />`;
      } else if (pw > 0 && ph > 0) {
        panelsSvg += `<rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="${rx}" fill="none" stroke="#475569" stroke-width="0.8" />`;
      }
    }
  }

  return `<svg viewBox="${vbX} ${vbY} ${vbW} ${vbH}" width="${targetW}" height="${targetH}" preserveAspectRatio="xMidYMid meet">${decoSvg}${panelsSvg}</svg>`;
}

/**
 * Builds the complete standalone SVG string for Page 1 (Assembly & Overview).
 * Embeds the 2D design preview picture in a dedicated preview panel.
 */
export function buildAssemblyPageSvg(blueprint, measurementTable, design = null) {
  const steps = blueprint.stitchingSteps || [];
  const mats = blueprint.materials || [];
  const previewSvg = renderDesignPreviewSvg(design, 150, 106);

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${A4_WIDTH_PT} ${A4_HEIGHT_PT}" width="${A4_WIDTH_PT}" height="${A4_HEIGHT_PT}">
  <rect width="${A4_WIDTH_PT}" height="${A4_HEIGHT_PT}" fill="#FFFFFF" />
  
  <!-- Header Banner -->
  <rect x="30" y="22" width="${A4_WIDTH_PT - 60}" height="40" fill="#064E3B" rx="4" />
  <text x="45" y="42" font-family="Helvetica, Arial, sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">REWEAR TAILOR BLUEPRINT: ${escapeXml(blueprint.productName.toUpperCase())}</text>
  ${blueprint.designScore === 0
    ? `<text x="45" y="54" font-family="Helvetica, Arial, sans-serif" font-size="8" fill="#FECACA" font-weight="bold">Size: ${escapeXml(blueprint.sizeLabel)}  •  Not enough scraps: needs ${blueprint.neededMoreScraps || 18} more</text>`
    : `<text x="45" y="54" font-family="Helvetica, Arial, sans-serif" font-size="8" fill="#A7F3D0">Size: ${escapeXml(blueprint.sizeLabel)}  •  Estimated Sewing Time: ${blueprint.estimatedTimeMinutes} mins (typical default)  •  Design Score: ${blueprint.designScore}/100</text>`
  }
  
  <!-- Attribution Banner -->
  <rect x="30" y="66" width="${A4_WIDTH_PT - 60}" height="17" fill="#F0FDF4" stroke="#86EFAC" stroke-width="1" rx="2" />
  <text x="40" y="78" font-family="Helvetica, Arial, sans-serif" font-size="7.5" font-weight="bold" fill="#166534">Pattern geometry by FreeSewing 4.10.2 (MIT licence)</text>
  <text x="${A4_WIDTH_PT - 40}" y="78" font-family="Helvetica, Arial, sans-serif" font-size="7" fill="#15803D" text-anchor="end">Engineered for Remnant Upcycling</text>

  <!-- Tailor Disclaimer Banner -->
  <rect x="30" y="87" width="${A4_WIDTH_PT - 60}" height="19" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1" rx="2" />
  <text x="40" y="100" font-family="Helvetica, Arial, sans-serif" font-size="8" font-weight="bold" fill="#92400E">⚠ MEASUREMENTS TO BE VERIFIED BY A TAILOR</text>
  <text x="${A4_WIDTH_PT - 40}" y="100" font-family="Helvetica, Arial, sans-serif" font-size="7" fill="#B45309" text-anchor="end">Verify physical fabric stretch and grain orientation before final cutting</text>

  <!-- Section 1: Yardage Requirements (Left) & Design Preview Picture (Right) -->
  <g id="overview-upper-section" transform="translate(30, 110)">
    <!-- Left Card: Fabric Requirements -->
    <rect x="0" y="0" width="365" height="130" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1" rx="3" />
    <rect x="0" y="0" width="365" height="18" fill="#0F172A" rx="3 3 0 0" />
    <text x="12" y="12" font-family="Helvetica, Arial, sans-serif" font-size="8" font-weight="bold" fill="#FFFFFF">FABRIC YARDAGE &amp; REMNANT REQUIREMENTS</text>
    <text x="12" y="32" font-family="Helvetica, Arial, sans-serif" font-size="7.5" fill="#334155"><tspan font-weight="bold">Plain Fabric Yardage Needed:</tspan> ${escapeXml(blueprint.plainFabricYardage)}</text>
    <text x="12" y="47" font-family="Helvetica, Arial, sans-serif" font-size="7.5" fill="#334155"><tspan font-weight="bold">Standard Seam Allowance:</tspan> 1.0 cm (0.4 in) throughout</text>
    <text x="12" y="62" font-family="Helvetica, Arial, sans-serif" font-size="7.5" fill="#334155"><tspan font-weight="bold">Scrap Sourcing:</tspan> Upcycled fabric remnants from scrap pile</text>
    <text x="12" y="77" font-family="Helvetica, Arial, sans-serif" font-size="7.5" fill="#334155"><tspan font-weight="bold">Garment Type:</tspan> ${escapeXml(blueprint.productName)} (Size: ${escapeXml(blueprint.sizeLabel)})</text>
    <text x="12" y="92" font-family="Helvetica, Arial, sans-serif" font-size="7.5" fill="#334155"><tspan font-weight="bold">Estimated Sewing Time:</tspan> ${blueprint.estimatedTimeMinutes} mins (typical default)</text>
    <text x="12" y="107" font-family="Helvetica, Arial, sans-serif" font-size="7.5" fill="#334155"><tspan font-weight="bold">Quality &amp; Color Match Score:</tspan> ${blueprint.designScore} / 100</text>
    <text x="12" y="121" font-family="Helvetica, Arial, sans-serif" font-size="6.5" fill="#64748B" font-style="italic">All pieces include grainline markers and 10 mm seam margins.</text>

    <!-- Right Card: Finished Design Preview Picture -->
    <g transform="translate(375, 0)">
      <rect x="0" y="0" width="160" height="130" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1" rx="3" />
      <rect x="0" y="0" width="160" height="18" fill="#064E3B" rx="3 3 0 0" />
      <text x="80" y="12" font-family="Helvetica, Arial, sans-serif" font-size="8" font-weight="bold" fill="#FFFFFF" text-anchor="middle">DESIGN PREVIEW</text>
      <g transform="translate(5, 20)">
        ${previewSvg}
      </g>
    </g>
  </g>

  <!-- Section 2: Measurement Table -->
  <text x="30" y="254" font-family="Helvetica, Arial, sans-serif" font-size="8.5" font-weight="bold" fill="#064E3B">1. GARMENT MEASUREMENT TABLE (FINISHED SPECIFICATIONS)</text>
  <rect x="30" y="260" width="${A4_WIDTH_PT - 60}" height="${18 + measurementTable.length * 15}" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" rx="2" />
  <rect x="30" y="260" width="${A4_WIDTH_PT - 60}" height="16" fill="#E2E8F0" />
  <text x="40" y="271" font-family="Helvetica, Arial, sans-serif" font-size="7" font-weight="bold" fill="#1E293B">MEASUREMENT NAME</text>
  <text x="230" y="271" font-family="Helvetica, Arial, sans-serif" font-size="7" font-weight="bold" fill="#1E293B">METRIC (cm)</text>
  <text x="310" y="271" font-family="Helvetica, Arial, sans-serif" font-size="7" font-weight="bold" fill="#1E293B">IMPERIAL (in)</text>
  <text x="390" y="271" font-family="Helvetica, Arial, sans-serif" font-size="7" font-weight="bold" fill="#1E293B">VERIFICATION STATUS</text>
  
  ${measurementTable.map((row, idx) => {
    const ry = 276 + idx * 15;
    const bg = idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC';
    return `
      <rect x="30" y="${ry}" width="${A4_WIDTH_PT - 60}" height="15" fill="${bg}" />
      <text x="40" y="${ry + 10}" font-family="Helvetica, Arial, sans-serif" font-size="7" fill="#0F172A" font-weight="bold">${escapeXml(row.name)}</text>
      <text x="230" y="${ry + 10}" font-family="Helvetica, Arial, sans-serif" font-size="7" fill="#0F172A">${escapeXml(row.cm)}</text>
      <text x="310" y="${ry + 10}" font-family="Helvetica, Arial, sans-serif" font-size="7" fill="#64748B">${escapeXml(row.inches)}</text>
      <text x="390" y="${ry + 10}" font-family="Helvetica, Arial, sans-serif" font-size="7" fill="#B45309" font-style="italic">${escapeXml(row.note)}</text>
    `;
  }).join('')}

  <!-- Section 3: Materials & Notions Checklist -->
  ${(() => {
    const matStartY = 282 + measurementTable.length * 15;
    return `
      <text x="30" y="${matStartY + 12}" font-family="Helvetica, Arial, sans-serif" font-size="8.5" font-weight="bold" fill="#064E3B">2. MATERIALS &amp; NOTIONS CHECKLIST (${TYPICAL_DEFAULTS_DISCLAIMER})</text>
      <g transform="translate(30, ${matStartY + 16})">
        ${mats.slice(0, 4).map((m, idx) => `
          <rect x="0" y="${idx * 17}" width="${A4_WIDTH_PT - 60}" height="15" fill="#F1F5F9" stroke="#E2E8F0" stroke-width="1" rx="2" />
          <text x="10" y="${idx * 17 + 10}" font-family="Helvetica, Arial, sans-serif" font-size="7" font-weight="bold" fill="#0F172A">${escapeXml(m.name)}</text>
          <text x="260" y="${idx * 17 + 10}" font-family="Helvetica, Arial, sans-serif" font-size="7" fill="#475569">${escapeXml(m.qty)}</text>
          <text x="${A4_WIDTH_PT - 80}" y="${idx * 17 + 10}" font-family="Helvetica, Arial, sans-serif" font-size="6.5" fill="#64748B" text-anchor="end">${escapeXml(m.disclaimer || TYPICAL_DEFAULTS_DISCLAIMER)}</text>
        `).join('')}
      </g>
    `;
  })()}

  <!-- Section 4: Assembly Stitching Steps Overview -->
  ${(() => {
    const stepsStartY = 302 + measurementTable.length * 15 + Math.min(mats.length, 4) * 17;
    let currentStepY = 0;
    const stepBoxes = steps.map((s) => {
      const lines = wrapInstruction(s.instruction, 105);
      const lineHeight = 8;
      const boxHeight = Math.max(30, 15 + lines.length * lineHeight + 4);
      const y = currentStepY;
      currentStepY += boxHeight + 3;
      return `
        <rect x="0" y="${y}" width="${A4_WIDTH_PT - 60}" height="${boxHeight}" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" rx="2" />
        <rect x="6" y="${y + 5}" width="18" height="18" fill="#059669" rx="2" />
        <text x="15" y="${y + 17}" font-family="Helvetica, Arial, sans-serif" font-size="8" font-weight="bold" fill="#FFFFFF" text-anchor="middle">${s.stepNumber}</text>
        <text x="32" y="${y + 11}" font-family="Helvetica, Arial, sans-serif" font-size="7.5" font-weight="bold" fill="#0F172A">${escapeXml(s.title)}</text>
        ${lines.map((ln, lIdx) => `<text x="32" y="${y + 20 + lIdx * lineHeight}" font-family="Helvetica, Arial, sans-serif" font-size="6.5" fill="#475569">${escapeXml(ln)}</text>`).join('')}
      `;
    }).join('');

    return `
      <text x="30" y="${stepsStartY + 12}" font-family="Helvetica, Arial, sans-serif" font-size="8.5" font-weight="bold" fill="#064E3B">3. PRODUCT ASSEMBLY STEPS (IN TAILOR ORDER)</text>
      <g transform="translate(30, ${stepsStartY + 16})">
        ${stepBoxes}
      </g>
    `;
  })()}

  <!-- 10 cm Test Calibration Square (Bottom Right of Page 1) -->
  <g transform="translate(${A4_WIDTH_PT - 180}, ${A4_HEIGHT_PT - 180}) scale(0.5)">
    ${getCalibrationTestSquareSvg(0, 0)}
  </g>

  <!-- Scale Verification Instructions (Bottom Left) -->
  <g transform="translate(35, ${A4_HEIGHT_PT - 110})">
    <text x="0" y="0" font-family="Helvetica, Arial, sans-serif" font-size="7.5" font-weight="bold" fill="#0F172A">PRINT SCALE VERIFICATION INSTRUCTIONS:</text>
    <text x="0" y="12" font-family="Helvetica, Arial, sans-serif" font-size="6.5" fill="#334155">1. Open this PDF in Adobe Acrobat or browser print dialog.</text>
    <text x="0" y="23" font-family="Helvetica, Arial, sans-serif" font-size="6.5" fill="#334155">2. Set Page Scaling to "100%" or "Actual Size" (NEVER "Fit to Page" or "Shrink").</text>
    <text x="0" y="34" font-family="Helvetica, Arial, sans-serif" font-size="6.5" fill="#334155">3. Measure the test square with a ruler: must measure exactly 10.0 cm / 3.94 in.</text>
    <text x="0" y="45" font-family="Helvetica, Arial, sans-serif" font-size="6.5" fill="#334155">4. Tile pattern pages along dashed alignment lines and tape securely together.</text>
  </g>

  <!-- Footer -->
  <text x="${A4_WIDTH_PT / 2}" y="${A4_HEIGHT_PT - 18}" font-family="Helvetica, Arial, sans-serif" font-size="7.5" fill="#64748B" text-anchor="middle" font-weight="bold">
    Pattern geometry by FreeSewing 4.10.2 (MIT licence)   •   Measurements to be verified by a tailor   •   Page 1 of Overview
  </text>
</svg>
`.trim();
}

/**
 * Builds the vector SVG for a real-scale pattern piece page on A4.
 * Coordinates are normalized to path bounding box so NO piece is clipped,
 * and label cards are positioned strictly outside pattern contours.
 */
export function buildPatternPiecePageSvg(piece, options = {}) {
  const {
    pageIndex = 2,
    totalPages = 4,
    tileIndex = 1,
    totalTiles = 1,
    tileLabel = 'Pattern Piece',
    yOffsetMm = 0,
    xOffsetMm = 0,
    garmentName = 'Garment',
  } = options;

  const cutW_cm = piece.cutWidthCm;
  const cutH_cm = piece.cutHeightCm;
  const finW_cm = piece.finishedWidthCm;
  const finH_cm = piece.finishedHeightCm;
  const sourceText = piece.source || 'Scraps';
  const cutQtyText = piece.cutQtyLabel || `Cut ${piece.cutQty || 1}`;

  const pathBounds = getPathBoundingBox(piece.saPath || piece.seamPath);
  const minX = pathBounds.minX;
  const minY = pathBounds.minY;
  const widthMm = pathBounds.widthMm;
  const heightMm = pathBounds.heightMm;

  let originX, originY, labelX, labelY;

  if (piece.id === 'skirt_gore') {
    // Skirt gore: width ~94 mm (267 pt), height ~274 mm (776 pt)
    // Place gore on right side so it is fully bounded with generous margin
    originX = 295;
    originY = 28;
    // Place label card on left side where it NEVER overlaps the piece
    labelX = 40;
    labelY = 50;
  } else if (piece.id === 'waistband') {
    // Waistband: height ~70 mm (198 pt), tiled horizontally
    originX = 50 - xOffsetMm * MM_TO_PT;
    originY = 300;
    labelX = 40;
    labelY = 50;
  } else if (totalTiles > 1 && yOffsetMm > 0 && xOffsetMm > 0) {
    // 2x2 grid bottom-right tile
    originX = 50 - xOffsetMm * MM_TO_PT;
    originY = 55 - yOffsetMm * MM_TO_PT;
    labelX = 40;
    labelY = 705;
  } else if (totalTiles > 1 && xOffsetMm > 0) {
    // Horizontal tile (right half)
    originX = 50 - xOffsetMm * MM_TO_PT;
    originY = 160;
    labelX = 40;
    labelY = 40;
  } else if (totalTiles > 1 && yOffsetMm > 0) {
    // Bottom tile of vertically tiled piece (Bodice or Sleeve)
    originX = Math.max(40, (A4_WIDTH_PT - widthMm * MM_TO_PT) / 2);
    originY = 55 - yOffsetMm * MM_TO_PT;
    labelX = 40;
    labelY = 705; // Placed at bottom below piece hem
  } else {
    // Top tile of vertically tiled piece or single piece
    originX = Math.max(40, (A4_WIDTH_PT - widthMm * MM_TO_PT) / 2);
    originY = 160;
    labelX = 40;
    labelY = 40; // Placed above pattern piece
  }

  // Grainline arrow coordinates centered on piece contour
  const grainArrowX = originX + (widthMm * 0.5) * MM_TO_PT;
  const grainArrowY1 = originY + Math.max(10, (heightMm * 0.2) * MM_TO_PT);
  const grainArrowY2 = originY + Math.min(heightMm * MM_TO_PT - 10, (heightMm * 0.8) * MM_TO_PT);
  const showGrainArrow = (grainArrowY2 - grainArrowY1) >= 12;
  const showGrainBadge = (grainArrowY2 - grainArrowY1) >= 28;

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${A4_WIDTH_PT} ${A4_HEIGHT_PT}" width="${A4_WIDTH_PT}" height="${A4_HEIGHT_PT}">
  <defs>
    <!-- Arrowhead markers -->
    <marker id="grain-arrow-start-${pageIndex}" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1E3A8A" />
    </marker>
    <marker id="grain-arrow-end-${pageIndex}" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1E3A8A" />
    </marker>
  </defs>

  <rect width="${A4_WIDTH_PT}" height="${A4_HEIGHT_PT}" fill="#FFFFFF" />

  <!-- 1. Faint Blueprint Grid Background -->
  ${getBlueprintGridSvg(A4_WIDTH_PT, A4_HEIGHT_PT, 20)}

  <!-- 2. A4 Registration & Overlap Border -->
  ${getTileAlignmentBorderSvg(
    `${escapeXml(garmentName)} • ${escapeXml(piece.name.toUpperCase())} (${totalTiles > 1 ? `Tile ${tileIndex}/${totalTiles}` : 'Complete Piece'})`,
    totalTiles > 1 ? `15 mm Overlap Margin — Align with Tile ${tileIndex === 1 ? 2 : 1}` : 'Single A4 Pattern Page'
  )}

  <!-- 3. Real-Scale Pattern Piece Drawing (1:1 Scale, Zero Clipping via MinX/MinY Normalization) -->
  <g id="real-scale-pattern-piece" transform="translate(${originX}, ${originY}) scale(${MM_TO_PT}) translate(${-minX}, ${-minY})">
    <!-- Seam Allowance Outer Cut Line (Solid) -->
    ${piece.saPath ? `<path d="${piece.saPath}" fill="#F0FDF4" stroke="#0F172A" stroke-width="1.2" stroke-linejoin="round" />` : ''}

    <!-- Seam Stitch Line (Dashed) -->
    <path d="${piece.seamPath}" fill="${piece.saPath ? '#ECFDF5' : '#F0FDF4'}" stroke="#2563EB" stroke-width="0.8" stroke-dasharray="3,2" stroke-linejoin="round" />

    <!-- Notches / Match Ticks along edges -->
    <line x1="${minX}" y1="${minY + heightMm * 0.3}" x2="${minX + 6}" y2="${minY + heightMm * 0.3}" stroke="#DC2626" stroke-width="1.2" />
    <line x1="${minX + widthMm - 6}" y1="${minY + heightMm * 0.3}" x2="${minX + widthMm}" y2="${minY + heightMm * 0.3}" stroke="#DC2626" stroke-width="1.2" />
  </g>

  <!-- 4. Grainline Vector Arrow Sitting Directly on Piece -->
  ${piece.grainLine && showGrainArrow ? `
  <g id="grainline-arrow">
    <line
      x1="${grainArrowX}"
      y1="${grainArrowY1}"
      x2="${grainArrowX}"
      y2="${grainArrowY2}"
      stroke="#1E3A8A"
      stroke-width="1.8"
      marker-start="url(#grain-arrow-start-${pageIndex})"
      marker-end="url(#grain-arrow-end-${pageIndex})"
    />
    ${showGrainBadge ? `
    <rect x="${grainArrowX - 42}" y="${(grainArrowY1 + grainArrowY2) / 2 - 8}" width="84" height="16" fill="#FFFFFF" fill-opacity="0.95" stroke="#1E3A8A" stroke-width="1" rx="3" />
    <text x="${grainArrowX}" y="${(grainArrowY1 + grainArrowY2) / 2 + 3}" font-family="Helvetica, Arial, sans-serif" font-size="7" font-weight="bold" fill="#1E3A8A" text-anchor="middle">GRAINLINE / WARP ↕</text>
    ` : ''}
  </g>
  ` : ''}

  <!-- 5. Piece Metadata & Sourcing Box (Strictly Non-Overlapping) -->
  <g id="piece-metadata-card" transform="translate(${labelX}, ${labelY})">
    <rect x="0" y="0" width="235" height="92" fill="#FFFFFF" fill-opacity="0.98" stroke="#0F172A" stroke-width="1.2" rx="4" />
    <rect x="0" y="0" width="235" height="18" fill="#0F172A" rx="4 4 0 0" />
    <text x="10" y="13" font-family="Helvetica, Arial, sans-serif" font-size="9" font-weight="bold" fill="#FFFFFF">${escapeXml(piece.name.toUpperCase())}</text>
    
    <text x="10" y="32" font-family="Helvetica, Arial, sans-serif" font-size="8.5" font-weight="bold" fill="#047857">${escapeXml(cutQtyText)}</text>
    <text x="10" y="45" font-family="Helvetica, Arial, sans-serif" font-size="7.5" fill="#334155"><tspan font-weight="bold">Fabric Source:</tspan> ${escapeXml(sourceText)}</text>
    <text x="10" y="58" font-family="Helvetica, Arial, sans-serif" font-size="7.5" fill="#334155"><tspan font-weight="bold">Cut Dimensions:</tspan> ${cutW_cm} × ${cutH_cm} cm (${cmToInch(cutW_cm, 1)} × ${cmToInch(cutH_cm, 1)} in)</text>
    <text x="10" y="71" font-family="Helvetica, Arial, sans-serif" font-size="7.5" fill="#334155"><tspan font-weight="bold">Finished Size:</tspan> ${finW_cm} × ${finH_cm} cm (${cmToInch(finW_cm, 1)} × ${cmToInch(finH_cm, 1)} in)</text>
    <text x="10" y="83" font-family="Helvetica, Arial, sans-serif" font-size="7" fill="#2563EB" font-weight="bold">Seam allowance: 1.0 cm (0.4 in) included</text>
  </g>

  <!-- 6. Fold Line Marking (if cut on fold) -->
  ${piece.cutOnFold ? `
    <g id="fold-line-marking" transform="translate(${originX - 10}, ${originY + 40})">
      <rect x="-4" y="0" width="16" height="${(heightMm * 0.7) * MM_TO_PT}" fill="#FEF3C7" fill-opacity="0.5" />
      <line x1="0" y1="0" x2="0" y2="${(heightMm * 0.7) * MM_TO_PT}" stroke="#D97706" stroke-width="1.5" stroke-dasharray="6,4" />
      <text x="-4" y="${(heightMm * 0.35) * MM_TO_PT}" font-family="Helvetica, Arial, sans-serif" font-size="7.5" font-weight="bold" fill="#B45309" transform="rotate(-90 -4 ${(heightMm * 0.35) * MM_TO_PT})" text-anchor="middle">FOLD LINE — PLACE ON FABRIC FOLD</text>
    </g>
  ` : ''}

  <!-- Footer (Pattern pages: Test square omitted to prevent covering piece; located on Page 1) -->
  <text x="${A4_WIDTH_PT / 2}" y="${A4_HEIGHT_PT - 20}" font-family="Helvetica, Arial, sans-serif" font-size="7.5" fill="#64748B" text-anchor="middle" font-weight="bold">
    Pattern geometry by FreeSewing 4.10.2 (MIT licence)   •   Measurements to be verified by a tailor   •   Page ${pageIndex} of ${totalPages}
  </text>
</svg>
  `.trim();
}

/**
 * Builds the vector SVG for a 2-segment tiled binding strip page on A4.
 * Both segments fit side-by-side on A4 with 15 mm overlap marks, eliminating page clipping.
 */
export function buildTiledBindingPageSvg(piece, options = {}) {
  const {
    pageIndex = 6,
    totalPages = 7,
    garmentName = 'Tank Top',
  } = options;

  const cutW_cm = piece.cutWidthCm;
  const cutH_cm = piece.cutHeightCm;
  const finW_cm = piece.finishedWidthCm;
  const finH_cm = piece.finishedHeightCm;
  const sourceText = piece.source || 'Scraps';
  const cutQtyText = piece.cutQtyLabel || `Cut ${piece.cutQty || 1}`;

  const totalLengthMm = cutH_cm * 10;
  const halfLengthMm = Math.ceil(totalLengthMm / 2);
  const overlapMm = 15;
  const seg1HeightMm = halfLengthMm + overlapMm;
  const seg2HeightMm = totalLengthMm - halfLengthMm + overlapMm;

  const seg1HeightPt = seg1HeightMm * MM_TO_PT;
  const seg2HeightPt = seg2HeightMm * MM_TO_PT;
  const stripWidthPt = cutW_cm * 10 * MM_TO_PT; // ~170 pt

  const originY = 175;
  const col1X = 65;
  const col2X = 310;

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${A4_WIDTH_PT} ${A4_HEIGHT_PT}" width="${A4_WIDTH_PT}" height="${A4_HEIGHT_PT}">
  <rect width="${A4_WIDTH_PT}" height="${A4_HEIGHT_PT}" fill="#FFFFFF" />

  <!-- 1. Blueprint Grid Background -->
  ${getBlueprintGridSvg(A4_WIDTH_PT, A4_HEIGHT_PT, 20)}

  <!-- 2. Registration Border -->
  ${getTileAlignmentBorderSvg(
    `${escapeXml(garmentName)} • ${escapeXml(piece.name.toUpperCase())} (2-Segment Tiled Pattern)`,
    '15 mm Overlap Margin — Align Segment 1 with Segment 2'
  )}

  <!-- 3. Piece Metadata Card (Top Margin) -->
  <g id="piece-metadata-card" transform="translate(45, 45)">
    <rect x="0" y="0" width="450" height="92" fill="#FFFFFF" fill-opacity="0.98" stroke="#0F172A" stroke-width="1.2" rx="4" />
    <rect x="0" y="0" width="450" height="18" fill="#0F172A" rx="4 4 0 0" />
    <text x="12" y="13" font-family="Helvetica, Arial, sans-serif" font-size="9" font-weight="bold" fill="#FFFFFF">${escapeXml(piece.name.toUpperCase())} — 2-SEGMENT TILED PATTERN</text>
    
    <text x="12" y="32" font-family="Helvetica, Arial, sans-serif" font-size="8.5" font-weight="bold" fill="#047857">${escapeXml(cutQtyText)}</text>
    <text x="12" y="45" font-family="Helvetica, Arial, sans-serif" font-size="7.5" fill="#334155"><tspan font-weight="bold">Fabric Source:</tspan> ${escapeXml(sourceText)}</text>
    <text x="12" y="58" font-family="Helvetica, Arial, sans-serif" font-size="7.5" fill="#334155"><tspan font-weight="bold">Cut Dimensions:</tspan> ${cutW_cm} × ${cutH_cm} cm (${cmToInch(cutW_cm, 1)} × ${cmToInch(cutH_cm, 1)} in)</text>
    <text x="12" y="71" font-family="Helvetica, Arial, sans-serif" font-size="7.5" fill="#334155"><tspan font-weight="bold">Assembly:</tspan> Cut Segment 1 and Segment 2, overlap 15 mm at dashed line, tape to form ${cutH_cm} cm continuous strip.</text>
    <text x="12" y="83" font-family="Helvetica, Arial, sans-serif" font-size="7" fill="#2563EB" font-weight="bold">Seam allowance: 1.0 cm included  •  Piece width: 6.0 cm (folds to 2.0 cm finished)</text>
  </g>

  <!-- Segment 1 (Upper Half) -->
  <g transform="translate(${col1X}, ${originY})">
    <rect x="0" y="0" width="${stripWidthPt}" height="${seg1HeightPt}" fill="#F0FDF4" stroke="#0F172A" stroke-width="1.2" />
    <rect x="0" y="${seg1HeightPt - overlapMm * MM_TO_PT}" width="${stripWidthPt}" height="${overlapMm * MM_TO_PT}" fill="#FEF3C7" stroke="#D97706" stroke-width="1" stroke-dasharray="4,2" />
    <text x="${stripWidthPt / 2}" y="22" font-family="Helvetica, Arial, sans-serif" font-size="8.5" font-weight="bold" fill="#0F172A" text-anchor="middle">SEGMENT 1 (TOP)</text>
    <text x="${stripWidthPt / 2}" y="${seg1HeightPt - 5}" font-family="Helvetica, Arial, sans-serif" font-size="7" font-weight="bold" fill="#B45309" text-anchor="middle">15 mm OVERLAP MARGIN ↕</text>
    <!-- Grainline arrow -->
    <line x1="${stripWidthPt / 2}" y1="35" x2="${stripWidthPt / 2}" y2="${seg1HeightPt - 25}" stroke="#1E3A8A" stroke-width="1.5" />
    <text x="${stripWidthPt / 2 + 10}" y="${seg1HeightPt / 2}" font-family="Helvetica, Arial, sans-serif" font-size="7" font-weight="bold" fill="#1E3A8A">WARP ↕</text>
  </g>

  <!-- Segment 2 (Lower Half) -->
  <g transform="translate(${col2X}, ${originY})">
    <rect x="0" y="0" width="${stripWidthPt}" height="${seg2HeightPt}" fill="#F0FDF4" stroke="#0F172A" stroke-width="1.2" />
    <rect x="0" y="0" width="${stripWidthPt}" height="${overlapMm * MM_TO_PT}" fill="#FEF3C7" stroke="#D97706" stroke-width="1" stroke-dasharray="4,2" />
    <text x="${stripWidthPt / 2}" y="10" font-family="Helvetica, Arial, sans-serif" font-size="7" font-weight="bold" fill="#B45309" text-anchor="middle">15 mm OVERLAP MARGIN ↕</text>
    <text x="${stripWidthPt / 2}" y="${seg2HeightPt - 15}" font-family="Helvetica, Arial, sans-serif" font-size="8.5" font-weight="bold" fill="#0F172A" text-anchor="middle">SEGMENT 2 (BOTTOM)</text>
    <!-- Grainline arrow -->
    <line x1="${stripWidthPt / 2}" y1="25" x2="${stripWidthPt / 2}" y2="${seg2HeightPt - 30}" stroke="#1E3A8A" stroke-width="1.5" />
    <text x="${stripWidthPt / 2 + 10}" y="${seg2HeightPt / 2}" font-family="Helvetica, Arial, sans-serif" font-size="7" font-weight="bold" fill="#1E3A8A">WARP ↕</text>
  </g>

  <!-- Footer -->
  <text x="${A4_WIDTH_PT / 2}" y="${A4_HEIGHT_PT - 20}" font-family="Helvetica, Arial, sans-serif" font-size="7.5" fill="#64748B" text-anchor="middle" font-weight="bold">
    Pattern geometry by FreeSewing 4.10.2 (MIT licence)   •   Measurements to be verified by a tailor   •   Page ${pageIndex} of ${totalPages}
  </text>
</svg>
  `.trim();
}

/**
 * Generic Tiled Blueprint Generator helper for rectangular products.
 * Groups identical cut pieces and calculates 1.0 cm seam allowances,
 * 1:1 scale SVG cutting paths, grainline orientations, and A4 tiling.
 * 
 * @param {string} productId - Product ID (e.g. 'pouch', 'tote_bag')
 * @param {string} sizeKey - Size key (e.g. 'small', '0-1y')
 * @param {Array} [pile] - Scrap pile
 */
export function getRectangularGarmentPieceList(productId, sizeKey, pile = null) {
  const activePile = pile && pile.length > 0 ? pile : SAMPLE_TEST_PILE;
  const design = buildDesign(activePile, productId, sizeKey);
  const bp = buildTailorBlueprint(design);
  const rawPieces = bp.pieces || [];

  const grouped = new Map();
  for (const pc of rawPieces) {
    const baseName = pc.name.replace(/\s*\(\d+\/\d+\)/, '').trim();
    const saCm = pc.seamAllowanceCm || 1.0;
    const finishedW = Number((pc.finishedWidth || Math.max(1, pc.cutWidth - 2 * saCm)).toFixed(1));
    const finishedH = Number((pc.finishedHeight || Math.max(1, pc.cutHeight - 2 * saCm)).toFixed(1));
    // Area conservation: cut dimensions must strictly equal finished dimensions + 2 * seam allowance.
    // Fixes any potential double seam allowance in pieces.
    const cutW = Number((finishedW + 2 * saCm).toFixed(1));
    const cutH = Number((finishedH + 2 * saCm).toFixed(1));

    const key = `${baseName}_${cutW}x${cutH}`;
    if (!grouped.has(key)) {
      grouped.set(key, {
        id: pc.zoneId || `pc_${pc.pieceNumber}`,
        name: baseName,
        cutQty: 1,
        cutWidthCm: cutW,
        cutHeightCm: cutH,
        finishedWidthCm: finishedW,
        finishedHeightCm: finishedH,
        seamAllowanceCm: saCm,
        role: pc.role,
        scraps: pc.scraps || [],
        scrapsSummary: pc.scrapsSummary,
      });
    } else {
      grouped.get(key).cutQty += 1;
    }
  }

  const pieceList = [];
  for (const item of grouped.values()) {
    const sa_mm = Number((item.seamAllowanceCm * 10).toFixed(2));
    const cutW_mm = Number((item.cutWidthCm * 10).toFixed(2));
    const cutH_mm = Number((item.cutHeightCm * 10).toFixed(2));
    const finW_mm = Number((item.finishedWidthCm * 10).toFixed(2));
    const finH_mm = Number((item.finishedHeightCm * 10).toFixed(2));

    const saPath = `M 0,0 L ${cutW_mm},0 L ${cutW_mm},${cutH_mm} L 0,${cutH_mm} Z`;
    const seamPath = `M ${sa_mm},${sa_mm} L ${sa_mm + finW_mm},${sa_mm} L ${sa_mm + finW_mm},${sa_mm + finH_mm} L ${sa_mm},${sa_mm + finH_mm} Z`;

    const sourceText = item.scrapsSummary || (item.role === 'plain' ? 'Solid Plain Fabric (Continuous yardage)' : 'Fabric Scraps (Pieced patchwork)');
    const cutQtyLabel = `CUT ${item.cutQty} ${item.role === 'plain' ? 'FROM SOLID FABRIC' : 'FROM FABRIC SCRAPS'}`;

    const xTiles = cutW_mm > 170 ? 2 : 1;
    const yTiles = cutH_mm > 220 ? 2 : 1;
    const totalTiles = xTiles * yTiles;

    pieceList.push({
      id: item.id,
      name: item.name,
      cutQty: item.cutQty,
      cutQtyLabel,
      source: sourceText,
      cutWidthCm: item.cutWidthCm,
      cutHeightCm: item.cutHeightCm,
      finishedWidthCm: item.finishedWidthCm,
      finishedHeightCm: item.finishedHeightCm,
      netAreaCm2: Number((item.finishedWidthCm * item.finishedHeightCm).toFixed(1)),
      cutAreaCm2: Number((item.cutWidthCm * item.cutHeightCm).toFixed(1)),
      seamAllowanceCm: item.seamAllowanceCm,
      seamPath,
      saPath,
      grainLine: { orientation: 'vertical', symbol: '↕' },
      cutOnFold: false,
      tilesCount: totalTiles,
      xTiles,
      yTiles,
    });
  }

  return pieceList;
}

/**
 * Renders all blueprint pages for a product into a PDFKit document.
 * Supports both FreeSewing curved CAD garments and rectangular products.
 * 
 * @param {PDFDocument} doc - PDFKit document instance
 * @param {string} productId - Product ID
 * @param {string} sizeKey - Size key
 * @param {Array} [pile] - Optional scrap pile
 * @returns {{ totalPages: number, bp: Object }}
 */
export function renderBlueprintDoc(doc, productId, sizeKey, pile = null) {
  const activePile = pile && pile.length > 0 ? pile : SAMPLE_PILES.neutral.pieces;
  const design = buildDesign(activePile, productId, sizeKey);
  const bp = buildTailorBlueprint(design);
  const measurementTable = getGarmentMeasurementTable(productId, sizeKey);

  const isCurved = ['child_top', 'sandy_skirt', 'aaron_tank'].includes(productId);

  let totalPages = 1;
  let pieces = [];
  if (isCurved) {
    pieces = getCurvedGarmentPieceList(productId, sizeKey);
    if (productId === 'sandy_skirt') totalPages = 4;
    else if (productId === 'aaron_tank') totalPages = 7;
    else if (productId === 'child_top') totalPages = 8;
  } else {
    pieces = getRectangularGarmentPieceList(productId, sizeKey, activePile);
    const totalPieceTiles = pieces.reduce((sum, p) => sum + (p.tilesCount || 1), 0);
    totalPages = 1 + totalPieceTiles;
  }

  // ==========================================
  // PAGE 1: OVERVIEW & ASSEMBLY SPECIFICATION
  // ==========================================
  const page1Svg = buildAssemblyPageSvg(bp, measurementTable, design);
  SVGtoPDF(doc, page1Svg, 0, 0, { width: A4_WIDTH_PT, height: A4_HEIGHT_PT });

  // ==========================================
  // PATTERN PAGES (REAL SCALE TILES)
  // ==========================================
  if (isCurved) {
    if (productId === 'sandy_skirt') {
      const gorePiece = pieces.find((p) => p.id === 'skirt_gore');
      const wbPiece = pieces.find((p) => p.id === 'waistband');

      // Page 2: ONE Skirt Wedge Gore (Draw ONE gore and say "cut 16")
      doc.addPage();
      const page2Svg = buildPatternPiecePageSvg(gorePiece, {
        pageIndex: 2,
        totalPages,
        tileIndex: 1,
        totalTiles: 1,
        tileLabel: 'Gore Pattern (Cut 16 Gores)',
        garmentName: 'Circle Skirt',
      });
      SVGtoPDF(doc, page2Svg, 0, 0, { width: A4_WIDTH_PT, height: A4_HEIGHT_PT });

      // Pages 3-4: Plain Waistband (Tiled into 2 tiles: Left & Right)
      doc.addPage();
      const page3Svg = buildPatternPiecePageSvg(wbPiece, {
        pageIndex: 3,
        totalPages,
        tileIndex: 1,
        totalTiles: 2,
        tileLabel: 'Plain Waistband (Tile 1 of 2 - Left)',
        xOffsetMm: 0,
        garmentName: 'Circle Skirt',
      });
      SVGtoPDF(doc, page3Svg, 0, 0, { width: A4_WIDTH_PT, height: A4_HEIGHT_PT });

      doc.addPage();
      const page4Svg = buildPatternPiecePageSvg(wbPiece, {
        pageIndex: 4,
        totalPages,
        tileIndex: 2,
        totalTiles: 2,
        tileLabel: 'Plain Waistband (Tile 2 of 2 - Right)',
        xOffsetMm: 280,
        garmentName: 'Circle Skirt',
      });
      SVGtoPDF(doc, page4Svg, 0, 0, { width: A4_WIDTH_PT, height: A4_HEIGHT_PT });
    } else if (productId === 'aaron_tank') {
      const front = pieces.find((p) => p.id === 'bodice_front');
      const back = pieces.find((p) => p.id === 'bodice_back');
      const armBinding = pieces.find((p) => p.id === 'arm_binding');
      const neckBinding = pieces.find((p) => p.id === 'neck_binding');

      // Pages 2-3: Front Bodice (Top & Bottom)
      doc.addPage();
      const page2Svg = buildPatternPiecePageSvg(front, {
        pageIndex: 2,
        totalPages,
        tileIndex: 1,
        totalTiles: 2,
        tileLabel: 'Front Bodice (Tile 1 of 2 - Top Half)',
        yOffsetMm: 0,
        garmentName: 'Tank Top',
      });
      SVGtoPDF(doc, page2Svg, 0, 0, { width: A4_WIDTH_PT, height: A4_HEIGHT_PT });

      doc.addPage();
      const page3Svg = buildPatternPiecePageSvg(front, {
        pageIndex: 3,
        totalPages,
        tileIndex: 2,
        totalTiles: 2,
        tileLabel: 'Front Bodice (Tile 2 of 2 - Bottom Half)',
        yOffsetMm: 170,
        garmentName: 'Tank Top',
      });
      SVGtoPDF(doc, page3Svg, 0, 0, { width: A4_WIDTH_PT, height: A4_HEIGHT_PT });

      // Pages 4-5: Back Bodice (Top & Bottom)
      doc.addPage();
      const page4Svg = buildPatternPiecePageSvg(back, {
        pageIndex: 4,
        totalPages,
        tileIndex: 1,
        totalTiles: 2,
        tileLabel: 'Back Bodice (Tile 1 of 2 - Top Half)',
        yOffsetMm: 0,
        garmentName: 'Tank Top',
      });
      SVGtoPDF(doc, page4Svg, 0, 0, { width: A4_WIDTH_PT, height: A4_HEIGHT_PT });

      doc.addPage();
      const page5Svg = buildPatternPiecePageSvg(back, {
        pageIndex: 5,
        totalPages,
        tileIndex: 2,
        totalTiles: 2,
        tileLabel: 'Back Bodice (Tile 2 of 2 - Bottom Half)',
        yOffsetMm: 170,
        garmentName: 'Tank Top',
      });
      SVGtoPDF(doc, page5Svg, 0, 0, { width: A4_WIDTH_PT, height: A4_HEIGHT_PT });

      // Pages 6-7: Armhole & Neckline Bindings (2-Segment Tiled Pages)
      doc.addPage();
      const page6Svg = buildTiledBindingPageSvg(armBinding, {
        pageIndex: 6,
        totalPages,
        garmentName: 'Tank Top',
      });
      SVGtoPDF(doc, page6Svg, 0, 0, { width: A4_WIDTH_PT, height: A4_HEIGHT_PT });

      doc.addPage();
      const page7Svg = buildTiledBindingPageSvg(neckBinding, {
        pageIndex: 7,
        totalPages,
        garmentName: 'Tank Top',
      });
      SVGtoPDF(doc, page7Svg, 0, 0, { width: A4_WIDTH_PT, height: A4_HEIGHT_PT });
    } else if (productId === 'child_top') {
      const front = pieces.find((p) => p.id === 'bodice_front');
      const back = pieces.find((p) => p.id === 'bodice_back');
      const sleeve = pieces.find((p) => p.id === 'sleeve');
      const neckband = pieces.find((p) => p.id === 'neckband');

      // Pages 2-3: Front Bodice (Top & Bottom)
      doc.addPage();
      const page2Svg = buildPatternPiecePageSvg(front, {
        pageIndex: 2,
        totalPages,
        tileIndex: 1,
        totalTiles: 2,
        tileLabel: 'Front Bodice (Tile 1 of 2 - Top Half)',
        yOffsetMm: 0,
        garmentName: 'Kids Top',
      });
      SVGtoPDF(doc, page2Svg, 0, 0, { width: A4_WIDTH_PT, height: A4_HEIGHT_PT });

      doc.addPage();
      const page3Svg = buildPatternPiecePageSvg(front, {
        pageIndex: 3,
        totalPages,
        tileIndex: 2,
        totalTiles: 2,
        tileLabel: 'Front Bodice (Tile 2 of 2 - Bottom Half)',
        yOffsetMm: 170,
        garmentName: 'Kids Top',
      });
      SVGtoPDF(doc, page3Svg, 0, 0, { width: A4_WIDTH_PT, height: A4_HEIGHT_PT });

      // Pages 4-5: Back Bodice (Top & Bottom)
      doc.addPage();
      const page4Svg = buildPatternPiecePageSvg(back, {
        pageIndex: 4,
        totalPages,
        tileIndex: 1,
        totalTiles: 2,
        tileLabel: 'Back Bodice (Tile 1 of 2 - Top Half)',
        yOffsetMm: 0,
        garmentName: 'Kids Top',
      });
      SVGtoPDF(doc, page4Svg, 0, 0, { width: A4_WIDTH_PT, height: A4_HEIGHT_PT });

      doc.addPage();
      const page5Svg = buildPatternPiecePageSvg(back, {
        pageIndex: 5,
        totalPages,
        tileIndex: 2,
        totalTiles: 2,
        tileLabel: 'Back Bodice (Tile 2 of 2 - Bottom Half)',
        yOffsetMm: 170,
        garmentName: 'Kids Top',
      });
      SVGtoPDF(doc, page5Svg, 0, 0, { width: A4_WIDTH_PT, height: A4_HEIGHT_PT });

      // Pages 6-7: Raglan Sleeve (Top & Bottom)
      doc.addPage();
      const page6Svg = buildPatternPiecePageSvg(sleeve, {
        pageIndex: 6,
        totalPages,
        tileIndex: 1,
        totalTiles: 2,
        tileLabel: 'Raglan Sleeve (Tile 1 of 2 - Upper Half)',
        yOffsetMm: 0,
        garmentName: 'Kids Top',
      });
      SVGtoPDF(doc, page6Svg, 0, 0, { width: A4_WIDTH_PT, height: A4_HEIGHT_PT });

      doc.addPage();
      const page7Svg = buildPatternPiecePageSvg(sleeve, {
        pageIndex: 7,
        totalPages,
        tileIndex: 2,
        totalTiles: 2,
        tileLabel: 'Raglan Sleeve (Tile 2 of 2 - Lower Half)',
        yOffsetMm: 170,
        garmentName: 'Kids Top',
      });
      SVGtoPDF(doc, page7Svg, 0, 0, { width: A4_WIDTH_PT, height: A4_HEIGHT_PT });

      // Page 8: Ribbed Neckband
      doc.addPage();
      const page8Svg = buildPatternPiecePageSvg(neckband, {
        pageIndex: 8,
        totalPages,
        tileIndex: 1,
        totalTiles: 1,
        tileLabel: 'Ribbed Neckband (Cut 1)',
        garmentName: 'Kids Top',
      });
      SVGtoPDF(doc, page8Svg, 0, 0, { width: A4_WIDTH_PT, height: A4_HEIGHT_PT });
    }
  } else {
    // ----------------------------------------------------
    // Rectangular Products Tiled Real-Scale Pattern Pages
    // ----------------------------------------------------
    let currentPage = 2;
    for (const piece of pieces) {
      if (piece.tilesCount === 1) {
        doc.addPage();
        const pageSvg = buildPatternPiecePageSvg(piece, {
          pageIndex: currentPage++,
          totalPages,
          tileIndex: 1,
          totalTiles: 1,
          tileLabel: `${piece.name} (${piece.cutQtyLabel})`,
          garmentName: bp.productName,
        });
        SVGtoPDF(doc, pageSvg, 0, 0, { width: A4_WIDTH_PT, height: A4_HEIGHT_PT });
      } else if (piece.xTiles === 1 && piece.yTiles === 2) {
        // Vertically tiled piece (e.g. handle or casing)
        doc.addPage();
        const p1Svg = buildPatternPiecePageSvg(piece, {
          pageIndex: currentPage++,
          totalPages,
          tileIndex: 1,
          totalTiles: 2,
          tileLabel: `${piece.name} (Tile 1 of 2 - Top)`,
          yOffsetMm: 0,
          garmentName: bp.productName,
        });
        SVGtoPDF(doc, p1Svg, 0, 0, { width: A4_WIDTH_PT, height: A4_HEIGHT_PT });

        doc.addPage();
        const p2Svg = buildPatternPiecePageSvg(piece, {
          pageIndex: currentPage++,
          totalPages,
          tileIndex: 2,
          totalTiles: 2,
          tileLabel: `${piece.name} (Tile 2 of 2 - Bottom)`,
          yOffsetMm: 170,
          garmentName: bp.productName,
        });
        SVGtoPDF(doc, p2Svg, 0, 0, { width: A4_WIDTH_PT, height: A4_HEIGHT_PT });
      } else if (piece.xTiles === 2 && piece.yTiles === 1) {
        // Horizontally tiled piece
        doc.addPage();
        const p1Svg = buildPatternPiecePageSvg(piece, {
          pageIndex: currentPage++,
          totalPages,
          tileIndex: 1,
          totalTiles: 2,
          tileLabel: `${piece.name} (Tile 1 of 2 - Left)`,
          xOffsetMm: 0,
          garmentName: bp.productName,
        });
        SVGtoPDF(doc, p1Svg, 0, 0, { width: A4_WIDTH_PT, height: A4_HEIGHT_PT });

        doc.addPage();
        const p2Svg = buildPatternPiecePageSvg(piece, {
          pageIndex: currentPage++,
          totalPages,
          tileIndex: 2,
          totalTiles: 2,
          tileLabel: `${piece.name} (Tile 2 of 2 - Right)`,
          xOffsetMm: 140,
          garmentName: bp.productName,
        });
        SVGtoPDF(doc, p2Svg, 0, 0, { width: A4_WIDTH_PT, height: A4_HEIGHT_PT });
      } else if (piece.xTiles === 2 && piece.yTiles === 2) {
        // 2x2 grid tiled piece (e.g. tote bag body)
        doc.addPage();
        const p1Svg = buildPatternPiecePageSvg(piece, {
          pageIndex: currentPage++,
          totalPages,
          tileIndex: 1,
          totalTiles: 4,
          tileLabel: `${piece.name} (Tile 1 of 4 - Top-Left)`,
          xOffsetMm: 0,
          yOffsetMm: 0,
          garmentName: bp.productName,
        });
        SVGtoPDF(doc, p1Svg, 0, 0, { width: A4_WIDTH_PT, height: A4_HEIGHT_PT });

        doc.addPage();
        const p2Svg = buildPatternPiecePageSvg(piece, {
          pageIndex: currentPage++,
          totalPages,
          tileIndex: 2,
          totalTiles: 4,
          tileLabel: `${piece.name} (Tile 2 of 4 - Top-Right)`,
          xOffsetMm: 140,
          yOffsetMm: 0,
          garmentName: bp.productName,
        });
        SVGtoPDF(doc, p2Svg, 0, 0, { width: A4_WIDTH_PT, height: A4_HEIGHT_PT });

        doc.addPage();
        const p3Svg = buildPatternPiecePageSvg(piece, {
          pageIndex: currentPage++,
          totalPages,
          tileIndex: 3,
          totalTiles: 4,
          tileLabel: `${piece.name} (Tile 3 of 4 - Bottom-Left)`,
          xOffsetMm: 0,
          yOffsetMm: 170,
          garmentName: bp.productName,
        });
        SVGtoPDF(doc, p3Svg, 0, 0, { width: A4_WIDTH_PT, height: A4_HEIGHT_PT });

        doc.addPage();
        const p4Svg = buildPatternPiecePageSvg(piece, {
          pageIndex: currentPage++,
          totalPages,
          tileIndex: 4,
          totalTiles: 4,
          tileLabel: `${piece.name} (Tile 4 of 4 - Bottom-Right)`,
          xOffsetMm: 140,
          yOffsetMm: 170,
          garmentName: bp.productName,
        });
        SVGtoPDF(doc, p4Svg, 0, 0, { width: A4_WIDTH_PT, height: A4_HEIGHT_PT });
      }
    }
  }

  return { totalPages, bp };
}

/**
 * In-memory PDF generator returning Blob and Uint8Array.
 * Operates isomorphically across Node.js and browser WebViews.
 * 
 * @param {string} productId
 * @param {string} sizeKey
 * @param {Array} [pile]
 * @returns {Promise<{ blob: Blob, uint8Array: Uint8Array, totalPages: number, bp: Object }>}
 */
export function generateBlueprintPdfBlob(productId, sizeKey, pile = null) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 0, bottom: 0, left: 0, right: 0 },
        autoFirstPage: true,
        bufferPages: true,
        info: {
          Title: `ReWear Blueprint — ${productId} (${sizeKey})`,
          Author: 'ReWear Upcycling Studio & FreeSewing 4.10.2',
          Subject: 'Real-Scale Tiled Garment Pattern',
        },
      });

      const chunks = [];
      doc.on('data', (c) => chunks.push(c instanceof Uint8Array ? c : new Uint8Array(c)));
      doc.on('error', (err) => reject(err));

      const { totalPages, bp } = renderBlueprintDoc(doc, productId, sizeKey, pile);

      doc.on('end', () => {
        let totalLen = 0;
        for (const c of chunks) totalLen += c.byteLength;
        const merged = new Uint8Array(totalLen);
        let offset = 0;
        for (const c of chunks) {
          merged.set(c, offset);
          offset += c.byteLength;
        }

        const blob = typeof Blob !== 'undefined'
          ? new Blob([merged], { type: 'application/pdf' })
          : null;

        resolve({ blob, uint8Array: merged, totalPages, bp });
      });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Generates the complete publication-quality PDF for a garment and saves to disk.
 * Preserves exact backwards compatibility with Node test suites and scripts.
 *
 * @param {string} productId - Product ID (e.g. 'child_top', 'sandy_skirt', 'aaron_tank', 'pouch')
 * @param {string} sizeKey - e.g. 'chest56', 'waist54', 'small'
 * @param {string} outputPath - file path to write PDF
 * @param {Array} [pile] - optional scrap pile
 */
export async function generateCurvedBlueprintPdf(productId, sizeKey, outputPath, pile = null) {
  const { uint8Array } = await generateBlueprintPdfBlob(productId, sizeKey, pile);
  if (typeof window === 'undefined') {
    const fs = await import(/* @vite-ignore */ 'node:fs');
    fs.writeFileSync(outputPath, Buffer.from(uint8Array));
  }
  return outputPath;
}
