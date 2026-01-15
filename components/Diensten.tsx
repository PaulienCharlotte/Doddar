import React, { useEffect, useState } from 'react';
import { OsintIcon } from './icons/OsintIcon';
import { ObservationIcon } from './icons/ObservationIcon';
import { InterviewIcon } from './icons/InterviewIcon';
import { ShieldIcon } from './icons/ShieldIcon';
import { InvestigationIcon } from './icons/InvestigationIcon';
import { BrainIcon } from './icons/BrainIcon';
import { CheckIcon } from './icons/CheckIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface DienstenProps {
  onStartAnalysis: () => void;
  onContact: () => void;
  scrollToId?: string;
}

const ServiceSection: React.FC<{
  id: string;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}> = ({ id, title, icon, isOpen, onToggle, children }) => {
  return (
    <section 
      id={id} 
      className={`bg-white rounded-[2rem] border transition-all duration-300 overflow-hidden ${isOpen ? 'border-[#58B895] shadow-lg' : 'border-[#E5E7EB] shadow-md hover:shadow-lg'}`}
    >
      <button 
        onClick={onToggle}
        className="w-full flex items-center gap-6 p-6 md:p-8 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${isOpen ? 'bg-[#58B895] text-white' : 'bg-[#E8F5EF] text-[#58B895]'}`}>
          {icon}
        </div>
        <div className="flex-grow">
          <h2 className="text-xl md:text-2xl font-bold text-[#13261f]">{title}</h2>
          {!isOpen && <p className="text-sm text-[#9CA3AF] mt-1 font-medium">Klik om meer te lezen</p>}
        </div>
        <div className={`transform transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDownIcon className="w-6 h-6 text-[#9CA3AF]" />
        </div>
      </button>

      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 md:px-8 pb-8 md:pb-12 pt-2 border-t border-dashed border-[#E5E7EB] mx-2">
          {children}
        </div>
      </div>
    </section>
  );
};

const Diensten: React.FC<DienstenProps> = ({ onStartAnalysis, onContact, scrollToId }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  useEffect(() => {
    if (scrollToId) {
      setOpenSections(prev => ({ ...prev, [scrollToId]: true }));
      setTimeout(() => {
        const element = document.getElementById(scrollToId);
        if (element) {
          const headerOffset = 120;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 100);
    } else {
        window.scrollTo(0, 0);
    }
  }, [scrollToId]);

  return (
    <div className="min-h-screen bg-[#F9FCFA] animate-fade-in relative overflow-hidden pb-24">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-[#F2F9F6] to-[#F9FCFA] -z-10"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E8F5EF]/50 to-transparent -z-10 rounded-bl-[10rem]"></div>

        <header className="relative pt-16 pb-12 md:pt-24 md:pb-20 max-w-6xl mx-auto px-6 z-10">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
                <div className="text-left space-y-6">
                    <span className="inline-block py-1.5 px-5 rounded-full bg-[#E8F5EF] text-[#58B895] text-xs font-bold uppercase tracking-widest border border-[#58B895]/20">
                        Onze Expertise
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#13261f] font-bold tracking-tight leading-[1.1]">
                        Feitenonderzoek & Waarheidsvinding
                    </h1>
                    <p className="text-lg md:text-xl text-[#6B7280] max-w-2xl leading-relaxed">
                        Wij bieden gespecialiseerde onderzoeksdiensten om patronen te objectiveren en juridische bewijslast te versterken.
                    </p>
                </div>
                
                {/* TEST AFBEELDING NAAST TITEL MET EXTERNE LINK */}
                <div className="flex justify-center lg:justify-end">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-[#58B895]/10 rounded-[3rem] blur-2xl transform group-hover:scale-110 transition-transform duration-700"></div>
                        <img 
                            src="https://shimmering-paletas-5d438a.netlify.app/images/bedrijf.svg" 
                            alt="Bedrijf" 
                            className="w-full max-w-[320px] h-auto object-contain relative z-10 drop-shadow-2xl animate-fade-in"
                        />
                        <div className="absolute -bottom-4 right-0 bg-white px-3 py-1 rounded-lg border border-[#E5E7EB] shadow-sm text-[10px] font-mono text-gray-400 z-20">
                            Source: Netlify/images/bedrijf.svg
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 space-y-6 relative z-10 mb-20">
            <ServiceSection id="osint" title="Open Source Intelligence (OSINT)" icon={<OsintIcon className="w-8 h-8" />} isOpen={!!openSections['osint']} onToggle={() => toggleSection('osint')}>
                <div className="space-y-6">
                  <p className="text-[#4B5563] text-lg leading-relaxed">
                    OSINT is het methodisch verzamelen en analyseren van informatie uit openbare bronnen op het internet.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-brand-text"><CheckIcon className="w-5 h-5 text-brand-primary" /> Achtergrondonderzoek van personen</li>
                    <li className="flex items-center gap-3 text-brand-text"><CheckIcon className="w-5 h-5 text-brand-primary" /> Vaststellen van digitale voetafdrukken</li>
                    <li className="flex items-center gap-3 text-brand-text"><CheckIcon className="w-5 h-5 text-brand-primary" /> Analyse van sociale media patronen</li>
                  </ul>
                </div>
            </ServiceSection>

            <ServiceSection id="observatie" title="Observatieonderzoek" icon={<ObservationIcon className="w-8 h-8" />} isOpen={!!openSections['observatie']} onToggle={() => toggleSection('observatie')}>
                <div className="space-y-6">
                  <p className="text-[#4B5563] text-lg leading-relaxed">
                    Soms is fysiek toezicht noodzakelijk om gedragingen feitelijk vast te leggen in de fysieke ruimte.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-brand-text"><CheckIcon className="w-5 h-5 text-brand-primary" /> Discreet vastleggen van activiteiten</li>
                    <li className="flex items-center gap-3 text-brand-text"><CheckIcon className="w-5 h-5 text-brand-primary" /> Verificatie van verblijfplaatsen</li>
                    <li className="flex items-center gap-3 text-brand-text"><CheckIcon className="w-5 h-5 text-brand-primary" /> Feitenrelaas voor juridische procedures</li>
                  </ul>
                </div>
            </ServiceSection>
        </div>

        <section className="bg-black text-white py-24 px-6 relative overflow-hidden rounded-[3rem] mx-4 md:mx-8">
            <div className="absolute inset-0 z-0 opacity-20">
                <img src="https://shimmering-paletas-5d438a.netlify.app/images/bedrijf.svg" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Heeft u een specifieke casus?</h2>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <button onClick={onContact} className="px-10 py-5 bg-[#58B895] hover:bg-[#4AA984] text-white font-bold rounded-2xl transition-all shadow-lg transform hover:-translate-y-1">
                      Neem contact op
                    </button>
                    {onStartAnalysis && (
                        <button onClick={onStartAnalysis} className="px-10 py-5 bg-white/10 border border-white/30 text-white font-bold rounded-2xl transition-all backdrop-blur-md hover:bg-white/20">
                          Start Online Analyse
                        </button>
                    )}
                </div>
            </div>
        </section>
    </div>
  );
};

export default Diensten;