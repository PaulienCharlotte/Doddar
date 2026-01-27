import React from 'react';
import { NetworkIcon } from './icons/NetworkIcon';
import { InvestigationIcon } from './icons/InvestigationIcon';
import { CheckIcon } from './icons/CheckIcon';

interface OverOnsProps {
  onStartAnalysis?: () => void;
  onOpenComplaints?: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  onOpenKnowledge?: () => void;
  onOpenDisclaimer?: () => void;
}

const OverOns: React.FC<OverOnsProps> = ({ onStartAnalysis }) => {
  const baseUrl = "https://shimmering-paletas-5d438a.netlify.app/images/";

  return (
    <div className="relative w-full animate-fade-in overflow-hidden min-h-screen text-[#13261f] bg-[#F9FCFA]">
      
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-[#F2F9F6] to-[#F9FCFA] -z-10"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E8F5EF]/50 to-transparent -z-10 rounded-bl-[10rem]"></div>

      {/* Hero Header */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 max-w-5xl mx-auto px-6 text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-[#E8F5EF] border border-[#58B895]/20 text-[#58B895] text-xs font-bold uppercase tracking-widest mb-8">
              Over Doddar
          </span>
          <div className="relative max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#13261f] font-bold leading-[1.1] tracking-tight">
                  <span className="text-[#58B895] block text-6xl md:text-8xl absolute -top-8 -left-4 md:-left-12 opacity-20 font-serif">“</span>
                  De naam Doddar komt van de dodderplant. Deze plant hecht zich vast en kan groei verstoren. Door de draden te doorbreken ontstaat opnieuw ruimte voor ontwikkeling.
                  <span className="text-[#58B895] block text-6xl md:text-8xl absolute -bottom-12 -right-4 md:-right-12 opacity-20 font-serif transform rotate-180">“</span>
              </h1>
          </div>
      </section>

      <div className="relative z-10 max-w-7xl mx-auto px-6 space-y-32 pb-24">
        
        {/* Missie Sectie */}
        <section className="relative bg-white rounded-[3rem] border border-[#E5E7EB] shadow-xl overflow-hidden group">
            <div className="absolute inset-0 z-0 flex justify-end">
                <img 
                    src={`${baseUrl}overonsplantje.svg`} 
                    alt="Over ons achtergrond" 
                    className="w-full h-full object-cover md:object-contain object-center md:object-right p-0 md:p-8 opacity-40 group-hover:opacity-45 transition-all duration-700 transform group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/20 z-10 pointer-events-none"></div>
            </div>

            <div className="relative z-10 p-8 md:p-16 lg:p-20 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#13261f] mb-6">Waarheidsvinding zonder oordeel</h2>
                    <p className="text-xl text-[#13261f]/80 font-light mb-8 leading-relaxed">
                        Wij analyseren gedrag en context om de feitelijke waarheid boven tafel te krijgen.
                    </p>

                    <div className="prose prose-lg text-[#4B5563] leading-loose mb-10">
                        <p>
                            Doddar is een onderzoeksbureau gespecialiseerd in gedragsanalyse binnen afhankelijkheidsrelaties. Ons doel is het leveren van een helder, feitelijk dossier dat dient als fundament voor juridische of zakelijke besluitvorming.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      {onStartAnalysis && (
                        <button 
                          onClick={onStartAnalysis}
                          className="px-8 py-4 bg-[#58B895] hover:bg-[#4AA984] text-white font-semibold rounded-xl shadow-lg shadow-[#58B895]/20 transition-all duration-300 transform hover:-translate-y-1"
                        >
                          Start de Analyse
                        </button>
                      )}
                      <a 
                        href="mailto:info@doddar.nl"
                        className="px-8 py-4 bg-white/50 backdrop-blur-sm border border-[#D1D5DB] text-[#13261f] hover:border-[#58B895] hover:text-[#58B895] font-medium rounded-xl transition-all duration-300"
                      >
                        Neem contact op
                      </a>
                    </div>
                </div>
                <div className="hidden lg:block"></div>
            </div>
        </section>

        {/* Analytische Benadering */}
        <section className="bg-white rounded-[3rem] p-8 md:p-16 border border-[#E5E7EB] shadow-xl shadow-[#13261f]/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-[#F2F9F6] to-transparent -z-0"></div>

            <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 text-[#58B895] font-bold uppercase tracking-wider text-xs">
                        <span className="w-8 h-[1px] bg-[#58B895]"></span>
                        De Aanpak
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#13261f]">Analytische Benadering</h2>
                    <div className="space-y-6 text-lg text-[#4B5563] leading-loose">
                        <p>
                            Wij gebruiken de Doddar-metafoor voor situaties waarin feiten en emoties onlosmakelijk verstrengeld lijken. In complexe casussen – zoals fraude, arbeidsconflicten of dwingende controle – is de objectieve waarheid vaak onzichtbaar geworden.
                        </p>
                        <p>
                             Onze taak is feitenonderzoek zonder oordeel. Wij brengen systematisch in kaart wie welke invloed uitoefent en waar de juridische en feitelijke knelpunten liggen.
                        </p>
                    </div>
                </div>
                <div className="flex justify-center md:justify-end">
                    <img 
                        src={`${baseUrl}visie.svg`} 
                        alt="Menselijk gedrag en analyse" 
                        className="w-full max-w-md h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-700 mx-auto"
                    />
                </div>
            </div>
        </section>

        {/* Oorzaak & Gevolg */}
        <section>
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-[#13261f] mb-4">Van Incident naar Inzicht</h2>
                <p className="text-lg text-[#6B7280]">
                    Een grondig onderzoek kijkt verder dan het incident. Wij verbinden onderliggende mechanismen aan zichtbaar bewijs.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-[2.5rem] p-10 border border-[#E5E7EB] hover:border-[#6A9489]/50 shadow-sm hover:shadow-xl transition-all duration-300 group h-full">
                    <div className="w-14 h-14 bg-[#F2F9F6] rounded-2xl flex items-center justify-center mb-8 text-[#6A9489] group-hover:bg-[#6A9489] group-hover:text-white transition-colors">
                        <NetworkIcon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#13261f] mb-4">Systeemanalyse (De Oorzaak)</h3>
                    <p className="text-[#4B5563] text-lg leading-relaxed">
                        Gedrag staat niet op zichzelf. Wij analyseren de onderliggende systematiek: machtsverhoudingen, afhankelijkheid en terugkerende patronen die grensoverschrijdend gedrag mogelijk maken. Wij zoeken naar de bron, niet slechts de symptomen.
                    </p>
                </div>

                <div className="bg-white rounded-[2.5rem] p-10 border border-[#E5E7EB] hover:border-[#58B895]/50 shadow-sm hover:shadow-xl transition-all duration-300 group h-full">
                    <div className="w-14 h-14 bg-[#F2F9F6] rounded-2xl flex items-center justify-center mb-8 text-[#58B895] group-hover:bg-[#58B895] group-hover:text-white transition-colors">
                        <InvestigationIcon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#13261f] mb-4">Feitenrelaas (Het Gevolg)</h3>
                    <p className="text-[#4B5563] text-lg leading-relaxed">
                         Een vermoeden is juridisch gezien geen feit. Wij focussen op objectiveerbare waarnemingen, tijdlijnen en verifieerbare sporen. Wij leveren hard bewijs dat standhoudt in een juridische of zakelijke context.
                    </p>
                </div>
            </div>
        </section>

        {/* Methodiek */}
        <section className="bg-[#E8F5EF] rounded-[3rem] px-8 py-16 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full opacity-30 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                <div className="order-2 lg:order-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#13261f] mb-8">Onze Methodiek</h2>
                    <p className="text-lg text-[#13261f]/80 mb-12 max-w-lg">
                        Om tot waarheidsvinding te komen zonder oordeel, hanteren wij drie strikte kernwaarden in elk onderzoek:
                    </p>
                    
                    <div className="space-y-8">
                        {[
                            { title: "Objectiveren", desc: "Het vaststellen van feiten, los van interpretaties, zodat enkel verifieerbare waarnemingen overblijven.", color: "bg-[#58B895]" },
                            { title: "Contextualiseren", desc: "Een feit staat nooit op zichzelf. Wij plaatsen gedragingen in de juiste tijdlijn en omgevingsfactoren om patronen bloot te leggen.", color: "bg-[#6A9489]" },
                            { title: "Valideren", desc: "Onze bevindingen worden getoetst aan juridische kaders, wetenschappelijke literatuur en forensische standaarden.", color: "bg-[#13261f]" }
                        ].map((step, idx) => (
                            <div key={idx} className="flex gap-6">
                                <div className="flex flex-col items-center">
                                    <div className={`w-12 h-12 rounded-full ${step.color} text-white flex items-center justify-center font-bold font-serif text-xl shadow-md shrink-0`}>
                                        {idx + 1}
                                    </div>
                                    {idx < 2 && <div className="w-0.5 h-full bg-[#13261f]/10 my-2"></div>}
                                </div>
                                <div className="pb-8">
                                    <h4 className="text-xl font-bold text-[#13261f] mb-2">{step.title}</h4>
                                    <p className="text-[#4B5563] leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="order-1 lg:order-2 flex justify-center">
                    <img 
                        src={`${baseUrl}overonsteamwork.svg`} 
                        alt="Doddar Methodiek" 
                        className="w-full max-w-[280px] md:max-w-md h-auto object-contain drop-shadow-2xl mt-10 md:mt-0 opacity-70"
                    />
                </div>
            </div>
        </section>

        {/* Bio Sectie */}
        <section className="bg-white rounded-[3rem] p-8 md:p-12 border border-[#E5E7EB] shadow-lg">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                 <div className="flex justify-center md:justify-start w-full relative">
                    <div className="absolute inset-0 bg-[#13261f] rounded-[2.5rem] transform translate-x-4 translate-y-4 -z-10 opacity-5"></div>
                    <img 
                        src={`${baseUrl}overmij.svg`}
                        alt="Eigenaar Doddar"
                        className="w-full max-w-sm h-auto object-cover rounded-[2.5rem] shadow-md border border-white"
                    />
                </div>
                <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#13261f]">Achtergrond</h2>
                    <div className="space-y-6 text-[#4B5563] text-lg leading-loose">
                        <p className="font-medium text-[#13261f]">
                            Mijn focus ligt op het snijvlak van menselijk gedrag en harde bewijslast. Hoe maken we subjectief gedrag objectief aantoonbaar?
                        </p>
                        <p>
                            Als eigenaar van Doddar beschik ik over een Bsc. Biotechnologie met de specialisatie forensic sciences. Ik heb ruime ervaring binnen de bancaire sector op het gebied van financial crime en ben gecertificeerd in OSINT en body language analysis. Mijn opgedane ervaringen hebben geleid tot een scherp analytisch vermogen en een diepgaand inzicht in risico’s en onderliggende relaties. Ik ben aangesloten bij de brancheorganisatie voor particulier onderzoekers en beschik over een vergunning uitgegeven door het Ministerie van Justitie en Veiligheid.
                        </p>
                        
                        <div className="pt-4 flex items-center gap-2 text-[#58B895] font-bold text-sm uppercase tracking-widest">
                            <CheckIcon className="w-5 h-5" />
                            Gecertificeerd Onderzoeker
                        </div>
                    </div>
                </div>
            </div>
        </section>

      </div>
    </div>
  );
};

export default OverOns;