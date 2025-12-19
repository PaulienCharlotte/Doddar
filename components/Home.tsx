import React, { useRef, useState, useEffect } from 'react';
import InputSection from './InputSection';
import { OsintIcon } from './icons/OsintIcon';
import { ObservationIcon } from './icons/ObservationIcon';
import { InterviewIcon } from './icons/InterviewIcon';
import { BrainIcon } from './icons/BrainIcon';
import { ShieldIcon } from './icons/ShieldIcon';
import { CheckIcon } from './icons/CheckIcon';
import { InvestigationIcon } from './icons/InvestigationIcon';
import { LawIcon } from './icons/LawIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

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

// Helper component for scroll animations
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
            className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
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
    const [expandedExpertise, setExpandedExpertise] = useState<string | null>(null);
    const inputSectionRef = useRef<HTMLElement>(null);
    const expertiseSectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (scrollToInput && inputSectionRef.current) {
            setTimeout(() => {
                const element = inputSectionRef.current;
                if (element) {
                    // Bereken de positie met offset voor de navigatiebalk (~120px)
                    const headerOffset = 120;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
                if (onScrollComplete) onScrollComplete();
            }, 100);
        }
    }, [scrollToInput, onScrollComplete]);

    useEffect(() => {
        if (scrollToExpertise && expertiseSectionRef.current) {
            setTimeout(() => {
                const element = expertiseSectionRef.current;
                if (element) {
                    const headerOffset = 100;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
                if (onScrollExpertiseComplete) onScrollExpertiseComplete();
            }, 100);
        }
    }, [scrollToExpertise, onScrollExpertiseComplete]);

    const expertiseItems = [
        {
            id: 'osint',
            icon: <OsintIcon className="w-8 h-8" />,
            title: 'Openbronnenonderzoek',
            description: 'Digitaal speurwerk in openbare bronnen. Wij brengen digitale voetafdrukken, achtergronden en netwerken in kaart om een compleet beeld te vormen van een persoon of entiteit, zonder inbreuk te maken op privacy.'
        },
        {
            id: 'observatie',
            icon: <ObservationIcon className="w-8 h-8" />,
            title: 'Observatie',
            description: 'Discreet en feitelijk vastleggen van gedragingen in de fysieke ruimte. Observatie biedt objectief bewijs van wat er daadwerkelijk gebeurt, los van verklaringen of vermoedens.'
        },
        {
            id: 'interview',
            icon: <InterviewIcon className="w-8 h-8" />,
            title: 'Interview & lichaamstaal',
            description: 'Het gesprek als instrument voor waarheidsvinding. Wij analyseren niet alleen wat er gezegd wordt, maar ook non-verbale signalen en incongruentie tussen woord en daad.'
        },
        {
            id: 'advies', // Note: This might not have a direct section on Diensten.tsx yet, mapping to generic advice or specific section if exists.
            icon: <BrainIcon className="w-8 h-8" />,
            title: 'Advies & bewustwording',
            description: 'Preventie begint bij herkenning. Wij delen onze expertise om bewustwording te creëren over afwijkend gedrag en manipulatietechnieken, zodat u signalen vroegtijdig leert duiden.'
        },
        {
            id: 'screening',
            icon: <ShieldIcon className="w-8 h-8" />,
            title: 'Pre-screening',
            description: 'Voorkomen is beter dan genezen. Wij verifiëren achtergronden, cv\'s en integriteit van potentiële partners of medewerkers, zodat u weet met wie u in zee gaat.'
        },
        {
            id: 'recherche',
            icon: <InvestigationIcon className="w-8 h-8" />,
            title: 'Rechercheonderzoek',
            description: 'Diepgravend onderzoek naar integriteitsschendingen, fraude, pesterijen of grensoverschrijdend gedrag. Wij leveren een juridisch onderbouwd dossier.'
        }
    ];

    const toggleExpertise = (id: string) => {
        setExpandedExpertise(prev => prev === id ? null : id);
    };

    return (
        <div className="w-full relative overflow-hidden bg-[#F9FCFA]">

            {/* 1. Hero Sectie (Split Layout) */}
            <section className="relative pt-12 pb-16 md:pt-20 md:pb-48 overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-[#F2F9F6] to-[#F9FCFA] -z-10"></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E8F5EF]/50 to-transparent -z-10 rounded-bl-[10rem]"></div>

                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-32 items-center">

                        {/* Linkerkolom: Tekst & Logo */}
                        {/* Changed to flex-start and text-left everywhere for strict alignment */}
                        <div className="order-2 lg:order-1 flex flex-col items-start text-left space-y-6 animate-fade-in max-w-lg mx-0">
                            {/* Logo */}
                            <img
                                src="https://raw.githubusercontent.com/PaulienCharlotte/Doddar/refs/heads/main/images/logo%20doddar%20svg.svg"
                                alt="Doddar"
                                className="h-14 md:h-24 w-auto drop-shadow-sm mb-2"
                            />

                            <div className="space-y-4 md:space-y-6">
                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#13261f] tracking-tight leading-[1.1]">
                                    Inzicht in gedrag.<br />
                                    <span className="text-[#58B895]">Veiligheid in relaties.</span>
                                </h1>

                                <p className="text-base md:text-lg text-[#6B7280] font-normal leading-relaxed max-w-xl">
                                    Doddar is een particulier recherchebureau gericht op zowel zakelijke als particuliere relaties. Met verschillende methoden analyseren we (onrechtmatig) gedrag.
                                </p>
                            </div>
                        </div>

                        {/* Rechterkolom: Afbeelding */}
                        <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in relative" style={{ animationDelay: '100ms' }}>
                            <div className="relative w-full max-w-[240px] md:max-w-lg lg:max-w-full">
                                {/* Decoratieve cirkel achter afbeelding */}
                                <div className="absolute inset-0 bg-white/40 rounded-full blur-3xl transform scale-90"></div>

                                <img
                                    src="/images/hero_illustration.png"
                                    alt="Doddar Homepage Illustratie"
                                    className="w-full h-auto object-contain relative z-10 drop-shadow-lg transform hover:scale-[1.02] transition-transform duration-700"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Casus Analyse Tool */}
            {/* MOBILE UPDATE: Removed negative margin on mobile (mt-8) to prevent overlap. Kept desktop overlap (md:-mt-16) for visual depth. */}
            <section ref={inputSectionRef} className="relative z-20 px-4 pb-20 md:pb-32 mt-8 md:-mt-16">
                <FadeInSection>
                    <div className="max-w-7xl mx-auto">
                        {/* Tool Card */}
                        <div className="transition-all duration-500 hover:shadow-2xl rounded-[1.5rem] md:rounded-[2rem] mb-12 lg:mb-24 bg-white">
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

                        {/* Direct Contact CTA - Verbeterde Versie */}
                        <div className="flex justify-center animate-fade-in">
                            <div className="bg-[#F2F9F6] rounded-[2rem] md:rounded-[3rem] border border-[#58B895]/20 shadow-xl hover:shadow-2xl transition-all duration-300 p-8 md:p-12 w-full max-w-6xl flex flex-col md:flex-row items-center gap-8 md:gap-16 relative overflow-hidden group">

                                {/* Decorative background element */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#58B895]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                                {/* Afbeelding - Vergroot en in kader */}
                                <div className="flex-shrink-0 relative z-10">
                                    <div className="bg-white p-6 rounded-full shadow-sm border border-[#58B895]/10">
                                        <img
                                            src="/images/contact_visual.png"
                                            alt="Contact"
                                            className="w-32 h-32 md:w-56 md:h-56 object-contain transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </div>

                                {/* Tekst */}
                                <div className="flex-grow text-center md:text-left space-y-4 relative z-10">
                                    <h3 className="text-3xl md:text-4xl font-bold text-[#13261f] tracking-tight">
                                        Direct Contact
                                    </h3>
                                    <p className="text-lg text-[#4B5563] font-medium leading-relaxed max-w-xl mx-auto md:mx-0">
                                        Sla de online analyse over. Plan direct een intakegesprek om uw situatie <span className="text-[#58B895] font-bold">vertrouwelijk</span> en discreet te bespreken.
                                    </p>
                                </div>

                                {/* Knop */}
                                <div className="flex-shrink-0 w-full md:w-auto relative z-10">
                                    <button
                                        onClick={onOpenContact}
                                        className="w-full md:w-auto whitespace-nowrap px-8 py-4 md:px-12 md:py-6 bg-[#13261f] hover:bg-[#58B895] text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3"
                                    >
                                        Neem contact op <span className="text-xl">→</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeInSection>
            </section>

            {/* 3. Voor wie? (Redesigned: Clean Cards with Subtle Background Illustrations) */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pb-20 md:pb-32">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">

                    {/* Particulieren */}
                    <FadeInSection delay={100} className="h-full">
                        <div className="group relative h-full bg-white rounded-[2.5rem] md:rounded-[3rem] border border-[#E5E7EB] hover:border-[#58B895]/30 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden p-8 md:p-12 flex flex-col justify-between">

                            {/* Content */}
                            <div className="relative z-20 flex flex-col h-full">
                                <div className="mb-6">
                                    <h3 className="text-2xl lg:text-4xl font-bold text-[#13261f] mb-3">Voor particulieren</h3>
                                    <div className="h-1.5 w-24 bg-[#58B895] rounded-full"></div>
                                </div>

                                <p className="text-[#4B5563] font-normal leading-relaxed text-base md:text-lg mb-8 max-w-md bg-[#F2F9F6]/50 p-4 rounded-xl">
                                    Zit u vast in een complexe relatie, heeft u te maken met stalking, manipulatie of voelt u zich onveilig? Wij helpen u de feiten te onderscheiden van emotie en geven u de regie terug.
                                </p>

                                {/* Bullets */}
                                <div className="space-y-4 mb-12 max-w-md">
                                    <div className="flex items-start gap-4">
                                        <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#E8F5EF] flex items-center justify-center text-[#58B895]"><CheckIcon className="w-3.5 h-3.5" /></span>
                                        <span className="text-[#13261f] font-medium text-sm md:text-base">Inzicht in grensoverschrijdend gedrag</span>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#E8F5EF] flex items-center justify-center text-[#58B895]"><CheckIcon className="w-3.5 h-3.5" /></span>
                                        <span className="text-[#13261f] font-medium text-sm md:text-base">Ondersteuning bij conflicten</span>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#E8F5EF] flex items-center justify-center text-[#58B895]"><CheckIcon className="w-3.5 h-3.5" /></span>
                                        <span className="text-[#13261f] font-medium text-sm md:text-base">Bewijsverzameling voor juridische stappen</span>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <button
                                        onClick={onOpenContact}
                                        className="inline-flex items-center gap-3 px-6 py-3 bg-[#13261f] text-white font-bold text-base md:text-lg rounded-xl shadow-md hover:bg-[#58B895] transition-all duration-300 transform hover:-translate-y-0.5"
                                    >
                                        Neem contact op <span className="text-xl">→</span>
                                    </button>
                                </div>
                            </div>

                            {/* Illustratie Rechtsonder - Subtieler gepositioneerd */}
                            <div className="absolute bottom-0 right-0 w-48 h-40 md:w-64 md:h-56 z-10 pointer-events-none opacity-30 mix-blend-multiply">
                                <img
                                    src="https://raw.githubusercontent.com/PaulienCharlotte/Doddar/refs/heads/main/images/onderzoek%20als%20particulier.svg"
                                    alt=""
                                    className="w-full h-full object-contain object-bottom-right"
                                />
                            </div>
                            {/* Soft gradient fade at bottom */}
                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#E8F5EF]/30 to-transparent pointer-events-none z-0"></div>
                        </div>
                    </FadeInSection>

                    {/* Zakelijk */}
                    <FadeInSection delay={200} className="h-full">
                        <div className="group relative h-full bg-white rounded-[2.5rem] md:rounded-[3rem] border border-[#E5E7EB] hover:border-[#6A9489]/30 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden p-8 md:p-12 flex flex-col justify-between">

                            {/* Content */}
                            <div className="relative z-20 flex flex-col h-full">
                                <div className="mb-6">
                                    <h3 className="text-2xl lg:text-4xl font-bold text-[#13261f] mb-3">Voor organisaties</h3>
                                    <div className="h-1.5 w-24 bg-[#6A9489] rounded-full"></div>
                                </div>

                                <p className="text-[#4B5563] font-normal leading-relaxed text-base md:text-lg mb-8 max-w-md bg-[#F2F9F6]/50 p-4 rounded-xl">
                                    Van MKB tot zorginstelling en sportclub: wij ondersteunen bij integriteitskwesties, interne fraude, pesterijen of screening van personeel. Wij zorgen voor een veilig werkklimaat.
                                </p>

                                {/* Bullets */}
                                <div className="space-y-4 mb-12 max-w-md">
                                    <div className="flex items-start gap-4">
                                        <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#E8F5EF] flex items-center justify-center text-[#6A9489]"><CheckIcon className="w-3.5 h-3.5" /></span>
                                        <span className="text-[#13261f] font-medium text-sm md:text-base">Integriteitsonderzoek & fraude</span>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#E8F5EF] flex items-center justify-center text-[#6A9489]"><CheckIcon className="w-3.5 h-3.5" /></span>
                                        <span className="text-[#13261f] font-medium text-sm md:text-base">Interne risico-analyse</span>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#E8F5EF] flex items-center justify-center text-[#6A9489]"><CheckIcon className="w-3.5 h-3.5" /></span>
                                        <span className="text-[#13261f] font-medium text-sm md:text-base">Preventieve screening</span>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <button
                                        onClick={onOpenContact}
                                        className="inline-flex items-center gap-3 px-6 py-3 bg-[#13261f] text-white font-bold text-base md:text-lg rounded-xl shadow-md hover:bg-[#6A9489] transition-all duration-300 transform hover:-translate-y-0.5"
                                    >
                                        Neem contact op <span className="text-xl">→</span>
                                    </button>
                                </div>
                            </div>

                            {/* Illustratie Rechtsonder - Subtieler gepositioneerd */}
                            <div className="absolute bottom-0 right-0 w-48 h-40 md:w-64 md:h-56 z-10 pointer-events-none opacity-30 mix-blend-multiply">
                                <img
                                    src="https://raw.githubusercontent.com/PaulienCharlotte/Doddar/refs/heads/main/images/bedrijf.svg"
                                    alt=""
                                    className="w-full h-full object-contain object-bottom-right"
                                />
                            </div>
                            {/* Soft gradient fade at bottom */}
                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#E8F5EF]/30 to-transparent pointer-events-none z-0"></div>
                        </div>
                    </FadeInSection>
                </div>
            </section>

            {/* 4. Diensten Overzicht (Desktop Grid / Mobile Accordion) */}
            <section ref={expertiseSectionRef} className="relative z-10 max-w-6xl mx-auto px-4 py-12 md:py-16">
                <FadeInSection>
                    <div className="text-center mb-12 md:mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#13261f]">Onze Expertise</h2>
                        <p className="text-[#13261f] font-bold mt-4 md:mt-6 text-lg md:text-xl leading-relaxed">Gespecialiseerde methoden voor waarheidsvinding en preventie.</p>
                    </div>
                </FadeInSection>

                {/* DESKTOP VIEW: Grid */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {expertiseItems.map((item, index) => (
                        <FadeInSection key={item.id} delay={index * 100} className="h-full">
                            <div className="bg-white p-10 rounded-[2rem] border border-[#E5E7EB] shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col hover:-translate-y-2">
                                <div className="w-14 h-14 bg-[#E8F5EF] rounded-2xl flex items-center justify-center mb-8 text-[#58B895]">
                                    {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8" })}
                                </div>
                                <h3 className="text-xl font-bold text-[#13261f] mb-4">{item.title}</h3>
                                <p className="text-[#13261f] font-normal leading-loose text-base mb-6">
                                    {item.description}
                                </p>
                                {/* Lees Meer knop */}
                                <button
                                    onClick={() => onOpenService(item.id)}
                                    className="mt-auto text-[#58B895] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all group"
                                >
                                    Lees meer <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                        </FadeInSection>
                    ))}
                </div>

                {/* MOBILE VIEW: Accordion */}
                <div className="md:hidden flex flex-col gap-4">
                    {expertiseItems.map((item, index) => {
                        const isOpen = expandedExpertise === item.id;
                        return (
                            <FadeInSection key={item.id} delay={index * 50}>
                                <div
                                    className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-[#58B895] shadow-md' : 'border-[#E5E7EB] shadow-sm'}`}
                                >
                                    <button
                                        onClick={() => toggleExpertise(item.id)}
                                        className="w-full flex items-center gap-4 p-5 text-left outline-none"
                                    >
                                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isOpen ? 'bg-[#58B895] text-white' : 'bg-[#E8F5EF] text-[#58B895]'}`}>
                                            {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6" })}
                                        </div>
                                        <span className="flex-grow font-bold text-[#13261f] text-lg">{item.title}</span>
                                        <ChevronDownIcon className={`w-5 h-5 text-[#9CA3AF] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className="p-5 pt-0 text-[#13261f] font-normal leading-relaxed text-sm border-t border-dashed border-[#E5E7EB] mt-2 pt-4 mx-5 mb-5">
                                            {item.description}
                                            {/* Lees Meer knop Mobile */}
                                            <button
                                                onClick={() => onOpenService(item.id)}
                                                className="block mt-4 text-[#58B895] font-bold text-sm"
                                            >
                                                Lees meer →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </FadeInSection>
                        );
                    })}
                </div>
            </section>

            {/* 5. NIEUWE SECTIE: Waarom Doddar? (Floating Card) */}
            <section className="relative z-10 px-4 py-8 md:py-12">
                <div className="max-w-7xl mx-auto bg-black text-white py-12 md:py-28 px-6 md:px-12 relative overflow-hidden rounded-[2rem] md:rounded-2xl shadow-2xl">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>

                    {/* Decorative Elements - Playful Integration */}
                    <img
                        src="https://raw.githubusercontent.com/PaulienCharlotte/Doddar/refs/heads/main/images/plantje%20wit.svg"
                        alt=""
                        className="absolute -bottom-6 -left-6 w-32 h-32 md:w-64 md:h-64 lg:w-96 lg:h-96 opacity-20 pointer-events-none transform rotate-12 object-contain"
                    />
                    <img
                        src="https://raw.githubusercontent.com/PaulienCharlotte/Doddar/refs/heads/main/images/visie%20wit.svg"
                        alt=""
                        className="absolute top-6 right-0 w-32 h-32 md:w-72 md:h-72 lg:w-[30rem] lg:h-[30rem] opacity-25 pointer-events-none object-contain"
                    />

                    <div className="relative z-10">
                        <FadeInSection>
                            <div className="text-center mb-12 md:mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Waarom kiezen voor Doddar?</h2>
                                <p className="text-gray-200 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                                    In situaties van onzekerheid is betrouwbaarheid uw kostbaarste bezit. Wij garanderen een aanpak die juridisch staat als een huis.
                                </p>
                            </div>
                        </FadeInSection>

                        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                            {/* Pijler 1 */}
                            <FadeInSection delay={100}>
                                <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm h-full hover:bg-white/10 transition-colors duration-300 text-center space-y-4">
                                    <div className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-[#58B895]">
                                        <ShieldIcon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Erkend & gecertificeerd</h3>
                                    <p className="text-gray-200 leading-relaxed font-normal">
                                        Officieel erkend door het Ministerie van Justitie en Veiligheid (POB 8766) en is aangesloten bij de branchevereniging. Wij werken volgens de strengste wettelijke kaders.
                                    </p>
                                </div>
                            </FadeInSection>

                            {/* Pijler 2 */}
                            <FadeInSection delay={200}>
                                <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm h-full hover:bg-white/10 transition-colors duration-300 text-center space-y-4">
                                    <div className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-[#58B895]">
                                        <CheckIcon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Discreet & integer</h3>
                                    <p className="text-gray-200 leading-relaxed font-normal">
                                        Uw privacy en reputatie staan voorop. Wij handelen conform de Privacygedragscode en de AVG.
                                    </p>
                                </div>
                            </FadeInSection>

                            {/* Pijler 3 */}
                            <FadeInSection delay={300}>
                                <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm h-full hover:bg-white/10 transition-colors duration-300 text-center space-y-4">
                                    <div className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center text-[#58B895] mb-6">
                                        <LawIcon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Juridisch onderbouwd</h3>
                                    <p className="text-gray-200 leading-relaxed font-normal">
                                        Een vermoeden is geen bewijs. Wij leveren een objectieve rapportage die standhoudt in juridische procedures en bij zakelijke conflicten.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Afsluitende Banner (Compact & Styled) */}
            <section className="relative z-10 px-4 py-16 md:py-24">
                <div className="max-w-4xl mx-auto">
                    <FadeInSection>
                        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-[#E5E7EB] shadow-xl p-10 md:p-14 text-center">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#13261f] mb-6">
                                Wacht niet tot vermoedens escaleren.
                            </h2>
                            <p className="text-[#13261f] text-lg font-bold mb-10 text-opacity-80">
                                Duidelijkheid is de eerste stap naar een oplossing.
                            </p>
                            <button
                                onClick={onOpenContact}
                                className="inline-flex items-center gap-2 text-[#58B895] font-bold text-lg hover:text-[#13261f] transition-colors border-b-2 border-transparent hover:border-[#58B895] pb-1"
                            >
                                Neem contact op voor een vertrouwelijk gesprek <span aria-hidden="true">&rarr;</span>
                            </button>
                        </div>
                    </FadeInSection>
                </div>
            </section>

        </div>
    );
};

export default Home;