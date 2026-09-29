import React from 'react';
import { X, HelpCircle, ShieldCheck, CheckCircle2, AlertCircle, Brain } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface WhyUnspentModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBudget: number;
  minimumEffectiveBudget: number;
  unallocatedReserve: number;
  requirementCoveragePct: number;
}

export const WhyUnspentModal: React.FC<WhyUnspentModalProps> = ({
  isOpen,
  onClose,
  availableBudget,
  minimumEffectiveBudget,
  unallocatedReserve,
  requirementCoveragePct,
}) => {
  const { theme } = useAuth();
  if (!isOpen) return null;

  const formatINR = (val: number) => `₹${val.toLocaleString('en-IN')}`;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 110,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'var(--surface)',
        borderRadius: 'var(--radius-xl)',
        border: '1.5px solid var(--border-medium)',
        width: '100%',
        maxWidth: '680px',
        boxShadow: 'var(--shadow-xl)',
        overflow: 'hidden',
        animation: 'fadeIn 0.25s ease-out'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--surface-secondary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--accent)',
              color: theme === 'light' ? '#FFFFFF' : '#2C2B30',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <HelpCircle size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Why didn't you spend the remaining {formatINR(unallocatedReserve)}?
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Algorithmic explanation for unallocated strategic capital
              </p>
            </div>
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

        {/* Content */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Numbers Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.75rem',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--surface-secondary)',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>AVAILABLE TARGET</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>{formatINR(availableBudget)}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent)' }}>EFFECTIVE SPEND</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent)' }}>{formatINR(minimumEffectiveBudget)}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--success)' }}>PRESERVED RESERVE</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--success)' }}>{formatINR(unallocatedReserve)}</div>
            </div>
          </div>

          {/* 4 Justifications */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{ color: 'var(--success)', marginTop: '2px' }}><CheckCircle2 size={18} /></div>
              <div>
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                  1. 100% Requirement Coverage Fulfilled
                </strong>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                  All stated essential deliverables (developer workstations, cloud compute, managed database, SOC2 security) are funded in full. Spending the extra {formatINR(unallocatedReserve)} would purchase redundant capacity without adding measurable business utility.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{ color: 'var(--accent)', marginTop: '2px' }}><Brain size={18} /></div>
              <div>
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                  2. Existing Software Asset Harvesting
                </strong>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                  Internal organizational audit identified 45 unused Jira seats and 30 unused Slack seats. Rather than procuring another ₹50,000+ subscription bundle, BudgetMind reuses active idle enterprise inventory.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{ color: 'var(--accent)', marginTop: '2px' }}><ShieldCheck size={18} /></div>
              <div>
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                  3. Evidence-Backed Contingency is Already Factored
                </strong>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                  The minimum effective plan already includes dedicated contingency, specifically sized against Project AlphaCloud's 24% historical overrun pattern. The remaining reserve is surplus.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{ color: 'var(--warning)', marginTop: '2px' }}><AlertCircle size={18} /></div>
              <div>
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                  4. Capital Preservation & Avoided Recurring Lock-In
                </strong>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                  Allocating money just because it is available creates recurring overhead for future fiscal quarters (renewals, maintenance, license minimums). Uncommitted cash protects balance sheet liquidity.
                </p>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button
              onClick={onClose}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--accent)',
                color: theme === 'light' ? '#FFFFFF' : '#2C2B30',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
