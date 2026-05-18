import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import ResultsPanel from './components/ResultsPanel';
import LoadingState from './components/LoadingState';

const API_BASE = import.meta.env.DEV ? 'http://localhost:3001' : '';

export default function App() {
  const [view, setView] = useState('search'); // 'search' | 'loading' | 'results' | 'error'
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [serviceStatus, setServiceStatus] = useState(null);

  // Check service health on mount
  useEffect(() => {
    fetch(`${API_BASE}/api/health`)
      .then((r) => r.json())
      .then((data) => setServiceStatus(data.services))
      .catch(() => setServiceStatus(null));
  }, []);

  const handleSearch = async (params) => {
    setView('loading');
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/research`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Research failed');
      }

      setResults(data);
      setView('results');
    } catch (err) {
      setError(err.message);
      setView('error');
    }
  };

  const handleNewSearch = () => {
    setView('search');
    setResults(null);
    setError(null);
  };

  return (
    <>
      <Header serviceStatus={serviceStatus} />

      <main
        className="container"
        style={{
          flex: 1,
          paddingTop: 'var(--space-10)',
          paddingBottom: 'var(--space-16)',
        }}
      >
        {view === 'search' && <SearchForm onSearch={handleSearch} isLoading={false} />}

        {view === 'loading' && <LoadingState />}

        {view === 'results' && <ResultsPanel results={results} onNewSearch={handleNewSearch} />}

        {view === 'error' && (
          <div className="animate-fade-in" style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', padding: 'var(--space-16) var(--space-6)' }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'var(--red-50)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                margin: '0 auto var(--space-6)',
              }}
            >
              ⚠️
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: 'var(--space-3)' }}>
              Research Failed
            </h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--slate-500)', marginBottom: 'var(--space-2)', lineHeight: 1.6 }}>
              {error}
            </p>
            <div
              style={{
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--slate-50)',
                border: '1px solid var(--slate-200)',
                marginBottom: 'var(--space-6)',
                textAlign: 'left',
              }}
            >
              <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: 'var(--space-2)' }}>
                💡 Quick Fix:
              </p>
              <ol style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', paddingLeft: '1.25rem', lineHeight: 1.8 }}>
                <li>Open <code style={{ background: 'var(--slate-100)', padding: '0.125rem 0.375rem', borderRadius: '4px', fontSize: '0.75rem' }}>.env</code> in the project root</li>
                <li>Add your <strong>GEMINI_API_KEY</strong> or <strong>OPENAI_API_KEY</strong></li>
                <li>Restart the server</li>
              </ol>
            </div>
            <button className="btn btn-primary btn-lg" onClick={handleNewSearch}>
              ← Try Again
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--slate-200)',
          padding: 'var(--space-6)',
          textAlign: 'center',
          background: 'white',
        }}
      >
        <p style={{ fontSize: '0.8125rem', color: 'var(--slate-400)' }}>
          Scannova — AI Market Research Agent • Powered by Gemini & OpenAI
        </p>
      </footer>
    </>
  );
}
