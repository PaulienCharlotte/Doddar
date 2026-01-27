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
  onOpenComplaints: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenKnowledge: () => void;
  onOpenDisclaimer: () => void;
}

const RewriteSuggestionBox: React.FC<{
  isRewriting: boolean;
  suggestion: string | null;
  onAccept: () => void;
  onDismiss: () => void;
}> = ({ isRewriting, suggestion, onAccept, onDismiss }) => {
  if (isRewriting) {
    return (
        <div className="my-6 bg-white border border-[#58B895]/30 rounded-xl p-5 shadow-sm relative overflow-hidden animate-fade-in">
            {/* Progress Bar Top */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#F9FCFB]">
                <div className="h-full bg-[#58B895]/50 w-1/3 animate-[loading_1s_ease-in-out_infinite]"></div>
            </div>
            
            <div className="flex items-start gap-4">
                <div className="p-2.5 bg-[#F2F9F6] rounded-xl flex-shrink-0 mt-0.5">
                    <div className="animate-spin h-5 w-5 border-2 border-[#58B895] border-t-transparent rounded-full" />
                </div>
                <div className="space-y-1">
                    <h4 className="font-bold text-[#13261f] text-sm flex items-center gap-2">
                        Tekst wordt geoptimaliseerd...
                    </h4>
                    <p className="text-sm text-[#4B5563] leading-relaxed">
                        Omdat u geen zakelijk mandaat heeft, herschrijven we de casus naar een <strong>persoonlijk veiligheidsperspectief</strong>. Dit helpt de AI om patronen en impact nauwkeuriger te herkennen.
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
             <div className="bg-[#F2F9F6] p-1.5 rounded-lg">
                <BrainIcon className="w-4 h-4 text-[#58B895]" />
             </div>
             <p className="font-bold text-[#13261f] text-sm">Aangepast Perspectief (Privé)</p>
        </div>
        
        <p className="mb-3 text-sm text-[#4B5563]">
            Om u beter te helpen als privépersoon, hebben we de tekst herschreven vanuit uw ervaring. Dit maakt de juridische en psychologische analyse scherper.
        </p>

        <div className="p-5 bg-white border border-[#58B895]/20 rounded-xl text-sm leading-relaxed text-[#4B5563] shadow-sm mb-4 relative group">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#58B895] rounded-l-xl"></div>
            {suggestion}
        </div>
        
        <div className="flex gap-3 justify-end">
            <button 
                onClick={onDismiss} 
                className="px-4 py-2 rounded-lg text-sm font-medium text-[#9CA3AF] hover:text-[#4B5563] hover:bg-gray-100 transition-colors"
            >
                Nee, behoud origineel
            </button>
            <button 
                onClick={onAccept} 
                className="px-5 py-2 rounded-lg text-sm font-bold bg-[#58B895] text-white hover:bg-[#6A9489] shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center gap-2"
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
  onOpenTerms,
  onOpenDisclaimer
}) => {
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [exampleIndex, setExampleIndex] = useState(0);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const examples = [
    "Bijvoorbeeld: 'Sinds de scheiding word ik stelselmatig lastiggevallen door mijn ex-partner via anonieme berichten, en ik zie zijn auto vaak in mijn straat...'",
    "Bijvoorbeeld: 'Wij vermoeden dat een zieke werknemer nevenwerkzaamheden verricht, aangezien hij regelmatig wordt gezien op bouwlocaties terwijl hij arbeidsongeschikt is...'",
    "Bijvoorbeeld: 'Mijn dementerende moeder lijkt financieel te worden uitgebuit door haar nieuwe mantelzorger; er zijn vreemde transacties zichtbaar op haar rekening...'",
    "Bijvoorbeeld: 'Er verdwijnen structureel goederen uit onze voorraad zonder administratieve verklaring, specifiek tijdens de weekenddiensten van één team...'",
    "Bijvoorbeeld: 'Mijn ex-partner claimt geen draagkracht te hebben voor alimentatie, maar voert wel een luxe levensstijl en rijdt in een dure auto...'"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
        setExampleIndex((prev) => (prev + 1) % examples.length);
    }, 6000);
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
        alert("U dient akkoord te gaan met de voorwaarden en disclaimer voordat u verder kunt.");
        return;
    }
    onAnalyze(text);
  };

  const baseUrl = "https://shimmering-paletas-5d438a.netlify.app/images/";

  return (
    <div className="bg-white shadow-none md:shadow-xl md:shadow-[#13261f]/5 rounded-[1.5rem] md:rounded-[2rem] border-0 md:border border-[#E5E7EB] animate-fade-in relative overflow-hidden flex flex-col lg:grid lg:grid-cols-[0.8fr_1.2fr]">
        
        {isLoading && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center z-20 animate-fade-in transition-all duration-500 rounded-[2rem]">
            <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-[#58B895]"></div>
            <p className="mt-8 text-xl font-semibold text-[#4B5563]">Analyse wordt gestart...</p>
            <p className="mt-3 text-base text-[#9CA3AF]">Een ogenblik geduld alstublieft.</p>
          </div>
        )}
        
        <div className="flex flex-col p-6 md:p-12 lg:pr-8 bg-[#E8F5EF] border-b lg:border-b-0 lg:border-r border-[#58B895]/10 rounded-t-[2rem] lg:rounded-l-[2rem] lg:rounded-tr-none">
            <div className="mb-0 md:mb-8 text-left">
                <h2 className="text-[#13261f] text-xl md:text-3xl font-bold leading-tight mb-2 md:mb-3">
                    Casusanalyse
                </h2>
                
                <p className="text-[#4B5563] text-sm md:text-base leading-relaxed font-normal mb-0 md:mb-8">
                    Toets vrijblijvend de haalbaarheid en juridische mogelijkheden van een particulier onderzoek.
                </p>

                <div className="hidden lg:block">
                    <ul className="space-y-3 md:space-y-4 text-[#13261f] text-sm font-medium mb-6 md:mb-8">
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-[#58B895] rounded-full flex-shrink-0"></div>
                            <span>Haalbaarheidscheck onderzoek</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-[#58B895] rounded-full flex-shrink-0"></div>
                            <span>Juridische kaders & Privacy</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-[#58B895] rounded-full flex-shrink-0"></div>
                            <span>Advies vervolgstappen</span>
                        </li>
                    </ul>

                    <div className="flex items-center gap-3 bg-white p-3 pr-5 rounded-xl border border-[#58B895]/10 shadow-sm w-fit">
                         <div className="bg-[#F2F9F6] p-2 rounded-full text-[#58B895]">
                            <ShieldIcon className="w-5 h-5" />
                         </div>
                         <div>
                            <span className="text-[#13261f] block text-xs font-bold uppercase tracking-wider">Veilig & anoniem</span>
                            <span className="text-[#6B7280] text-xs">Geen opslag van gegevens</span>
                         </div>
                    </div>
                </div>
            </div>

            <div className="hidden lg:flex flex-grow items-center justify-center mt-auto">
                 <img 
                    src={`${baseUrl}analysetool.svg`} 
                    alt="Analyse Illustratie" 
                    className="w-full max-w-[320px] h-auto object-contain drop-shadow-lg hover:scale-105 transition-transform duration-700 opacity-80" 
                 />
            </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col lg:h-full p-5 md:p-12 bg-white flex-grow">
            
            <div className="relative flex-grow shadow-sm rounded-2xl mb-6 transition-all focus-within:shadow-md group min-h-[220px] md:min-h-[300px]">
                <div className="absolute top-4 right-4 z-10 opacity-70 hover:opacity-100 transition-opacity">
                     <Tooltip 
                        placement="bottom-end"
                        content={
                         <div className="space-y-2">
                             <p className="font-bold border-b border-white/20 pb-1 mb-2">Instructie:</p>
                             <p><strong>Denk aan:</strong> Wie, Wat, Waar, Wanneer en Waarom.</p>
                             <p>Geef details over gedragspatronen en specifieke incidenten.</p>
                         </div>
                     }>
                        <button type="button" className="p-2 bg-white/80 hover:bg-[#F9FCFB] rounded-full text-[#9CA3AF] hover:text-[#58B895] transition-all">
                            <InfoIcon className="w-5 h-5" />
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
                className="w-full h-full min-h-[220px] md:min-h-[320px] p-5 md:p-6 pr-14 rounded-2xl border border-[#E5E7EB] bg-[#FDFDFD] text-[#13261f] placeholder:text-[#9CA3AF]/40 resize-y focus:outline-none focus:ring-4 focus:ring-[#58B895]/5 focus:border-[#58B895] transition-all text-base leading-relaxed shadow-inner appearance-none"
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
                <div className="space-y-3 pl-1">
                    <div className="lg:hidden flex items-center gap-3 mb-4 text-xs text-[#9CA3AF] bg-[#F9FAFB] p-3 rounded-lg border border-[#E5E7EB]">
                         <ShieldIcon className="w-4 h-4 text-[#6A9489] flex-shrink-0" />
                         <p>Geen opslag van gegevens. Veilig & anoniem.</p>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer group select-none transition-colors">
                        <input
                            id="ageConfirm"
                            type="checkbox"
                            checked={ageConfirmed}
                            onChange={(e) => setAgeConfirmed(e.target.checked)}
                            className="w-5 h-5 md:w-4 md:h-4 rounded border-gray-300 text-[#58B895] focus:ring-[#58B895] transition-all cursor-pointer flex-shrink-0 mt-0.5"
                        />
                        <div className="text-sm md:text-base text-[#4B5563] group-hover:text-[#13261f] transition-colors leading-relaxed">
                            Ik bevestig dat ik 18 jaar of ouder ben.
                            <button type="button" onClick={onMinorHelp} className="ml-1 text-sm md:text-base text-[#6A9489] hover:text-[#58B895] font-medium hover:underline">
                                (Hulp voor minderjarigen)
                            </button>
                        </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group select-none transition-colors">
                        <input
                            id="terms"
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                            className="w-5 h-5 md:w-4 md:h-4 rounded border-gray-300 text-[#58B895] focus:ring-[#58B895] transition-all cursor-pointer mt-0.5 flex-shrink-0"
                        />
                        <span className="text-sm md:text-base text-[#4B5563] group-hover:text-[#13261f] transition-colors leading-relaxed">
                            Ik ga akkoord met de <button type="button" onClick={(e) => { e.stopPropagation(); onOpenTerms(); }} className="text-[#6A9489] hover:text-[#58B895] hover:underline font-medium">Algemene voorwaarden</button> en <button type="button" onClick={(e) => { e.stopPropagation(); onOpenDisclaimer(); }} className="text-[#6A9489] hover:text-[#58B895] hover:underline font-medium">Disclaimer</button>. Ik begrijp dat dit een AI-indicatie is.
                        </span>
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={isLoading || isRewriting || !text || !termsAccepted || !ageConfirmed}
                    className="w-full py-4 bg-[#58B895] hover:bg-[#4AA984] text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-[0.99] disabled:bg-gray-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none flex items-center justify-center gap-3 tracking-wide"
                >
                    {isLoading ? 'Bezig met analyseren...' : 'Start Analyse'}
                </button>
            </div>
        </form>
    </div>
  );
};

export default InputSection;