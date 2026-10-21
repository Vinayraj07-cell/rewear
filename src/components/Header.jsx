import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, HelpCircle, Undo2, Redo2, Languages, Eye, Type, Sparkles, Smartphone } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function Header({
  lang,
  setLang,
  t,
  screenTitle,
  speakText,
  speakPhonetic = null,
  onOpenHelp,
  onOpenLanguageModal,
  onOpenInstallModal,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  highContrast,
  setHighContrast,
  largeText,
  setLargeText,
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const unsub = soundManager.subscribe((speaking) => setIsSpeaking(speaking));
    return unsub;
  }, []);

  const handleToggleVoice = () => {
    if (isSpeaking) {
      soundManager.stop();
    } else if (speakText) {
      soundManager.speak(speakText, lang, speakPhonetic);
    }
  };

  return (
    <header className="bg-emerald-800 text-white shadow-md sticky top-0 z-30 select-none">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand & Screen Title */}
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-lg shadow-inner border border-emerald-400">
            🧵
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight flex items-center gap-1.5">
              <span>{t.appName}</span>
              <span className="text-[10px] uppercase tracking-wider bg-emerald-950/60 px-1.5 py-0.5 rounded text-amber-300 border border-amber-400/40 font-black">
                Stage 2
              </span>
            </h1>
            <p className="text-xs text-emerald-100 font-medium truncate max-w-[140px] sm:max-w-[180px]">
              {screenTitle}
            </p>
          </div>
        </div>

        {/* Global Toolbar Controls */}
        <div className="flex items-center space-x-1.5">
          {/* Undo & Redo (if available) */}
          {(canUndo || canRedo) && (
            <div className="flex items-center bg-emerald-900/70 rounded-lg p-0.5 mr-1 border border-emerald-700/50">
              <button
                type="button"
                onClick={onUndo}
                disabled={!canUndo}
                title={t.undo}
                className="p-1.5 rounded hover:bg-emerald-700 disabled:opacity-30 disabled:hover:bg-transparent transition text-emerald-100"
              >
                <Undo2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onRedo}
                disabled={!canRedo}
                title={t.redo}
                className="p-1.5 rounded hover:bg-emerald-700 disabled:opacity-30 disabled:hover:bg-transparent transition text-emerald-100"
              >
                <Redo2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Voice Help (TTS) Button */}
          <button
            type="button"
            onClick={handleToggleVoice}
            title={isSpeaking ? t.stopAudio : t.listen}
            className={`p-2 rounded-full transition-all flex items-center justify-center relative ${
              isSpeaking
                ? 'bg-amber-400 text-amber-950 ring-4 ring-amber-300/50 animate-pulse'
                : 'bg-emerald-700 hover:bg-emerald-600 text-white'
            }`}
          >
            {isSpeaking ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
            {isSpeaking && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
            )}
          </button>

          {/* Install on Mobile Phone Button */}
          <button
            type="button"
            onClick={onOpenInstallModal}
            title="Install on Mobile Phone"
            className="px-2 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1 shadow-xs transition"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Install</span>
          </button>

          {/* Language Switcher */}
          <button
            type="button"
            onClick={onOpenLanguageModal}
            title={t.changeLanguage}
            className="px-2 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1 border border-emerald-600/80"
          >
            <Languages className="w-3.5 h-3.5" />
            <span className="uppercase">{lang}</span>
          </button>

          {/* Accessibility Toggles (Contrast / Text size) */}
          <div className="flex items-center bg-emerald-900/60 rounded-lg p-0.5 border border-emerald-700/40">
            <button
              type="button"
              onClick={() => setHighContrast(!highContrast)}
              title={t.highContrast}
              className={`p-1.5 rounded transition ${
                highContrast ? 'bg-amber-400 text-amber-950 font-bold' : 'text-emerald-200 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setLargeText(!largeText)}
              title={t.largeText}
              className={`p-1.5 rounded transition ${
                largeText ? 'bg-amber-400 text-amber-950 font-bold' : 'text-emerald-200 hover:text-white'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Help (?) Button */}
          <button
            type="button"
            onClick={onOpenHelp}
            title={t.help}
            className="p-1.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-emerald-100 hover:text-white transition"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
