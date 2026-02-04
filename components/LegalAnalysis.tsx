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
  'AVG': 'Algemene verordening gegevensbescherming. Regelt de rechtmatige verwerking van persoonsgegevens.',
  'WPBR': 'Wet particuliere beveiligingsorganisaties en recherchebureaus. Het wettelijk kader voor erkende rechercheurs.',
  'PRIVACYGEDRAGSCODE': 'Specifieke gedragscode voor de sector particulier onderzoek, goedgekeurd door de Autoriteit Persoonsgegevens.',
};

const FrameworkTag: React.FC<{ kader: string }> = ({ kader }) => (
  <Tooltip content={frameworkExplanations[kader.toUpperCase().replace(/\s/g, '')] || 'Onderzoeksgericht juridisch kader.'}>
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
        <LegalIcon className="w-5 h-5" /> Juridische Analyse
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
            <Tooltip content="Als erkend recherchebureau inventariseert Doddar of er een 'gerechtvaardigd belang' is voor een onderzoek. Deze AI-indicatie vervangt geen formele intake door een bevoegd onderzoeker.">
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
                {kaders.map(kader => {
                  // Filter uit "psycholoog" indien de AI het toch genereert
                  if (kader.toLowerCase().includes('psycholoog')) return null;
                  return <FrameworkTag key={kader} kader={kader} />;
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mogelijke Wettelijke Overtredingen */}
      <div className="space-y-2">
        {safeOvertredingen.length > 0 ? (
          safeOvertredingen.map((wet, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="bg-brand-surface rounded-md border border-brand-accent/30">
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex justify-between items-center text-left p-3"
                  aria-expanded={isOpen}
                >
                  <div className="flex flex-col">
                    <p className="font-bold text-brand-text flex items-center gap-2 text-sm">
                      <LawIcon className="w-4 h-4 text-brand-secondary" />
                      {wet.artikel}
                    </p>
                    <span className="text-[10px] text-brand-subtle uppercase font-bold tracking-wider mt-0.5">{wet.wetboek}</span>
                  </div>
                  <ChevronDownIcon className={`w-5 h-5 text-brand-subtle transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-3 pb-4 space-y-3">
                    <div className="h-px bg-brand-accent/50 w-full mb-3"></div>
                    <p className="text-brand-text text-sm leading-relaxed">{wet.omschrijving}</p>
                    {wet.bron && (
                      <div className="bg-white/50 p-2 rounded text-[11px] text-brand-subtle italic border-l-2 border-brand-secondary">
                        Bron: {wet.bron}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-brand-subtle bg-brand-surface p-3 rounded-md">Geen directe wettelijke indicatoren vastgesteld.</p>
        )}
      </div>

      {juridischeOpmerking && (
        <div className="bg-brand-surface/70 p-3 rounded-xl border border-brand-accent/50 mt-4">
          <p className="text-[11px] text-brand-subtle italic leading-relaxed">{juridischeOpmerking}</p>
        </div>
      )}
    </div>
  );
};

export default LegalAnalysis;