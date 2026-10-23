// src/utils/test_audio.js
// Regression and unit tests for Audio Helper, language mapping, and fallback (Stage 6 / Q12c)

import assert from 'node:assert';
import {
  mapLanguageToCode,
  getLanguageName,
  showVoiceUnavailableMessage,
  SoundManager,
} from './audio.js';

let passedCount = 0;
function pass(msg) {
  passedCount++;
  console.log(`  ✅ PASS: ${msg}`);
}

console.log('====================================================');
console.log('🔊 RUNNING AUDIO & TEXT-TO-SPEECH TEST SUITE');
console.log('====================================================\n');

// 1. Language code mapping
console.log('--- 1. mapLanguageToCode mapping tests ---');
assert.strictEqual(mapLanguageToCode('en'), 'en-IN');
assert.strictEqual(mapLanguageToCode('hi'), 'hi-IN');
assert.strictEqual(mapLanguageToCode('te'), 'te-IN');
assert.strictEqual(mapLanguageToCode('EN'), 'en-IN');
assert.strictEqual(mapLanguageToCode('HI'), 'hi-IN');
assert.strictEqual(mapLanguageToCode('TE'), 'te-IN');
assert.strictEqual(mapLanguageToCode('en-US'), 'en-IN');
assert.strictEqual(mapLanguageToCode('hi-IN'), 'hi-IN');
assert.strictEqual(mapLanguageToCode('te-IN'), 'te-IN');
assert.strictEqual(mapLanguageToCode(null), 'en-IN');
assert.strictEqual(mapLanguageToCode(undefined), 'en-IN');
assert.strictEqual(mapLanguageToCode('unknown'), 'en-IN');
pass('mapLanguageToCode maps en->en-IN, hi->hi-IN, te->te-IN correctly across all cases');

// 2. Language names
console.log('\n--- 2. getLanguageName tests ---');
assert.strictEqual(getLanguageName('en'), 'English');
assert.strictEqual(getLanguageName('hi'), 'Hindi (हिंदी)');
assert.strictEqual(getLanguageName('te'), 'Telugu (తెలుగు)');
assert.strictEqual(getLanguageName('TE'), 'Telugu (తెలుగు)');
pass('getLanguageName returns user-friendly localized names for en, hi, te');

// 3. Clear message on missing voice
console.log('\n--- 3. showVoiceUnavailableMessage tests ---');
const missingTeMsg = showVoiceUnavailableMessage('te');
assert(missingTeMsg.includes('Telugu (తెలుగు)'), 'Message must name Telugu');
assert(missingTeMsg.includes('te-IN'), 'Message must include BCP-47 tag');
assert(missingTeMsg.includes('Text-to-Speech'), 'Message must reference Text-to-Speech settings');

const missingHiMsg = showVoiceUnavailableMessage('hi');
assert(missingHiMsg.includes('Hindi (हिंदी)'), 'Message must name Hindi');
assert(missingHiMsg.includes('hi-IN'), 'Message must include BCP-47 tag');

const customMsg = showVoiceUnavailableMessage('en', 'Custom missing voice notice');
assert.strictEqual(customMsg, 'Custom missing voice notice');
pass('showVoiceUnavailableMessage produces clear actionable instructions for uninstalled voices');

// 4. Native TextToSpeech plugin integration
console.log('\n--- 4. Native TextToSpeech calls & options ---');
{
  const mockCalls = [];
  const mockPlugin = {
    async isLanguageSupported({ lang }) {
      return { supported: true };
    },
    async speak(opts) {
      mockCalls.push(opts);
    },
    async stop() {
      mockCalls.push({ action: 'stop' });
    },
  };

  const sm = new SoundManager();
  sm.setNativeOverride(true);
  sm.setTextToSpeechPlugin(mockPlugin);

  assert.strictEqual(sm.isNative(), true, 'Must report isNative=true');

  await sm.speakNative('Hello tailor', 'en');
  assert.strictEqual(mockCalls.length, 1);
  assert.strictEqual(mockCalls[0].lang, 'en-IN');
  assert.strictEqual(mockCalls[0].text, 'Hello tailor');

  await sm.speakNative('नमस्ते दर्जी', 'hi');
  assert.strictEqual(mockCalls.length, 2);
  assert.strictEqual(mockCalls[1].lang, 'hi-IN');
  assert.strictEqual(mockCalls[1].text, 'नमस्ते दर्जी');

  await sm.speakNative('నమస్కారం దర్జీ', 'te');
  assert.strictEqual(mockCalls.length, 3);
  assert.strictEqual(mockCalls[2].lang, 'te-IN');
  assert.strictEqual(mockCalls[2].text, 'నమస్కారం దర్జీ');

  sm.stop();
  assert.strictEqual(mockCalls[3].action, 'stop');
  pass('Native TTS routes through plugin with en-IN, hi-IN, and te-IN options');
}

// 5. Native unsupported/uninstalled voice handling
console.log('\n--- 5. Native voice not installed on device ---');
{
  let isLanguageSupportedCalled = false;
  let speakCalled = false;
  const mockPlugin = {
    async isLanguageSupported({ lang }) {
      isLanguageSupportedCalled = true;
      if (lang === 'te-IN') return { supported: false };
      return { supported: true };
    },
    async speak(opts) {
      speakCalled = true;
    },
    async stop() {},
  };

  const sm = new SoundManager();
  sm.setNativeOverride(true);
  sm.setTextToSpeechPlugin(mockPlugin);

  let notifiedError = null;
  sm.subscribeError((err) => {
    notifiedError = err;
  });

  await sm.speakNative('నమస్కారం', 'te');

  assert.strictEqual(isLanguageSupportedCalled, true, 'Must check language support');
  assert.strictEqual(speakCalled, false, 'Must NOT attempt speak if voice is not supported');
  assert.strictEqual(sm.isSpeaking, false, 'isSpeaking must be reset to false');
  assert(notifiedError !== null, 'Must notify error listener of missing voice');
  assert(notifiedError.includes('Telugu (తెలుగు)'), 'Error message must state Telugu');
  assert(sm.lastError.includes('Telugu (తెలుగు)'), 'sm.lastError must record the error');
  pass('Native audio surfaces clear message without crashing when voice is not installed');
}

// 6. Native TTS speak error handling
console.log('\n--- 6. Native TTS speak runtime exception handling ---');
{
  const mockPlugin = {
    async isLanguageSupported() {
      return { supported: true };
    },
    async speak() {
      throw new Error('TTS engine initialization failure');
    },
    async stop() {},
  };

  const sm = new SoundManager();
  sm.setNativeOverride(true);
  sm.setTextToSpeechPlugin(mockPlugin);

  let caughtError = null;
  sm.subscribeError((err) => {
    caughtError = err;
  });

  await sm.speakNative('Test error', 'en');
  assert.strictEqual(sm.isSpeaking, false, 'isSpeaking must reset on exception');
  assert(caughtError.includes('TTS engine initialization failure'), 'Must capture underlying exception in message');
  pass('Native audio gracefully catches runtime TTS errors and notifies listeners');
}

// 7. Browser SpeechSynthesis fallback
console.log('\n--- 7. Browser SpeechSynthesis fallback ---');
{
  const mockUtterances = [];
  class MockSpeechSynthesisUtterance {
    constructor(text) {
      this.text = text;
      this.lang = '';
      this.voice = null;
      this.rate = 1.0;
      this.pitch = 1.0;
      this.volume = 1.0;
      this.onstart = null;
      this.onend = null;
      this.onerror = null;
    }
  }

  const mockSynth = {
    paused: false,
    speaking: false,
    cancel() {},
    resume() {},
    getVoices() {
      return [
        { name: 'Google US English', lang: 'en-US' },
        { name: 'Google हिन्दी', lang: 'hi-IN' },
      ];
    },
    speak(utterance) {
      mockUtterances.push(utterance);
      if (utterance.onstart) utterance.onstart();
      if (utterance.onend) utterance.onend();
    },
  };

  const sm = new SoundManager();
  sm.setNativeOverride(false);
  sm.synth = mockSynth;
  sm.voices = mockSynth.getVoices();

  // Test browser speak with global SpeechSynthesisUtterance mocked
  globalThis.SpeechSynthesisUtterance = MockSpeechSynthesisUtterance;

  sm.speakBrowser('Hello browser', 'en');
  assert.strictEqual(mockUtterances.length, 1);
  assert.strictEqual(mockUtterances[0].text, 'Hello browser');
  assert.strictEqual(mockUtterances[0].lang, 'en-US');

  sm.speakBrowser('नमस्ते', 'hi');
  assert.strictEqual(mockUtterances.length, 2);
  assert.strictEqual(mockUtterances[1].text, 'नमस्ते');
  assert.strictEqual(mockUtterances[1].lang, 'hi-IN');

  sm.speakBrowser('తెలుగు', 'te');
  assert.strictEqual(mockUtterances.length, 3);
  // te doesn't have native voice in mockSynth, so transliterated fallback is spoken
  assert(mockUtterances[2].text.length > 0);
  assert.strictEqual(mockUtterances[2].lang, 'en-US');

  delete globalThis.SpeechSynthesisUtterance;
  pass('Browser fallback routes through SpeechSynthesis with appropriate language and transliteration fallback');
}

// 8. Missing SpeechSynthesis in browser environment
console.log('\n--- 8. Missing SpeechSynthesis fallback handling ---');
{
  const sm = new SoundManager();
  sm.setNativeOverride(false);
  sm.synth = null;

  let captured = null;
  sm.subscribeError((err) => {
    captured = err;
  });

  sm.speak('No speech synthesis available', 'en');
  assert(captured !== null, 'Must record error when speech synthesis is absent');
  assert(captured.includes('Speech synthesis is not supported'), 'Must display unsupported notice');
  pass('Absent SpeechSynthesis in browser triggers clear notification instead of staying silent');
}

console.log('\n====================================================');
console.log(`🎉 ALL ${passedCount} AUDIO & TTS TESTS PASSED PERFECTLY!`);
console.log('====================================================\n');
