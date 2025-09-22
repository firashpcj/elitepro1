
import { GoogleGenAI } from "@google/genai";

// IMPORTANT: Do not hardcode the API key. It should be provided as an environment variable.
// We are assuming `process.env.API_KEY` is configured in the build environment.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("Gemini API key not found. AI features will be disabled. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateDescription = async (prompt: string): Promise<string> => {
    if (!API_KEY) {
        throw new Error("API key is not configured.");
    }
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Based on the user input "${prompt}", generate a concise, professional, and commercially appealing product or service description suitable for a formal quotation. The description should be a single, complete sentence. Do not add any introductory phrases like "Here is the description:".`,
            config: {
                temperature: 0.7,
                maxOutputTokens: 100,
                thinkingConfig: {
                    thinkingBudget: 50
                }
            }
        });
        
        const text = response.text.trim();
        // Clean up potential markdown or unwanted characters
        return text.replace(/^"|"$/g, '');
    } catch (error) {
        console.error("Gemini API call failed:", error);
        throw new Error("Failed to generate content from Gemini API.");
    }
};
