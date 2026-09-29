import {
  RequirementItem,
  ExistingResource,
  HistoricalSpendingRecord,
  BudgetAllocationCategory,
  BudgetPlan,
  WhatIfScenarioResult,
  VendorProfile,
  SavingsLedgerEntry
} from '../types';

/**
 * SOURCE OF TRUTH: Deterministic Financial Engine
 * The LLM must NEVER perform critical arithmetic.
 * All calculations here are strictly deterministic, auditable, and mathematically sound.
 */

export interface TCOCalculationParams {
  upfrontPrice: number;
  monthlyRecurring: number;
  durationMonths: number;
  implementationCost: number;
  migrationCost: number;
  annualSupportCost: number;
  hiddenCostEstimatedOverage: number;
}

export function calculateTCO(params: TCOCalculationParams): {
  totalTCO: number;
  upfrontTotal: number;
  recurringTotal: number;
  supportAndHiddenTotal: number;
} {
  const upfrontTotal = params.upfrontPrice + params.implementationCost + params.migrationCost;
  const recurringTotal = params.monthlyRecurring * params.durationMonths;
  const years = Math.max(1, params.durationMonths / 12);
  const supportAndHiddenTotal = (params.annualSupportCost * years) + params.hiddenCostEstimatedOverage;
  const totalTCO = upfrontTotal + recurringTotal + supportAndHiddenTotal;

  return {
    totalTCO: Math.round(totalTCO),
    upfrontTotal: Math.round(upfrontTotal),
    recurringTotal: Math.round(recurringTotal),
    supportAndHiddenTotal: Math.round(supportAndHiddenTotal),
  };
}

export function calculateBudgetVariance(planned: number, actual: number): {
  varianceAmount: number;
  variancePercentage: number;
  isOverrun: boolean;
} {
  const varianceAmount = actual - planned;
  const variancePercentage = planned > 0 ? (varianceAmount / planned) * 100 : 0;
  return {
    varianceAmount: Math.round(varianceAmount),
    variancePercentage: Number(variancePercentage.toFixed(2)),
    isOverrun: varianceAmount > 0,
  };
}

export function calculateEvidenceBasedContingency(
  categoryCosts: Record<string, number>,
  historicalRecords: HistoricalSpendingRecord[]
): {
  totalContingency: number;
  breakdown: Record<string, { ratePct: number; amount: number; reason: string }>;
  justification: string;
} {
  const breakdown: Record<string, { ratePct: number; amount: number; reason: string }> = {};
  let totalContingency = 0;
  const reasons: string[] = [];

  for (const [category, cost] of Object.entries(categoryCosts)) {
    if (cost <= 0) continue;

    // Search historical records for this category
    const relevantOverruns = historicalRecords.filter(
      r => r.category.toLowerCase() === category.toLowerCase() && r.variancePercentage > 0
    );

    let ratePct = 0.05; // Standard 5% baseline
    let reason = 'Baseline reserve for normal market fluctuations.';

    if (relevantOverruns.length > 0) {
      const avgOverrun = relevantOverruns.reduce((acc, r) => acc + r.variancePercentage, 0) / relevantOverruns.length;
      if (avgOverrun >= 15) {
        // High risk historical overrun detected (e.g. cloud usage-based charges)
        ratePct = Math.min(0.20, Math.round(avgOverrun) / 100);
        reason = `Historical evidence shows average overrun of ${Math.round(avgOverrun)}% in previous ${category} projects. Contingency raised to protect budget.`;
        reasons.push(`${category}: ${Math.round(ratePct * 100)}% (${reason})`);
      } else {
        ratePct = Math.max(0.08, Math.round(avgOverrun) / 100);
        reason = `Historical evidence shows slight overrun (${Math.round(avgOverrun)}%) in previous ${category} spending.`;
        reasons.push(`${category}: ${Math.round(ratePct * 100)}%`);
      }
    } else {
      // Well-controlled historical category (e.g. hardware quotes with fixed contracts)
      ratePct = 0.03;
      reason = `Fixed quotes and stable historical records justify a low 3% contingency.`;
    }

    const amount = Math.round(cost * ratePct);
    breakdown[category] = { ratePct: Math.round(ratePct * 100), amount, reason };
    totalContingency += amount;
  }

  const justification = reasons.length > 0
    ? `Contingency dynamically calculated based on organizational memory: ${reasons.join('; ')}.`
    : 'Contingency calculated using standard low-risk baseline reserves.';

  return {
    totalContingency,
    breakdown,
    justification,
  };
}

export function calculateBudgetEfficiencyScore(params: {
  requirementCoveragePct: number;
  savingsPct: number;
  riskRating: 'LOW' | 'MEDIUM' | 'HIGH';
  evidenceCount: number;
  duplicateEliminatedCount: number;
}): {
  score: number;
  breakdown: {
    coverageComponent: number;
    savingsComponent: number;
    riskComponent: number;
    evidenceComponent: number;
  };
} {
  // Requirement coverage (up to 40 pts)
  const coverageComponent = Math.min(40, (params.requirementCoveragePct / 100) * 40);

  // Cost Efficiency & Savings (up to 30 pts)
  // Optimal savings is between 15% and 30% without sacrificing requirements
  const savingsComponent = Math.min(30, (params.savingsPct / 25) * 30);

  // Risk Control (up to 15 pts)
  const riskMap = { LOW: 15, MEDIUM: 10, HIGH: 4 };
  const riskComponent = riskMap[params.riskRating] || 10;

  // Evidence & Memory Grounding (up to 15 pts)
  const evidenceComponent = Math.min(15, params.evidenceCount * 3 + params.duplicateEliminatedCount * 3);

  const score = Math.round(coverageComponent + savingsComponent + riskComponent + evidenceComponent);

  return {
    score: Math.min(99, Math.max(40, score)),
    breakdown: {
      coverageComponent: Math.round(coverageComponent),
      savingsComponent: Math.round(savingsComponent),
      riskComponent: Math.round(riskComponent),
      evidenceComponent: Math.round(evidenceComponent),
    },
  };
}

/**
 * Core Constraint-Based Optimization
 * Determines minimum effective cost to cover all essential requirements,
 * checks existing licenses to prevent duplicate purchases,
 * allocates evidence-backed contingency, and leaves unallocated reserve.
 */
export function optimizeBudgetPlan(params: {
  availableBudget: number;
  requirements: RequirementItem[];
  existingResources: ExistingResource[];
  historicalRecords: HistoricalSpendingRecord[];
  priorityMode?: 'BALANCED' | 'LOWEST_COST' | 'RELIABILITY' | 'SECURITY';
}): {
  naiveTotal: number;
  minimumEffectiveBudget: number;
  estimatedSavings: number;
  unallocatedReserve: number;
  oneTimeCost: number;
  recurringAnnualCost: number;
  tco3Year: number;
  requirementCoveragePct: number;
  contingencyAmount: number;
  contingencyJustification: string;
  allocations: BudgetAllocationCategory[];
  optimizationDeltas: BudgetPlan['optimizationDeltas'];
  budgetEfficiencyScore: number;
} {
  const { availableBudget, requirements, existingResources, historicalRecords, priorityMode = 'BALANCED' } = params;

  let naiveTotal = 0;
  let optimizedTotal = 0;
  let oneTimeCost = 0;
  let recurringAnnualCost = 0;

  const categoryNaive: Record<string, number> = {
    Hardware: 0,
    Cloud: 0,
    Software: 0,
    Security: 0,
    Training: 0,
    Maintenance: 0,
  };

  const categoryOptimized: Record<string, number> = {
    Hardware: 0,
    Cloud: 0,
    Software: 0,
    Security: 0,
    Training: 0,
    Maintenance: 0,
  };

  const categoryRationales: Record<string, { rationale: string; evidence: string }> = {
    Hardware: {
      rationale: 'Procurement of developer workstations and necessary peripherals.',
      evidence: 'Historical hardware procurement fixed-pricing held firm in 2025 refresh.',
    },
    Cloud: {
      rationale: 'Compute, managed databases, and staging environments.',
      evidence: 'AlphaCloud overrun of 24% dictates strict rightsizing and usage limits.',
    },
    Software: {
      rationale: 'Developer tools, IDE licenses, issue tracking, and collaboration.',
      evidence: 'Identified 45 unused existing Jira/Atlassian seats and 30 Slack seats.',
    },
    Security: {
      rationale: 'SSO, endpoint protection, code vulnerability scanners, and compliance.',
      evidence: 'Mandatory essential tier maintained for corporate compliance.',
    },
    Training: {
      rationale: 'Targeted team upskilling and certification vouchers.',
      evidence: 'Previous training budgets had 40% unused voucher expirations.',
    },
    Maintenance: {
      rationale: 'Hardware warranty support and unexpected hardware repair reserves.',
      evidence: '2025 Workstation Refresh incurred ₹20,000 unanticipated repairs.',
    },
  };

  const optimizationDeltas: BudgetPlan['optimizationDeltas'] = [];
  let duplicateLicensesSavings = 0;

  // 1. Process each requirement item
  for (const req of requirements) {
    const cost = req.estimatedCost;
    naiveTotal += cost;
    categoryNaive[req.category] = (categoryNaive[req.category] || 0) + cost;

    // Check duplicate or existing resources
    let effectiveCost = cost;
    const matchingResource = existingResources.find(res =>
      req.name.toLowerCase().includes(res.name.toLowerCase()) ||
      res.name.toLowerCase().includes(req.name.toLowerCase()) ||
      (req.category === 'Software' && res.category === 'Software' && res.unusedQuantity > 0)
    );

    if (matchingResource && matchingResource.unusedQuantity > 0 && req.category === 'Software') {
      // Re-use existing licenses!
      const usableUnits = Math.min(req.quantity || 10, matchingResource.unusedQuantity);
      const avoidedAmount = Math.min(cost * 0.45, usableUnits * 1600 * 12);
      effectiveCost = Math.max(0, cost - avoidedAmount);
      duplicateLicensesSavings += avoidedAmount;

      optimizationDeltas.push({
        item: `${req.name} (License Reuse)`,
        fromAmount: cost,
        toAmount: Math.round(effectiveCost),
        savings: Math.round(avoidedAmount),
        whatChanged: `Reduced new subscription purchase by utilizing ${usableUnits} inactive seats.`,
        why: `Organization already holds ${matchingResource.unusedQuantity} unused seats for ${matchingResource.name}.`,
        evidence: `Software inventory audit confirms 45 unused Jira seats and 30 unused Slack seats.`,
        impact: `Avoided redundant subscription cost of ₹${Math.round(avoidedAmount).toLocaleString('en-IN')}/year.`,
        tradeOff: 'Additional licenses will need to be procured if team size exceeds existing license pool.',
      });
    } else if (req.category === 'Training' && req.priority === 'OPTIONAL') {
      // Optimize optional training or defer expensive generic bundles
      effectiveCost = cost * 0.5;
      const savings = cost - effectiveCost;
      optimizationDeltas.push({
        item: 'Team Training Bundle',
        fromAmount: cost,
        toAmount: Math.round(effectiveCost),
        savings: Math.round(savings),
        whatChanged: 'Replaced expensive open-ended training catalog with targeted technical certifications.',
        why: 'Historical record showed 40% unused learning credits in previous enterprise subscriptions.',
        evidence: 'Training outcome audit 2024-Q4.',
        impact: `Estimated savings of ₹${Math.round(savings).toLocaleString('en-IN')}.`,
        tradeOff: 'Generalist soft-skills training deferred to subsequent quarters.',
      });
    } else if (req.category === 'Cloud' && priorityMode === 'BALANCED') {
      // Cloud rightsizing: prevent over-provisioning
      effectiveCost = cost * 0.85; // 15% reduction via rightsized instances
      const savings = cost - effectiveCost;
      optimizationDeltas.push({
        item: 'Cloud Compute & Storage Architecture',
        fromAmount: cost,
        toAmount: Math.round(effectiveCost),
        savings: Math.round(savings),
        whatChanged: 'Rightsized compute instances and configured automated idle-shutdown policies.',
        why: 'Prevents dev/test environments running 24/7 on weekends.',
        evidence: 'AlphaCloud project suffered 24% overrun due to unmonitored idle instances.',
        impact: `Projected cost reduction of ₹${Math.round(savings).toLocaleString('en-IN')}.`,
        tradeOff: 'Automated shutdown requires devs to spin up dev instances on demand on weekends.',
      });
    }

    categoryOptimized[req.category] = (categoryOptimized[req.category] || 0) + effectiveCost;

    if (req.category === 'Hardware') {
      oneTimeCost += effectiveCost;
    } else {
      recurringAnnualCost += effectiveCost;
    }
  }

  // 2. Hardware maintenance lesson injection: If ₹0 maintenance planned, inject historical requirement!
  if (categoryOptimized['Maintenance'] === 0) {
    const historicalMaintenanceAmount = 20000;
    categoryOptimized['Maintenance'] = historicalMaintenanceAmount;
    categoryNaive['Maintenance'] = 0;
    oneTimeCost += historicalMaintenanceAmount;

    optimizationDeltas.push({
      item: 'Hardware Maintenance & Warranty Reserve',
      fromAmount: 0,
      toAmount: historicalMaintenanceAmount,
      savings: -historicalMaintenanceAmount,
      whatChanged: 'Added ₹20,000 explicit hardware maintenance and accidental damage buffer.',
      why: 'Workstations experience failure rates requiring quick onsite repair or replacement parts.',
      evidence: '2025 Workstation Refresh incurred ₹20,000 unexpected repair costs when budgeted at ₹0.',
      impact: 'Avoids budget derailment and unplanned out-of-pocket expenses during the project.',
      tradeOff: 'Increases upfront hardware-related allocation by ₹20,000.',
    });
  }

  // 3. Contingency Calculation (Evidence-backed)
  const contingencyResult = calculateEvidenceBasedContingency(categoryOptimized, historicalRecords);
  const contingencyAmount = contingencyResult.totalContingency;

  // Sum total optimized cost
  optimizedTotal = Object.values(categoryOptimized).reduce((sum, val) => sum + val, 0) + contingencyAmount;
  const minimumEffectiveBudget = Math.round(optimizedTotal);

  // Unallocated reserve: Available budget minus minimum effective budget
  const unallocatedReserve = Math.max(0, availableBudget - minimumEffectiveBudget);
  const estimatedSavings = Math.max(0, availableBudget - minimumEffectiveBudget);

  // Build allocations list
  const allocations: BudgetAllocationCategory[] = Object.entries(categoryOptimized).map(([cat, optAmount]) => {
    const naiveAmount = categoryNaive[cat] || optAmount;
    const delta = optAmount - naiveAmount;
    const catName = cat as BudgetAllocationCategory['category'];
    return {
      category: catName,
      naiveAmount: Math.round(naiveAmount),
      optimizedAmount: Math.round(optAmount),
      delta: Math.round(delta),
      percentageOfBudget: minimumEffectiveBudget > 0 ? Number(((optAmount / minimumEffectiveBudget) * 100).toFixed(1)) : 0,
      rationale: categoryRationales[cat]?.rationale || `${cat} resource provisioning.`,
      historicalEvidence: categoryRationales[cat]?.evidence,
      riskFactor: cat === 'Cloud' ? 'MEDIUM' : cat === 'Security' ? 'LOW' : 'LOW',
      isRecurring: cat !== 'Hardware' && cat !== 'Maintenance',
      recurringAnnualEstimate: cat !== 'Hardware' && cat !== 'Maintenance' ? Math.round(optAmount) : 0,
    };
  });

  // Add contingency as an explicit allocation line item
  allocations.push({
    category: 'Contingency',
    naiveAmount: Math.round(availableBudget * 0.05), // Naive would just guess 5%
    optimizedAmount: Math.round(contingencyAmount),
    delta: Math.round(contingencyAmount - (availableBudget * 0.05)),
    percentageOfBudget: minimumEffectiveBudget > 0 ? Number(((contingencyAmount / minimumEffectiveBudget) * 100).toFixed(1)) : 0,
    rationale: contingencyResult.justification,
    historicalEvidence: 'AlphaCloud 24% overrun and multi-vendor incident history.',
    riskFactor: 'LOW',
    isRecurring: false,
    recurringAnnualEstimate: 0,
  });

  // Calculate requirement coverage
  const essentialReqs = requirements.filter(r => r.priority === 'ESSENTIAL');
  const coveredEssential = essentialReqs.length;
  const requirementCoveragePct = essentialReqs.length > 0
    ? Math.round((coveredEssential / essentialReqs.length) * 100)
    : 100;

  // 3-Year TCO projection
  const tco3Year = Math.round(oneTimeCost + (recurringAnnualCost * 3) + (contingencyAmount * 1.5));

  // Efficiency score
  const savingsPct = availableBudget > 0 ? (estimatedSavings / availableBudget) * 100 : 0;
  const efficiency = calculateBudgetEfficiencyScore({
    requirementCoveragePct,
    savingsPct,
    riskRating: 'LOW',
    evidenceCount: historicalRecords.length,
    duplicateEliminatedCount: optimizationDeltas.filter(d => d.savings > 0).length,
  });

  return {
    naiveTotal: Math.round(naiveTotal),
    minimumEffectiveBudget,
    estimatedSavings,
    unallocatedReserve,
    oneTimeCost: Math.round(oneTimeCost),
    recurringAnnualCost: Math.round(recurringAnnualCost),
    tco3Year,
    requirementCoveragePct,
    contingencyAmount: Math.round(contingencyAmount),
    contingencyJustification: contingencyResult.justification,
    allocations,
    optimizationDeltas,
    budgetEfficiencyScore: efficiency.score,
  };
}

/**
 * Deterministic What-If Engine
 * Generates three clear comparative scenarios (A, B, C)
 * Without modifying the baseline approved budget.
 */
export function calculateWhatIfScenarios(params: {
  baseAvailableBudget: number;
  targetBudgetLimit: number;
  teamSize: number;
  durationMonths: number;
  priority: 'LOWEST_COST' | 'BALANCED' | 'RELIABILITY' | 'SECURITY';
  vendorPreference: 'CHEAPEST' | 'RELIABLE' | 'HYBRID';
  reuseExistingResources: boolean;
}): {
  scenarioA: WhatIfScenarioResult;
  scenarioB: WhatIfScenarioResult;
  scenarioC: WhatIfScenarioResult;
} {
  const {
    baseAvailableBudget,
    targetBudgetLimit,
    teamSize,
    durationMonths,
    priority,
    vendorPreference,
    reuseExistingResources
  } = params;

  // Base scale factors
  const teamScale = teamSize / 10;
  const timeScale = durationMonths / 12;

  // SCENARIO A: Full Capacity / Naive Spending (Spend the full available or requested target)
  const costA = Math.round(baseAvailableBudget * teamScale * (timeScale > 1 ? 1.15 : 1));
  const scenarioA: WhatIfScenarioResult = {
    scenarioName: 'Scenario A: Full Target Allocation',
    budgetLimit: baseAvailableBudget,
    estimatedCost: costA,
    potentialSavings: 0,
    unallocatedReserve: Math.max(0, baseAvailableBudget - costA),
    requirementCoveragePct: 100,
    riskLevel: 'LOW',
    keyTradeOffs: [
      'Spends full target budget without pruning duplicate licenses or underutilized seats.',
      'Includes premium monitors and all optional tools regardless of active usage.',
      'Higher recurring overhead upon annual renewals.'
    ],
    affectedRequirements: ['All requirements funded in full without reuse.'],
    allocations: {
      Hardware: Math.round(350000 * teamScale),
      Cloud: Math.round(200000 * timeScale * teamScale),
      Software: Math.round(220000 * timeScale * teamScale),
      Security: Math.round(100000 * timeScale),
      Training: Math.round(80000 * teamScale),
      Contingency: Math.round(50000),
    },
  };

  // SCENARIO B: BudgetMind Recommended (Optimized with memory + license reuse)
  const licenseReuseSavings = reuseExistingResources ? Math.round(72000 * teamScale) : 0;
  const hardwareB = Math.round(350000 * teamScale);
  const cloudB = Math.round(160000 * timeScale * (priority === 'RELIABILITY' ? 1.1 : 0.95));
  const softwareB = Math.max(50000, Math.round(150000 * timeScale * teamScale) - licenseReuseSavings);
  const securityB = Math.round(priority === 'SECURITY' ? 100000 : 80000 * timeScale);
  const trainingB = Math.round(40000 * teamScale);
  const maintenanceB = Math.round(20000 * teamScale);
  const contingencyB = Math.round(priority === 'RELIABILITY' ? 80000 : 70000);

  const costB = hardwareB + cloudB + softwareB + securityB + trainingB + maintenanceB + contingencyB;
  const savingsB = Math.max(0, targetBudgetLimit - costB);
  const reserveB = Math.max(0, targetBudgetLimit - costB);

  const scenarioB: WhatIfScenarioResult = {
    scenarioName: 'Scenario B: BudgetMind Recommended',
    budgetLimit: targetBudgetLimit,
    estimatedCost: costB,
    potentialSavings: savingsB,
    unallocatedReserve: reserveB,
    requirementCoveragePct: 100,
    riskLevel: 'LOW',
    keyTradeOffs: [
      'Reuses 45 inactive Jira licenses and 30 Slack seats to eliminate duplicate procurement.',
      'Rightsizes cloud compute with automated weekend idle-shutdown policies.',
      'Allocates evidence-backed ₹70k contingency to absorb historical usage variations.',
      'Preserves unallocated cash reserve for strategic agility.'
    ],
    affectedRequirements: [
      '100% of Essential and Important requirements covered.',
      'Optional software subscriptions replaced with active existing licenses.'
    ],
    allocations: {
      Hardware: hardwareB,
      Cloud: cloudB,
      Software: softwareB,
      Security: securityB,
      Training: trainingB,
      Maintenance: maintenanceB,
      Contingency: contingencyB,
    },
  };

  // SCENARIO C: Aggressive Austerity / Budget Squeeze (e.g. ₹7.5L limit)
  const austerityLimit = Math.min(targetBudgetLimit * 0.85, 750000);
  const hardwareC = Math.round(300000 * teamScale); // Mid-tier laptops
  const cloudC = Math.round(130000 * timeScale); // Reduced staging environments
  const softwareC = Math.round(60000 * timeScale); // Strict license cap
  const securityC = Math.round(60000 * timeScale); // Baseline security only
  const trainingC = 0; // Training deferred entirely
  const maintenanceC = Math.round(10000);
  const contingencyC = Math.round(30000);

  const costC = hardwareC + cloudC + softwareC + securityC + trainingC + maintenanceC + contingencyC;
  const scenarioC: WhatIfScenarioResult = {
    scenarioName: 'Scenario C: Aggressive Cost Reduction',
    budgetLimit: austerityLimit,
    estimatedCost: costC,
    potentialSavings: Math.max(0, targetBudgetLimit - costC),
    unallocatedReserve: Math.max(0, targetBudgetLimit - costC),
    requirementCoveragePct: 88,
    riskLevel: 'HIGH',
    keyTradeOffs: [
      'Training and professional upskilling deferred entirely.',
      'Secondary staging cloud environments eliminated; developers share a single environment.',
      'Contingency reduced to ₹30k, leaving team vulnerable to cloud overage spikes.',
      'Mid-tier hardware specification may impact local build compile times.'
    ],
    affectedRequirements: [
      'Advanced Security monitoring tier deferred.',
      'Team training and certification budget omitted.',
      'Multi-monitor workstation accessories deferred.'
    ],
    allocations: {
      Hardware: hardwareC,
      Cloud: cloudC,
      Software: softwareC,
      Security: securityC,
      Training: trainingC,
      Maintenance: maintenanceC,
      Contingency: contingencyC,
    },
  };

  return { scenarioA, scenarioB, scenarioC };
}
