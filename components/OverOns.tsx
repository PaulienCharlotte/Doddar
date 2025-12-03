
import React from 'react';

interface OverOnsProps {
  onStartAnalysis?: () => void;
}

const OverOns: React.FC<OverOnsProps> = ({ onStartAnalysis }) => {
  return (
    <div className="relative w-full animate-fade-in overflow-hidden min-h-screen text-brand-text bg-[#F9FCFB]">
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24 md:space-y-40">
        
        {/* Header Sectie met Quote & Missie */}
        <header className="text-center max-w-5xl mx-auto pt-8 md:pt-16">
            <h1 className="sr-only">Over Doddar</h1>
            
            {/* Quote Image */}
            <div className="relative px-4 md:px-12 mb-16 md:mb-24 flex justify-center">
                {/* 
                   We verwijzen hier direct naar het bestand in de public/images map.
                   Zorg dat de bestandsnaam in GitHub exact overeenkomt: 'Over ons quote.svg'
                */}
                <img 
                    src="/images/Over ons quote.svg" 
                    alt="De Doddar (warkruid) is een parasitaire plant die een complex, verstikkend netwerk vormt. Om los te komen, moet je chirurgisch analyseren welke verbindingen de structuur in stand houden."
                    className="w-full max-w-4xl h-auto object-contain drop-shadow-sm"
                />
            </div>

            {/* Missie direct onder de quote */}
            <div className="bg-white rounded-[2rem] p-10 md:p-14 border border-[#E5E7EB] shadow-xl shadow-brand-accent/30 max-w-4xl mx-auto">
                <p className="text-xl md:text-2xl font-medium text-brand-text leading-loose mb-10">
                    Doddar is een onderzoeksbureau gespecialiseerd in gedragsanalyse binnen afhankelijkheidsrelaties. Wij objectiveren complexe situaties door feiten strikt te scheiden van emotie. Ons doel is waarheidsvinding: het leveren van een helder, feitelijk dossier dat dient als fundament voor juridische of zakelijke besluitvorming.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  {onStartAnalysis && (
                    <button 
                      onClick={onStartAnalysis}
                      className="px-8 py-4 bg-[#58B895] hover:bg-[#4AA984] text-white font-semibold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 text-lg"
                    >
                      Start de Analyse
                    </button>
                  )}
                  <a 
                    href="mailto:info@doddar.nl"
                    className="px-8 py-4 bg-white border border-[#D1D5DB] text-[#2F3E37] hover:bg-[#F2F9F6] hover:border-[#58B895] hover:text-[#58B895] font-semibold rounded-xl shadow-sm transition-all duration-200 text-lg"
                  >
                    Neem contact op
                  </a>
                </div>
            </div>
        </header>

        {/* Intro: De Metafoor (Feitelijk) */}
        <section className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#225748] tracking-tight">Analytische Benadering</h2>
                <div className="space-y-6 text-lg md:text-xl leading-relaxed text-brand-text font-light">
                    <p>
                        Wij gebruiken de Doddar-metafoor voor situaties waarin feiten en emoties onlosmakelijk verstrengeld lijken. In complexe casussen – zoals fraude, arbeidsconflicten of dwingende controle – is de objectieve waarheid vaak onzichtbaar geworden.
                    </p>
                    <p>
                         Onze taak is feitenonderzoek zonder oordeel. Wij brengen systematisch in kaart wie welke invloed uitoefent en waar de juridische en feitelijke knelpunten liggen. Dit creëert het overzicht dat nodig is voor vervolgstappen.
                    </p>
                </div>
            </div>
            <div className="flex justify-center md:justify-end">
                {/* Visual placeholder - kept empty for clean layout as requested */}
                <div className="w-full h-full min-h-[300px] bg-gradient-to-br from-[#E8F5EF] to-white rounded-[2rem] opacity-50"></div>
            </div>
        </section>

        {/* Intern & Extern (Dual Grid) - Oorzaak & Gevolg */}
        <section className="space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-[#225748]">Van Incident naar Inzicht</h2>
                <p className="text-xl text-[#6B7280] font-light">
                    Een grondig onderzoek kijkt verder dan het incident. Wij verbinden onderliggende mechanismen aan zichtbaar bewijs.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Oorzaak Blok */}
                <div className="bg-white rounded-[2.5rem] p-10 md:p-12 border border-[#E5E7EB] shadow-lg hover:shadow-xl transition-all duration-300">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#6A9489] mb-6">Systeemanalyse (De Oorzaak)</h3>
                    <p className="text-brand-text text-lg leading-loose">
                        Gedrag staat niet op zichzelf. Wij analyseren de onderliggende systematiek: machtsverhoudingen, afhankelijkheid en terugkerende patronen die grensoverschrijdend gedrag mogelijk maken. Wij zoeken naar de bron, niet slechts de symptomen.
                    </p>
                </div>

                {/* Gevolg Blok */}
                <div className="bg-[#F2F9F6] rounded-[2.5rem] p-10 md:p-12 border border-[#D1D5DB] shadow-lg hover:shadow-xl transition-all duration-300">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#4B5563] mb-6">Feitenrelaas (Het Gevolg)</h3>
                    <p className="text-brand-text text-lg leading-loose">
                         Een vermoeden is juridisch gezien geen feit. Wij focussen op objectiveerbare waarnemingen, tijdlijnen en verifieerbare sporen. Wij leveren hard bewijs dat standhoudt in een juridische of zakelijke context.
                    </p>
                </div>
            </div>
        </section>

        {/* Methodische Basis */}
        <section className="bg-[#E8F5EF] rounded-[3rem] p-10 md:p-20 border border-[#E5E7EB] shadow-sm">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                <div className="space-y-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#225748] mb-6">Onze Methodiek</h2>
                        <p className="text-xl text-brand-text leading-relaxed">
                            Om tot waarheidsvinding te komen zonder oordeel, hanteren wij drie strikte kernwaarden in elk onderzoek:
                        </p>
                    </div>
                    
                    <div className="space-y-10">
                        <div className="flex gap-8 items-start">
                            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#58B895] flex items-center justify-center text-white font-bold text-2xl shadow-md">1</div>
                            <div>
                                <h4 className="text-2xl font-bold text-[#225748] mb-2">Objectiveren</h4>
                                <p className="text-brand-text text-lg leading-relaxed">Het filteren van emotionele ruis en interpretaties. Wat blijft over zijn de harde feiten en verifieerbare waarnemingen.</p>
                            </div>
                        </div>
                        <div className="flex gap-8 items-start">
                            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#6A9489] flex items-center justify-center text-white font-bold text-2xl shadow-md">2</div>
                            <div>
                                <h4 className="text-2xl font-bold text-[#225748] mb-2">Contextualiseren</h4>
                                <p className="text-brand-text text-lg leading-relaxed">Een feit staat nooit op zichzelf. Wij plaatsen gedragingen in de juiste tijdlijn en omgevingsfactoren om de <em>modus operandi</em> bloot te leggen.</p>
                            </div>
                        </div>
                        <div className="flex gap-8 items-start">
                            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#4B5563] flex items-center justify-center text-white font-bold text-2xl shadow-md">3</div>
                            <div>
                                <h4 className="text-2xl font-bold text-[#225748] mb-2">Valideren</h4>
                                <p className="text-brand-text text-lg leading-relaxed">Onze bevindingen worden getoetst aan juridische kaders, wetenschappelijke literatuur en forensische standaarden.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:flex justify-center items-center h-full">
                    {/* Abstract visual element */}
                    <div className="w-full aspect-square bg-white rounded-full opacity-40 blur-3xl"></div>
                </div>
            </div>
        </section>

        {/* Kernfilosofie (Quote Block) */}
        <section className="text-center py-16 md:py-24 max-w-5xl mx-auto border-y border-[#E5E7EB]">
            <h3 className="text-3xl md:text-5xl font-serif italic text-[#6A9489] mb-10 leading-tight">"Objectiviteit als basis voor herstel"</h3>
            <p className="text-xl md:text-2xl text-brand-text leading-relaxed font-light max-w-3xl mx-auto">
                Onzekerheid voedt onrust. Door een situatie terug te brengen tot de feitelijke kern, ontstaat duidelijkheid. Doddar velt geen vonnis, maar levert de onbetwistbare bouwstenen voor een eerlijke beoordeling.
            </p>
             <div className="mt-12">
                {onStartAnalysis && (
                    <button 
                      onClick={onStartAnalysis}
                      className="text-[#58B895] font-bold hover:underline text-xl tracking-wide"
                    >
                      Start de feiten-analyse &rarr;
                    </button>
                )}
             </div>
        </section>

        {/* Bestuurder / Achtergrond */}
        <section className="grid md:grid-cols-2 gap-16 md:gap-24 items-center max-w-6xl mx-auto">
             <div className="flex justify-center md:justify-start order-2 md:order-1">
                <div className="bg-[#F2F9F6] rounded-[2rem] w-full aspect-[4/5] max-w-md mx-auto"></div>
            </div>
            <div className="space-y-8 order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-bold text-[#225748]">Achtergrond</h2>
                <div className="prose prose-lg prose-stone text-brand-text leading-loose space-y-6">
                    <p>
                        Mijn focus ligt op het snijvlak van menselijk gedrag en harde bewijslast. Hoe maken we subjectief gedrag objectief aantoonbaar?
                    </p>
                    <p>
                        Als bestuurder van Doddar combineer ik een achtergrond in forensische wetenschap met jarenlange ervaring in fraudeonderzoek binnen de financiële sector (CDD/KYC). Hier heb ik geleerd om complexe structuren te doorgronden en risico's feitelijk te onderbouwen. Daarnaast ben ik gecertificeerd in OSINT (Open Source Intelligence) en gespecialiseerd in non-verbale communicatieanalyse.
                    </p>
                    <p>
                        Bij Doddar pas ik deze zakelijke, analytische bril toe op intermenselijke vraagstukken. Geen aannames, maar dossiers die standhouden.
                    </p>
                </div>
            </div>
        </section>

        {/* Footer Style */}
        <footer className="bg-white rounded-[3rem] p-12 md:p-20 border border-[#E5E7EB] text-center shadow-xl mb-12 max-w-6xl mx-auto">
             <div className="max-w-3xl mx-auto space-y-10">
                <h2 className="text-3xl md:text-4xl font-bold text-[#225748]">Zoekt u duidelijkheid?</h2>
                <p className="text-[#6B7280] text-xl leading-relaxed">
                    Of het nu gaat om een zakelijk integriteitsvraagstuk of een complexe privésituatie: wij helpen u de feiten helder te krijgen.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                    <a 
                        href="mailto:info@doddar.nl" 
                        className="px-10 py-5 bg-[#58B895] hover:bg-[#4AA984] text-white font-bold rounded-xl transition-all duration-300 shadow-md text-lg"
                    >
                        Neem contact op
                    </a>
                    {onStartAnalysis && (
                        <button 
                            onClick={onStartAnalysis}
                            className="px-10 py-5 bg-white border border-[#6A9489] text-[#6A9489] hover:bg-[#F2F9F6] font-bold rounded-xl transition-all duration-300 text-lg"
                        >
                            Start casus-analyse
                        </button>
                    )}
                </div>
                
                <div className="pt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-[#9CA3AF] font-semibold uppercase tracking-widest">
                    <span>Particulier Onderzoek</span>
                    <span>•</span>
                    <span>Forensische Analyse</span>
                    <span>•</span>
                    <span>OSINT</span>
                    <span>•</span>
                    <span>Waarheidsvinding</span>
                </div>
            </div>
        </footer>

      </div>
    </div>
  );
};

export default OverOns;
