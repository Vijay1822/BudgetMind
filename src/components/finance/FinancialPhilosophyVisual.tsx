import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  TrendingDown,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  Layers,
  ArrowRight,
  Info,
  DollarSign,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface FinancialPhilosophyVisualProps {
  availableBudget?: number;
  optimizedSpend?: number;
  strategicReserve?: number;
  onOpenWhyModal?: () => void;
}

export const FinancialPhilosophyVisual: React.FC<FinancialPhilosophyVisualProps> = ({
  availableBudget = 1000000,
  optimizedSpend = 811175,
  strategicReserve = 188825,
  onOpenWhyModal,
}) => {
  const { theme } = useAuth();
  const [selectedPillar, setSelectedPillar] = useState<'available' | 'optimized' | 'reserve' | null>('reserve');
  const [showInternalModal, setShowInternalModal] = useState(false);

  const formatINR = (val: number) => `₹${val.toLocaleString('en-IN')}`;
  const reservePct = ((strategicReserve / availableBudget) * 100).toFixed(1);
  const spendPct = ((optimizedSpend / availableBudget) * 100).toFixed(1);

  const pillarDetails = {
    available: {
      title: 'Available Budget (Constraint Cap)',
      amount: availableBudget,
      desc: 'The maximum capital approved by leadership. Traditional budgeting treats this as a target to hit or exhaust.',
      insight: 'Conventional mindset: "If we don\'t spend ₹10,00,000, it will be cut from next year\'s budget."',
    },
    optimized: {
      title: 'Minimum Effective Required Spend',
      amount: optimizedSpend,
      desc: 'The exact mathematical minimum required to fulfill 100% of Essential & Security requirements with active vendor SLA risk weighting.',
      insight: 'Includes right-sized hardware, cloud compute with past egress buffers, and essential software.',
    },
    reserve: {
      title: 'Preserved Strategic Reserve',
      amount: strategicReserve,
      desc: `${formatINR(strategicReserve)} (${reservePct}%) remains unallocated because all essential project outcomes are fully satisfied without wasting capital.`,
      insight: 'Avoids duplicate software, harvests 12 inactive seats, and preserves dry powder for strategic pivots.',
    },
  };

  const handleOpenWhy = () => {
    if (onOpenWhyModal) {
      onOpenWhyModal();
    } else {
      setShowInternalModal(true);
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.75rem',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        transition: 'background-color 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* Header with Title and Philosophy Tagline */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                backgroundColor: 'var(--accent-soft)',
                color: 'var(--accent)',
                padding: '0.25rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              CORE FINANCIAL PHILOSOPHY
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Minimum Effective Cost
            </span>
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            “Don’t spend the budget. Optimize it.”
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: '780px', marginTop: '0.35rem', lineHeight: '1.5' }}>
            BudgetMind doesn't try to spend the entire budget. It calculates the minimum amount required to satisfy essential
            requirements while preserving a <strong style={{ color: 'var(--accent)', fontWeight: 700 }}>Strategic Reserve</strong> for the organization.
          </p>
        </div>

        {/* 'Why didn't you spend it?' Trigger Button */}
        <button
          type="button"
          onClick={handleOpenWhy}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.25rem',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px solid var(--accent)',
            backgroundColor: 'var(--accent-soft)',
            color: 'var(--accent)',
            fontWeight: 800,
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <HelpCircle size={16} />
          Why didn't you spend it?
        </button>
      </div>

      {/* Visual Bar Breakdown (Proportional Stacked Representation) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700 }}>
          <span style={{ color: 'var(--text-secondary)' }}>Available Budget: {formatINR(availableBudget)}</span>
          <span style={{ color: 'var(--accent)' }}>Reserve Preserved: {formatINR(strategicReserve)} ({reservePct}%)</span>
        </div>

        {/* The Visual Proportional Bar */}
        <div
          style={{
            height: '42px',
            backgroundColor: 'rgba(0, 0, 0, 0.12)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            display: 'flex',
            border: '1.5px solid var(--border)',
            position: 'relative',
          }}
        >
          {/* Optimized Spend Portion */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${spendPct}%` }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setSelectedPillar('optimized')}
            title={`Optimized Spend: ${formatINR(optimizedSpend)} (${spendPct}%)`}
            style={{
              height: '100%',
              backgroundColor: theme === 'light' ? '#FF8F7C' : '#F58F7C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme === 'light' ? '#FFFFFF' : '#2C2B30',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              userSelect: 'none',
              padding: '0 0.75rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.15)',
            }}
          >
            Optimized Required Spend: {formatINR(optimizedSpend)} ({spendPct}%)
          </motion.div>

          {/* Strategic Reserve Portion */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${reservePct}%` }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setSelectedPillar('reserve')}
            title={`Strategic Reserve: ${formatINR(strategicReserve)} (${reservePct}%)`}
            style={{
              height: '100%',
              backgroundColor: theme === 'light' ? '#FFC7C7' : '#F2C4CE',
              color: theme === 'light' ? '#4A5568' : '#2C2B30',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.82rem',
              cursor: 'pointer',
              userSelect: 'none',
              padding: '0 0.75rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              borderLeft: '2px dashed var(--border-medium)',
            }}
          >
            Strategic Reserve: {formatINR(strategicReserve)} ({reservePct}%)
          </motion.div>
        </div>
      </div>

      {/* 3 Interactive Cards Showing Detail on Click / Selection */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        {/* Available Budget Card */}
        <div
          onClick={() => setSelectedPillar('available')}
          style={{
            padding: '1.15rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: selectedPillar === 'available' ? 'var(--surface-elevated)' : 'var(--surface)',
            border: `1.5px solid ${selectedPillar === 'available' ? 'var(--accent)' : 'var(--border)'}`,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: selectedPillar === 'available' ? 'var(--shadow-sm)' : 'none',
          }}
        >
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            AVAILABLE BUDGET
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
            {formatINR(availableBudget)}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Ceiling constraint. Never spent blindly.
          </div>
        </div>

        {/* Optimized Spend Card */}
        <div
          onClick={() => setSelectedPillar('optimized')}
          style={{
            padding: '1.15rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: selectedPillar === 'optimized' ? 'var(--surface-elevated)' : 'var(--surface)',
            border: `1.5px solid ${selectedPillar === 'optimized' ? 'var(--accent)' : 'var(--border)'}`,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: selectedPillar === 'optimized' ? 'var(--shadow-sm)' : 'none',
          }}
        >
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase' }}>
            OPTIMIZED SPEND
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
            {formatINR(optimizedSpend)}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Satisfies 100% of Essential & Security requirements.
          </div>
        </div>

        {/* Strategic Reserve Card */}
        <div
          onClick={() => setSelectedPillar('reserve')}
          style={{
            padding: '1.15rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: selectedPillar === 'reserve' ? 'var(--surface-elevated)' : 'var(--surface)',
            border: `1.5px solid ${selectedPillar === 'reserve' ? 'var(--accent)' : 'var(--border)'}`,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: selectedPillar === 'reserve' ? 'var(--shadow-sm)' : 'none',
          }}
        >
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--success)', textTransform: 'uppercase' }}>
            STRATEGIC RESERVE
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
            {formatINR(strategicReserve)}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Preserved capital. Not wasted, not forfeited.
          </div>
        </div>
      </div>

      {/* Selected Pillar Explanation Strip */}
      {selectedPillar && (
        <div
          style={{
            padding: '0.9rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--surface-secondary)',
            borderLeft: '4px solid var(--accent)',
            fontSize: '0.82rem',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div>
            <strong>{pillarDetails[selectedPillar].title}: </strong>
            <span style={{ color: 'var(--text-secondary)' }}>{pillarDetails[selectedPillar].desc}</span>
            <div style={{ marginTop: '0.2rem', color: 'var(--accent)', fontWeight: 600 }}>
              💡 {pillarDetails[selectedPillar].insight}
            </div>
          </div>
        </div>
      )}

      {/* Internal Modal: "Why didn't you spend it?" */}
      <AnimatePresence>
        {showInternalModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(4px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              style={{
                backgroundColor: 'var(--surface)',
                border: '1.5px solid var(--border-strong)',
                borderRadius: 'var(--radius-xl)',
                width: '100%',
                maxWidth: '680px',
                padding: '2rem',
                boxShadow: 'var(--shadow-xl)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                maxHeight: '90vh',
                overflowY: 'auto',
              }}
            >
              {/* Modal Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase' }}>
                    FINANCIAL DECISION AUDIT
                  </div>
                  <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Why didn't BudgetMind spend the remaining money?
                  </h3>
                </div>
                <button
                  onClick={() => setShowInternalModal(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    padding: '0.25rem',
                  }}
                >
                  <X size={22} />
                </button>
              </div>

              {/* Summary 3 Metrics */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.75rem',
                  padding: '1rem',
                  backgroundColor: 'var(--surface-secondary)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>AVAILABLE BUDGET</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>{formatINR(availableBudget)}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>EFFECTIVE SPEND</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent)' }}>{formatINR(optimizedSpend)}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>STRATEGIC RESERVE</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--success)' }}>{formatINR(strategicReserve)}</div>
                </div>
              </div>

              {/* Reasons Breakdown List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                  Audit Evidence & Decision Rationale:
                </div>

                {[
                  {
                    title: 'Duplicate licenses avoided',
                    desc: 'Harvested 12 inactive seats from the 45 unassigned enterprise Jira licenses in inventory, eliminating redundant procurement.',
                    saving: '₹50,000 preserved',
                  },
                  {
                    title: 'Existing resources reused',
                    desc: 'Reallocated 5 in-stock high-spec developer laptops rather than purchasing 10 brand-new units.',
                    saving: '₹35,000 preserved',
                  },
                  {
                    title: 'Vendor price & SLA optimization',
                    desc: 'Selected ApexCloud over CheapHost. While CheapHost had lower sticker price, their 24h SLA risk cost ₹85,000 in expected downtime variance.',
                    saving: 'TCO rightsized',
                  },
                  {
                    title: 'Non-essential requirements deferred',
                    desc: 'Categorized premium third-party analytics add-ons as OPTIONAL, deferring commitment until Phase 2 utilization proves demand.',
                    saving: '₹40,000 preserved',
                  },
                  {
                    title: 'Recurring costs reduced',
                    desc: 'Negotiated annual upfront enterprise billing with 15% discount versus month-to-month cloud commitments.',
                    saving: '₹28,825 preserved',
                  },
                  {
                    title: 'Evidence-based contingency preserved',
                    desc: 'Calculated ₹35,000 contingency based on historical AlphaCloud 24% overrun lesson rather than a generic arbitrary 20% buffer.',
                    saving: 'Risk mitigated',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--surface-elevated)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <CheckCircle2 size={18} color="var(--success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>{item.title}</strong>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)' }}>{item.saving}</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Close Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  onClick={() => setShowInternalModal(false)}
                  style={{
                    padding: '0.65rem 1.5rem',
                    borderRadius: 'var(--radius-lg)',
                    border: 'none',
                    backgroundColor: 'var(--accent)',
                    color: theme === 'light' ? '#FFFFFF' : '#2C2B30',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                  }}
                >
                  Understood & Verified
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
