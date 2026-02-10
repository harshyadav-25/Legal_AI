import { useState } from "react";
import { UploadCloud, FileText, CheckCircle, AlertCircle } from "lucide-react";
import API from "../services/api";

export default function PdfUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const upload = async () => {
    if (!file) {
      setStatus({ type: "error", message: "Please select a file first" });
      return;
    }

    setLoading(true);
    setStatus({ type: "", message: "" });
    const form = new FormData();
    form.append("file", file);

    try {
      const res = await API.post("/pdf/upload", form);
      setStatus({ type: "success", message: "File uploaded successfully!" });
      if (onUploadSuccess) onUploadSuccess(res.data);
    } catch {
      setStatus({ type: "error", message: "Upload failed. Please login first." });
    }
    setLoading(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
        <div style={{ background: '#dbeafe', padding: '8px', borderRadius: '8px' }}>
          <UploadCloud size={24} color="var(--color-primary)" />
        </div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: 0 }}>Upload Document</h2>
      </div>

      <div
        style={{
          border: '2px dashed var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: '#f8fafc',
          cursor: 'pointer',
          transition: 'all var(--transition-fast)'
        }}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <input
          id="fileInput"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ display: 'none' }}
          accept=".pdf"
        />

        {file ? (
          <div className="flex flex-col items-center">
            <FileText size={48} color="var(--color-primary)" style={{ marginBottom: '1rem' }} />
            <p style={{ fontWeight: '500' }}>{file.name}</p>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>{(file.size / 1024).toFixed(2)} KB</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <UploadCloud size={48} color="var(--color-text-muted)" style={{ marginBottom: '1rem' }} />
            <p style={{ fontWeight: '500', color: 'var(--color-text-muted)' }}>Click to select PDF</p>
          </div>
        )}
      </div>

      <button
        onClick={upload}
        className="btn btn-primary"
        style={{ width: '100%', marginTop: '1.5rem' }}
        disabled={loading || !file}
      >
        {loading ? "Uploading..." : "Upload PDF"}
      </button>

      {status.message && (
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: status.type === 'error' ? '#fef2f2' : '#f0fdf4',
          color: status.type === 'error' ? '#ef4444' : '#15803d'
        }}>
          {status.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
          <span style={{ fontSize: '0.875rem' }}>{status.message}</span>
        </div>
      )}
    </div>
  );
}
