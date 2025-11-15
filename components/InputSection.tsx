

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MicrophoneIcon } from './icons/MicrophoneIcon';
import { StopIcon } from './icons/StopIcon';
import { InfoIcon } from './icons/InfoIcon';
import { ShieldIcon } from './icons/ShieldIcon';

// FIX: Add type definitions for the Web Speech API to resolve TypeScript errors.
// These are non-standard APIs and not included in default TypeScript DOM typings.
interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onstart: () => void;
  onend: () => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  item(index: number): SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
}

interface SpeechRecognitionErrorEvent {
  error: 'not-allowed' | 'service-not-allowed' | string;
}


interface InputSectionProps {
  onAnalyze: (description: string) => void;
  onMinorHelp: () => void;
  isLoading: boolean;
  text: string;
  onTextChange: (newText: string) => void;
  isRewriting: boolean;
  rewriteSuggestion: string | null;
  onAcceptSuggestion: () => void;
  onDismissSuggestion: () => void;
}

const RewriteSuggestionBox: React.FC<{
  isRewriting: boolean;
  suggestion: string | null;
  onAccept: () => void;
  onDismiss: () => void;
}> = ({ isRewriting, suggestion, onAccept, onDismiss }) => {
  if (isRewriting) {
    return (
        <div className="rewrite-box">
            <div className="rewrite-loading">
                <div className="spinner" />
                <span>We helpen u de casus te herformuleren vanuit een persoonlijk perspectief...</span>
            </div>
        </div>
    );
  }

  if (!suggestion) return null;

  return (
    <div className="rewrite-box">
        <p>U heeft aangegeven dat dit een privésituatie is. Om u beter te helpen, raden we aan de focus te leggen op uw persoonlijke ervaring. Hier is een voorstel:</p>
        <div className="rewrite-suggestion">
            {suggestion}
        </div>
        <div className="rewrite-actions">
            <button onClick={onDismiss} className="rewrite-btn-dismiss">Negeer</button>
            <button onClick={onAccept} className="rewrite-btn-accept">Gebruik deze tekst</button>
        </div>
    </div>
  );
};


const InputSection: React.FC<InputSectionProps> = ({ 
  onAnalyze, 
  onMinorHelp,
  isLoading,
  text,
  onTextChange,
  isRewriting,
  rewriteSuggestion,
  onAcceptSuggestion,
  onDismissSuggestion,
}) => {
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // State and refs for microphone functionality
  const [isListening, setIsListening] = useState(false);
  const [showMicHelp, setShowMicHelp] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const micHelpDialogRef = useRef<HTMLDialogElement>(null);
  const baseTextRef = useRef('');

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Spraakherkenning wordt niet ondersteund door deze browser.");
      return;
    }
    
    const recognition: SpeechRecognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true; // Enable interim results for real-time feedback
    recognition.lang = 'nl-NL';
    
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscriptChunk = '';
      let interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscriptChunk += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      
      if (finalTranscriptChunk) {
          const separator = (baseTextRef.current && !baseTextRef.current.endsWith(' ')) ? ' ' : '';
          baseTextRef.current = baseTextRef.current + separator + finalTranscriptChunk.trim() + '. ';
      }
      
      onTextChange(baseTextRef.current + interimTranscript);
    };
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setShowMicHelp(true);
      }
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };
    
    recognitionRef.current = recognition;
    
    return () => {
      recognitionRef.current?.stop();
    };
  }, [onTextChange]);
  
  useEffect(() => {
    if (showMicHelp) {
      micHelpDialogRef.current?.showModal();
    } else {
      micHelpDialogRef.current?.close();
    }
  }, [showMicHelp]);

  const handleToggleListening = async () => {
    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }
    
    if (!recognitionRef.current) {
        alert("Spraakherkenning is niet beschikbaar in uw browser.");
        return;
    }

    try {
      if (navigator.permissions) {
        const permissionStatus = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        if (permissionStatus.state === 'denied') {
          setShowMicHelp(true);
          return;
        }
      }
    } catch (e) {
      console.warn("Permissions API not supported, will trigger permission prompt via recognition API.", e);
    }
    
    baseTextRef.current = text ? text.trim() + ' ' : '';
    recognitionRef.current.start();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ageConfirmed) {
        alert("Bevestig alstublieft dat u 18 jaar of ouder bent.");
        return;
    }
    if (!termsAccepted) {
        alert("U dient akkoord te gaan met de voorwaarden voordat u verder kunt.");
        return;
    }
    onAnalyze(text);
  };

  const MicHelpDialog = () => (
    <dialog ref={micHelpDialogRef} id="micHelp" onClose={() => setShowMicHelp(false)}>
      <h3>Microfoon Toegang Inschakelen</h3>
      <p>Toegang tot uw microfoon is geweigerd. Om spraakinvoer te gebruiken, volg de stappen voor uw browser.</p>
      <div id="micSteps">
{`Google Chrome:
1. Klik op het slotje (🔒) links in de adresbalk.
2. Zet de schakelaar bij 'Microfoon' op 'Toestaan'.
3. Herlaad de pagina.

Mozilla Firefox:
1. Klik op het microfoon-icoon (🎤) in de adresbalk.
2. Verwijder de blokkade door op het kruisje (x) te klikken.
3. Herlaad de pagina om opnieuw toestemming te geven.

Microsoft Edge:
1. Klik op het slotje (🔒) links van de adresbalk.
2. Ga naar 'Machtigingen voor deze site'.
3. Selecteer 'Toestaan' bij 'Microfoon'.
4. Herlaad de pagina.

Safari (macOS):
1. Ga naar Safari > Instellingen... > Websites.
2. Selecteer 'Microfoon' en zet de website op 'Sta toe'.
3. Herlaad de pagina.`}
      </div>
      <div className="help-actions">
        <button id="closeHelp" onClick={() => setShowMicHelp(false)}>Sluiten</button>
        <button onClick={() => window.location.reload()}>Pagina Herladen</button>
      </div>
    </dialog>
  );

  return (
    <>
      <MicHelpDialog />
      <div className="bg-white shadow-md rounded-2xl p-6 border border-brand-accent animate-fade-in relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl z-10 animate-fade-in">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
            <p className="mt-4 text-lg font-semibold text-brand-text">Analyse wordt gestart...</p>
            <p className="mt-1 text-sm text-brand-subtle">Een ogenblik geduld alstublieft.</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
              <div className="input-title-group">
                <h2 className="text-black text-xl font-semibold">
                  Start uw Analyse
                </h2>
                <div className="tooltip-container">
                  <InfoIcon className="w-5 h-5 text-brand-secondary" />
                  <span className="tooltip-text">Deze tool biedt een geautomatiseerde, indicatieve analyse van gedragspatronen op basis van uw verhaal. Het is geen vervanging voor professioneel advies, maar een eerste stap naar inzicht.</span>
                </div>
              </div>
              <p className="text-brand-subtle text-sm mt-1">Beschrijf uw situatie en ontvang een anonieme, geautomatiseerde analyse van gedragspatronen en mogelijke vervolgstappen.</p>
          </div>

          <div className="relative pt-2">
            <textarea
              ref={textareaRef}
              id="beschrijving"
              name="beschrijving"
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
              placeholder={isListening ? 'Aan het luisteren...' : 'Beschrijf hier de situatie. Denk aan: Wie, Wat, Waar, Wanneer en Waarom.'}
              className="w-full min-h-[220px] p-3 rounded-lg border border-brand-subtle bg-brand-surface text-black placeholder:text-brand-subtle resize-y focus:outline-none focus:ring-2 focus:ring-brand-primary"
              disabled={isLoading || isRewriting}
              required
            />
             <div className="absolute top-4 right-3">
                 <button
                    type="button"
                    onClick={handleToggleListening}
                    className="group relative flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
                    aria-label={isListening ? 'Stop met opnemen' : 'Start spraakinvoer'}
                    disabled={isLoading}
                  >
                    <div className={`absolute inset-0 bg-brand-primary rounded-full transition-opacity duration-200 ${isListening ? 'opacity-100 animate-pulse' : 'opacity-0 group-hover:opacity-10'}`} />
                    {isListening ? (
                      <StopIcon className="relative w-5 h-5 text-white" />
                    ) : (
                      <MicrophoneIcon className="relative w-5 h-5 text-brand-primary" />
                    )}
                  </button>
            </div>
          </div>

          <RewriteSuggestionBox 
            isRewriting={isRewriting}
            suggestion={rewriteSuggestion}
            onAccept={onAcceptSuggestion}
            onDismiss={onDismissSuggestion}
          />
          
          <div className="pt-2 space-y-3">
              <div className="flex items-start gap-2">
                <input
                    id="ageConfirm"
                    type="checkbox"
                    checked={ageConfirmed}
                    onChange={(e) => setAgeConfirmed(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                />
                <div>
                    <label htmlFor="ageConfirm" className="text-xs text-brand-subtle">
                       Ik bevestig dat ik 18 jaar of ouder ben.
                    </label>
                    <button type="button" onClick={onMinorHelp} className="minor-help-link">
                        Ben je jonger dan 18? Klik hier voor hulp.
                    </button>
                </div>
              </div>
               <div className="flex items-start gap-2">
                <input
                    id="terms"
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                />
                <label htmlFor="terms" className="text-xs text-brand-subtle">
                   Ik begrijp dat dit een geautomatiseerde, indicatieve analyse is en dat mijn invoer <strong>anoniem en tijdelijk</strong> wordt verwerkt.
                </label>
                 <div className="tooltip-container">
                    <ShieldIcon className="w-4 h-4 text-brand-secondary" />
                    <span className="tooltip-text">Uw gegevens worden niet opgeslagen. De analyse is volledig geautomatiseerd en uw invoer wordt na de analyse direct verwijderd om uw privacy te waarborgen.</span>
                  </div>
              </div>
          </div>

          <div className="pt-2 flex flex-col items-end gap-2">
              <button
                type="submit"
                disabled={isLoading || isRewriting || !text || !termsAccepted || !ageConfirmed}
                className="w-full sm:w-auto px-6 py-3 bg-brand-primary hover:bg-brand-secondary text-white font-semibold rounded-xl shadow-sm transition-all duration-150 disabled:bg-brand-subtle disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Analyseren...' : 'Start Analyse'}
              </button>
              <p className="text-xs text-brand-subtle max-w-sm text-right">
                De analyse is gericht op het identificeren van patronen die relevant zijn voor de inzet van particulier onderzoek.
              </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default InputSection;