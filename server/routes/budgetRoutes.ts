import { Router } from 'express';
import { dbRepository } from '../data/dbRepository';
import { orgStore } from '../data/organizationStore';
import { agentTools } from '../agent/agentTools';
import { financialEngine } from '../engine/financialEngine';

const router = Router();

// GET /api/projects
router.get('/projects', async (req, res) => {
  const projects = await dbRepository.getProjects();
  res.json({
    success: true,
    data: projects,
  });
});

// POST /api/projects
router.post('/projects', async (req, res) => {
  try {
    const { title, description, target_budget = 1000000, team_size = 10, duration_months = 12 } = req.body;
    const newProject = {
      id: `proj-${Date.now()}`,
      title,
      description,
      target_budget: Number(target_budget),
      team_size: Number(team_size),
      duration_months: Number(duration_months),
      status: 'PLANNING',
      created_at: new Date().toISOString(),
    };
    res.json({
      success: true,
      data: newProject,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/budgets
router.get('/budgets', async (req, res) => {
  const plans = await dbRepository.getBudgetPlans();
  res.json({
    success: true,
    data: plans,
  });
});

// POST /api/budgets
router.post('/budgets', async (req, res) => {
  try {
    const plan = req.body;
    const saved = await dbRepository.saveBudgetPlan(plan);
    res.json({
      success: true,
      data: saved,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/budgets/:id
router.get('/budgets/:id', async (req, res) => {
  const plan = await dbRepository.getBudgetPlanById(req.params.id);
  if (!plan) {
    return res.status(404).json({ error: 'Budget plan not found' });
  }
  res.json({
    success: true,
    data: plan,
  });
});

// PUT /api/budgets/:id
router.put('/budgets/:id', async (req, res) => {
  try {
    const updated = await dbRepository.saveBudgetPlan({ ...req.body, id: req.params.id });
    res.json({
      success: true,
      data: updated,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/budgets/:id/approve
router.post('/budgets/:id/approve', async (req, res) => {
  try {
    const { approvedBy = 'Finance & Procurement Committee' } = req.body;
    const result = await agentTools.recordBudgetApproval(req.params.id, approvedBy);
    if (!result.success) {
      return res.status(404).json({ error: result.summary });
    }
    res.json({
      success: true,
      message: result.summary,
      data: result.data,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/vendors
router.get('/vendors', async (req, res) => {
  const vendors = await dbRepository.getVendors();
  res.json({
    success: true,
    data: vendors,
  });
});

// GET /api/resources
router.get('/resources', async (req, res) => {
  const resources = await dbRepository.getExistingResources();
  res.json({
    success: true,
    data: resources,
  });
});

// GET /api/history
router.get('/history', async (req, res) => {
  const historical = await dbRepository.getHistoricalRecords();
  res.json({
    success: true,
    data: historical,
  });
});

// GET /api/procurements
router.get('/procurements', async (req, res) => {
  const resources = await dbRepository.getExistingResources();
  const procurements = resources.map(r => ({
    id: `proc-${r.id}`,
    title: r.name,
    category: r.category,
    annualCost: r.costPerUnitAnnual * r.activeUsed,
    renewalDate: r.renewalDate,
    status: 'ACTIVE',
  }));
  res.json({
    success: true,
    data: procurements,
  });
});

// GET /api/expenses
router.get('/expenses', async (req, res) => {
  const actuals = orgStore.getActualSpending();
  const historical = await dbRepository.getHistoricalRecords();
  res.json({
    success: true,
    data: {
      activeSpending: actuals,
      historicalSpending: historical,
    },
  });
});

// GET /api/savings & /api/savings-ledger
router.get(['/savings', '/savings-ledger'], async (req, res) => {
  const ledger = await dbRepository.getSavingsLedger();
  const totalEstimated = ledger
    .filter(e => e.type === 'ESTIMATED')
    .reduce((sum, e) => sum + e.amount, 0);

  const totalVerified = ledger
    .filter(e => e.type === 'VERIFIED')
    .reduce((sum, e) => sum + e.amount, 0);

  const totalAvoidedCost = ledger.reduce((sum, e) => sum + e.amount, 0);

  res.json({
    success: true,
    data: {
      ledger,
      totals: {
        totalEstimated,
        totalVerified,
        totalAvoidedCost,
      },
    },
  });
});

// POST /api/outcomes
router.post('/outcomes', async (req, res) => {
  try {
    const { budgetId, project, outcomeSummary, variancePercentage = 0, lessonsLearned } = req.body;
    const result = await agentTools.recordOutcome({
      budgetId: budgetId || 'active-budget',
      project: project || 'Engineering Deployment',
      outcomeSummary: outcomeSummary || 'Project completed within budget threshold.',
      variancePercentage: Number(variancePercentage),
      unexpectedExpenses: [],
      lessonsLearned: lessonsLearned || 'Continue rightsizing compute and pooling SaaS licenses.',
    });
    res.json({
      success: true,
      data: result.data,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/lessons
router.post('/lessons', async (req, res) => {
  try {
    const { title, category, sourceProject, lessonText, quantitativeImpact, financialRule } = req.body;
    const result = await agentTools.extractLesson({
      title,
      category,
      sourceProject,
      lessonText,
      quantitativeImpact,
      financialRule,
    });
    res.json({
      success: true,
      data: result.data,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/why-unspent
router.get('/why-unspent', (req, res) => {
  const availableBudget = Number(req.query.available || 1000000);
  const minimumEffectiveBudget = Number(req.query.effective || 811175);
  const unallocatedReserve = Math.max(0, availableBudget - minimumEffectiveBudget);

  const explanation = financialEngine.explainUnspentReserve({
    availableBudget,
    minimumEffectiveBudget,
    unallocatedReserve,
    requirementsCoveredPct: 100,
  });

  res.json({
    success: true,
    data: {
      availableBudget,
      minimumEffectiveBudget,
      unallocatedReserve,
      explanation,
    },
  });
});

export default router;
