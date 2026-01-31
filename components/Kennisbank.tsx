import React, { useState, useMemo, useEffect } from 'react';
import { kennisArticles, KennisArticle } from '../data/kennisArticles';
import { BookIcon } from './icons/BookIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { XIcon } from './icons/XIcon';
import { InfoIcon } from './icons/InfoIcon';
import Tooltip from './Tooltip';

const ITEMS_PER_PAGE = 9;

const parseMarkdown = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
            return <strong key={index} className="font-bold text-[#13261f]">{part.slice(2, -2)}</strong>;
        }
        const italicParts = part.split(/(\*[^*]+?\*)/g);
        return (
            <span key={index}>
                {italicParts.map((subPart, subIndex) => {
                    if (subPart.startsWith('*') && subPart.endsWith('*') && subPart.length > 2) {
                        return <em key={subIndex} className="italic text-inherit">{subPart.slice(1, -1)}</em>;
                    }
                    return subPart;
                })}
            </span>
        );
    });
};

const renderFormattedText = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    return (
        <div className="space-y-4">
            {lines.map((line, index) => {
                const trimmedLine = line.trim();
                if (!trimmedLine) return <br key={index} className="hidden md:block" />;
                if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
                    return (
                        <div key={index} className="flex items-start gap-3 pl-2 md:pl-4">
                            <span className="text-[#58B895] mt-1.5 text-lg leading-none">•</span>
                            <span className="text-[#374151] leading-relaxed">{parseMarkdown(trimmedLine.substring(2))}</span>
                        </div>
                    );
                }
                if (/^\d+\.\s/.test(trimmedLine)) {
                    const [number, ...rest] = trimmedLine.split('.');
                    return (
                        <div key={index} className="flex items-start gap-3 pl-2 md:pl-4">
                            <span className="font-bold text-[#58B895] mt-0.5 min-w-[1.5rem]">{number}.</span>
                            <span className="text-[#374151] leading-relaxed">{parseMarkdown(rest.join('.').trim())}</span>
                        </div>
                    );
                }
                return <p key={index} className="text-[#374151] leading-loose">{parseMarkdown(line)}</p>;
            })}
        </div>
    );
};

const ArticleModal: React.FC<{ article: KennisArticle; onClose: () => void }> = ({ article, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#13261f]/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col relative" onClick={e => e.stopPropagation()}>
                <div className="p-8 md:p-10 border-b border-[#E5E7EB] bg-[#F9FCFA] flex justify-between items-start gap-6 sticky top-0 z-10">
                    <div className="pr-12">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="inline-block px-3 py-1 rounded-full bg-[#E8F5EF] text-[#13261f] text-xs font-bold tracking-wider border border-[#58B895]/20">{article.category}</span>
                            <span className="text-xs font-medium italic text-[#6B7280]">{article.source.year}</span>
                        </div>
                        <h2 className="text-2xl md:text-4xl font-bold text-[#13261f] leading-tight">{article.title}</h2>
                    </div>
                    <button onClick={onClose} className="absolute right-6 top-6 p-2 bg-white hover:bg-[#F2F9F6] rounded-full transition-colors border border-[#E5E7EB] shadow-sm group">
                        <XIcon className="w-6 h-6 text-[#9CA3AF] group-hover:text-[#58B895]" />
                    </button>
                </div>
                <div className="overflow-y-auto p-8 md:p-12 space-y-12 bg-white">
                    <div className="max-w-3xl mx-auto space-y-12">
                        {article.readingMotivation && (
                            <div className="bg-gradient-to-r from-[#58B895]/5 to-transparent border-l-4 border-[#58B895] p-6 rounded-r-2xl">
                                <p className="text-[#13261f] font-semibold text-lg leading-relaxed">
                                    "{article.readingMotivation}"
                                </p>
                            </div>
                        )}

                        <div className="text-lg md:text-xl leading-relaxed text-[#4B5563] border-l-4 border-[#58B895] pl-6 italic">
                            {renderFormattedText(article.content.intro)}
                        </div>
                        <div className="prose prose-lg prose-stone max-w-none text-[#374151] mb-12">
                            {renderFormattedText(article.content.analysis)}
                        </div>

                        {article.keyPoints.length > 0 && (
                            <div className="bg-[#F9FCFA] rounded-2xl p-6 md:p-8 border border-[#E5E7EB]">
                                <h4 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-4">Kerninzichten</h4>
                                <div className="flex flex-wrap gap-2">
                                    {article.keyPoints.map((point, idx) => (
                                        <span key={idx} className="inline-flex items-center px-3 py-1.5 rounded-xl bg-white border border-[#E5E7EB] text-[#4B5563] text-sm font-medium">
                                            <span className="text-[#58B895] mr-2">•</span>{point}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {article.relatedIds && article.relatedIds.length > 0 && (
                            <div className="pt-8 border-t border-[#E5E7EB]">
                                <h4 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-6">Lees ook over dit onderwerp</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {kennisArticles.filter(a => article.relatedIds?.includes(a.id)).map((rel) => (
                                        <div
                                            key={rel.id}
                                            className="text-left p-4 rounded-xl border border-[#E5E7EB] bg-[#F9FCFA] transition-all"
                                        >
                                            <span className="text-[#58B895] font-bold text-[10px] tracking-wider mb-2 block">{rel.category}</span>
                                            <p className="text-sm font-bold text-[#13261f] line-clamp-2">{rel.title}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="p-6 md:p-8 border-t border-[#E5E7EB] bg-[#F9FCFA] text-xs text-[#6B7280]">
                    <div className="max-w-3xl mx-auto flex flex-col gap-3">
                        <span className="font-bold text-[#13261f] tracking-widest text-[10px] block">WETENSCHAPPELIJKE BRON</span>
                        <div className="text-sm leading-relaxed text-[#4B5563]">
                            <span className="text-[#13261f] font-bold">{article.source.author}</span>
                            <span className="mx-1">({article.source.year}).</span>
                            <span className="italic">{article.title}.</span>
                            {article.source.journal && <span className="ml-1">{article.source.journal}.</span>}
                            {article.source.doi && (
                                <a
                                    href={`https://doi-org.proxy.bu.edu/${article.source.doi}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-2 inline-flex items-center text-[#58B895] hover:text-[#13261f] transition-colors font-mono text-[11px] bg-[#E8F5EF] px-2 py-0.5 rounded-md border border-[#58B895]/20"
                                >
                                    DOI:{article.source.doi}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Kennisbank: React.FC<{ initialCategory?: string }> = ({ initialCategory }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Alle');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedArticle, setSelectedArticle] = useState<KennisArticle | null>(null);

    const baseUrl = "/images/";

    useEffect(() => { if (initialCategory) setSelectedCategory(initialCategory); }, [initialCategory]);

    const categories = useMemo(() => {
        const categories = ['Alle', ...Array.from(new Set(kennisArticles.map(a => a.category))).sort()];
        return categories;
    }, []);

    const filteredArticles = useMemo(() => {
        return kennisArticles.filter(article => {
            const s = searchTerm.toLowerCase();
            const c = selectedCategory.toLowerCase();
            return (article.title.toLowerCase().includes(s) || article.summary.toLowerCase().includes(s)) && (selectedCategory === 'Alle' || article.category.toLowerCase() === c);
        });
    }, [searchTerm, selectedCategory]);

    const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
    const paginatedArticles = filteredArticles.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    useEffect(() => setCurrentPage(1), [searchTerm, selectedCategory]);

    return (
        <div className="min-h-screen bg-[#F9FCFA] animate-fade-in pb-24 relative overflow-x-hidden">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-[#F2F9F6] to-[#F9FCFA] -z-10"></div>

            {/* Decorative Images Area */}
            <div className="absolute top-20 right-0 w-1/2 h-full opacity-5 pointer-events-none -z-0">
                <img src={`${baseUrl}earth.svg`} alt="" className="absolute top-10 right-10 w-64 h-64 animate-slow-float" />
                <img src={`${baseUrl}DNA.svg`} alt="" className="absolute bottom-40 right-40 w-48 h-48 rotate-12" />
            </div>

            <section className="relative pt-12 md:pt-16 pb-8 md:pb-12 max-w-5xl mx-auto px-6 text-center z-10">
                <div className="flex flex-col items-center">
                    <span className="inline-block py-1 px-4 rounded-full bg-[#E8F5EF] border border-[#58B895]/20 text-[#58B895] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 md:mb-12">Kenniscentrum</span>
                    <div className="relative max-w-4xl mx-auto px-2 md:px-0">
                        <h1 className="text-2xl md:text-5xl lg:text-6xl text-[#13261f] font-bold tracking-tight leading-[1.2] md:leading-[1.1]">
                            <span className="text-[#58B895] block text-5xl md:text-8xl absolute -top-8 -left-2 md:-left-12 opacity-10 md:opacity-20 font-serif whitespace-nowrap">“</span>
                            Onderbouwing is de brug tussen vermoeden en zekerheid.
                            <span className="text-[#58B895] block text-5xl md:text-8xl absolute -bottom-10 -right-2 md:-right-12 opacity-10 md:opacity-20 font-serif transform rotate-180 whitespace-nowrap">“</span>
                        </h1>
                    </div>
                </div>
            </section>

            {/* Main Container - Search & Filter Card */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12 mb-24 z-10 relative">

                {/* Search & Filter Controls */}
                <div className="bg-white rounded-[2rem] md:rounded-[3rem] border border-[#E5E7EB] shadow-xl relative md:overflow-hidden mx-auto w-full">
                    <div className="grid lg:grid-cols-[1.5fr_1fr] items-center">
                        <div className="p-6 md:p-16 space-y-7 md:space-y-8">
                            <div className="flex items-start justify-between gap-4">
                                <h2 className="text-2xl md:text-3xl font-bold text-[#13261f] leading-tight max-w-[80%]">Wetenschap & Praktijk</h2>
                                <Tooltip
                                    placement="bottom-end"
                                    content={
                                        <div className="space-y-2 p-1">
                                            <p className="font-bold border-b border-white/20 pb-1 mb-2 text-sm">Wetenschappelijk Fundament</p>
                                            <p className="leading-relaxed text-xs">
                                                De informatie in deze kennisbank is uitsluitend gebaseerd op onafhankelijke wetenschappelijke studies en juridische kaders.
                                                De inhoud representeert feitelijke bevindingen uit de psychologie en rechtswetenschap en betreft <strong>geen persoonlijke mening</strong> of advies van Doddar.
                                            </p>
                                        </div>
                                    }
                                >
                                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#E8F5EF] text-[#58B895] hover:bg-[#58B895] hover:text-white transition-all cursor-help shadow-sm">
                                        <InfoIcon className="w-5 h-5" />
                                    </div>
                                </Tooltip>
                            </div>

                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder="Zoek op trefwoord..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 md:pl-14 pr-4 py-4 md:py-5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-[#58B895] focus:ring-4 focus:ring-[#58B895]/5 outline-none transition-all text-base md:text-lg shadow-inner"
                                />
                                <svg className="h-6 w-6 md:h-7 md:w-7 absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-[#58B895]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>

                            <div className="flex gap-2.5 overflow-x-auto pb-4 scrollbar-hide -mx-1 px-1">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`flex-shrink-0 px-5 py-2.5 rounded-full text-[11px] font-bold uppercase transition-all border whitespace-nowrap ${selectedCategory === cat ? 'bg-[#13261f] text-white border-[#13261f] shadow-md' : 'bg-white text-gray-400 border-gray-200 hover:border-[#58B895] hover:text-[#58B895]'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="hidden lg:flex justify-center items-center bg-[#F2F9F6] h-full p-12 rounded-r-[3rem] overflow-hidden">
                            <img src={`${baseUrl}brein.svg`} alt="" className="w-full max-w-[280px] h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-700" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10">
                {paginatedArticles.length > 0 ? paginatedArticles.map((article) => (
                    <div key={article.id} onClick={() => setSelectedArticle(article)} className="hover-lift group bg-white rounded-[2rem] border border-[#E5E7EB] p-6 md:p-10 flex flex-col cursor-pointer h-full">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#F2F9F6] text-[#13261f] text-[10px] font-bold uppercase tracking-wider mb-8 w-fit">{article.category}</span>
                        <h3 className="font-bold text-xl md:text-2xl text-[#13261f] mb-6 leading-tight group-hover:text-[#58B895] transition-colors line-clamp-2 flex-shrink-0">{article.title}</h3>
                        <p className="text-brand-subtle text-base leading-loose mb-10 line-clamp-4 flex-grow font-light">{article.summary}</p>
                        <div className="pt-8 border-t border-gray-50 flex justify-between items-center mt-auto">
                            <span className="text-xs font-bold text-[#9CA3AF] uppercase tracking-widest group-hover:text-[#58B895]">Lees Analyse</span>
                            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-[#58B895] group-hover:border-[#58B895] group-hover:text-white transition-all">
                                <ChevronDownIcon className="w-5 h-5 -rotate-90" />
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full py-24 text-center">
                        <p className="text-gray-400 text-lg">Geen artikelen gevonden voor deze zoekopdracht.</p>
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="mt-20 flex justify-center items-center gap-6 z-10 relative">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-4 rounded-2xl bg-white border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors shadow-sm"><ChevronDownIcon className="w-5 h-5 rotate-90" /></button>
                    <span className="text-sm font-medium">Pagina <span className="font-bold text-lg mx-1">{currentPage}</span> van {totalPages}</span>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-4 rounded-2xl bg-white border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors shadow-sm"><ChevronDownIcon className="w-5 h-5 -rotate-90" /></button>
                </div>
            )}

            {selectedArticle && <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
        </div>
    );
};

export default Kennisbank;