import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Brain, ArrowRight, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ThemeSwitch } from '../components/theme/ThemeSwitch';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('alex.rivera@enterprise.com');
  const [password, setPassword] = useState('Password123!');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { login, continueWithGoogle, theme, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if session already active
  React.useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsGoogleLoading(true);
    try {
      const result = await continueWithGoogle();
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Failed to authenticate with Google. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Google authentication failed');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Invalid credentials. Please verify your email and password.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during login');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
      backgroundColor: 'var(--background)',
      color: 'var(--text-primary)',
      transition: 'background-color 0.4s ease, color 0.4s ease'
    }}>
      {/* LEFT SIDE: Brand & Subtle Financial Visualization */}
      <div style={{
        backgroundColor: 'var(--surface)',
        padding: '3.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRight: '1px solid var(--border-medium)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme === 'light' ? '#FFFFFF' : '#2C2B30',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <Brain size={24} />
              </div>
              <span style={{ fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                Budget<span style={{ color: 'var(--accent)' }}>Mind</span>
              </span>
            </div>
            <ThemeSwitch compact />
          </div>

          <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--accent-soft)', color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 800, marginBottom: '1.25rem' }}>
            AI BUDGET OPTIMIZER & PROCUREMENT MEMORY
          </div>

          <h1 style={{ fontSize: '2.35rem', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            “Don’t spend the budget. Optimize it.”
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: '0.85rem', lineHeight: 1.6, maxWidth: '480px' }}>
            Learn from every purchase, identify unnecessary expenditure, and build a smarter financial future.
          </p>

          {/* Subtle Financial Visualization */}
          <div style={{
            marginTop: '2.5rem',
            padding: '1.25rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--surface-secondary)',
            border: '1.5px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            maxWidth: '460px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 800 }}>
              <span style={{ color: 'var(--text-muted)' }}>AVAILABLE TARGET</span>
              <span style={{ color: 'var(--text-primary)' }}>₹10,00,000</span>
            </div>

            {/* Proportional Bars */}
            <div style={{ height: '24px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', display: 'flex', backgroundColor: 'rgba(0,0,0,0.1)' }}>
              <div style={{ width: '81.1%', backgroundColor: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, color: theme === 'light' ? '#FFFFFF' : '#2C2B30' }}>
                ₹8,11,175 (81.1%)
              </div>
              <div style={{ width: '18.9%', backgroundColor: theme === 'light' ? '#FFC7C7' : 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, color: theme === 'light' ? '#4A5568' : '#FFFFFF' }}>
                ₹1.88L
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              <span>✓ Minimum Effective Required Spend</span>
              <span style={{ color: 'var(--success)', fontWeight: 700 }}>✓ Strategic Reserve Preserved</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.78rem', color: 'var(--text-muted)', paddingTop: '2rem' }}>
          <span>Deterministic Arithmetic</span>
          <span>•</span>
          <span>Vectorize Hindsight</span>
          <span>•</span>
          <span>LangGraph Core</span>
        </div>
      </div>

      {/* RIGHT SIDE: Authentication Form */}
      <div style={{
        padding: '3.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--background)'
      }}>
        <div style={{ width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Welcome to BudgetMind
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.35rem' }}>
              Sign in to continue to your financial intelligence workspace.
            </p>
          </div>

          {error && (
            <div style={{
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(220, 38, 38, 0.12)',
              border: '1px solid rgba(220, 38, 38, 0.3)',
              color: 'var(--danger)',
              fontSize: '0.82rem',
              lineHeight: 1.5,
            }}>
              <div>{error}</div>
              {error.includes('Firebase Console') && (
                <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(220, 38, 38, 0.2)' }}>
                  <a
                    href="https://console.firebase.google.com/project/budgetmind-1ccfb/authentication"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'underline' }}
                  >
                    👉 Open Firebase Console & Click "Get started"
                  </a>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    Tip: You can also click "Sign In to Workspace" below with the pre-filled credentials to enter immediately.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PRIMARY BUTTON: Continue with Google */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              width: '100%',
              padding: '0.85rem 1.25rem',
              borderRadius: 'var(--radius-lg)',
              border: '1.5px solid var(--border-medium)',
              backgroundColor: 'var(--surface-elevated)',
              color: 'var(--text-primary)',
              fontWeight: 800,
              fontSize: '0.95rem',
              cursor: isGoogleLoading ? 'not-allowed' : 'pointer',
              boxShadow: 'var(--shadow-xs)',
              transition: 'all 0.2s ease',
            }}
          >
            {/* Google SVG Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            {isGoogleLoading ? 'Connecting to Google...' : 'Continue with Google'}
          </button>

          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Secure authentication powered by Google and Firebase.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0.25rem 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-subtle)' }} />
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              OR WORKSPACE EMAIL
            </span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-subtle)' }} />
          </div>

          {/* Standard Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                Corporate Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-medium)',
                  backgroundColor: 'var(--surface-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-medium)',
                  backgroundColor: 'var(--surface-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                width: '100%',
                padding: '0.85rem',
                borderRadius: 'var(--radius-lg)',
                border: 'none',
                backgroundColor: 'var(--accent)',
                color: theme === 'light' ? '#FFFFFF' : '#2C2B30',
                fontWeight: 800,
                fontSize: '0.92rem',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                marginTop: '0.5rem',
              }}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In to Workspace'}
              <ArrowRight size={17} />
            </button>
          </form>

          <div style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Don't have an enterprise account?{' '}
            <Link to="/signup" style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'none' }}>
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
