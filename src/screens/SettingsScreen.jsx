// src/screens/SettingsScreen.jsx
// Stage 6 / Task A20: Local Settings & Profile Management Screen
// Strictly on-device: No server, no password, all data stays on this phone.

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Save, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  User, 
  Store, 
  Phone, 
  Languages 
} from 'lucide-react';
import { 
  loadProfile, 
  saveProfile, 
  clearProfile, 
  DATA_PRIVACY_NOTICE 
} from '../utils/profileStorage.js';

export default function SettingsScreen({
  currentProfile,
  onUpdateProfile,
  onClearAllData,
  onBack,
  lang = 'en',
  setLang,
}) {
  const [profile, setProfileState] = useState(() => currentProfile || loadProfile() || {
    name: '',
    shopName: '',
    phoneNumber: '',
    lang,
  });

  const [name, setName] = useState(profile.name || '');
  const [shopName, setShopName] = useState(profile.shopName || '');
  const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber || '');
  const [selectedLang, setSelectedLang] = useState(lang);
  const [savedNotice, setSavedNotice] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const privacyText = DATA_PRIVACY_NOTICE[selectedLang] || DATA_PRIVACY_NOTICE.en;

  const labels = {
    en: {
      title: 'Profile & Settings',
      sub: 'Manage your tailor profile and device preferences',
      editProfile: 'Edit Profile Information',
      name: 'Tailor / Name',
      shop: 'Shop / Boutique Name',
      phone: 'Phone Number',
      saveBtn: 'Save Profile Changes',
      savedMsg: '✓ Profile updated successfully on this phone',
      dangerZone: 'Data Management',
      clearBtn: 'Clear My Data',
      clearSub: 'Wipes your local profile and scraps from this phone.',
      modalTitle: 'Clear all local data?',
      modalDesc: 'This will erase your tailor profile and all saved fabric scraps from this device. This cannot be undone.',
      confirmClear: 'Yes, Delete Everything',
      cancel: 'Cancel',
      privacySub: 'ReWear never uploads your profile, scraps, or designs to external servers.',
    },
    te: {
      title: 'ప్రొఫైల్ & సెట్టింగ్‌లు',
      sub: 'మీ టైలర్ ప్రొఫైల్ మరియు పరికర ప్రాధాన్యతలను నిర్వహించండి',
      editProfile: 'ప్రొఫైల్ వివరాలను సవరించండి',
      name: 'టైలర్ / పేరు',
      shop: 'షాపు / బొటిక్ పేరు',
      phone: 'ఫోన్ నంబర్',
      saveBtn: 'మార్పులను సేవ్ చేయండి',
      savedMsg: '✓ ప్రొఫైల్ విజయవంతంగా సేవ్ చేయబడింది',
      dangerZone: 'డేటా నిర్వహణ',
      clearBtn: 'నా డేటాను క్లియర్ చేయండి',
      clearSub: 'ఈ ఫోన్ నుండి మీ ప్రొఫైల్ మరియు ముక్కల డేటాను తొలగిస్తుంది.',
      modalTitle: 'డేటాను పూర్తిగా తొలగించాలా?',
      modalDesc: 'ఇది మీ ప్రొఫైల్ మరియు అన్ని ముక్కలను ఈ ఫోన్ నుండి తొలగిస్తుంది. దీన్ని వెనక్కి తీసుకోలేము.',
      confirmClear: 'అవును, డేటాను తొలగించండి',
      cancel: 'రద్దు చేయి',
      privacySub: 'ReWear మీ వివరాలు లేదా ముక్కల డేటాను ఏ సర్వర్‌కూ అప్‌లోడ్ చేయదు.',
    },
    hi: {
      title: 'प्रोफ़ाइल और सेटिंग्स',
      sub: 'अपनी टेलर प्रोफ़ाइल और प्राथमिकताएं प्रबंधित करें',
      editProfile: 'प्रोफ़ाइल जानकारी संपादित करें',
      name: 'दर्जी / नाम',
      shop: 'दुकान / बुटीक का नाम',
      phone: 'फ़ोन नंबर',
      saveBtn: 'बदलाव सुरक्षित करें',
      savedMsg: '✓ प्रोफ़ाइल इस फोन पर सुरक्षित हो गई है',
      dangerZone: 'डेटा प्रबंधन',
      clearBtn: 'मेरा डेटा हटाएं',
      clearSub: 'इस फोन से आपकी प्रोफ़ाइल और कतरनों का डेटा मिट जाएगा।',
      modalTitle: 'क्या आप सारा डेटा हटाना चाहते हैं?',
      modalDesc: 'इससे आपकी प्रोफ़ाइल और कतरनें इस फोन से हमेशा के लिए हट जाएंगी।',
      confirmClear: 'हां, सब कुछ हटाएं',
      cancel: 'रद्द करें',
      privacySub: 'ReWear आपका डेटा कभी किसी बाहरी सर्वर पर नहीं भेजता।',
    },
  }[selectedLang] || labels.en;

  const handleSave = (e) => {
    e.preventDefault();
    const updated = {
      name: name.trim(),
      shopName: shopName.trim(),
      phoneNumber: phoneNumber.trim(),
      lang: selectedLang,
    };

    saveProfile(updated);
    setProfileState(updated);
    if (onUpdateProfile) onUpdateProfile(updated);
    if (setLang && selectedLang !== lang) setLang(selectedLang);

    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleClearConfirmed = () => {
    clearProfile();
    setShowClearConfirm(false);
    if (onClearAllData) {
      onClearAllData();
    }
  };

  return (
    <div className="space-y-4 pb-32">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-4 shadow-sm border border-emerald-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 rounded-2xl bg-emerald-700/80 hover:bg-emerald-600 text-white transition cursor-pointer"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base font-black text-white leading-tight">
              {labels.title}
            </h2>
            <p className="text-xs text-emerald-100 font-medium mt-0.5">
              {labels.sub}
            </p>
          </div>
        </div>
      </div>

      {/* Mandatory Honesty Rule: Data Privacy Notice */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-4 flex items-start gap-3 shadow-2xs">
        <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
        <div className="min-w-0 flex-1">
          <span className="text-sm font-black text-emerald-950 block leading-tight">
            {privacyText}
          </span>
          <span className="text-xs text-emerald-800 leading-snug block mt-1">
            {labels.privacySub}
          </span>
        </div>
      </div>

      {/* Language Preferences Card */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-xs space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
          <Languages className="w-4 h-4 text-emerald-700" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800">
            Language / భాష / भाषा
          </h3>
        </div>
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
                if (setLang) setLang(item.code);
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

      {/* Edit Profile Form */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
          <User className="w-4 h-4 text-emerald-700" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800">
            {labels.editProfile}
          </h3>
        </div>

        {savedNotice && (
          <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{labels.savedMsg}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-3.5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-stone-400" />
              <span>{labels.name}</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Master Tailor"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-xs font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-stone-400" />
              <span>{labels.shop}</span>
            </label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              placeholder="e.g. Boutique Name"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-xs font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-stone-400" />
              <span>{labels.phone}</span>
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g. Phone Number"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-xs font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs rounded-2xl shadow-sm flex items-center justify-center gap-2 transition cursor-pointer pt-2"
          >
            <Save className="w-4 h-4" />
            <span>{labels.saveBtn}</span>
          </button>
        </form>
      </div>

      {/* Danger Zone: Clear Data */}
      <div className="bg-red-50/70 rounded-3xl p-5 border border-red-200 space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-red-100">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-red-900">
            {labels.dangerZone}
          </h3>
        </div>
        <p className="text-xs text-red-800/80 leading-snug">
          {labels.clearSub}
        </p>
        <button
          type="button"
          onClick={() => setShowClearConfirm(true)}
          className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-2xl shadow-xs flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span>{labels.clearBtn}</span>
        </button>
      </div>

      {/* Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-lg shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-stone-900">
                  {labels.modalTitle}
                </h3>
                <span className="text-[10px] text-stone-500 font-semibold">
                  Cannot be undone
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-snug">
              {labels.modalDesc}
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleClearConfirmed}
                className="py-2.5 px-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-xs shadow-xs transition cursor-pointer"
              >
                {labels.confirmClear}
              </button>
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-2xl font-bold text-xs transition cursor-pointer"
              >
                {labels.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
