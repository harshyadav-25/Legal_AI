import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { KeyRound, Mail, Lock, ArrowRight, CheckCircle } from "lucide-react";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData();
    form.append("username", email);
    form.append("password", password);

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user_name", res.data.user_name);
      window.dispatchEvent(new Event('storage'));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      {/* Left Side - Brand Panel */}
      <div className="brand-panel" style={{
        flex: 1,
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 25%)',
          zIndex: 0
        }}></div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '500px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
            <div style={{ background: 'white', padding: '10px', borderRadius: '12px' }}>
              <img src="/logo192.png" alt="Logo" style={{ width: '32px', height: '32px' }} onError={(e) => e.target.style.display = 'none'} />
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '-0.02em' }}>LegalAI</span>
          </div>

          <h1 style={{ fontSize: '3.5rem', lineHeight: 1.1, marginBottom: '1.5rem', color: 'white' }}>
            Welcome back.
          </h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, lineHeight: 1.6, marginBottom: '3rem' }}>
            Access your dashboard to continue your legal research and document analysis.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8fafc',
        padding: '2rem'
      }}>
        <div style={{ width: '100%', maxWidth: '480px', background: 'white', padding: '3rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#1e293b' }}>Sign In</h2>
            <p style={{ color: '#64748b' }}>Enter your email and password to access your account.</p>
          </div>

          {error && (
            <div style={{
              background: '#fee2e2', color: '#ef4444', padding: '1rem', borderRadius: '12px',
              marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem'
            }}>
              <CheckCircle size={18} style={{ transform: 'rotate(45deg)' }} />
              {error}
            </div>
          )}

          <form onSubmit={login}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155', fontSize: '0.9rem' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={20} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  className="input-field"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: '48px', width: '100%', fontSize: '1rem', padding: '12px 12px 12px 48px', border: '1px solid #e2e8f0', borderRadius: '12px' }}
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ fontWeight: '600', color: '#334155', fontSize: '0.9rem' }}>Password</label>
                <a href="#" style={{ fontSize: '0.85rem', color: '#4f46e5', fontWeight: '600' }}>Forgot password?</a>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={20} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '48px', width: '100%', fontSize: '1rem', padding: '12px 12px 12px 48px', border: '1px solid #e2e8f0', borderRadius: '12px' }}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1rem', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }} disabled={loading}>
              {loading ? "Signing In..." : <>Sign In <ArrowRight size={20} /></>}
            </button>
          </form>

          <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.95rem', color: '#64748b' }}>
            Don't have an account? <Link to="/signup" style={{ color: '#4f46e5', fontWeight: '600' }}>Sign up</Link>
          </div>

          <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
            <p style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
              Secure Connection &bull; SSL Encrypted
            </p>
            <p style={{ fontSize: '0.7rem', color: '#e2e8f0', marginTop: '0.5rem' }}>
              API: {process.env.REACT_APP_API_URL || "Localhost"}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Styles */}
      <style>{`
                @media (max-width: 900px) {
                    .brand-panel { display: none !important; }
                }
            `}</style>
    </div>
  );
}
