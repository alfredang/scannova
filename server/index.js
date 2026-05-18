import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { researchProducts } from './services/researcher.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API endpoint for product research
app.post('/api/research', async (req, res) => {
  try {
    const { keywords, minPrice, maxPrice, trustedSites, market } = req.body;

    if (!keywords || keywords.trim().length === 0) {
      return res.status(400).json({ error: 'Keywords are required' });
    }

    console.log(`\n[API] Research request: "${keywords}" | Price: $${minPrice || '0'}-$${maxPrice || '∞'} | Sites: ${trustedSites?.join(', ') || 'all'}`);

    const results = await researchProducts({
      keywords: keywords.trim(),
      minPrice: minPrice ? parseFloat(minPrice) : null,
      maxPrice: maxPrice ? parseFloat(maxPrice) : null,
      trustedSites: trustedSites || [],
      market: market || 'Singapore',
    });

    res.json(results);
  } catch (err) {
    console.error('[API] Research error:', err.message);
    res.status(500).json({
      error: err.message || 'Research failed',
      hint: 'Make sure your API keys are configured in the .env file',
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  const geminiConfigured = !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here');
  const openaiConfigured = !!(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here');

  res.json({
    status: 'ok',
    services: {
      gemini: geminiConfigured ? 'configured' : 'not configured',
      openai: openaiConfigured ? 'configured' : 'not configured',
    },
    timestamp: new Date().toISOString(),
  });
});

// Serve static files in production
const distPath = join(__dirname, '..', 'dist');
app.use(express.static(distPath));
app.get('{*path}', (req, res) => {
  res.sendFile(join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🔍 Scannova API server running on http://localhost:${PORT}`);
  console.log(`   Gemini: ${process.env.GEMINI_API_KEY ? '✅ configured' : '❌ not configured'}`);
  console.log(`   OpenAI: ${process.env.OPENAI_API_KEY ? '✅ configured' : '❌ not configured'}\n`);
});
