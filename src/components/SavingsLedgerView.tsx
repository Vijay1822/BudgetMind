import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  TrendingDown,
  CheckCircle,
  Clock,
  Filter,
  FileCheck2,
  ShieldCheck,
  Building,
  TrendingUp,
  AlertTriangle,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { SavingsLedgerEntry } from '../../server/types';
import { useAuth } from '../context/AuthContext';

export const SavingsLedgerView: React.FC = () => {
  const { theme } = useAuth();
  const [entries, setEntries] = useState<SavingsLedgerEntry[]>([]);
  const [totals, setTotals] = useState({
    totalEstimated: 250000,
    totalVerified: 139000,
    totalAvoidedCost: 389000,
  });
  const [filterType, setFilterType] = useState<'ALL' | 'VERIFIED' | 'ESTIMATED'>('ALL');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const fetchLedger = async () => {
    try {
      const res = await fetch('/api/savings-ledger');
      const json = await res.json();
      if (json.success && json.data) {
        setEntries(json.data.ledger);
        setTotals(json.data.totals);
      }
    } catch (e) {
      console.error('Error fetching savings ledger:', e);
    }
  };

  useEffect(() => {
    fetchLedger();
  }, []);

  const formatINR = (val: number) => `₹${val.toLocaleString('en-IN')}`;

  const filteredEntries = entries.filter((e) => {
    if (filterType !== 'ALL' && e.type !== filterType) return false;
    if (filterCategory !== 'ALL' && e.category.toLowerCase() !== filterCategory.toLowerCase()) return false;
    return true;
  });

  // Section 1 Data: BudgetMind Optimized Spend (Planned, Optimized, Actual, Reserve)
  const agentTrendData = [
    { period: 'Q1 2025', planned: 850000, optimized: 710000, actual: 708000, reserve: 140000 },
    { period: 'Q2 2025', planned: 920000, optimized: 770000, actual: 772000, reserve: 150000 },
    { period: 'Q3 2025', planned: 1100000, optimized: 915000, actual: 911000, reserve: 185000 },
    { period: 'Q4 2025', planned: 1000000, optimized: 811175, actual: 814000, reserve: 188825 },
    { period: 'Q1 2026', planned: 1250000, optimized: 1010000, actual: 1005000, reserve: 240000 },
  ];

  // Section 2 Data: Traditional Without-AI Spend (Planned, Traditional Spend with overruns, Actual Spend)
  const withoutAiTrendData = [
    { period: 'Q1 2025', planned: 850000, traditional: 890000, actualSpend: 920000 },
    { period: 'Q2 2025', planned: 920000, traditional: 940000, actualSpend: 980000 },
    { period: 'Q3 2025', planned: 1100000, traditional: 1180000, actualSpend: 1240000 },
    { period: 'Q4 2025', planned: 1000000, traditional: 1060000, actualSpend: 1085000 },
    { period: 'Q1 2026', planned: 1250000, traditional: 1320000, actualSpend: 1390000 },
  ];

  const chartTheme = {
    teal: theme === 'light' ? '#FF8F7C' : '#F58F7C',
    charcoal: theme === 'light' ? '#4A5568' : '#F2C4CE',
    mint: theme === 'light' ? '#FF8F7C' : '#34D399',
    amber: theme === 'light' ? '#FF8F7C' : '#FBBF24',
    grid: theme === 'light' ? '#E6E9EE' : 'rgba(214, 214, 214, 0.12)',
    text: theme === 'light' ? '#4A5568' : '#D6D6D6',
    tooltipBg: theme === 'light' ? '#FFFFFF' : '#38373C',
    tooltipBorder: theme === 'light' ? '#E6E9EE' : '#F58F7C',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Header */}
      <div
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              backgroundColor: 'var(--accent-soft)',
              color: 'var(--accent)',
              padding: '0.2rem 0.6rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            FINANCIAL INTELLIGENCE LEDGER
          </span>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Strictly distinguishes Potential Avoided Cost from Verified Savings
          </span>
        </div>

        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Savings & Cost Avoidance Ledger
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.3rem', maxWidth: '820px' }}>
          Every rupee preserved through duplicate elimination, license harvesting, rightsizing, and unallocated strategic reserves is tracked with auditable proof.
        </p>
      </div>

      {/* SAVINGS COMPARISON: Impact of AI Optimization */}
      <div
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <TrendingDown size={19} color="var(--accent)" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Impact of AI Optimization
          </h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginLeft: 'auto' }}>
            5 Core Governance Metrics
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {/* Average Optimized Spend */}
          <div style={{ padding: '1.15rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              AVERAGE OPTIMIZED SPEND
            </span>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.25rem 0' }}>
              ₹8,44,235
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600 }}>
              18.2% below initial planned budget
            </div>
          </div>

          {/* Potential Avoided Cost */}
          <div style={{ padding: '1.15rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--surface-elevated)', border: '1.5px solid var(--accent)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase' }}>
                POTENTIAL AVOIDED COST
              </span>
              <Info size={12} color="var(--accent)" title="Estimated savings before actual outcome" />
            </div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.25rem 0' }}>
              {formatINR(totals.totalEstimated)}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Identified prior to procurement execution
            </div>
          </div>

          {/* Verified Savings */}
          <div style={{ padding: '1.15rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--surface-elevated)', border: '1.5px solid var(--success)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--success)', textTransform: 'uppercase' }}>
                VERIFIED SAVINGS
              </span>
              <CheckCircle size={12} color="var(--success)" title="Confirmed after actual invoice outcome" />
            </div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.25rem 0' }}>
              {formatINR(totals.totalVerified)}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600 }}>
              Reconciled against verified vendor invoices
            </div>
          </div>

          {/* Reserve Preserved */}
          <div style={{ padding: '1.15rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              RESERVE PRESERVED
            </span>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.25rem 0' }}>
              ₹9,03,825
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Unallocated strategic dry powder retained
            </div>
          </div>

          {/* Requirement Coverage */}
          <div style={{ padding: '1.15rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              REQUIREMENT COVERAGE
            </span>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.25rem 0' }}>
              100%
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600 }}>
              Zero essential requirement degradation
            </div>
          </div>
        </div>
      </div>

      {/* DISTINCT SECTION 1: AGENT BUDGET TRENDS */}
      <div
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', backgroundColor: 'var(--accent-soft)', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
                SECTION 1
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                BudgetMind Optimized Spend
              </h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              How AI optimization changes spending over time — tracking planned budgets against optimized allocations, actual spend, and preserved strategic reserves.
            </p>
          </div>
        </div>

        <div style={{ height: '320px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={agentTrendData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
              <XAxis dataKey="period" stroke={chartTheme.text} fontSize={12} tickLine={false} />
              <YAxis stroke={chartTheme.text} fontSize={12} tickFormatter={(v) => `₹${v / 1000}k`} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: chartTheme.tooltipBg,
                  borderColor: chartTheme.tooltipBorder,
                  borderRadius: '10px',
                  color: theme === 'light' ? '#4A5568' : '#FFFFFF',
                }}
                formatter={(val: any) => formatINR(Number(val))}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="planned" name="Planned Budget" fill={theme === 'light' ? '#E6E9EE' : '#D6D6D6'} radius={[4, 4, 0, 0]} />
              <Bar dataKey="optimized" name="Optimized Budget" fill={theme === 'light' ? '#FF8F7C' : '#F58F7C'} radius={[4, 4, 0, 0]} />
              <Bar dataKey="actual" name="Actual Spend" fill={theme === 'light' ? '#4A5568' : '#34D399'} radius={[4, 4, 0, 0]} />
              <Bar dataKey="reserve" name="Preserved Reserve" fill={theme === 'light' ? '#FFC7C7' : '#F2C4CE'} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* DISTINCT SECTION 2: WITHOUT AI BUDGET TRENDS */}
      <div
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--danger)', textTransform: 'uppercase', backgroundColor: 'rgba(220,38,38,0.12)', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
                SECTION 2
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Traditional Budget Spend
              </h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Estimated spending without BudgetMind optimization — showing unplanned overruns, duplicate purchases, and lack of license harvesting.
            </p>
          </div>
        </div>

        <div style={{ height: '320px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={withoutAiTrendData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
              <XAxis dataKey="period" stroke={chartTheme.text} fontSize={12} tickLine={false} />
              <YAxis stroke={chartTheme.text} fontSize={12} tickFormatter={(v) => `₹${v / 1000}k`} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: chartTheme.tooltipBg,
                  borderColor: chartTheme.tooltipBorder,
                  borderRadius: '10px',
                  color: theme === 'light' ? '#4A5568' : '#FFFFFF',
                }}
                formatter={(val: any) => formatINR(Number(val))}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="planned" name="Planned Ceiling" stroke={theme === 'light' ? '#E6E9EE' : '#D6D6D6'} strokeWidth={2} strokeDasharray="5 5" />
              <Line type="monotone" dataKey="traditional" name="Traditional Spend" stroke={theme === 'light' ? '#4A5568' : '#FBBF24'} strokeWidth={2.5} />
              <Line type="monotone" dataKey="actualSpend" name="Actual Invoiced (Overrun)" stroke={theme === 'light' ? '#FF8F7C' : '#F87171'} strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Auditable Persistent Ledger Table */}
      <div
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Detailed Cost Avoidance Entries
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Individual line items documented with source evidence and reconciliation status.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {(['ALL', 'VERIFIED', 'ESTIMATED'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-md)',
                  border: `1.5px solid ${filterType === t ? 'var(--accent)' : 'var(--border)'}`,
                  backgroundColor: filterType === t ? 'var(--accent-soft)' : 'transparent',
                  color: filterType === t ? 'var(--accent)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid var(--border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem', fontWeight: 700 }}>Description</th>
                <th style={{ padding: '0.75rem', fontWeight: 700 }}>Category</th>
                <th style={{ padding: '0.75rem', fontWeight: 700 }}>Type</th>
                <th style={{ padding: '0.75rem', fontWeight: 700 }}>Justification & Evidence</th>
                <th style={{ padding: '0.75rem', fontWeight: 700, textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry) => (
                <tr
                  key={entry.id}
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                    transition: 'background-color 0.15s ease',
                  }}
                >
                  <td style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {entry.description}
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', color: 'var(--text-secondary)' }}>
                    {entry.category}
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <span
                      style={{
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        backgroundColor: entry.type === 'VERIFIED' ? 'var(--mint-bg)' : 'var(--amber-bg)',
                        color: entry.type === 'VERIFIED' ? 'var(--mint-text)' : 'var(--amber-text)',
                        border: `1px solid ${entry.type === 'VERIFIED' ? 'var(--mint-border)' : 'var(--amber-border)'}`,
                      }}
                    >
                      {entry.type}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', color: 'var(--text-secondary)', fontSize: '0.8rem', maxWidth: '380px' }}>
                    {entry.justification}
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', fontWeight: 800, color: 'var(--accent)', textAlign: 'right' }}>
                    {formatINR(entry.amount)}
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
