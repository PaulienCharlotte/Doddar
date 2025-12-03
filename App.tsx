import React, { useState, useCallback, useEffect, useRef } from 'react';
import type { AnalysisResponse, InitialAnalysisResponse } from './types';
import { getInitialAnalysis, getDetailedAnalysis, getRewriteSuggestion } from './services/geminiService';
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
import Home from './components/Home';
import Tooltip from './components/Tooltip';
import { InfoIcon } from './components/icons/InfoIcon';
import { WarningIcon } from './components/icons/WarningIcon';
import { CheckIcon } from './components/icons/CheckIcon';
import { MenuIcon } from './components/icons/MenuIcon';
import { XIcon } from './components/icons/XIcon';
import { DoddarLogo } from './components/icons/DoddarLogo';

type AppStep = 'start' | 'questions' | 'result' | 'about';

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
        <h2>Bevoegdheidscheck</h2>
        <p>Heeft u binnen uw organisatie een formeel mandaat of beleid om een particulier onderzoek te starten?</p>
        <p className="auth-modal-info">
          ⚖️ Zo ja, bevestig hieronder dat u bevoegd bent om deze melding in te dienen.
        </p>
        <div className="auth-modal-info flex items-center gap-3">
          <Tooltip content="Een formeel mandaat betekent dat u door uw organisatie bent aangewezen of gemachtigd bent om (juridische of interne) onderzoeken te initiëren. Dit voorkomt schending van privacywetgeving. Binnen bedrijven zijn bevoegd: directieleden, HR-managers, juridisch adviseurs, of compliance officers.">
             <InfoIcon className="w-6 h-6 text-brand-secondary flex-shrink-0" />
          </Tooltip>
          <span>Klik op het informatie-icoon voor uitleg.</span>
        </div>
      </div>
      <div className="auth-modal-footer">
        <button className="btn-outline" onClick={onRedirect}>❌ Nee, ik voel mij privé onveilig</button>
        <button className="btn-primary" onClick={onConfirm}>✅ Ja, ik heb mandaat</button>
      </div>
    </dialog>
  );
};

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('start');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  
  const [caseText, setCaseText] = useState<string>('');
  const [quickResult, setQuickResult] = useState<InitialAnalysisResponse | null>(null);
  const [finalResult, setFinalResult] = useState<AnalysisResponse | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [showMinorModal, setShowMinorModal] = useState<AgeProfile | null>(null);

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [caseForAnalysis, setCaseForAnalysis] = useState<CaseData | null>(null);
  
  // State for rewrite suggestion feature
  const [rewriteSuggestion, setRewriteSuggestion] = useState<string | null>(null);
  const [isRewriting, setIsRewriting] = useState<boolean>(false);
  const [personaOverride, setPersonaOverride] = useState<'private' | null>(null);
  
  // State for question form answers
  const [questionAnswers, setQuestionAnswers] = useState<Record<string, any>>({});


  useEffect(() => {
    const evaluateAuthority = () => {
      const isBusiness = (window as any).doddar_is_business === true;
      const role = ((window as any).doddar_role || '').toLowerCase();
      const mandate = (window as any).doddar_mandate_confirmed === true;
      const authorized = isBusiness && ['owner','director','hr'].includes(role) && mandate;
      setIsAuthorized(authorized);
    };
    
    evaluateAuthority();
    window.addEventListener('doddar:authority:update', evaluateAuthority);
    
    return () => {
      window.removeEventListener('doddar:authority:update', evaluateAuthority);
    };
  }, []);

  const handleNavClick = (targetStep: AppStep | 'contact') => {
    setIsMobileMenuOpen(false); // Close menu on click
    if (targetStep === 'contact') {
        alert("Neem contact op via info@doddar.nl");
    } else {
        setStep(targetStep);
    }
  };

  const startAnalysis = useCallback(async (description: string, persona: 'business' | 'private') => {
    setIsLoading(true);
    try {
      const result = await getInitialAnalysis(description, persona);
      setQuickResult(result);
      setQuestionAnswers({}); // Reset answers for new questions
      setStep('questions');
    } catch (e) {
      console.error(e);
      setError("Er is een fout opgetreden bij de eerste analyse. Probeer het opnieuw of start een nieuwe analyse.");
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
      if (personaOverride) {
        setPersonaOverride(null);
      }
      await startAnalysis(description, 'private');
    }
  }, [startAnalysis, personaOverride]);

  const handleMinorHelpClick = () => {
    setShowMinorModal(PROFILE_DEFAULT_MINOR);
  };

  const handleAuthConfirm = useCallback(() => {
    setShowAuthModal(false);
    if (caseForAnalysis) {
      startAnalysis(caseForAnalysis.description, 'business');
    }
    setCaseForAnalysis(null);
  }, [caseForAnalysis, startAnalysis]);
  
  const handleAuthRedirect = useCallback(async () => {
    if (!caseForAnalysis) return;

    setPersonaOverride('private');
    setShowAuthModal(false);
    setIsRewriting(true);
    setCaseText(caseForAnalysis.description); // Keep original text
    setError(null);

    try {
        const suggestion = await getRewriteSuggestion(caseForAnalysis.description);
        setRewriteSuggestion(suggestion);
    } catch (e) {
        console.error("Rewrite failed", e);
        setError("Kon de tekst niet herschrijven. U kunt de oorspronkelijke tekst zelf aanpassen.");
        setRewriteSuggestion(null);
    } finally {
        setIsRewriting(false);
        setCaseForAnalysis(null);
    }
  }, [caseForAnalysis]);

  const handleAcceptSuggestion = () => {
    if (rewriteSuggestion) {
      setCaseText(rewriteSuggestion);
      setRewriteSuggestion(null);
    }
  };

  const handleDismissSuggestion = () => {
    setRewriteSuggestion(null);
  };

  const handleQuestionSubmit = useCallback(async (answers: Record<string, string>) => {
    setIsLoading(true);
    setError(null);
    setFinalResult(null);

    try {
      const result = await getDetailedAnalysis(caseText, answers);
      setFinalResult(result);
      setStep('result');
    } catch (e) {
      console.error(e);
      const specificError = e instanceof Error ? e.message : 'Controleer de console voor details.';
      setError(`De analyse kon niet worden voltooid. ${specificError} Pas eventueel uw antwoorden aan en probeer het opnieuw.`);
      setStep('questions');
    } finally {
      setIsLoading(false);
    }
  }, [caseText]);
  
  const handleReset = () => {
    setStep('start');
    setQuickResult(null);
    setFinalResult(null);
    setCaseText('');
    setError(null);
    setRewriteSuggestion(null);
    setIsRewriting(false);
    setPersonaOverride(null);
    setQuestionAnswers({});
    setIsMobileMenuOpen(false);
  };
  
  const renderContent = () => {
    if (isLoading && step !== 'start') { 
      return (
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-md border border-brand-accent">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
          <p className="mt-4 text-brand-subtle">Analyse wordt uitgevoerd...</p>
        </div>
      );
    }

    switch(step) {
      case 'start':
        return (
            <Home 
              onAnalyze={handleInitialSubmit} 
              onMinorHelp={handleMinorHelpClick}
              isLoading={isLoading && !isRewriting}
              text={caseText}
              onTextChange={setCaseText}
              isRewriting={isRewriting}
              rewriteSuggestion={rewriteSuggestion}
              onAcceptSuggestion={handleAcceptSuggestion}
              onDismissSuggestion={handleDismissSuggestion}
            />
        );
      case 'questions':
        if (quickResult) {
           const vragen = quickResult.verduidelijkingsvragen || [];
           const bevoegdheid = quickResult.bevoegdheid || { is_bevoegd: false, reden: '', advies: '' };
           const isBevoegd = bevoegdheid.is_bevoegd;
           const reden = bevoegdheid.reden;
           const advies = bevoegdheid.advies;

           return (
             <div className="space-y-6 w-full max-w-4xl mx-auto px-4 py-10">
                {error && (
                    <div className="p-4 bg-status-danger/10 border-l-4 border-status-danger text-status-danger rounded-r-lg" role="alert">
                        <p className="font-bold">Er is een fout opgetreden</p>
                        <p className="text-sm">{error}</p>
                    </div>
                )}
               <QuickResult patterns={quickResult.gedragspatronen} />
               
               {/* Bevoegdheidscheck as a standalone card */}
               <div className="bg-white shadow-md rounded-2xl p-4 md:p-6 border border-brand-accent">
                 <div className={`p-4 rounded-lg flex items-start gap-4 ${isBevoegd ? 'bg-status-safe/10 border border-status-safe/30' : 'bg-status-danger/10 border border-status-danger/30'}`}>
                   <div>
                     {isBevoegd ? (
                       <CheckIcon className="w-8 h-8 text-status-safe flex-shrink-0" />
                     ) : (
                       <WarningIcon className="w-8 h-8 text-status-danger flex-shrink-0" />
                     )}
                   </div>
                   <div className="flex-grow">
                     <h4 className={`font-bold ${isBevoegd ? 'text-status-safe' : 'text-status-danger'}`}>
                       Bevoegdheidscheck: {isBevoegd ? 'Gerechtvaardigd Belang Aanwezig' : 'Mandaat Onbevestigd'}
                     </h4>
                     <p className="text-sm text-brand-text mt-1">
                       <span className="font-semibold">Reden:</span> {reden}
                     </p>
                     <p className="text-sm text-brand-text mt-2 bg-white/50 p-2 rounded-md">
                       <span className="font-semibold">Advies:</span> {advies}
                     </p>
                   </div>
                 </div>
               </div>

               <div className="bg-white shadow-md rounded-2xl p-6 border border-brand-accent">
                 <h2 className="text-2xl font-bold text-center mb-6">Verfijn uw Analyse</h2>
                 <QuestionForm
                   vragen={vragen}
                   minAnswersRequired={Math.min(3, vragen.length)}
                   onSubmit={handleQuestionSubmit}
                   answers={questionAnswers}
                   onAnswersChange={setQuestionAnswers}
                 />
               </div>
             </div>
           );
        }
        return null;
      case 'result':
        if (finalResult) {
          return (
            <div className="w-full max-w-4xl mx-auto px-4 py-10">
              <ResultDisplay result={finalResult} onReset={handleReset} />
            </div>
          );
        }
        return null;
      case 'about':
        return <OverOns onStartAnalysis={() => setStep('start')} />;
      default:
        return <Home 
                  onAnalyze={handleInitialSubmit} 
                  onMinorHelp={handleMinorHelpClick}
                  isLoading={isLoading && !isRewriting} 
                  text={caseText}
                  onTextChange={setCaseText}
                  isRewriting={isRewriting}
                  rewriteSuggestion={rewriteSuggestion}
                  onAcceptSuggestion={handleAcceptSuggestion}
                  onDismissSuggestion={handleDismissSuggestion}
                />;
    }
  }

  return (
    <div className="min-h-screen bg-brand-surface flex flex-col font-sans text-brand-text antialiased">
        {/* Main Navigation */}
        <nav className="w-full bg-[#F9FCFA] border-b border-[#E5E7EB]/50 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                 <div 
                    className="flex items-center cursor-pointer group" 
                    onClick={() => setStep('start')}
                 >
                     <DoddarLogo className="h-8 md:h-10 w-auto" />
                 </div>

                 {/* Desktop Menu */}
                 <div className="hidden md:flex items-center gap-6 md:gap-8">
                    <button onClick={() => setStep('about')} className={`text-sm font-medium text-[#2F3E37] hover:text-[#58B895] transition-colors relative group ${step === 'about' ? 'text-[#58B895]' : ''}`}>
                      Over Ons
                      <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#58B895] transition-all duration-300 ${step === 'about' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                    </button>
                    
                    <button onClick={() => alert("Neem contact op via info@doddar.nl")} className="text-sm font-medium text-[#2F3E37] hover:text-[#58B895] transition-colors relative group">
                      Contact
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#58B895] transition-all duration-300 group-hover:w-full"></span>
                    </button>

                    {step !== 'start' && !isLoading && (
                      <button 
                          onClick={handleReset}
                          className="px-4 py-2 bg-white border border-[#58B895] text-[#58B895] font-semibold rounded-lg shadow-sm hover:bg-[#F9FCFA] transition-colors text-sm ml-2"
                      >
                          Nieuwe Analyse
                      </button>
                    )}
                 </div>

                 {/* Mobile Menu Button */}
                 <div className="md:hidden">
                    <button 
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className="p-2 text-[#2F3E37] hover:text-[#58B895] focus:outline-none"
                      aria-label="Menu"
                    >
                      {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                    </button>
                 </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
              <div className="md:hidden bg-[#F9FCFA] border-t border-[#E5E7EB] absolute w-full left-0 shadow-xl animate-fade-in z-40">
                <div className="flex flex-col p-4 space-y-4">
                  <button 
                    onClick={() => handleNavClick('about')} 
                    className={`text-left text-base font-medium py-3 px-4 rounded-xl transition-colors ${step === 'about' ? 'text-[#58B895] bg-[#E8F5EF]' : 'text-[#2F3E37] hover:bg-[#E8F5EF]'}`}
                  >
                    Over Ons
                  </button>
                  <button 
                    onClick={() => handleNavClick('contact')} 
                    className="text-left text-base font-medium text-[#2F3E37] hover:text-[#58B895] py-3 px-4 rounded-xl hover:bg-[#E8F5EF] transition-colors"
                  >
                    Contact
                  </button>
                  
                  {step !== 'start' && !isLoading && (
                    <button 
                        onClick={handleReset}
                        className="w-full text-center px-4 py-4 bg-white border border-[#58B895] text-[#58B895] font-semibold rounded-xl shadow-sm hover:bg-[#F9FCFA] transition-colors mt-2"
                    >
                        Nieuwe Analyse
                    </button>
                  )}
                </div>
              </div>
            )}
        </nav>

        <div className="flex-grow flex flex-col">
            {showAuthModal && (
              <BevoegdheidscheckModal
                onClose={() => setShowAuthModal(false)}
                onConfirm={handleAuthConfirm}
                onRedirect={handleAuthRedirect}
              />
            )}
            {showMinorModal && (
                <MinorModal
                    uiPayload={showMinorModal}
                    onClose={() => setShowMinorModal(null)}
                    onWithAdult={() => {
                        setShowMinorModal(null);
                        alert("Vraag een ouder/verzorger, mentor of vertrouwenspersoon om samen de vragen in te vullen.");
                    }}
                />
            )}
            
            {/* Main Content Area */}
            <main className="w-full flex-grow">
                {error && step !== 'questions' && step !== 'start' && (
                  <div className="max-w-4xl mx-auto px-4 mt-8">
                    <div className="p-6 bg-white rounded-2xl shadow-md border border-status-danger text-status-danger flex justify-between items-center gap-4">
                      <div>
                        <h3 className="font-bold text-lg">Fout</h3>
                        <p>{error}</p>
                      </div>
                      <button onClick={handleReset} className="error-reset-btn">
                          Nieuwe Analyse
                      </button>
                    </div>
                  </div>
                )}
                {renderContent()}
            </main>
            
            {/* Footer */}
            <footer className="bg-[#F9FCFB] border-t border-[#58B895]/20 py-12 mt-auto">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-4">
                             <DoddarLogo className="h-10 w-auto" />
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-sm text-[#374151]">
                            <div className="flex flex-col gap-2">
                                <h4 className="font-bold text-[#58B895] mb-1 uppercase tracking-wider text-xs">Contact</h4>
                                <span>info@doddar.nl</span>
                                <span>+31 6 836 710 01</span>
                                <span>KvK 96446242</span>
                                <span>POB 08766</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="font-bold text-[#58B895] mb-1 uppercase tracking-wider text-xs">Navigatie</h4>
                                <button onClick={() => setStep('about')} className="text-left hover:text-[#58B895]">Over ons</button>
                                <button className="text-left hover:text-[#58B895]">Diensten</button>
                                <button className="text-left hover:text-[#58B895]">Methoden</button>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="font-bold text-[#58B895] mb-1 uppercase tracking-wider text-xs">Relaties</h4>
                                <span className="text-[#6B7280]">Afhankelijkheid</span>
                                <span className="text-[#6B7280]">Onderzoek</span>
                                <span className="text-[#6B7280]">Zorg & Arbeid</span>
                            </div>
                             <div className="flex flex-col gap-2">
                                <h4 className="font-bold text-[#58B895] mb-1 uppercase tracking-wider text-xs">Juridisch</h4>
                                <button className="text-left hover:text-[#58B895]">Algemene Voorwaarden</button>
                                <button className="text-left hover:text-[#58B895]">Privacy Gedragscode</button>
                                <button className="text-left hover:text-[#58B895]">Klachtenregeling</button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-12 pt-8 border-t border-[#E5E7EB] text-center text-xs text-[#6B7280]">
                        <p className="mb-4 max-w-4xl mx-auto">
                            Doddar is gelegitimeerd door de <strong>Politie Nederland</strong>, erkend door het <strong>Ministerie van Justitie en Veiligheid</strong> onder POB-nummer 08766, geregistreerd door de <strong>Autoriteit Persoonsgegevens</strong> en aangesloten bij de <strong>Branchevereniging voor Particuliere Onderzoeksbureaus</strong>.
                        </p>
                        <p>&copy; Doddar Copyright 2025</p>
                    </div>
                </div>
            </footer>
        </div>
    </div>
  );
};

export default App;