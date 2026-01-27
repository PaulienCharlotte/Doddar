
export interface MockCase {
  id: string; // Changed to string for ECLI
  ecli: string; // New field for official ID
  title: string;
  snippet: string;
  gedragskenmerken: string[];
  wetgeving: { wetboek: string; artikel: string }[];
  category: string;
  sourceUrl: string;
  date: string;
}

// Dataset met ECHTE jurisprudentie relevant voor particulier onderzoek
export const mockCases: MockCase[] = [
  // ================= ARBEIDSRECHT =================
  {
    id: "ECLI:NL:HR:2014:896",
    ecli: "ECLI:NL:HR:2014:896",
    title: "Cameratoezicht en privacy werknemer",
    snippet: "Hoge Raad oordeelt dat onrechtmatig verkregen bewijs (verborgen camera) onder omstandigheden toch gebruikt mag worden in ontslagzaak indien waarheidsvinding zwaarder weegt.",
    gedragskenmerken: ["Diefstal", "Privacy", "Cameratoezicht"],
    wetgeving: [{ wetboek: "Rv", artikel: "152" }],
    category: "Arbeidsrecht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:HR:2014:896",
    date: "2014-04-18"
  },
  {
    id: "ECLI:NL:GHSHE:2014:14",
    ecli: "ECLI:NL:GHSHE:2014:14",
    title: "Ontslag na GPS-onderzoek detective",
    snippet: "Werkgever schakelde recherchebureau in om zieke werknemer te controleren. GPS-volgsysteem inbreuk op privacy, maar bevindingen (klussen tijdens ziekte) wel toegelaten.",
    gedragskenmerken: ["Verzuimfraude", "GPS-tracker", "Recherchebureau"],
    wetgeving: [{ wetboek: "BW", artikel: "7:669" }],
    category: "Arbeidsrecht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:GHSHE:2014:14",
    date: "2014-01-07"
  },
  {
    id: "ECLI:NL:RBARN:2012:BW9865",
    ecli: "ECLI:NL:RBARN:2012:BW9865",
    title: "Bagateldelict: 'Action-arrest'",
    snippet: "Werknemer ontslagen voor eten van zakje pinda's zonder betalen. Zero-tolerance beleid van werkgever stond vast. Ontslag op staande voet rechtsgeldig.",
    gedragskenmerken: ["Diefstal", "Integriteit", "Zero-tolerance"],
    wetgeving: [{ wetboek: "BW", artikel: "7:678" }],
    category: "Arbeidsrecht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBARN:2012:BW9865",
    date: "2012-06-27"
  },
  {
    id: "ECLI:NL:GHARL:2021:3095",
    ecli: "ECLI:NL:GHARL:2021:3095",
    title: "Nevenwerkzaamheden tijdens ziekte",
    snippet: "Werknemer meldde zich ziek maar verrichtte ondertussen werkzaamheden voor eigen bedrijf. Onderzoek bevestigde bedrog. Ontslag terecht.",
    gedragskenmerken: ["Verzuim", "Bedrog", "Nevenactiviteiten"],
    wetgeving: [{ wetboek: "BW", artikel: "7:629" }],
    category: "Arbeidsrecht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:GHARL:2021:3095",
    date: "2021-03-30"
  },
  {
    id: "ECLI:NL:RBOBR:2019:2838",
    ecli: "ECLI:NL:RBOBR:2019:2838",
    title: "Schending concurrentiebeding LinkedIn",
    snippet: "Oud-werknemer linkte met relaties van ex-werkgever op LinkedIn. Rechter oordeelde dat dit viel onder het relatiebeding.",
    gedragskenmerken: ["Concurrentiebeding", "Social Media", "Relatiebeding"],
    wetgeving: [{ wetboek: "BW", artikel: "7:653" }],
    category: "Arbeidsrecht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBOBR:2019:2838",
    date: "2019-05-23"
  },

  // ================= FAMILIERECHT =================
  {
    id: "ECLI:NL:HR:2013:BZ5352",
    ecli: "ECLI:NL:HR:2013:BZ5352",
    title: "Bewijslast samenwonen bij alimentatie",
    snippet: "Om partneralimentatie te beëindigen o.b.v. art 1:160 BW (samenwonen) moet de betaler bewijzen dat er sprake is van een gemeenschappelijke huishouding. Rechercheonderzoek is vaak noodzakelijk.",
    gedragskenmerken: ["Alimentatiefraude", "Samenwonen", "Bewijslast"],
    wetgeving: [{ wetboek: "BW", artikel: "1:160" }],
    category: "Familierecht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:HR:2013:BZ5352",
    date: "2013-09-20"
  },
  {
    id: "ECLI:NL:GHSHE:2020:1584",
    ecli: "ECLI:NL:GHSHE:2020:1584",
    title: "Ouderverstoting en dwangsom",
    snippet: "Moeder werkte niet mee aan omgangsregeling en beïnvloedde kind negatief. Hof legt dwangsom op om contactherstel af te dwingen.",
    gedragskenmerken: ["Ouderverstoting", "Omgangsregeling", "Dwangsom"],
    wetgeving: [{ wetboek: "BW", artikel: "1:253a" }],
    category: "Familierecht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:GHSHE:2020:1584",
    date: "2020-05-14"
  },
  {
    id: "ECLI:NL:RBDHA:2022:10234",
    ecli: "ECLI:NL:RBDHA:2022:10234",
    title: "Internationale kinderontvoering",
    snippet: "Bevel tot teruggeleiding van minderjarigen die door moeder zonder toestemming naar het buitenland waren meegenomen.",
    gedragskenmerken: ["Ontvoering", "Gezag", "Haags Kinderontvoeringsverdrag"],
    wetgeving: [{ wetboek: "HKOV", artikel: "12" }],
    category: "Familierecht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBDHA:2022:10234",
    date: "2022-10-05"
  },

  // ================= HUURRECHT & WOONFRAUDE =================
  {
    id: "ECLI:NL:GHAMS:2019:3522",
    ecli: "ECLI:NL:GHAMS:2019:3522",
    title: "Onderverhuur via Airbnb",
    snippet: "Huurder verhuurde woning via Airbnb. Dit leverde winstbejag op en strijd met goed huurderschap. Huurovereenkomst ontbonden.",
    gedragskenmerken: ["Woonfraude", "Onderverhuur", "Airbnb"],
    wetgeving: [{ wetboek: "BW", artikel: "7:244" }],
    category: "Huurrecht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:GHAMS:2019:3522",
    date: "2019-10-01"
  },
  {
    id: "ECLI:NL:RBAMS:2021:345",
    ecli: "ECLI:NL:RBAMS:2021:345",
    title: "Hennepkwekerij en ontruiming",
    snippet: "Vondst van hennepkwekerij in huurwoning rechtvaardigt ontbinding huurcontract, ook als huurder claimt van niets te weten.",
    gedragskenmerken: ["Hennep", "Ontruiming", "Gevaarzetting"],
    wetgeving: [{ wetboek: "BW", artikel: "7:219" }],
    category: "Huurrecht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBAMS:2021:345",
    date: "2021-01-25"
  },

  // ================= STRAFRECHT & CIVIEL =================
  {
    id: "ECLI:NL:HR:2018:1315",
    ecli: "ECLI:NL:HR:2018:1315",
    title: "Stalking: stelselmatigheid",
    snippet: "Hoge Raad verduidelijkt wanneer inbreuk op persoonlijke levenssfeer 'stelselmatig' is. Aard, duur, frequentie en intensiteit zijn bepalend.",
    gedragskenmerken: ["Stalking", "Belaging", "Stelselmatigheid"],
    wetgeving: [{ wetboek: "WvSr", artikel: "285b" }],
    category: "Strafrecht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:HR:2018:1315",
    date: "2018-09-25"
  },
  {
    id: "ECLI:NL:GHDHA:2017:1765",
    ecli: "ECLI:NL:GHDHA:2017:1765",
    title: "Onrechtmatige perspublicatie",
    snippet: "Belangenafweging tussen persvrijheid en recht op privacy. Publicatie met beschuldigingen zonder wederhoor was onrechtmatig.",
    gedragskenmerken: ["Smaad", "Media", "Privacy"],
    wetgeving: [{ wetboek: "BW", artikel: "6:162" }],
    category: "Civiel Recht",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:GHDHA:2017:1765",
    date: "2017-06-27"
  },
  {
    id: "ECLI:NL:RBMNE:2020:123",
    ecli: "ECLI:NL:RBMNE:2020:123",
    title: "CEO-fraude: Aansprakelijkheid bank",
    snippet: "Bedrijf slachtoffer van CEO-fraude. Bank had zorgplicht geschonden bij ongebruikelijke transactie? Rechter oordeelt over schadevergoeding.",
    gedragskenmerken: ["CEO-fraude", "Oplichting", "Zorgplicht"],
    wetgeving: [{ wetboek: "BW", artikel: "6:162" }],
    category: "Fraude",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBMNE:2020:123",
    date: "2020-01-15"
  }
];
