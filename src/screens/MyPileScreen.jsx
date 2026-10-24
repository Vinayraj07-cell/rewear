import React, { useState } from 'react';
import { 
  Layers, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Trash2, 
  Copy, 
  Edit3, 
  PlusCircle, 
  EyeOff, 
  Eye, 
  Check, 
  ArrowRight,
  ShieldAlert,
  Sliders,
  Volume2,
  Scissors,
  Plus,
  Minus,
  RefreshCw,
  X,
  Camera,
  Upload,
  Loader2
} from 'lucide-react';
import { COLOR_SWATCHES, FABRIC_TYPES } from '../i18n/translations';
import { calculateArea } from '../utils/storage';
import { soundManager } from '../utils/audio';
import { 
  SIZE_PRESETS, 
  SAMPLE_PILES, 
  validateQuantity, 
  validateDimensions, 
  createScrapItem,
  countPiecesTooSmallAfterMargin,
} from '../utils/pileHelpers';
import { clearAiPreviewDataAndResetLimit } from '../utils/aiPreviewService';
import { getAiProductSuggestion } from '../utils/aiSuggestionService';
import { suggestProductFromFabricImage, AI_HONESTY_LABEL } from '../utils/geminiService';

export default function MyPileScreen({ 
  pieces, 
  onToggleInclude, 
  onDeleteRequest, 
  onDuplicate, 
  onBulkAdd,
  onClearPile,
  onEditPiece, 
  onAddNew, 
  onWhatCanIMake,
  onLoadPile,
  scrapSafetyMarginCm = 0,
  onUpdateScrapSafetyMarginCm,
  t, 
  lang 
}) {
  const [groupBy, setGroupBy] = useState('color'); // 'color' or 'fabric'
  const [showClearModal, setShowClearModal] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [isAnalyzingPhoto, setIsAnalyzingPhoto] = useState(false);
  const [visionSuggestion, setVisionSuggestion] = useState(null);
  const [visionError, setVisionError] = useState(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState(null);
  const fileInputRef = React.useRef(null);

  const handleImageFileSelected = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    e.target.value = '';
    const reader = new FileReader();
    reader.onload = async () => {
      const base64DataUrl = reader.result;
      setUploadedImagePreview(base64DataUrl);
      setIsAnalyzingPhoto(true);
      setVisionError(null);
      setVisionSuggestion(null);

      try {
        const res = await suggestProductFromFabricImage(base64DataUrl);
        setVisionSuggestion(res);
      } catch (err) {
        setVisionError(err?.message || 'AI service unavailable');
      } finally {
        setIsAnalyzingPhoto(false);
      }
    };
    reader.readAsDataURL(file);
  };
  const [lastAddedMsg, setLastAddedMsg] = useState(null);

  // Bulk add state
  const [bulkQty, setBulkQty] = useState(5);
  const [selectedPreset, setSelectedPreset] = useState('14x14');
  const [customWidth, setCustomWidth] = useState(14);
  const [customHeight, setCustomHeight] = useState(14);
  const [bulkColor, setBulkColor] = useState('navy');
  const [bulkFabric, setBulkFabric] = useState('cotton');
  const [bulkPrint, setBulkPrint] = useState('plain'); // 'plain' or 'printed'

  const activePieces = pieces.filter((p) => p.included);
  const excludedPieces = pieces.filter((p) => !p.included);

  // Calculate total usable area in cm²
  const totalSqCm = activePieces.reduce((acc, p) => acc + calculateArea(p).sqCm, 0);
  const totalPiecesCount = activePieces.reduce((acc, p) => acc + (p.quantity || 1), 0);
  const totalSqInches = Math.round(totalSqCm / 6.4516);

  // Pieces turned too small when frayed margin is active
  const tooSmallCount = scrapSafetyMarginCm > 0
    ? countPiecesTooSmallAfterMargin(activePieces, scrapSafetyMarginCm)
    : 0;

  // Group pieces
  const groups = {};
  if (groupBy === 'color') {
    pieces.forEach((p) => {
      const colorObj = COLOR_SWATCHES.find((c) => c.id === p.color) || { family: 'other' };
      const familyName = colorObj.family === 'warm' 
        ? 'Warm Tones (రెడ్స్, ఆరెంజ్)' 
        : colorObj.family === 'cool' 
        ? 'Cool Tones (బ్లూస్, గ్రీన్స్)' 
        : 'Neutrals (వైట్, బ్లాక్, బీజ్, గ్రే)';
      if (!groups[familyName]) groups[familyName] = [];
      groups[familyName].push(p);
    });
  } else {
    pieces.forEach((p) => {
      const typeName = t.fabrics[p.fabricType] || p.fabricType;
      if (!groups[typeName]) groups[typeName] = [];
      groups[typeName].push(p);
    });
  }

  // Assess pile suitability
  const avgWidth = activePieces.length > 0 
    ? activePieces.reduce((sum, p) => sum + (p.usableWidth || p.width), 0) / activePieces.length 
    : 0;

  let assessmentText = t.pileAssessmentMedium;
  if (avgWidth < 18) {
    assessmentText = t.pileAssessmentSmall;
  } else if (avgWidth > 32) {
    assessmentText = t.pileAssessmentLarge;
  }

  // Compatibility analysis
  const hasStretch = activePieces.some((p) => p.stretch);
  const hasNonStretch = activePieces.some((p) => !p.stretch);
  const hasThick = activePieces.some((p) => p.thickness === 'thick');
  const hasThin = activePieces.some((p) => p.thickness === 'thin');
  
  const hasIncompatibility = (hasStretch && hasNonStretch) || (hasThick && hasThin);

  const handleSpeakSummary = () => {
    const text = `${t.pileAssessmentTitle}: ${assessmentText}. Total area is ${Math.round(totalSqCm)} square centimeters across ${totalPiecesCount} pieces.`;
    soundManager.speak(text, lang);
  };

  // Handle Preset Chip Selection
  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset.id);
    setCustomWidth(preset.width);
    setCustomHeight(preset.height);
  };

  // Handle Bulk Add Execution
  const handleExecuteBulkAdd = () => {
    const w = parseFloat(customWidth);
    const h = parseFloat(customHeight);
    const dim = validateDimensions(w, h);
    if (!dim.valid) return;

    const safeQty = validateQuantity(bulkQty);

    if (onBulkAdd) {
      onBulkAdd({
        width: dim.width,
        height: dim.height,
        color: bulkColor,
        fabricType: bulkFabric,
        print: bulkPrint,
        quantity: safeQty,
      });
    }

    const colorName = t.colors[bulkColor] || bulkColor;
    const fabricName = t.fabrics[bulkFabric]?.split(' ')[0] || bulkFabric;
    const msg = `✓ Added ${safeQty} × ${colorName} ${fabricName} (${dim.width}×${dim.height} cm)`;
    setLastAddedMsg(msg);
    setTimeout(() => {
      setLastAddedMsg(null);
    }, 3000);
  };

  return (
    <div className="space-y-4 pb-28">
      {/* Stage 2 Active: What Can I Make Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-4 shadow-md border-2 border-emerald-400/60 relative overflow-hidden">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-2xl bg-amber-400 text-stone-950 font-black text-xl shadow-sm">
            ✨
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-tight">
                {t.whatCanIMakeTitle}
              </h2>
              <span className="text-[10px] bg-amber-400 text-stone-900 font-extrabold px-1.5 py-0.5 rounded uppercase">
                Stage 2
              </span>
            </div>
            <p className="text-xs text-emerald-100 mt-1 leading-snug">
              {t.whatCanIMakeSub}
            </p>
            <div className="mt-3 space-y-2">
              {onWhatCanIMake && (
                <button
                  type="button"
                  onClick={onWhatCanIMake}
                  className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs rounded-2xl shadow-sm flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-stone-900" />
                  <span>{t.whatCanIMakeTitle} ({activePieces.length} scraps)</span>
                  <ArrowRight className="w-4 h-4 text-stone-900" />
                </button>
              )}

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAiSuggestion(getAiProductSuggestion(pieces, lang))}
                  className="py-2.5 px-3 bg-emerald-700/90 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-2xl shadow-sm flex items-center justify-center gap-1.5 border border-emerald-500/50 transition cursor-pointer truncate"
                  title="Get AI Product Suggestion from scrap pile"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="truncate">Pile AI Suggestion</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isAnalyzingPhoto}
                  className="py-2.5 px-3 bg-stone-900 hover:bg-stone-800 text-amber-300 font-extrabold text-xs rounded-2xl shadow-sm flex items-center justify-center gap-1.5 border border-amber-400/30 transition cursor-pointer disabled:opacity-50 truncate"
                  title="Upload fabric photo from gallery for Gemini AI vision suggestion"
                >
                  {isAnalyzingPhoto ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-300 shrink-0" />
                      <span className="truncate">Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="truncate">Photo AI Vision</span>
                    </>
                  )}
                </button>
              </div>

              {/* Hidden file input for photo upload */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageFileSelected}
                className="hidden"
                data-testid="fabric-image-upload-input"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Top Pile Stats Card */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <h3 className="text-base font-bold text-stone-900">{t.pileTitle}</h3>
            <p className="text-xs text-stone-500">{t.pileSub}</p>
          </div>
          <div className="flex items-center gap-2">
            {pieces.length > 0 && onClearPile && (
              <button
                type="button"
                data-testid="clear-pile-btn"
                onClick={() => setShowClearModal(true)}
                className="px-2.5 py-1 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 transition flex items-center gap-1 shadow-2xs"
                title={t.clearPileBtn || 'Clear Pile'}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.clearPileBtn || 'Clear'}</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleSpeakSummary}
              className="p-2 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition"
              title={t.listen}
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3">
          <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 text-center">
            <span className="text-xs font-semibold text-stone-500 block">
              {t.totalPieces}
            </span>
            <span className="text-2xl font-black text-emerald-800 mt-0.5 block">
              {totalPiecesCount}
            </span>
            <span className="text-[10px] text-stone-500">
              ({excludedPieces.length} excluded)
            </span>
          </div>

          <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 text-center">
            <span className="text-xs font-semibold text-stone-500 block">
              {t.totalArea}
            </span>
            <span className="text-xl font-black text-emerald-800 mt-0.5 block">
              {Math.round(totalSqCm).toLocaleString()} cm²
            </span>
            <span className="text-[10px] text-stone-500">
              ≈ {totalSqInches} sq. inches
            </span>
          </div>
        </div>

        {/* Tailor Suitability Message (Brief 5.3) */}
        <div className="mt-3 bg-amber-50/80 border border-amber-200/90 rounded-2xl p-3.5 flex items-start space-x-2.5">
          <span className="text-xl">💡</span>
          <div className="text-xs text-amber-950">
            <span className="font-bold block mb-0.5">{t.pileAssessmentTitle}</span>
            <span className="leading-snug block">{assessmentText}</span>
          </div>
        </div>

        {/* Compatibility Check */}
        <div className="mt-3">
          {hasIncompatibility ? (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-3 flex items-start space-x-2.5 text-xs text-orange-950">
              <AlertTriangle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">{t.compatibilityTitle}</span>
                <span className="leading-snug block">{t.compatibilityNotice}</span>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-2.5 flex items-center space-x-2 text-xs text-emerald-950">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="leading-snug">{t.compatibilityGood}</span>
            </div>
          )}
        </div>
      </div>

      {/* FEATURE 1: "Try a sample pile" with 3 Ready Piles */}
      {onLoadPile && (
        <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-amber-100 text-amber-900">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900">
                  {t.trySamplePileTitle || 'Try a sample pile'}
                </h4>
                <p className="text-[11px] text-stone-500">
                  {t.trySamplePileSub || 'One tap loads a ready fabric scrap pile'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* 1. Neutral (navy/beige/grey) */}
            <button
              type="button"
              data-testid="sample-pile-neutral-btn"
              onClick={() => {
                onLoadPile('neutral');
                setLastAddedMsg('✓ Loaded Neutral sample pile (30 pcs)');
                setTimeout(() => setLastAddedMsg(null), 3000);
              }}
              className="p-2.5 bg-stone-50 hover:bg-sky-50 border border-stone-200 hover:border-sky-300 rounded-2xl text-left transition flex flex-col justify-between group shadow-2xs"
            >
              <div>
                <span className="text-base block mb-1">👔</span>
                <span className="text-xs font-bold text-stone-900 group-hover:text-sky-900 block leading-tight">
                  Neutral
                </span>
                <span className="text-[10px] text-stone-500 block mt-0.5 leading-tight">
                  Navy, beige, grey
                </span>
              </div>
              <div className="mt-2 pt-1 border-t border-stone-200/60 flex items-center justify-between">
                <span className="text-[10px] font-bold text-sky-700 bg-sky-100/70 px-1.5 py-0.5 rounded">
                  30 pcs
                </span>
                <div className="flex -space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A8A] border border-white" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D6C0A4] border border-white" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#64748B] border border-white" />
                </div>
              </div>
            </button>

            {/* 2. Colourful */}
            <button
              type="button"
              data-testid="sample-pile-colourful-btn"
              onClick={() => {
                onLoadPile('colourful');
                setLastAddedMsg('✓ Loaded Colourful sample pile (36 pcs)');
                setTimeout(() => setLastAddedMsg(null), 3000);
              }}
              className="p-2.5 bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 rounded-2xl text-left transition flex flex-col justify-between group shadow-2xs"
            >
              <div>
                <span className="text-base block mb-1">🎨</span>
                <span className="text-xs font-bold text-stone-900 group-hover:text-amber-900 block leading-tight">
                  Colourful
                </span>
                <span className="text-[10px] text-stone-500 block mt-0.5 leading-tight">
                  Pops & prints
                </span>
              </div>
              <div className="mt-2 pt-1 border-t border-stone-200/60 flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100/70 px-1.5 py-0.5 rounded">
                  36 pcs
                </span>
                <div className="flex -space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] border border-white" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EC4899] border border-white" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308] border border-white" />
                </div>
              </div>
            </button>

            {/* 3. Mixed Fabrics */}
            <button
              type="button"
              data-testid="sample-pile-mixed-btn"
              onClick={() => {
                onLoadPile('mixed_fabrics');
                setLastAddedMsg('✓ Loaded Mixed Fabrics sample pile (30 pcs)');
                setTimeout(() => setLastAddedMsg(null), 3000);
              }}
              className="p-2.5 bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 rounded-2xl text-left transition flex flex-col justify-between group shadow-2xs"
            >
              <div>
                <span className="text-base block mb-1">🧵</span>
                <span className="text-xs font-bold text-stone-900 group-hover:text-emerald-900 block leading-tight">
                  Mixed
                </span>
                <span className="text-[10px] text-stone-500 block mt-0.5 leading-tight">
                  Denim, silk, etc.
                </span>
              </div>
              <div className="mt-2 pt-1 border-t border-stone-200/60 flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                  30 pcs
                </span>
                <div className="flex -space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1E293B] border border-white" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#881337] border border-white" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#65A30D] border border-white" />
                </div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* FEATURE 2 & 3: Bulk Add Row with Quantity Stepper, Size Presets, Color, Fabric, Print */}
      <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs space-y-3.5">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-emerald-100 text-emerald-800">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">
                {t.quickAddTitle || 'Quick Add Scraps'}
              </h4>
              <p className="text-[10px] text-stone-500">
                Add batches fast — tap Add repeatedly to add more
              </p>
            </div>
          </div>
        </div>

        {/* Row 1: Quantity Stepper + Size Presets as Chips */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-stone-700">
              {t.sizePresetsLabel || 'Size Presets'}:
            </span>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-1 bg-stone-100 px-2 py-1 rounded-xl border border-stone-200">
              <span className="text-[10px] font-semibold text-stone-500 mr-1">Qty:</span>
              <button
                type="button"
                data-testid="bulk-qty-decrement"
                onClick={() => setBulkQty((prev) => Math.max(1, prev - 1))}
                className="w-5 h-5 rounded-lg bg-white hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-xs shadow-2xs transition"
              >
                <Minus className="w-3 h-3" />
              </button>
              <input
                type="number"
                min="1"
                max="99"
                data-testid="bulk-qty-input"
                value={bulkQty}
                onChange={(e) => setBulkQty(validateQuantity(e.target.value))}
                className="w-8 text-center text-xs font-black text-stone-900 bg-transparent focus:outline-hidden"
              />
              <button
                type="button"
                data-testid="bulk-qty-increment"
                onClick={() => setBulkQty((prev) => Math.min(99, prev + 1))}
                className="w-5 h-5 rounded-lg bg-white hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-xs shadow-2xs transition"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Size Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            {SIZE_PRESETS.map((preset) => {
              const isSelected = selectedPreset === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  data-testid={`size-chip-${preset.id}`}
                  onClick={() => handleSelectPreset(preset)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition border ${
                    isSelected
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}

            {/* Custom Chip */}
            <button
              type="button"
              data-testid="size-chip-custom"
              onClick={() => setSelectedPreset('custom')}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition border ${
                selectedPreset === 'custom'
                  ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
              }`}
            >
              {t.customSizeLabel || 'Custom'}
            </button>
          </div>

          {/* Custom Dimension Inputs when 'custom' is selected */}
          {selectedPreset === 'custom' && (
            <div className="flex items-center gap-2 bg-stone-50 p-2 rounded-xl border border-stone-200 text-xs">
              <span className="font-semibold text-stone-600">Custom (cm):</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="1"
                  max="200"
                  data-testid="custom-width-input"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(e.target.value)}
                  placeholder="W"
                  className="w-14 px-2 py-1 bg-white border border-stone-300 rounded-lg text-center font-bold text-stone-900 focus:outline-emerald-600"
                />
                <span className="text-stone-400 font-bold">×</span>
                <input
                  type="number"
                  min="1"
                  max="200"
                  data-testid="custom-height-input"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(e.target.value)}
                  placeholder="H"
                  className="w-14 px-2 py-1 bg-white border border-stone-300 rounded-lg text-center font-bold text-stone-900 focus:outline-emerald-600"
                />
                <span className="text-stone-500 font-medium">cm</span>
              </div>
            </div>
          )}
        </div>

        {/* Row 2: Fabric Selector + Print Flag */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-stone-700">Fabric & Pattern:</span>
            
            {/* Print vs Plain Toggle */}
            <div className="flex items-center bg-stone-100 p-0.5 rounded-xl border border-stone-200 text-[11px]">
              <button
                type="button"
                data-testid="bulk-print-plain"
                onClick={() => setBulkPrint('plain')}
                className={`px-2.5 py-0.5 rounded-lg font-bold transition ${
                  bulkPrint === 'plain'
                    ? 'bg-white text-stone-900 shadow-2xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                {t.printPlain || 'Plain'}
              </button>
              <button
                type="button"
                data-testid="bulk-print-printed"
                onClick={() => setBulkPrint('printed')}
                className={`px-2.5 py-0.5 rounded-lg font-bold transition ${
                  bulkPrint === 'printed'
                    ? 'bg-amber-400 text-stone-900 shadow-2xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                {t.printPatterned || 'Printed'}
              </button>
            </div>
          </div>

          {/* Fabric Chips */}
          <div className="flex flex-wrap gap-1">
            {FABRIC_TYPES.slice(0, 6).map((fabric) => {
              const isSelected = bulkFabric === fabric.id;
              const fabricName = t.fabrics[fabric.id]?.split(' ')[0] || fabric.id;
              return (
                <button
                  key={fabric.id}
                  type="button"
                  data-testid={`bulk-fabric-${fabric.id}`}
                  onClick={() => setBulkFabric(fabric.id)}
                  className={`px-2 py-1 rounded-xl text-[11px] font-bold transition border flex items-center gap-1 ${
                    isSelected
                      ? 'bg-emerald-100 text-emerald-950 border-emerald-400 shadow-2xs'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-600 border-stone-200'
                  }`}
                >
                  <span>{fabric.icon}</span>
                  <span>{fabricName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 3: Colour Swatches + Add Button */}
        <div className="space-y-2 pt-1 border-t border-stone-100">
          <span className="text-[11px] font-bold text-stone-700 block">
            Colour ({t.colors[bulkColor] || bulkColor}):
          </span>

          <div className="flex items-center justify-between gap-2">
            {/* Color Swatches Grid / Scroll */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-[210px] sm:max-w-none no-scrollbar">
              {COLOR_SWATCHES.map((swatch) => {
                const isSelected = bulkColor === swatch.id;
                return (
                  <button
                    key={swatch.id}
                    type="button"
                    data-testid={`bulk-color-${swatch.id}`}
                    onClick={() => setBulkColor(swatch.id)}
                    style={{ backgroundColor: swatch.hex }}
                    className={`w-6 h-6 rounded-full flex-shrink-0 border transition-all flex items-center justify-center relative ${
                      isSelected
                        ? 'ring-2 ring-emerald-700 ring-offset-2 scale-110 shadow-xs'
                        : 'border-stone-300 hover:scale-105'
                    }`}
                    title={t.colors[swatch.id] || swatch.id}
                  >
                    {isSelected && (
                      <Check
                        className={`w-3 h-3 stroke-[3] ${
                          swatch.id === 'white' || swatch.id === 'beige' || swatch.id === 'yellow'
                            ? 'text-stone-900'
                            : 'text-white'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* "Add" Button — Repeats without leaving screen */}
            <button
              type="button"
              data-testid="bulk-add-btn"
              onClick={handleExecuteBulkAdd}
              className="flex-1 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 active:scale-95 whitespace-nowrap"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add {bulkQty > 1 ? `${bulkQty} pcs` : '1 pc'}</span>
            </button>
          </div>

          {/* Feedback banner when scraps added */}
          {lastAddedMsg && (
            <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-2 flex items-center justify-between text-xs text-emerald-950 font-bold animate-in fade-in slide-in-from-top-1">
              <span>{lastAddedMsg}</span>
              <button
                type="button"
                onClick={() => setLastAddedMsg(null)}
                className="text-emerald-700 hover:text-emerald-900 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Frayed / Uneven Scraps Safety Margin Setting */}
      <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-2 rounded-2xl bg-amber-100 text-amber-800 flex-shrink-0">
              <Scissors className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-stone-900 block truncate sm:whitespace-normal">
                {t.frayedScrapsSwitchLabel || 'My scraps are frayed or uneven'}
              </span>
              <span className="text-[11px] text-stone-500 block leading-tight mt-0.5">
                {t.frayedScrapsExplanation || 'Shrinks each scrap before fitting so frayed or uneven edges are safely trimmed away.'}
              </span>
            </div>
          </div>

          {/* Toggle Switch */}
          <button
            type="button"
            role="switch"
            aria-checked={scrapSafetyMarginCm > 0}
            data-testid="frayed-switch-button"
            onClick={() => {
              if (onUpdateScrapSafetyMarginCm) {
                onUpdateScrapSafetyMarginCm(scrapSafetyMarginCm > 0 ? 0 : 0.5);
              }
            }}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
              scrapSafetyMarginCm > 0 ? 'bg-emerald-600' : 'bg-stone-300'
            }`}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                scrapSafetyMarginCm > 0 ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* When enabled: Margin choice selector & Safety allowance notice */}
        {scrapSafetyMarginCm > 0 && (
          <div className="pt-2 border-t border-stone-100 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-700">
                {t.frayedScrapsMarginChoice || 'Safety margin per edge'}:
              </span>
              <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl border border-stone-200">
                {[0.5, 1.0].map((marginVal) => {
                  const isSelected = scrapSafetyMarginCm === marginVal;
                  return (
                    <button
                      key={marginVal}
                      type="button"
                      data-testid={`margin-choice-${marginVal}`}
                      onClick={() => onUpdateScrapSafetyMarginCm && onUpdateScrapSafetyMarginCm(marginVal)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                        isSelected
                          ? 'bg-emerald-800 text-white shadow-xs'
                          : 'text-stone-600 hover:text-stone-900 bg-transparent'
                      }`}
                    >
                      {marginVal} cm
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explicit Notice: Safety allowance, not a measurement */}
            <div className="bg-amber-50/90 border border-amber-200/90 rounded-xl p-2.5 flex items-center gap-2 text-[11px] text-amber-950 font-medium">
              <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0" />
              <span>
                {t.frayedScrapsSafetyAllowanceLabel || 'This is a safety allowance, not a measurement.'}
              </span>
            </div>

            {/* Warning banner when pieces become too small once frayed edge is removed */}
            {tooSmallCount > 0 && (
              <div
                data-testid="frayed-too-small-warning"
                className="bg-amber-100/90 border border-amber-300 text-amber-950 rounded-xl p-2.5 flex items-center gap-2 text-xs font-semibold"
              >
                <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0" />
                <span>
                  {tooSmallCount === 1
                    ? (t.frayedPieceTooSmallWarningSingular || '1 piece is too small once the frayed edge is removed')
                    : (t.frayedPiecesTooSmallWarning
                        ? t.frayedPiecesTooSmallWarning.replace('{count}', tooSmallCount)
                        : `${tooSmallCount} pieces are too small once the frayed edge is removed`)}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Grouping Filter Buttons & Scraps Summary Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-stone-700">Group By:</span>
          <div className="flex bg-stone-200/80 p-0.5 rounded-xl border border-stone-300">
            <button
              type="button"
              onClick={() => setGroupBy('color')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                groupBy === 'color'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-stone-600'
              }`}
            >
              {t.groupByColour}
            </button>
            <button
              type="button"
              onClick={() => setGroupBy('fabric')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                groupBy === 'fabric'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-stone-600'
              }`}
            >
              {t.groupByFabric}
            </button>
          </div>
        </div>

        {/* Clear Pile Button */}
        {pieces.length > 0 && onClearPile && (
          <button
            type="button"
            data-testid="clear-pile-secondary-btn"
            onClick={() => setShowClearModal(true)}
            className="text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded-xl transition flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.clearPileBtn || 'Clear Pile'}</span>
          </button>
        )}
      </div>

      {/* Pieces List by Group */}
      {Object.keys(groups).length === 0 ? (
        <div className="bg-white rounded-3xl p-6 text-center border border-stone-200 space-y-4">
          <span className="text-4xl">🧺</span>
          <h3 className="text-sm font-bold text-stone-900">{t.emptyPileTitle}</h3>
          <p className="text-xs text-stone-600 max-w-xs mx-auto">
            {t.emptyPileDesc || 'Your pile is currently empty. Try one of the ready sample piles above or use the quick add tool!'}
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={onAddNew}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition"
            >
              {t.addNewPieceBtn}
            </button>
          </div>
        </div>
      ) : (
        Object.entries(groups).map(([groupTitle, groupPieces]) => (
          <div key={groupTitle} className="space-y-2">
            <div className="flex items-center space-x-2 px-1">
              <span className="text-xs font-bold text-stone-800">{groupTitle}</span>
              <span className="text-[10px] bg-stone-200 text-stone-700 px-1.5 py-0.2 rounded-full font-bold">
                {groupPieces.length}
              </span>
            </div>

            <div className="space-y-2">
              {groupPieces.map((piece) => {
                const colorObj = COLOR_SWATCHES.find((c) => c.id === piece.color) || COLOR_SWATCHES[0];
                const areaInfo = calculateArea(piece);

                return (
                  <div
                    key={piece.id}
                    className={`bg-white rounded-2xl p-3.5 border transition-all shadow-xs flex items-center justify-between ${
                      piece.included
                        ? 'border-stone-200'
                        : 'border-dashed border-stone-300 opacity-60 bg-stone-50'
                    }`}
                  >
                    {/* Color Swatch & Basic Info */}
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      {/* Visual Fabric Thumbnail */}
                      <div
                        style={{ backgroundColor: colorObj.hex }}
                        className="w-11 h-11 rounded-xl shadow-xs border flex items-center justify-center flex-shrink-0 relative overflow-hidden"
                      >
                        {piece.print === 'printed' && (
                          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:6px_6px]" />
                        )}
                        {piece.isIrregular && (
                          <span className="absolute bottom-0.5 right-0.5 text-[8px] bg-amber-400 text-stone-900 px-0.5 rounded font-black">
                            IRR
                          </span>
                        )}
                      </div>

                      {/* Text Description */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-stone-900 truncate">
                            {t.fabrics[piece.fabricType]?.split(' ')[0] || piece.fabricType}
                          </span>
                          <span className="text-[10px] bg-stone-100 text-stone-700 px-1.5 py-0.2 rounded font-semibold">
                            {piece.quantity || 1} {piece.quantity > 1 ? 'pcs' : 'pc'}
                          </span>
                        </div>

                        <p className="text-[11px] text-stone-600 mt-0.5 font-medium">
                          {piece.usableWidth || piece.width} × {piece.usableHeight || piece.height} {piece.unit}
                          {piece.isIrregular && ' (usable clean)'}
                        </p>

                        <div className="flex items-center gap-2 text-[10px] text-stone-400 mt-0.5">
                          <span>{t.colors[piece.color] || piece.color}</span>
                          <span>•</span>
                          <span>{piece.feel}</span>
                          <span>•</span>
                          <span>{piece.thickness}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons: Toggle, Edit, Duplicate, Delete */}
                    <div className="flex items-center space-x-1 pl-2">
                      {/* Toggle Include / Exclude */}
                      <button
                        type="button"
                        onClick={() => onToggleInclude(piece.id)}
                        className={`p-2 rounded-xl transition ${
                          piece.included
                            ? 'text-emerald-700 hover:bg-emerald-50'
                            : 'text-stone-400 hover:bg-stone-200'
                        }`}
                        title={piece.included ? t.includedInPile : t.excludedFromPile}
                      >
                        {piece.included ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => onEditPiece(piece)}
                        className="p-2 rounded-xl text-stone-600 hover:bg-stone-100 transition"
                        title={t.edit}
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      {/* FEATURE: Duplicate Button on any piece */}
                      <button
                        type="button"
                        data-testid={`duplicate-btn-${piece.id}`}
                        onClick={() => onDuplicate(piece.id)}
                        className="p-2 rounded-xl text-stone-700 hover:bg-stone-100 active:scale-95 transition"
                        title={t.duplicate || 'Duplicate'}
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => onDeleteRequest(piece.id)}
                        className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition"
                        title={t.delete}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}

      {/* Floating Add Piece Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onAddNew}
          className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl shadow-md flex items-center justify-center gap-2 text-xs transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t.addNewPieceBtn}</span>
        </button>
      </div>

      {/* Live Demo Reset / Clear Cache UI */}
      <div className="pt-2 pb-1 text-center">
        <button
          type="button"
          data-testid="clear-ai-cache-btn"
          onClick={() => {
            clearAiPreviewDataAndResetLimit();
            setLastAddedMsg(t.cacheClearedSuccessMsg || '✓ Cache cleared & daily limits reset');
            setTimeout(() => setLastAddedMsg(null), 3000);
          }}
          className="text-[11px] text-stone-600 hover:text-stone-800 underline underline-offset-2 transition py-1 px-2 rounded cursor-pointer"
        >
          {t.clearCacheBtn || 'Clear Cache'}
        </button>
      </div>

      {/* FEATURE 4: Clear Pile Confirmation Modal */}
      {showClearModal && (
        <div 
          data-testid="clear-pile-modal"
          className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-xl border border-stone-200">
            <div className="flex items-start space-x-3 text-red-600">
              <div className="p-2.5 bg-red-100 rounded-2xl flex-shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  {t.clearPileConfirmTitle || 'Clear all scraps?'}
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-snug">
                  {t.clearPileConfirmMessage || 'This will remove all pieces from your pile. This cannot be undone.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
              <button
                type="button"
                data-testid="cancel-clear-pile-btn"
                onClick={() => setShowClearModal(false)}
                className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl transition"
              >
                {t.cancel || 'Cancel'}
              </button>
              <button
                type="button"
                data-testid="confirm-clear-pile-btn"
                onClick={() => {
                  if (onClearPile) onClearPile();
                  setShowClearModal(false);
                }}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
              >
                {t.clearPileConfirmBtn || 'Yes, Clear Pile'}
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Gemini AI Vision Suggestion Modal (Task A11) */}
      {(uploadedImagePreview || isAnalyzingPhoto) && (
        <div className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-stone-200 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center font-bold text-base shadow-xs">
                  👁️
                </div>
                <div>
                  <h3 className="text-sm font-black text-stone-900 leading-tight">
                    Gemini AI Vision Analysis
                  </h3>
                  <span className="text-[10px] text-stone-500 font-medium">
                    Tailor Fabric Recognition
                  </span>
                </div>
              </div>
              {!isAnalyzingPhoto && (
                <button
                  type="button"
                  onClick={() => {
                    setUploadedImagePreview(null);
                    setVisionSuggestion(null);
                    setVisionError(null);
                  }}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full transition cursor-pointer"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Uploaded Image Preview & Loading Indicator */}
            <div className="relative w-full h-36 bg-stone-100 rounded-2xl overflow-hidden border border-stone-200 flex items-center justify-center">
              {uploadedImagePreview && (
                <img
                  src={uploadedImagePreview}
                  alt="Fabric upload preview"
                  className="w-full h-full object-cover"
                />
              )}
              {isAnalyzingPhoto && (
                <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs flex flex-col items-center justify-center text-white gap-2 p-3 text-center">
                  <Loader2 className="w-6 h-6 animate-spin text-amber-300" />
                  <span className="text-xs font-bold text-white">
                    Analyzing texture, size & weave...
                  </span>
                  <span className="text-[10px] text-amber-200">
                    Calling Gemini 1.5 Flash Vision API
                  </span>
                </div>
              )}
            </div>

            {/* Error State: Graceful Failure */}
            {visionError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-2xl space-y-1">
                <div className="flex items-center gap-1.5 text-red-800 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>AI service unavailable</span>
                </div>
                <p className="text-[11px] text-red-700 leading-tight">
                  {visionError}
                </p>
                <p className="text-[10px] text-stone-500 pt-1">
                  You can set your Gemini API key in <code className="bg-stone-200 px-1 py-0.5 rounded">.env</code> (VITE_GEMINI_API_KEY).
                </p>
              </div>
            )}

            {/* Success State: Clean Card with Strict Honesty Rule */}
            {visionSuggestion && (
              <div className="space-y-3">
                <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md inline-block">
                    Tailor Recommendation
                  </span>
                  <p className="text-xs text-stone-800 leading-relaxed font-medium">
                    {visionSuggestion.suggestion}
                  </p>
                </div>

                {/* Mandatory Honesty Rule Badge */}
                <div className="p-2.5 bg-amber-50 border border-amber-300 rounded-2xl text-[11px] font-black text-amber-950 text-center shadow-2xs">
                  {AI_HONESTY_LABEL}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setUploadedImagePreview(null);
                  setVisionSuggestion(null);
                  setVisionError(null);
                  if (onWhatCanIMake) onWhatCanIMake();
                }}
                className="py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <span>Make Product</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setUploadedImagePreview(null);
                  setVisionSuggestion(null);
                  setVisionError(null);
                }}
                className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-2xl font-bold text-xs transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Suggestion Modal (Task A11 lite) */}
      {aiSuggestion && (
        <div className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-stone-200 space-y-3.5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center font-bold text-base shadow-xs">
                  ✨
                </div>
                <div>
                  <h3 className="text-sm font-black text-stone-900">
                    AI Product Suggestion
                  </h3>
                  <span className="text-[10px] bg-amber-100 text-amber-900 font-extrabold px-2 py-0.5 rounded-full border border-amber-300 inline-block mt-0.5">
                    {aiSuggestion.label}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAiSuggestion(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full transition"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500 font-semibold">Suggested Item:</span>
                <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {aiSuggestion.productName}
                </span>
              </div>
              <p className="text-xs text-stone-700 leading-snug">
                {aiSuggestion.reason}
              </p>
            </div>

            <div className="p-2.5 bg-amber-50/80 rounded-2xl border border-amber-200 text-[11px] text-amber-900 leading-tight">
              <span className="font-bold block mb-0.5">⚠️ Tailor Verification Rule</span>
              {aiSuggestion.recommendation}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setAiSuggestion(null);
                  if (onWhatCanIMake) onWhatCanIMake();
                }}
                className="py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <span>Make Product</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setAiSuggestion(null)}
                className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-2xl font-bold text-xs transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
