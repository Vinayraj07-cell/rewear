// src/utils/tailorBlueprintData.js
// Stage 4B: Generates complete tailor blueprint data from buildDesign() output
// For all 4 products (pouch, tote_bag, cushion_cover, kids_frock).

export const TAILOR_DISCLAIMER = 'Measurements to be verified by a tailor';

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

// Tailor Stitching Steps per product
export const PRODUCT_STITCHING_STEPS = {
  pouch: [
    {
      stepNumber: 1,
      title: 'Piece the Scrap Patches',
      instruction: 'Arrange scrap pieces for the front lower panel, back panel, and upper zipper band according to the cut blueprint. Join with 1.0 cm (0.4 in) seam allowance. Press all seams open flat to prevent bulk.',
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
      instruction: 'Place zipper tape face-down on the upper edge of the front zipper band (right sides facing). Stitch along zipper teeth line using a zipper presser foot with 0.8 cm margin.',
      audioText: 'Step 3: Pin zipper tape face down on the upper band and stitch using a zipper foot.',
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
  ],

  tote_bag: [
    {
      stepNumber: 1,
      title: 'Assemble Patchwork Body Panels',
      instruction: 'Join patchwork scrap blocks to construct the front main body (36 × 38 cm) and back main body. Stitch all internal seams at 1.0 cm (0.4 in) seam allowance. Press seams open to ensure a smooth, durable surface.',
      audioText: 'Step 1: Join patchwork blocks for front and back main body panels. Press seams open.',
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
      instruction: 'Position carry handles on the top edge of front and back panels spaced 12 cm apart. Baste in place. Place top facing band right sides facing and stitch top seam with 1.0 cm seam allowance.',
      audioText: 'Step 4: Baste handles onto top edge spaced twelve centimeters apart, then stitch top facing band.',
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
      instruction: 'Pinch each bottom corner into a triangle to form gusset depth (6 cm). Stitch across perpendicular to the seam. Turn bag right side out. Turn top facing inside and topstitch bag rim at 0.5 cm margin.',
      audioText: 'Step 6: Box bottom corners for gusset depth. Turn right side out and topstitch bag rim.',
      diagramType: 'tote_box_corners',
    },
  ],

  cushion_cover: [
    {
      stepNumber: 1,
      title: 'Piece the Front Patchwork Grid',
      instruction: 'Assemble the 9-patch or grid scraps to form the 30 × 30 cm (or 40 × 40 cm) front pillow face. Stitch with 1.0 cm seam allowance, nesting seam intersections. Press all seams open flat.',
      audioText: 'Step 1: Assemble front patchwork grid scraps. Nest seam intersections and press seams open.',
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
      instruction: 'Lay the front patchwork panel right side up. Lay the upper back piece right side down aligning top and side edges. Lay the lower back piece right side down overlapping the upper piece by 8 cm.',
      audioText: 'Step 4: Lay front panel right side up. Overlay upper and lower back flaps right sides facing.',
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
      instruction: 'Turn cushion cover right side out through the envelope overlap opening. Gently push out all 4 corners with a point turner. Steam press edges flat. Insert pillow pad to test fit.',
      audioText: 'Step 6: Turn right side out through envelope opening. Push out corners and steam press.',
      diagramType: 'cushion_finish',
    },
  ],

  kids_frock: [
    {
      stepNumber: 1,
      title: 'Assemble Chest Bodice Panels',
      instruction: 'Join scrap pieces for front and back chest bodice. Stitch center seams with 1.0 cm seam allowance. Press seams open flat. Finish neckline edges with narrow double turn hem or bias tape.',
      audioText: 'Step 1: Assemble front and back chest bodice pieces. Press seams open and finish neckline.',
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
      instruction: 'Piece the patchwork skirt panels together. Run two parallel rows of long basting stitches (stitch length 4.5 mm) along the upper skirt edge, 0.5 cm and 1.2 cm from raw edge.',
      audioText: 'Step 3: Piece skirt panels and run two parallel gathering basting threads along top edge.',
      diagramType: 'frock_gather_skirt',
    },
    {
      stepNumber: 4,
      title: 'Join Bodice to Gathered Skirt',
      instruction: 'Pull bobbin threads gently to gather skirt evenly until width matches the bodice waistline. Pin right sides facing, matching side markers. Stitch waist seam at 1.0 cm allowance and press upward.',
      audioText: 'Step 4: Gather skirt evenly to fit bodice waist. Stitch waist seam with one centimeter allowance.',
      diagramType: 'frock_join_waist',
    },
    {
      stepNumber: 5,
      title: 'Attach Skirt Hem Border Band',
      instruction: 'Pin hem border band to bottom edge of skirt with right sides facing. Stitch at 1.0 cm seam allowance. Press seam downward. Topstitch 2 mm along border band.',
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
  ],
};

// Materials list definitions per product
export function getProductMaterialsList(productId, design) {
  const scrapsCount = design?.placements?.reduce((sum, p) => sum + (p.scraps?.length || 1), 0) || 0;
  const wastePct = design?.wastePercentage || 0;
  const seamsCount = design?.totalExtraSeams || 0;

  const baseMaterials = [
    {
      name: 'Fabric Scraps (Pieced)',
      spec: `${scrapsCount} cut pieces, 100% cotton (medium weight, non-stretchy)`,
      qty: `${scrapsCount} scraps`,
      source: 'Scrap pile',
      note: `Seam joins: ${seamsCount} seams. Scrap waste: ${wastePct}%`,
    },
    {
      name: 'Sewing Thread',
      spec: '40/2 or 50/2 Spun Polyester / Cotton thread, color-matched to base anchor',
      qty: '1 spool (150 m)',
      source: 'Standard sewing notion',
      note: 'Needle recommendation: Singer size 14/90 (universal point)',
    },
  ];

  if (productId === 'pouch') {
    return [
      ...baseMaterials,
      {
        name: 'Zipper',
        spec: 'No. 3 or No. 5 Nylon Coil Zipper with closed end (matching pouch width)',
        qty: '1 piece (20 cm / 8 in)',
        source: 'Notions',
        note: 'Includes 1 matching metal slider pull',
      },
      {
        name: 'Fusible Interfacing (Optional)',
        spec: 'Lightweight woven fusible interfacing for tab reinforcement',
        qty: '10 × 10 cm (4 × 4 in)',
        source: 'Supporting notion',
        note: 'Improves durability around zipper pull ends',
      },
    ];
  }

  if (productId === 'tote_bag') {
    return [
      ...baseMaterials,
      {
        name: 'Handle Reinforcement Webbing / Interfacing',
        spec: 'Heavy cotton webbing (3 cm width) or medium fusible interfacing for handles',
        qty: '2 strips × 60 cm (24 in)',
        source: 'Notions',
        note: 'Reinforces shoulder carry straps for heavy loads (up to 8 kg)',
      },
      {
        name: 'Base Gusset Reinforcement',
        spec: 'Dense canvas or heavyweight denim scrap for bottom abrasion resistance',
        qty: '1 piece (38 × 12 cm)',
        source: 'Scrap pile / base',
        note: 'Pre-stitched to bottom fold for structure',
      },
    ];
  }

  if (productId === 'cushion_cover') {
    return [
      ...baseMaterials,
      {
        name: 'Cushion Pad / Insert',
        spec: 'Polyester hollowfiber or feather cushion insert (fits square cover)',
        qty: '1 insert (30 × 30 cm or 40 × 40 cm)',
        source: 'Pillow insert',
        note: '1 to 2 cm larger than cover for plump, firm appearance',
      },
    ];
  }

  if (productId === 'kids_frock') {
    return [
      ...baseMaterials,
      {
        name: 'Fasteners / Buttons',
        spec: '12 mm shell or pearl buttons for back bodice closure (or cotton tie ribbon)',
        qty: '2 buttons',
        source: 'Notions',
        note: 'Smooth child-safe rounded buttons with reinforced stitch anchors',
      },
      {
        name: 'Soft Bias Binding',
        spec: '1/2 inch single fold cotton bias tape for armhole and neckline clean finish',
        qty: '1.2 meters (48 in)',
        source: 'Notions',
        note: 'Ensures zero chafing on delicate toddler skin',
      },
    ];
  }

  return baseMaterials;
}

// Default pricing parameters
export function getProductPriceDefaults(productId, estimatedMinutes = 35) {
  const baseDefaults = {
    pouch: { materialCost: 35, laborRatePerHour: 120, extrasCost: 20 },
    tote_bag: { materialCost: 55, laborRatePerHour: 120, extrasCost: 30 },
    cushion_cover: { materialCost: 45, laborRatePerHour: 120, extrasCost: 25 },
    kids_frock: { materialCost: 65, laborRatePerHour: 120, extrasCost: 35 },
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
  };
}

/**
 * Main Tailor Blueprint Generator:
 * Takes design output from buildDesign() and constructs the full blueprint model.
 */
export function buildTailorBlueprint(design) {
  if (!design || !design.productId) {
    return { error: 'Invalid design provided for tailor blueprint' };
  }

  const { productId, productName, sizeKey, sizeLabel, seamAllowanceCm = 1.0, placements = [] } = design;

  // Extract individual piece blueprints
  const pieces = placements.map((pl, idx) => {
    const pieceNumber = idx + 1;
    const scraps = pl.scraps || [];

    // Calculate dimensions
    // Width and height in cm:
    const cutW = scraps.length > 0 
      ? Math.max(...scraps.map(s => s.cutWidth || 14))
      : 14;
    const cutH = scraps.length > 0 
      ? Math.max(...scraps.map(s => s.cutHeight || 14))
      : 14;

    const finishedW = Math.max(1, cutW - 2 * seamAllowanceCm);
    const finishedH = Math.max(1, cutH - 2 * seamAllowanceCm);

    // Format dual dimensions
    const cutDim = formatDualDimension(Number(cutW.toFixed(1)), Number(cutH.toFixed(1)));
    const finishedDim = formatDualDimension(Number(finishedW.toFixed(1)), Number(finishedH.toFixed(1)));
    const seamDim = {
      cm: `${seamAllowanceCm} cm`,
      inches: `${cmToInch(seamAllowanceCm, 2)} in`,
    };

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

    return {
      pieceNumber,
      zoneId: pl.zoneId,
      name: pl.zoneName || pl.zoneId,
      role: pl.role || 'base',
      cutDimensions: cutDim,
      finishedDimensions: finishedDim,
      seamAllowance: seamDim,
      seamAllowanceCm,
      seamAllowanceIn: cmToInch(seamAllowanceCm, 2),
      grainLine: {
        orientation: 'lengthwise',
        symbol: '↕',
        description: 'Lengthwise grain (warp parallel to side edges)',
      },
      scraps: scrapsList,
      seamsCount: pl.seamsCount || 0,
      seamType: pl.seamType || 'plain_pressed_open',
      seamNote: pl.note || `${scraps.length} scrap(s) joined with ${pl.seamsCount || 0} seam(s)`,
    };
  });

  const materials = getProductMaterialsList(productId, design);
  const stitchingSteps = PRODUCT_STITCHING_STEPS[productId] || [];
  const pricing = getProductPriceDefaults(productId, design.estimatedTimeMinutes || 35);

  return {
    productId,
    productName,
    sizeKey,
    sizeLabel,
    disclaimer: TAILOR_DISCLAIMER,
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
