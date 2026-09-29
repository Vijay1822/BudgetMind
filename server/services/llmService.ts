import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';
import { RequirementItem, RequirementPriority } from '../types';

export class LLMService {
  private apiKey: string | null = null;
  private aiClient: GoogleGenAI | null = null;
  private isConfigured: boolean = false;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || null;
    if (this.apiKey) {
      this.initClient(this.apiKey);
    }
  }

  public updateApiKey(key: string) {
    this.apiKey = key;
    this.initClient(key);
  }

  private initClient(key: string) {
    try {
      this.aiClient = new GoogleGenAI({ apiKey: key });
      this.isConfigured = true;
      console.log('[LLMService] Google GenAI client initialized successfully.');
    } catch (err) {
      console.error('[LLMService] Failed to initialize Google GenAI client:', err);
      this.aiClient = null;
      this.isConfigured = false;
    }
  }

  public getStatus() {
    return {
      isConfigured: this.isConfigured,
      hasKey: Boolean(this.apiKey),
      provider: 'Google Gemini (gemini-2.5-flash)',
    };
  }

  /**
   * Parse user natural language input into structured requirement items and constraints.
   */
  public async extractRequirements(userInput: string): Promise<{
    availableBudget: number;
    teamSize: number;
    durationMonths: number;
    priorityMode: 'BALANCED' | 'LOWEST_COST' | 'RELIABILITY' | 'SECURITY';
    requirements: RequirementItem[];
  }> {
    // 1. If live Gemini is configured, use LLM for high-nuance extraction
    if (this.aiClient && this.isConfigured) {
      try {
        const prompt = `
You are BudgetMind's procurement requirement parser.
Extract the following from the user's business request:
- availableBudget: number in INR (e.g. 10 lakh = 1000000)
- teamSize: number of people (default 10)
- durationMonths: duration in months (default 12)
- priorityMode: 'BALANCED' | 'LOWEST_COST' | 'RELIABILITY' | 'SECURITY'
- requirements: array of items with:
    - id: string
    - name: string
    - category: 'Hardware' | 'Cloud' | 'Software' | 'Security' | 'Training'
    - priority: 'ESSENTIAL' | 'IMPORTANT' | 'OPTIONAL' | 'DEFERRED'
    - estimatedCost: number (in INR)
    - reason: string

Input: "${userInput}"

Respond with ONLY valid JSON adhering to the schema above without markdown formatting.
`;
        const res = await this.aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        const rawText = res.text?.replace(/```json/g, '').replace(/```/g, '').trim() || '';
        const parsed = JSON.parse(rawText);
        if (parsed.availableBudget && Array.isArray(parsed.requirements)) {
          return {
            availableBudget: Number(parsed.availableBudget),
            teamSize: Number(parsed.teamSize || 10),
            durationMonths: Number(parsed.durationMonths || 12),
            priorityMode: parsed.priorityMode || 'BALANCED',
            requirements: parsed.requirements,
          };
        }
      } catch (err) {
        console.warn('[LLMService] Gemini extraction failed or returned unparseable output; falling back to deterministic extraction:', err);
      }
    }

    // 2. Deterministic Financial Parser (Ensures absolute reliability even without active API keys)
    return this.deterministicExtraction(userInput);
  }

  private deterministicExtraction(input: string): {
    availableBudget: number;
    teamSize: number;
    durationMonths: number;
    priorityMode: 'BALANCED' | 'LOWEST_COST' | 'RELIABILITY' | 'SECURITY';
    requirements: RequirementItem[];
  } {
    const text = input.toLowerCase();

    // Budget detection (e.g. 10 lakh, 10L, 800000, 15 lakh)
    let availableBudget = 1000000; // Default ₹10,00,000
    const lakhMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:lakh|lac|l)/i);
    if (lakhMatch) {
      availableBudget = Math.round(parseFloat(lakhMatch[1]) * 100000);
    } else {
      const numMatch = text.match(/(?:₹|rs\.?|inr)?\s*(\d{5,9})/i);
      if (numMatch) {
        availableBudget = parseInt(numMatch[1], 10);
      }
    }

    // Priority detection
    let priorityMode: 'BALANCED' | 'LOWEST_COST' | 'RELIABILITY' | 'SECURITY' = 'BALANCED';
    if (text.includes('reliability') || text.includes('uptime') || text.includes('mission-critical')) {
      priorityMode = 'RELIABILITY';
    } else if (text.includes('security') || text.includes('compliance') || text.includes('soc2')) {
      priorityMode = 'SECURITY';
    } else if (text.includes('cheapest') || text.includes('lowest cost') || text.includes('minimum spend')) {
      priorityMode = 'LOWEST_COST';
    }

    // Team size
    let teamSize = 10;
    const teamMatch = text.match(/(\d+)\s*(?:developers|engineers|people|members|team)/i);
    if (teamMatch) {
      teamSize = parseInt(teamMatch[1], 10);
    }

    // Standardized baseline requirements for a development team
    const requirements: RequirementItem[] = [
      {
        id: 'req-01',
        name: 'Developer Engineering Workstations (Laptops & Peripherals)',
        category: 'Hardware',
        priority: 'ESSENTIAL',
        estimatedCost: Math.round(availableBudget * 0.35), // ₹3.5L
        quantity: Math.min(teamSize, 10),
        reason: 'High-performance workstations required for local Docker builds and testing.',
      },
      {
        id: 'req-02',
        name: 'Cloud Infrastructure & Managed Database Services',
        category: 'Cloud',
        priority: 'ESSENTIAL',
        estimatedCost: Math.round(availableBudget * 0.20), // ₹2.0L naive
        durationMonths: 12,
        reason: 'Compute instances, container registries, staging clusters, and automated backups.',
      },
      {
        id: 'req-03',
        name: 'Software Tools, Issue Tracking & IDE Subscriptions',
        category: 'Software',
        priority: 'IMPORTANT',
        estimatedCost: Math.round(availableBudget * 0.15), // ₹1.5L naive
        quantity: teamSize,
        reason: 'Collaboration, ticket management, continuous integration, and design tools.',
      },
      {
        id: 'req-04',
        name: 'Enterprise Security, Endpoint Protection & SSO',
        category: 'Security',
        priority: 'ESSENTIAL',
        estimatedCost: Math.round(availableBudget * 0.08), // ₹80k
        reason: 'Access control, code signing, vulnerability scanning, and compliance requirements.',
      },
      {
        id: 'req-05',
        name: 'Team Skills Development & Technical Certification Vouchers',
        category: 'Training',
        priority: 'OPTIONAL',
        estimatedCost: Math.round(availableBudget * 0.08), // ₹80k naive
        reason: 'Cloud certifications and specialized framework upskilling courses.',
      },
    ];

    return {
      availableBudget,
      teamSize,
      durationMonths: 12,
      priorityMode,
      requirements,
    };
  }

  /**
   * Generate transparent executive optimization rationale
   */
  public async generateExecutiveSummary(params: {
    availableBudget: number;
    minimumEffectiveBudget: number;
    estimatedSavings: number;
    unallocatedReserve: number;
    memoriesAppliedCount: number;
  }): Promise<string> {
    const { availableBudget, minimumEffectiveBudget, estimatedSavings, unallocatedReserve, memoriesAppliedCount } = params;

    const summary = `
[RECOMMENDATION]: Satisfy all core engineering requirements with a Minimum Effective Budget of ₹${minimumEffectiveBudget.toLocaleString('en-IN')}, leaving an Unallocated Reserve of ₹${unallocatedReserve.toLocaleString('en-IN')}.

[HISTORICAL EVIDENCE]: ${memoriesAppliedCount} organizational memories and past procurement outcomes were applied to eliminate duplicate software licenses and inject evidence-based contingency for cloud usage spikes.

[ASSUMPTION]: Team size remains stabilized at 10 active engineers with current existing license re-use.

[ESTIMATE]: Expected savings of ₹${estimatedSavings.toLocaleString('en-IN')} achieved by avoiding redundant tool purchases and rightsizing cloud compute.
`.trim();

    return summary;
  }
}

export const llmService = new LLMService();
