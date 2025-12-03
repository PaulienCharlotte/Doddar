import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResponse, InitialAnalysisResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// --- Initial Analysis ---

const INITIAL_ANALYSIS_SYSTEM_INSTRUCTION = `Jij bent een gedragsanalyse-assistent voor recherchebureau Doddar. Jouw taak is om een voorlopige analyse uit te voeren van een door de gebruiker ingediende casus. Identificeer potentiële risicofactoren, scoor de ernst, genereer verhelderende vragen en voer een initiële bevoegdheidscheck uit. Reageer ALLEEN met een geldig JSON-object.`;

const INITIAL_ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    veiligheidsscore: { type: Type.NUMBER, description: "Een indicatieve score van 0 (zeer gevaarlijk) tot 100 (volkomen veilig)." },
    gedragspatronen: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          label: { type: Type.STRING },
          score: { type: Type.NUMBER, description: "Een score van 0.0 tot 1.0." },
          why_short: { type: Type.STRING, description: "Een ultrakorte (max 1 zin) uitleg voor de score." }
        },
        required: ["label", "score", "why_short"],
      }
    },
    verduidelijkingsvragen: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question_id: { type: Type.STRING },
          vraag: { type: Type.STRING },
          waarom_relevant: { type: Type.STRING },
          input_type: { type: Type.STRING, enum: ['YES_NO', 'MULTIPLE_CHOICE', 'SCALE_0_4', 'FREE_TEXT'] },
          options: { type: Type.ARRAY, items: { type: Type.STRING }, nullable: true },
          placeholder: { type: Type.STRING, nullable: true },
          priority: { type: Type.NUMBER }
        },
        required: ["question_id", "vraag", "waarom_relevant", "input_type", "priority"],
      }
    },
    bevoegdheid: {
      type: Type.OBJECT,
      description: "Een inschatting of de indiener bevoegd is de analyse aan te vragen.",
      properties: {
        is_bevoegd: { type: Type.BOOLEAN, description: "Indicatie of er een legitieme grondslag (bv. ouder, werkgever) is." },
        reden: { type: Type.STRING, description: "Korte toelichting op de (on)bevoegdheid." },
        advies: { type: Type.STRING, description: "Advies over hoe de bevoegdheid te valideren." }
      },
      required: ["is_bevoegd", "reden", "advies"]
    }
  },
  required: ["veiligheidsscore", "gedragspatronen", "verduidelijkingsvragen", "bevoegdheid"],
};

function constructInitialPrompt(description: string, persona: 'business' | 'private'): string {
  return `
Casusbeschrijving: "${description}"
Gedetecteerde persona: ${persona}

Taak:
1.  Analyseer de tekst op negatieve gedragspatronen.
2.  Geef een indicatieve "veiligheidsscore" van 0 tot 100.
3.  Identificeer de 3-5 meest prominente "gedragspatronen".
4.  Genereer 3 tot 5 "verduidelijkingsvragen".
    FOCUS OP GESLOTEN VRAGEN om het invullen makkelijk te maken:
    - Gebruik bij voorkeur 'YES_NO' (bv. "Is er sprake van fysiek geweld?").
    - Gebruik 'MULTIPLE_CHOICE' voor context (bv. "Wie is er betrokken?", "Waar gebeurt dit?"). Geef 3-5 duidelijke opties.
    - Gebruik 'SCALE_0_4' voor frequentie, intensiteit of gevoel (bv. "Hoe vaak komt dit voor?", "Hoe onveilig voelt u zich?").
    - Gebruik 'FREE_TEXT' *alleen* als een open antwoord echt noodzakelijk is voor details die niet in opties te vatten zijn.
    
    Format per vraag:
    - "input_type": 'YES_NO' | 'MULTIPLE_CHOICE' | 'SCALE_0_4' | 'FREE_TEXT'
    - "options": Array van strings (VERPLICHT bij MULTIPLE_CHOICE, optioneel bij SCALE).
    - "vraag": De vraagtekst.
    - "waarom_relevant": Uitleg.
5.  Evalueer de **bevoegdheid** van de indiener (gerechtvaardigd belang).
`;
}

export async function getInitialAnalysis(description: string, persona: 'business' | 'private'): Promise<InitialAnalysisResponse> {
  const prompt = constructInitialPrompt(description, persona);
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      systemInstruction: INITIAL_ANALYSIS_SYSTEM_INSTRUCTION,
      responseSchema: INITIAL_ANALYSIS_SCHEMA,
      temperature: 0.3,
      responseMimeType: "application/json",
    },
  });

  try {
    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as InitialAnalysisResponse;
  } catch (error) {
    console.error("Failed to parse initial analysis JSON response:", response.text);
    throw new Error("Ongeldig JSON-formaat ontvangen van de API voor de eerste analyse.");
  }
}

// --- Rewrite Suggestion ---
export async function getRewriteSuggestion(description: string): Promise<string> {
    const systemInstruction = `Jij bent een empathische assistent. Herschrijf de gegeven tekst vanuit een persoonlijk 'ik'-perspectief. Focus op het gevoel van onveiligheid, stress en de persoonlijke impact. Vermijd zakelijk jargon, formele taal en directe beschuldigingen. De output moet ALLEEN de herschreven tekst zijn, zonder extra opmaak of uitleg.`;
    const prompt = `Originele tekst: "${description}"\n\nHerschreven tekst:`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
    });

    return response.text.trim();
}


// --- Detailed Analysis (NEW STRUCTURE) ---

const DETAILED_ANALYSIS_SYSTEM_INSTRUCTION = "Je bent Doddar’s onderzoeksassistent. Gebruik uitsluitend: (1) NL wet/overheidspublicaties; (2) peer-reviewed wetenschap met DOI. Citeer precies. Geen blogs/nieuws. Geen juridisch bindend advies. Als bron ontbreekt: laat sectie leeg en geef verduidelijkingsvragen.";

const DETAILED_ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    samenvatting: { type: Type.STRING },
    gedragskenmerken: { type: Type.ARRAY, items: { type: Type.STRING } },
    mogelijke_wettelijke_overtredingen: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          wetboek: { type: Type.STRING },
          artikel: { type: Type.STRING },
          omschrijving: { type: Type.STRING },
          bron: { type: Type.STRING, description: "Een directe link naar de bron op wetten.nl" },
        },
        required: ["wetboek", "artikel", "omschrijving", "bron"],
      },
    },
    impact_onderbouwing: {
      type: Type.ARRAY,
      description: "Een lijst van 2-3 objecten die de psychologische impact van de gedragspatronen onderbouwen, inclusief referenties.",
      items: {
        type: Type.OBJECT,
        properties: {
          titel: { type: Type.STRING, description: "Titel die het gedragspatroon benoemt, bv. 'Impact van Emotionele Controle'." },
          onderbouwing: { type: Type.STRING, description: "Korte, psychologisch onderbouwde uitleg over de gevolgen." },
          referenties: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                titel: { type: Type.STRING },
                jaar: { type: Type.NUMBER },
                doi: { type: Type.STRING, description: "Een volledige DOI URL" },
              },
              required: ["titel", "jaar", "doi"],
            }
          }
        },
        required: ["titel", "onderbouwing", "referenties"],
      },
    },
    bevoegdheidscheck: {
      type: Type.OBJECT,
      properties: {
        is_bevoegd: { type: Type.BOOLEAN },
        motivering: { type: Type.STRING },
        kaders: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["is_bevoegd", "motivering", "kaders"],
    },
    aanvullende_vragen: { type: Type.ARRAY, items: { type: Type.STRING } },
    mogelijke_onderzoeksmethoden: {
      type: Type.ARRAY,
      description: "Een lijst met objecten van de aanbevolen diensten, inclusief een casus-specifieke omschrijving.",
      items: {
        type: Type.OBJECT,
        properties: {
          id: {
            type: Type.STRING,
            enum: ["OSINT", "Observatie", "Interview"],
            description: "De ID van de aanbevolen dienst.",
          },
          omschrijving: {
            type: Type.STRING,
            description: "Een KORTE, casus-specifieke omschrijving (max 2 zinnen) die uitlegt WAAROM deze methode relevant is voor DEZE casus.",
          },
        },
        required: ["id", "omschrijving"],
      },
    },
    advies: {
      type: Type.OBJECT,
      properties: {
        minderjarig: { type: Type.BOOLEAN, description: "True als er een minderjarige direct betrokken lijkt." },
        veiligheidsadvies: { type: Type.STRING },
        professioneel_advies: { type: Type.STRING },
        juridische_opmerking: { type: Type.STRING },
      },
      required: ["minderjarig", "veiligheidsadvies", "professioneel_advies", "juridische_opmerking"],
    },
  },
  required: [
    "samenvatting",
    "gedragskenmerken",
    "mogelijke_wettelijke_overtredingen",
    "impact_onderbouwing",
    "bevoegdheidscheck",
    "aanvullende_vragen",
    "mogelijke_onderzoeksmethoden",
    "advies",
  ],
};

function constructDetailedPrompt(description: string, answers: Record<string, string>): string {
  const leeftijd = answers['leeftijd'] || 'onbekend';
  const relatietype = answers['relatietype'] || 'onbekend';
  const otherAnswers = Object.entries(answers)
    .filter(([key]) => !['leeftijd', 'relatietype'].includes(key))
    .map(([key, value]) => `- Vraag "${key}": ${value}`)
    .join('\n');

  const casusBeschrijving = `Initiële beschrijving:\n${description}\n\nAanvullende antwoorden:\n${otherAnswers}`;
  
  const inputCasusJson = JSON.stringify({
    gebruiker: {
      leeftijd: leeftijd,
      rol: "client",
      relatie_type: relatietype
    },
    bevoegdheid: {
      is_business: false,
      role: "other",
      mandate_confirmed: false,
      policy_exists: false
    },
    casus: {
      beschrijving: casusBeschrijving,
      datum: new Date().toISOString().split('T')[0],
      emotionele_reactie: "niet gespecificeerd"
    },
    doel_analyse: "Inzicht en advies verkrijgen over de geschetste situatie."
  }, null, 2);

  const servicesInfo = `
BESCHIKBARE DIENSTEN:
- ID: "OSINT", Naam: OSINT Achtergrondonderzoek
- ID: "Observatie", Naam: Observatieonderzoek
- ID: "Interview", Naam: Interviewtechnieken
`;

  return `
CONTEXT:
${servicesInfo}

POLICY:
- LAW_WHITELIST: wetten.nl, rechtspraak.nl, autoriteitpersoonsgegevens.nl, rijksoverheid.nl, overheid.nl, politie.nl
- SCIENCE_REQUIRE_DOI: true
- MAX_FOLLOWUP_QUESTIONS: 3
- BUSINESS_AUTH_CHECK: required

INPUT_CASUS_JSON:
${inputCasusJson}

OUTPUT_SCHEMA (ONLY JSON):
{
  "samenvatting": "string",
  "gedragskenmerken": ["string"],
  "mogelijke_wettelijke_overtredingen": [{"wetboek": "string", "artikel": "string", "omschrijving": "string", "bron": "https://wetten.nl/..."}],
  "impact_onderbouwing": [{"titel": "Impact van [Gedragspatroon]", "onderbouwing": "Psychologische uitleg van de impact.", "referenties": [{"titel": "string", "jaar": "number", "doi": "https://doi.org/..."}]}],
  "bevoegdheidscheck": {"is_bevoegd": "boolean", "motivering": "string", "kaders": ["Wpbr","AVG"]},
  "aanvullende_vragen": ["string"],
  "mogelijke_onderzoeksmethoden": [{"id": "ID van een dienst", "omschrijving": "Casus-specifieke toelichting waarom deze dienst relevant is"}],
  "advies": {"minderjarig": "boolean", "veiligheidsadvies": "string", "professioneel_advies": "string", "juridische_opmerking": "Indicatief; geen juridisch advies."}
}

REGELS:
- Nederlandse wet: citeer met wetten.nl-link.
- Wetenschap: alleen als DOI aanwezig is; anders overslaan.
- Impact Onderbouwing: Genereer 2-3 objecten. De 'titel' moet een gedragspatroon uit de casus benoemen (bv. 'Impact van Sociale Isolatie'). De 'onderbouwing' is een korte, psychologisch onderbouwde uitleg. Voeg 1-2 relevante wetenschappelijke 'referenties' toe aan ELK impact-object.
- Max 3 aanvullende vragen.
- Bevoegdheidscheck: Een formele intake is ALTIJD noodzakelijk om het 'gerechtvaardigd belang' zorgvuldig vast te stellen, ongeacht de casus. De AI-analyse alleen is hiervoor nooit voldoende. Als de casus duidt op een gerechtvaardigd belang (AVG art. 6(1)(f)), zet 'is_bevoegd' op 'true' maar benadruk in 'motivering' dat de intake de definitieve stap is. Anders, zet op 'false' en leg uit waarom nader onderzoek (via een intake) vereist is om de grondslag te bepalen.
- Onderzoeksmethoden: Voor "mogelijke_onderzoeksmethoden", selecteer de meest relevante dienst-ID's uit de CONTEXT. Return een array van objecten. Elk object moet een 'id' bevatten en een 'omschrijving' die KORT en SPECIFIEK voor deze casus uitlegt waarom die methode nuttig is.
- Return ONLY JSON; geen extra tekst.
`;
}

export async function getDetailedAnalysis(description: string, answers: Record<string, string>): Promise<AnalysisResponse> {
  const prompt = constructDetailedPrompt(description, answers);

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      systemInstruction: DETAILED_ANALYSIS_SYSTEM_INSTRUCTION,
      responseSchema: DETAILED_ANALYSIS_SCHEMA,
      temperature: 0.2,
      responseMimeType: "application/json",
    },
  });

  try {
    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as AnalysisResponse;
  } catch (error) {
    console.error("Failed to parse detailed analysis JSON response:", response.text);
    throw new Error("Ongeldig JSON-formaat ontvangen van de API voor de gedetailleerde analyse.");
  }
}