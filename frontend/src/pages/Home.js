import React, { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) {
      alert("Please enter your legal question");
      return;
    }

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("http://127.0.0.1:8005/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: question,
          language: "English",
        }),
      });

      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      setAnswer("Unable to connect to legal service.");
    }

    setLoading(false);
  };

  const sections = answer ? answer.split(/\n(?=[A-Za-z ]+:)/) : [];

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>⚖️ AI Legal Sentinel</h1>
      <p style={{ color: "#475569" }}>
        Ask legal questions in simple language and get structured guidance.
      </p>

      <textarea
        placeholder="Example: A robbery happened in my house today. What should I do?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{
          width: "100%",
          height: "120px",
          marginTop: "20px",
          padding: "12px",
          fontSize: "15px",
        }}
      />

      <br />

      <button
        onClick={askQuestion}
        style={{
          marginTop: "15px",
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: "#1d4ed8",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {loading ? "Analyzing..." : "Get Legal Guidance"}
      </button>

      {sections.map((section, index) => (
        <div
          key={index}
          style={{
            background: "#f8fafc",
            marginTop: "20px",
            padding: "16px",
            borderLeft: "5px solid #2563eb",
            whiteSpace: "pre-line",
          }}
        >
          {section}
        </div>
      ))}
    </div>
  );
}
