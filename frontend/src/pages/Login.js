import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { KeyRound, Mail, Lock, ArrowRight } from "lucide-react";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setError("");

    const form = new FormData();
    form.append("username", email);
    form.append("password", password);

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user_name", res.data.user_name);
      window.dispatchEvent(new Event('storage')); // Trigger update in Layout
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '70vh'
    }} className="animate-fade-in">

      <div className="glass-card" style={{ width: '100%', maxWidth: '420px', padding: '3rem' }}>
        <div className="text-center" style={{ marginBottom: '2.5rem' }}>
          <div style={{
            background: 'var(--gradient-primary)',
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
            boxShadow: '0 8px 20px rgba(99, 102, 241, 0.25)'
          }}>
            <KeyRound size={28} color="white" />
          </div>
          <h2 style={{ fontSize: '1.75rem' }}>Welcome Back</h2>
          <p className="text-muted">Sign in to access your legal dashboard</p>
        </div>

        {error && (
          <div style={{
            backgroundColor: 'rgba(254, 242, 242, 0.8)',
            color: '#ef4444',
            padding: '1rem',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '1.5rem',
            textAlign: 'center',
            fontSize: '0.875rem',
            border: '1px solid #fee2e2'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={login}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text-main)' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                className="input-field"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '48px' }}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text-main)' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '48px' }}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            Sign In <ArrowRight size={18} />
          </button>
        </form>

        <div className="divider">OR</div>

        <button
          className="btn btn-google"
          style={{ width: '100%', padding: '0.875rem' }}
          onClick={() => alert("Coming Soon")}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" height="18" />
          Sign in with Google
        </button>

        <div className="text-center mt-4">
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Don't have an account? <Link to="/signup" style={{ fontWeight: '600' }}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
