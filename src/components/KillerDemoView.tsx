import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Play,
  SkipForward,
  RotateCcw,
  Sparkles,
  Brain,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  History,
  ShieldCheck,
  ArrowRight,
  Database,
  DollarSign,
  Cpu
} from 'lucide-react';
import { DemoSceneData } from '../../server/routes/demoRoutes';

export const KillerDemoView: React.FC = () => {
  const [currentSceneNum, setCurrentSceneNum] = useState<number>(1);
  const [sceneData, setSceneData] = useState<DemoSceneData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAutoplaying, setIsAutoplaying] = useState<boolean>(false);

  const fetchScene = async (sceneNum: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/demo/scene/${sceneNum}`);
      const json = await res.json();
      if (json.success) {
        setSceneData(json.data);
        setCurrentSceneNum(sceneNum);

        // Celebration confetti on Scene 11 (the payoff!)
        if (sceneNum === 11) {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#7C3AED', '#10B981', '#4F46E5']
          });
        }
      }
    } catch (err) {
      console.error('Failed to load demo scene:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchScene(currentSceneNum);
  }, []);

  // Autoplay handler
  useEffect(() => {
    let timer: any;
    if (isAutoplaying && currentSceneNum < 11) {
      timer = setTimeout(() => {
        fetchScene(currentSceneNum + 1);
      }, 5500);
    } else if (currentSceneNum >= 11) {
      setIsAutoplaying(false);
    }
    return () => clearTimeout(timer);
  }, [isAutoplaying, currentSceneNum]);

  const handleNext = () => {
    if (currentSceneNum < 11) {
      fetchScene(currentSceneNum + 1);
    }
  };

  const handlePrev = () => {
    if (currentSceneNum > 1) {
      fetchScene(currentSceneNum - 1);
    }
  };

  const handleReset = async () => {
    try {
      await fetch('/api/demo/reset', { method: 'POST' });
      setIsAutoplaying(false);
      fetchScene(1);
    } catch (e) {
      console.error(e);
    }
  };

  const formatINR = (val?: number) => val !== undefined ? `₹${val.toLocaleString('en-IN')}` : '₹0';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Demo Controller & Stepper */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.25rem 1.5rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1rem',
          paddingBottom: '0.75rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                backgroundColor: '#EDE9FE',
                color: '#6D28D9',
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-sm)'
              }}>
                JUDGE DEMO MODE (/demo)
              </span>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {sceneData ? sceneData.title : 'Loading Scene...'}
              </h2>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
              {sceneData?.subtitle}
            </p>
          </div>

          {/* Stepper Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => setIsAutoplaying(!isAutoplaying)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.85rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                cursor: 'pointer',
                backgroundColor: isAutoplaying ? '#FEF2F2' : 'var(--bg-card)',
                color: isAutoplaying ? '#DC2626' : 'var(--text-primary)'
              }}
            >
              <Play size={14} />
              {isAutoplaying ? 'Pause Autoplay' : 'Autoplay Demo'}
            </button>

            <button
              onClick={handlePrev}
              disabled={currentSceneNum <= 1}
              style={{
                padding: '0.45rem 0.85rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                cursor: currentSceneNum <= 1 ? 'not-allowed' : 'pointer',
                backgroundColor: 'var(--bg-card)',
                color: currentSceneNum <= 1 ? 'var(--text-light)' : 'var(--text-primary)'
              }}
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={currentSceneNum >= 11}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 1.15rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-md)',
                border: 'none',
                cursor: currentSceneNum >= 11 ? 'not-allowed' : 'pointer',
                backgroundColor: 'var(--primary-brand)',
                color: '#FFFFFF',
                boxShadow: '0 2px 6px rgba(79, 70, 229, 0.3)'
              }}
            >
              <span>Next Scene</span>
              <SkipForward size={14} />
            </button>

            <button
              onClick={handleReset}
              title="Reset to Scene 1"
              style={{
                padding: '0.45rem 0.65rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={15} />
            </button>
          </div>
        </div>

        {/* 11 Scenes Progress Tracker */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(11, 1fr)',
          gap: '0.35rem',
          overflowX: 'auto',
          paddingBottom: '0.25rem'
        }}>
          {Array.from({ length: 11 }, (_, i) => i + 1).map((num) => {
            const isActive = num === currentSceneNum;
            const isCompleted = num < currentSceneNum;
            return (
              <button
                key={num}
                onClick={() => fetchScene(num)}
                style={{
                  padding: '0.4rem 0.2rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-sm)',
                  border: isActive ? '2px solid var(--primary-brand)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  backgroundColor: isActive
                    ? 'var(--primary-brand-light)'
                    : isCompleted
                    ? 'var(--mint-bg)'
                    : 'var(--bg-secondary)',
                  color: isActive
                    ? 'var(--primary-brand)'
                    : isCompleted
                    ? 'var(--mint-text)'
                    : 'var(--text-muted)',
                  textAlign: 'center',
                  transition: 'var(--transition-fast)'
                }}
              >
                S{num}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Stage */}
      {sceneData && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
          {/* User Prompt & Agent Voice */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1rem'
          }}>
            {/* User Input */}
            <div style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-xs)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  BUSINESS STAKEHOLDER PROMPT
                </span>
              </div>
              <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', fontStyle: 'italic' }}>
                "{sceneData.userPrompt}"
              </p>
            </div>

            {/* Agent Analysis */}
            <div style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--lavender-bg)',
              border: '1px solid var(--lavender-border)',
              boxShadow: 'var(--shadow-xs)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Brain size={16} color="var(--lavender-text)" />
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--lavender-text)', textTransform: 'uppercase' }}>
                  BUDGETMIND AGENT INTELLIGENCE
                </span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                {sceneData.agentResponse}
              </p>
            </div>
          </div>

          {/* Core Financial State Visualizer */}
          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-xs)'
          }}>
            {/* Top State Metric Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-subtle)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>AVAILABLE BUDGET</span>
                <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
                  {formatINR(sceneData.state.availableBudget)}
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Capital limit</span>
              </div>

              <div style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: sceneData.state.comparisonMode === 'WITH_MEMORY' ? 'var(--mint-bg)' : 'var(--bg-card-subtle)',
                border: `1px solid ${sceneData.state.comparisonMode === 'WITH_MEMORY' ? 'var(--mint-border)' : 'var(--border-subtle)'}`
              }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: sceneData.state.comparisonMode === 'WITH_MEMORY' ? 'var(--mint-text)' : 'var(--text-muted)' }}>
                  {sceneData.state.comparisonMode === 'WITH_MEMORY' ? 'MINIMUM EFFECTIVE SPEND' : 'NAIVE PLANNED SPEND'}
                </span>
                <div style={{ fontSize: '1.45rem', fontWeight: 800, color: sceneData.state.comparisonMode === 'WITH_MEMORY' ? 'var(--mint-text)' : 'var(--text-primary)', margin: '0.2rem 0' }}>
                  {formatINR(sceneData.state.plannedBudget)}
                </div>
                <span style={{ fontSize: '0.7rem', color: sceneData.state.comparisonMode === 'WITH_MEMORY' ? 'var(--mint-text)' : 'var(--text-muted)' }}>
                  {sceneData.state.comparisonMode === 'WITH_MEMORY' ? 'Optimized with memory' : 'Spends all available funds'}
                </span>
              </div>

              <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--lavender-bg)', border: '1px solid var(--lavender-border)' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--lavender-text)' }}>UNALLOCATED RESERVE</span>
                <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--lavender-text)', margin: '0.2rem 0' }}>
                  {formatINR(sceneData.state.unallocatedReserve)}
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--lavender-text)', fontStyle: 'italic' }}>
                  {sceneData.state.unallocatedReserve > 0 ? 'Preserved as Strategic Cash' : '₹0 unallocated (Spent entirely)'}
                </span>
              </div>

              <div style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: sceneData.state.memoryActive ? 'var(--purple-memory-bg)' : 'var(--bg-card-subtle)',
                border: `1px solid ${sceneData.state.memoryActive ? 'var(--purple-memory-border)' : 'var(--border-subtle)'}`
              }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: sceneData.state.memoryActive ? 'var(--purple-memory)' : 'var(--text-muted)' }}>
                  ORGANIZATIONAL MEMORY
                </span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: sceneData.state.memoryActive ? 'var(--purple-memory)' : 'var(--text-muted)', margin: '0.2rem 0' }}>
                  {sceneData.state.memoryActive ? 'ACTIVE (RECALLED)' : 'INACTIVE (WITHOUT MEMORY)'}
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {sceneData.state.memoryActive ? 'Influencing decisions' : 'Operating blindly'}
                </span>
              </div>
            </div>

            {/* Scene Specific Highlights */}
            {/* Scene 3/4: Memories List */}
            {sceneData.state.memories && sceneData.state.memories.length > 0 && currentSceneNum <= 5 && (
              <div style={{
                marginBottom: '1.5rem',
                padding: '1rem',
                backgroundColor: 'var(--purple-memory-bg)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--purple-memory-border)'
              }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--purple-memory)', marginBottom: '0.75rem' }}>
                  RECALLED LESSONS FROM HINDSIGHT
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
                  {sceneData.state.memories.map((m: any, idx: number) => (
                    <div key={idx} style={{ padding: '0.65rem', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '1px solid var(--purple-memory-border)', fontSize: '0.78rem' }}>
                      <strong style={{ color: 'var(--text-primary)' }}>{m.lesson || m.title}</strong>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: '0.2rem' }}>
                        {m.impact || m.quantitativeImpact}
                      </div>
                      <div style={{ color: '#7C3AED', fontSize: '0.72rem', fontWeight: 600, marginTop: '0.2rem' }}>
                        Rule: {m.rule || m.financialAdjustmentRule}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Scene 7: Vendor Comparison Highlight */}
            {sceneData.state.vendorComparison && (
              <div style={{
                marginBottom: '1.5rem',
                padding: '1rem',
                backgroundColor: 'var(--soft-blue-bg)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--soft-blue-border)'
              }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--soft-blue-text)', marginBottom: '0.5rem' }}>
                  DYNAMIC VENDOR RE-EVALUATION (RELIABILITY {' > '} LOWEST PRICE)
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', fontSize: '0.8rem' }}>
                  <div style={{ padding: '0.75rem', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '1px solid var(--soft-blue-border)' }}>
                    <div style={{ color: 'var(--coral-text)', fontWeight: 700 }}>REJECTED: CheapHost</div>
                    <div style={{ color: 'var(--text-secondary)', marginTop: '0.2rem', fontSize: '0.75rem' }}>
                      {sceneData.state.vendorComparison.vendorA}
                    </div>
                  </div>
                  <div style={{ padding: '0.75rem', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '1px solid #10B981' }}>
                    <div style={{ color: 'var(--mint-text)', fontWeight: 700 }}>SELECTED: ApexCloud Enterprise</div>
                    <div style={{ color: 'var(--text-secondary)', marginTop: '0.2rem', fontSize: '0.75rem' }}>
                      {sceneData.state.vendorComparison.vendorB}
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--soft-blue-text)', fontWeight: 700 }}>
                  Outcome: {sceneData.state.vendorComparison.decision}
                </div>
              </div>
            )}

            {/* Scene 9: Fast Forward Actual Spending & Variance */}
            {sceneData.state.actualSpending && (
              <div style={{
                marginBottom: '1.5rem',
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)'
              }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                  RECORDED ACTUAL SPEND (12 MONTHS AUDIT)
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.65rem' }}>
                  {sceneData.state.actualSpending.map((item: any, idx: number) => (
                    <div key={idx} style={{ padding: '0.65rem', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.78rem' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{item.category}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.2rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Planned: {formatINR(item.planned)}</span>
                        <span style={{ fontWeight: 700 }}>Actual: {formatINR(item.actual)}</span>
                      </div>
                      <div style={{
                        marginTop: '0.25rem',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: item.variance > 0 ? '#D97706' : 'var(--mint-text)'
                      }}>
                        Variance: {item.variance > 0 ? `+${formatINR(item.variance)}` : formatINR(item.variance)} ({item.status})
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Scene 10 & 11: Retain & Recall Payoff */}
            {sceneData.state.newLessonLearned && (
              <div style={{
                marginBottom: '1.5rem',
                padding: '1.25rem',
                backgroundColor: 'var(--mint-bg)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--mint-border)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <CheckCircle2 size={18} color="var(--mint-accent)" />
                  <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--mint-text)' }}>
                    NEW ORGANIZATIONAL LESSON STORED TO HINDSIGHT
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                  <strong>{sceneData.state.newLessonLearned.title}:</strong> {sceneData.state.newLessonLearned.lessonText}
                </p>
                <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--mint-text)', fontWeight: 700 }}>
                  Quantified Impact: {sceneData.state.newLessonLearned.quantitativeImpact}
                </div>
              </div>
            )}

            {/* Allocations Table for Current Scene */}
            <div>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                CURRENT ALLOCATION BREAKDOWN
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {sceneData.state.allocations.map((alloc: any, idx: number) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-card-subtle)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.82rem'
                    }}
                  >
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)', minWidth: '130px' }}>
                      {alloc.category}
                    </span>
                    <span style={{ color: 'var(--text-secondary)', flex: 1, padding: '0 1rem' }}>
                      {alloc.note}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {alloc.prevAmount && alloc.prevAmount !== alloc.amount && (
                        <span style={{ color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                          {formatINR(alloc.prevAmount)}
                        </span>
                      )}
                      <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>
                        {formatINR(alloc.amount)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Takeaway Callout */}
          <div style={{
            padding: '1rem 1.25rem',
            backgroundColor: 'var(--bg-card)',
            borderLeft: '4px solid var(--primary-brand)',
            borderRadius: '0 var(--radius-md) var(--radius-md) 0',
            boxShadow: 'var(--shadow-xs)'
          }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--primary-brand)', textTransform: 'uppercase' }}>
              KEY TAKEAWAY FOR JUDGES
            </span>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 600, marginTop: '0.2rem' }}>
              {sceneData.keyTakeaway}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
