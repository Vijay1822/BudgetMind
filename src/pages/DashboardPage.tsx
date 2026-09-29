import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import {
  Sparkles,
  TrendingDown,
  Brain,
  ShieldCheck,
  DollarSign,
  ArrowRight,
  Database,
  CheckCircle2,
  Layers,
  Activity,
  FolderKanban
} from 'lucide-react';
import { FinancialPhilosophyVisual } from '../components/finance/FinancialPhilosophyVisual';
import { BudgetMindProcessFlow } from '../components/flow/BudgetMindProcessFlow';
import { BudgetMindFlowchart } from '../components/flow/BudgetMindFlowchart';
import { useAuth } from '../context/AuthContext';

export const DashboardPage: React.FC = () => {
  const { theme } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [memories, setMemories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, memRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/hindsight/memories'),
        ]);
        const proj = await projRes.json();
        const mem = await memRes.json();
        if (proj.success) setProjects(proj.data || []);
        if (mem.success) setMemories(mem.data || []);
      } catch (e) {
        console.error('Failed to load dashboard data:', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatINR = (val: number) => `₹${val.toLocaleString('en-IN')}`;

  const trendData = [
    { month: 'Nov 2025', planned: 900000, optimized: 750000, reserve: 150000 },
    { month: 'Dec 2025', planned: 950000, optimized: 790000, reserve: 160000 },
    { month: 'Jan 2026', planned: 1100000, optimized: 920000, reserve: 180000 },
    { month: 'Feb 2026', planned: 1000000, optimized: 811175, reserve: 188825 },
    { month: 'Mar 2026', planned: 1200000, optimized: 980000, reserve: 220000 },
  ];

  const chartColors = {
    primary: theme === 'light' ? '#FF8F7C' : '#F58F7C',
    secondary: theme === 'light' ? '#4A5568' : '#F2C4CE',
    reserve: theme === 'light' ? '#FFC7C7' : '#34D399',
    grid: theme === 'light' ? '#E6E9EE' : 'rgba(214, 214, 214, 0.12)',
    text: theme === 'light' ? '#4A5568' : '#D6D6D6',
    tooltipBg: theme === 'light' ? '#FFFFFF' : '#38373C',
    tooltipBorder: theme === 'light' ? '#E6E9EE' : '#F58F7C',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1440px', margin: '0 auto' }}>
      {/* 1. TOP HEADER: Financial Intelligence Command Center */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '1rem',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.75rem',
        boxShadow: 'var(--shadow-sm)',
        transition: 'background-color 0.4s ease, border-color 0.4s ease',
      }}>
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
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              BUDGETMIND INTELLIGENCE COMMAND
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Autonomous Optimization & Memory Agent
            </span>
          </div>

          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
            Financial Intelligence Workspace
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.35rem', maxWidth: '780px' }}>
            Don't spend the budget. Optimize it. Learn from every purchase and spend smarter every time across all active organizational initiatives.
          </p>
        </div>

        <button
          onClick={() => navigate('/budgets')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.85rem 1.6rem',
            borderRadius: 'var(--radius-lg)',
            border: 'none',
            backgroundColor: 'var(--accent)',
            color: theme === 'light' ? '#FFFFFF' : '#2C2B30',
            fontWeight: 800,
            fontSize: '0.92rem',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-xs)',
            transition: 'all 0.2s ease',
          }}
        >
          <Sparkles size={17} />
          Optimize New Budget
        </button>
      </div>

      {/* 2. TOP METRICS: 5 Core Financial Governance Indicators */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem' }}>
        {/* Available Budget */}
        <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--surface)', border: '1px solid var(--border-medium)', boxShadow: 'var(--shadow-xs)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            AVAILABLE BUDGET
          </span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.25rem 0' }}>
            ₹10,00,000
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Ceiling constraint (Never spent blindly)
          </div>
        </div>

        {/* Optimized Spend */}
        <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--surface)', border: '2px solid var(--accent)', boxShadow: 'var(--shadow-xs)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase' }}>
            OPTIMIZED SPEND
          </span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.25rem 0' }}>
            ₹8,11,175
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600 }}>
            Minimum Effective Cost for 100% Scope
          </div>
        </div>

        {/* Strategic Reserve */}
        <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--surface)', border: '2px solid var(--mint-border)', boxShadow: 'var(--shadow-xs)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--mint-text)', textTransform: 'uppercase' }}>
            STRATEGIC RESERVE
          </span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--mint-text)', margin: '0.25rem 0' }}>
            ₹1,88,825
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            18.9% preserved capital in treasury
          </div>
        </div>

        {/* Potential Avoided Cost */}
        <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--surface)', border: '1px solid var(--border-medium)', boxShadow: 'var(--shadow-xs)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase' }}>
            POTENTIAL AVOIDED COST
          </span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.25rem 0' }}>
            ₹2,50,000
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Duplicate seats & vendor traps avoided
          </div>
        </div>

        {/* Verified Savings */}
        <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--surface)', border: '1.5px solid var(--success)', boxShadow: 'var(--shadow-xs)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--success)', textTransform: 'uppercase' }}>
            VERIFIED SAVINGS
          </span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.25rem 0' }}>
            ₹1,39,000
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600 }}>
            Reconciled against verified vendor invoices
          </div>
        </div>
      </div>

      {/* 3. CORE FINANCIAL PHILOSOPHY: Visual Minimum Effective Cost Representation */}
      <FinancialPhilosophyVisual
        availableBudget={1000000}
        optimizedSpend={811175}
        strategicReserve={188825}
      />

      {/* 4. BUDGET TRENDS: Historical Spend Trajectory */}
      <div style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.75rem',
        boxShadow: 'var(--shadow-sm)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Enterprise Budget Trajectory
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Comparing available budget ceilings against optimized required spend and retained strategic reserves.
            </p>
          </div>
          <button
            onClick={() => navigate('/savings')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'none',
              border: 'none',
              color: 'var(--accent)',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
            }}
          >
            View Full Savings Ledger <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ height: '280px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis dataKey="month" stroke={chartColors.text} fontSize={12} tickLine={false} />
              <YAxis stroke={chartColors.text} fontSize={12} tickFormatter={(v) => `₹${v / 1000}k`} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: chartColors.tooltipBg,
                  borderColor: chartColors.tooltipBorder,
                  borderRadius: '10px',
                  color: theme === 'light' ? '#4A5568' : '#FFFFFF',
                }}
                formatter={(val: any) => formatINR(Number(val))}
              />
              <Area type="monotone" dataKey="planned" name="Planned Ceiling" stroke={chartColors.secondary} fill={chartColors.secondary} fillOpacity={0.12} />
              <Area type="monotone" dataKey="optimized" name="Optimized Spend" stroke={chartColors.primary} fill={chartColors.primary} fillOpacity={0.35} />
              <Area type="monotone" dataKey="reserve" name="Preserved Reserve" stroke={chartColors.reserve} fill={chartColors.reserve} fillOpacity={0.25} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 5. HINDSIGHT LEARNING: Active Organizational Memory */}
      <div style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.75rem',
        boxShadow: 'var(--shadow-sm)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Brain size={22} color="var(--accent)" />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Hindsight Continuous Learning Bank
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Vectorize Hindsight memory bank "budgetmind-procurement-bank" actively preventing repeat budget errors.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/memory')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'none',
              border: 'none',
              color: 'var(--accent)',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
            }}
          >
            Explore Memory Bank <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {[
            {
              lesson: 'AlphaCloud 24% Cost Overrun Prevention',
              outcome: 'Applied mandatory egress cap and weekend compute scheduling to avoid previous ₹48,000 overrun.',
              type: 'Cloud Compute Overrun',
              saving: '₹48,000 saved',
            },
            {
              lesson: 'Jira Enterprise License Seat Harvesting',
              outcome: 'Harvested 12 unused seats from existing 45-seat inventory pool instead of procuring new licenses.',
              type: 'License Over-provisioning',
              saving: '₹50,000 saved',
            },
            {
              lesson: 'CheapHost SLA False Economy Avoided',
              outcome: 'Avoided CheapHost 24h SLA risk by selecting ApexCloud (1h SLA) with guaranteed uptime.',
              type: 'Vendor SLA Risk',
              saving: 'Avoids ₹85,000 risk',
            },
            {
              lesson: 'Workstation Damage Repair Buffer',
              outcome: 'Factored ₹20,000 realistic hardware repair buffer based on 2025 refresh repair invoices.',
              type: 'Hardware Refresh',
              saving: 'Contingency verified',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                padding: '1.15rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--surface-elevated)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase' }}>
                  {item.type}
                </span>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--success)' }}>
                  {item.saving}
                </span>
              </div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                {item.lesson}
              </h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                {item.outcome}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. HOW BUDGETMIND TRANSFORMS ENTERPRISE SPEND: Interactive Process Visualization */}
      <BudgetMindProcessFlow />

      {/* 7. RECENT PROJECTS & RECENT ACTIVITY */}
      <div style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.75rem',
        boxShadow: 'var(--shadow-sm)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Recent Projects & Procurement Decisions
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Active initiatives tracked by the deterministic financial engine and LangGraph agent.
            </p>
          </div>
          <button
            onClick={() => navigate('/projects')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'none',
              border: 'none',
              color: 'var(--accent)',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
            }}
          >
            View All Projects <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid var(--border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem', fontWeight: 700 }}>Project Title</th>
                <th style={{ padding: '0.75rem', fontWeight: 700 }}>Scope</th>
                <th style={{ padding: '0.75rem', fontWeight: 700 }}>Target Budget</th>
                <th style={{ padding: '0.75rem', fontWeight: 700 }}>Status</th>
                <th style={{ padding: '0.75rem', fontWeight: 700, textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  id: 'p-1',
                  title: 'Engineering Team 1-Year Establishment',
                  scope: '10 Developers + Cloud + Subscriptions',
                  budget: 1000000,
                  status: 'APPROVED',
                },
                {
                  id: 'p-2',
                  title: 'Mobile Squad Cloud CI/CD Pipeline',
                  scope: '5 Engineers + Mac mini runners',
                  budget: 800000,
                  status: 'IN_REVIEW',
                },
                {
                  id: 'p-3',
                  title: 'Core Platform Security Hardening',
                  scope: 'SOC2 Compliance + Pentesting',
                  budget: 650000,
                  status: 'PLANNING',
                },
              ].map((proj) => (
                <tr
                  key={proj.id}
                  style={{ borderBottom: '1px solid var(--border-subtle)' }}
                >
                  <td style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {proj.title}
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', color: 'var(--text-secondary)' }}>
                    {proj.scope}
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {formatINR(proj.budget)}
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <span
                      style={{
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        backgroundColor: proj.status === 'APPROVED' ? 'var(--mint-bg)' : 'var(--amber-bg)',
                        color: proj.status === 'APPROVED' ? 'var(--mint-text)' : 'var(--amber-text)',
                        border: `1px solid ${proj.status === 'APPROVED' ? 'var(--mint-border)' : 'var(--amber-border)'}`,
                      }}
                    >
                      {proj.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', textAlign: 'right' }}>
                    <button
                      onClick={() => navigate('/budgets')}
                      style={{
                        padding: '0.35rem 0.75rem',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)',
                        backgroundColor: 'var(--surface-elevated)',
                        color: 'var(--accent)',
                        cursor: 'pointer',
                      }}
                    >
                      Inspect Optimization
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
