import React, { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  Volume2, 
  Check, 
  AlertTriangle, 
  Layers, 
  ShieldCheck, 
  Flame, 
  Scissors,
  CheckCircle2
} from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function FabricFeelScreen({ 
  pieces, 
  onUpdatePieceFeel, 
  t, 
  lang 
}) {
  const [selectedPieceId, setSelectedPieceId] = useState(pieces[0]?.id || null);

  const currentPiece = pieces.find((p) => p.id === selectedPieceId) || pieces[0];

  if (!currentPiece) {
    return (
      <div className="bg-white rounded-3xl p-6 text-center border border-stone-200 space-y-3">
        <span className="text-4xl">🧵</span>
        <h3 className="text-sm font-bold text-stone-900">{t.emptyPileTitle}</h3>
        <p className="text-xs text-stone-600">{t.emptyPileDesc}</p>
      </div>
    );
  }

  // Answer handlers
  const handleUpdate = (field, value) => {
    onUpdatePieceFeel(currentPiece.id, { [field]: value });
  };

  // Compute tailor advice for this piece
  const isSturdyOuter = (currentPiece.feel === 'stiff' || currentPiece.thickness === 'thick') && !currentPiece.stretch;
  const isGoodLining = currentPiece.feel === 'soft' && (currentPiece.thickness === 'thin' || currentPiece.thickness === 'medium') && !currentPiece.stretch;
  const isDelicateOrAccessory = currentPiece.thickness === 'thin' || currentPiece.stretch;

  let bestUseText = t.outerAdvice;
  if (isGoodLining) {
    bestUseText = t.liningAdvice;
  } else if (isDelicateOrAccessory) {
    bestUseText = "Ideal for small accessories (hair scrunchies, decorative patch borders, inner divider pockets).";
  }

  const tipsSummary = `${t.tailorTipsTitle}: ${t.bestUseLabel} ${bestUseText}. ${t.pressingAdvice} ${t.stitchingTip}`;

  const handleSpeakTips = () => {
    soundManager.speak(tipsSummary, lang);
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Header Info */}
      <div>
        <h2 className="text-base font-bold text-stone-900">{t.feelTitle}</h2>
        <p className="text-xs text-stone-500">{t.feelSub}</p>
      </div>

      {/* Piece Selector Carousel/Pills */}
      {pieces.length > 1 && (
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block">
            {t.forPiece}:
          </span>
          <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar">
            {pieces.map((p, idx) => {
              const isSelected = p.id === currentPiece.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPieceId(p.id)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition flex-shrink-0 ${
                    isSelected
                      ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: p.color === 'white' ? '#fff' : p.color }} />
                  <span>#{idx + 1} {t.fabrics[p.fabricType]?.split(' ')[0]} ({p.width}×{p.height})</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 4 Picture Questions */}
      <div className="space-y-3">
        {/* Q1: Feel */}
        <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <span>🖐️</span>
              <span>1. {t.q1Title}</span>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleUpdate('feel', 'soft')}
              className={`p-3 rounded-2xl border text-left transition ${
                currentPiece.feel === 'soft'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                  : 'border-stone-200 hover:border-stone-300 text-stone-700'
              }`}
            >
              <div className="text-xl mb-1">🧣</div>
              <div className="text-xs font-bold">{t.q1Soft}</div>
            </button>
            <button
              type="button"
              onClick={() => handleUpdate('feel', 'stiff')}
              className={`p-3 rounded-2xl border text-left transition ${
                currentPiece.feel === 'stiff'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                  : 'border-stone-200 hover:border-stone-300 text-stone-700'
              }`}
            >
              <div className="text-xl mb-1">📦</div>
              <div className="text-xs font-bold">{t.q1Stiff}</div>
            </button>
          </div>
        </div>

        {/* Q2: Thickness */}
        <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs space-y-2">
          <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <span>📏</span>
            <span>2. {t.q2Title}</span>
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleUpdate('thickness', 'thin')}
              className={`p-2.5 rounded-2xl border text-center transition ${
                currentPiece.thickness === 'thin'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                  : 'border-stone-200 hover:border-stone-300 text-stone-700'
              }`}
            >
              <div className="text-lg">🪶</div>
              <div className="text-[11px] font-bold mt-1">Thin</div>
            </button>
            <button
              type="button"
              onClick={() => handleUpdate('thickness', 'medium')}
              className={`p-2.5 rounded-2xl border text-center transition ${
                currentPiece.thickness === 'medium'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                  : 'border-stone-200 hover:border-stone-300 text-stone-700'
              }`}
            >
              <div className="text-lg">👕</div>
              <div className="text-[11px] font-bold mt-1">Medium</div>
            </button>
            <button
              type="button"
              onClick={() => handleUpdate('thickness', 'thick')}
              className={`p-2.5 rounded-2xl border text-center transition ${
                currentPiece.thickness === 'thick'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                  : 'border-stone-200 hover:border-stone-300 text-stone-700'
              }`}
            >
              <div className="text-lg">👖</div>
              <div className="text-[11px] font-bold mt-1">Thick</div>
            </button>
          </div>
        </div>

        {/* Q3: Stretch */}
        <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs space-y-2">
          <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <span>↔️</span>
            <span>3. {t.q3Title}</span>
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleUpdate('stretch', true)}
              className={`p-3 rounded-2xl border text-left transition ${
                currentPiece.stretch === true
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                  : 'border-stone-200 hover:border-stone-300 text-stone-700'
              }`}
            >
              <div className="text-xl mb-1">🪢</div>
              <div className="text-xs font-bold">{t.q3Stretchy}</div>
            </button>
            <button
              type="button"
              onClick={() => handleUpdate('stretch', false)}
              className={`p-3 rounded-2xl border text-left transition ${
                currentPiece.stretch === false
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                  : 'border-stone-200 hover:border-stone-300 text-stone-700'
              }`}
            >
              <div className="text-xl mb-1">🧵</div>
              <div className="text-xs font-bold">{t.q3NoStretch}</div>
            </button>
          </div>
        </div>

        {/* Q4: Fraying */}
        <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs space-y-2">
          <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <span>✂️</span>
            <span>4. {t.q4Title}</span>
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleUpdate('frays', true)}
              className={`p-3 rounded-2xl border text-left transition ${
                currentPiece.frays === true
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                  : 'border-stone-200 hover:border-stone-300 text-stone-700'
              }`}
            >
              <div className="text-xl mb-1">🧶</div>
              <div className="text-xs font-bold">{t.q4Frays}</div>
            </button>
            <button
              type="button"
              onClick={() => handleUpdate('frays', false)}
              className={`p-3 rounded-2xl border text-left transition ${
                currentPiece.frays === false
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                  : 'border-stone-200 hover:border-stone-300 text-stone-700'
              }`}
            >
              <div className="text-xl mb-1">🛡️</div>
              <div className="text-xs font-bold">{t.q4NoFray}</div>
            </button>
          </div>
        </div>
      </div>

      {/* Tailor's Advice Card (Brief 5.2 requirement) */}
      <div className="bg-emerald-900 text-white rounded-3xl p-5 shadow-sm border border-emerald-700 space-y-3">
        <div className="flex items-center justify-between border-b border-emerald-800 pb-2.5">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🪡</span>
            <h3 className="text-sm font-bold text-emerald-100">{t.tailorTipsTitle}</h3>
          </div>
          <button
            type="button"
            onClick={handleSpeakTips}
            className="p-1.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-amber-300 transition"
            title={t.listen}
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 text-xs leading-relaxed text-emerald-50">
          <div className="bg-emerald-800/80 p-3 rounded-2xl border border-emerald-700/60">
            <span className="font-bold text-amber-300 block mb-0.5">
              {t.bestUseLabel}
            </span>
            <span>{bestUseText}</span>
          </div>

          <div className="flex items-start space-x-2 pt-1">
            <span className="text-base">♨️</span>
            <span>{t.pressingAdvice}</span>
          </div>

          <div className="flex items-start space-x-2">
            <span className="text-base">📍</span>
            <span>{t.stitchingTip}</span>
          </div>

          {currentPiece.stretch && (
            <div className="flex items-start space-x-2 text-amber-200 bg-amber-950/40 p-2 rounded-xl border border-amber-600/40">
              <span className="text-base">⚠️</span>
              <span>{t.stretchWarning}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
