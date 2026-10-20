import React from 'react';
import { 
  Scissors, 
  Shirt, 
  Palette, 
  FolderHeart, 
  BookOpen, 
  Boxes, 
  ArrowRight, 
  Sparkles, 
  PlusCircle, 
  Layers,
  CheckCircle2
} from 'lucide-react';

export default function HomeScreen({ 
  onSelectFeature, 
  t, 
  pileCount, 
  onLoadSampleData, 
  onOpenWalkthrough,
  onOpenInstallModal
}) {
  const features = [
    {
      id: 'waste-reuse',
      title: t.feature1Title,
      desc: t.feature1Desc,
      icon: Scissors,
      badge: t.feature1Badge,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      cardColor: 'border-emerald-300 bg-gradient-to-br from-emerald-50/80 to-white hover:border-emerald-500',
      iconBg: 'bg-emerald-600 text-white',
      stageReady: true,
      action: () => onSelectFeature('add'),
    },
    {
      id: 'old-restyle',
      title: t.feature2Title,
      desc: t.feature2Desc,
      icon: Shirt,
      badge: t.feature2Badge,
      badgeColor: 'bg-stone-100 text-stone-600 border-stone-200',
      cardColor: 'border-stone-200 bg-stone-50/60 opacity-80',
      iconBg: 'bg-stone-500 text-white',
      stageReady: false,
    },
    {
      id: 'collage-art',
      title: t.feature3Title,
      desc: t.feature3Desc,
      icon: Palette,
      badge: t.feature3Badge,
      badgeColor: 'bg-stone-100 text-stone-600 border-stone-200',
      cardColor: 'border-stone-200 bg-stone-50/60 opacity-80',
      iconBg: 'bg-stone-500 text-white',
      stageReady: false,
    },
    {
      id: 'my-designs',
      title: t.feature4Title,
      desc: t.feature4Desc,
      icon: FolderHeart,
      badge: t.feature4Badge,
      badgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
      cardColor: 'border-purple-200 bg-gradient-to-br from-purple-50/40 to-white hover:border-purple-300',
      iconBg: 'bg-purple-600 text-white',
      stageReady: false,
    },
    {
      id: 'stitching-guides',
      title: t.feature5Title,
      desc: t.feature5Desc,
      icon: BookOpen,
      badge: t.feature5Badge,
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      cardColor: 'border-amber-200 bg-gradient-to-br from-amber-50/50 to-white hover:border-amber-400',
      iconBg: 'bg-amber-600 text-white',
      stageReady: true,
      action: () => onSelectFeature('guides'),
    },
    {
      id: 'my-stock',
      title: t.feature6Title,
      desc: t.feature6Desc,
      icon: Boxes,
      badge: `${pileCount} ${t.totalPieces.toLowerCase()}`,
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
      cardColor: 'border-sky-200 bg-gradient-to-br from-sky-50/50 to-white hover:border-sky-400',
      iconBg: 'bg-sky-600 text-white',
      stageReady: true,
      action: () => onSelectFeature('pile'),
    },
  ];

  return (
    <div className="space-y-4 pb-20">
      {/* Promise Hero Card */}
      <div className="bg-emerald-900 text-white rounded-3xl p-5 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 bottom-0 text-7xl opacity-10 pointer-events-none select-none">
          🪡
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>ReWear Promise</span>
          </div>
          <p className="text-sm font-medium text-emerald-50 leading-snug">
            "{t.promise}"
          </p>

          {/* Quick Start Buttons */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onSelectFeature('add')}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-900 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.addScrap}</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectFeature('pile')}
              className="px-3.5 py-2 bg-emerald-800/90 hover:bg-emerald-700 text-emerald-100 rounded-xl font-semibold text-xs flex items-center gap-1.5 border border-emerald-600 transition"
            >
              <Layers className="w-4 h-4" />
              <span>{t.myPile} ({pileCount})</span>
            </button>
            <button
              type="button"
              onClick={onOpenWalkthrough}
              className="px-3 py-2 bg-emerald-950/50 text-emerald-200 hover:text-white rounded-xl text-xs font-medium border border-emerald-700/60 transition"
            >
              Tour (?)
            </button>
          </div>
        </div>
      </div>

      {/* Install App on Phone Banner */}
      <div 
        onClick={onOpenInstallModal}
        className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-2xl p-3.5 flex items-center justify-between shadow-xs border border-emerald-600/60 cursor-pointer hover:border-amber-400 transition"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-black text-xl shadow-xs flex-shrink-0">
            📱
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white">Install App on Phone</span>
              <span className="text-[9px] bg-amber-400 text-stone-950 px-1.5 py-0.2 rounded font-extrabold uppercase">
                PWA / APK
              </span>
            </div>
            <p className="text-[11px] text-emerald-100 leading-tight mt-0.5">
              Scan QR code, tap Install or download APK to run standalone!
            </p>
          </div>
        </div>
        <div className="text-amber-300 pl-2">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* Demo sample loader pill if empty */}
      {pileCount === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-2">
            <span className="text-xl">💡</span>
            <div>
              <p className="text-xs font-bold text-amber-900">Want to test right now?</p>
              <p className="text-[11px] text-amber-700">Load sample tailor scraps with 1 tap.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onLoadSampleData}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs rounded-xl shadow-xs"
          >
            {t.loadSampleData}
          </button>
        </div>
      )}

      {/* Feature Grid Header */}
      <div>
        <h2 className="text-base font-bold text-stone-900">{t.featuresTitle}</h2>
        <p className="text-xs text-stone-500">{t.featuresSub}</p>
      </div>

      {/* Large Feature Cards (brief section 4) */}
      <div className="grid grid-cols-1 gap-3">
        {features.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={item.stageReady && item.action ? item.action : undefined}
              className={`p-4 rounded-3xl border-2 transition-all relative flex items-start space-x-3.5 ${
                item.cardColor
              } ${item.stageReady ? 'cursor-pointer hover:shadow-md' : 'cursor-not-allowed'}`}
            >
              {/* Icon Container */}
              <div
                className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center text-lg shadow-sm ${item.iconBg}`}
              >
                <Icon className="w-6 h-6 stroke-[2]" />
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <h3 className="text-sm font-bold text-stone-900 truncate">
                    {item.title}
                  </h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-snug line-clamp-2">
                  {item.desc}
                </p>
              </div>

              {/* Arrow Indicator */}
              {item.stageReady && (
                <div className="self-center p-1 text-emerald-700">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
