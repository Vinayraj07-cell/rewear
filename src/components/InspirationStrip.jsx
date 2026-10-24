// src/components/InspirationStrip.jsx
// Stage 6 / Task A8: Inspiration Gallery Strip Component
// Lazily loads public/gallery/manifest.json and displays ranked inspiration cards.
// Displays strictly under 2D Preview with clear AI honesty disclaimers.

import React, { useState, useEffect } from 'react';
import { Sparkles, Info, X, Eye } from 'lucide-react';
import { findInspiration } from '../gallery/findInspiration.js';

let cachedManifest = null;

export default function InspirationStrip({ design, lang = 'en', t = {} }) {
  const [manifest, setManifest] = useState(cachedManifest);
  const [activeItem, setActiveItem] = useState(null);

  const productId = design?.productId || design?.product?.id;

  // Extract unique scrap colours from design placements
  const scrapColours = React.useMemo(() => {
    if (!design?.placements) return [];
    const colors = new Set();
    for (const pl of design.placements) {
      if (pl.colorHex) colors.add(pl.colorHex);
      if (pl.scraps && Array.isArray(pl.scraps)) {
        for (const s of pl.scraps) {
          if (s.colorHex) colors.add(s.colorHex);
        }
      }
    }
    return Array.from(colors);
  }, [design]);

  useEffect(() => {
    let isMounted = true;
    if (cachedManifest) {
      setManifest(cachedManifest);
      return;
    }

    fetch('/gallery/manifest.json')
      .then((res) => {
        if (!res.ok) return [];
        return res.json();
      })
      .then((data) => {
        if (isMounted && Array.isArray(data)) {
          cachedManifest = data;
          setManifest(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          cachedManifest = [];
          setManifest([]);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const inspirationItems = React.useMemo(() => {
    if (!manifest || manifest.length === 0 || !productId) return [];
    return findInspiration(manifest, {
      productId,
      colours: scrapColours,
      limit: 6,
    });
  }, [manifest, productId, scrapColours]);

  if (!inspirationItems || inspirationItems.length === 0) {
    return null;
  }

  const sectionTitle = {
    en: 'Inspiration Gallery',
    hi: 'प्रेरणा गैलरी (उदाहरण)',
    te: 'ప్రేరణ గ్యాలరీ (నమూనాలు)',
  }[lang] || 'Inspiration Gallery';

  const disclaimerText = {
    en: 'Inspiration example (AI-generated), not made from your scraps',
    hi: 'प्रेरणा उदाहरण (AI-निर्मित), आपकी कतरनों से नहीं बना है',
    te: 'ప్రేరణ ఉదాహరణ (AI-రూపొందించినది), మీ ముక్కలతో చేసినది కాదు',
  }[lang] || 'Inspiration example (AI-generated), not made from your scraps';

  return (
    <div className="bg-white rounded-3xl p-4 border border-stone-200/90 shadow-sm space-y-3">
      {/* Header with Title and AI Honesty Pill */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800">
            {sectionTitle}
          </h3>
        </div>
        <span className="text-[10px] bg-stone-100 text-stone-600 px-2.5 py-0.5 rounded-full font-semibold border border-stone-200">
          AI examples
        </span>
      </div>

      {/* Horizontal Scroll Cards */}
      <div className="flex gap-3 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth">
        {inspirationItems.map((item) => {
          const name = item.names?.[lang] || item.names?.en || item.productId;
          const imgUrl = `/gallery/${item.file}`;

          return (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="flex-shrink-0 w-36 bg-stone-50 rounded-2xl border border-stone-200/80 overflow-hidden shadow-2xs hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer group"
            >
              {/* Image Container */}
              <div className="w-full h-28 bg-stone-200 relative overflow-hidden flex items-center justify-center">
                <img
                  src={imgUrl}
                  alt={name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback visual placeholder if image not yet populated
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.parentElement) {
                      e.currentTarget.parentElement.classList.add('bg-stone-100', 'flex', 'items-center', 'justify-center');
                      e.currentTarget.parentElement.innerHTML = '<span class="text-xs text-stone-400 font-bold">✨ Inspiration</span>';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-1.5 bg-white/90 text-stone-900 rounded-full shadow-xs">
                    <Eye className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-2 space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60 block truncate">
                  {item.colourway || 'earth'}
                </span>
                <h4 className="text-xs font-bold text-stone-900 leading-tight truncate">
                  {name}
                </h4>
              </div>
            </div>
          );
        })}
      </div>

      {/* Persistent Honesty Disclaimer */}
      <div className="flex items-center gap-1.5 text-[10px] text-stone-500 bg-stone-50 p-2 rounded-xl border border-stone-100">
        <Info className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
        <span className="leading-tight">{disclaimerText}</span>
      </div>

      {/* Modal on Click */}
      {activeItem && (
        <div className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-stone-200">
            {/* Modal Image */}
            <div className="relative w-full aspect-square bg-stone-100 flex items-center justify-center">
              <img
                src={`/gallery/${activeItem.file}`}
                alt={activeItem.names?.[lang] || activeItem.names?.en}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="absolute top-3 right-3 p-2 bg-stone-900/60 text-white rounded-full hover:bg-stone-900 transition"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Details */}
            <div className="p-4 space-y-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {activeItem.colourway} palette
                </span>
                <h3 className="text-base font-black text-stone-900 mt-1">
                  {activeItem.names?.[lang] || activeItem.names?.en || activeItem.productId}
                </h3>
              </div>

              {/* Color swatches */}
              {activeItem.colours && (
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-stone-400 font-bold uppercase">Palette:</span>
                  {activeItem.colours.map((hex, i) => (
                    <span
                      key={i}
                      className="w-4 h-4 rounded-full border border-stone-300 shadow-2xs"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                  ))}
                </div>
              )}

              {/* Strict Honesty Notice in Modal */}
              <div className="bg-amber-50 p-2.5 rounded-2xl border border-amber-200 text-[11px] text-amber-900 leading-snug">
                <span className="font-bold block text-amber-950 mb-0.5">⚠️ Illustrative Example Only</span>
                {disclaimerText}
              </div>

              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="w-full py-2.5 bg-stone-900 text-white rounded-2xl font-bold text-xs hover:bg-stone-800 transition"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
