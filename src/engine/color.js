/**
 * REWEAR STAGE 2 — PERCEPTUAL COLOUR RULES (CIELAB & LCH)
 * 
 * Plain-words explanation:
 * Human eyes perceive colour differences non-linearly (standard RGB or HEX cannot
 * accurately tell whether two colours clash or harmonize).
 * This module:
 * 1. Converts RGB or HEX colours into CIELAB and LCH perceptual colour spaces.
 *    - L = Lightness (0 = black, 100 = pure white)
 *    - C = Chroma (saturation / color intensity)
 *    - H = Hue angle (0° to 360° around the perceptual colour wheel)
 * 2. Identifies NEUTRALS (black, white, grey, beige, deep navy, and low-saturation colours).
 *    Neutrals go with everything and are NEVER classified as clashing.
 * 3. Compares non-neutrals by hue angle:
 *    - Close hues (0° - 42°) = Tonal / Analogous (very pleasing & safe).
 *    - Opposite hues (145° - 215°) = Complementary (high-energy, intentional contrast).
 *    - Mid-range angles (48° - 142°) with strong saturation on BOTH colours and low lightness
 *      difference = Clash Risk (visual vibration).
 * 4. Enforces the rule that two printed pieces must never be placed directly next to each other.
 * 
 * Assumptions:
 * - D65 standard illuminant (standard daylight, standard for fashion and web graphics).
 * - Common fabric colour names (navy, beige, etc.) map to standard reference HEX values
 *   if a raw hex code is not provided.
 */

import { CONFIG } from './config.js';

// Standard swatch dictionary mapping known fabric colour names to hex values
export const KNOWN_COLOR_HEX = {
  red: '#EF4444',
  maroon: '#881337',
  pink: '#EC4899',
  orange: '#F97316',
  yellow: '#EAB308',
  green: '#22C55E',
  olive: '#65A30D',
  skyBlue: '#38BDF8',
  royalBlue: '#3B82F6',
  navy: '#1E3A8A',
  purple: '#A855F7',
  beige: '#D6C0A4',
  white: '#F8FAFC',
  black: '#1E293B',
  grey: '#64748B',
  gray: '#64748B',
  brown: '#78350F',
};

// Build a normalized lowercase map for fast case-insensitive lookup (ignoring spaces/hyphens/underscores)
const NORMALIZED_COLOR_HEX = {};
Object.entries(KNOWN_COLOR_HEX).forEach(([name, hex]) => {
  NORMALIZED_COLOR_HEX[name.toLowerCase()] = hex;
  const stripped = name.toLowerCase().replace(/[\s\-_]+/g, '');
  NORMALIZED_COLOR_HEX[stripped] = hex;
});

// Common fabric tailoring aliases
NORMALIZED_COLOR_HEX['blue'] = '#3B82F6';
NORMALIZED_COLOR_HEX['cyan'] = '#06B6D4';
NORMALIZED_COLOR_HEX['teal'] = '#0D9488';

// Named neutrals explicitly recognized in tailoring
export const NAMED_NEUTRALS = new Set(['black', 'white', 'grey', 'gray', 'beige', 'navy']);

/**
 * Parses any color input (hex string, named string, or rgb object) to { r, g, b } (0-255).
 */
export function parseColorToRgb(input) {
  if (!input) return { r: 128, g: 128, b: 128 };

  if (typeof input === 'object' && input.r !== undefined) {
    return {
      r: Math.max(0, Math.min(255, Number(input.r))),
      g: Math.max(0, Math.min(255, Number(input.g))),
      b: Math.max(0, Math.min(255, Number(input.b))),
    };
  }

  let str = String(input).trim();
  const lower = str.toLowerCase();
  const stripped = lower.replace(/[\s\-_]+/g, '');

  if (NORMALIZED_COLOR_HEX[lower]) {
    str = NORMALIZED_COLOR_HEX[lower];
  } else if (NORMALIZED_COLOR_HEX[stripped]) {
    str = NORMALIZED_COLOR_HEX[stripped];
  } else if (KNOWN_COLOR_HEX[str]) {
    str = KNOWN_COLOR_HEX[str];
  }

  if (str.startsWith('#')) {
    let hex = str.slice(1);
    if (hex.length === 3) {
      hex = hex.split('').map((c) => c + c).join('');
    }
    const num = parseInt(hex, 16);
    if (!isNaN(num)) {
      return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255,
      };
    }
  }

  // Fallback neutral grey
  return { r: 128, g: 128, b: 128 };
}

/**
 * Converts sRGB (0-255) to CIE 1931 XYZ using D65 reference white.
 */
export function rgbToXyz(rgb) {
  const rLin = pivotRgb(rgb.r / 255);
  const gLin = pivotRgb(rgb.g / 255);
  const bLin = pivotRgb(rgb.b / 255);

  // sRGB D65 matrix
  const x = (rLin * 0.4124564 + gLin * 0.3575761 + bLin * 0.1804375) * 100;
  const y = (rLin * 0.2126729 + gLin * 0.7151522 + bLin * 0.0721750) * 100;
  const z = (rLin * 0.0193339 + gLin * 0.1191920 + bLin * 0.9503041) * 100;

  return { x, y, z };
}

function pivotRgb(n) {
  return n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92;
}

/**
 * Converts CIE XYZ to CIELAB (L*, a*, b*).
 */
export function xyzToLab(xyz) {
  // D65 reference white coordinates
  const Xn = 95.047;
  const Yn = 100.0;
  const Zn = 108.883;

  const xr = pivotXyz(xyz.x / Xn);
  const yr = pivotXyz(xyz.y / Yn);
  const zr = pivotXyz(xyz.z / Zn);

  const L = Math.max(0, 116 * yr - 16);
  const a = 500 * (xr - yr);
  const b = 200 * (yr - zr);

  return { L, a, b };
}

function pivotXyz(t) {
  return t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;
}

/**
 * Converts CIELAB (L, a, b) to LCH (Lightness, Chroma, Hue angle in degrees 0-360).
 */
export function labToLch(lab) {
  const L = lab.L;
  const C = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
  let hRad = Math.atan2(lab.b, lab.a);
  let h = (hRad * 180) / Math.PI;
  if (h < 0) h += 360;

  return { L, C, h };
}

/**
 * Master converter: parses any colour into full LCH + CIELAB details.
 */
export function getColorMetrics(colorInput) {
  const rgb = parseColorToRgb(colorInput);
  const xyz = rgbToXyz(rgb);
  const lab = xyzToLab(xyz);
  const lch = labToLch(lab);

  const rawName = typeof colorInput === 'string' ? colorInput.trim().toLowerCase() : '';
  const isNamedNeutral = NAMED_NEUTRALS.has(rawName);

  // Check neutrality rules
  const isNeutral =
    isNamedNeutral ||
    lch.C <= CONFIG.NEUTRAL_CHROMA_MAX ||
    lch.L <= CONFIG.DARK_NEUTRAL_LIGHTNESS_MAX ||
    lch.L >= CONFIG.LIGHT_NEUTRAL_LIGHTNESS_MIN;

  return {
    raw: colorInput,
    rgb,
    lab,
    L: Number(lch.L.toFixed(2)),
    C: Number(lch.C.toFixed(2)),
    h: Number(lch.h.toFixed(2)),
    isNeutral,
  };
}

/**
 * Calculates the shortest circular angle difference between two hue angles (0° to 180°).
 */
export function getHueDifference(h1, h2) {
  const diff = Math.abs(h1 - h2) % 360;
  return diff > 180 ? 360 - diff : diff;
}

/**
 * Evaluates the colour relationship between two fabrics.
 * Returns:
 * - relationship: 'neutral-compatible' | 'tonal' | 'complementary' | 'clash' | 'contrast'
 * - clashRisk: boolean
 * - score: 0 to 100 (harmony index)
 * - reason: plain-language explanation for tailors
 */
export function evaluateColorPair(colorA, colorB) {
  const m1 = getColorMetrics(colorA);
  const m2 = getColorMetrics(colorB);

  // Rule 1: Neutrals go with everything and are NEVER clashing
  if (m1.isNeutral || m2.isNeutral) {
    return {
      relationship: 'neutral-compatible',
      clashRisk: false,
      score: 95,
      deltaHue: getHueDifference(m1.h, m2.h),
      deltaL: Math.abs(m1.L - m2.L),
      reason: 'Neutral colour combination: neutral shades anchor the design and never clash.',
    };
  }

  const deltaH = getHueDifference(m1.h, m2.h);
  const deltaL = Math.abs(m1.L - m2.L);

  // Rule 2: Tonal / Analogous (close hue angle)
  if (deltaH <= CONFIG.TONAL_HUE_MAX_DIFF_DEG) {
    return {
      relationship: 'tonal',
      clashRisk: false,
      score: 90,
      deltaHue: deltaH,
      deltaL,
      reason: `Tonal harmony: colours share a close hue family (${deltaH.toFixed(0)}° difference) and blend smoothly.`,
    };
  }

  // Rule 3: Complementary (opposite on the colour wheel)
  const distFromComplementary = Math.abs(deltaH - CONFIG.COMPLEMENTARY_HUE_TARGET_DEG);
  if (distFromComplementary <= CONFIG.COMPLEMENTARY_HUE_TOLERANCE_DEG) {
    return {
      relationship: 'complementary',
      clashRisk: false,
      score: 85,
      deltaHue: deltaH,
      deltaL,
      reason: `Complementary contrast: intentional dynamic pop (${deltaH.toFixed(0)}° difference), ideal for trims or accent pockets.`,
    };
  }

  // Rule 4: Clash check for mid-range hue angles
  const isHueClashRange =
    deltaH >= CONFIG.CLASH_HUE_MIN_DIFF_DEG &&
    deltaH <= CONFIG.CLASH_HUE_MAX_DIFF_DEG;

  const isBothSaturated =
    m1.C >= CONFIG.CLASH_MIN_CHROMA &&
    m2.C >= CONFIG.CLASH_MIN_CHROMA;

  const hasLowLightnessDiff = deltaL <= CONFIG.CLASH_MAX_LIGHTNESS_DIFF;

  if (isHueClashRange && isBothSaturated && hasLowLightnessDiff) {
    return {
      relationship: 'clash',
      clashRisk: true,
      score: 25,
      deltaHue: deltaH,
      deltaL,
      reason: `Clash risk: strong competing hues (${deltaH.toFixed(0)}° difference) with high saturation and similar brightness create visual vibration. Separate them with a neutral border or plain band.`,
    };
  }

  // Otherwise: safe moderate contrast
  return {
    relationship: 'contrast',
    clashRisk: false,
    score: 75,
    deltaHue: deltaH,
    deltaL,
    reason: `Acceptable contrast: colours have distinct hues but enough value separation to avoid visual vibration.`,
  };
}

/**
 * Validates adjacency between two pieces, enforcing the rule that two printed pieces
 * must never be placed next to each other.
 */
export function checkPrintAdjacency(pieceA, pieceB) {
  const isA_Printed = pieceA.print === 'printed' || pieceA.print === 'patterned';
  const isB_Printed = pieceB.print === 'printed' || pieceB.print === 'patterned';

  if (isA_Printed && isB_Printed) {
    return {
      allowed: false,
      reason: 'Two printed pieces cannot be placed directly adjacent to each other. Separate with a plain neutral scrap.',
    };
  }

  return {
    allowed: true,
    reason: 'Print adjacency allowed.',
  };
}
