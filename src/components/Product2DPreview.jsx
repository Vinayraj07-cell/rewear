// src/components/Product2DPreview.jsx
// Stage 4A: 2D Finished Product Tailor Preview
// Renders dynamic 2D vector preview from real buildDesign() data
// Supports: Front/Back views, label toggle, interactive panel tap inspection,
// true proportion & colours, seam lines, loading/error states.

import React, { useState, useMemo } from 'react';
import { Eye, Layers, Tag, X, CheckCircle, AlertCircle, Info, RefreshCw } from 'lucide-react';
import { computeProduct2DLayout } from '../utils/product2DLayout.js';
import { getTranslatedZoneName } from '../utils/zoneHelper.js';

export default function Product2DPreview({
  design,
  t = {},
  lang = 'en',
  selectedZoneId = null,
  onSelectZone = null,
  showLabelsDefault = false,
  className = '',
}) {
  const [activeView, setActiveView] = useState('front'); // 'front' | 'back'
  const [showLabels, setShowLabels] = useState(showLabelsDefault);
  const [internalSelectedZone, setInternalSelectedZone] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Synchronize with external or internal selection
  const currentSelectedZoneId = selectedZoneId !== undefined && selectedZoneId !== null
    ? selectedZoneId
    : internalSelectedZone;

  // Safe translation helper
  const tr = (key, fallback) => {
    if (t && t[key]) return t[key];
    return fallback;
  };

  // Compute 2D layout based on design and active view
  const layout = useMemo(() => {
    if (!design || !design.productId) return null;
    try {
      return computeProduct2DLayout(design, activeView);
    } catch (err) {
      console.error('Error computing 2D layout:', err);
      return { error: err.message };
    }
  }, [design, activeView]);

  // Find currently selected panel data
  const selectedPanel = useMemo(() => {
    if (!layout || !layout.panels || !currentSelectedZoneId) return null;
    return layout.panels.find((p) => p.id === currentSelectedZoneId || p.zoneId === currentSelectedZoneId);
  }, [layout, currentSelectedZoneId]);

  const handlePanelClick = (panel) => {
    const nextId = currentSelectedZoneId === panel.id ? null : panel.id;
    setInternalSelectedZone(nextId);
    if (onSelectZone) {
      onSelectZone(nextId);
    }
  };

  // Determine role translation
  const getRoleLabel = (role) => {
    switch (role) {
      case 'base':
        return tr('mainBase', 'Main colour (60%)');
      case 'supporting':
        return tr('supporting', 'Second colour (30%)');
      case 'accent':
        return tr('accent', 'Small touch (10%)');
      default:
        return role;
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={`w-full bg-stone-50 border border-stone-200 rounded-3xl p-6 text-center animate-pulse ${className}`}>
        <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm font-medium text-stone-600">
          {tr('loadingPreview', 'Generating 2D tailor preview...')}
        </p>
      </div>
    );
  }

  // Error state
  if (!layout || layout.error) {
    return (
      <div className={`w-full bg-red-50 border border-red-200 rounded-3xl p-5 text-center ${className}`}>
        <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
        <p className="text-sm font-semibold text-red-800">
          {tr('errorPreview', 'Unable to load preview')}
        </p>
        <p className="text-xs text-red-600 mt-1">
          {layout?.error || 'Design data incomplete'}
        </p>
      </div>
    );
  }

  const { viewBox, panels = [], decorations = [] } = layout;
  const viewBoxStr = typeof viewBox === 'string' 
    ? viewBox 
    : (viewBox ? `${viewBox.x || 0} ${viewBox.y || 0} ${viewBox.width} ${viewBox.height}` : '0 0 100 100');

  return (
    <div className={`w-full bg-white border border-stone-200 rounded-3xl shadow-sm overflow-hidden flex flex-col ${className}`}>
      {/* 1. Header Controls: Front / Back Views & Show Labels */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-stone-50 border-b border-stone-200 gap-2">
        {/* Front / Back Toggle Tabs */}
        <div className="flex items-center bg-stone-200/80 p-0.5 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveView('front')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeView === 'front'
                ? 'bg-white text-stone-900 shadow-sm font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>{tr('frontView', 'Front View')}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveView('back')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeView === 'back'
                ? 'bg-white text-stone-900 shadow-sm font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>{tr('backView', 'Back View')}</span>
          </button>
        </div>

        {/* Labels Toggle Button */}
        <button
          type="button"
          onClick={() => setShowLabels((prev) => !prev)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
            showLabels
              ? 'bg-amber-100 border-amber-300 text-amber-900 font-semibold'
              : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100'
          }`}
          title={showLabels ? tr('hideLabels', 'Hide Labels') : tr('showLabels', 'Show Labels')}
        >
          <Tag className="w-3.5 h-3.5" />
          <span>{showLabels ? tr('hideLabels', 'Labels ON') : tr('showLabels', 'Labels')}</span>
        </button>
      </div>

      {/* 2. Mandatory Disclaimer Banner */}
      <div className="bg-amber-50/80 border-b border-amber-100 px-3.5 py-1.5 flex items-center gap-2">
        <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
        <p className="text-[11px] text-amber-900 font-medium tracking-tight">
          {tr('previewDisclaimer', 'Preview. Final look may differ slightly.')}
        </p>
      </div>

      {/* 3. Main 2D Flat SVG Canvas */}
      <div className="relative w-full bg-gradient-to-b from-stone-50/50 to-stone-100/60 p-3 sm:p-4 flex items-center justify-center select-none overflow-hidden min-h-[220px]">
        <svg
          viewBox={viewBoxStr}
          className="w-full max-h-[300px] h-auto transition-transform duration-200 drop-shadow-md"
          style={{ shapeRendering: 'geometricPrecision' }}
        >
          <defs>
            {/* Subtle shadow filter for realistic tailoring depth */}
            <filter id="panel-shadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#0f172a" floodOpacity="0.12" />
            </filter>
            {/* Subtle fabric weave texture pattern overlay for realistic cloth look */}
            <pattern id="fabric-weave" width="3" height="3" patternUnits="userSpaceOnUse">
              <path d="M 0 1.5 L 3 1.5 M 1.5 0 L 1.5 3" stroke="#000000" strokeWidth="0.35" strokeOpacity="0.08" />
              <rect x="0" y="0" width="1.5" height="1.5" fill="#FFFFFF" fillOpacity="0.04" />
              <rect x="1.5" y="1.5" width="1.5" height="1.5" fill="#FFFFFF" fillOpacity="0.04" />
            </pattern>
            {/* Diagonal hatch pattern for unplaced / needed fabric zones */}
            <pattern id="unplaced-hatch" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#EF4444" strokeWidth="1.2" strokeOpacity="0.5" />
            </pattern>
          </defs>

          {/* LAYER 1: Background Decorations (Handles arch, shoulder straps, pouch tabs) */}
          <g id="decorations-back">
            {decorations.map((deco, idx) => {
              if (deco.type === 'handle_arch' || deco.type === 'handle_stitch') {
                return (
                  <path
                    key={`deco-back-${idx}`}
                    d={deco.d}
                    stroke={deco.stroke}
                    strokeWidth={deco.strokeWidth}
                    strokeLinecap={deco.strokeLinecap || 'round'}
                    strokeDasharray={deco.strokeDasharray}
                    fill={deco.fill || 'none'}
                  />
                );
              }
              if (deco.type === 'strap_left' || deco.type === 'strap_right') {
                return (
                  <rect
                    key={`strap-${idx}`}
                    x={deco.x}
                    y={deco.y}
                    width={deco.width}
                    height={deco.height}
                    rx={deco.rx || 1}
                    fill={deco.fill || '#D6C0A4'}
                    stroke={deco.stroke || '#9CA3AF'}
                    strokeWidth={deco.strokeWidth || 0.6}
                  />
                );
              }
              return null;
            })}
          </g>

          {/* LAYER 2: Panels & Real Arranged Patches */}
          <g id="panels-layer">
            {panels.map((panel) => {
              const isSelected = currentSelectedZoneId === panel.id || currentSelectedZoneId === panel.zoneId;
              const hasPatches = panel.isPlaced && panel.patches && panel.patches.length > 0;

              return (
                <g
                  key={panel.id || panel.zoneId}
                  className="cursor-pointer transition-opacity"
                  onClick={() => handlePanelClick(panel)}
                  opacity={currentSelectedZoneId && !isSelected ? 0.8 : 1}
                >
                  {/* Panel Background / Unplaced state */}
                  {!hasPatches ? (
                    <rect
                      x={panel.canvasX}
                      y={panel.canvasY}
                      width={panel.width}
                      height={panel.height}
                      rx={panel.rx || 1.5}
                      fill="url(#unplaced-hatch)"
                      stroke="#EF4444"
                      strokeWidth={isSelected ? 2 : 1}
                      strokeDasharray="2 2"
                    />
                  ) : (
                    // Render real patches at exact computed coordinates with subtle fabric texture
                    panel.patches.map((patch, pIdx) => (
                      <g key={`patch-${panel.id}-${pIdx}`}>
                        <rect
                          x={patch.canvasX}
                          y={patch.canvasY}
                          width={patch.width}
                          height={patch.height}
                          fill={patch.colorHex}
                          stroke="#334155"
                          strokeWidth={0.5}
                          strokeOpacity={0.4}
                        />
                        <rect
                          x={patch.canvasX}
                          y={patch.canvasY}
                          width={patch.width}
                          height={patch.height}
                          fill="url(#fabric-weave)"
                          className="pointer-events-none"
                        />
                      </g>
                    ))
                  )}

                  {/* Panel Internal Seams (visible tailor stitching) */}
                  {hasPatches &&
                    panel.seams &&
                    panel.seams.map((seam, sIdx) => (
                      <line
                        key={`seam-${panel.id}-${sIdx}`}
                        x1={seam.canvasX1}
                        y1={seam.canvasY1}
                        x2={seam.canvasX2}
                        y2={seam.canvasY2}
                        stroke="#FFFFFF"
                        strokeWidth={0.7}
                        strokeDasharray="1.5 1.5"
                        strokeOpacity={0.85}
                      />
                    ))}

                  {/* Panel Outer Border / Selection Outline */}
                  <rect
                    x={panel.canvasX}
                    y={panel.canvasY}
                    width={panel.width}
                    height={panel.height}
                    rx={panel.rx || 1.5}
                    fill="none"
                    stroke={
                      isSelected
                        ? '#2563EB'
                        : hasPatches
                        ? '#475569'
                        : '#DC2626'
                    }
                    strokeWidth={isSelected ? 2.5 : 1}
                    className="transition-all duration-150"
                  />

                  {/* Optional Label Badge on the Panel */}
                  {showLabels && (
                    <g transform={`translate(${panel.canvasX + panel.width / 2}, ${panel.canvasY + panel.height / 2})`}>
                      <rect
                        x="-14"
                        y="-4.5"
                        width="28"
                        height="9"
                        rx="2"
                        fill="#0F172A"
                        fillOpacity="0.85"
                        stroke="#FFFFFF"
                        strokeWidth="0.5"
                      />
                      <text
                        x="0"
                        y="1.8"
                        textAnchor="middle"
                        fontSize="3.2"
                        fontWeight="bold"
                        fill="#FFFFFF"
                        className="pointer-events-none select-none"
                      >
                        {panel.width.toFixed(0)}×{panel.height.toFixed(0)}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>

          {/* LAYER 3: Foreground Decorations (Zipper teeth, buttons, placket, gathers, envelope fold) */}
          <g id="decorations-front" className="pointer-events-none">
            {decorations.map((deco, idx) => {
              if (deco.type === 'zipper_line') {
                return (
                  <g key={`zipper-${idx}`}>
                    <line
                      x1={deco.x1}
                      y1={deco.y1}
                      x2={deco.x2}
                      y2={deco.y2}
                      stroke="#475569"
                      strokeWidth={1.5}
                    />
                    <line
                      x1={deco.x1}
                      y1={deco.y1}
                      x2={deco.x2}
                      y2={deco.y2}
                      stroke="#CBD5E1"
                      strokeWidth={1}
                      strokeDasharray="1.2 1"
                    />
                  </g>
                );
              }
              if (deco.type === 'zipper_slider') {
                return (
                  <circle
                    key={`slider-${idx}`}
                    cx={deco.cx}
                    cy={deco.cy}
                    r={deco.r}
                    fill="#F8FAFC"
                    stroke="#1E293B"
                    strokeWidth={0.8}
                  />
                );
              }
              if (deco.type === 'envelope_hem') {
                return (
                  <line
                    key={`env-hem-${idx}`}
                    x1={deco.x1}
                    y1={deco.y1}
                    x2={deco.x2}
                    y2={deco.y2}
                    stroke="#1E293B"
                    strokeWidth={1.2}
                    strokeOpacity={0.8}
                  />
                );
              }
              if (deco.type === 'envelope_stitch') {
                return (
                  <line
                    key={`env-stitch-${idx}`}
                    x1={deco.x1}
                    y1={deco.y1}
                    x2={deco.x2}
                    y2={deco.y2}
                    stroke="#FFFFFF"
                    strokeWidth={0.8}
                    strokeDasharray="2 1.5"
                  />
                );
              }
              if (deco.type === 'waist_gathers') {
                return (
                  <path
                    key={`gathers-${idx}`}
                    d={deco.d}
                    stroke={deco.stroke}
                    strokeWidth={deco.strokeWidth}
                    fill="none"
                  />
                );
              }
              if (deco.type === 'cushion_perimeter_stitch') {
                return (
                  <rect
                    key={`cushion-stitch-${idx}`}
                    x={deco.x}
                    y={deco.y}
                    width={deco.width}
                    height={deco.height}
                    rx={deco.rx || 2.5}
                    stroke={deco.stroke || '#FFFFFF'}
                    strokeWidth={deco.strokeWidth || 0.6}
                    strokeDasharray={deco.strokeDasharray || '2 2'}
                    strokeOpacity={deco.strokeOpacity || 0.75}
                    fill="none"
                  />
                );
              }
              if (deco.type === 'back_placket') {
                return (
                  <line
                    key={`placket-${idx}`}
                    x1={deco.x1}
                    y1={deco.y1}
                    x2={deco.x2}
                    y2={deco.y2}
                    stroke="#334155"
                    strokeWidth={1}
                    strokeDasharray="1.5 1.5"
                  />
                );
              }
              if (deco.type === 'button') {
                return (
                  <circle
                    key={`btn-${idx}`}
                    cx={deco.cx}
                    cy={deco.cy}
                    r={deco.r}
                    fill="#FFFFFF"
                    stroke="#334155"
                    strokeWidth={0.6}
                  />
                );
              }
              return null;
            })}
          </g>
        </svg>
      </div>

      {/* 4. Tap Prompt / Inspection Helper Tip */}
      <div className="px-3.5 py-1.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
        <span className="truncate">
          {tr('tapPanelToInspect', 'Tap any panel to inspect pieces')}
        </span>
        <span className="text-[11px] font-semibold text-stone-400 shrink-0">
          {panels.filter((p) => p.isPlaced).length}/{panels.length} {tr('readyBadge', 'Ready')}
        </span>
      </div>

      {/* 5. Interactive Panel Inspection Drawer / Card (when a panel is tapped) */}
      {selectedPanel && (
        <div className="bg-stone-50 border-t-2 border-blue-500 p-3.5 animate-fadeIn">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-sm font-bold text-stone-900">
                  {getTranslatedZoneName(selectedPanel.zoneId, selectedPanel.zoneName, t)}
                </h4>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    selectedPanel.isPlaced
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {selectedPanel.isPlaced
                    ? `${selectedPanel.patches?.length || 1} ${tr('piecesCountLabel', 'pieces')}`
                    : tr('missingPanelNotice', 'Needs fabric (unplaced)')}
                </span>
                <span className="text-[10px] font-medium bg-stone-200 text-stone-700 px-2 py-0.5 rounded-full">
                  {getRoleLabel(selectedPanel.role)}
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-1">
                <span className="font-medium text-stone-700">
                  {tr('finishedSizeLabel', 'Finished size')}:
                </span>{' '}
                {selectedPanel.width.toFixed(1)} × {selectedPanel.height.toFixed(1)} cm{' '}
                <span className="text-stone-400">
                  ({(selectedPanel.width / 2.54).toFixed(1)} × {(selectedPanel.height / 2.54).toFixed(1)} in)
                </span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => handlePanelClick(selectedPanel)}
              className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Patch breakdown list for this panel */}
          {selectedPanel.isPlaced && selectedPanel.patches && selectedPanel.patches.length > 0 && (
            <div className="mt-2.5 pt-2 border-t border-stone-200">
              <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                {tr('panelDetailsTitle', 'Panel Details')} ({selectedPanel.patches.length}{' '}
                {selectedPanel.patches.length === 1 ? 'piece' : 'pieced patches'})
              </p>
              <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto pr-1">
                {selectedPanel.patches.map((p, idx) => (
                  <div
                    key={`detail-p-${idx}`}
                    className="flex items-center gap-2 p-1.5 bg-white rounded-lg border border-stone-200 text-xs"
                  >
                    <span
                      className="w-4 h-4 rounded-md shrink-0 border border-black/10 shadow-inner"
                      style={{ backgroundColor: p.colorHex }}
                    />
                    <div className="truncate">
                      <span className="font-medium text-stone-800 capitalize truncate block">
                        {p.color}
                      </span>
                      <span className="text-[10px] text-stone-500 block">
                        {p.width.toFixed(0)}×{p.height.toFixed(0)} cm
                        {p.rotated ? ' ↻ 90°' : ''}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
