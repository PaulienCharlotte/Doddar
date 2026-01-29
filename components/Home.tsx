import React, { useRef, useState, useEffect } from 'react';
import InputSection from './InputSection';
import { OsintIcon } from './icons/OsintIcon';
import { ObservationIcon } from './icons/ObservationIcon';
import { InterviewIcon } from './icons/InterviewIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { ShieldIcon } from './icons/ShieldIcon';
import { CheckIcon } from './icons/CheckIcon';
import { InvestigationIcon } from './icons/InvestigationIcon';
import { LawIcon } from './icons/LawIcon';
import { MessageCircleIcon } from './icons/MessageCircleIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { ClockIcon } from './icons/ClockIcon';

interface HomeProps {
    onAnalyze: (description: string) => void;
    onMinorHelp: () => void;
    isLoading: boolean;
    text: string;
    onTextChange: (newText: string) => void;
    isRewriting: boolean;
    rewriteSuggestion: string | null;
    onAcceptSuggestion: () => void;
    onDismissSuggestion: () => void;
    onOpenComplaints: () => void;
    onOpenPrivacy: () => void;
    onOpenTerms: () => void;
    onOpenKnowledge: (category?: string) => void;
    onOpenDisclaimer: () => void;
    onOpenContact: () => void;
    onOpenService: (id: string) => void;
    scrollToInput?: boolean;
    onScrollComplete?: () => void;
    scrollToExpertise?: boolean;
    onScrollExpertiseComplete?: () => void;
}

const FadeInSection: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        if (domRef.current) observer.unobserve(domRef.current);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const { current } = domRef;
        if (current) observer.observe(current);

        return () => {
            if (current) observer.unobserve(current);
        };
    }, []);

    return (
        <div
            ref={domRef}
            className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const Home: React.FC<HomeProps> = ({
    onAnalyze,
    onMinorHelp,
    isLoading,
    text,
    onTextChange,
    isRewriting,
    rewriteSuggestion,
    onAcceptSuggestion,
    onDismissSuggestion,
    onOpenComplaints,
    onOpenPrivacy,
    onOpenTerms,
    onOpenKnowledge,
    onOpenDisclaimer,
    onOpenContact,
    onOpenService,
    scrollToInput,
    onScrollComplete,
    scrollToExpertise,
    onScrollExpertiseComplete
}) => {
    const inputSectionRef = useRef<HTMLElement>(null);
    const expertiseSectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (scrollToInput && inputSectionRef.current) {
            setTimeout(() => {
                const element = inputSectionRef.current;
                if (element) {
                    const headerOffset = 120;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
                if (onScrollComplete) onScrollComplete();
            }, 100);
        }
    }, [scrollToInput, onScrollComplete]);

    const expertiseItems = [
        { id: 'osint', icon: <OsintIcon className="w-8 h-8" />, title: 'Openbronnenonderzoek', description: 'Digitaal speurwerk in openbare bronnen. Wij brengen digitale voetafdrukken in kaart.' },
        { id: 'observatie', icon: <ObservationIcon className="w-8 h-8" />, title: 'Observatie', description: 'Discreet en feitelijk vastleggen van gedragingen in de fysieke ruimte.' },
        { id: 'interview', icon: <InterviewIcon className="w-8 h-8" />, title: 'Interview & lichaamstaal', description: 'Het gesprek als instrument voor waarheidsvinding.' },
        { id: 'advies', icon: <LightbulbIcon className="w-8 h-8" />, title: 'Advies & bewustwording', description: 'Preventie begint bij herkenning.' },
        { id: 'screening', icon: <ShieldIcon className="w-8 h-8" />, title: 'Pre-screening', description: 'Voorkomen is beter dan genezen.' },
        { id: 'recherche', icon: <InvestigationIcon className="w-8 h-8" />, title: 'Rechercheonderzoek', description: 'Diepgravend onderzoek naar integriteitsschendingen.' }
    ];

    const baseUrl = "/images/";

    return (
        <div className="w-full relative overflow-hidden bg-[#F9FCFA]">
            {/* Hero Section - Light & Airy */}
            <section className="relative pt-16 pb-16 md:pt-24 md:pb-28 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-[#F2F9F6] to-[#F9FCFA] -z-10"></div>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
                        <div className="order-2 lg:order-1 flex flex-col items-start text-left space-y-10 animate-fade-in max-w-xl mx-0">

                            {/* Logo Area */}
                            <div className="flex flex-col items-start w-full max-w-[280px] md:max-w-[340px]">
                                <img src={`${baseUrl}logododdar.svg`} alt="Doddar" className="w-full h-auto mb-3 drop-shadow-sm" />
                                <div className="w-full flex justify-between px-1 text-[13px] md:text-[15px] font-bold text-[#13261f] uppercase select-none leading-none tracking-widest opacity-90">
                                    {"RECHERCHEBUREAU".split("").map((char, i) => (
                                        <span key={i}>{char}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4 md:space-y-6">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#13261f] tracking-tight leading-[1.1]">
                                    Inzicht in gedrag.<br />
                                    <span className="text-[#58B895]">Veiligheid in relaties.</span>
                                </h1>
                                <p className="text-lg md:text-xl text-[#6B7280] font-light leading-relaxed max-w-xl">
                                    Doddar is een erkend particulier recherchebureau gespecialiseerd in waarheidsvinding bij complexe dynamieken en gedragspatronen.
                                </p>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in relative">
                            <div className="relative w-full max-w-[280px] md:max-w-lg lg:max-w-full">
                                <img src={`${baseUrl}homehumondot.svg`} alt="Doddar Recherche" className="w-full h-auto object-contain relative z-10 drop-shadow-xl opacity-90" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Action Section - Analysis & Intake */}
            <section ref={inputSectionRef} className="relative z-30 px-4 mt-8 md:mt-12 pb-24 md:pb-32">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-[1.6fr_1fr] gap-10 items-stretch">

                        {/* Left: Component - Analysis Tool */}
                        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-[#E5E7EB] overflow-hidden flex flex-col">
                            <div className="p-8 md:p-10 pb-2">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-3xl md:text-3xl font-bold text-[#13261f]">Casusanalyse</h3>
                                    <div className="px-4 py-1.5 bg-[#F2F9F6] rounded-full border border-[#58B895]/20 text-[#58B895] text-[10px] font-bold uppercase tracking-widest shadow-sm">
                                        AI Ondersteund
                                    </div>
                                </div>
                                <p className="text-[#6B7280] font-light text-lg italic max-w-2xl leading-relaxed">
                                    Beschrijf uw situatie voor een direct geautomatiseerde patroonherkenning en haalbaarheidsindicatie.
                                </p>
                            </div>
                            <div className="flex-grow">
                                <InputSection
                                    onAnalyze={onAnalyze}
                                    onMinorHelp={onMinorHelp}
                                    isLoading={isLoading}
                                    text={text}
                                    onTextChange={onTextChange}
                                    isRewriting={isRewriting}
                                    rewriteSuggestion={rewriteSuggestion}
                                    onAcceptSuggestion={onAcceptSuggestion}
                                    onDismissSuggestion={onDismissSuggestion}
                                    onOpenComplaints={onOpenComplaints}
                                    onOpenPrivacy={onOpenPrivacy}
                                    onOpenTerms={onOpenTerms}
                                    onOpenKnowledge={onOpenKnowledge}
                                    onOpenDisclaimer={onOpenDisclaimer}
                                />
                            </div>
                        </div>

                        {/* Right: Component - Free Intake CTA */}
                        <div className="bg-[#13261f] rounded-[2.5rem] p-8 lg:p-10 shadow-2xl relative overflow-hidden group flex flex-col justify-between min-h-[500px] border border-white/5">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-[#58B895]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                            <div className="relative z-10">
                                <span className="inline-flex items-center gap-2 bg-[#58B895] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-6 shadow-lg">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                                    Gratis & Vrijblijvend
                                </span>

                                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-[1.1] text-white">
                                    Plan een <br />
                                    <span className="text-[#58B895]">Intakegesprek</span>
                                </h2>

                                <p className="text-gray-300 text-lg mb-8 leading-relaxed font-light">
                                    Direct helderheid over de juridische kaders en haalbaarheid van uw casus.
                                </p>

                                <div className="space-y-6 mb-8">
                                    <div className="flex items-center gap-5 group/item">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#58B895] border border-white/10 group-hover/item:border-[#58B895]/50 transition-all"><ClockIcon className="w-6 h-6" /></div>
                                        <div className="flex flex-col">
                                            <span className="text-base font-bold text-white">Binnen 24 uur contact</span>
                                            <span className="text-xs text-gray-400">Persoonlijk & deskundig</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-5 group/item">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#58B895] border border-white/10 group-hover/item:border-[#58B895]/50 transition-all"><ShieldIcon className="w-6 h-6" /></div>
                                        <div className="flex flex-col">
                                            <span className="text-base font-bold text-white">100% Vertrouwelijk</span>
                                            <span className="text-xs text-gray-400">Discreet vanaf het eerste moment</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={onOpenContact}
                                className="w-full py-5 bg-white hover:bg-[#58B895] text-[#13261f] hover:text-white font-bold rounded-xl shadow-2xl transition-all duration-500 text-lg flex items-center justify-center gap-3 transform hover:-translate-y-1"
                            >
                                Afspraak Inplannen <span className="text-2xl leading-none">→</span>
                            </button>
                        </div>

                    </div>
                </div>
            </section>

        </div>
                </div >
            </section >

    {/* Intake Step Visualization */ }
    < section className = "relative z-10 max-w-7xl mx-auto px-4 md:px-6 pb-24 md:pb-32" >
        <div className="bg-[#F2F9F6] rounded-[3rem] p-12 md:p-20 border border-[#58B895]/20 shadow-xl relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#58B895]"></div>

            <div className="max-w-3xl mx-auto mb-16 md:mb-24">
                <h2 className="text-4xl md:text-5xl font-bold text-[#13261f] mb-6 leading-tight">Hoe werkt een intake?</h2>
                <p className="text-lg md:text-xl text-[#4B5563] font-light leading-relaxed">
                    De fundering van elk gedegen feitenonderzoek begint bij een helder en veilig gesprek.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
                {[
                    { step: "01", icon: <MessageCircleIcon className="w-12 h-12" />, title: "Uw Verhaal", desc: "In een beveiligde omgeving deelt u de feiten en uw zorgen. Wij luisteren zonder oordeel." },
                    { step: "02", icon: <CalendarIcon className="w-12 h-12" />, title: "Toetsing", desc: "Wij toetsen direct aan de wet (Wpbr/AVG) en bepalen welke onderzoeksmethode het meest effectief is." },
                    { step: "03", icon: <InvestigationIcon className="w-12 h-12" />, title: "Plan van Aanpak", desc: "U ontvangt een voorstel met doorlooptijd, budget en de verwachte waarde van het bewijs." }
                ].map((item, idx) => (
                    <div key={idx} className="relative flex flex-col items-center text-center group">
                        <div className="text-[6rem] md:text-[8rem] font-bold text-[#58B895]/5 absolute -top-16 md:-top-20 leading-none select-none group-hover:text-[#58B895]/10 transition-colors">{item.step}</div>
                        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-[#58B895] shadow-lg mb-8 relative z-10 border border-[#E8F5EF] group-hover:scale-105 transition-transform duration-500">
                            {item.icon}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-[#13261f] mb-4 relative z-10">{item.title}</h3>
                        <p className="text-[#6B7280] leading-relaxed font-light">{item.desc}</p>
                    </div>
                ))}
            </div>

            <div className="mt-16">
                <button
                    onClick={onOpenContact}
                    className="inline-flex items-center gap-5 px-12 py-5 bg-[#13261f] text-white font-bold rounded-2xl hover:bg-[#58B895] transition-all shadow-xl transform hover:-translate-y-1 active:scale-[0.98] text-lg"
                >
                    Start gratis intake <span className="text-2xl">→</span>
                </button>
            </div>
        </div>
            </section >

    {/* Target Audiences */ }
    < section className = "relative z-10 max-w-7xl mx-auto px-4 md:px-6 pb-24 md:pb-32" >
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <FadeInSection delay={100} className="h-full">
                <div className="group relative h-full bg-white rounded-[2.5rem] border border-[#E5E7EB] hover:border-[#58B895]/30 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden p-10 md:p-14 flex flex-col justify-between">
                    <div className="relative z-20 flex flex-col h-full">
                        <div className="mb-8"><h3 className="text-4xl lg:text-5xl font-bold text-[#13261f] mb-4 leading-tight">Voor<br />particulieren</h3><div className="h-2 w-28 bg-[#58B895] rounded-full"></div></div>
                        <p className="text-[#4B5563] font-light leading-relaxed text-lg md:text-xl mb-10 max-w-md bg-[#F2F9F6]/50 p-6 rounded-2xl border border-[#58B895]/10">Twijfels over de veiligheid of integriteit in uw relaties? Wij helpen u feiten boven tafel te krijgen.</p>
                        <div className="mt-auto"><button onClick={onOpenContact} className="inline-flex items-center gap-4 px-8 py-4 bg-[#13261f] text-white font-bold rounded-2xl hover:bg-[#58B895] transition-all text-lg">Neem contact op →</button></div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-64 h-56 md:w-80 md:h-72 z-10 pointer-events-none opacity-20 mix-blend-multiply transition-transform duration-700 group-hover:scale-105">
                        <img src={`${baseUrl}particulier.svg`} alt="" className="w-full h-full object-contain object-bottom-right" />
                    </div>
                </div>
            </FadeInSection>
            <FadeInSection delay={200} className="h-full">
                <div className="group relative h-full bg-white rounded-[2.5rem] border border-[#E5E7EB] hover:border-[#6A9489]/30 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden p-10 md:p-14 flex flex-col justify-between">
                    <div className="relative z-20 flex flex-col h-full">
                        <div className="mb-8"><h3 className="text-4xl lg:text-5xl font-bold text-[#13261f] mb-4 leading-tight">Voor<br />organisaties</h3><div className="h-2 w-28 bg-[#6A9489] rounded-full"></div></div>
                        <p className="text-[#4B5563] font-light leading-relaxed text-lg md:text-xl mb-10 max-w-md bg-[#F2F9F6]/50 p-6 rounded-2xl border border-[#6A9489]/10">Ondersteuning bij integriteitskwesties, verzuimfraude of screening van personeel.</p>
                        <div className="mt-auto"><button onClick={onOpenContact} className="inline-flex items-center gap-4 px-8 py-4 bg-[#13261f] text-white font-bold rounded-2xl hover:bg-[#6A9489] transition-all text-lg">Neem contact op →</button></div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-64 h-56 md:w-80 md:h-72 z-10 pointer-events-none opacity-20 mix-blend-multiply transition-transform duration-700 group-hover:scale-105">
                        <img src="/images/bedrijf.svg" alt="" className="w-full h-full object-cover scale-110 object-bottom-right" />
                    </div>
                </div>
            </FadeInSection>
        </div>
            </section >

    {/* Expertise Section */ }
    < section ref = { expertiseSectionRef } className = "relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-24" >
                <FadeInSection><div className="text-center mb-16 md:mb-20"><h2 className="text-4xl md:text-5xl font-bold text-[#13261f]">Onze Expertise</h2></div></FadeInSection>
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {expertiseItems.map((item, index) => (
                        <FadeInSection key={item.id} delay={index * 100} className="h-full">
                            <div className="bg-white p-10 rounded-[2.5rem] border border-[#E5E7EB] shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col hover:-translate-y-2">
                                <div className="w-16 h-16 bg-[#E8F5EF] rounded-2xl flex items-center justify-center mb-10 text-[#58B895]">{item.icon}</div>
                                <h3 className="text-2xl font-bold text-[#13261f] mb-6 leading-tight">{item.title}</h3>
                                <p className="text-[#13261f] font-light leading-relaxed text-lg mb-8">{item.description}</p>
                                <button onClick={() => onOpenService(item.id)} className="mt-auto text-[#58B895] font-bold text-base hover:underline transition-all">Lees meer →</button>
                            </div>
                        </FadeInSection>
                    ))}
                </div>
            </section >

    {/* Why Doddar Section */ }
    < section className = "relative z-10 px-4 py-16 md:py-24" >
        <div className="max-w-7xl mx-auto bg-white text-[#13261f] py-20 md:py-32 px-10 md:px-16 relative overflow-hidden rounded-[3rem] border border-[#E5E7EB] shadow-xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#F2F9F6] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-50"></div>

            <div className="relative z-10">
                <FadeInSection><div className="text-center mb-16 md:mb-20"><h2 className="text-4xl md:text-6xl font-bold mb-8 text-[#13261f]">Waarom Doddar?</h2></div></FadeInSection>
                <div className="grid md:grid-cols-3 gap-12 md:gap-16">
                    <div className="bg-[#F9FCFA] p-10 rounded-[2rem] border border-[#E5E7EB] text-center space-y-6 group hover:bg-white hover:shadow-lg transition-all duration-500">
                        <div className="w-20 h-20 mx-auto bg-white rounded-[1.5rem] flex items-center justify-center mb-6 text-[#58B895] shadow-sm group-hover:scale-105 transition-transform border border-[#E5E7EB]"><ShieldIcon className="w-10 h-10" /></div>
                        <h3 className="text-2xl font-bold text-[#13261f]">Erkend & Gecertificeerd</h3>
                        <p className="text-[#6B7280] leading-relaxed text-lg font-light">POB 8766. Wij werken volgens de wettelijke kaders van Justitie.</p>
                    </div>
                    <div className="bg-[#F9FCFA] p-10 rounded-[2rem] border border-[#E5E7EB] text-center space-y-6 group hover:bg-white hover:shadow-lg transition-all duration-500">
                        <div className="w-20 h-20 mx-auto bg-white rounded-[1.5rem] flex items-center justify-center mb-6 text-[#58B895] shadow-sm group-hover:scale-105 transition-transform border border-[#E5E7EB]"><CheckIcon className="w-10 h-10" /></div>
                        <h3 className="text-2xl font-bold text-[#13261f]">Discreet & Integer</h3>
                        <p className="text-[#6B7280] leading-relaxed text-lg font-light">Uw privacy en reputatie staan voorop in elk traject.</p>
                    </div>
                    <div className="bg-[#F9FCFA] p-10 rounded-[2rem] border border-[#E5E7EB] text-center space-y-6 group hover:bg-white hover:shadow-lg transition-all duration-500">
                        <div className="w-20 h-20 mx-auto bg-white rounded-[1.5rem] flex items-center justify-center text-[#58B895] mb-6 shadow-sm group-hover:scale-105 transition-transform border border-[#E5E7EB]"><LawIcon className="w-10 h-10" /></div>
                        <h3 className="text-2xl font-bold text-[#13261f]">Juridisch Onderbouwd</h3>
                        <p className="text-[#6B7280] leading-relaxed text-lg font-light">Objectieve rapportage die standhoudt bij conflicten.</p>
                    </div>
                </div>
            </div>
        </div>
            </section >
        </div >
    );
};

export default Home;