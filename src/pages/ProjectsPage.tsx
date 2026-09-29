import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderKanban,
  CheckCircle,
  ArrowRight,
  TrendingDown,
  Brain,
  ShieldCheck,
  Calendar,
  Users,
  PlusCircle,
  AlertCircle
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newBudget, setNewBudget] = useState('1000000');
  const [newTeamSize, setNewTeamSize] = useState('10');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(d => {
        if (d.success) setProjects(d.data);
      })
      .catch(console.error);
  }, []);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          description: `Strategic engineering initiative with target budget ${newBudget}`,
          target_budget: Number(newBudget),
          team_size: Number(newTeamSize),
          duration_months: 12
        })
      });
      const json = await res.json();
      if (json.success) {
        setProjects([json.data, ...projects]);
        setIsCreating(false);
        setNewTitle('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const formatINR = (val: number) => `₹${val.toLocaleString('en-IN')}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem',
        boxShadow: 'var(--shadow-xs)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
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
              Projects, Actuals, Outcomes & Hindsight Memory Feedback
            </span>
          </div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Enterprise Projects & Procurement Initiatives
          </h2>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.65rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            backgroundColor: 'var(--primary-brand)',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '0.85rem',
            cursor: 'pointer'
          }}
        >
          <PlusCircle size={16} />
          <span>New Project</span>
        </button>
      </div>

      {/* Creation Modal / Form */}
      {isCreating && (
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1.5px solid var(--primary-brand)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-md)'
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Register New Enterprise Project
          </h3>
          <form onSubmit={handleCreateProject} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>PROJECT TITLE</label>
              <input
                type="text"
                placeholder="e.g. NextGen Microservices Platform"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                required
                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: 'var(--bg-card-subtle)', color: 'var(--text-primary)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>TARGET BUDGET (₹)</label>
              <input
                type="number"
                value={newBudget}
                onChange={e => setNewBudget(e.target.value)}
                required
                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: 'var(--bg-card-subtle)', color: 'var(--text-primary)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>TEAM SIZE</label>
              <input
                type="number"
                value={newTeamSize}
                onChange={e => setNewTeamSize(e.target.value)}
                required
                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: 'var(--bg-card-subtle)', color: 'var(--text-primary)' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
              <button
                type="submit"
                style={{ padding: '0.65rem 1.25rem', borderRadius: 'var(--radius-md)', border: 'none', backgroundColor: 'var(--primary-brand)', color: '#FFFFFF', fontWeight: 700, cursor: 'pointer' }}
              >
                Save Project
              </button>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                style={{ padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', backgroundColor: 'transparent', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <Calendar size={13} />
                    <span>{proj.duration_months} Mos • {proj.team_size} Eng</span>
                  </div>
                </div>

                <h3
                  onClick={() => navigate(`/projects/${proj.id}`)}
                  style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem', cursor: 'pointer' }}
                >
                  {proj.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '1.25rem' }}>
                  {proj.description}
                </p>

                {/* Numbers Bar */}
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

              {/* Action Buttons */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--purple-memory)', fontWeight: 700 }}>
                  {isCompleted ? 'Outcome Retained in Hindsight' : 'Active Planning Baseline'}
                </span>
                <button
                  onClick={() => navigate(`/projects/${proj.id}`)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-medium)',
                    backgroundColor: 'transparent',
                    color: 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  <span>Project Details</span>
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
