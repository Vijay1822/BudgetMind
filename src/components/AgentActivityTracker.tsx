import React from 'react';
import { CheckCircle2, Clock, Wrench, ShieldAlert } from 'lucide-react';

export interface AgentStepItem {
  id: string;
  stepNumber: number;
  title: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'WARNING';
  toolUsed?: string;
  evidenceFound?: string;
  timestamp: string;
}

interface AgentActivityTrackerProps {
  steps: AgentStepItem[];
  isOptimizing: boolean;
}

export const AgentActivityTracker: React.FC<AgentActivityTrackerProps> = ({
  steps,
  isOptimizing,
}) => {
  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.25rem',
      boxShadow: 'var(--shadow-xs)',
      marginBottom: '1.5rem'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        paddingBottom: '0.75rem',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: isOptimizing ? 'var(--cyan-agent)' : 'var(--mint-accent)',
            animation: isOptimizing ? 'pulseGlow 1.5s infinite' : 'none'
          }} />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            BUDGET OPTIMIZER EXECUTION AUDIT
          </h3>
        </div>
        <span style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--text-muted)',
          backgroundColor: 'var(--bg-secondary)',
          padding: '0.2rem 0.6rem',
          borderRadius: 'var(--radius-full)'
        }}>
          {isOptimizing ? 'Agent Analyzing Constraints...' : `${steps.length} Actions Verified`}
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '0.75rem'
      }}>
        {steps.map(step => (
          <div
            key={step.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.65rem',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: step.status === 'COMPLETED' ? 'var(--mint-bg)' : 'var(--bg-card-subtle)',
              border: `1px solid ${step.status === 'COMPLETED' ? 'var(--mint-border)' : 'var(--border-subtle)'}`,
              transition: 'var(--transition-fast)'
            }}
          >
            <div style={{ color: step.status === 'COMPLETED' ? 'var(--mint-accent)' : 'var(--text-light)', marginTop: '2px' }}>
              {step.status === 'COMPLETED' ? (
                <CheckCircle2 size={16} />
              ) : (
                <Clock size={16} />
              )}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                <span style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: step.status === 'COMPLETED' ? 'var(--mint-text)' : 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {step.title}
                </span>
                {step.toolUsed && (
                  <span style={{
                    fontSize: '0.65rem',
                    fontFamily: 'monospace',
                    color: 'var(--text-muted)',
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    padding: '0.1rem 0.35rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    {step.toolUsed}
                  </span>
                )}
              </div>

              {step.evidenceFound && (
                <p style={{
                  fontSize: '0.72rem',
                  color: 'var(--text-secondary)',
                  marginTop: '0.2rem',
                  lineHeight: 1.3
                }}>
                  {step.evidenceFound}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
