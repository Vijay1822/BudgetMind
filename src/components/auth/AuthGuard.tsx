import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Brain, ShieldCheck } from 'lucide-react';

interface AuthGuardProps {
  children?: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading, theme } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--background)',
          color: 'var(--text-primary)',
          gap: '1.25rem',
          padding: '2rem',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '64px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Animated pulse ring */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '16px',
              backgroundColor: 'var(--accent)',
              opacity: 0.25,
              animation: 'ping 1.6s cubic-bezier(0, 0, 0.2, 1) infinite',
            }}
          />
          <div
            style={{
              position: 'relative',
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              backgroundColor: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme === 'light' ? '#FFFFFF' : '#2C2B30',
              boxShadow: '0 8px 24px rgba(255, 143, 124, 0.3)',
            }}
          >
            <Brain size={30} />
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.01em', margin: 0, color: 'var(--text-primary)' }}>
            Budget<span style={{ color: 'var(--accent)' }}>Mind</span> Enterprise
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
            <ShieldCheck size={14} style={{ color: 'var(--accent)' }} />
            Verifying security credentials & session state...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
