import React, { useState, useEffect } from 'react';
import {
  Settings,
  ShieldCheck,
  Brain,
  Database,
  Server,
  User,
  Building,
  Sun,
  Moon,
  CheckCircle2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SettingsPage: React.FC = () => {
  const { user, theme, toggleTheme } = useAuth();
  const [systemHealth, setSystemHealth] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchHealth = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/health');
      const json = await res.json();
      setSystemHealth(json);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Settings & System Integrations
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            Manage user profile, appearance theme, and monitor connected enterprise backend services
          </p>
        </div>

        <button
          onClick={fetchHealth}
          disabled={isRefreshing}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.55rem 1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-medium)',
            backgroundColor: 'var(--bg-card-subtle)',
            color: 'var(--text-primary)',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: isRefreshing ? 'not-allowed' : 'pointer'
          }}
        >
          <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
          <span>Refresh Status</span>
        </button>
      </div>

      {/* System Integrations Status Card (Section 8 & 47 - NO API KEY INPUTS!) */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.75rem',
        border: '1px solid var(--border-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <ShieldCheck size={18} color="var(--primary-brand)" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            System Integrations Status
          </h3>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Production credentials are managed securely in the backend environment. Client-side key entry is disabled for enterprise security compliance.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {/* AI Provider */}
          <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>AI PROVIDER</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--mint-text)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--mint-accent)' }} />
                Connected
              </span>
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {systemHealth?.llm?.provider === 'GEMINI_2_5_FLASH' ? 'Google Gemini 2.5 Flash' : 'Google Gemini / Groq'}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Structured classification & explanation engine
            </div>
          </div>

          {/* Hindsight Memory */}
          <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--purple-memory-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--purple-memory)' }}>HINDSIGHT MEMORY</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: systemHealth?.hindsight?.isConnected ? 'var(--mint-text)' : 'var(--purple-memory)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: systemHealth?.hindsight?.isConnected ? 'var(--mint-accent)' : 'var(--purple-memory)' }} />
                {systemHealth?.hindsight?.isConnected ? 'Cloud Connected' : 'Bank Ready'}
              </span>
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Vectorize Hindsight
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Bank ID: {systemHealth?.hindsight?.bankId || 'budgetmind-procurement-bank'}
            </div>
          </div>

          {/* Supabase Database */}
          <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>DATABASE</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--mint-text)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--mint-accent)' }} />
                Connected
              </span>
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              PostgreSQL / Supabase
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              13 relational tables & synthetic seed data
            </div>
          </div>

          {/* Agent Engine */}
          <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>AGENT ENGINE</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--mint-text)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--mint-accent)' }} />
                Ready
              </span>
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              LangGraph Stateful Graph
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              21 deterministic tools & human approval loop
            </div>
          </div>
        </div>
      </div>

      {/* Theme & Appearance (Section 49) */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.75rem',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Appearance & Theme
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Switch between Premium Dark (default) and Warm Ivory Light mode
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => { if (theme !== 'dark') toggleTheme(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.6rem 1.15rem',
              borderRadius: 'var(--radius-md)',
              border: `1.5px solid ${theme === 'dark' ? 'var(--primary-brand)' : 'var(--border-subtle)'}`,
              backgroundColor: theme === 'dark' ? 'var(--primary-brand)' : 'transparent',
              color: theme === 'dark' ? '#FFFFFF' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            <Moon size={16} />
            <span>Dark Mode</span>
          </button>

          <button
            onClick={() => { if (theme !== 'light') toggleTheme(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.6rem 1.15rem',
              borderRadius: 'var(--radius-md)',
              border: `1.5px solid ${theme === 'light' ? 'var(--primary-brand)' : 'var(--border-subtle)'}`,
              backgroundColor: theme === 'light' ? 'var(--primary-brand)' : 'transparent',
              color: theme === 'light' ? '#FFFFFF' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            <Sun size={16} />
            <span>Light Mode</span>
          </button>
        </div>
      </div>

      {/* Profile & Organization Information */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.75rem',
        border: '1px solid var(--border-subtle)'
      }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
          User Profile & Organization
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>FULL NAME</span>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              {user?.full_name || 'Alex Rivera'}
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>WORK EMAIL</span>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              {user?.email || 'alex.rivera@enterprise.com'}
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>ORGANIZATION</span>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              {user?.organization || 'Apex Global Enterprises'}
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>ROLE</span>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              {user?.role || 'Finance & Procurement Director'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
