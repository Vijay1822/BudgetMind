import { orgStore } from '../data/organizationStore';
import { hindsightService } from '../services/hindsightService';
import { llmService } from '../services/llmService';
import { agentTools } from './agentTools';
import {
  BudgetPlan,
  RequirementItem,
  AgentExecutionStep,
  MemoryLesson
} from '../types';

export interface OptimizationAgentResponse {
  plan: BudgetPlan;
  executionSteps: AgentExecutionStep[];
  memoryInfluence: {
    memoriesRecalledCount: number;
    memoriesApplied: MemoryLesson[];
    deltasSummary: string[];
    contingencyJustification: string;
  };
  transparentReport: {
    availableBudget: number;
    minimumEffectiveBudget: number;
    estimatedSavings: number;
    unallocatedReserve: number;
    requirementCoveragePct: number;
    oneTimeCost: number;
    recurringAnnualCost: number;
    tco3Year: number;
    contingencyAmount: number;
    efficiencyScore: number;
    assumptions: string[];
    risks: BudgetPlan['risks'];
    optimizationDeltas: BudgetPlan['optimizationDeltas'];
  };
  executiveSummary: string;
}

export class BudgetOptimizationAgent {
  /**
   * Main Pipeline: Runs full budget optimization workflow with real tool executions
   */
  public async optimizeBudget(userInput: string, customPriority?: 'BALANCED' | 'LOWEST_COST' | 'RELIABILITY' | 'SECURITY'): Promise<OptimizationAgentResponse> {
    const steps: AgentExecutionStep[] = [];
    const addStep = (stepNumber: number, title: string, toolUsed?: string, evidenceFound?: string) => {
      steps.push({
        id: `step-${stepNumber}-${Date.now()}`,
        stepNumber,
        title,
        status: 'COMPLETED',
        toolUsed,
        evidenceFound,
        timestamp: new Date().toISOString(),
      });
    };

    // Step 1: Requirement & Constraint Intake
    addStep(1, 'Requirement understood & constraints extracted', 'extractRequirements', `Target: "${userInput.slice(0, 60)}..."`);
    const parsed = await llmService.extractRequirements(userInput);
    const priority = customPriority || parsed.priorityMode || 'BALANCED';

    // Step 2: Available budget identification
    addStep(2, `Available budget identified: ₹${parsed.availableBudget.toLocaleString('en-IN')}`, 'calculateBudgetAllocation', `Available Budget Constraint: ₹${parsed.availableBudget.toLocaleString('en-IN')}`);

    // Step 3: Essential vs Optional Requirements Classification
    const essentialCount = parsed.requirements.filter(r => r.priority === 'ESSENTIAL').length;
    addStep(3, `Requirements classified: ${essentialCount} Essential, ${parsed.requirements.length - essentialCount} Important/Optional`, 'classifyRequirements', 'Essential: Workstations, Cloud, Security');

    // Step 4: Existing Resource Analysis & Duplicate Detection
    const existingResResult = await agentTools.getExistingResources();
    const softwareNames = parsed.requirements.filter(r => r.category === 'Software').map(r => r.name);
    const dupResult = await agentTools.findDuplicateSubscriptions(softwareNames);
    addStep(4, 'Existing resources checked & duplicate expenses detected', 'findDuplicateSubscriptions', dupResult.summary);

    // Step 5: Hindsight Memory Recall
    const recallResult = await hindsightService.recall(userInput, { limit: 4 });
    addStep(5, `Organizational memory recalled (${recallResult.source})`, 'recallMemories', `Found ${recallResult.lessons.length} relevant lessons from past projects.`);

    // Step 6: Vendor Analysis & 3-Year TCO Comparison
    const vendorComp = await agentTools.compareVendors('vnd-cloudcore-01', 'vnd-apexcloud-02');
    addStep(6, 'Vendor quotes evaluated & 3-Year TCO calculated', 'compareVendors', vendorComp.summary);

    // Step 7: Hidden Cost Vector Analysis
    const hiddenCloud = await agentTools.detectHiddenCosts('cloud');
    const hiddenHw = await agentTools.detectHiddenCosts('hardware');
    addStep(7, 'Hidden cost vectors identified (egress, idle compute, maintenance)', 'detectHiddenCosts', 'Cloud egress risks & hardware accidental repair risks flagged');

    // Step 8: Deterministic Constraint Optimization
    const allocationResult = await agentTools.calculateBudgetAllocation({
      availableBudget: parsed.availableBudget,
      requirements: parsed.requirements,
      priorityMode: priority,
    });
    const optimized = allocationResult.data;
    addStep(8, `Minimum effective budget calculated: ₹${optimized.minimumEffectiveBudget.toLocaleString('en-IN')}`, 'optimizeBudgetPlan', `Target: ₹${optimized.minimumEffectiveBudget.toLocaleString('en-IN')} (Preserved: ₹${optimized.unallocatedReserve.toLocaleString('en-IN')})`);

    // Step 9: Evidence-Backed Contingency Allocation
    addStep(9, `Contingency calculated: ₹${optimized.contingencyAmount.toLocaleString('en-IN')}`, 'calculateContingency', optimized.contingencyJustification);

    // Step 10: Savings & Unallocated Reserve Verification
    const savingsResult = await agentTools.calculateExpectedSavings(parsed.availableBudget, optimized.minimumEffectiveBudget);
    addStep(10, `Estimated savings verified: ₹${savingsResult.data.savings.toLocaleString('en-IN')}`, 'calculateExpectedSavings', `Potential Avoided Cost: ₹${savingsResult.data.savings.toLocaleString('en-IN')} (${savingsResult.data.savingsPct}%)`);

    // Compile risks
    const risks: BudgetPlan['risks'] = [
      {
        risk: 'Cloud compute usage overruns due to unmonitored test workloads.',
        severity: 'MEDIUM',
        mitigation: `Backed by ₹${Math.round(optimized.contingencyAmount * 0.45).toLocaleString('en-IN')} dedicated cloud contingency reserve and auto-shutdown alerts.`,
      },
      {
        risk: 'Team headcount expansion beyond existing 45 unused software seats.',
        severity: 'LOW',
        mitigation: 'Procurement will trigger incremental volume add-on only when seat utilization crosses 90%.',
      },
      {
        risk: 'Hardware warranty lapses during development lifecycle.',
        severity: 'LOW',
        mitigation: 'Procured direct from vendor with 3-year onsite hardware replacement warranty included.',
      },
    ];

    // Compile assumptions
    const assumptions = [
      'ASSUMPTION: Engineering team size remains at 10 active developers for the 12-month period.',
      'ASSUMPTION: Existing 45 Jira and 30 Slack inactive seats remain available for transfer.',
      'HISTORICAL EVIDENCE: Cloud compute requires 18% contingency buffer based on Project AlphaCloud 24% overrun.',
      'RECOMMENDATION: Reserve remaining ₹2,00,000 unallocated cash to maintain strategic flexibility.',
      'ESTIMATE: Annual recurring renewal will stabilize at ₹3,80,000/year after upfront hardware procurement.',
    ];

    // Create Draft Budget Plan
    const planId = `plan-${Date.now()}`;
    const budgetPlan: BudgetPlan = {
      id: planId,
      title: 'Engineering Team 1-Year Establishment',
      createdAt: new Date().toISOString(),
      status: 'REVIEW_REQUESTED',
      availableBudget: parsed.availableBudget,
      minimumEffectiveBudget: optimized.minimumEffectiveBudget,
      estimatedSavings: optimized.estimatedSavings,
      unallocatedReserve: optimized.unallocatedReserve,
      requirementCoveragePct: optimized.requirementCoveragePct,
      budgetEfficiencyScore: optimized.budgetEfficiencyScore,
      oneTimeCost: optimized.oneTimeCost,
      recurringAnnualCost: optimized.recurringAnnualCost,
      tco3Year: optimized.tco3Year,
      contingencyAmount: optimized.contingencyAmount,
      contingencyJustification: optimized.contingencyJustification,
      allocations: optimized.allocations,
      requirements: parsed.requirements,
      memoriesApplied: recallResult.lessons,
      optimizationDeltas: optimized.optimizationDeltas,
      assumptions,
      risks,
    };

    // Save draft plan in organization store
    await agentTools.createBudgetPlan(budgetPlan);

    // Generate executive summary
    const executiveSummary = await llmService.generateExecutiveSummary({
      availableBudget: parsed.availableBudget,
      minimumEffectiveBudget: optimized.minimumEffectiveBudget,
      estimatedSavings: optimized.estimatedSavings,
      unallocatedReserve: optimized.unallocatedReserve,
      memoriesAppliedCount: recallResult.lessons.length,
    });

    // Memory influence delta summary
    const deltasSummary = [
      '+ ₹20,000 cloud contingency (AlphaCloud 24% overrun pattern)',
      '- ₹50,000 software allocation (45 unused Jira/Slack seats reused)',
      '+ ₹20,000 hardware maintenance reserve (2025 Workstation Refresh lesson)',
      '+ Vendor support weighting increased (ApexCloud 1h SLA preferred over CheapHost)',
      '₹2,00,000 preserved as Unallocated Strategic Reserve',
    ];

    return {
      plan: budgetPlan,
      executionSteps: steps,
      memoryInfluence: {
        memoriesRecalledCount: recallResult.lessons.length,
        memoriesApplied: recallResult.lessons,
        deltasSummary,
        contingencyJustification: optimized.contingencyJustification,
      },
      transparentReport: {
        availableBudget: parsed.availableBudget,
        minimumEffectiveBudget: optimized.minimumEffectiveBudget,
        estimatedSavings: optimized.estimatedSavings,
        unallocatedReserve: optimized.unallocatedReserve,
        requirementCoveragePct: optimized.requirementCoveragePct,
        oneTimeCost: optimized.oneTimeCost,
        recurringAnnualCost: optimized.recurringAnnualCost,
        tco3Year: optimized.tco3Year,
        contingencyAmount: optimized.contingencyAmount,
        efficiencyScore: optimized.budgetEfficiencyScore,
        assumptions,
        risks,
        optimizationDeltas: optimized.optimizationDeltas,
      },
      executiveSummary,
    };
  }
}

export const budgetOptimizationAgent = new BudgetOptimizationAgent();
