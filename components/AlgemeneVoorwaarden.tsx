
import React, { useEffect } from 'react';
import { DossierIcon } from './icons/DossierIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface AlgemeneVoorwaardenProps {
  onBack: () => void;
}

const articles = [
  {
    title: "Artikel 1. Toepasselijkheid en definities",
    content: `a. Deze algemene voorwaarden zijn van toepassing op alle overeenkomsten tussen Doddar en een opdrachtgever, waaronder offertes, advieswerk, onderzoeksdiensten en voorbereidende werkzaamheden.
b. Onder opdrachtgever wordt verstaan: iedere natuurlijke of rechtspersoon die een opdracht verstrekt aan Doddar.
c. Afwijkingen van deze voorwaarden zijn uitsluitend geldig indien deze schriftelijk zijn overeengekomen.
d. Doddar is een erkend particulier onderzoeksbureau en handelt binnen de kaders van de Wet particuliere beveiligingsorganisaties en recherchebureaus (Wpbr), de Algemene Verordening Gegevensbescherming (AVG) en overige toepasselijke wet- en regelgeving.`
  },
  {
    title: "Artikel 2. De overeenkomst",
    content: `a. De overeenkomst komt tot stand na schriftelijke bevestiging van de opdracht door beide partijen.
b. Mondelinge toezeggingen of afspraken zijn pas bindend na schriftelijke bevestiging.
c. Doddar behoudt zich het recht voor een opdracht te weigeren indien:
- onvoldoende informatie wordt verstrekt door de opdrachtgever
- uitvoering in strijd is met wet- of regelgeving, openbare orde of zedelijkheid
- geen gerechtvaardigd belang kan worden vastgesteld.`
  },
  {
    title: "Artikel 3. Uitvoering van de opdracht",
    content: `a. Doddar verricht haar werkzaamheden naar beste inzicht, vermogen en in overeenstemming met professionele normen.
b. De wijze van uitvoering van het onderzoek wordt door Doddar bepaald, met inachtneming van proportionaliteit, subsidiariteit en privacybelangen.
c. De opdrachtgever verstrekt tijdig alle informatie die noodzakelijk is voor een correcte uitvoering van de opdracht.
d. Doddar mag zich bij de uitvoering bedienen van derden (zoals technisch specialisten of onderaannemers) indien dat nodig is voor de uitvoering van de opdracht.
e. Bij inzet van forensische of technische hulpmiddelen (zoals digitale dataverzameling, OSINT-tools of opnamemiddelen) gebeurt dit binnen de wettelijke kaders. De opdrachtgever is verantwoordelijk voor het rechtmatig verstrekken van toegang tot systemen, locaties of communicatiemiddelen.`
  },
  {
    title: "Artikel 4. Geautomatiseerd onderzoek en technische hulpmiddelen",
    content: `a. Doddar behoudt zich het recht voor digitale gegevens of metadata forensisch veilig te kopiëren, bewaren of analyseren in een beveiligde omgeving.
b. Inzet van apparatuur (zoals camera's, geluidsapparatuur of software) wordt vooraf schriftelijk overeengekomen. De opdrachtgever blijft verantwoordelijk voor de rechtmatigheid van de inzet.
c. Indien Doddar, in overleg met de opdrachtgever, onderzoek uitvoert in of via digitale systemen (zoals OSINT, e-mailanalyse, social media-onderzoek of met behulp van apparatuur), geldt het volgende:
- Toegang tot systemen geschiedt met uitdrukkelijke toestemming van de opdrachtgever;
- De AVG en eventuele sectorale richtlijnen worden nageleefd;
- Indien vereist, voert Doddar vooraf een Data Protection Impact Assessment (DPIA) uit.`
  },
  {
    title: "Artikel 5. Geheimhouding en gegevensverwerking",
    content: `a. Doddar en haar medewerkers zijn gehouden tot strikte geheimhouding van alle gegevens die zij in het kader van de opdracht verkrijgen, tenzij een wettelijke verplichting anders voorschrijft.
b. Persoonsgegevens worden verwerkt conform de AVG. Doddar is verwerkingsverantwoordelijke voor de gegevens die zij zelf verzamelt. De opdrachtgever is verantwoordelijk voor de rechtmatigheid van de door hem aangeleverde gegevens.
c. Rapporten en bevindingen zijn vertrouwelijk en uitsluitend bestemd voor de opdrachtgever, tenzij schriftelijk anders overeengekomen.`
  },
  {
    title: "Artikel 6. Intellectueel eigendom en rapportage",
    content: `a. Alle rapporten, adviezen, verslagen en andere documenten blijven eigendom van Doddar, tenzij schriftelijk anders overeengekomen.
b. Het is de opdrachtgever niet toegestaan deze te kopiëren, verspreiden of te gebruiken buiten het doel van de opdracht zonder voorafgaande schriftelijke toestemming van Doddar.
c. Rapportages zijn adviserend van aard. Doddar geeft geen garanties over de juridische waarde of uitkomst van de bevindingen.`
  },
  {
    title: "Artikel 7. Aansprakelijkheid en vrijwaring",
    content: `a. Doddar is uitsluitend aansprakelijk voor schade die het directe gevolg is van grove schuld of opzet. De bewijslast hiervoor ligt bij de opdrachtgever.
b. De aansprakelijkheid is beperkt tot het bedrag van de voor de opdracht gefactureerde som, met een maximum van €25.000, tenzij de beroepsaansprakelijkheidsverzekering een hoger bedrag dekt.
c. De opdrachtgever vrijwaart Doddar tegen aanspraken van derden voortvloeiend uit de uitvoering van de opdracht, tenzij sprake is van opzet of grove nalatigheid aan de zijde van Doddar.
d. Doddar is niet aansprakelijk voor:
- schade ontstaan door onjuiste of onvolledige informatie van de opdrachtgever;
- indirecte schade of gevolgschade;
- gebruik van rapportages door derden.`
  },
  {
    title: "Artikel 8. Gebruik van de AI-Analyse Tool",
    content: `a. De online analysetool van Doddar maakt gebruik van kunstmatige intelligentie (AI) om patronen te herkennen in door de gebruiker ingevoerde tekst.
b. De resultaten van deze tool zijn uitsluitend indicatief en informatief van aard. Zij vormen uitdrukkelijk geen juridisch advies, psychologische diagnose, feitenrelaas of rechercheonderzoek.
c. Doddar garandeert niet de volledigheid, juistheid of actualiteit van de door de AI gegenereerde output.
d. Doddar is niet aansprakelijk voor enige schade, direct of indirect, die voortvloeit uit beslissingen of acties die de gebruiker neemt op basis van de uitkomsten van de analysetool.
e. Voor een gevalideerd oordeel is altijd menselijke tussenkomst, verificatie en een formele intake door Doddar noodzakelijk.`
  },
  {
    title: "Artikel 9. Toepasselijk recht en geschillen",
    content: `a. Op alle rechtsbetrekkingen waarbij Doddar partij is, is uitsluitend het Nederlands recht van toepassing.
b. Geschillen worden bij uitsluiting voorgelegd aan de bevoegde rechter in het arrondissement waar Doddar is gevestigd.`
  }
];

const AlgemeneVoorwaarden: React.FC<AlgemeneVoorwaardenProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FCFB] text-brand-text animate-fade-in">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        
        <header className="mb-12">
          <button 
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-sm font-semibold text-brand-secondary hover:text-brand-primary transition-colors"
          >
            <ChevronDownIcon className="w-4 h-4 rotate-90" /> Terug
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-[#13261f] mb-4 flex items-center gap-3">
            <DossierIcon className="w-8 h-8 md:w-10 md:h-10 text-[#58B895]" />
            Algemene Voorwaarden
          </h1>
          <p className="text-lg text-brand-subtle leading-relaxed border-l-4 border-[#58B895] pl-4">
            Heldere afspraken vormen de basis van een professionele samenwerking. In deze voorwaarden leest u wat u van Doddar kunt verwachten en wat wij van u verwachten.
          </p>
        </header>

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

        <div className="mt-12 p-6 bg-[#E8F5EF] rounded-2xl border border-[#B8E2D1] text-center">
          <p className="text-[#13261f] font-medium">
            Deze algemene voorwaarden zijn gedeponeerd bij de Kamer van Koophandel.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AlgemeneVoorwaarden;
