import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, CheckCircle2, ArrowRight, Sparkles, Building, User, Users, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ThemeSwitch } from '../components/theme/ThemeSwitch';

export const OnboardingPage: React.FC = () => {
  const { user, theme } = useAuth();
  const navigate = useNavigate();
  const [orgName, setOrgName] = useState(user?.organization || 'Apex Global Enterprises');
  const [role, setRole] = useState(user?.role || 'Finance & Procurement Director');
  const [orgSize, setOrgSize] = useState('50-250');
  const [primaryUseCase, setPrimaryUseCase] = useState('Hardware & Cloud Optimization');

  const useCases = [
    { id: 'Hardware & Cloud Optimization', label: 'Hardware & Cloud Optimization', desc: 'Prevent cloud egress overruns and rightsizing developer workstations' },
    { id: 'SaaS License Harvesting', label: 'SaaS License Harvesting', desc: 'Detect unused seats (Jira, Slack, GitHub) and eliminate duplicate tools' },
    { id: 'Vendor Contract Comparison & TCO', label: 'Vendor Contract Comparison & TCO', desc: 'Evaluate true 3-year TCO, SLA guarantees, and hidden maintenance fees' },
    { id: 'Organizational Memory & Auditing', label: 'Organizational Memory & Auditing', desc: 'Retain procurement outcomes in Hindsight to prevent repeating past budget mistakes' },
  ];

  const handleCreateWorkspace = () => {
    navigate('/dashboard');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--background)',
      color: 'var(--text-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      transition: 'background-color 0.4s ease, color 0.4s ease'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '680px',
        backgroundColor: 'var(--surface)',
        borderRadius: 'var(--radius-xl)',
        border: '1.5px solid var(--border-medium)',
        padding: '2.5rem',
        boxShadow: 'var(--shadow-xl)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.75rem',
      }}>
        {/* Step Indicator Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme === 'light' ? '#FFFFFF' : '#2C2B30'
            }}>
              <Brain size={20} />
            </div>
            <div>
              <span style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-primary)' }}>BudgetMind Workspace Setup</span>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Tailor financial intelligence to your team</div>
            </div>
          </div>
          <ThemeSwitch compact />
        </div>

        <div>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase' }}>
            ORGANIZATION & PROFILE
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0.25rem 0 0.4rem', color: 'var(--text-primary)' }}>
            Tell us about your organization
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            BudgetMind configures your baseline organizational repository and constraint models based on your team profile.
          </p>
        </div>

        {/* Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              Organization Name
            </label>
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="e.g. Acme Corp"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--border-medium)',
                backgroundColor: 'var(--surface-secondary)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                Your Role
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Finance Director"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-medium)',
                  backgroundColor: 'var(--surface-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                Organization Size
              </label>
              <select
                value={orgSize}
                onChange={(e) => setOrgSize(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-medium)',
                  backgroundColor: 'var(--surface)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                <option value="1-15">1-15 employees (Early Stage)</option>
                <option value="16-50">16-50 employees (Growth)</option>
                <option value="50-250">50-250 employees (Mid-Market)</option>
                <option value="250-1000">250-1000 employees (Scale-Up)</option>
                <option value="1000+">1000+ employees (Enterprise)</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Primary Budgeting Use Case
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {useCases.map((uc) => (
                <div
                  key={uc.id}
                  onClick={() => setPrimaryUseCase(uc.id)}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: primaryUseCase === uc.id ? 'var(--surface-elevated)' : 'var(--surface-secondary)',
                    border: `1.5px solid ${primaryUseCase === uc.id ? 'var(--accent)' : 'var(--border-subtle)'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>{uc.label}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>{uc.desc}</div>
                  </div>
                  {primaryUseCase === uc.id && (
                    <CheckCircle2 size={18} color="var(--accent)" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button: Create Workspace */}
        <button
          onClick={handleCreateWorkspace}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            width: '100%',
            padding: '0.9rem',
            borderRadius: 'var(--radius-lg)',
            border: 'none',
            backgroundColor: 'var(--accent)',
            color: theme === 'light' ? '#FFFFFF' : '#2C2B30',
            fontWeight: 800,
            fontSize: '0.95rem',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-xs)',
            transition: 'all 0.2s ease',
          }}
        >
          Create Workspace & Enter BudgetMind
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
