
import React from 'react';
import { WarningIcon } from './icons/WarningIcon';

const UnauthorizedPathways: React.FC = () => {
  return (
    <div className="w-full animate-fade-in">
      <div className="bg-brand-light border border-brand-accent/50 rounded-xl p-6 flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
            <WarningIcon className="w-6 h-6 text-brand-secondary" />
        </div>
        <div>
            <h3 className="font-bold text-[#2F3E37] text-lg mb-2">Let op: Bevestigd mandaat vereist</h3>
            <p className="text-brand-text text-sm leading-relaxed max-w-3xl">
                Voor het starten van een formeel particulier onderzoek (zoals hieronder aanbevolen) is een <strong>gerechtvaardigd belang</strong> noodzakelijk. 
                Op basis van uw antwoorden staat dit nog niet vast. Wij tonen u de relevante methoden ter informatie, maar voor de uitvoering is eerst een intakegesprek nodig.
            </p>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPathways;
