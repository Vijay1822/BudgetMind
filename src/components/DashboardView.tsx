import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import {
  TrendingDown,
  DollarSign,
  Brain,
  ShieldCheck,
  AlertTriangle,
  Layers,
  ArrowRight,
  Sparkles,
  Calendar,
  Building,
  CheckCircle2
} from 'lucide-react';

interface DashboardViewProps {
  onNavigateToOptimizer: () => void;
  onNavigateToSandbox: () => void;
  onNavigateToLedger: () => void;
  onNavigateToMemory: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigateToOptimizer,
  onNavigateToSandbox,
  onNavigateToLedger,
  onNavigateToMemory,
}) => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projRes, savRes, histRes, memRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/savings'),
          fetch('/api/history'),
          fetch('/api/hindsight/memories'),
        ]);

        const proj = await projRes.json();
        const sav = await savRes.json();
        const hist = await histRes.json();
        const mem = await memRes.json();

        setDashboardData({
          projects: proj.data || [],
          savings: sav.data || { totals: { totalEstimated: 250000, totalVerified: 139000, totalAvoidedCost: 389000 } },
          history: hist.data || [],
          memories: mem.data || [],
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatINR = (val: number) => `₹${val.toLocaleString('en-IN')}`;

  // Allocation Donut Chart Data
  const allocationData = [
    { name: 'Hardware', value: 350000, color: '#FF8F7C' },
    { name: 'Cloud', value: 160000, color: '#4A5568' },
    { name: 'Software', value: 100000, color: '#FFC7C7' },
    { name: 'Security', value: 80000, color: '#D8DCE3' },
    { name: 'Contingency', value: 70000, color: '#FF8F7C' },
    { name: 'Training', value: 40000, color: '#4A5568' },
    { name: 'Maintenance', value: 20000, color: '#FFC7C7' },
    { name: 'Unallocated Reserve', value: 188825, color: '#FF8F7C' },
  ];

  // Spending Variance Bar Chart Data
  const varianceData = [
    { project: 'AlphaCloud', planned: 200000, actual: 248000, variance: 24.0 },
    { project: 'SaaS Scale', planned: 300000, actual: 210000, variance: -30.0 },
    { project: 'Workstations', planned: 350000, actual: 370000, variance: 5.7 },
    { project: 'Dev Team', planned: 1000000, actual: 811175, variance: -18.9 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* 5 Executive KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '1rem'
      }}>
        <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-xs)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            AVAILABLE BUDGET
          </span>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.25rem 0' }}>
            ₹10,00,000
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Baseline target constraint</span>
        </div>

        <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '2px solid var(--primary-brand)', boxShadow: 'var(--shadow-xs)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--primary-brand)', textTransform: 'uppercase' }}>
            RECOMMENDED SPEND
          </span>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--primary-brand)', margin: '0.25rem 0' }}>
            ₹8,11,175
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Minimum effective budget</span>
        </div>

        <div style={{ padding: '1.25rem', backgroundColor: 'var(--mint-bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--mint-border)', boxShadow: 'var(--shadow-xs)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--mint-text)', textTransform: 'uppercase' }}>
            POTENTIAL AVOIDED COST
          </span>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--mint-text)', margin: '0.25rem 0' }}>
            ₹1,88,825
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--mint-text)' }}>Unallocated cash + license reuse</span>
        </div>

        <div style={{ padding: '1.25rem', backgroundColor: 'var(--lavender-bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--lavender-border)', boxShadow: 'var(--shadow-xs)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--lavender-text)', textTransform: 'uppercase' }}>
            VERIFIED SAVINGS
          </span>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--lavender-text)', margin: '0.25rem 0' }}>
            {formatINR(dashboardData?.savings?.totals?.totalVerified || 139000)}
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--lavender-text)' }}>Audited invoice reconciliation</span>
        </div>

        <div style={{ padding: '1.25rem', backgroundColor: 'var(--purple-memory-bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--purple-memory-border)', boxShadow: 'var(--shadow-xs)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--purple-memory)', textTransform: 'uppercase' }}>
            HINDSIGHT LESSONS
          </span>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--purple-memory)', margin: '0.25rem 0' }}>
            {dashboardData?.memories?.length || 4} Retained
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--purple-memory)' }}>Active organizational memory</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
        gap: '1.25rem'
      }}>
        {/* Chart 1: Donut Category Allocation */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Recommended Resource Allocation
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Includes evidence-backed contingency and preserved strategic reserve
              </p>
            </div>
            <button
              onClick={onNavigateToOptimizer}
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--primary-brand)',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Optimize →
            </button>
          </div>

          <div style={{ height: '240px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => formatINR(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginTop: '0.75rem' }}>
            {allocationData.map(item => (
              <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color }} />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Historical Variance Analysis */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Planned vs Actual Spend (Historical Projects)
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Audited variance percentages extracted into Hindsight memory
              </p>
            </div>
            <button
              onClick={onNavigateToMemory}
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--purple-memory)',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              View Lessons →
            </button>
          </div>

          <div style={{ height: '240px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={varianceData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                <XAxis dataKey="project" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(val) => `₹${val / 1000}k`} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value: any) => formatINR(Number(value))} />
                <Bar dataKey="planned" fill="#CBD5E1" name="Planned Budget" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" fill="#4F46E5" name="Actual Expenditure" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
            AlphaCloud: +24% overrun (Cloud) • SaaS Scale: -30% savings (License reuse)
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Hindsight Lessons & Optimization Opportunities */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '1.25rem'
      }}>
        {/* Recent Lessons */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Brain size={18} color="var(--purple-memory)" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Recent Hindsight Organizational Lessons
              </h3>
            </div>
            <button
              onClick={onNavigateToMemory}
              style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--purple-memory)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              All Memories →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {dashboardData?.memories?.slice(0, 3).map((m: any) => (
              <div
                key={m.id}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--purple-memory-bg)',
                  border: '1px solid var(--purple-memory-border)',
                  fontSize: '0.8rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>{m.title}</strong>
                  <span style={{ fontSize: '0.68rem', color: 'var(--purple-memory)', fontWeight: 700 }}>
                    {m.category}
                  </span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '0.2rem', lineHeight: 1.3 }}>
                  {m.lessonText}
                </p>
                <div style={{ color: 'var(--mint-text)', fontWeight: 700, fontSize: '0.72rem', marginTop: '0.25rem' }}>
                  Impact: {m.quantitativeImpact}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Optimization Opportunities */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} color="var(--primary-brand)" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Active Optimization Opportunities
              </h3>
            </div>
            <button
              onClick={onNavigateToLedger}
              style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--mint-text)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Savings Ledger →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--mint-bg)', border: '1px solid var(--mint-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>45 Inactive Jira Software Licenses</strong>
                <div style={{ fontSize: '0.72rem', color: 'var(--mint-text)' }}>Reuse available seats instead of procuring new subscriptions</div>
              </div>
              <span style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--mint-text)' }}>₹72,000/yr</span>
            </div>

            <div style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--mint-bg)', border: '1px solid var(--mint-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>30 Unassigned Slack Business+ Seats</strong>
                <div style={{ fontSize: '0.72rem', color: 'var(--mint-text)' }}>Harvest idle workspace seats for new engineering squad</div>
              </div>
              <span style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--mint-text)' }}>₹25,500/yr</span>
            </div>

            <div style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--soft-blue-bg)', border: '1px solid var(--soft-blue-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>ApexCloud 3-Year TCO Bundle</strong>
                <div style={{ fontSize: '0.72rem', color: 'var(--soft-blue-text)' }}>1h SLA + bundled egress bandwidth prevents runtime surcharges</div>
              </div>
              <span style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--soft-blue-text)' }}>₹14,000 saved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
