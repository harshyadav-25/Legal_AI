export default function WhyUs() {
  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>Why AI Legal Sentinel?</h1>

      <p style={{ marginTop: "15px", color: "#475569" }}>
        Many legal platforms focus on professionals. AI Legal Sentinel is built
        specifically for common citizens and MSMEs who need clarity, not complexity.
      </p>

      <div style={{ marginTop: "30px" }}>
        <h3>What Makes Us Different</h3>

        <ul style={{ marginTop: "15px", lineHeight: "1.9", fontSize: "16px" }}>
          <li>
            <strong>Structured Guidance:</strong>  
            We provide answers in fixed sections instead of open-ended chat responses.
          </li>

          <li>
            <strong>Citizen-First Design:</strong>  
            The interface is simple, readable, and usable even for non-technical users.
          </li>

          <li>
            <strong>Action-Oriented Output:</strong>  
            Users receive clear next steps, not just legal explanations.
          </li>

          <li>
            <strong>Reliable Architecture:</strong>  
            The system is designed with safe fallbacks to avoid incorrect or misleading information.
          </li>

          <li>
            <strong>Scalable Vision:</strong>  
            Can be extended to multilingual support, verified legal sources, and government integration.
          </li>
        </ul>
      </div>

      <div style={{ marginTop: "35px" }}>
        <h3>Comparison with Existing Solutions</h3>

        <table
          style={{
            width: "100%",
            marginTop: "15px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ background: "#f1f5f9" }}>
              <th style={th}>Feature</th>
              <th style={th}>AI Legal Sentinel</th>
              <th style={th}>Generic Legal Chatbots</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={td}>Structured Responses</td>
              <td style={td}>✅ Yes</td>
              <td style={td}>❌ No</td>
            </tr>
            <tr>
              <td style={td}>Citizen-Friendly Language</td>
              <td style={td}>✅ Yes</td>
              <td style={td}>❌ Often Complex</td>
            </tr>
            <tr>
              <td style={td}>Actionable Next Steps</td>
              <td style={td}>✅ Yes</td>
              <td style={td}>⚠️ Limited</td>
            </tr>
            <tr>
              <td style={td}>Designed for India</td>
              <td style={td}>✅ Yes</td>
              <td style={td}>❌ Generic</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const th = {
  padding: "12px",
  border: "1px solid #cbd5e1",
  textAlign: "left",
};

const td = {
  padding: "12px",
  border: "1px solid #cbd5e1",
};
