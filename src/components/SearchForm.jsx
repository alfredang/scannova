import { useState } from 'react';

const TRUSTED_SITES = [
  'Lazada',
  'Shopee',
  'Amazon SG',
  'Qoo10',
  'Zalora',
  'RedMart',
  'Carousell',
  'AliExpress',
  'eBay',
];

const POPULAR_CATEGORIES = [
  'Electronics',
  'Beauty & Skincare',
  'Fashion',
  'Home Appliances',
  'Health & Wellness',
  'Baby & Kids',
  'Sports & Outdoors',
  'Food & Beverages',
];

export default function SearchForm({ onSearch, isLoading }) {
  const [keywords, setKeywords] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedSites, setSelectedSites] = useState(['Lazada', 'Shopee', 'Amazon SG']);
  const [market] = useState('Singapore');

  const toggleSite = (site) => {
    setSelectedSites((prev) =>
      prev.includes(site) ? prev.filter((s) => s !== site) : [...prev, site]
    );
  };

  const handleCategoryClick = (cat) => {
    setKeywords((prev) => {
      const trimmed = prev.trim();
      if (trimmed.toLowerCase().includes(cat.toLowerCase())) return trimmed;
      return trimmed ? `${trimmed}, ${cat.toLowerCase()}` : cat.toLowerCase();
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keywords.trim()) return;
    onSearch({
      keywords: keywords.trim(),
      minPrice: minPrice || null,
      maxPrice: maxPrice || null,
      trustedSites: selectedSites,
      market,
    });
  };

  return (
    <div className="animate-fade-in">
      {/* Hero section */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.375rem 1rem',
            borderRadius: 'var(--radius-full)',
            background: 'var(--brand-gradient-subtle)',
            border: '1px solid rgba(37, 99, 235, 0.15)',
            marginBottom: 'var(--space-4)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--brand-accent)',
          }}
        >
          <span>⚡</span> AI-Powered Product Discovery
        </div>
        <h2
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: 800,
            color: 'var(--slate-900)',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            marginBottom: 'var(--space-4)',
          }}
        >
          Find Trending Products
          <br />
          <span style={{ background: 'var(--brand-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            in Singapore Market
          </span>
        </h2>
        <p style={{ fontSize: '1.0625rem', color: 'var(--slate-500)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
          Discover top-selling products from trusted e-commerce platforms.
          Scout, analyze, and import with confidence.
        </p>
      </div>

      {/* Search form card */}
      <form onSubmit={handleSubmit}>
        <div
          className="card"
          style={{
            maxWidth: 720,
            margin: '0 auto',
            padding: 'var(--space-8)',
            border: '1px solid var(--slate-200)',
          }}
        >
          {/* Keywords */}
          <div className="input-group" style={{ marginBottom: 'var(--space-6)' }}>
            <label htmlFor="search-keywords">Search Keywords</label>
            <input
              id="search-keywords"
              className="input"
              type="text"
              placeholder="e.g. wireless earbuds, bluetooth speaker, phone case..."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              style={{ fontSize: '1.0625rem', padding: 'var(--space-4)' }}
              autoFocus
            />
            {/* Quick category chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'var(--space-1)' }}>
              {POPULAR_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryClick(cat)}
                  style={{
                    padding: '0.25rem 0.625rem',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--slate-200)',
                    background: 'var(--slate-50)',
                    color: 'var(--slate-500)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = 'var(--brand-accent)';
                    e.target.style.color = 'var(--brand-accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = 'var(--slate-200)';
                    e.target.style.color = 'var(--slate-500)';
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="input-group" style={{ marginBottom: 'var(--space-6)' }}>
            <label>Price Range (SGD)</label>
            <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
              <input
                id="price-min"
                className="input"
                type="number"
                min="0"
                step="1"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                style={{ flex: 1 }}
              />
              <span style={{ color: 'var(--slate-400)', fontWeight: 500 }}>—</span>
              <input
                id="price-max"
                className="input"
                type="number"
                min="0"
                step="1"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                style={{ flex: 1 }}
              />
            </div>
          </div>

          {/* Trusted Sites */}
          <div className="input-group" style={{ marginBottom: 'var(--space-8)' }}>
            <label>Trusted Sites</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {TRUSTED_SITES.map((site) => (
                <button
                  key={site}
                  type="button"
                  className={`chip chip-site ${selectedSites.includes(site) ? 'active' : ''}`}
                  onClick={() => toggleSite(site)}
                >
                  {selectedSites.includes(site) && <span>✓</span>}
                  {site}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            id="scout-products-btn"
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: '100%' }}
            disabled={isLoading || !keywords.trim()}
          >
            {isLoading ? (
              <>
                <div className="spinner" />
                Researching...
              </>
            ) : (
              <>
                🔍 Scout Products
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
