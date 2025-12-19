
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

  return (
    <div className="min-h-screen bg-[#F9FCFB] text-brand-text animate-fade-in">
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        
        <button 
            onClick={onBack}
            className="mb-8 flex items-center gap-2 text-sm font-semibold text-brand-secondary hover:text-brand-primary transition-colors"
        >
            <ChevronDownIcon className="w-4 h-4 rotate-90" /> Terug
        </button>

        <div className="bg-white rounded-[2rem] border border-[#E5E7EB] shadow-xl overflow-hidden">
            {/* Header Image Section */}
            <div className="bg-[#E8F5EF] p-8 md:p-10 flex flex-col items-center justify-center relative overflow-hidden">
                 <img 
                    src="https://raw.githubusercontent.com/PaulienCharlotte/Doddar/refs/heads/main/images/juridisch.svg" 
                    alt="Juridische Disclaimer" 
                    className="w-48 md:w-64 h-auto object-contain drop-shadow-lg relative z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
            </div>

            <div className="p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-status-warning/10 rounded-2xl text-status-warning">
                        <WarningIcon className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-[#13261f]">Disclaimer Analyse Tool</h1>
                </div>

                <div className="space-y-6 text-[#4B5563] leading-relaxed text-lg font-light">
                    <p>
                        <strong>1. Aard van de Tool</strong><br/>
                        De analysetool op deze website maakt gebruik van geavanceerde kunstmatige intelligentie (AI). De tool is ontworpen om patronen te herkennen in tekst en algemene informatie te verschaffen. Het is een hulpmiddel voor eerste oriëntatie, geen vervanging voor menselijke expertise.
                    </p>

                    <p>
                        <strong>2. Geen Advies</strong><br/>
                        De resultaten vormen uitdrukkelijk <u>geen</u> juridisch, medisch, psychologisch of financieel advies. Er kunnen geen rechten worden ontleend aan de uitkomsten, scores of suggesties die door de tool worden gegenereerd.
                    </p>

                    <p>
                        <strong>3. Beperking van Aansprakelijkheid</strong><br/>
                        Doddar aanvaardt geen enkele aansprakelijkheid voor schade, direct of indirect, die voortvloeit uit het gebruik van deze tool of het handelen op basis van de uitkomsten ervan. U blijft te allen tijde zelf verantwoordelijk voor uw keuzes en acties.
                    </p>

                    <p>
                        <strong>4. Verificatie Vereist</strong><br/>
                        AI kan fouten maken ('hallucineren') of context missen. Een professionele beoordeling van uw situatie vereist altijd een intakegesprek en validatie door een menselijke onderzoeker.
                    </p>

                    <div className="bg-[#E8F5EF] p-6 rounded-xl border border-[#B8E2D1] mt-8 text-sm text-[#13261f] font-medium">
                        Door de tool te gebruiken, verklaart u zich akkoord met deze disclaimer en onze Algemene Voorwaarden.
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
