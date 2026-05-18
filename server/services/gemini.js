import { GoogleGenAI } from '@google/genai';

export async function searchWithGemini(apiKey, prompt) {
  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: 'application/json',
      temperature: 0.3,
    },
  });

  const text = response.text;

  try {
    const parsed = JSON.parse(text);
    return {
      success: true,
      data: parsed,
      model: 'gemini-2.0-flash',
      grounded: true,
    };
  } catch {
    // If JSON parsing fails, try to extract JSON from the text
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return {
        success: true,
        data: JSON.parse(jsonMatch[0]),
        model: 'gemini-2.0-flash',
        grounded: true,
      };
    }
    throw new Error('Failed to parse Gemini response as JSON');
  }
}
