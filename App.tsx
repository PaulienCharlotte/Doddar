import React, { useState, useCallback, useEffect, useRef } from 'react';
import type { AnalysisResponse, InitialAnalysisResponse, AnalysisContext } from './types';
import { getInitialAnalysis, getDetailedAnalysis, getRewriteSuggestion, getInitialAnalysisStream, getDetailedAnalysisStream } from './services/geminiService';
import { detectPersona } from './utils/persona';
import { PROFILE_DEFAULT_MINOR } from './data/ageProfiles';
import type { AgeProfile } from './data/ageProfiles';
import InputSection from './components/InputSection';
import QuickResult from './components/QuickResult';
import QuestionForm from './components/QuestionForm';
import ResultDisplay from './components/ResultDisplay';
import RecentCasesBanner from './components/RecentCasesBanner';
import MinorModal from './components/MinorModal';
import OverOns from './components/OverOns';
import Contact from './components/Contact';
import Home from './components/Home';
import Diensten from './components/Diensten';
import Klachtenregeling from './components/Klachtenregeling';
import Privacyverklaring from './components/Privacyverklaring';
import AlgemeneVoorwaarden from './components/AlgemeneVoorwaarden';
import Kennisbank from './components/Kennisbank';
import Disclaimer from './components/Disclaimer';
import Footer from './components/Footer';
import Tooltip from './components/Tooltip';
import { InfoIcon } from './components/icons/InfoIcon';
import { WarningIcon } from './components/icons/WarningIcon';
import { CheckIcon } from './components/icons/CheckIcon';
import { MenuIcon } from './components/icons/MenuIcon';
import { XIcon } from './components/icons/XIcon';
import { ShieldIcon } from './components/icons/ShieldIcon';

type AppStep = 'start' | 'services' | 'questions' | 'result' | 'about' | 'contact' | 'complaints' | 'privacy' | 'terms' | 'knowledge' | 'disclaimer';

interface CaseData {
  description: string;
}

const BevoegdheidscheckModal: React.FC<{
  onClose: () => void;
  onConfirm: () => void;
  onRedirect: () => void;
  onStayPrivate: () => void;
}> = ({ onClose, onConfirm, onRedirect, onStayPrivate }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.currentTarget === event.target) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="bg-transparent p-0 m-0 w-full h-full max-w-none max-h-none flex items-center justify-center backdrop:bg-[#0F1D19]/75 backdrop:backdrop-blur-md animate-fade-in"
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-[95%] max-w-2xl overflow-hidden border border-[#B8E2D1]/30 flex flex-col transform transition-all">
        {/* Header met Icoon */}
        <div className="bg-[#F2F9F6] p-8 md:p-12 border-b border-[#E5E7EB] flex items-start gap-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm text-[#58B895] border border-[#E5E7EB]">
            <ShieldIcon className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#13261f] leading-tight">Beveiligde Context</h2>
            <p className="text-[#58B895] font-bold text-xs uppercase tracking-widest mt-2 bg-white inline-block px-2 py-0.5 rounded border border-[#58B895]/20">Mandaat & Juridische Toetsing</p>
          </div>
        </div>

        <div className="p-8 md:p-12 space-y-8">
          <p className="text-lg md:text-xl text-[#374151] leading-relaxed">
            Wij detecteren terminologie die vaak voorkomt in zakelijke casussen. Voor formeel onderzoek is een <strong className="text-[#13261f]">mandaat</strong> vereist.
          </p>

          <div className="bg-[#F9FCFA] border border-[#E5E7EB] rounded-[1.5rem] p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1.5 rounded-lg border border-[#E5E7EB] shadow-sm">
                <InfoIcon className="w-5 h-5 text-[#58B895]" />
              </div>
              <span className="font-bold text-[#13261f] text-base">Wat betekent dit voor u?</span>
            </div>
            <p className="text-sm md:text-base text-[#6B7280] leading-relaxed">
              Als u een privépersoon bent zonder zakelijk mandaat (bijv. een bezorgde burger of collega), adviseren wij de analyse uit te voeren vanuit een persoonlijk veiligheidsperspectief.
            </p>
          </div>
        </div>

        <div className="px-8 md:px-12 pb-12 flex flex-col gap-4">
          <button
            className="w-full py-5 bg-[#13261f] hover:bg-[#1c352b] text-white font-bold rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 group active:scale-[0.98]"
            onClick={onConfirm}
          >
            <CheckIcon className="w-5 h-5 text-[#58B895]" />
            <span>Ja, ik heb een zakelijk mandaat</span>
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              className="py-5 bg-white border-2 border-[#58B895] text-[#13261f] hover:bg-[#F2F9F6] font-bold rounded-2xl transition-all text-sm flex flex-col items-center justify-center shadow-sm active:scale-[0.98] leading-tight"
              onClick={onRedirect}
            >
              <span>Nee, dit is privé</span>
              <span className="text-[10px] uppercase tracking-widest opacity-60 font-normal mt-1">(Optimaliseer mijn tekst)</span>
            </button>
            <button
              className="py-5 bg-white border border-[#D1D5DB] text-[#6B7280] hover:bg-gray-50 font-bold rounded-2xl transition-all text-sm flex flex-col items-center justify-center shadow-sm active:scale-[0.98] leading-tight"
              onClick={onStayPrivate}
            >
              <span>Nee, de casus is privé</span>
              <span className="text-[10px] uppercase tracking-widest opacity-60 font-normal mt-1">(Behoud mijn tekst)</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors mt-4 text-center underline decoration-gray-200 underline-offset-4"
          >
            Annuleren en terug naar invoer
          </button>
        </div>
      </div>
    </dialog>
  );
};

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('start');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [streamedText, setStreamedText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const [caseText, setCaseText] = useState<string>('');
  const [quickResult, setQuickResult] = useState<InitialAnalysisResponse | null>(null);
  const [finalResult, setFinalResult] = useState<AnalysisResponse | null>(null);
  const [showMinorModal, setShowMinorModal] = useState<AgeProfile | null>(null);

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [caseForAnalysis, setCaseForAnalysis] = useState<CaseData | null>(null);

  const [rewriteSuggestion, setRewriteSuggestion] = useState<string | null>(null);
  const [isRewriting, setIsRewriting] = useState<boolean>(false);
  const [personaOverride, setPersonaOverride] = useState<'private' | 'business' | null>(null);

  const [questionAnswers, setQuestionAnswers] = useState<Record<string, any>>({});
  const [kennisCategory, setKennisCategory] = useState<string | undefined>(undefined);
  const [analysisContext, setAnalysisContext] = useState<AnalysisContext | null>(null);
  const [autoScrollToInput, setAutoScrollToInput] = useState<boolean>(false);
  const [serviceScrollId, setServiceScrollId] = useState<string | undefined>(undefined);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const startAnalysis = useCallback(async (description: string, persona: 'business' | 'private') => {
    setIsLoading(true);
    setError(null);
    setCaseText(description); // Zorg dat de globale state de tekst bevat die geanalyseerd wordt
    setStreamedText('Eerste analyse uitvoeren...');
    setStep('questions');
    try {
      let fullJson = '';
      const stream = getInitialAnalysisStream(description, persona);
      for await (const chunkText of stream) {
        if (chunkText) {
          fullJson += chunkText;
          setStreamedText(prev => prev.length > 35 ? 'Patronen herkennen...' : prev + '.');
        }
      }

      if (!fullJson) throw new Error("Geen data ontvangen");

      const result = JSON.parse(fullJson) as InitialAnalysisResponse;
      setQuickResult(result);
      setQuestionAnswers({});
    } catch (e: any) {
      console.error("Analysis Error:", e);
      if (e.message && (e.message.includes("GEMINI_API_KEY") || e.message.includes("API_KEY"))) {
        setError("Systeemfout: GEMINI_API_KEY ontbreekt in implementatie. Voeg deze toe in Netlify.");
      } else {
        setError("Er is een fout opgetreden bij de eerste analyse. Probeer het opnieuw.");
      }
      setStep('start');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInitialSubmit = useCallback(async (description: string) => {
    setError(null);
    setCaseText(description);
    setQuickResult(null);
    setRewriteSuggestion(null);

    // Als de gebruiker expliciet heeft gekozen voor privé via de modal, gebruik die override
    const persona = personaOverride || detectPersona(description);

    if (persona === 'business' && !personaOverride) {
      setCaseForAnalysis({ description });
      setShowAuthModal(true);
    } else {
      await startAnalysis(description, (personaOverride as 'private' | 'business') || 'private');
    }
  }, [startAnalysis, personaOverride]);

  const handleAuthConfirm = useCallback(() => {
    const description = caseForAnalysis?.description || caseText;
    setShowAuthModal(false);
    setCaseForAnalysis(null);
    setPersonaOverride('business');
    if (description) startAnalysis(description, 'business');
  }, [caseForAnalysis, caseText, startAnalysis]);

  const handleAuthRedirect = useCallback(async () => {
    const description = caseForAnalysis?.description || caseText;
    if (!description) {
      setShowAuthModal(false);
      return;
    }

    setPersonaOverride('private');
    setShowAuthModal(false);
    setCaseForAnalysis(null);
    setIsRewriting(true);
    setError(null);
    try {
      const suggestion = await getRewriteSuggestion(description);
      setRewriteSuggestion(suggestion);
    } catch (e) {
      setError("Kon de tekst niet herschrijven.");
    } finally {
      setIsRewriting(false);
    }
  }, [caseForAnalysis, caseText]);

  const handleAuthStayPrivate = useCallback(() => {
    const description = caseForAnalysis?.description || caseText;
    setShowAuthModal(false);
    setCaseForAnalysis(null);
    setPersonaOverride('private');
    if (description) {
      startAnalysis(description, 'private');
    }
  }, [caseForAnalysis, caseText, startAnalysis]);

  const handleQuestionSubmit = useCallback(async (answers: Record<string, string>) => {
    setIsLoading(true);
    setError(null);
    setFinalResult(null);
    setStreamedText('Diepere redenering uitvoeren...');

    try {
      let fullJson = '';
      const stream = getDetailedAnalysisStream(caseText, answers);
      for await (const chunkText of stream) {
        if (chunkText) {
          fullJson += chunkText;
          setStreamedText(prev => prev.length > 40 ? 'Wetenschappelijke kaders toetsen...' : prev + '.');
        }
      }

      if (!fullJson) throw new Error("Geen data ontvangen");
      const result = JSON.parse(fullJson) as AnalysisResponse;
      setFinalResult(result);
      setStep('result');
    } catch (e: any) {
      console.error("Detailed Analysis Error:", e);
      if (e.message && (e.message.includes("GEMINI_API_KEY") || e.message.includes("API_KEY"))) {
        setError("Systeemfout: GEMINI_API_KEY ontbreekt. Kan diepere analyse niet uitvoeren.");
      } else {
        setError(`De analyse kon niet worden voltooid.`);
      }
      setStep('questions');
    } finally {
      setIsLoading(false);
    }
  }, [caseText]);

  // handleNavClick is used throughout the app for navigation and state resets.
  const handleNavClick = useCallback((targetStep: AppStep, extraParam?: string) => {
    setStep(targetStep);
    setIsMobileMenuOpen(false);

    if (targetStep === 'knowledge') {
      setKennisCategory(extraParam);
    } else {
      // Clear category if not going to knowledge bank explicitly with a category
      setKennisCategory(undefined);
    }

    if (targetStep === 'services') {
      setServiceScrollId(extraParam);
    } else {
      setServiceScrollId(undefined);
    }

    // Reset analysis context if we are navigating anywhere else other than the contact page after an analysis.
    if (targetStep !== 'contact') {
      setAnalysisContext(null);
    }
  }, []);

  const renderContent = () => {
    if (isLoading && step !== 'start') {
      return (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl shadow-xl border border-brand-accent min-h-[60vh] flex-grow mt-8 mx-4 animate-pulse">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand-primary mb-8"></div>
          <p className="text-xl font-bold text-brand-secondary typing-cursor">{streamedText || 'Data verwerken'}</p>
          <p className="mt-4 text-brand-subtle text-center max-w-md">Onze AI gebruikt op dit moment deep reasoning om patronen te toetsen aan wetgeving en wetenschap.</p>
        </div>
      );
    }

    switch (step) {
      case 'start':
        return (
          <Home
            onAnalyze={handleInitialSubmit}
            onMinorHelp={() => setShowMinorModal(PROFILE_DEFAULT_MINOR)}
            isLoading={isLoading && !isRewriting}
            text={caseText}
            onTextChange={setCaseText}
            isRewriting={isRewriting}
            rewriteSuggestion={rewriteSuggestion}
            onAcceptSuggestion={() => { setCaseText(rewriteSuggestion!); setRewriteSuggestion(null); }}
            onDismissSuggestion={() => setRewriteSuggestion(null)}
            onOpenComplaints={() => handleNavClick('complaints')}
            onOpenPrivacy={() => handleNavClick('privacy')}
            onOpenTerms={() => handleNavClick('terms')}
            onOpenKnowledge={(cat) => handleNavClick('knowledge', cat)}
            onOpenDisclaimer={() => handleNavClick('disclaimer')}
            onOpenContact={() => handleNavClick('contact')}
            onOpenService={(id) => handleNavClick('services', id)}
            scrollToInput={autoScrollToInput}
            onScrollComplete={() => setAutoScrollToInput(false)}
          />
        );
      case 'services':
        return <Diensten onStartAnalysis={() => { setStep('start'); setAutoScrollToInput(true); }} onContact={() => handleNavClick('contact')} scrollToId={serviceScrollId} />;
      case 'questions':
        if (quickResult) {
          return (
            <div className="space-y-6 w-full max-w-4xl mx-auto px-4 py-10 flex-grow">
              <QuickResult patterns={quickResult.gedragspatronen} />
              <QuestionForm vragen={quickResult.verduidelijkingsvragen} minAnswersRequired={3} onSubmit={handleQuestionSubmit} answers={questionAnswers} onAnswersChange={setQuestionAnswers} />
            </div>
          );
        }
        return null;
      case 'result':
        return finalResult ? <div className="w-full px-4 py-10 flex-grow"><ResultDisplay result={finalResult} onReset={() => { setStep('start'); setAutoScrollToInput(true); setPersonaOverride(null); setCaseText(''); }} onRequestIntake={(ctx) => { setAnalysisContext(ctx); setStep('contact'); }} /></div> : null;
      case 'about':
        return <OverOns onStartAnalysis={() => { setStep('start'); setAutoScrollToInput(true); }} />;
      case 'contact':
        return <Contact initialContext={analysisContext} onOpenComplaints={() => handleNavClick('complaints')} onOpenPrivacy={() => handleNavClick('privacy')} onOpenTerms={() => handleNavClick('terms')} onOpenKnowledge={(cat) => handleNavClick('knowledge', cat)} onOpenDisclaimer={() => handleNavClick('disclaimer')} />;
      case 'complaints': return <Klachtenregeling onBack={() => setStep('start')} />;
      case 'privacy': return <Privacyverklaring onBack={() => setStep('start')} />;
      case 'terms': return <AlgemeneVoorwaarden onBack={() => setStep('start')} />;
      case 'knowledge': return <Kennisbank initialCategory={kennisCategory} />;
      case 'disclaimer': return <Disclaimer onBack={() => setStep('start')} />;
      default: return null;
    }
  };

  const navItems = [
    { id: 'services', label: 'Diensten' },
    { id: 'about', label: 'Over Ons' },
    { id: 'knowledge', label: 'Kennisbank' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-page-bg flex flex-col font-sans">
      <nav className="sticky top-0 md:top-4 z-50 mx-0 md:mx-4 max-w-7xl xl:mx-auto w-full md:w-[calc(100%-2rem)] bg-black/95 backdrop-blur-md rounded-none md:rounded-2xl border-b md:border border-white/10 shadow-2xl transition-all duration-300">
        <div className="px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => handleNavClick('start')}>
              <img src="/images/logokleinnight.svg" alt="Doddar" className="h-8 md:h-10 w-auto" />
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id as AppStep)}
                  className={`text-sm font-medium transition-colors ${step === item.id ? 'text-brand-primary' : 'text-gray-300 hover:text-white'}`}
                >
                  {item.label}
                </button>
              ))}
              <button onClick={() => { setStep('start'); setAutoScrollToInput(true); }} className="ml-4 px-5 py-2.5 rounded-xl bg-white text-black font-bold hover:bg-[#58B895] hover:text-white transition-all text-sm">Nieuwe Analyse</button>
            </div>
            <div className="flex md:hidden items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2 rounded-md hover:bg-white/10 focus:outline-none">{isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}</button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full mt-2 bg-black border border-white/10 rounded-2xl shadow-xl animate-fade-in overflow-hidden">
            <div className="px-4 pt-4 pb-4 space-y-1">
              <button onClick={() => { setStep('start'); setAutoScrollToInput(true); setIsMobileMenuOpen(false); }} className="block w-full text-left px-4 py-3 rounded-xl text-base font-bold text-black bg-white hover:bg-gray-200 mb-2">Nieuwe Analyse</button>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id as AppStep)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium ${step === item.id ? 'text-brand-primary bg-white/5' : 'text-gray-300 hover:bg-white/5'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
      <main className="flex-grow flex flex-col">{renderContent()}</main>
      <Footer onNavigate={handleNavClick} onOpenComplaints={() => handleNavClick('complaints')} onOpenPrivacy={() => handleNavClick('privacy')} onOpenTerms={() => handleNavClick('terms')} onOpenKnowledge={(cat) => handleNavClick('knowledge', cat)} onOpenDisclaimer={() => handleNavClick('disclaimer')} />
      {showMinorModal && <MinorModal uiPayload={showMinorModal} onClose={() => setShowMinorModal(null)} onWithAdult={() => setShowMinorModal(null)} />}
      {showAuthModal && <BevoegdheidscheckModal onClose={() => { setShowAuthModal(false); setCaseForAnalysis(null); }} onConfirm={handleAuthConfirm} onRedirect={handleAuthRedirect} onStayPrivate={handleAuthStayPrivate} />}
      {error && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] animate-fade-in w-full max-w-md px-4">
          <div className="bg-status-danger text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20">
            <WarningIcon className="w-6 h-6 flex-shrink-0" />
            <span className="font-bold text-sm md:text-base">{error}</span>
            <button onClick={() => setError(null)} className="ml-auto hover:opacity-70 p-1"><XIcon className="w-5 h-5" /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;