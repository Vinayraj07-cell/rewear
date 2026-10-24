import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Check, Sparkles, Scissors, Layers, Lightbulb, Volume2, X } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function WalkthroughModal({ isOpen, onClose, t, lang }) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: t.walkthroughStep1Title,
      desc: t.walkthroughStep1Desc,
      icon: Scissors,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      illustration: '🧵 ✂️ 👗',
    },
    {
      title: t.walkthroughStep2Title,
      desc: t.walkthroughStep2Desc,
      icon: Layers,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      illustration: '📏 📐 🎨',
    },
    {
      title: t.walkthroughStep3Title,
      desc: t.walkthroughStep3Desc,
      icon: Sparkles,
      color: 'bg-sky-50 text-sky-700 border-sky-200',
      illustration: '💡 🪡 ✨',
    },
    {
      title: t.walkthroughStep4Title,
      desc: t.walkthroughStep4Desc,
      icon: Lightbulb,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      illustration: '👜 👝 📦',
    },
  ];

  useEffect(() => {
    if (isOpen) {
      setStep(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const current = steps[step];

  const handleSpeak = () => {
    soundManager.speak(`${current.title}. ${current.desc}`, lang);
  };

  const handleNext = () => {
    soundManager.stop();
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    soundManager.stop();
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header bar */}
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🧵</span>
            <span className="font-bold text-stone-800 text-sm">{t.walkthroughTitle}</span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={handleSpeak}
              className="p-1.5 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition"
              title={t.listen}
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => { soundManager.stop(); onClose(); }}
              className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col items-center text-center">
          {/* Big Visual Illustration */}
          <div className={`w-24 h-24 rounded-3xl ${current.color} border flex items-center justify-center text-3xl shadow-sm mb-4 transition-all duration-300 transform scale-105`}>
            <span>{current.illustration}</span>
          </div>

          <h3 className="text-lg font-bold text-stone-900 leading-snug mb-2">
            {current.title}
          </h3>
          <p className="text-sm text-stone-600 leading-relaxed max-w-xs">
            {current.desc}
          </p>

          {/* Dots Indicator */}
          <div className="flex items-center space-x-2 mt-6">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === step ? 'w-6 bg-emerald-600' : 'w-2 bg-stone-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-5 py-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
          {step > 0 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-semibold text-xs flex items-center gap-1 hover:bg-stone-100 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{t.back}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => { soundManager.stop(); onClose(); }}
              className="px-3 py-2 text-stone-500 hover:text-stone-800 text-xs font-semibold"
            >
              {t.skipWalkthrough}
            </button>
          )}

          <button
            type="button"
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:shadow-lg transition ml-auto"
          >
            <span>{step === steps.length - 1 ? t.getStarted : t.next}</span>
            {step === steps.length - 1 ? (
              <Check className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
