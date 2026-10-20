import React, { useState } from 'react';
import { 
  Camera, 
  Layers, 
  Plus, 
  Minus, 
  Check, 
  Sparkles, 
  AlertCircle, 
  Copy, 
  ArrowRight,
  Maximize2,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { COLOR_SWATCHES, FABRIC_TYPES } from '../i18n/translations';

export default function AddPieceScreen({ 
  onAddPiece, 
  onContinueToPile, 
  t, 
  editingPiece = null,
  onCancelEdit = null
}) {
  const [tab, setTab] = useState('manual');
  
  // Form State
  const [fabricType, setFabricType] = useState(editingPiece?.fabricType || 'cotton');
  const [unit, setUnit] = useState(editingPiece?.unit || 'cm');
  const [width, setWidth] = useState(editingPiece?.width || 25);
  const [height, setHeight] = useState(editingPiece?.height || 20);
  const [color, setColor] = useState(editingPiece?.color || 'navy');
  const [print, setPrint] = useState(editingPiece?.print || 'plain');
  const [quantity, setQuantity] = useState(editingPiece?.quantity || 1);
  const [isIrregular, setIsIrregular] = useState(editingPiece?.isIrregular || false);
  
  // Feedback / validation message
  const [feedback, setFeedback] = useState(null);

  // Calculate clean usable rectangle for irregular pieces (approx 80-85% clean inner rectangle)
  const usableWidth = isIrregular ? Math.round(width * 0.85) : width;
  const usableHeight = isIrregular ? Math.round(height * 0.82) : height;
  const rawArea = width * height * quantity;
  const usableArea = usableWidth * usableHeight * quantity;
  const wasteTrim = isIrregular ? rawArea - usableArea : 0;

  const currentColorObj = COLOR_SWATCHES.find((c) => c.id === color) || COLOR_SWATCHES[0];
  const currentFabricObj = FABRIC_TYPES.find((f) => f.id === fabricType) || FABRIC_TYPES[0];

  const handleSave = (addAnother = false) => {
    // Validate inputs
    const numWidth = Number(width);
    const numHeight = Number(height);

    if (!numWidth || numWidth <= 0 || !numHeight || numHeight <= 0) {
      setFeedback({
        type: 'error',
        message: 'Please enter a valid width and height larger than 0.'
      });
      return;
    }

    if (unit === 'cm' && (numWidth < 4 || numHeight < 4)) {
      setFeedback({
        type: 'error',
        message: 'Pieces smaller than 4 cm cannot be comfortably stitched. Please enter at least 4 cm.'
      });
      return;
    }

    const newPiece = {
      id: editingPiece?.id || `scrap-${Date.now()}`,
      fabricType,
      unit,
      width: numWidth,
      height: numHeight,
      color,
      print,
      quantity: Number(quantity) || 1,
      isIrregular,
      usableWidth,
      usableHeight,
      feel: editingPiece?.feel || currentFabricObj.defaultFeel,
      thickness: editingPiece?.thickness || currentFabricObj.defaultThick,
      stretch: editingPiece?.stretch !== undefined ? editingPiece.stretch : currentFabricObj.defaultStretch,
      frays: editingPiece?.frays !== undefined ? editingPiece.frays : currentFabricObj.defaultFray,
      included: true,
      addedAt: editingPiece?.addedAt || Date.now(),
    };

    onAddPiece(newPiece, editingPiece ? 'update' : 'add');

    if (addAnother) {
      setFeedback({
        type: 'success',
        message: 'Piece added! You can enter another scrap below.'
      });
      // Reset slightly for next piece
      setWidth(20);
      setHeight(15);
      setIsIrregular(false);
      setQuantity(1);
    } else {
      if (onContinueToPile) {
        onContinueToPile();
      }
    }
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Tab Switcher: Manual vs Camera */}
      <div className="bg-stone-200/80 p-1 rounded-2xl flex items-center">
        <button
          type="button"
          onClick={() => setTab('manual')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            tab === 'manual'
              ? 'bg-white text-emerald-900 shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{t.manualTab}</span>
        </button>
        <button
          type="button"
          onClick={() => setTab('camera')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            tab === 'camera'
              ? 'bg-white text-emerald-900 shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>{t.cameraTab}</span>
        </button>
      </div>

      {tab === 'camera' ? (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-700 flex items-center justify-center text-3xl mx-auto border border-amber-200">
            📷
          </div>
          <h3 className="text-sm font-bold text-stone-900">
            Camera Edge-Detection (Stage 3)
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed max-w-xs mx-auto">
            {t.cameraNotice}
          </p>
          <button
            type="button"
            onClick={() => setTab('manual')}
            className="px-5 py-2.5 bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs hover:bg-emerald-800 transition"
          >
            Switch to Manual Input
          </button>
        </div>
      ) : (
        /* Manual Entry Form */
        <div className="space-y-4">
          {/* Live Scrap Preview Card */}
          <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-600 uppercase tracking-wider flex items-center gap-1">
                <Maximize2 className="w-3 h-3 text-emerald-600" />
                Live Scrap Visual
              </span>
              <span className="text-[11px] font-semibold text-stone-500">
                {width} × {height} {unit} ({quantity} {quantity > 1 ? 'pcs' : 'pc'})
              </span>
            </div>

            {/* Simulated Fabric Scrap Rectangle */}
            <div className="h-32 bg-stone-100 rounded-2xl flex items-center justify-center p-3 relative overflow-hidden border border-dashed border-stone-300">
              <div
                style={{
                  backgroundColor: currentColorObj.hex,
                  borderColor: currentColorObj.border,
                  width: `${Math.min(92, Math.max(28, (width / 50) * 80))}%`,
                  height: `${Math.min(88, Math.max(30, (height / 50) * 80))}%`,
                }}
                className={`rounded-xl shadow-md border-2 flex items-center justify-center relative transition-all duration-300 ${
                  print === 'printed' ? 'bg-opacity-90' : ''
                }`}
              >
                {/* Print pattern simulation */}
                {print === 'printed' && (
                  <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#fff_2px,transparent_2px)] [background-size:10px_10px]" />
                )}

                {/* Irregular Cut Marker */}
                {isIrregular && (
                  <div className="absolute inset-1.5 border-2 border-dashed border-amber-300/90 rounded-lg flex items-center justify-center pointer-events-none">
                    <span className="bg-stone-900/80 text-amber-300 text-[9px] px-1 rounded font-bold">
                      Usable {usableWidth}×{usableHeight} {unit}
                    </span>
                  </div>
                )}

                <span className="text-xs font-bold text-white drop-shadow-md z-10">
                  {t.fabrics[fabricType]?.split(' ')[0]}
                </span>
              </div>
            </div>

            {isIrregular && (
              <p className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200/80 rounded-xl p-2 mt-2 leading-tight">
                ✂️ {t.usableAreaNotice}: <strong>{usableWidth} × {usableHeight} {unit}</strong> (around {Math.round((usableArea/rawArea)*100)}% usable; leftover trim can be saved for stuffing or collage).
              </p>
            )}
          </div>

          {/* Feedback banner */}
          {feedback && (
            <div
              className={`p-3 rounded-2xl text-xs font-medium flex items-center gap-2 ${
                feedback.type === 'error'
                  ? 'bg-red-50 text-red-800 border border-red-200'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{feedback.message}</span>
            </div>
          )}

          {/* 1. Fabric Type Selector */}
          <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs space-y-2">
            <label className="text-xs font-bold text-stone-800 block">
              1. {t.fabricTypeLabel}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {FABRIC_TYPES.map((f) => {
                const isSelected = fabricType === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFabricType(f.id)}
                    className={`p-2.5 rounded-xl border text-left flex items-center space-x-2 transition ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700'
                    }`}
                  >
                    <span className="text-lg">{f.icon}</span>
                    <span className="text-xs truncate">{t.fabrics[f.id]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Measurements & Unit */}
          <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800">
                2. {t.dimensionsLabel}
              </label>
              <div className="flex items-center bg-stone-100 p-0.5 rounded-xl border border-stone-200">
                <button
                  type="button"
                  onClick={() => setUnit('cm')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    unit === 'cm'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {t.unitCm}
                </button>
                <button
                  type="button"
                  onClick={() => setUnit('inches')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    unit === 'inches'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {t.unitInches}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Width Input */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-stone-600">
                  {t.widthLabel} ({unit})
                </span>
                <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500">
                  <button
                    type="button"
                    onClick={() => setWidth(Math.max(4, width - (unit === 'cm' ? 5 : 1)))}
                    className="p-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full text-center text-sm font-bold text-stone-900 py-1.5 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setWidth(width + (unit === 'cm' ? 5 : 1))}
                    className="p-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Height Input */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-stone-600">
                  {t.heightLabel} ({unit})
                </span>
                <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500">
                  <button
                    type="button"
                    onClick={() => setHeight(Math.max(4, height - (unit === 'cm' ? 5 : 1)))}
                    className="p-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full text-center text-sm font-bold text-stone-900 py-1.5 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setHeight(height + (unit === 'cm' ? 5 : 1))}
                    className="p-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Irregular Toggle Checkbox */}
            <div className="pt-1">
              <label className="flex items-start space-x-2.5 cursor-pointer bg-stone-50 p-3 rounded-2xl border border-stone-200 hover:bg-stone-100 transition">
                <input
                  type="checkbox"
                  checked={isIrregular}
                  onChange={(e) => setIsIrregular(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <div className="text-xs">
                  <span className="font-bold text-stone-900 block">
                    {t.irregularCheck}
                  </span>
                  <span className="text-stone-500 block leading-tight mt-0.5">
                    {t.irregularHint}
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* 3. Colour Palette */}
          <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800">
                3. {t.colourLabel}
              </label>
              <span className="text-xs font-semibold text-stone-600">
                {t.colors[color]}
              </span>
            </div>
            <div className="grid grid-cols-7 gap-2 pt-1">
              {COLOR_SWATCHES.map((swatch) => {
                const isSelected = color === swatch.id;
                return (
                  <button
                    key={swatch.id}
                    type="button"
                    onClick={() => setColor(swatch.id)}
                    style={{ backgroundColor: swatch.hex }}
                    title={t.colors[swatch.id]}
                    className={`h-9 rounded-xl transition transform flex items-center justify-center border-2 ${
                      isSelected
                        ? 'scale-110 shadow-md ring-2 ring-emerald-600 ring-offset-2'
                        : 'border-black/10 hover:scale-105'
                    }`}
                  >
                    {isSelected && (
                      <Check
                        className={`w-4 h-4 stroke-[3] ${
                          ['white', 'yellow', 'beige'].includes(swatch.id)
                            ? 'text-stone-900'
                            : 'text-white'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Print & Quantity */}
          <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {/* Print Type */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-stone-800 block">
                  4. {t.printLabel}
                </span>
                <div className="flex bg-stone-100 p-0.5 rounded-xl border border-stone-200">
                  <button
                    type="button"
                    onClick={() => setPrint('plain')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                      print === 'plain'
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'text-stone-600'
                    }`}
                  >
                    {t.printPlain}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPrint('printed')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                      print === 'printed'
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'text-stone-600'
                    }`}
                  >
                    {t.printPatterned}
                  </button>
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-stone-800 block">
                  5. {t.quantityLabel}
                </span>
                <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-full text-center text-sm font-bold text-stone-900 py-1">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2">
            <button
              type="button"
              onClick={() => handleSave(false)}
              className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition flex items-center justify-center text-sm gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{editingPiece ? t.saveChanges : t.addAndContinue}</span>
            </button>

            {!editingPiece && (
              <button
                type="button"
                onClick={() => handleSave(true)}
                className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-2xl border border-stone-300 transition flex items-center justify-center text-xs gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{t.addAnother}</span>
              </button>
            )}

            {editingPiece && onCancelEdit && (
              <button
                type="button"
                onClick={onCancelEdit}
                className="w-full py-2.5 text-stone-600 font-semibold text-xs text-center"
              >
                {t.cancel}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
