/**
 * REWEAR - Scrap Pile & Bulk Add Helper Functions (Stage 5 / Q5)
 *
 * Pure helper functions for:
 * 1. Size presets (10x10, 12x12, 14x14, 15x20, 20x20 cm + custom)
 * 2. 3 Ready sample piles (Neutral navy/beige/grey, Colourful, Mixed fabrics)
 * 3. Bulk scrap creation with quantity stepper, fabric defaults, and print flag
 * 4. Duplicate scrap item with unique ID
 * 5. Safe serialization and deserialization for localStorage persistence
 */

export const SIZE_PRESETS = [
  { id: '10x10', label: '10×10 cm', width: 10, height: 10 },
  { id: '12x12', label: '12×12 cm', width: 12, height: 12 },
  { id: '14x14', label: '14×14 cm', width: 14, height: 14 },
  { id: '15x20', label: '15×20 cm', width: 15, height: 20 },
  { id: '20x20', label: '20×20 cm', width: 20, height: 20 },
];

export const FABRIC_DEFAULTS = {
  cotton: { feel: 'soft', thickness: 'medium', stretch: false, frays: true },
  denim: { feel: 'stiff', thickness: 'thick', stretch: false, frays: true },
  linen: { feel: 'stiff', thickness: 'medium', stretch: false, frays: true },
  silk: { feel: 'soft', thickness: 'thin', stretch: false, frays: true },
  georgette: { feel: 'soft', thickness: 'thin', stretch: false, frays: true },
  knit: { feel: 'soft', thickness: 'medium', stretch: true, frays: false },
  velvet: { feel: 'soft', thickness: 'thick', stretch: false, frays: true },
  synthetic: { feel: 'soft', thickness: 'thin', stretch: false, frays: false },
};

/**
 * 3 Ready Sample Piles:
 * 1. Neutral (Navy / Beige / Grey) - Calm, timeless palette
 * 2. Colourful - High energy pops (navy anchor + orange, pink, yellow, green) with prints
 * 3. Mixed Fabrics - Varied textures (denim, cotton, linen, silk)
 */
export const SAMPLE_PILES = {
  neutral: {
    id: 'neutral',
    name: 'Neutral (Navy / Beige / Grey)',
    description: '30 cotton scraps (14×14 cm) in calm navy, beige, and grey tones.',
    tag: 'Classic Neutrals',
    icon: '👔',
    pieces: [
      {
        id: 'sample-neutral-navy',
        fabricType: 'cotton',
        width: 14,
        height: 14,
        unit: 'cm',
        color: 'navy',
        colors: ['navy'],
        print: 'plain',
        quantity: 10,
        isIrregular: false,
        feel: 'soft',
        thickness: 'medium',
        stretch: false,
        frays: true,
        included: true,
        addedAt: Date.now() - 3000,
      },
      {
        id: 'sample-neutral-beige',
        fabricType: 'cotton',
        width: 14,
        height: 14,
        unit: 'cm',
        color: 'beige',
        colors: ['beige'],
        print: 'plain',
        quantity: 10,
        isIrregular: false,
        feel: 'soft',
        thickness: 'medium',
        stretch: false,
        frays: true,
        included: true,
        addedAt: Date.now() - 2000,
      },
      {
        id: 'sample-neutral-grey',
        fabricType: 'cotton',
        width: 14,
        height: 14,
        unit: 'cm',
        color: 'grey',
        colors: ['grey'],
        print: 'plain',
        quantity: 10,
        isIrregular: false,
        feel: 'soft',
        thickness: 'medium',
        stretch: false,
        frays: true,
        included: true,
        addedAt: Date.now() - 1000,
      },
    ],
  },

  colourful: {
    id: 'colourful',
    name: 'Colourful',
    description: '36 scraps with navy base, orange, pink, yellow, and printed green accents.',
    tag: 'Vibrant Accents',
    icon: '🎨',
    pieces: [
      {
        id: 'sample-col-navy',
        fabricType: 'cotton',
        width: 14,
        height: 14,
        unit: 'cm',
        color: 'navy',
        colors: ['navy'],
        print: 'plain',
        quantity: 12,
        isIrregular: false,
        feel: 'soft',
        thickness: 'medium',
        stretch: false,
        frays: true,
        included: true,
        addedAt: Date.now() - 4000,
      },
      {
        id: 'sample-col-orange',
        fabricType: 'cotton',
        width: 14,
        height: 14,
        unit: 'cm',
        color: 'orange',
        colors: ['orange'],
        print: 'plain',
        quantity: 8,
        isIrregular: false,
        feel: 'soft',
        thickness: 'medium',
        stretch: false,
        frays: true,
        included: true,
        addedAt: Date.now() - 3000,
      },
      {
        id: 'sample-col-pink',
        fabricType: 'cotton',
        width: 12,
        height: 12,
        unit: 'cm',
        color: 'pink',
        colors: ['pink'],
        print: 'plain',
        quantity: 6,
        isIrregular: false,
        feel: 'soft',
        thickness: 'medium',
        stretch: false,
        frays: true,
        included: true,
        addedAt: Date.now() - 2000,
      },
      {
        id: 'sample-col-yellow',
        fabricType: 'cotton',
        width: 12,
        height: 12,
        unit: 'cm',
        color: 'yellow',
        colors: ['yellow'],
        print: 'plain',
        quantity: 6,
        isIrregular: false,
        feel: 'soft',
        thickness: 'medium',
        stretch: false,
        frays: true,
        included: true,
        addedAt: Date.now() - 1000,
      },
      {
        id: 'sample-col-green-print',
        fabricType: 'cotton',
        width: 14,
        height: 14,
        unit: 'cm',
        color: 'green',
        colors: ['green'],
        print: 'printed',
        quantity: 4,
        isIrregular: false,
        feel: 'soft',
        thickness: 'medium',
        stretch: false,
        frays: true,
        included: true,
        addedAt: Date.now(),
      },
    ],
  },

  mixed_fabrics: {
    id: 'mixed_fabrics',
    name: 'Mixed Fabrics',
    description: '30 scraps across heavyweight denim, cotton, textured linen, and lustrous silk.',
    tag: 'Rich Textures',
    icon: '🧵',
    pieces: [
      {
        id: 'sample-mix-denim',
        fabricType: 'denim',
        width: 20,
        height: 20,
        unit: 'cm',
        color: 'navy',
        colors: ['navy'],
        print: 'plain',
        quantity: 8,
        isIrregular: false,
        feel: 'stiff',
        thickness: 'thick',
        stretch: false,
        frays: true,
        included: true,
        addedAt: Date.now() - 3000,
      },
      {
        id: 'sample-mix-cotton',
        fabricType: 'cotton',
        width: 14,
        height: 14,
        unit: 'cm',
        color: 'beige',
        colors: ['beige'],
        print: 'plain',
        quantity: 10,
        isIrregular: false,
        feel: 'soft',
        thickness: 'medium',
        stretch: false,
        frays: true,
        included: true,
        addedAt: Date.now() - 2000,
      },
      {
        id: 'sample-mix-linen',
        fabricType: 'linen',
        width: 15,
        height: 20,
        unit: 'cm',
        color: 'olive',
        colors: ['olive'],
        print: 'plain',
        quantity: 6,
        isIrregular: false,
        feel: 'stiff',
        thickness: 'medium',
        stretch: false,
        frays: true,
        included: true,
        addedAt: Date.now() - 1000,
      },
      {
        id: 'sample-mix-silk',
        fabricType: 'silk',
        width: 12,
        height: 12,
        unit: 'cm',
        color: 'maroon',
        colors: ['maroon'],
        print: 'plain',
        quantity: 6,
        isIrregular: false,
        feel: 'soft',
        thickness: 'thin',
        stretch: false,
        frays: true,
        included: true,
        addedAt: Date.now(),
      },
    ],
  },
};

/**
 * Validates and clamps quantity between min and max (defaults 1 - 99).
 */
export function validateQuantity(rawQty, min = 1, max = 99) {
  const num = parseInt(rawQty, 10);
  if (isNaN(num) || num < min) return min;
  if (num > max) return max;
  return num;
}

/**
 * Validates dimensions (width and height in cm).
 */
export function validateDimensions(width, height) {
  const w = parseFloat(width);
  const h = parseFloat(height);
  if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
    return {
      valid: false,
      width: 0,
      height: 0,
      error: 'Width and height must be positive numbers greater than 0',
    };
  }
  return {
    valid: true,
    width: Math.round(w * 10) / 10,
    height: Math.round(h * 10) / 10,
  };
}

/**
 * Finds preset by width and height, or returns 'custom'.
 */
export function findSizePreset(width, height) {
  const w = parseFloat(width);
  const h = parseFloat(height);
  const preset = SIZE_PRESETS.find(
    (p) => (p.width === w && p.height === h) || (p.width === h && p.height === w)
  );
  return preset ? preset.id : 'custom';
}

/**
 * Creates a normalized scrap item.
 */
let counter = 0;
export function createScrapItem(options = {}) {
  const {
    width = 14,
    height = 14,
    unit = 'cm',
    color = 'navy',
    fabricType = 'cotton',
    print = 'plain',
    quantity = 1,
    isIrregular = false,
  } = options;

  const defaults = FABRIC_DEFAULTS[fabricType] || FABRIC_DEFAULTS.cotton;
  const clampedQty = validateQuantity(quantity);
  const dimVal = validateDimensions(width, height);
  const validWidth = dimVal.valid ? dimVal.width : 14;
  const validHeight = dimVal.valid ? dimVal.height : 14;

  counter += 1;
  const uniqueId = `scrap-${Date.now()}-${counter}-${Math.random().toString(36).substr(2, 5)}`;

  return {
    id: uniqueId,
    fabricType,
    width: validWidth,
    height: validHeight,
    unit,
    color,
    colors: [color],
    print: print === 'printed' ? 'printed' : 'plain',
    quantity: clampedQty,
    isIrregular: Boolean(isIrregular),
    feel: options.feel || defaults.feel,
    thickness: options.thickness || defaults.thickness,
    stretch: options.stretch !== undefined ? Boolean(options.stretch) : defaults.stretch,
    frays: options.frays !== undefined ? Boolean(options.frays) : defaults.frays,
    included: true,
    addedAt: Date.now(),
  };
}

/**
 * Duplicates a piece with a new unique ID and updated timestamp.
 */
export function duplicateScrapItem(piece) {
  if (!piece) return null;
  counter += 1;
  const newId = `scrap-${Date.now()}-${counter}-${Math.random().toString(36).substr(2, 5)}`;
  return {
    ...piece,
    id: newId,
    addedAt: Date.now(),
  };
}

/**
 * Safe local storage serialization.
 */
export function serializePile(pieces) {
  try {
    return JSON.stringify(pieces || []);
  } catch (err) {
    console.error('Failed to serialize pile:', err);
    return '[]';
  }
}

/**
 * Safe local storage deserialization with fallback.
 */
export function deserializePile(jsonString, fallback = []) {
  if (!jsonString) return fallback;
  try {
    const parsed = JSON.parse(jsonString);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch (err) {
    return fallback;
  }
}
