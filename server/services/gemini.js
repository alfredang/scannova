import { GoogleGenAI } from '@google/genai';

export async function searchWithGemini(apiKey, prompt) {
  const ai = new GoogleGenAI({ apiKey });

  const fullPrompt = prompt + '\n\nIMPORTANT: Return ONLY valid JSON. No markdown, no code fences, no extra text. Just the raw JSON object.';

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: fullPrompt,
    config: {
      tools: [{ googleSearch: {} }],
      temperature: 0.3,
    },
  });

  const text = response.text;

  try {
    const parsed = JSON.parse(text);
    return {
      success: true,
      data: parsed,
      model: 'gemini-2.5-flash',
      grounded: true,
    };
  } catch {
    // If JSON parsing fails, try to extract JSON from the text
    const jsonMatch = text.match(/\{[\s\S]*"products"[\s\S]*\}/);
    if (jsonMatch) {
      return {
        success: true,
        data: JSON.parse(jsonMatch[0]),
        model: 'gemini-2.5-flash',
        grounded: true,
      };
    }
    // Also try matching a top-level array
    const arrayMatch = text.match(/\[[\s\S]*\]/);
    if (arrayMatch) {
      return {
        success: true,
        data: JSON.parse(arrayMatch[0]),
        model: 'gemini-2.5-flash',
        grounded: true,
      };
    }
    throw new Error('Failed to parse Gemini response as JSON');
  }
}
