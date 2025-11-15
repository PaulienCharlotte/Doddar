

import React from 'react';
import { InvestigationIcon } from './icons/InvestigationIcon';
import type { Onderzoeksmethode } from '../types';

// Local Icon Components based on request
const ShieldCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);

const MessageCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
);


const getIconForMethod = (iconName: string): React.ReactElement => {
    const props = { className: "w-8 h-8 mb-3 text-brand-primary" };
    switch (iconName.toLowerCase()) {
        case 'search': return <InvestigationIcon {...props} />;
        case 'shield-check': return <ShieldCheckIcon {...props} />;
        case 'message-circle':
        case 'gesprek':
             return <MessageCircleIcon {...props} />;
        default: return <InvestigationIcon {...props} />;
    }
};

interface OnderzoeksmethodenDisplayProps {
  methoden: Onderzoeksmethode[];
}

const OnderzoeksmethodenDisplay: React.FC<OnderzoeksmethodenDisplayProps> = ({ methoden }) => {
  const safeMethoden = methoden || [];
  return (
    <div>
      <h3 className="text-lg font-semibold text-black mb-4">
        Aanbevolen Onderzoeksmethoden
      </h3>
      {safeMethoden.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {safeMethoden.map((methode, index) => (
                <div key={index} className="method-tile">
                  {getIconForMethod(methode.icoon)}
                  <h4>{methode.titel}</h4>
                  <p>{methode.omschrijving}</p>
                  <div className="price-estimate">{methode.prijsindicatie}</div>
                </div>
              ))}
          </div>
          <div className="mt-8 text-center">
            <button className="cta-onderzoek">
              Onderzoek direct aanvragen
            </button>
          </div>
        </>
      ) : (
         <p className="text-sm text-brand-subtle bg-brand-surface p-3 rounded-md">Geen specifieke methoden aanbevolen op basis van de huidige informatie.</p>
      )}
    </div>
  );
};

export default OnderzoeksmethodenDisplay;