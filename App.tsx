

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
import { InfoIcon } from './components/icons/InfoIcon';
import { WarningIcon } from './components/icons/WarningIcon';
import { CheckIcon } from './components/icons/CheckIcon';

type AppStep = 'start' | 'questions' | 'result';

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
        <p className="auth-modal-info">
          <span className="tooltip">
            <InfoIcon className="w-5 h-5 text-brand-secondary cursor-pointer" />
            <span className="tooltip-text">
              Een formeel mandaat betekent dat u door uw organisatie bent aangewezen of gemachtigd bent om (juridische of interne) onderzoeken te initiëren. Dit voorkomt schending van privacywetgeving. Binnen bedrijven zijn bevoegd: directieleden, HR-managers, juridisch adviseurs, of compliance officers.
            </span>
          </span>
          Klik op het informatie-icoon voor uitleg.
        </p>
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
  };
  
  const renderContent = () => {
    if (isLoading && step !== 'start') { // Show full-page loader only after initial submission
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
          <div className="space-y-8">
            <InputSection 
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
            <RecentCasesBanner />
          </div>
        );
      case 'questions':
        if (quickResult) {
           const vragen = quickResult.verduidelijkingsvragen || [];
           const bevoegdheid = quickResult.bevoegdheid || { is_bevoegd: false, reden: '', advies: '' };
           const isBevoegd = bevoegdheid.is_bevoegd;
           const reden = bevoegdheid.reden;
           const advies = bevoegdheid.advies;

           return (
             <div className="space-y-6">
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
          return <ResultDisplay result={finalResult} onReset={handleReset} />;
        }
        return null;
      default:
        return <InputSection 
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
    <div className="min-h-screen bg-brand-surface flex flex-col items-center py-16 font-sans text-brand-text antialiased">
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
        <header className="w-full max-w-4xl mx-auto px-4 flex flex-col items-center mb-10 text-center relative">
            <div className="flex flex-col items-center">
                <img src="https://6ff8de82a23dcc601fd2c19519a1e316.cdn.bubble.io/f1748963332478x755273750154370000/logo%20basic%20licht.svg" alt="Doddar Logo" className="h-16" />
                <p className="font-medium text-brand-subtle uppercase tracking-[0.65em] text-sm mt-3">Recherchebureau</p>
            </div>
            {step !== 'start' && !isLoading && (
                <button 
                    onClick={handleReset}
                    className="absolute top-1/2 -translate-y-1/2 right-0 px-4 py-2 bg-white border border-brand-accent text-brand-secondary font-semibold rounded-lg shadow-sm hover:bg-brand-surface transition-colors text-sm"
                >
                    Nieuwe Analyse
                </button>
            )}
        </header>

        <main className="w-full max-w-4xl mx-auto px-4 space-y-8">
            {error && step !== 'questions' && (
              <div className="p-6 bg-white rounded-2xl shadow-md border border-status-danger text-status-danger flex justify-between items-center gap-4">
                <div>
                  <h3 className="font-bold text-lg">Fout</h3>
                  <p>{error}</p>
                </div>
                <button onClick={handleReset} className="error-reset-btn">
                    Nieuwe Analyse
                </button>
              </div>
            )}
            {renderContent()}
        </main>
        <footer className="text-xs text-brand-subtle mt-10">
            Doddar © 2025 — Particulier onderzoeksbureau
        </footer>
    </div>
  );
};

export default App;