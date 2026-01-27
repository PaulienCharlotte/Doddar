import React, { useEffect } from 'react';
import { WarningIcon } from './icons/WarningIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface DisclaimerProps {
  onBack: () => void;
}

const Disclaimer: React.FC<DisclaimerProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const baseUrl = "https://shimmering-paletas-5d438a.netlify.app/images/";

  return (
    <div className="min-h-screen bg-[#F9FCFB] text-brand-text animate-fade-in">
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        <button onClick={onBack} className="mb-8 flex items-center gap-2 text-sm font-semibold text-brand-secondary hover:text-brand-primary transition-colors">
            <ChevronDownIcon className="w-4 h-4 rotate-90" /> Terug
        </button>

        <div className="bg-white rounded-[2rem] border border-[#E5E7EB] shadow-xl overflow-hidden">
            <div className="bg-[#E8F5EF] p-8 md:p-10 flex flex-col items-center justify-center relative overflow-hidden">
                 <img 
                    src={`${baseUrl}juridisch.svg`} 
                    alt="Juridische Disclaimer" 
                    className="w-48 md:w-64 h-auto object-contain drop-shadow-lg relative z-10" 
                 />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
            </div>
            <div className="p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-status-warning/10 rounded-2xl text-status-warning"><WarningIcon className="w-8 h-8" /></div>
                    <h1 className="text-2xl md:text-3xl font-bold text-[#13261f]">Disclaimer Analyse Tool</h1>
                </div>
                <div className="space-y-6 text-[#4B5563] font-normal leading-relaxed text-lg">
                    <p>De resultaten vormen uitdrukkelijk <u>geen</u> juridisch, medisch, psychologisch of financieel advies.</p>
                    <p>
                        Doddar streeft naar accurate gedragsindicaties, maar de getoonde uitkomsten zijn gebaseerd op AI-modellen en dienen uitsluitend ter informatie en reflectie. Aan deze tool kunnen geen rechten worden ontleend.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;