import type { AnalysisResponse, InitialAnalysisResponse } from "../types";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

if (!API_KEY) {
  console.error("CRITICAL: VITE_GOOGLE_API_KEY is missing in client-side env.");
}

const MODEL_ID = "gemini-1.5-flash";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${API_KEY}`;
const STREAM_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:streamGenerateContent?key=${API_KEY}`;

// --- JSON SCHEMAS (Simplified for fetch) ---

const INITIAL_ANALYSIS_SCHEMA = {
  type: "OBJECT",
  properties: {
    relevance_label: {
      type: "STRING",
      enum: ["Hoog prioriteit", "Gemiddeld", "Laag", "Nader onderzoek nodig"],
      description: "Een kwalitatieve indicatie van de urgentie/complexiteit."
    },
    minor_involved: {
      type: "BOOLEAN",
      description: "Zet op true als er kinderen of minderjarigen betrokken zijn."
    },
    minor_risk_assessment: {
      type: "STRING",
      description: "Korte toelichting op de risico's voor de minderjarige (indien van toepassing)."
    },
    gedragspatronen: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          label: { type: "STRING", description: "Naam van het patroon (bijv. Gaslighting, Love Bombing)." },
          relevance_label: { type: "STRING", enum: ["Aanwezig", "Nader te onderzoeken", "Indicatief"] },
          why_short: { type: "STRING", description: "Korte duiding waarom dit patroon herkend wordt." }
        },
        required: ["label", "relevance_label", "why_short"],
      }
    },
    verduidelijkingsvragen: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          question_id: { type: "STRING" },
          vraag: { type: "STRING" },
          waarom_relevant: { type: "STRING" },
          input_type: { type: "STRING", enum: ['YES_NO', 'MULTIPLE_CHOICE', 'SCALE_0_4', 'FREE_TEXT'] },
          options: { type: "ARRAY", items: { type: "STRING" }, nullable: true },
          priority: { type: "NUMBER" }
        },
        required: ["question_id", "vraag", "waarom_relevant", "input_type", "priority"],
      }
    },
    bevoegdheid: {
      type: "OBJECT",
      properties: {
        is_bevoegd: { type: "BOOLEAN" },
        reden: { type: "STRING" },
        advies: { type: "STRING" }
      },
      required: ["is_bevoegd", "reden", "advies"]
    }
  },
  required: ["relevance_label", "minor_involved", "minor_risk_assessment", "gedragspatronen", "verduidelijkingsvragen", "bevoegdheid"],
};

const DETAILED_ANALYSIS_SCHEMA = {
  type: "OBJECT",
  properties: {
    samenvatting: { type: "STRING" },
    gedragskenmerken: { type: "ARRAY", items: { type: "STRING" } },
    mogelijke_wettelijke_overtredingen: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          wetboek: { type: "STRING" },
          artikel: { type: "STRING" },
          omschrijving: { type: "STRING" },
          bron: { type: "STRING" },
        },
        required: ["wetboek", "artikel", "omschrijving", "bron"],
      },
    },
    impact_onderbouwing: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          titel: { type: "STRING" },
          onderbouwing: { type: "STRING" },
          referenties: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                titel: { type: "STRING" },
                jaar: { type: "NUMBER" },
                doi: { type: "STRING" },
              },
              required: ["titel", "jaar", "doi"],
            }
          }
        },
        required: ["titel", "onderbouwing", "referenties"],
      },
    },
    bevoegdheidscheck: {
      type: "OBJECT",
      properties: {
        is_bevoegd: { type: "BOOLEAN" },
        motivering: { type: "STRING" },
        kaders: { type: "ARRAY", items: { type: "STRING" } },
      },
      required: ["is_bevoegd", "motivering", "kaders"],
    },
    aanvullende_vragen: { type: "ARRAY", items: { type: "STRING" } },
    mogelijke_onderzoeksmethoden: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          id: { type: "STRING", enum: ["OSINT", "Observatie", "Interview", "Advies", "Screening", "Recherche"] },
          omschrijving: { type: "STRING" },
        },
        required: ["id", "omschrijving"],
      },
    },
    advies: {
      type: "OBJECT",
      properties: {
        minderjarig: { type: "BOOLEAN" },
        veiligheidsadvies: { type: "STRING" },
        professioneel_advies: { type: "STRING" },
        juridische_opmerking: { type: "STRING" },
      },
      required: ["minderjarig", "veiligheidsadvies", "professioneel_advies", "juridische_opmerking"],
    },
  },
  required: ["samenvatting", "gedragskenmerken", "mogelijke_wettelijke_overtredingen", "impact_onderbouwing", "bevoegdheidscheck", "aanvullende_vragen", "mogelijke_onderzoeksmethoden", "advies"],
};


// --- HELPERS ---

async function fetchGemini(prompt: string, schema: any, systemInstruction: string, temp = 0.1, isStream = false) {
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] },
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
      temperature: temp,
    }
  };

  const url = isStream ? STREAM_URL : API_URL;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Gemini API Error: ${response.status} ${await response.text()}`);
  }

  // For stream, simplified handling: just read whole JSON for now if UI supports it, 
  // OR actually implement SSE reading. 
  // To match previous behavior "Simulating stream but fetch once" logic:
  const data = await response.json();
  return data;
}


// --- EXPORTS ---

export async function* getInitialAnalysisStream(description: string, persona: 'business' | 'private', adminKey?: string) {
  const prompt = `Casus: "${description}". Persona: ${persona}. Analyseer op onderzoekbare gedragskenmerken en lever direct JSON.`;
  const systemInstruction = `Jij bent een gedragsanalyse-assistent voor recherchebureau Doddar. Jouw taak is om een voorlopige analyse uit te voeren naar onrechtmatig gedrag en risicofactoren.
BELANGRIJK: 
1. Je bent GEEN psycholoog en trekt GEEN klinische conclusies. 
2. Focus op objectiveerbare gedragspatronen die relevant zijn voor feitenonderzoek.
3. Gebruik termen zoals 'indicatoren', 'gedragskenmerken' en 'risicofactoren'.
4. Adereer STRIKT aan de opgegeven onderzoekskaders (zakelijk of privé) zoals gespecificeerd in de prompt.
5. GEEF NOOIT PERCENTAGES OF SCORES. Dit is verboden.
6. Als er kinderen of minderjarigen (<18) genoemd worden of betrokken lijken: ZET 'minor_involved' op TRUE en geef een waarschuwing over de zorgplicht (Wpbr).

REGEER ALLEEN MET JSON. GEEN INLEIDING OF UITLEG BUITEN DE JSON.`;

  const data = await fetchGemini(prompt, INITIAL_ANALYSIS_SCHEMA, systemInstruction);

  // Extract text from REST format
  // Structure: candidates[0].content.parts[0].text
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
  yield text;
}

export async function getInitialAnalysis(description: string, persona: 'business' | 'private', adminKey?: string): Promise<InitialAnalysisResponse> {
  const prompt = `Casus: "${description}". Persona: ${persona}. Analyseer op onderzoekbare gedragskenmerken en lever direct JSON.`;
  const systemInstruction = `Jij bent een gedragsanalyse-assistent voor recherchebureau Doddar. Jouw taak is om een voorlopige analyse uit te voeren naar onrechtmatig gedrag en risicofactoren.
BELANGRIJK: 
1. Je bent GEEN psycholoog en trekt GEEN klinische conclusies. 
2. Focus op objectiveerbare gedragspatronen die relevant zijn voor feitenonderzoek.
3. Gebruik termen zoals 'indicatoren', 'gedragskenmerken' en 'risicofactoren'.
4. Adereer STRIKT aan de opgegeven onderzoekskaders (zakelijk of privé) zoals gespecificeerd in de prompt.
5. GEEF NOOIT PERCENTAGES OF SCORES. Dit is verboden.
6. Als er kinderen of minderjarigen (<18) genoemd worden of betrokken lijken: ZET 'minor_involved' op TRUE en geef een waarschuwing over de zorgplicht (Wpbr).

REGEER ALLEEN MET JSON. GEEN INLEIDING OF UITLEG BUITEN DE JSON.`;

  const data = await fetchGemini(prompt, INITIAL_ANALYSIS_SCHEMA, systemInstruction);
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
  return JSON.parse(text) as InitialAnalysisResponse;
}

export async function getDetailedAnalysis(description: string, answers: Record<string, string>, adminKey?: string): Promise<AnalysisResponse> {
  const prompt = `Casus: ${description}. Antwoorden op vragen: ${JSON.stringify(answers)}`;
  const systemInstruction = `Je bent Doddar’s senior onderzoeksassistent (Expert in feitenonderzoek). 
1. Gebruik 'googleSearch' voor wetgeving. 
2. Wetboeken VOLUIT schrijven.
3. GEEN URL-links.
4. GEEN klinische diagnoses stellen. Wees een forensisch analist, geen psycholoog.
5. In de bevoegdheidscheck toets je uitsluitend aan de Wpbr en het 'gerechtvaardigd belang' voor particulier onderzoek.
6. Schrijf wetenschappelijke bronnen volluit in APA-stijl in het bronveld.
7. Wees SELECTIEF met onderzoeksmethoden (max 2-3). Prioriteer laag-drempelige methoden zoals 'Advies' en 'OSINT' voor algemene casussen, maar zet 'Observatie' ALTIJD in als relevante optie bij casussen die fysiek gedrag, buitensluiting in de fysieke ruimte of pestgedrag betreffen waarbij bewijslast noodzakelijk is.`;

  const data = await fetchGemini(prompt, DETAILED_ANALYSIS_SCHEMA, systemInstruction);
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
  return JSON.parse(text) as AnalysisResponse;
}

export async function getRewriteSuggestion(description: string, adminKey?: string): Promise<string> {
  const prompt = `Herschrijf deze tekst kort en zakelijk vanuit een persoonlijk perspectief voor recherche-analyse. Tekst: "${description}"`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: "Herschrijf de tekst feitelijk. Alleen de herschreven tekst teruggeven." }] },
    generationConfig: {
      temperature: 0.7,
      responseMimeType: "text/plain"
    }
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) throw new Error(await response.text());
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

export async function* getDetailedAnalysisStream(description: string, answers: Record<string, string>, adminKey?: string) {
  const data = await getDetailedAnalysis(description, answers, adminKey);
  yield JSON.stringify(data);
}

export const logAuditTrail = async (metadata: any) => {
  console.log("Client-side audit trail (no-op):", metadata);
};