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
    const [humanInterpretation, setHumanInterpretation] = useState('');

    // Safe data access
    const isBevoegd = result?.bevoegdheidscheck?.is_bevoegd ?? false;
    // Use optional chaining carefully as types might have strictly changed
    const isMinderjarig = (result as any)?.minor_involved ?? false;
    const minorRisk = (result as any)?.minor_risk_assessment || "";
    const samenvatting = result?.samenvatting || "Geen samenvatting beschikbaar.";
    const samengevoegdAdvies = (result?.advies?.veiligheidsadvies || "") + "\n\n" + (result?.advies?.professioneel_advies || "");
    const juridischeOpmerking = result?.advies?.juridische_opmerking || "Geen juridische opmerking beschikbaar.";

    const handleIntakeClick = () => {
        if (!humanInterpretation.trim()) {
            alert("Voer a.u.b. eerst uw eigen interpretatie in om het rapport te valideren.");
            return;
        }

        if (shareAnalysis) {
            const context: AnalysisContext = {
                summary: samenvatting,
                advice: samengevoegdAdvies,
                patterns: result.gedragskenmerken || [],
                legal_factors: (result.mogelijke_wettelijke_overtredingen || []).map(w => `${w.wetboek} Art. ${w.artikel}: ${w.omschrijving}`),
                scientific_context: (result.impact_onderbouwing || []).map(i => `${i.titel}: ${i.onderbouwing}`),
                methods: (result.mogelijke_onderzoeksmethoden || []).map(m => m.id),
                // We add this to context via a temporary cast or purely passing it if the type allows
                ...({ human_validation: humanInterpretation } as any)
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
                        <h2 className="text-xl font-bold text-[#13261f]">Structureringsrapport</h2>
                        <p className="text-xs text-brand-subtle font-mono uppercase tracking-widest">Status: Menselijke Validatie Vereist</p>
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

            {/* II. Onderzoeksstrategie Section */}
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
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-900 p-6 rounded-r-xl shadow-sm" role="alert">
                        <div className="flex gap-4">
                            <div className="py-1"><WarningIcon className="h-8 w-8 text-red-600" /></div>
                            <div>
                                <p className="font-bold text-lg mb-2 text-red-700">Wettelijke Zorgplicht (Wpbr) - Minderjarige Betrokken</p>
                                <p className="text-base leading-relaxed font-medium">
                                    De AI heeft indicatoren van betrokkenheid van een minderjarige gedetecteerd.
                                </p>
                                <p className="text-sm mt-2 text-red-800/80">
                                    Conform de Wet particuliere beveiligingsorganisaties en recherchebureaus (Wpbr) en de Privacygedragscode dient u:
                                    <ul className="list-disc ml-5 mt-1 space-y-1">
                                        <li>Het belang van het kind voorop te stellen in elk onderzoek (proportionaliteit).</li>
                                        <li>Terughoudend te zijn met observatie of middelen die de privacy van de minderjarige schenden.</li>
                                    </ul>
                                </p>
                                {minorRisk && (
                                    <div className="mt-3 p-3 bg-white/60 rounded-lg border border-red-100 text-sm italic">
                                        "AI Risico-inschatting: {minorRisk}"
                                    </div>
                                )}
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

            {/* Expert Gate (Modified for Human-in-the-loop) */}
            <section className="bg-[#F2F9F6] border-2 border-[#58B895]/20 p-8 md:p-12 rounded-[2.5rem] shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#58B895]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="relative z-10 grid md:grid-cols-[1fr_200px] gap-8 items-center">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-1.5 rounded-lg shadow-sm">
                                <UserCheckIcon className="w-5 h-5 text-[#58B895]" />
                            </div>
                            <h3 className="text-[#58B895] font-bold uppercase tracking-[0.2em] text-xs">Human-in-the-loop</h3>
                        </div>
                        <h4 className="text-2xl md:text-3xl font-bold text-[#13261f] leading-tight">Verplichte Menselijke Validatie</h4>
                        <p className="text-[#4B5563] leading-relaxed text-base md:text-lg font-light">
                            De AI fungeert als structurerings-assistent. Conform de EU AI Act dient u als menselijke professional de context te duiden voordat resultaten definitief zijn.
                        </p>
                    </div>
                    <div className="hidden md:flex justify-center">
                        <div className="w-32 h-32 rounded-full border-4 border-[#58B895]/10 bg-white flex items-center justify-center animate-pulse shadow-sm">
                            <ShieldIcon className="w-12 h-12 text-[#58B895]" />
                        </div>
                    </div>
                </div>
            </section>

            {/* VI. Human Validation Input (New) */}
            <section className="space-y-8 section-human-validation">
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-px bg-brand-accent flex-grow"></div>
                    <span className="text-[10px] font-bold text-brand-subtle uppercase tracking-[0.3em]">VI. Uw Interpretatie</span>
                    <div className="h-px bg-brand-accent flex-grow"></div>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border-2 border-[#58B895] shadow-lg relative">
                    <div className="absolute -top-3 left-8 bg-[#58B895] text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                        Verplicht Veld
                    </div>
                    <h4 className="text-lg font-bold text-[#13261f] mb-2">Rechercheur / Gebruiker Interpretatie</h4>
                    <p className="text-sm text-gray-500 mb-4">
                        Formuleer hier uw eigen conclusie op basis van de aangereikte structuur. Ziet u de patronen ook? Mist u nuance? Dit wordt onderdeel van het dossier.
                    </p>
                    <textarea
                        className="w-full min-h-[150px] p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#58B895] focus:border-transparent outline-none bg-gray-50 text-[#13261f]"
                        placeholder="Ik constateer dat..."
                        value={humanInterpretation}
                        onChange={(e) => setHumanInterpretation(e.target.value)}
                    ></textarea>
                </div>
            </section>

            {/* V. Advies & Reflectie Section */}
            <section className="space-y-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-px bg-brand-accent flex-grow"></div>
                    <span className="text-[10px] font-bold text-brand-subtle uppercase tracking-[0.3em]">VII. Advies & Reflectie</span>
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
                <div className={`p-8 rounded-3xl border transition-all hover:shadow-md flex flex-col justify-between ${humanInterpretation ? 'bg-[#E8F5EF] border-[#58B895]/20' : 'bg-gray-50 border-gray-200 opacity-80'}`}>
                    <div>
                        <h4 className="font-bold text-[#13261f] text-xl mb-3 flex items-center gap-2">
                            <MessageCircleIcon className={`w-6 h-6 ${humanInterpretation ? 'text-[#58B895]' : 'text-gray-400'}`} />
                            Bespreken met een Expert
                        </h4>
                        <p className="text-[#4B5563] text-base leading-relaxed mb-8">
                            Zet dit gevalideerde rapport om in een definitieve analyse. Een adviseur helpt u de juridische haalbaarheid te duiden.
                        </p>

                        {!humanInterpretation && (
                            <p className="mb-4 text-xs font-bold text-red-500 uppercase tracking-wide">
                                * Vul eerst uw interpretatie in
                            </p>
                        )}

                        {/* Keuzekaarten */}
                        <div className={`grid grid-cols-1 gap-3 mb-8 transition-opacity ${!humanInterpretation ? 'pointer-events-none opacity-50' : ''}`}>
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
                        disabled={!humanInterpretation}
                        className={`w-full py-4 font-bold rounded-2xl shadow-lg transition-all text-lg flex flex-col items-center justify-center ${humanInterpretation ? 'bg-[#13261f] hover:bg-[#58B895] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'}`}
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
                            Wilt u een andere situatie analyseren of een variatie op uw beschrijving invoeren? Alle huidige data wordt permanent gewist.
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