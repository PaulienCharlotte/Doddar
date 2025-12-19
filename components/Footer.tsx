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
  return (
    <footer className="bg-white border-t border-[#E5E7EB] pt-16 pb-8 text-[#13261f] mt-auto">
      <div className="max-w-7xl mx-auto px-6">

        {/* Updated Grid to 5 columns for desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">

          {/* Kolom 1: Contact */}
          <div className="space-y-6">
            <button
              onClick={() => onNavigate('start')}
              className="focus:outline-none opacity-80 hover:opacity-100 transition-opacity"
              aria-label="Ga naar startpagina"
            >
              <img
                src="/images/logo_white.png"
                alt="Doddar"
                className="h-8 w-auto"
              />
            </button>
            <div className="space-y-3 text-sm">
              <a href="mailto:info@doddar.nl" className="flex items-center gap-3 hover:text-[#58B895] transition-colors group">
                <MailIcon className="w-4 h-4 group-hover:text-[#58B895]" />
                info@doddar.nl
              </a>
              <a href="tel:+31683671001" className="flex items-center gap-3 hover:text-[#58B895] transition-colors group">
                <PhoneIcon className="w-4 h-4 group-hover:text-[#58B895]" />
                +31 6 836 710 01
              </a>
              <div className="pt-2 text-xs text-[#9CA3AF] space-y-1">
                <p>KvK: 96446242</p>
                <p>POB: 8766</p>
              </div>
            </div>
          </div>

          {/* Kolom 2: Over Doddar */}
          <div>
            <h4 className="font-bold text-[#13261f] mb-6">Over Doddar</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => onNavigate('about')} className="hover:text-[#58B895] transition-colors text-left">Over Ons</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-[#58B895] transition-colors text-left">Contact</button></li>
              <li><button onClick={() => onNavigate('start')} className="hover:text-[#58B895] transition-colors text-left">Nieuwe Analyse</button></li>
            </ul>
          </div>

          {/* Kolom 3: Expertise (Links to Services Page) */}
          <div>
            <h4 className="font-bold text-[#13261f] mb-6">Expertise</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => onNavigate('services', 'osint')} className="hover:text-[#58B895] transition-colors text-left">Openbronnenonderzoek</button></li>
              <li><button onClick={() => onNavigate('services', 'observatie')} className="hover:text-[#58B895] transition-colors text-left">Observatie</button></li>
              <li><button onClick={() => onNavigate('services', 'interview')} className="hover:text-[#58B895] transition-colors text-left">Interview & Analyse</button></li>
              <li><button onClick={() => onNavigate('services', 'screening')} className="hover:text-[#58B895] transition-colors text-left">Screening & Advies</button></li>
            </ul>
          </div>

          {/* Kolom 4: Kennisbank */}
          <div>
            <h4 className="font-bold text-[#13261f] mb-6">Kennisbank</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => onOpenKnowledge('Afhankelijkheidsrelaties')} className="hover:text-[#58B895] transition-colors text-left">Dwingende controle</button></li>
              <li><button onClick={() => onOpenKnowledge('Fraude & Integriteit')} className="hover:text-[#58B895] transition-colors text-left">De fraudedriehoek</button></li>
              <li><button onClick={() => onOpenKnowledge('Zorg & Ondermijning')} className="hover:text-[#58B895] transition-colors text-left">Zorgfraude & PGB</button></li>
              <li><button onClick={() => onOpenKnowledge('Onderzoeksmethodiek & Recht')} className="hover:text-[#58B895] transition-colors text-left">OSINT & wetgeving</button></li>
            </ul>
          </div>

          {/* Kolom 5: Juridisch */}
          <div>
            <h4 className="font-bold text-[#13261f] mb-6">Juridisch</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={onOpenPrivacy} className="hover:text-[#58B895] transition-colors text-left">Privacyverklaring</button></li>
              <li><button onClick={onOpenTerms} className="hover:text-[#58B895] transition-colors text-left">Algemene voorwaarden</button></li>
              <li><button onClick={onOpenComplaints} className="hover:text-[#58B895] transition-colors text-left">Klachtenregeling</button></li>
              <li><button onClick={onOpenDisclaimer} className="hover:text-[#58B895] transition-colors text-left">Disclaimer</button></li>
            </ul>
          </div>
        </div>

        {/* Legitimatie Sectie */}
        <div className="border-t border-[#E5E7EB] pt-10 pb-6">
          <p className="text-xs text-[#6B7280] leading-relaxed text-center max-w-4xl mx-auto mb-10 font-medium">
            Doddar is een door het <strong className="text-[#13261f]">Ministerie van Justitie en Veiligheid</strong> erkend particulier onderzoeksbureau (POB-nummer 8766) en is aangesloten bij de <strong className="text-[#13261f]">Branchevereniging voor Particuliere Onderzoeksbureaus</strong>.
          </p>

          {/* Logo rij visualisatie - Flex voor centrering */}
          <div className="flex flex-wrap gap-8 md:gap-16 items-center justify-center max-w-4xl mx-auto opacity-90">

            {/* Justis POB */}
            <img
              src="https://raw.githubusercontent.com/PaulienCharlotte/Doddar/refs/heads/main/images/justisPOB.svg"
              alt="Erkend door Ministerie van Justitie en Veiligheid"
              className="h-16 w-auto object-contain"
            />

            {/* BPOB */}
            <img
              src="https://raw.githubusercontent.com/PaulienCharlotte/Doddar/refs/heads/main/images/logo%20zwart%20BPOB_1.svg"
              alt="Branchevereniging voor Particuliere Onderzoeksbureaus"
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>

        <div className="text-center text-[10px] text-[#9CA3AF] mt-8">
          &copy; {new Date().getFullYear()} Doddar. Alle rechten voorbehouden. — Versie 6.16
        </div>

      </div>
    </footer>
  );
};

export default Footer;