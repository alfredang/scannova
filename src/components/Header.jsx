export default function Header({ serviceStatus }) {
  return (
    <header
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 'var(--radius-lg)',
              background: 'var(--brand-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              boxShadow: '0 2px 12px rgba(37, 99, 235, 0.4)',
            }}
          >
            🔍
          </div>
          <div>
            <h1
              style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'white',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              Scannova
            </h1>
            <p style={{ fontSize: '0.6875rem', color: 'var(--slate-400)', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>
              Market Research Agent
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {serviceStatus && (
            <>
              <StatusDot label="Gemini" status={serviceStatus.gemini} />
              <StatusDot label="OpenAI" status={serviceStatus.openai} />
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function StatusDot({ label, status }) {
  const isActive = status === 'configured';
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.25rem 0.625rem',
        borderRadius: 'var(--radius-full)',
        background: isActive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        border: `1px solid ${isActive ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: isActive ? 'var(--green-500)' : 'var(--red-500)',
          boxShadow: isActive ? '0 0 6px rgba(34, 197, 94, 0.5)' : 'none',
        }}
      />
      <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: isActive ? 'var(--green-500)' : 'rgba(239, 68, 68, 0.8)' }}>
        {label}
      </span>
    </div>
  );
}
