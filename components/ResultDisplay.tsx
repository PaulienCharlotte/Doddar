

import React, { useState } from 'react';
import type { AnalysisResponse } from '../types';
import { SummaryIcon } from './icons/SummaryIcon';
import VerduidelijkingsvragenDisplay from './VerduidelijkingsvragenDisplay';
import OnderzoeksDienstenBanner from './ServiceShowcase';
import GedragskenmerkenDisplay from './GedragskenmerkenDisplay';
import { WarningIcon } from './icons/WarningIcon';
import { ShieldIcon } from './icons/ShieldIcon';
import UnauthorizedPathways from './UnauthorizedPathways';
import ImpactOnderbouwingDisplay from './ImpactOnderbouwingDisplay';
import LegalAnalysis from './LegalAnalysis';
import AdviceServicesList from './AdviceServicesList';

interface ResultDisplayProps {
  result: AnalysisResponse;
  onReset: () => void;
}

type Tab = 'methods' | 'overview' | 'advice';

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  const [activeTab, setActiveTab] = useState<Tab>('methods');
  
  // Safe data access
  const isBevoegd = result?.bevoegdheidscheck?.is_bevoegd ?? false;
  const isMinderjarig = result?.advies?.minderjarig ?? false;
  const samenvatting = result?.samenvatting || "Geen samenvatting beschikbaar.";
  const samengevoegdAdvies = (result?.advies?.veiligheidsadvies || "") + "\n\n" + (result?.advies?.professioneel_advies || "");
  const juridischeOpmerking = result?.advies?.juridische_opmerking || "Geen juridische opmerking beschikbaar.";

  const TabButton: React.FC<{ tabId: Tab; label: string }> = ({ tabId, label }) => (
    <button
      role="tab"
      aria-selected={activeTab === tabId}
      aria-controls={`panel-${tabId}`}
      id={`tab-${tabId}`}
      onClick={() => setActiveTab(tabId)}
      className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors ${activeTab === tabId ? 'bg-white shadow-sm text-brand-primary border border-brand-accent' : 'bg-transparent text-brand-secondary hover:bg-brand-primary/10'}`}
    >
      {label}
    </button>
  );
  
  return (
    <div className="space-y-6 animate-fade-in">
        {/* Summary Card */}
        <div className="bg-white shadow-md rounded-2xl p-6 border border-brand-accent space-y-4">
            <div className="flex items-start gap-3">
                <SummaryIcon className="w-6 h-6 text-brand-primary flex-shrink-0 mt-1" />
                <div>
                    <h3 className="text-xl font-bold text-black">Samenvatting</h3>
                    <p className="text-brand-text mt-1">{samenvatting}</p>
                </div>
            </div>
        </div>

        {/* Tabs */}
        <div className="bg-white shadow-md rounded-2xl border border-brand-accent">
            <div role="tablist" aria-label="Analyse secties" className="p-1.5 bg-brand-surface border-b border-brand-accent/70 rounded-t-2xl flex gap-1">
                <TabButton tabId="methods" label="Onderzoeksmethoden" />
                <TabButton tabId="overview" label="Overzicht & Analyse" />
                <TabButton tabId="advice" label="Advies & Reflectie" />
            </div>

            {/* Methods Panel */}
            <div id="panel-methods" role="tabpanel" aria-labelledby="tab-methods" className={`${activeTab === 'methods' ? 'block' : 'hidden'} p-6`}>
                 {isBevoegd ? (
                    <OnderzoeksDienstenBanner recommendations={result.mogelijke_onderzoeksmethoden} />
                  ) : (
                    <UnauthorizedPathways />
                  )}
            </div>
            
            {/* Overview Panel */}
            <div id="panel-overview" role="tabpanel" aria-labelledby="tab-overview" className={`${activeTab === 'overview' ? 'block' : 'hidden'} p-6`}>
                <div className="space-y-6">
                    {isMinderjarig && (
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                         <div className="space-y-6">
                           <GedragskenmerkenDisplay kenmerken={result.gedragskenmerken} />
                           <ImpactOnderbouwingDisplay onderbouwingen={result.impact_onderbouwing} />
                         </div>
                        <div className="space-y-6">
                           <LegalAnalysis 
                              overtredingen={result.mogelijke_wettelijke_overtredingen} 
                              bevoegdheidscheck={result.bevoegdheidscheck}
                              juridischeOpmerking={juridischeOpmerking} 
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Advice & Reflection Panel */}
            <div id="panel-advice" role="tabpanel" aria-labelledby="tab-advice" className={`${activeTab === 'advice' ? 'block' : 'hidden'} p-6`}>
                 <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
                    <div className="space-y-6">
                        <div className="space-y-3 p-4 bg-brand-surface rounded-lg border border-brand-accent">
                            <h3 className="text-lg font-bold text-black flex items-center gap-2">
                                <ShieldIcon className="w-6 h-6 text-brand-primary" />
                                Samengevoegd Advies
                            </h3>
                            <p className="text-sm text-brand-text whitespace-pre-line leading-relaxed">{samengevoegdAdvies.trim()}</p>
                        </div>
                        <AdviceServicesList recommendations={result.mogelijke_onderzoeksmethoden} isBevoegd={isBevoegd} />
                    </div>
                    <VerduidelijkingsvragenDisplay vragen={result.aanvullende_vragen} />
                </div>
            </div>
        </div>

      <div className="text-center mt-4">
        <button
          onClick={onReset}
          className="px-6 py-3 bg-brand-secondary hover:bg-brand-primary text-white font-semibold rounded-xl shadow-sm transition-all duration-150"
        >
          Nieuwe Analyse Starten
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;