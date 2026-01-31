import React from 'react';
import { MailIcon } from './icons/MailIcon';
import { PhoneIcon } from './icons/PhoneIcon';

interface FooterProps {
  onNavigate: (step: any, category?: string) => void;
  onOpenComplaints: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenKnowledge: (category?: string) => void;
  onOpenDisclaimer: () => void;
}

const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenComplaints,
  onOpenPrivacy,
  onOpenTerms,
  onOpenKnowledge,
  onOpenDisclaimer
}) => {
  const baseUrl = "/images/";

  return (
    <footer className="bg-white border-t border-[#E5E7EB] pt-16 pb-8 text-[#13261f] mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Logo & Contact */}
          <div className="space-y-6 lg:col-span-1">
            <button onClick={() => onNavigate('start')} className="focus:outline-none opacity-90 hover:opacity-100 transition-opacity">
              <img src={`${baseUrl}logododdar.svg`} alt="Doddar" className="h-8 w-auto" />
            </button>
            <div className="space-y-3 text-sm">
              <a href="mailto:info@doddar.nl" className="flex items-center gap-3 hover:text-[#58B895] transition-colors group">
                <MailIcon className="w-4 h-4 text-[#58B895]" />
                info@doddar.nl
              </a>
              <a href="tel:+31683671001" className="flex items-center gap-3 hover:text-[#58B895] transition-colors group">
                <PhoneIcon className="w-4 h-4 text-[#58B895]" />
                +31 6 836 710 01
              </a>
            </div>
          </div>

          {/* Over Doddar */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-6 text-[#58B895]">Over Doddar</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><button onClick={() => onNavigate('about')} className="hover:text-[#58B895] transition-colors text-left">Over Ons</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-[#58B895] transition-colors text-left">Onze Diensten</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-[#58B895] transition-colors text-left">Contact & Intake</button></li>
            </ul>
          </div>

          {/* Expertise */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-6 text-[#58B895]">Expertise</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><button onClick={() => onNavigate('services', 'osint')} className="hover:text-[#58B895] transition-colors text-left">Open Source Intelligence</button></li>
              <li><button onClick={() => onNavigate('services', 'observatie')} className="hover:text-[#58B895] transition-colors text-left">Observatieonderzoek</button></li>
              <li><button onClick={() => onNavigate('services', 'interview')} className="hover:text-[#58B895] transition-colors text-left">Interviewtechnieken</button></li>
              <li><button onClick={() => onNavigate('services', 'screening')} className="hover:text-[#58B895] transition-colors text-left">Pre-employment Screening</button></li>
            </ul>
          </div>

          {/* Kennisbank */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-6 text-[#58B895]">Kennisbank</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><button onClick={() => onOpenKnowledge('Afhankelijkheidsrelaties')} className="hover:text-[#58B895] transition-colors text-left">Dwingende Controle</button></li>
              <li><button onClick={() => onOpenKnowledge('Fraude & Integriteit')} className="hover:text-[#58B895] transition-colors text-left">Bedrijfsrecherche</button></li>
              <li><button onClick={() => onOpenKnowledge('Gedragsanalyse')} className="hover:text-[#58B895] transition-colors text-left">Gedragsanalyse</button></li>
              <li><button onClick={() => onOpenKnowledge()} className="hover:text-[#58B895] transition-colors text-left">Alle Artikelen</button></li>
            </ul>
          </div>

          {/* Juridisch */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-6 text-[#58B895]">Juridisch</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><button onClick={onOpenPrivacy} className="hover:text-[#58B895] transition-colors text-left">Privacyverklaring</button></li>
              <li><button onClick={onOpenTerms} className="hover:text-[#58B895] transition-colors text-left">Algemene Voorwaarden</button></li>
              <li><button onClick={onOpenComplaints} className="hover:text-[#58B895] transition-colors text-left">Klachtenregeling</button></li>
              <li><button onClick={onOpenDisclaimer} className="hover:text-[#58B895] transition-colors text-left">Disclaimer</button></li>
            </ul>
          </div>
        </div>

        {/* Accreditation Section */}
        <div className="border-t border-[#E5E7EB] pt-10 pb-6">
          <p className="text-xs text-[#6B7280] text-center max-w-4xl mx-auto mb-10 font-medium leading-relaxed">
            Doddar is een door het <strong className="text-[#13261f]">Ministerie van Justitie en Veiligheid</strong> erkend particulier onderzoeksbureau (POB-nummer 8766). Wij werken conform de Privacygedragscode voor Particulier Onderzoekers en zijn volwaardig lid van de <strong className="text-[#13261f]">Branchevereniging voor Particulier Onderzoekers (BPOB)</strong>.
          </p>
          <div className="flex flex-wrap gap-8 md:gap-16 items-center justify-center max-w-4xl mx-auto opacity-90">
            <img src={`${baseUrl}justisPOB.svg`} alt="Ministerie van Justitie en Veiligheid" className="h-16 w-auto object-contain" />
            <img src={`${baseUrl}logoBPOB.svg`} alt="BPOB" className="h-10 w-auto object-contain" />
          </div>
        </div>

        {/* Copyright & Version */}
        <div className="text-center text-[10px] text-[#9CA3AF] mt-8 flex flex-col md:flex-row justify-center gap-2 md:gap-4 tracking-wider uppercase font-bold">
          <span>&copy; {new Date().getFullYear()} Doddar. Alle rechten voorbehouden.</span>
          <span className="hidden md:inline">•</span>
          <span>Versie 6.33 (Enterprise Node)</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;