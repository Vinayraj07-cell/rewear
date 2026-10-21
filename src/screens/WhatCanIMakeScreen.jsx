import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Clock, 
  IndianRupee, 
  Star, 
  AlertTriangle, 
  ArrowRight, 
  HelpCircle, 
  Volume2, 
  VolumeX, 
  SlidersHorizontal, 
  Layers,
  CheckCircle2,
  ChevronRight,
  Filter,
  Users
} from 'lucide-react';
import { suggestProducts } from '../engine/index';
import ProductVisual from '../components/ProductVisual';
import { soundManager } from '../utils/audio';
import { 
  getTranslatedProductName, 
  getTranslatedSizeLabel, 
  parseMissingReasonDetails 
} from '../utils/zoneHelper';

// Price suggestion helper based on product, size, and work time
function getPriceSuggestion(productId, sizeKey, timeMinutes) {
  let basePrice = 120;
  if (productId === 'pouch') {
    if (sizeKey === 'small') basePrice = 100;
    else if (sizeKey === 'medium') basePrice = 150;
    else basePrice = 220;
  } else if (productId === 'tote_bag') {
    if (sizeKey === 'small') basePrice = 250;
    else if (sizeKey === 'medium') basePrice = 380;
    else basePrice = 520;
  } else if (productId === 'cushion_cover') {
    if (sizeKey === 'small') basePrice = 180;
    else if (sizeKey === 'medium') basePrice = 280;
    else basePrice = 380;
  } else if (productId === 'kids_frock') {
    if (sizeKey === 'infant') basePrice = 280;
    else if (sizeKey === 'toddler') basePrice = 360;
    else basePrice = 480;
  }
  const low = Math.round(basePrice * 0.9);
  const high = Math.round(basePrice * 1.3);
  return `₹${low} – ₹${high}`;
}

export default function WhatCanIMakeScreen({
  pieces,
  onSelectDesign,
  onCheckFeasibility,
  onAddMorePieces,
  onOpenHelp,
  t,
  lang,
}) {
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all', 'bags', 'home', 'kids'
  const [audienceFilter, setAudienceFilter] = useState('all'); // 'all', 'adults', 'kids', 'home', 'shop'
  const [cushionVariant, setCushionVariant] = useState('plain'); // 'plain' or 'decorated'
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Filter only active included pieces
  const activePile = useMemo(() => pieces.filter((p) => p.included), [pieces]);

  // Run the Stage 2 engine
  const suggestionResult = useMemo(() => {
    if (activePile.length === 0) return { success: false, suggestions: [] };
    return suggestProducts(activePile, { variant: cushionVariant });
  }, [activePile, cushionVariant]);

  const allSuggestions = suggestionResult.suggestions || [];

  // Filter suggestions by Category
  const filteredSuggestions = useMemo(() => {
    return allSuggestions.filter((item) => {
      // Category match
      if (categoryFilter === 'bags' && item.productId !== 'tote_bag' && item.productId !== 'pouch') return false;
      if (categoryFilter === 'home' && item.productId !== 'cushion_cover') return false;
      if (categoryFilter === 'kids' && item.productId !== 'kids_frock') return false;

      // Audience match
      if (audienceFilter === 'kids' && item.productId !== 'kids_frock') return false;
      if (audienceFilter === 'home' && item.productId !== 'cushion_cover') return false;
      if (audienceFilter === 'adults' && item.productId === 'kids_frock') return false;

      return true;
    });
  }, [allSuggestions, categoryFilter, audienceFilter]);

  const readyList = filteredSuggestions.filter((s) => s.fits);
  const almostList = filteredSuggestions.filter((s) => !s.fits);

  // Audio speech handler
  const handleSpeakOverview = () => {
    if (isSpeaking) {
      soundManager.stop();
      setIsSpeaking(false);
      return;
    }
    const text = `${t.whatCanIMakeTitle}. ${readyList.length} items ready to stitch. ${almostList.length} items almost ready.`;
    soundManager.speak(text, lang);
    setIsSpeaking(true);
  };

  // Convert numeric score (0-100) to 5-star count
  const renderStars = (score) => {
    const starCount = Math.max(1, Math.min(5, Math.round(score / 20)));
    return (
      <div className="flex items-center gap-0.5" title={`Score: ${score}/100`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= starCount
                ? 'fill-amber-400 text-amber-500'
                : 'fill-stone-200 text-stone-300'
            }`}
          />
        ))}
        <span className="text-[11px] font-bold text-stone-700 ml-1">
          {score}/100
        </span>
      </div>
    );
  };

  // Empty State: No active pieces
  if (activePile.length === 0) {
    return (
      <div className="space-y-4 pb-24 text-center py-12 px-4">
        <div className="w-16 h-16 bg-stone-200 text-stone-600 rounded-3xl mx-auto flex items-center justify-center text-3xl shadow-inner">
          🧵
        </div>
        <h3 className="text-lg font-bold text-stone-800">
          {t.emptySuggestionsTitle}
        </h3>
        <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
          {t.emptySuggestionsDesc}
        </p>
        <button
          type="button"
          onClick={onAddMorePieces}
          className="mt-4 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-bold text-xs shadow-md transition inline-flex items-center gap-2"
        >
          <span>{t.addNewPieceBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-36">
      {/* Top Header Card with Voice & Help */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-4 shadow-sm border border-emerald-700 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>ReWear Tailor Studio • Stage 2</span>
            </div>
            <h2 className="text-lg font-black text-white leading-tight">
              {t.whatCanIMakeTitle}
            </h2>
            <p className="text-xs text-emerald-100 mt-1 max-w-xs">
              {t.whatCanIMakeSub}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleSpeakOverview}
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
              onClick={() => onOpenHelp({ title: t.whatCanIMakeTitle, message: t.helpWhatCanIMake })}
              className="p-2.5 rounded-full bg-emerald-700/80 hover:bg-emerald-600 text-white transition"
              title={t.help}
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick summary stats pill */}
        <div className="mt-3 flex items-center gap-2 pt-2 border-t border-emerald-700/60 text-xs text-emerald-100">
          <span className="font-semibold text-white">
            {readyList.length} {t.readyToStitch.toLowerCase()}
          </span>
          <span>•</span>
          <span className="text-emerald-200">
            {almostList.length} {t.almostReady.toLowerCase()}
          </span>
        </div>
      </div>

      {/* Filter Tabs: By Category & Who It Is For */}
      <div className="bg-white rounded-2xl p-3 border border-stone-200 shadow-xs space-y-2.5">
        {/* Category Tabs */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
            {t.filterCategoryTitle || 'Category'}
          </span>
          <div className="grid grid-cols-4 gap-1.5 text-xs">
            {[
              { id: 'all', label: t.tabAll },
              { id: 'bags', label: t.tabBags },
              { id: 'home', label: t.tabHome },
              { id: 'kids', label: t.tabKids },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCategoryFilter(tab.id)}
                className={`py-1.5 px-1 rounded-xl text-center font-bold text-[11px] transition truncate ${
                  categoryFilter === tab.id
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Who it is for Tabs */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
            {t.filterAudienceTitle || 'Who It Is For'}
          </span>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {[
              { id: 'all', label: t.forAll },
              { id: 'adults', label: t.forAdults },
              { id: 'kids', label: t.forKids },
              { id: 'home', label: t.forHome },
              { id: 'shop', label: t.forShop },
            ].map((aud) => (
              <button
                key={aud.id}
                type="button"
                onClick={() => setAudienceFilter(aud.id)}
                className={`py-1 px-2.5 rounded-lg text-center font-semibold text-[11px] transition ${
                  audienceFilter === aud.id
                    ? 'bg-amber-400 text-stone-900 font-bold shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {aud.label}
              </button>
            ))}
          </div>
        </div>

        {/* Plain vs Decorated Variant Choice (for products like Cushion Cover) */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-700 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
            <span>{t.variantTogglePrompt}</span>
          </span>
          <div className="flex items-center bg-stone-100 p-0.5 rounded-xl border border-stone-200">
            <button
              type="button"
              onClick={() => setCushionVariant('plain')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                cushionVariant === 'plain'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              {t.plainVariantLabel}
            </button>
            <button
              type="button"
              onClick={() => setCushionVariant('decorated')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                cushionVariant === 'decorated'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              {t.decoratedVariantLabel}
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: READY TO STITCH (FITS) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
              <span>{t.readyToStitch}</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-black">
                {readyList.length}
              </span>
            </h3>
            <p className="text-[11px] text-stone-500">{t.readyToStitchSub}</p>
          </div>
        </div>

        {readyList.length === 0 ? (
          <div className="bg-white rounded-2xl p-5 text-center border border-dashed border-stone-300 space-y-2">
            <span className="text-2xl">✂️</span>
            <p className="text-xs font-semibold text-stone-600">
              No product currently fits 100% of panels with these filters.
            </p>
            <p className="text-[11px] text-stone-400">
              See the "Almost" section below for items that need only a few more scraps!
            </p>
          </div>
        ) : (
          readyList.map((item) => {
            const price = getPriceSuggestion(item.productId, item.sizeKey, item.estimatedTimeMinutes);
            return (
              <div
                key={`${item.productId}-${item.sizeKey}-${item.variant}`}
                className="bg-white rounded-3xl p-4 border-2 border-emerald-500/80 shadow-md hover:border-emerald-600 transition space-y-3 relative overflow-hidden"
              >
                {/* Product Header */}
                <div className="flex items-start gap-3">
                  <ProductVisual
                    productId={item.productId}
                    sizeKey={item.sizeKey}
                    variant={item.variant}
                    className="w-16 h-16 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {item.variant === 'decorated' ? t.decoratedVariantLabel : t.plainVariantLabel}
                      </span>
                      {renderStars(item.designScore)}
                    </div>
                    <h4 className="text-base font-black text-stone-900 mt-1 leading-snug">
                      {getTranslatedProductName(item.productId, item.productName, t)}
                    </h4>
                    <span className="text-xs text-stone-600 font-medium block">
                      {getTranslatedSizeLabel(item.sizeKey, item.sizeLabel, t)}
                    </span>
                  </div>
                </div>

                {/* Practical Metrics Pill (Time & Price Suggestion) */}
                <div className="grid grid-cols-2 gap-2 bg-stone-50 p-2.5 rounded-2xl border border-stone-200 text-xs">
                  <div className="flex items-center gap-1.5 text-stone-700">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <div>
                      <span className="text-[10px] text-stone-400 block leading-none">
                        {t.estimatedSewingTime}
                      </span>
                      <span className="font-bold text-xs">{item.estimatedTimeMinutes} mins</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-stone-700">
                    <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                    <div>
                      <span className="text-[10px] text-stone-400 block leading-none">
                        {t.suggestedPrice}
                      </span>
                      <span className="font-bold text-xs text-emerald-800">{price}</span>
                    </div>
                  </div>
                </div>

                {/* "Why this design" in plain words */}
                {item.whyThisDesign && item.whyThisDesign.length > 0 && (
                  <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-2.5 text-xs text-emerald-950 space-y-1">
                    <span className="font-bold block text-[11px] text-emerald-900">
                      {t.whyThisDesignTitle}
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px] text-emerald-900/90 leading-tight">
                      {item.whyThisDesign.slice(0, 3).map((reason, idx) => (
                        <li key={idx} className="truncate">
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Quality Warning if small scraps */}
                {item.warnings && item.warnings.length > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-2.5 flex items-start gap-2 text-xs text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-snug">
                      {item.warnings[0]}
                    </span>
                  </div>
                )}

                {/* Big Button: View Design & Cut Plan */}
                <button
                  type="button"
                  onClick={() => onSelectDesign(item)}
                  className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-2xl shadow-sm flex items-center justify-center gap-2 transition"
                >
                  <span>{t.viewDesignBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* SECTION 2: ALMOST (GREYED OUT CARDS - DOES NOT FIT) */}
      <div className="space-y-3 pt-4 border-t border-stone-200">
        <div className="px-1">
          <h3 className="text-sm font-bold text-stone-700 flex items-center gap-1.5">
            <span className="text-amber-600 font-black">⏳</span>
            <span>{t.almostReady}</span>
            <span className="text-xs bg-stone-200 text-stone-700 px-2 py-0.5 rounded-full font-bold">
              {almostList.length}
            </span>
          </h3>
          <p className="text-[11px] text-stone-500">{t.almostReadySub}</p>
        </div>

        {almostList.map((item) => (
          <div
            key={`almost-${item.productId}-${item.sizeKey}-${item.variant}`}
            className="bg-stone-50/90 rounded-3xl p-4 border border-stone-300 opacity-90 space-y-3"
          >
            {/* Header: Product & Size (NO SCORE, NO PATCH COUNTS as per rule) */}
            <div className="flex items-start gap-3">
              <div className="opacity-60">
                <ProductVisual
                  productId={item.productId}
                  sizeKey={item.sizeKey}
                  variant={item.variant}
                  className="w-14 h-14 flex-shrink-0 grayscale"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 bg-stone-200 px-2 py-0.5 rounded-md">
                  {item.variant === 'decorated' ? t.decoratedVariantLabel : t.plainVariantLabel}
                </span>
                <h4 className="text-sm font-bold text-stone-800 mt-1">
                  {getTranslatedProductName(item.productId, item.productName, t)}
                </h4>
                <span className="text-xs text-stone-500 font-medium block">
                  {getTranslatedSizeLabel(item.sizeKey, item.sizeLabel, t)}
                </span>
              </div>
            </div>

            {/* Clear Reason for not fitting */}
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-2.5 text-xs text-rose-900 leading-snug">
              <span className="font-bold block text-[11px] text-rose-800 mb-0.5">
                {t.missingReasonLabel}
              </span>
              <span>
                {parseMissingReasonDetails(item.missing, item.productId, item.sizeKey, t).fullMissingSummary || 'Insufficient fabric to complete all pattern zones.'}
              </span>
            </div>

            {/* Fallback Recommendation (ONLY shown if engine checked it!) */}
            {item.fallbackRecommendation && (
              <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-2.5 text-xs text-emerald-950 flex items-start gap-2">
                <span className="text-base">💡</span>
                <div className="leading-snug">
                  <span className="font-bold block text-[11px] text-emerald-900 mb-0.5">
                    {t.fallbackSuggestionLabel}
                  </span>
                  <span>{item.fallbackRecommendation}</span>
                </div>
              </div>
            )}

            {/* Action: See How to Fix */}
            <button
              type="button"
              onClick={() => onCheckFeasibility(item)}
              className="w-full py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
            >
              <span>{t.checkFixBtn}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
