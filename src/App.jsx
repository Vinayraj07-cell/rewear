import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import WalkthroughModal from './components/WalkthroughModal';
import HelpModal from './components/HelpModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import InstallModal from './components/InstallModal';
import LanguageScreen from './screens/LanguageScreen';
import HomeScreen from './screens/HomeScreen';
import AddPieceScreen from './screens/AddPieceScreen';
import FabricFeelScreen from './screens/FabricFeelScreen';
import MyPileScreen from './screens/MyPileScreen';
import StitchingGuidesScreen from './screens/StitchingGuidesScreen';
import WhatCanIMakeScreen from './screens/WhatCanIMakeScreen';
import DesignViewScreen from './screens/DesignViewScreen';
import CustomizeScreen from './screens/CustomizeScreen';
import SizeChoiceScreen from './screens/SizeChoiceScreen';
import FeasibilityScreen from './screens/FeasibilityScreen';
import TailorBlueprintScreen from './screens/TailorBlueprintScreen';
const Product3DViewer = lazy(() => import('./components/Product3DViewer'));
import ErrorBoundary from './components/ErrorBoundary';

import { translations } from './i18n/translations';
import { INITIAL_SAMPLE_PIECES, SAMPLE_PILE_A, SAMPLE_PILE_B } from './utils/storage';
import {
  SAMPLE_PILES,
  createScrapItem,
  duplicateScrapItem,
  deserializePile,
} from './utils/pileHelpers';
import { soundManager } from './utils/audio';
import { buildDesign } from './engine/index';
import { CONFIG } from './engine/config';
import { getTranslatedProductName, getTranslatedSizeLabel } from './utils/zoneHelper';
import { Smartphone, Monitor } from 'lucide-react';

export default function App() {
  // 1. Language state (defaults to language selector if unset)
  const [lang, setLang] = useState(() => localStorage.getItem('rewear_lang') || 'en');
  const [hasChosenLang, setHasChosenLang] = useState(() => Boolean(localStorage.getItem('rewear_lang_chosen')));
  const [showLangModal, setShowLangModal] = useState(false);

  // 2. Accessibility preferences
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [phoneFrame, setPhoneFrame] = useState(true);

  // 3. Modals
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [helpInfo, setHelpInfo] = useState(null); // { title, message }
  const [deleteCandidateId, setDeleteCandidateId] = useState(null);

  // Listen for native PWA install prompt
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // 4. Navigation Tab ('home', 'add', 'pile', 'tips', 'guides')
  const [activeTab, setActiveTab] = useState('home');

  // 5. Fabric Pieces State with Undo/Redo history
  const [pieces, setPieces] = useState(() => {
    const saved = localStorage.getItem('rewear_pieces');
    return deserializePile(saved, INITIAL_SAMPLE_PIECES);
  });

  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const [editingPiece, setEditingPiece] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [scrapSafetyMarginCm, setScrapSafetyMarginCm] = useState(() => {
    const saved = localStorage.getItem('rewear_scrap_safety_margin');
    return saved !== null ? Number(saved) : (CONFIG.SCRAP_SAFETY_MARGIN_CM || 0);
  });

  const t = translations[lang] || translations.en;

  // Persist scrap safety margin
  useEffect(() => {
    localStorage.setItem('rewear_scrap_safety_margin', String(scrapSafetyMarginCm));
  }, [scrapSafetyMarginCm]);

  // Persist pieces
  useEffect(() => {
    localStorage.setItem('rewear_pieces', JSON.stringify(pieces));
  }, [pieces]);

  // Persist language
  useEffect(() => {
    localStorage.setItem('rewear_lang', lang);
  }, [lang]);

  // Apply high contrast & large text classes
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    if (largeText) {
      document.body.classList.add('large-text');
    } else {
      document.body.classList.remove('large-text');
    }
  }, [largeText]);

  // Scroll to top when activeTab or selectedDesign changes so sticky header never overlaps top banners
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const mainEl = document.querySelector('main');
    if (mainEl) mainEl.scrollTop = 0;
  }, [activeTab, selectedDesign]);

  // Push new state to history for Undo
  const pushState = (newPieces) => {
    setHistory((prev) => [...prev, pieces]);
    setFuture([]);
    setPieces(newPieces);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setHistory((prev) => prev.slice(0, prev.length - 1));
    setFuture((prev) => [pieces, ...prev]);
    setPieces(previous);
  };

  const handleRedo = () => {
    if (future.length === 0) return;
    const next = future[0];
    setFuture((prev) => prev.slice(1));
    setHistory((prev) => [...prev, pieces]);
    setPieces(next);
  };

  // Add or Update piece
  const handleAddOrUpdatePiece = (piece, mode = 'add') => {
    if (mode === 'update') {
      const updated = pieces.map((p) => (p.id === piece.id ? piece : p));
      pushState(updated);
      setEditingPiece(null);
    } else {
      pushState([piece, ...pieces]);
    }
  };

  // Duplicate a piece
  const handleDuplicate = (pieceId) => {
    const existing = pieces.find((p) => p.id === pieceId);
    if (!existing) return;
    const duplicated = duplicateScrapItem(existing);
    pushState([duplicated, ...pieces]);
  };

  // Bulk add a scrap piece
  const handleBulkAdd = (scrapOptions) => {
    const newItem = createScrapItem(scrapOptions);
    pushState([newItem, ...pieces]);
    return newItem;
  };

  // Clear entire scrap pile
  const handleClearPile = () => {
    pushState([]);
  };

  // Toggle included in pile
  const handleToggleInclude = (pieceId) => {
    const updated = pieces.map((p) =>
      p.id === pieceId ? { ...p, included: !p.included } : p
    );
    pushState(updated);
  };

  // Delete piece
  const handleConfirmDelete = () => {
    if (!deleteCandidateId) return;
    const updated = pieces.filter((p) => p.id !== deleteCandidateId);
    pushState(updated);
    setDeleteCandidateId(null);
  };

  // Update piece feel
  const handleUpdatePieceFeel = (pieceId, updates) => {
    const updated = pieces.map((p) =>
      p.id === pieceId ? { ...p, ...updates } : p
    );
    pushState(updated);
  };

  // Load sample tailor pile (Neutral, Colourful, Mixed Fabrics, or legacy A/B)
  const handleLoadPile = (pileType) => {
    if (pileType === 'neutral' || pileType === 'B' || pileType === 'pileB') {
      pushState(SAMPLE_PILES.neutral.pieces);
    } else if (pileType === 'colourful' || pileType === 'colorful') {
      pushState(SAMPLE_PILES.colourful.pieces);
    } else if (pileType === 'mixed_fabrics' || pileType === 'mixed') {
      pushState(SAMPLE_PILES.mixed_fabrics.pieces);
    } else if (pileType === 'A' || pileType === 'pileA') {
      pushState(SAMPLE_PILE_A);
    } else if (SAMPLE_PILES[pileType]) {
      pushState(SAMPLE_PILES[pileType].pieces);
    } else {
      pushState(INITIAL_SAMPLE_PIECES);
    }
  };

  const handleLoadSampleData = () => {
    handleLoadPile('default');
  };

  // Expose global helper for automated testing and inspection
  useEffect(() => {
    window.__loadTailorPile = handleLoadPile;
    window.__clearPile = handleClearPile;
    window.__bulkAdd = handleBulkAdd;
    window.__buildDesign = buildDesign;
    window.__setScrapSafetyMargin = setScrapSafetyMarginCm;
    window.__setScreen = (tab, designData) => {
      if (designData) setSelectedDesign(designData);
      setActiveTab(tab);
    };
    return () => {
      delete window.__loadTailorPile;
      delete window.__clearPile;
      delete window.__bulkAdd;
      delete window.__buildDesign;
      delete window.__setScrapSafetyMargin;
      delete window.__setScreen;
    };
  }, [pieces, scrapSafetyMarginCm]);

  // Screen Title & Speech readout for header
  let screenTitle = t.home;
  let speakText = t.appTagline;
  let speakPhonetic = null;

  if (activeTab === 'home') {
    screenTitle = t.home;
    speakText = `${t.appName}. ${t.promise}. ${t.featuresTitle}`;
    if (lang === 'te') {
      speakPhonetic = "ReWear. Mee migilina battala mukkalanu chupinchandi. Emi kuttavacho, ela kanipisthundo, kolathalatho saha ela kuttalo memu chupisthamu.";
    } else if (lang === 'hi') {
      speakPhonetic = "ReWear. Apni bachi hui katranen dikhaiye. Hum batayenge kya banana hai, kaisa dikhega aur naap ke saath kaise silna hai.";
    }
  } else if (activeTab === 'add') {
    screenTitle = editingPiece ? t.editPieceTitle : t.addPieceTitle;
    speakText = `${screenTitle}. ${t.addPieceSub}`;
    if (lang === 'te') {
      speakPhonetic = "Batta mukkanu namodu cheyandi. Mukkala kolathalu centimeterlu leda angulaalalo namodu cheyandi.";
    } else if (lang === 'hi') {
      speakPhonetic = "Bachi hui katran jodein. Katran ki naap centimeter ya inch mein asani se bharein.";
    }
  } else if (activeTab === 'pile') {
    const includedCount = pieces.filter((p) => p.included).length;
    screenTitle = t.pileTitle;
    speakText = `${t.pileTitle}. ${t.pileSub}. ${includedCount} pieces in project.`;
    if (lang === 'te') {
      speakPhonetic = `Naa battala pogu. Mee mukkalu, motham vistheernam mariyu kuttu avakashalu ikkada chudandi. ${includedCount} mukkalu unnayi.`;
    } else if (lang === 'hi') {
      speakPhonetic = `Katranon ka dher. Apni katranon ki soochi, kul kapda aur darzi ke sujhaav dekhein. ${includedCount} tukde shamil hain.`;
    }
  } else if (activeTab === 'tips') {
    screenTitle = t.feelTitle;
    speakText = `${t.feelTitle}. ${t.feelSub}`;
    if (lang === 'te') {
      speakPhonetic = "Batta swabhaavam mariyu tailor salahaalu. Saraina kuttu chitkaala kosam ee naalugu prashnalaku samadhanam ivvandi.";
    } else if (lang === 'hi') {
      speakPhonetic = "Kapde ka ehsaas aur darzi salah. Sahi silai salah ke liye in chaar saral sawalon ke jawab dein.";
    }
  } else if (activeTab === 'guides') {
    screenTitle = t.feature5Title;
    speakText = `${t.feature5Title}. ${t.feature5Desc}`;
  } else if (activeTab === 'what_can_i_make') {
    screenTitle = t.whatCanIMakeTitle;
    speakText = `${t.whatCanIMakeTitle}. ${t.whatCanIMakeSub}`;
    if (lang === 'te') {
      speakPhonetic = "Emi tayaru cheyavachu. Mee deggarunna mukkalu kolathalatho saripoye tailor designlu.";
    } else if (lang === 'hi') {
      speakPhonetic = "Kya bana sakte hain. Aapki katranon ki naap ke anusaar banne wale behtareen design.";
    }
  } else if (activeTab === 'design_view') {
    if (selectedDesign) {
      const pName = getTranslatedProductName(selectedDesign.productId, selectedDesign.productName, t);
      const sLabel = getTranslatedSizeLabel(selectedDesign.sizeKey, selectedDesign.sizeLabel, t);
      screenTitle = `${pName} (${sLabel})`;
    } else {
      screenTitle = t.designViewTitle;
    }
    speakText = `${t.designViewTitle}. ${screenTitle}`;
  } else if (activeTab === 'customize') {
    screenTitle = t.customizeTitle;
    speakText = `${t.customizeTitle}. ${t.customizeSub}`;
  } else if (activeTab === 'size_choice') {
    screenTitle = t.sizeChoiceTitle;
    speakText = `${t.sizeChoiceTitle}. ${t.standardSizeNotice}`;
  } else if (activeTab === 'feasibility') {
    screenTitle = t.feasibilityTitle;
    speakText = selectedDesign?.fits ? t.feasibleYesTitle : t.feasibleNoTitle;
  } else if (activeTab === 'tailor_blueprint') {
    screenTitle = 'Tailor Blueprint';
    speakText = `Tailor Blueprint. ${selectedDesign ? selectedDesign.productName : ''}. Measurements to be verified by a tailor.`;
  } else if (activeTab === '3d_spike') {
    screenTitle = '3D Look';
    speakText = '3D Look. Illustrative preview, not exact fit.';
  }

  // Open context help
  const handleOpenHelp = (override = null) => {
    if (override && override.title) {
      setHelpInfo(override);
      return;
    }
    let msg = t.helpHome;
    if (activeTab === 'add') msg = t.helpAddPiece;
    else if (activeTab === 'pile') msg = t.helpPile;
    else if (activeTab === 'tips') msg = t.helpFeel;
    else if (activeTab === 'what_can_i_make') msg = t.helpWhatCanIMake;
    else if (activeTab === 'design_view') msg = t.helpDesignView;
    else if (activeTab === 'customize') msg = t.helpCustomize;
    else if (activeTab === 'size_choice') msg = t.helpSizeChoice;
    else if (activeTab === 'feasibility') msg = t.helpFeasibility;
    setHelpInfo({ title: t.helpTitle, message: msg });
  };

  // Language selection initial gate
  if (!hasChosenLang || showLangModal) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center p-2 sm:p-4">
        <div className="w-full max-w-md bg-stone-100 min-h-[640px] rounded-3xl shadow-2xl overflow-hidden border-4 border-stone-800">
          <LanguageScreen
            currentLang={lang}
            onSelectLang={(newLang) => setLang(newLang)}
            onContinue={() => {
              setHasChosenLang(true);
              localStorage.setItem('rewear_lang_chosen', 'true');
              setShowLangModal(false);
              // Open first-time walkthrough
              const seenTour = localStorage.getItem('rewear_seen_tour');
              if (!seenTour) {
                setShowWalkthrough(true);
                localStorage.setItem('rewear_seen_tour', 'true');
              }
            }}
            t={t}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-stone-900 flex flex-col items-center justify-start p-0 sm:p-4 transition-colors ${highContrast ? 'contrast-125' : ''}`}>
      {/* Top Device Simulation Switcher (For Pair-Programming / Review) */}
      <div className="hidden sm:flex items-center space-x-3 mb-3 bg-stone-800/90 text-stone-300 px-4 py-1.5 rounded-full border border-stone-700 text-xs shadow-md">
        <span className="font-semibold text-emerald-400">ReWear App Preview:</span>
        <button
          type="button"
          onClick={() => setPhoneFrame(true)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition ${
            phoneFrame ? 'bg-emerald-600 text-white font-bold' : 'hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile Device</span>
        </button>
        <button
          type="button"
          onClick={() => setPhoneFrame(false)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition ${
            !phoneFrame ? 'bg-emerald-600 text-white font-bold' : 'hover:text-white'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Responsive View</span>
        </button>
      </div>

      {/* Main Container / Mobile Device Frame */}
      <div
        className={`w-full bg-stone-100 min-h-screen relative flex flex-col shadow-2xl transition-all ${
          phoneFrame
            ? 'max-w-md sm:rounded-[40px] sm:border-[8px] sm:border-stone-800 sm:overflow-hidden sm:min-h-[760px] sm:max-h-[92vh] sm:overflow-y-auto'
            : 'max-w-xl rounded-2xl'
        }`}
      >
        {/* Header Bar */}
        <Header
          lang={lang}
          setLang={setLang}
          t={t}
          screenTitle={screenTitle}
          speakText={speakText}
          speakPhonetic={speakPhonetic}
          onOpenHelp={handleOpenHelp}
          onOpenLanguageModal={() => setShowLangModal(true)}
          onOpenInstallModal={() => setShowInstallModal(true)}
          canUndo={history.length > 0}
          canRedo={future.length > 0}
          onUndo={handleUndo}
          onRedo={handleRedo}
          highContrast={highContrast}
          setHighContrast={setHighContrast}
          largeText={largeText}
          setLargeText={setLargeText}
        />

        {/* Screen Content Body */}
        <main className="flex-1 p-4 pb-36 overflow-y-auto min-h-0">
          <ErrorBoundary onReset={() => setActiveTab('home')}>
          {activeTab === 'home' && (
            <HomeScreen
              onSelectFeature={(featureTab) => {
                setEditingPiece(null);
                setActiveTab(featureTab);
              }}
              t={t}
              pileCount={pieces.filter((p) => p.included).length}
              onLoadSampleData={handleLoadSampleData}
              onOpenWalkthrough={() => setShowWalkthrough(true)}
              onOpenInstallModal={() => setShowInstallModal(true)}
            />
          )}

          {activeTab === 'add' && (
            <AddPieceScreen
              onAddPiece={handleAddOrUpdatePiece}
              onContinueToPile={() => setActiveTab('pile')}
              t={t}
              editingPiece={editingPiece}
              onCancelEdit={() => {
                setEditingPiece(null);
                setActiveTab('pile');
              }}
            />
          )}

          {activeTab === 'pile' && (
            <MyPileScreen
              pieces={pieces}
              onToggleInclude={handleToggleInclude}
              onDeleteRequest={(id) => setDeleteCandidateId(id)}
              onDuplicate={handleDuplicate}
              onBulkAdd={handleBulkAdd}
              onClearPile={handleClearPile}
              onEditPiece={(piece) => {
                setEditingPiece(piece);
                setActiveTab('add');
              }}
              onAddNew={() => {
                setEditingPiece(null);
                setActiveTab('add');
              }}
              onWhatCanIMake={() => setActiveTab('what_can_i_make')}
              onLoadPile={handleLoadPile}
              scrapSafetyMarginCm={scrapSafetyMarginCm}
              onUpdateScrapSafetyMarginCm={setScrapSafetyMarginCm}
              t={t}
              lang={lang}
            />
          )}

          {activeTab === 'what_can_i_make' && (
            <WhatCanIMakeScreen
              pieces={pieces}
              scrapSafetyMarginCm={scrapSafetyMarginCm}
              onSelectDesign={(item) => {
                const activePile = pieces.filter((p) => p.included);
                const fullDesign = buildDesign(
                  activePile,
                  item.productId,
                  item.sizeKey,
                  item.style || 'patchwork',
                  { variant: item.variant || 'plain', scrapSafetyMarginCm }
                );
                setSelectedDesign(fullDesign.success ? fullDesign : item);
                setActiveTab('design_view');
              }}
              onCheckFeasibility={(item) => {
                const activePile = pieces.filter((p) => p.included);
                const fullDesign = buildDesign(
                  activePile,
                  item.productId,
                  item.sizeKey,
                  item.style || 'patchwork',
                  { variant: item.variant || 'plain', scrapSafetyMarginCm }
                );
                setSelectedDesign(fullDesign.success ? fullDesign : item);
                setActiveTab('feasibility');
              }}
              onAddMorePieces={() => setActiveTab('add')}
              onOpenHelp={handleOpenHelp}
              t={t}
              lang={lang}
            />
          )}

          {activeTab === 'design_view' && selectedDesign && (
            <DesignViewScreen
              design={selectedDesign}
              pile={pieces.filter((p) => p.included)}
              onBack={() => setActiveTab('what_can_i_make')}
              onOpenCustomize={() => setActiveTab('customize')}
              onOpenFeasibility={() => setActiveTab('feasibility')}
              onOpenSizeChoice={() => setActiveTab('size_choice')}
              onOpenTailorBlueprint={() => setActiveTab('tailor_blueprint')}
              onOpen3DSpike={() => setActiveTab('3d_spike')}
              onOpenHelp={handleOpenHelp}
              t={t}
              lang={lang}
            />
          )}

          {activeTab === '3d_spike' && (
            <Suspense
              fallback={
                <div className="flex flex-col items-center justify-center min-h-[360px] text-stone-400 gap-3">
                  <div className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs font-semibold">Loading 3D Look...</p>
                </div>
              }
            >
              <Product3DViewer
                design={selectedDesign}
                onBack={() => setActiveTab(selectedDesign ? 'design_view' : 'home')}
              />
            </Suspense>
          )}

          {activeTab === 'tailor_blueprint' && selectedDesign && (
            <TailorBlueprintScreen
              design={selectedDesign}
              onBack={() => setActiveTab('design_view')}
              t={t}
              lang={lang}
            />
          )}

          {activeTab === 'customize' && selectedDesign && (
            <CustomizeScreen
              initialDesign={selectedDesign}
              pile={pieces.filter((p) => p.included)}
              onSave={(updated) => {
                setSelectedDesign(updated);
                setActiveTab('design_view');
              }}
              onCancel={() => setActiveTab('design_view')}
              onOpenHelp={handleOpenHelp}
              t={t}
              lang={lang}
            />
          )}

          {activeTab === 'size_choice' && selectedDesign && (
            <SizeChoiceScreen
              productId={selectedDesign.productId}
              currentSizeKey={selectedDesign.sizeKey}
              variant={selectedDesign.variant || 'plain'}
              pile={pieces.filter((p) => p.included)}
              onSelectSize={(newSizeKey) => {
                const activePile = pieces.filter((p) => p.included);
                const updated = buildDesign(
                  activePile,
                  selectedDesign.productId,
                  newSizeKey,
                  selectedDesign.style || 'patchwork',
                  { variant: selectedDesign.variant || 'plain', scrapSafetyMarginCm }
                );
                setSelectedDesign(updated);
                setActiveTab('design_view');
              }}
              onBack={() => setActiveTab('design_view')}
              onOpenHelp={handleOpenHelp}
              t={t}
              lang={lang}
            />
          )}

          {activeTab === 'feasibility' && selectedDesign && (
            <FeasibilityScreen
              design={selectedDesign}
              pile={pieces.filter((p) => p.included)}
              onTrySmallerSize={() => setActiveTab('size_choice')}
              onTryPlainVariant={() => {
                const activePile = pieces.filter((p) => p.included);
                const updated = buildDesign(
                  activePile,
                  selectedDesign.productId,
                  selectedDesign.sizeKey,
                  selectedDesign.style || 'patchwork',
                  { variant: 'plain', scrapSafetyMarginCm }
                );
                setSelectedDesign(updated);
                setActiveTab('design_view');
              }}
              onSelectAlternative={(alt) => {
                const activePile = pieces.filter((p) => p.included);
                const fullDesign = buildDesign(
                  activePile,
                  alt.productId,
                  alt.sizeKey,
                  alt.style || 'patchwork',
                  { variant: alt.variant || 'plain', scrapSafetyMarginCm }
                );
                setSelectedDesign(fullDesign.success ? fullDesign : alt);
                setActiveTab('design_view');
              }}
              onPickAnotherProduct={() => setActiveTab('what_can_i_make')}
              onAddMoreFabric={() => setActiveTab('add')}
              onBack={() => setActiveTab(selectedDesign.fits ? 'design_view' : 'what_can_i_make')}
              onOpenHelp={handleOpenHelp}
              t={t}
              lang={lang}
            />
          )}

          {activeTab === 'tips' && (
            <FabricFeelScreen
              pieces={pieces.filter((p) => p.included)}
              onUpdatePieceFeel={handleUpdatePieceFeel}
              t={t}
              lang={lang}
            />
          )}

          {activeTab === 'guides' && (
            <StitchingGuidesScreen t={t} lang={lang} />
          )}
        </ErrorBoundary>
        </main>

        {/* Bottom Tab Navigation */}
        <BottomNav
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setEditingPiece(null);
            soundManager.stop();
            setActiveTab(tab);
          }}
          t={t}
          pileCount={pieces.filter((p) => p.included).length}
        />

        {/* Walkthrough Modal */}
        <WalkthroughModal
          isOpen={showWalkthrough}
          onClose={() => setShowWalkthrough(false)}
          t={t}
          lang={lang}
        />

        {/* Install on Mobile Modal */}
        <InstallModal
          isOpen={showInstallModal}
          onClose={() => setShowInstallModal(false)}
          deferredPrompt={deferredPrompt}
          t={t}
        />

        {/* Screen Help Modal */}
        <HelpModal
          isOpen={Boolean(helpInfo)}
          onClose={() => setHelpInfo(null)}
          title={helpInfo?.title}
          message={helpInfo?.message}
          t={t}
          lang={lang}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          isOpen={Boolean(deleteCandidateId)}
          onClose={() => setDeleteCandidateId(null)}
          onConfirm={handleConfirmDelete}
          t={t}
        />
      </div>
    </div>
  );
}
