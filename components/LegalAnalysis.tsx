import React, { useState } from 'react';
import type { WettelijkeOvertreding, BevoegdheidscheckResult } from '../types';
import { LegalIcon } from './icons/LegalIcon';
import { LawIcon } from './icons/LawIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { CheckIcon } from './icons/CheckIcon';
import { WarningIcon } from './icons/WarningIcon';
import { InfoIcon } from './icons/InfoIcon';
import Tooltip from './Tooltip';

interface LegalAnalysisProps {
  overtredingen: WettelijkeOvertreding[];
  bevoegdheidscheck: BevoegdheidscheckResult;
  juridischeOpmerking: string;
}

const frameworkExplanations: Record<string, string> = {
  'AVG': 'Algemene verordening gegevensbescherming (GDPR). Deze wet regelt de verwerking en bescherming van persoonsgegevens in de EU.',
  'Wpbr': 'Wet particuliere beveiligingsorganisaties en recherchebureaus. Deze wet stelt eisen aan de betrouwbaarheid en professionaliteit van recherchebureaus in Nederland.',
};

const FrameworkTag: React.FC<{ kader: string }> = ({ kader }) => (
  <Tooltip content={frameworkExplanations[kader.toUpperCase()] || 'Specifiek juridisch kader relevant voor deze casus.'}>
    <span className="framework-tag cursor-pointer">{kader}</span>
  </Tooltip>
);


const LegalAnalysis: React.FC<LegalAnalysisProps> = ({ overtredingen, bevoegdheidscheck, juridischeOpmerking }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const safeOvertredingen = (overtredingen || []).filter(Boolean);
  const check = bevoegdheidscheck || { is_bevoegd: false, motivering: '', kaders: [] };
  const { is_bevoegd, motivering, kaders } = check;


  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-black flex items-center gap-2 mb-3">
        <LegalIcon className="w-5 h-5"/> Juridische Analyse
      </h3>
      
      {/* Indicatie Juridische Grondslag */}
      <div className={`p-4 rounded-lg flex items-start gap-4 mb-4 ${is_bevoegd ? 'bg-status-safe/10 border border-status-safe/30' : 'bg-status-warning/10 border border-status-warning/30'}`}>
          <div>
              {is_bevoegd ? (
                  <CheckIcon className="w-8 h-8 text-status-safe flex-shrink-0" />
              ) : (
                  <WarningIcon className="w-8 h-8 text-status-warning flex-shrink-0" />
              )}
          </div>
          <div className="flex-grow">
              <h4 className={`font-bold ${is_bevoegd ? 'text-status-safe' : 'text-status-warning'}`}>
                  Indicatie Juridische Grondslag: {is_bevoegd ? 'Aanwezig' : 'Nader Onderzoek Vereist'}
              </h4>
              
              <div className="flex items-center gap-1.5 mt-2">
                  <p className="text-sm font-semibold text-brand-text">Motivering</p>
                  <Tooltip content="De 'juridische grondslag' bepaalt of een onderzoek wettelijk is toegestaan (bijv. o.b.v. 'gerechtvaardigd belang' in de AVG). Een formele intake is altijd nodig om dit definitief vast te stellen.">
                      <InfoIcon className="w-4 h-4 text-brand-secondary cursor-pointer" />
                  </Tooltip>
              </div>
              <p className="text-sm text-brand-text mt-1">
                  {motivering}
              </p>

              {kaders && kaders.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-semibold text-brand-text mb-2">Relevante kaders:</p>
                  <div className="flex flex-wrap gap-2">
                    {kaders.map(kader => <FrameworkTag key={kader} kader={kader} />)}
                  </div>
                </div>
              )}
               <a href="https://autoriteitpersoonsgegevens.nl/themas/avg-privacy/avg-algemeen/gerechtvaardigd-belang" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline font-semibold mt-3 inline-block">
                Meer informatie &rarr;
              </a>
          </div>
      </div>
      
      {/* Mogelijke Wettelijke Overtredingen */}
      <div className="space-y-2">
        {safeOvertredingen.length > 0 ? (
          safeOvertredingen.map((wet, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="bg-brand-surface rounded-md">
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex justify-between items-center text-left p-3"
                  aria-expanded={isOpen}
                  aria-controls={`legal-content-${index}`}
                >
                  <p className="font-bold text-brand-text flex items-center gap-2 text-sm">
                    <LawIcon className="w-4 h-4 text-brand-secondary"/>
                    {wet.wetboek} - {wet.artikel}
                  </p>
                  <ChevronDownIcon className={`w-5 h-5 text-brand-subtle transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <div
                  id={`legal-content-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-3 pb-3 space-y-2">
                    <p className="text-brand-subtle text-sm">{wet.omschrijving}</p>
                    <a 
                      href={wet.bron}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-brand-primary hover:underline font-semibold"
                    >
                      Bekijk bron (wetten.nl) &rarr;
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-brand-subtle bg-brand-surface p-3 rounded-md">Op basis van de verstrekte informatie zijn er geen directe wettelijke overtredingen geïdentificeerd.</p>
        )}
      </div>
      
      {juridischeOpmerking && (
          <div className="bg-brand-surface/70 p-3 rounded-xl border border-brand-accent/50 mt-4">
              <p className="text-xs text-brand-subtle italic">{juridischeOpmerking}</p>
          </div>
      )}
    </div>
  );
};

export default LegalAnalysis;