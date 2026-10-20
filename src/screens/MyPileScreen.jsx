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
  Volume2
} from 'lucide-react';
import { COLOR_SWATCHES, FABRIC_TYPES } from '../i18n/translations';
import { calculateArea } from '../utils/storage';
import { soundManager } from '../utils/audio';

export default function MyPileScreen({ 
  pieces, 
  onToggleInclude, 
  onDeleteRequest, 
  onDuplicate, 
  onEditPiece, 
  onAddNew, 
  t, 
  lang 
}) {
  const [groupBy, setGroupBy] = useState('color'); // 'color' or 'fabric'

  const activePieces = pieces.filter((p) => p.included);
  const excludedPieces = pieces.filter((p) => !p.included);

  // Calculate total usable area in cm²
  const totalSqCm = activePieces.reduce((acc, p) => acc + calculateArea(p).sqCm, 0);
  const totalPiecesCount = activePieces.reduce((acc, p) => acc + (p.quantity || 1), 0);
  const totalSqInches = Math.round(totalSqCm / 6.4516);

  // Group pieces
  const groups = {};
  if (groupBy === 'color') {
    pieces.forEach((p) => {
      const colorObj = COLOR_SWATCHES.find((c) => c.id === p.color) || { family: 'other' };
      const familyName = colorObj.family === 'warm' ? 'Warm Tones (రెడ్స్, ఆరెంజ్)' : colorObj.family === 'cool' ? 'Cool Tones (బ్లూస్, గ్రీన్స్)' : 'Neutrals (వైట్, బ్లాక్, బీజ్)';
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

  return (
    <div className="space-y-4 pb-28">
      {/* Stage 1 Complete & Ready for Stage 2 Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-4 shadow-md border-2 border-emerald-400/60 relative overflow-hidden">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-2xl bg-emerald-500/30 text-amber-300 border border-emerald-400/40">
            <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-tight">
                {t.stage2ReadyBanner}
              </h2>
              <span className="text-[10px] bg-amber-400 text-stone-900 font-extrabold px-1.5 py-0.5 rounded uppercase">
                Checkpoint
              </span>
            </div>
            <p className="text-xs text-emerald-100 mt-1 leading-snug">
              {t.stage2ReadyDesc}
            </p>
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
          <button
            type="button"
            onClick={handleSpeakSummary}
            className="p-2 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition"
            title={t.listen}
          >
            <Volume2 className="w-4 h-4" />
          </button>
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

      {/* Grouping Filter Buttons */}
      <div className="flex items-center justify-between">
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

      {/* Pieces List by Group */}
      {Object.keys(groups).length === 0 ? (
        <div className="bg-white rounded-3xl p-6 text-center border border-stone-200 space-y-3">
          <span className="text-4xl">🧺</span>
          <h3 className="text-sm font-bold text-stone-900">{t.emptyPileTitle}</h3>
          <p className="text-xs text-stone-600">{t.emptyPileDesc}</p>
          <button
            type="button"
            onClick={onAddNew}
            className="px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs"
          >
            {t.addNewPieceBtn}
          </button>
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
                            {t.fabrics[piece.fabricType]?.split(' ')[0]}
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
                          <span>{t.colors[piece.color]}</span>
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

                      {/* Duplicate */}
                      <button
                        type="button"
                        onClick={() => onDuplicate(piece.id)}
                        className="p-2 rounded-xl text-stone-600 hover:bg-stone-100 transition"
                        title={t.duplicate}
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
    </div>
  );
}
