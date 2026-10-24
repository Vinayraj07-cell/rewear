// src/screens/FirstLaunchScreen.jsx
// Stage 6 / Task A20: First-Run Onboarding & Local Profile Setup
// Strictly on-device: No server, no password, all data stays on this phone.

import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, User, Store, Phone, Sparkles } from 'lucide-react';
import { saveProfile, DATA_PRIVACY_NOTICE } from '../utils/profileStorage.js';

export default function FirstLaunchScreen({ onComplete, initialLang = 'en' }) {
  const [selectedLang, setSelectedLang] = useState(initialLang);
  const [name, setName] = useState('');
  const [shopName, setShopName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const privacyText = DATA_PRIVACY_NOTICE[selectedLang] || DATA_PRIVACY_NOTICE.en;

  const content = {
    en: {
      welcome: 'Welcome to ReWear',
      tagline: 'Your Tailor-First Fabric Upcycling Studio',
      langTitle: 'Select Your Language',
      nameLabel: 'Your Name / Master Tailor',
      namePlaceholder: 'e.g., Rajesh Sharma',
      shopLabel: 'Shop / Boutique Name (Optional)',
      shopPlaceholder: 'e.g., Star Tailors & Boutique',
      phoneLabel: 'Phone Number (Optional)',
      phonePlaceholder: 'e.g., 9876543210',
      startBtn: 'Start Using ReWear',
      nameRequired: 'Please enter your name or a tailor identifier to proceed.',
      privacySub: 'No accounts, no passwords, no cloud tracking. 100% private to your device.',
      howItWorksTitle: 'Quick 3-Step Guide',
      step1: '1. Snap your scraps.',
      step1Sub: 'Log dimensions or snap a photo',
      step2: '2. Get AI suggestions.',
      step2Sub: 'Explore matching patterns',
      step3: '3. Export PDF for your tailor.',
      step3Sub: 'Print cutting blueprints',
    },
    te: {
      welcome: 'ReWear కు స్వాగతం',
      tagline: 'టైలర్ల కోసం ప్రత్యేక ఫ్యాబ్రిక్ అప్‌సైక్లింగ్ స్టూడియో',
      langTitle: 'మీ భాషను ఎంచుకోండి',
      nameLabel: 'మీ పేరు / మాస్టర్ టైలర్',
      namePlaceholder: 'ఉదా: లక్ష్మి',
      shopLabel: 'షాపు / బొటిక్ పేరు (ఐచ్ఛికం)',
      shopPlaceholder: 'ఉదా: శ్రీ సాయి ఫ్యాషన్స్',
      phoneLabel: 'ఫోన్ నంబర్ (ఐచ్ఛికం)',
      phonePlaceholder: 'ఉదా: 9876543210',
      startBtn: 'ReWear ప్రారంభించండి',
      nameRequired: 'దయచేసి కొనసాగడానికి మీ పేరును నమోదు చేయండి.',
      privacySub: 'ఖాతాలు లేవు, పాస్‌వర్డ్‌లు లేవు, క్లౌడ్ ట్రాకింగ్ లేదు. మీ ఫోన్‌లో మాత్రమే ఉంటుంది.',
      howItWorksTitle: 'సులువైన 3 దశలు',
      step1: '1. Snap your scraps.',
      step1Sub: 'ముక్కల కొలతలు లేదా ఫోటో',
      step2: '2. Get AI suggestions.',
      step2Sub: 'సరిపోయే డిజైన్ల ఎంపిక',
      step3: '3. Export PDF for your tailor.',
      step3Sub: 'కటింగ్ బ్లూప్రింట్ ప్రింట్',
    },
    hi: {
      welcome: 'ReWear में आपका स्वागत है',
      tagline: 'दर्जी भाइयों और बहनों के लिए अपसाइक्लिंग स्टूडियो',
      langTitle: 'अपनी भाषा चुनें',
      nameLabel: 'आपका नाम / मास्टर टेलर',
      namePlaceholder: 'उदा: अनिल कुमार',
      shopLabel: 'दुकान / बुटीक का नाम (वैकल्पिक)',
      shopPlaceholder: 'उदा: स्टार टेलर्स',
      phoneLabel: 'फ़ोन नंबर (वैकल्पिक)',
      phonePlaceholder: 'उदा: 9876543210',
      startBtn: 'ReWear शुरू करें',
      nameRequired: 'कृपया आगे बढ़ने के लिए अपना नाम दर्ज करें।',
      privacySub: 'कोई खाता नहीं, कोई पासवर्ड नहीं, कोई सर्वर नहीं। आपका डेटा पूरी तरह सुरक्षित है।',
      howItWorksTitle: '3 आसान चरण',
      step1: '1. Snap your scraps.',
      step1Sub: 'नाप या फोटो दर्ज करें',
      step2: '2. Get AI suggestions.',
      step2Sub: 'कैटलॉग से डिज़ाइन चुनें',
      step3: '3. Export PDF for your tailor.',
      step3Sub: 'कटिंग ब्लूप्रिंट प्रिंट करें',
    },
  }[selectedLang] || content.en;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg(content.nameRequired);
      return;
    }

    const profileData = {
      name: name.trim(),
      shopName: shopName.trim(),
      phoneNumber: phoneNumber.trim(),
      lang: selectedLang,
    };

    // Safe storage with try/catch
    saveProfile(profileData);

    // Always let the user through into the app
    if (onComplete) {
      onComplete(profileData);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
      
<style>{`
  @keyframes fadeInScale {
    0% { opacity: 0; transform: scale(0.96) translateY(10px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  .animate-first-launch {
    animation: fadeInScale 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
`}</style>

      <div className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-7 shadow-xl border border-stone-200/90 space-y-5 animate-first-launch transition-all duration-300">
        {/* Brand Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-700 text-white shadow-md border-2 border-emerald-500/40 text-2xl mb-1">
            🧵
          </div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">
            {content.welcome}
          </h1>
          <p className="text-xs text-stone-500 font-medium">
            {content.tagline}
          </p>
        </div>

        {/* Mandatory Honesty Rule Privacy Pill */}
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-2.5 shadow-2xs">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="text-left min-w-0">
            <span className="text-xs font-black text-emerald-950 block leading-tight">
              {privacyText}
            </span>
            <span className="text-[10px] text-emerald-800 leading-tight block mt-0.5">
              {content.privacySub}
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Language Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{content.langTitle}</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { code: 'en', label: 'English', sub: 'English' },
                { code: 'te', label: 'తెలుగు', sub: 'Telugu' },
                { code: 'hi', label: 'हिन्दी', sub: 'Hindi' },
              ].map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setSelectedLang(item.code);
                    setErrorMsg('');
                  }}
                  className={`py-2 px-1 rounded-2xl border text-center transition cursor-pointer flex flex-col items-center justify-center ${
                    selectedLang === item.code
                      ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm font-black'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100 font-semibold'
                  }`}
                >
                  <span className="text-xs leading-none">{item.label}</span>
                  <span className={`text-[9px] mt-0.5 leading-none ${selectedLang === item.code ? 'text-emerald-200' : 'text-stone-400'}`}>
                    {item.sub}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Name Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-stone-500" />
              <span>{content.nameLabel}</span>
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder={content.namePlaceholder}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-xs font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
              autoFocus
            />
          </div>

          {/* Shop Name Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-stone-500" />
              <span>{content.shopLabel}</span>
            </label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              placeholder={content.shopPlaceholder}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-xs font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
            />
          </div>

          {/* Phone Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-stone-500" />
              <span>{content.phoneLabel}</span>
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder={content.phonePlaceholder}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-xs font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
            />
          </div>

          {errorMsg && (
            <p className="text-xs text-red-600 font-semibold">{errorMsg}</p>
          )}

          {/* Quick 3-Step Onboarding Instructions */}
          <div className="bg-stone-50/90 border border-stone-200/80 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-stone-700 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{content.howItWorksTitle}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-white p-2 rounded-xl border border-stone-200/60 shadow-xs flex flex-col items-center">
                <span className="text-base mb-1">📸</span>
                <span className="font-bold text-[10px] text-stone-900 leading-tight">{content.step1}</span>
                <span className="text-[9px] text-stone-500 mt-0.5">{content.step1Sub}</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-stone-200/60 shadow-xs flex flex-col items-center">
                <span className="text-base mb-1">✨</span>
                <span className="font-bold text-[10px] text-stone-900 leading-tight">{content.step2}</span>
                <span className="text-[9px] text-stone-500 mt-0.5">{content.step2Sub}</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-stone-200/60 shadow-xs flex flex-col items-center">
                <span className="text-base mb-1">📄</span>
                <span className="font-bold text-[10px] text-stone-900 leading-tight">{content.step3}</span>
                <span className="text-[9px] text-stone-500 mt-0.5">{content.step3Sub}</span>
              </div>
            </div>
          </div>


          {/* Start Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs rounded-2xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition cursor-pointer mt-2"
          >
            <span>{content.startBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
