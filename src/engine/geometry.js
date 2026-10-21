/**
 * REWEAR ENGINE — 2D GARMENT VECTOR GEOMETRY MODULE
 * 
 * Plain-words explanation:
 * Provides pure mathematical utilities for curved garment shapes, SVG path parsing,
 * Shoelace polygon area calculation (Green's theorem), bounding box calculation,
 * seam allowance boundary offsets, and collision/clearance checks for pattern marker packing.
 */

/**
 * Tokenizes and parses standard SVG path 'd' strings into command segments.
 * Supports: M/m, L/l, H/h, V/v, C/c, S/s, Q/q, T/t, Z/z.
 */
export function parseSvgPathCommands(d) {
  if (!d || typeof d !== 'string') return [];
  const commands = [];
  const regex = /([a-df-z])\s*([^a-df-z]*)/gi;
  let match;

  while ((match = regex.exec(d)) !== null) {
    const type = match[1];
    const argsStr = match[2].trim();
    const args = argsStr.length > 0
      ? argsStr.split(/[\s,]+/).map(Number).filter((n) => !isNaN(n))
      : [];
    commands.push({ type, args });
  }

  return commands;
}

/**
 * Samples points along a cubic Bézier curve: B(t) = (1-t)³P₀ + 3(1-t)²tP₁ + 3(1-t)t²P₂ + t³P₃.
 */
export function sampleCubicBezier(p0, p1, p2, p3, steps = 10) {
  const points = [];
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const mt = 1 - t;
    const mt2 = mt * mt;
    const mt3 = mt2 * mt;
    const t2 = t * t;
    const t3 = t2 * t;

    const x = mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x;
    const y = mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y;
    points.push({ x, y });
  }
  return points;
}

/**
 * Converts an SVG path string into an approximate 2D polygon vertex array.
 * Assumes path units are in millimeters (standard tailoring CAD convention).
 */
export function pathToPolygon(svgPathD, sampleSteps = 10) {
  const commands = parseSvgPathCommands(svgPathD);
  const vertices = [];
  let currX = 0;
  let currY = 0;
  let startX = 0;
  let startY = 0;

  for (const cmd of commands) {
    const { type, args } = cmd;
    const isRel = type === type.toLowerCase();
    const tUpper = type.toUpperCase();

    if (tUpper === 'M') {
      for (let i = 0; i < args.length; i += 2) {
        currX = isRel ? currX + args[i] : args[i];
        currY = isRel ? currY + args[i + 1] : args[i + 1];
        if (i === 0) {
          startX = currX;
          startY = currY;
        }
        vertices.push({ x: currX, y: currY });
      }
    } else if (tUpper === 'L') {
      for (let i = 0; i < args.length; i += 2) {
        currX = isRel ? currX + args[i] : args[i];
        currY = isRel ? currY + args[i + 1] : args[i + 1];
        vertices.push({ x: currX, y: currY });
      }
    } else if (tUpper === 'H') {
      for (let i = 0; i < args.length; i++) {
        currX = isRel ? currX + args[i] : args[i];
        vertices.push({ x: currX, y: currY });
      }
    } else if (tUpper === 'V') {
      for (let i = 0; i < args.length; i++) {
        currY = isRel ? currY + args[i] : args[i];
        vertices.push({ x: currX, y: currY });
      }
    } else if (tUpper === 'C') {
      for (let i = 0; i < args.length; i += 6) {
        const cp1x = isRel ? currX + args[i] : args[i];
        const cp1y = isRel ? currY + args[i + 1] : args[i + 1];
        const cp2x = isRel ? currX + args[i + 2] : args[i + 2];
        const cp2y = isRel ? currY + args[i + 3] : args[i + 3];
        const destX = isRel ? currX + args[i + 4] : args[i + 4];
        const destY = isRel ? currY + args[i + 5] : args[i + 5];

        const sampled = sampleCubicBezier(
          { x: currX, y: currY },
          { x: cp1x, y: cp1y },
          { x: cp2x, y: cp2y },
          { x: destX, y: destY },
          sampleSteps
        );
        vertices.push(...sampled);
        currX = destX;
        currY = destY;
      }
    } else if (tUpper === 'Z') {
      currX = startX;
      currY = startY;
      vertices.push({ x: currX, y: currY });
    }
  }

  return vertices;
}

/**
 * Calculates polygon area using the Shoelace Formula (Green's Theorem).
 * Formula: A = 0.5 * | Σ (x_i * y_{i+1} - x_{i+1} * y_i) |
 */
export function calculatePolygonArea(vertices) {
  if (!vertices || vertices.length < 3) return 0;
  let sum = 0;
  const n = vertices.length;

  for (let i = 0; i < n; i++) {
    const nextIdx = (i + 1) % n;
    sum += vertices[i].x * vertices[nextIdx].y - vertices[nextIdx].x * vertices[i].y;
  }

  return Math.abs(sum) / 2;
}

/**
 * Calculates surface area of an SVG path in square centimeters (assuming 1 unit = 1 mm).
 */
export function calculatePathArea(svgPathD, sampleSteps = 12) {
  const vertices = pathToPolygon(svgPathD, sampleSteps);
  const areaMm2 = calculatePolygonArea(vertices);
  return Number((areaMm2 / 100).toFixed(1)); // Convert mm² to cm²
}

/**
 * Returns axis-aligned bounding box for an SVG path in millimeters and centimeters.
 */
export function getPathBoundingBox(svgPathD) {
  const vertices = pathToPolygon(svgPathD, 10);
  if (!vertices || vertices.length === 0) {
    return {
      minX: 0, minY: 0, maxX: 0, maxY: 0,
      widthMm: 0, heightMm: 0,
      widthCm: 0, heightCm: 0,
    };
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const v of vertices) {
    if (v.x < minX) minX = v.x;
    if (v.y < minY) minY = v.y;
    if (v.x > maxX) maxX = v.x;
    if (v.y > maxY) maxY = v.y;
  }

  const widthMm = maxX - minX;
  const heightMm = maxY - minY;

  return {
    minX: Number(minX.toFixed(2)),
    minY: Number(minY.toFixed(2)),
    maxX: Number(maxX.toFixed(2)),
    maxY: Number(maxY.toFixed(2)),
    widthMm: Number(widthMm.toFixed(2)),
    heightMm: Number(heightMm.toFixed(2)),
    widthCm: Number((widthMm / 10).toFixed(1)),
    heightCm: Number((heightMm / 10).toFixed(1)),
  };
}

/**
 * Expands a bounding box by a seam allowance or cutting clearance margin (in cm).
 */
export function expandBoundingBox(box, marginCm = 1.0) {
  const marginMm = marginCm * 10;
  return {
    minX: box.minX - marginMm,
    minY: box.minY - marginMm,
    maxX: box.maxX + marginMm,
    maxY: box.maxY + marginMm,
    widthMm: box.widthMm + 2 * marginMm,
    heightMm: box.heightMm + 2 * marginMm,
    widthCm: Number(((box.widthMm + 2 * marginMm) / 10).toFixed(1)),
    heightCm: Number(((box.heightMm + 2 * marginMm) / 10).toFixed(1)),
  };
}

/**
 * Checks whether two 2D bounding boxes overlap, accounting for an optional clearance gap.
 * Dimensions can be in mm or cm as long as units are consistent.
 */
export function checkBoundingBoxOverlap(boxA, boxB, clearance = 0) {
  const noOverlap =
    boxA.maxX + clearance <= boxB.minX ||
    boxB.maxX + clearance <= boxA.minX ||
    boxA.maxY + clearance <= boxB.minY ||
    boxB.maxY + clearance <= boxA.minY;

  return !noOverlap;
}

/**
 * Verifies whether a bounding box is fully contained within [0, 0, sheetW, sheetH].
 */
export function checkBoundingBoxContainment(box, sheetW, sheetH, margin = 0) {
  return (
    box.minX >= margin &&
    box.minY >= margin &&
    box.maxX <= sheetW - margin &&
    box.maxY <= sheetH - margin
  );
}
