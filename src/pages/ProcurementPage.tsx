import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Layers,
  ShieldCheck,
  Building2,
  Calendar,
  DollarSign
} from 'lucide-react';

export const ProcurementPage: React.FC = () => {
  const navigate = useNavigate();
  const [procurements, setProcurements] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/procurements').then(r => r.json()),
      fetch('/api/resources').then(r => r.json()),
    ]).then(([proc, res]) => {
      if (proc.success) setProcurements(proc.data);
      if (res.success) setResources(res.data);
    }).catch(console.error);
  }, []);

  const formatINR = (val: number) => `₹${val.toLocaleString('en-IN')}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Top Header */}
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
            backgroundColor: 'var(--mint-bg)',
            color: 'var(--mint-text)',
            padding: '0.2rem 0.5rem',
            borderRadius: 'var(--radius-sm)'
          }}>
            PROCUREMENT & ASSET HARVESTING
          </span>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Never procure duplicate software when existing inventory exists
          </span>
        </div>
        <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Enterprise Procurement & Asset Directory
        </h2>
      </div>

      {/* License Harvesting & Unassigned Software Asset Pool */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem',
        border: '2px solid var(--mint-accent)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} color="var(--mint-accent)" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Active Software Asset Inventory & Idle Seats
              </h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Internal audit identifies available seats to reuse for new initiatives before purchasing new subscriptions
            </p>
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--mint-text)' }}>
            ₹97,500/yr Avoidable Spend Available
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {resources.map((item) => (
            <div
              key={item.id}
              style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: item.unusedQuantity > 0 ? 'var(--mint-bg)' : 'var(--bg-card-subtle)',
                border: `1px solid ${item.unusedQuantity > 0 ? 'var(--mint-border)' : 'var(--border-subtle)'}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-muted)' }}>{item.category}</span>
                  <span style={{
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    padding: '0.1rem 0.4rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: item.unusedQuantity > 0 ? 'var(--mint-accent)' : 'var(--text-muted)',
                    color: '#FFFFFF'
                  }}>
                    {item.unusedQuantity} UNASSIGNED
                  </span>
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {item.name}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  {item.notes}
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '0.65rem', marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Total Pool: {item.totalOwned} seats</span>
                <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{formatINR(item.costPerUnitAnnual)}/seat</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Purchase Orders & Subscriptions */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem',
        border: '1px solid var(--border-subtle)'
      }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
          Active Organizational Purchase Contracts
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {procurements.map((proc) => (
            <div
              key={proc.id}
              style={{
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)' }}>{proc.title}</span>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--lavender-bg)', color: 'var(--lavender-text)' }}>
                    {proc.category}
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Renewal Date: {proc.renewalDate || '2027-01-15'} • Status: {proc.status}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ANNUAL SPEND</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {formatINR(proc.annualCost || 120000)}
                  </div>
                </div>

                <button
                  onClick={() => navigate('/budgets')}
                  style={{
                    padding: '0.5rem 0.95rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-medium)',
                    backgroundColor: 'transparent',
                    color: 'var(--text-primary)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Review in Optimizer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
