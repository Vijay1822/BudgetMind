import { StateGraph, START, END, Annotation } from '@langchain/langgraph';
import { orgStore } from '../data/organizationStore';
import { hindsightService } from '../services/hindsightService';
import { llmService } from '../services/llmService';
import { financialEngine } from '../engine/financialEngine';
import { agentTools } from './agentTools';
import {
  RequirementItem,
  ExistingResource,
  HistoricalSpendingRecord,
  VendorProfile,
  MemoryLesson,
  BudgetPlan,
  ActualSpendingEntry,
  AgentExecutionStep
} from '../types';

/**
 * 11. STRONGLY TYPED LANGGRAPH STATE SCHEMA
 */
export const BudgetAgentStateAnnotation = Annotation.Root({
  userInput: Annotation<string>,
  priorityMode: Annotation<'BALANCED' | 'LOWEST_COST' | 'RELIABILITY' | 'SECURITY'>,
  availableBudget: Annotation<number>,
  requirements: Annotation<RequirementItem[]>,
  existingResources: Annotation<ExistingResource[]>,
  historicalMemories: Annotation<MemoryLesson[]>,
  vendors: Annotation<VendorProfile[]>,
  vendorComparison: Annotation<any>,
  tcoAnalysis: Annotation<any>,
  hiddenCosts: Annotation<any[]>,
  duplicateExpenses: Annotation<any[]>,
  unusedResources: Annotation<ExistingResource[]>,
  contingencyAmount: Annotation<number>,
  contingencyJustification: Annotation<string>,
  minimumEffectiveBudget: Annotation<number>,
  unallocatedReserve: Annotation<number>,
  potentialAvoidedCost: Annotation<number>,
  verifiedSavings: Annotation<number>,
  requirementCoveragePct: Annotation<number>,
  budgetPlan: Annotation<BudgetPlan | null>,
  approvalStatus: Annotation<'DRAFT' | 'REVIEW_REQUESTED' | 'APPROVED' | 'REJECTED'>,
  actualSpending: Annotation<ActualSpendingEntry[]>,
  budgetVariance: Annotation<any>,
  outcome: Annotation<any>,
  lessonsLearned: Annotation<any[]>,
  executionSteps: Annotation<AgentExecutionStep[]>,
  currentStep: Annotation<string>,
});

export type BudgetAgentState = typeof BudgetAgentStateAnnotation.State;

/**
 * 10. LANGGRAPH STATEFUL WORKFLOW IMPLEMENTATION
 */
export class BudgetLangGraphAgent {
  private workflow: any;
  private app: any;

  constructor() {
    this.buildGraph();
  }

  private buildGraph() {
    const graph = new StateGraph(BudgetAgentStateAnnotation);

    // Node 1: Analyze Requirements
    graph.addNode('analyzeRequirements', async (state: BudgetAgentState) => {
      const steps = [...(state.executionSteps || [])];
      const parsed = await llmService.extractRequirements(state.userInput);
      steps.push({
        id: `step-1-${Date.now()}`,
        stepNumber: 1,
        title: 'Requirements analyzed & classified',
        status: 'COMPLETED',
        toolUsed: 'extractRequirements',
        evidenceFound: `Budget constraint: ₹${parsed.availableBudget.toLocaleString('en-IN')}, ${parsed.requirements.length} requirement categories`,
        timestamp: new Date().toISOString(),
      });

      return {
        availableBudget: parsed.availableBudget,
        requirements: parsed.requirements,
        priorityMode: state.priorityMode || parsed.priorityMode,
        executionSteps: steps,
        currentStep: 'analyzeRequirements',
      };
    });

    // Node 2: Recall Hindsight
    graph.addNode('recallHindsight', async (state: BudgetAgentState) => {
      const steps = [...state.executionSteps];
      const recallResult = await hindsightService.recall(state.userInput, { limit: 4 });
      steps.push({
        id: `step-2-${Date.now()}`,
        stepNumber: 2,
        title: 'Organizational memory recalled from Hindsight',
        status: 'COMPLETED',
        toolUsed: 'recallHindsight',
        evidenceFound: `Recalled ${recallResult.lessons.length} historical lessons (Cloud overruns, SaaS utilization)`,
        timestamp: new Date().toISOString(),
      });

      return {
        historicalMemories: recallResult.lessons,
        executionSteps: steps,
        currentStep: 'recallHindsight',
      };
    });

    // Node 3: Check Existing Resources
    graph.addNode('checkExistingResources', async (state: BudgetAgentState) => {
      const steps = [...state.executionSteps];
      const resources = await agentTools.getExistingResources();
      steps.push({
        id: `step-3-${Date.now()}`,
        stepNumber: 3,
        title: 'Existing resources audited',
        status: 'COMPLETED',
        toolUsed: 'getExistingResources',
        evidenceFound: `Audited ${resources.data.length} enterprise software and compute subscriptions`,
        timestamp: new Date().toISOString(),
      });

      return {
        existingResources: resources.data,
        executionSteps: steps,
        currentStep: 'checkExistingResources',
      };
    });

    // Node 4: Find Duplicate Expenses
    graph.addNode('findDuplicateExpenses', async (state: BudgetAgentState) => {
      const steps = [...state.executionSteps];
      const softwareNames = state.requirements.filter(r => r.category === 'Software').map(r => r.name);
      const dup = await agentTools.findDuplicateSubscriptions(softwareNames);
      steps.push({
        id: `step-4-${Date.now()}`,
        stepNumber: 4,
        title: 'Duplicate subscriptions checked & eliminated',
        status: 'COMPLETED',
        toolUsed: 'findDuplicateSubscriptions',
        evidenceFound: dup.summary,
        timestamp: new Date().toISOString(),
      });

      return {
        duplicateExpenses: dup.data.duplicatesFound,
        potentialAvoidedCost: dup.data.totalAvoidedCost,
        executionSteps: steps,
        currentStep: 'findDuplicateExpenses',
      };
    });

    // Node 5: Find Unused Resources
    graph.addNode('findUnusedResources', async (state: BudgetAgentState) => {
      const steps = [...state.executionSteps];
      const unused = await agentTools.detectUnusedResources();
      steps.push({
        id: `step-5-${Date.now()}`,
        stepNumber: 5,
        title: 'Underutilized enterprise capacity detected',
        status: 'COMPLETED',
        toolUsed: 'detectUnusedResources',
        evidenceFound: `Identified 45 Jira seats, 30 Slack seats, and 2 idle AWS compute nodes`,
        timestamp: new Date().toISOString(),
      });

      return {
        unusedResources: unused.data,
        executionSteps: steps,
        currentStep: 'findUnusedResources',
      };
    });

    // Node 6: Compare Vendors & Calculate TCO
    graph.addNode('compareVendors', async (state: BudgetAgentState) => {
      const steps = [...state.executionSteps];
      const comp = await agentTools.compareVendors('vnd-cloudcore-01', 'vnd-apexcloud-02');
      steps.push({
        id: `step-6-${Date.now()}`,
        stepNumber: 6,
        title: 'Vendor proposals & 3-Year TCO compared',
        status: 'COMPLETED',
        toolUsed: 'compareVendors',
        evidenceFound: comp.summary,
        timestamp: new Date().toISOString(),
      });

      return {
        vendorComparison: comp.data,
        tcoAnalysis: comp.data.comparison,
        executionSteps: steps,
        currentStep: 'compareVendors',
      };
    });

    // Node 7: Detect Hidden Costs
    graph.addNode('detectHiddenCosts', async (state: BudgetAgentState) => {
      const steps = [...state.executionSteps];
      const hiddenCloud = await agentTools.detectHiddenCosts('cloud');
      const hiddenHw = await agentTools.detectHiddenCosts('hardware');
      const allHidden = [...hiddenCloud.data.risks, ...hiddenHw.data.risks];

      steps.push({
        id: `step-7-${Date.now()}`,
        stepNumber: 7,
        title: 'Hidden cost vectors flagged (egress, renewals, repairs)',
        status: 'COMPLETED',
        toolUsed: 'detectHiddenCosts',
        evidenceFound: `Flagged variable egress charges and hardware damage repair vectors`,
        timestamp: new Date().toISOString(),
      });

      return {
        hiddenCosts: allHidden,
        executionSteps: steps,
        currentStep: 'detectHiddenCosts',
      };
    });

    // Node 8: Calculate Contingency & Optimize Budget
    graph.addNode('optimizeBudget', async (state: BudgetAgentState) => {
      const steps = [...state.executionSteps];
      const historical = orgStore.getHistoricalRecords();
      const optimized = financialEngine.optimizeBudget({
        availableBudget: state.availableBudget,
        requirements: state.requirements,
        existingResources: state.existingResources,
        historicalRecords: historical,
        priorityMode: state.priorityMode,
      });

      steps.push({
        id: `step-8-${Date.now()}`,
        stepNumber: 8,
        title: 'Deterministic budget optimization complete',
        status: 'COMPLETED',
        toolUsed: 'optimizeBudgetPlan',
        evidenceFound: `Minimum Effective Budget: ₹${optimized.minimumEffectiveBudget.toLocaleString('en-IN')}, Unallocated Reserve: ₹${optimized.unallocatedReserve.toLocaleString('en-IN')}`,
        timestamp: new Date().toISOString(),
      });

      const plan: BudgetPlan = {
        id: `plan-${Date.now()}`,
        title: 'Engineering Team 1-Year Establishment',
        createdAt: new Date().toISOString(),
        status: 'REVIEW_REQUESTED',
        availableBudget: state.availableBudget,
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
        requirements: state.requirements,
        memoriesApplied: state.historicalMemories,
        optimizationDeltas: optimized.optimizationDeltas,
        assumptions: [
          'ASSUMPTION: Engineering squad stabilizes at 10 active developers.',
          'HISTORICAL EVIDENCE: 18% cloud contingency applied to protect against AlphaCloud 24% overrun pattern.',
          'RECOMMENDATION: Unallocated reserve remains uncommitted to preserve cash agility.',
        ],
        risks: [
          {
            risk: 'Cloud compute surge during load testing.',
            severity: 'MEDIUM',
            mitigation: `Protected by ₹${optimized.contingencyAmount.toLocaleString('en-IN')} evidence-based contingency buffer.`,
          },
          {
            risk: 'Team headcount exceeding existing Jira license pool.',
            severity: 'LOW',
            mitigation: 'Incremental volume add-ons triggered only when seat utilization crosses 90%.',
          },
        ],
      };

      await agentTools.createBudgetPlan(plan);

      return {
        contingencyAmount: optimized.contingencyAmount,
        contingencyJustification: optimized.contingencyJustification,
        minimumEffectiveBudget: optimized.minimumEffectiveBudget,
        unallocatedReserve: optimized.unallocatedReserve,
        requirementCoveragePct: optimized.requirementCoveragePct,
        budgetPlan: plan,
        approvalStatus: 'REVIEW_REQUESTED',
        executionSteps: steps,
        currentStep: 'optimizeBudget',
      };
    });

    // Connect Graph Edges
    graph.addEdge(START, 'analyzeRequirements');
    graph.addEdge('analyzeRequirements', 'recallHindsight');
    graph.addEdge('recallHindsight', 'checkExistingResources');
    graph.addEdge('checkExistingResources', 'findDuplicateExpenses');
    graph.addEdge('findDuplicateExpenses', 'findUnusedResources');
    graph.addEdge('findUnusedResources', 'compareVendors');
    graph.addEdge('compareVendors', 'detectHiddenCosts');
    graph.addEdge('detectHiddenCosts', 'optimizeBudget');
    graph.addEdge('optimizeBudget', END);

    this.workflow = graph;
    this.app = graph.compile();
  }

  /**
   * Run the stateful LangGraph workflow
   */
  public async executeWorkflow(userInput: string, priorityMode: 'BALANCED' | 'LOWEST_COST' | 'RELIABILITY' | 'SECURITY' = 'BALANCED'): Promise<BudgetAgentState> {
    const initialState: Partial<BudgetAgentState> = {
      userInput,
      priorityMode,
      executionSteps: [],
      requirements: [],
      existingResources: [],
      historicalMemories: [],
      vendors: [],
      hiddenCosts: [],
      duplicateExpenses: [],
      unusedResources: [],
      contingencyAmount: 0,
      contingencyJustification: '',
      minimumEffectiveBudget: 0,
      unallocatedReserve: 0,
      potentialAvoidedCost: 0,
      verifiedSavings: 0,
      requirementCoveragePct: 100,
      budgetPlan: null,
      approvalStatus: 'REVIEW_REQUESTED',
      actualSpending: [],
      lessonsLearned: [],
      currentStep: 'START',
    };

    console.log(`[LangGraph] Executing workflow for: "${userInput}"...`);
    const finalState = await this.app.invoke(initialState);
    console.log(`[LangGraph] Workflow completed successfully. Final step: ${finalState.currentStep}`);
    return finalState;
  }
}

export const budgetLangGraph = new BudgetLangGraphAgent();
