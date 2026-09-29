import React, { useState, useEffect } from 'react';
import {
  Database,
  History,
  CheckCircle,
  AlertTriangle,
  Send,
  Sparkles,
  Layers,
  ArrowRight,
  Info,
  Server
} from 'lucide-react';
import { MemoryLesson, ExistingResource, HistoricalSpendingRecord } from '../../server/types';

interface MemoryBankViewProps {
  hindsightStatus: {
    isConnected: boolean;
    source: string;
    bankId: string;
    baseUrl: string;
    memoryCount: number;
    lastError?: string | null;
  };
}

export const MemoryBankView: React.FC<MemoryBankViewProps> = ({ hindsightStatus }) => {
  const [activeSection, setActiveSection] = useState<'lessons' | 'resources' | 'history' | 'retain'>('lessons');
  const [lessons, setLessons] = useState<MemoryLesson[]>([]);
  const [resources, setResources] = useState<ExistingResource[]>([]);
  const [history, setHistory] = useState<HistoricalSpendingRecord[]>([]);

  // Retain form
  const [newLessonText, setNewLessonText] = useState('');
  const [newCategory, setNewCategory] = useState('Software');
  const [newProject, setNewProject] = useState('Active Procurement Audit');
  const [newImpact, setNewImpact] = useState('Saved ₹35,000 via license reallocation');
  const [isRetaining, setIsRetaining] = useState(false);
  const [retainSuccess, setRetainSuccess] = useState(false);

  const loadData = async () => {
    try {
      const [memRes, resRes, histRes] = await Promise.all([
        fetch('/api/hindsight/memories'),
        fetch('/api/resources'),
        fetch('/api/history'),
      ]);
      const memJson = await memRes.json();
      const resJson = await resRes.json();
      const histJson = await histRes.json();

      if (memJson.success) setLessons(memJson.data);
      if (resJson.success) setResources(resJson.data);
      if (histJson.success) setHistory(histJson.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRetainSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonText.trim()) return;

    setIsRetaining(true);
    setRetainSuccess(false);
    try {
      const res = await fetch('/api/hindsight/retain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newLessonText,
          category: newCategory,
          sourceProject: newProject,
          quantitativeImpact: newImpact,
          financialRule: 'Deduct identified surplus from future proposals',
          tags: ['custom', newCategory.toLowerCase()],
        }),
      });
      const json = await res.json();
      if (json.success) {
        setRetainSuccess(true);
        setNewLessonText('');
        loadData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsRetaining(false);
    }
  };

  const formatINR = (val: number) => `₹${val.toLocaleString('en-IN')}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Hindsight Diagnostics Banner */}
      <div style={{
        backgroundColor: 'var(--purple-memory-bg)',
        border: '1px solid var(--purple-memory-border)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem',
        boxShadow: 'var(--shadow-xs)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Database size={18} color="var(--purple-memory)" />
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--purple-memory)', textTransform: 'uppercase' }}>
                HINDSIGHT MEMORY ARCHITECTURE
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Organizational Memory Bank & Evidence Store
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Persistent biomimetic memory retaining every procurement outcome, SLA incident, and license utilization pattern.
            </p>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.65rem 1rem',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--purple-memory-border)',
            boxShadow: 'var(--shadow-xs)'
          }}>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: hindsightStatus.isConnected ? 'var(--mint-accent)' : 'var(--purple-memory)'
            }} />
            <div style={{ fontSize: '0.78rem' }}>
              <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>
                {hindsightStatus.isConnected ? 'Connected to Hindsight Cloud' : 'Local Enterprise Memory Store'}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                Bank ID: <code>{hindsightStatus.bankId}</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-navigation tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-subtle)',
        gap: '0.5rem'
      }}>
        <button
          onClick={() => setActiveSection('lessons')}
          style={{
            padding: '0.6rem 1.15rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            borderRadius: 'var(--radius-md)',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: activeSection === 'lessons' ? 'var(--bg-card)' : 'transparent',
            color: activeSection === 'lessons' ? 'var(--primary-brand)' : 'var(--text-secondary)',
            borderBottom: activeSection === 'lessons' ? '2px solid var(--primary-brand)' : 'none'
          }}
        >
          Retained Lessons ({lessons.length})
        </button>

        <button
          onClick={() => setActiveSection('resources')}
          style={{
            padding: '0.6rem 1.15rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            borderRadius: 'var(--radius-md)',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: activeSection === 'resources' ? 'var(--bg-card)' : 'transparent',
            color: activeSection === 'resources' ? 'var(--primary-brand)' : 'var(--text-secondary)',
            borderBottom: activeSection === 'resources' ? '2px solid var(--primary-brand)' : 'none'
          }}
        >
          Active License Inventory (Harvesting Pool)
        </button>

        <button
          onClick={() => setActiveSection('history')}
          style={{
            padding: '0.6rem 1.15rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            borderRadius: 'var(--radius-md)',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: activeSection === 'history' ? 'var(--bg-card)' : 'transparent',
            color: activeSection === 'history' ? 'var(--primary-brand)' : 'var(--text-secondary)',
            borderBottom: activeSection === 'history' ? '2px solid var(--primary-brand)' : 'none'
          }}
        >
          Historical Project Overruns & Audits
        </button>

        <button
          onClick={() => setActiveSection('retain')}
          style={{
            padding: '0.6rem 1.15rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            borderRadius: 'var(--radius-md)',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: activeSection === 'retain' ? 'var(--bg-card)' : 'transparent',
            color: activeSection === 'retain' ? 'var(--primary-brand)' : 'var(--text-secondary)',
            borderBottom: activeSection === 'retain' ? '2px solid var(--primary-brand)' : 'none'
          }}
        >
          + Retain New Memory
        </button>
      </div>

      {/* Section 1: Retained Lessons */}
      {activeSection === 'lessons' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
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
                    textTransform: 'uppercase',
                    backgroundColor: 'var(--purple-memory-bg)',
                    color: 'var(--purple-memory)',
                    padding: '0.15rem 0.45rem',
                    borderRadius: 'var(--radius-sm)'
                  }}>
                    {lesson.category}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Confidence: {Math.round(lesson.confidence * 100)}%
                  </span>
                </div>

                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  {lesson.title}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '0.75rem' }}>
                  {lesson.lessonText}
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Impact: <span style={{ color: 'var(--mint-text)' }}>{lesson.quantitativeImpact}</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Source: {lesson.sourceProject}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Section 2: Active License Inventory */}
      {activeSection === 'resources' && (
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Active Organizational Subscriptions & Unused Capacity
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
              The BudgetMind agent audits this inventory before approving any new software purchase order.
            </p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)' }}>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>RESOURCE NAME</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>TOTAL CAPACITY</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>ACTIVE USED</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>UNUSED (HARVESTABLE)</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>UNIT COST / YR</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>RENEWAL DATE</th>
                </tr>
              </thead>
              <tbody>
                {resources.map((res) => (
                  <tr key={res.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {res.name}
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 400 }}>{res.notes}</div>
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>{res.totalQuantity}</td>
                    <td style={{ padding: '0.85rem 1rem' }}>{res.activeUsed}</td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        backgroundColor: res.unusedQuantity > 0 ? 'var(--mint-bg)' : 'var(--bg-secondary)',
                        color: res.unusedQuantity > 0 ? 'var(--mint-text)' : 'var(--text-muted)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-full)'
                      }}>
                        {res.unusedQuantity} Available Seats
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>
                      {formatINR(res.costPerUnitAnnual)}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>
                      {res.renewalDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Section 3: Historical Project Overruns */}
      {activeSection === 'history' && (
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Historical Project Spending Records & Root Causes
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
              These records provide the exact mathematical proof used to calculate contingency and prevent false economies.
            </p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)' }}>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>PROJECT</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>CATEGORY</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>PLANNED</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>ACTUAL</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>VARIANCE</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>ROOT CAUSE & EVIDENCE</th>
                </tr>
              </thead>
              <tbody>
                {history.map((record) => (
                  <tr key={record.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {record.project} ({record.year})
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>{record.category}</td>
                    <td style={{ padding: '0.85rem 1rem' }}>{formatINR(record.plannedCost)}</td>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>{formatINR(record.actualCost)}</td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        color: record.variancePercentage > 0 ? '#DC2626' : 'var(--mint-text)',
                        backgroundColor: record.variancePercentage > 0 ? 'var(--coral-bg)' : 'var(--mint-bg)',
                        padding: '0.15rem 0.5rem',
                        borderRadius: 'var(--radius-full)'
                      }}>
                        {record.variancePercentage > 0 ? `+${record.variancePercentage}%` : `${record.variancePercentage}%`}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ color: 'var(--text-primary)' }}>{record.rootCause}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--purple-memory)', marginTop: '0.15rem', fontFamily: 'monospace' }}>
                        Ref: {record.evidenceRef}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Section 4: Retain New Memory Form */}
      {activeSection === 'retain' && (
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem',
          maxWidth: '680px',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            Retain New Organizational Lesson
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Store postmortem outcomes, negotiated vendor rates, or license audit insights permanently in Hindsight.
          </p>

          <form onSubmit={handleRetainSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                Lesson / Observation Description
              </label>
              <textarea
                value={newLessonText}
                onChange={(e) => setNewLessonText(e.target.value)}
                placeholder="e.g. Dedicated CI/CD runners incurred 18% overage because builds ran without caching."
                rows={4}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-medium)',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-medium)',
                    fontSize: '0.85rem'
                  }}
                >
                  <option value="Cloud">Cloud</option>
                  <option value="Software">Software</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Security">Security</option>
                  <option value="Training">Training</option>
                  <option value="Vendor">Vendor</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                  Source Project
                </label>
                <input
                  type="text"
                  value={newProject}
                  onChange={(e) => setNewProject(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-medium)',
                    fontSize: '0.85rem'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                Quantitative Financial Impact
              </label>
              <input
                type="text"
                value={newImpact}
                onChange={(e) => setNewImpact(e.target.value)}
                placeholder="e.g. ₹42,000 avoidable cost overage"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-medium)',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isRetaining}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--purple-memory)',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: isRetaining ? 'not-allowed' : 'pointer',
                marginTop: '0.5rem'
              }}
            >
              <Send size={16} />
              {isRetaining ? 'Retaining to Hindsight Memory...' : 'Retain Lesson in Hindsight'}
            </button>

            {retainSuccess && (
              <div style={{
                padding: '0.75rem',
                backgroundColor: 'var(--mint-bg)',
                color: 'var(--mint-text)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.82rem',
                fontWeight: 600
              }}>
                ✓ Lesson successfully retained! Future budget agents will recall this knowledge.
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};
