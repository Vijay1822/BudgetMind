import {
  ExistingResource,
  HistoricalSpendingRecord,
  VendorProfile,
  MemoryLesson,
  SavingsLedgerEntry,
  BudgetPlan,
  ActualSpendingEntry,
  RequirementItem
} from '../types';

export class OrganizationStore {
  private existingResources: ExistingResource[] = [
    {
      id: 'res-jira-01',
      name: 'Jira Software & Confluence (Atlassian Enterprise)',
      category: 'Software',
      totalQuantity: 100,
      activeUsed: 55,
      unusedQuantity: 45,
      costPerUnitAnnual: 19200, // ₹1,600/month
      renewalDate: '2026-11-30',
      notes: '45 inactive seats available across engineering organization from completed legacy migration.',
    },
    {
      id: 'res-slack-02',
      name: 'Slack Business+ Workspace',
      category: 'Software',
      totalQuantity: 80,
      activeUsed: 50,
      unusedQuantity: 30,
      costPerUnitAnnual: 10200, // ₹850/month
      renewalDate: '2026-12-15',
      notes: '30 unassigned seats available for new team members.',
    },
    {
      id: 'res-gh-03',
      name: 'GitHub Enterprise Cloud',
      category: 'Software',
      totalQuantity: 60,
      activeUsed: 48,
      unusedQuantity: 12,
      costPerUnitAnnual: 21600,
      renewalDate: '2027-01-31',
      notes: '12 seats unassigned.',
    },
    {
      id: 'res-aws-04',
      name: 'AWS Cloud Compute (Reserved Instances Pool)',
      category: 'Cloud',
      totalQuantity: 5,
      activeUsed: 3,
      unusedQuantity: 2,
      costPerUnitAnnual: 84000,
      renewalDate: '2027-03-31',
      notes: '2 reserved compute nodes running at only 38% utilization during off-peak hours.',
    },
    {
      id: 'res-figma-05',
      name: 'Figma Organization',
      category: 'Software',
      totalQuantity: 25,
      activeUsed: 16,
      unusedQuantity: 9,
      costPerUnitAnnual: 14400,
      renewalDate: '2026-10-15',
      notes: '9 designer/developer licenses currently idle.',
    },
  ];

  private historicalRecords: HistoricalSpendingRecord[] = [
    {
      id: 'hist-alpha-01',
      project: 'AlphaCloud Infrastructure Scaling',
      category: 'Cloud',
      year: 2025,
      plannedCost: 200000,
      actualCost: 248000,
      varianceAmount: 48000,
      variancePercentage: 24.0,
      outcomeStatus: 'OVERRUN',
      rootCause: 'Usage-based compute overage, unmonitored egress bandwidth, and test instances running 24/7 on weekends.',
      lessonLearned: 'Usage-based cloud charges caused a 24% overrun. Future cloud budgets must include usage contingency (15-20%) and proactive automated monitoring.',
      evidenceRef: 'Audit Report FY2025-Q2 / Finance Ledger #CR-882',
    },
    {
      id: 'hist-saas-02',
      project: 'SaaS License Rationalization & Scale',
      category: 'Software',
      year: 2025,
      plannedCost: 300000,
      actualCost: 210000,
      varianceAmount: -90000,
      variancePercentage: -30.0,
      outcomeStatus: 'UNDERRUN',
      rootCause: 'Discovered redundant project management and communication tool procurement; pooled existing licenses.',
      lessonLearned: 'Check existing organizational license inventory before purchasing additional software subscriptions. Reusing seats avoided ₹90,000.',
      evidenceRef: 'Procurement Consolidation Case Study #S-104',
    },
    {
      id: 'hist-vendor-03',
      project: 'Core Platform Hosting Migration',
      category: 'Cloud',
      year: 2024,
      plannedCost: 80000,
      actualCost: 135000,
      varianceAmount: 55000,
      variancePercentage: 68.75,
      outcomeStatus: 'UNACCEPTABLE_QUALITY',
      rootCause: 'Selected Vendor A based solely on cheap upfront quote (₹80k vs ₹95k). Vendor experienced 42 hours cumulative downtime and slow ticket turnaround.',
      lessonLearned: 'Vendor support SLA and uptime reliability should receive higher importance weighting than upfront unit price. Avoid false-economy vendors.',
      evidenceRef: 'Incident Postmortem INC-402 & Finance Root Cause #VND-99',
    },
    {
      id: 'hist-hw-04',
      project: 'Engineering Workstation Refresh',
      category: 'Hardware',
      year: 2025,
      plannedCost: 350000,
      actualCost: 370000,
      varianceAmount: 20000,
      variancePercentage: 5.71,
      outcomeStatus: 'OVERRUN',
      rootCause: 'Planned maintenance was budgeted at ₹0; display hinge and liquid spill damage required accidental warranty repair.',
      lessonLearned: 'Workstation hardware deployments historically incur 5-8% maintenance and warranty coverage; budget maintenance explicitly.',
      evidenceRef: 'IT Asset Support Audit #HW-2025-09',
    },
    {
      id: 'hist-sec-05',
      project: 'SOC2 Type II Compliance Readiness',
      category: 'Security',
      year: 2025,
      plannedCost: 80000,
      actualCost: 78500,
      varianceAmount: -1500,
      variancePercentage: -1.88,
      outcomeStatus: 'SUCCESS',
      rootCause: 'Fixed annual enterprise agreement with verified SLA and no variable surcharges.',
      lessonLearned: 'Fixed-term compliance tooling pricing is highly predictable; requires only minimal 2-3% contingency.',
      evidenceRef: 'Security Audit Signoff #SEC-77',
    },
  ];

  private vendorProfiles: VendorProfile[] = [
    {
      id: 'vnd-cloudcore-01',
      name: 'CloudCore CheapHost',
      category: 'Cloud',
      baseQuote: 80000,
      recurringAnnual: 80000,
      supportSlaHours: 48,
      reliabilityScorePct: 98.2,
      securityCompliance: ['ISO 27001'],
      hiddenCostsEstimate: 32000, // Egress fees, tiered API calls
      calculatedTco3Year: 312000,
      historicalIncidentCount: 8,
      historicalSupportRating: 2.1,
      notes: 'Low initial price point, but historical incidents show high downtime and expensive egress charges.',
    },
    {
      id: 'vnd-apexcloud-02',
      name: 'ApexCloud Enterprise',
      category: 'Cloud',
      baseQuote: 95000,
      recurringAnnual: 95000,
      supportSlaHours: 1, // 1h 24/7 SLA
      reliabilityScorePct: 99.95,
      securityCompliance: ['SOC2 Type II', 'ISO 27001', 'HIPAA', 'GDPR'],
      hiddenCostsEstimate: 8000, // Included bandwidth quota
      calculatedTco3Year: 298000, // Lower 3yr TCO due to included egress and zero downtime
      historicalIncidentCount: 1,
      historicalSupportRating: 4.8,
      notes: 'Slightly higher upfront quote (+₹15k), but 3-year TCO is ₹14,000 lower with 99.95% uptime and 1h response SLA.',
    },
    {
      id: 'vnd-securework-03',
      name: 'SecureNet Hardware Direct',
      category: 'Hardware',
      baseQuote: 350000, // For 5 developer workstations (₹70,000/unit)
      recurringAnnual: 0,
      supportSlaHours: 4,
      reliabilityScorePct: 99.1,
      securityCompliance: ['Hardware TPM 2.0', 'FIPS-140-2'],
      hiddenCostsEstimate: 0,
      calculatedTco3Year: 350000,
      historicalIncidentCount: 0,
      historicalSupportRating: 4.9,
      notes: 'Includes 3-year onsite hardware warranty and overnight replacement guarantee.',
    },
    {
      id: 'vnd-budgettech-04',
      name: 'BudgetTech Refurb Outlet',
      category: 'Hardware',
      baseQuote: 260000, // ₹52,000/unit
      recurringAnnual: 0,
      supportSlaHours: 72,
      reliabilityScorePct: 92.4,
      securityCompliance: ['Basic TPM'],
      hiddenCostsEstimate: 45000, // Replacement batteries, repairs
      calculatedTco3Year: 305000,
      historicalIncidentCount: 6,
      historicalSupportRating: 2.4,
      notes: '90-day warranty only. Historical failure rate 18% within first 12 months.',
    },
  ];

  private memoryLessons: MemoryLesson[] = [
    {
      id: 'mem-01',
      title: 'Cloud Usage-Based 24% Overrun Pattern',
      category: 'Cloud',
      sourceProject: 'AlphaCloud Infrastructure Scaling',
      lessonText: 'Unmonitored dev environments and variable egress caused 24% budget overrun in AlphaCloud. Ensure usage monitoring and set evidence-backed contingency to at least 15-20%.',
      quantitativeImpact: '+₹48,000 overrun in Project AlphaCloud',
      financialAdjustmentRule: 'Increase Cloud contingency from default 5% to 18-20% unless fixed-quota agreement is verified.',
      confidence: 0.95,
      tags: ['cloud', 'overrun', 'contingency', 'egress'],
      retainedAt: '2025-06-30T10:00:00Z',
    },
    {
      id: 'mem-02',
      title: 'Software Seat Underutilization & License Reuse',
      category: 'Software',
      sourceProject: 'SaaS License Rationalization & Scale',
      lessonText: 'Organizations frequently purchase new software seats when 30-45% of existing enterprise licenses (Jira, Slack, GitHub) remain unassigned. Always inspect active inventory before buying.',
      quantitativeImpact: 'Saved ₹90,000 in FY2025; currently 45 unused Jira seats available.',
      financialAdjustmentRule: 'Deduct existing inactive licenses from new software subscription procurement line items.',
      confidence: 0.98,
      tags: ['software', 'licenses', 'duplicate-purchases', 'savings'],
      retainedAt: '2025-08-15T14:30:00Z',
    },
    {
      id: 'mem-03',
      title: 'Lowest-Cost Hosting False Economy (Support SLA)',
      category: 'Vendor',
      sourceProject: 'Core Platform Hosting Migration',
      lessonText: 'Vendor A was selected solely for ₹15,000 lower quote, but caused 42 hours downtime due to 48h support SLA. Vendor B (ApexCloud) has higher initial cost but lower 3-year TCO and 99.95% uptime.',
      quantitativeImpact: 'Avoided downtime cost estimate: ₹1,20,000 business value.',
      financialAdjustmentRule: 'Weight Vendor Reliability (99.95%) and Support SLA (<1h) over upfront price discount.',
      confidence: 0.92,
      tags: ['vendor', 'sla', 'tco', 'reliability'],
      retainedAt: '2024-11-20T11:15:00Z',
    },
    {
      id: 'mem-04',
      title: 'Hardware Maintenance Zero-Budget Underestimation',
      category: 'Hardware',
      sourceProject: 'Engineering Workstation Refresh',
      lessonText: 'Deploying engineering laptops without an explicit accidental warranty/maintenance reserve resulted in ₹20,000 unplanned expenses. Workstation fleets require a 5-8% maintenance line item.',
      quantitativeImpact: '+₹20,000 unbudgeted out-of-pocket repair costs in 2025.',
      financialAdjustmentRule: 'Inject ₹20,000 explicit maintenance allocation when deploying 5+ developer machines.',
      confidence: 0.94,
      tags: ['hardware', 'maintenance', 'hidden-costs'],
      retainedAt: '2025-10-05T09:00:00Z',
    },
  ];

  private savingsLedger: SavingsLedgerEntry[] = [
    {
      id: 'sav-01',
      date: '2025-08-15',
      category: 'Software',
      project: 'SaaS License Rationalization',
      vendor: 'Atlassian & Slack',
      type: 'VERIFIED',
      amount: 90000,
      reason: 'Consolidated unused enterprise seats instead of buying 40 new licenses.',
      evidenceRef: 'Invoice Reconciliation #S-104',
    },
    {
      id: 'sav-02',
      date: '2025-11-10',
      category: 'Cloud',
      project: 'Core Platform Hosting',
      vendor: 'ApexCloud Enterprise',
      type: 'VERIFIED',
      amount: 14000,
      reason: '3-year TCO optimization: included bandwidth avoided excess data transfer surcharges.',
      evidenceRef: 'Contract Appendix C #APX-3Y',
    },
    {
      id: 'sav-03',
      date: '2026-02-18',
      category: 'Hardware',
      project: 'Workstation Procurement Direct',
      vendor: 'SecureNet Hardware',
      type: 'VERIFIED',
      amount: 35000,
      reason: 'Direct volume bundling included 3-year warranty at zero extra premium.',
      evidenceRef: 'PO #SN-88192',
    },
    {
      id: 'sav-04',
      date: '2026-09-29',
      category: 'Software',
      project: 'Dev Team One-Year Establishment',
      vendor: 'Jira & Slack Reuse',
      type: 'ESTIMATED',
      amount: 50000,
      reason: 'Utilizing 12 inactive existing licenses instead of procuring new subscriptions.',
      evidenceRef: 'BudgetMind Memory Optimization Engine',
    },
    {
      id: 'sav-05',
      date: '2026-09-29',
      category: 'Unallocated Reserve',
      project: 'Dev Team One-Year Establishment',
      vendor: 'Organizational Reserve',
      type: 'ESTIMATED',
      amount: 200000,
      reason: 'Requirements satisfied with ₹8,00,000; preserved ₹2,00,000 uncommitted cash reserve.',
      evidenceRef: 'BudgetMind Minimum Effective Cost Engine',
    },
  ];

  private budgetPlans: BudgetPlan[] = [];
  private actualSpendingRecords: ActualSpendingEntry[] = [];

  // Getters
  public getExistingResources(): ExistingResource[] {
    return [...this.existingResources];
  }

  public getHistoricalRecords(): HistoricalSpendingRecord[] {
    return [...this.historicalRecords];
  }

  public getVendorProfiles(): VendorProfile[] {
    return [...this.vendorProfiles];
  }

  public getMemoryLessons(): MemoryLesson[] {
    return [...this.memoryLessons];
  }

  public getSavingsLedger(): SavingsLedgerEntry[] {
    return [...this.savingsLedger];
  }

  public getBudgetPlans(): BudgetPlan[] {
    return [...this.budgetPlans];
  }

  public getBudgetPlanById(id: string): BudgetPlan | undefined {
    return this.budgetPlans.find(b => b.id === id);
  }

  public getActualSpending(): ActualSpendingEntry[] {
    return [...this.actualSpendingRecords];
  }

  // Mutations
  public addMemoryLesson(lesson: Omit<MemoryLesson, 'id' | 'retainedAt'>): MemoryLesson {
    const newLesson: MemoryLesson = {
      ...lesson,
      id: `mem-${Date.now()}`,
      retainedAt: new Date().toISOString(),
    };
    this.memoryLessons.unshift(newLesson);
    return newLesson;
  }

  public addSavingsLedgerEntry(entry: Omit<SavingsLedgerEntry, 'id'>): SavingsLedgerEntry {
    const newEntry: SavingsLedgerEntry = {
      ...entry,
      id: `sav-${Date.now()}`,
    };
    this.savingsLedger.unshift(newEntry);
    return newEntry;
  }

  public saveBudgetPlan(plan: BudgetPlan): BudgetPlan {
    const existingIndex = this.budgetPlans.findIndex(b => b.id === plan.id);
    if (existingIndex >= 0) {
      this.budgetPlans[existingIndex] = plan;
    } else {
      this.budgetPlans.unshift(plan);
    }
    return plan;
  }

  public approveBudgetPlan(id: string, approvedBy: string): BudgetPlan | undefined {
    const plan = this.budgetPlans.find(b => b.id === id);
    if (plan) {
      plan.status = 'APPROVED';
      plan.approvedAt = new Date().toISOString();
      plan.approvedBy = approvedBy;
    }
    return plan;
  }

  public recordActualSpending(entry: Omit<ActualSpendingEntry, 'id'>): ActualSpendingEntry {
    const newEntry: ActualSpendingEntry = {
      ...entry,
      id: `act-${Date.now()}`,
    };
    this.actualSpendingRecords.unshift(newEntry);
    return newEntry;
  }

  public resetToDefaultSeed(): void {
    // Reset state to pristine demo initial condition
    this.budgetPlans = [];
    this.actualSpendingRecords = [];
  }
}

export const orgStore = new OrganizationStore();
