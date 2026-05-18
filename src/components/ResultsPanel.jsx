import ProductCard from './ProductCard';

export default function ResultsPanel({ results, onNewSearch }) {
  if (!results) return null;

  const { products, meta } = results;
  const avgPrice = products.length > 0 ? products.reduce((s, p) => s + p.price, 0) / products.length : 0;
  const topBrands = [...new Set(products.map((p) => p.brand))].slice(0, 5);
  const topSources = [...new Set(products.map((p) => p.source))];

  const exportCSV = () => {
    const headers = ['Rank', 'Name', 'Brand', 'Price (SGD)', 'Original Price', 'Source', 'Rating', 'Reviews', 'Seller', 'Popularity', 'URL'];
    const rows = products.map((p, i) => [
      i + 1,
      `"${p.name}"`,
      `"${p.brand}"`,
      p.price,
      p.originalPrice || '',
      p.source,
      p.rating,
      p.reviewCount,
      `"${p.seller}"`,
      p.popularityScore,
      p.url,
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scannova-${meta.searchParams.keywords.replace(/\s+/g, '-')}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="animate-slide-up">
      {/* Results header */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-6)',
          marginBottom: 'var(--space-8)',
        }}
      >
        {/* Title bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--slate-900)', letterSpacing: '-0.02em' }}>
              Research Results
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)', marginTop: '0.25rem' }}>
              Found <strong>{products.length}</strong> products for &ldquo;{meta.searchParams.keywords}&rdquo;
            </p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <button className="btn btn-secondary" onClick={exportCSV}>
              📥 Export CSV
            </button>
            <button className="btn btn-primary" onClick={onNewSearch}>
              🔍 New Search
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          <StatCard icon="📦" label="Products Found" value={products.length} />
          <StatCard
            icon="💰"
            label="Avg. Price"
            value={`$${avgPrice.toFixed(2)}`}
            sub="SGD"
          />
          <StatCard icon="🏆" label="Top Brands" value={topBrands.length} sub={topBrands.slice(0, 2).join(', ')} />
          <StatCard
            icon="🤖"
            label="AI Model"
            value={meta.model}
            sub={meta.grounded ? '🌐 Grounded' : '💡 Knowledge'}
          />
        </div>

        {/* Source tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Sources:
          </span>
          {topSources.map((s) => (
            <span key={s} className="badge badge-blue">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div
        className="stagger-children"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 'var(--space-5)',
        }}
      >
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {products.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: 'var(--space-16)',
            color: 'var(--slate-400)',
          }}
        >
          <p style={{ fontSize: '2rem', marginBottom: 'var(--space-4)' }}>🤷</p>
          <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>No products found</p>
          <p style={{ fontSize: '0.875rem' }}>Try different keywords or adjust your filters</p>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, sub }) {
  return (
    <div
      className="card"
      style={{
        padding: 'var(--space-4) var(--space-5)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 'var(--radius-lg)',
          background: 'var(--brand-gradient-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.125rem',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontSize: '0.6875rem', color: 'var(--slate-400)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {label}
        </p>
        <p style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--slate-900)', lineHeight: 1.2 }}>{value}</p>
        {sub && (
          <p style={{ fontSize: '0.6875rem', color: 'var(--slate-500)', marginTop: '0.125rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}
