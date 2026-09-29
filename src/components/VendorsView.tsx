import React, { useState, useEffect } from 'react';
import {
  Building2,
  ShieldCheck,
  AlertTriangle,
  Clock,
  TrendingDown,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  Info
} from 'lucide-react';
import { VendorProfile } from '../../server/types';

export const VendorsView: React.FC = () => {
  const [vendors, setVendors] = useState<VendorProfile[]>([]);
  const [selectedVendorA, setSelectedVendorA] = useState<string>('vnd-cloudcore-01');
  const [selectedVendorB, setSelectedVendorB] = useState<string>('vnd-apexcloud-02');
  const [comparisonResult, setComparisonResult] = useState<any>(null);

  useEffect(() => {
    fetch('/api/vendors')
      .then(r => r.json())
      .then(d => {
        if (d.success) setVendors(d.data);
      })
      .catch(console.error);
  }, []);

  const handleCompare = async () => {
    try {
      const res = await fetch('/api/agent/compare-vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vendorAId: selectedVendorA, vendorBId: selectedVendorB }),
      });
      const json = await res.json();
      if (json.success) {
        setComparisonResult(json.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (selectedVendorA && selectedVendorB) {
      handleCompare();
    }
  }, [selectedVendorA, selectedVendorB]);

  const formatINR = (val: number) => `₹${val.toLocaleString('en-IN')}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Header */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem',
        boxShadow: 'var(--shadow-xs)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            backgroundColor: 'var(--soft-blue-bg)',
            color: 'var(--soft-blue-text)',
            padding: '0.2rem 0.5rem',
            borderRadius: 'var(--radius-sm)'
          }}>
            TOTAL COST OF OWNERSHIP (TCO) ENGINE
          </span>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Upfront price ≠ Real economic spend
          </span>
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Enterprise Vendor Directory & TCO Evaluator
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
          Compare vendors beyond deceptive upfront quotes. Evaluate SLA guarantees, 3-year recurring expenses, maintenance buffers, and historical incident postmortems.
        </p>
      </div>

      {/* Interactive Vendor Comparison Tool */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '2px solid var(--primary-brand)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Head-to-Head Total Cost of Ownership Analyzer
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Mathematically compares initial bidding, hidden charges, support SLA, and downtime risk
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <select
              value={selectedVendorA}
              onChange={(e) => setSelectedVendorA(e.target.value)}
              style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', fontSize: '0.82rem', fontWeight: 600 }}
            >
              {vendors.map(v => <option key={v.id} value={v.id}>Vendor 1: {v.name}</option>)}
            </select>
            <select
              value={selectedVendorB}
              onChange={(e) => setSelectedVendorB(e.target.value)}
              style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', fontSize: '0.82rem', fontWeight: 600 }}
            >
              {vendors.map(v => <option key={v.id} value={v.id}>Vendor 2: {v.name}</option>)}
            </select>
          </div>
        </div>

        {comparisonResult && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem',
            padding: '1.25rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--bg-card-subtle)',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ padding: '1rem', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>VENDOR A</div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
                {comparisonResult.vendorA.name}
              </h4>
              <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem' }}>
                <div>Base Quote: <strong>{formatINR(comparisonResult.vendorA.baseQuote)}</strong></div>
                <div>3-Year TCO: <strong>{formatINR(comparisonResult.vendorA.calculatedTco3Year)}</strong></div>
                <div>Support SLA: <strong>{comparisonResult.vendorA.supportSlaHours}h</strong></div>
                <div>Reliability: <strong>{comparisonResult.vendorA.reliabilityScorePct}%</strong></div>
                <div style={{ color: 'var(--coral-text)', fontSize: '0.75rem' }}>
                  {comparisonResult.vendorA.historicalIncidentCount} Past Incidents
                </div>
              </div>
            </div>

            <div style={{ padding: '1rem', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '2px solid var(--mint-accent)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--mint-text)' }}>RECOMMENDED VENDOR B</div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
                {comparisonResult.vendorB.name}
              </h4>
              <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem' }}>
                <div>Base Quote: <strong>{formatINR(comparisonResult.vendorB.baseQuote)}</strong></div>
                <div>3-Year TCO: <strong style={{ color: 'var(--mint-text)' }}>{formatINR(comparisonResult.vendorB.calculatedTco3Year)}</strong></div>
                <div>Support SLA: <strong>{comparisonResult.vendorB.supportSlaHours}h</strong></div>
                <div>Reliability: <strong>{comparisonResult.vendorB.reliabilityScorePct}%</strong></div>
                <div style={{ color: 'var(--mint-text)', fontSize: '0.75rem' }}>
                  Only {comparisonResult.vendorB.historicalIncidentCount} Past Incident
                </div>
              </div>
            </div>

            <div style={{ gridColumn: '1 / -1', padding: '0.85rem', backgroundColor: 'var(--soft-blue-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--soft-blue-border)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--soft-blue-text)' }}>
                TCO DECISION RATIONALE
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                {comparisonResult.rationale}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Vendor Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {vendors.map((v) => (
          <div
            key={v.id}
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-xs)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-secondary)',
                  padding: '0.2rem 0.5rem',
                  borderRadius: 'var(--radius-sm)'
                }}>
                  {v.category}
                </span>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: v.reliabilityScorePct >= 99 ? 'var(--mint-text)' : 'var(--amber-text)'
                }}>
                  {v.reliabilityScorePct}% Uptime
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                {v.name}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '1rem' }}>
                {v.notes}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.65rem',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-card-subtle)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.8rem',
                marginBottom: '1rem'
              }}>
                <div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>UPFRONT BID</span>
                  <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{formatINR(v.baseQuote)}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>3-YEAR TCO</span>
                  <div style={{ fontWeight: 800, color: 'var(--primary-brand)' }}>{formatINR(v.calculatedTco3Year)}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>SUPPORT SLA</span>
                  <div style={{ fontWeight: 700 }}>{v.supportSlaHours}h Response</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>COMPLIANCE</span>
                  <div style={{ fontWeight: 700 }}>{v.securityCompliance?.join(', ') || 'Standard'}</div>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {v.historicalIncidentCount} recorded incidents
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-brand)' }}>
                Rating: {v.historicalSupportRating} / 5.0
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
