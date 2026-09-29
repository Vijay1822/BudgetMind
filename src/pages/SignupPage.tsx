import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Brain, ArrowRight, Sparkles, Building, User, Mail, Lock, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ThemeSwitch } from '../components/theme/ThemeSwitch';

export const SignupPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('Finance');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { signup, continueWithGoogle, theme, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if session already active
  React.useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleGoogleSignUp = async () => {
    setError(null);
    setIsGoogleLoading(true);
    try {
      const result = await continueWithGoogle();
      if (result.success) {
        navigate('/onboarding');
      } else {
        setError(result.error || 'Failed to continue with Google.');
      }
    } catch (err: any) {
      setError(err.message || 'Google signup failed');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const result = await signup({
        full_name: fullName,
        email,
        password,
        organization,
        role,
      });
      if (result.success) {
        navigate('/onboarding');
      } else {
        setError(result.error || 'Signup failed. Please check your entries.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during account creation');
    } finally {
      setIsSubmitting(false);
    }
  };

  const roles = [
    'Finance',
    'Procurement',
    'Project Manager',
    'Engineering',
    'Operations',
    'Executive / Founder',
    'Other'
  ];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
      backgroundColor: 'var(--background)',
      color: 'var(--text-primary)',
      transition: 'background-color 0.4s ease, color 0.4s ease'
    }}>
      {/* Left Column */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
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
            ENTERPRISE DEPLOYMENT
          </div>

          <h1 style={{ fontSize: '2.35rem', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            Start Optimizing Your Organizational Spend
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: '0.85rem', lineHeight: 1.6, maxWidth: '480px' }}>
            Join forward-thinking enterprise finance teams using continuous memory and deterministic constraints.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.78rem', color: 'var(--text-muted)', paddingTop: '2rem' }}>
          <span>PostgreSQL/Supabase Store</span>
          <span>•</span>
          <span>Biomimetic Memory</span>
          <span>•</span>
          <span>Zero Client Keys</span>
        </div>
      </div>

      {/* Right Column: Form */}
      <div style={{
        padding: '3.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--background)'
      }}>
        <div style={{ width: '100%', maxWidth: '440px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Create Enterprise Account
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.35rem' }}>
              Setup your procurement workspace in seconds.
            </p>
          </div>

          {error && (
            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(220, 38, 38, 0.12)',
              border: '1px solid rgba(220, 38, 38, 0.3)',
              color: 'var(--danger)',
              fontSize: '0.82rem'
            }}>
              {error}
            </div>
          )}

          {/* Continue with Google */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
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
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            {isGoogleLoading ? 'Connecting...' : 'Sign up with Google'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0.2rem 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-subtle)' }} />
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              OR WORKSPACE EMAIL
            </span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-subtle)' }} />
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-medium)',
                  backgroundColor: 'var(--surface-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                Work Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-medium)',
                  backgroundColor: 'var(--surface-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                Organization Name
              </label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-medium)',
                  backgroundColor: 'var(--surface-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-medium)',
                  backgroundColor: 'var(--surface-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
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
              {isSubmitting ? 'Creating account...' : 'Create Account'}
              <ArrowRight size={17} />
            </button>
          </form>

          <div style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'none' }}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
