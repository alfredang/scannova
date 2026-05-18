export default function ProductCard({ product, index }) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const scoreColor =
    product.popularityScore >= 80
      ? 'var(--green-600)'
      : product.popularityScore >= 60
        ? 'var(--brand-accent)'
        : product.popularityScore >= 40
          ? 'var(--orange-600)'
          : 'var(--slate-500)';

  const scoreBg =
    product.popularityScore >= 80
      ? 'var(--green-50)'
      : product.popularityScore >= 60
        ? 'rgba(37, 99, 235, 0.08)'
        : product.popularityScore >= 40
          ? 'var(--orange-50)'
          : 'var(--slate-100)';

  return (
    <div
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        transition: 'all 0.25s ease',
      }}
    >
      {/* Rank badge */}
      {index < 3 && (
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: index === 0 ? 'linear-gradient(135deg, #f59e0b, #d97706)' : index === 1 ? 'linear-gradient(135deg, #94a3b8, #64748b)' : 'linear-gradient(135deg, #d97706, #92400e)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 800,
            fontSize: '0.75rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 2,
          }}
        >
          #{index + 1}
        </div>
      )}

      {/* Popularity Score */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          padding: '0.25rem 0.5rem',
          borderRadius: 'var(--radius-full)',
          background: scoreBg,
          border: `1px solid ${scoreColor}20`,
          zIndex: 2,
        }}
      >
        <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: scoreColor }}>
          🔥 {product.popularityScore}
        </span>
      </div>

      {/* Card body */}
      <div style={{ padding: 'var(--space-5)', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Source badge */}
        <div style={{ marginBottom: 'var(--space-3)', paddingTop: index < 3 ? '1.5rem' : 0 }}>
          <span className="badge badge-blue">{product.source}</span>
        </div>

        {/* Product name */}
        <h3
          style={{
            fontSize: '0.9375rem',
            fontWeight: 700,
            color: 'var(--slate-900)',
            lineHeight: 1.4,
            marginBottom: 'var(--space-1)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.name}
        </h3>

        {/* Brand */}
        <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', marginBottom: 'var(--space-3)', fontWeight: 500 }}>
          by {product.brand}
        </p>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
          <span style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <>
              <span
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--slate-400)',
                  textDecoration: 'line-through',
                }}
              >
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="badge badge-green">-{discount}%</span>
            </>
          )}
        </div>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
          <Stars rating={product.rating} />
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--slate-700)' }}>
            {product.rating.toFixed(1)}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>
            ({product.reviewCount.toLocaleString()} reviews)
          </span>
        </div>

        {/* Units sold */}
        {product.unitsSold && (
          <p style={{ fontSize: '0.75rem', color: 'var(--green-600)', fontWeight: 600, marginBottom: 'var(--space-3)' }}>
            📦 {product.unitsSold} sold
          </p>
        )}

        {/* Description */}
        <p
          style={{
            fontSize: '0.8125rem',
            color: 'var(--slate-500)',
            lineHeight: 1.6,
            marginBottom: 'var(--space-3)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            flex: 1,
          }}
        >
          {product.description}
        </p>

        {/* Features */}
        {product.features.length > 0 && (
          <div style={{ marginBottom: 'var(--space-4)' }}>
            {product.features.slice(0, 3).map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', marginBottom: '0.25rem' }}>
                <span style={{ color: 'var(--brand-accent)', fontSize: '0.625rem', marginTop: '0.25rem' }}>●</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>{f}</span>
              </div>
            ))}
          </div>
        )}

        {/* Seller */}
        <div
          style={{
            padding: 'var(--space-3)',
            background: 'var(--slate-50)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-4)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}
        >
          <span style={{ fontSize: '0.875rem' }}>🏪</span>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>Seller</p>
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--slate-700)' }}>{product.seller}</p>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <a
            href={product.url !== '#' ? product.url : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ flex: 1, fontSize: '0.8125rem', padding: '0.625rem' }}
          >
            View Product
          </a>
          <button
            className="btn btn-secondary"
            style={{ fontSize: '0.8125rem', padding: '0.625rem' }}
            onClick={() => {
              const text = `${product.name}\nBrand: ${product.brand}\nPrice: SGD $${product.price}\nSource: ${product.source}\nSeller: ${product.seller}`;
              navigator.clipboard.writeText(text);
            }}
          >
            📋
          </button>
        </div>
      </div>
    </div>
  );
}

function Stars({ rating }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  return (
    <div className="stars">
      {'★'.repeat(full)}
      {hasHalf && <span style={{ opacity: 0.5 }}>★</span>}
      <span className="star-empty">{'★'.repeat(Math.max(0, empty))}</span>
    </div>
  );
}
