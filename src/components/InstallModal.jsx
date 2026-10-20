import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Smartphone, 
  QrCode, 
  Share2, 
  X, 
  Check, 
  Copy, 
  ExternalLink, 
  Sparkles,
  Wifi
} from 'lucide-react';
import QRCode from 'qrcode';

export default function InstallModal({ 
  isOpen, 
  onClose, 
  deferredPrompt, 
  t 
}) {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('qr'); // 'qr', 'android', 'ios', 'apk'

  // Dynamic Network URL accessible by mobile phone on the same Wi-Fi
  const mobileUrl = typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
    ? `${window.location.protocol}//${window.location.host}/`
    : `http://10.33.19.23:5173/`;

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(mobileUrl, {
        width: 260,
        margin: 2,
        color: {
          dark: '#064e3b',
          light: '#ffffff'
        }
      }).then((url) => setQrDataUrl(url)).catch((err) => console.error(err));
    }
  }, [isOpen, mobileUrl]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(mobileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log('User install outcome:', outcome);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 max-h-[92vh]">
        
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-stone-100 flex items-center justify-between bg-emerald-800 text-white">
          <div className="flex items-center space-x-2">
            <Smartphone className="w-5 h-5 text-emerald-300" />
            <h3 className="font-bold text-sm tracking-tight">Install ReWear on Phone</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-700 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switchers: QR Code vs Step Instructions vs APK */}
        <div className="flex border-b border-stone-200 bg-stone-50 p-1">
          <button
            type="button"
            onClick={() => setActiveTab('qr')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition ${
              activeTab === 'qr'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Scan & Open
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition ${
              activeTab === 'guide'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            How to Install
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('apk')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition ${
              activeTab === 'apk'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Android APK
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-center">

          {activeTab === 'qr' && (
            <div className="space-y-3">
              <div className="w-48 h-48 mx-auto bg-white p-2 rounded-2xl border-2 border-emerald-600/30 shadow-md flex items-center justify-center">
                {qrDataUrl ? (
                  <img src={qrDataUrl} alt="Scan QR to open on phone" className="w-full h-full rounded-xl" />
                ) : (
                  <div className="animate-pulse text-stone-400 text-xs">Generating QR...</div>
                )}
              </div>

              <div>
                <p className="text-xs font-bold text-stone-800">
                  Point your phone camera at this QR code
                </p>
                <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                  Both devices must be on the same Wi-Fi network.
                </p>
              </div>

              {/* Direct Link Copy Box */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-2.5 flex items-center justify-between text-left">
                <div className="min-w-0 pr-2">
                  <span className="text-[10px] text-stone-400 font-bold uppercase block">
                    Phone Browser Address:
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-800 truncate block">
                    {mobileUrl}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs transition flex-shrink-0"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* 1-tap browser install prompt if available */}
              {deferredPrompt && (
                <button
                  type="button"
                  onClick={handleNativeInstall}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-md transition"
                >
                  <Download className="w-4 h-4" />
                  <span>1-Tap Install App on this device</span>
                </button>
              )}
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-3 text-left">
              {/* Android Steps */}
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3.5 space-y-1.5">
                <div className="flex items-center space-x-2 text-emerald-900 font-bold text-xs">
                  <span className="text-base">🤖</span>
                  <span>Android (Chrome / Samsung Internet)</span>
                </div>
                <ol className="text-[11px] text-stone-700 space-y-1 list-decimal list-inside leading-snug">
                  <li>Open <strong>{mobileUrl}</strong> in Chrome.</li>
                  <li>Tap the banner <strong>"Install ReWear App"</strong> at the bottom.</li>
                  <li>Or tap the 3 vertical dots <strong>⋮</strong> at top-right.</li>
                  <li>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</li>
                  <li>ReWear will appear as a standalone app with its own icon on your home screen!</li>
                </ol>
              </div>

              {/* iPhone Steps */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 space-y-1.5">
                <div className="flex items-center space-x-2 text-stone-900 font-bold text-xs">
                  <span className="text-base">🍎</span>
                  <span>iPhone / iPad (Safari)</span>
                </div>
                <ol className="text-[11px] text-stone-700 space-y-1 list-decimal list-inside leading-snug">
                  <li>Open <strong>{mobileUrl}</strong> in Safari.</li>
                  <li>Tap the <strong>Share</strong> button at bottom (square with arrow ⬆️).</li>
                  <li>Scroll down and tap <strong>"Add to Home Screen" (➕)</strong>.</li>
                  <li>Tap <strong>Add</strong> at top right. The ReWear app icon is now on your home screen!</li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'apk' && (
            <div className="space-y-3 text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl mx-auto shadow-xs">
                📦
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-900">Standalone Android APK Package</h4>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  You can download the standalone Android APK installer file and install it directly on any Android device.
                </p>
              </div>

              <a
                href="/rewear-app.apk"
                download="ReWear.apk"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md transition"
              >
                <Download className="w-4 h-4" />
                <span>Download ReWear Android APK (.apk)</span>
              </a>

              <p className="text-[10px] text-stone-400">
                Works on Android 7.0 and newer. Allow "Install unknown apps" in phone settings if prompted.
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <span className="flex items-center gap-1 font-medium">
            <Wifi className="w-3.5 h-3.5 text-emerald-600" />
            <span>Wi-Fi: 10.139.227.23</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-200 hover:bg-stone-300 font-semibold text-stone-800 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
