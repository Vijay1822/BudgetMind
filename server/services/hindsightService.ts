import 'dotenv/config';
import { HindsightClient } from '@vectorize-io/hindsight-client';
import { orgStore } from '../data/organizationStore';
import { MemoryLesson } from '../types';

export interface HindsightStatus {
  isConfigured: boolean;
  isConnected: boolean;
  bankId: string;
  baseUrl: string;
  source: 'HINDSIGHT_LIVE' | 'LOCAL_ORGANIZATIONAL_BANK';
  memoryCount: number;
  lastError?: string | null;
  lastRetainTimestamp?: string | null;
  lastRecallTimestamp?: string | null;
}

export class HindsightService {
  private client: HindsightClient | null = null;
  private bankId: string;
  private baseUrl: string;
  private apiKey: string | null = null;
  private isConnected: boolean = false;
  private lastError: string | null = null;
  private lastRetainTimestamp: string | null = null;
  private lastRecallTimestamp: string | null = null;

  constructor() {
    this.baseUrl = process.env.HINDSIGHT_URL || 'https://api.hindsight.vectorize.io';
    this.bankId = process.env.HINDSIGHT_BANK_ID || 'budgetmind-procurement-bank';
    this.apiKey = process.env.HINDSIGHT_API_KEY || null;

    this.initializeClient();
  }

  public updateCredentials(params: { apiKey?: string; baseUrl?: string; bankId?: string }) {
    if (params.apiKey !== undefined) this.apiKey = params.apiKey;
    if (params.baseUrl !== undefined) this.baseUrl = params.baseUrl;
    if (params.bankId !== undefined) this.bankId = params.bankId;

    this.initializeClient();
  }

  private initializeClient() {
    if (!this.apiKey) {
      console.warn('\n============================================================');
      console.warn('⚠️  [HINDSIGHT CONFIGURATION NOTICE]');
      console.warn('HINDSIGHT_API_KEY is not defined in process.env.');
      console.warn('To connect to live Hindsight cloud memory, please set:');
      console.warn('  HINDSIGHT_API_KEY=<your-key>');
      console.warn('  HINDSIGHT_URL=' + this.baseUrl);
      console.warn('  HINDSIGHT_BANK_ID=' + this.bankId);
      console.warn('BudgetMind is operating with the local auditable enterprise memory bank.');
      console.warn('============================================================\n');
      this.client = null;
      this.isConnected = false;
      this.lastError = 'HINDSIGHT_API_KEY is missing from environment variables.';
      return;
    }

    try {
      this.client = new HindsightClient({
        baseUrl: this.baseUrl,
        apiKey: this.apiKey,
      });
      this.isConnected = true;
      this.lastError = null;
      console.log(`[HindsightService] Initialized client for bank: ${this.bankId} at ${this.baseUrl}`);
    } catch (err: any) {
      this.client = null;
      this.isConnected = false;
      this.lastError = err?.message || 'Failed to initialize Hindsight client';
      console.error('❌ [HindsightService] Failed to initialize client:', err);
    }
  }

  public async checkHealth(): Promise<HindsightStatus> {
    if (!this.client || !this.apiKey) {
      return this.getStatus();
    }

    try {
      // Test recall connectivity with a light probe
      await this.client.recall(this.bankId, 'procurement lesson', { limit: 1 } as any);
      this.isConnected = true;
      this.lastError = null;
    } catch (err: any) {
      this.isConnected = false;
      this.lastError = `Connectivity probe failed: ${err?.message || err}`;
      console.warn(`[HindsightService] Live probe failed: ${this.lastError}`);
    }

    return this.getStatus();
  }

  public getStatus(): HindsightStatus {
    const memoryCount = orgStore.getMemoryLessons().length;
    return {
      isConfigured: Boolean(this.apiKey),
      isConnected: this.isConnected,
      bankId: this.bankId,
      baseUrl: this.baseUrl,
      source: this.isConnected ? 'HINDSIGHT_LIVE' : 'LOCAL_ORGANIZATIONAL_BANK',
      memoryCount,
      lastError: this.lastError,
      lastRetainTimestamp: this.lastRetainTimestamp,
      lastRecallTimestamp: this.lastRecallTimestamp,
    };
  }

  /**
   * RETAIN: Store organizational memory after approval, spending, or outcome
   */
  public async retain(content: string, options?: {
    category?: string;
    sourceProject?: string;
    quantitativeImpact?: string;
    financialRule?: string;
    tags?: string[];
  }): Promise<{
    success: boolean;
    source: 'HINDSIGHT_LIVE' | 'LOCAL_ORGANIZATIONAL_BANK';
    memoryId: string;
    lesson: MemoryLesson;
  }> {
    this.lastRetainTimestamp = new Date().toISOString();

    // 1. Always retain in local organizational bank for immediate persistence & inspection
    const localLesson = orgStore.addMemoryLesson({
      title: options?.category ? `${options.category} Procurement Insight` : 'Procurement Lesson',
      category: options?.category || 'General',
      sourceProject: options?.sourceProject || 'Active Budget Plan',
      lessonText: content,
      quantitativeImpact: options?.quantitativeImpact || 'Recorded during project milestone',
      financialAdjustmentRule: options?.financialRule || 'Review before future allocation',
      confidence: 0.95,
      tags: options?.tags || ['budget', 'procurement', 'lesson'],
    });

    let liveMemoryId: string | undefined;

    // 2. Retain to live Hindsight cloud if configured
    if (this.client && this.isConnected) {
      try {
        console.log(`[HindsightService] Retaining memory to live bank: ${this.bankId}...`);
        const result: any = await this.client.retain(this.bankId, content, {
          context: `Project: ${options?.sourceProject || 'Unknown'} | Category: ${options?.category || 'General'}`,
          metadata: {
            sourceProject: options?.sourceProject,
            category: options?.category,
            quantitativeImpact: options?.quantitativeImpact,
            financialRule: options?.financialRule,
            tags: options?.tags,
            timestamp: this.lastRetainTimestamp,
          },
        } as any);

        liveMemoryId = result?.id || result?.operationId || `hs-${Date.now()}`;
        localLesson.hindsightMemoryId = liveMemoryId;
        console.log(`[HindsightService] Successfully retained memory to Hindsight Live: ${liveMemoryId}`);

        return {
          success: true,
          source: 'HINDSIGHT_LIVE',
          memoryId: liveMemoryId || localLesson.id,
          lesson: localLesson,
        };
      } catch (err: any) {
        console.error(`[HindsightService] Retain to live Hindsight failed:`, err);
        this.lastError = `Retain failed: ${err.message}`;
      }
    }

    return {
      success: true,
      source: 'LOCAL_ORGANIZATIONAL_BANK',
      memoryId: localLesson.id,
      lesson: localLesson,
    };
  }

  /**
   * RECALL: Retrieve relevant organizational memories to influence budget planning
   */
  public async recall(query: string, options?: {
    category?: string;
    limit?: number;
  }): Promise<{
    source: 'HINDSIGHT_LIVE' | 'LOCAL_ORGANIZATIONAL_BANK';
    lessons: MemoryLesson[];
    rawResults?: any[];
  }> {
    this.lastRecallTimestamp = new Date().toISOString();
    const limit = options?.limit || 5;

    // If live Hindsight is active, attempt recall
    if (this.client && this.isConnected) {
      try {
        console.log(`[HindsightService] Recalling memories from live bank: ${this.bankId} for "${query}"...`);
        const response: any = await this.client.recall(this.bankId, query, { limit } as any);
        const liveResults = response?.results || [];

        console.log(`[HindsightService] Recalled ${liveResults.length} memories from Hindsight Live.`);

        // Cross-reference with our rich structured lessons
        const allLocalLessons = orgStore.getMemoryLessons();
        const matchedLessons: MemoryLesson[] = [];

        for (const res of liveResults) {
          const match = allLocalLessons.find(l =>
            l.hindsightMemoryId === res.id ||
            res.text?.toLowerCase().includes(l.category.toLowerCase()) ||
            res.text?.toLowerCase().includes(l.sourceProject.toLowerCase())
          );
          if (match && !matchedLessons.some(m => m.id === match.id)) {
            matchedLessons.push(match);
          }
        }

        // Fill remaining with relevant local lessons
        if (matchedLessons.length < limit) {
          const fallback = this.recallLocal(query, options?.category, limit - matchedLessons.length);
          for (const item of fallback) {
            if (!matchedLessons.some(m => m.id === item.id)) {
              matchedLessons.push(item);
            }
          }
        }

        return {
          source: 'HINDSIGHT_LIVE',
          lessons: matchedLessons,
          rawResults: liveResults,
        };
      } catch (err: any) {
        console.error(`[HindsightService] Recall from live Hindsight failed:`, err);
        this.lastError = `Recall failed: ${err.message}`;
      }
    }

    // Local semantic and keyword search across stored organizational lessons
    const localMatches = this.recallLocal(query, options?.category, limit);
    return {
      source: 'LOCAL_ORGANIZATIONAL_BANK',
      lessons: localMatches,
    };
  }

  private recallLocal(query: string, categoryFilter?: string, limit: number = 5): MemoryLesson[] {
    const all = orgStore.getMemoryLessons();
    const queryTokens = query.toLowerCase().split(/\s+/).filter(t => t.length > 2);

    const scored = all.map(lesson => {
      let score = 0;

      // Exact category match
      if (categoryFilter && lesson.category.toLowerCase() === categoryFilter.toLowerCase()) {
        score += 10;
      }

      // Token matching across lesson text, title, tags, and source project
      const searchTarget = `${lesson.title} ${lesson.category} ${lesson.lessonText} ${lesson.sourceProject} ${lesson.tags.join(' ')}`.toLowerCase();

      for (const token of queryTokens) {
        if (searchTarget.includes(token)) {
          score += 3;
        }
      }

      return { lesson, score };
    });

    // Sort descending by score, then by date
    scored.sort((a, b) => b.score - a.score);

    // Return top matches and backfill up to limit with relevant lessons
    const matched = scored.filter(s => s.score > 0).map(s => s.lesson);
    const result = [...matched];
    for (const item of all) {
      if (result.length >= limit) break;
      if (!result.some(r => r.id === item.id)) {
        result.push(item);
      }
    }
    return result.slice(0, limit);
  }
}

export const hindsightService = new HindsightService();
