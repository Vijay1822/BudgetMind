import React, { useState, useEffect } from 'react';
import {
  Brain,
  Database,
  History,
  TrendingDown,
  ArrowRight,
  ShieldCheck,
  PlusCircle,
  CheckCircle2,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { HindsightMemoryItem } from '../../server/types';

export const MemoryPage: React.FC = () => {
  const [memories, setMemories] = useState<HindsightMemoryItem[]>([]);
  const [isRetaining, setIsRetaining] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Cloud' | 'Hardware' | 'Software' | 'Vendor' | 'Maintenance'>('Cloud');
  const [newProject, setNewProject] = useState('Production Microservices Deployment');
  const [newLesson, setNewLesson] = useState('');
  const [newImpact, setNewImpact] = useState('+₹25,000 contingency');
  const [newRule, setNewRule] = useState('Apply 20% egress buffer on cloud accounts');

  const fetchMemories = () => {
    fetch('/api/hindsight/memories')
      .then(r => r.json())
      .then(d => {
        if (d.success) setMemories(d.data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  const handleRetain = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newLesson.trim()) return;

    try {
      const res = await fetch('/api/hindsight/retain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          category: newCategory,
          sourceProject: newProject,
          lessonText: newLesson,
          quantitativeImpact: newImpact,
          financialRule: newRule,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setIsRetaining(false);
        setNewTitle('');
        setNewLesson('');
        fetchMemories();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem',
        border: '1px solid var(--border-subtle)',
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
              backgroundColor: 'var(--purple-memory-bg)',
              color: 'var(--purple-memory)',
              padding: '0.2rem 0.5rem',
              borderRadius: 'var(--radius-sm)'
            }}>
              LONG-TERM ORGANIZATIONAL MEMORY
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Powered by Hindsight Long-Term Memory Service
            </span>
          </div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Hindsight Memory Bank & Feedback Graph
          </h2>
        </div>

        <button
          onClick={() => setIsRetaining(!isRetaining)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.65rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            backgroundColor: 'var(--purple-memory)',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '0.85rem',
            cursor: 'pointer'
          }}
        >
          <PlusCircle size={16} />
          <span>Retain New Lesson</span>
        </button>
      </div>

      {/* Visual Memory Graph (Section 43) */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.75rem',
        border: '1px solid var(--purple-memory-border)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <Brain size={18} color="var(--purple-memory)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Bi-Directional Learning Flow (How Memory Influences Budgets)
          </h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          alignItems: 'center'
        }}>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>PAST PROJECT</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>AlphaCloud Audit</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--coral-text)', marginTop: '0.25rem' }}>+24% Overrun (Egress)</div>
          </div>

          <div style={{ textAlign: 'center', color: 'var(--purple-memory)' }}>➔</div>

          <div style={{ padding: '1rem', backgroundColor: 'var(--purple-memory-bg)', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--purple-memory-border)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--purple-memory)', fontWeight: 800 }}>HINDSIGHT BANK</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--purple-memory)', marginTop: '0.2rem' }}>Lesson Synthesized</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Egress & Weekend Idle Rule</div>
          </div>

          <div style={{ textAlign: 'center', color: 'var(--purple-memory)' }}>➔</div>

          <div style={{ padding: '1rem', backgroundColor: 'var(--mint-bg)', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--mint-border)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--mint-text)', fontWeight: 800 }}>ACTIVE PROJECT</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--mint-text)', marginTop: '0.2rem' }}>Engineering Squad</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--mint-text)', marginTop: '0.25rem' }}>+₹20k Sized Contingency</div>
          </div>
        </div>
      </div>

      {/* Before Memory vs After Memory Influence Card (Section 44) */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem',
        border: '1px solid var(--border-subtle)'
      }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
          Memory Influence Showcase (Before vs After Recall)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)' }}>BEFORE MEMORY RECALL</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.25rem 0' }}>
              Cloud: ₹1,20,000
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
              Naive vendor estimate without egress monitoring or weekend idle compute buffer.
            </p>
          </div>

          <div style={{ padding: '1.25rem', backgroundColor: 'var(--purple-memory-bg)', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--purple-memory-border)' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--purple-memory)' }}>AFTER HINDSIGHT RECALL</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--purple-memory)', margin: '0.25rem 0' }}>
              Cloud: ₹1,40,000 (+₹20k Contingency)
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-primary)', margin: 0 }}>
              Reason: Project AlphaCloud experienced 24% overrun. Automatically injected evidence-backed reserve.
            </p>
          </div>
        </div>
      </div>

      {/* Retain Lesson Modal / Form */}
      {isRetaining && (
        <div style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem',
          border: '2px solid var(--purple-memory)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Retain New Procurement Experience in Hindsight
          </h3>
          <form onSubmit={handleRetain} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>LESSON TITLE</label>
              <input
                type="text"
                placeholder="e.g. Storage IOPS Underestimated"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                required
                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: 'var(--bg-card-subtle)', color: 'var(--text-primary)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>CATEGORY</label>
              <select
                value={newCategory}
                onChange={e => setNewCategory(e.target.value as any)}
                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: 'var(--bg-card-subtle)', color: 'var(--text-primary)' }}
              >
                <option value="Cloud">Cloud</option>
                <option value="Software">Software</option>
                <option value="Hardware">Hardware</option>
                <option value="Vendor">Vendor</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>OBSERVATION & LESSON</label>
              <textarea
                placeholder="e.g. Database storage provisioned without auto-scaling hit maximum threshold during peak quarter."
                value={newLesson}
                onChange={e => setNewLesson(e.target.value)}
                rows={2}
                required
                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: 'var(--bg-card-subtle)', color: 'var(--text-primary)' }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setIsRetaining(false)}
                style={{ padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', backgroundColor: 'transparent', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ padding: '0.65rem 1.4rem', borderRadius: 'var(--radius-md)', border: 'none', backgroundColor: 'var(--purple-memory)', color: '#FFFFFF', fontWeight: 800, cursor: 'pointer' }}
              >
                Retain Memory
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Memory Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
        {memories.map((m) => (
          <div
            key={m.id}
            style={{
              padding: '1.5rem',
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--purple-memory-border)',
              boxShadow: 'var(--shadow-xs)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--purple-memory)', backgroundColor: 'var(--purple-memory-bg)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
                  {m.category}
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {m.sourceProject}
                </span>
              </div>

              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                {m.title}
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '1rem' }}>
                {m.lessonText}
              </p>

              <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.78rem', marginBottom: '0.75rem' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Quantitative Impact:</strong>
                <div style={{ color: 'var(--mint-text)', fontWeight: 700, marginTop: '0.15rem' }}>
                  {m.quantitativeImpact}
                </div>
              </div>

              <div style={{ padding: '0.75rem', backgroundColor: 'var(--lavender-bg)', borderRadius: 'var(--radius-md)', fontSize: '0.78rem' }}>
                <strong style={{ color: 'var(--lavender-text)' }}>Financial Engine Rule:</strong>
                <div style={{ color: 'var(--lavender-text)', marginTop: '0.15rem' }}>
                  {m.financialRule}
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              <span>Memory Bank Verified</span>
              <span style={{ color: 'var(--purple-memory)', fontWeight: 700 }}>Hindsight Active</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
