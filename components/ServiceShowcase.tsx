import React from 'react';
import { OsintIcon } from './icons/OsintIcon';
import { ObservationIcon } from './icons/ObservationIcon';
import { InterviewIcon } from './icons/InterviewIcon';
import { ShieldIcon } from './icons/ShieldIcon';
import { InvestigationIcon } from './icons/InvestigationIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import type { AanbevolenOnderzoeksmethode } from '../types';
import { CheckIcon } from './icons/CheckIcon';
import { MessageCircleIcon } from './icons/MessageCircleIcon';

const services = [
  {
    id: "OSINT",
    icon: <OsintIcon className="w-10 h-10 text-[#58B895]" />,
    name: "OSINT Achtergrondonderzoek",
    defaultDesc: "Digitaal onderzoek in openbare bronnen naar achtergronden, netwerken en online voetafdrukken van betrokkenen.",
    price: "Vanaf €450", 
  },
  {
    id: "Observatie",
    icon: <ObservationIcon className="w-10 h-10 text-[#58B895]" />,
    name: "Observatieonderzoek",
    defaultDesc: "Het feitelijk en discreet vastleggen van gedragingen en interacties in de fysieke ruimte door erkende onderzoekers.",
    price: "Vanaf €750", 
  },
  {
    id: "Interview",
    icon: <InterviewIcon className="w-10 h-10 text-[#58B895]" />,
    name: "Forensische Interviewtechnieken",
    defaultDesc: "Gestructureerde gespreksvoering met getuigen of tegenpartijen om feiten te verifiëren en verklaringen te toetsen.",
    price: "Vanaf €350", 
  },
  {
    id: "Advies",
    icon: <LightbulbIcon className="w-10 h-10 text-[#58B895]" />,
    name: "Advies & Bewustwording",
    defaultDesc: "Strategisch advies over het doorbreken van patronen en het versterken van autonomie en veiligheid.",
    price: "Vanaf €250",
  },
  {
    id: "Screening",
    icon: <ShieldIcon className="w-10 h-10 text-[#58B895]" />,
    name: "Pre-employment Screening",
    defaultDesc: "Toetsing van integriteit en achtergrond van kandidaten binnen de wettelijke kaders van de Wpbr en AVG.",
    price: "Vanaf €350",
  },
  {
    id: "Recherche",
    icon: <InvestigationIcon className="w-10 h-10 text-[#58B895]" />,
    name: "Rechercheonderzoek",
    defaultDesc: "Diepgravend feitenonderzoek naar integriteitsschendingen, fraude of onrechtmatig handelen.",
    price: "Vanaf €750",
  }
];

interface OnderzoeksDienstenBannerProps {
  recommendations?: AanbevolenOnderzoeksmethode[] | null;
}

const OnderzoeksDienstenBanner: React.FC<OnderzoeksDienstenBannerProps> = ({ recommendations }) => {
  const safeRecommendations = (recommendations || []).filter(Boolean);
  
  const recommendationMap = safeRecommendations.reduce((acc, rec) => {
    if (rec && rec.id) {
      acc[rec.id] = rec;
    }
    return acc;
  }, {} as Record<string, AanbevolenOnderzoeksmethode>);

  const hasRecommendations = safeRecommendations.length > 0;

  // Sorteren: Aanbevolen bovenaan
  const sortedServices = [...services].sort((a, b) => {
      const aRec = recommendationMap[a.id] ? 1 : 0;
      const bRec = recommendationMap[b.id] ? 1 : 0;
      return bRec - aRec;
  });

  return (
    <div className="w-full animate-fade-in">
      
      {/* Gratis Intake Highlight Box */}
      <div className="max-w-4xl mx-auto mb-16 bg-[#F2F9F6] border-2 border-dashed border-[#58B895]/40 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="bg-white p-5 rounded-2xl shadow-sm text-[#58B895] flex-shrink-0 border border-[#E5E7EB]">
              <MessageCircleIcon className="w-12 h-12" />
          </div>
          <div className="text-center md:text-left flex-grow">
              <span className="inline-block bg-[#58B895] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4">Standaard Procedure</span>
              <h3 className="text-2xl md:text-3xl font-bold text-[#13261f] mb-3 leading-tight">Altijd eerst een Gratis Intakegesprek</h3>
              <p className="text-[#4B5563] text-base md:text-lg leading-relaxed font-light">
                  Ongeacht de gekozen methode starten wij <strong>nooit</strong> zonder een uitgebreid kosteloos intakegesprek. Hierin bepalen we samen de strategie, haalbaarheid en het budget.
              </p>
          </div>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#13261f] tracking-tight">
            {hasRecommendations ? "Geselecteerde Onderzoeksmethoden" : "Beschikbare Onderzoeksmethoden"}
        </h2>
        <p className="text-[#6B7280] mt-4 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            {hasRecommendations 
                ? "Op basis van uw casus zijn de volgende methoden het meest effectief voor waarheidsvinding."
                : "Bekijk onze gespecialiseerde onderzoeksdiensten."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {sortedServices.map((service) => {
          const isRecommended = !!recommendationMap[service.id];
          
          return (
            <div 
                key={service.id} 
                className={`
                    relative flex flex-col rounded-[2.5rem] transition-all duration-500 h-full group cursor-default
                    ${isRecommended 
                        ? 'bg-white border-[2px] border-[#58B895] shadow-2xl shadow-[#58B895]/10 scale-[1.03] z-10' 
                        : 'bg-white border border-[#E5E7EB] shadow-md hover:shadow-xl hover:border-[#58B895]/30'
                    }
                `}
            >
              {isRecommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#58B895] text-white text-[11px] font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full shadow-lg flex items-center gap-2 whitespace-nowrap z-20">
                      <CheckIcon className="w-4 h-4" /> Meest Relevant
                  </div>
              )}

              <div className="p-8 md:p-10 flex flex-col h-full">
                  <div className="flex-grow flex flex-col items-center text-center px-2">
                    
                    {/* Consistent icon styling based on recommendation status */}
                    <div className="flex justify-center mb-8">
                        <div className={`w-20 h-20 border rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm ${
                            isRecommended 
                            ? 'bg-white border-[#58B895] text-[#58B895]' 
                            : 'bg-[#F9FCFA] border-[#E5E7EB] group-hover:border-[#58B895] group-hover:bg-[#F2F9F6]'
                        }`}>
                            {service.icon}
                        </div>
                    </div>

                    <h3 className={`font-bold text-[#13261f] text-xl md:text-2xl mb-4 leading-tight transition-colors ${isRecommended ? '' : 'group-hover:text-[#58B895]'}`}>
                        {service.name}
                    </h3>
                    
                    {/* Simplified content: only using the validated default description */}
                    <div className="flex-grow mb-10">
                        <p className={`text-base leading-relaxed font-light ${isRecommended ? 'text-[#13261f]' : 'text-[#6B7280]'}`}>
                            {service.defaultDesc}
                        </p>
                    </div>
                  </div>

                  {/* Footer (Price Area) */}
                  <div className={`pt-8 border-t mt-auto flex justify-between items-center ${isRecommended ? 'border-[#B8E2D1]/40' : 'border-[#E5E7EB]'}`}>
                      <div className="text-left">
                          <span className="block text-[10px] text-[#9CA3AF] uppercase font-bold tracking-[0.2em] mb-1">Status</span>
                          <span className="text-xs font-bold text-[#58B895] uppercase tracking-wider">Offertebasis</span>
                      </div>
                      <div className="text-right">
                          <span className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-[0.2em] mb-1">Indicatie</span>
                          <span className="font-bold text-[#13261f] text-xl block leading-none">{service.price}</span>
                      </div>
                  </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-20 text-center max-w-3xl mx-auto">
          <p className="text-base text-[#9CA3AF] leading-relaxed italic font-light">
              * Elk onderzoek is maatwerk. Na een intake ontvang je een heldere kosteninschatting vooraf, gebaseerd op de benodigde inzet en de complexiteit van de casus.
          </p>
      </div>
    </div>
  );
};

export default OnderzoeksDienstenBanner;