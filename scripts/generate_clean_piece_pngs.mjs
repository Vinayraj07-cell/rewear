#!/usr/bin/env node
/**
 * scripts/generate_clean_piece_pngs.mjs
 * 
 * Generates isolated, high-resolution clean PNGs of each pattern piece
 * for FreeSewing Sandy and Aaron with:
 * - NO grid lines
 * - NO dimensions or arrows
 * - NO text labels
 * - NO logos or scale boxes
 * 
 * Uses @resvg/resvg-js directly on pure SVG path geometries.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const ARTIFACT_DIR = 'C:/Users/vinay/.gemini/antigravity/brain/ec75a86c-861d-4711-81f7-d4872260aedc';
const RESVG_PATH = 'file:///C:/Users/vinay/.gemini/antigravity/brain/ec75a86c-861d-4711-81f7-d4872260aedc/scratch/freesewing_spike/node_modules/@resvg/resvg-js/index.js';

const { Resvg } = await import(RESVG_PATH);
const { SANDY_SKIRT_DATA } = await import(pathToFileURL(path.resolve(ROOT_DIR, 'src/engine/sandySkirtData.js')).href);
const { AARON_TANK_DATA } = await import(pathToFileURL(path.resolve(ROOT_DIR, 'src/engine/aaronTankData.js')).href);
const { getPathBoundingBox } = await import(pathToFileURL(path.resolve(ROOT_DIR, 'src/engine/geometry.js')).href);

function renderCleanPiecePng(name, seamPath, saPath, fileName) {
  const seamBounds = getPathBoundingBox(seamPath);
  const saBounds = saPath ? getPathBoundingBox(saPath) : seamBounds;

  const minX = Math.min(seamBounds.minX, saBounds.minX) - 20;
  const minY = Math.min(seamBounds.minY, saBounds.minY) - 20;
  const maxX = Math.max(seamBounds.maxX, saBounds.maxX) + 20;
  const maxY = Math.max(seamBounds.maxY, saBounds.maxY) + 20;

  const width = maxX - minX;
  const height = maxY - minY;

  // SVG with clean white background, outer cut line (stroke #1c1917), inner stitch line (dashed #78716c)
  // ZERO text, ZERO grid, ZERO logos
  const saSvg = saPath ? `<path d="${saPath}" fill="#f5f5f4" stroke="#1c1917" stroke-width="2.5" stroke-linejoin="round"/>` : '';
  const seamSvg = `<path d="${seamPath}" fill="${saPath ? '#e7e5e4' : '#f5f5f4'}" stroke="#78716c" stroke-width="2.0" stroke-dasharray="${saPath ? '6,5' : 'none'}" stroke-linejoin="round"/>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX} ${minY} ${width} ${height}" width="800" height="${Math.max(200, Math.round(800 * (height / width)))}">
    <rect x="${minX}" y="${minY}" width="${width}" height="${height}" fill="#ffffff"/>
    ${saSvg}
    ${seamSvg}
  </svg>`;

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 800 } });
  const pngBuffer = resvg.render().asPng();

  const outPathArtifact = path.join(ARTIFACT_DIR, fileName);
  fs.writeFileSync(outPathArtifact, pngBuffer);
  console.log(`✓ Generated clean piece PNG: ${fileName} (${pngBuffer.length} bytes, cut size: ${Number(((maxX - minX - 40) / 10).toFixed(1))} x ${Number(((maxY - minY - 40) / 10).toFixed(1))} cm)`);
}

console.log('Generating clean pattern piece PNGs (Size 1 Child ~3-4Y)...');

// 1. Sandy pieces
const sandyPieces = SANDY_SKIRT_DATA.waist54.pieces;
renderCleanPiecePng(
  'sandy_skirt',
  sandyPieces.skirt_gore_1.seamPath,
  sandyPieces.skirt_gore_1.saPath,
  'clean_piece_sandy_skirt.png'
);
renderCleanPiecePng(
  'sandy_waistband',
  sandyPieces.waistband.seamPath,
  sandyPieces.waistband.saPath,
  'clean_piece_sandy_waistband.png'
);

// 2. Aaron pieces
const aaronPieces = AARON_TANK_DATA.chest56.pieces;
renderCleanPiecePng(
  'aaron_front',
  aaronPieces.bodice_front.seamPath,
  aaronPieces.bodice_front.saPath,
  'clean_piece_aaron_front.png'
);
renderCleanPiecePng(
  'aaron_back',
  aaronPieces.bodice_back.seamPath,
  aaronPieces.bodice_back.saPath,
  'clean_piece_aaron_back.png'
);
renderCleanPiecePng(
  'aaron_arm_binding',
  aaronPieces.arm_binding.seamPath,
  null,
  'clean_piece_aaron_arm_binding.png'
);
renderCleanPiecePng(
  'aaron_neck_binding',
  aaronPieces.neck_binding.seamPath,
  null,
  'clean_piece_aaron_neck_binding.png'
);

console.log('All 6 clean piece PNGs successfully generated in artifact directory.');
