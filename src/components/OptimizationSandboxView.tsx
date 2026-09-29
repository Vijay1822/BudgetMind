import React, { useState, useEffect } from 'react';
import {
  Sliders,
  DollarSign,
  Users,
  Calendar,
  Shield,
  Layers,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Info
} from 'lucide-react';
import { WhatIfScenarioResult } from '../../server/types';

export const OptimizationSandboxView: React.FC = () => {
  // Sandbox Controls
  const [targetBudget, setTargetBudget] = useState<number>(800000);
  const [teamSize, setTeamSize] = useState<number>(10);
  const [durationMonths, setDurationMonths] = useState<number>(12);
  const [priority, setPriority] = useState<'BALANCED' | 'LOWEST_COST' | 'RELIABILITY' | 'SECURITY'>('BALANCED');
  const [vendorPref, setVendorPref] = useState<'CHEAPEST' | 'RELIABLE' | 'HYBRID'>('RELIABLE');
  const [reuseResources, setReuseResources] = useState<boolean>(true);

  // Scenarios State
  const [scenarios, setScenarios] = useState<{
    scenarioA: WhatIfScenarioResult;
    scenarioB: WhatIfScenarioResult;
    scenarioC: WhatIfScenarioResult;
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const runSimulation = async () => {
    setIsCalculating(true);
    try {
      const res = await fetch('/api/agent/whatif', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          baseAvailableBudget: 1000000,
          targetBudgetLimit: targetBudget,
          teamSize,
          durationMonths,
          priority,
          vendorPreference: vendorPref,
          reuseExistingResources: reuseResources,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setScenarios(json.data);
      }
    } catch (err) {
      console.error('Sandbox calculation error:', err);
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    runSimulation();
  }, [targetBudget, teamSize, durationMonths, priority, vendorPref, reuseResources]);

  const formatINR = (val: number) => `₹${val.toLocaleString('en-IN')}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner */}
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
            DEDICATED EXPLORATORY WORKSPACE
          </span>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Never automatically updates the approved organizational baseline
          </span>
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Optimization Sandbox & Scenario Simulator
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
          Simulate what-if parameters in real time. Evaluate trade-offs between cost reduction, requirement coverage, and operational risk.
        </p>
      </div>

      {/* Interactive Sliders & Controls Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem'
      }}>
        {/* Target Budget Slider */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Target Budget Limit
            </span>
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary-brand)' }}>
              {formatINR(targetBudget)}
            </span>
          </div>
          <input
            type="range"
            min={600000}
            max={1500000}
            step={25000}
            value={targetBudget}
            onChange={(e) => setTargetBudget(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary-brand)', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            <span>₹6L (Austerity)</span>
            <span>₹10L (Baseline)</span>
            <span>₹15L (Expansion)</span>
          </div>
        </div>

        {/* Team Size Slider */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Team Size (Developers)
            </span>
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {teamSize} Engineers
            </span>
          </div>
          <input
            type="range"
            min={5}
            max={30}
            step={1}
            value={teamSize}
            onChange={(e) => setTeamSize(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary-brand)', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            <span>5 devs</span>
            <span>15 devs</span>
            <span>30 devs</span>
          </div>
        </div>

        {/* Duration Slider */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Duration
            </span>
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {durationMonths} Months
            </span>
          </div>
          <input
            type="range"
            min={6}
            max={24}
            step={3}
            value={durationMonths}
            onChange={(e) => setDurationMonths(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary-brand)', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            <span>6 mos</span>
            <span>12 mos</span>
            <span>24 mos</span>
          </div>
        </div>

        {/* Priority & License Mode */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          boxShadow: 'var(--shadow-xs)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <div>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
              Strategic Priority
            </span>
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {(['BALANCED', 'LOWEST_COST', 'RELIABILITY', 'SECURITY'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  style={{
                    padding: '0.3rem 0.6rem',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    borderRadius: 'var(--radius-sm)',
                    border: priority === p ? '2px solid var(--primary-brand)' : '1px solid var(--border-subtle)',
                    backgroundColor: priority === p ? 'var(--primary-brand-light)' : 'var(--bg-secondary)',
                    color: priority === p ? 'var(--primary-brand)' : 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
            <input
              type="checkbox"
              id="reuse-toggle"
              checked={reuseResources}
              onChange={(e) => setReuseResources(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            <label htmlFor="reuse-toggle" style={{ fontSize: '0.78rem', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 600 }}>
              Harvest & Reuse Existing Inactive Licenses (Jira/Slack)
            </label>
          </div>
        </div>
      </div>

      {/* Comparative Scenarios Output (A vs B vs C) */}
      {scenarios && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.25rem'
        }}>
          {/* Scenario A: Full Target Allocation */}
          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-xs)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                SCENARIO A
              </span>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)' }}>
                LOW RISK (FULL SPEND)
              </span>
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Full Target Allocation
            </h3>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.5rem 0' }}>
              {formatINR(scenarios.scenarioA.estimatedCost)}
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Requirement Coverage: <strong>{scenarios.scenarioA.requirementCoveragePct}%</strong>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                KEY TRADE-OFFS
              </span>
              <ul style={{ paddingLeft: '1.1rem', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.35rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {scenarios.scenarioA.keyTradeOffs.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Scenario B: BudgetMind Recommended */}
          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '2px solid var(--mint-accent)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.12)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--mint-text)', textTransform: 'uppercase' }}>
                SCENARIO B (RECOMMENDED)
              </span>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, backgroundColor: 'var(--mint-bg)', color: 'var(--mint-text)', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)' }}>
                OPTIMAL VALUE
              </span>
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              BudgetMind Recommended
            </h3>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--mint-text)', margin: '0.5rem 0' }}>
              {formatINR(scenarios.scenarioB.estimatedCost)}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              <span>Coverage: <strong>{scenarios.scenarioB.requirementCoveragePct}%</strong></span>
              <span style={{ color: 'var(--mint-text)', fontWeight: 700 }}>
                Est. Savings: {formatINR(scenarios.scenarioB.potentialSavings)}
              </span>
            </div>

            <div style={{ borderTop: '1px solid var(--mint-border)', paddingTop: '0.75rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--mint-text)', textTransform: 'uppercase' }}>
                OPTIMIZATION FACTORS
              </span>
              <ul style={{ paddingLeft: '1.1rem', fontSize: '0.75rem', color: 'var(--text-primary)', marginTop: '0.35rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {scenarios.scenarioB.keyTradeOffs.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Scenario C: Aggressive Cost Reduction */}
          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--amber-border)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-xs)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--amber-text)', textTransform: 'uppercase' }}>
                SCENARIO C
              </span>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, backgroundColor: 'var(--amber-bg)', color: 'var(--amber-text)', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)' }}>
                HIGH OPERATIONAL RISK
              </span>
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Aggressive Cost Reduction
            </h3>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--amber-text)', margin: '0.5rem 0' }}>
              {formatINR(scenarios.scenarioC.estimatedCost)}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              <span>Coverage: <strong style={{ color: 'var(--coral-text)' }}>{scenarios.scenarioC.requirementCoveragePct}%</strong></span>
              <span style={{ color: 'var(--text-muted)' }}>Underfunded essential</span>
            </div>

            <div style={{ borderTop: '1px solid var(--amber-border)', paddingTop: '0.75rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--amber-text)', textTransform: 'uppercase' }}>
                AFFECTED REQUIREMENTS & RISKS
              </span>
              <ul style={{ paddingLeft: '1.1rem', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.35rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {scenarios.scenarioC.keyTradeOffs.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
