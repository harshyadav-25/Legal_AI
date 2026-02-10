import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scale, Home, LayoutDashboard, LogIn, LogOut, FileText } from 'lucide-react';
import '../styles/global.css';

export default function Layout({ children }) {
    const location = useLocation();
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user_name');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_name');
        window.location.href = '/login';
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>

            {/* Background Mesh Gradient */}
            <div className="mesh-background"></div>

            {/* Glass Navigation Bar */}
            <nav style={{
                position: 'sticky',
                top: 0,
                zIndex: 50,
                backdropFilter: 'blur(16px)',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                borderBottom: '1px solid var(--color-glass-border)'
            }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

                    {/* Logo */}
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                        <div style={{
                            background: 'var(--gradient-primary)',
                            padding: '8px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)'
                        }}>
                            <Scale size={24} color="white" />
                        </div>
                        <span style={{
                            fontSize: '1.25rem',
                            fontWeight: '700',
                            color: 'var(--color-text-main)',
                            letterSpacing: '-0.02em'
                        }}>
                            LegalAI
                        </span>
                    </Link>

                    {/* Nav Links */}
                    <div className="flex gap-4 items-center">
                        <Link
                            to="/"
                            style={{
                                color: isActive('/') ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                fontWeight: isActive('/') ? '600' : '500',
                                display: 'flex', alignItems: 'center', gap: '6px',
                                padding: '0.5rem 1rem',
                                borderRadius: 'var(--radius-full)',
                                background: isActive('/') ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Home size={18} /> <span style={{ display: 'none', '@media (min-width: 640px)': { display: 'inline' } }}>Home</span>
                        </Link>

                        <Link
                            to="/dashboard"
                            style={{
                                color: isActive('/dashboard') ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                fontWeight: isActive('/dashboard') ? '600' : '500',
                                display: 'flex', alignItems: 'center', gap: '6px',
                                padding: '0.5rem 1rem',
                                borderRadius: 'var(--radius-full)',
                                background: isActive('/dashboard') ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <LayoutDashboard size={18} /> Dashboard
                        </Link>

                        {token ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                {userName && (
                                    <span style={{
                                        color: 'var(--color-primary)',
                                        fontWeight: '600',
                                        fontSize: '0.9rem',
                                        marginRight: '0.5rem'
                                    }}>
                                        Hello, {userName}
                                    </span>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-secondary"
                                    style={{ fontSize: '0.875rem', padding: '0.5rem 1rem', display: 'flex', gap: '6px' }}
                                >
                                    <LogOut size={16} /> Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login">
                                <button
                                    className="btn btn-primary"
                                    style={{ fontSize: '0.875rem', padding: '0.5rem 1.25rem', display: 'flex', gap: '6px', borderRadius: 'var(--radius-full)' }}
                                >
                                    <LogIn size={16} /> Login
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '3rem 0' }}>
                <div className="container">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer style={{
                backgroundColor: 'transparent',
                borderTop: '1px solid var(--color-glass-border)',
                padding: '2rem 0',
                marginTop: 'auto',
                textAlign: 'center'
            }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                        <Link to="/about" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>About Us</Link>
                        <Link to="/how-it-works" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>How It Works</Link>
                        <Link to="/why-us" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Why Choose Us</Link>
                    </div>
                    <p className="text-muted" style={{ fontSize: '0.875rem' }}>
                        &copy; {new Date().getFullYear()} LegalAI. <br />
                        <span style={{ opacity: 0.7 }}>Empowering justice through artificial intelligence.</span>
                    </p>
                </div>
            </footer>
        </div>
    );
}
