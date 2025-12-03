
import React, { useState, useRef, useEffect } from 'react';
import { InfoIcon } from './icons/InfoIcon';
import { ShieldIcon } from './icons/ShieldIcon';
import Tooltip from './Tooltip';
import { BrainIcon } from './icons/BrainIcon';

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
        <div className="my-6 bg-white border border-brand-primary/30 rounded-xl p-5 shadow-sm relative overflow-hidden animate-fade-in">
            {/* Progress Bar Top */}
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-surface">
                <div className="h-full bg-brand-primary/50 w-1/3 animate-[loading_1s_ease-in-out_infinite]"></div>
            </div>
            
            <div className="flex items-start gap-4">
                <div className="p-2.5 bg-brand-light rounded-xl flex-shrink-0 mt-0.5">
                    <div className="animate-spin h-5 w-5 border-2 border-brand-primary border-t-transparent rounded-full" />
                </div>
                <div className="space-y-1">
                    <h4 className="font-bold text-taupe-dark text-sm flex items-center gap-2">
                        Tekst wordt geoptimaliseerd...
                    </h4>
                    <p className="text-sm text-brand-text leading-relaxed">
                        Omdat dit een privésituatie betreft, herschrijven we de casus naar een <strong>persoonlijk perspectief</strong>. Dit helpt de AI om patronen en impact nauwkeuriger te herkennen.
                    </p>
                </div>
            </div>
        </div>
    );
  }

  if (!suggestion) return null;

  return (
    <div className="rewrite-box my-6 animate-fade-in">
        <div className="flex items-center gap-2 mb-3">
             <div className="bg-brand-light p-1.5 rounded-lg">
                <BrainIcon className="w-4 h-4 text-brand-primary" />
             </div>
             <p className="font-bold text-taupe-dark text-sm">Suggestie voor optimalisatie</p>
        </div>
        
        <p className="mb-3 text-sm text-brand-text">
            Om u beter te helpen, hebben we de tekst herschreven vanuit uw ervaring. Dit maakt de juridische en psychologische analyse scherper.
        </p>

        <div className="p-5 bg-white border border-brand-primary/20 rounded-xl text-sm leading-relaxed text-brand-text shadow-sm mb-4 relative group">
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-primary rounded-l-xl"></div>
            {suggestion}
        </div>
        
        <div className="flex gap-3 justify-end">
            <button 
                onClick={onDismiss} 
                className="px-4 py-2 rounded-lg text-sm font-medium text-brand-subtle hover:text-brand-text hover:bg-gray-100 transition-colors"
            >
                Nee, behoud origineel
            </button>
            <button 
                onClick={onAccept} 
                className="px-5 py-2 rounded-lg text-sm font-bold bg-brand-primary text-white hover:bg-brand-secondary shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center gap-2"
            >
                <span className="text-lg leading-none">✓</span> Gebruik dit voorstel
            </button>
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
  const [exampleIndex, setExampleIndex] = useState(0);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Voorbeelden voor de placeholder die roteren
  const examples = [
    "Bijvoorbeeld: 'Sinds mijn scheiding merk ik dat mijn ex-partner mijn kinderen gebruikt als boodschapper en negatief over mij praat tegen school en vrienden...'",
    "Bijvoorbeeld: 'Ik vermoed dat mijn boekhouder facturen vervalst omdat de cijfers niet aansluiten bij de voorraad en hij inzage in de administratie weigert...'",
    "Bijvoorbeeld: 'Mijn leidinggevende kleineert mij systematisch tijdens teamvergaderingen en wijst mijn verlofaanvragen zonder geldige reden af...'",
    "Bijvoorbeeld: 'Ik maak me zorgen over mijn dementerende moeder; er verdwijnen spullen uit haar huis en er wordt vreemd gepind met haar pas...'"
  ];

  useEffect(() => {
    // Wissel elke 3 seconden van voorbeeld (sneller)
    const interval = setInterval(() => {
        setExampleIndex((prev) => (prev + 1) % examples.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [examples.length]);

  const placeholderText = examples[exampleIndex];

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

  return (
    <div className="bg-white shadow-xl shadow-brand-accent/30 rounded-[2rem] p-8 md:p-14 border border-brand-accent/60 animate-fade-in relative overflow-visible">
        {isLoading && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center z-20 animate-fade-in transition-all duration-500 rounded-[2rem]">
            <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-brand-primary"></div>
            <p className="mt-8 text-xl font-semibold text-brand-text">Analyse wordt gestart...</p>
            <p className="mt-3 text-base text-brand-subtle">Een ogenblik geduld alstublieft.</p>
          </div>
        )}
        
        {/* GRID LAYOUT: Text Left, Input Right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 md:gap-20">
            
            {/* LEFT COLUMN: Information */}
            <div className="flex flex-col justify-start space-y-8">
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <h2 className="text-[#2F3E37] text-2xl md:text-4xl font-bold leading-tight tracking-tight">
                            Start uw Analyse
                        </h2>
                        
                        {/* New Tooltip Component */}
                        <Tooltip content="Deze tool biedt een geautomatiseerde, indicatieve analyse gericht op het identificeren van patronen die relevant zijn voor particulier onderzoek. Het is een eerste stap naar inzicht en geen vervanging voor juridisch of medisch advies.">
                            <button type="button" className="focus:outline-none p-1 rounded-full hover:bg-brand-surface transition-colors">
                                <InfoIcon className="w-7 h-7 text-brand-secondary" />
                            </button>
                        </Tooltip>
                    </div>
                    
                    <div className="h-1.5 w-20 bg-brand-primary rounded-full mb-8"></div>
                    
                    <p className="text-brand-text text-lg leading-relaxed font-normal mb-6">
                        Beschrijf uw situatie in het vak hiernaast. De analyse richt zich specifiek op het identificeren van:
                    </p>
                    <ul className="space-y-4 text-brand-text text-base md:text-lg">
                        <li className="flex items-center gap-4">
                            <span className="w-2 h-2 bg-brand-secondary rounded-full flex-shrink-0"></span>
                            <span>Patronen in gedrag</span>
                        </li>
                        <li className="flex items-center gap-4">
                            <span className="w-2 h-2 bg-brand-secondary rounded-full flex-shrink-0"></span>
                            <span>Risico-indicatoren</span>
                        </li>
                        <li className="flex items-center gap-4">
                            <span className="w-2 h-2 bg-brand-secondary rounded-full flex-shrink-0"></span>
                            <span>Juridische aanknopingspunten</span>
                        </li>
                    </ul>
                </div>

                {/* Privacy Badge Block - HIDDEN ON MOBILE */}
                 <div className="mt-auto pt-8 hidden lg:block">
                     <div className="flex gap-5 items-start bg-[#F9FAFB] p-6 rounded-2xl border border-[#E5E7EB]">
                         <div className="mt-1 bg-white p-3 rounded-full shadow-sm text-brand-secondary border border-brand-accent">
                            <ShieldIcon className="w-6 h-6" />
                         </div>
                         <div className="text-sm text-brand-text leading-relaxed">
                            <strong className="text-[#2F3E37] block mb-2 font-semibold text-base">Privacy & Anonimiteit</strong>
                            Uw gegevens worden <strong>niet opgeslagen</strong>. De analyse is volledig geautomatiseerd en uw invoer wordt na de analyse direct verwijderd.
                         </div>
                      </div>
                 </div>
            </div>

            {/* RIGHT COLUMN: Input Form */}
            <form onSubmit={handleSubmit} className="flex flex-col h-full">
                
                <div className="relative flex-grow shadow-sm rounded-2xl mb-6 transition-all focus-within:shadow-md">
                    {/* Help/Instruction Icon Inside Input */}
                    <div className="absolute top-4 right-4 z-10">
                         <Tooltip content={
                             <div className="space-y-2">
                                 <p className="font-bold border-b border-brand-primary/20 pb-1 mb-2">Instructie voor uw beschrijving:</p>
                                 <p><strong>Denk aan:</strong> Wie, Wat, Waar, Wanneer en Waarom.</p>
                                 <p>Geef zoveel mogelijk details, zoals gedragspatronen, specifieke incidenten en de impact op betrokkenen.</p>
                             </div>
                         }>
                            <button type="button" className="p-2 bg-white/50 hover:bg-brand-surface rounded-full text-brand-subtle hover:text-brand-primary transition-all">
                                <InfoIcon className="w-6 h-6" />
                            </button>
                         </Tooltip>
                    </div>

                    <textarea
                    ref={textareaRef}
                    id="beschrijving"
                    name="beschrijving"
                    value={text}
                    onChange={(e) => onTextChange(e.target.value)}
                    placeholder={placeholderText}
                    className="w-full h-full min-h-[300px] md:min-h-[400px] p-6 md:p-8 pr-14 rounded-2xl border border-brand-accent bg-[#FDFDFD] text-[#1F2937] placeholder:text-brand-subtle/50 resize-y focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all text-base md:text-lg leading-relaxed shadow-inner"
                    disabled={isLoading || isRewriting}
                    required
                    />
                </div>

                <RewriteSuggestionBox 
                    isRewriting={isRewriting}
                    suggestion={rewriteSuggestion}
                    onAccept={onAcceptSuggestion}
                    onDismiss={onDismissSuggestion}
                />

                <div className="space-y-6">
                    <div className="space-y-4 pl-1">
                        {/* Mobile Privacy Note */}
                        <div className="lg:hidden flex items-start gap-3 mb-6 text-sm text-brand-text bg-[#F9FAFB] p-4 rounded-xl border border-brand-accent">
                             <ShieldIcon className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                             <p>Uw gegevens worden niet opgeslagen en direct verwijderd.</p>
                        </div>

                        <label className="flex items-center gap-4 cursor-pointer group select-none p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <input
                                id="ageConfirm"
                                type="checkbox"
                                checked={ageConfirmed}
                                onChange={(e) => setAgeConfirmed(e.target.checked)}
                                className="w-5 h-5 rounded border-gray-300 text-brand-primary focus:ring-brand-primary transition-all cursor-pointer"
                            />
                            <div className="text-base text-brand-text group-hover:text-black transition-colors">
                                Ik bevestig dat ik 18 jaar of ouder ben.
                                <button type="button" onClick={onMinorHelp} className="ml-1 text-sm text-brand-secondary hover:text-brand-primary font-medium hover:underline">
                                    (Hulp voor minderjarigen)
                                </button>
                            </div>
                        </label>

                        <label className="flex items-center gap-4 cursor-pointer group select-none p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <input
                                id="terms"
                                type="checkbox"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                className="w-5 h-5 rounded border-gray-300 text-brand-primary focus:ring-brand-primary transition-all cursor-pointer"
                            />
                            <span className="text-base text-brand-text group-hover:text-black transition-colors">
                                Ik begrijp dat dit een geautomatiseerde indicatie is.
                            </span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || isRewriting || !text || !termsAccepted || !ageConfirmed}
                        className="w-full py-5 bg-brand-primary hover:bg-[#4AA984] text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-[0.99] disabled:bg-gray-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none flex items-center justify-center gap-3 tracking-wide"
                    >
                        {isLoading ? 'Analyse wordt uitgevoerd...' : 'Start Analyse'}
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default InputSection;
