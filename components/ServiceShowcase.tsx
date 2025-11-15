

import React from 'react';
import { OsintIcon } from './icons/OsintIcon';
import { ObservationIcon } from './icons/ObservationIcon';
import { InterviewIcon } from './icons/InterviewIcon';
import type { AanbevolenOnderzoeksmethode } from '../types';

const services = [
  {
    id: "OSINT",
    icon: <OsintIcon className="w-10 h-10 mb-4 text-brand-primary" />,
    name: "OSINT Achtergrondonderzoek",
    description: "Analyse van openbare digitale sporen en online aanwezigheid.",
    price: "Vanaf €145",
  },
  {
    id: "Observatie",
    icon: <ObservationIcon className="w-10 h-10 mb-4 text-brand-primary" />,
    name: "Observatieonderzoek",
    description: "Discreet observeren van gedrag en interacties in de openbare ruimte.",
    price: "Vanaf €95",
  },
  {
    id: "Interview",
    icon: <InterviewIcon className="w-10 h-10 mb-4 text-brand-primary" />,
    name: "Interviewtechnieken",
    description: "Gestructureerd interviewen van betrokkenen voor waarheidsvinding.",
    price: "Vanaf €158",
  }
];

interface OnderzoeksDienstenBannerProps {
  recommendations?: AanbevolenOnderzoeksmethode[] | null;
}

const OnderzoeksDienstenBanner: React.FC<OnderzoeksDienstenBannerProps> = ({ recommendations }) => {
  const safeRecommendations = (recommendations || []).filter(Boolean);
  
  const recommendationMap = safeRecommendations.reduce((acc, rec) => {
    if (rec && rec.id) { // Ensure rec and rec.id exist
      acc[rec.id] = rec;
    }
    return acc;
  }, {} as Record<string, AanbevolenOnderzoeksmethode>);

  return (
    <div className="w-full animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-black">Aanbevolen Onderzoeksmethoden</h2>
        <p className="text-brand-subtle mt-2">
          Op basis van uw casus zijn de volgende diensten het meest relevant.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => {
          const recommendation = recommendationMap[service.id];
          const isRecommended = !!recommendation;
          const cardClasses = `bg-brand-surface p-6 rounded-xl border text-center flex flex-col items-center transition-all duration-300 ${isRecommended ? 'recommended-service-card' : 'border-brand-accent/70 transform hover:-translate-y-1'}`;
          
          // Use AI description if recommended, otherwise static description
          const description = recommendation ? recommendation.omschrijving : service.description;

          return (
            <div key={service.id} className={cardClasses}>
              {isRecommended && <span className="recommended-badge">Aanbevolen</span>}
              {service.icon}
              <h3 className="font-bold text-brand-text text-md">{service.name}</h3>
              <p className="text-sm text-brand-subtle mt-2 flex-grow">{description}</p>
              <div className="mt-4 text-xl font-extrabold text-brand-secondary">{service.price}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-8 text-center">
         <button
            className="px-8 py-4 bg-brand-primary hover:bg-brand-secondary text-white font-semibold rounded-xl shadow-lg transition-all duration-150 transform hover:scale-105"
         >
            Plan een Vrijblijvende Intake
          </button>
      </div>
    </div>
  );
};

export default OnderzoeksDienstenBanner;