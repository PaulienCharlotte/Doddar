import React from 'react';
import { OsintIcon } from './icons/OsintIcon';
import { ObservationIcon } from './icons/ObservationIcon';
import { InterviewIcon } from './icons/InterviewIcon';
import type { AanbevolenOnderzoeksmethode } from '../types';
import { CheckIcon } from './icons/CheckIcon';
import { MessageCircleIcon } from './icons/MessageCircleIcon';

const services = [
  {
    id: "OSINT",
    icon: <OsintIcon className="w-8 h-8 text-[#58B895]" />,
    name: "OSINT Achtergrondonderzoek",
    defaultDesc: "Digitaal onderzoek in openbare bronnen naar achtergronden, netwerken en online voetafdrukken van betrokkenen.",
    price: "Vanaf €145",
  },
  {
    id: "Observatie",
    icon: <ObservationIcon className="w-8 h-8 text-[#58B895]" />,
    name: "Observatieonderzoek",
    defaultDesc: "Het feitelijk en discreet vastleggen van gedragingen en interacties in de fysieke ruimte door erkende onderzoekers.",
    price: "Vanaf €95 / uur",
  },
  {
    id: "Interview",
    icon: <InterviewIcon className="w-8 h-8 text-[#58B895]" />,
    name: "Forensische Interviewtechnieken",
    defaultDesc: "Gestructureerde gespreksvoering met getuigen of tegenpartijen om feiten te verifiëren en verklaringen te toetsen.",
    price: "Vanaf €158",
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

  return (
    <div className="w-full animate-fade-in">
      
      {/* Gratis Intake Highlight Box */}
      <div className="max-w-4xl mx-auto mb-16 bg-[#F2F9F6] border-2 border-dashed border-[#58B895]/40 rounded-[2rem] p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 shadow-sm">
          <div className="bg-white p-4 rounded-2xl shadow-sm text-[#58B895] flex-shrink-0 border border-[#E5E7EB]">
              <MessageCircleIcon className="w-10 h-10" />
          </div>
          <div className="text-center md:text-left flex-grow">
              <span className="inline-block bg-[#58B895] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-3">Standaard Procedure</span>
              <h3 className="text-xl md:text-2xl font-bold text-[#13261f] mb-2">Altijd eerst een Gratis Intakegesprek</h3>
              <p className="text-[#6B7280] text-sm md:text-base leading-relaxed">
                  Ongeacht de gekozen methode starten wij <strong>nooit</strong> zonder een uitgebreid kosteloos intakegesprek. Hierin bepalen we samen de strategie, haalbaarheid en het budget.
              </p>
          </div>
      </div>

      <div className="text-center mb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-[#13261f]">
            {hasRecommendations ? "Geselecteerde Onderzoeksmethoden" : "Beschikbare Onderzoeksmethoden"}
        </h2>
        <p className="text-[#6B7280] mt-4 max-w-2xl mx-auto text-base leading-relaxed">
            {hasRecommendations 
                ? "Op basis van uw casus zijn de volgende methoden het meest effectief voor waarheidsvinding."
                : "Bekijk onze gespecialiseerde onderzoeksdiensten."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {services.map((service) => {
          const recommendation = recommendationMap[service.id];
          const isRecommended = !!recommendation;
          // Verwijder de "dimmed" look; vervang door subtielere differentiatie
          
          return (
            <div 
                key={service.id} 
                className={`
                    relative flex flex-col rounded-[2.5rem] transition-all duration-500 h-full group cursor-default
                    ${isRecommended 
                        ? 'bg-white border-[2px] border-[#58B895] shadow-xl shadow-[#58B895]/10 scale-[1.02] z-10' 
                        : 'bg-white border border-[#E5E7EB] shadow-md hover:shadow-lg hover:border-[#58B895]/30'
                    }
                `}
            >
              {isRecommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#58B895] text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md flex items-center gap-2 whitespace-nowrap z-20">
                      <CheckIcon className="w-3.5 h-3.5" /> Meest Relevant
                  </div>
              )}

              <div className="p-8 flex flex-col h-full">
                  {isRecommended ? (
                      /* AANBEVOLEN LAYOUT */
                      <div className="flex-grow bg-[#F2F9F6] p-6 rounded-3xl border border-[#B8E2D1]/40 mb-6 flex flex-col items-center text-center relative">
                          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#58B895] shadow-sm mb-5 border border-[#E5E7EB]">
                              {service.icon}
                          </div>
                          
                          <h3 className="font-bold text-[#13261f] text-lg mb-3 leading-tight break-words w-full">
                              {service.name}
                          </h3>
                          
                          <div className="w-12 h-1 bg-[#B8E2D1] rounded-full mb-4"></div>

                          <p className="text-[10px] font-bold text-[#6A9489] mb-2 uppercase tracking-widest">Maatwerk Toepassing</p>
                          <p className="text-sm text-[#374151] leading-relaxed italic">
                              "{recommendation.omschrijving}"
                          </p>
                      </div>
                  ) : (
                      /* STANDAARD LAYOUT */
                      <div className="flex-grow flex flex-col items-center text-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-[#F9FCFA] border border-[#E5E7EB] rounded-2xl flex items-center justify-center group-hover:border-[#58B895] group-hover:bg-[#F2F9F6] transition-all duration-300">
                                {service.icon}
                            </div>
                        </div>

                        <h3 className="font-bold text-[#13261f] text-lg mb-4 leading-tight px-2 group-hover:text-[#58B895] transition-colors">
                            {service.name}
                        </h3>
                        
                        <div className="flex-grow mb-8">
                            <p className="text-sm text-[#6B7280] leading-relaxed px-2 font-light">
                                {service.defaultDesc}
                            </p>
                        </div>
                      </div>
                  )}

                  {/* Footer (Price only) */}
                  <div className="pt-6 border-t border-[#E5E7EB] mt-auto flex justify-between items-end">
                      <div className="text-left">
                          <span className="block text-[9px] text-[#9CA3AF] uppercase font-bold tracking-widest mb-1">Status</span>
                          <span className="text-[11px] font-bold text-[#58B895] uppercase">Offertebasis</span>
                      </div>
                      <div className="text-right">
                          <span className="text-[9px] text-[#9CA3AF] uppercase font-bold tracking-widest mb-1">Indicatie</span>
                          <span className="font-bold text-[#13261f] text-lg block leading-none">{service.price}</span>
                      </div>
                  </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-sm text-[#9CA3AF] leading-relaxed italic">
              * Genoemde bedragen zijn indicaties voor de uitvoering van het feitelijk onderzoek. Een intake is altijd noodzakelijk om de juridische haalbaarheid en definitieve kosten te bepalen.
          </p>
      </div>
    </div>
  );
};

export default OnderzoeksDienstenBanner;