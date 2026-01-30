export default function About() {
  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>About AI Legal Sentinel</h1>

      <p style={{ marginTop: "15px", color: "#475569", lineHeight: "1.7" }}>
        AI Legal Sentinel is a digital legal awareness platform designed to help
        Indian citizens and small businesses understand legal situations before
        they escalate into serious problems.
      </p>

      <p style={{ marginTop: "15px", color: "#475569", lineHeight: "1.7" }}>
        The platform does not replace lawyers or legal authorities. Instead, it
        empowers users with basic legal knowledge so they can take informed and
        responsible actions.
      </p>

      <h3 style={{ marginTop: "30px" }}>Disclaimer</h3>

      <p style={{ marginTop: "10px", color: "#334155", lineHeight: "1.7" }}>
        This application provides legal awareness and informational guidance only.
        It does not constitute legal advice. Users are strongly advised to consult
        qualified legal professionals or official government authorities for
        case-specific decisions.
      </p>

      <h3 style={{ marginTop: "30px" }}>Future Scope</h3>

      <ul style={{ marginTop: "10px", lineHeight: "1.8", color: "#334155" }}>
        <li>Multilingual legal guidance for regional languages</li>
        <li>Integration with verified government legal portals</li>
        <li>Category-based legal assistance (criminal, civil, business)</li>
        <li>Document analysis and compliance checks</li>
      </ul>

      <p style={{ marginTop: "30px", fontStyle: "italic", color: "#64748b" }}>
        Built as part of a hackathon project to demonstrate the responsible use
        of AI for social impact.
      </p>
    </div>
  );
}
