import React from 'react';
import { Check, Volume2, Globe } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function LanguageScreen({ currentLang, onSelectLang, onContinue, t }) {
  const languages = [
    {
      code: 'en',
      native: 'English',
      subtitle: 'Turn leftover fabric into useful products',
      greeting: 'Welcome to ReWear! Turn leftover fabric into beautiful, useful things.',
      phoneticGreeting: 'English selected. Welcome to ReWear! Turn leftover fabric into beautiful, useful things.',
      flag: '🌐',
    },
    {
      code: 'te',
      native: 'తెలుగు (Telugu)',
      subtitle: 'బట్టల ముక్కలతో కొత్త వస్తువులు కుట్టండి',
      greeting: 'రీవేర్ కి స్వాగతం! మిగిలిపోయిన బట్టల ముక్కలతో అందమైన వస్తువులు కుట్టండి.',
      phoneticGreeting: 'Telugu bhasha: ReWear ki swagatham! Migilipoina battala mukkalanu chupinchandi. Emi kuttavacho memu chupisthamu.',
      flag: '🇮🇳',
    },
    {
      code: 'hi',
      native: 'हिंदी (Hindi)',
      subtitle: 'बची हुई कतरनों से सुंदर चीज़ें बनाएं',
      greeting: 'रीवेयर में आपका स्वागत है! बची हुई कतरनों से सुंदर और उपयोगी चीज़ें बनाएं।',
      phoneticGreeting: 'Hindi bhasha: ReWear mein aapka swagat hai! Bachi hui katranon se sundar aur upyogi cheezen banayein.',
      flag: '🇮🇳',
    },
  ];

  const handleListenGreeting = (e, item) => {
    e.stopPropagation();
    soundManager.speak(item.greeting, item.code, item.phoneticGreeting);
  };

  const handleCardClick = (item) => {
    onSelectLang(item.code);
    soundManager.speak(item.greeting, item.code, item.phoneticGreeting);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col justify-between p-4 max-w-md mx-auto">
      {/* Top Branding */}
      <div className="pt-6 pb-4 text-center">
        <div className="w-16 h-16 rounded-3xl bg-emerald-700 text-white flex items-center justify-center text-3xl mx-auto shadow-lg mb-3 border-2 border-emerald-500">
          🧵
        </div>
        <h1 className="text-2xl font-black text-stone-900 tracking-tight">ReWear</h1>
        <p className="text-xs font-medium text-emerald-800 mt-1 max-w-xs mx-auto leading-relaxed">
          {t.promise}
        </p>
      </div>

      {/* Main Language Options */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-stone-200/80 my-auto">
        <div className="mb-4">
          <h2 className="text-base font-bold text-stone-900">{t.chooseLanguageTitle}</h2>
          <p className="text-xs text-stone-500 mt-0.5">{t.chooseLanguageSub}</p>
        </div>

        <div className="space-y-3">
          {languages.map((item) => {
            const isSelected = currentLang === item.code;
            return (
              <div
                key={item.code}
                onClick={() => handleCardClick(item)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/90 shadow-sm ring-2 ring-emerald-500/20'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <span className="text-2xl">{item.flag}</span>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                      <span>{item.native}</span>
                      {isSelected && (
                        <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-semibold">
                          Selected
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-stone-600 font-medium mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={(e) => handleListenGreeting(e, item)}
                    className="p-2.5 rounded-full bg-emerald-100/80 hover:bg-emerald-200 text-emerald-800 transition shadow-xs flex items-center justify-center"
                    title={t.listen}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                      isSelected
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-stone-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Confirm Button */}
      <div className="pt-4 pb-2">
        <button
          type="button"
          onClick={() => {
            soundManager.stop();
            onContinue();
          }}
          className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition flex items-center justify-center text-sm gap-2"
        >
          <span>{t.continueBtn}</span>
          <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  );
}
