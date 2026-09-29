import React, { useState, useEffect } from 'react';
import {
  FolderKanban,
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  FileText,
  Brain,
  ShieldCheck
} from 'lucide-react';

interface ProjectsViewProps {
  onSelectProjectForOptimization: (projectName: string, budget: number) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onSelectProjectForOptimization }) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(d => {
        if (d.success) setProjects(d.data);
      })
      .catch(console.error);
  }, []);

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
            backgroundColor: 'var(--primary-brand-light)',
            color: 'var(--primary-brand)',
            padding: '0.2rem 0.5rem',
            borderRadius: 'var(--radius-sm)'
          }}>
            ORGANIZATIONAL PORTFOLIO
          </span>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Track project lifecycles, budgets, allocations, and postmortem outcomes
          </span>
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Enterprise Projects & Procurement Initiatives
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
          Inspect active engineering and infrastructure initiatives. Every completed project feeds real outcome lessons directly into Hindsight memory.
        </p>
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.25rem' }}>
        {projects.map((proj) => {
          const isCompleted = proj.status === 'COMPLETED';
          const isApproved = proj.status === 'APPROVED';

          return (
            <div
              key={proj.id}
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '0.2rem 0.5rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: isCompleted ? 'var(--bg-secondary)' : isApproved ? 'var(--mint-bg)' : 'var(--lavender-bg)',
                    color: isCompleted ? 'var(--text-secondary)' : isApproved ? 'var(--mint-text)' : 'var(--lavender-text)'
                  }}>
                    {proj.status}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {proj.duration_months} Months • {proj.team_size} Team Members
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  {proj.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '1.25rem' }}>
                  {proj.description}
                </p>

                {/* Key Numbers Bar */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.75rem',
                  padding: '0.85rem',
                  backgroundColor: 'var(--bg-card-subtle)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)' }}>TARGET BUDGET</span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {formatINR(proj.target_budget)}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: isCompleted ? 'var(--text-muted)' : 'var(--mint-text)' }}>
                      {isCompleted ? 'ACTUAL EXPENDITURE' : 'RECOMMENDED SPEND'}
                    </span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: isCompleted ? 'var(--text-primary)' : 'var(--mint-text)' }}>
                      {isCompleted ? (proj.id.includes('0001') ? '₹2,48,000' : '₹2,10,000') : '₹8,11,175'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--purple-memory)', fontWeight: 700 }}>
                  {isCompleted ? 'Outcome Retained in Hindsight' : 'Active Planning Baseline'}
                </span>
                <button
                  onClick={() => onSelectProjectForOptimization(proj.title, proj.target_budget)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    backgroundColor: 'var(--primary-brand)',
                    color: '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  <span>Open Optimizer</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
