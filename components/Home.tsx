
import React, { useRef, useState, useEffect } from 'react';
import InputSection from './InputSection';
import RecentCasesBanner from './RecentCasesBanner';
import { OsintIcon } from './icons/OsintIcon';
import { ObservationIcon } from './icons/ObservationIcon';
import { InterviewIcon } from './icons/InterviewIcon';
import { BrainIcon } from './icons/BrainIcon';
import { ShieldIcon } from './icons/ShieldIcon';
import { CheckIcon } from './icons/CheckIcon';
import { InvestigationIcon } from './icons/InvestigationIcon';
import { DoddarLogo } from './icons/DoddarLogo';

interface HomeProps {
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

// Helper component for scroll animations
const FadeInSection: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) observer.unobserve(domRef.current);
          }
        });
      },
      { threshold: 0.1 }
    );

    const { current } = domRef;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Home: React.FC<HomeProps> = ({
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
  const toolRef = useRef<HTMLDivElement>(null);

  const scrollToTool = () => {
    toolRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full relative overflow-hidden bg-[#F9FCFA]">
      
      {/* Organic Blob Shape for Depth */}
      <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#EFE8E1] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse pointer-events-none z-0"></div>

      {/* 1. Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-12 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <FadeInSection>
            <div className="space-y-8">
              {/* Two-line Professional Header */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-[#2F3E37] block">Inzicht in gedrag.</span>
                <span className="text-[#58B895] block">Veiligheid in relaties.</span>
              </h1>
              
              <p className="text-base md:text-lg text-[#6B7280] leading-relaxed max-w-lg">
                Doddar is gespecialiseerd in het analyseren van gedrag binnen afhankelijkheidsrelaties. Wij objectiveren signalen, doorbreken patronen en bieden perspectief op herstel.
              </p>
              
              <ul className="space-y-3 pt-2">
                {[
                  "Gedragsanalyse & Risico-inschatting",
                  "Pre-screening & Achtergrondchecks",
                  "Onderzoek naar grensoverschrijdend gedrag"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-[#2F3E37] font-medium text-sm md:text-base">
                    <div className="w-2 h-2 rounded-full bg-[#58B895]" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="pt-6 md:pt-8">
                <button 
                  onClick={scrollToTool}
                  className="w-full md:w-auto px-8 py-4 bg-[#58B895] hover:bg-[#4AA984] text-white font-bold rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Start een anonieme Analyse <span className="text-xl">→</span>
                </button>
              </div>
            </div>
        </FadeInSection>

        <FadeInSection delay={200}>
            <div className="relative flex justify-center md:justify-end">
              <DoddarLogo className="w-full max-w-lg object-contain opacity-90 text-[#2F3E37]" />
            </div>
        </FadeInSection>
      </section>

      {/* 2. Casus Analyse Tool */}
      <section ref={toolRef} className="relative z-10 py-12 md:py-24 bg-[#F9FCFA]">
        <FadeInSection>
            <div className="max-w-7xl mx-auto px-4">
              <div className="transition-all duration-500 hover:shadow-2xl rounded-3xl">
                  <InputSection 
                    onAnalyze={onAnalyze}
                    onMinorHelp={onMinorHelp}
                    isLoading={isLoading}
                    text={text}
                    onTextChange={onTextChange}
                    isRewriting={isRewriting}
                    rewriteSuggestion={rewriteSuggestion}
                    onAcceptSuggestion={onAcceptSuggestion}
                    onDismissSuggestion={onDismissSuggestion}
                  />
              </div>
            </div>
        </FadeInSection>
      </section>

      {/* 3. Diensten Overzicht */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-16 md:py-24">
        <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#374151]">Onze Expertise</h2>
              <p className="text-[#6B7280] mt-3 text-lg">Gespecialiseerde methoden voor waarheidsvinding en preventie.</p>
            </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {/* Kaart 1: OSINT */}
           <FadeInSection delay={100} className="h-full">
               <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                    <div className="w-12 h-12 bg-[#E8F5EF] rounded-xl flex items-center justify-center mb-6 text-[#58B895]">
                       <OsintIcon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-[#225748] mb-3">Open Bronnen Onderzoek</h3>
                    <p className="text-[#374151] leading-relaxed text-sm">
                        Digitaal speurwerk in openbare bronnen. Wij brengen digitale voetafdrukken, achtergronden en netwerken in kaart om een compleet beeld te vormen van een persoon of entiteit, zonder inbreuk te maken op privacy.
                    </p>
               </div>
           </FadeInSection>

           {/* Kaart 2: Observatie */}
           <FadeInSection delay={200} className="h-full">
               <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                    <div className="w-12 h-12 bg-[#E8F5EF] rounded-xl flex items-center justify-center mb-6 text-[#58B895]">
                       <ObservationIcon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-[#225748] mb-3">Observatie</h3>
                    <p className="text-[#374151] leading-relaxed text-sm">
                        Discreet en feitelijk vastleggen van gedragingen in de fysieke ruimte. Observatie biedt objectief bewijs van wat er daadwerkelijk gebeurt, los van verklaringen of vermoedens.
                    </p>
               </div>
           </FadeInSection>

           {/* Kaart 3: Interview */}
           <FadeInSection delay={300} className="h-full">
               <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                    <div className="w-12 h-12 bg-[#E8F5EF] rounded-xl flex items-center justify-center mb-6 text-[#58B895]">
                       <InterviewIcon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-[#225748] mb-3">Interview & Lichaamstaal</h3>
                    <p className="text-[#374151] leading-relaxed text-sm">
                       Het gesprek als instrument voor waarheidsvinding. Wij analyseren niet alleen wat er gezegd wordt, maar ook non-verbale signalen en incongruentie tussen woord en daad.
                    </p>
               </div>
           </FadeInSection>

           {/* Kaart 4: Educatie */}
           <FadeInSection delay={400} className="h-full">
               <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                    <div className="w-12 h-12 bg-[#E8F5EF] rounded-xl flex items-center justify-center mb-6 text-[#58B895]">
                       <BrainIcon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-[#225748] mb-3">Kennis & Educatie</h3>
                    <p className="text-[#374151] leading-relaxed text-sm">
                        Preventie begint bij herkenning. Wij bieden trainingen en workshops om afwijkend gedrag, manipulatietechnieken en risicosignalen vroegtijdig te leren herkennen.
                    </p>
               </div>
           </FadeInSection>

           {/* Kaart 5: Pre-screening */}
           <FadeInSection delay={500} className="h-full">
               <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                    <div className="w-12 h-12 bg-[#E8F5EF] rounded-xl flex items-center justify-center mb-6 text-[#58B895]">
                       <ShieldIcon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-[#225748] mb-3">Pre-screening</h3>
                    <p className="text-[#374151] leading-relaxed text-sm">
                        Voorkomen is beter dan genezen. Wij verifiëren achtergronden, cv's en integriteit van potentiële partners of medewerkers, zodat u weet met wie u in zee gaat.
                    </p>
               </div>
           </FadeInSection>

            {/* Kaart 6: Onderzoek */}
           <FadeInSection delay={600} className="h-full">
               <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                    <div className="w-12 h-12 bg-[#E8F5EF] rounded-xl flex items-center justify-center mb-6 text-[#58B895]">
                       <InvestigationIcon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-[#225748] mb-3">Recherche Onderzoek</h3>
                    <p className="text-[#374151] leading-relaxed text-sm">
                        Diepgravend onderzoek naar integriteitsschendingen, fraude, pesterijen of grensoverschrijdend gedrag. Wij leveren een juridisch onderbouwd dossier.
                    </p>
               </div>
           </FadeInSection>
        </div>
      </section>

      {/* 4. Jurisprudentie */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 pb-16 md:pb-24">
        <FadeInSection>
            <RecentCasesBanner />
        </FadeInSection>
      </section>

      {/* 5. Voor wie? */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-16 md:py-24">
         <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Particulieren */}
            <FadeInSection delay={100} className="h-full">
                <div className="relative bg-gradient-to-br from-white to-gray-50 border border-[#E5E7EB] rounded-3xl p-10 shadow-lg overflow-hidden h-full group transition-all hover:shadow-xl hover:border-gray-300">
                    
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-[#374151] mb-4">Voor Particulieren</h3>
                        <p className="text-[#374151] mb-8 leading-relaxed pr-4">
                            Zit u vast in een complexe relatie, heeft u te maken met stalking, manipulatie of voelt u zich onveilig? Wij helpen u de feiten te onderscheiden van emotie en geven u de regie terug.
                        </p>
                        <ul className="space-y-3 text-sm text-[#58B895] font-bold">
                           <li className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg p-1 w-fit"><CheckIcon className="w-4 h-4" />Inzicht in grensoverschrijdend gedrag</li>
                           <li className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg p-1 w-fit"><CheckIcon className="w-4 h-4" />Ondersteuning bij conflicten</li>
                           <li className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg p-1 w-fit"><CheckIcon className="w-4 h-4" />Bewijsverzameling</li>
                        </ul>
                    </div>
                </div>
            </FadeInSection>

            {/* Zakelijk */}
            <FadeInSection delay={200} className="h-full">
                <div className="relative bg-gradient-to-br from-white to-gray-50 border border-[#E5E7EB] rounded-3xl p-10 shadow-lg overflow-hidden h-full group transition-all hover:shadow-xl hover:border-gray-300">

                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-[#4B5563] mb-4">Voor Organisaties</h3>
                        <p className="text-[#374151] mb-8 leading-relaxed pr-4">
                            Van MKB tot zorginstelling en sportclub: wij ondersteunen bij integriteitskwesties, interne fraude, pesterijen of screening van personeel. Wij zorgen voor een veilig werkklimaat.
                        </p>
                        <ul className="space-y-3 text-sm text-[#6B7280] font-bold">
                           <li className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg p-1 w-fit"><CheckIcon className="w-4 h-4" />Integriteitsonderzoek</li>
                           <li className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg p-1 w-fit"><CheckIcon className="w-4 h-4" />Interne risico-analyse</li>
                           <li className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg p-1 w-fit"><CheckIcon className="w-4 h-4" />Preventieve screening</li>
                        </ul>
                    </div>
                </div>
            </FadeInSection>
         </div>
      </section>
    </div>
  );
};

export default Home;
