import { useState } from "react";

export default function PdfSummarizer() {
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState("English");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const uploadPdf = async () => {
    if (!file) {
      setError("Please select a PDF file.");
      return;
    }

    setLoading(true);
    setSummary("");
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", language);

    try {
      const response = await fetch("http://127.0.0.1:8005/upload-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Server error. Please try again.");
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      setError("Unable to process PDF. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>📄 Legal PDF Summarizer</h1>
      <p style={{ color: "#475569", marginBottom: "20px" }}>
        Upload a legal document and get a simple summary in English or Hindi.
      </p>

      {/* File Upload */}
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      {/* Language Selector */}
      <label>
        Summary Language:&nbsp;
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
        </select>
      </label>

      <br /><br />

      {/* Submit Button */}
      <button
        onClick={uploadPdf}
        style={{
          padding: "12px 24px",
          background: "#1d4ed8",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {loading ? "Summarizing..." : "Summarize PDF"}
      </button>

      {/* Error */}
      {error && (
        <p style={{ color: "red", marginTop: "20px" }}>
          {error}
        </p>
      )}

      {/* Summary Output */}
      {summary && (
        <div
          style={{
            marginTop: "30px",
            background: "#f8fafc",
            padding: "20px",
            borderLeft: "5px solid #2563eb",
            whiteSpace: "pre-line",
          }}
        >
          <h3>Summary</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}
