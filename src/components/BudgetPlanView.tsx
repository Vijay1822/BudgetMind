import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  TrendingDown,
  Sparkles,
  AlertTriangle,
  FileText,
  CheckCircle,
  HelpCircle,
  History,
  Layers,
  ArrowRight,
  Info,
  DollarSign
} from 'lucide-react';
import { BudgetPlan } from '../../server/types';
import { WhyUnspentModal } from './WhyUnspentModal';
import { useAuth } from '../context/AuthContext';

interface BudgetPlanViewProps {
  plan: BudgetPlan;
  onApprove: (planId: string) => Promise<void>;
  isApproving: boolean;
}

export const BudgetPlanView: React.FC<BudgetPlanViewProps> = ({
  plan,
  onApprove,
  isApproving,
}) => {
  const { theme } = useAuth();
  const [activeTab, setActiveTab] = useState<'allocations' | 'report' | 'tco' | 'risks'>('allocations');
  const [approvedState, setApprovedState] = useState(plan.status === 'APPROVED');
  const [isWhyUnspentOpen, setIsWhyUnspentOpen] = useState(false);

  const handleApproveClick = async () => {
    try {
      await onApprove(plan.id);
      setApprovedState(true);
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: theme === 'light' ? ['#FF8F7C', '#FFC7C7', '#4A5568', '#E6E9EE'] : ['#F58F7C', '#F2C4CE', '#D6D6D6', '#34D399']
      });
    } catch (e) {
      console.error(e);
    }
  };

  const formatINR = (val: number) => `₹${val.toLocaleString('en-IN')}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Value Proposition & Key Metrics Banner */}
      <div style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.75rem',
        boxShadow: 'var(--shadow-sm)',
        transition: 'background-color 0.4s ease, border-color 0.4s ease'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                backgroundColor: 'var(--accent-soft)',
                color: 'var(--accent)',
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-sm)'
              }}>
                MINIMUM EFFECTIVE BUDGET
              </span>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                backgroundColor: approvedState ? 'var(--mint-bg)' : 'var(--amber-bg)',
                color: approvedState ? 'var(--mint-text)' : 'var(--amber-text)',
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                border: `1px solid ${approvedState ? 'var(--mint-border)' : 'var(--amber-border)'}`
              }}>
                {approvedState ? 'STATUS: APPROVED' : 'STATUS: PENDING HUMAN REVIEW & APPROVAL'}
              </span>
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              {plan.title}
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Optimized for 10-person engineering team with organizational memory and license harvesting.
            </p>
          </div>

          {/* Efficiency Score Pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            backgroundColor: 'var(--surface-elevated)',
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-xs)'
          }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Budget Efficiency Score
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                Coverage + Savings + Risk Evidence
              </div>
            </div>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-soft)',
              color: 'var(--accent)',
              border: '2px solid var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.15rem'
            }}>
              {plan.budgetEfficiencyScore}
            </div>
          </div>
        </div>

        {/* 4 Core Financial Pillars */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '1rem'
        }}>
          {/* Minimum Effective */}
          <div style={{
            padding: '1.15rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--surface-elevated)',
            border: '2px solid var(--accent)',
            boxShadow: 'var(--shadow-xs)'
          }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase' }}>
              Minimum Effective Cost
            </span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.25rem 0' }}>
              {formatINR(plan.minimumEffectiveBudget)}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              100% of Essential & Security requirements satisfied
            </div>
          </div>

          {/* Available Budget Constraint */}
          <div style={{
            padding: '1.15rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--surface-elevated)',
            border: '1px solid var(--border-subtle)'
          }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Available Budget
            </span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-secondary)', margin: '0.25rem 0' }}>
              {formatINR(plan.availableBudget)}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Initial constraint cap (Not blindly spent)
            </div>
          </div>

          {/* Unallocated Strategic Reserve */}
          <div style={{
            padding: '1.15rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--surface-elevated)',
            border: '2px solid var(--mint-border)',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--mint-text)', textTransform: 'uppercase' }}>
                Strategic Reserve
              </span>
              <button
                onClick={() => setIsWhyUnspentOpen(true)}
                title="Why wasn't this spent?"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '2px'
                }}
              >
                <HelpCircle size={15} />
              </button>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--mint-text)', margin: '0.25rem 0' }}>
              {formatINR(plan.unallocatedReserve)}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Preserved capital retained in company treasury
            </div>
          </div>

          {/* Potential Avoided Cost */}
          <div style={{
            padding: '1.15rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--surface-elevated)',
            border: '1px solid var(--border-subtle)'
          }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>
              Potential Avoided Cost
            </span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent)', margin: '0.25rem 0' }}>
              {formatINR(plan.potentialAvoidedCost)}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Avoided duplicates, over-provisioning & traps
            </div>
          </div>
        </div>

        {/* Memory Lessons Injected Pill */}
        <div style={{
          marginTop: '1.25rem',
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--surface-secondary)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
            <Sparkles size={16} color="var(--accent)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
              Hindsight Procurement Lessons Applied ({plan.memoryInfluence.recalledMemories.length})
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
            {plan.memoryInfluence.recalledMemories.map((mem) => (
              <div
                key={mem.id}
                style={{
                  padding: '0.75rem',
                  backgroundColor: 'var(--surface-elevated)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.8rem'
                }}
              >
                <div style={{ fontWeight: 700, color: 'var(--accent)' }}>
                  {mem.lesson}
                </div>
                <div style={{ color: 'var(--text-secondary)', marginTop: '0.2rem', fontSize: '0.75rem' }}>
                  {mem.outcome}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-subtle)',
        gap: '0.5rem',
        paddingBottom: '0.25rem'
      }}>
        <button
          onClick={() => setActiveTab('allocations')}
          style={{
            padding: '0.6rem 1.15rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            borderRadius: 'var(--radius-md)',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: activeTab === 'allocations' ? 'var(--surface)' : 'transparent',
            color: activeTab === 'allocations' ? 'var(--accent)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'allocations' ? '2px solid var(--accent)' : 'none'
          }}
        >
          Category Allocations
        </button>

        <button
          onClick={() => setActiveTab('report')}
          style={{
            padding: '0.6rem 1.15rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            borderRadius: 'var(--radius-md)',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: activeTab === 'report' ? 'var(--surface)' : 'transparent',
            color: activeTab === 'report' ? 'var(--accent)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'report' ? '2px solid var(--accent)' : 'none'
          }}
        >
          Transparent Optimization Report
        </button>

        <button
          onClick={() => setActiveTab('tco')}
          style={{
            padding: '0.6rem 1.15rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            borderRadius: 'var(--radius-md)',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: activeTab === 'tco' ? 'var(--surface)' : 'transparent',
            color: activeTab === 'tco' ? 'var(--accent)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'tco' ? '2px solid var(--accent)' : 'none'
          }}
        >
          Total Cost of Ownership (3-Yr TCO)
        </button>

        <button
          onClick={() => setActiveTab('risks')}
          style={{
            padding: '0.6rem 1.15rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            borderRadius: 'var(--radius-md)',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: activeTab === 'risks' ? 'var(--surface)' : 'transparent',
            color: activeTab === 'risks' ? 'var(--accent)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'risks' ? '2px solid var(--accent)' : 'none'
          }}
        >
          Risks & Mitigations
        </button>
      </div>

      {/* Tab 1: Category Allocations */}
      {activeTab === 'allocations' && (
        <div style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
            Category Allocation Breakdown
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {plan.allocations.map((alloc) => {
              const isReduced = alloc.delta < 0;
              const isAdded = alloc.delta > 0;
              return (
                <div
                  key={alloc.category}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--surface-elevated)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.45rem',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {alloc.category}
                      </span>
                      {alloc.isRecurring && (
                        <span style={{
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          backgroundColor: 'var(--accent-soft)',
                          color: 'var(--accent)',
                          padding: '0.1rem 0.4rem',
                          borderRadius: 'var(--radius-sm)'
                        }}>
                          RECURRING ANNUAL
                        </span>
                      )}
                      {!alloc.isRecurring && (
                        <span style={{
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          backgroundColor: 'var(--surface-secondary)',
                          color: 'var(--text-secondary)',
                          padding: '0.1rem 0.4rem',
                          borderRadius: 'var(--radius-sm)'
                        }}>
                          ONE-TIME CAPITAL
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {alloc.naiveAmount !== alloc.optimizedAmount && (
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                          {formatINR(alloc.naiveAmount)}
                        </span>
                      )}
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {formatINR(alloc.optimizedAmount)}
                      </span>
                      {isReduced && (
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          backgroundColor: 'var(--mint-bg)',
                          color: 'var(--mint-text)',
                          padding: '0.15rem 0.45rem',
                          borderRadius: 'var(--radius-full)'
                        }}>
                          Saved {formatINR(Math.abs(alloc.delta))}
                        </span>
                      )}
                      {isAdded && (
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          backgroundColor: 'var(--amber-bg)',
                          color: 'var(--amber-text)',
                          padding: '0.15rem 0.45rem',
                          borderRadius: 'var(--radius-full)'
                        }}>
                          +{formatINR(alloc.delta)} Buffer
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: 'var(--border-subtle)',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden',
                    margin: '0.5rem 0'
                  }}>
                    <div style={{
                      width: `${Math.min(100, alloc.percentageOfBudget)}%`,
                      height: '100%',
                      backgroundColor: alloc.category === 'Contingency' ? 'var(--amber-accent)' : 'var(--accent)',
                      borderRadius: 'var(--radius-full)'
                    }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.35rem' }}>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      {alloc.rationale}
                    </p>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                      {alloc.percentageOfBudget}% of spend
                    </span>
                  </div>

                  {alloc.historicalEvidence && (
                    <div style={{
                      marginTop: '0.45rem',
                      padding: '0.35rem 0.65rem',
                      backgroundColor: 'var(--surface-secondary)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px dashed var(--border-medium)',
                      fontSize: '0.72rem',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem'
                    }}>
                      <Info size={13} color="var(--accent)" />
                      <span><strong>Historical Evidence:</strong> {alloc.historicalEvidence}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Transparent Optimization Report */}
      {activeTab === 'report' && (
        <div style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Transparent Optimization Report
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Every significant adjustment from the naive budget with verifiable evidence and explicit trade-offs.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {plan.optimizationDeltas.map((delta, i) => (
              <div
                key={i}
                style={{
                  padding: '1.15rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--surface-elevated)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {delta.item}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {formatINR(delta.fromAmount)} → <strong>{formatINR(delta.toAmount)}</strong>
                    </span>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      backgroundColor: delta.savings >= 0 ? 'var(--mint-bg)' : 'var(--amber-bg)',
                      color: delta.savings >= 0 ? 'var(--mint-text)' : 'var(--amber-text)',
                      padding: '0.15rem 0.5rem',
                      borderRadius: 'var(--radius-full)'
                    }}>
                      {delta.savings >= 0 ? `Saved ${formatINR(delta.savings)}` : `Buffer +${formatINR(Math.abs(delta.savings))}`}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      WHAT CHANGED?
                    </span>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                      {delta.whatChanged}
                    </p>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      WHY?
                    </span>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                      {delta.why}
                    </p>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase' }}>
                      EVIDENCE?
                    </span>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                      {delta.evidence}
                    </p>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--amber-text)', textTransform: 'uppercase' }}>
                      TRADE-OFF?
                    </span>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                      {delta.tradeOff}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Assumptions & Standards */}
          <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'var(--surface-secondary)', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              Financial Standards & Explicit Labels
            </h4>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {plan.assumptions.map((assump, idx) => (
                <li key={idx}>{assump}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Tab 3: Total Cost of Ownership (TCO) */}
      {activeTab === 'tco' && (
        <div style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            3-Year Total Cost of Ownership Projection
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Upfront price ≠ Real economic spend. Evaluates recurring software subscriptions, renewals, maintenance, and support SLAs.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>UPFRONT YEAR 1 CAPITAL</span>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.25rem 0' }}>
                {formatINR(plan.oneTimeCost)}
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Hardware & warranties</span>
            </div>

            <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>ANNUAL RECURRING</span>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.25rem 0' }}>
                {formatINR(plan.recurringAnnualCost)}/yr
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Cloud & SaaS subscriptions</span>
            </div>

            <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>CONTINGENCY RESERVE</span>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--amber-text)', margin: '0.25rem 0' }}>
                {formatINR(plan.contingencyAmount)}
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Evidence-backed buffer</span>
            </div>

            <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--accent-soft)', border: '1px solid var(--border-medium)' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent)' }}>PROJECTED 3-YEAR TCO</span>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--accent)', margin: '0.25rem 0' }}>
                {formatINR(plan.tco3Year)}
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--accent)' }}>Includes renewal stabilization</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Risks & Mitigations */}
      {activeTab === 'risks' && (
        <div style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
            Risk Controls & Evidence-Based Mitigations
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {plan.risks.map((risk, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem'
                }}
              >
                <div style={{
                  padding: '0.35rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: risk.severity === 'HIGH' ? 'var(--coral-bg)' : 'var(--amber-bg)',
                  color: risk.severity === 'HIGH' ? 'var(--coral-text)' : 'var(--amber-text)',
                  marginTop: '2px'
                }}>
                  <AlertTriangle size={16} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {risk.risk}
                    </span>
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      backgroundColor: risk.severity === 'HIGH' ? 'var(--coral-bg)' : 'var(--amber-bg)',
                      color: risk.severity === 'HIGH' ? 'var(--coral-text)' : 'var(--amber-text)',
                      padding: '0.1rem 0.4rem',
                      borderRadius: 'var(--radius-full)'
                    }}>
                      {risk.severity} RISK
                    </span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    <strong>Mitigation:</strong> {risk.mitigation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Human Approval Bar */}
      <div style={{
        backgroundColor: approvedState ? 'var(--mint-bg)' : 'var(--surface)',
        border: `2px solid ${approvedState ? 'var(--mint-border)' : 'var(--accent)'}`,
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={20} color={approvedState ? 'var(--mint-accent)' : 'var(--accent)'} />
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {approvedState ? 'Budget Approved & Locked' : 'Human Approval Required'}
            </span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            {approvedState
              ? `Approved by Finance Committee at ${new Date(plan.approvedAt || Date.now()).toLocaleTimeString()}. Stored into organizational Hindsight memory.`
              : 'The AI never executes financially consequential decisions silently. Review the Transparent Report and click Approve.'}
          </p>
        </div>

        {!approvedState ? (
          <button
            onClick={handleApproveClick}
            disabled={isApproving}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              fontSize: '0.9rem',
              fontWeight: 700,
              borderRadius: 'var(--radius-md)',
              border: 'none',
              cursor: isApproving ? 'not-allowed' : 'pointer',
              backgroundColor: 'var(--accent)',
              color: theme === 'light' ? '#FFFFFF' : '#2C2B30',
              boxShadow: 'var(--shadow-xs)',
              transition: 'var(--transition-fast)'
            }}
          >
            <CheckCircle size={18} />
            {isApproving ? 'Recording Approval in Hindsight...' : 'Approve Budget Plan'}
          </button>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--surface-elevated)',
            border: '1px solid var(--mint-border)',
            color: 'var(--mint-text)',
            fontWeight: 700,
            fontSize: '0.85rem'
          }}>
            <CheckCircle size={16} color="var(--mint-accent)" />
            Approved & Retained in Memory
          </div>
        )}
      </div>

      {/* Why Didn't You Spend Remaining Money Modal */}
      <WhyUnspentModal
        isOpen={isWhyUnspentOpen}
        onClose={() => setIsWhyUnspentOpen(false)}
        availableBudget={plan.availableBudget}
        minimumEffectiveBudget={plan.minimumEffectiveBudget}
        unallocatedReserve={plan.unallocatedReserve}
        requirementCoveragePct={plan.requirementCoveragePct}
      />
    </div>
  );
};
