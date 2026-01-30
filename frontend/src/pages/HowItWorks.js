export default function HowItWorks() {
  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>How AI Legal Sentinel Works</h1>

      <p style={{ marginTop: "15px", color: "#475569" }}>
        AI Legal Sentinel is designed to provide legal awareness in a simple,
        structured, and reliable manner for citizens and MSMEs.
      </p>

      <ol style={{ marginTop: "25px", fontSize: "16px", lineHeight: "1.8" }}>
        <li>
          <strong>User Input:</strong>  
          The user enters a legal question in simple language.
        </li>

        <li>
          <strong>Frontend Processing:</strong>  
          The question is securely sent from the website to the backend API.
        </li>

        <li>
          <strong>AI Reasoning:</strong>  
          The backend uses an AI model to analyze the question using Indian legal context.
        </li>

        <li>
          <strong>Structured Output:</strong>  
          The response is generated in four clear sections: explanation, law,
          risk, and next steps.
        </li>

        <li>
          <strong>User Guidance:</strong>  
          The user receives actionable legal awareness instead of confusing legal jargon.
        </li>
      </ol>

      <p style={{ marginTop: "30px", color: "#334155" }}>
        This approach ensures clarity, safety, and reliability even in complex legal situations.
      </p>
    </div>
  );
}
