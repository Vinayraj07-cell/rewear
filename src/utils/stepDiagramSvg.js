// src/utils/stepDiagramSvg.js
// Stage 4B / Q4: Standalone SVG diagram generators for assembly stitching steps
// Renders clean, crisp 120x80 vector illustrations used by both in-app screen and PDFKit (via svg-to-pdfkit)

export function getStepSvgString(type, stepNumber = 1, context = {}) {
  const stepBadge = `
    <rect x="3" y="3" width="14" height="10" rx="3" fill="#047857" />
    <text x="10" y="10.5" fill="#FFFFFF" font-family="Helvetica, Arial, sans-serif" font-size="7" font-weight="bold" text-anchor="middle">${stepNumber}</text>
  `;

  let body = '';

  switch (type) {
    // ==========================================
    // POUCH DIAGRAMS
    // ==========================================
    case 'pouch_piece_patches':
      body = `
        <rect x="22" y="18" width="34" height="44" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1" rx="1" />
        <rect x="58" y="18" width="34" height="44" fill="#FED7AA" stroke="#C2410C" stroke-width="1" rx="1" />
        <line x1="57" y1="18" x2="57" y2="62" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="3,2" />
        <text x="57" y="70" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#EF4444" font-weight="bold" text-anchor="middle">1.0 cm seam</text>
      `;
      break;

    case 'pouch_side_tabs':
      body = `
        <rect x="35" y="22" width="50" height="38" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1" rx="1" />
        <rect x="26" y="28" width="9" height="12" fill="#F97316" stroke="#9A3412" stroke-width="0.8" rx="1" />
        <rect x="85" y="28" width="9" height="12" fill="#F97316" stroke="#9A3412" stroke-width="0.8" rx="1" />
        <line x1="33" y1="28" x2="33" y2="40" stroke="#047857" stroke-width="1" stroke-dasharray="2,1" />
        <line x1="87" y1="28" x2="87" y2="40" stroke="#047857" stroke-width="1" stroke-dasharray="2,1" />
        <text x="60" y="70" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#047857" font-weight="bold" text-anchor="middle">Baste Tabs 0.5 cm</text>
      `;
      break;

    case 'pouch_insert_zipper':
      body = `
        <rect x="25" y="28" width="70" height="20" fill="#FED7AA" stroke="#C2410C" stroke-width="1" rx="1" />
        <rect x="25" y="22" width="70" height="8" fill="#475569" rx="1" />
        <line x1="25" y1="26" x2="95" y2="26" stroke="#CBD5E1" stroke-width="1" stroke-dasharray="2,1.5" />
        <line x1="25" y1="29" x2="95" y2="29" stroke="#EF4444" stroke-width="1.2" stroke-dasharray="3,2" />
        <text x="60" y="65" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#334155" font-weight="bold" text-anchor="middle">Zipper Face-Down</text>
      `;
      break;

    case 'pouch_topstitch_zipper':
      body = `
        <rect x="25" y="30" width="70" height="28" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1" rx="1" />
        <rect x="25" y="16" width="70" height="14" fill="#475569" rx="1" />
        <line x1="25" y1="23" x2="95" y2="23" stroke="#CBD5E1" stroke-width="1" stroke-dasharray="2,1.5" />
        <line x1="25" y1="32" x2="95" y2="32" stroke="#FFFFFF" stroke-width="1" stroke-dasharray="2,2" />
        <text x="60" y="68" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#047857" font-weight="bold" text-anchor="middle">Topstitch 2 mm</text>
      `;
      break;

    case 'pouch_join_lower':
      body = `
        <rect x="28" y="18" width="64" height="14" fill="#FED7AA" stroke="#C2410C" stroke-width="1" rx="1" />
        <rect x="28" y="32" width="64" height="30" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1" rx="1" />
        <line x1="28" y1="32" x2="92" y2="32" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="3,2" />
        <text x="60" y="70" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#EF4444" font-weight="bold" text-anchor="middle">Join 1.0 cm seam</text>
      `;
      break;

    case 'pouch_finish':
      body = `
        <rect x="30" y="20" width="60" height="42" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1.2" rx="3" />
        <line x1="30" y1="26" x2="90" y2="26" stroke="#475569" stroke-width="2" stroke-dasharray="3,1" />
        <circle cx="55" cy="26" r="3" fill="#0F172A" />
        <path d="M 33 28 L 33 59 L 87 59 L 87 28" fill="none" stroke="#EF4444" stroke-width="1.2" stroke-dasharray="3,2" />
        <text x="60" y="70" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#047857" font-weight="bold" text-anchor="middle">Stitch 3 Sides &amp; Turn</text>
      `;
      break;

    // ==========================================
    // TOTE BAG DIAGRAMS
    // ==========================================
    case 'tote_assemble_body':
      body = `
        <rect x="32" y="16" width="56" height="48" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1.2" rx="2" />
        <line x1="32" y1="32" x2="88" y2="32" stroke="#EF4444" stroke-width="1" stroke-dasharray="3,2" />
        <line x1="32" y1="48" x2="88" y2="48" stroke="#EF4444" stroke-width="1" stroke-dasharray="3,2" />
        <line x1="60" y1="16" x2="60" y2="64" stroke="#EF4444" stroke-width="1" stroke-dasharray="3,2" />
        <text x="60" y="71" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#1E3A8A" font-weight="bold" text-anchor="middle">Piece Body Panels</text>
      `;
      break;

    case 'tote_construct_handles':
      body = `
        <rect x="25" y="30" width="70" height="16" fill="#FED7AA" stroke="#C2410C" stroke-width="1" rx="1" />
        <line x1="25" y1="32" x2="95" y2="32" stroke="#047857" stroke-width="1" stroke-dasharray="2,1.5" />
        <line x1="25" y1="44" x2="95" y2="44" stroke="#047857" stroke-width="1" stroke-dasharray="2,1.5" />
        <text x="60" y="58" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#047857" font-weight="bold" text-anchor="middle">Edge-Stitch Both Sides</text>
      `;
      break;

    case 'tote_attach_pocket':
      body = `
        <rect x="30" y="16" width="60" height="50" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1.2" rx="2" />
        <rect x="46" y="30" width="28" height="24" fill="#FED7AA" stroke="#C2410C" stroke-width="1" rx="1.5" />
        <line x1="46" y1="30" x2="74" y2="30" stroke="#047857" stroke-width="1.2" />
        <text x="60" y="71" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#C2410C" font-weight="bold" text-anchor="middle">Center Patch Pocket</text>
      `;
      break;

    case 'tote_attach_facing':
      body = `
        <rect x="30" y="24" width="60" height="42" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1.2" rx="2" />
        <path d="M 44 24 C 44 8, 76 8, 76 24" fill="none" stroke="#F97316" stroke-width="3" />
        <rect x="30" y="24" width="60" height="12" fill="#FED7AA" stroke="#C2410C" stroke-width="1" />
        <line x1="30" y1="24" x2="90" y2="24" stroke="#EF4444" stroke-width="1.2" stroke-dasharray="3,2" />
        <text x="60" y="72" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#047857" font-weight="bold" text-anchor="middle">Facing &amp; Handles</text>
      `;
      break;

    case 'tote_seam_sides':
      body = `
        <rect x="32" y="18" width="56" height="48" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1" rx="2" />
        <path d="M 32 18 L 32 66 L 88 66 L 88 18" fill="none" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="3,2" />
        <text x="60" y="73" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#EF4444" font-weight="bold" text-anchor="middle">Stitch Sides &amp; Bottom</text>
      `;
      break;

    case 'tote_box_corners':
      body = `
        <path d="M 40 20 L 80 20 L 80 50 L 70 60 L 50 60 L 40 50 Z" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1.2" />
        <line x1="45" y1="46" x2="55" y2="56" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="2,2" />
        <line x1="75" y1="46" x2="65" y2="56" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="2,2" />
        <text x="60" y="70" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#047857" font-weight="bold" text-anchor="middle">Box Bottom Corners</text>
      `;
      break;

    // ==========================================
    // CUSHION COVER DIAGRAMS
    // ==========================================
    case 'cushion_piece_front':
      body = `
        <rect x="30" y="16" width="60" height="48" fill="#E2E8F0" stroke="#0F172A" stroke-width="1.2" />
        <line x1="50" y1="16" x2="50" y2="64" stroke="#EF4444" stroke-width="1" stroke-dasharray="2,2" />
        <line x1="70" y1="16" x2="70" y2="64" stroke="#EF4444" stroke-width="1" stroke-dasharray="2,2" />
        <line x1="30" y1="32" x2="90" y2="32" stroke="#EF4444" stroke-width="1" stroke-dasharray="2,2" />
        <line x1="30" y1="48" x2="90" y2="48" stroke="#EF4444" stroke-width="1" stroke-dasharray="2,2" />
        <text x="60" y="71" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#0F172A" font-weight="bold" text-anchor="middle">Assemble Front Grid</text>
      `;
      break;

    case 'cushion_hem_top':
      body = `
        <rect x="30" y="18" width="60" height="34" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1" />
        <rect x="30" y="44" width="60" height="8" fill="#BFDBFE" stroke="#1E3A8A" stroke-width="0.8" />
        <line x1="30" y1="48" x2="90" y2="48" stroke="#047857" stroke-width="1" stroke-dasharray="2,1.5" />
        <text x="60" y="68" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#047857" font-weight="bold" text-anchor="middle">Double-Fold Hem Upper Flap</text>
      `;
      break;

    case 'cushion_hem_bottom':
      body = `
        <rect x="30" y="26" width="60" height="34" fill="#FED7AA" stroke="#C2410C" stroke-width="1" />
        <rect x="30" y="26" width="60" height="8" fill="#FFEDD5" stroke="#C2410C" stroke-width="0.8" />
        <line x1="30" y1="30" x2="90" y2="30" stroke="#047857" stroke-width="1" stroke-dasharray="2,1.5" />
        <text x="60" y="68" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#047857" font-weight="bold" text-anchor="middle">Double-Fold Hem Lower Flap</text>
      `;
      break;

    case 'cushion_layer_flaps':
      body = `
        <rect x="30" y="16" width="60" height="48" fill="#E2E8F0" stroke="#0F172A" stroke-width="1" />
        <rect x="30" y="16" width="60" height="30" fill="#DBEAFE" fill-opacity="0.7" stroke="#1E3A8A" stroke-width="0.8" />
        <rect x="30" y="34" width="60" height="30" fill="#FED7AA" fill-opacity="0.7" stroke="#C2410C" stroke-width="0.8" />
        <line x1="30" y1="34" x2="90" y2="34" stroke="#9A3412" stroke-width="1" stroke-dasharray="2,1" />
        <text x="60" y="71" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#0F172A" font-weight="bold" text-anchor="middle">Overlap Envelope Flaps</text>
      `;
      break;

    case 'cushion_stitch_perimeter':
      body = `
        <rect x="32" y="18" width="56" height="44" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1.2" />
        <rect x="35" y="21" width="50" height="38" fill="none" stroke="#EF4444" stroke-width="1.2" stroke-dasharray="3,2" />
        <text x="60" y="70" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#EF4444" font-weight="bold" text-anchor="middle">Stitch All 4 Perimeter Edges</text>
      `;
      break;

    case 'cushion_finish':
      body = `
        <rect x="34" y="20" width="52" height="42" rx="4" fill="#FEF3C7" stroke="#D97706" stroke-width="1.2" />
        <line x1="36" y1="38" x2="84" y2="38" stroke="#B45309" stroke-width="1" stroke-dasharray="3,1" />
        <text x="60" y="70" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#B45309" font-weight="bold" text-anchor="middle">Turn Right Side Out &amp; Press</text>
      `;
      break;

    // ==========================================
    // KIDS FROCK DIAGRAMS
    // ==========================================
    case 'frock_bodice':
      body = `
        <path d="M 40 22 L 80 22 L 76 46 L 44 46 Z" fill="#FED7AA" stroke="#C2410C" stroke-width="1.2" />
        <path d="M 52 22 Q 60 30 68 22" fill="none" stroke="#047857" stroke-width="1.2" />
        <line x1="60" y1="22" x2="60" y2="46" stroke="#EF4444" stroke-width="1" stroke-dasharray="2,2" />
        <text x="60" y="60" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#C2410C" font-weight="bold" text-anchor="middle">Piece Bodice &amp; Neckline</text>
      `;
      break;

    case 'frock_straps':
      body = `
        <rect x="25" y="26" width="70" height="8" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1" rx="1" />
        <rect x="25" y="38" width="70" height="8" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1" rx="1" />
        <line x1="25" y1="30" x2="95" y2="30" stroke="#047857" stroke-width="0.8" stroke-dasharray="2,1" />
        <line x1="25" y1="42" x2="95" y2="42" stroke="#047857" stroke-width="0.8" stroke-dasharray="2,1" />
        <text x="60" y="60" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#047857" font-weight="bold" text-anchor="middle">Fold &amp; Stitch Shoulder Ties</text>
      `;
      break;

    case 'frock_gather_skirt':
      body = `
        <rect x="25" y="22" width="70" height="36" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1" rx="1" />
        <line x1="25" y1="25" x2="95" y2="25" stroke="#EF4444" stroke-width="1" stroke-dasharray="1.5,1.5" />
        <line x1="25" y1="28" x2="95" y2="28" stroke="#EF4444" stroke-width="1" stroke-dasharray="1.5,1.5" />
        <text x="60" y="68" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#EF4444" font-weight="bold" text-anchor="middle">Parallel Gathering Threads</text>
      `;
      break;

    case 'frock_join_waist':
      body = `
        <path d="M 44 18 L 76 18 L 73 32 L 47 32 Z" fill="#FED7AA" stroke="#C2410C" stroke-width="1" />
        <path d="M 47 32 L 73 32 L 85 58 L 35 58 Z" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1" />
        <line x1="47" y1="32" x2="73" y2="32" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="2,2" />
        <text x="60" y="68" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#047857" font-weight="bold" text-anchor="middle">Join Waist Seam 1 cm</text>
      `;
      break;

    case 'frock_hem_band':
      body = `
        <rect x="30" y="22" width="60" height="28" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1" />
        <rect x="30" y="50" width="60" height="10" fill="#FED7AA" stroke="#C2410C" stroke-width="1" />
        <line x1="30" y1="50" x2="90" y2="50" stroke="#EF4444" stroke-width="1.2" stroke-dasharray="2,2" />
        <text x="60" y="69" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#C2410C" font-weight="bold" text-anchor="middle">Attach Hem Border Band</text>
      `;
      break;

    case 'frock_finish':
      body = `
        <path d="M 46 16 L 74 16 L 72 28 L 48 28 Z" fill="#FED7AA" stroke="#C2410C" stroke-width="1" />
        <path d="M 48 28 L 72 28 L 84 56 L 36 56 Z" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1" />
        <line x1="46" y1="16" x2="42" y2="8" stroke="#F97316" stroke-width="2" />
        <line x1="74" y1="16" x2="78" y2="8" stroke="#F97316" stroke-width="2" />
        <text x="60" y="68" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#047857" font-weight="bold" text-anchor="middle">Final Side Seams &amp; Press</text>
      `;
      break;

    // ==========================================
    // TEE / TOP DIAGRAMS
    // ==========================================
    case 'tee_piece_sleeves':
      body = `
        <polygon points="32,22 48,22 52,48 28,48" fill="#FED7AA" stroke="#C2410C" stroke-width="1" />
        <polygon points="68,22 84,22 88,48 64,48" fill="#FED7AA" stroke="#C2410C" stroke-width="1" />
        <line x1="40" y1="22" x2="40" y2="48" stroke="#EF4444" stroke-width="1.2" stroke-dasharray="2,1.5" />
        <line x1="76" y1="22" x2="76" y2="48" stroke="#EF4444" stroke-width="1.2" stroke-dasharray="2,1.5" />
        <text x="60" y="66" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#C2410C" font-weight="bold" text-anchor="middle">Piece Sleeves 1 cm</text>
      `;
      break;

    case 'tee_assemble_shoulders':
      body = `
        <rect x="36" y="24" width="48" height="34" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1" rx="2" />
        <line x1="36" y1="24" x2="52" y2="24" stroke="#EF4444" stroke-width="2" />
        <line x1="68" y1="24" x2="84" y2="24" stroke="#EF4444" stroke-width="2" />
        <text x="60" y="68" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#EF4444" font-weight="bold" text-anchor="middle">Shoulder Seams 1 cm</text>
      `;
      break;

    case 'tee_insert_sleeves':
      body = `
        <rect x="42" y="22" width="36" height="36" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1" rx="2" />
        <polygon points="22,24 42,24 42,42 26,36" fill="#FED7AA" stroke="#C2410C" stroke-width="1" />
        <polygon points="78,24 98,24 94,36 78,42" fill="#FED7AA" stroke="#C2410C" stroke-width="1" />
        <path d="M 42 24 Q 38 33 42 42" fill="none" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="2,1.5" />
        <path d="M 78 24 Q 82 33 78 42" fill="none" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="2,1.5" />
        <text x="60" y="68" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#047857" font-weight="bold" text-anchor="middle">Set In Sleeves</text>
      `;
      break;

    case 'tee_side_seams':
      body = `
        <rect x="40" y="20" width="40" height="38" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1" rx="2" />
        <line x1="40" y1="20" x2="40" y2="58" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="3,2" />
        <line x1="80" y1="20" x2="80" y2="58" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="3,2" />
        <text x="60" y="68" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#EF4444" font-weight="bold" text-anchor="middle">Continuous Side Seams</text>
      `;
      break;

    case 'tee_neckband':
      body = `
        <ellipse cx="60" cy="30" rx="24" ry="12" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1" />
        <ellipse cx="60" cy="30" rx="16" ry="7" fill="#FED7AA" stroke="#C2410C" stroke-width="1.2" />
        <ellipse cx="60" cy="30" rx="10" ry="4" fill="#F8FAFC" />
        <text x="60" y="66" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#C2410C" font-weight="bold" text-anchor="middle">Ribbed Collar Band</text>
      `;
      break;

    case 'tee_finish':
      body = `
        <path d="M 38 20 L 82 20 L 80 54 L 40 54 Z" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1.2" />
        <line x1="40" y1="51" x2="80" y2="51" stroke="#047857" stroke-width="1.5" stroke-dasharray="2,2" />
        <text x="60" y="68" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#047857" font-weight="bold" text-anchor="middle">Double Hem &amp; Press</text>
      `;
      break;

    // ==========================================
    // TROUSERS DIAGRAMS
    // ==========================================
    case 'trousers_piece_panels':
      body = `
        <polygon points="36,18 52,18 54,60 38,60" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1" />
        <polygon points="68,18 84,18 82,60 66,60" fill="#FED7AA" stroke="#C2410C" stroke-width="1" />
        <line x1="36" y1="36" x2="52" y2="36" stroke="#EF4444" stroke-width="1.2" stroke-dasharray="2,1.5" />
        <line x1="68" y1="36" x2="84" y2="36" stroke="#EF4444" stroke-width="1.2" stroke-dasharray="2,1.5" />
        <text x="60" y="68" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#1E3A8A" font-weight="bold" text-anchor="middle">Piece Leg Panels</text>
      `;
      break;

    case 'trousers_pockets':
      body = `
        <rect x="35" y="20" width="50" height="40" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1" rx="1" />
        <path d="M 35 26 L 45 36" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="2,1.5" />
        <path d="M 85 26 L 75 36" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="2,1.5" />
        <text x="60" y="68" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#047857" font-weight="bold" text-anchor="middle">Attach Pocket Bags</text>
      `;
      break;

    case 'trousers_inseam':
      body = `
        <path d="M 40 18 L 80 18 L 86 60 L 64 60 L 60 36 L 56 60 L 34 60 Z" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1" />
        <line x1="34" y1="60" x2="56" y2="60" stroke="#EF4444" stroke-width="1.2" stroke-dasharray="2,1.5" />
        <line x1="64" y1="60" x2="86" y2="60" stroke="#EF4444" stroke-width="1.2" stroke-dasharray="2,1.5" />
        <text x="60" y="69" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#EF4444" font-weight="bold" text-anchor="middle">Stitch Inseam</text>
      `;
      break;

    case 'trousers_crotch':
      body = `
        <path d="M 38 20 Q 60 48 82 20" fill="none" stroke="#EF4444" stroke-width="2" stroke-dasharray="3,2" />
        <text x="60" y="66" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#EF4444" font-weight="bold" text-anchor="middle">Center Crotch Seam</text>
      `;
      break;

    case 'trousers_waistband':
      body = `
        <rect x="32" y="20" width="56" height="12" fill="#FED7AA" stroke="#C2410C" stroke-width="1" rx="2" />
        <line x1="32" y1="26" x2="88" y2="26" stroke="#047857" stroke-width="1.5" stroke-dasharray="3,1" />
        <text x="60" y="66" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#047857" font-weight="bold" text-anchor="middle">Elastic Waistband Casing</text>
      `;
      break;

    case 'trousers_finish':
      body = `
        <path d="M 42 16 L 78 16 L 84 56 L 64 56 L 60 34 L 56 56 L 36 56 Z" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1.2" />
        <line x1="36" y1="53" x2="56" y2="53" stroke="#047857" stroke-width="1.2" stroke-dasharray="2,2" />
        <line x1="64" y1="53" x2="84" y2="53" stroke="#047857" stroke-width="1.2" stroke-dasharray="2,2" />
        <text x="60" y="68" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#047857" font-weight="bold" text-anchor="middle">Hem Cuffs &amp; Press</text>
      `;
      break;

    // ==========================================
    // FLAT PIECE (PLACEMAT / RUNNER) DIAGRAMS
    // ==========================================
    case 'flat_piece_scraps':
      body = `
        <rect x="25" y="18" width="34" height="44" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1" rx="1" />
        <rect x="61" y="18" width="34" height="44" fill="#FED7AA" stroke="#C2410C" stroke-width="1" rx="1" />
        <line x1="60" y1="18" x2="60" y2="62" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="3,2" />
        <text x="60" y="70" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#EF4444" font-weight="bold" text-anchor="middle">1.0 cm Seam Join</text>
      `;
      break;

    case 'flat_square_edges':
      body = `
        <rect x="25" y="18" width="70" height="44" fill="#F8FAFC" stroke="#047857" stroke-width="1.2" stroke-dasharray="4,2" rx="1" />
        <path d="M 25 24 L 31 24 L 31 18" fill="none" stroke="#047857" stroke-width="1" />
        <path d="M 89 24 L 89 18 M 89 24 L 95 24" fill="none" stroke="#047857" stroke-width="1" />
        <text x="60" y="42" font-family="Helvetica, Arial, sans-serif" font-size="5.5" fill="#047857" font-weight="bold" text-anchor="middle">Trim &amp; Square 90°</text>
      `;
      break;

    case 'flat_press_hem':
      body = `
        <rect x="24" y="16" width="72" height="48" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1" rx="1" />
        <rect x="28" y="20" width="64" height="40" fill="#BFDBFE" stroke="#3B82F6" stroke-width="0.8" stroke-dasharray="2,2" />
        <text x="60" y="42" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#1E3A8A" font-weight="bold" text-anchor="middle">Double-Fold Hem (0.5 + 1.0 cm)</text>
      `;
      break;

    case 'flat_miter_corners':
      body = `
        <rect x="28" y="20" width="64" height="40" fill="#FED7AA" stroke="#C2410C" stroke-width="1" />
        <line x1="28" y1="28" x2="36" y2="20" stroke="#EF4444" stroke-width="1.5" />
        <line x1="92" y1="28" x2="84" y2="20" stroke="#EF4444" stroke-width="1.5" />
        <text x="60" y="44" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#C2410C" font-weight="bold" text-anchor="middle">45° Mitered Corners</text>
      `;
      break;

    case 'flat_topstitch':
      body = `
        <rect x="24" y="16" width="72" height="48" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1.2" rx="1" />
        <rect x="27" y="19" width="66" height="42" fill="none" stroke="#047857" stroke-width="1.2" stroke-dasharray="2.5,1.5" />
        <text x="60" y="42" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#047857" font-weight="bold" text-anchor="middle">Edge Topstitch 2 mm</text>
      `;
      break;

    case 'flat_finish':
      body = `
        <rect x="24" y="16" width="72" height="48" fill="#F0FDF4" stroke="#047857" stroke-width="1.5" rx="2" />
        <text x="60" y="38" font-family="Helvetica, Arial, sans-serif" font-size="6" fill="#047857" font-weight="bold" text-anchor="middle">✓ Steam Pressed</text>
        <text x="60" y="48" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#334155" text-anchor="middle">Corners Flat &amp; Square</text>
      `;
      break;

    // ==========================================
    // CASING / TUBE (SCRUNCHIE / DRAWSTRING) DIAGRAMS
    // ==========================================
    case 'casing_piece_strip':
      body = `
        <rect x="15" y="30" width="30" height="20" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1" rx="1" />
        <rect x="47" y="30" width="30" height="20" fill="#FED7AA" stroke="#C2410C" stroke-width="1" rx="1" />
        <rect x="79" y="30" width="26" height="20" fill="#E2E8F0" stroke="#475569" stroke-width="1" rx="1" />
        <line x1="46" y1="30" x2="46" y2="50" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="2,2" />
        <line x1="78" y1="30" x2="78" y2="50" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="2,2" />
        <text x="60" y="62" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#EF4444" font-weight="bold" text-anchor="middle">Piece End-to-End</text>
      `;
      break;

    case 'casing_stitch_tube':
      body = `
        <rect x="18" y="30" width="84" height="20" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1" rx="1" />
        <line x1="18" y1="46" x2="102" y2="46" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="3,2" />
        <text x="60" y="40" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#1E3A8A" font-weight="bold" text-anchor="middle">Fold &amp; Stitch Long Edge</text>
      `;
      break;

    case 'casing_turn_out':
      body = `
        <rect x="18" y="32" width="84" height="16" fill="#FED7AA" stroke="#C2410C" stroke-width="1" rx="2" />
        <circle cx="88" cy="40" r="3" fill="#EF4444" />
        <line x1="88" y1="40" x2="70" y2="40" stroke="#EF4444" stroke-width="1.5" marker-end="url(#step-arrow-${stepNumber})" />
        <text x="50" y="42" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#9A3412" font-weight="bold" text-anchor="middle">Turn Right-Side Out</text>
      `;
      break;

    case 'casing_press_channel':
      body = `
        <rect x="18" y="32" width="84" height="16" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1.2" rx="1" />
        <line x1="18" y1="40" x2="102" y2="40" stroke="#3B82F6" stroke-width="0.8" stroke-dasharray="4,2" />
        <text x="60" y="42" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#1E3A8A" font-weight="bold" text-anchor="middle">Press Hollow Channel Flat</text>
      `;
      break;

    case 'casing_insert_elastic':
      body = `
        <rect x="18" y="30" width="84" height="20" fill="#E2E8F0" stroke="#475569" stroke-width="1" rx="1" />
        <line x1="18" y1="40" x2="90" y2="40" stroke="#047857" stroke-width="2.5" />
        <circle cx="92" cy="40" r="3" fill="#047857" />
        <text x="60" y="60" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#047857" font-weight="bold" text-anchor="middle">Thread Elastic / Drawcord</text>
      `;
      break;

    case 'casing_finish':
      body = `
        <circle cx="60" cy="40" r="22" fill="none" stroke="#DBEAFE" stroke-width="12" />
        <circle cx="60" cy="40" r="22" fill="none" stroke="#1E3A8A" stroke-width="1" />
        <rect x="56" y="14" width="8" height="8" fill="#EF4444" rx="1" />
        <text x="60" y="42" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#1E3A8A" font-weight="bold" text-anchor="middle">Topstitch Closed</text>
      `;
      break;

    default:
      body = `
        <rect x="28" y="18" width="64" height="44" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="1.2" rx="2" />
        <line x1="28" y1="40" x2="92" y2="40" stroke="#EF4444" stroke-width="1.2" stroke-dasharray="3,2" />
        <text x="60" y="69" font-family="Helvetica, Arial, sans-serif" font-size="5" fill="#1E3A8A" font-weight="bold" text-anchor="middle">Assembly Seam 1 cm</text>
      `;
      break;
  }

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80" width="120" height="80">
  <defs>
    <marker id="step-arrow-${stepNumber}" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3.5" markerHeight="3.5" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#047857" />
    </marker>
  </defs>
  ${stepBadge}
  ${body}
</svg>
`.trim();
}
