
import React from 'react';
import type { AanbevolenOnderzoeksmethode } from '../types';
import { OsintIcon } from './icons/OsintIcon';
import { ObservationIcon } from './icons/ObservationIcon';
import { InterviewIcon } from './icons/InterviewIcon';
import { MessageCircleIcon } from './icons/MessageCircleIcon';

const services = [
  { id: "OSINT", name: "OSINT Achtergrondonderzoek", icon: <OsintIcon className="w-5 h-5" /> },
  { id: "Observatie", name: "Observatieonderzoek", icon: <ObservationIcon className="w-5 h-5" /> },
  { id: "Interview", name: "Interviewtechnieken", icon: <InterviewIcon className="w-5 h-5" /> },
];

interface AdviceServicesListProps {
  recommendations: AanbevolenOnderzoeksmethode[];
  isBevoegd: boolean;
}

const AdviceServicesList: React.FC<AdviceServicesListProps> = ({ recommendations, isBevoegd }) => {
    const recommendationIds = new Set((recommendations || []).map(r => r.id));

    if (!isBevoegd) {
        return (
             <div className="space-y-3 p-4 bg-brand-surface rounded-lg border border-brand-accent">
                <h3 className="text-lg font-bold text-black">Volgende Stappen</h3>
                 <ul className="space-y-2">
                     <li className="flex items-center gap-3 text-sm text-brand-text">
                         <MessageCircleIcon className="w-5 h-5 text-brand-primary flex-shrink-0" />
                         <span>Plan een vrijblijvend intakegesprek om de mogelijkheden te bespreken.</span>
                     </li>
                 </ul>
            </div>
        )
    }

    return (
        <div className="space-y-3 p-4 bg-brand-surface rounded-lg border border-brand-accent">
            <h3 className="text-lg font-bold text-black">Aanbevolen Onderzoeksopties</h3>
            <ul className="space-y-2">
                {services.map(service => {
                    const isRecommended = recommendationIds.has(service.id);
                    if (!isRecommended) return null;
                    return (
                        <li key={service.id} className="flex items-center gap-3 text-sm text-brand-text">
                            <span className="text-brand-primary">{service.icon}</span>
                            <span>{service.name}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default AdviceServicesList;
