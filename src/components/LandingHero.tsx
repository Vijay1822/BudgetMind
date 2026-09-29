import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, TrendingDown, Database, PieChart } from 'lucide-react';

interface LandingHeroProps {
  onStartBudget: () => void;
  onExploreInsights: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartBudget,
  onExploreInsights,
}) => {
  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-xl)',
      padding: '2.5rem 2rem',
      boxShadow: 'var(--shadow-sm)',
      marginBottom: '1.5rem',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF9F6 100%)'
    }}>
      <div style={{ maxWidth: '820px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--lavender-bg)', border: '1px solid var(--lavender-border)', marginBottom: '1rem' }}>
          <Sparkles size={14} color="var(--purple-memory)" />
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--purple-memory)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Enterprise Procurement Intelligence Platform
          </span>
        </div>

        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1rem' }}>
          Don't spend the budget. <span style={{ color: 'var(--primary-brand)' }}>Optimize it.</span>
        </h1>

        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.75rem' }}>
          BudgetMind uses LangGraph agent orchestration, deterministic constraint optimization, and persistent organizational memory (Hindsight) to eliminate duplicate tool subscriptions, calculate evidence-based contingency, and continuously learn from every procurement outcome.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={onStartBudget}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 1.75rem',
              fontSize: '0.95rem',
              fontWeight: 800,
              borderRadius: 'var(--radius-lg)',
              border: 'none',
              backgroundColor: 'var(--primary-brand)',
              color: '#FFFFFF',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)',
              transition: 'var(--transition-fast)'
            }}
          >
            <span>Create Budget</span>
            <ArrowRight size={17} />
          </button>

          <button
            onClick={onExploreInsights}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 1.5rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-medium)',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'var(--transition-fast)'
            }}
          >
            <Database size={16} />
            <span>Explore Insights</span>
          </button>
        </div>
      </div>

      {/* 3 Core Value Pillars */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
        marginTop: '2.5rem',
        paddingTop: '1.75rem',
        borderTop: '1px solid var(--border-subtle)'
      }}>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--mint-bg)', color: 'var(--mint-text)', height: 'fit-content' }}>
            <TrendingDown size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Minimum Effective Cost
            </h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Target budget is a constraint, not a spending target. Unspent funds remain strategic reserve.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--purple-memory-bg)', color: 'var(--purple-memory)', height: 'fit-content' }}>
            <Database size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Hindsight Memory
            </h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Remembers cloud overruns, SLA failures, and seat utilization so future budgets start smarter.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--soft-blue-bg)', color: 'var(--soft-blue-text)', height: 'fit-content' }}>
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Deterministic Source of Truth
            </h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Arithmetic is strictly calculated by backend financial models—never hallucinated by an LLM.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
