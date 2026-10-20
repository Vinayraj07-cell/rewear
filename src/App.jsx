import React, { useState, useEffect } from 'react';
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

import { translations } from './i18n/translations';
import { INITIAL_SAMPLE_PIECES } from './utils/storage';
import { soundManager } from './utils/audio';
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
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_SAMPLE_PIECES;
      }
    }
    return INITIAL_SAMPLE_PIECES;
  });

  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const [editingPiece, setEditingPiece] = useState(null);

  const t = translations[lang] || translations.en;

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
    const duplicated = {
      ...existing,
      id: `scrap-${Date.now()}`,
      addedAt: Date.now(),
    };
    pushState([duplicated, ...pieces]);
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

  // Load sample tailor pile
  const handleLoadSampleData = () => {
    pushState(INITIAL_SAMPLE_PIECES);
  };

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
  }

  // Open context help
  const handleOpenHelp = () => {
    let msg = t.helpHome;
    if (activeTab === 'add') msg = t.helpAddPiece;
    else if (activeTab === 'pile') msg = t.helpPile;
    else if (activeTab === 'tips') msg = t.helpFeel;
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
        <main className="flex-1 p-4 overflow-y-auto">
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
              onEditPiece={(piece) => {
                setEditingPiece(piece);
                setActiveTab('add');
              }}
              onAddNew={() => {
                setEditingPiece(null);
                setActiveTab('add');
              }}
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
