// Web Speech Synthesis Audio Helper for ReWear
// Supports English (en-IN/en-US), Hindi (hi-IN), and Telugu (te-IN)
// Robust mobile support for Android Chrome, Samsung Internet, iOS Safari, and Capacitor WebView.

import { transliterateIndic } from './transliterate';

class SoundManager {
  constructor() {
    this.synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
    this.currentUtterance = null;
    this.isSpeaking = false;
    this.listeners = new Set();
    this.voices = [];
    this.initialized = false;
    this.audioUnlocked = false;

    if (typeof window !== 'undefined') {
      this.initMobileAudioUnlock();
      this.loadVoices();

      if (this.synth) {
        if (this.synth.onvoiceschanged !== undefined) {
          this.synth.onvoiceschanged = () => this.loadVoices();
        }
      }
    }
  }

  // Mobile browsers (Chrome/Safari/Android) require a user gesture to unlock audio
  initMobileAudioUnlock() {
    const unlock = () => {
      if (this.audioUnlocked) return;

      // 1. Unlock Web Audio Context if available
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          ctx.resume().then(() => ctx.close());
        }
      } catch (e) {
        // Ignore
      }

      // 2. Unlock SpeechSynthesis with an empty utterance on first user touch/tap
      if (this.synth) {
        try {
          const silentUtterance = new SpeechSynthesisUtterance(' ');
          silentUtterance.volume = 0.01;
          silentUtterance.rate = 10;
          this.synth.speak(silentUtterance);
          this.audioUnlocked = true;
        } catch (e) {
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

  stop() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {
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

    // Normalize comparison
    const norm = (str) => (str || '').toLowerCase().replace(/_/g, '-');

    if (langCode === 'te') {
      // Look for native Telugu voice (Google తెలుగు, te-IN, te_IN)
      const teVoice = voiceList.find((v) => {
        const l = norm(v.lang);
        const n = norm(v.name);
        return l.startsWith('te') || n.includes('telugu') || n.includes('తెలుగు');
      });
      if (teVoice) return { voice: teVoice, isNative: true };
    } else if (langCode === 'hi') {
      // Look for native Hindi voice (Google हिन्दी, hi-IN, hi_IN)
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

    // Fallback: Pick best Indian English voice (Ravi, Heera, Google en-in) or default
    const indianVoice = voiceList.find(
      (v) => norm(v.lang) === 'en-in' || norm(v.name).includes('india')
    );
    if (indianVoice) return { voice: indianVoice, isNative: false };

    // Standard English fallback
    const fallbackVoice = voiceList.find((v) => norm(v.lang).startsWith('en')) || voiceList[0] || null;
    return { voice: fallbackVoice, isNative: false };
  }

  speak(text, lang = 'en', phoneticFallback = null) {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser/device.');
      return;
    }

    // Refresh voices list in case mobile OS loaded them lazily
    this.loadVoices();

    // Workaround for mobile Chromium bug where synth stays in paused state
    try {
      if (this.synth.paused) {
        this.synth.resume();
      }
      this.synth.cancel();
    } catch (e) {
      // Ignore
    }

    if (!text || !text.trim()) return;

    const { voice, isNative } = this.findVoiceForLang(lang);

    let textToSpeak = text;
    let voiceLang = 'en-IN';

    if (lang === 'te') {
      if (isNative && voice) {
        textToSpeak = text;
        voiceLang = voice.lang || 'te-IN';
      } else {
        // Use phonetic fallback or transliterated Telugu
        textToSpeak = phoneticFallback || transliterateIndic(text, 'te');
        voiceLang = voice ? voice.lang : 'en-IN';
      }
    } else if (lang === 'hi') {
      if (isNative && voice) {
        textToSpeak = text;
        voiceLang = voice.lang || 'hi-IN';
      } else {
        // Use phonetic fallback or transliterated Hindi
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
      // Don't log if it was merely canceled by user tapping stop
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('Speech synthesis notice:', e.error || e);
      }
      this.isSpeaking = false;
      this.notify();
    };

    // Mobile keep-alive timer for longer sentences (Android Chrome bug: GC cancels speech after 15s)
    const keepAliveTimer = setInterval(() => {
      if (!this.synth.speaking) {
        clearInterval(keepAliveTimer);
      } else {
        try {
          this.synth.pause();
          this.synth.resume();
        } catch (e) {
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
    }
  }
}

export const soundManager = new SoundManager();
