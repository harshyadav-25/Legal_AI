import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import WhyUs from "./pages/WhyUs";
import About from "./pages/About";
import PdfSummarizer from "./pages/PdfSummarizer";

export default function App() {
  return (
    <BrowserRouter>
      {/* NAVBAR */}
      <nav
        style={{
          background: "#0f172a",
          padding: "15px 40px",
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <span style={{ color: "white", fontWeight: "bold", marginRight: "20px" }}>
          ⚖️ AI Legal Sentinel
        </span>

        <Link style={linkStyle} to="/">Home</Link>
        <Link style={linkStyle} to="/how-it-works">How It Works</Link>
        <Link style={linkStyle} to="/why-us">Why Us</Link>
        <Link style={linkStyle} to="/pdf">PDF Summarizer</Link>
        <Link style={linkStyle} to="/about">About</Link>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/why-us" element={<WhyUs />} />
        <Route path="/pdf" element={<PdfSummarizer />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
};
