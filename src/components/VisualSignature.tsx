import React from 'react';
import {
  Receipt,
  FileCheck2,
  Brain,
  Lightbulb,
  Sparkles,
  PieChart,
  TrendingDown,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const VisualSignature: React.FC = () => {
  const { theme } = useAuth();

  const steps = [
    { label: 'PAST SPENDING', sub: 'Invoices & Overruns', icon: Receipt },
    { label: 'OUTCOME', sub: 'Variances & SLAs', icon: FileCheck2 },
    { label: 'HINDSIGHT', sub: 'Biomimetic Memory', icon: Brain, highlight: true },
    { label: 'LESSON', sub: 'Rules & Overrun Risks', icon: Lightbulb },
    { label: 'OPTIMIZATION', sub: 'Constraint Engine', icon: Sparkles },
    { label: 'NEW BUDGET', sub: 'Minimum Effective', icon: PieChart },
    { label: 'SAVINGS', sub: 'Cash Preserved', icon: TrendingDown, highlight: true },
  ];

  return (
    <div style={{
      backgroundColor: 'var(--surface)',
      border: '1px solid var(--border-medium)',
      borderRadius: 'var(--radius-lg)',
      padding: '1rem 1.25rem',
      boxShadow: 'var(--shadow-xs)',
      margin: '0 0 1.5rem 0',
      transition: 'background-color 0.4s ease, border-color 0.4s ease',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '0.75rem',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--text-muted)'
          }}>
            Signature Procurement Loop
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            From Spending History to Smarter Budget
          </span>
        </div>
        <span style={{
          fontSize: '0.75rem',
          color: 'var(--accent)',
          fontWeight: 700,
          backgroundColor: 'var(--accent-soft)',
          padding: '0.15rem 0.5rem',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)',
        }}>
          Continuous Organizational Learning Active
        </span>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflowX: 'auto',
        padding: '0.25rem 0',
        gap: '0.5rem'
      }}>
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={step.label}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                minWidth: '100px',
                padding: '0.5rem 0.6rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: step.highlight ? 'var(--accent-soft)' : 'var(--surface-secondary)',
                border: `1.5px solid ${step.highlight ? 'var(--accent)' : 'var(--border-subtle)'}`,
                transition: 'all 0.2s ease'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: step.highlight ? 'var(--accent)' : 'var(--surface)',
                  color: step.highlight ? (theme === 'light' ? '#FFFFFF' : '#2C2B30') : 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.35rem'
                }}>
                  <Icon size={17} />
                </div>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap'
                }}>
                  {step.label}
                </span>
                <span style={{
                  fontSize: '0.65rem',
                  color: 'var(--text-secondary)',
                  marginTop: '0.15rem',
                  whiteSpace: 'nowrap'
                }}>
                  {step.sub}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <ArrowRight
                  size={14}
                  color="var(--text-muted)"
                  style={{ flexShrink: 0, opacity: 0.6 }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
