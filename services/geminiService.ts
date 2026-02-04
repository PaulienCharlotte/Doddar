import { Type } from "@google/genai"; // Only types needed if any, or just remove if unused
import type { AnalysisResponse, InitialAnalysisResponse } from "../types";

// Helper for backend calls
async function callAnalyzeEndpoint(type: 'initial' | 'detailed' | 'rewrite', content: any, adminKey?: string) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (adminKey) {
    headers['x-admin-key'] = adminKey;
  }

  const response = await fetch('/.netlify/functions/analyze', {
    method: 'POST',
    headers,
    body: JSON.stringify({ type, content })
  });

  if (!response.ok) {
    const errText = await response.text();
    let errMsg = `Server error: ${response.status}`;
    try {
      const json = JSON.parse(errText);
      if (json.error) errMsg = json.error;
    } catch (e) { }
    throw new Error(errMsg);
  }

  const data = await response.json();
  // extracting text from expected Gemini response structure depending on how analyze.js returns it
  // analyze.js returns result.response.text(), which is a string. But wait, analyze.js body is result.response.text().
  // So data IS the string (if JSON response was text).
  // Actually analyze.js returns { statusCode: 200, body: text }. Netlify usually passes body as string.
  // If response content-type is json, await response.json() works. 
  // Wait, analyze.js returned `body: result.response.text()`. If that text is a JSON string (which it is for initial/detailed), then `response.json()` will parse it?
  // No, `fetch` reads the body. If the body sent by netlify is the raw JSON string derived from `result.response.text()`, then `response.json()` parses that.
  return data;
}

// --- Initial Analysis ---

export async function* getInitialAnalysisStream(description: string, persona: 'business' | 'private', adminKey?: string) {
  // Simulate stream for UI compatibility, but fetch once
  const result = await callAnalyzeEndpoint('initial', { description, persona }, adminKey);
  // Result should be the object structure. Verify if analyze.js returns the object or the wrapper.
  // analyze.js returns `result.response.text()`. The prompt requested JSON. So text is a JSON string.
  // So `response.json()` in helper returns the Object.
  // We yield the stringified object or parts? The UI expects chunks of text to build strict JSON?
  // The UI code: `fullJson += chunkText; const result = JSON.parse(fullJson)`.
  // So we should yield the string representation.
  yield JSON.stringify(result);
}

export async function getInitialAnalysis(description: string, persona: 'business' | 'private', adminKey?: string): Promise<InitialAnalysisResponse> {
  return await callAnalyzeEndpoint('initial', { description, persona }, adminKey) as InitialAnalysisResponse;
}

// --- Detailed Analysis ---

export async function* getDetailedAnalysisStream(description: string, answers: Record<string, string>, adminKey?: string) {
  const result = await callAnalyzeEndpoint('detailed', { description, answers }, adminKey);
  yield JSON.stringify(result);
}

export async function getDetailedAnalysis(description: string, answers: Record<string, string>, adminKey?: string): Promise<AnalysisResponse> {
  return await callAnalyzeEndpoint('detailed', { description, answers }, adminKey) as AnalysisResponse;
}

// --- Rewrite ---

export async function getRewriteSuggestion(description: string, adminKey?: string): Promise<string> {
  // Rewrite returns text/plain usually, but let's see analyze.js .
  // analyze.js code for rewrite: systemInstruction = ... text only.
  // So result.response.text() is plain text.
  // `response.json()` might fail if it's plain text.
  // I should check content-type in helper or handle rewrite differently.

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (adminKey) headers['x-admin-key'] = adminKey;

  const response = await fetch('/.netlify/functions/analyze', {
    method: 'POST',
    headers,
    body: JSON.stringify({ type: 'rewrite', content: { description } })
  });

  if (!response.ok) throw new Error(await response.text());
  return await response.text();
}


export const logAuditTrail = async (metadata: {
  timestamp: number;
  modelVersion: string;
  pseudonymConfirmed: boolean;
  analysisType: 'initial' | 'detailed';
  minorInvolved?: boolean;
}) => {
  try {
    const response = await fetch('/.netlify/functions/audit-log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metadata),
    });

    if (!response.ok) {
      console.warn('Audit log failed:', response.statusText);
    }
  } catch (error) {
    console.error('Audit log error:', error);
  }
};