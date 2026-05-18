import OpenAI from 'openai';

export async function searchWithOpenAI(apiKey, prompt) {
  const openai = new OpenAI({ apiKey });

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'You are a market research agent specializing in e-commerce product discovery in Southeast Asia, particularly Singapore. Return only valid JSON arrays.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.3,
  });

  const text = response.choices[0].message.content;

  try {
    const parsed = JSON.parse(text);
    const products = parsed.products || parsed.results || parsed;
    return {
      success: true,
      data: Array.isArray(products) ? products : [products],
      model: 'gpt-4o-mini',
      grounded: false,
    };
  } catch {
    throw new Error('Failed to parse OpenAI response as JSON');
  }
}
