import React from 'react';

export default function ProductVisual({ productId, sizeKey, variant = 'plain', className = 'w-16 h-16' }) {
  if (productId === 'tote_bag') {
    return (
      <div className={`relative flex items-center justify-center bg-stone-100 rounded-2xl p-2 border border-stone-200 overflow-hidden ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full text-stone-700" fill="none" stroke="currentColor">
          {/* Handles */}
          <path d="M 32 40 C 32 15, 68 15, 68 40" strokeWidth="6" strokeLinecap="round" className="text-amber-700" />
          {/* Main Body */}
          <rect x="20" y="38" width="60" height="52" rx="4" fill="#3B82F6" fillOpacity="0.25" strokeWidth="4" />
          {/* Gusset Line */}
          <path d="M 20 76 L 80 76" strokeWidth="3" strokeDasharray="3 3" className="text-stone-400" />
          {/* Pocket */}
          <rect x="36" y="52" width="28" height="24" rx="2" fill="#F59E0B" fillOpacity="0.6" strokeWidth="3" className="text-amber-800" />
        </svg>
      </div>
    );
  }

  if (productId === 'pouch') {
    return (
      <div className={`relative flex items-center justify-center bg-stone-100 rounded-2xl p-2 border border-stone-200 overflow-hidden ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor">
          {/* Tabs */}
          <rect x="8" y="44" width="8" height="12" rx="2" fill="#10B981" stroke="#047857" strokeWidth="2" />
          <rect x="84" y="44" width="8" height="12" rx="2" fill="#10B981" stroke="#047857" strokeWidth="2" />
          {/* Zipper Band */}
          <rect x="16" y="32" width="68" height="10" rx="2" fill="#D97706" stroke="#92400E" strokeWidth="3" />
          <path d="M 16 37 L 84 37" stroke="#FFF" strokeWidth="2" strokeDasharray="2 2" />
          {/* Pouch Body */}
          <rect x="16" y="42" width="68" height="42" rx="4" fill="#6366F1" fillOpacity="0.3" stroke="#4338CA" strokeWidth="4" />
          {/* Pull Slider */}
          <circle cx="28" cy="37" r="3" fill="#FFF" stroke="#92400E" strokeWidth="2" />
        </svg>
      </div>
    );
  }

  if (productId === 'cushion_cover') {
    return (
      <div className={`relative flex items-center justify-center bg-stone-100 rounded-2xl p-2 border border-stone-200 overflow-hidden ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor">
          {/* Cushion Body */}
          <rect x="15" y="15" width="70" height="70" rx="8" fill="#F43F5E" fillOpacity="0.2" stroke="#BE123C" strokeWidth="4" />
          {variant === 'decorated' ? (
            <>
              {/* Outer Frame Border */}
              <rect x="25" y="25" width="50" height="50" rx="4" fill="#0D9488" fillOpacity="0.3" stroke="#0F766E" strokeWidth="3" />
              {/* Center Motif */}
              <rect x="38" y="38" width="24" height="24" rx="3" fill="#FBBF24" stroke="#D97706" strokeWidth="3" />
            </>
          ) : (
            <>
              {/* Pieced Grid Lines */}
              <line x1="15" y1="50" x2="85" y2="50" stroke="#BE123C" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="50" y1="15" x2="50" y2="85" stroke="#BE123C" strokeWidth="2" strokeDasharray="3 3" />
            </>
          )}
        </svg>
      </div>
    );
  }

  if (productId === 'kids_frock') {
    return (
      <div className={`relative flex items-center justify-center bg-stone-100 rounded-2xl p-2 border border-stone-200 overflow-hidden ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor">
          {/* Bodice */}
          <path d="M 32 18 L 42 38 L 58 38 L 68 18 L 58 18 L 50 26 L 42 18 Z" fill="#8B5CF6" fillOpacity="0.3" stroke="#6D28D9" strokeWidth="3" />
          {/* Skirt */}
          <path d="M 34 38 L 20 86 L 80 86 L 66 38 Z" fill="#EC4899" fillOpacity="0.25" stroke="#BE185D" strokeWidth="4" />
          {/* Ruffle / Hem Band */}
          <path d="M 20 76 Q 35 84, 50 76 Q 65 84, 80 76 L 80 86 L 20 86 Z" fill="#F59E0B" fillOpacity="0.6" stroke="#B45309" strokeWidth="2" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center bg-stone-200 text-stone-600 rounded-2xl text-2xl ${className}`}>
      🧵
    </div>
  );
}
