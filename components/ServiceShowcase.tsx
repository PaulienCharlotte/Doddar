
import React from 'react';
import { OsintIcon } from './icons/OsintIcon';
import { ObservationIcon } from './icons/ObservationIcon';
import { InterviewIcon } from './icons/InterviewIcon';
import type { AanbevolenOnderzoeksmethode } from '../types';
import { CheckIcon } from './icons/CheckIcon';

const services = [
  {
    id: "OSINT",
    icon: <OsintIcon className="w-8 h-8 text-[#58B895]" />,
    name: "OSINT Achtergrondonderzoek",
    defaultDesc: "Digitaal onderzoek in openbare bronnen naar achtergronden, netwerken en online voetafdrukken.",
    price: "Vanaf €145",
  },
  {
    id: "Observatie",
    icon: <ObservationIcon className="w-8 h-8 text-[#58B895]" />,
    name: "Observatieonderzoek",
    defaultDesc: "Discreet en feitelijk vastleggen van gedragingen en interacties in de fysieke ruimte.",
    price: "Vanaf €95 / uur",
  },
  {
    id: "Interview",
    icon: <InterviewIcon className="w-8 h-8 text-[#58B895]" />,
    name: "Interviewtechnieken",
    defaultDesc: "Gestructureerde interviews met betrokkenen om waarheid en leugens te onderscheiden.",
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
      <div className="text-center mb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2F3E37]">
            {hasRecommendations ? "Aanbevolen Onderzoeksmethoden" : "Beschikbare Onderzoeksmethoden"}
        </h2>
        <p className="text-[#6B7280] mt-4 max-w-2xl mx-auto text-base leading-relaxed">
            {hasRecommendations 
                ? "Op basis van de gedragsanalyse en risico-indicatoren sluiten deze methoden het beste aan bij uw situatie."
                : "Bekijk onze gespecialiseerde diensten voor waarheidsvinding."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 items-stretch">
        {services.map((service) => {
          const recommendation = recommendationMap[service.id];
          const isRecommended = !!recommendation;
          
          // Als er aanbevelingen zijn, dimmen we de niet-geselecteerde opties iets voor focus
          const isDimmed = hasRecommendations && !isRecommended;

          return (
            <div 
                key={service.id} 
                className={`
                    relative flex flex-col rounded-3xl transition-all duration-300 h-full group
                    ${isRecommended 
                        ? 'bg-white border-[2px] border-[#58B895] shadow-xl shadow-[#58B895]/10 scale-[1.01] z-10' 
                        : 'bg-[#F9FCFA] border border-[#E5E7EB] shadow-sm hover:shadow-md'
                    }
                    ${isDimmed ? 'opacity-60 grayscale-[0.3] hover:opacity-100 hover:grayscale-0' : ''}
                `}
            >
              {isRecommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#58B895] text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md flex items-center gap-2 whitespace-nowrap z-20">
                      <CheckIcon className="w-3.5 h-3.5" /> Aanbevolen
                  </div>
              )}

              <div className="p-8 md:p-10 flex flex-col h-full">
                  {/* Icon Header */}
                  <div className="flex justify-center mb-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-300 ${isRecommended ? 'bg-[#F2F9F6]' : 'bg-white border border-[#E5E7EB] group-hover:border-[#B8E2D1]'}`}>
                          {service.icon}
                      </div>
                  </div>

                  <h3 className="font-bold text-[#2F3E37] text-lg mb-6 text-center leading-tight">
                      {service.name}
                  </h3>
                  
                  {/* Content Area - Flex Grow pushes footer down */}
                  <div className="flex-grow mb-8">
                      {isRecommended ? (
                          <div className="bg-[#F2F9F6] p-5 rounded-2xl border border-[#B8E2D1]/40 h-full relative">
                              {/* Little arrow pointing up to title/icon implied context */}
                              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#F2F9F6] border-t border-l border-[#B8E2D1]/40 transform rotate-45"></div>
                              
                              <p className="text-[10px] font-bold text-[#6A9489] mb-2 uppercase tracking-wider text-center">Toepassing in uw casus</p>
                              <p className="text-sm text-[#374151] leading-relaxed text-center">
                                  {recommendation.omschrijving}
                              </p>
                          </div>
                      ) : (
                          <p className="text-sm text-[#6B7280] leading-relaxed text-center px-2">
                              {service.defaultDesc}
                          </p>
                      )}
                  </div>

                  {/* Footer (Price + Button) */}
                  <div className="pt-6 border-t border-[#E5E7EB] mt-auto">
                      <div className="flex items-center justify-between gap-4">
                          <div className="flex flex-col">
                              <span className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-wider">Indicatie</span>
                              <span className="font-bold text-[#2F3E37] text-lg">{service.price}</span>
                          </div>
                          <button className={`text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-sm ${
                              isRecommended 
                              ? 'bg-[#58B895] text-white hover:bg-[#4AA984] hover:shadow-md hover:-translate-y-0.5' 
                              : 'text-[#4B5563] bg-white border border-[#E5E7EB] hover:bg-gray-50'
                          }`}>
                              Meer info
                          </button>
                      </div>
                  </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 text-center">
         <button
            onClick={() => alert("Neem contact op via info@doddar.nl voor een intake.")}
            className="px-10 py-4 bg-[#58B895] hover:bg-[#4AA984] text-white font-bold rounded-xl shadow-lg shadow-[#58B895]/20 transition-all duration-200 transform hover:-translate-y-1 text-lg"
         >
            Plan een Vrijblijvende Intake
          </button>
          <p className="mt-4 text-sm text-[#9CA3AF]">
              Een intake is noodzakelijk om de juridische haalbaarheid en strategie te bepalen.
          </p>
      </div>
    </div>
  );
};

export default OnderzoeksDienstenBanner;
