import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowLeft, 
  HelpCircle, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  PlusCircle, 
  Sparkles, 
  ArrowRight,
  Layers,
  Clock,
  Star
} from 'lucide-react';
import FabricNumbersCard from '../components/FabricNumbersCard';
import ProductVisual from '../components/ProductVisual';
import { soundManager } from '../utils/audio';
import { 
  getTranslatedProductName, 
  getTranslatedSizeLabel, 
  parseMissingReasonDetails 
} from '../utils/zoneHelper';
import { suggestProducts } from '../engine/index';

export default function FeasibilityScreen({
  design,
  pile,
  onTrySmallerSize,
  onTryPlainVariant,
  onPickAnotherProduct,
  onAddMoreFabric,
  onSelectAlternative,
  onBack,
  onOpenHelp,
  t,
  lang,
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Scroll to top on mount so sticky header never overlaps top banners
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const mainEl = document.querySelector('main');
    if (mainEl) mainEl.scrollTop = 0;
  }, []);

  const fits = Boolean(design.fits);
  const totalPileArea = pile.reduce((sum, p) => sum + (p.width * p.height * (p.quantity || 1)), 0);

  const translatedProductName = getTranslatedProductName(design.productId, design.productName, t);
  const translatedSizeLabel = getTranslatedSizeLabel(design.sizeKey, design.sizeLabel, t);

  // (a) Clear verdict about the product the user chose
  const verdictMessage = t.verdictCannotMake
    ? t.verdictCannotMake.replace('{product}', translatedProductName).replace('{size}', translatedSizeLabel)
    : `No, you can't make the ${translatedProductName} (${translatedSizeLabel}) with this pile yet.`;

  // (b) Exact reason and missing pieces
  const { missingPieces, exactReason } = parseMissingReasonDetails(
    design.missing,
    design.productId,
    design.sizeKey,
    t,
    design.missingDetails
  );

  // (c) Shortage calculation when engine knows it
  let shortageArea = 0;
  if (design.missing && typeof design.missing === 'string') {
    const areaMatch = design.missing.match(/pile has\s+(\d+)\s*cm².*?requires\s+(?:approximately\s+)?(\d+)\s*cm²/i);
    if (areaMatch) {
      const pileArea = parseInt(areaMatch[1], 10);
      const reqArea = parseInt(areaMatch[2], 10);
      if (reqArea > pileArea) {
        shortageArea = reqArea - pileArea;
      }
    }
  }
  if (shortageArea === 0 && Array.isArray(design.missingDetails) && design.missingDetails.length > 0) {
    shortageArea = design.missingDetails.reduce((sum, item) => sum + (item.neededArea || 0), 0);
  }
  if (shortageArea === 0 && missingPieces.length > 0) {
    shortageArea = missingPieces.reduce((sum, item) => sum + (item.neededArea || 0), 0);
  }

  // (d) Options the engine has checked and found to fit
  const fittingAlternatives = useMemo(() => {
    try {
      const result = suggestProducts(pile);
      if (result && Array.isArray(result.suggestions)) {
        return result.suggestions.filter((s) => s.fits);
      }
    } catch (e) {
      // Fallback
    }
    return [];
  }, [pile]);

  const handleSpeakFeasibility = () => {
    if (isSpeaking) {
      soundManager.stop();
      setIsSpeaking(false);
      return;
    }
    const missingDesc = missingPieces.length > 0
      ? missingPieces.map((p) => `${p.translatedName}, ${p.dimensions}`).join('. ')
      : '';
    const text = fits
      ? `${translatedProductName} (${translatedSizeLabel}). ${t.feasibleYesTitle}. ${t.feasibleYesDesc}`
      : `${verdictMessage} ${missingDesc ? missingDesc + '. ' : ''}${exactReason}`;
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
            onClick={onBack}
            className="p-2 rounded-2xl bg-emerald-700/80 hover:bg-emerald-600 text-white transition"
            title={t.back}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded text-emerald-200 border border-emerald-500/40 uppercase font-black tracking-wider">
              {fits ? t.readyBadge || 'Ready' : 'Check'}
            </span>
            <h2 className="text-lg font-black text-white leading-tight mt-0.5">
              {t.feasibilityTitle}
            </h2>
            <p className="text-xs text-emerald-100 font-medium break-words">
              {translatedProductName} ({translatedSizeLabel})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleSpeakFeasibility}
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
            onClick={() => onOpenHelp({ title: t.feasibilityTitle, message: t.helpFeasibility })}
            className="p-2.5 rounded-full bg-emerald-700/80 hover:bg-emerald-600 text-white transition"
            title={t.help}
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* YES STATE */}
      {fits && (
        <div className="bg-gradient-to-br from-emerald-500 to-teal-700 text-white rounded-3xl p-6 shadow-md border-4 border-emerald-300 text-center space-y-2 relative overflow-hidden">
          <div className="w-16 h-16 bg-white/20 rounded-full mx-auto flex items-center justify-center text-3xl shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-white stroke-[3]" />
          </div>
          <h3 className="text-2xl font-black tracking-tight text-white uppercase">
            {t.feasibleYesTitle}
          </h3>
          <p className="text-xs text-emerald-100 font-medium max-w-xs mx-auto leading-relaxed">
            {t.feasibleYesDesc}
          </p>
          <div className="pt-2 inline-flex items-center gap-1.5 bg-emerald-900/60 px-3 py-1 rounded-full text-xs font-bold text-emerald-200">
            <span>Score: {design.designScore}/100</span>
            <span>•</span>
            <span>Estimated time: {design.estimatedTimeMinutes} mins</span>
          </div>
        </div>
      )}

      {/* NO STATE — STRICT ORDER REQUIRED BY USER */}
      {!fits && (
        <>
          {/* (a) CLEAR VERDICT ABOUT THE PRODUCT THE USER CHOSE */}
          <div className="bg-gradient-to-br from-rose-600 to-red-800 text-white rounded-3xl p-5 shadow-md border-4 border-rose-300 space-y-3 relative overflow-hidden scroll-mt-24">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl shadow-inner shrink-0 mt-0.5">
                <XCircle className="w-7 h-7 text-white stroke-[3]" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-black tracking-wider uppercase bg-rose-950/60 text-rose-200 px-2 py-0.5 rounded border border-rose-400/40 inline-block mb-1">
                  {t.feasibleNoTitle}
                </span>
                <h3 className="text-base font-black text-white leading-snug">
                  {verdictMessage}
                </h3>
              </div>
            </div>
          </div>

          {/* (b) EXACT REASON AND MISSING PIECES, IN THE CHOSEN LANGUAGE */}
          <div className="bg-white rounded-3xl p-4 border-2 border-rose-200 shadow-xs space-y-3">
            <div className="flex items-center gap-1.5 text-rose-800 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>{t.whatsMissingTitle}</span>
            </div>

            {/* Missing pieces listed first */}
            {missingPieces.length > 0 && (
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block">
                  {t.missingPiecesHeading || 'Missing pieces:'}
                </span>
                {missingPieces.map((p, idx) => (
                  <div
                    key={idx}
                    className="bg-rose-50 border border-rose-200 rounded-2xl p-3 flex items-start justify-between gap-2"
                  >
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 bg-rose-200/70 px-2 py-0.5 rounded inline-block">
                        {p.role}
                      </span>
                      <h4 className="text-xs font-black text-rose-950">
                        {p.translatedName}
                      </h4>
                      <p className="text-[11px] text-rose-800 font-semibold">
                        {p.dimensions}
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-rose-700 bg-rose-200/60 px-2 py-1 rounded-lg shrink-0">
                      {t.neededBadge || 'Needed'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Exact Engine Diagnosis */}
            <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-3 text-xs text-rose-950 leading-relaxed font-medium">
              {exactReason}
            </div>
          </div>

          {/* (c) "FIX THIS PRODUCT" SECTION: Add more scraps, with amount needed when engine knows it */}
          <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs space-y-3">
            <div className="border-b border-stone-100 pb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                <PlusCircle className="w-4 h-4 text-emerald-700" />
                <span>{t.fixThisProductTitle || 'Fix this product'}</span>
              </h4>
              <p className="text-[11px] text-stone-500 mt-0.5">
                {t.fixThisProductDesc || 'Add more scraps to complete your chosen design.'}
              </p>
            </div>

            {/* Specific shortage amount when known */}
            {shortageArea > 0 && (
              <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3 text-xs text-amber-950 flex items-start gap-2.5">
                <span className="text-lg">📏</span>
                <div className="leading-relaxed">
                  <span className="font-bold block text-amber-900 mb-0.5">
                    {t.fabricShortageHeading || 'Fabric shortage:'}
                  </span>
                  <span>
                    {t.fabricShortageNotice
                      ? t.fabricShortageNotice
                          .replace('{amount}', Math.round(shortageArea))
                          .replace('{count}', Math.max(1, Math.ceil(shortageArea / 400)))
                      : `You need approximately ${Math.round(shortageArea)} cm² more fabric (about ${Math.max(1, Math.ceil(shortageArea / 400))} medium scraps) in matching weight.`}
                  </span>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={onAddMoreFabric}
              className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs rounded-2xl flex items-center justify-between transition shadow-md"
            >
              <div className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4" />
                <span>{t.fixOptionAddFabric || 'Add More Scraps'}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-200" />
            </button>
          </div>

          {/* (d) SEPARATE "OR MAKE SOMETHING ELSE" SECTION */}
          {/* Lists ONLY options the engine has checked and found to fit */}
          <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs space-y-3">
            <div className="border-b border-stone-100 pb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>{t.orMakeSomethingElseTitle || 'Or make something else'}</span>
              </h4>
              <p className="text-[11px] text-stone-500 mt-0.5">
                {t.orMakeSomethingElseSub || 'The engine checked your pile and these options are guaranteed to fit right now:'}
              </p>
            </div>

            {fittingAlternatives.length > 0 ? (
              <div className="space-y-2.5">
                {fittingAlternatives.map((alt) => {
                  const altProductName = getTranslatedProductName(alt.productId, alt.productName, t);
                  const altSizeLabel = getTranslatedSizeLabel(alt.sizeKey, alt.sizeLabel, t);
                  const isSameProduct = alt.productId === design.productId;

                  return (
                    <div
                      key={`${alt.productId}-${alt.sizeKey}-${alt.variant}`}
                      className="bg-emerald-50/70 border border-emerald-300 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-xs hover:border-emerald-500 transition"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <ProductVisual
                          productId={alt.productId}
                          sizeKey={alt.sizeKey}
                          variant={alt.variant}
                          className="w-12 h-12 flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
                              {isSameProduct ? (t.smallerSizeBadge || 'Smaller Size') : (alt.variant === 'plain' ? t.plainVariantLabel : (t.readyBadge || 'Ready'))}
                            </span>
                            <span className="text-[10px] font-bold text-amber-600 flex items-center gap-0.5 shrink-0">
                              ⭐ {alt.designScore}/100
                            </span>
                          </div>
                          <h5 className="text-xs font-black text-stone-900 leading-snug mt-0.5 break-words">
                            {altProductName}
                          </h5>
                          <span className="text-[10px] text-stone-600 block font-medium mt-0.5 break-words">
                            {altSizeLabel} • {alt.estimatedTimeMinutes} mins
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (onSelectAlternative) {
                            onSelectAlternative(alt);
                          } else if (onPickAnotherProduct) {
                            onPickAnotherProduct();
                          }
                        }}
                        className="px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-[11px] rounded-xl shrink-0 transition shadow-xs flex items-center gap-1"
                      >
                        <span>{t.makeThisInsteadBtn || 'Make this instead'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-center space-y-2">
                <p className="text-xs text-stone-600 font-medium">
                  {t.noAlternativeFitsNotice || 'None of the other items can be made with your current scraps yet. Add more scraps to get started.'}
                </p>
                <button
                  type="button"
                  onClick={onAddMoreFabric}
                  className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs rounded-xl transition inline-flex items-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>{t.fixOptionAddFabric || 'Add More Scraps'}</span>
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Fabric Numbers: If fits (YES), show full breakdown (seam losses, trim waste, leftovers kept) */}
      {fits && (
        <FabricNumbersCard
          fabricUsedInSeamsCm2={design.fabricUsedInSeamsCm2 || 0}
          fabricTooSmallToReuseCm2={design.fabricTooSmallToReuseCm2 || 0}
          reusableLeftoversCount={design.reusableLeftoversCount || design.leftovers?.length || 0}
          wastePercentage={design.wastePercentage || 0}
          totalAreaCm2={totalPileArea}
          t={t}
        />
      )}

      {/* On NO screen: Do NOT show seam losses, trim waste, or leftovers. Show ONLY total fabric in pile, if anything. */}
      {!fits && totalPileArea > 0 && (
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 flex items-center justify-between text-xs shadow-xs">
          <div className="flex items-center gap-2 text-stone-700">
            <Layers className="w-4 h-4 text-emerald-700" />
            <span className="font-bold">{t.totalFabricInPile || 'Total fabric in your pile'}:</span>
          </div>
          <span className="text-sm font-black text-stone-900">
            {Math.round(totalPileArea)} cm²
          </span>
        </div>
      )}
    </div>
  );
}
