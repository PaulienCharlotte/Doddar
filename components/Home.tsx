import React, { useRef, useState, useEffect } from 'react';
import InputSection from './InputSection';
import { OsintIcon } from './icons/OsintIcon';
import { ObservationIcon } from './icons/ObservationIcon';
import { InterviewIcon } from './icons/InterviewIcon';
import { BrainIcon } from './icons/BrainIcon';
import { ShieldIcon } from './icons/ShieldIcon';
import { CheckIcon } from './icons/CheckIcon';
import { InvestigationIcon } from './icons/InvestigationIcon';
import { LawIcon } from './icons/LawIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

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
  onOpenComplaints: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenKnowledge: (category?: string) => void;
  onOpenDisclaimer: () => void;
  onOpenContact: () => void;
  onOpenService: (id: string) => void;
  scrollToInput?: boolean;
  onScrollComplete?: () => void;
  scrollToExpertise?: boolean;
  onScrollExpertiseComplete?: () => void;
}

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
  onOpenComplaints,
  onOpenPrivacy,
  onOpenTerms,
  onOpenKnowledge,
  onOpenDisclaimer,
  onOpenContact,
  onOpenService,
  scrollToInput,
  onScrollComplete,
  scrollToExpertise,
  onScrollExpertiseComplete
}) => {
  const [expandedExpertise, setExpandedExpertise] = useState<string | null>(null);
  const inputSectionRef = useRef<HTMLElement>(null);
  const expertiseSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (scrollToInput && inputSectionRef.current) {
        setTimeout(() => {
            const element = inputSectionRef.current;
            if (element) {
                const headerOffset = 120;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
            if (onScrollComplete) onScrollComplete();
        }, 100);
    }
  }, [scrollToInput, onScrollComplete]);

  const expertiseItems = [
    { id: 'osint', icon: <OsintIcon className="w-8 h-8" />, title: 'Openbronnenonderzoek', description: 'Digitaal speurwerk in openbare bronnen. Wij brengen digitale voetafdrukken in kaart.' },
    { id: 'observatie', icon: <ObservationIcon className="w-8 h-8" />, title: 'Observatie', description: 'Discreet en feitelijk vastleggen van gedragingen in de fysieke ruimte.' },
    { id: 'interview', icon: <InterviewIcon className="w-8 h-8" />, title: 'Interview & lichaamstaal', description: 'Het gesprek als instrument voor waarheidsvinding.' },
    { id: 'advies', icon: <BrainIcon className="w-8 h-8" />, title: 'Advies & bewustwording', description: 'Preventie begint bij herkenning.' },
    { id: 'screening', icon: <ShieldIcon className="w-8 h-8" />, title: 'Pre-screening', description: 'Voorkomen is beter dan genezen.' },
    { id: 'recherche', icon: <InvestigationIcon className="w-8 h-8" />, title: 'Rechercheonderzoek', description: 'Diepgravend onderzoek naar integriteitsschendingen.' }
  ];

  const baseUrl = "https://shimmering-paletas-5d438a.netlify.app/images/";

  return (
    <div className="w-full relative overflow-hidden bg-[#F9FCFA]">
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-48 overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-[#F2F9F6] to-[#F9FCFA] -z-10"></div>
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E8F5EF]/50 to-transparent -z-10 rounded-bl-[10rem]"></div>
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-32 items-center">
                <div className="order-2 lg:order-1 flex flex-col items-start text-left space-y-6 animate-fade-in max-w-lg mx-0">
                    <img src={`${baseUrl}logo%20doddar%20svg.svg`} alt="Doddar" className="h-14 md:h-24 w-auto drop-shadow-sm mb-2" />
                    <div className="space-y-4 md:space-y-6">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#13261f] tracking-tight leading-[1.1]">
                            Inzicht in gedrag.<br />
                            <span className="text-[#58B895]">Veiligheid in relaties.</span>
                        </h1>
                        <p className="text-base md:text-lg text-[#6B7280] font-normal leading-relaxed max-w-xl">
                            Doddar is een particulier recherchebureau gericht op zowel zakelijke als particuliere relaties. Met verschillende methoden analyseren we gedrag.
                        </p>
                    </div>
                </div>
                <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in relative">
                    <div className="relative w-full max-w-[240px] md:max-w-lg lg:max-w-full">
                        <div className="absolute inset-0 bg-white/40 rounded-full blur-3xl transform scale-90"></div>
                        <img src={`${baseUrl}menselijk%20gedrag.svg`} alt="Doddar Illustratie" className="w-full h-auto object-contain relative z-10 drop-shadow-lg" />
                    </div>
                </div>
            </div>
         </div>
      </section>

      <section ref={inputSectionRef} className="relative z-20 px-4 pb-20 md:pb-32 mt-8 md:-mt-16">
        <FadeInSection>
            <div className="max-w-7xl mx-auto">
              <div className="transition-all duration-500 hover:shadow-2xl rounded-[1.5rem] md:rounded-[2rem] mb-12 lg:mb-24 bg-white">
                  <InputSection onAnalyze={onAnalyze} onMinorHelp={onMinorHelp} isLoading={isLoading} text={text} onTextChange={onTextChange} isRewriting={isRewriting} rewriteSuggestion={rewriteSuggestion} onAcceptSuggestion={onAcceptSuggestion} onDismissSuggestion={onDismissSuggestion} onOpenComplaints={onOpenComplaints} onOpenPrivacy={onOpenPrivacy} onOpenTerms={onOpenTerms} onOpenKnowledge={onOpenKnowledge} onOpenDisclaimer={onOpenDisclaimer} />
              </div>
              <div className="flex justify-center animate-fade-in">
                  <div className="bg-[#F2F9F6] rounded-[2rem] md:rounded-[3rem] border border-[#58B895]/20 shadow-xl hover:shadow-2xl transition-all duration-300 p-8 md:p-12 w-full max-w-6xl flex flex-col md:flex-row items-center gap-8 md:gap-16 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-[#58B895]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                      <div className="flex-shrink-0 relative z-10">
                          <div className="bg-white p-6 rounded-full shadow-sm border border-[#58B895]/10">
                              <img src={`${baseUrl}onderzoek_1.svg`} alt="Contact" className="w-32 h-32 md:w-56 md:h-56 object-contain" />
                          </div>
                      </div>
                      <div className="flex-grow text-center md:text-left space-y-4 relative z-10">
                          <h3 className="text-3xl md:text-4xl font-bold text-[#13261f]">Direct Contact</h3>
                          <p className="text-lg text-[#4B5563] font-medium leading-relaxed max-w-xl mx-auto md:mx-0">
                              Sla de online analyse over. Plan direct een intakegesprek om uw situatie <span className="text-[#58B895] font-bold">vertrouwelijk</span> te bespreken.
                          </p>
                      </div>
                      <div className="flex-shrink-0 w-full md:w-auto relative z-10">
                          <button onClick={onOpenContact} className="w-full md:w-auto whitespace-nowrap px-8 py-4 md:px-12 md:py-6 bg-[#13261f] hover:bg-[#58B895] text-white text-lg font-bold rounded-2xl shadow-lg transition-all transform hover:-translate-y-1">
                            Neem contact op <span className="text-xl">→</span>
                          </button>
                      </div>
                  </div>
              </div>
            </div>
        </FadeInSection>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pb-20 md:pb-32">
         <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <FadeInSection delay={100} className="h-full">
                <div className="group relative h-full bg-white rounded-[2.5rem] md:rounded-[3rem] border border-[#E5E7EB] hover:border-[#58B895]/30 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden p-8 md:p-12 flex flex-col justify-between">
                    <div className="relative z-20 flex flex-col h-full">
                        <div className="mb-6"><h3 className="text-2xl lg:text-4xl font-bold text-[#13261f] mb-3">Voor particulieren</h3><div className="h-1.5 w-24 bg-[#58B895] rounded-full"></div></div>
                        <p className="text-[#4B5563] font-normal leading-relaxed text-base md:text-lg mb-8 max-w-md bg-[#F2F9F6]/50 p-4 rounded-xl">Zit u vast in een complexe relatie? Wij helpen u de feiten te onderscheiden van emotie.</p>
                        <div className="mt-auto"><button onClick={onOpenContact} className="inline-flex items-center gap-3 px-6 py-3 bg-[#13261f] text-white font-bold rounded-xl hover:bg-[#58B895] transition-all">Neem contact op →</button></div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-48 h-40 md:w-64 md:h-56 z-10 pointer-events-none opacity-30 mix-blend-multiply">
                        <img src={`${baseUrl}onderzoek_1.svg`} alt="" className="w-full h-full object-contain object-bottom-right" />
                    </div>
                </div>
            </FadeInSection>
            <FadeInSection delay={200} className="h-full">
                <div className="group relative h-full bg-white rounded-[2.5rem] md:rounded-[3rem] border border-[#E5E7EB] hover:border-[#6A9489]/30 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden p-8 md:p-12 flex flex-col justify-between">
                    <div className="relative z-20 flex flex-col h-full">
                        <div className="mb-6"><h3 className="text-2xl lg:text-4xl font-bold text-[#13261f] mb-3">Voor organisaties</h3><div className="h-1.5 w-24 bg-[#6A9489] rounded-full"></div></div>
                        <p className="text-[#4B5563] font-normal leading-relaxed text-base md:text-lg mb-8 max-w-md bg-[#F2F9F6]/50 p-4 rounded-xl">Wij ondersteunen bij integriteitskwesties, fraude of screening van personeel.</p>
                        <div className="mt-auto"><button onClick={onOpenContact} className="inline-flex items-center gap-3 px-6 py-3 bg-[#13261f] text-white font-bold rounded-xl hover:bg-[#6A9489] transition-all">Neem contact op →</button></div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-48 h-40 md:w-64 md:h-56 z-10 pointer-events-none opacity-30 mix-blend-multiply">
                        <img src={`${baseUrl}bedrijf.svg`} alt="" className="w-full h-full object-contain object-bottom-right" />
                    </div>
                </div>
            </FadeInSection>
         </div>
      </section>

      <section ref={expertiseSectionRef} className="relative z-10 max-w-6xl mx-auto px-4 py-12 md:py-16">
        <FadeInSection><div className="text-center mb-12 md:mb-20"><h2 className="text-3xl md:text-4xl font-bold text-[#13261f]">Onze Expertise</h2></div></FadeInSection>
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
           {expertiseItems.map((item, index) => (
               <FadeInSection key={item.id} delay={index * 100} className="h-full">
                   <div className="bg-white p-10 rounded-[2rem] border border-[#E5E7EB] shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col hover:-translate-y-2">
                        <div className="w-14 h-14 bg-[#E8F5EF] rounded-2xl flex items-center justify-center mb-8 text-[#58B895]">{item.icon}</div>
                        <h3 className="text-xl font-bold text-[#13261f] mb-4">{item.title}</h3>
                        <p className="text-[#13261f] font-normal leading-loose text-base mb-6">{item.description}</p>
                        <button onClick={() => onOpenService(item.id)} className="mt-auto text-[#58B895] font-bold text-sm">Lees meer →</button>
                   </div>
               </FadeInSection>
           ))}
        </div>
      </section>

      <section className="relative z-10 px-4 py-8 md:py-12">
          <div className="max-w-7xl mx-auto bg-black text-white py-12 md:py-28 px-6 md:px-12 relative overflow-hidden rounded-[2rem] md:rounded-2xl shadow-2xl">
              <div className="relative z-10">
                  <FadeInSection><div className="text-center mb-12 md:mb-16"><h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Waarom kiezen voor Doddar?</h2></div></FadeInSection>
                  <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                      <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm text-center space-y-4">
                          <div className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-[#58B895]"><ShieldIcon className="w-8 h-8" /></div>
                          <h3 className="text-xl font-bold text-white">Erkend & gecertificeerd</h3>
                          <p className="text-gray-200 leading-relaxed">POB 8766. Wij werken volgens de strengste wettelijke kaders.</p>
                      </div>
                      <div className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center space-y-4">
                          <div className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-[#58B895]"><CheckIcon className="w-8 h-8" /></div>
                          <h3 className="text-xl font-bold text-white">Discreet & integer</h3>
                          <p className="text-gray-200 leading-relaxed">Uw privacy en reputatie staan voorop.</p>
                      </div>
                      <div className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center space-y-4">
                          <div className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center text-[#58B895] mb-6"><LawIcon className="w-8 h-8" /></div>
                          <h3 className="text-xl font-bold text-white">Juridisch onderbouwd</h3>
                          <p className="text-gray-200 leading-relaxed">Objectieve rapportage die standhoudt bij conflicten.</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};

export default Home;