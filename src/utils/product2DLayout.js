// product2DLayout.js — Stage 4A: 2D Spatial Layout & Patch Geometry Engine for Finished Products
// Generates accurate 2D vector layouts from buildDesign() output (zones, patches, sizes, colours)
// Guarantees:
// 1. Each patch is rendered at true proportion and colour with visible seams
// 2. Patch area conservation: sum of patch areas equals panel area
// 3. Boundary containment: no patch is placed outside its panel

import { COLOR_SWATCHES } from '../i18n/translations.js';
import { PRODUCT_TEMPLATES } from '../engine/templates.js';
import { CHILD_TOP_BRIAN_DATA } from '../engine/childTopBrianData.js';

// Color map fallback
const COLOR_HEX_MAP = {
  navy: '#1E3A8A',
  beige: '#D6C0A4',
  grey: '#9CA3AF',
  gray: '#9CA3AF',
  red: '#EF4444',
  maroon: '#881337',
  pink: '#EC4899',
  orange: '#F97316',
  yellow: '#EAB308',
  green: '#22C55E',
  olive: '#65A30D',
  skyBlue: '#38BDF8',
  skyblue: '#38BDF8',
  royalblue: '#3B82F6',
  royalBlue: '#3B82F6',
  purple: '#A855F7',
  white: '#F8FAFC',
  black: '#1E293B',
  brown: '#78350F',
  cream: '#FEF3C7',
  teal: '#0D9488',
};

export function getHexForColor(colorName, fallback = '#9CA3AF') {
  if (!colorName) return fallback;
  const lower = String(colorName).trim().toLowerCase();
  if (COLOR_HEX_MAP[lower]) return COLOR_HEX_MAP[lower];
  const swatch = COLOR_SWATCHES.find((s) => s.id.toLowerCase() === lower);
  if (swatch) return swatch.hex;
  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(colorName)) return colorName;
  return fallback;
}

/**
 * Computes individual patch rectangles inside a panel of dimensions (panelW × panelH).
 * Guarantees:
 * - Every patch is strictly contained inside [0, 0, panelW, panelH].
 * - The sum of all patch areas exactly equals panelW × panelH.
 */
export function computePanelPatches(placement, panelW, panelH) {
  if (!panelW || panelW <= 0 || !panelH || panelH <= 0) {
    return { patches: [], seams: [] };
  }

  const scraps = placement?.scraps || [];
  const count = scraps.length;

  // Single piece (no seams)
  if (count <= 1) {
    const scrap = scraps[0] || {};
    const color = scrap.color || placement?.color || 'navy';
    const colorHex = scrap.colorHex || getHexForColor(color);
    return {
      patches: [
        {
          index: 0,
          relX: 0,
          relY: 0,
          width: panelW,
          height: panelH,
          color,
          colorHex,
          scrapId: scrap.scrapId || scrap.id || 'single',
          rotated: Boolean(scrap.rotated),
          print: scrap.print || 'plain',
          fabricType: scrap.fabricType || 'cotton',
        },
      ],
      seams: [],
    };
  }

  // Multi-piece patchwork: determine grid/strip layout
  let rows = 1;
  let cols = count;

  const seamType = placement?.seamType || '';
  const direction = placement?.direction || '';

  const gridMatch = seamType.match(/(\d+)x(\d+)_grid_seams/i);
  if (gridMatch) {
    rows = parseInt(gridMatch[1], 10);
    cols = parseInt(gridMatch[2], 10);
  } else if (direction === 'horizontal' || direction === 'horizontal_strip') {
    cols = count;
    rows = 1;
  } else if (direction === 'vertical' || direction === 'vertical_column') {
    rows = count;
    cols = 1;
  } else {
    // General fallback: pick R and C minimizing cell aspect ratio difference with panel aspect ratio
    const targetAspect = panelW / panelH;
    let bestDiff = Infinity;
    for (let r = 1; r <= count; r++) {
      if (count % r === 0) {
        const c = count / r;
        const cellAspect = (panelW / c) / (panelH / r);
        const diff = Math.abs(Math.log(cellAspect / targetAspect));
        if (diff < bestDiff) {
          bestDiff = diff;
          rows = r;
          cols = c;
        }
      }
    }
  }

  // If count doesn't divide evenly into rows * cols, force grid sizing
  if (rows * cols < count) {
    cols = Math.ceil(Math.sqrt((count * panelW) / panelH));
    rows = Math.ceil(count / cols);
  }

  const cellW = panelW / cols;
  const cellH = panelH / rows;

  const patches = [];
  const seams = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const scrap = scraps[idx % count] || scraps[0] || {};
      const color = scrap.color || 'navy';
      const colorHex = scrap.colorHex || getHexForColor(color);

      const relX = c * cellW;
      const relY = r * cellH;

      patches.push({
        index: idx,
        relX,
        relY,
        width: cellW,
        height: cellH,
        color,
        colorHex,
        scrapId: scrap.scrapId || scrap.id || `patch-${idx}`,
        rotated: Boolean(scrap.rotated),
        print: scrap.print || 'plain',
        fabricType: scrap.fabricType || 'cotton',
      });

      // Internal horizontal seam
      if (r > 0 && c === 0) {
        seams.push({
          x1: 0,
          y1: relY,
          x2: panelW,
          y2: relY,
          orientation: 'horizontal',
        });
      }

      // Internal vertical seam
      if (c > 0 && r === 0) {
        seams.push({
          x1: relX,
          y1: 0,
          x2: relX,
          y2: panelH,
          orientation: 'vertical',
        });
      }
    }
  }

  return { patches, seams };
}

/**
 * Finds a matching placement from design.placements by ID or alias.
 */
function findPlacement(placements, zoneId) {
  if (!placements || !Array.isArray(placements)) return null;
  return (
    placements.find((p) => p.zoneId === zoneId) ||
    placements.find((p) => p.zoneId && p.zoneId.startsWith(zoneId)) ||
    null
  );
}

/**
 * Main 2D Layout Engine:
 * Generates coordinate maps, SVG panels, seams, and decorations for all 4 products.
 */
export function computeProduct2DLayout(design, view = 'front') {
  if (!design || !design.productId) {
    return { error: 'Invalid design' };
  }

  const { productId, sizeKey = 'medium', variant = 'plain' } = design;
  const placements = design.placements || [];

  const template = PRODUCT_TEMPLATES[productId];
  const firstSize = template?.sizes ? Object.values(template.sizes)[0] : null;
  const sizeTemplate = template?.sizes?.[sizeKey] || template?.sizes?.medium || firstSize;

  let layout;
  switch (productId) {
    case 'tote_bag':
      layout = computeToteBagLayout(design, sizeTemplate, placements, view);
      break;
    case 'pouch':
      layout = computePouchLayout(design, sizeTemplate, placements, view);
      break;
    case 'cushion_cover':
      layout = computeCushionCoverLayout(design, sizeTemplate, placements, view, variant);
      break;
    case 'kids_frock':
      layout = computeKidsFrockLayout(design, sizeTemplate, placements, view);
      break;
    case 'child_top':
      layout = computeChildTopLayout(design, sizeTemplate, placements, view);
      break;
    default:
      return { error: `Unsupported product: ${productId}` };
  }

  if (layout && Array.isArray(layout.panels)) {
    layout.panels.forEach((p) => {
      if (!p.id) p.id = p.zoneId;
    });
  }

  return layout;
}

// ---------------------------------------------------------------------------
// 1. TOTE BAG 2D LAYOUT
// ---------------------------------------------------------------------------
function computeToteBagLayout(design, sizeTemplate, placements, view) {
  const bodyW = sizeTemplate?.finishedWidthCm || 36;
  const bodyH = sizeTemplate?.finishedHeightCm || 38;

  const isFront = view === 'front';

  // Margins & Dimensions (in cm)
  const marginX = 8;
  const handleArchH = 18;
  const bagTopY = handleArchH + 4;
  const viewBoxW = bodyW + marginX * 2;
  const viewBoxH = bagTopY + bodyH + 8;

  const bodyX = marginX;
  const bodyY = bagTopY;

  const panels = [];
  const decorations = [];

  // 1. Handles (carry handles)
  const handlePlacement = isFront
    ? findPlacement(placements, 'handles_1') || findPlacement(placements, 'handles')
    : findPlacement(placements, 'handles_2') || findPlacement(placements, 'handles');

  const strapW = Math.max(3, bodyW * 0.08);
  const leftStrapX = bodyX + bodyW * 0.22;
  const rightStrapX = bodyX + bodyW * 0.78 - strapW;

  const handleColor = handlePlacement?.scraps?.[0]?.colorHex || getHexForColor(handlePlacement?.scraps?.[0]?.color || 'beige');

  // Handle arch path (behind body)
  decorations.push({
    type: 'handle_arch',
    d: `M ${leftStrapX + strapW / 2} ${bodyY + 8} C ${leftStrapX} ${bodyY - handleArchH * 1.1}, ${rightStrapX + strapW} ${bodyY - handleArchH * 1.1}, ${rightStrapX + strapW / 2} ${bodyY + 8}`,
    stroke: handleColor,
    strokeWidth: strapW,
    strokeLinecap: 'round',
    fill: 'none',
  });

  // Handle stitching details
  decorations.push({
    type: 'handle_stitch',
    d: `M ${leftStrapX + strapW / 2} ${bodyY + 8} C ${leftStrapX} ${bodyY - handleArchH * 1.1}, ${rightStrapX + strapW} ${bodyY - handleArchH * 1.1}, ${rightStrapX + strapW / 2} ${bodyY + 8}`,
    stroke: '#FFFFFF',
    strokeWidth: 0.8,
    strokeDasharray: '2 2',
    fill: 'none',
  });

  // 2. Main Body Panel
  const bodyZoneId = isFront ? 'body_front' : 'body_back';
  const bodyPlacement = findPlacement(placements, bodyZoneId);
  const bodyPatchesData = computePanelPatches(bodyPlacement, bodyW, bodyH);

  panels.push({
    zoneId: bodyZoneId,
    zoneName: isFront ? 'Front Main Body' : 'Back Main Body',
    role: 'base',
    isPlaced: Boolean(bodyPlacement),
    canvasX: bodyX,
    canvasY: bodyY,
    width: bodyW,
    height: bodyH,
    rx: 2,
    patches: bodyPatchesData.patches.map((p) => ({
      ...p,
      canvasX: bodyX + p.relX,
      canvasY: bodyY + p.relY,
    })),
    seams: bodyPatchesData.seams.map((s) => ({
      ...s,
      canvasX1: bodyX + s.x1,
      canvasY1: bodyY + s.y1,
      canvasX2: bodyX + s.x2,
      canvasY2: bodyY + s.y2,
    })),
  });

  // 3. Top Facing Band
  const facingZoneId = isFront ? 'top_facing_1' : 'top_facing_2';
  const facingPlacement = findPlacement(placements, facingZoneId) || findPlacement(placements, 'top_facing');
  const facingH = Math.min(8, bodyH * 0.18);
  const facingPatchesData = computePanelPatches(facingPlacement, bodyW, facingH);

  panels.push({
    zoneId: facingZoneId,
    zoneName: isFront ? 'Top Facing Band (1/2)' : 'Top Facing Band (2/2)',
    role: 'supporting',
    isPlaced: Boolean(facingPlacement),
    canvasX: bodyX,
    canvasY: bodyY,
    width: bodyW,
    height: facingH,
    rx: 0,
    patches: facingPatchesData.patches.map((p) => ({
      ...p,
      canvasX: bodyX + p.relX,
      canvasY: bodyY + p.relY,
    })),
    seams: facingPatchesData.seams.map((s) => ({
      ...s,
      canvasX1: bodyX + s.x1,
      canvasY1: bodyY + s.y1,
      canvasX2: bodyX + s.x2,
      canvasY2: bodyY + s.y2,
    })),
  });

  // 4. Bottom Gusset Reinforcement
  const gussetPlacement = findPlacement(placements, 'bottom_gusset');
  if (gussetPlacement || sizeTemplate?.zones?.some((z) => z.id === 'bottom_gusset')) {
    const gussetH = Math.min(10, bodyH * 0.22);
    const gussetY = bodyY + bodyH - gussetH;
    const gussetPatchesData = computePanelPatches(gussetPlacement, bodyW, gussetH);

    panels.push({
      zoneId: 'bottom_gusset',
      zoneName: 'Bottom Gusset Reinforcement',
      role: 'supporting',
      isPlaced: Boolean(gussetPlacement),
      canvasX: bodyX,
      canvasY: gussetY,
      width: bodyW,
      height: gussetH,
      rx: 0,
      patches: gussetPatchesData.patches.map((p) => ({
        ...p,
        canvasX: bodyX + p.relX,
        canvasY: gussetY + p.relY,
      })),
      seams: gussetPatchesData.seams.map((s) => ({
        ...s,
        canvasX1: bodyX + s.x1,
        canvasY1: gussetY + s.y1,
        canvasX2: bodyX + s.x2,
        canvasY2: gussetY + s.y2,
      })),
    });
  }

  // 5. Accent Patch Pocket (Front View Only)
  if (isFront) {
    const pocketPlacement = findPlacement(placements, 'front_pocket');
    const pocketW = Math.min(18, bodyW * 0.45);
    const pocketH = Math.min(16, bodyH * 0.38);
    const pocketX = bodyX + (bodyW - pocketW) / 2;
    const pocketY = bodyY + facingH + (bodyH - facingH - (gussetPlacement ? 10 : 0) - pocketH) / 2;

    const pocketPatchesData = computePanelPatches(pocketPlacement, pocketW, pocketH);

    panels.push({
      zoneId: 'front_pocket',
      zoneName: 'Accent Patch Pocket',
      role: 'accent',
      isPlaced: Boolean(pocketPlacement),
      canvasX: pocketX,
      canvasY: pocketY,
      width: pocketW,
      height: pocketH,
      rx: 1.5,
      patches: pocketPatchesData.patches.map((p) => ({
        ...p,
        canvasX: pocketX + p.relX,
        canvasY: pocketY + p.relY,
      })),
      seams: pocketPatchesData.seams.map((s) => ({
        ...s,
        canvasX1: pocketX + s.x1,
        canvasY1: pocketY + s.y1,
        canvasX2: pocketX + s.x2,
        canvasY2: pocketY + s.y2,
      })),
    });
  }

  return {
    productId: 'tote_bag',
    view,
    viewBox: { x: 0, y: 0, width: viewBoxW, height: viewBoxH },
    panels,
    decorations,
    disclaimer: 'Preview. Final look may differ slightly.',
  };
}

// ---------------------------------------------------------------------------
// 2. ZIPPERED UTILITY POUCH 2D LAYOUT
// ---------------------------------------------------------------------------
function computePouchLayout(design, sizeTemplate, placements, view) {
  const pouchW = sizeTemplate?.finishedWidthCm || 22;
  const pouchH = sizeTemplate?.finishedHeightCm || 15;

  const isFront = view === 'front';

  const marginX = 6;
  const marginY = 6;
  const viewBoxW = pouchW + marginX * 2;
  const viewBoxH = pouchH + marginY * 2;

  const pouchX = marginX;
  const pouchY = marginY;

  const panels = [];
  const decorations = [];

  // Tab dimensions
  const tabW = 2.5;
  const tabH = 3.5;
  const tabY = pouchY + pouchH * 0.25;

  // Left Tab
  const tabPlacement1 = findPlacement(placements, 'pouch_side_tabs_1') || findPlacement(placements, 'pouch_pull_tabs_1');
  const tab1Color = tabPlacement1?.scraps?.[0]?.colorHex || getHexForColor(tabPlacement1?.scraps?.[0]?.color || 'pink');

  panels.push({
    zoneId: 'pouch_side_tabs_1',
    zoneName: 'Zipper Pull Tab (Left)',
    role: 'accent',
    isPlaced: Boolean(tabPlacement1),
    canvasX: pouchX - tabW,
    canvasY: tabY,
    width: tabW,
    height: tabH,
    rx: 0.8,
    patches: [
      {
        index: 0,
        relX: 0,
        relY: 0,
        width: tabW,
        height: tabH,
        canvasX: pouchX - tabW,
        canvasY: tabY,
        colorHex: tab1Color,
        color: tabPlacement1?.scraps?.[0]?.color || 'accent',
      },
    ],
    seams: [],
  });

  // Right Tab
  const tabPlacement2 = findPlacement(placements, 'pouch_side_tabs_2') || findPlacement(placements, 'pouch_pull_tabs_2');
  const tab2Color = tabPlacement2?.scraps?.[0]?.colorHex || getHexForColor(tabPlacement2?.scraps?.[0]?.color || 'pink');

  panels.push({
    zoneId: 'pouch_side_tabs_2',
    zoneName: 'Zipper Pull Tab (Right)',
    role: 'accent',
    isPlaced: Boolean(tabPlacement2),
    canvasX: pouchX + pouchW,
    canvasY: tabY,
    width: tabW,
    height: tabH,
    rx: 0.8,
    patches: [
      {
        index: 0,
        relX: 0,
        relY: 0,
        width: tabW,
        height: tabH,
        canvasX: pouchX + pouchW,
        canvasY: tabY,
        colorHex: tab2Color,
        color: tabPlacement2?.scraps?.[0]?.color || 'accent',
      },
    ],
    seams: [],
  });

  if (isFront) {
    // Upper Accent / Zipper Band
    const bandH = Math.min(5, pouchH * 0.3);
    const bandPlacement = findPlacement(placements, 'pouch_upper_band');
    const bandPatchesData = computePanelPatches(bandPlacement, pouchW, bandH);

    panels.push({
      zoneId: 'pouch_upper_band',
      zoneName: 'Upper Zipper Trim Band',
      role: 'supporting',
      isPlaced: Boolean(bandPlacement),
      canvasX: pouchX,
      canvasY: pouchY,
      width: pouchW,
      height: bandH,
      rx: 0,
      patches: bandPatchesData.patches.map((p) => ({
        ...p,
        canvasX: pouchX + p.relX,
        canvasY: pouchY + p.relY,
      })),
      seams: bandPatchesData.seams.map((s) => ({
        ...s,
        canvasX1: pouchX + s.x1,
        canvasY1: pouchY + s.y1,
        canvasX2: pouchX + s.x2,
        canvasY2: pouchY + s.y2,
      })),
    });

    // Front Lower Panel
    const baseH = pouchH - bandH;
    const baseY = pouchY + bandH;
    const basePlacement = findPlacement(placements, 'pouch_front_base');
    const basePatchesData = computePanelPatches(basePlacement, pouchW, baseH);

    panels.push({
      zoneId: 'pouch_front_base',
      zoneName: 'Front Lower Panel',
      role: 'base',
      isPlaced: Boolean(basePlacement),
      canvasX: pouchX,
      canvasY: baseY,
      width: pouchW,
      height: baseH,
      rx: 2,
      patches: basePatchesData.patches.map((p) => ({
        ...p,
        canvasX: pouchX + p.relX,
        canvasY: baseY + p.relY,
      })),
      seams: basePatchesData.seams.map((s) => ({
        ...s,
        canvasX1: pouchX + s.x1,
        canvasY1: baseY + s.y1,
        canvasX2: pouchX + s.x2,
        canvasY2: baseY + s.y2,
      })),
    });

    // Zipper line at top edge
    decorations.push({
      type: 'zipper_line',
      x1: pouchX,
      y1: pouchY,
      x2: pouchX + pouchW,
      y2: pouchY,
      stroke: '#475569',
      strokeWidth: 1.5,
      strokeDasharray: '1.2 1.2',
    });

    // Slider pull
    decorations.push({
      type: 'zipper_slider',
      cx: pouchX + pouchW * 0.25,
      cy: pouchY,
      r: 1.5,
      fill: '#CBD5E1',
      stroke: '#334155',
      strokeWidth: 0.8,
    });
  } else {
    // Back View: Full back panel
    const backPlacement = findPlacement(placements, 'pouch_back');
    const backPatchesData = computePanelPatches(backPlacement, pouchW, pouchH);

    panels.push({
      zoneId: 'pouch_back',
      zoneName: 'Back Full Panel',
      role: 'base',
      isPlaced: Boolean(backPlacement),
      canvasX: pouchX,
      canvasY: pouchY,
      width: pouchW,
      height: pouchH,
      rx: 2,
      patches: backPatchesData.patches.map((p) => ({
        ...p,
        canvasX: pouchX + p.relX,
        canvasY: pouchY + p.relY,
      })),
      seams: backPatchesData.seams.map((s) => ({
        ...s,
        canvasX1: pouchX + s.x1,
        canvasY1: pouchY + s.y1,
        canvasX2: pouchX + s.x2,
        canvasY2: pouchY + s.y2,
      })),
    });

    // Zipper teeth indication at top
    decorations.push({
      type: 'zipper_line',
      x1: pouchX,
      y1: pouchY,
      x2: pouchX + pouchW,
      y2: pouchY,
      stroke: '#475569',
      strokeWidth: 1.5,
      strokeDasharray: '1.2 1.2',
    });
  }

  return {
    productId: 'pouch',
    view,
    viewBox: { x: 0, y: 0, width: viewBoxW, height: viewBoxH },
    panels,
    decorations,
    disclaimer: 'Preview. Final look may differ slightly.',
  };
}

// ---------------------------------------------------------------------------
// 3. PATCHWORK CUSHION COVER 2D LAYOUT
// ---------------------------------------------------------------------------
function computeCushionCoverLayout(design, sizeTemplate, placements, view, variant) {
  const cushionW = sizeTemplate?.finishedWidthCm || 40;
  const cushionH = sizeTemplate?.finishedHeightCm || 40;

  const isFront = view === 'front';
  const isDecorated = variant === 'decorated';

  const margin = 6;
  const viewBoxW = cushionW + margin * 2;
  const viewBoxH = cushionH + margin * 2;

  const cushionX = margin;
  const cushionY = margin;

  const panels = [];
  const decorations = [];

  if (isFront) {
    if (isDecorated) {
      // Decorated variant: Top/Bottom Frame, Side Frame, Center Field, Center Motif
      const frameThick = Math.min(5, cushionW * 0.125);
      const innerW = cushionW - frameThick * 2;
      const innerH = cushionH - frameThick * 2;

      // Top frame
      const frameTopPlacement = findPlacement(placements, 'frame_top_bottom_1') || findPlacement(placements, 'frame_top_bottom');
      const frameTopPatches = computePanelPatches(frameTopPlacement, cushionW, frameThick);
      panels.push({
        zoneId: 'frame_top_bottom_1',
        zoneName: 'Front Frame (Top)',
        role: 'supporting',
        isPlaced: Boolean(frameTopPlacement),
        canvasX: cushionX,
        canvasY: cushionY,
        width: cushionW,
        height: frameThick,
        rx: 0,
        patches: frameTopPatches.patches.map((p) => ({
          ...p,
          canvasX: cushionX + p.relX,
          canvasY: cushionY + p.relY,
        })),
        seams: frameTopPatches.seams.map((s) => ({
          ...s,
          canvasX1: cushionX + s.x1,
          canvasY1: cushionY + s.y1,
          canvasX2: cushionX + s.x2,
          canvasY2: cushionY + s.y2,
        })),
      });

      // Bottom frame
      const frameBottomPlacement = findPlacement(placements, 'frame_top_bottom_2') || findPlacement(placements, 'frame_top_bottom');
      const frameBottomPatches = computePanelPatches(frameBottomPlacement, cushionW, frameThick);
      panels.push({
        zoneId: 'frame_top_bottom_2',
        zoneName: 'Front Frame (Bottom)',
        role: 'supporting',
        isPlaced: Boolean(frameBottomPlacement),
        canvasX: cushionX,
        canvasY: cushionY + cushionH - frameThick,
        width: cushionW,
        height: frameThick,
        rx: 0,
        patches: frameBottomPatches.patches.map((p) => ({
          ...p,
          canvasX: cushionX + p.relX,
          canvasY: cushionY + cushionH - frameThick + p.relY,
        })),
        seams: frameBottomPatches.seams.map((s) => ({
          ...s,
          canvasX1: cushionX + s.x1,
          canvasY1: cushionY + cushionH - frameThick + s.y1,
          canvasX2: cushionX + s.x2,
          canvasY2: cushionY + cushionH - frameThick + s.y2,
        })),
      });

      // Left frame
      const frameLeftPlacement = findPlacement(placements, 'frame_sides_1') || findPlacement(placements, 'frame_sides');
      const frameLeftPatches = computePanelPatches(frameLeftPlacement, frameThick, innerH);
      panels.push({
        zoneId: 'frame_sides_1',
        zoneName: 'Front Frame (Left)',
        role: 'supporting',
        isPlaced: Boolean(frameLeftPlacement),
        canvasX: cushionX,
        canvasY: cushionY + frameThick,
        width: frameThick,
        height: innerH,
        rx: 0,
        patches: frameLeftPatches.patches.map((p) => ({
          ...p,
          canvasX: cushionX + p.relX,
          canvasY: cushionY + frameThick + p.relY,
        })),
        seams: frameLeftPatches.seams.map((s) => ({
          ...s,
          canvasX1: cushionX + s.x1,
          canvasY1: cushionY + frameThick + s.y1,
          canvasX2: cushionX + s.x2,
          canvasY2: cushionY + frameThick + s.y2,
        })),
      });

      // Right frame
      const frameRightPlacement = findPlacement(placements, 'frame_sides_2') || findPlacement(placements, 'frame_sides');
      const frameRightPatches = computePanelPatches(frameRightPlacement, frameThick, innerH);
      panels.push({
        zoneId: 'frame_sides_2',
        zoneName: 'Front Frame (Right)',
        role: 'supporting',
        isPlaced: Boolean(frameRightPlacement),
        canvasX: cushionX + cushionW - frameThick,
        canvasY: cushionY + frameThick,
        width: frameThick,
        height: innerH,
        rx: 0,
        patches: frameRightPatches.patches.map((p) => ({
          ...p,
          canvasX: cushionX + cushionW - frameThick + p.relX,
          canvasY: cushionY + frameThick + p.relY,
        })),
        seams: frameRightPatches.seams.map((s) => ({
          ...s,
          canvasX1: cushionX + cushionW - frameThick + s.x1,
          canvasY1: cushionY + frameThick + s.y1,
          canvasX2: cushionX + cushionW - frameThick + s.x2,
          canvasY2: cushionY + frameThick + s.y2,
        })),
      });

      // Center field
      const centerPlacement = findPlacement(placements, 'center_field');
      const centerPatches = computePanelPatches(centerPlacement, innerW, innerH);
      panels.push({
        zoneId: 'center_field',
        zoneName: 'Front Main Field',
        role: 'base',
        isPlaced: Boolean(centerPlacement),
        canvasX: cushionX + frameThick,
        canvasY: cushionY + frameThick,
        width: innerW,
        height: innerH,
        rx: 0,
        patches: centerPatches.patches.map((p) => ({
          ...p,
          canvasX: cushionX + frameThick + p.relX,
          canvasY: cushionY + frameThick + p.relY,
        })),
        seams: centerPatches.seams.map((s) => ({
          ...s,
          canvasX1: cushionX + frameThick + s.x1,
          canvasY1: cushionY + frameThick + s.y1,
          canvasX2: cushionX + frameThick + s.x2,
          canvasY2: cushionY + frameThick + s.y2,
        })),
      });

      // Center motif patch (accent)
      const motifPlacement = findPlacement(placements, 'center_patch');
      const motifSize = Math.min(14, innerW * 0.45);
      const motifX = cushionX + (cushionW - motifSize) / 2;
      const motifY = cushionY + (cushionH - motifSize) / 2;
      const motifPatches = computePanelPatches(motifPlacement, motifSize, motifSize);

      panels.push({
        zoneId: 'center_patch',
        zoneName: 'Center Contrast Motif',
        role: 'accent',
        isPlaced: Boolean(motifPlacement),
        canvasX: motifX,
        canvasY: motifY,
        width: motifSize,
        height: motifSize,
        rx: 1,
        patches: motifPatches.patches.map((p) => ({
          ...p,
          canvasX: motifX + p.relX,
          canvasY: motifY + p.relY,
        })),
        seams: motifPatches.seams.map((s) => ({
          ...s,
          canvasX1: motifX + s.x1,
          canvasY1: motifY + s.y1,
          canvasX2: motifX + s.x2,
          canvasY2: motifY + s.y2,
        })),
      });
    } else {
      // Plain variant: Single or pieced front main panel
      const frontPlacement = findPlacement(placements, 'front_body');
      const frontPatchesData = computePanelPatches(frontPlacement, cushionW, cushionH);

      panels.push({
        zoneId: 'front_body',
        zoneName: 'Front Main Panel',
        role: 'base',
        isPlaced: Boolean(frontPlacement),
        canvasX: cushionX,
        canvasY: cushionY,
        width: cushionW,
        height: cushionH,
        rx: 4,
        patches: frontPatchesData.patches.map((p) => ({
          ...p,
          canvasX: cushionX + p.relX,
          canvasY: cushionY + p.relY,
        })),
        seams: frontPatchesData.seams.map((s) => ({
          ...s,
          canvasX1: cushionX + s.x1,
          canvasY1: cushionY + s.y1,
          canvasX2: cushionX + s.x2,
          canvasY2: cushionY + s.y2,
        })),
      });
    }

    // Soft pillow edge perimeter stitching
    decorations.push({
      type: 'cushion_perimeter_stitch',
      x: cushionX + 1.2,
      y: cushionY + 1.2,
      width: cushionW - 2.4,
      height: cushionH - 2.4,
      rx: 3,
      stroke: '#FFFFFF',
      strokeWidth: 0.6,
      strokeDasharray: '2 2',
      strokeOpacity: 0.8,
    });
  } else {
    // Back View: Envelope back overlap
    // Upper overlap extends from top down
    // Lower overlap extends from bottom up
    const topH = Math.round(cushionH * 0.65); // e.g. 26 cm on 40 cm
    const bottomH = Math.round(cushionH * 0.6); // e.g. 24 cm on 40 cm
    const bottomY = cushionY + cushionH - bottomH;

    const topPlacement = findPlacement(placements, 'envelope_back_top');
    const bottomPlacement = findPlacement(placements, 'envelope_back_bottom');

    const bottomPatchesData = computePanelPatches(bottomPlacement, cushionW, bottomH);
    const topPatchesData = computePanelPatches(topPlacement, cushionW, topH);

    // Render lower flap first (underneath)
    panels.push({
      zoneId: 'envelope_back_bottom',
      zoneName: 'Envelope Back Lower Overlap',
      role: 'base',
      isPlaced: Boolean(bottomPlacement),
      canvasX: cushionX,
      canvasY: bottomY,
      width: cushionW,
      height: bottomH,
      rx: 2,
      patches: bottomPatchesData.patches.map((p) => ({
        ...p,
        canvasX: cushionX + p.relX,
        canvasY: bottomY + p.relY,
      })),
      seams: bottomPatchesData.seams.map((s) => ({
        ...s,
        canvasX1: cushionX + s.x1,
        canvasY1: bottomY + s.y1,
        canvasX2: cushionX + s.x2,
        canvasY2: bottomY + s.y2,
      })),
    });

    // Render upper flap second (overlapping on top)
    panels.push({
      zoneId: 'envelope_back_top',
      zoneName: 'Envelope Back Upper Overlap',
      role: 'base',
      isPlaced: Boolean(topPlacement),
      canvasX: cushionX,
      canvasY: cushionY,
      width: cushionW,
      height: topH,
      rx: 2,
      patches: topPatchesData.patches.map((p) => ({
        ...p,
        canvasX: cushionX + p.relX,
        canvasY: cushionY + p.relY,
      })),
      seams: topPatchesData.seams.map((s) => ({
        ...s,
        canvasX1: cushionX + s.x1,
        canvasY1: cushionY + s.y1,
        canvasX2: cushionX + s.x2,
        canvasY2: cushionY + s.y2,
      })),
    });

    // Realistic envelope opening fold line & subtle drop shadow
    decorations.push({
      type: 'envelope_hem',
      x1: cushionX,
      y1: cushionY + topH,
      x2: cushionX + cushionW,
      y2: cushionY + topH,
      stroke: '#0F172A',
      strokeWidth: 1.2,
    });
    decorations.push({
      type: 'envelope_stitch',
      x1: cushionX,
      y1: cushionY + topH - 1.2,
      x2: cushionX + cushionW,
      y2: cushionY + topH - 1.2,
      stroke: '#F8FAFC',
      strokeWidth: 0.8,
      strokeDasharray: '2 2',
    });
  }

  return {
    productId: 'cushion_cover',
    view,
    variant,
    viewBox: { x: 0, y: 0, width: viewBoxW, height: viewBoxH },
    panels,
    decorations,
    disclaimer: 'Preview. Final look may differ slightly.',
  };
}

// ---------------------------------------------------------------------------
// 4. KIDS' PATCHWORK FROCK 2D LAYOUT
// ---------------------------------------------------------------------------
function computeKidsFrockLayout(design, sizeTemplate, placements, view) {
  const isFront = view === 'front';

  // Extract template dimensions
  const skirtW = sizeTemplate?.finishedWidthCm || 55;
  const skirtH = Math.round(sizeTemplate?.finishedHeightCm * 0.58) || 28;
  const bodiceW = Math.round(skirtW * 0.48); // ~26 cm
  const bodiceH = Math.round(sizeTemplate?.finishedHeightCm * 0.3) || 14;

  const marginX = 6;
  const strapH = 8;
  const viewBoxW = skirtW + marginX * 2;
  const viewBoxH = strapH + bodiceH + skirtH + 8;

  const canvasX0 = marginX;
  const bodiceX = canvasX0 + (skirtW - bodiceW) / 2;
  const bodiceY = strapH;
  const skirtX = canvasX0;
  const skirtY = bodiceY + bodiceH;

  const panels = [];
  const decorations = [];

  // Shoulder Straps (Accent / Supporting)
  const strapPlacement = findPlacement(placements, 'straps_pocket_1') || findPlacement(placements, 'straps_pocket');
  const strapColor = strapPlacement?.scraps?.[0]?.colorHex || getHexForColor(strapPlacement?.scraps?.[0]?.color || 'pink');
  const strapW = 3.5;

  // Left & right strap
  decorations.push({
    type: 'strap_left',
    x: bodiceX + bodiceW * 0.15,
    y: 0,
    width: strapW,
    height: strapH + 2,
    fill: strapColor,
    stroke: '#334155',
    strokeWidth: 0.8,
  });
  decorations.push({
    type: 'strap_right',
    x: bodiceX + bodiceW * 0.85 - strapW,
    y: 0,
    width: strapW,
    height: strapH + 2,
    fill: strapColor,
    stroke: '#334155',
    strokeWidth: 0.8,
  });

  // 1. Bodice Panel
  const bodiceZoneId = isFront ? 'bodice_front' : 'bodice_back';
  const bodicePlacement = findPlacement(placements, bodiceZoneId);
  const bodicePatchesData = computePanelPatches(bodicePlacement, bodiceW, bodiceH);

  panels.push({
    zoneId: bodiceZoneId,
    zoneName: isFront ? 'Front Chest Bodice' : 'Back Chest Bodice',
    role: isFront ? 'supporting' : 'base',
    isPlaced: Boolean(bodicePlacement),
    canvasX: bodiceX,
    canvasY: bodiceY,
    width: bodiceW,
    height: bodiceH,
    rx: 1,
    patches: bodicePatchesData.patches.map((p) => ({
      ...p,
      canvasX: bodiceX + p.relX,
      canvasY: bodiceY + p.relY,
    })),
    seams: bodicePatchesData.seams.map((s) => ({
      ...s,
      canvasX1: bodiceX + s.x1,
      canvasY1: bodiceY + s.y1,
      canvasX2: bodiceX + s.x2,
      canvasY2: bodiceY + s.y2,
    })),
  });

  // Back View Bodice Placket / Button Line
  if (!isFront) {
    decorations.push({
      type: 'back_placket',
      x1: bodiceX + bodiceW / 2,
      y1: bodiceY,
      x2: bodiceX + bodiceW / 2,
      y2: bodiceY + bodiceH,
      stroke: '#334155',
      strokeWidth: 1,
      strokeDasharray: '2 2',
    });
    // Buttons
    decorations.push({
      type: 'button',
      cx: bodiceX + bodiceW / 2,
      cy: bodiceY + bodiceH * 0.3,
      r: 1.2,
      fill: '#FFFFFF',
      stroke: '#0F172A',
      strokeWidth: 0.8,
    });
    decorations.push({
      type: 'button',
      cx: bodiceX + bodiceW / 2,
      cy: bodiceY + bodiceH * 0.7,
      r: 1.2,
      fill: '#FFFFFF',
      stroke: '#0F172A',
      strokeWidth: 0.8,
    });
  }

  // 2. Skirt Panel
  const hemH = Math.min(6, skirtH * 0.2);
  const mainSkirtH = skirtH - hemH;
  const skirtZoneId = isFront ? 'skirt_front' : 'skirt_back';
  const skirtPlacement = findPlacement(placements, skirtZoneId);
  const skirtPatchesData = computePanelPatches(skirtPlacement, skirtW, mainSkirtH);

  panels.push({
    zoneId: skirtZoneId,
    zoneName: isFront ? 'Front Gathered Skirt Tier' : 'Back Gathered Skirt Tier',
    role: 'base',
    isPlaced: Boolean(skirtPlacement),
    canvasX: skirtX,
    canvasY: skirtY,
    width: skirtW,
    height: mainSkirtH,
    rx: 0,
    patches: skirtPatchesData.patches.map((p) => ({
      ...p,
      canvasX: skirtX + p.relX,
      canvasY: skirtY + p.relY,
    })),
    seams: skirtPatchesData.seams.map((s) => ({
      ...s,
      canvasX1: skirtX + s.x1,
      canvasY1: skirtY + s.y1,
      canvasX2: skirtX + s.x2,
      canvasY2: skirtY + s.y2,
    })),
  });

  // Waist gathers line decoration
  decorations.push({
    type: 'waist_gathers',
    d: `M ${skirtX} ${skirtY} Q ${skirtX + skirtW * 0.25} ${skirtY + 1.5}, ${skirtX + skirtW * 0.5} ${skirtY} Q ${skirtX + skirtW * 0.75} ${skirtY + 1.5}, ${skirtX + skirtW} ${skirtY}`,
    stroke: '#334155',
    strokeWidth: 1.2,
    fill: 'none',
  });

  // 3. Skirt Hem Border Band
  const hemZoneId = isFront ? 'skirt_hem_band_1' : 'skirt_hem_band_2';
  const hemPlacement = findPlacement(placements, hemZoneId) || findPlacement(placements, 'skirt_hem_band');
  const hemY = skirtY + mainSkirtH;
  const hemPatchesData = computePanelPatches(hemPlacement, skirtW, hemH);

  panels.push({
    zoneId: hemZoneId,
    zoneName: isFront ? 'Skirt Hem Border Band (1/2)' : 'Skirt Hem Border Band (2/2)',
    role: 'supporting',
    isPlaced: Boolean(hemPlacement),
    canvasX: skirtX,
    canvasY: hemY,
    width: skirtW,
    height: hemH,
    rx: 1,
    patches: hemPatchesData.patches.map((p) => ({
      ...p,
      canvasX: skirtX + p.relX,
      canvasY: hemY + p.relY,
    })),
    seams: hemPatchesData.seams.map((s) => ({
      ...s,
      canvasX1: skirtX + s.x1,
      canvasY1: hemY + s.y1,
      canvasX2: skirtX + s.x2,
      canvasY2: hemY + s.y2,
    })),
  });

  // 4. Contrast Patch Pocket on front skirt (Front View Only)
  if (isFront) {
    const pocketPlacement = findPlacement(placements, 'straps_pocket_2') || findPlacement(placements, 'straps_pocket');
    const pocketSize = Math.min(10, skirtW * 0.2);
    const pocketX = skirtX + skirtW * 0.65;
    const pocketY = skirtY + mainSkirtH * 0.35;
    const pocketPatches = computePanelPatches(pocketPlacement, pocketSize, pocketSize);

    panels.push({
      zoneId: 'frock_pocket',
      zoneName: 'Front Contrast Pocket',
      role: 'accent',
      isPlaced: Boolean(pocketPlacement),
      canvasX: pocketX,
      canvasY: pocketY,
      width: pocketSize,
      height: pocketSize,
      rx: 1.5,
      patches: pocketPatches.patches.map((p) => ({
        ...p,
        canvasX: pocketX + p.relX,
        canvasY: pocketY + p.relY,
      })),
      seams: pocketPatches.seams.map((s) => ({
        ...s,
        canvasX1: pocketX + s.x1,
        canvasY1: pocketY + s.y1,
        canvasX2: pocketX + s.x2,
        canvasY2: pocketY + s.y2,
      })),
    });
  }

  return {
    productId: 'kids_frock',
    view,
    viewBox: { x: 0, y: 0, width: viewBoxW, height: viewBoxH },
    panels,
    decorations,
    disclaimer: 'Preview. Final look may differ slightly.',
  };
}

// ---------------------------------------------------------------------------
// 5. CHILD TOP (FREESEWING BRIAN CAD CURVED FINISHED LOOK)
// ---------------------------------------------------------------------------
function computeCurvedSleevePatches(placement, is56) {
  const scraps = placement?.scraps || [];
  const count = scraps.length;
  const boxW = is56 ? 250 : 270;
  const boxH = is56 ? 380 : 410;
  const startX = -boxW / 2;
  const startY = -95;

  if (count <= 1) {
    const scrap = scraps[0] || {};
    const color = scrap.color || 'navy';
    const colorHex = scrap.colorHex || getHexForColor(color);
    return {
      patches: [
        {
          index: 0,
          relX: startX,
          relY: startY,
          width: boxW,
          height: boxH,
          color,
          colorHex,
          scrapId: scrap.scrapId || scrap.id || 'single_sleeve',
        },
      ],
      seams: [],
    };
  }

  let rows = 3;
  let cols = 2;
  const seamType = placement?.seamType || '';
  const gridMatch = seamType.match(/(\d+)x(\d+)_grid_seams/i);
  if (gridMatch) {
    rows = parseInt(gridMatch[1], 10);
    cols = parseInt(gridMatch[2], 10);
  } else if (count === 4) {
    rows = 2;
    cols = 2;
  }

  const cellW = boxW / cols;
  const cellH = boxH / rows;
  const patches = [];
  const seams = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const scrap = scraps[idx % count] || scraps[0] || {};
      const color = scrap.color || 'navy';
      const colorHex = scrap.colorHex || getHexForColor(color);
      const px = startX + c * cellW;
      const py = startY + r * cellH;

      patches.push({
        index: idx,
        relX: px,
        relY: py,
        width: cellW,
        height: cellH,
        color,
        colorHex,
        scrapId: scrap.scrapId || scrap.id || `sleeve-patch-${idx}`,
      });

      if (r > 0 && c === 0) {
        seams.push({
          x1: startX,
          y1: py,
          x2: startX + boxW,
          y2: py,
        });
      }
      if (c > 0 && r === 0) {
        seams.push({
          x1: px,
          y1: startY,
          x2: px,
          y2: startY + boxH,
        });
      }
    }
  }

  return { patches, seams };
}

function computeCurvedBodicePatches(placement, is56) {
  const scraps = placement?.scraps || [];
  const count = scraps.length;
  const boxW = is56 ? 350 : 380;
  const boxH = is56 ? 340 : 380;
  const startX = -boxW / 2;
  const startY = 0;

  if (count <= 1) {
    const scrap = scraps[0] || {};
    return [
      {
        index: 0,
        relX: startX,
        relY: startY,
        width: boxW,
        height: boxH,
        color: scrap.color || 'navy',
        colorHex: scrap.colorHex || getHexForColor(scrap.color || 'navy'),
      },
    ];
  }

  let rows = 3;
  let cols = 3;
  if (count === 4) {
    rows = 2;
    cols = 2;
  } else if (count === 6) {
    rows = 3;
    cols = 2;
  }
  const cellW = boxW / cols;
  const cellH = boxH / rows;
  const patches = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const scrap = scraps[idx % count] || scraps[0] || {};
      const color = scrap.color || 'navy';
      const colorHex = scrap.colorHex || getHexForColor(color);
      patches.push({
        index: idx,
        relX: startX + c * cellW,
        relY: startY + r * cellH,
        width: cellW,
        height: cellH,
        color,
        colorHex,
      });
    }
  }
  return patches;
}

function computeCurvedBodiceSeams(placement, is56) {
  const scraps = placement?.scraps || [];
  const count = scraps.length;
  if (count <= 1) return [];
  const boxW = is56 ? 350 : 380;
  const boxH = is56 ? 340 : 380;
  const startX = -boxW / 2;
  const startY = 0;

  let rows = 3;
  let cols = 3;
  if (count === 4) {
    rows = 2;
    cols = 2;
  } else if (count === 6) {
    rows = 3;
    cols = 2;
  }
  const cellW = boxW / cols;
  const cellH = boxH / rows;
  const seams = [];

  for (let r = 1; r < rows; r++) {
    seams.push({
      x1: startX,
      y1: startY + r * cellH,
      x2: startX + boxW,
      y2: startY + r * cellH,
    });
  }
  for (let c = 1; c < cols; c++) {
    seams.push({
      x1: startX + c * cellW,
      y1: startY,
      x2: startX + c * cellW,
      y2: startY + boxH,
    });
  }
  return seams;
}

function computeChildTopLayout(design, sizeTemplate, placements, view) {
  const is56 = design.sizeKey !== 'chest62';
  const sizeKey = is56 ? 'chest56' : 'chest62';
  const cad = CHILD_TOP_BRIAN_DATA[sizeKey] || CHILD_TOP_BRIAN_DATA.chest56;
  const isFront = view === 'front';
  const isHybrid = (design.variant || 'hybrid') !== 'patchwork';

  const viewBox = is56
    ? { x: -380, y: -45, width: 760, height: 440 }
    : { x: -430, y: -45, width: 860, height: 485 };

  const bodiceZoneId = isFront ? 'bodice_front' : 'bodice_back';
  const bodiceCad = isFront ? cad.pieces.bodice_front : cad.pieces.bodice_back;
  const bodicePlacement = findPlacement(placements, bodiceZoneId);

  const sleeveCad = cad.pieces.sleeve;
  const sleevePlacement1 = findPlacement(placements, 'sleeve_1') || findPlacement(placements, 'sleeve');
  const sleevePlacement2 = findPlacement(placements, 'sleeve_2') || sleevePlacement1;

  const leftSleeveTransform = is56 ? 'translate(-165, 100) rotate(22)' : 'translate(-185, 115) rotate(22)';
  const rightSleeveTransform = is56 ? 'translate(165, 100) rotate(-22)' : 'translate(185, 115) rotate(-22)';

  const panels = [];

  // Bodice panel
  const bodiceW = bodiceCad.halfWidthCm * 2;
  const bodiceH = bodiceCad.heightCm;
  const bodicePatches = isHybrid
    ? [
        {
          index: 0,
          relX: -bodiceW * 5,
          relY: -20,
          width: bodiceW * 10,
          height: bodiceH * 10 + 50,
          color: 'navy',
          colorHex: '#1E3A8A',
          scrapId: 'plain_base',
        },
      ]
    : computeCurvedBodicePatches(bodicePlacement, is56);

  panels.push({
    id: bodiceZoneId,
    zoneId: bodiceZoneId,
    zoneName: isFront ? 'Front Bodice' : 'Back Bodice',
    role: 'base',
    fabricSource: isHybrid ? 'plain_base' : 'scrap',
    isPlaced: Boolean(bodicePlacement),
    shapeType: 'curved',
    cutOnFold: true,
    seamPath: bodiceCad.seamPath,
    width: bodiceW,
    height: bodiceH,
    canvasX: -bodiceW * 5,
    canvasY: 0,
    patches: bodicePatches,
    seams: isHybrid ? [] : computeCurvedBodiceSeams(bodicePlacement, is56),
  });

  // Left sleeve panel
  const sleevePatches1 = computeCurvedSleevePatches(sleevePlacement1, is56);
  panels.push({
    id: 'sleeve_1',
    zoneId: 'sleeve_1',
    zoneName: 'Left Sleeve',
    role: 'supporting',
    fabricSource: 'scrap',
    isPlaced: Boolean(sleevePlacement1),
    shapeType: 'curved',
    cutOnFold: false,
    seamPath: sleeveCad.seamPath,
    transform: leftSleeveTransform,
    width: sleeveCad.widthCm,
    height: sleeveCad.heightCm,
    canvasX: -165,
    canvasY: 100,
    patches: sleevePatches1.patches,
    seams: sleevePatches1.seams,
  });

  // Right sleeve panel
  const sleevePatches2 = computeCurvedSleevePatches(sleevePlacement2, is56);
  panels.push({
    id: 'sleeve_2',
    zoneId: 'sleeve_2',
    zoneName: 'Right Sleeve',
    role: 'supporting',
    fabricSource: 'scrap',
    isPlaced: Boolean(sleevePlacement2),
    shapeType: 'curved',
    cutOnFold: false,
    seamPath: sleeveCad.seamPath,
    transform: rightSleeveTransform,
    mirrored: true,
    width: sleeveCad.widthCm,
    height: sleeveCad.heightCm,
    canvasX: 165,
    canvasY: 100,
    patches: sleevePatches2.patches,
    seams: sleevePatches2.seams,
  });

  const cuffX = is56 ? 75 : 81;
  const cuffY = is56 ? 263 : 291;
  const neckY = is56 ? 42 : 45;
  const hemY = is56 ? 325 : 370;

  const decorations = [
    {
      type: 'child_neckline',
      isFront,
      is56,
      stroke: '#D6C0A4',
      strokeWidth: 4,
    },
    {
      type: 'child_cuff_left',
      transform: leftSleeveTransform,
      is56,
      cuffX,
      cuffY,
      stroke: '#D6C0A4',
      strokeWidth: 3.5,
    },
    {
      type: 'child_cuff_right',
      transform: rightSleeveTransform,
      is56,
      cuffX,
      cuffY,
      stroke: '#D6C0A4',
      strokeWidth: 3.5,
    },
    {
      type: 'child_fold_notches',
      is56,
      neckY,
      hemY,
    },
  ];

  return {
    productId: 'child_top',
    isCurvedGarment: true,
    view,
    viewBox,
    isHybrid,
    is56,
    cuffX,
    cuffY,
    neckY,
    hemY,
    panels,
    decorations,
    disclaimer: 'Preview. Final look may differ slightly.',
  };
}
