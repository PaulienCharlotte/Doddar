import React, { useEffect, useState } from 'react';
import { OsintIcon } from './icons/OsintIcon';
import { ObservationIcon } from './icons/ObservationIcon';
import { InterviewIcon } from './icons/InterviewIcon';
import { ShieldIcon } from './icons/ShieldIcon';
import { InvestigationIcon } from './icons/InvestigationIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { CheckIcon } from './icons/CheckIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface DienstenProps {
  onStartAnalysis: () => void;
  onContact: () => void;
  scrollToId?: string;
}

const PricingTable: React.FC<{ tiers: { label: string; price: string }[] }> = ({ tiers }) => (
  <div className="mt-8 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#F9FCFA]">
    <div className="bg-[#E8F5EF] px-6 py-3 border-b border-[#E5E7EB]">
      <span className="text-[10px] font-bold uppercase tracking-widest text-[#58B895]">Prijsindicatie</span>
    </div>
    <div className="divide-y divide-[#E5E7EB]">
      {tiers.map((tier, idx) => (
        <div key={idx} className="flex justify-between items-center px-6 py-4">
          <span className="text-sm font-medium text-[#13261f]">{tier.label}</span>
          <span className="text-sm font-bold text-[#58B895]">{tier.price}</span>
        </div>
      ))}
    </div>
  </div>
);

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
        <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${isOpen ? 'bg-[#58B895] text-white' : 'bg-[#E8F5EF] text-[#58B895]'}`}>
          {icon}
        </div>
        <div className="flex-grow">
          <h2 className="text-xl md:text-2xl font-bold text-[#13261f]">{title}</h2>
          {!isOpen && <p className="text-xs text-[#9CA3AF] mt-1 font-medium">Klik om meer te lezen</p>}
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
    <div className="min-h-screen bg-[#F9FCFA] animate-fade-in relative overflow-hidden pb-16 md:pb-24">
      {/* Achtergrond Decoratie */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-[#F2F9F6] to-[#F9FCFA] -z-10"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E8F5EF]/50 to-transparent -z-10 rounded-bl-[10rem]"></div>

      {/* Gecentreerde Header */}
      <header className="relative pt-12 pb-12 md:pt-20 md:pb-20 max-w-5xl mx-auto px-6 text-center z-10">
        <div className="flex flex-col items-center">
          <span className="inline-block py-1 px-4 rounded-full bg-[#E8F5EF] border border-[#58B895]/20 text-[#58B895] text-xs font-bold uppercase tracking-widest mb-8">
            Expertise
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#13261f] font-bold tracking-tight leading-[1.1] mb-6 max-w-4xl">
            Feitenonderzoek & Waarheidsvinding
          </h1>
          <p className="text-lg text-[#6B7280] max-w-2xl leading-relaxed mx-auto font-light italic">
            Gespecialiseerde onderzoeksdiensten om patronen te objectiveren en juridische bewijslast te versterken.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 space-y-4 md:space-y-6 relative z-10 mb-20 md:mb-28">
        <ServiceSection id="osint" title="Open Source Intelligence (OSINT)" icon={<OsintIcon className="w-6 h-6" />} isOpen={!!openSections['osint']} onToggle={() => toggleSection('osint')}>
          <div className="space-y-6">
            <p className="text-[#4B5563] text-lg leading-relaxed">
              OSINT is het methodisch verzamelen en analyseren van informatie uit openbare bronnen op het internet. Wij brengen digitale voetafdrukken in kaart die voor anderen verborgen blijven.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-brand-text"><CheckIcon className="w-5 h-5 text-brand-primary" /> Achtergrondonderzoek van personen en organisaties</li>
              <li className="flex items-center gap-3 text-brand-text"><CheckIcon className="w-5 h-5 text-brand-primary" /> Vaststellen van digitale voetafdrukken en netwerken</li>
              <li className="flex items-center gap-3 text-brand-text"><CheckIcon className="w-5 h-5 text-brand-primary" /> Analyse van sociale media patronen en tijdlijnen</li>
            </ul>
            <PricingTable tiers={[
              { label: "Basis OSINT-check", price: "€450 – €900" },
              { label: "Verdiepend onderzoek", price: "€900 – €2.500" },
              { label: "Complexe casussen", price: "Prijs op aanvraag" }
            ]} />
          </div>
        </ServiceSection>

        <ServiceSection id="observatie" title="Observatieonderzoek" icon={<ObservationIcon className="w-6 h-6" />} isOpen={!!openSections['observatie']} onToggle={() => toggleSection('observatie')}>
          <div className="space-y-6">
            <p className="text-[#4B5563] text-lg leading-relaxed">
              Fysieke observatie is vaak de enige manier om gedragingen in de echte wereld onomstotelijk vast te leggen. Wij werken discreet en conform de Privacygedragscode.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-brand-text"><CheckIcon className="w-5 h-5 text-brand-primary" /> Discreet vastleggen van activiteiten en contacten</li>
              <li className="flex items-center gap-3 text-brand-text"><CheckIcon className="w-5 h-5 text-brand-primary" /> Verificatie van verblijfplaatsen en samenwoon-indicaties</li>
              <li className="flex items-center gap-3 text-brand-text"><CheckIcon className="w-5 h-5 text-brand-primary" /> Objectieve rapportage voor juridische procedures</li>
            </ul>
            <PricingTable tiers={[
              { label: "Korte observatie (1–2 dagen)", price: "€750 – €1.500" },
              { label: "Meerdaags onderzoek", price: "€1.500 – €4.000+" },
              { label: "Specialistische inzet", price: "Maatwerk" }
            ]} />
          </div>
        </ServiceSection>

        <ServiceSection id="interview" title="Interview & Lichaamstaal" icon={<InterviewIcon className="w-6 h-6" />} isOpen={!!openSections['interview']} onToggle={() => toggleSection('interview')}>
          <div className="space-y-6">
            <p className="text-[#4B5563] text-lg leading-relaxed">
              Het gesprek is een krachtig instrument voor waarheidsvinding. Wij maken gebruik van forensische interviewtechnieken en analyse van non-verbale signalen.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-brand-text"><CheckIcon className="w-5 h-5 text-brand-primary" /> Gestructureerde gespreksvoering volgens de PEACE-methode</li>
              <li className="flex items-center gap-3 text-brand-text"><CheckIcon className="w-5 h-5 text-brand-primary" /> Herkennen van misleiding en cognitieve belasting</li>
              <li className="flex items-center gap-3 text-brand-text"><CheckIcon className="w-5 h-5 text-brand-primary" /> Confrontatie op basis van feitelijk verzameld bewijs</li>
            </ul>
            <PricingTable tiers={[
              { label: "Intake & analysegesprek", price: "€350 – €750" },
              { label: "Meerdere interviews", price: "€750 – €1.800" },
              { label: "Uitgebreide gedragsanalyse", price: "Maatwerk" }
            ]} />
          </div>
        </ServiceSection>

        <ServiceSection id="advies" title="Advies & Bewustwording" icon={<LightbulbIcon className="w-6 h-6" />} isOpen={!!openSections['advies']} onToggle={() => toggleSection('advies')}>
          <div className="space-y-6">
            <p className="text-[#4B5563] text-lg leading-relaxed">
              Inzicht in gedragsmechanismen is de eerste stap naar veiligheid. Wij adviseren over preventie en het doorbreken van schadelijke patronen.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-brand-text"><CheckIcon className="w-5 h-5 text-brand-primary" /> Duiding van complexe machtsdynamieken</li>
              <li className="flex items-center gap-3 text-brand-text"><CheckIcon className="w-5 h-5 text-brand-primary" /> Strategisch advies bij dreigende conflicten</li>
              <li className="flex items-center gap-3 text-brand-text"><CheckIcon className="w-5 h-5 text-brand-primary" /> Bewustwordingstrainingen voor organisaties</li>
            </ul>
            <PricingTable tiers={[
              { label: "Adviesgesprek", price: "€250 – €500" },
              { label: "Persoonlijk traject", price: "€750 – €1.500" },
              { label: "Organisatieadvies", price: "Maatwerk" }
            ]} />
          </div>
        </ServiceSection>

        <ServiceSection id="screening" title="Pre-employment Screening" icon={<ShieldIcon className="w-6 h-6" />} isOpen={!!openSections['screening']} onToggle={() => toggleSection('screening')}>
          <div className="space-y-6">
            <p className="text-[#4B5563] text-lg leading-relaxed">
              Voorkomen is beter dan genezen. Wij toetsen de integriteit en achtergrond van potentiële kandidaten binnen de wettelijke kaders.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-brand-text"><CheckIcon className="w-5 h-5 text-brand-primary" /> Verificatie van diploma's en werkverleden</li>
              <li className="flex items-center gap-3 text-brand-text"><CheckIcon className="w-5 h-5 text-brand-primary" /> Onderzoek naar integriteitsrisico's en nevenactiviteiten</li>
              <li className="flex items-center gap-3 text-brand-text"><CheckIcon className="w-5 h-5 text-brand-primary" /> Toetsing conform AVG en sectorale richtlijnen</li>
            </ul>
            <PricingTable tiers={[
              { label: "Basis screening", price: "€350 – €700" },
              { label: "Uitgebreide screening", price: "€700 – €1.500" },
              { label: "Risicoprofielen", price: "Maatwerk" }
            ]} />
          </div>
        </ServiceSection>

        <ServiceSection id="recherche" title="Rechercheonderzoek" icon={<InvestigationIcon className="w-6 h-6" />} isOpen={!!openSections['recherche']} onToggle={() => toggleSection('recherche')}>
          <div className="space-y-6">
            <p className="text-[#4B5563] text-lg leading-relaxed">
              Diepgravend feitenonderzoek bij complexe integriteitsschendingen, fraude of onrechtmatig handelen binnen en buiten organisaties.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-brand-text"><CheckIcon className="w-5 h-5 text-brand-primary" /> Onderzoek naar interne diefstal en verduistering</li>
              <li className="flex items-center gap-3 text-brand-text"><CheckIcon className="w-5 h-5 text-brand-primary" /> Vaststellen van onrechtmatige concurrentie of relatiebedingen</li>
              <li className="flex items-center gap-3 text-brand-text"><CheckIcon className="w-5 h-5 text-brand-primary" /> Objectieve bewijsvoering voor civiele of strafrechtelijke procedures</li>
            </ul>
            <PricingTable tiers={[
              { label: "Oriëntatieonderzoek", price: "€750 – €1.500" },
              { label: "Verdiepend onderzoek", price: "€1.500 – €5.000+" },
              { label: "Complexe dossiers", price: "Maatwerk" }
            ]} />
          </div>
        </ServiceSection>
      </div>

      {/* Disclaimer Sectie */}
      <div className="max-w-4xl mx-auto px-6 mb-16 md:mb-24">
        <div className="bg-[#F2F9F6] p-8 rounded-3xl border border-[#58B895]/20 text-center">
          <p className="text-[#6B7280] italic text-base leading-relaxed">
            * Elk onderzoek is maatwerk. De genoemde bedragen zijn indicatief. Na een intakegesprek ontvang je altijd een heldere kosteninschatting vooraf, gebaseerd op de benodigde inzet en onderzoekstrategie.
          </p>
        </div>
      </div>

      {/* COMPACT BANNER VOOR CONTACT */}
      <section className="bg-[#0F1D19] py-16 md:py-24 px-6 relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] mx-4 md:mx-8 shadow-2xl border border-white/5">
        <div className="absolute inset-0 z-0 opacity-10">
          <img src="/images/bedrijf.svg" alt="" className="w-full h-full object-cover scale-110" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-[#0F1D19]/60 to-[#58B895]/20 z-1 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-8 md:mb-10 tracking-tight leading-[1.1]">
            Specifieke casus voorleggen?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6">
            <button
              onClick={onContact}
              className="w-full sm:w-auto px-10 py-5 bg-[#58B895] hover:bg-[#4AA984] text-white font-bold rounded-2xl transition-all shadow-xl shadow-[#58B895]/20 transform hover:-translate-y-0.5 active:scale-95"
            >
              Neem contact op
            </button>
            {onStartAnalysis && (
              <button
                onClick={onStartAnalysis}
                className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/20 text-white font-bold rounded-2xl transition-all backdrop-blur-sm hover:bg-white/10 active:scale-95"
              >
                Start Analyse Tool
              </button>
            )}
          </div>
          <p className="mt-8 text-[#58B895] text-xs md:text-sm font-bold tracking-[0.3em] uppercase">
            Altijd vertrouwelijk & discreet
          </p>
        </div>
      </section>
    </div>
  );
};

export default Diensten;