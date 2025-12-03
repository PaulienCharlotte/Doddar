
export interface MockCase {
  id: number;
  title: string;
  snippet: string;
  gedragskenmerken: string[];
  wetgeving: { wetboek: string; artikel: string }[];
  category: string;
  sourceUrl?: string;
  date: string; // YYYY-MM-DD format for sorting
}

// Uitgebreide dataset voor Jurisprudentie Bibliotheek
// Data is gebaseerd op veelvoorkomende, geanonimiseerde uitspraken van Rechtspraak.nl
export const mockCases: MockCase[] = [
  // ---------------- ARBEIDSRECHT & INTEGRITEIT ----------------
  {
    id: 101,
    title: "Ontslag op staande voet na privégebruik tankpas",
    snippet: "Werknemer gebruikte zakelijke tankpas structureel voor privédoeleinden zonder toestemming. Onderzoek toonde onregelmatigheden in locatiegegevens aan. Ontslag rechtsgeldig.",
    gedragskenmerken: ["Diefstal", "Vertrouwensbreuk", "Bedrijfsfraude"],
    wetgeving: [{ wetboek: "BW", artikel: "7:677" }],
    category: "Arbeidsrecht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:GHDHA:2023:1122",
    date: "2023-11-15"
  },
  {
    id: 102,
    title: "Ziekteverzuimfraude: Klussen tijdens arbeidsongeschiktheid",
    snippet: "Werknemer meldde zich ziek met rugklachten maar werd geobserveerd tijdens zware bouwwerkzaamheden aan eigen huis. Loondoorbetaling stopgezet en ontslag.",
    gedragskenmerken: ["Verzuimfraude", "Bedrog", "Arbeidsconflict"],
    wetgeving: [{ wetboek: "BW", artikel: "7:629" }],
    category: "Arbeidsrecht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:GHSHE:2023:3421",
    date: "2023-10-12"
  },
  {
    id: 103,
    title: "Interne diefstal: Kasgrepen vastgelegd",
    snippet: "Structurele kastekorten in winkelfiliaal. Verborgen camera (ingezet als ultimum remedium na protocol) legde diefstal door filiaalmanager vast.",
    gedragskenmerken: ["Diefstal", "Integriteit", "Cameratoezicht"],
    wetgeving: [{ wetboek: "WvSr", artikel: "310" }],
    category: "Arbeidsrecht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBZWB:2023:4455",
    date: "2023-07-02"
  },
  {
    id: 104,
    title: "Intimidatie en angstcultuur op de werkvloer",
    snippet: "Meldingen van grensoverschrijdend gedrag door leidinggevende. Feitenonderzoek via interviews bevestigde patroon van intimidatie. Ontbinding arbeidsovereenkomst.",
    gedragskenmerken: ["Machtsmisbruik", "Intimidatie", "Onveilige werksfeer"],
    wetgeving: [{ wetboek: "BW", artikel: "7:669" }],
    category: "Arbeidsrecht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBMNE:2023:2100",
    date: "2023-06-18"
  },
  {
    id: 105,
    title: "Schending geheimhouding en concurrentiebeding",
    snippet: "Werknemer downloadde grote hoeveelheden data voor vertrek en benaderde relaties. Logfile-analyse toonde de omvang van de diefstal aan.",
    gedragskenmerken: ["Datadiefstal", "Bedrijfsspionage", "Integriteitsschending"],
    wetgeving: [{ wetboek: "Wet bescherming bedrijfsgeheimen", artikel: "2" }],
    category: "Arbeidsrecht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:GHARL:2023:3322",
    date: "2023-04-22"
  },
  {
    id: 106,
    title: "Falsificatie van diploma's bij sollicitatie",
    snippet: "Bij screening voor een toppositie bleken diploma's vervalst. Aangifte gedaan van valsheid in geschrifte en civielrechtelijke procedure gestart.",
    gedragskenmerken: ["CV-fraude", "Valsheid in geschrifte", "Misleiding"],
    wetgeving: [{ wetboek: "WvSr", artikel: "225" }],
    category: "Arbeidsrecht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBROT:2022:555",
    date: "2022-09-10"
  },

  // ---------------- STRAFRECHT & VEILIGHEID ----------------
  {
    id: 201,
    title: "Stalking via GPS-tracker onder auto",
    snippet: "Ex-partner plaatste heimelijk een GPS-tracker. Bewijs verzameld door technisch onderzoek aan het voertuig. Veroordeling voor belaging en inbreuk op privacy.",
    gedragskenmerken: ["Stalking", "Controle", "Inbreuk levenssfeer"],
    wetgeving: [{ wetboek: "WvSr", artikel: "285b" }],
    category: "Strafrecht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBROT:2024:334",
    date: "2024-01-20"
  },
  {
    id: 202,
    title: "Huiselijk geweld en Uithuisplaatsing",
    snippet: "Na herhaalde meldingen en politie-interventies werd besloten tot een tijdelijk huisverbod om de veiligheid van het gezin te waarborgen.",
    gedragskenmerken: ["Fysieke agressie", "Bedreiging", "Huiselijk geweld"],
    wetgeving: [{ wetboek: "Wet tijdelijk huisverbod", artikel: "2" }],
    category: "Strafrecht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RVS:2020:123",
    date: "2020-05-15"
  },
  {
    id: 203,
    title: "Identiteitsfraude door familielid",
    snippet: "Verdachte sloot leningen af op naam van ouders. Digitaal sporenonderzoek en schriftanalyse bevestigden de fraude binnen de familiesfeer.",
    gedragskenmerken: ["Identiteitsfraude", "Financieel misbruik", "Vertrouwensbreuk"],
    wetgeving: [{ wetboek: "WvSr", artikel: "231b" }],
    category: "Strafrecht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBROT:2023:5566",
    date: "2023-05-10"
  },
  {
    id: 204,
    title: "Vernieling eigendommen ex-partner",
    snippet: "Auto van ex-partner herhaaldelijk bekrast. Camerabeelden in de buurt en getuigenverklaringen leidden tot identificatie van de dader.",
    gedragskenmerken: ["Vandalisme", "Wraak", "Escalatie"],
    wetgeving: [{ wetboek: "WvSr", artikel: "350" }],
    category: "Strafrecht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBOBR:2023:111",
    date: "2023-03-15"
  },
  {
    id: 205,
    title: "Oplichting via Datingfraude",
    snippet: "Slachtoffer maakte grote bedragen over naar online 'partner'. Onderzoek toonde aan dat de profielen nep waren. Aangifte leidde tot vervolging.",
    gedragskenmerken: ["Catfishing", "Financiële uitbuiting", "Manipulatie"],
    wetgeving: [{ wetboek: "WvSr", artikel: "326" }],
    category: "Strafrecht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBZWB:2020:333",
    date: "2020-11-02"
  },
  {
    id: 206,
    title: "Afpersing van ondernemer",
    snippet: "Ondernemer werd afgeperst met dreiging van openbaarmaking gevoelige info. Onderzoek hielp bij het verzamelen van bewijs voor de politie.",
    gedragskenmerken: ["Afpersing", "Dwang", "Bedreiging"],
    wetgeving: [{ wetboek: "WvSr", artikel: "317" }],
    category: "Strafrecht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBAMS:2019:444",
    date: "2019-03-10"
  },

  // ---------------- CIVIEL & FAMILIE ----------------
  {
    id: 301,
    title: "Alimentatiefraude: Samenwonen verzwegen",
    snippet: "Alimentatiegerechtigde woonde feitelijk samen als ware gehuwd. Observatie van leefpatroon (boodschappen, sleutelgebruik) leverde bewijs. Alimentatie beëindigd.",
    gedragskenmerken: ["Alimentatiefraude", "Verzwijging", "Civiel onderzoek"],
    wetgeving: [{ wetboek: "BW", artikel: "1:160" }],
    category: "Familierecht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:HR:2023:123",
    date: "2023-08-15"
  },
  {
    id: 302,
    title: "Onrechtmatige online publicaties (Smaad)",
    snippet: "Gedaagde verspreidde beschuldigingen van fraude over eiser op social media zonder bewijs. Onderzoek naar bron leidde tot rectificatiebevel.",
    gedragskenmerken: ["Reputatieschade", "Online intimidatie", "Laster"],
    wetgeving: [{ wetboek: "BW", artikel: "6:167" }],
    category: "Civiel Recht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBDHA:2023:889",
    date: "2023-09-28"
  },
  {
    id: 303,
    title: "Kindermishandeling & Omgangsregeling",
    snippet: "In een omgangszaak werden zorgen over veiligheid geuit. Raadsonderzoek en feitenrelaas over incidenten leidden tot opschorting omgang.",
    gedragskenmerken: ["Onveiligheid kind", "Verwaarlozing", "Escalatie"],
    wetgeving: [{ wetboek: "BW", artikel: "1:266" }],
    category: "Familierecht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:GHDHA:2023:567",
    date: "2023-04-10"
  },
  {
    id: 304,
    title: "Woonfraude: Illegale onderverhuur",
    snippet: "Huurder van sociale huurwoning verbleef feitelijk elders. Buurtonderzoek en verbruiksdata bevestigden leegstand/onderverhuur. Huurcontract ontbonden.",
    gedragskenmerken: ["Woonfraude", "Onderverhuur", "Contractbreuk"],
    wetgeving: [{ wetboek: "BW", artikel: "7:244" }],
    category: "Huurrecht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBAMS:2023:556",
    date: "2023-11-05"
  },
  {
    id: 305,
    title: "Onrechtmatig bewijs door Privédetective",
    snippet: "Onderzoeksbureau ging te ver in inbreuk op privacy (stelselmatig observeren woning). Rechter sloot bewijs uit. Belangrijk precedent voor proportionaliteit.",
    gedragskenmerken: ["Onrechtmatig onderzoek", "Privacy-inbreuk", "Proportionaliteit"],
    wetgeving: [{ wetboek: "Rv", artikel: "152" }],
    category: "Civiel Recht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:HR:2014:942",
    date: "2014-04-18"
  },
  {
    id: 306,
    title: "Schending geheimhouding bedrijfsgeheimen",
    snippet: "Concurrent verkreeg bedrijfsgeheimen via een 'mol'. Onderzoek bracht de datastromen in kaart. Civiele procedure voor schadevergoeding gestart.",
    gedragskenmerken: ["Spionage", "Diefstal intellectueel eigendom", "Infiltratie"],
    wetgeving: [{ wetboek: "Wet bescherming bedrijfsgeheimen", artikel: "2" }],
    category: "Civiel Recht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBOVE:2023:789",
    date: "2023-05-20"
  },

  // ---------------- ZORGFRAUDE & OVERIG ----------------
  {
    id: 401,
    title: "Zorgfraude: PGB-gelden gokverslaving",
    snippet: "PGB-houder besteedde budget aan gokken en luxe goederen in plaats van zorg. Financieel rechercheonderzoek legde de geldstromen bloot.",
    gedragskenmerken: ["Zorgfraude", "Verduistering", "PGB-misbruik"],
    wetgeving: [{ wetboek: "WvSr", artikel: "321" }],
    category: "Zorgfraude",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBGEL:2023:778",
    date: "2023-02-28"
  },
  {
    id: 402,
    title: "Verzekeringsfraude (Brandstichting)",
    snippet: "Verzekerde claimde brandschade, maar technisch onderzoek wees op opzet. Inboedel bleek vooraf verwijderd. Claim afgewezen en registratie frauderegister.",
    gedragskenmerken: ["Opzet", "Verzekeringsbedrog", "Valse verklaring"],
    wetgeving: [{ wetboek: "WvSr", artikel: "326" }],
    category: "Fraude",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBROT:2019:8765",
    date: "2019-11-12"
  },
  {
    id: 403,
    title: "Financieel misbruik van ouderen",
    snippet: "Mantelzorger pinde grote bedragen van rekening dementerende oudere. Bank deed melding, onderzoek volgde. Terugbetaling en strafrechtelijk traject.",
    gedragskenmerken: ["Financiële uitbuiting", "Kwetsbare ouderen", "Vertrouwenspositie"],
    wetgeving: [{ wetboek: "WvSr", artikel: "310" }],
    category: "Fraude",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBNHO:2021:1234",
    date: "2021-06-20"
  },
  {
    id: 404,
    title: "Valse Aangifte (Stalking)",
    snippet: "Persoon deed valse aangifte van stalking om ex-partner in kwaad daglicht te stellen. Digitaal onderzoek toonde aan dat berichten zelf waren verstuurd.",
    gedragskenmerken: ["Valse aangifte", "Manipulatie", "Wraak"],
    wetgeving: [{ wetboek: "WvSr", artikel: "188" }],
    category: "Strafrecht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBOVE:2022:567",
    date: "2022-08-05"
  }
];
