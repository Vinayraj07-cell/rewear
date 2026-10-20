import React from 'react';
import { Volume2, X, HelpCircle, Check } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function HelpModal({ isOpen, onClose, title, message, t, lang }) {
  if (!isOpen) return null;

  const handleSpeak = () => {
    soundManager.speak(`${title}. ${message}`, lang);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        <div className="px-5 py-3.5 border-b border-stone-100 flex items-center justify-between bg-amber-50/80">
          <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>{title || t.helpTitle}</span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={handleSpeak}
              className="p-1.5 rounded-full bg-amber-200/70 text-amber-900 hover:bg-amber-300 transition"
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

        <div className="p-5 text-stone-700 text-sm leading-relaxed">
          <p>{message}</p>
        </div>

        <div className="px-5 py-3.5 bg-stone-50 border-t border-stone-100 flex justify-end">
          <button
            type="button"
            onClick={() => { soundManager.stop(); onClose(); }}
            className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm"
          >
            <Check className="w-4 h-4" />
            <span>{t.confirm}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
