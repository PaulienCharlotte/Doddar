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
      // Open the target section
      setOpenSections(prev => ({ ...prev, [scrollToId]: true }));

      setTimeout(() => {
        const element = document.getElementById(scrollToId);
        if (element) {
          const headerOffset = 120;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    } else {
        window.scrollTo(0, 0);
    }
  }, [scrollToId]);

  return (
    <div className="min-h-screen bg-[#F9FCFA] animate-fade-in relative overflow-hidden">
        
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-[#F2F9F6] to-[#F9FCFA] -z-10"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E8F5EF]/50 to-transparent -z-10 rounded-bl-[10rem]"></div>

        {/* Header */}
        <header className="relative pt-16 pb-16 md:pt-24 md:pb-24 max-w-5xl mx-auto px-6 text-center">
            <span className="inline-block py-1 px-4 rounded-full bg-[#E8F5EF] border border-[#58B895]/20 text-[#58B895] text-xs font-bold uppercase tracking-widest mb-8">
                Onze Expertise
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl text-[#13261f] font-medium leading-tight md:leading-snug mb-6">
                Feitenonderzoek & Waarheidsvinding
            </h1>
            <p className="text-lg text-[#4B5563] leading-relaxed max-w-3xl mx-auto">
                Doddar levert gespecialiseerde onderzoeksdiensten voor zowel particuliere als zakelijke vraagstukken. 
                Wij werken strikt binnen de wettelijke kaders (Wpbr, AVG) en leveren objectieve rapportages die dienen als fundament voor uw besluitvorming.
            </p>
        </header>

        <div className="max-w-4xl mx-auto px-6 pb-24 space-y-6">
            
            {/* 1. OSINT */}
            <ServiceSection
              id="osint"
              title="Open Source Intelligence (OSINT)"
              icon={<OsintIcon className="w-8 h-8" />}
              isOpen={!!openSections['osint']}
              onToggle={() => toggleSection('osint')}
            >
                <div>
                    <p className="text-[#4B5563] text-lg leading-loose mb-6">
                        Het internet vergeet niets, maar informatie is vaak versnipperd. OSINT is het methodisch verzamelen en analyseren van informatie uit openbare bronnen. Wij brengen digitale voetafdrukken, netwerken en achtergronden in kaart.
                    </p>
                    <div className="bg-[#F9FCFA] rounded-xl p-6 border border-[#E5E7EB] mb-8">
                        <h4 className="font-bold text-[#13261f] text-sm mb-3 uppercase tracking-wider">Toepassingen</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-[#4B5563]">
                                <CheckIcon className="w-4 h-4 text-[#58B895] mt-0.5 flex-shrink-0" />
                                Achtergrondonderzoek naar personen of zakenpartners.
                            </li>
                            <li className="flex items-start gap-3 text-sm text-[#4B5563]">
                                <CheckIcon className="w-4 h-4 text-[#58B895] mt-0.5 flex-shrink-0" />
                                Opsporen van verborgen activa (bij echtscheiding of faillissement).
                            </li>
                            <li className="flex items-start gap-3 text-sm text-[#4B5563]">
                                <CheckIcon className="w-4 h-4 text-[#58B895] mt-0.5 flex-shrink-0" />
                                Identificatie van anonieme accounts bij cyberstalking of smaad.
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#9CA3AF] font-medium border-t border-[#E5E7EB] pt-4">
                        <ShieldIcon className="w-4 h-4" />
                        <span>Conform Privacygedragscode: uitsluitend openbare bronnen.</span>
                    </div>
                </div>
            </ServiceSection>

            {/* 2. OBSERVATIE */}
            <ServiceSection
              id="observatie"
              title="Observatieonderzoek"
              icon={<ObservationIcon className="w-8 h-8" />}
              isOpen={!!openSections['observatie']}
              onToggle={() => toggleSection('observatie')}
            >
                <div>
                    <p className="text-[#4B5563] text-lg leading-loose mb-6">
                        Soms is fysiek toezicht noodzakelijk om de waarheid te achterhalen. Observatie levert objectief bewijs van gedragingen en activiteiten in de openbare ruimte, los van verklaringen of vermoedens.
                    </p>
                    <div className="bg-[#F9FCFA] rounded-xl p-6 border border-[#E5E7EB] shadow-sm mb-8">
                        <h4 className="font-bold text-[#13261f] text-sm mb-3 uppercase tracking-wider">Toepassingen</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-[#4B5563]">
                                <CheckIcon className="w-4 h-4 text-[#58B895] mt-0.5 flex-shrink-0" />
                                Controle bij ziekteverzuim (verdenking nevenwerkzaamheden).
                            </li>
                            <li className="flex items-start gap-3 text-sm text-[#4B5563]">
                                <CheckIcon className="w-4 h-4 text-[#58B895] mt-0.5 flex-shrink-0" />
                                Vaststellen samenwonen bij partneralimentatie.
                            </li>
                            <li className="flex items-start gap-3 text-sm text-[#4B5563]">
                                <CheckIcon className="w-4 h-4 text-[#58B895] mt-0.5 flex-shrink-0" />
                                Onderzoek naar interne diefstal of fraude.
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#9CA3AF] font-medium border-t border-[#E5E7EB] pt-4">
                        <ShieldIcon className="w-4 h-4" />
                        <span>Uitgevoerd volgens strikte proportionaliteitseisen.</span>
                    </div>
                </div>
            </ServiceSection>

            {/* 3. INTERVIEW */}
            <ServiceSection
              id="interview"
              title="Interview & Verhoor"
              icon={<InterviewIcon className="w-8 h-8" />}
              isOpen={!!openSections['interview']}
              onToggle={() => toggleSection('interview')}
            >
                <div>
                    <p className="text-[#4B5563] text-lg leading-loose mb-6">
                        Het gesprek is een krachtig instrument voor waarheidsvinding. Wij hanteren ethische interviewtechnieken om verklaringen te toetsen, informatie te verkrijgen en hoor en wederhoor toe te passen.
                    </p>
                    <div className="bg-[#F9FCFA] rounded-xl p-6 border border-[#E5E7EB] mb-8">
                        <h4 className="font-bold text-[#13261f] text-sm mb-3 uppercase tracking-wider">Methodiek</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-[#4B5563]">
                                <CheckIcon className="w-4 h-4 text-[#58B895] mt-0.5 flex-shrink-0" />
                                <strong>Verklaringanalyse:</strong> Toetsen op consistentie en hiaten.
                            </li>
                            <li className="flex items-start gap-3 text-sm text-[#4B5563]">
                                <CheckIcon className="w-4 h-4 text-[#58B895] mt-0.5 flex-shrink-0" />
                                <strong>Wederhoor:</strong> Betrokkenen de kans geven hun kant van het verhaal te vertellen (essentieel voor juridische dossiers).
                            </li>
                            <li className="flex items-start gap-3 text-sm text-[#4B5563]">
                                <CheckIcon className="w-4 h-4 text-[#58B895] mt-0.5 flex-shrink-0" />
                                <strong>Confronterend gesprek:</strong> Professioneel confronteren met bevindingen.
                            </li>
                        </ul>
                    </div>
                </div>
            </ServiceSection>

            {/* 4. Screening */}
            <ServiceSection
              id="screening"
              title="Pre-employment Screening"
              icon={<ShieldIcon className="w-8 h-8" />}
              isOpen={!!openSections['screening']}
              onToggle={() => toggleSection('screening')}
            >
                <div>
                    <p className="text-[#4B5563] text-lg leading-loose mb-6">
                        Integriteit begint bij de poort. Weet met wie u in zee gaat. Wij verifiëren de achtergrond, kwalificaties en integriteit van potentiële medewerkers of zakelijke partners.
                    </p>
                    <div className="bg-[#F9FCFA] rounded-xl p-6 border border-[#E5E7EB] shadow-sm mb-8">
                        <h4 className="font-bold text-[#13261f] text-sm mb-3 uppercase tracking-wider">Controles</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-[#4B5563]">
                                <CheckIcon className="w-4 h-4 text-[#58B895] mt-0.5 flex-shrink-0" />
                                Verificatie van diploma's en CV (op echtheid).
                            </li>
                            <li className="flex items-start gap-3 text-sm text-[#4B5563]">
                                <CheckIcon className="w-4 h-4 text-[#58B895] mt-0.5 flex-shrink-0" />
                                Analyse van nevenactiviteiten en belangenverstrengeling.
                            </li>
                            <li className="flex items-start gap-3 text-sm text-[#4B5563]">
                                <CheckIcon className="w-4 h-4 text-[#58B895] mt-0.5 flex-shrink-0" />
                                Toetsing integriteit en online profiel.
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#9CA3AF] font-medium border-t border-[#E5E7EB] pt-4">
                        <ShieldIcon className="w-4 h-4" />
                        <span>Conform AVG: Altijd met toestemming van de kandidaat.</span>
                    </div>
                </div>
            </ServiceSection>

            {/* 5. Recherche & Advies */}
            <ServiceSection
              id="recherche"
              title="Toedrachtonderzoek & Advies"
              icon={<InvestigationIcon className="w-8 h-8" />}
              isOpen={!!openSections['recherche']}
              onToggle={() => toggleSection('recherche')}
            >
                <div>
                    <p className="text-[#4B5563] text-lg leading-loose mb-6">
                        Bij incidenten zoals diefstal, verduistering of grensoverschrijdend gedrag reconstrueren wij de feiten. Wij leveren geen oordeel, maar een objectief dossier waarmee u juridische stappen kunt onderbouwen.
                    </p>
                    <div className="bg-[#F9FCFA] rounded-xl p-6 border border-[#E5E7EB] mb-8">
                        <h4 className="font-bold text-[#13261f] text-sm mb-3 uppercase tracking-wider">Wat wij leveren</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-[#4B5563]">
                                <CheckIcon className="w-4 h-4 text-[#58B895] mt-0.5 flex-shrink-0" />
                                Een feitelijk onderzoeksrapport, bruikbaar in juridische procedures.
                            </li>
                            <li className="flex items-start gap-3 text-sm text-[#4B5563]">
                                <CheckIcon className="w-4 h-4 text-[#58B895] mt-0.5 flex-shrink-0" />
                                Advies over preventie en risicobeheersing om herhaling te voorkomen.
                            </li>
                        </ul>
                    </div>
                </div>
            </ServiceSection>

        </div>

        {/* CTA Section */}
        <section className="bg-black text-white py-24 px-6 relative overflow-hidden">
            
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://raw.githubusercontent.com/PaulienCharlotte/Doddar/refs/heads/main/images/contact.svg" 
                    alt="" 
                    className="w-full h-full object-contain" 
                />
                {/* Subtle overlay for text readability without hiding the image */}
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight drop-shadow-md">
                    Heeft u een specifieke casus?
                </h2>
                <p className="text-lg md:text-xl text-white mb-10 leading-relaxed max-w-2xl mx-auto font-medium drop-shadow-md">
                    Elke situatie is uniek. Neem contact op voor een vrijblijvend intakegesprek om de mogelijkheden en juridische haalbaarheid te bespreken.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                        onClick={onContact}
                        className="px-8 py-4 bg-[#58B895] hover:bg-[#4AA984] text-white font-bold rounded-xl shadow-lg transition-all duration-300"
                    >
                        Neem contact op
                    </button>
                    {onStartAnalysis && (
                        <button 
                            onClick={onStartAnalysis}
                            className="px-8 py-4 bg-black/30 border border-white/50 hover:bg-black/50 text-white font-medium rounded-xl transition-all duration-300 backdrop-blur-sm"
                        >
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