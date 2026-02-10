import { useState } from "react";
import { FileSearch, RefreshCw, AlertTriangle, CheckCircle, Info } from "lucide-react";
import API from "../services/api";

export default function Analysis() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("English");

  const analyze = async () => {
    setLoading(true);
    setAnalysis(null); // Clear previous result while loading
    setError(null);
    try {
      const res = await API.get(`/ai/analyze-latest?language=${language}`);
      setAnalysis(res.data);
    } catch {
      setError("Please upload a PDF first or check your connection.");
    }
    setLoading(false);
  };

  // Helper to determine risk color
  const getRiskColor = (severity) => {
    const s = severity?.toLowerCase();
    if (s === 'high' || s === 'critical') return '#ef4444'; // Red
    if (s === 'medium') return '#f59e0b'; // Amber
    return '#3b82f6'; // Blue for low/info
  };

  const getRiskIcon = (severity) => {
    const s = severity?.toLowerCase();
    if (s === 'high' || s === 'critical') return <AlertTriangle size={18} color="#ef4444" />;
    return <Info size={18} color="#3b82f6" />;
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#f3e8ff', padding: '8px', borderRadius: '8px' }}>
            <FileSearch size={24} color="#9333ea" />
          </div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: 0 }}>Analysis Results</h2>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="input-field"
            style={{ padding: '6px 12px', fontSize: '0.875rem', width: 'auto' }}
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi (हिंदी)</option>
          </select>

          <button
            onClick={analyze}
            className="btn btn-secondary"
            disabled={loading}
            style={{ padding: '6px 12px', fontSize: '0.875rem' }}
          >
            <RefreshCw size={16} className={loading ? "spin" : ""} style={{ marginRight: loading ? '0' : '6px' }} />
            {loading ? "" : "Refresh"}
          </button>
        </div>
      </div>

      <div style={{
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-glass-border)',
        padding: '1.5rem',
        minHeight: '300px',
        maxHeight: '600px',
        overflowY: 'auto',
        backdropFilter: 'blur(8px)'
      }}>
        {/* Spinner Animation */}
        <style>{`
          .spin { animation: spin 1s linear infinite; }
          @keyframes spin { 100% { transform: rotate(360deg); } }
        `}</style>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-full text-muted">
            <RefreshCw size={32} className="spin mb-4" />
            <p>Analyzing document...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full text-muted">
            <AlertTriangle size={32} color="var(--color-error)" style={{ marginBottom: '1rem' }} />
            <p style={{ color: 'var(--color-text-main)' }}>{error}</p>
          </div>
        ) : analysis ? (
          <div className="animate-fade-in">
            {/* Document Header */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Document</h3>
              <p style={{ fontSize: '1.25rem', fontWeight: '600' }}>{analysis.filename}</p>
            </div>

            {/* AI Summary Section */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', marginBottom: '1rem' }}>
                <Info size={20} color="var(--color-primary)" /> AI Summary
              </h3>
              <div style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                lineHeight: 1.6,
                whiteSpace: 'pre-line'
              }}>
                {analysis.analysis?.llm_analysis || analysis.analysis?.rule_based?.summary || "No summary available."}
              </div>
            </div>

            {/* Risks Section */}
            <div>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', marginBottom: '1rem' }}>
                <AlertTriangle size={20} color="#f59e0b" /> Detected Risks
              </h3>

              {analysis.analysis?.rule_based?.risks?.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {analysis.analysis.rule_based.risks.map((risk, idx) => (
                    <div key={idx} style={{
                      background: 'white',
                      borderLeft: `4px solid ${getRiskColor(risk.severity)}`,
                      padding: '1rem 1.5rem',
                      borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: '600', color: 'var(--color-text-main)' }}>{risk.keyword || "Risk"}</span>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          color: getRiskColor(risk.severity),
                          background: `${getRiskColor(risk.severity)}15`,
                          padding: '2px 8px',
                          borderRadius: '4px'
                        }}>
                          {risk.severity}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>
                        {risk.suggestion || risk.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  background: '#f0fdf4',
                  color: '#15803d',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <CheckCircle size={20} />
                  No significant risks detected in this document.
                </div>
              )}
            </div>

          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted">
            <FileSearch size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
            <p>No analysis loaded yet.</p>
            <button className="btn btn-secondary mt-4" onClick={analyze}>Load Latest Analysis</button>
          </div>
        )}
      </div>
    </div>
  );
}
