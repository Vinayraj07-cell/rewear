#!/usr/bin/env node
/**
 * scripts/generate_aaron_data.mjs
 * 
 * Pre-generates mathematically authentic pinned CAD data for FreeSewing Aaron (Tank Top / A-Shirt) v4.10.2.
 * Produces clean seam and seam-allowance paths, polygon areas (Green's theorem/Shoelace),
 * and bounding dimensions with NO grids, NO dimensions, NO logos, and NO text in paths.
 * 
 * Provenance:
 * - Design: Aaron (A-Shirt / Tank Top)
 * - Version: 4.10.2 (Pinned)
 * - Author: Joost De Cock / FreeSewing Community (MIT License)
 * - Disclaimer: typical estimate, unverified, needs a tailor
 * 
 * Hybrid Configuration:
 * - Bodice Front & Back: Plain Base (cut from plain solid body fabric, 0 scraps).
 * - Neck & Armhole Bindings: Scrap Remnants (pieced from leftover fabric offcuts).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Import FreeSewing Aaron from pinned spike node_modules
const FREESEWING_AARON_PATH = 'file:///C:/Users/vinay/.gemini/antigravity/brain/ec75a86c-861d-4711-81f7-d4872260aedc/scratch/freesewing_spike/node_modules/@freesewing/aaron/src/index.mjs';
const { Aaron } = await import(FREESEWING_AARON_PATH);

// Engine geometry helpers
const GEOMETRY_PATH = path.resolve(ROOT_DIR, 'src/engine/geometry.js');
const { calculatePathArea, getPathBoundingBox } = await import(pathToFileURL(GEOMETRY_PATH).href);

export const FREESEWING_VERSION = '4.10.2';
export const PATTERN_DESIGN = 'Aaron';
export const TAILOR_VERIFIED = false;

export const SIZES = [
  {
    sizeKey: 'chest56',
    label: 'Child Chest 56 cm (~3-4 Years)',
    chestCm: 56,
    heightCm: 104,
    measurements: {
      chest: 560,
      biceps: 175,
      hpsToBust: 160,
      hpsToWaistBack: 245,
      neck: 260,
      shoulderToShoulder: 260,
      shoulderSlope: 13,
      waistToArmpit: 115,
      waistToHips: 80,
      hips: 580
    },
    sources: {
      chest: 'typical estimate, unverified, needs a tailor',
      biceps: 'typical estimate, unverified, needs a tailor',
      hpsToBust: 'typical estimate, unverified, needs a tailor',
      hpsToWaistBack: 'typical estimate, unverified, needs a tailor',
      neck: 'typical estimate, unverified, needs a tailor',
      shoulderToShoulder: 'typical estimate, unverified, needs a tailor',
      shoulderSlope: 'typical estimate, unverified, needs a tailor',
      waistToArmpit: 'typical estimate, unverified, needs a tailor',
      waistToHips: 'typical estimate, unverified, needs a tailor',
      hips: 'typical estimate, unverified, needs a tailor'
    }
  },
  {
    sizeKey: 'chest62',
    label: 'Child Chest 62 cm (~5-6 Years)',
    chestCm: 62,
    heightCm: 116,
    measurements: {
      chest: 620,
      biceps: 195,
      hpsToBust: 180,
      hpsToWaistBack: 275,
      neck: 280,
      shoulderToShoulder: 285,
      shoulderSlope: 13,
      waistToArmpit: 130,
      waistToHips: 95,
      hips: 640
    },
    sources: {
      chest: 'typical estimate, unverified, needs a tailor',
      biceps: 'typical estimate, unverified, needs a tailor',
      hpsToBust: 'typical estimate, unverified, needs a tailor',
      hpsToWaistBack: 'typical estimate, unverified, needs a tailor',
      neck: 'typical estimate, unverified, needs a tailor',
      shoulderToShoulder: 'typical estimate, unverified, needs a tailor',
      shoulderSlope: 'typical estimate, unverified, needs a tailor',
      waistToArmpit: 'typical estimate, unverified, needs a tailor',
      waistToHips: 'typical estimate, unverified, needs a tailor',
      hips: 'typical estimate, unverified, needs a tailor'
    }
  }
];

export function generateAaronDataset() {
  const dataset = {};

  for (const s of SIZES) {
    const pattern = new Aaron({ measurements: s.measurements, sa: 10 }).draft();
    const parts = pattern.parts[0];

    const f = parts['aaron.front'];
    const b = parts['aaron.back'];
    const arm = parts['aaron.armBinding'];
    const neck = parts['aaron.neckBinding'];

    const fSeam = f.paths.seam.asPathstring();
    const fSa = f.paths.sa ? f.paths.sa.asPathstring() : fSeam;
    const fCutOnFold = f.paths.__macro_cutonfold_cutonfold_line ? f.paths.__macro_cutonfold_cutonfold_line.asPathstring() : null;
    const fBounds = getPathBoundingBox(fSeam);
    const fNetArea = calculatePathArea(fSeam);

    const bSeam = b.paths.seam.asPathstring();
    const bSa = b.paths.sa ? b.paths.sa.asPathstring() : bSeam;
    const bCutOnFold = b.paths.__macro_cutonfold_cutonfold_line ? b.paths.__macro_cutonfold_cutonfold_line.asPathstring() : null;
    const bBounds = getPathBoundingBox(bSeam);
    const bNetArea = calculatePathArea(bSeam);

    const armSeam = arm.paths.seam.asPathstring();
    const armBounds = getPathBoundingBox(armSeam);
    const armNetArea = calculatePathArea(armSeam);

    const neckSeam = neck.paths.seam.asPathstring();
    const neckBounds = getPathBoundingBox(neckSeam);
    const neckNetArea = calculatePathArea(neckSeam);

    // Half cut dimensions on fold
    const fCutHalfWidthCm = Number((fBounds.widthCm + 1.0).toFixed(1));
    const fCutHeightCm = Number((fBounds.heightCm + 2.5).toFixed(1));
    const bCutHalfWidthCm = Number((bBounds.widthCm + 1.0).toFixed(1));
    const bCutHeightCm = Number((bBounds.heightCm + 2.5).toFixed(1));

    dataset[s.sizeKey] = {
      sizeKey: s.sizeKey,
      label: s.label,
      chestCm: s.chestCm,
      heightCm: s.heightCm,
      provenance: {
        patternDesign: 'Aaron',
        freesewingVersion: '4.10.2',
        tailorVerified: false,
        sources: s.sources,
      },
      finishedDimensions: {
        widthCm: Number((s.chestCm / 2).toFixed(1)),
        heightCm: Number(fBounds.heightCm.toFixed(1)),
      },
      pieces: {
        bodice_front: {
          id: 'bodice_front',
          name: 'Front Bodice',
          role: 'base',
          fabricSource: 'plain',
          hybridDefault: 'plain_base',
          cutOnFold: true,
          cutQty: 1,
          seamAllowanceCm: 1.0,
          grainLine: { orientation: 'vertical', angleDegrees: 90, strict: true },
          seamPath: fSeam,
          saPath: fSa,
          cutOnFoldPath: fCutOnFold,
          halfWidthCm: fBounds.widthCm,
          heightCm: fBounds.heightCm,
          fullWidthCm: Number((fBounds.widthCm * 2).toFixed(1)),
          cutHalfWidthCm: fCutHalfWidthCm,
          cutHeightCm: fCutHeightCm,
          cutFullWidthCm: Number((fCutHalfWidthCm * 2).toFixed(1)),
          netAreaCm2: fNetArea,
          fullNetAreaCm2: Number((fNetArea * 2).toFixed(1)),
          geometry: {
            shapeType: 'curved',
            cutOnFold: true,
            finishedWidthCm: Number((fBounds.widthCm * 2).toFixed(1)),
            finishedHeightCm: fBounds.heightCm,
            halfFinishedWidthCm: fBounds.widthCm,
            finishedAreaCm2: Number((fNetArea * 2).toFixed(1)),
            cutWidthCm: Number((fCutHalfWidthCm * 2).toFixed(1)),
            cutHeightCm: fCutHeightCm,
            seamPath: fSeam,
            saPath: fSa,
          }
        },
        bodice_back: {
          id: 'bodice_back',
          name: 'Back Bodice',
          role: 'base',
          fabricSource: 'plain',
          hybridDefault: 'plain_base',
          cutOnFold: true,
          cutQty: 1,
          seamAllowanceCm: 1.0,
          grainLine: { orientation: 'vertical', angleDegrees: 90, strict: true },
          seamPath: bSeam,
          saPath: bSa,
          cutOnFoldPath: bCutOnFold,
          halfWidthCm: bBounds.widthCm,
          heightCm: bBounds.heightCm,
          fullWidthCm: Number((bBounds.widthCm * 2).toFixed(1)),
          cutHalfWidthCm: bCutHalfWidthCm,
          cutHeightCm: bCutHeightCm,
          cutFullWidthCm: Number((bCutHalfWidthCm * 2).toFixed(1)),
          netAreaCm2: bNetArea,
          fullNetAreaCm2: Number((bNetArea * 2).toFixed(1)),
          geometry: {
            shapeType: 'curved',
            cutOnFold: true,
            finishedWidthCm: Number((bBounds.widthCm * 2).toFixed(1)),
            finishedHeightCm: bBounds.heightCm,
            halfFinishedWidthCm: bBounds.widthCm,
            finishedAreaCm2: Number((bNetArea * 2).toFixed(1)),
            cutWidthCm: Number((bCutHalfWidthCm * 2).toFixed(1)),
            cutHeightCm: bCutHeightCm,
            seamPath: bSeam,
            saPath: bSa,
          }
        },
        arm_binding: {
          id: 'arm_binding',
          name: 'Armhole Binding',
          role: 'supporting',
          fabricSource: 'scrap',
          hybridDefault: 'scrap',
          cutOnFold: false,
          cutQty: 2,
          seamAllowanceCm: 1.0,
          grainLine: { orientation: 'vertical', angleDegrees: 90, strict: false },
          seamPath: armSeam,
          saPath: armSeam,
          widthCm: armBounds.widthCm,
          heightCm: armBounds.heightCm,
          cutWidthCm: armBounds.widthCm,
          cutHeightCm: armBounds.heightCm,
          netAreaCm2: armNetArea,
          geometry: {
            shapeType: 'curved',
            cutOnFold: false,
            finishedWidthCm: armBounds.widthCm,
            finishedHeightCm: armBounds.heightCm,
            finishedAreaCm2: armNetArea,
            cutWidthCm: armBounds.widthCm,
            cutHeightCm: armBounds.heightCm,
            seamPath: armSeam,
            saPath: armSeam,
          }
        },
        neck_binding: {
          id: 'neck_binding',
          name: 'Neckline Binding',
          role: 'supporting',
          fabricSource: 'scrap',
          hybridDefault: 'scrap',
          cutOnFold: false,
          cutQty: 1,
          seamAllowanceCm: 1.0,
          grainLine: { orientation: 'vertical', angleDegrees: 90, strict: false },
          seamPath: neckSeam,
          saPath: neckSeam,
          widthCm: neckBounds.widthCm,
          heightCm: neckBounds.heightCm,
          cutWidthCm: neckBounds.widthCm,
          cutHeightCm: neckBounds.heightCm,
          netAreaCm2: neckNetArea,
          geometry: {
            shapeType: 'curved',
            cutOnFold: false,
            finishedWidthCm: neckBounds.widthCm,
            finishedHeightCm: neckBounds.heightCm,
            finishedAreaCm2: neckNetArea,
            cutWidthCm: neckBounds.widthCm,
            cutHeightCm: neckBounds.heightCm,
            seamPath: neckSeam,
            saPath: neckSeam,
          }
        }
      }
    };
  }

  return dataset;
}

// Generate data file
const dataset = generateAaronDataset();
const fileContent = `/**
 * FREESEWING AARON TANK TOP DATASET (PRE-GENERATED)
 * 
 * Pre-generated directly from @freesewing/aaron (v4.10.2).
 * Hybrid construction: Plain body with scrap binding trim.
 * Real mathematical outputs: SVG paths, seam allowances (sa: 10mm),
 * grain lines, cut-on-fold specifications, and Shoelace polygon areas.
 * NOTHING TYPED BY HAND. NO GRIDS, DIMENSIONS, LOGOS OR TEXT IN PATHS.
 * 
 * Generator: scripts/generate_aaron_data.mjs
 * Pinned: FreeSewing 4.10.2
 * Tailor Verified: false (typical estimate, unverified, needs a tailor)
 */

export const FREESEWING_VERSION = '${FREESEWING_VERSION}';
export const PATTERN_DESIGN = '${PATTERN_DESIGN}';
export const TAILOR_VERIFIED = false;

export const AARON_TANK_DATA = ${JSON.stringify(dataset, null, 2)};
`;

const outputPath = path.resolve(ROOT_DIR, 'src/engine/aaronTankData.js');
fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log(`✓ Successfully generated Aaron tank top CAD dataset at: ${outputPath}`);
