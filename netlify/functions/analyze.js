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

const DETAILED_ANALYSIS_SYSTEM_INSTRUCTION = `Je bent Doddar’s senior onderzoeksassistent (Expert in feitenonderzoek). 
1. Gebruik 'googleSearch' voor wetgeving. 
2. Wetboeken VOLUIT schrijven.
3. GEEN URL-links.
4. GEEN klinische diagnoses stellen. Wees een forensisch analist, geen psycholoog.
5. In de bevoegdheidscheck toets je uitsluitend aan de Wpbr en het 'gerechtvaardigd belang' voor particulier onderzoek.
6. Schrijf wetenschappelijke bronnen volluit in APA-stijl in het bronveld.
7. Wees SELECTIEF met onderzoeksmethoden (max 2-3). Prioriteer laag-drempelige methoden zoals 'Advies' en 'OSINT' voor algemene casussen, maar zet 'Observatie' ALTIJD in als relevante optie bij casussen die fysiek gedrag, buitensluiting in de fysieke ruimte of pestgedrag betreffen waarbij bewijslast noodzakelijk is.`;

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

// --- HANDLER ---

export const handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const clientIp = event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'unknown-ip';
    const adminKey = process.env.ADMIN_BYPASS_KEY;
    const clientAdminKey = event.headers['x-admin-key'];
    const isAdmin = adminKey && clientAdminKey && adminKey === clientAdminKey;

    // SAFE BLOBS INIT
    let rateLimitStore = null;
    let auditLogStore = null;
    try {
        rateLimitStore = getStore('rate-limits');
        auditLogStore = getStore('audit-logs');
    } catch (e) {
        console.warn("Netlify Blobs not configured or accessible:", e);
        // Continue without rate limiting (Fail Open)
    }

    // RATE LIMITING LOGIC
    if (!isAdmin && rateLimitStore) {
        try {
            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
            const key = `rate:${clientIp}:${today}`;

            // Get current count (blob content needs reading)
            let count = 0;
            try {
                const data = await rateLimitStore.get(key, { type: 'json' });
                if (data && data.count) count = data.count;
            } catch (e) {
                // Key might not exist, assume 0
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
            // safe to proceed
        }
    } else if (isAdmin && auditLogStore) {
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

    // GEMINI LOGIC VIA NATIVE FETCH (No SDK)
    try {
        const body = JSON.parse(event.body);
        const { type, content } = body; // type: 'initial' | 'detailed' | 'rewrite'

        // Decode API Key Robustly
        let apiKey = process.env.API_KEY || '';
        const encodedKey = process.env.GEMINI_API_KEY_B64;
        if (encodedKey) {
            try {
                apiKey = Buffer.from(encodedKey, 'base64').toString('utf-8').trim();
            } catch (e) {
                console.error("API Key decoding failed", e);
            }
        }

        if (!apiKey) {
            console.error("API Key is missing via environment variables.");
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Server configuratie fout: API Key ontbreekt." })
            };
        }

        // Configure Request
        const STANDARD_MODEL = "gemini-1.5-flash";
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${STANDARD_MODEL}:generateContent?key=${apiKey}`;

        let prompt = "";
        let systemInstructionContent = "";
        let responseSchema = null;
        let responseMimeType = "application/json";
        let temperature = 0.1;

        if (type === 'initial') {
            const { description, persona } = content;
            prompt = `Casus: "${description}". Persona: ${persona}. Analyseer op onderzoekbare gedragskenmerken en lever direct JSON.`;
            systemInstructionContent = INITIAL_ANALYSIS_SYSTEM_INSTRUCTION;
            responseSchema = INITIAL_ANALYSIS_SCHEMA;
        } else if (type === 'detailed') {
            const { description, answers } = content;
            prompt = `Casus: ${description}. Antwoorden op vragen: ${JSON.stringify(answers)}`;
            systemInstructionContent = DETAILED_ANALYSIS_SYSTEM_INSTRUCTION;
            responseSchema = DETAILED_ANALYSIS_SCHEMA;
            // Note: Google Search Tool is tricky via REST without proper configuration, omitting for simplicity in fallback
            // To restore: "tools": [ { "google_search": {} } ]
        } else if (type === 'rewrite') {
            const { description } = content;
            prompt = `Herschrijf deze tekst kort en zakelijk vanuit een persoonlijk perspectief voor recherche-analyse. Tekst: "${description}"`;
            systemInstructionContent = "Herschrijf de tekst feitelijk. Alleen de herschreven tekst teruggeven.";
            responseMimeType = "text/plain";
            responseSchema = null;
            temperature = 0.7;
        }

        // Build Payload
        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: temperature,
                responseMimeType: responseMimeType,
            }
        };

        if (systemInstructionContent) {
            payload.systemInstruction = { parts: [{ text: systemInstructionContent }] };
        }
        if (responseSchema) {
            payload.generationConfig.responseSchema = responseSchema;
        }

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errText = await response.text();
            console.error("Gemini API Error:", response.status, errText);

            // Check for Invalid API Key specifically
            if (response.status === 400 && errText.includes("API_KEY_INVALID")) {
                return {
                    statusCode: 500,
                    body: JSON.stringify({ error: "API Key configuratie incorrect (ongeldig)." })
                };
            }

            return {
                statusCode: response.status,
                body: JSON.stringify({ error: "AI Service fout", details: errText })
            };
        }

        const data = await response.json();

        // Extract text result
        let outputText = "";
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
            outputText = data.candidates[0].content.parts.map(p => p.text).join('');
        }

        return {
            statusCode: 200,
            body: outputText
        };

    } catch (error) {
        console.error("Analysis handler failed:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Interne analysefout", details: error.message })
        };
    }
};
