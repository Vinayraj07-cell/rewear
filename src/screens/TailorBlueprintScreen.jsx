// src/screens/TailorBlueprintScreen.jsx
// Stage 4B: Comprehensive Tailor Blueprint Screen for ReWear
// Provides:
// - Detailed piece-by-piece breakdown (number, name, cm & in, seam allowance, grain arrow, scrap trimmed sizes)
// - Assembly stitching steps in order (picture, text, audio button)
// - Materials and notions checklist
// - Time estimate
// - Editable price helper (materials + labor + extras)
// - Export PDF capability
// - Prominently marked "Measurements to be verified by a tailor"

import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Printer,
  Download,
  Volume2,
  Clock,
  Coins,
  Scissors,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';
import { buildTailorBlueprint, TAILOR_DISCLAIMER } from '../utils/tailorBlueprintData';
import TailorBlueprintPieceSvg from '../components/TailorBlueprintPieceSvg';
import StitchingStepSvg from '../components/StitchingStepSvg';
import { soundManager } from '../utils/audio';

export default function TailorBlueprintScreen({
  design,
  onBack,
  t = {},
  lang = 'en',
}) {
  const blueprint = useMemo(() => buildTailorBlueprint(design), [design]);

  // Audio speech status
  const [activeSpeakingStep, setActiveSpeakingStep] = useState(null);

  // PDF Export Status
  const [isExporting, setIsExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState(null);
  const [exportError, setExportError] = useState(null);

  // Editable Price Helper State
  const [materialCost, setMaterialCost] = useState(blueprint.pricing?.materialCost || 35);
  const [laborHours, setLaborHours] = useState(
    Number(((blueprint.estimatedTimeMinutes || 35) / 60).toFixed(2))
  );
  const [hourlyRate, setHourlyRate] = useState(blueprint.pricing?.laborRatePerHour || 120);
  const [extrasCost, setExtrasCost] = useState(blueprint.pricing?.extrasCost || 20);

  // Calculated Price
  const computedLabor = Math.round(laborHours * hourlyRate);
  const totalSuggestedPrice = Math.round(Number(materialCost) + computedLabor + Number(extrasCost));

  const handleSpeakStep = (step) => {
    setActiveSpeakingStep(step.stepNumber);
    soundManager.speak(step.audioText || step.instruction, lang);
    setTimeout(() => {
      setActiveSpeakingStep(null);
    }, 4000);
  };

  const handleSpeakOverview = () => {
    const speechText = `${blueprint.productName}, size ${blueprint.sizeLabel}. ${blueprint.piecesCount} cut pieces. Estimated sewing time ${blueprint.estimatedTimeMinutes} minutes. Measurements to be verified by a tailor.`;
    soundManager.speak(speechText, lang);
  };

  const handleExportPdf = async () => {
    try {
      setIsExporting(true);
      setExportError(null);
      setExportMessage(null);

      const { exportTailorBlueprintPdf } = await import('../utils/pdfExportService.js');
      const prodId = design.productId || design.product?.id;
      const sizeKey = design.sizeKey || design.size || 'small';
      const pile = design.pile || null;

      const result = await exportTailorBlueprintPdf({
        productId: prodId,
        sizeKey,
        pile,
        productName: blueprint.productName,
      });

      if (result.method === 'browser_download') {
        setExportMessage(`Blueprint PDF downloaded: ${result.fileName} (${result.totalPages} pages)`);
      } else if (result.method === 'native_share') {
        setExportMessage(`Blueprint ready (${result.totalPages} pages) — saved & shared.`);
      }
    } catch (err) {
      setExportError(`Export failed: ${err?.message || 'Unable to generate or save PDF'}`);
    } finally {
      setIsExporting(false);
    }
  };

  if (!blueprint || blueprint.error) {
    return (
      <div className="p-6 bg-red-50 text-red-800 rounded-3xl border border-red-200">
        <h3 className="font-bold">Error generating blueprint</h3>
        <p className="text-xs">{blueprint?.error || 'Invalid design data'}</p>
        <button
          type="button"
          onClick={onBack}
          className="mt-3 px-4 py-2 bg-red-800 text-white rounded-xl text-xs font-bold"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-36 print:pb-0 print:space-y-6 text-stone-900">
      {/* 1. Header & Navigation */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-4 shadow-sm border border-emerald-700 flex items-start justify-between print:bg-white print:text-black print:border-none print:p-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 rounded-2xl bg-emerald-700/80 hover:bg-emerald-600 text-white transition print:hidden"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded text-emerald-200 border border-emerald-500/40 uppercase font-black tracking-wider print:text-black print:border-black">
                TAILOR BLUEPRINT
              </span>
              <span className="text-xs text-emerald-100 font-semibold print:text-stone-700">
                {blueprint.sizeLabel}
              </span>
            </div>
            <h1 className="text-lg font-black tracking-tight mt-0.5 print:text-2xl">
              {blueprint.productName}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 print:hidden">
          <button
            type="button"
            onClick={handleSpeakOverview}
            className="p-2 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white transition"
            title="Read Overview"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleExportPdf}
            disabled={isExporting}
            className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer disabled:cursor-not-allowed"
            title="Export Tailor Blueprint as PDF"
          >
            {isExporting ? (
              <span className="w-3.5 h-3.5 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Printer className="w-3.5 h-3.5" />
            )}
            <span>PDF</span>
          </button>
        </div>
      </div>

      {/* 2. Mandatory Disclaimer Banner */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-3 flex items-center gap-2.5 shadow-xs">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-black text-amber-950 tracking-tight uppercase">
            {TAILOR_DISCLAIMER}
          </p>
          <p className="text-[11px] text-amber-900 leading-snug">
            All cut dimensions include 1.0 cm (0.4 in) seam allowance on all sides. Verify physical fabric stretch and grain line before cutting.
          </p>
        </div>
      </div>

      {/* 3. Summary KPI Overview */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-white rounded-2xl p-2.5 border border-stone-200 shadow-xs">
          <span className="text-[10px] text-stone-500 font-bold block uppercase">Pieces</span>
          <span className="text-base font-black text-stone-900">{blueprint.piecesCount}</span>
        </div>
        <div className="bg-white rounded-2xl p-2.5 border border-stone-200 shadow-xs">
          <span className="text-[10px] text-stone-500 font-bold block uppercase">Time</span>
          <span className="text-base font-black text-emerald-700">{blueprint.estimatedTimeMinutes} m</span>
        </div>
        <div className="bg-white rounded-2xl p-2.5 border border-stone-200 shadow-xs">
          <span className="text-[10px] text-stone-500 font-bold block uppercase">Seam Allow.</span>
          <span className="text-base font-black text-blue-700">1.0 cm</span>
        </div>
        <div className="bg-white rounded-2xl p-2.5 border border-stone-200 shadow-xs">
          <span className="text-[10px] text-stone-500 font-bold block uppercase">Price</span>
          <span className="text-base font-black text-amber-700">₹{totalSuggestedPrice}</span>
        </div>
      </div>

      {/* 4. Pattern Pieces Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5 text-stone-800 font-bold text-xs uppercase tracking-wider">
            <Layers className="w-4 h-4 text-emerald-700" />
            <span>Pattern Pieces ({blueprint.piecesCount})</span>
          </div>
          <span className="text-[11px] text-stone-500 font-medium">
            Cut & Finished Sizes
          </span>
        </div>

        <div className="space-y-3">
          {blueprint.pieces.map((piece) => (
            <div
              key={`piece-${piece.pieceNumber}`}
              className="bg-white rounded-3xl p-3.5 border border-stone-200 shadow-xs space-y-3"
            >
              {/* Piece Header */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-stone-900 text-white font-black text-xs flex items-center justify-center">
                    #{piece.pieceNumber}
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-stone-900 leading-tight">
                      {piece.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] text-stone-500">
                      <span className="capitalize font-semibold text-emerald-800">
                        Role: {piece.role}
                      </span>
                      <span>•</span>
                      <span>Grain: {piece.grainLine.symbol} {piece.grainLine.orientation === 'crosswise' ? 'Weft' : 'Warp'}</span>
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                  SA: {piece.seamAllowance.cm} ({piece.seamAllowance.inches})
                </span>
              </div>

              {/* Dimensions Table */}
              <div className="grid grid-cols-2 gap-2 bg-stone-50/70 p-2 rounded-2xl border border-stone-150 text-[11px]">
                <div>
                  <span className="text-[10px] text-stone-500 font-bold block uppercase">Cut Dimensions:</span>
                  <span className="font-extrabold text-stone-900">{piece.cutDimensions.cm}</span>
                  <span className="text-[10px] text-stone-500 block">({piece.cutDimensions.inches})</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 font-bold block uppercase">Finished Size:</span>
                  <span className="font-extrabold text-stone-900">{piece.finishedDimensions.cm}</span>
                  <span className="text-[10px] text-stone-500 block">({piece.finishedDimensions.inches})</span>
                </div>
              </div>

              {/* Technical Drawing SVG */}
              <div className="bg-slate-50/50 rounded-2xl p-2 border border-slate-200 flex items-center justify-center">
                <TailorBlueprintPieceSvg piece={piece} />
              </div>

              {/* Which Scraps Make It */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-stone-700">
                    Scrap Patches Used ({piece.scraps.length}):
                  </span>
                  <span className="text-[10px] text-stone-500">
                    {piece.seamsCount} join seam(s)
                  </span>
                </div>

                {piece.scrapsSummary && (
                  <p className="text-[11px] text-stone-600 bg-stone-50 px-2 py-1 rounded-xl border border-stone-200">
                    {piece.scrapsSummary}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {piece.scraps.map((s, sIdx) => (
                    <div
                      key={`scrap-chip-${piece.pieceNumber}-${sIdx}`}
                      className="flex items-center gap-2 p-1.5 rounded-xl border border-stone-200 bg-white text-[11px]"
                    >
                      <span
                        className="w-4 h-4 rounded-md border border-stone-400 shrink-0"
                        style={{ backgroundColor: s.colorHex }}
                      />
                      <div className="min-w-0 flex-1">
                        <span className="font-bold text-stone-800 capitalize truncate block text-[10px]">
                          Scrap #{s.index}: {s.color} {s.print === 'printed' ? '🌸' : ''}
                        </span>
                        <span className="text-[10px] text-stone-500 block">
                          Cut size: {s.trimmedDimensions.cm} ({s.trimmedDimensions.inches})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer Tag on Piece */}
              <div className="pt-1 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400">
                <span>{TAILOR_DISCLAIMER}</span>
                <span>Piece #{piece.pieceNumber} of {blueprint.piecesCount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Stitching Steps in Order */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5 text-stone-800 font-bold text-xs uppercase tracking-wider">
            <Scissors className="w-4 h-4 text-emerald-700" />
            <span>Stitching Steps in Order ({blueprint.stitchingSteps.length})</span>
          </div>
          <span className="text-[11px] text-stone-500 font-medium">
            Tailor Assembly Order
          </span>
        </div>

        <div className="space-y-2.5">
          {blueprint.stitchingSteps.map((step) => (
            <div
              key={`step-${step.stepNumber}`}
              className="bg-white rounded-3xl p-3 border border-stone-200 shadow-xs flex items-start gap-3"
            >
              {/* Step Diagram */}
              <StitchingStepSvg
                type={step.diagramType}
                stepNumber={step.stepNumber}
              />

              {/* Step Content */}
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-xs font-bold text-stone-900 leading-tight">
                    Step {step.stepNumber}: {step.title}
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleSpeakStep(step)}
                    className={`p-1.5 rounded-full transition print:hidden ${
                      activeSpeakingStep === step.stepNumber
                        ? 'bg-amber-400 text-stone-950 animate-pulse'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                    title="Listen to Step Instructions"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  {step.instruction}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Materials & Notions Checklist */}
      <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs space-y-3 pt-2">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2">
          <div className="flex items-center gap-1.5 text-stone-800 font-bold text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Materials & Notions Checklist</span>
          </div>
          <span className="text-[10px] text-stone-500 font-medium">
            Typical defaults, to be verified by a tailor
          </span>
        </div>

        <div className="divide-y divide-stone-100 text-xs">
          {blueprint.materials.map((mat, mIdx) => (
            <div key={`mat-${mIdx}`} className="py-2 flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <span className="font-bold text-stone-900 block text-xs">
                  {mat.name}
                </span>
                <span className="text-[11px] text-stone-500 block leading-tight">
                  {mat.spec}
                </span>
                {mat.note && (
                  <span className="text-[10px] text-emerald-800 font-medium block mt-0.5">
                    💡 {mat.note}
                  </span>
                )}
              </div>
              <span className="font-extrabold text-stone-800 shrink-0 text-xs bg-stone-100 px-2 py-0.5 rounded-lg">
                {mat.qty}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Editable Price Helper */}
      <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2">
          <div className="flex items-center gap-1.5 text-stone-800 font-bold text-xs uppercase tracking-wider">
            <Coins className="w-4 h-4 text-amber-600" />
            <span>Price Helper (Editable)</span>
          </div>
          <span className="text-[10px] text-stone-500 font-medium">
            Typical defaults, to be verified by a tailor
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Material Cost Input */}
          <div className="bg-stone-50 p-2.5 rounded-2xl border border-stone-200">
            <label className="text-[10px] text-stone-500 font-bold block uppercase mb-1">
              Material (₹)
            </label>
            <input
              type="number"
              value={materialCost}
              onChange={(e) => setMaterialCost(Math.max(0, Number(e.target.value)))}
              className="w-full bg-white border border-stone-300 rounded-xl px-2 py-1 text-xs font-black text-stone-900 text-center focus:outline-emerald-600"
            />
          </div>

          {/* Labor Time / Hourly Rate */}
          <div className="bg-stone-50 p-2.5 rounded-2xl border border-stone-200">
            <label className="text-[10px] text-stone-500 font-bold block uppercase mb-1">
              Labor ({laborHours}h × ₹{hourlyRate})
            </label>
            <input
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Math.max(0, Number(e.target.value)))}
              className="w-full bg-white border border-stone-300 rounded-xl px-2 py-1 text-xs font-black text-stone-900 text-center focus:outline-emerald-600"
              title="Tailor Hourly Rate (₹)"
            />
          </div>

          {/* Extras / Overhead */}
          <div className="bg-stone-50 p-2.5 rounded-2xl border border-stone-200">
            <label className="text-[10px] text-stone-500 font-bold block uppercase mb-1">
              Extras (₹)
            </label>
            <input
              type="number"
              value={extrasCost}
              onChange={(e) => setExtrasCost(Math.max(0, Number(e.target.value)))}
              className="w-full bg-white border border-stone-300 rounded-xl px-2 py-1 text-xs font-black text-stone-900 text-center focus:outline-emerald-600"
            />
          </div>
        </div>

        {/* Total Price Result */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 p-3 rounded-2xl flex items-center justify-between font-black shadow-xs">
          <div>
            <span className="text-[10px] uppercase tracking-wider block opacity-85">
              Suggested Customer Selling Price
            </span>
            <span className="text-lg">
              ₹{totalSuggestedPrice}
            </span>
          </div>
          <div className="text-right text-[10px] opacity-85 leading-tight">
            <span>Material: ₹{materialCost}</span>
            <br />
            <span>Labor: ₹{computedLabor} | Extras: ₹{extrasCost}</span>
          </div>
        </div>
      </div>

      {/* 8. Export PDF Button & Feedback */}
      <div className="pt-2 print:hidden space-y-2">
        {exportError && (
          <div className="p-3 bg-red-100 border border-red-300 text-red-900 rounded-2xl text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
            <span className="font-semibold">{exportError}</span>
          </div>
        )}

        {exportMessage && (
          <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span className="font-semibold">{exportMessage}</span>
          </div>
        )}

        <button
          type="button"
          onClick={handleExportPdf}
          disabled={isExporting}
          className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-500 text-white font-extrabold text-xs rounded-2xl shadow-md flex items-center justify-center gap-2 transition cursor-pointer disabled:cursor-not-allowed"
        >
          {isExporting ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Generating Tiled Blueprint PDF...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Export Tailor Blueprint as PDF</span>
            </>
          )}
        </button>
      </div>

      {/* 9. Mandatory Footer Disclaimer */}
      <div className="text-center pt-2 text-[10px] text-stone-400">
        <p className="font-bold uppercase tracking-wider">{TAILOR_DISCLAIMER}</p>
        <p>© ReWear Upcycling Studio • Precision Tailor Blueprint</p>
      </div>
    </div>
  );
}
