import React, { useState, useEffect } from 'react';
import { MailIcon } from './icons/MailIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { LocationIcon } from './icons/LocationIcon';
import { DossierIcon } from './icons/DossierIcon';
import { SendIcon } from './icons/SendIcon';
import { CheckIcon } from './icons/CheckIcon';
import { ShieldIcon } from './icons/ShieldIcon';
import type { AnalysisContext } from '../types';

interface ContactProps {
    initialContext?: AnalysisContext | null;
    onOpenComplaints?: () => void;
    onOpenPrivacy?: () => void;
    onOpenTerms?: () => void;
    onOpenKnowledge?: (category?: string) => void;
    onOpenDisclaimer?: () => void;
}

const Contact: React.FC<ContactProps> = ({ initialContext, onOpenComplaints, onOpenPrivacy, onOpenTerms, onOpenKnowledge, onOpenDisclaimer }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const baseUrl = "/images/";

    // Pre-fill form if analysis context is provided
    useEffect(() => {
        if (initialContext) {
            const sections = [
                `Beste Doddar,\n\nIk want graag een intakegesprek aanvragen op basis van mijn recente online analyse.`,
                `--- SAMENVATTING ANALYSE ---\n${initialContext.summary}`,
                `--- GEDRAGSKENMERKEN ---\n${initialContext.patterns.join(', ')}`
            ];

            if (initialContext.legal_factors && initialContext.legal_factors.length > 0) {
                sections.push(`--- JURIDISCHE INDICATOREN ---\n${initialContext.legal_factors.join('\n')}`);
            }

            if (initialContext.scientific_context && initialContext.scientific_context.length > 0) {
                sections.push(`--- WETENSCHAPPELIJKE ONDERBOUWING ---\n${initialContext.scientific_context.join('\n')}`);
            }

            if (initialContext.methods && initialContext.methods.length > 0) {
                sections.push(`--- AANBEVOLEN METHODEN ---\n${initialContext.methods.join(', ')}`);
            }

            sections.push(`--- STRATEGISCH ADVIES ---\n${initialContext.advice}`);
            sections.push(`--- MIJN VRAAG ---\n(Typ hier uw aanvullende vragen of opmerkingen...)`);

            const generatedMessage = sections.join('\n\n');

            setFormData(prev => ({
                ...prev,
                subject: 'intake',
                message: generatedMessage
            }));
        }
    }, [initialContext]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const encode = (data: any) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "contact", "bot-field": "", ...formData })
        })
            .then(() => {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            })
            .catch(error => {
                console.error(error);
                alert("Er is iets misgegaan bij het versturen. Probeer het later opnieuw of mail ons direct.");
                setStatus('idle');
            });
    };

    if (status === 'success') {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-[#F9FCFA] px-4 animate-fade-in">
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-[#58B895]/20 max-w-lg w-full text-center space-y-6">
                    <div className="w-20 h-20 bg-[#E8F5EF] rounded-full flex items-center justify-center mx-auto text-[#58B895]">
                        <CheckIcon className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#13261f]">Bericht Verzonden</h2>
                    <p className="text-[#6B7280] text-lg">
                        Bedankt voor uw bericht. Wij hebben uw aanvraag in goede orde ontvangen en nemen binnen 24 uur contact met u op.
                    </p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="btn-primary mt-4"
                    >
                        Terug naar contactformulier
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#F9FCFA] min-h-screen animate-fade-in text-brand-text flex flex-col relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-[#F2F9F6] to-[#F9FCFA] -z-10"></div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E8F5EF]/50 to-transparent -z-10 rounded-bl-[10rem]"></div>

            <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 flex-grow relative z-10">

                <header className="text-center mb-16 space-y-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#E8F5EF] text-[#58B895] text-xs font-bold uppercase tracking-wider border border-[#58B895]/20">
                        Contact
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#13261f] tracking-tight leading-[1.1]">Neem Contact Op</h1>
                    <p className="text-lg md:text-xl text-[#6B7280] font-light max-w-2xl mx-auto leading-relaxed">
                        Heeft u een vraag over onze dienstverlening of wilt u een casus voorleggen? Wij behandelen uw bericht vertrouwelijk en discreet.
                    </p>
                </header>

                <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-start">

                    {/* Linker Kolom: Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-[2rem] border border-[#E5E7EB] shadow-lg space-y-8 hover:shadow-xl transition-shadow duration-300">
                            <div>
                                <h3 className="text-xl font-bold text-[#13261f] mb-6">Contactgegevens</h3>
                                <div className="space-y-6">
                                    <a href="mailto:info@doddar.nl" className="flex items-start gap-4 group">
                                        <div className="w-10 h-10 rounded-xl bg-[#E8F5EF] flex items-center justify-center text-[#58B895] group-hover:bg-[#58B895] group-hover:text-white transition-colors">
                                            <MailIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="block text-sm font-bold text-[#9CA3AF] uppercase tracking-wider mb-1">E-mail</span>
                                            <span className="text-lg text-[#13261f] font-medium group-hover:text-[#58B895] transition-colors">info@doddar.nl</span>
                                        </div>
                                    </a>

                                    <a href="tel:+31683671001" className="flex items-start gap-4 group">
                                        <div className="w-10 h-10 rounded-xl bg-[#E8F5EF] flex items-center justify-center text-[#58B895] group-hover:bg-[#58B895] group-hover:text-white transition-colors">
                                            <PhoneIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="block text-sm font-bold text-[#9CA3AF] uppercase tracking-wider mb-1">Telefoon / WhatsApp</span>
                                            <span className="text-lg text-[#13261f] font-medium group-hover:text-[#58B895] transition-colors">+31 6 836 710 01</span>
                                        </div>
                                    </a>

                                    <div className="flex items-start gap-4 group">
                                        <div className="w-10 h-10 rounded-xl bg-[#E8F5EF] flex items-center justify-center text-[#58B895]">
                                            <LocationIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="block text-sm font-bold text-[#9CA3AF] uppercase tracking-wider mb-1">Vestiging</span>
                                            <span className="text-lg text-[#13261f] font-medium">Groningen, Nederland</span>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group">
                                        <div className="w-10 h-10 rounded-xl bg-[#E8F5EF] flex items-center justify-center text-[#58B895]">
                                            <DossierIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="block text-sm font-bold text-[#9CA3AF] uppercase tracking-wider mb-1">Registraties</span>
                                            <div className="text-[#13261f] space-y-1 text-sm">
                                                <p>POB nummer: 8766</p>
                                                <p>KvK nummer: 96446242</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-[#E5E7EB] text-center">
                                <img src={`${baseUrl}contactpagina.svg`} alt="Contact illustratie" className="w-full max-w-[200px] mx-auto opacity-80" />
                            </div>
                        </div>
                    </div>

                    {/* Rechter Kolom: Formulier */}
                    <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-[#E5E7EB] shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-bold text-[#13261f]">Stuur een bericht</h3>
                        </div>

                        {initialContext && (
                            <div className="mb-8 bg-[#E8F5EF] border border-[#58B895]/30 rounded-xl p-4 flex items-start gap-3">
                                <CheckIcon className="w-6 h-6 text-[#58B895] mt-0.5" />
                                <div>
                                    <p className="font-bold text-[#13261f] text-sm">Analyse resultaten inbegrepen</p>
                                    <p className="text-xs text-[#6B7280] mt-1">
                                        De samenvatting van uw analyse is automatisch toegevoegd aan het berichtveld. U kunt deze tekst hieronder nog aanpassen of aanvullen.
                                    </p>
                                </div>
                            </div>
                        )}

                        <form
                            name="contact"
                            method="POST"
                            data-netlify="true"
                            netlify-honeypot="bot-field"
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            <input type="hidden" name="form-name" value="contact" />
                            <input type="hidden" name="bot-field" />

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-bold text-[#4B5563] ml-1">Naam</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full p-4 rounded-xl border border-[#D1D5DB] focus:border-[#58B895] focus:ring-2 focus:ring-[#58B895]/20 outline-none transition-all bg-[#F9FAFB] focus:bg-white"
                                        placeholder="Uw naam"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-bold text-[#4B5563] ml-1">E-mailadres</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-4 rounded-xl border border-[#D1D5DB] focus:border-[#58B895] focus:ring-2 focus:ring-[#58B895]/20 outline-none transition-all bg-[#F9FAFB] focus:bg-white"
                                        placeholder="naam@voorbeeld.nl"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-bold text-[#4B5563] ml-1">Onderwerp</label>
                                <select
                                    id="subject"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full p-4 rounded-xl border border-[#D1D5DB] focus:border-[#58B895] focus:ring-2 focus:ring-[#58B895]/20 outline-none transition-all bg-[#F9FAFB] focus:bg-white text-[#4B5563]"
                                >
                                    <option value="" disabled>Kies een onderwerp...</option>
                                    <option value="intake">Aanvraag Intakegesprek</option>
                                    <option value="question">Algemene Vraag</option>
                                    <option value="business">Zakelijk / Samenwerking</option>
                                    <option value="other">Anders</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-bold text-[#4B5563] ml-1">Uw Bericht</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={8}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full p-4 rounded-xl border border-[#D1D5DB] focus:border-[#58B895] focus:ring-2 focus:ring-[#58B895]/20 outline-none transition-all resize-y bg-[#F9FAFB] focus:bg-white text-base leading-relaxed"
                                    placeholder="Typ hier uw bericht..."
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full py-4 bg-[#58B895] hover:bg-[#4AA984] text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {status === 'submitting' ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Verzenden...
                                        </>
                                    ) : (
                                        <>
                                            Verstuur Bericht
                                            <SendIcon className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;