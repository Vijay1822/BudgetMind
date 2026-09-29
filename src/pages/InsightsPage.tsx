import React, { useState } from 'react';
import {
  TrendingUp,
  Brain,
  ShieldCheck,
  Building2,
  DollarSign,
  AlertTriangle,
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const InsightsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'cost' | 'vendor' | 'recurring' | 'variance' | 'risk' | 'memory'>('cost');

  const categories = [
    { id: 'cost', label: 'Cost Optimization', icon: Sparkles },
    { id: 'vendor', label: 'Vendor Intelligence', icon: Building2 },
    { id: 'recurring', label: 'Recurring Subscriptions', icon: DollarSign },
    { id: 'variance', label: 'Budget Variance', icon: TrendingUp },
    { id: 'risk', label: 'Risk & Contingency', icon: AlertTriangle },
    { id: 'memory', label: 'Hindsight Memory Insights', icon: Brain },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-xs)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            backgroundColor: 'var(--primary-brand-light)',
            color: 'var(--primary-brand)',
            padding: '0.2rem 0.5rem',
            borderRadius: 'var(--radius-sm)'
          }}>
            FINANCIAL INTELLIGENCE ENGINE
          </span>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Deep cross-project analytics, recurring cost risks, and vendor performance patterns
          </span>
        </div>
        <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Executive Financial Insights & Continuous Optimization
        </h2>
      </div>

      {/* Category Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem'
      }}>
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.6rem 1.15rem',
                borderRadius: 'var(--radius-md)',
                border: `1px solid ${isActive ? 'var(--primary-brand)' : 'var(--border-subtle)'}`,
                backgroundColor: isActive ? 'var(--primary-brand)' : 'var(--bg-card)',
                color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'var(--transition-fast)'
              }}
            >
              <Icon size={15} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Category Panels */}
      {activeCategory === 'cost' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
          <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--mint-text)' }}>AVOIDABLE OVER-PROVISIONING</span>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.35rem 0' }}>
              Harvest 45 Inactive Jira Software Seats
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Active pool analysis found 45 unassigned Jira seats from a previous department consolidation. Reassigning to incoming engineering squad saves ₹72,000/year.
            </p>
            <div style={{ marginTop: '1rem', padding: '0.65rem', backgroundColor: 'var(--mint-bg)', borderRadius: 'var(--radius-md)', color: 'var(--mint-text)', fontWeight: 800, fontSize: '0.82rem' }}>
              Potential Avoided Cost: ₹72,000
            </div>
          </div>

          <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--mint-text)' }}>SUBSCRIPTION BUNDLE HARVEST</span>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.35rem 0' }}>
              Harvest 30 Slack Business+ Seats
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Corporate workspace holds 30 inactive member seats. Harvesting eliminates the need for a separate ₹25,500/yr procurement contract.
            </p>
            <div style={{ marginTop: '1rem', padding: '0.65rem', backgroundColor: 'var(--mint-bg)', borderRadius: 'var(--radius-md)', color: 'var(--mint-text)', fontWeight: 800, fontSize: '0.82rem' }}>
              Potential Avoided Cost: ₹25,500
            </div>
          </div>
        </div>
      )}

      {activeCategory === 'vendor' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
          <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--soft-blue-text)' }}>VENDOR RELIABILITY VS PRICE</span>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.35rem 0' }}>
              ApexCloud Uptime (99.95%) vs CheapHost
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              CheapHost offered a ₹15,000 cheaper initial quote, but caused 42 hours of developer downtime due to an inferior 48h SLA. ApexCloud delivers a ₹45,000 net lower 3-year TCO.
            </p>
            <div style={{ marginTop: '1rem', padding: '0.65rem', backgroundColor: 'var(--soft-blue-bg)', borderRadius: 'var(--radius-md)', color: 'var(--soft-blue-text)', fontWeight: 800, fontSize: '0.82rem' }}>
              Recommended: ApexCloud (1h SLA)
            </div>
          </div>
        </div>
      )}

      {activeCategory === 'recurring' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
          <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--amber-text)' }}>RENEWAL PRICE LOCKS</span>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.35rem 0' }}>
              Lock Multi-Year SaaS Rate Cards
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Without price lock agreements, vendors historically increase renewal fees by 12-18% in year 2. Financial engine enforces a 1-year fixed quote requirement.
            </p>
          </div>
        </div>
      )}

      {activeCategory === 'variance' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
          <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--coral-text)' }}>EGRESS VARIANCE BENCHMARK</span>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.35rem 0' }}>
              Project AlphaCloud: 24% Overrun
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Cloud budget overran by ₹48,000 due to unmonitored egress and continuous weekend development cluster execution.
            </p>
          </div>
        </div>
      )}

      {activeCategory === 'risk' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
          <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--amber-text)' }}>HARDWARE REPAIR BUFFER</span>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.35rem 0' }}>
              5-8% Accidental Damage Reserve
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Engineering laptops historically suffer a 5-8% repair claim rate annually. Zero maintenance budgeting causes emergency capital reallocations.
            </p>
          </div>
        </div>
      )}

      {activeCategory === 'memory' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
          <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--purple-memory-border)' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--purple-memory)' }}>HINDSIGHT APPLIED INTELLIGENCE</span>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.35rem 0' }}>
              4 Historical Lessons Actively Sizing Contingency
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              All new budget optimizations automatically incorporate the 4 retained lessons from prior completed projects, preventing repeat procurement errors.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
