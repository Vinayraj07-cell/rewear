// src/utils/audio.js
// Speech Synthesis & Native Text-to-Speech Audio Helper for ReWear
// Supports English (en-IN), Hindi (hi-IN), and Telugu (te-IN)
// Native support via @capacitor-community/text-to-speech with browser fallback to Web SpeechSynthesis.

import { transliterateIndic } from './transliterate.js';
import { Capacitor } from '@capacitor/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

/**
 * Maps short app language codes ('en', 'hi', 'te') to full BCP-47 tags
 * required by the native TextToSpeech engine and standard voices.
 */
export function mapLanguageToCode(lang) {
  const code = (lang || 'en').toString().toLowerCase().trim();
  if (code.startsWith('te')) return 'te-IN';
  if (code.startsWith('hi')) return 'hi-IN';
  return 'en-IN';
}

/**
 * Returns human-readable localized language name
 */
export function getLanguageName(lang) {
  const code = (lang || 'en').toString().toLowerCase().trim();
  if (code.startsWith('te')) return 'Telugu (తెలుగు)';
  if (code.startsWith('hi')) return 'Hindi (हिंदी)';
  return 'English';
}

/**
 * Displays a clear on-screen visual notification if a voice is not installed
 */
export function showVoiceUnavailableMessage(lang, customDetail = null) {
  const langName = getLanguageName(lang);
  const code = mapLanguageToCode(lang);
  const msg =
    customDetail ||
    `Voice for ${langName} (${code}) is not installed on this device. Please install or enable ${langName} in phone Settings > Text-to-Speech.`;

  console.warn('[ReWear Audio]', msg);

  if (typeof document !== 'undefined') {
    try {
      let toast = document.getElementById('rewear-voice-alert');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'rewear-voice-alert';
        toast.setAttribute('role', 'alert');
        toast.style.cssText =
          'position:fixed;top:16px;left:16px;right:16px;z-index:9999;background-color:#7f1d1d;color:#fef2f2;border:2px solid #ef4444;border-radius:1rem;padding:12px 16px;box-shadow:0 10px 25px rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:space-between;gap:12px;font-family:sans-serif;font-size:12px;font-weight:600;';
        document.body.appendChild(toast);
      }
      toast.innerHTML = `<div style="display:flex;align-items:center;gap:8px;"><span>⚠️</span><span>${msg}</span></div><button style="background:#fee2e2;color:#991b1b;border:none;border-radius:8px;padding:4px 10px;font-weight:bold;cursor:pointer;font-size:11px;" onclick="this.parentElement.remove()">Dismiss</button>`;
      setTimeout(() => {
        if (toast && toast.parentElement) toast.remove();
      }, 8000);
    } catch {
      // Ignore DOM issues in non-standard environments
    }
  }

  return msg;
}

export class SoundManager {
  constructor() {
    this.synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
    this.currentUtterance = null;
    this.isSpeaking = false;
    this.listeners = new Set();
    this.errorListeners = new Set();
    this.voices = [];
    this.initialized = false;
    this.audioUnlocked = false;
    this.lastError = null;

    // Testing overrides
    this._nativeOverride = null;
    this._ttsPluginOverride = null;

    if (typeof window !== 'undefined') {
      this.initMobileAudioUnlock();
      this.loadVoices();

      if (this.synth && this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  // Override hooks for testing
  setNativeOverride(override) {
    this._nativeOverride = override;
  }

  setTextToSpeechPlugin(plugin) {
    this._ttsPluginOverride = plugin;
  }

  get ttsPlugin() {
    return this._ttsPluginOverride || TextToSpeech;
  }

  isNative() {
    if (this._nativeOverride !== null) {
      return this._nativeOverride;
    }
    return (
      typeof Capacitor !== 'undefined' &&
      typeof Capacitor.isNativePlatform === 'function' &&
      Capacitor.isNativePlatform()
    );
  }

  // Mobile browsers require a user gesture to unlock audio
  initMobileAudioUnlock() {
    const unlock = () => {
      if (this.audioUnlocked) return;

      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          ctx.resume().then(() => ctx.close()).catch(() => {});
        }
      } catch {
        // Ignore
      }

      if (this.synth) {
        try {
          const silentUtterance = new SpeechSynthesisUtterance(' ');
          silentUtterance.volume = 0.01;
          silentUtterance.rate = 10;
          this.synth.speak(silentUtterance);
          this.audioUnlocked = true;
        } catch {
          // Ignore
        }
      }

      window.removeEventListener('touchstart', unlock, true);
      window.removeEventListener('touchend', unlock, true);
      window.removeEventListener('click', unlock, true);
    };

    window.addEventListener('touchstart', unlock, { capture: true, once: true });
    window.addEventListener('touchend', unlock, { capture: true, once: true });
    window.addEventListener('click', unlock, { capture: true, once: true });
  }

  loadVoices() {
    if (!this.synth) return;
    try {
      const v = this.synth.getVoices();
      if (v && v.length > 0) {
        this.voices = v;
      }
    } catch (e) {
      console.warn('Error loading voices:', e);
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((l) => l(this.isSpeaking));
  }

  subscribeError(listener) {
    this.errorListeners.add(listener);
    return () => this.errorListeners.delete(listener);
  }

  notifyError(errorMsg) {
    this.lastError = errorMsg;
    this.errorListeners.forEach((l) => l(errorMsg));
  }

  stop() {
    if (this.isNative()) {
      try {
        this.ttsPlugin.stop().catch(() => {});
      } catch {
        // Ignore
      }
    } else if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // Ignore
      }
    }
    this.isSpeaking = false;
    this.notify();
  }

  findVoiceForLang(langCode) {
    if (!this.voices || this.voices.length === 0) {
      this.loadVoices();
    }

    const voiceList = this.voices || [];
    const norm = (str) => (str || '').toLowerCase().replace(/_/g, '-');

    if (langCode === 'te') {
      const teVoice = voiceList.find((v) => {
        const l = norm(v.lang);
        const n = norm(v.name);
        return l.startsWith('te') || n.includes('telugu') || n.includes('తెలుగు');
      });
      if (teVoice) return { voice: teVoice, isNative: true };
    } else if (langCode === 'hi') {
      const hiVoice = voiceList.find((v) => {
        const l = norm(v.lang);
        const n = norm(v.name);
        return l.startsWith('hi') || n.includes('hindi') || n.includes('हिन्दी');
      });
      if (hiVoice) return { voice: hiVoice, isNative: true };
    } else if (langCode === 'en') {
      const enInVoice = voiceList.find((v) => norm(v.lang) === 'en-in');
      if (enInVoice) return { voice: enInVoice, isNative: true };
      const enVoice = voiceList.find((v) => norm(v.lang).startsWith('en'));
      if (enVoice) return { voice: enVoice, isNative: true };
    }

    const indianVoice = voiceList.find(
      (v) => norm(v.lang) === 'en-in' || norm(v.name).includes('india')
    );
    if (indianVoice) return { voice: indianVoice, isNative: false };

    const fallbackVoice = voiceList.find((v) => norm(v.lang).startsWith('en')) || voiceList[0] || null;
    return { voice: fallbackVoice, isNative: false };
  }

  async speakNative(text, lang) {
    const targetCode = mapLanguageToCode(lang);
    try {
      this.isSpeaking = true;
      this.notify();

      // Check if language is installed / supported on device
      if (typeof this.ttsPlugin.isLanguageSupported === 'function') {
        try {
          const res = await this.ttsPlugin.isLanguageSupported({ lang: targetCode });
          if (res && res.supported === false) {
            this.isSpeaking = false;
            this.notify();
            const errMsg = showVoiceUnavailableMessage(lang);
            this.notifyError(errMsg);
            return;
          }
        } catch (checkErr) {
          console.warn('[ReWear Audio] isLanguageSupported check warning:', checkErr);
        }
      }

      await this.ttsPlugin.speak({
        text,
        lang: targetCode,
        rate: 0.95,
        pitch: 1.0,
        volume: 1.0,
      });

      this.isSpeaking = false;
      this.notify();
    } catch (err) {
      this.isSpeaking = false;
      this.notify();
      const errMsg = showVoiceUnavailableMessage(
        lang,
        `Voice playback error for ${getLanguageName(lang)} (${targetCode}): ${err?.message || 'Voice missing or failed'}`
      );
      this.notifyError(errMsg);
    }
  }

  speakBrowser(text, lang = 'en', phoneticFallback = null) {
    if (!this.synth) {
      const errMsg = showVoiceUnavailableMessage(
        lang,
        `Speech synthesis is not supported in this browser/device for ${getLanguageName(lang)}.`
      );
      this.notifyError(errMsg);
      return;
    }

    this.loadVoices();

    try {
      if (this.synth.paused) {
        this.synth.resume();
      }
      this.synth.cancel();
    } catch {
      // Ignore
    }

    const { voice, isNative } = this.findVoiceForLang(lang);

    let textToSpeak = text;
    let voiceLang = mapLanguageToCode(lang);

    if (lang === 'te') {
      if (isNative && voice) {
        textToSpeak = text;
        voiceLang = voice.lang || 'te-IN';
      } else {
        textToSpeak = phoneticFallback || transliterateIndic(text, 'te');
        voiceLang = voice ? voice.lang : 'en-IN';
      }
    } else if (lang === 'hi') {
      if (isNative && voice) {
        textToSpeak = text;
        voiceLang = voice.lang || 'hi-IN';
      } else {
        textToSpeak = phoneticFallback || transliterateIndic(text, 'hi');
        voiceLang = voice ? voice.lang : 'en-IN';
      }
    } else {
      voiceLang = voice ? voice.lang : 'en-IN';
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    this.currentUtterance = utterance;

    if (voice) {
      utterance.voice = voice;
    }
    utterance.lang = voiceLang;
    utterance.rate = 0.90;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.notify();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.notify();
    };

    utterance.onerror = (e) => {
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('Speech synthesis notice:', e.error || e);
        const errMsg = showVoiceUnavailableMessage(
          lang,
          `Speech synthesis failed for ${getLanguageName(lang)}: ${e.error || 'Playback error'}`
        );
        this.notifyError(errMsg);
      }
      this.isSpeaking = false;
      this.notify();
    };

    // Mobile keep-alive timer for longer sentences
    const keepAliveTimer = setInterval(() => {
      if (!this.synth || !this.synth.speaking) {
        clearInterval(keepAliveTimer);
      } else {
        try {
          this.synth.pause();
          this.synth.resume();
        } catch {
          clearInterval(keepAliveTimer);
        }
      }
    }, 12000);

    try {
      this.synth.speak(utterance);
    } catch (err) {
      console.error('Error speaking on mobile:', err);
      this.isSpeaking = false;
      this.notify();
      clearInterval(keepAliveTimer);
      const errMsg = showVoiceUnavailableMessage(lang, `Speech synthesis error: ${err.message}`);
      this.notifyError(errMsg);
    }
  }

  speak(text, lang = 'en', phoneticFallback = null) {
    if (!text || !text.trim()) return;

    if (this.isNative()) {
      this.speakNative(text, lang);
      return;
    }

    this.speakBrowser(text, lang, phoneticFallback);
  }
}

export const soundManager = new SoundManager();
