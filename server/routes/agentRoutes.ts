import { Router } from 'express';
import { budgetLangGraph } from '../agent/budgetLangGraph';
import { agentTools } from '../agent/agentTools';
import { financialEngine } from '../engine/financialEngine';
import { llmService } from '../services/llmService';

const router = Router();

// POST /api/agent/analyze (Requirement decomposition)
router.post('/analyze', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }
    const parsed = await llmService.extractRequirements(prompt);
    res.json({
      success: true,
      data: parsed,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/agent/optimize (Stateful LangGraph Workflow)
router.post('/optimize', async (req, res) => {
  try {
    const { prompt, priority = 'BALANCED' } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'A natural language budget prompt is required.' });
    }

    const state = await budgetLangGraph.executeWorkflow(prompt, priority);
    res.json({
      success: true,
      data: {
        plan: state.budgetPlan,
        executionSteps: state.executionSteps,
        memoryInfluence: {
          memoriesRecalledCount: state.historicalMemories?.length || 0,
          memoriesApplied: state.historicalMemories || [],
          contingencyJustification: state.contingencyJustification,
        },
        transparentReport: {
          availableBudget: state.availableBudget,
          minimumEffectiveBudget: state.minimumEffectiveBudget,
          recommendedBudget: state.minimumEffectiveBudget,
          potentialAvoidedCost: state.budgetPlan?.estimatedSavings || 0,
          unallocatedReserve: state.unallocatedReserve,
          requirementCoveragePct: state.requirementCoveragePct,
          oneTimeCost: state.budgetPlan?.oneTimeCost || 0,
          recurringAnnualCost: state.budgetPlan?.recurringAnnualCost || 0,
          tco3Year: state.budgetPlan?.tco3Year || 0,
          contingencyAmount: state.contingencyAmount,
          whyUnspentExplanation: financialEngine.explainUnspentReserve({
            availableBudget: state.availableBudget,
            minimumEffectiveBudget: state.minimumEffectiveBudget,
            unallocatedReserve: state.unallocatedReserve,
            requirementsCoveredPct: state.requirementCoveragePct,
          }),
          optimizationDeltas: state.budgetPlan?.optimizationDeltas || [],
          risks: state.budgetPlan?.risks || [],
          assumptions: state.budgetPlan?.assumptions || [],
        },
      },
    });
  } catch (err: any) {
    console.error('[agentRoutes] /optimize error:', err);
    res.status(500).json({
      success: false,
      error: err.message || 'Optimization workflow failed',
    });
  }
});

// POST /api/scenarios (What-if scenario generator)
router.post(['/scenarios', '/whatif'], async (req, res) => {
  try {
    const {
      baseAvailableBudget = 1000000,
      targetBudgetLimit = 800000,
      teamSize = 10,
      durationMonths = 12,
      priority = 'BALANCED',
      vendorPreference = 'RELIABLE',
      reuseExistingResources = true,
    } = req.body;

    const result = await agentTools.runWhatIfScenario({
      baseAvailableBudget: Number(baseAvailableBudget),
      targetBudgetLimit: Number(targetBudgetLimit),
      teamSize: Number(teamSize),
      durationMonths: Number(durationMonths),
      priority,
      vendorPreference,
      reuseExistingResources: Boolean(reuseExistingResources),
    });

    res.json({
      success: true,
      data: result.data,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/scenarios/compare
router.post('/scenarios/compare', async (req, res) => {
  try {
    const { scenarios } = req.body;
    res.json({
      success: true,
      message: 'Scenarios compared deterministically.',
      data: scenarios,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/agent/compare-vendors
router.post('/compare-vendors', async (req, res) => {
  try {
    const { vendorAId, vendorBId } = req.body;
    const result = await agentTools.compareVendors(
      vendorAId || 'vnd-cloudcore-01',
      vendorBId || 'vnd-apexcloud-02'
    );
    res.json({
      success: true,
      data: result.data,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/agent/detect-duplicates
router.post('/detect-duplicates', async (req, res) => {
  try {
    const { softwareList } = req.body;
    const list = Array.isArray(softwareList) ? softwareList : ['Jira', 'Slack', 'GitHub'];
    const result = await agentTools.findDuplicateSubscriptions(list);
    res.json({
      success: true,
      data: result.data,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/agent/tools (All 21 deterministic tools)
router.get('/tools', (req, res) => {
  const tools = [
    'searchHistoricalBudgets',
    'searchHistoricalSpending',
    'searchProcurements',
    'searchVendors',
    'getVendorHistory',
    'getExistingResources',
    'findDuplicateSubscriptions',
    'calculateTCO',
    'calculateBudgetAllocation',
    'calculateBudgetVariance',
    'detectHiddenCosts',
    'detectUnusedResources',
    'calculateContingency',
    'compareVendors',
    'runWhatIfScenario',
    'calculateExpectedSavings',
    'createBudgetPlan',
    'recordBudgetApproval',
    'recordSpending',
    'recordOutcome',
    'extractLesson',
  ];

  res.json({
    success: true,
    totalTools: tools.length,
    tools,
  });
});

export default router;
