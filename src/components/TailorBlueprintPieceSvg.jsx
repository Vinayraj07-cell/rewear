// src/components/TailorBlueprintPieceSvg.jsx
// Stage 4B: Technical blueprint SVG for an individual pattern piece
// Shows:
// - Outer cut perimeter
// - Dashed inner seam allowance line (1 cm / 0.4 in inset)
// - Grain line arrow (↕)
// - Dual dimension callouts (cm & inches)
// - Internal scrap layout showing which scraps make the piece

import React from 'react';

export default function TailorBlueprintPieceSvg({ piece, className = '' }) {
  if (!piece) return null;

  // Extract dimensions
  const cutW = parseFloat(piece.cutDimensions?.cm) || 16;
  const cutH = parseFloat(piece.cutDimensions?.cm?.split('×')?.[1]) || 12;
  const saCm = piece.seamAllowanceCm || 1.0;

  // Drawing coordinate system with padding for dimension callouts
  const padX = 14;
  const padY = 12;
  const scale = Math.min(180 / cutW, 140 / cutH, 8); // scale factor

  const svgW = cutW * scale + padX * 2;
  const svgH = cutH * scale + padY * 2;

  const rectX = padX;
  const rectY = padY;
  const rectW = cutW * scale;
  const rectH = cutH * scale;

  const innerX = rectX + saCm * scale;
  const innerY = rectY + saCm * scale;
  const innerW = Math.max(2, (cutW - 2 * saCm) * scale);
  const innerH = Math.max(2, (cutH - 2 * saCm) * scale);

  const scraps = piece.scraps || [];

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        className="w-full max-h-[180px] h-auto drop-shadow-xs"
        style={{ shapeRendering: 'geometricPrecision' }}
      >
        <defs>
          {/* Arrowhead marker for grain line */}
          <marker id="grain-arrow-start" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#1E3A8A" />
          </marker>
          <marker id="grain-arrow-end" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#1E3A8A" />
          </marker>

          {/* Dimension arrow markers */}
          <marker id="dim-arrow-start" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3" markerHeight="3" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748B" />
          </marker>
          <marker id="dim-arrow-end" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3" markerHeight="3" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748B" />
          </marker>

          {/* Subtle grid pattern background */}
          <pattern id="blueprint-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#E2E8F0" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* Blueprint Grid Background */}
        <rect x="0" y="0" width={svgW} height={svgH} fill="url(#blueprint-grid)" rx="4" />

        {/* 1. Outer Cut Boundary (Solid line) */}
        <rect
          x={rectX}
          y={rectY}
          width={rectW}
          height={rectH}
          fill="#F8FAFC"
          stroke="#0F172A"
          strokeWidth="1.5"
          rx="1"
        />

        {/* 2. Scrap Patch Layout Fill (if pieced) */}
        {scraps.length > 1 ? (
          <g id="pieced-scraps">
            {scraps.map((s, idx) => {
              const segW = rectW / scraps.length;
              return (
                <g key={idx}>
                  <rect
                    x={rectX + idx * segW}
                    y={rectY}
                    width={segW}
                    height={rectH}
                    fill={s.colorHex || '#1E3A8A'}
                    fillOpacity="0.12"
                    stroke="#475569"
                    strokeWidth="0.8"
                    strokeDasharray="3 2"
                  />
                  <text
                    x={rectX + idx * segW + segW / 2}
                    y={rectY + rectH - 4}
                    textAnchor="middle"
                    fontSize="6"
                    fill="#334155"
                    fontWeight="bold"
                  >
                    #{idx + 1} {s.color}
                  </text>
                </g>
              );
            })}
          </g>
        ) : null}

        {/* 3. Inner Seam Allowance Line (Dashed line) */}
        <rect
          x={innerX}
          y={innerY}
          width={innerW}
          height={innerH}
          fill="none"
          stroke="#2563EB"
          strokeWidth="1.2"
          strokeDasharray="4 3"
        />

        {/* 4. Grain Line Arrow (↕ Lengthwise) */}
        <g id="grain-line">
          <line
            x1={rectX + rectW / 2}
            y1={rectY + rectH * 0.22}
            x2={rectX + rectW / 2}
            y2={rectY + rectH * 0.78}
            stroke="#1E3A8A"
            strokeWidth="1.5"
            markerStart="url(#grain-arrow-start)"
            markerEnd="url(#grain-arrow-end)"
          />
          {/* Grain label */}
          <rect
            x={rectX + rectW / 2 - 14}
            y={rectY + rectH / 2 - 4}
            width="28"
            height="8"
            fill="#FFFFFF"
            fillOpacity="0.9"
            rx="2"
          />
          <text
            x={rectX + rectW / 2}
            y={rectY + rectH / 2 + 2}
            textAnchor="middle"
            fontSize="5.5"
            fill="#1E3A8A"
            fontWeight="bold"
          >
            GRAIN ↕
          </text>
        </g>

        {/* 5. Dimension Callout: Top Width */}
        <g id="dim-width">
          <line
            x1={rectX}
            y1={rectY - 4}
            x2={rectX + rectW}
            y2={rectY - 4}
            stroke="#64748B"
            strokeWidth="0.8"
            markerStart="url(#dim-arrow-start)"
            markerEnd="url(#dim-arrow-end)"
          />
          <text
            x={rectX + rectW / 2}
            y={rectY - 6}
            textAnchor="middle"
            fontSize="5.5"
            fill="#334155"
            fontWeight="bold"
          >
            {piece.cutDimensions.combined}
          </text>
        </g>

        {/* 6. Dimension Callout: Left Height */}
        <g id="dim-height">
          <line
            x1={rectX - 4}
            y1={rectY}
            x2={rectX - 4}
            y2={rectY + rectH}
            stroke="#64748B"
            strokeWidth="0.8"
            markerStart="url(#dim-arrow-start)"
            markerEnd="url(#dim-arrow-end)"
          />
          <text
            x={rectX - 6}
            y={rectY + rectH / 2}
            textAnchor="middle"
            fontSize="5"
            fill="#334155"
            fontWeight="bold"
            transform={`rotate(-90 ${rectX - 6} ${rectY + rectH / 2})`}
          >
            CUT: {piece.cutDimensions.cm}
          </text>
        </g>

        {/* 7. Piece ID badge */}
        <g id="piece-badge">
          <rect
            x={rectX + 2}
            y={rectY + 2}
            width="12"
            height="7"
            fill="#0F172A"
            rx="1.5"
          />
          <text
            x={rectX + 8}
            y={rectY + 6.8}
            textAnchor="middle"
            fontSize="4.8"
            fill="#FFFFFF"
            fontWeight="black"
          >
            #{piece.pieceNumber}
          </text>
        </g>

        {/* 8. Seam Allowance Label Tag */}
        <text
          x={rectX + rectW - 2}
          y={rectY + rectH - 2}
          textAnchor="end"
          fontSize="4.5"
          fill="#2563EB"
          fontWeight="bold"
        >
          SA: {piece.seamAllowance.cm} ({piece.seamAllowance.inches})
        </text>
      </svg>
    </div>
  );
}
