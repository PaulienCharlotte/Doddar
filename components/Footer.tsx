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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          <div className="space-y-6">
            <button onClick={() => onNavigate('start')} className="focus:outline-none opacity-80 hover:opacity-100 transition-opacity">
                <img src="https://shimmering-paletas-5d438a.netlify.app/images/logo%20doddar%20svg.svg" alt="Doddar" className="h-8 w-auto" />
            </button>
            <div className="space-y-3 text-sm">
              <a href="mailto:info@doddar.nl" className="flex items-center gap-3 hover:text-[#58B895] transition-colors group"><MailIcon className="w-4 h-4" />info@doddar.nl</a>
              <a href="tel:+31683671001" className="flex items-center gap-3 hover:text-[#58B895] transition-colors group"><PhoneIcon className="w-4 h-4" />+31 6 836 710 01</a>
            </div>
          </div>
          <div><h4 className="font-bold mb-6">Over Doddar</h4><ul className="space-y-3 text-sm"><li><button onClick={() => onNavigate('about')} className="hover:text-[#58B895]">Over Ons</button></li></ul></div>
          <div><h4 className="font-bold mb-6">Expertise</h4><ul className="space-y-3 text-sm"><li><button onClick={() => onNavigate('services', 'osint')} className="hover:text-[#58B895]">Openbronnenonderzoek</button></li></ul></div>
          <div><h4 className="font-bold mb-6">Kennisbank</h4><ul className="space-y-3 text-sm"><li><button onClick={() => onOpenKnowledge('Afhankelijkheidsrelaties')} className="hover:text-[#58B895]">Dwingende controle</button></li></ul></div>
          <div><h4 className="font-bold mb-6">Juridisch</h4><ul className="space-y-3 text-sm"><li><button onClick={onOpenPrivacy} className="hover:text-[#58B895]">Privacyverklaring</button></li></ul></div>
        </div>

        <div className="border-t border-[#E5E7EB] pt-10 pb-6">
            <p className="text-xs text-[#6B7280] text-center max-w-4xl mx-auto mb-10 font-medium">
                Doddar is een door het <strong className="text-[#13261f]">Ministerie van Justitie en Veiligheid</strong> erkend particulier onderzoeksbureau (POB-nummer 8766).
            </p>
            <div className="flex flex-wrap gap-8 md:gap-16 items-center justify-center max-w-4xl mx-auto opacity-90">
                <img src="https://shimmering-paletas-5d438a.netlify.app/images/justisPOB.svg" alt="Ministerie van Justitie en Veiligheid" className="h-16 w-auto object-contain" />
                <img src="https://shimmering-paletas-5d438a.netlify.app/images/logo%20klein%20donker.svg" alt="BPOB" className="h-10 w-auto object-contain" />
            </div>
        </div>
        <div className="text-center text-[10px] text-[#9CA3AF] mt-8">
            &copy; {new Date().getFullYear()} Doddar. — Versie 6.30 (External Asset Link)
        </div>
      </div>
    </footer>
  );
};

export default Footer;