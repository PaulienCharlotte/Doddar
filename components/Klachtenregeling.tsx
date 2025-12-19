
import React, { useEffect } from 'react';
import { LawIcon } from './icons/LawIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface KlachtenregelingProps {
  onBack: () => void;
}

const articles = [
  {
    title: "Artikel 1. Definities en reikwijdte",
    content: `In deze klachtenregeling wordt verstaan onder:
a. Doddar: de eenmanszaak geregistreerd onder SBI-code 8030, gespecialiseerd in particulier onderzoek naar veiligheid binnen afhankelijkheidsrelaties;
b. Klager: een persoon of organisatie wiens belang direct geraakt wordt door een gedraging van Doddar of haar medewerkers;
c. Gedraging: een handeling of nalaten door Doddar of haar medewerkers;
d. Beklaagde: Doddar, als partij waartegen een klacht is ingediend;
e. Klaagschrift: een schriftelijke klacht tegen een gedraging van Doddar;
f. Klachtencommissie: een onafhankelijke externe commissie die beroepschriften behandelt;
g. Beroepschrift: een klacht tegen de beslissing van de directeur van Doddar, het uitblijven daarvan, of tegen een gedraging van de directeur zelf.`
  },
  {
    title: "Artikel 2. Toepassingsgebied",
    content: "Deze regeling is van toepassing op de behandeling van klachten over gedragingen van Doddar en haar medewerkers."
  },
  {
    title: "Artikel 3. Indienen van een klacht",
    content: `a. Een klacht wordt schriftelijk ingediend bij de directeur van Doddar: info@doddar.nl of per post aan het vestigingsadres.
b. Het klaagschrift moet minimaal bevatten:
- Naam en adres van de klager;
- Datum;
- Omschrijving van de gedraging waarover wordt geklaagd;
- De reden(en) van bezwaar.
c. Indien het klaagschrift niet volledig is, wordt de klager hiervan schriftelijk op de hoogte gebracht en krijgt deze twee weken de tijd om het aan te vullen.
d. Wordt het verzuim niet hersteld, dan wordt de klacht niet verder in behandeling genomen.`
  },
  {
    title: "Artikel 4. Termijn",
    content: "Een klacht dient binnen zes weken na de betreffende gedraging te worden ingediend."
  },
  {
    title: "Artikel 5. Kosten",
    content: "Het indienen en behandelen van een klacht is kosteloos."
  },
  {
    title: "Artikel 6. Ontvangstbevestiging",
    content: "Binnen twee weken na ontvangst van de klacht stuurt Doddar een schriftelijke ontvangstbevestiging."
  },
  {
    title: "Artikel 7. Kennisgeving aan de minister",
    content: "Een kopie van het klaagschrift wordt binnen twee weken doorgestuurd naar Dienst Justis van het Ministerie van Justitie en Veiligheid."
  },
  {
    title: "Artikel 8. Behandeling van de klacht – mondeling",
    content: `a. De directeur onderzoekt de klacht en nodigt de klager uit voor een persoonlijk gesprek.
b. De directeur kan aanvullende informatie inwinnen bij betrokken derden.`
  },
  {
    title: "Artikel 9. Behandeling van de klacht – schriftelijk",
    content: "Indien de klager aangeeft geen mondeling contact te willen, wordt de klacht schriftelijk behandeld."
  },
  {
    title: "Artikel 10. Besluittermijn",
    content: "De directeur van Doddar neemt binnen zes weken na ontvangst van de klacht een beslissing."
  },
  {
    title: "Artikel 11. Mededeling van de beslissing",
    content: "De beslissing wordt schriftelijk aan de klager meegedeeld."
  },
  {
    title: "Artikel 12. Beroep",
    content: "Binnen zes weken na de beslissing van de directeur kan de klager schriftelijk beroep aantekenen bij de onafhankelijke klachtencommissie."
  },
  {
    title: "Artikel 13. Indienen van een beroepschrift",
    content: `a. Het beroepschrift wordt ingediend bij de klachtencommissie (gegevens worden bij besluit meegestuurd).
b. Het beroepschrift bevat:
- Naam en adres van de klager;
- Datum;
- Omschrijving van de gedraging of beslissing waartegen bezwaar wordt gemaakt;
- De gronden van bezwaar.
c. Als gegevens ontbreken, krijgt de klager twee weken om dit aan te vullen.`
  },
  {
    title: "Artikel 14. Ontvangstbevestiging",
    content: "De klachtencommissie stuurt binnen twee weken een schriftelijke ontvangstbevestiging."
  },
  {
    title: "Artikel 15. Behandeling door de klachtencommissie",
    content: `a. De commissie beoordeelt de ontvankelijkheid van de klacht.
b. Bij ontvankelijkheid worden klager en beklaagde uitgenodigd voor een hoorzitting.
c. De commissie mag nadere informatie inwinnen bij derden.`
  },
  {
    title: "Artikel 16. Besluittermijn klachtencommissie",
    content: "De klachtencommissie neemt binnen zes weken na ontvangst van het beroepschrift een besluit."
  },
  {
    title: "Artikel 17. Mededeling van de beslissing",
    content: "De uitspraak wordt schriftelijk medegedeeld aan zowel klager als beklaagde."
  },
  {
    title: "Artikel 18. Melding aan Dienst Justis",
    content: "Een kopie van het beroepschrift én de uitspraak wordt verzonden aan Dienst Justis van het Ministerie van Justitie en Veiligheid."
  }
];

const Klachtenregeling: React.FC<KlachtenregelingProps> = ({ onBack }) => {
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
            <LawIcon className="w-8 h-8 md:w-10 md:h-10 text-[#58B895]" />
            Klachtenregeling Doddar
          </h1>
          <p className="text-lg text-brand-subtle leading-relaxed border-l-4 border-[#58B895] pl-4">
            Wij streven naar de hoogste kwaliteit in onze dienstverlening. Mocht u onverhoopt niet tevreden zijn, dan biedt deze regeling een transparante procedure voor het behandelen van uw klacht.
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
            Deze klachtenregeling is opgesteld conform de eisen van de Wet particuliere beveiligingsorganisaties en recherchebureaus (Wpbr).
          </p>
        </div>

      </div>
    </div>
  );
};

export default Klachtenregeling;
