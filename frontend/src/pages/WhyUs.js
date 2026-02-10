import React from 'react';
import { Check, X, AlertCircle } from 'lucide-react';

export default function WhyUs() {
  return (
    <div className="animate-fade-in" style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <div className="glass-card">
        <h1 style={{ marginBottom: "1.5rem", background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Why AI Legal Sentinel?
        </h1>

        <p style={{ marginTop: "15px", color: "var(--color-text-muted)", fontSize: '1.1rem', lineHeight: 1.7 }}>
          Many legal platforms focus on professionals. AI Legal Sentinel is built
          specifically for common citizens and MSMEs who need clarity, not complexity.
        </p>

        <div style={{ marginTop: "40px" }}>
          <h3 style={{ marginBottom: '1.5rem' }}>What Makes Us Different</h3>

          <ul style={{ display: 'grid', gap: '1rem' }}>
            <FeatureItem title="Structured Guidance" desc="We provide answers in fixed sections instead of open-ended chat responses." />
            <FeatureItem title="Citizen-First Design" desc="The interface is simple, readable, and usable even for non-technical users." />
            <FeatureItem title="Action-Oriented Output" desc="Users receive clear next steps, not just legal explanations." />
            <FeatureItem title="Reliable Architecture" desc="The system is designed with safe fallbacks to avoid incorrect or misleading information." />
          </ul>
        </div>

        <div style={{ marginTop: "50px" }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Comparison with Existing Solutions</h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: "100%", borderCollapse: "collapse", borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <thead>
                <tr style={{ background: "rgba(99, 102, 241, 0.1)" }}>
                  <th style={th}>Feature</th>
                  <th style={th}>AI Legal Sentinel</th>
                  <th style={th}>Generic Legal Chatbots</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={td}>Structured Responses</td>
                  <td style={td}><Check size={18} color="green" style={{ verticalAlign: 'middle' }} /> Yes</td>
                  <td style={td}><X size={18} color="red" style={{ verticalAlign: 'middle' }} /> No</td>
                </tr>
                <tr>
                  <td style={td}>Citizen-Friendly Language</td>
                  <td style={td}><Check size={18} color="green" style={{ verticalAlign: 'middle' }} /> Yes</td>
                  <td style={td}><X size={18} color="red" style={{ verticalAlign: 'middle' }} /> Often Complex</td>
                </tr>
                <tr>
                  <td style={td}>Actionable Next Steps</td>
                  <td style={td}><Check size={18} color="green" style={{ verticalAlign: 'middle' }} /> Yes</td>
                  <td style={td}><AlertCircle size={18} color="orange" style={{ verticalAlign: 'middle' }} /> Limited</td>
                </tr>
                <tr>
                  <td style={td}>Designed for India</td>
                  <td style={td}><Check size={18} color="green" style={{ verticalAlign: 'middle' }} /> Yes</td>
                  <td style={td}><X size={18} color="red" style={{ verticalAlign: 'middle' }} /> Generic</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ title, desc }) {
  return (
    <li style={{
      background: 'rgba(255,255,255,0.6)',
      padding: '1rem',
      borderRadius: 'var(--radius-md)',
      listStyle: 'none',
      borderLeft: '4px solid var(--color-primary)'
    }}>
      <strong style={{ display: 'block', marginBottom: '0.25rem', color: 'var(--color-text-main)' }}>{title}</strong>
      <span style={{ color: 'var(--color-text-muted)' }}>{desc}</span>
    </li>
  )
}

const th = {
  padding: "16px",
  textAlign: "left",
  borderBottom: '2px solid var(--color-glass-border)',
  color: 'var(--color-text-main)',
  fontWeight: '600'
};

const td = {
  padding: "16px",
  borderBottom: "1px solid var(--color-glass-border)",
  color: 'var(--color-text-muted)'
};
