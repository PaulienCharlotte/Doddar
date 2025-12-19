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

type AppStep = 'start' | 'services' | 'questions' | 'result' | 'about' | 'contact' | 'complaints' | 'privacy' | 'terms' | 'knowledge' | 'disclaimer';

interface CaseData {
  description: string;
}

const BevoegdheidscheckModal: React.FC<{
  onClose: () => void;
  onConfirm: () => void;
  onRedirect: () => void;
}> = ({ onClose, onConfirm, onRedirect }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      if (dialogRef.current?.open) dialogRef.current.close();
    };
  }, []);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.currentTarget === event.target) onClose();
  };

  return (
    <dialog ref={dialogRef} className="auth-modal" onClose={onClose} onClick={handleBackdropClick}>
      <div className="auth-modal-content">
        <h2>Zakelijke Context & Mandaat</h2>
        <p>Wij detecteren zakelijke terminologie in uw casus. Voor een formeel bedrijfsrechercheonderzoek is een <strong>mandaat</strong> (bevoegdheid) vereist.</p>
        <p className="auth-modal-info">
          Heeft u geen mandaat (bijv. omdat u een bezorgde collega of privépersoon bent)? Dan herschrijven wij de analyse naar een <strong>persoonlijk veiligheidsperspectief</strong>.
        </p>
        <div className="auth-modal-info flex items-center gap-3">
          <Tooltip content="Een formeel mandaat betekent dat u door uw organisatie bent aangewezen of gemachtigd bent om (juridische of interne) onderzoeken te initiëren. Binnen bedrijven zijn bevoegd: directieleden, HR-managers, juridisch adviseurs, of compliance officers.">
            <InfoIcon className="w-6 h-6 text-brand-secondary flex-shrink-0" />
          </Tooltip>
          <span>Wat houdt een mandaat in?</span>
        </div>
      </div>
      <div className="auth-modal-footer flex-col sm:flex-row">
        <button className="btn-outline text-sm" onClick={onRedirect}>❌ Nee, dit is privé (Herschrijven)</button>
        <button className="btn-primary text-sm" onClick={onConfirm}>✅ Ja, ik heb mandaat</button>
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
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [showMinorModal, setShowMinorModal] = useState<AgeProfile | null>(null);

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [caseForAnalysis, setCaseForAnalysis] = useState<CaseData | null>(null);

  const [rewriteSuggestion, setRewriteSuggestion] = useState<string | null>(null);
  const [isRewriting, setIsRewriting] = useState<boolean>(false);
  const [personaOverride, setPersonaOverride] = useState<'private' | null>(null);

  const [questionAnswers, setQuestionAnswers] = useState<Record<string, any>>({});
  const [kennisCategory, setKennisCategory] = useState<string | undefined>(undefined);
  const [analysisContext, setAnalysisContext] = useState<AnalysisContext | null>(null);
  const [autoScrollToInput, setAutoScrollToInput] = useState<boolean>(false);
  const [serviceScrollId, setServiceScrollId] = useState<string | undefined>(undefined);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleNavClick = (targetStep: AppStep, category?: string) => {
    setIsMobileMenuOpen(false);
    if (targetStep === 'knowledge' && category) {
      setKennisCategory(category);
    } else {
      setKennisCategory(undefined);
    }
    if (targetStep === 'services' && category) {
      setServiceScrollId(category);
    } else {
      setServiceScrollId(undefined);
    }
    if (targetStep !== 'contact') {
      setAnalysisContext(null);
    }
    setStep(targetStep);
  };

  const startAnalysis = useCallback(async (description: string, persona: 'business' | 'private') => {
    setIsLoading(true);
    setStreamedText('');
    setStep('questions');
    try {
      let fullJson = '';
      const stream = getInitialAnalysisStream(description, persona);
      for await (const chunk of stream) {
        fullJson += chunk;
        setStreamedText(prev => prev + '.');
      }
      const result = JSON.parse(fullJson) as InitialAnalysisResponse;
      setQuickResult(result);
      setQuestionAnswers({});
    } catch (e) {
      console.error(e);
      setError("Er is een fout opgetreden bij de eerste analyse. Probeer het opnieuw.");
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

    const persona = personaOverride || detectPersona(description);

    if (persona === 'business') {
      setCaseForAnalysis({ description });
      setShowAuthModal(true);
    } else {
      if (personaOverride) setPersonaOverride(null);
      await startAnalysis(description, 'private');
    }
  }, [startAnalysis, personaOverride]);

  const handleAuthConfirm = useCallback(() => {
    setShowAuthModal(false);
    if (caseForAnalysis) startAnalysis(caseForAnalysis.description, 'business');
    setCaseForAnalysis(null);
  }, [caseForAnalysis, startAnalysis]);

  const handleAuthRedirect = useCallback(async () => {
    if (!caseForAnalysis) return;
    setPersonaOverride('private');
    setShowAuthModal(false);
    setIsRewriting(true);
    setCaseText(caseForAnalysis.description);
    setError(null);
    try {
      const suggestion = await getRewriteSuggestion(caseForAnalysis.description);
      setRewriteSuggestion(suggestion);
    } catch (e) {
      setError("Kon de tekst niet herschrijven.");
    } finally {
      setIsRewriting(false);
      setCaseForAnalysis(null);
    }
  }, [caseForAnalysis]);

  const handleQuestionSubmit = useCallback(async (answers: Record<string, string>) => {
    setIsLoading(true);
    setError(null);
    setFinalResult(null);
    setStreamedText('Diepere redenering uitvoeren...');

    try {
      let fullJson = '';
      const stream = getDetailedAnalysisStream(caseText, answers);
      for await (const chunk of stream) {
        fullJson += chunk;
        setStreamedText(prev => prev + '.');
      }
      const result = JSON.parse(fullJson) as AnalysisResponse;
      setFinalResult(result);
      setStep('result');
    } catch (e) {
      setError(`De analyse kon niet worden voltooid.`);
      setStep('questions');
    } finally {
      setIsLoading(false);
    }
  }, [caseText]);

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
        return finalResult ? <div className="w-full px-4 py-10 flex-grow"><ResultDisplay result={finalResult} onReset={() => { setStep('start'); setAutoScrollToInput(true); }} onRequestIntake={(ctx) => { setAnalysisContext(ctx); setStep('contact'); }} /></div> : null;
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
      <nav className="sticky top-4 z-50 mx-4 max-w-7xl xl:mx-auto w-[calc(100%-2rem)] bg-black/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
        <div className="px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => handleNavClick('start')}>
              <img src="/images/logo_doddar.png" alt="Doddar" className="h-10 w-auto" />
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
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id as AppStep)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium ${step === item.id ? 'text-brand-primary bg-white/5' : 'text-gray-300 hover:bg-white/5'}`}
                >
                  {item.label}
                </button>
              ))}
              <button onClick={() => { setStep('start'); setAutoScrollToInput(true); setIsMobileMenuOpen(false); }} className="block w-full text-left px-4 py-3 rounded-xl text-base font-bold text-black bg-white hover:bg-gray-200 mt-2">Nieuwe Analyse</button>
            </div>
          </div>
        )}
      </nav>
      <main className="flex-grow flex flex-col">{renderContent()}</main>
      <Footer onNavigate={handleNavClick} onOpenComplaints={() => handleNavClick('complaints')} onOpenPrivacy={() => handleNavClick('privacy')} onOpenTerms={() => handleNavClick('terms')} onOpenKnowledge={(cat) => handleNavClick('knowledge', cat)} onOpenDisclaimer={() => handleNavClick('disclaimer')} />
      {showMinorModal && <MinorModal uiPayload={showMinorModal} onClose={() => setShowMinorModal(null)} onWithAdult={() => setShowMinorModal(null)} />}
      {showAuthModal && <BevoegdheidscheckModal onClose={() => { setShowAuthModal(false); setCaseForAnalysis(null); }} onConfirm={handleAuthConfirm} onRedirect={handleAuthRedirect} />}
    </div>
  );
};

export default App;