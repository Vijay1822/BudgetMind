import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Database,
  TrendingDown,
  BarChart3,
  Brain,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  Zap,
  Info
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  shortDesc: string;
  concept: string;
  icon: React.ComponentType<{ size?: number; color?: string; className?: string }>;
  tags: { label: string; type: 'required' | 'important' | 'optional' | 'deferred' | 'neutral' | 'accent' }[];
  visualMetric?: {
    label: string;
    value: string;
    subtext?: string;
  };
  details: {
    heading: string;
    summary: string;
    bulletPoints: string[];
    evidenceNote?: string;
  };
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'understand',
    stepNumber: '01',
    title: 'Understand',
    shortDesc: 'Translate requirements into essential, important, optional, and deferred spending priorities.',
    concept: 'Requirements → Priorities',
    icon: Layers,
    tags: [
      { label: '✓ Required', type: 'required' },
      { label: '✓ Important', type: 'important' },
      { label: '○ Optional', type: 'optional' },
      { label: '→ Deferred', type: 'deferred' },
    ],
    visualMetric: {
      label: 'SCOPE CLASSIFICATION',
      value: '100% Essential Covered',
      subtext: 'Discretionary items separated from compliance needs',
    },
    details: {
      heading: 'Intelligent Scope & Priority Decomposition',
      summary: 'BudgetMind analyzes natural language requests and converts ambiguous shopping lists into a strict priority hierarchy, auditing existing warehouse inventory and idle enterprise seats before approving new procurement.',
      bulletPoints: [
        'Separates non-negotiable security/compliance needs from elective requests',
        'Audits IT inventory depots for reusable hardware pools and idle devices',
        'Scans SaaS subscription directories for unassigned and harvestable seats',
        'Applies deterministic constraints to prevent scope inflation'
      ],
      evidenceNote: 'Example: 10 dev laptops + cloud compute + licenses analyzed. 5 laptops allocated from existing depot inventory, saving ₹35,000 upfront.'
    }
  },
  {
    id: 'remember',
    stepNumber: '02',
    title: 'Remember',
    shortDesc: 'Recall relevant outcomes from previous budgets using Hindsight memory.',
    concept: 'Past Budget → Hindsight → Relevant Memory',
    icon: Database,
    tags: [
      { label: 'Previous Procurement', type: 'neutral' },
      { label: 'Previous Vendor', type: 'accent' },
      { label: 'Previous Cost', type: 'neutral' },
      { label: 'Previous Outcome', type: 'accent' },
      { label: 'Previous Lesson', type: 'important' },
    ],
    visualMetric: {
      label: 'HINDSIGHT RECALL',
      value: '4 Historical Lessons Applied',
      subtext: 'Prevents repeating historical vendor & cloud overruns',
    },
    details: {
      heading: 'Vectorize Hindsight Memory Bank Semantic Retrieval',
      summary: 'Before any commitment is modeled, BudgetMind semantically queries "budgetmind-procurement-bank" to surface real outcomes from prior quarters, ensuring the organization never repeats past vendor or cloud traps.',
      bulletPoints: [
        'Surfaces historical cost variance on similar developer squad rollouts',
        'Weights vendor reliability and real downtime incidents over sticker discounts',
        'Identifies recurring subscription creep and multi-year contract renewals',
        'Applies learned vendor SLAs directly into current decision matrices'
      ],
      evidenceNote: 'Recalled lesson: "AlphaCloud suffered 24% overrun due to unmonitored weekend compute and egress spikes." Automatic egress safeguard activated.'
    }
  },
  {
    id: 'optimize',
    stepNumber: '03',
    title: 'Optimize',
    shortDesc: 'Calculate the minimum effective cost while preserving essential requirements.',
    concept: '₹10,00,000 Available → ₹8,11,175 Spend + ₹1,88,825 Reserve',
    icon: TrendingDown,
    tags: [
      { label: 'Vendor Comparison', type: 'neutral' },
      { label: '3-Year TCO', type: 'accent' },
      { label: 'Recurring Costs', type: 'neutral' },
      { label: 'Hidden Costs', type: 'important' },
      { label: 'Existing Resources', type: 'required' },
      { label: 'Contingency', type: 'accent' },
    ],
    visualMetric: {
      label: 'FINANCIAL EFFICIENCY',
      value: '₹1,88,825 Preserved',
      subtext: '18.9% unallocated liquidity retained in treasury',
    },
    details: {
      heading: 'Deterministic Minimum Effective Cost Synthesis',
      summary: 'The deterministic calculation engine models total cost of ownership, rightsizes compute specifications, deducts harvested inventory, and sizes an evidence-backed contingency buffer rather than exhausting the budget cap.',
      bulletPoints: [
        'Calculates 3-year TCO factoring support, maintenance, and renewal inflation',
        'Replaces arbitrary 20% markups with risk-proportional contingency sizing',
        'Evaluates hidden traps: egress fees, API overages, and onboarding retainers',
        'Preserves unneeded capital as an explicit Strategic Reserve'
      ],
      evidenceNote: 'Available budget ceiling: ₹10,00,000 → Recommended Spend: ₹8,11,175 → Strategic Reserve: ₹1,88,825 untouched in company treasury.'
    }
  },
  {
    id: 'learn',
    stepNumber: '04',
    title: 'Learn',
    shortDesc: 'Compare planned spending with actual outcomes and determine what should change next time.',
    concept: 'Planned → Actual → Variance → Outcome',
    icon: BarChart3,
    tags: [
      { label: 'Planned Spend', type: 'neutral' },
      { label: 'Actual Invoiced', type: 'neutral' },
      { label: 'Variance Tracking', type: 'accent' },
      { label: 'Postmortem Analysis', type: 'important' },
    ],
    visualMetric: {
      label: 'OUTCOME ACCURACY',
      value: '+0.3% Variance',
      subtext: 'Actual invoices tracked with auditable proof',
    },
    details: {
      heading: 'Outcome Reconciliation & Postmortem Analysis',
      summary: 'Once deliverables are purchased and deployed, BudgetMind ingests real invoices and bank statements, measuring whether the team utilized all seats and stayed within anticipated compute boundaries.',
      bulletPoints: [
        'Compares approved PO amounts against verified final vendor invoices',
        'Measures actual seat utilization rates 90 days post-deployment',
        'Audits whether vendor SLAs were honored during operational peaks',
        'Identifies quantitative variances to isolate future optimization targets'
      ],
      evidenceNote: 'Observed: 15 software seats were purchased previously; post-deployment monitoring proved only 11 seats had daily logins.'
    }
  },
  {
    id: 'hindsight',
    stepNumber: '05',
    title: 'Hindsight Memory',
    shortDesc: 'Convert procurement outcomes into reusable organizational knowledge.',
    concept: 'Vendor Performance • Cost Efficiency • Outcome • Risk • Lesson',
    icon: Brain,
    tags: [
      { label: 'Vendor Performance', type: 'accent' },
      { label: 'Cost Efficiency', type: 'required' },
      { label: 'Procurement Outcome', type: 'neutral' },
      { label: 'Risk Factor', type: 'important' },
      { label: 'Lesson Synthesis', type: 'accent' },
      { label: 'Confidence: 94%', type: 'required' },
    ],
    visualMetric: {
      label: 'BIOMIMETIC MEMORY STORE',
      value: 'Permanent Enterprise Memory',
      subtext: 'Entity-linked memory retained in Vectorize Hindsight',
    },
    details: {
      heading: 'Permanent Enterprise Knowledge Crystallization',
      summary: 'BudgetMind synthesizes the quantitative variance and qualitative team postmortem into an immutable, entity-linked enterprise rule stored in Vectorize Hindsight cloud memory bank.',
      bulletPoints: [
        'Distills raw invoice variance into permanent, auditable procurement heuristics',
        'Tags memory entities with vendor, category, team size, and tech stack links',
        'Scores lesson confidence based on invoice audit verification',
        'Ensures organizational intelligence survives personnel turnover'
      ],
      evidenceNote: 'Synthesized rule: "For team ramp-up, procure initial developer seats at 80% of target headcount and harvest monthly pools."'
    }
  },
  {
    id: 'next-budget',
    stepNumber: '06',
    title: 'Next Budget',
    shortDesc: 'The next planning cycle starts with everything BudgetMind learned before.',
    concept: 'Previous Outcome → Hindsight → New Plan → Better Allocation',
    icon: Sparkles,
    tags: [
      { label: 'Continuous Loop', type: 'accent' },
      { label: 'Zero Repeated Mistakes', type: 'required' },
      { label: 'Adaptive Intelligence', type: 'important' },
      { label: 'Compound Savings', type: 'accent' },
    ],
    visualMetric: {
      label: 'COMPOUND SAVINGS',
      value: '₹3,89,000 Cumulative',
      subtext: 'Every budget makes the next budget smarter',
    },
    details: {
      heading: 'Closing the Intelligence Loop: Continuous Compounding',
      summary: 'The intelligence loop closes: when project Apollo or any department initiates their next budget request, Step 01 automatically inherits every retained Hindsight lesson, achieving continuous financial compound optimization.',
      bulletPoints: [
        'Subsequent budget cycles start with verified vendor benchmarks already loaded',
        'Prevents over-provisioning software seats based on historical usage curves',
        'Applies negotiated volume discounts and validated vendor contracts immediately',
        'Transforms enterprise budgeting from static guesswork into predictive intelligence'
      ],
      evidenceNote: 'Subsequent project Apollo immediately applies the 80% provisioning rule, saving ₹42,00,000 on software licenses in hour zero.'
    }
  },
];

export const BudgetMindProcessFlow: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { theme } = useAuth();
  const isLight = theme === 'light';
  const [activeStepId, setActiveStepId] = useState<string>('understand');
  const [hoveredStepId, setHoveredStepId] = useState<string | null>(null);

  const activeStep = PROCESS_STEPS.find(s => s.id === activeStepId) || PROCESS_STEPS[0];
  const displayedStep = hoveredStepId 
    ? (PROCESS_STEPS.find(s => s.id === hoveredStepId) || activeStep) 
    : activeStep;

  const handleStepSelect = (id: string) => {
    setActiveStepId(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveStepId(id);
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        padding: compact ? '1.5rem' : '2.25rem',
        boxShadow: isLight ? 'var(--shadow-sm)' : 'var(--shadow-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.75rem',
        transition: 'background-color 0.4s ease, border-color 0.4s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Accent Subtle Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-120px',
          right: '-100px',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: isLight 
            ? 'radial-gradient(circle, rgba(255, 199, 199, 0.45) 0%, rgba(242, 242, 242, 0) 70%)' 
            : 'radial-gradient(circle, rgba(245, 143, 124, 0.15) 0%, rgba(44, 43, 48, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* 1. SECTION HEADER */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                backgroundColor: 'var(--accent-soft)',
                color: 'var(--accent)',
                padding: '0.22rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <RefreshCw size={12} />
              THE CONTINUOUS INTELLIGENCE LOOP
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              6 Connected Stages • Circular Architecture
            </span>
          </div>

          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em', margin: 0 }}>
            How BudgetMind Transforms Enterprise Spend
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '0.35rem', maxWidth: '780px', lineHeight: 1.5 }}>
            Every procurement outcome becomes intelligence for the next budget. Move your cursor or tap any stage to inspect the autonomous financial learning loop.
          </p>
        </div>

        {/* Continuous Loop Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.55rem 0.95rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: isLight ? 'rgba(255, 199, 199, 0.35)' : 'rgba(245, 143, 124, 0.15)',
            border: '1px solid var(--border)',
            color: 'var(--accent)',
            fontSize: '0.78rem',
            fontWeight: 800,
          }}
        >
          <Zap size={14} />
          <span>Every budget makes the next budget smarter</span>
        </div>
      </div>

      {/* 2. THE INTERACTIVE CONNECTED FLOW (Horizontal Workflow on Desktop / Responsive Wrap) */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Progress Timeline Indicator Ribbon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.75rem',
            padding: '0 0.5rem',
            fontSize: '0.7rem',
            fontWeight: 700,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}
        >
          <span>Intake & Prioritization</span>
          <span style={{ color: 'var(--accent)', fontWeight: 800 }}>Continuous Biomimetic Memory Feedback</span>
          <span>Next Budget Optimization</span>
        </div>

        {/* The 6 Connected Node Blocks */}
        <div
          role="tablist"
          aria-label="BudgetMind 6-Stage Continuous Learning Process"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0.85rem',
            position: 'relative',
          }}
        >
          {PROCESS_STEPS.map((step) => {
            const Icon = step.icon;
            const isSelected = activeStepId === step.id;
            const isHovered = hoveredStepId === step.id;
            const isHindsightStep = step.id === 'hindsight';

            return (
              <motion.button
                key={step.id}
                type="button"
                role="tab"
                id={`tab-${step.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${step.id}`}
                tabIndex={0}
                onClick={() => handleStepSelect(step.id)}
                onKeyDown={(e) => handleKeyDown(e, step.id)}
                onMouseEnter={() => setHoveredStepId(step.id)}
                onMouseLeave={() => setHoveredStepId(null)}
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  padding: '1.15rem 1rem',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: isSelected
                    ? (isLight ? '#FFFFFF' : 'var(--surface-elevated)')
                    : isHovered
                    ? (isLight ? 'rgba(255, 199, 199, 0.35)' : 'var(--surface-secondary)')
                    : (isLight ? '#FFFFFF' : 'var(--surface)'),
                  border: isSelected
                    ? '2px solid var(--accent)'
                    : isHovered
                    ? `1.5px solid var(--accent)`
                    : isHindsightStep
                    ? `1.5px solid ${isLight ? '#FFC7C7' : 'rgba(245, 143, 124, 0.45)'}`
                    : '1px solid var(--border)',
                  boxShadow: isSelected
                    ? (isLight ? '0 6px 18px rgba(255, 143, 124, 0.25)' : '0 6px 20px rgba(0, 0, 0, 0.4)')
                    : isHovered
                    ? (isLight ? '0 4px 12px rgba(74, 85, 104, 0.08)' : '0 4px 14px rgba(0, 0, 0, 0.3)')
                    : (isLight ? 'var(--shadow-xs)' : 'none'),
                  cursor: 'pointer',
                  transition: 'background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                  outline: 'none',
                }}
              >
                {/* Top Row: Step Number & Hindsight Flag */}
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      backgroundColor: isSelected
                        ? 'var(--accent)'
                        : (isLight ? '#E6E9EE' : 'rgba(255, 255, 255, 0.1)'),
                      color: isSelected
                        ? '#FFFFFF'
                        : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {step.stepNumber}
                  </div>

                  {isHindsightStep ? (
                    <span
                      style={{
                        fontSize: '0.62rem',
                        fontWeight: 800,
                        backgroundColor: isLight ? '#FFC7C7' : 'rgba(245, 143, 124, 0.25)',
                        color: 'var(--accent)',
                        padding: '0.12rem 0.45rem',
                        borderRadius: 'var(--radius-full)',
                        letterSpacing: '0.03em',
                      }}
                    >
                      CORE ENGINE
                    </span>
                  ) : (
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: isSelected ? 'var(--accent)' : 'transparent' }} />
                  )}
                </div>

                {/* Icon & Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.45rem' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: isSelected
                        ? (isLight ? 'rgba(255, 143, 124, 0.15)' : 'rgba(245, 143, 124, 0.25)')
                        : (isLight ? '#E6E9EE' : 'var(--surface-secondary)'),
                      color: isSelected ? 'var(--accent)' : 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Icon size={17} color={isSelected ? 'var(--accent)' : undefined} />
                  </div>
                  <h4
                    style={{
                      fontSize: '0.92rem',
                      fontWeight: 800,
                      color: isSelected ? 'var(--accent)' : 'var(--text-primary)',
                      letterSpacing: '-0.01em',
                      margin: 0,
                    }}
                  >
                    {step.title}
                  </h4>
                </div>

                {/* Short Description */}
                <p
                  style={{
                    fontSize: '0.76rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.4,
                    margin: 0,
                    marginBottom: '0.75rem',
                    flex: 1,
                  }}
                >
                  {step.shortDesc}
                </p>

                {/* Mini Concept Badge */}
                <div
                  style={{
                    width: '100%',
                    padding: '0.35rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isSelected 
                      ? (isLight ? 'rgba(255, 199, 199, 0.45)' : 'rgba(245, 143, 124, 0.15)') 
                      : 'var(--surface-secondary)',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: isSelected ? 'var(--accent)' : 'var(--text-muted)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  {step.concept}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 3. CONTINUOUS LOOP CONNECTION BANNER (Connecting Step 6 back to Step 1) */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '0.9rem 1.4rem',
          backgroundColor: isLight ? 'rgba(230, 233, 238, 0.65)' : 'var(--surface-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px dashed var(--border-medium)',
          fontSize: '0.82rem',
          fontWeight: 700,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-soft)',
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RefreshCw size={15} />
          </div>
          <div>
            <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>Continuous Organizational Learning: </span>
            <span style={{ color: 'var(--text-secondary)' }}>
              Step 06 (Next Budget) feeds distilled procurement telemetry directly back into Step 01 (Understand)
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent)', fontSize: '0.78rem', fontWeight: 800 }}>
          <span>Next Budget</span>
          <ArrowRight size={13} />
          <span>Hindsight Recall</span>
          <ArrowRight size={13} />
          <span>Better Allocation</span>
        </div>
      </div>

      {/* 4. ACTIVE STEP DETAIL INSPECTOR PANEL (Reveals on Hover & Click) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={displayedStep.id}
          role="tabpanel"
          id={`panel-${displayedStep.id}`}
          aria-labelledby={`tab-${displayedStep.id}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '1.5rem',
            backgroundColor: isLight ? '#FFFFFF' : 'var(--surface-secondary)',
            borderRadius: 'var(--radius-xl)',
            border: `1.5px solid ${isLight ? 'var(--border)' : 'var(--border-medium)'}`,
            boxShadow: isLight ? 'var(--shadow-xs)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          {/* Header of Active Step */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--accent-soft)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {React.createElement(displayedStep.icon, { size: 20 })}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase' }}>
                    STAGE {displayedStep.stepNumber} DEEP DIVE
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>•</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    {displayedStep.concept}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.15rem 0 0 0' }}>
                  {displayedStep.details.heading}
                </h3>
              </div>
            </div>

            {/* Visual Metric Callout */}
            {displayedStep.visualMetric && (
              <div
                style={{
                  padding: '0.65rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isLight ? '#F2F2F2' : 'var(--surface)',
                  border: '1px solid var(--border-subtle)',
                  textAlign: 'right',
                }}
              >
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  {displayedStep.visualMetric.label}
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent)', margin: '0.15rem 0' }}>
                  {displayedStep.visualMetric.value}
                </div>
                {displayedStep.visualMetric.subtext && (
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                    {displayedStep.visualMetric.subtext}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Step Summary Paragraph */}
          <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.55, margin: 0 }}>
            {displayedStep.details.summary}
          </p>

          {/* Interactive Examples & Chips */}
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
              Taxonomy & Decision Signals:
            </div>
            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
              {displayedStep.tags.map((tag, tIdx) => {
                let badgeBg = 'var(--surface-secondary)';
                let badgeText = 'var(--text-primary)';
                let badgeBorder = 'var(--border-subtle)';

                if (tag.type === 'required' || tag.type === 'accent') {
                  badgeBg = isLight ? 'rgba(255, 143, 124, 0.15)' : 'rgba(245, 143, 124, 0.25)';
                  badgeText = 'var(--accent)';
                  badgeBorder = isLight ? '#FFC7C7' : 'rgba(245, 143, 124, 0.4)';
                } else if (tag.type === 'important') {
                  badgeBg = isLight ? 'rgba(255, 199, 199, 0.45)' : 'rgba(242, 196, 206, 0.25)';
                  badgeText = isLight ? '#4A5568' : '#F2C4CE';
                  badgeBorder = isLight ? '#FFC7C7' : 'rgba(242, 196, 206, 0.4)';
                }

                return (
                  <span
                    key={tIdx}
                    style={{
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      backgroundColor: badgeBg,
                      color: badgeText,
                      border: `1px solid ${badgeBorder}`,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    {tag.label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* 4 Architectural Guarantees Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
            {displayedStep.details.bulletPoints.map((bp, bIdx) => (
              <div
                key={bIdx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.55rem',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isLight ? '#F2F2F2' : 'var(--surface)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <CheckCircle2 size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {bp}
                </span>
              </div>
            ))}
          </div>

          {/* Auditable Evidence & Postmortem Note */}
          {displayedStep.details.evidenceNote && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isLight ? 'rgba(255, 199, 199, 0.35)' : 'rgba(245, 143, 124, 0.12)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.8rem',
                color: 'var(--text-primary)',
              }}
            >
              <Info size={16} color="var(--accent)" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ color: 'var(--accent)' }}>Auditable Evidence: </strong>
                <span>{displayedStep.details.evidenceNote}</span>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
