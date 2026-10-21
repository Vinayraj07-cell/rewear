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

console.log('====================================================');
console.log(`GATE 2 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('====================================================');

if (failed > 0) {
  process.exit(1);
}
