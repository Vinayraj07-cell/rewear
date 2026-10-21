import React, { useMemo, useState } from 'react';
import { 
  ArrowLeft, 
  HelpCircle, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  AlertTriangle, 
  Ruler, 
  Maximize2, 
  ArrowRight,
  Info
} from 'lucide-react';
import { PRODUCT_TEMPLATES, fitPileToProduct } from '../engine/index';
import ProductVisual from '../components/ProductVisual';
import { soundManager } from '../utils/audio';

export default function SizeChoiceScreen({
  productId,
  currentSizeKey,
  variant = 'plain',
  pile,
  onSelectSize,
  onBack,
  onOpenHelp,
  t,
  lang,
}) {
  const [selectedSize, setSelectedSize] = useState(currentSizeKey);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const product = PRODUCT_TEMPLATES[productId];
  const activePile = useMemo(() => pile.filter((p) => p.included), [pile]);

  // Compute feasibility for each size in this product
  const sizeEvaluations = useMemo(() => {
    if (!product) return [];
    return Object.keys(product.sizes).map((sizeKey) => {
      const sizeObj = product.sizes[sizeKey];
      const fitRes = fitPileToProduct(activePile, productId, sizeKey, 1.0, { variant });
      return {
        sizeKey,
        label: sizeObj.label,
        fits: fitRes.fits,
        missing: fitRes.missing,
        totalExtraSeams: fitRes.totalExtraSeams,
      };
    });
  }, [product, activePile, productId, variant]);

  const handleSpeakSizes = () => {
    if (isSpeaking) {
      soundManager.stop();
      setIsSpeaking(false);
      return;
    }
    const text = `${product?.name || ''} sizes. ${t.standardSizeNotice}`;
    soundManager.speak(text, lang);
    setIsSpeaking(true);
  };

  if (!product) {
    return (
      <div className="p-6 text-center text-stone-600">
        Product not found.
      </div>
    );
  }

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
              {product.name}
            </span>
            <h2 className="text-lg font-black text-white leading-tight mt-0.5">
              {t.sizeChoiceTitle}
            </h2>
            <p className="text-xs text-emerald-100 font-medium">
              {t.sizeChoiceSub}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleSpeakSizes}
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
            onClick={() => onOpenHelp({ title: t.sizeChoiceTitle, message: t.helpSizeChoice })}
            className="p-2.5 rounded-full bg-emerald-700/80 hover:bg-emerald-600 text-white transition"
            title={t.help}
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mandatory Standard Size Notice (REQUIREMENT 4) */}
      <div className="bg-amber-50 border border-amber-300/90 rounded-2xl p-3.5 flex items-start gap-2.5 shadow-xs text-amber-950">
        <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="text-xs">
          <span className="font-bold block text-[11px] uppercase tracking-wider text-amber-900 mb-0.5">
            Tailor Fit Guide
          </span>
          <span className="font-medium leading-relaxed block">
            {t.standardSizeNotice || 'Standard size, adjust to your measurements.'}
          </span>
        </div>
      </div>

      {/* Size Cards with Simple Pictures */}
      <div className="space-y-3">
        {sizeEvaluations.map((item) => {
          const isSelected = selectedSize === item.sizeKey;
          return (
            <div
              key={item.sizeKey}
              onClick={() => setSelectedSize(item.sizeKey)}
              className={`bg-white rounded-3xl p-4 border-2 cursor-pointer transition relative shadow-xs ${
                isSelected
                  ? 'border-emerald-600 ring-4 ring-emerald-500/20'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="flex items-start gap-3.5">
                {/* Visual Picture */}
                <ProductVisual
                  productId={productId}
                  sizeKey={item.sizeKey}
                  variant={variant}
                  className="w-16 h-16 flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-black text-stone-900">
                      {item.label}
                    </h4>
                    {item.fits ? (
                      <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{t.sizeFitsPile}</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-600 border border-stone-200 px-2 py-0.5 rounded-full">
                        {t.sizeNeedsMore}
                      </span>
                    )}
                  </div>

                  {/* Missing reason if doesn't fit */}
                  {!item.fits && item.missing && (
                    <p className="text-[11px] text-stone-500 mt-1 line-clamp-2 leading-tight">
                      {item.missing}
                    </p>
                  )}

                  {item.fits && (
                    <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                      Ready to stitch with your current fabric scraps.
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Select This Size Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => onSelectSize(selectedSize)}
          className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-2xl shadow-md flex items-center justify-center gap-2 transition"
        >
          <span>{t.selectThisSizeBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
