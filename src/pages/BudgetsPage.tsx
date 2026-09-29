import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Sparkles,
  Sliders,
  DollarSign,
  ShieldCheck,
  Brain,
  History,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { VisualSignature } from '../components/VisualSignature';
import { AgentActivityTracker, AgentStepItem } from '../components/AgentActivityTracker';
import { BudgetPlanView } from '../components/BudgetPlanView';
import { BudgetPlan } from '../../server/types';
import { useAuth } from '../context/AuthContext';

export const BudgetsPage: React.FC = () => {
  const { theme } = useAuth();
  const { id } = useParams();
  const [promptInput, setPromptInput] = useState<string>('I have ₹10 lakh to establish a development team for one year.');
  const [priorityMode, setPriorityMode] = useState<'BALANCED' | 'LOWEST_COST' | 'RELIABILITY' | 'SECURITY'>('BALANCED');
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [currentPlan, setCurrentPlan] = useState<BudgetPlan | null>(null);
  const [agentSteps, setAgentSteps] = useState<AgentStepItem[]>([]);

  const handleOptimize = async (customPrompt?: string, customPriority?: 'BALANCED' | 'LOWEST_COST' | 'RELIABILITY' | 'SECURITY') => {
    const targetPrompt = customPrompt || promptInput;
    const targetPriority = customPriority || priorityMode;
    if (!targetPrompt.trim()) return;

    setIsOptimizing(true);
    try {
      const res = await fetch('/api/agent/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: targetPrompt,
          priority: targetPriority,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setCurrentPlan(json.data.plan);
        setAgentSteps(json.data.executionSteps);
      }
    } catch (err) {
      console.error('Optimization error:', err);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleApprovePlan = async (planId: string) => {
    setIsApproving(true);
    try {
      const res = await fetch(`/api/budgets/${planId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approvedBy: 'Finance & Procurement Committee' }),
      });
      const json = await res.json();
      if (json.success && currentPlan) {
        setCurrentPlan({
          ...currentPlan,
          status: 'APPROVED',
          approvedAt: new Date().toISOString(),
          approvedBy: 'Finance & Procurement Committee',
        });
      }
    } catch (err) {
      console.error('Approval failed:', err);
    } finally {
      setIsApproving(false);
    }
  };

  useEffect(() => {
    // Initial optimization baseline
    handleOptimize('I have ₹10 lakh to establish a development team for one year.', 'BALANCED');
  }, []);

  const quickPrompts = [
    { label: 'Baseline 10-Dev Team', text: 'I have ₹10 lakh to establish a development team for one year.' },
    { label: 'High Reliability Infrastructure', text: 'Setup infrastructure for 15 engineers with strict uptime and reliability (₹12 Lakh).' },
    { label: 'Austerity Budget (₹7.5L)', text: 'Reduce engineering budget to ₹7.5 lakh while maintaining essential deliverables.' },
    { label: 'Mobile Engineering Squad', text: 'Plan budget for Mobile Squad establishment (₹8 Lakh) with CI/CD.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Visual Signature Banner */}
      <VisualSignature />

      {/* Natural Language Prompt & Constraint Intake Card */}
      <div style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem',
        boxShadow: 'var(--shadow-sm)',
        transition: 'background-color 0.4s ease, border-color 0.4s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} color="var(--accent)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Enterprise Budget Requirement Intake
            </h3>
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Natural language budget with deterministic financial execution
          </span>
        </div>

        {/* Prompt Input Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleOptimize(); }} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="e.g. I have ₹10 lakh to establish a development team for one year."
              style={{
                flex: 1,
                minWidth: '280px',
                padding: '0.85rem 1.15rem',
                borderRadius: 'var(--radius-lg)',
                border: '1.5px solid var(--border-medium)',
                fontSize: '0.95rem',
                outline: 'none',
                backgroundColor: 'var(--surface-secondary)',
                color: 'var(--text-primary)',
                transition: 'var(--transition-fast)'
              }}
            />

            {/* Priority Selector */}
            <select
              value={priorityMode}
              onChange={(e) => setPriorityMode(e.target.value as any)}
              style={{
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-lg)',
                border: '1.5px solid var(--border-medium)',
                backgroundColor: 'var(--surface)',
                color: 'var(--text-primary)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              <option value="BALANCED">Priority: Balanced Value</option>
              <option value="RELIABILITY">Priority: High Reliability (SLA)</option>
              <option value="SECURITY">Priority: Enterprise Security (SOC2)</option>
              <option value="LOWEST_COST">Priority: Lowest Cost</option>
            </select>

            <button
              type="submit"
              disabled={isOptimizing}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.85rem 1.75rem',
                borderRadius: 'var(--radius-lg)',
                border: 'none',
                backgroundColor: 'var(--accent)',
                color: theme === 'light' ? '#FFFFFF' : '#2C2B30',
                fontWeight: 800,
                fontSize: '0.92rem',
                cursor: isOptimizing ? 'not-allowed' : 'pointer',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <Sparkles size={17} />
              {isOptimizing ? 'Optimizing Budget...' : 'Optimize Budget'}
            </button>
          </div>

          {/* Quick Scenarios */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Quick Scenarios:
            </span>
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPromptInput(qp.text);
                  handleOptimize(qp.text);
                }}
                style={{
                  padding: '0.25rem 0.65rem',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--surface-secondary)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
              >
                {qp.label}
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* Agent Activity Tracker */}
      {agentSteps.length > 0 && (
        <AgentActivityTracker
          steps={agentSteps}
          isOptimizing={isOptimizing}
        />
      )}

      {/* Budget Plan View */}
      {currentPlan && (
        <BudgetPlanView
          plan={currentPlan}
          onApprove={handleApprovePlan}
          isApproving={isApproving}
        />
      )}
    </div>
  );
};
