import { useState, useEffect } from 'react';

const STEPS = [
  { icon: '🌐', text: 'Connecting to trusted sites...' },
  { icon: '🔍', text: 'Searching for matching products...' },
  { icon: '📊', text: 'Analyzing pricing and reviews...' },
  { icon: '🏆', text: 'Ranking by popularity...' },
  { icon: '✨', text: 'Preparing your results...' },
];

export default function LoadingState() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-20) var(--space-6)',
        textAlign: 'center',
      }}
    >
      {/* Animated orb */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'var(--brand-gradient)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          marginBottom: 'var(--space-8)',
          animation: 'pulse-glow 2s ease-in-out infinite',
        }}
      >
        🔍
      </div>

      <h3
        style={{
          fontSize: '1.375rem',
          fontWeight: 700,
          color: 'var(--slate-900)',
          marginBottom: 'var(--space-2)',
        }}
      >
        Researching Products
      </h3>
      <p style={{ fontSize: '0.9375rem', color: 'var(--slate-500)', marginBottom: 'var(--space-8)' }}>
        Our AI agent is scouting the market for you
      </p>

      {/* Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: '100%', maxWidth: 360 }}>
        {STEPS.map((s, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              padding: 'var(--space-3) var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              background: i === step ? 'rgba(37, 99, 235, 0.06)' : 'transparent',
              border: `1px solid ${i === step ? 'rgba(37, 99, 235, 0.15)' : 'transparent'}`,
              opacity: i <= step ? 1 : 0.3,
              transition: 'all 0.4s ease',
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: i < step ? 'var(--green-50)' : i === step ? 'var(--brand-gradient-subtle)' : 'var(--slate-100)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8125rem',
                flexShrink: 0,
              }}
            >
              {i < step ? '✓' : s.icon}
            </div>
            <span
              style={{
                fontSize: '0.875rem',
                fontWeight: i === step ? 600 : 400,
                color: i === step ? 'var(--brand-accent)' : i < step ? 'var(--green-600)' : 'var(--slate-400)',
              }}
            >
              {s.text}
            </span>
            {i === step && (
              <div
                className="spinner"
                style={{
                  marginLeft: 'auto',
                  borderColor: 'rgba(37, 99, 235, 0.2)',
                  borderTopColor: 'var(--brand-accent)',
                  width: 16,
                  height: 16,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
