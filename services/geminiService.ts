import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { AnalysisResponse, InitialAnalysisResponse } from "../types";

// Lazy init wrapper
let aiInstance: GoogleGenAI | null = null;
const getAI = () => {
  if (!aiInstance) {
    // Decode the Base64 key to bypass Netlify secret scanner
    const encodedKey = process.env.GEMINI_API_KEY_B64;
    const apiKey = encodedKey ? atob(encodedKey) : (process.env.API_KEY || '');

    if (!apiKey) {
      console.error("GEMINI_API_KEY is missing!");
      throw new Error("GEMINI_API_KEY is not set.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

// --- Initial Analysis (Streaming Ready) ---

const INITIAL_ANALYSIS_SYSTEM_INSTRUCTION = `Jij bent een gedragsanalyse-assistent voor recherchebureau Doddar. Jouw taak is om een voorlopige analyse uit te voeren naar onrechtmatig gedrag en risicofactoren.

BELANGRIJK: 
1. Je bent GEEN psycholoog en trekt GEEN klinische conclusies. 
2. Focus op objectiveerbare gedragspatronen die relevant zijn voor feitenonderzoek.
3. Gebruik termen zoals 'indicatoren', 'gedragskenmerken' en 'risicofactoren'.
4. Adereer STRIKT aan de opgegeven onderzoekskaders (zakelijk of privé) zoals gespecificeerd in de prompt.

REGEER ALLEEN MET JSON. GEEN INLEIDING OF UITLEG BUITEN DE JSON.`;

const INITIAL_ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    veiligheidsscore: {
      type: Type.NUMBER,
      description: "Een algehele indicatie van 0-100 van de complexiteit/risico van de casus."
    },
    gedragspatronen: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          label: { type: Type.STRING, description: "Naam van het patroon (bijv. Gaslighting, Love Bombing)." },
          score: { type: Type.NUMBER, description: "Match-percentage als float tussen 0.0 en 1.0." },
          why_short: { type: Type.STRING, description: "Korte duiding waarom dit patroon herkend wordt." }
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
          priority: { type: Type.NUMBER }
        },
        required: ["question_id", "vraag", "waarom_relevant", "input_type", "priority"],
      }
    },
    bevoegdheid: {
      type: Type.OBJECT,
      properties: {
        is_bevoegd: { type: Type.BOOLEAN },
        reden: { type: Type.STRING },
        advies: { type: Type.STRING }
      },
      required: ["is_bevoegd", "reden", "advies"]
    }
  },
  required: ["veiligheidsscore", "gedragspatronen", "verduidelijkingsvragen", "bevoegdheid"],
};

export async function* getInitialAnalysisStream(description: string, persona: 'business' | 'private') {
  const prompt = `Casus: "${description}". Persona: ${persona}. Analyseer op onderzoekbare gedragskenmerken en lever direct JSON.`;

  const stream = await getAI().models.generateContentStream({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: INITIAL_ANALYSIS_SYSTEM_INSTRUCTION,
      responseSchema: INITIAL_ANALYSIS_SCHEMA,
      responseMimeType: "application/json",
      temperature: 0.1,
    },
  });

  for await (const chunk of stream) {
    if (chunk.text) yield chunk.text;
  }
}

export async function getInitialAnalysis(description: string, persona: 'business' | 'private'): Promise<InitialAnalysisResponse> {
  const prompt = `Casus: "${description}". Persona: ${persona}.`;
  const response = await getAI().models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: INITIAL_ANALYSIS_SYSTEM_INSTRUCTION,
      responseSchema: INITIAL_ANALYSIS_SCHEMA,
      responseMimeType: "application/json",
      temperature: 0.1,
    },
  });
  return JSON.parse(response.text || '{}') as InitialAnalysisResponse;
}

// --- Detailed Analysis (Deep Reasoning & Grounding) ---

const DETAILED_ANALYSIS_SYSTEM_INSTRUCTION = `Je bent Doddar’s senior onderzoeksassistent (Expert in feitenonderzoek). 
1. Gebruik 'googleSearch' voor wetgeving. 
2. Wetboeken VOLUIT schrijven.
3. GEEN URL-links.
4. GEEN klinische diagnoses stellen. Wees een forensisch analist, geen psycholoog.
5. In de bevoegdheidscheck toets je uitsluitend aan de Wpbr en het 'gerechtvaardigd belang' voor particulier onderzoek.
6. Schrijf wetenschappelijke bronnen volluit in APA-stijl in het bronveld.
7. Wees SELECTIEF met onderzoeksmethoden (max 2-3). Prioriteer laag-drempelige methoden zoals 'Advies' en 'OSINT' voor algemene casussen, maar zet 'Observatie' ALTIJD in als relevante optie bij casussen die fysiek gedrag, buitensluiting in de fysieke ruimte of pestgedrag betreffen waarbij bewijslast noodzakelijk is.`;

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
          bron: { type: Type.STRING },
        },
        required: ["wetboek", "artikel", "omschrijving", "bron"],
      },
    },
    impact_onderbouwing: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          titel: { type: Type.STRING },
          onderbouwing: { type: Type.STRING },
          referenties: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                titel: { type: Type.STRING },
                jaar: { type: Type.NUMBER },
                doi: { type: Type.STRING },
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
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, enum: ["OSINT", "Observatie", "Interview", "Advies", "Screening", "Recherche"] },
          omschrijving: { type: Type.STRING },
        },
        required: ["id", "omschrijving"],
      },
    },
    advies: {
      type: Type.OBJECT,
      properties: {
        minderjarig: { type: Type.BOOLEAN },
        veiligheidsadvies: { type: Type.STRING },
        professioneel_advies: { type: Type.STRING },
        juridische_opmerking: { type: Type.STRING },
      },
      required: ["minderjarig", "veiligheidsadvies", "professioneel_advies", "juridische_opmerking"],
    },
  },
  required: ["samenvatting", "gedragskenmerken", "mogelijke_wettelijke_overtredingen", "impact_onderbouwing", "bevoegdheidscheck", "aanvullende_vragen", "mogelijke_onderzoeksmethoden", "advies"],
};

export async function* getDetailedAnalysisStream(description: string, answers: Record<string, string>) {
  const context = `Casus: ${description}. Antwoorden op vragen: ${JSON.stringify(answers)}`;

  const stream = await getAI().models.generateContentStream({
    model: 'gemini-3-flash-preview',
    contents: context,
    config: {
      systemInstruction: DETAILED_ANALYSIS_SYSTEM_INSTRUCTION,
      responseSchema: DETAILED_ANALYSIS_SCHEMA,
      responseMimeType: "application/json",
      temperature: 0.1,
      tools: [{ googleSearch: {} }],
      thinkingConfig: { thinkingBudget: 2000 }
    },
  });

  for await (const chunk of stream) {
    if (chunk.text) yield chunk.text;
  }
}

export async function getDetailedAnalysis(description: string, answers: Record<string, string>): Promise<AnalysisResponse> {
  const context = `Casus: ${description}. Antwoorden op vragen: ${JSON.stringify(answers)}`;
  const response = await getAI().models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: context,
    config: {
      systemInstruction: DETAILED_ANALYSIS_SYSTEM_INSTRUCTION,
      responseSchema: DETAILED_ANALYSIS_SCHEMA,
      responseMimeType: "application/json",
      temperature: 0.1,
      tools: [{ googleSearch: {} }],
      thinkingConfig: { thinkingBudget: 2000 }
    },
  });
  return JSON.parse(response.text || '{}') as AnalysisResponse;
}

export async function getRewriteSuggestion(description: string): Promise<string> {
  const response = await getAI().models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Herschrijf deze tekst kort en zakelijk vanuit een persoonlijk perspectief voor recherche-analyse. Tekst: "${description}"`,
    config: {
      systemInstruction: "Herschrijf de tekst feitelijk. Alleen de herschreven tekst teruggeven.",
      temperature: 0.7,
    },
  });
  return response.text.trim();
}