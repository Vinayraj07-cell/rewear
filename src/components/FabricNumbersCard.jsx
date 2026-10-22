import React from 'react';
import { Layers, Scissors, Sparkles, AlertCircle } from 'lucide-react';

export default function FabricNumbersCard({
  fabricUsedInSeamsCm2 = 0,
  fabricTooSmallToReuseCm2 = 0,
  fabricLostToFrayedEdgesCm2 = 0,
  reusableLeftoversCount = 0,
  wastePercentage = 0,
  totalAreaCm2 = 0,
  t,
  compact = false,
}) {
  // Compute percentage of fabric too small to reuse (if total area is available)
  let tooSmallPercent = wastePercentage;
  if (totalAreaCm2 > 0 && fabricTooSmallToReuseCm2 > 0) {
    tooSmallPercent = Math.round((fabricTooSmallToReuseCm2 / totalAreaCm2) * 100);
  }

  const hasFrayedLoss = fabricLostToFrayedEdgesCm2 > 0;

  return (
    <div className={`bg-stone-50 border border-stone-200 rounded-2xl ${compact ? 'p-3' : 'p-4'} space-y-3 shadow-xs`}>
      <div className="flex items-center justify-between border-b border-stone-200 pb-2">
        <div className="flex items-center gap-1.5 text-stone-800 font-bold text-xs uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5 text-emerald-700" />
          <span>{t.fabricUsageTitle || 'Your fabric numbers'}</span>
        </div>
      </div>

      <div className={`grid grid-cols-1 ${hasFrayedLoss ? 'sm:grid-cols-2 md:grid-cols-4' : 'sm:grid-cols-3'} gap-2 text-xs`}>
        {/* Metric 1: Fabric used in seams */}
        <div className="bg-white p-2.5 rounded-xl border border-stone-200 flex flex-col justify-between">
          <span className="text-[11px] text-stone-500 font-medium leading-tight block">
            {t.fabricUsedInSeams || 'Fabric used in seams'}:
          </span>
          <span className="text-base font-black text-amber-700 mt-1 block">
            {Math.round(fabricUsedInSeamsCm2)} cm²
          </span>
        </div>

        {/* Metric 2: Fabric too small to reuse */}
        <div className="bg-white p-2.5 rounded-xl border border-stone-200 flex flex-col justify-between">
          <span className="text-[11px] text-stone-500 font-medium leading-tight block">
            {t.fabricTooSmallToReuse || 'Fabric too small to reuse'}:
          </span>
          <span className="text-base font-black text-stone-700 mt-1 block">
            {tooSmallPercent}% <span className="text-xs font-normal text-stone-400">({Math.round(fabricTooSmallToReuseCm2)} cm²)</span>
          </span>
        </div>

        {/* Metric 3: Fabric lost to frayed edges (if applicable) */}
        {hasFrayedLoss && (
          <div className="bg-white p-2.5 rounded-xl border border-rose-200 flex flex-col justify-between">
            <span className="text-[11px] text-stone-500 font-medium leading-tight block">
              {t.lostToFrayedEdges || 'Lost to frayed edges'}:
            </span>
            <span className="text-base font-black text-rose-700 mt-1 block">
              {Math.round(fabricLostToFrayedEdgesCm2)} cm²
            </span>
          </div>
        )}

        {/* Metric 4: Leftover pieces kept for next time */}
        <div className="bg-white p-2.5 rounded-xl border border-stone-200 flex flex-col justify-between">
          <span className="text-[11px] text-stone-500 font-medium leading-tight block">
            {t.leftoversKeptForNextTime || 'Leftover pieces kept for next time'}:
          </span>
          <span className="text-base font-black text-emerald-700 mt-1 block">
            {reusableLeftoversCount} {t.piecesCountLabel || 'pieces'}
          </span>
        </div>
      </div>

      {/* Mandatory Seam Loss Note */}
      <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-2.5 flex items-start gap-2 text-[11px] text-amber-950 leading-snug">
        <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
        <span>
          {t.seamLossMandatoryNotice || 'Pieced panels lose fabric in seams, so small scraps cover less than their raw area.'}
        </span>
      </div>
    </div>
  );
}
