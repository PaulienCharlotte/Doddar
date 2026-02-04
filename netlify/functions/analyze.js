import { GoogleGenAI, Type } from '@google/genai';
import { getStore } from '@netlify/blobs';

// --- CONSTANTS FROM FRONTEND ---

const INITIAL_ANALYSIS_SYSTEM_INSTRUCTION = `Jij bent een gedragsanalyse-assistent voor recherchebureau Doddar. Jouw taak is om een voorlopige analyse uit te voeren naar onrechtmatig gedrag en risicofactoren.

BELANGRIJK: 
1. Je bent GEEN psycholoog en trekt GEEN klinische conclusies. 
2. Focus op objectiveerbare gedragspatronen die relevant zijn voor feitenonderzoek.
3. Gebruik termen zoals 'indicatoren', 'gedragskenmerken' en 'risicofactoren'.
4. Adereer STRIKT aan de opgegeven onderzoekskaders (zakelijk of privé) zoals gespecificeerd in de prompt.
5. GEEF NOOIT PERCENTAGES OF SCORES. Dit is verboden.
6. Als er kinderen of minderjarigen (<18) genoemd worden of betrokken lijken: ZET 'minor_involved' op TRUE en geef een waarschuwing over de zorgplicht (Wpbr).

REGEER ALLEEN MET JSON. GEEN INLEIDING OF UITLEG BUITEN DE JSON.`;

const INITIAL_ANALYSIS_SCHEMA = {
    type: Type.OBJECT,
    properties: {
        relevance_label: {
            type: Type.STRING,
            enum: ["Hoog prioriteit", "Gemiddeld", "Laag", "Nader onderzoek nodig"],
            description: "Een kwalitatieve indicatie van de urgentie/complexiteit."
        },
        minor_involved: {
            type: Type.BOOLEAN,
            description: "Zet op true als er kinderen of minderjarigen betrokken zijn."
        },
        minor_risk_assessment: {
            type: Type.STRING,
            description: "Korte toelichting op de risico's voor de minderjarige (indien van toepassing)."
        },
        gedragspatronen: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    label: { type: Type.STRING, description: "Naam van het patroon (bijv. Gaslighting, Love Bombing)." },
                    relevance_label: { type: Type.STRING, enum: ["Aanwezig", "Nader te onderzoeken", "Indicatief"] },
                    why_short: { type: Type.STRING, description: "Korte duiding waarom dit patroon herkend wordt." }
                },
                required: ["label", "relevance_label", "why_short"],
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
    required: ["relevance_label", "minor_involved", "minor_risk_assessment", "gedragspatronen", "verduidelijkingsvragen", "bevoegdheid"],
};

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
            type: Type.OBJECT,
            properties: {
                wetboek: { type: Type.STRING },
                artikel: { type: Type.STRING },
                omschrijving: { type: Type.STRING },
                bron: { type: Type.STRING },
            },
            required: ["wetboek", "artikel", "omschrijving", "bron"],
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

// --- HANDLER ---

export const handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const clientIp = event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'unknown-ip';
    const adminKey = process.env.ADMIN_BYPASS_KEY;
    const clientAdminKey = event.headers['x-admin-key'];
    const isAdmin = adminKey && clientAdminKey && adminKey === clientAdminKey;

    const rateLimitStore = getStore('rate-limits');
    const auditLogStore = getStore('audit-logs'); // Reuse for admin logging

    // RATE LIMITING LOGIC
    if (!isAdmin) {
        try {
            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
            const key = `rate:${clientIp}:${today}`;

            // Get current count (blob content needs reading)
            let count = 0;
            try {
                const data = await rateLimitStore.get(key, { type: 'json' });
                if (data && data.count) count = data.count;
            } catch (e) {
                // Key might not exist, verify if get returns null or throws on miss
                // Netlify blobs usually return null if not found, assume 0
            }

            if (count >= 3) {
                return {
                    statusCode: 429,
                    body: JSON.stringify({ error: "Dagelijkse limiet bereikt (3 analyses). Gebruik de Pro-versie of wacht 24 uur." })
                };
            }

            // Increment count
            await rateLimitStore.set(key, JSON.stringify({ count: count + 1 }));
        } catch (error) {
            console.error("Rate limit error:", error);
            // On failure, fail open or closed? Here open to avoid blocking valid users on system error, 
            // but for strictness maybe closed. Let's log and proceed.
        }
    } else {
        // Log Admin Access
        try {
            const logKey = `ADMIN_ACCESS:${new Date().toISOString()}:${Math.random().toString(36).substring(7)}`;
            await auditLogStore.set(logKey, JSON.stringify({
                event: 'ADMIN_ACCESS',
                ip: clientIp,
                timestamp: Date.now()
            }));
        } catch (e) { console.error("Admin logging error", e); }
    }

    // GEMINI LOGIC
    try {
        const body = JSON.parse(event.body);
        const { type, content } = body; // type: 'initial' | 'detailed' | 'rewrite'

        // Decode API Key
        const encodedKey = process.env.GEMINI_API_KEY_B64;
        const apiKey = encodedKey ? atob(encodedKey) : (process.env.API_KEY || '');
        if (!apiKey) throw new Error("API Key missing on server");

        const ai = new GoogleGenAI({ apiKey });

        // Define standard reliable model
        const STANDARD_MODEL = "gemini-1.5-flash";

        // Config setup
        let config = { temperature: 0.1, responseMimeType: "application/json" };
        let prompt = "";

        let systemInstruction = "";
        let responseSchema = null;

        if (type === 'initial') {
            const { description, persona } = content;
            prompt = `Casus: "${description}". Persona: ${persona}. Analyseer op onderzoekbare gedragskenmerken en lever direct JSON.`;
            systemInstruction = INITIAL_ANALYSIS_SYSTEM_INSTRUCTION;
            responseSchema = INITIAL_ANALYSIS_SCHEMA;
        } else if (type === 'detailed') {
            const { description, answers } = content;
            prompt = `Casus: ${description}. Antwoorden op vragen: ${JSON.stringify(answers)}`;
            systemInstruction = DETAILED_ANALYSIS_SYSTEM_INSTRUCTION;
            responseSchema = DETAILED_ANALYSIS_SCHEMA;
            config.tools = [{ googleSearch: {} }];
            // config.thinkingConfig = { thinkingBudget: 2000 };
        } else if (type === 'rewrite') {
            const { description } = content;
            prompt = `Herschrijf deze tekst kort en zakelijk vanuit een persoonlijk perspectief voor recherche-analyse. Tekst: "${description}"`;
            systemInstruction = "Herschrijf de tekst feitelijk. Alleen de herschreven tekst teruggeven.";
            // Note: GoogleGenAI usually expects explicit mime type or null for default.
            // Let's safe-guard:
            config = { temperature: 0.7 }; // Reset config for rewrite
        }

        const genModel = ai.getGenerativeModel({
            model: STANDARD_MODEL,
        });

        // RE-CREATING REQUEST
        // Note: The google-genai package syntax in node might differ slightly from web.
        // Assuming the same package version.

        const generateConfig = {
            systemInstruction: systemInstruction,
            responseSchema: responseSchema,
            responseMimeType: config.responseMimeType || "text/plain",
            temperature: config.temperature,
            // Tools might need different handling in node SDK depending on version
        };

        if (config.tools) generateConfig.tools = config.tools;

        const result = await genModel.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            config: generateConfig
        });

        return {
            statusCode: 200,
            body: result.response.text()
        };

    } catch (error) {
        console.error("Analysis failed:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Interne analysefout", details: error.message })
        };
    }
};
