export type RequirementPriority = 'ESSENTIAL' | 'IMPORTANT' | 'OPTIONAL' | 'DEFERRED';

export interface RequirementItem {
  id: string;
  name: string;
  category: 'Hardware' | 'Cloud' | 'Software' | 'Security' | 'Training' | 'Maintenance' | 'Contingency';
  priority: RequirementPriority;
  estimatedCost: number;
  quantity?: number;
  durationMonths?: number;
  reason: string;
  existingResourceMatch?: string | null;
  potentialAvoidedCost?: number;
}

export interface ExistingResource {
  id: string;
  name: string;
  category: string;
  totalQuantity: number;
  activeUsed: number;
  unusedQuantity: number;
  costPerUnitAnnual: number;
  renewalDate: string;
  notes: string;
}

export interface HistoricalSpendingRecord {
  id: string;
  project: string;
  category: string;
  year: number;
  plannedCost: number;
  actualCost: number;
  varianceAmount: number;
  variancePercentage: number;
  outcomeStatus: 'SUCCESS' | 'OVERRUN' | 'UNDERRUN' | 'UNACCEPTABLE_QUALITY';
  rootCause: string;
  lessonLearned: string;
  evidenceRef: string;
}

export interface VendorProfile {
  id: string;
  name: string;
  category: string;
  baseQuote: number;
  recurringAnnual: number;
  supportSlaHours: number;
  reliabilityScorePct: number;
  securityCompliance: string[];
  hiddenCostsEstimate: number;
  calculatedTco3Year: number;
  historicalIncidentCount: number;
  historicalSupportRating: number; // 1-5
  notes: string;
}

export interface MemoryLesson {
  id: string;
  title: string;
  category: string;
  sourceProject: string;
  lessonText: string;
  quantitativeImpact: string;
  financialAdjustmentRule: string;
  confidence: number;
  tags: string[];
  retainedAt: string;
  hindsightMemoryId?: string;
}

export interface BudgetAllocationCategory {
  category: 'Hardware' | 'Cloud' | 'Software' | 'Security' | 'Training' | 'Maintenance' | 'Contingency';
  naiveAmount: number;
  optimizedAmount: number;
  delta: number;
  percentageOfBudget: number;
  rationale: string;
  historicalEvidence?: string;
  riskFactor: 'LOW' | 'MEDIUM' | 'HIGH';
  isRecurring: boolean;
  recurringAnnualEstimate: number;
}

export interface BudgetPlan {
  id: string;
  title: string;
  createdAt: string;
  status: 'DRAFT' | 'REVIEW_REQUESTED' | 'APPROVED' | 'REJECTED';
  availableBudget: number;
  minimumEffectiveBudget: number;
  estimatedSavings: number;
  unallocatedReserve: number;
  requirementCoveragePct: number;
  budgetEfficiencyScore: number;
  oneTimeCost: number;
  recurringAnnualCost: number;
  tco3Year: number;
  contingencyAmount: number;
  contingencyJustification: string;
  allocations: BudgetAllocationCategory[];
  requirements: RequirementItem[];
  memoriesApplied: MemoryLesson[];
  optimizationDeltas: {
    item: string;
    fromAmount: number;
    toAmount: number;
    savings: number;
    whatChanged: string;
    why: string;
    evidence: string;
    impact: string;
    tradeOff: string;
  }[];
  assumptions: string[];
  risks: {
    risk: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH';
    mitigation: string;
  }[];
  approvedAt?: string;
  approvedBy?: string;
}

export interface ActualSpendingEntry {
  id: string;
  budgetId: string;
  category: string;
  plannedAmount: number;
  actualAmount: number;
  varianceAmount: number;
  variancePercentage: number;
  recordedDate: string;
  notes: string;
}

export interface SavingsLedgerEntry {
  id: string;
  date: string;
  category: string;
  project: string;
  vendor?: string;
  type: 'ESTIMATED' | 'VERIFIED';
  amount: number;
  reason: string;
  evidenceRef: string;
}

export interface WhatIfScenarioResult {
  scenarioName: string;
  budgetLimit: number;
  estimatedCost: number;
  potentialSavings: number;
  unallocatedReserve: number;
  requirementCoveragePct: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  keyTradeOffs: string[];
  affectedRequirements: string[];
  allocations: Record<string, number>;
}

export interface AgentExecutionStep {
  id: string;
  stepNumber: number;
  title: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'WARNING';
  toolUsed?: string;
  evidenceFound?: string;
  timestamp: string;
}
