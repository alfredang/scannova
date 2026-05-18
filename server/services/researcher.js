import { searchWithGemini } from './gemini.js';
import { searchWithOpenAI } from './openai.js';

function buildPrompt({ keywords, minPrice, maxPrice, trustedSites, market }) {
  const sitesStr = trustedSites.length > 0 ? trustedSites.join(', ') : 'Lazada, Shopee, Amazon Singapore, Qoo10';
  const priceRange =
    minPrice && maxPrice
      ? `between SGD $${minPrice} and SGD $${maxPrice}`
      : minPrice
        ? `above SGD $${minPrice}`
        : maxPrice
          ? `below SGD $${maxPrice}`
          : 'at any price point';

  return `You are a market research agent for e-commerce businesses. Research and find the top most popular and best-selling products matching the following criteria:

**Search Keywords:** ${keywords}
**Target Market:** ${market || 'Singapore'}
**Price Range:** ${priceRange}
**Trusted Sources:** ${sitesStr}

Search these trusted e-commerce sites and return the top 10-15 most popular products. For each product, provide:

1. Product name
2. Brand name
3. Current price in SGD
4. Original/list price in SGD (if discounted)
5. Source website (which trusted site it's from)
6. Product URL/link (if available)
7. Rating (out of 5 stars)
8. Number of reviews/ratings
9. Number of units sold (if available)
10. A brief description (1-2 sentences)
11. Key features (2-3 bullet points)
12. Supplier/seller name
13. A popularity score from 1-100 based on sales, reviews, and market demand

Return the results as a JSON array of objects with these exact keys:
{
  "products": [
    {
      "name": "string",
      "brand": "string",
      "price": number,
      "originalPrice": number or null,
      "currency": "SGD",
      "source": "string",
      "url": "string",
      "rating": number,
      "reviewCount": number,
      "unitsSold": "string or null",
      "description": "string",
      "features": ["string"],
      "seller": "string",
      "popularityScore": number,
      "category": "string"
    }
  ]
}

Sort by popularity score (highest first). Only include products that are currently available for purchase. Focus on finding real, actual products with accurate pricing.`;
}

function normalizeProducts(data) {
  const products = data.products || data.results || data;
  if (!Array.isArray(products)) return [];

  return products.map((p, i) => ({
    id: i + 1,
    name: p.name || p.product_name || 'Unknown Product',
    brand: p.brand || p.brand_name || 'Unknown Brand',
    price: typeof p.price === 'number' ? p.price : parseFloat(p.price) || 0,
    originalPrice: p.originalPrice || p.original_price || null,
    currency: p.currency || 'SGD',
    source: p.source || p.website || p.site || 'Unknown',
    url: p.url || p.link || p.product_url || '#',
    rating: typeof p.rating === 'number' ? Math.min(p.rating, 5) : parseFloat(p.rating) || 0,
    reviewCount: parseInt(p.reviewCount || p.review_count || p.reviews || 0),
    unitsSold: p.unitsSold || p.units_sold || null,
    description: p.description || '',
    features: Array.isArray(p.features) ? p.features : [],
    seller: p.seller || p.supplier || p.vendor || 'Unknown Seller',
    popularityScore: typeof p.popularityScore === 'number' ? p.popularityScore : parseInt(p.popularityScore || p.popularity_score || 50),
    category: p.category || 'General',
  }));
}

export async function researchProducts(params) {
  const prompt = buildPrompt(params);
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  let result;
  let error;

  // Try Gemini first (primary)
  if (geminiKey && geminiKey !== 'your_gemini_api_key_here') {
    try {
      console.log('[Research] Trying Gemini with Google Search grounding...');
      result = await searchWithGemini(geminiKey, prompt);
      console.log(`[Research] Gemini returned ${result.data?.products?.length || 0} products`);
    } catch (err) {
      console.error('[Research] Gemini failed:', err.message);
      error = err;
    }
  } else {
    console.log('[Research] No Gemini API key configured, skipping...');
  }

  // Fallback to OpenAI
  if (!result && openaiKey && openaiKey !== 'your_openai_api_key_here') {
    try {
      console.log('[Research] Falling back to OpenAI...');
      result = await searchWithOpenAI(openaiKey, prompt);
      console.log(`[Research] OpenAI returned ${result.data?.length || 0} products`);
    } catch (err) {
      console.error('[Research] OpenAI also failed:', err.message);
      error = err;
    }
  } else if (!result) {
    console.log('[Research] No OpenAI API key configured either');
  }

  if (!result) {
    throw new Error(
      error?.message || 'No AI service available. Please configure GEMINI_API_KEY or OPENAI_API_KEY in your .env file.'
    );
  }

  const products = normalizeProducts(result.data);

  return {
    products: products.sort((a, b) => b.popularityScore - a.popularityScore),
    meta: {
      model: result.model,
      grounded: result.grounded,
      totalProducts: products.length,
      searchParams: {
        keywords: params.keywords,
        priceRange: { min: params.minPrice, max: params.maxPrice },
        trustedSites: params.trustedSites,
        market: params.market || 'Singapore',
      },
      timestamp: new Date().toISOString(),
    },
  };
}
