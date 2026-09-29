import { Router } from 'express';
import { orgStore } from '../data/organizationStore';
import { hindsightService } from '../services/hindsightService';
import { calculateWhatIfScenarios } from '../engine/calculator';

const router = Router();

export interface DemoSceneData {
  sceneNumber: number;
  title: string;
  subtitle: string;
  userPrompt: string;
  agentResponse: string;
  state: {
    availableBudget: number;
    plannedBudget: number;
    savings: number;
    unallocatedReserve: number;
    memoryActive: boolean;
    memories: any[];
    allocations: Array<{ category: string; amount: number; prevAmount?: number; delta?: number; note: string }>;
    vendorComparison?: any;
    whatIfScenarios?: any;
    actualSpending?: any[];
    newLessonLearned?: any;
    comparisonMode?: 'WITHOUT_MEMORY' | 'WITH_MEMORY';
  };
  keyTakeaway: string;
}

const DEMO_SCENES: Record<number, DemoSceneData> = {
  1: {
    sceneNumber: 1,
    title: 'Scene 1: Initial Business Requirement',
    subtitle: 'The user defines business scope and available capital.',
    userPrompt: 'I have ₹10 lakh to establish a development team for one year.',
    agentResponse: 'Analyzing requirement: 10-person engineering squad, 12-month lifecycle, ₹10,00,000 available capital constraint. Classifying essential vs optional infrastructure.',
    state: {
      availableBudget: 1000000,
      plannedBudget: 1000000,
      savings: 0,
      unallocatedReserve: 0,
      memoryActive: false,
      memories: [],
      allocations: [
        { category: 'Hardware', amount: 350000, note: '5 developer laptops' },
        { category: 'Cloud', amount: 200000, note: 'Compute & database instances' },
        { category: 'Software', amount: 200000, note: 'New tool licenses' },
        { category: 'Security', amount: 100000, note: 'Compliance & antivirus' },
        { category: 'Training', amount: 100000, note: 'Generic courses' },
        { category: 'Contingency', amount: 50000, note: 'Arbitrary 5% guess' },
      ],
      comparisonMode: 'WITHOUT_MEMORY',
    },
    keyTakeaway: 'Standard tools blindly spend the entire ₹10,00,000 without questioning necessity or prior history.',
  },
  2: {
    sceneNumber: 2,
    title: 'Scene 2: Naive Budget (Before Organizational Memory)',
    subtitle: 'What happens without persistent memory? Target budget is spent completely.',
    userPrompt: 'Generate baseline allocation without company historical data.',
    agentResponse: 'Naive plan generated. Notice: Software licenses purchased from scratch, no maintenance budgeted, and arbitrary contingency leaves ₹0 reserve.',
    state: {
      availableBudget: 1000000,
      plannedBudget: 1000000,
      savings: 0,
      unallocatedReserve: 0,
      memoryActive: false,
      memories: [],
      allocations: [
        { category: 'Hardware', amount: 350000, note: 'Laptops without accidental warranty' },
        { category: 'Cloud', amount: 200000, note: 'Standard quota, no overage reserve' },
        { category: 'Software', amount: 200000, note: 'Procuring 10 new Jira & Slack seats' },
        { category: 'Security', amount: 100000, note: 'Standard suite' },
        { category: 'Training', amount: 100000, note: 'Open-ended subscription' },
        { category: 'Contingency', amount: 50000, note: 'Arbitrary 5% reserve' },
      ],
      comparisonMode: 'WITHOUT_MEMORY',
    },
    keyTakeaway: 'Without memory, organizations repeatedly buy duplicate licenses and repeat past overrun mistakes.',
  },
  3: {
    sceneNumber: 3,
    title: 'Scene 3: Trigger Hindsight Memory Recall',
    subtitle: 'Connecting to Hindsight memory bank to uncover past procurement outcomes.',
    userPrompt: 'Recall Company Memory for similar cloud, software, and hardware procurements.',
    agentResponse: 'Querying Hindsight memory bank: Searching historical spending records, vendor incident postmortems, and software license utilization...',
    state: {
      availableBudget: 1000000,
      plannedBudget: 1000000,
      savings: 0,
      unallocatedReserve: 0,
      memoryActive: true,
      memories: [],
      allocations: [
        { category: 'Hardware', amount: 350000, note: 'Inspecting past hardware records...' },
        { category: 'Cloud', amount: 200000, note: 'Recalling cloud overrun logs...' },
        { category: 'Software', amount: 200000, note: 'Auditing active license seats...' },
        { category: 'Security', amount: 100000, note: 'Checking compliance SLAs...' },
        { category: 'Training', amount: 100000, note: 'Inspecting course completion stats...' },
      ],
      comparisonMode: 'WITH_MEMORY',
    },
    keyTakeaway: 'Hindsight memory bridges past financial outcomes with active planning decisions.',
  },
  4: {
    sceneNumber: 4,
    title: 'Scene 4: 4 Critical Lessons Recalled',
    subtitle: 'Hindsight reveals specific quantitative evidence from past projects.',
    userPrompt: 'What lessons were retrieved from company history?',
    agentResponse: 'Identified 4 high-impact historical lessons that directly alter the budget.',
    state: {
      availableBudget: 1000000,
      plannedBudget: 1000000,
      savings: 0,
      unallocatedReserve: 0,
      memoryActive: true,
      memories: [
        {
          id: 'mem-01',
          lesson: 'Lesson 1: Cloud usage caused a 24% overrun in Project AlphaCloud due to unmonitored egress.',
          impact: '+₹48,000 variance in 2025',
          rule: 'Scale Cloud contingency from 5% to 18-20% and rightsized dev instances.',
        },
        {
          id: 'mem-02',
          lesson: 'Lesson 2: 30-45% of enterprise software subscriptions went unused in SaaS Scale.',
          impact: 'Currently 45 unused Jira seats and 30 Slack seats idle in inventory.',
          rule: 'Reuse active licenses; deduct ₹50,000 from software procurement.',
        },
        {
          id: 'mem-03',
          lesson: 'Lesson 3: Lowest-cost hosting vendor (CloudCore) caused 42h downtime due to poor 48h support SLA.',
          impact: 'False economy: ₹15k savings lost to operational downtime.',
          rule: 'Prioritize Vendor B (ApexCloud) with 1h SLA and 99.95% uptime.',
        },
        {
          id: 'mem-04',
          lesson: 'Lesson 4: Equipment maintenance was budgeted at ₹0 in 2025, causing ₹20,000 out-of-pocket repair costs.',
          impact: '+₹20,000 surprise expense',
          rule: 'Inject explicit ₹20,000 hardware maintenance & accidental warranty buffer.',
        },
      ],
      allocations: [
        { category: 'Hardware', amount: 350000, note: 'Lesson 4 pending application' },
        { category: 'Cloud', amount: 200000, note: 'Lesson 1 pending application' },
        { category: 'Software', amount: 200000, note: 'Lesson 2 pending application' },
        { category: 'Security', amount: 80000, note: 'Verified stable pricing' },
        { category: 'Training', amount: 80000, note: 'Optimizing voucher usage' },
      ],
      comparisonMode: 'WITH_MEMORY',
    },
    keyTakeaway: 'The AI does not hallucinate past facts—every claim links to a verifiable historical ledger item.',
  },
  5: {
    sceneNumber: 5,
    title: 'Scene 5: Dynamic Budget Adjustment with Visible Deltas',
    subtitle: 'Watch line-items dynamically transform based on organizational memory.',
    userPrompt: 'Apply recalled lessons to the budget allocation.',
    agentResponse: 'Applying 4 lessons: Software reduced ₹50k (license reuse), Cloud contingency increased ₹20k, Hardware maintenance added ₹20k, Training trimmed ₹40k.',
    state: {
      availableBudget: 1000000,
      plannedBudget: 800000,
      savings: 200000,
      unallocatedReserve: 200000,
      memoryActive: true,
      memories: orgStore.getMemoryLessons(),
      allocations: [
        { category: 'Hardware', amount: 350000, prevAmount: 350000, delta: 0, note: '5 developer workstations procured' },
        { category: 'Cloud', amount: 160000, prevAmount: 200000, delta: -40000, note: 'Rightsized instances + auto weekend shutdown' },
        { category: 'Software', amount: 100000, prevAmount: 150000, delta: -50000, note: 'Reusing 12 existing inactive Jira & Slack seats' },
        { category: 'Security', amount: 80000, prevAmount: 100000, delta: -20000, note: 'Essential SOC2 compliance tier preserved' },
        { category: 'Training', amount: 40000, prevAmount: 80000, delta: -40000, note: 'Targeted certification vouchers only' },
        { category: 'Maintenance', amount: 20000, prevAmount: 0, delta: 20000, note: 'Hardware accidental damage reserve injected' },
        { category: 'Contingency', amount: 70000, prevAmount: 50000, delta: 20000, note: 'Evidence-based cloud & hardware buffer' },
      ],
      comparisonMode: 'WITH_MEMORY',
    },
    keyTakeaway: 'Live mathematical adjustments: Software drops by ₹50k, maintenance is created, and cloud contingency is bolstered.',
  },
  6: {
    sceneNumber: 6,
    title: 'Scene 6: Minimum Effective Budget & Unallocated Reserve',
    subtitle: 'Available Budget ≠ Target Spend: ₹2,00,000 preserved as strategic cash.',
    userPrompt: 'Finalize Minimum Effective Budget calculation.',
    agentResponse: 'Calculated: ₹8,00,000 fulfills 100% of essential requirements. Preserving ₹2,00,000 as Unallocated Reserve. Remember: Not spending money is also an optimization.',
    state: {
      availableBudget: 1000000,
      plannedBudget: 800000,
      savings: 200000,
      unallocatedReserve: 200000,
      memoryActive: true,
      memories: orgStore.getMemoryLessons(),
      allocations: [
        { category: 'Hardware', amount: 350000, note: '43.8% of optimized spend' },
        { category: 'Cloud', amount: 160000, note: '20.0% of optimized spend' },
        { category: 'Software', amount: 100000, note: '12.5% of optimized spend' },
        { category: 'Security', amount: 80000, note: '10.0% of optimized spend' },
        { category: 'Training', amount: 40000, note: '5.0% of optimized spend' },
        { category: 'Maintenance', amount: 20000, note: '2.5% of optimized spend' },
        { category: 'Contingency', amount: 70000, note: '8.8% evidence-based contingency' },
      ],
      comparisonMode: 'WITH_MEMORY',
    },
    keyTakeaway: 'Budget availability is NOT a license to spend. The agent protects the company balance sheet.',
  },
  7: {
    sceneNumber: 7,
    title: 'Scene 7: Priority Pivot (Reliability > Lowest Price)',
    subtitle: 'User specifies enterprise reliability over cheap initial bidding.',
    userPrompt: 'Reliability is more important than lowest price for this project.',
    agentResponse: 'Dynamically re-evaluating vendors: Rejecting Vendor A (CloudCore CheapHost: 48h SLA, 42h past downtime). Selecting Vendor B (ApexCloud Enterprise: 99.95% uptime, 1h SLA, lower 3-year TCO).',
    state: {
      availableBudget: 1000000,
      plannedBudget: 815000,
      savings: 185000,
      unallocatedReserve: 185000,
      memoryActive: true,
      memories: orgStore.getMemoryLessons(),
      vendorComparison: {
        vendorA: 'CloudCore CheapHost (Quote: ₹80,000 | 3-Yr TCO: ₹3,12,000 | Uptime: 98.2% | SLA: 48h)',
        vendorB: 'ApexCloud Enterprise (Quote: ₹95,000 | 3-Yr TCO: ₹2,98,000 | Uptime: 99.95% | SLA: 1h)',
        decision: 'Selected ApexCloud Enterprise for ₹14,000 lower 3-Year TCO and zero downtime risk.',
      },
      allocations: [
        { category: 'Hardware', amount: 350000, note: 'SecureWorkstations direct' },
        { category: 'Cloud', amount: 175000, note: 'ApexCloud SLA Tier (+₹15k upfront, -₹14k 3yr TCO)' },
        { category: 'Software', amount: 100000, note: 'Existing seat reuse' },
        { category: 'Security', amount: 80000, note: 'SOC2 compliant' },
        { category: 'Training', amount: 40000, note: 'Targeted certifications' },
        { category: 'Maintenance', amount: 20000, note: 'Accidental buffer' },
        { category: 'Contingency', amount: 70000, note: 'Evidence-backed' },
      ],
      comparisonMode: 'WITH_MEMORY',
    },
    keyTakeaway: 'Cheaper upfront does not mean financially superior. Total Economic Value governs procurement.',
  },
  8: {
    sceneNumber: 8,
    title: 'Scene 8: Optimization Sandbox (What if budget is ₹7.5L?)',
    subtitle: 'Experiment with scenarios in the sandbox without modifying the approved budget.',
    userPrompt: 'What if we reduce the budget constraint to ₹7.5 lakh?',
    agentResponse: 'Simulating Scenario C in Sandbox: At ₹7.5L, requirement coverage drops to 88%. Training is deferred, secondary staging environments removed, and contingency shrinks.',
    state: {
      availableBudget: 750000,
      plannedBudget: 720000,
      savings: 30000,
      unallocatedReserve: 30000,
      memoryActive: true,
      memories: orgStore.getMemoryLessons(),
      whatIfScenarios: calculateWhatIfScenarios({
        baseAvailableBudget: 1000000,
        targetBudgetLimit: 750000,
        teamSize: 10,
        durationMonths: 12,
        priority: 'BALANCED',
        vendorPreference: 'RELIABLE',
        reuseExistingResources: true,
      }),
      allocations: [
        { category: 'Hardware', amount: 300000, note: 'Mid-tier laptops (trade-off: compile speed)' },
        { category: 'Cloud', amount: 130000, note: 'Single shared dev/staging environment' },
        { category: 'Software', amount: 70000, note: 'Strict seat freeze' },
        { category: 'Security', amount: 60000, note: 'Baseline security only' },
        { category: 'Training', amount: 0, note: 'DEFERRED: Training omitted' },
        { category: 'Maintenance', amount: 10000, note: 'Partial warranty' },
        { category: 'Contingency', amount: 30000, note: 'High risk of overage' },
      ],
      comparisonMode: 'WITH_MEMORY',
    },
    keyTakeaway: 'The sandbox makes trade-offs transparent rather than forcing an opaque algorithm choice.',
  },
  9: {
    sceneNumber: 9,
    title: 'Scene 9: Fast-Forward Actual Spending & Variance',
    subtitle: 'The project executes and real actual expenditures are recorded.',
    userPrompt: 'Record actual spending after project completion.',
    agentResponse: 'Fast-forwarding 12 months: Recording actual invoices against planned figures. Cloud was kept at ₹1,68,000 (well within the ₹1,60,000 + contingency), Software was ₹95,000.',
    state: {
      availableBudget: 1000000,
      plannedBudget: 800000,
      savings: 200000,
      unallocatedReserve: 200000,
      memoryActive: true,
      memories: orgStore.getMemoryLessons(),
      actualSpending: [
        { category: 'Hardware', planned: 350000, actual: 350000, variance: 0, variancePct: 0, status: 'EXACT' },
        { category: 'Cloud', planned: 160000, actual: 168000, variance: 8000, variancePct: 5.0, status: 'ABSORBED_BY_CONTINGENCY' },
        { category: 'Software', planned: 100000, actual: 95000, variance: -5000, variancePct: -5.0, status: 'UNDERRUN' },
        { category: 'Security', planned: 80000, actual: 79000, variance: -1000, variancePct: -1.25, status: 'UNDERRUN' },
        { category: 'Training', planned: 40000, actual: 38000, variance: -2000, variancePct: -5.0, status: 'UNDERRUN' },
        { category: 'Maintenance', planned: 20000, actual: 18000, variance: -2000, variancePct: -10.0, status: 'UNDERRUN' },
        { category: 'Contingency', planned: 70000, actual: 8000, variance: -62000, variancePct: -88.6, status: 'UNUSED_SURPLUS' },
      ],
      allocations: [
        { category: 'Hardware', amount: 350000, note: 'Actual: ₹3,50,000 (100%)' },
        { category: 'Cloud', amount: 168000, note: 'Actual: ₹1,68,000 (+₹8k absorbed by contingency)' },
        { category: 'Software', amount: 95000, note: 'Actual: ₹95,000 (-₹5k savings)' },
        { category: 'Security', amount: 79000, note: 'Actual: ₹79,000' },
        { category: 'Training', amount: 38000, note: 'Actual: ₹38,000' },
        { category: 'Maintenance', amount: 18000, note: 'Actual: ₹18,000' },
        { category: 'Contingency Used', amount: 8000, note: '₹62,000 contingency returned to company' },
      ],
      comparisonMode: 'WITH_MEMORY',
    },
    keyTakeaway: 'The evidence-backed contingency absorbed the ₹8k cloud bump without breaking the budget.',
  },
  10: {
    sceneNumber: 10,
    title: 'Scene 10: Extract Outcome Lesson & Retain to Hindsight',
    subtitle: 'The learning loop closes: postmortem observations are synthesized and permanently stored.',
    userPrompt: 'Extract project outcome and retain new organizational lesson in Hindsight.',
    agentResponse: 'Extracting lesson: Software utilization remained high with pooled seats; the ₹8k cloud variance was successfully cushioned by contingency. Retaining lesson to Hindsight memory bank!',
    state: {
      availableBudget: 1000000,
      plannedBudget: 800000,
      savings: 200000,
      unallocatedReserve: 200000,
      memoryActive: true,
      memories: orgStore.getMemoryLessons(),
      newLessonLearned: {
        title: 'License Seat Pooling Strategy Validation',
        category: 'Software & Cloud',
        sourceProject: 'Engineering Team 1-Year Establishment',
        lessonText: 'Pooling existing Jira/Slack seats across engineering squads avoided ₹50,000 in upfront procurement without any workflow interruption. Cloud contingency of ₹70,000 successfully absorbed an ₹8,000 surge, leaving ₹62,000 returned to treasury.',
        quantitativeImpact: 'Avoided ₹50,000 in software + returned ₹62,000 unused contingency.',
        financialAdjustmentRule: 'Standardize cross-departmental license harvesting as mandatory Step 1 for all technical budgets.',
      },
      allocations: [
        { category: 'Total Spent', amount: 756000, note: 'Final actual cost' },
        { category: 'Total Preserved', amount: 244000, note: 'Returned to organizational reserve' },
      ],
      comparisonMode: 'WITH_MEMORY',
    },
    keyTakeaway: 'Knowledge is retained permanently in Hindsight so the next budget planner starts smarter.',
  },
  11: {
    sceneNumber: 11,
    title: 'Scene 11: The Payoff — New Budget Recalls the New Lesson!',
    subtitle: 'Plan a subsequent project (Mobile Squad 2027) and witness cumulative intelligence.',
    userPrompt: 'Plan budget for Mobile Squad Establishment (₹8 Lakh).',
    agentResponse: 'BudgetMind recalled the newly retained lesson from Project 1! Reusing the License Harvesting Rule automatically saved ₹40,000 on Mobile Squad software procurement.',
    state: {
      availableBudget: 800000,
      plannedBudget: 620000,
      savings: 180000,
      unallocatedReserve: 180000,
      memoryActive: true,
      memories: [
        ...orgStore.getMemoryLessons(),
        {
          id: 'mem-05-new',
          title: 'License Seat Pooling Strategy Validation',
          category: 'Software',
          sourceProject: 'Engineering Team 1-Year Establishment',
          lessonText: 'Reusing pooled software seats saved ₹50k without friction. Mandatory license harvesting applied to Mobile Squad.',
          quantitativeImpact: 'Saved ₹40,000 for Mobile Squad project.',
          financialAdjustmentRule: 'Mandatory license harvesting applied before any software purchase order.',
          confidence: 0.99,
          tags: ['software', 'harvesting', 'cumulative-learning'],
          retainedAt: new Date().toISOString(),
        },
      ],
      allocations: [
        { category: 'Hardware (Mobile Test Devices)', amount: 280000, note: 'Test phones + workstations' },
        { category: 'Cloud (Mobile CI/CD Pipeline)', amount: 140000, note: 'Targeted build runners' },
        { category: 'Software (License Harvesting Applied)', amount: 60000, note: 'Harvested seats from Project 1! (-₹40k savings)' },
        { category: 'Security (Mobile App Integrity)', amount: 60000, note: 'App shielding & signing' },
        { category: 'Contingency', amount: 40000, note: 'Evidence-backed' },
        { category: 'Maintenance', amount: 40000, note: 'Hardware buffer' },
      ],
      comparisonMode: 'WITH_MEMORY',
    },
    keyTakeaway: 'The full loop is complete: Plan -> Spend -> Outcome -> Learn -> Hindsight -> Smarter Next Budget.',
  },
};

// GET /api/demo/scene/:sceneNumber
router.get('/scene/:sceneNumber', async (req, res) => {
  const sceneNum = parseInt(req.params.sceneNumber, 10);
  const scene = DEMO_SCENES[sceneNum];

  if (!scene) {
    return res.status(404).json({ error: `Scene ${sceneNum} not found. Must be between 1 and 11.` });
  }

  // If Scene 10 or 11, ensure the new lesson is persisted in hindsight
  if (sceneNum === 10 && scene.state.newLessonLearned) {
    await hindsightService.retain(scene.state.newLessonLearned.lessonText, {
      category: scene.state.newLessonLearned.category,
      sourceProject: scene.state.newLessonLearned.sourceProject,
      quantitativeImpact: scene.state.newLessonLearned.quantitativeImpact,
      financialRule: scene.state.newLessonLearned.financialAdjustmentRule,
      tags: ['demo', 'cumulative-learning', 'license-harvesting'],
    });
  }

  res.json({
    success: true,
    data: scene,
  });
});

// GET /api/demo/all-scenes
router.get('/all-scenes', (req, res) => {
  res.json({
    success: true,
    totalScenes: Object.keys(DEMO_SCENES).length,
    scenes: Object.values(DEMO_SCENES).map(s => ({
      sceneNumber: s.sceneNumber,
      title: s.title,
      subtitle: s.subtitle,
      keyTakeaway: s.keyTakeaway,
    })),
  });
});

// POST /api/demo/reset
router.post('/reset', (req, res) => {
  orgStore.resetToDefaultSeed();
  res.json({
    success: true,
    message: 'Demo state reset to initial baseline.',
  });
});

export default router;
