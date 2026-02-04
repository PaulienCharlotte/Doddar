
import { getStore } from '@netlify/blobs';

export const handler = async (event, context) => {
    console.log("--- START REQUEST ---");
    console.log("Method:", event.httpMethod);

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    // 1. Setup & Key Check
    const encodedKey = process.env.GEMINI_API_KEY_B64;
    let apiKey = process.env.API_KEY || '';

    if (encodedKey) {
        try {
            console.log("Decoding B64 Key...");
            apiKey = Buffer.from(encodedKey, 'base64').toString('utf-8').trim();
            console.log("Key decoded successfully.");
        } catch (e) {
            console.error("Key decoding failed:", e);
        }
    }

    console.log("API Key present:", !!apiKey);
    if (!apiKey) {
        console.error("CRITICAL: No API Key found.");
        return { statusCode: 500, body: JSON.stringify({ error: "Server config error: No API Key" }) };
    }

    try {
        // 2. Parse Body
        console.log("Parsing body...");
        const body = JSON.parse(event.body);
        const { type, content } = body;
        console.log("Request Type:", type);

        // 3. Prepare Gemini Request (Native Fetch for stability)
        const MODEL = "gemini-1.5-flash";
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

        console.log("Preparing prompt for model:", MODEL);
        let prompt = "";
        if (type === 'initial') {
            prompt = `Casus: "${content.description}". Persona: ${content.persona}. Analyseer gedrag. JSON output.`;
        } else if (type === 'detailed') {
            prompt = `Casus: ${content.description}. Vragen: ${JSON.stringify(content.answers)}.`;
        } else if (type === 'rewrite') {
            prompt = `Herschrijf: "${content.description}"`;
        }

        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: (type === 'rewrite') ? "text/plain" : "application/json"
            }
        };

        // 4. Call Gemini
        console.log("Sending request to Google...");
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        console.log("Google Response Status:", response.status);

        if (!response.ok) {
            const errText = await response.text();
            console.error("Google Error Body:", errText);
            return { statusCode: response.status, body: errText };
        }

        const data = await response.json();
        console.log("Received Data from Google.");

        const outputText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        console.log("Extracted Output Length:", outputText.length);

        // 5. Audit Log (Blobs) - Requested Simple Logging
        console.log("Attempting to store Audit Log...");
        try {
            const auditStore = getStore('audit-logs');
            const logId = `audit-${Date.now()}`;
            await auditStore.set(logId, JSON.stringify({
                timestamp: new Date().toISOString(),
                model_used: MODEL,
                status: "success"
            }));
            console.log("Audit Log stored successfully:", logId);
        } catch (e) {
            console.warn("Audit Log failed (Non-critical):", e);
        }

        console.log("--- REQUEST SUCCESS ---");
        return {
            statusCode: 200,
            body: outputText
        };

    } catch (error) {
        console.error("Handler Crashed:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Crash", details: error.message })
        };
    }
};
