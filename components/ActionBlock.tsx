

import React from 'react';
import type { Advies } from '../types';
import { ShieldIcon } from './icons/ShieldIcon';
import { WarningIcon } from './icons/WarningIcon';
import { StepsIcon } from './icons/StepsIcon';

const AdviesDisplay: React.FC<{ advies: Advies }> = ({ advies }) => {
  const { minderjarig, veiligheidsadvies, professioneel_advies, juridische_opmerking } = advies;

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Advies & Volgende Stappen</h2>
      
      {minderjarig && (
        <div className="bg-status-danger/10 border-l-4 border-status-danger text-status-danger p-4 rounded-r-lg" role="alert">
          <div className="flex">
            <div className="py-1"><WarningIcon className="h-6 w-6 mr-4" /></div>
            <div>
              <p className="font-bold">Let op: Minderjarige Betrokken</p>
              <p className="text-sm">Er is mogelijk een minderjarige bij deze situatie betrokken. Dit vereist extra zorgvuldigheid en kan meldplichten met zich meebrengen.</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded-2xl p-6 border border-brand-accent">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Veiligheidsadvies */}
            <div className="space-y-3">
                <h3 className="text-lg font-bold text-black flex items-center gap-2">
                    <ShieldIcon className="w-6 h-6 text-brand-primary" />
                    Veiligheidsadvies
                </h3>
                <p className="text-sm text-brand-text whitespace-pre-line leading-relaxed">{veiligheidsadvies}</p>
            </div>
            
            {/* Professioneel Advies */}
            <div className="space-y-3">
                <h3 className="text-lg font-bold text-black flex items-center gap-2">
                    <StepsIcon className="w-6 h-6 text-brand-secondary" />
                    Professioneel Advies
                </h3>
                <p className="text-sm text-brand-text whitespace-pre-line leading-relaxed">{professioneel_advies}</p>
            </div>

        </div>
      </div>
      
      {/* Juridische Opmerking */}
      <div className="text-center bg-brand-surface/70 p-4 rounded-xl border border-brand-accent/50">
        <p className="text-xs text-brand-subtle italic">{juridische_opmerking}</p>
      </div>
    </section>
  );
};

export default AdviesDisplay;