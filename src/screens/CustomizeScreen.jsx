import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  HelpCircle, 
  Volume2, 
  VolumeX, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Undo2, 
  Redo2, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  RefreshCw, 
  Check, 
  Move,
  ArrowLeftRight
} from 'lucide-react';
import { fitPileToProduct, buildDesign } from '../engine/index';
import { soundManager } from '../utils/audio';
import { COLOR_SWATCHES } from '../i18n/translations';
import { getZoneDimensions, getTranslatedZoneName } from '../utils/zoneHelper.js';
import Product2DPreview from '../components/Product2DPreview';

export default function CustomizeScreen({
  initialDesign,
  pile,
  onSave,
  onCancel,
  onOpenHelp,
  t,
  lang,
}) {
  // Local state for interactive design layout
  const [currentDesign, setCurrentDesign] = useState(() => JSON.parse(JSON.stringify(initialDesign)));
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(100); // 75%, 100%, 125%, 150%
  const [selectedPiece, setSelectedPiece] = useState(null); // { zoneId, scrapIdx, scrap }
  const [validationStatus, setValidationStatus] = useState({ isValid: true, message: null });
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Helper to get hex color for a scrap
  const getScrapHex = (colorName) => {
    const swatch = COLOR_SWATCHES.find(
      (s) => s.id.toLowerCase() === (colorName || '').toLowerCase()
    );
    return swatch ? swatch.hex : '#9CA3AF';
  };

  // Helper: call engine and validate design state after EVERY change
  const validateWithEngine = (newDesign) => {
    // 1. Check if any rotated stretchy piece violates grainline
    for (const pl of newDesign.placements || []) {
      for (const sc of pl.scraps || []) {
        // If piece is stretchy and rotated
        const original = pile.find((p) => p.id === sc.scrapId);
        if (original && (original.stretchy === true || original.stretchy === 'yes') && sc.rotated) {
          return {
            isValid: false,
            message: 'Stretchy fabric cannot rotate 90° across the grain line; it will stretch out of shape during sewing.',
          };
        }
      }
    }

    // 2. Call checkFeasibility with current design parameters
    try {
      const check = fitPileToProduct(
        pile,
        newDesign.productId,
        newDesign.sizeKey,
        newDesign.seamAllowanceCm || 1.0,
        { variant: newDesign.variant || 'plain' }
      );
      if (!check.fits) {
        return {
          isValid: false,
          message: check.missing || 'Fabric dimensions no longer satisfy the required panel coverage.',
        };
      }
    } catch (e) {
      return { isValid: false, message: e.message };
    }

    return { isValid: true, message: null };
  };

  // Push to history for undo/redo
  const pushChange = (newDesign) => {
    setHistory((prev) => [...prev, currentDesign]);
    setFuture([]);
    setCurrentDesign(newDesign);

    // Call engine immediately after change!
    const result = validateWithEngine(newDesign);
    setValidationStatus(result);
  };

  // Undo
  const handleUndo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, h.length - 1));
    setFuture((f) => [currentDesign, ...f]);
    setCurrentDesign(prev);
    setValidationStatus(validateWithEngine(prev));
  };

  // Redo
  const handleRedo = () => {
    if (future.length === 0) return;
    const next = future[0];
    setFuture((f) => f.slice(1));
    setHistory((h) => [...h, currentDesign]);
    setCurrentDesign(next);
    setValidationStatus(validateWithEngine(next));
  };

  // Rotate a piece 90°
  const handleRotateSelected = () => {
    if (!selectedPiece) return;
    const updated = JSON.parse(JSON.stringify(currentDesign));
    const zone = updated.placements.find((p) => p.zoneId === selectedPiece.zoneId);
    if (!zone || !zone.scraps || !zone.scraps[selectedPiece.scrapIdx]) return;

    const targetScrap = zone.scraps[selectedPiece.scrapIdx];
    // Swap width and height
    const tempW = targetScrap.cutWidth;
    targetScrap.cutWidth = targetScrap.cutHeight;
    targetScrap.cutHeight = tempW;
    targetScrap.rotated = !targetScrap.rotated;

    // Check grain line on original
    const orig = pile.find((p) => p.id === targetScrap.scrapId);
    if (orig && (orig.stretchy === true || orig.stretchy === 'yes')) {
      targetScrap.stretchyClash = true;
    }

    pushChange(updated);
    setSelectedPiece({ ...selectedPiece, scrap: targetScrap });
  };

  // Swap selected piece with an available scrap from leftovers or another zone
  const handleSwapWithLeftover = (leftoverScrap) => {
    if (!selectedPiece) return;
    const updated = JSON.parse(JSON.stringify(currentDesign));
    const zone = updated.placements.find((p) => p.zoneId === selectedPiece.zoneId);
    if (!zone || !zone.scraps || !zone.scraps[selectedPiece.scrapIdx]) return;

    // Replace scrap in zone
    const oldScrap = zone.scraps[selectedPiece.scrapIdx];
    zone.scraps[selectedPiece.scrapIdx] = {
      scrapId: leftoverScrap.id,
      color: leftoverScrap.color,
      fabricType: leftoverScrap.fabricType,
      cutWidth: oldScrap.cutWidth,
      cutHeight: oldScrap.cutHeight,
      print: leftoverScrap.print || 'plain',
    };

    // Replace in leftovers
    if (updated.leftovers) {
      updated.leftovers = updated.leftovers.filter((l) => l.id !== leftoverScrap.id);
      const returned = pile.find((p) => p.id === oldScrap.scrapId) || {
        id: oldScrap.scrapId,
        color: oldScrap.color,
        width: oldScrap.cutWidth,
        height: oldScrap.cutHeight,
      };
      updated.leftovers.push(returned);
    }

    pushChange(updated);
    setSelectedPiece(null);
  };

  // "Refresh style" button: Calls the engine to re-assign balanced style
  const handleRefreshStyle = () => {
    try {
      // Rotate pile order slightly to create a fresh style
      const shuffledPile = [...pile].reverse();
      const fresh = buildDesign(
        shuffledPile,
        currentDesign.productId,
        currentDesign.sizeKey,
        currentDesign.style || 'patchwork',
        { variant: currentDesign.variant || 'plain' }
      );
      if (fresh.success && fresh.fits) {
        pushChange(fresh);
      }
    } catch (e) {
      console.warn('Refresh style error:', e);
    }
  };

  // Voice help
  const handleSpeakStatus = () => {
    if (isSpeaking) {
      soundManager.stop();
      setIsSpeaking(false);
      return;
    }
    const text = validationStatus.isValid
      ? `${t.customizeTitle}. ${t.fitStatusValid}`
      : `${t.customizeTitle}. ${t.fitStatusInvalid}. ${validationStatus.message}`;
    soundManager.speak(text, lang);
    setIsSpeaking(true);
  };

  return (
    <div className="space-y-4 pb-36">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-4 shadow-sm border border-emerald-700 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-2xl bg-emerald-700/80 hover:bg-emerald-600 text-white transition"
            title={t.cancel}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded text-emerald-200 border border-emerald-500/40 uppercase font-black tracking-wider">
              Interactive Canvas
            </span>
            <h2 className="text-lg font-black text-white leading-tight mt-0.5">
              {t.customizeTitle}
            </h2>
            <p className="text-xs text-emerald-100 font-medium">
              {t.customizeSub}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleSpeakStatus}
            className={`p-2.5 rounded-full transition ${
              isSpeaking
                ? 'bg-amber-400 text-amber-950 ring-4 ring-amber-300/40'
                : 'bg-emerald-700/80 hover:bg-emerald-600 text-white'
            }`}
            title={t.listen}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => onOpenHelp({ title: t.customizeTitle, message: t.helpCustomize })}
            className="p-2.5 rounded-full bg-emerald-700/80 hover:bg-emerald-600 text-white transition"
            title={t.help}
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Real-Time Engine Validation Status Banner (MANDATORY REQUIREMENT 3) */}
      <div>
        {validationStatus.isValid ? (
          <div className="bg-emerald-50 border-2 border-emerald-500 text-emerald-950 p-3 rounded-2xl flex items-center justify-between text-xs font-bold shadow-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[3]" />
              <span>{t.fitStatusValid}</span>
            </div>
            <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full uppercase font-bold">
              {t.readyBadge || 'Ready'}
            </span>
          </div>
        ) : (
          <div className="bg-rose-50 border-2 border-rose-500 text-rose-950 p-3 rounded-2xl space-y-1 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-900">
              <AlertTriangle className="w-4 h-4 text-rose-600 stroke-[3]" />
              <span>{t.fitStatusInvalid}</span>
            </div>
            <p className="text-[11px] text-rose-800 leading-snug pl-6">
              {validationStatus.message}
            </p>
          </div>
        )}
      </div>

      {/* Stage 4A: Finished 2D Product Live Preview */}
      <Product2DPreview
        design={currentDesign}
        t={t}
        lang={lang}
        selectedZoneId={selectedPiece?.zoneId}
        onSelectZone={(zoneId) => {
          if (!zoneId) {
            setSelectedPiece(null);
            return;
          }
          const placement = currentDesign.placements?.find((p) => p.zoneId === zoneId);
          if (placement && placement.scraps && placement.scraps.length > 0) {
            setSelectedPiece({
              zoneId: placement.zoneId,
              scrapIdx: 0,
              scrap: placement.scraps[0],
            });
          }
        }}
      />

      {/* Canvas Controls Toolbar (Rotate, Zoom, Undo, Redo, Refresh Style) */}
      <div className="bg-white rounded-2xl p-3 border border-stone-200 shadow-xs flex items-center justify-between gap-1 text-xs">
        {/* Undo / Redo */}
        <div className="flex items-center bg-stone-100 p-0.5 rounded-xl border border-stone-200">
          <button
            type="button"
            onClick={handleUndo}
            disabled={history.length === 0}
            className="p-2 rounded-lg text-stone-700 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition"
            title={t.undo}
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleRedo}
            disabled={future.length === 0}
            className="p-2 rounded-lg text-stone-700 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition"
            title={t.redo}
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        {/* Rotate Piece */}
        <button
          type="button"
          onClick={handleRotateSelected}
          disabled={!selectedPiece}
          className="px-3 py-2 bg-stone-100 hover:bg-amber-100 text-stone-800 rounded-xl font-bold flex items-center gap-1.5 border border-stone-200 disabled:opacity-40 transition"
          title={t.rotateBtn}
        >
          <RotateCw className="w-3.5 h-3.5 text-amber-700" />
          <span>{t.rotateBtn}</span>
        </button>

        {/* Zoom Controls */}
        <div className="flex items-center bg-stone-100 p-0.5 rounded-xl border border-stone-200">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(75, z - 25))}
            disabled={zoomLevel <= 75}
            className="p-2 rounded-lg text-stone-700 hover:bg-white disabled:opacity-30 transition"
            title={t.zoomOutBtn}
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-black px-1.5 text-stone-600">
            {zoomLevel}%
          </span>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(150, z + 25))}
            disabled={zoomLevel >= 150}
            className="p-2 rounded-lg text-stone-700 hover:bg-white disabled:opacity-30 transition"
            title={t.zoomInBtn}
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Refresh Style Button */}
        <button
          type="button"
          onClick={handleRefreshStyle}
          className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl font-bold border border-emerald-300 transition"
          title={t.refreshStyleBtn}
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Selection prompt */}
      <div className="bg-stone-100 text-stone-700 px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2">
        <span className="text-base">👆</span>
        <span>
          {selectedPiece
            ? `Selected: ${selectedPiece.scrap.color} (${selectedPiece.scrap.cutWidth} × ${selectedPiece.scrap.cutHeight} cm). Rotate or swap below.`
            : t.selectPiecePrompt}
        </span>
      </div>

      {/* Visual Canvas Layout */}
      <div
        className="bg-stone-200/60 p-4 rounded-3xl border border-stone-300 space-y-3 transition-transform"
        style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
      >
        {currentDesign.placements?.map((placement) => {
          const dims = getZoneDimensions(currentDesign.productId, currentDesign.sizeKey, placement.zoneId, placement, currentDesign.variant);
          const zoneTitle = getTranslatedZoneName(placement.zoneId, placement.zoneName, t);
          return (
            <div
              key={placement.zoneId}
              className="bg-white rounded-2xl p-3 border border-stone-300 shadow-xs space-y-2"
            >
              <div className="flex items-start justify-between text-xs gap-2">
                <span className="font-bold text-stone-900">{zoneTitle}</span>
                <span className="text-[11px] text-stone-600 font-medium text-right">
                  Cut: <strong className="text-amber-900">{dims.cutCmText}</strong>{' '}
                  <span className="text-[10px] text-stone-400 font-normal">({dims.cutInText})</span>
                </span>
              </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {placement.scraps?.map((scrap, scrapIdx) => {
                const isSelected =
                  selectedPiece?.zoneId === placement.zoneId &&
                  selectedPiece?.scrapIdx === scrapIdx;
                const hex = getScrapHex(scrap.color);

                return (
                  <button
                    key={`${scrap.scrapId}-${scrapIdx}`}
                    type="button"
                    onClick={() =>
                      setSelectedPiece({
                        zoneId: placement.zoneId,
                        scrapIdx,
                        scrap,
                      })
                    }
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition relative ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/80 ring-3 ring-emerald-500/40 shadow-sm'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <span
                      className="w-8 h-8 rounded-lg border border-black/10 flex-shrink-0 flex items-center justify-center text-xs text-white font-bold shadow-xs"
                      style={{ backgroundColor: hex }}
                    >
                      {scrap.rotated ? '🔄' : ''}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold text-stone-800 capitalize truncate block">
                        {scrap.color}
                      </span>
                      <span className="text-[10px] text-stone-500 block">
                        {scrap.cutWidth} × {scrap.cutHeight} cm
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
      </div>

      {/* Available Leftovers To Swap In (When a piece is selected) */}
      {selectedPiece && (
        <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
              <ArrowLeftRight className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t.availableSwapsTitle}</span>
            </h4>
            <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-semibold">
              {currentDesign.leftovers?.length || 0} available
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
            {currentDesign.leftovers && currentDesign.leftovers.length > 0 ? (
              currentDesign.leftovers.map((leftover, idx) => {
                const hex = getScrapHex(leftover.color);
                return (
                  <button
                    key={`${leftover.id}-${idx}`}
                    type="button"
                    onClick={() => handleSwapWithLeftover(leftover)}
                    className="p-2 rounded-xl border border-stone-200 hover:border-emerald-600 bg-stone-50 hover:bg-emerald-50/50 flex items-center gap-2 text-left transition"
                  >
                    <span
                      className="w-6 h-6 rounded-md border border-black/10 flex-shrink-0"
                      style={{ backgroundColor: hex }}
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold text-stone-800 capitalize truncate block">
                        {leftover.color}
                      </span>
                      <span className="text-[10px] text-stone-500 block">
                        {leftover.width || leftover.cutWidth} × {leftover.height || leftover.cutHeight} cm
                      </span>
                    </div>
                  </button>
                );
              })
            ) : (
              <span className="text-xs text-stone-500 col-span-2 py-2">
                All fabric pieces are currently assigned in panels.
              </span>
            )}
          </div>
        </div>
      )}

      {/* Save / Done Customizing Button */}
      <div className="space-y-2 pt-2">
        <button
          type="button"
          onClick={() => onSave(currentDesign)}
          disabled={!validationStatus.isValid}
          className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white font-extrabold text-xs rounded-2xl shadow-md flex items-center justify-center gap-2 transition"
        >
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{t.doneCustomizingBtn}</span>
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="w-full py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs rounded-xl flex items-center justify-center transition"
        >
          <span>{t.cancel}</span>
        </button>
      </div>
    </div>
  );
}
