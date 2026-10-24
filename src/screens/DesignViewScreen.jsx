import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  HelpCircle, 
  Volume2, 
  VolumeX, 
  Layers, 
  Palette, 
  Sliders, 
  CheckCircle2, 
  Maximize2, 
  Scissors, 
  Sparkles,
  ShieldAlert,
  Edit3,
  FileText,
  Box,
  Camera
} from 'lucide-react';
import FabricNumbersCard from '../components/FabricNumbersCard';
import ProductVisual from '../components/ProductVisual';
import Product2DPreview from '../components/Product2DPreview';
import AiPhotoPreviewModal from '../components/AiPhotoPreviewModal';
import { computeProduct2DLayout } from '../utils/product2DLayout';
import { soundManager } from '../utils/audio';
import { COLOR_SWATCHES } from '../i18n/translations';
import { 
  getZoneDimensions, 
  getTranslatedProductName, 
  getTranslatedSizeLabel, 
  getTranslatedZoneName 
} from '../utils/zoneHelper.js';
import { 
  fitPileToProduct, 
  calculateDesignScore, 
  calculateEstimatedTime, 
  PRODUCT_TEMPLATES 
} from '../engine/index.js';

export default function DesignViewScreen({
  design,
  pile,
  onBack,
  onOpenCustomize,
  onOpenFeasibility,
  onOpenSizeChoice,
  onOpenTailorBlueprint,
  onOpen3DSpike,
  onOpenHelp,
  t,
  lang,
}) {
  const [globalPattern, setGlobalPattern] = useState(design.style || 'patchwork');
  const [variantToggle, setVariantToggle] = useState(design.variant || 'hybrid');
  const [perPartPatterns, setPerPartPatterns] = useState({});
  const [selectedZoneId, setSelectedZoneId] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? (navigator.onLine ?? true) : true);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Compute active design (recomputing when variantToggle changes for child_top)
  const activeDesign = useMemo(() => {
    if (design.productId === 'child_top' && pile && pile.length > 0) {
      const seamAllowanceCm = design.seamAllowanceCm || 1.0;
      const fitResult = fitPileToProduct(pile, 'child_top', design.sizeKey, seamAllowanceCm, { variant: variantToggle });
      const template = PRODUCT_TEMPLATES.child_top;
      const hasFraying = pile.some((p) => p.frays !== false);
      const designScore = calculateDesignScore(fitResult);
      const estimatedTimeMinutes = calculateEstimatedTime('child_top', fitResult.totalExtraSeams, hasFraying);
      const scrapsCount = fitResult.placements.reduce((sum, p) => sum + (p.scraps ? p.scraps.length : 0), 0);
      return {
        ...design,
        variant: variantToggle,
        fits: fitResult.fits,
        designScore,
        estimatedTimeMinutes,
        scrapsCount,
        yardageNeededMeters: fitResult.yardageNeededMeters || 0,
        plainFabricNeededMeters: fitResult.yardageNeededMeters || 0,
        plainBase: fitResult.plainBase || null,
        totalExtraSeams: fitResult.totalExtraSeams,
        placements: fitResult.placements,
        leftovers: fitResult.leftovers,
        wastePercentage: fitResult.wastePercentage,
        fabricUsedInSeamsCm2: fitResult.fabricUsedInSeamsCm2 || 0,
        fabricTooSmallToReuseCm2: fitResult.fabricTooSmallToReuseCm2 || 0,
        warnings: fitResult.warnings || [],
        missing: fitResult.missing,
        missingDetails: fitResult.missingDetails,
      };
    }
    return design;
  }, [design, pile, variantToggle]);

  const productName = getTranslatedProductName(activeDesign.productId, activeDesign.productName, t);
  const sizeLabel = getTranslatedSizeLabel(activeDesign.sizeKey, activeDesign.sizeLabel, t);

  // Compute recommended mode from scores so recommendation and score never disagree
  const recommendedMode = useMemo(() => {
    const prod = PRODUCT_TEMPLATES[design.productId] || design.spec;
    const sizeObj = prod?.sizes?.[design.sizeKey];
    const hasHybrid = (sizeObj?.variants?.hybrid && sizeObj?.variants?.patchwork) || (prod?.variants?.hybrid && prod?.variants?.patchwork);
    if (hasHybrid && pile && pile.length > 0) {
      const seamAllowanceCm = design.seamAllowanceCm || 1.0;
      const fitH = fitPileToProduct(pile, design.productId, design.sizeKey, seamAllowanceCm, { variant: 'hybrid' });
      const fitP = fitPileToProduct(pile, design.productId, design.sizeKey, seamAllowanceCm, { variant: 'patchwork' });
      const scoreH = calculateDesignScore(fitH);
      const scoreP = calculateDesignScore(fitP);
      return scoreH >= scoreP ? 'hybrid' : 'patchwork';
    }
    return design.recommendedMode || design.recommendedVariant || design.variant || 'plain';
  }, [design, pile]);

  // Available patterns as defined in requirement 2
  const patternList = [
    { id: 'patchwork', label: t.patterns?.patchwork || 'Patchwork', icon: '🧩' },
    { id: 'vertical', label: t.patterns?.vertical || 'Vertical Strips', icon: '💈' },
    { id: 'horizontal', label: t.patterns?.horizontal || 'Horizontal Strips', icon: '☰' },
    { id: 'grid', label: t.patterns?.grid || 'Square Grid', icon: '▦' },
    { id: 'checks', label: t.patterns?.checks || 'Checks', icon: '🏁' },
    { id: 'circle', label: t.patterns?.circle || 'Center Motif', icon: '🔘' },
    { id: 'diagonal', label: t.patterns?.diagonal || 'Diagonal', icon: '📐' },
    { id: 'zigzag', label: t.patterns?.zigzag || 'Zigzag', icon: '〰️' },
    { id: 'plain', label: t.patterns?.plain || 'Plain Solid', icon: '⬜' },
  ];

  const handleSpeakBlueprint = () => {
    if (isSpeaking) {
      soundManager.stop();
      setIsSpeaking(false);
      return;
    }
    const zonesCount = design.placements ? design.placements.length : 0;
    const text = `${design.productName}, ${design.sizeLabel}. ${zonesCount} panels arranged. ${t.designViewSub}`;
    soundManager.speak(text, lang);
    setIsSpeaking(true);
  };

  const handleUpdateZonePattern = (zoneId, patternId) => {
    setPerPartPatterns((prev) => ({
      ...prev,
      [zoneId]: patternId,
    }));
  };

  // Helper to get hex color for a scrap
  const getScrapHex = (colorName) => {
    const swatch = COLOR_SWATCHES.find(
      (s) => s.id.toLowerCase() === (colorName || '').toLowerCase()
    );
    return swatch ? swatch.hex : '#9CA3AF';
  };

  // Total area of the pile in cm²
  const totalPileArea = pile.reduce((sum, p) => sum + (p.width * p.height * (p.quantity || 1)), 0);

  // Compute effective design taking into account chosen patterns
  const effectiveDesign = useMemo(() => {
    if (!activeDesign || !activeDesign.placements) return activeDesign;
    const placements = activeDesign.placements.map((pl) => {
      const pat = perPartPatterns[pl.zoneId] || globalPattern || pl.direction;
      let dir = pl.direction;
      if (pat === 'vertical') dir = 'vertical';
      else if (pat === 'horizontal') dir = 'horizontal';
      else if (pat === 'grid' || pat === 'patchwork' || pat === 'checks') dir = 'grid';
      return {
        ...pl,
        direction: dir,
        patternChoice: pat,
      };
    });
    return {
      ...activeDesign,
      style: globalPattern,
      placements,
    };
  }, [activeDesign, globalPattern, perPartPatterns]);

  const currentLayout = useMemo(() => computeProduct2DLayout(effectiveDesign, 'front'), [effectiveDesign]);

  return (
    <div className="space-y-4 pb-36">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-4 shadow-sm border border-emerald-700 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 rounded-2xl bg-emerald-700/80 hover:bg-emerald-600 text-white transition"
            title={t.back}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded text-emerald-200 border border-emerald-500/40 uppercase font-black tracking-wider">
                {activeDesign.variant === 'decorated'
                  ? t.decoratedVariantLabel
                  : activeDesign.variant === 'hybrid'
                  ? 'Hybrid'
                  : activeDesign.variant === 'patchwork'
                  ? 'Full Patchwork'
                  : t.plainVariantLabel}
              </span>
              <span className="text-xs text-amber-300 font-bold">
                ⭐ {activeDesign.designScore}/100
              </span>
            </div>
            <h2 className="text-lg font-black text-white leading-tight mt-0.5 break-words">
              {productName}
            </h2>
            <p className="text-xs text-emerald-100 font-medium">
              {sizeLabel}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleSpeakBlueprint}
            className={`p-2.5 rounded-full transition ${
              isSpeaking
                ? 'bg-amber-400 text-amber-950 ring-4 ring-amber-300/40'
                : 'bg-emerald-700/80 hover:bg-emerald-600 text-white'
            }`}
            title={t.listen}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => onOpenHelp({ title: t.designViewTitle, message: t.helpDesignView })}
            className="p-2.5 rounded-full bg-emerald-700/80 hover:bg-emerald-600 text-white transition"
            title={t.help}
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Child Top: Construction Variant Toggle (Requirement 3: Hybrid vs Full Patchwork) */}
      {activeDesign.productId === 'child_top' && (
        <div className="bg-white rounded-3xl p-3.5 border border-stone-200 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-stone-800 font-bold text-xs uppercase tracking-wider">
              <Scissors className="w-3.5 h-3.5 text-emerald-700" />
              <span>Garment Construction</span>
            </div>
            <span className="text-[10px] font-semibold text-stone-500">
              {variantToggle === 'hybrid' ? 'Comfort Base' : '100% Upcycled'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => setVariantToggle('hybrid')}
              className={`py-2 px-2 rounded-2xl border transition flex flex-col items-center justify-center gap-0.5 ${
                variantToggle === 'hybrid'
                  ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center gap-1">
                <span>🌿</span>
                <span>Hybrid (Plain Body)</span>
              </div>
              {recommendedMode === 'hybrid' && (
                <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                  variantToggle === 'hybrid' ? 'bg-amber-300 text-stone-900' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  ★ Recommended
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setVariantToggle('patchwork')}
              className={`py-2 px-2 rounded-2xl border transition flex flex-col items-center justify-center gap-0.5 ${
                variantToggle === 'patchwork'
                  ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center gap-1">
                <span>🧩</span>
                <span>Full Patchwork</span>
              </div>
              {recommendedMode === 'patchwork' && (
                <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                  variantToggle === 'patchwork' ? 'bg-amber-300 text-stone-900' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  ★ Recommended
                </span>
              )}
            </button>
          </div>

          {/* Construction Metrics Comparison */}
          <div className="grid grid-cols-3 gap-1.5 bg-stone-50 p-2 rounded-2xl border border-stone-200 text-center text-[11px]">
            <div>
              <span className="text-[10px] text-stone-400 block leading-tight">Scraps</span>
              <span className="font-extrabold text-stone-800">{activeDesign.scrapsCount} scraps</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 block leading-tight">Extra Seams</span>
              <span className="font-extrabold text-amber-900">{activeDesign.totalExtraSeams} joins</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 block leading-tight">Est. Time</span>
              <span className="font-extrabold text-emerald-800">{activeDesign.estimatedTimeMinutes} mins</span>
            </div>
          </div>

          {/* Construction Notice Banner */}
          {variantToggle === 'hybrid' ? (
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-2.5 text-xs text-stone-700 flex items-start gap-2">
              <span className="text-emerald-700 font-bold shrink-0">🌿</span>
              <p className="leading-snug text-[11px] font-medium text-stone-700">
                {activeDesign.tailorVerified
                  ? 'Hybrid construction. Tailor-verified.'
                  : 'Hybrid construction. Not yet tailor-verified.'}
              </p>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-300 rounded-2xl p-2.5 text-xs text-amber-950 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="leading-snug text-[11px]">
                {activeDesign.warnings?.find((w) => w.includes('Full patchwork option')) ||
                  `Full patchwork option: ${activeDesign.scrapsCount} scraps across ${activeDesign.totalExtraSeams} seam joins, estimated sewing time ~${activeDesign.estimatedTimeMinutes} mins. Hybrid construction (plain fabric bodice with patchwork sleeves) is recommended for comfort against child skin.`}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Stage 4A: 2D Finished Product Tailor Preview */}
      <Product2DPreview
        design={effectiveDesign}
        t={t}
        lang={lang}
        selectedZoneId={selectedZoneId}
        onSelectZone={setSelectedZoneId}
      />

      {/* Colour Roles & Harmony Legend */}
      <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <div className="flex items-center gap-1.5 text-stone-800 font-bold text-xs uppercase tracking-wider">
            <Palette className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t.colourRolesTitle}</span>
          </div>
          <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-semibold">
            {t.balancedColours || 'Balanced colours'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          {/* Base Role (60%) */}
          <div className="p-2.5 rounded-2xl bg-sky-50 border border-sky-200 flex items-start gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-sky-600 flex-shrink-0 mt-0.5 shadow-xs" />
            <div>
              <span className="font-bold text-sky-950 block leading-tight">
                {t.roleBase}
              </span>
              <span className="text-[10px] text-sky-800 leading-tight block mt-0.5">
                {t.roleBaseDesc}
              </span>
            </div>
          </div>

          {/* Supporting Role (30%) */}
          <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-amber-500 flex-shrink-0 mt-0.5 shadow-xs" />
            <div>
              <span className="font-bold text-amber-950 block leading-tight">
                {t.roleSupporting}
              </span>
              <span className="text-[10px] text-amber-800 leading-tight block mt-0.5">
                {t.roleSupportingDesc}
              </span>
            </div>
          </div>

          {/* Accent Role (10%) */}
          <div className="p-2.5 rounded-2xl bg-purple-50 border border-purple-200 flex items-start gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-purple-600 flex-shrink-0 mt-0.5 shadow-xs" />
            <div>
              <span className="font-bold text-purple-950 block leading-tight">
                {t.roleAccent}
              </span>
              <span className="text-[10px] text-purple-800 leading-tight block mt-0.5">
                {t.roleAccentDesc}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pattern Choices Selector (Global & Per-Part) */}
      <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-stone-800 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.patternChoicesTitle}</span>
          </div>
          <span className="text-[10px] text-stone-500 font-medium">
            Active: <strong className="text-emerald-800 capitalize">{globalPattern}</strong>
          </span>
        </div>

        {/* Global Pattern Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {patternList.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setGlobalPattern(p.id);
                // Also update per part default
                const updated = {};
                design.placements?.forEach((pl) => {
                  updated[pl.zoneId] = p.id;
                });
                setPerPartPatterns(updated);
              }}
              className={`px-3 py-2 rounded-2xl flex-shrink-0 flex items-center gap-1.5 text-xs font-bold border transition ${
                globalPattern === p.id
                  ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
            >
              <span>{p.icon}</span>
              <span className="whitespace-nowrap">{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Arranged Pieces by Zone (Requirement 2) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-700" />
            <span>{t.arrangedByZoneTitle}</span>
            <span className="text-xs bg-stone-200 text-stone-800 px-2 py-0.5 rounded-full font-black">
              {design.placements?.length || 0}
            </span>
          </h3>
          <span className="text-[11px] text-stone-500 font-medium">
            {t.seamAllowanceIncluded || '1 cm Seam Allowance Included'}
          </span>
        </div>

        <div className="space-y-3">
          {design.placements?.map((placement, index) => {
            const isPieced = placement.patchCount > 1;
            const currentPattern = perPartPatterns[placement.zoneId] || globalPattern;
            const dims = getZoneDimensions(design.productId, design.sizeKey, placement.zoneId, placement, design.variant);
            const zoneTitle = getTranslatedZoneName(placement.zoneId, placement.zoneName, t);

            // Simplified colour role labels (Point 3)
            let roleBadge = {
              text: t.roleBase || 'Main colour (60%)',
              classes: 'bg-sky-100 text-sky-900 border-sky-300',
              accentDot: '#0284c7',
            };
            if (placement.role === 'supporting') {
              roleBadge = {
                text: t.roleSupporting || 'Second colour (30%)',
                classes: 'bg-amber-100 text-amber-900 border-amber-300',
                accentDot: '#f59e0b',
              };
            } else if (placement.role === 'accent') {
              roleBadge = {
                text: t.roleAccent || 'Small touch (10%)',
                classes: 'bg-purple-100 text-purple-900 border-purple-300',
                accentDot: '#9333ea',
              };
            }

            return (
              <div
                key={placement.zoneId}
                className={`bg-white rounded-3xl p-4 border transition shadow-xs ${
                  selectedZoneId === placement.zoneId
                    ? 'border-emerald-600 ring-2 ring-emerald-500/30'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                {/* Zone Top Bar */}
                <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-stone-100">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0" style={{ backgroundColor: roleBadge.accentDot }} />
                      <h4 className="text-sm font-bold text-stone-900">
                        {zoneTitle}
                      </h4>
                    </div>
                    {/* Real Zone Dimensions in cm and inches (POINT 1) */}
                    <div className="text-[11px] text-stone-500 mt-1 space-y-0.5">
                      <div>
                        <span className="text-stone-400 font-medium">{t.finishedSizeLabel || 'Finished size'}:</span>{' '}
                        <span className="font-bold text-stone-800">{dims.finishedCmText}</span>{' '}
                        <span className="text-[10px] text-stone-500 font-normal">({dims.finishedInText})</span>
                      </div>
                      <div>
                        <span className="text-stone-400 font-medium">{t.cutSizeLabel || 'Cut size'}:</span>{' '}
                        <span className="font-bold text-amber-900">{dims.cutCmText}</span>{' '}
                        <span className="text-[10px] text-stone-500 font-normal">({dims.cutInText})</span>
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border flex-shrink-0 ${roleBadge.classes}`}>
                    {roleBadge.text}
                  </span>
                </div>

                {/* Pieced Note (MANDATORY REQUIREMENT 2) */}
                <div className="mt-2.5">
                  {isPieced ? (
                    <div className="bg-amber-50/90 border border-amber-300 text-amber-950 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Scissors className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                        <span>
                          {t.piecedPanelNote ? t.piecedPanelNote.replace('{count}', placement.patchCount) : `This panel is pieced from ${placement.patchCount} patches.`}
                        </span>
                      </div>
                      <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded">
                        +{placement.patchCount - 1} seams
                      </span>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-3 py-1 rounded-xl text-[11px] font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t.singlePieceNote || 'Cut from 1 solid piece.'}</span>
                    </div>
                  )}
                </div>

                {/* Visual arranged patches layout */}
                <div className="mt-3 bg-stone-100/80 p-3 rounded-2xl border border-stone-200">
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>
                      {t.panelLayoutTitle
                        ? t.panelLayoutTitle.replace('{pattern}', (t.patterns && t.patterns[currentPattern]) || currentPattern)
                        : `Panel Layout (${currentPattern})`}
                    </span>
                    <span>
                      {t.piecesMappedLabel
                        ? t.piecesMappedLabel.replace('{count}', placement.scraps?.length || 0)
                        : `${placement.scraps?.length || 0} pieces mapped`}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {placement.scraps?.map((scrap, scrapIdx) => {
                      const hex = getScrapHex(scrap.color);
                      return (
                        <div
                          key={`${scrap.scrapId}-${scrapIdx}`}
                          className="bg-white p-2 rounded-xl border border-stone-200 flex items-center gap-2 shadow-xs"
                        >
                          <span
                            className="w-7 h-7 rounded-lg border border-black/10 flex-shrink-0 shadow-inner flex items-center justify-center text-[10px] text-white font-black"
                            style={{ backgroundColor: hex }}
                          >
                            {scrapIdx + 1}
                          </span>
                          <div className="min-w-0 flex-1">
                            <span className="text-[11px] font-bold text-stone-800 capitalize truncate block">
                              {scrap.color} {scrap.print === 'printed' ? '🌸' : ''}
                            </span>
                            <span className="text-[10px] text-stone-500 block">
                              {scrap.cutWidth} × {scrap.cutHeight} cm
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Per-Part Pattern Override Selector */}
                <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-stone-500 font-medium">
                    Panel Pattern:
                  </span>
                  <select
                    value={currentPattern}
                    onChange={(e) => handleUpdateZonePattern(placement.zoneId, e.target.value)}
                    className="bg-stone-50 border border-stone-300 text-stone-800 text-xs rounded-xl px-2.5 py-1 font-semibold focus:outline-emerald-600"
                  >
                    {patternList.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.icon} {p.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fabric Numbers (STRICT RULE 6 FORMAT - Only shown when product fits) */}
      {design.fits !== false && (
        <FabricNumbersCard
          fabricUsedInSeamsCm2={design.fabricUsedInSeamsCm2 || 0}
          fabricTooSmallToReuseCm2={design.fabricTooSmallToReuseCm2 || 0}
          fabricLostToFrayedEdgesCm2={design.fabricLostToFrayedEdgesCm2 || 0}
          reusableLeftoversCount={design.reusableLeftoversCount || design.leftovers?.length || 0}
          wastePercentage={design.wastePercentage || 0}
          totalAreaCm2={totalPileArea}
          t={t}
        />
      )}

      {/* Main Action Buttons */}
      <div className="space-y-2 pt-2">
        {/* Step 4b: Photo preview (AI) Button */}
        <button
          type="button"
          id="btn-photo-preview-ai"
          onClick={() => setShowAiModal(true)}
          className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-black text-xs rounded-2xl shadow-md flex items-center justify-center gap-2 transition"
        >
          <Camera className="w-4 h-4" />
          <span>Photo preview (AI)</span>
          {!isOnline && (
            <span className="text-[10px] bg-stone-900/50 text-amber-200 px-2 py-0.5 rounded-full font-bold ml-1">
              Needs internet
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={onOpenTailorBlueprint}
          className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs rounded-2xl shadow-md flex items-center justify-center gap-2 transition"
        >
          <FileText className="w-4 h-4" />
          <span>Tailor Blueprint & Stitching Guide (PDF)</span>
        </button>

        {['tote_bag', 'cushion_cover', 'pouch'].includes(design.productId || design.product?.id) && (
          <button
            type="button"
            onClick={onOpen3DSpike}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-2xl shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Box className="w-4 h-4" />
            <span>View in 3D</span>
          </button>
        )}

        <button
          type="button"
          onClick={onOpenCustomize}
          className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-2xl shadow-md flex items-center justify-center gap-2 transition"
        >
          <Edit3 className="w-4 h-4" />
          <span>{t.customizeBtn}</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onOpenFeasibility}
            className="py-3 bg-amber-400 hover:bg-amber-300 text-stone-900 font-extrabold text-xs rounded-2xl shadow-xs flex items-center justify-center gap-1.5 transition"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{t.checkFeasibilityBtn}</span>
          </button>

          <button
            type="button"
            onClick={onOpenSizeChoice}
            className="py-3 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs rounded-2xl shadow-xs flex items-center justify-center gap-1.5 transition"
          >
            <Maximize2 className="w-4 h-4" />
            <span>{t.changeSizeBtn}</span>
          </button>
        </div>
      </div>

      {/* AI Realistic Photo Preview Modal */}
      <AiPhotoPreviewModal
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
        design={effectiveDesign}
        layout={currentLayout}
        t={t}
      />
    </div>
  );
}
