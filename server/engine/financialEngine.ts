import {
  calculateTCO,
  calculateBudgetVariance,
  calculateEvidenceBasedContingency,
  calculateBudgetEfficiencyScore,
  optimizeBudgetPlan,
  calculateWhatIfScenarios
} from './calculator';
import {
  RequirementItem,
  ExistingResource,
  HistoricalSpendingRecord,
  VendorProfile,
  WhatIfScenarioResult,
  BudgetPlan
} from '../types';

export class FinancialEngine {
  /**
   * Deterministic source of truth for arithmetic
   */
  public calculateItemTotals(items: Array<{ estimatedCost: number; quantity?: number }>): number {
    return items.reduce((sum, i) => sum + (i.estimatedCost * (i.quantity || 1)), 0);
  }

  public calculateTCO(params: {
    upfrontPrice: number;
    monthlyRecurring: number;
    durationMonths: number;
    implementationCost?: number;
    migrationCost?: number;
    annualSupportCost?: number;
    hiddenCostEstimatedOverage?: number;
  }) {
    return calculateTCO({
      upfrontPrice: params.upfrontPrice,
      monthlyRecurring: params.monthlyRecurring,
      durationMonths: params.durationMonths,
      implementationCost: params.implementationCost || 0,
      migrationCost: params.migrationCost || 0,
      annualSupportCost: params.annualSupportCost || 0,
      hiddenCostEstimatedOverage: params.hiddenCostEstimatedOverage || 0,
    });
  }

  public calculateBudgetVariance(planned: number, actual: number) {
    return calculateBudgetVariance(planned, actual);
  }

  public calculateContingency(categoryCosts: Record<string, number>, historicalRecords: HistoricalSpendingRecord[]) {
    return calculateEvidenceBasedContingency(categoryCosts, historicalRecords);
  }

  public optimizeBudget(params: {
    availableBudget: number;
    requirements: RequirementItem[];
    existingResources: ExistingResource[];
    historicalRecords: HistoricalSpendingRecord[];
    priorityMode?: 'BALANCED' | 'LOWEST_COST' | 'RELIABILITY' | 'SECURITY';
  }) {
    return optimizeBudgetPlan(params);
  }

  public runWhatIfScenarios(params: {
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
    return calculateWhatIfScenarios(params);
  }

  public compareVendors(vendorA: VendorProfile, vendorB: VendorProfile, durationYears: number = 3) {
    const tcoDiff = vendorB.calculatedTco3Year - vendorA.calculatedTco3Year;
    const upfrontDiff = vendorB.baseQuote - vendorA.baseQuote;
    const uptimeDiff = vendorB.reliabilityScorePct - vendorA.reliabilityScorePct;
    const slaAdvantageHours = vendorA.supportSlaHours - vendorB.supportSlaHours;

    const recommended = (vendorB.calculatedTco3Year <= vendorA.calculatedTco3Year || vendorB.reliabilityScorePct >= 99.9)
      ? vendorB.name
      : vendorA.name;

    return {
      vendorA,
      vendorB,
      upfrontDiff,
      tcoDiff,
      uptimeDiff,
      slaAdvantageHours,
      recommended,
      economicAdvantage: tcoDiff < 0
        ? `${vendorB.name} saves ₹${Math.abs(tcoDiff).toLocaleString('en-IN')} over 3 years despite higher initial price.`
        : `${vendorA.name} is cheaper upfront by ₹${Math.abs(upfrontDiff).toLocaleString('en-IN')}.`,
    };
  }

  /**
   * Explains why the remaining budget was uncommitted rather than spent
   */
  public explainUnspentReserve(params: {
    availableBudget: number;
    minimumEffectiveBudget: number;
    unallocatedReserve: number;
    requirementsCoveredPct: number;
  }): string {
    const { availableBudget, minimumEffectiveBudget, unallocatedReserve, requirementsCoveredPct } = params;
    return `
Available Budget: ₹${availableBudget.toLocaleString('en-IN')}
Minimum Effective Spend: ₹${minimumEffectiveBudget.toLocaleString('en-IN')}
Unallocated Strategic Reserve: ₹${unallocatedReserve.toLocaleString('en-IN')}

100% of Essential and Important requirements (${requirementsCoveredPct}% coverage) are completely fulfilled. Spending the remaining ₹${unallocatedReserve.toLocaleString('en-IN')} would introduce redundant SaaS seats, over-provisioned compute, or unjustified discretionary overhead. Budget availability is not an obligation to exhaust capital; preserving strategic cash maximizes enterprise agility.
`.trim();
  }
}

export const financialEngine = new FinancialEngine();
