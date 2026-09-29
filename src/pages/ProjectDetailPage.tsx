import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FolderKanban,
  CheckCircle2,
  Brain,
  ShieldCheck,
  TrendingDown,
  DollarSign,
  Calendar,
  Users,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [isRecordingOutcome, setIsRecordingOutcome] = useState(false);
  const [actualSpend, setActualSpend] = useState('248000');
  const [varianceText, setVarianceText] = useState('Cloud usage was underestimated by 24% due to weekend compute.');
  const [lessonTitle, setLessonTitle] = useState('Weekend Compute Idle Shutdown Required');
  const [isRetaining, setIsRetaining] = useState(false);
  const [retainedSuccess, setRetainedSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          const found = d.data.find((p: any) => p.id === id) || d.data[0];
          setProject(found);
        }
      })
      .catch(console.error);
  }, [id]);

  const handleRetainOutcome = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRetaining(true);
    try {
      const res = await fetch('/api/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: lessonTitle,
          category: 'Cloud',
          sourceProject: project?.title || 'Engineering Project',
          lessonText: varianceText,
          quantitativeImpact: '+₹20,000 contingency adjustment',
          financialRule: 'Apply 18% cloud contingency and auto-shutdown idle dev clusters.'
        })
      });
      const json = await res.json();
      if (json.success) {
        setRetainedSuccess(true);
        setTimeout(() => setIsRecordingOutcome(false), 2000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsRetaining(false);
    }
  };

  const formatINR = (val: number) => `₹${val.toLocaleString('en-IN')}`;

  if (!project) {
    return <div style={{ color: 'var(--text-muted)' }}>Loading project details...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/projects')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.4rem 0.85rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            backgroundColor: 'transparent',
            color: 'var(--text-secondary)',
            fontSize: '0.8rem',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={14} />
          <span>Back to Projects</span>
        </button>
      </div>

      {/* Project Overview Card */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--mint-bg)',
                color: 'var(--mint-text)'
              }}>
                {project.status}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                ID: {project.id}
              </span>
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              {project.title}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.35rem', maxWidth: '700px' }}>
              {project.description}
            </p>
          </div>

          <button
            onClick={() => setIsRecordingOutcome(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.7rem 1.35rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--purple-memory-border)',
              backgroundColor: 'var(--purple-memory-bg)',
              color: 'var(--purple-memory)',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            <Brain size={16} />
            <span>Record Outcome & Retain Lesson</span>
          </button>
        </div>

        {/* 4 Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>TARGET BUDGET</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>{formatINR(project.target_budget)}</div>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--mint-text)' }}>RECOMMENDED SPEND</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--mint-text)' }}>₹8,11,175</div>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--lavender-text)' }}>PRESERVED RESERVE</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--lavender-text)' }}>₹1,88,825</div>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>TEAM & DURATION</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>{project.team_size} Eng • {project.duration_months} Mos</div>
          </div>
        </div>
      </div>

      {/* Record Outcome Modal / Section */}
      {isRecordingOutcome && (
        <div style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem',
          border: '2px solid var(--purple-memory)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Brain size={18} color="var(--purple-memory)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Synthesize Postmortem Outcome into Hindsight Memory
            </h3>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Transform actual spending variance into a reusable organizational procurement lesson.
          </p>

          <form onSubmit={handleRetainOutcome} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                LESSON TITLE
              </label>
              <input
                type="text"
                value={lessonTitle}
                onChange={e => setLessonTitle(e.target.value)}
                required
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: 'var(--bg-card-subtle)', color: 'var(--text-primary)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                AUDITED VARIANCE & ROOT CAUSE ANALYSIS
              </label>
              <textarea
                value={varianceText}
                onChange={e => setVarianceText(e.target.value)}
                rows={3}
                required
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: 'var(--bg-card-subtle)', color: 'var(--text-primary)' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', alignItems: 'center' }}>
              {retainedSuccess && (
                <span style={{ fontSize: '0.8rem', color: 'var(--mint-text)', fontWeight: 700 }}>
                  ✓ Successfully Retained into Hindsight Bank!
                </span>
              )}
              <button
                type="button"
                onClick={() => setIsRecordingOutcome(false)}
                style={{ padding: '0.65rem 1.15rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', backgroundColor: 'transparent', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isRetaining}
                style={{
                  padding: '0.65rem 1.4rem',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  backgroundColor: 'var(--purple-memory)',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  cursor: isRetaining ? 'not-allowed' : 'pointer'
                }}
              >
                {isRetaining ? 'Retaining to Hindsight...' : 'Retain to Hindsight'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
