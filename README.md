# Scannova — AI Market Research Agent

AI-powered market research agent for e-commerce product discovery in Singapore. Find trending products, analyze pricing, and identify import opportunities from trusted platforms.

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure API keys
Copy `.env.example` to `.env` and add your keys:
```bash
cp .env.example .env
```

Edit `.env`:
```
GEMINI_API_KEY=your_gemini_key_here
OPENAI_API_KEY=your_openai_key_here
```

### 3. Start the app

**Terminal 1 — Backend API:**
```bash
npm run server
```

**Terminal 2 — Frontend:**
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 🏗️ Architecture

```
┌──────────────┐     ┌──────────────┐     ┌─────────────────┐
│   React UI   │────▶│  Express API │────▶│  Gemini (Primary)│
│  (Vite SPA)  │     │  /api/research│    │  + Google Search │
└──────────────┘     └──────┬───────┘     └─────────────────┘
                            │                      │
                            │ (fallback)           │ (fail)
                            ▼                      ▼
                     ┌─────────────────┐
                     │ OpenAI (Fallback)│
                     │   gpt-4o-mini   │
                     └─────────────────┘
```

## ✨ Features

- **AI-Powered Search** — Gemini 2.0 Flash with Google Search grounding for live product data
- **Smart Fallback** — Automatic OpenAI GPT-4o-mini fallback when Gemini is unavailable
- **Trusted Sites** — Search across Lazada, Shopee, Amazon SG, Qoo10, and more
- **Price Filtering** — Set min/max price ranges in SGD
- **Product Ranking** — Products scored and ranked by popularity (sales, reviews, demand)
- **CSV Export** — Download results for further analysis
- **Premium UI** — Animated, responsive design with status indicators

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite |
| Styling | Vanilla CSS + Inter font |
| Backend | Express.js |
| AI (Primary) | Google Gemini 2.0 Flash |
| AI (Fallback) | OpenAI GPT-4o-mini |

## 📁 Project Structure

```
scannova/
├── server/
│   ├── index.js              # Express API server
│   └── services/
│       ├── gemini.js          # Gemini API integration
│       ├── openai.js          # OpenAI fallback
│       └── researcher.js      # Orchestrator
├── src/
│   ├── App.jsx               # Main app component
│   ├── index.css             # Design system
│   ├── main.jsx              # React entry
│   └── components/
│       ├── Header.jsx         # App header + status
│       ├── SearchForm.jsx     # Search interface
│       ├── ProductCard.jsx    # Product display card
│       ├── ResultsPanel.jsx   # Results grid + stats
│       └── LoadingState.jsx   # Loading animation
├── .env.example              # API key template
├── package.json
└── vite.config.js
```
