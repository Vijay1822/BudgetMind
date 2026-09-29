import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Brain,
  PackageCheck,
  Search,
  CopyCheck,
  Building2,
  Calculator,
  EyeOff,
  ShieldAlert,
  Sparkles,
  UserCheck,
  Activity,
  BarChart3,
  Lightbulb,
  Database,
  TrendingUp,
  X,
  ArrowRight,
  ChevronRight,
  Info
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface FlowNode {
  id: string;
  number: number;
  title: string;
  category: 'PLAN' | 'SPEND' | 'OUTCOME' | 'LEARN';
  icon: any;
  shortDesc: string;
  fullDesc: string;
  evidence: string;
  impact: string;
  isHindsight?: boolean;
}

const FLOW_NODES: FlowNode[] = [
  {
    id: 'req',
    number: 1,
    title: 'DEFINE REQUIREMENTS',
    category: 'PLAN',
    icon: FileText,
    shortDesc: 'Natural language input classified by priority',
    fullDesc: 'Gemini 2.5 Flash extracts project scope, hardware counts, compute requirements, and categorizes items strictly into ESSENTIAL, IMPORTANT, or OPTIONAL.',
    evidence: 'Example: 10 developer laptops + 12-month cloud compute + project management licenses.',
    impact: 'Separates non-negotiable compliance needs from discretionary requests.',
  },
  {
    id: 'hs-recall',
    number: 2,
    title: 'RECALL HINDSIGHT MEMORY',
    category: 'PLAN',
    icon: Brain,
    isHindsight: true,
    shortDesc: 'Query Vectorize Hindsight for past purchase lessons',
    fullDesc: 'Performs semantic vector recall against enterprise memory bank "budgetmind-procurement-bank" to surface lessons from prior projects.',
    evidence: 'Recalled lesson: "AlphaCloud project suffered 24% overrun due to unmonitored egress and weekend dev compute."',
    impact: 'Prevents making the same mistake twice.',
  },
  {
    id: 'check-res',
    number: 3,
    title: 'CHECK EXISTING RESOURCES',
    category: 'PLAN',
    icon: PackageCheck,
    shortDesc: 'Audit warehouse and IT inventory before buying new',
    fullDesc: 'Scans existing organization asset repository for idle laptops, decommissioned servers, or reusable hardware pools.',
    evidence: 'Found: 5 in-stock 32GB developer laptops in IT depot ready for reallocation.',
    impact: 'Saves ₹35,000 by cutting initial unit purchases from 10 to 5.',
  },
  {
    id: 'hist-spend',
    number: 4,
    title: 'SEARCH HISTORICAL SPENDING',
    category: 'PLAN',
    icon: Search,
    shortDesc: 'Analyze historical cost variances & actual invoices',
    fullDesc: 'Queries past procurement ledger for similar team establishment expenses across previous quarters.',
    evidence: 'Past benchmark: 10-person dev squad typically billed ₹8,20,000 - ₹9,50,000.',
    impact: 'Establishes deterministic realistic boundary condition.',
  },
  {
    id: 'detect-dup',
    number: 5,
    title: 'DETECT DUPLICATES',
    category: 'PLAN',
    icon: CopyCheck,
    shortDesc: 'Harvest unused SaaS seats & eliminate overlap',
    fullDesc: 'Cross-references requested tool subscriptions against company-wide active license utilization metrics.',
    evidence: 'Detected: 45 unassigned Jira Enterprise seats and 30 unused Slack licenses.',
    impact: 'Avoids ₹50,000 in duplicate subscription orders.',
  },
  {
    id: 'compare-ven',
    number: 6,
    title: 'COMPARE VENDORS',
    category: 'PLAN',
    icon: Building2,
    shortDesc: 'Evaluate price, track record, and SLA guarantees',
    fullDesc: 'Scores qualified vendor proposals across price competitiveness, historical reliability, and contract terms.',
    evidence: 'ApexCloud (₹1,80,000 / 1h SLA) vs CheapHost (₹1,50,000 / 24h SLA).',
    impact: 'Weights total business continuity risk over raw sticker discounts.',
  },
  {
    id: 'calc-tco',
    number: 7,
    title: 'CALCULATE TCO',
    category: 'PLAN',
    icon: Calculator,
    shortDesc: 'Model 3-year total cost of ownership including maintenance',
    fullDesc: 'Computes Year 1, Year 2, and Year 3 recurring operational expenditures, licensing renewals, and replacement cycles.',
    evidence: 'One-time setup: ₹4,10,000 | Year 2 recurring: ₹3,15,000 | 3-Year TCO: ₹10,40,000.',
    impact: 'Prevents budget traps where low Year 1 cost explodes in Year 2.',
  },
  {
    id: 'detect-hidden',
    number: 8,
    title: 'DETECT HIDDEN COSTS',
    category: 'PLAN',
    icon: EyeOff,
    shortDesc: 'Uncover egress, onboarding, and overage fees',
    fullDesc: 'Identifies contract traps such as API rate-limit overages, data egress fees, and mandatory onboarding retainers.',
    evidence: 'Detected: Cloud provider charges ₹0.09/GB egress above 1TB allowance.',
    impact: 'Applies automated egress monitoring constraint.',
  },
  {
    id: 'calc-contingency',
    number: 9,
    title: 'CALCULATE CONTINGENCY',
    category: 'PLAN',
    icon: ShieldAlert,
    shortDesc: 'Evidence-based contingency instead of arbitrary percentages',
    fullDesc: 'Calculates dynamic contingency buffer directly proportional to historical vendor risk and item complexity.',
    evidence: 'AlphaCloud 24% overrun risk factor adds ₹20,000 buffer + ₹15,000 hardware damage reserve.',
    impact: 'Replaces blind 20% markups with justified ₹35,000 targeted reserve.',
  },
  {
    id: 'opt-budget',
    number: 10,
    title: 'OPTIMIZE BUDGET',
    category: 'PLAN',
    icon: Sparkles,
    shortDesc: 'Synthesize Minimum Effective Cost & Strategic Reserve',
    fullDesc: 'The deterministic financial engine calculates the optimal spending allocation satisfying 100% of Essential requirements.',
    evidence: 'Available: ₹10,00,000 → Recommended Spend: ₹8,11,175 → Strategic Reserve: ₹1,88,825.',
    impact: 'Preserves ₹1,88,825 without compromising any deliverable.',
  },
  {
    id: 'approval',
    number: 11,
    title: 'HUMAN APPROVAL',
    category: 'SPEND',
    icon: UserCheck,
    shortDesc: 'Finance Director review & cryptographic sign-off',
    fullDesc: 'Presents the transparent decision report to human stakeholders with complete audit trail and trade-off visibility.',
    evidence: 'Approved by Finance & Procurement Committee.',
    impact: 'Human-in-the-loop governance guarantees fiduciary responsibility.',
  },
  {
    id: 'track-outcome',
    number: 12,
    title: 'TRACK ACTUAL OUTCOME',
    category: 'SPEND',
    icon: Activity,
    shortDesc: 'Reconcile purchase orders, invoices, and bank statements',
    fullDesc: 'Connects actual expenditure back into the procurement ledger as deliverables are purchased and deployed.',
    evidence: 'Invoiced: ₹8,14,000 actual total spend (+0.3% minor variance vs plan).',
    impact: 'Ensures real-world spend conforms to approved allocations.',
  },
  {
    id: 'analyze-outcome',
    number: 13,
    title: 'ANALYZE OUTCOME',
    category: 'OUTCOME',
    icon: BarChart3,
    shortDesc: 'Calculate variance & license utilization rates',
    fullDesc: 'Measures post-deployment metrics: Did the team actually use all seats? Did the cloud stay within SLA?',
    evidence: '15 seats were purchased in previous cycle; active audit showed only 11 in daily use.',
    impact: 'Detects the difference between planned capacity and actual consumption.',
  },
  {
    id: 'gen-lesson',
    number: 14,
    title: 'GENERATE LESSON',
    category: 'LEARN',
    icon: Lightbulb,
    shortDesc: 'Distill outcome into permanent enterprise rule',
    fullDesc: 'Synthesizes quantitative variance into an actionable procurement rule for future optimizations.',
    evidence: 'Lesson: "For team ramp-up, procure initial seats at 80% of target headcount and harvest monthly."',
    impact: 'Transforms one project\'s experience into organization-wide intelligence.',
  },
  {
    id: 'hs-retain',
    number: 15,
    title: 'HINDSIGHT MEMORY',
    category: 'LEARN',
    icon: Database,
    isHindsight: true,
    shortDesc: 'Retain distilled lesson into cloud memory bank',
    fullDesc: 'Stores the structured lesson and entity links into Vectorize Hindsight cloud bank for permanent semantic retrieval.',
    evidence: 'Retained to "budgetmind-procurement-bank" with tags: [Headcount, SoftwareLicenses, Utilization].',
    impact: 'Memory is permanent, auditable, and accessible to future agents.',
  },
  {
    id: 'improve-next',
    number: 16,
    title: 'IMPROVE NEXT BUDGET',
    category: 'LEARN',
    icon: TrendingUp,
    shortDesc: 'Next project benefits automatically from previous lessons',
    fullDesc: 'The learning loop closes: Every subsequent budget plan automatically recalls these retained lessons during Step 2.',
    evidence: 'Next project Apollo optimizes software licensing directly to 11 seats, saving ₹42,000 automatically.',
    impact: 'Every purchase makes the entire organization smarter.',
  },
];

export const BudgetMindFlowchart: React.FC = () => {
  const { theme } = useAuth();
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(FLOW_NODES[1]); // Default to Hindsight recall
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'PLAN' | 'SPEND' | 'OUTCOME' | 'LEARN'>('ALL');

  const filteredNodes = activeCategory === 'ALL'
    ? FLOW_NODES
    : FLOW_NODES.filter(n => n.category === activeCategory);

  const getCategoryColor = (cat: FlowNode['category']) => {
    switch (cat) {
      case 'PLAN': return theme === 'light' ? '#FF8F7C' : '#F58F7C';
      case 'SPEND': return theme === 'light' ? '#4A5568' : '#34D399';
      case 'OUTCOME': return theme === 'light' ? '#FF8F7C' : '#FBBF24';
      case 'LEARN': return theme === 'light' ? '#FF8F7C' : '#F2C4CE';
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.75rem',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        transition: 'background-color 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                backgroundColor: 'var(--accent-soft)',
                color: 'var(--accent)',
                padding: '0.25rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              INTERACTIVE AGENT WORKFLOW
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              16-Step Continuous Learning Loop
            </span>
          </div>

          <h2 style={{ fontSize: '1.55rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            How BudgetMind Does It
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: '780px', marginTop: '0.25rem' }}>
            From intake to hindsight memory: click any step in the flow to inspect the exact decision, audit evidence, and organizational learning.
          </p>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {(['ALL', 'PLAN', 'SPEND', 'OUTCOME', 'LEARN'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.72rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-full)',
                border: `1.5px solid ${activeCategory === cat ? 'var(--accent)' : 'var(--border)'}`,
                backgroundColor: activeCategory === cat ? 'var(--accent-soft)' : 'transparent',
                color: activeCategory === cat ? 'var(--accent)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {cat === 'ALL' ? 'All 16 Steps' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Learning Loop Ribbon */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem',
          padding: '0.75rem 1.25rem',
          backgroundColor: 'var(--surface-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          overflowX: 'auto',
          fontSize: '0.78rem',
          fontWeight: 700,
        }}
      >
        <span style={{ color: 'var(--accent)' }}>PLAN</span>
        <ArrowRight size={14} color="var(--text-muted)" />
        <span style={{ color: 'var(--success)' }}>SPEND</span>
        <ArrowRight size={14} color="var(--text-muted)" />
        <span style={{ color: 'var(--warning)' }}>OUTCOME</span>
        <ArrowRight size={14} color="var(--text-muted)" />
        <span style={{ color: 'var(--accent)' }}>LEARN</span>
        <ArrowRight size={14} color="var(--text-muted)" />
        <span style={{ color: 'var(--accent)', fontWeight: 800 }}>HINDSIGHT MEMORY</span>
        <ArrowRight size={14} color="var(--text-muted)" />
        <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>OPTIMIZE NEXT PLAN</span>
      </div>

      {/* Flow Grid with animated nodes */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
          gap: '0.85rem',
          marginTop: '0.25rem',
        }}
      >
        {filteredNodes.map((node, index) => {
          const Icon = node.icon;
          const isSelected = selectedNode?.id === node.id;
          const catColor = getCategoryColor(node.category);

          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.03 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedNode(node)}
              style={{
                padding: '1rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: isSelected ? 'var(--surface-elevated)' : 'var(--surface)',
                border: `2px solid ${isSelected ? 'var(--accent)' : node.isHindsight ? 'var(--accent)' : 'var(--border)'}`,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-xs)',
                position: 'relative',
                transition: 'all 0.2s ease',
              }}
            >
              {/* Step Number + Category Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? 'var(--accent)' : (theme === 'light' ? '#E6E9EE' : 'rgba(0,0,0,0.1)'),
                    color: isSelected ? (theme === 'light' ? '#FFFFFF' : '#2C2B30') : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                  }}
                >
                  {node.number}
                </span>

                <span
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    color: catColor,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  {node.category}
                </span>
              </div>

              {/* Icon & Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                <Icon size={18} color={node.isHindsight ? 'var(--accent)' : catColor} />
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: '1.25' }}>
                  {node.title}
                </h4>
              </div>

              {/* Short summary */}
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.35', marginTop: '0.1rem' }}>
                {node.shortDesc}
              </p>

              {/* Hindsight Pill */}
              {node.isHindsight && (
                <div
                  style={{
                    alignSelf: 'flex-start',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    backgroundColor: 'var(--accent-soft)',
                    color: 'var(--accent)',
                    padding: '0.15rem 0.45rem',
                    borderRadius: 'var(--radius-sm)',
                    marginTop: 'auto',
                  }}
                >
                  ⚡ Hindsight Core
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Selected Node Inspector Drawer / Card */}
      <AnimatePresence mode="wait">
        {selectedNode && (
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            style={{
              padding: '1.25rem 1.5rem',
              backgroundColor: 'var(--surface-secondary)',
              borderRadius: 'var(--radius-lg)',
              border: '1.5px solid var(--accent)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              marginTop: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span
                  style={{
                    padding: '0.2rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--accent)',
                    color: theme === 'light' ? '#FFFFFF' : '#2C2B30',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                  }}
                >
                  STEP {selectedNode.number} OF 16
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {selectedNode.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedNode(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>
              {selectedNode.fullDesc}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem', marginTop: '0.25rem' }}>
              <div style={{ padding: '0.85rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  AUDIT EVIDENCE / OBSERVATION
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.25rem', fontWeight: 600 }}>
                  {selectedNode.evidence}
                </div>
              </div>

              <div style={{ padding: '0.85rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase' }}>
                  OPTIMIZATION IMPACT
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', marginTop: '0.25rem', fontWeight: 600 }}>
                  {selectedNode.impact}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
