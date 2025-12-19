import React, { useEffect } from 'react';
import { ShieldIcon } from './icons/ShieldIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface PrivacyverklaringProps {
  onBack: () => void;
}

const articles = [
  {
    title: "Artikel 1. Bedrijfsgegevens Doddar",
    content: `Particulier Recherchebureau Doddar
KvK: 96446242
POB-nummer: 8766
E-mail: info@doddar.nl
Website: www.doddar.nl`
  },
  {
    title: "Artikel 2. Gegevensverwerking",
    content: `Wij verwerken o.a. de volgende gegevens:
- Naam, adres, telefoonnummer en e-mail;
- Geboortedatum, geslacht;
- Gegevens m.b.t. onderzoek: observatieverslagen, rapportages, beeldmateriaal (indien wettelijk toegestaan);
- Bijzondere persoonsgegevens alleen indien noodzakelijk én toegestaan.`
  },
  {
    title: "Artikel 3. Doeleinden en grondslagen",
    content: `Gegevens worden verwerkt:
- Voor het uitvoeren van particuliere onderzoeken;
- Om te voldoen aan wettelijke verplichtingen (zoals Wpbr);
- Op basis van gerechtvaardigd belang.`
  },
  {
    title: "Artikel 4. Delen met derden",
    content: `Wij delen gegevens uitsluitend met:
- Opdrachtgevers, met wie wij een verwerkersovereenkomst sluiten;
- Advocaten, politie of andere partijen, uitsluitend als dit noodzakelijk en wettelijk toegestaan is.`
  },
  {
    title: "Artikel 5. Bewaartermijn",
    content: "Gegevens worden niet langer bewaard dan strikt nodig. De bewaartermijn is standaard 5 jaar, tenzij anders vereist."
  },
  {
    title: "Artikel 6. Beveiliging",
    content: "Doddar treft passende technische en organisatorische maatregelen om jouw gegevens te beschermen."
  },
  {
    title: "Artikel 7. Rechten van betrokkenen",
    content: `Je hebt het recht op:
- Inzage;
- Correctie;
- Verwijdering (voor zover mogelijk binnen wet- en regelgeving);
- Bezwaar tegen verwerking.`
  },
  {
    title: "Artikel 8. Klachten",
    content: "Heb je klachten? Neem contact op via klacht@doddar.nl. Je kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens via www.autoriteitpersoonsgegevens.nl."
  }
];

const Privacyverklaring: React.FC<PrivacyverklaringProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FCFB] text-brand-text animate-fade-in">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        
        {/* Header */}
        <header className="mb-12">
          <button 
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-sm font-semibold text-brand-secondary hover:text-brand-primary transition-colors"
          >
            <ChevronDownIcon className="w-4 h-4 rotate-90" /> Terug
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-[#13261f] mb-4 flex items-center gap-3">
            <ShieldIcon className="w-8 h-8 md:w-10 md:h-10 text-[#58B895]" />
            Privacyverklaring Doddar
          </h1>
          <p className="text-lg text-brand-subtle leading-relaxed border-l-4 border-[#58B895] pl-4">
            Doddar hecht grote waarde aan de bescherming van uw persoonsgegevens. In deze verklaring leest u hoe wij omgaan met data in het kader van particulier onderzoek en onze dienstverlening, conform <a href="https://wetten.overheid.nl/BWBR0010256/2024-07-27/#Bijlage6" target="_blank" rel="noopener noreferrer" className="text-[#58B895] hover:underline font-bold">Bijlage 6 van de WPBR</a> (Privacygedragscode).
          </p>
        </header>

        {/* Articles List */}
        <div className="space-y-6">
          {articles.map((article, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 md:p-8 border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-lg font-bold text-[#13261f] mb-4 border-b border-[#E5E7EB] pb-2">
                {article.title}
              </h2>
              <div className="text-[#4B5563] text-sm md:text-base leading-loose whitespace-pre-line">
                {article.content}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-12 p-6 bg-[#E8F5EF] rounded-2xl border border-[#B8E2D1] text-center">
          <p className="text-[#13261f] font-medium">
            Deze privacyverklaring is opgesteld in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG) en de Wet particuliere beveiligingsorganisaties en recherchebureaus (Wpbr).
          </p>
        </div>

      </div>
    </div>
  );
};

export default Privacyverklaring;