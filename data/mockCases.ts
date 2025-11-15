
export interface MockCase {
  id: number;
  title: string;
  snippet: string;
  gedragskenmerken: string[];
  wetgeving: { wetboek: string; artikel: string }[];
  category: string;
}

export const mockCases: MockCase[] = [
  {
    id: 1,
    title: "Casus: Financiële Controle",
    snippet: "Mijn partner controleert al mijn uitgaven en ik moet om toestemming vragen voor elke aankoop. Dit voelt benauwend...",
    gedragskenmerken: ["Controle", "Financiële afhankelijkheid", "Isolatie"],
    wetgeving: [{ wetboek: "BW", artikel: "Art. 1:81" }],
    category: "Relatie & Familie"
  },
  {
    id: 2,
    title: "Casus: Stalking na Relatiebreuk",
    snippet: "Sinds ik de relatie heb beëindigd, staat mijn ex-partner dagelijks in mijn straat en ontvang ik continu ongewenste berichten.",
    gedragskenmerken: ["Intimidatie", "Stalking", "Grensoverschrijdend"],
    wetgeving: [{ wetboek: "WvSr", artikel: "Art. 285b" }],
    category: "Relatie & Familie"
  },
  {
    id: 3,
    title: "Casus: Emotionele Manipulatie",
    snippet: "Mijn familielid gebruikt mijn onzekerheden tegen me en geeft me constant het gevoel dat ik de schuldige ben, ook als dat niet zo is.",
    gedragskenmerken: ["Gaslighting", "Schuldinductie", "Manipulatie"],
    wetgeving: [],
    category: "Relatie & Familie"
  },
    {
    id: 4,
    title: "Casus: Werkplek Intimidatie",
    snippet: "Een leidinggevende maakt voortdurend kleinerende opmerkingen en geeft mij onmogelijke deadlines, wat voor veel stress zorgt.",
    gedragskenmerken: ["Machtsmisbruik", "Intimidatie", "Pesten op het werk"],
    wetgeving: [{ wetboek: "Arbowet", artikel: "Art. 3" }],
    category: "Werk & Zakelijk"
  }
];
