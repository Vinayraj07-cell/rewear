// src/components/AiPhotoPreviewModal.jsx
// AI Realistic Photo Preview Modal for ReWear Design View
// Displays "Creating your photo..." loading screen with Cancel,
// then displays the photo NEXT TO the exact 2D plan with strict inspiration labels.

import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  X,
  Sparkles,
  RefreshCw,
  AlertTriangle,
  WifiOff,
  Clock,
  CheckCircle2,
  Layers,
  ArrowRight,
  Info,
} from 'lucide-react';
import Product2DPreview from './Product2DPreview';
import {
  requestAiPhotoPreview,
  rateLimitTracker,
  computeDesignHash,
  aiPreviewCache,
} from '../utils/aiPreviewService';
import { AI_CONFIG } from '../config/aiConfig';

export default function AiPhotoPreviewModal({
  isOpen,
  onClose,
  design,
  layout,
  t = {},
}) {
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorTitle, setErrorTitle] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const [elapsedSec, setElapsedSec] = useState(0);

  const abortControllerRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isOpen && design) {
      // Check if already in cache
      const hash = computeDesignHash(design);
      const cached = aiPreviewCache.get(hash);
      if (cached) {
        setResult({
          ...cached,
          fromCache: true,
          remainingToday: rateLimitTracker.getRemaining(),
        });
        setStatus('success');
      } else {
        handleGenerate(false);
      }
    } else {
      handleCancel();
    }
    return () => {
      handleCancel();
    };
  }, [isOpen, design]);

  const handleGenerate = async (forceRegenerate = false) => {
    // Check offline status first
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setErrorTitle(AI_CONFIG.LABELS.OFFLINE_TITLE);
      setErrorMessage(AI_CONFIG.LABELS.OFFLINE_DESC);
      setErrorCode('OFFLINE');
      setStatus('error');
      return;
    }

    // Check limit
    if (rateLimitTracker.isLimitReached() && (!aiPreviewCache.get(computeDesignHash(design)) || forceRegenerate)) {
      setErrorTitle(AI_CONFIG.LABELS.LIMIT_TITLE);
      setErrorMessage(AI_CONFIG.LABELS.LIMIT_DESC);
      setErrorCode('LIMIT_REACHED');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setElapsedSec(0);
    setErrorMessage('');
    setErrorCode('');

    // Setup Cancel AbortController
    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Start timer counter
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setElapsedSec((prev) => prev + 1);
    }, 1000);

    try {
      const res = await requestAiPhotoPreview({
        design,
        layout,
        signal: controller.signal,
        forceRegenerate,
      });

      clearInterval(timerRef.current);

      if (res.error) {
        setErrorTitle(res.title || 'Preview Unavailable');
        setErrorMessage(res.error);
        setErrorCode(res.code || 'API_ERROR');
        setStatus('error');
      } else {
        setResult(res);
        setStatus('success');
      }
    } catch (err) {
      clearInterval(timerRef.current);
      if (err.name === 'AbortError') {
        setStatus('idle');
      } else {
        setErrorTitle('Generation Failed');
        setErrorMessage(err.message || 'Could not generate photo. Please try again.');
        setErrorCode('API_ERROR');
        setStatus('error');
      }
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    clearInterval(timerRef.current);
    setStatus('idle');
  };

  if (!isOpen || !design) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-xs overflow-y-auto"
    >
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* 1. Header */}
        <div className="bg-stone-900 text-white p-3.5 px-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-amber-400 text-amber-950">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black tracking-tight leading-tight">
                AI Photo Preview
              </h2>
              <span className="text-[10px] text-stone-400 font-medium">
                {design.productName} • {design.sizeLabel}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2. Modal Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {/* A. LOADING SCREEN ("Creating your photo..." with Cancel) */}
          {status === 'loading' && (
            <div id="ai-photo-loading-view" className="py-8 px-4 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center border-4 border-amber-300 animate-pulse">
                  <Sparkles className="w-10 h-10 text-amber-600 animate-spin" style={{ animationDuration: '4s' }} />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-stone-900 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-stone-700">
                  {elapsedSec}s
                </div>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-stone-900">
                  {AI_CONFIG.LABELS.WAITING_TITLE}
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto leading-relaxed">
                  {AI_CONFIG.LABELS.WAITING_DESC}
                </p>
              </div>

              {/* Layout description hint */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-2.5 max-w-sm text-left text-[11px] text-stone-600 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-snug">
                  Synthesizing patchwork fabric seams and lighting from your exact {design.placements?.length || 0} cut pieces...
                </p>
              </div>

              {/* Cancel Button */}
              <button
                type="button"
                id="ai-photo-cancel-button"
                onClick={() => {
                  handleCancel();
                  onClose();
                }}
                className="mt-2 px-5 py-2 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold border border-stone-300 transition"
              >
                Cancel
              </button>
            </div>
          )}

          {/* B. ERROR VIEW (Offline, Limit Reached, or API Error) */}
          {status === 'error' && (
            <div id="ai-photo-error-view" className="py-6 px-3 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-amber-700">
                {errorCode === 'OFFLINE' ? (
                  <WifiOff className="w-7 h-7 text-stone-600" />
                ) : (
                  <AlertTriangle className="w-7 h-7 text-amber-600" />
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-stone-900">{errorTitle}</h3>
                <p className="text-xs text-stone-600 mt-1 max-w-sm mx-auto leading-relaxed">
                  {errorMessage}
                </p>
              </div>

              {errorCode === 'OFFLINE' && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-2.5 max-w-sm text-xs text-emerald-900 text-left">
                  <p className="font-semibold">✓ Zero Offline Impact</p>
                  <p className="text-[11px] text-emerald-800 mt-0.5">
                    Your scrap matching, geometry layouts, cutting manifests, and tailor blueprints continue to function 100% offline.
                  </p>
                </div>
              )}

              {errorCode === 'LIMIT_REACHED' && (
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-2.5 max-w-sm text-xs text-stone-700 text-left">
                  <p className="font-semibold text-stone-900">Per-Device Fair Quota</p>
                  <p className="text-[11px] text-stone-600 mt-0.5">
                    Limit of 10 AI generations per device protects cloud quota. Previously generated photos remain saved in your local cache.
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                {errorCode !== 'LIMIT_REACHED' && errorCode !== 'OFFLINE' && (
                  <button
                    type="button"
                    onClick={() => handleGenerate(true)}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition"
                  >
                    Try Again
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold border border-stone-300 transition"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* C. SUCCESS VIEW (Photo NEXT TO the exact 2D plan) */}
          {status === 'success' && result && (
            <div id="ai-photo-result-view" className="space-y-3.5">
              {/* Mandatory Status Pill / Banner */}
              {result.isMock ? (
                <div id="ai-mock-disclaimer-banner" className="bg-amber-50 border border-amber-300 rounded-2xl p-2.5 text-xs text-amber-950 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block leading-tight">
                      {AI_CONFIG.LABELS.MOCK_DISCLAIMER}
                    </span>
                    <span className="text-[10.5px] text-amber-800 leading-tight block mt-0.5">
                      Previewed with bundled studio sample (mock mode active). Live Gemini API requires active pay-as-you-go image generation quota.
                    </span>
                  </div>
                </div>
              ) : (
                <div id="ai-real-disclaimer-banner" className="bg-sky-50 border border-sky-300 rounded-2xl p-2.5 text-xs text-sky-950 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block leading-tight">
                      {AI_CONFIG.LABELS.REAL_DISCLAIMER}
                    </span>
                  </div>
                </div>
              )}

              {/* Side-by-Side Comparison Container: EXACT 2D PLAN NEXT TO AI PHOTO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Exact 2D Plan */}
                <div className="bg-stone-50 rounded-2xl p-2.5 border border-stone-200 flex flex-col">
                  <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-stone-200">
                    <div className="flex items-center gap-1.5 text-stone-800 font-bold text-[11px] uppercase tracking-wider">
                      <Layers className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Exact 2D Plan</span>
                    </div>
                    <span className="text-[10px] text-stone-500 font-semibold">Engine Data</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center min-h-[190px] bg-white rounded-xl border border-stone-200 overflow-hidden p-1">
                    <Product2DPreview
                      design={design}
                      t={t}
                      showLabels={false}
                    />
                  </div>
                  <span className="text-[9.5px] text-stone-500 text-center mt-1.5 block">
                    Tailor blueprint layout ({design.placements?.length || 0} pieces)
                  </span>
                </div>

                {/* 2. AI Realistic Photo */}
                <div className="bg-stone-50 rounded-2xl p-2.5 border border-stone-200 flex flex-col">
                  <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-stone-200">
                    <div className="flex items-center gap-1.5 text-stone-800 font-bold text-[11px] uppercase tracking-wider">
                      <Camera className="w-3.5 h-3.5 text-amber-600" />
                      <span>Realistic Photo</span>
                    </div>
                    <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                      {result.isMock ? 'Mock Sample' : 'AI Render'}
                    </span>
                  </div>
                  <div className="flex-1 flex items-center justify-center min-h-[190px] bg-white rounded-xl border border-stone-200 overflow-hidden">
                    <img
                      src={result.imageUrl}
                      alt="AI realistic preview"
                      className="w-full h-full object-cover max-h-[220px]"
                    />
                  </div>
                  <span className="text-[9.5px] text-stone-500 text-center mt-1.5 block">
                    Studio lighting &amp; textile texture visualization
                  </span>
                </div>
              </div>

              {/* Strict Inspiration Disclaimer Note */}
              <div className="bg-stone-100 rounded-xl p-2 text-center text-[10.5px] text-stone-600 leading-snug border border-stone-200">
                <p className="font-semibold text-stone-800">
                  AI photo. For inspiration only. Seams and patch positions follow the plan and blueprint.
                </p>
              </div>

              {/* Actions Footer */}
              <div className="pt-1 flex items-center justify-between gap-2">
                <button
                  type="button"
                  id="ai-photo-regenerate-button"
                  onClick={() => handleGenerate(true)}
                  className="py-2.5 px-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold border border-stone-300 transition flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-stone-600" />
                  <span>Regenerate ({rateLimitTracker.getRemaining()} left today)</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2.5 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition shadow-xs"
                >
                  Back to Design
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
