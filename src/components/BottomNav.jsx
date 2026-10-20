import React from 'react';
import { Home, PlusCircle, Layers, Sparkles, BookOpen } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab, t, pileCount }) {
  const tabs = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'add', label: t.addScrap, icon: PlusCircle, highlight: true },
    { id: 'pile', label: t.myPile, icon: Layers, badge: pileCount },
    { id: 'tips', label: t.fabricTips, icon: Sparkles },
    { id: 'guides', label: t.feature5Badge, icon: BookOpen },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-2xl z-30 select-none pb-safe">
      <div className="max-w-md mx-auto grid grid-cols-5 px-1 py-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all relative ${
                isActive
                  ? 'text-emerald-800 font-bold'
                  : 'text-stone-500 hover:text-emerald-700'
              }`}
            >
              <div
                className={`p-1 rounded-full transition-all relative ${
                  isActive
                    ? 'bg-emerald-100/90 text-emerald-800 scale-105 ring-2 ring-emerald-600/30'
                    : tab.highlight
                    ? 'bg-emerald-50 text-emerald-700'
                    : ''
                }`}
              >
                <Icon className={`w-5 h-5 ${tab.highlight && !isActive ? 'stroke-[2.5]' : ''}`} />
                {tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-amber-500 text-stone-900 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-0.5 leading-none tracking-tight truncate max-w-full text-center">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
