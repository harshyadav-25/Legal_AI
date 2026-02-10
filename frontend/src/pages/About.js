import React from 'react';

export default function About() {
  return (
    <div className="animate-fade-in" style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <div className="glass-card">
        <h1 style={{ marginBottom: "1.5rem", background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          About AI Legal Sentinel
        </h1>

        <p style={{ marginTop: "15px", color: "var(--color-text-muted)", lineHeight: "1.7", fontSize: '1.1rem' }}>
          AI Legal Sentinel is a digital legal awareness platform designed to help
          Indian citizens and small businesses understand legal situations before
          they escalate into serious problems.
        </p>

        <p style={{ marginTop: "15px", color: "var(--color-text-muted)", lineHeight: "1.7", fontSize: '1.1rem' }}>
          The platform does not replace lawyers or legal authorities. Instead, it
          empowers users with basic legal knowledge so they can take informed and
          responsible actions.
        </p>

        <div style={{ marginTop: "40px", padding: "2rem", background: "rgba(255,255,255,0.5)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-glass-border)" }}>
          <h3 style={{ marginBottom: "1rem" }}>⚠️ Disclaimer</h3>
          <p style={{ color: "var(--color-text-main)", lineHeight: "1.7" }}>
            This application provides legal awareness and informational guidance only.
            It does not constitute legal advice. Users are strongly advised to consult
            qualified legal professionals or official government authorities for
            case-specific decisions.
          </p>
        </div>

        <h3 style={{ marginTop: "40px", marginBottom: "1rem" }}>Future Scope</h3>

        <ul style={{ lineHeight: "1.8", color: "var(--color-text-muted)", paddingLeft: "1.5rem" }}>
          <li>Multilingual legal guidance for regional languages</li>
          <li>Integration with verified government legal portals</li>
          <li>Category-based legal assistance (criminal, civil, business)</li>
          <li>Document analysis and compliance checks</li>
        </ul>

        <p style={{ marginTop: "40px", fontStyle: "italic", color: "var(--color-text-muted)", fontSize: "0.9rem", textAlign: "center" }}>
          Built as part of a hackathon project to demonstrate the responsible use
          of AI for social impact.
        </p>
      </div>
    </div>
  );
}
