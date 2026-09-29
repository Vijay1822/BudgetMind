import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Brain,
  Sparkles,
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  Database,
  Layers,
  CheckCircle2,
  Check,
  Sliders,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ThemeSwitch } from '../components/theme/ThemeSwitch';
import { BudgetMindProcessFlow } from '../components/flow/BudgetMindProcessFlow';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useAuth();
  const isLight = theme === 'light';

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--background)',
      color: 'var(--text-primary)',
      transition: 'background-color 0.4s ease, color 0.4s ease'
    }}>
      {/* Top Navbar */}
      <header style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '1.25rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isLight ? '#FFFFFF' : '#2C2B30',
            boxShadow: 'var(--shadow-xs)'
          }}>
            <Brain size={22} />
          </div>
          <span style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            Budget<span style={{ color: 'var(--accent)' }}>Mind</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Light / Dark Mode Toggle */}
          <ThemeSwitch compact />

          <button
            type="button"
            onClick={() => navigate('/login')}
            style={{
              padding: '0.55rem 1.15rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-medium)',
              backgroundColor: 'var(--surface)',
              color: 'var(--text-primary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'var(--transition-fast)'
            }}
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => navigate('/signup')}
            style={{
              padding: '0.55rem 1.35rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              backgroundColor: 'var(--accent)',
              color: isLight ? '#FFFFFF' : '#2C2B30',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-xs)',
              transition: 'var(--transition-fast)'
            }}
          >
            Start Optimizing
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4.5rem 2rem 3.5rem',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.35rem 0.95rem',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--accent-soft)',
          border: '1px solid var(--border-subtle)',
          color: 'var(--accent)',
          fontSize: '0.78rem',
          fontWeight: 800,
          marginBottom: '1.75rem'
        }}>
          <Sparkles size={14} color="var(--accent)" />
          <span>AI BUDGET OPTIMIZER & PROCUREMENT MEMORY AGENT</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.12,
          maxWidth: '920px',
          margin: '0 auto 1.5rem',
          color: 'var(--text-primary)'
        }}>
          Don't spend the budget.{' '}
          <span style={{ color: 'var(--accent)' }}>
            Optimize it.
          </span>
        </h1>

        <p style={{
          fontSize: '1.15rem',
          color: 'var(--text-secondary)',
          maxWidth: '740px',
          margin: '0 auto 2.5rem',
          lineHeight: 1.6
        }}>
          BudgetMind uses autonomous agent orchestration, financial constraint modeling, and Vectorize Hindsight organizational memory to calculate the minimum effective cost — learning from every project to spend smarter every time.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => navigate('/signup')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.9rem 2rem',
              borderRadius: 'var(--radius-lg)',
              border: 'none',
              backgroundColor: 'var(--accent)',
              color: isLight ? '#FFFFFF' : '#2C2B30',
              fontWeight: 800,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <span>Start Optimizing</span>
            <ArrowRight size={18} />
          </button>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('how-it-works');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              padding: '0.9rem 1.75rem',
              borderRadius: 'var(--radius-lg)',
              border: '1.5px solid var(--border-medium)',
              backgroundColor: 'var(--surface)',
              color: 'var(--text-primary)',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            See How It Works
          </button>
        </div>
      </section>

      {/* Core Financial Philosophy: Before vs After Showcase */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem 2rem 3rem' }}>
        <div style={{
          backgroundColor: 'var(--surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase' }}>
              THE CORE FINANCIAL PHILOSOPHY
            </span>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.35rem' }}>
              Available Budget ≠ Target Spending
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.2rem' }}>
              Deterministic breakdown for 10-person engineering team establishment
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Traditional Budgeting */}
            <div style={{
              backgroundColor: 'var(--surface-secondary)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              padding: '1.75rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--danger)', fontWeight: 800, fontSize: '0.85rem' }}>TRADITIONAL BUDGETING</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>"Spend it or lose it"</span>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--danger)' }}>
                ₹9,80,000 <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Spent</span>
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <div>❌ Procured redundant Jira & Slack licenses (+₹50,000 waste)</div>
                <div>❌ Selected low upfront vendor with 48h SLA (+₹45,000 downtime)</div>
                <div>❌ Zero unallocated reserve preserved (₹20,000 left)</div>
                <div>❌ Zero organizational memory of past cloud overruns</div>
              </div>
            </div>

            {/* BudgetMind Optimization */}
            <div style={{
              backgroundColor: isLight ? 'rgba(255, 199, 199, 0.25)' : 'var(--surface-elevated)',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--accent)',
              padding: '1.75rem',
              boxShadow: isLight ? '0 4px 14px rgba(255, 143, 124, 0.2)' : 'none'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--accent)', fontWeight: 800, fontSize: '0.85rem' }}>BUDGETMIND OPTIMIZATION</span>
                <span style={{ fontSize: '0.72rem', color: isLight ? '#4A5568' : '#34D399', fontWeight: 700 }}>MINIMUM EFFECTIVE COST</span>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent)' }}>
                ₹8,11,175 <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Spend</span> + ₹1,88,825 <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Reserve</span>
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                <div>✅ Harvested 45 existing idle Jira seats (-₹50,000 avoided cost)</div>
                <div>✅ Sized evidence-based contingency for cloud (+₹20,000 buffer)</div>
                <div>✅ Evaluated 3-yr TCO over deceptive upfront bids</div>
                <div>✅ Preserved ₹1.89 Lakh as strategic liquidity in treasury</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TASK 1: "How BudgetMind Transforms Enterprise Spend" Interactive Process Visualization */}
      <section id="how-it-works" style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem 5rem' }}>
        <BudgetMindProcessFlow />
      </section>

      {/* Bottom CTA */}
      <section style={{
        maxWidth: '1000px',
        margin: '0 auto 6rem',
        padding: '3.5rem 2rem',
        backgroundColor: 'var(--surface)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-medium)',
        textAlign: 'center',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
          Ready to spend smarter on every purchase?
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Stop letting budgets drift. Build organizational financial memory with BudgetMind.
        </p>
        <button
          type="button"
          onClick={() => navigate('/signup')}
          style={{
            padding: '0.9rem 2.25rem',
            borderRadius: 'var(--radius-lg)',
            border: 'none',
            backgroundColor: 'var(--accent)',
            color: isLight ? '#FFFFFF' : '#2C2B30',
            fontWeight: 800,
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-xs)'
          }}
        >
          Create Your First Budget
        </button>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '2.5rem 2rem',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.82rem',
        backgroundColor: 'var(--surface)'
      }}>
        BudgetMind — Enterprise Financial Intelligence & Continuous Procurement Optimization System.
      </footer>
    </div>
  );
};
