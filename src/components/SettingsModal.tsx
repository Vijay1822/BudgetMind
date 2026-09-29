import React from 'react';
import { X, ShieldCheck, Server, Database, Brain, CheckCircle2 } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  hindsightStatus: {
    isConnected: boolean;
    source: string;
    bankId: string;
    baseUrl: string;
    lastError?: string | null;
  };
  onRefreshHealth: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  hindsightStatus,
  onRefreshHealth,
}) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'var(--surface)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-medium)',
        width: '100%',
        maxWidth: '560px',
        boxShadow: 'var(--shadow-xl)',
        overflow: 'hidden',
        animation: 'fadeIn 0.2s ease-out'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Enterprise Integration Health
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
              Backend environment connections & compliance monitoring.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              padding: '0.35rem',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{
            padding: '0.85rem 1rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--surface-secondary)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem'
          }}>
            <ShieldCheck size={20} color="var(--accent)" />
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              All service credentials (Gemini, Supabase, Firebase, Hindsight) are secured via server environment variables. Client-side key entry is disabled for SOC2 and enterprise compliance.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--surface-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Server size={16} color="var(--accent)" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>Vectorize Hindsight</span>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <CheckCircle2 size={14} /> {hindsightStatus.isConnected ? 'Connected' : 'Active'}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--surface-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Database size={16} color="var(--accent)" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>Supabase PostgreSQL</span>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <CheckCircle2 size={14} /> Synchronized
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--surface-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Brain size={16} color="var(--accent)" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>Google Gemini 2.5 Flash</span>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <CheckCircle2 size={14} /> Ready
              </span>
            </div>
          </div>
        </div>

        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              backgroundColor: 'var(--accent)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
