/**
 * REWEAR GATE 2 TEST SUITE — GEOMETRY MODULE & SCHEMA VALIDATION
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  parseSvgPathCommands,
  sampleCubicBezier,
  pathToPolygon,
  calculatePolygonArea,
  calculatePathArea,
  getPathBoundingBox,
  expandBoundingBox,
  checkBoundingBoxOverlap,
  checkBoundingBoxContainment,
} from './geometry.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('====================================================');
console.log('📐 RUNNING GATE 2: GEOMETRY & SCHEMA VALIDATION');
console.log('====================================================');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

// 1. JSON Schema file integrity
const schemaPath = path.join(__dirname, 'schemas', 'garment-spec.v1.json');
assert(fs.existsSync(schemaPath), 'garment-spec.v1.json file exists on disk');

const schemaContent = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
assert(schemaContent.title === 'ReWearGarmentSpec', 'Schema title is ReWearGarmentSpec');
assert(schemaContent.properties.schemaVersion !== undefined, 'Schema declares schemaVersion property');
assert(schemaContent.$defs.pieceDefinition !== undefined, 'Schema defines pieceDefinition');

// 2. SVG Path Parsing & Area (Shoelace Formula)
// A 100mm x 100mm square in SVG path = 10cm x 10cm = 100 cm²
const squarePath = 'M 0 0 L 100 0 L 100 100 L 0 100 Z';
const squareArea = calculatePathArea(squarePath);
assert(Math.abs(squareArea - 100) < 0.1, `100x100 mm square area equals 100 cm² (got ${squareArea})`);

// 3. SVG Path Bounding Box
const squareBBox = getPathBoundingBox(squarePath);
assert(squareBBox.widthCm === 10 && squareBBox.heightCm === 10, 'Square bounding box width & height are 10x10 cm');
assert(squareBBox.minX === 0 && squareBBox.maxX === 100, 'Square bbox minX is 0 and maxX is 100 mm');

// 4. Seam Allowance Bounding Box Expansion
const expandedBBox = expandBoundingBox(squareBBox, 1.0); // +1 cm on each side (+2 cm total)
assert(expandedBBox.widthCm === 12 && expandedBBox.heightCm === 12, '1 cm expanded bbox gives 12x12 cm (+2cm)');
assert(expandedBBox.minX === -10 && expandedBBox.maxX === 110, 'Expanded minX is -10 mm and maxX is 110 mm');

// 5. Bounding Box Overlap & Clearance Checking
const box1 = { minX: 0, minY: 0, maxX: 100, maxY: 100 };
const box2 = { minX: 50, minY: 50, maxX: 150, maxY: 150 };
const box3 = { minX: 110, minY: 0, maxX: 200, maxY: 100 };

assert(checkBoundingBoxOverlap(box1, box2), 'Detects overlapping boxes (box1 and box2)');
assert(!checkBoundingBoxOverlap(box1, box3), 'Detects non-overlapping boxes (box1 and box3 with 10mm gap)');
assert(checkBoundingBoxOverlap(box1, box3, 15), 'Detects clearance breach when 15mm clearance is required for 10mm gap');

// 6. Sheet Containment Verification
assert(checkBoundingBoxContainment(box1, 200, 200, 0), 'box1 is contained inside a 200x200 mm sheet');
assert(!checkBoundingBoxContainment(box1, 90, 200, 0), 'box1 is not contained inside a 90x200 mm sheet (overflows width)');

// 7. Curved Path Shoelace Integration (Triangle with Bezier base)
const trianglePath = 'M 0 0 L 100 0 L 50 100 Z'; // base 100mm, height 100mm => area 50 cm²
const triArea = calculatePathArea(trianglePath);
assert(Math.abs(triArea - 50) < 0.1, `Triangle area equals 50 cm² (got ${triArea})`);

// 8. Curved Path Test: Quarter-circle made from Bézier curve
// Radius 100mm = 10cm. Expected area = (pi * r^2) / 4 = 78.5398 cm²
const quarterCirclePath = 'M 0,0 L 100,0 C 100,55.228475 55.228475,100 0,100 Z';
const qcArea = calculatePathArea(quarterCirclePath, 16);
const qcExpected = (Math.PI * 10 * 10) / 4;
const qcErrorPercent = (Math.abs(qcArea - qcExpected) / qcExpected) * 100;
assert(qcErrorPercent < 1.0, `Quarter-circle Bézier area ${qcArea} cm² is within 1% of true value ${qcExpected.toFixed(2)} cm² (error: ${qcErrorPercent.toFixed(2)}%)`);

// 9. Real FreeSewing Brian child top (Chest 56) Seam Paths Area Test
// Pinned version @freesewing/brian@4.10.2 output paths for chest 56 cm
const brianFrontSeam = 'M 0,41.9 L 0,325 L 161,325 L 161,140.93 C 152.6,140.93 142.15,133.88 138.3,130.03 C 130.59,122.32 126.28,104.47 126.28,78.9 C 126.28,47.89 127.21,28.97 130,16.88 L 56.88,0 C 50.59,27.24 25.96,41.9 0,41.9';
const brianBackSeam = 'M 0,13 L 0,325 L 161,325 L 161,140.93 C 152.6,140.93 142.15,133.88 138.3,130.03 C 130.59,122.32 127.4,104.47 127.4,78.9 C 127.4,47.89 127.21,28.97 130,16.88 L 56.88,0 C 53.87,13 0,13 0,13';
const brianSleeveSeam = 'M -111.51,0 L -75,263.17 L 75,263.17 L 111.51,0 C 111.51,0 101.79,-1.94 84.63,-12.46 C 58.89,-28.23 56.85,-45.36 35.69,-66.9 C 21.59,-81.25 -22.17,-79.37 -36.89,-65.64 C -48.66,-54.65 -76.47,-21.71 -88.07,-13.72 C -98.51,-6.52 -111.51,0 -111.51,0 z';

const frontHalfArea = calculatePathArea(brianFrontSeam);
const backHalfArea = calculatePathArea(brianBackSeam);
const sleeveSingleArea = calculatePathArea(brianSleeveSeam);

// Full front + full back + sleeve pair
const totalBrianNetArea = (frontHalfArea * 2) + (backHalfArea * 2) + (sleeveSingleArea * 2);
const brianErrorPercent = (Math.abs(totalBrianNetArea - 2960) / 2960) * 100;

assert(brianErrorPercent <= 2.0, `FreeSewing Brian chest 56 net area ${totalBrianNetArea.toFixed(1)} cm² is within 2% of ~2,960 cm² (error: ${brianErrorPercent.toFixed(2)}%)`);
assert(frontHalfArea * 2 > 850 && frontHalfArea * 2 < 950, `Front bodice area ${frontHalfArea * 2} cm² is realistic (~910 cm²)`);
assert(backHalfArea * 2 > 880 && backHalfArea * 2 < 980, `Back bodice area ${backHalfArea * 2} cm² is realistic (~936 cm²)`);
assert(sleeveSingleArea * 2 > 1100 && sleeveSingleArea * 2 < 1250, `Sleeve pair area ${sleeveSingleArea * 2} cm² is realistic (~1171 cm²)`);

console.log('====================================================');
console.log(`GATE 2 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('====================================================');

if (failed > 0) {
  process.exit(1);
}
