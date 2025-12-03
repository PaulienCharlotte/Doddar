
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
      className={`px-6 py-4 rounded-t-xl font-semibold text-sm md:text-base transition-colors border-b-2 ${
          activeTab === tabId 
          ? 'bg-white text-brand-primary border-brand-primary' 
          : 'bg-transparent text-brand-subtle border-transparent hover:text-brand-secondary hover:bg-brand-surface'
      }`}
    >
      {label}
    </button>
  );
  
  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
        {/* Summary Card */}
        <div className="bg-white shadow-lg shadow-brand-accent/20 rounded-2xl p-8 border border-brand-accent space-y-4">
            <div className="flex items-start gap-4">
                <SummaryIcon className="w-8 h-8 text-brand-primary flex-shrink-0 mt-1" />
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-[#2F3E37]">Samenvatting</h3>
                    <p className="text-brand-text leading-relaxed text-lg max-w-prose">{samenvatting}</p>
                </div>
            </div>
        </div>

        {/* Tabs Container */}
        <div className="bg-white shadow-xl shadow-brand-accent/20 rounded-2xl border border-brand-accent overflow-hidden">
            {/* Tab Header */}
            <div role="tablist" aria-label="Analyse secties" className="bg-[#F9FCFB] border-b border-brand-accent flex gap-2 px-4 pt-4 overflow-x-auto">
                <TabButton tabId="methods" label="Onderzoeksmethoden" />
                <TabButton tabId="overview" label="Overzicht & Analyse" />
                <TabButton tabId="advice" label="Advies & Reflectie" />
            </div>

            {/* Methods Panel */}
            <div id="panel-methods" role="tabpanel" aria-labelledby="tab-methods" className={`${activeTab === 'methods' ? 'block' : 'hidden'} p-8 md:p-12`}>
                 {!isBevoegd && (
                    <div className="mb-16 border-b border-brand-accent/30 pb-12">
                        <UnauthorizedPathways />
                    </div>
                  )}
                 <OnderzoeksDienstenBanner recommendations={result.mogelijke_onderzoeksmethoden} />
            </div>
            
            {/* Overview Panel */}
            <div id="panel-overview" role="tabpanel" aria-labelledby="tab-overview" className={`${activeTab === 'overview' ? 'block' : 'hidden'} p-8 md:p-12`}>
                <div className="space-y-10">
                    {isMinderjarig && (
                        <div className="bg-status-danger/5 border-l-4 border-status-danger text-status-danger p-6 rounded-r-xl" role="alert">
                            <div className="flex gap-4">
                                <div className="py-1"><WarningIcon className="h-7 w-7" /></div>
                                <div>
                                    <p className="font-bold text-lg mb-1">Let op: Minderjarige Betrokken</p>
                                    <p className="text-base leading-relaxed">Er is mogelijk een minderjarige bij deze situatie betrokken. Dit vereist extra zorgvuldigheid en kan meldplichten met zich meebrengen.</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
                         <div className="space-y-10">
                           <GedragskenmerkenDisplay kenmerken={result.gedragskenmerken} />
                           <ImpactOnderbouwingDisplay onderbouwingen={result.impact_onderbouwing} />
                         </div>
                        <div className="space-y-10">
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
            <div id="panel-advice" role="tabpanel" aria-labelledby="tab-advice" className={`${activeTab === 'advice' ? 'block' : 'hidden'} p-8 md:p-12`}>
                 <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 md:gap-16">
                    <div className="space-y-8">
                        <div className="space-y-5 p-8 bg-[#F9FCFB] rounded-2xl border border-brand-accent shadow-sm">
                            <h3 className="text-xl font-bold text-[#2F3E37] flex items-center gap-3">
                                <ShieldIcon className="w-6 h-6 text-brand-primary" />
                                Samengevoegd Advies
                            </h3>
                            <div className="text-base text-brand-text whitespace-pre-line leading-loose max-w-prose">
                                {samengevoegdAdvies.trim()}
                            </div>
                        </div>
                        <AdviceServicesList recommendations={result.mogelijke_onderzoeksmethoden} isBevoegd={isBevoegd} />
                    </div>
                    <VerduidelijkingsvragenDisplay vragen={result.aanvullende_vragen} />
                </div>
            </div>
        </div>

      <div className="text-center mt-8 pb-12">
        <button
          onClick={onReset}
          className="px-8 py-4 bg-[#6A9489] hover:bg-brand-primary text-white font-semibold rounded-xl shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
        >
          Nieuwe Analyse Starten
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;
