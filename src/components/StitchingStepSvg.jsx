// src/components/StitchingStepSvg.jsx
// Stage 4B: Visual tailoring diagram for assembly stitching steps

import React from 'react';

export default function StitchingStepSvg({ type, stepNumber, className = '' }) {
  // 120 x 80 coordinate system for step illustrations
  return (
    <div className={`w-28 h-20 shrink-0 bg-stone-100 rounded-2xl border border-stone-200 overflow-hidden flex items-center justify-center p-1 select-none ${className}`}>
      <svg
        viewBox="0 0 120 80"
        className="w-full h-full"
        style={{ shapeRendering: 'geometricPrecision' }}
      >
        <defs>
          <marker id="step-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3.5" markerHeight="3.5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#047857" />
          </marker>
        </defs>

        {/* Step number badge */}
        <rect x="3" y="3" width="14" height="10" rx="3" fill="#047857" />
        <text x="10" y="10.5" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle">
          {stepNumber}
        </text>

        {/* --- POUCH DIAGRAMS --- */}
        {type === 'pouch_piece_patches' && (
          <g id="diag-pouch-piece">
            <rect x="22" y="18" width="34" height="44" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="1" rx="1" />
            <rect x="58" y="18" width="34" height="44" fill="#FED7AA" stroke="#C2410C" strokeWidth="1" rx="1" />
            {/* Seam line */}
            <line x1="57" y1="18" x2="57" y2="62" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="57" y="70" fontSize="5" fill="#EF4444" fontWeight="bold" textAnchor="middle">
              1.0 cm seam
            </text>
          </g>
        )}

        {type === 'pouch_side_tabs' && (
          <g id="diag-pouch-tabs">
            <rect x="35" y="22" width="50" height="38" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="1" rx="1" />
            {/* Tabs */}
            <rect x="26" y="28" width="9" height="12" fill="#F97316" stroke="#9A3412" strokeWidth="0.8" rx="1" />
            <rect x="85" y="28" width="9" height="12" fill="#F97316" stroke="#9A3412" strokeWidth="0.8" rx="1" />
            {/* Basting stitches */}
            <line x1="33" y1="28" x2="33" y2="40" stroke="#047857" strokeWidth="1" strokeDasharray="2 1" />
            <line x1="87" y1="28" x2="87" y2="40" stroke="#047857" strokeWidth="1" strokeDasharray="2 1" />
            <text x="60" y="70" fontSize="5" fill="#047857" fontWeight="bold" textAnchor="middle">
              Baste Tabs 0.5 cm
            </text>
          </g>
        )}

        {type === 'pouch_insert_zipper' && (
          <g id="diag-pouch-zipper">
            <rect x="25" y="28" width="70" height="20" fill="#FED7AA" stroke="#C2410C" strokeWidth="1" rx="1" />
            {/* Zipper tape */}
            <rect x="25" y="22" width="70" height="8" fill="#475569" rx="1" />
            {/* Teeth */}
            <line x1="25" y1="26" x2="95" y2="26" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 1.5" />
            {/* Stitch line */}
            <line x1="25" y1="29" x2="95" y2="29" stroke="#EF4444" strokeWidth="1.2" strokeDasharray="3 2" />
            <text x="60" y="65" fontSize="5" fill="#334155" fontWeight="bold" textAnchor="middle">
              Zipper Face-Down
            </text>
          </g>
        )}

        {type === 'pouch_topstitch_zipper' && (
          <g id="diag-pouch-topstitch">
            <rect x="25" y="30" width="70" height="28" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="1" rx="1" />
            <rect x="25" y="16" width="70" height="14" fill="#475569" rx="1" />
            <line x1="25" y1="23" x2="95" y2="23" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 1.5" />
            {/* Topstitch line */}
            <line x1="25" y1="32" x2="95" y2="32" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 2" />
            <text x="60" y="68" fontSize="5" fill="#047857" fontWeight="bold" textAnchor="middle">
              Topstitch 2 mm
            </text>
          </g>
        )}

        {type === 'pouch_join_lower' && (
          <g id="diag-pouch-join">
            <rect x="28" y="18" width="64" height="14" fill="#FED7AA" stroke="#C2410C" strokeWidth="1" rx="1" />
            <rect x="28" y="32" width="64" height="30" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="1" rx="1" />
            <line x1="28" y1="32" x2="92" y2="32" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="60" y="70" fontSize="5" fill="#EF4444" fontWeight="bold" textAnchor="middle">
              Join 1.0 cm seam
            </text>
          </g>
        )}

        {type === 'pouch_finish' && (
          <g id="diag-pouch-finish">
            <rect x="30" y="20" width="60" height="42" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="1.2" rx="3" />
            <line x1="30" y1="26" x2="90" y2="26" stroke="#475569" strokeWidth="2" strokeDasharray="3 1" />
            {/* Slider */}
            <circle cx="55" cy="26" r="3" fill="#0F172A" />
            <path d="M 33 28 L 33 59 L 87 59 L 87 28" fill="none" stroke="#EF4444" strokeWidth="1.2" strokeDasharray="3 2" />
            <text x="60" y="70" fontSize="5" fill="#047857" fontWeight="bold" textAnchor="middle">
              Stitch 3 Sides & Turn
            </text>
          </g>
        )}

        {/* --- TOTE BAG DIAGRAMS --- */}
        {type === 'tote_assemble_body' && (
          <g id="diag-tote-body">
            <rect x="32" y="16" width="56" height="48" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="1.2" rx="2" />
            <line x1="32" y1="32" x2="88" y2="32" stroke="#EF4444" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="32" y1="48" x2="88" y2="48" stroke="#EF4444" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="60" y1="16" x2="60" y2="64" stroke="#EF4444" strokeWidth="1" strokeDasharray="3 2" />
            <text x="60" y="71" fontSize="5" fill="#1E3A8A" fontWeight="bold" textAnchor="middle">
              36 × 38 cm Body Grid
            </text>
          </g>
        )}

        {type === 'tote_construct_handles' && (
          <g id="diag-tote-handles">
            <rect x="25" y="30" width="70" height="16" fill="#FED7AA" stroke="#C2410C" strokeWidth="1" rx="1" />
            {/* Edge stitches */}
            <line x1="25" y1="32" x2="95" y2="32" stroke="#047857" strokeWidth="1" strokeDasharray="2 1.5" />
            <line x1="25" y1="44" x2="95" y2="44" stroke="#047857" strokeWidth="1" strokeDasharray="2 1.5" />
            <text x="60" y="58" fontSize="5" fill="#047857" fontWeight="bold" textAnchor="middle">
              Edge-Stitch Both Sides
            </text>
          </g>
        )}

        {type === 'tote_attach_pocket' && (
          <g id="diag-tote-pocket">
            <rect x="30" y="16" width="60" height="50" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="1.2" rx="2" />
            <rect x="46" y="30" width="28" height="24" fill="#FED7AA" stroke="#C2410C" strokeWidth="1" rx="1.5" />
            <line x1="46" y1="30" x2="74" y2="30" stroke="#047857" strokeWidth="1.2" />
            <text x="60" y="71" fontSize="5" fill="#C2410C" fontWeight="bold" textAnchor="middle">
              Center Patch Pocket
            </text>
          </g>
        )}

        {type === 'tote_attach_facing' && (
          <g id="diag-tote-facing">
            <rect x="30" y="24" width="60" height="42" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="1.2" rx="2" />
            {/* Handles */}
            <path d="M 44 24 C 44 8, 76 8, 76 24" fill="none" stroke="#F97316" strokeWidth="3" />
            <rect x="30" y="24" width="60" height="12" fill="#FED7AA" stroke="#C2410C" strokeWidth="1" />
            <line x1="30" y1="24" x2="90" y2="24" stroke="#EF4444" strokeWidth="1.2" strokeDasharray="3 2" />
            <text x="60" y="72" fontSize="5" fill="#047857" fontWeight="bold" textAnchor="middle">
              Facing & Handles
            </text>
          </g>
        )}

        {type === 'tote_seam_sides' && (
          <g id="diag-tote-seam">
            <rect x="32" y="18" width="56" height="48" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="1" rx="2" />
            <path d="M 32 18 L 32 66 L 88 66 L 88 18" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="60" y="73" fontSize="5" fill="#EF4444" fontWeight="bold" textAnchor="middle">
              Stitch Sides & Bottom
            </text>
          </g>
        )}

        {type === 'tote_box_corners' && (
          <g id="diag-tote-box">
            <path d="M 40 20 L 80 20 L 80 50 L 70 60 L 50 60 L 40 50 Z" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="1.2" />
            <line x1="45" y1="46" x2="55" y2="56" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="75" y1="46" x2="65" y2="56" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="2 2" />
            <text x="60" y="70" fontSize="5" fill="#047857" fontWeight="bold" textAnchor="middle">
              Box Corners 6 cm
            </text>
          </g>
        )}

        {/* --- CUSHION COVER & FROCK FALLBACK --- */}
        {!type?.startsWith('pouch') && !type?.startsWith('tote') && (
          <g id="diag-generic">
            <rect x="28" y="18" width="64" height="44" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="1.2" rx="2" />
            <line x1="28" y1="40" x2="92" y2="40" stroke="#EF4444" strokeWidth="1.2" strokeDasharray="3 2" />
            <text x="60" y="69" fontSize="5" fill="#1E3A8A" fontWeight="bold" textAnchor="middle">
              Assembly Seam 1 cm
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
