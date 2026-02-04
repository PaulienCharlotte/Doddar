
import { GoogleGenAI } from '@google/genai';

console.log('GoogleGenAI exports:', GoogleGenAI);
try {
    const ai = new GoogleGenAI({ apiKey: 'test' });
    console.log('Instance keys:', Object.keys(ai));
    console.log('Instance prototype keys:', Object.getOwnPropertyNames(Object.getPrototypeOf(ai)));
} catch (e) {
    console.error(e);
}
