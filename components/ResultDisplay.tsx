import React, { useState } from 'react';
import type { AnalysisResponse, AnalysisContext } from '../types';
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
import { MessageCircleIcon } from './icons/MessageCircleIcon';
import { CheckIcon } from './icons/CheckIcon';
import { UserCheckIcon } from './icons/UserCheckIcon';
import { LawIcon } from './icons/LawIcon';
import { DossierIcon } from './icons/DossierIcon';

interface ResultDisplayProps {
  result: AnalysisResponse;
  onReset: () => void;
  onRequestIntake: (context: AnalysisContext | null) => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset, onRequestIntake }) => {
  const [shareAnalysis, setShareAnalysis] = useState(true);
  
  // Safe data access
  const isBevoegd = result?.bevoegdheidscheck?.is_bevoegd ?? false;
  const isMinderjarig = result?.advies?.minderjarig ?? false;
  const samenvatting = result?.samenvatting || "Geen samenvatting beschikbaar.";
  const samengevoegdAdvies = (result?.advies?.veiligheidsadvies || "") + "\n\n" + (result?.advies?.professioneel_advies || "");
  const juridischeOpmerking = result?.advies?.juridische_opmerking || "Geen juridische opmerking beschikbaar.";

  const handleIntakeClick = () => {
      if (shareAnalysis) {
          const context: AnalysisContext = {
              summary: samenvatting,
              advice: samengevoegdAdvies,
              patterns: result.gedragskenmerken || []
          };
          onRequestIntake(context);
      } else {
          onRequestIntake(null);
      }
  };

  return (
    <div className="space-y-12 animate-fade-in max-w-5xl mx-auto pb-24 px-4">
        
        {/* Dossier Header Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-brand-accent pb-6">
            <div className="flex items-center gap-3">
                <div className="bg-[#13261f] p-3 rounded-xl text-white">
                    <DossierIcon className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-[#13261f]">Voorlopig Analyserapport</h2>
                    <p className="text-xs text-brand-subtle font-mono uppercase tracking-widest">Status: Indicatieve AI-Toetsing</p>
                </div>
            </div>
            <div className="text-right hidden md:block">
                <p className="text-xs text-brand-subtle font-bold uppercase tracking-wider text-[#58B895]">Anoniem Rapport</p>
                <p className="text-xs text-brand-subtle">Datum: {new Intl.DateTimeFormat('nl-NL').format(new Date())}</p>
            </div>
        </div>

        {/* I. Samenvatting Section */}
        <section className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-brand-accent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#58B895]"></div>
            <div className="flex items-start gap-6">
                <div className="hidden sm:block p-4 bg-[#F2F9F6] rounded-2xl text-[#58B895]">
                    <SummaryIcon className="w-8 h-8" />
                </div>
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-[#13261f]">Samenvatting van de Dynamiek</h3>
                    <p className="text-brand-text leading-relaxed text-lg max-w-prose italic">
                        {samenvatting}
                    </p>
                </div>
            </div>
        </section>

        {/* II. Onderzoeksstrategie Section (Moved Up as requested) */}
        <section className="pt-8">
            <div className="flex items-center gap-4 mb-12">
                <div className="h-px bg-brand-accent flex-grow"></div>
                <span className="text-[10px] font-bold text-brand-subtle uppercase tracking-[0.3em]">II. Onderzoeksstrategie</span>
                <div className="h-px bg-brand-accent flex-grow"></div>
            </div>
            
            {!isBevoegd && (
                <div className="mb-12">
                    <UnauthorizedPathways />
                </div>
            )}
            
            <OnderzoeksDienstenBanner recommendations={result.mogelijke_onderzoeksmethoden} />
        </section>

        {/* III. Gedrag & Wetenschap Section */}
        <section className="space-y-8">
            <div className="flex items-center gap-4 mb-4">
                <div className="h-px bg-brand-accent flex-grow"></div>
                <span className="text-[10px] font-bold text-brand-subtle uppercase tracking-[0.3em]">III. Gedragsanalyse & Context</span>
                <div className="h-px bg-brand-accent flex-grow"></div>
            </div>

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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[2rem] border border-brand-accent shadow-sm">
                    <GedragskenmerkenDisplay kenmerken={result.gedragskenmerken} />
                </div>
                <div className="bg-white p-8 rounded-[2rem] border border-brand-accent shadow-sm">
                    <ImpactOnderbouwingDisplay onderbouwingen={result.impact_onderbouwing} />
                </div>
            </div>
        </section>

        {/* IV. Juridische Analyse Section */}
        <section className="space-y-8">
            <div className="flex items-center gap-4 mb-4">
                <div className="h-px bg-brand-accent flex-grow"></div>
                <span className="text-[10px] font-bold text-brand-subtle uppercase tracking-[0.3em]">IV. Juridisch Kader</span>
                <div className="h-px bg-brand-accent flex-grow"></div>
            </div>
            <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-brand-accent shadow-sm">
                <LegalAnalysis 
                    overtredingen={result.mogelijke_wettelijke_overtredingen} 
                    bevoegdheidscheck={result.bevoegdheidscheck}
                    juridischeOpmerking={juridischeOpmerking} 
                />
            </div>
        </section>

        {/* Expert Gate */}
        <section className="bg-[#F2F9F6] border-2 border-[#58B895]/20 p-8 md:p-12 rounded-[2.5rem] shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#58B895]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="relative z-10 grid md:grid-cols-[1fr_200px] gap-8 items-center">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-1.5 rounded-lg shadow-sm">
                            <UserCheckIcon className="w-5 h-5 text-[#58B895]" />
                        </div>
                        <h3 className="text-[#58B895] font-bold uppercase tracking-[0.2em] text-xs">Systeemanalyse Onderbroken</h3>
                    </div>
                    <h4 className="text-2xl md:text-3xl font-bold text-[#13261f] leading-tight">Expert-validatie vereist voor diepgaande conclusies.</h4>
                    <p className="text-[#4B5563] leading-relaxed text-base md:text-lg font-light">
                        De AI heeft patronen gedetecteerd die wijzen op complexe machtsdynamieken en mogelijke bewijslast. Om misinterpretatie van deze gevoelige informatie te voorkomen, worden de meest gedetailleerde kruisverbanden pas ontsloten na een <span className="font-bold text-[#13261f]">menselijke validatie</span> door een erkend onderzoeker.
                    </p>
                </div>
                <div className="hidden md:flex justify-center">
                    <div className="w-32 h-32 rounded-full border-4 border-[#58B895]/10 bg-white flex items-center justify-center animate-pulse shadow-sm">
                        <ShieldIcon className="w-12 h-12 text-[#58B895]" />
                    </div>
                </div>
            </div>
        </section>

        {/* V. Advies & Reflectie Section */}
        <section className="space-y-8">
            <div className="flex items-center gap-4 mb-4">
                <div className="h-px bg-brand-accent flex-grow"></div>
                <span className="text-[10px] font-bold text-brand-subtle uppercase tracking-[0.3em]">V. Advies & Reflectie</span>
                <div className="h-px bg-brand-accent flex-grow"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8">
                <div className="space-y-8">
                    <div className="p-8 bg-white rounded-[2rem] border border-brand-accent shadow-sm">
                        <h3 className="text-xl font-bold text-[#13261f] flex items-center gap-3 mb-6">
                            <ShieldIcon className="w-6 h-6 text-brand-primary" />
                            Strategisch Advies
                        </h3>
                        <div className="text-base text-brand-text whitespace-pre-line leading-loose max-w-prose">
                            {samengevoegdAdvies.trim()}
                        </div>
                    </div>
                    <AdviceServicesList recommendations={result.mogelijke_onderzoeksmethoden} isBevoegd={isBevoegd} />
                </div>
                <div className="bg-white p-8 rounded-[2rem] border border-brand-accent shadow-sm h-fit">
                    <VerduidelijkingsvragenDisplay vragen={result.aanvullende_vragen} />
                </div>
            </div>
        </section>

      {/* Action Area: Intake vs Reset */}
      <div className="grid md:grid-cols-2 gap-6 pt-12 border-t border-brand-accent">
          {/* Option 1: Intake with conscious choice */}
          <div className="bg-[#E8F5EF] p-8 rounded-3xl border border-[#58B895]/20 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                  <h4 className="font-bold text-[#13261f] text-xl mb-3 flex items-center gap-2">
                      <MessageCircleIcon className="w-6 h-6 text-[#58B895]" />
                      Bespreken met een Expert
                  </h4>
                  <p className="text-[#4B5563] text-base leading-relaxed mb-8">
                      Zet dit indicatieve rapport om in een definitieve analyse. Een adviseur helpt u de juridische haalbaarheid en bewijslast te duiden in een <strong>gratis intakegesprek</strong>.
                  </p>
                  
                  {/* Keuzekaarten */}
                  <div className="grid grid-cols-1 gap-3 mb-8">
                      <div 
                          onClick={() => setShareAnalysis(true)}
                          className={`cursor-pointer p-4 rounded-xl border-2 transition-all relative group ${shareAnalysis ? 'bg-white border-[#58B895] shadow-sm' : 'bg-white/40 border-transparent hover:bg-white/60'}`}
                      >
                          <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${shareAnalysis ? 'border-[#58B895] bg-[#58B895] text-white' : 'border-gray-400 bg-transparent'}`}>
                                  {shareAnalysis && <CheckIcon className="w-3 h-3" />}
                              </div>
                              <div>
                                  <span className={`block text-sm font-bold ${shareAnalysis ? 'text-[#13261f]' : 'text-gray-600'}`}>Verstuur dit rapport mee</span>
                                  <span className="block text-xs text-[#6B7280]">Direct inzicht voor de onderzoeker.</span>
                              </div>
                          </div>
                      </div>

                      <div 
                          onClick={() => setShareAnalysis(false)}
                          className={`cursor-pointer p-4 rounded-xl border-2 transition-all relative group ${!shareAnalysis ? 'bg-white border-[#58B895] shadow-sm' : 'bg-white/40 border-transparent hover:bg-white/60'}`}
                      >
                          <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${!shareAnalysis ? 'border-[#58B895] bg-[#58B895] text-white' : 'border-gray-400 bg-transparent'}`}>
                                  {!shareAnalysis && <CheckIcon className="w-3 h-3" />}
                              </div>
                              <div>
                                  <span className={`block text-sm font-bold ${!shareAnalysis ? 'text-[#13261f]' : 'text-gray-600'}`}>Alleen contactopname</span>
                                  <span className="block text-xs text-[#6B7280]">Geen data delen, verhaal blanco doen.</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <button
                  onClick={handleIntakeClick}
                  className="w-full py-4 bg-[#13261f] hover:bg-[#58B895] text-white font-bold rounded-2xl shadow-lg transition-all text-lg flex flex-col items-center justify-center"
              >
                  <span className="flex items-center gap-2">Plan Gratis Intakegesprek <span className="text-xl">→</span></span>
                  <span className="text-[10px] uppercase tracking-widest opacity-70">Altijd vrijblijvend & vertrouwelijk</span>
              </button>
          </div>

          {/* Option 2: Reset */}
          <div className="bg-white p-8 rounded-3xl border border-brand-accent flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                  <h4 className="font-bold text-[#13261f] text-xl mb-3">Nieuwe Analyse</h4>
                  <p className="text-[#4B5563] text-base leading-relaxed mb-8">
                      Wilt u een andere situatie toetsen of een variatie op uw beschrijving invoeren? Alle huidige data wordt permanent gewist.
                  </p>
              </div>
              <button
                  onClick={onReset}
                  className="w-full py-4 bg-white border border-[#D1D5DB] text-[#13261f] hover:bg-gray-50 font-bold rounded-2xl transition-all text-lg"
              >
                  Reset en Begin Opnieuw
              </button>
          </div>
      </div>
    </div>
  );
};

export default ResultDisplay;