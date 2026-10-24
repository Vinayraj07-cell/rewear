import React from 'react';
import { Volume2 } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function StitchingGuidesScreen({ t, lang }) {
  const guides = [
    {
      title: "Needle Size Selection",
      icon: "📍",
      desc: "Fine silks & georgette: Size 9/65 or 11/75. Medium cotton & linen: Size 14/90. Heavy denim & canvas: Size 16/100 or 18/110.",
      tip: "Change needle every 2-3 garments to prevent thread snagging.",
    },
    {
      title: "Seam Finishes for Leftovers",
      icon: "🪡",
      desc: "Overlock or French Seams for delicate fraying fabrics. Flat-felled seams for heavy denim and bag straps.",
      tip: "Use zig-zag stitch if you don't own an overlock machine.",
    },
    {
      title: "Pressing & Shrinkage Rules",
      icon: "♨️",
      desc: "Always steam press scraps flat before cutting. If using washed shirting or cotton, pre-shrink with light mist.",
      tip: "Never skip pressing! Press every seam open after stitching.",
    },
    {
      title: "Combining Different Fabrics",
      icon: "🧵",
      desc: "Do not stitch stretch knit directly to stiff woven without fusible interfacing or tissue paper backing.",
      tip: "Use matching thread weight: 40-50 wt cotton or polyester.",
    },
  ];

  const handleSpeakAll = () => {
    const text = guides.map((g) => `${g.title}: ${g.desc}`).join('. ');
    soundManager.speak(text, lang);
  };

  return (
    <div className="space-y-4 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-stone-900">{t.feature5Title}</h2>
          <p className="text-xs text-stone-500">{t.feature5Desc}</p>
        </div>
        <button
          type="button"
          onClick={handleSpeakAll}
          className="p-2 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition"
          title={t.listen}
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {guides.map((g, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs space-y-2">
            <div className="flex items-center space-x-2.5">
              <span className="text-2xl">{g.icon}</span>
              <h3 className="text-xs font-bold text-stone-900">{g.title}</h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed pl-1">
              {g.desc}
            </p>
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-2 text-[11px] text-amber-900 flex items-center gap-1.5">
              <span className="font-bold">Tailor Tip:</span>
              <span>{g.tip}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
