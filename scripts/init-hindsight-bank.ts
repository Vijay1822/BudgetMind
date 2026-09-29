import dotenv from 'dotenv';
dotenv.config();
import { HindsightClient } from '@vectorize-io/hindsight-client';

async function initBank() {
  const hindsightUrl = process.env.HINDSIGHT_URL || 'https://api.hindsight.vectorize.io';
  const hindsightKey = process.env.HINDSIGHT_API_KEY;
  const bankId = process.env.HINDSIGHT_BANK_ID || 'budgetmind-procurement-bank';

  if (!hindsightKey) {
    console.error('HINDSIGHT_API_KEY is not set');
    return;
  }

  const client = new HindsightClient({
    baseUrl: hindsightUrl,
    apiKey: hindsightKey,
  });

  try {
    console.log(`Checking/Creating bank: "${bankId}"...`);
    try {
      const existing = await client.getBankProfile(bankId);
      console.log('Bank already exists:', existing);
    } catch (e: any) {
      console.log('Bank does not exist yet. Creating bank now...');
      const created = await client.createBank(bankId, {
        name: 'BudgetMind Procurement Memory Bank',
        mission: 'Maintain organizational financial, procurement, vendor SLA, and budget overrun lessons to optimize future enterprise budgets.',
      });
      console.log('Bank successfully created!', created);
    }

    // Now seed the initial lessons into the live cloud bank!
    console.log('Retaining baseline enterprise lessons into live Hindsight cloud...');
    const lessons = [
      {
        content: 'AlphaCloud deployment experienced a 24% budget overrun due to unmonitored egress bandwidth and idle weekend compute instances. Require 18% cloud contingency and auto-shutdown on dev clusters.',
        category: 'Cloud',
        sourceProject: 'AlphaCloud Platform Migration',
      },
      {
        content: 'SaaS Scale project purchased 100 enterprise software licenses, but audit revealed 35% remained unused. Always harvest unassigned Jira and Slack inventory before procuring new subscription bundles.',
        category: 'Software',
        sourceProject: 'SaaS Scale Expansion',
      },
      {
        content: 'CheapHost vendor was selected for lowest upfront bid (₹15,000 cheaper), but 48h SLA resulted in 42 hours of developer downtime costing ₹45,000+. ApexCloud 1h SLA and 99.95% uptime produces lower 3-year TCO.',
        category: 'Vendor',
        sourceProject: 'Core Infra Hosting RFP',
      },
      {
        content: 'Developer laptop fleet experienced 6% accidental damage and battery degradation in year 1. Maintenance budgeted at ₹0 caused emergency budget reallocation. Require 5-8% hardware repair contingency reserve.',
        category: 'Hardware',
        sourceProject: 'Dev Workstation Fleet Refresh',
      },
    ];

    for (const l of lessons) {
      const res = await client.retain(bankId, l.content, {
        metadata: {
          category: l.category,
          sourceProject: l.sourceProject,
        }
      });
      console.log(`Retained lesson: "${l.category}" ->`, res ? 'Success' : 'OK');
    }

    console.log('\nTesting live recall query...');
    const recallRes = await client.recall(bankId, 'cloud egress overrun and contingency');
    console.log('Live recall response:', JSON.stringify(recallRes, null, 2));

    console.log('\n✅ HINDSIGHT CLOUD MEMORY BANK IS FULLY INITIALIZED AND CONNECTED!');
  } catch (err: any) {
    console.error('Error initializing Hindsight bank:', err.message || err);
  }
}

initBank();
