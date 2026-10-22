// src/utils/tailorBlueprintData.js
// Stage 4B / Q4: Generates complete tailor blueprint data from buildDesign() output
// For all products (pouch, tote_bag, cushion_cover, kids_frock, child_top).

import { PRODUCT_TEMPLATES, getProductRequirements } from '../engine/templates.js';

export const TAILOR_DISCLAIMER = 'Measurements to be verified by a tailor';
export const TYPICAL_DEFAULTS_DISCLAIMER = 'typical defaults, to be verified by a tailor';

const CM_TO_INCH = 1 / 2.54;

export function cmToInch(cm, decimals = 1) {
  if (cm === undefined || cm === null || isNaN(cm)) return 0;
  return Number((cm * CM_TO_INCH).toFixed(decimals));
}

export function formatDualDimension(wCm, hCm) {
  const wIn = cmToInch(wCm, 1);
  const hIn = cmToInch(hCm, 1);
  return {
    cm: `${wCm} × ${hCm} cm`,
    inches: `${wIn} × ${hIn} in`,
    combined: `${wCm} × ${hCm} cm (${wIn} × ${hIn} in)`,
  };
}

/**
 * Summarises long scrap lists into compact counts per colour and dimension.
 * Example: "9 scraps: navy 14 × 14 cm" or "4 scraps: navy 14 × 14 cm, 5 scraps: beige 14 × 14 cm"
 */
export function summarizeScrapsList(scrapsList = []) {
  if (!scrapsList || scrapsList.length === 0) return '0 scraps';

  const groups = new Map();
  for (const s of scrapsList) {
    const dim = s.trimmedDimensions?.cm || (s.cutWidth && s.cutHeight ? `${s.cutWidth} × ${s.cutHeight} cm` : '14 × 14 cm');
    const color = s.color || 'neutral';
    const key = `${color}::${dim}`;
    if (!groups.has(key)) {
      groups.set(key, { count: 0, color, dim });
    }
    groups.get(key).count += 1;
  }

  const parts = [];
  for (const item of groups.values()) {
    parts.push(`${item.count} ${item.count === 1 ? 'scrap' : 'scraps'}: ${item.color} ${item.dim}`);
  }
  return parts.join(', ');
}

/**
 * Tailor Stitching Steps per product, dynamically adapted to the selected size.
 */
export function getProductStitchingSteps(productId, sizeKey = 'small', template = null) {
  const prod = template || PRODUCT_TEMPLATES[productId];
  const sizeObj = prod?.sizes?.[sizeKey] || prod?.sizes?.small || Object.values(prod?.sizes || {})[0];

  const finishedW = sizeObj?.finishedWidthCm || 36;
  const finishedH = sizeObj?.finishedHeightCm || 38;

  // 1. Explicit steps defined on the template/spec
  if (prod?.stitchingSteps) {
    return typeof prod.stitchingSteps === 'function' ? prod.stitchingSteps(sizeKey, sizeObj) : prod.stitchingSteps;
  }
  if (prod?.steps) {
    return typeof prod.steps === 'function' ? prod.steps(sizeKey, sizeObj) : prod.steps;
  }

  // 2. Step template chosen from construction field (tee, skirt, trousers, bag, cushion, pouch)
  const construction = prod?.construction || (
    productId === 'kids_frock' ? 'skirt' :
    productId === 'tote_bag' ? 'bag' :
    productId === 'child_top' ? 'tee' :
    productId === 'cushion_cover' ? 'cushion' :
    productId === 'pouch' ? 'pouch' :
    productId
  );

  if (construction === 'pouch') {
    return [
      {
        stepNumber: 1,
        title: 'Piece the Scrap Patches',
        instruction: `Arrange scrap pieces for the front lower panel, back panel, and upper zipper band according to the cut blueprint (${finishedW} × ${finishedH} cm finished). Join with 1.0 cm (0.4 in) seam allowance. Press all seams open flat to prevent bulk.`,
        audioText: 'Step 1: Piece scrap patches with one centimeter seam allowance and press all seams open flat.',
        diagramType: 'pouch_piece_patches',
      },
      {
        stepNumber: 2,
        title: 'Attach Side Pull Tabs',
        instruction: 'Fold zipper pull tabs lengthwise with right sides facing inward. Stitch outer edges, turn out, and press. Baste pull tabs to the outer side edges at the upper zipper level with a 0.5 cm margin.',
        audioText: 'Step 2: Fold and stitch pull tabs, then baste them to the outer side edges at zipper height.',
        diagramType: 'pouch_side_tabs',
      },
      {
        stepNumber: 3,
        title: 'Insert Zipper into Upper Band',
        instruction: `Place ${finishedW} cm zipper tape face-down on the upper edge of the front zipper band (right sides facing). Stitch along zipper teeth line using a zipper presser foot with 0.8 cm margin.`,
        audioText: `Step 3: Pin zipper tape face down on the upper band and stitch using a zipper foot.`,
        diagramType: 'pouch_insert_zipper',
      },
      {
        stepNumber: 4,
        title: 'Topstitch Zipper Margin',
        instruction: 'Fold band away from the zipper teeth. Press flat and topstitch 2 mm from the zipper edge on the right side to ensure the slider runs smoothly without catching fabric.',
        audioText: 'Step 4: Press fabric away from teeth and topstitch two millimeters from the zipper edge.',
        diagramType: 'pouch_topstitch_zipper',
      },
      {
        stepNumber: 5,
        title: 'Join Lower Panel & Back',
        instruction: 'Join the front lower panel to the bottom edge of the upper zipper band with 1.0 cm seam allowance. Press seam allowance downward. Repeat zipper attachment for the back panel.',
        audioText: 'Step 5: Join the lower panel to the upper zipper band and press the seam downward.',
        diagramType: 'pouch_join_lower',
      },
      {
        stepNumber: 6,
        title: 'Perimeter Closure & Turn Out',
        instruction: 'IMPORTANT: Unzip the slider halfway. Place front and back panels right sides facing. Pin perimeter edges and stitch sides and bottom with 1.0 cm seam allowance. Clip bottom corners, turn out through the open zipper, and steam press.',
        audioText: 'Step 6: Open zipper halfway. Stitch side and bottom edges. Turn right side out through the zipper and steam press.',
        diagramType: 'pouch_finish',
      },
    ];
  }

  if (construction === 'bag') {
    const gussetDepth = sizeKey === 'small' ? 4 : (sizeKey === 'large' ? 8 : 6);
    return [
      {
        stepNumber: 1,
        title: 'Assemble Patchwork Body Panels',
        instruction: `Join patchwork scrap blocks to construct the front main body (${finishedW} × ${finishedH} cm) and back main body (${finishedW} × ${finishedH} cm). Stitch all internal seams at 1.0 cm (0.4 in) seam allowance. Press seams open to ensure a smooth, durable surface.`,
        audioText: `Step 1: Join patchwork blocks for front and back main body panels measuring ${finishedW} by ${finishedH} centimeters. Press seams open.`,
        diagramType: 'tote_assemble_body',
      },
      {
        stepNumber: 2,
        title: 'Construct Carry Handles',
        instruction: 'Fold each handle strip lengthwise in quarters (or insert webbing interfacing). Press and edge-stitch along both long edges 2 mm from the edge for high tensile strength.',
        audioText: 'Step 2: Fold handle strips lengthwise in quarters and edge-stitch both sides for strength.',
        diagramType: 'tote_construct_handles',
      },
      {
        stepNumber: 3,
        title: 'Attach Accent Patch Pocket',
        instruction: 'Hem the top edge of the front accent pocket (double fold 1.5 cm). Position pocket centrally on the front body panel. Pin and edge-stitch sides and bottom with reinforced bar-tacks at top corners.',
        audioText: 'Step 3: Hem the pocket top edge. Position on front body and edge-stitch with bar-tacks at corners.',
        diagramType: 'tote_attach_pocket',
      },
      {
        stepNumber: 4,
        title: 'Attach Handles & Top Facing',
        instruction: `Position carry handles on the top edge of front and back panels spaced ${sizeKey === 'small' ? 10 : 12} cm apart. Baste in place. Place top facing band right sides facing and stitch top seam with 1.0 cm seam allowance.`,
        audioText: 'Step 4: Baste handles onto top edge, then stitch top facing band.',
        diagramType: 'tote_attach_facing',
      },
      {
        stepNumber: 5,
        title: 'Stitch Side & Bottom Seams',
        instruction: 'Align front and back tote panels right sides facing. Pin and stitch the two long side seams and the bottom edge using 1.0 cm seam allowance. Finish raw edges with overlock or zigzag.',
        audioText: 'Step 5: Align front and back panels right sides facing. Stitch sides and bottom with one centimeter seam allowance.',
        diagramType: 'tote_seam_sides',
      },
      {
        stepNumber: 6,
        title: 'Box Bottom Corners & Topstitch Rim',
        instruction: `Pinch each bottom corner into a triangle to form gusset depth (${gussetDepth} cm). Stitch across perpendicular to the seam. Turn bag right side out. Turn top facing inside and topstitch bag rim at 0.5 cm margin.`,
        audioText: `Step 6: Box bottom corners for ${gussetDepth} cm gusset depth. Turn right side out and topstitch bag rim.`,
        diagramType: 'tote_box_corners',
      },
    ];
  }

  if (construction === 'cushion') {
    const overlapCm = sizeKey === 'small' ? 8 : (sizeKey === 'large' ? 12 : 10);
    return [
      {
        stepNumber: 1,
        title: 'Piece the Front Patchwork Grid',
        instruction: `Assemble the scrap pieces to form the ${finishedW} × ${finishedH} cm front pillow face. Stitch with 1.0 cm seam allowance, nesting seam intersections. Press all seams open flat.`,
        audioText: `Step 1: Assemble front patchwork grid scraps to form the ${finishedW} by ${finishedH} centimeter pillow face. Nest seam intersections and press seams open.`,
        diagramType: 'cushion_piece_front',
      },
      {
        stepNumber: 2,
        title: 'Hem Upper Envelope Flap',
        instruction: 'On the upper back flap, double fold the bottom finished edge (1.0 cm then 1.0 cm). Press and topstitch along the fold with 2 mm margin.',
        audioText: 'Step 2: Double-fold the inner edge of the upper back flap and topstitch.',
        diagramType: 'cushion_hem_top',
      },
      {
        stepNumber: 3,
        title: 'Hem Lower Envelope Flap',
        instruction: 'On the lower back flap, double fold the top finished edge (1.0 cm then 1.0 cm). Press and topstitch along the fold with 2 mm margin.',
        audioText: 'Step 3: Double-fold the inner edge of the lower back flap and topstitch.',
        diagramType: 'cushion_hem_bottom',
      },
      {
        stepNumber: 4,
        title: 'Layer Envelope Overlaps',
        instruction: `Lay the front patchwork panel right side up. Lay the upper back piece right side down aligning top and side edges. Lay the lower back piece right side down overlapping the upper piece by ${overlapCm} cm.`,
        audioText: `Step 4: Lay front panel right side up. Overlay upper and lower back flaps right sides facing with ${overlapCm} cm overlap.`,
        diagramType: 'cushion_layer_flaps',
      },
      {
        stepNumber: 5,
        title: 'Perimeter Sewing & Corner Trimming',
        instruction: 'Pin all 4 perimeter edges securely. Stitch all 4 sides continuously with 1.0 cm seam allowance. Reinforce with backstitches at the overlap junctions. Clip corners at 45 degrees to reduce bulk.',
        audioText: 'Step 5: Stitch entire perimeter with one centimeter seam allowance. Reinforce overlap junctions and clip corners.',
        diagramType: 'cushion_stitch_perimeter',
      },
      {
        stepNumber: 6,
        title: 'Turn Out & Steam Press',
        instruction: `Turn cushion cover right side out through the envelope overlap opening. Gently push out all 4 corners with a point turner. Steam press edges flat. Insert ${finishedW} × ${finishedH} cm pillow pad to test fit.`,
        audioText: 'Step 6: Turn right side out through envelope opening. Push out corners and steam press.',
        diagramType: 'cushion_finish',
      },
    ];
  }

  if (construction === 'skirt') {
    const bodiceW = sizeKey === '0-1y' ? 22 : (sizeKey === '2-3y' ? 26 : (sizeKey === '4-5y' ? 30 : 34));
    const bodiceH = sizeKey === '0-1y' ? 12 : (sizeKey === '2-3y' ? 14 : (sizeKey === '4-5y' ? 16 : 18));
    const skirtH = sizeKey === '0-1y' ? 22 : (sizeKey === '2-3y' ? 28 : (sizeKey === '4-5y' ? 35 : 42));

    return [
      {
        stepNumber: 1,
        title: 'Assemble Chest Bodice Panels',
        instruction: `Join scrap pieces for front and back chest bodice (${bodiceW} × ${bodiceH} cm). Stitch center seams with 1.0 cm seam allowance. Press seams open flat. Finish neckline edges with narrow double turn hem or bias tape.`,
        audioText: `Step 1: Assemble front and back chest bodice pieces (${bodiceW} by ${bodiceH} cm). Press seams open and finish neckline.`,
        diagramType: 'frock_bodice',
      },
      {
        stepNumber: 2,
        title: 'Prepare Shoulder Straps',
        instruction: 'Fold shoulder strap strips lengthwise right sides together. Stitch long edge with 0.6 cm seam allowance. Turn straps right side out using a loop turner. Press flat and topstitch edges.',
        audioText: 'Step 2: Fold and stitch shoulder straps, turn right side out, and press.',
        diagramType: 'frock_straps',
      },
      {
        stepNumber: 3,
        title: 'Gather Skirt Tiers',
        instruction: `Piece the patchwork skirt panels together (${finishedW} × ${skirtH} cm). Run two parallel rows of long basting stitches (stitch length 4.5 mm) along the upper skirt edge, 0.5 cm and 1.2 cm from raw edge.`,
        audioText: `Step 3: Piece skirt panels (${finishedW} by ${skirtH} cm) and run two parallel gathering basting threads along top edge.`,
        diagramType: 'frock_gather_skirt',
      },
      {
        stepNumber: 4,
        title: 'Join Bodice to Gathered Skirt',
        instruction: `Pull bobbin threads gently to gather skirt evenly until width matches the ${bodiceW} cm bodice waistline. Pin right sides facing, matching side markers. Stitch waist seam at 1.0 cm allowance and press upward.`,
        audioText: `Step 4: Gather skirt evenly to fit ${bodiceW} cm bodice waist. Stitch waist seam with one centimeter allowance.`,
        diagramType: 'frock_join_waist',
      },
      {
        stepNumber: 5,
        title: 'Attach Skirt Hem Border Band',
        instruction: `Pin hem border band (${finishedW} cm) to bottom edge of skirt with right sides facing. Stitch at 1.0 cm seam allowance. Press seam downward. Topstitch 2 mm along border band.`,
        audioText: 'Step 5: Pin hem border band to bottom of skirt and stitch. Press seam downward and topstitch.',
        diagramType: 'frock_hem_band',
      },
      {
        stepNumber: 6,
        title: 'Side Seams & Strap Fastening',
        instruction: 'Pin and stitch side seams continuously from armhole down to skirt hem. Anchor shoulder straps securely into front and back bodice armholes. Turn right side out and give final steam press.',
        audioText: 'Step 6: Stitch side seams from armhole to hem. Anchor shoulder straps and steam press.',
        diagramType: 'frock_finish',
      },
    ];
  }

  if (construction === 'tee') {
    return [
      {
        stepNumber: 1,
        title: 'Piece Patchwork Scrap Panels',
        instruction: `Arrange scrap pieces for sleeves and accent panels according to the cut blueprint. Join with 1.0 cm (0.4 in) seam allowance and press all seams open flat to prevent bulk.`,
        audioText: 'Step 1: Piece scrap panels with one centimeter seam allowance and press open flat.',
        diagramType: 'tee_piece_sleeves',
      },
      {
        stepNumber: 2,
        title: 'Assemble Shoulder Seams',
        instruction: 'Align front and back body panels with right sides facing. Pin and stitch shoulder seams at 1.0 cm seam allowance, inserting stay-tape inside the seam to prevent stretching.',
        audioText: 'Step 2: Align front and back panels and stitch shoulder seams with stay-tape.',
        diagramType: 'tee_assemble_shoulders',
      },
      {
        stepNumber: 3,
        title: 'Set In Sleeves to Armholes',
        instruction: 'Open the body flat. Match sleeve cap center notch to shoulder seam. Pin sleeve edge along the armhole curve and stitch with 1.0 cm seam allowance. Press seam toward sleeves.',
        audioText: 'Step 3: Pin sleeve cap to armhole matching notches and stitch with one centimeter seam allowance.',
        diagramType: 'tee_insert_sleeves',
      },
      {
        stepNumber: 4,
        title: 'Continuous Side & Underarm Seams',
        instruction: 'Fold garment right sides facing. Align underarm sleeve cross-seams and side edges. Stitch continuously from sleeve cuff down along the underarm to the bottom hem.',
        audioText: 'Step 4: Stitch side seams continuously from sleeve cuff down to bottom hem.',
        diagramType: 'tee_side_seams',
      },
      {
        stepNumber: 5,
        title: 'Attach Ribbed Neckband',
        instruction: 'Fold neckband strip lengthwise with wrong sides together. Pin to neckline opening evenly matching quarter marks. Stitch stretching neckband slightly to fit. Press seam allowance downward.',
        audioText: 'Step 5: Fold neckband and stitch to neckline opening stretching slightly.',
        diagramType: 'tee_neckband',
      },
      {
        stepNumber: 6,
        title: 'Hem Sleeves, Body & Steam Press',
        instruction: 'Double-fold sleeve cuffs (1.5 cm) and lower body hem (2.0 cm). Stitch with twin needle or flexible stretch stitch. Give the finished garment a comprehensive final steam press.',
        audioText: 'Step 6: Hem sleeve cuffs and bottom edge, then steam press.',
        diagramType: 'tee_finish',
      },
    ];
  }

  if (construction === 'trousers') {
    return [
      {
        stepNumber: 1,
        title: 'Assemble Patchwork Leg Panels',
        instruction: 'Arrange and stitch scrap pieces for front and back leg panels according to cut blueprint. Stitch with 1.0 cm seam allowance and press all seams open flat.',
        audioText: 'Step 1: Assemble scrap patchwork leg panels and press all seams open.',
        diagramType: 'trousers_piece_panels',
      },
      {
        stepNumber: 2,
        title: 'Attach Side Pockets',
        instruction: 'Pin pocket bag facing to front waist and upper side seam with right sides facing. Stitch pocket opening at 0.7 cm, understitch, turn inside, and press.',
        audioText: 'Step 2: Pin pocket facings to front waist and side seam, stitch and press.',
        diagramType: 'trousers_pockets',
      },
      {
        stepNumber: 3,
        title: 'Stitch Inseam / Inner Leg Seams',
        instruction: 'Place front and back leg panels right sides facing. Pin and stitch inner leg seam from crotch curve down to bottom ankle hem with 1.0 cm seam allowance.',
        audioText: 'Step 3: Stitch inner leg seams from crotch to ankle hem with one centimeter allowance.',
        diagramType: 'trousers_inseam',
      },
      {
        stepNumber: 4,
        title: 'Join Center Crotch Curve',
        instruction: 'Turn one leg right side out and slip it inside the other leg (right sides facing). Align inseam junction and pin center crotch curve. Stitch twice for seam strength.',
        audioText: 'Step 4: Slip one leg inside the other, pin crotch curve and stitch securely.',
        diagramType: 'trousers_crotch',
      },
      {
        stepNumber: 5,
        title: 'Construct Elastic Waistband Casing',
        instruction: 'Fold top waistband edge down 3.5 cm to form elastic casing. Stitch along bottom fold leaving a 4 cm opening. Thread 2.5 cm elastic through, overlap ends 2 cm, stitch secure, and close opening.',
        audioText: 'Step 5: Fold waistband casing, thread elastic through, and stitch closed.',
        diagramType: 'trousers_waistband',
      },
      {
        stepNumber: 6,
        title: 'Hem Ankle Cuffs & Steam Press',
        instruction: 'Double-fold ankle cuffs (1.5 cm) and edge-stitch around circumference. Turn trousers right side out and steam press leg creases flat.',
        audioText: 'Step 6: Hem ankle cuffs and steam press leg creases.',
        diagramType: 'trousers_finish',
      },
    ];
  }

  // Fallback generic 4-step assembly
  return [
    {
      stepNumber: 1,
      title: 'Piece Patchwork Scrap Panels',
      instruction: `Assemble scrap pieces according to pattern layout. Join with 1.0 cm seam allowance and press open flat.`,
      audioText: 'Step 1: Assemble scrap pieces with one centimeter seam allowance and press open.',
      diagramType: 'pouch_piece_patches',
    },
    {
      stepNumber: 2,
      title: 'Assemble Garment Panels',
      instruction: 'Join body panels and sleeves matching alignment notches.',
      audioText: 'Step 2: Join body panels and sleeves matching notches.',
      diagramType: 'tote_assemble_body',
    },
    {
      stepNumber: 3,
      title: 'Finish Structural Seams',
      instruction: 'Stitch side and closing seams. Finish raw seam allowances with overlock or zigzag stitch.',
      audioText: 'Step 3: Stitch side and closing seams and finish raw edges.',
      diagramType: 'pouch_join_lower',
    },
    {
      stepNumber: 4,
      title: 'Hemming & Final Press',
      instruction: 'Hem edges and steam press flat for a professional finish.',
      audioText: 'Step 4: Hem edges and steam press flat.',
      diagramType: 'pouch_finish',
    },
  ];
}

// Backwards-compatible export
export const PRODUCT_STITCHING_STEPS = {
  pouch: getProductStitchingSteps('pouch', 'small'),
  tote_bag: getProductStitchingSteps('tote_bag', 'medium'),
  cushion_cover: getProductStitchingSteps('cushion_cover', 'medium'),
  kids_frock: getProductStitchingSteps('kids_frock', '2-3y'),
};

/**
 * Materials list definitions per product, dynamically adapted to size.
 * Hand-typed notions, prices and times marked as typical defaults, to be verified by a tailor.
 */
export function getProductMaterialsList(productId, sizeKeyOrDesign, maybeDesign) {
  const design = typeof sizeKeyOrDesign === 'object' && sizeKeyOrDesign !== null ? sizeKeyOrDesign : (maybeDesign || {});
  const sizeKey = typeof sizeKeyOrDesign === 'string' ? sizeKeyOrDesign : (design.sizeKey || 'small');
  const prod = PRODUCT_TEMPLATES[productId] || design.spec;

  const scrapsCount = design?.placements?.reduce((sum, p) => sum + (p.scraps?.length || 1), 0) || 0;
  const wastePct = design?.wastePercentage || 0;
  const seamsCount = design?.totalExtraSeams || 0;

  const baseMaterials = [
    {
      name: 'Fabric Scraps (Pieced)',
      spec: `${scrapsCount} cut pieces, 100% cotton (medium weight, non-stretchy)`,
      qty: `${scrapsCount} scraps`,
      source: 'Scrap pile',
      note: `Seam joins: ${seamsCount} seams. Scrap waste: ${wastePct}%.`,
      disclaimer: TYPICAL_DEFAULTS_DISCLAIMER,
    },
    {
      name: 'Sewing Thread',
      spec: '40/2 or 50/2 Spun Polyester / Cotton thread, color-matched to base anchor',
      qty: '1 spool (150 m)',
      source: 'Standard sewing notion',
      note: `Needle: universal size 14/90 (${TYPICAL_DEFAULTS_DISCLAIMER})`,
      disclaimer: TYPICAL_DEFAULTS_DISCLAIMER,
    },
  ];

  // 1. Explicit materials in spec
  if (prod?.materials) {
    const rawList = typeof prod.materials === 'function' ? prod.materials(sizeKey, design) : prod.materials;
    if (Array.isArray(rawList)) {
      return rawList.map((m) => ({
        ...m,
        disclaimer: m.disclaimer || TYPICAL_DEFAULTS_DISCLAIMER,
        note: m.note ? (m.note.includes('tailor') ? m.note : `${m.note} (${TYPICAL_DEFAULTS_DISCLAIMER})`) : TYPICAL_DEFAULTS_DISCLAIMER,
      }));
    }
  }

  // 2. Materials chosen from construction field
  const construction = prod?.construction || (
    productId === 'kids_frock' ? 'skirt' :
    productId === 'tote_bag' ? 'bag' :
    productId === 'child_top' ? 'tee' :
    productId === 'cushion_cover' ? 'cushion' :
    productId === 'pouch' ? 'pouch' :
    productId
  );

  if (construction === 'pouch') {
    const zipperLength = sizeKey === 'small' ? '15 cm (6 in)' : (sizeKey === 'large' ? '30 cm (12 in)' : '25 cm (10 in)');
    const interfacingDim = sizeKey === 'small' ? '8 × 8 cm (3 × 3 in)' : (sizeKey === 'large' ? '14 × 14 cm (5.5 × 5.5 in)' : '10 × 10 cm (4 × 4 in)');
    return [
      ...baseMaterials,
      {
        name: 'Zipper',
        spec: `No. 3 or No. 5 Nylon Coil Zipper with closed end (matching ${sizeKey} pouch width)`,
        qty: `1 piece (${zipperLength})`,
        source: 'Notions',
        note: `Includes 1 matching metal slider pull (${TYPICAL_DEFAULTS_DISCLAIMER})`,
        disclaimer: TYPICAL_DEFAULTS_DISCLAIMER,
      },
      {
        name: 'Fusible Interfacing (Optional)',
        spec: 'Lightweight woven fusible interfacing for tab reinforcement',
        qty: interfacingDim,
        source: 'Supporting notion',
        note: `Improves durability around zipper pull ends (${TYPICAL_DEFAULTS_DISCLAIMER})`,
        disclaimer: TYPICAL_DEFAULTS_DISCLAIMER,
      },
    ];
  }

  if (construction === 'bag') {
    const handlesLength = sizeKey === 'small' ? '50 cm (20 in)' : (sizeKey === 'large' ? '70 cm (28 in)' : '60 cm (24 in)');
    const gussetDim = sizeKey === 'small' ? '28 × 8 cm (11 × 3.1 in)' : (sizeKey === 'large' ? '44 × 12 cm (17.3 × 4.7 in)' : '36 × 10 cm (14.2 × 3.9 in)');
    return [
      ...baseMaterials,
      {
        name: 'Handle Reinforcement Webbing / Interfacing',
        spec: 'Heavy cotton webbing (3 cm width) or medium fusible interfacing for handles',
        qty: `2 strips × ${handlesLength}`,
        source: 'Notions',
        note: `Reinforces carry straps for loads (${TYPICAL_DEFAULTS_DISCLAIMER})`,
        disclaimer: TYPICAL_DEFAULTS_DISCLAIMER,
      },
      {
        name: 'Base Gusset Reinforcement',
        spec: 'Dense canvas or heavyweight denim scrap for bottom abrasion resistance',
        qty: `1 piece (${gussetDim})`,
        source: 'Scrap pile / base',
        note: `Pre-stitched to bottom fold for structure (${TYPICAL_DEFAULTS_DISCLAIMER})`,
        disclaimer: TYPICAL_DEFAULTS_DISCLAIMER,
      },
    ];
  }

  if (construction === 'cushion') {
    const insertDim = sizeKey === 'small' ? '30 × 30 cm (12 × 12 in)' : (sizeKey === 'large' ? '50 × 50 cm (20 × 20 in)' : '40 × 40 cm (16 × 16 in)');
    return [
      ...baseMaterials,
      {
        name: 'Cushion Pad / Insert',
        spec: 'Polyester hollowfiber or feather cushion insert (fits square cover)',
        qty: `1 insert (${insertDim})`,
        source: 'Pillow insert',
        note: `Fits plumply inside cover (${TYPICAL_DEFAULTS_DISCLAIMER})`,
        disclaimer: TYPICAL_DEFAULTS_DISCLAIMER,
      },
    ];
  }

  if (construction === 'skirt') {
    const tapeLength = sizeKey === '0-1y' ? '1.0 meters (40 in)' : (sizeKey === '6-8y' ? '1.6 meters (64 in)' : (sizeKey === '4-5y' ? '1.4 meters (56 in)' : '1.2 meters (48 in)'));
    return [
      ...baseMaterials,
      {
        name: 'Fasteners / Buttons',
        spec: '12 mm shell or pearl buttons for back bodice closure (or cotton tie ribbon)',
        qty: '2 buttons',
        source: 'Notions',
        note: `Smooth child-safe rounded buttons (${TYPICAL_DEFAULTS_DISCLAIMER})`,
        disclaimer: TYPICAL_DEFAULTS_DISCLAIMER,
      },
      {
        name: 'Soft Bias Binding',
        spec: '1/2 inch single fold cotton bias tape for armhole and neckline clean finish',
        qty: tapeLength,
        source: 'Notions',
        note: `Zero chafing on delicate toddler skin (${TYPICAL_DEFAULTS_DISCLAIMER})`,
        disclaimer: TYPICAL_DEFAULTS_DISCLAIMER,
      },
    ];
  }

  if (construction === 'tee') {
    return [
      ...baseMaterials,
      {
        name: 'Ribbed Collar Band',
        spec: '1×1 cotton / elastane rib knit (4 cm width) for comfortable neckline recovery',
        qty: '1 strip (45 cm)',
        source: 'Notions',
        note: `Stretches to fit neckline circumference (${TYPICAL_DEFAULTS_DISCLAIMER})`,
        disclaimer: TYPICAL_DEFAULTS_DISCLAIMER,
      },
      {
        name: 'Shoulder Stabilizing Stay-Tape',
        spec: 'Clear polyurethane stay-tape or narrow cotton twill ribbon for shoulder seams',
        qty: '2 strips × 12 cm',
        source: 'Notions',
        note: `Prevents shoulder seam sagging during wear (${TYPICAL_DEFAULTS_DISCLAIMER})`,
        disclaimer: TYPICAL_DEFAULTS_DISCLAIMER,
      },
    ];
  }

  if (construction === 'trousers') {
    return [
      ...baseMaterials,
      {
        name: 'Waistband Elastic',
        spec: '2.5 cm (1 in) braided non-roll knit elastic for comfortable waistband casing',
        qty: '1 strip (65 cm)',
        source: 'Notions',
        note: `Adjust to child waist measurement (${TYPICAL_DEFAULTS_DISCLAIMER})`,
        disclaimer: TYPICAL_DEFAULTS_DISCLAIMER,
      },
      {
        name: 'Pocket Lining Fabric',
        spec: 'Lightweight plain woven cotton scrap for inner pocket bags',
        qty: '2 pieces (20 × 20 cm)',
        source: 'Scrap pile / lining',
        note: `Smooth finish inside pocket (${TYPICAL_DEFAULTS_DISCLAIMER})`,
        disclaimer: TYPICAL_DEFAULTS_DISCLAIMER,
      },
    ];
  }

  return baseMaterials;
}

// Default pricing parameters, marked as typical defaults
export function getProductPriceDefaults(productId, estimatedMinutes = 35) {
  const baseDefaults = {
    pouch: { materialCost: 35, laborRatePerHour: 120, extrasCost: 20 },
    tote_bag: { materialCost: 55, laborRatePerHour: 120, extrasCost: 30 },
    cushion_cover: { materialCost: 45, laborRatePerHour: 120, extrasCost: 25 },
    kids_frock: { materialCost: 65, laborRatePerHour: 120, extrasCost: 35 },
    child_top: { materialCost: 50, laborRatePerHour: 120, extrasCost: 25 },
    tee: { materialCost: 50, laborRatePerHour: 120, extrasCost: 25 },
    skirt: { materialCost: 65, laborRatePerHour: 120, extrasCost: 35 },
    bag: { materialCost: 55, laborRatePerHour: 120, extrasCost: 30 },
    cushion: { materialCost: 45, laborRatePerHour: 120, extrasCost: 25 },
    trousers: { materialCost: 55, laborRatePerHour: 120, extrasCost: 30 },
  };

  const def = baseDefaults[productId] || { materialCost: 40, laborRatePerHour: 120, extrasCost: 25 };
  const hours = estimatedMinutes / 60;
  const laborCost = Math.round(hours * def.laborRatePerHour);
  const total = def.materialCost + laborCost + def.extrasCost;

  return {
    currencySymbol: '₹',
    materialCost: def.materialCost,
    laborRatePerHour: def.laborRatePerHour,
    estimatedMinutes,
    laborCost,
    extrasCost: def.extrasCost,
    suggestedPrice: total,
    disclaimer: TYPICAL_DEFAULTS_DISCLAIMER,
    note: `Pricing and sewing times are ${TYPICAL_DEFAULTS_DISCLAIMER}`,
  };
}

/**
 * Main Tailor Blueprint Generator:
 * Takes design output from buildDesign() and constructs the full blueprint model.
 * Piece cut and finished sizes come directly from the selected product size in templates.js.
 */
export function buildTailorBlueprint(design) {
  if (!design || !design.productId) {
    return { error: 'Invalid design provided for tailor blueprint' };
  }

  const { productId, productName, sizeKey, sizeLabel, seamAllowanceCm = 1.0, placements = [] } = design;

  // Retrieve exact template requirements for this product and size
  const template = PRODUCT_TEMPLATES[productId] || design.spec;
  const templateReq = getProductRequirements(template || productId, sizeKey, seamAllowanceCm, design.variant);
  const templateZones = templateReq?.zones || [];

  // Extract individual piece blueprints
  const pieces = placements.map((pl, idx) => {
    const pieceNumber = idx + 1;
    const scraps = pl.scraps || [];

    // Find the corresponding zone definition from templates.js
    const zoneDef = templateZones.find((z) => z.id === pl.zoneId) ||
                    templateZones.find((z) => z.baseZoneId === pl.zoneId) ||
                    templateZones[idx];

    // Accurate cut and finished dimensions from templates.js
    let cutW;
    let cutH;
    let finishedW;
    let finishedH;

    if (zoneDef) {
      cutW = zoneDef.cutWidth;
      cutH = zoneDef.cutHeight;
      finishedW = zoneDef.finishedWidth;
      finishedH = zoneDef.finishedHeight;
    } else if (pl.cutWidth && pl.cutHeight) {
      cutW = pl.cutWidth;
      cutH = pl.cutHeight;
      finishedW = pl.finishedWidth || Math.max(1, cutW - 2 * seamAllowanceCm);
      finishedH = pl.finishedHeight || Math.max(1, cutH - 2 * seamAllowanceCm);
    } else {
      cutW = scraps.length > 0 ? Math.max(...scraps.map((s) => s.cutWidth || 14)) : 14;
      cutH = scraps.length > 0 ? Math.max(...scraps.map((s) => s.cutHeight || 14)) : 14;
      finishedW = Math.max(1, cutW - 2 * seamAllowanceCm);
      finishedH = Math.max(1, cutH - 2 * seamAllowanceCm);
    }

    // Format dual dimensions (cm and inches)
    const cutDim = formatDualDimension(Number(cutW.toFixed(1)), Number(cutH.toFixed(1)));
    const finishedDim = formatDualDimension(Number(finishedW.toFixed(1)), Number(finishedH.toFixed(1)));
    const seamDim = {
      cm: `${seamAllowanceCm} cm`,
      inches: `${cmToInch(seamAllowanceCm, 2)} in`,
    };

    // Grain line direction from data (not hardcoded)
    const rawGrain = zoneDef?.grainLine || pl.grainLine;
    let grainLine;
    if (rawGrain && typeof rawGrain === 'object') {
      const isCross = rawGrain.orientation === 'crosswise' || rawGrain.orientation === 'horizontal';
      grainLine = {
        orientation: rawGrain.orientation || 'lengthwise',
        symbol: rawGrain.symbol || (isCross ? '↔' : '↕'),
        description: rawGrain.description || (isCross ? 'Crosswise grain (weft)' : 'Lengthwise grain (warp)'),
      };
    } else if (typeof rawGrain === 'string') {
      const isCross = rawGrain.toLowerCase().includes('cross') || rawGrain.toLowerCase().includes('horiz');
      grainLine = {
        orientation: isCross ? 'crosswise' : 'lengthwise',
        symbol: isCross ? '↔' : '↕',
        description: isCross ? 'Crosswise grain (weft)' : 'Lengthwise grain (warp parallel to side edges)',
      };
    } else {
      const isCross = cutW > cutH * 1.5;
      grainLine = {
        orientation: isCross ? 'crosswise' : 'lengthwise',
        symbol: isCross ? '↔' : '↕',
        description: isCross ? 'Crosswise grain (weft)' : 'Lengthwise grain (warp parallel to side edges)',
      };
    }

    // Scrap breakdown with trimmed dimensions
    const scrapsList = scraps.map((s, sIdx) => {
      const origW = s.width || s.cutWidth || 14;
      const origH = s.height || s.cutHeight || 14;
      const trimmedW = s.cutWidth || origW;
      const trimmedH = s.cutHeight || origH;

      return {
        index: sIdx + 1,
        scrapId: s.scrapId || s.id || `scrap_${sIdx + 1}`,
        color: s.color || 'neutral',
        colorHex: s.colorHex || '#1E3A8A',
        fabricType: s.fabricType || 'cotton',
        print: s.print || 'plain',
        originalDimensions: formatDualDimension(origW, origH),
        trimmedDimensions: formatDualDimension(trimmedW, trimmedH),
      };
    });

    const scrapsSummary = summarizeScrapsList(scrapsList);

    return {
      pieceNumber,
      zoneId: pl.zoneId,
      name: pl.zoneName || zoneDef?.name || pl.zoneId,
      role: pl.role || zoneDef?.role || 'base',
      cutWidth: Number(cutW.toFixed(1)),
      cutHeight: Number(cutH.toFixed(1)),
      finishedWidth: Number(finishedW.toFixed(1)),
      finishedHeight: Number(finishedH.toFixed(1)),
      cutDimensions: cutDim,
      finishedDimensions: finishedDim,
      seamAllowance: seamDim,
      seamAllowanceCm,
      seamAllowanceIn: cmToInch(seamAllowanceCm, 2),
      grainLine,
      scraps: scrapsList,
      scrapsSummary,
      seamsCount: pl.seamsCount || 0,
      seamType: pl.seamType || 'plain_pressed_open',
      seamNote: pl.note || `${scraps.length} scrap(s) joined with ${pl.seamsCount || 0} seam(s)`,
    };
  });

  const materials = getProductMaterialsList(productId, sizeKey, design);
  const stitchingSteps = getProductStitchingSteps(productId, sizeKey, template);
  const pricing = getProductPriceDefaults(productId, design.estimatedTimeMinutes || 35);

  return {
    productId,
    productName,
    sizeKey,
    sizeLabel,
    disclaimer: TAILOR_DISCLAIMER,
    defaultsDisclaimer: TYPICAL_DEFAULTS_DISCLAIMER,
    designScore: design.designScore || 0,
    estimatedTimeMinutes: design.estimatedTimeMinutes || 35,
    wastePercentage: design.wastePercentage || 0,
    fabricUsedInSeamsCm2: design.fabricUsedInSeamsCm2 || 0,
    totalExtraSeams: design.totalExtraSeams || 0,
    piecesCount: pieces.length,
    pieces,
    materials,
    stitchingSteps,
    pricing,
  };
}
