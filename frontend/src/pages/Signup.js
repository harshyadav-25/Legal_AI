import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, Mail, Lock, ArrowRight, User } from "lucide-react";
import API from "../services/api";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const signup = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Basic validation
        if (!email || !password) {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }

        // Prepare form data (adjust based on backend requirements, assuming json or form-data)
        // Using simple JSON object here as it's cleaner, but if backend needs FormData like login, we can switch.
        // Login uses FormData, let's try JSON first as it's more common for register, 
        // but if Login uses FormData, maybe backend expects that. Let's stick to JSON for now for register.
        // actually, let's check Login.js again. It uses FormData. I should probably use FormData to be safe if it's the same backend style.
        // Wait, usually register takes JSON. I'll try standard JSON. 

        try {
            // Assuming endpoint is /auth/register or /auth/signup
            await API.post("/auth/register", {
                email: email,
                password: password
            });

            alert("Registration successful! Please login.");
            navigate("/login");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.detail || "Registration failed. Try again.");
        } finally {
            setLoading(false);
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
                        <UserPlus size={28} color="white" />
                    </div>
                    <h2 style={{ fontSize: '1.75rem' }}>Create Account</h2>
                    <p className="text-muted">Join AI Legal Sentinel today</p>
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

                <form onSubmit={signup}>
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text-main)' }}>
                            Email / Username
                        </label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                className="input-field"
                                placeholder="Choose a username"
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
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ paddingLeft: '48px' }}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center', gap: '8px' }} disabled={loading}>
                        {loading ? "Creating..." : <>Sign Up <ArrowRight size={18} /></>}
                    </button>
                </form>

                <div className="divider">OR</div>

                <button
                    className="btn btn-google"
                    style={{ width: '100%', padding: '0.875rem' }}
                    onClick={() => alert("Coming Soon")}
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" height="18" />
                    Sign up with Google
                </button>

                <div className="text-center mt-4">
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                        Already have an account? <Link to="/login" style={{ fontWeight: '600' }}>Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
