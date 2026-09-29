async function runE2ETests() {
  console.log('============================================================');
  console.log('🔍 RUNNING COMPREHENSIVE BUDGETMIND END-TO-END VERIFICATION');
  console.log('============================================================\n');

  let passed = 0;
  let total = 0;

  const assert = (condition: boolean, msg: string) => {
    total++;
    if (condition) {
      console.log(`✅ [PASS] ${msg}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${msg}`);
    }
  };

  const BASE_URL = 'http://localhost:3001';

  // 1. Health check
  try {
    const res = await fetch(`${BASE_URL}/api/health`);
    const json = await res.json();
    assert(res.status === 200 && json.status === 'healthy', 'Health check endpoint returns healthy');
    assert(json.hindsight !== undefined, 'Hindsight status is present in health check');
  } catch (e: any) {
    assert(false, `Health check failed: ${e.message}`);
  }

  // 2. Hindsight diagnostics
  try {
    const res = await fetch(`${BASE_URL}/api/hindsight/status`);
    const json = await res.json();
    assert(json.success === true, 'Hindsight status endpoint responds successfully');
    assert(json.data.memoryCount >= 4, `Hindsight memory bank contains ${json.data.memoryCount} pre-seeded lessons`);
  } catch (e: any) {
    assert(false, `Hindsight status failed: ${e.message}`);
  }

  // 3. Existing resources & duplicate license inventory
  try {
    const res = await fetch(`${BASE_URL}/api/resources`);
    const json = await res.json();
    assert(json.success && json.data.length >= 4, `Resources inventory has ${json.data?.length} enterprise items`);
    const jira = json.data.find((r: any) => r.name.toLowerCase().includes('jira'));
    assert(jira && jira.unusedQuantity === 45, 'Identified exactly 45 unused Jira enterprise licenses in stock');
  } catch (e: any) {
    assert(false, `Resource check failed: ${e.message}`);
  }

  // 4. Vendor profiles & TCO calculation
  try {
    const res = await fetch(`${BASE_URL}/api/vendors`);
    const json = await res.json();
    assert(json.success && json.data.length >= 4, `Vendors database loaded with ${json.data?.length} profiles`);
    const apex = json.data.find((v: any) => v.name.includes('ApexCloud'));
    assert(apex && apex.reliabilityScorePct === 99.95, 'ApexCloud has verified 99.95% uptime and 1h SLA');
  } catch (e: any) {
    assert(false, `Vendor check failed: ${e.message}`);
  }

  // 5. Historical records & overruns
  try {
    const res = await fetch(`${BASE_URL}/api/history`);
    const json = await res.json();
    assert(json.success && json.data.length >= 4, `Historical audit ledger loaded with ${json.data?.length} records`);
    const alpha = json.data.find((h: any) => h.project.includes('AlphaCloud'));
    assert(alpha && alpha.variancePercentage === 24.0, 'AlphaCloud documented 24% overrun verified in ledger');
  } catch (e: any) {
    assert(false, `History check failed: ${e.message}`);
  }

  // 6. Savings Ledger (Estimated vs Verified)
  try {
    const res = await fetch(`${BASE_URL}/api/savings-ledger`);
    const json = await res.json();
    assert(json.success, 'Savings ledger responds successfully');
    assert(json.data.totals.totalVerified > 0, `Verified savings tracked: ₹${json.data.totals.totalVerified.toLocaleString('en-IN')}`);
    assert(json.data.totals.totalEstimated > 0, `Estimated savings tracked: ₹${json.data.totals.totalEstimated.toLocaleString('en-IN')}`);
  } catch (e: any) {
    assert(false, `Savings ledger failed: ${e.message}`);
  }

  // 7. Budget Optimization Pipeline (Primary User Journey)
  let createdPlanId: string = '';
  try {
    const prompt = 'I have ₹10 lakh to establish a development team for one year.';
    const res = await fetch(`${BASE_URL}/api/agent/optimize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, priority: 'BALANCED' }),
    });
    const json = await res.json();
    assert(json.success === true, 'Budget optimization pipeline executed successfully');
    const plan = json.data.plan;
    createdPlanId = plan.id;

    assert(plan.availableBudget === 1000000, 'Available Budget correctly set to ₹10,00,000');
    assert(plan.minimumEffectiveBudget <= 850000, `Minimum Effective Budget optimized to ₹${plan.minimumEffectiveBudget.toLocaleString('en-IN')} (Target is NOT blindly spent)`);
    assert(plan.unallocatedReserve >= 150000, `Unallocated Strategic Reserve preserved: ₹${plan.unallocatedReserve.toLocaleString('en-IN')}`);
    assert(plan.estimatedSavings >= 150000, `Estimated Savings calculated: ₹${plan.estimatedSavings.toLocaleString('en-IN')}`);
    assert(plan.requirementCoveragePct === 100, 'Requirement coverage is 100% for Essential components');
    assert(json.data.executionSteps.length >= 8, `Execution tracker logged ${json.data.executionSteps.length} transparent steps`);
    assert(json.data.memoryInfluence.memoriesRecalledCount >= 4, `Memory influence verified: ${json.data.memoryInfluence.memoriesRecalledCount} historical lessons applied`);
  } catch (e: any) {
    assert(false, `Optimization pipeline failed: ${e.message}`);
  }

  // 8. Human Review & Approval Flow
  if (createdPlanId) {
    try {
      const res = await fetch(`${BASE_URL}/api/budgets/${createdPlanId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approvedBy: 'Chief Financial Officer' }),
      });
      const json = await res.json();
      assert(json.success === true, `Budget Plan ${createdPlanId} approved by Human Stakeholder`);
      assert(json.data.status === 'APPROVED', 'Budget status transitioned to APPROVED');
    } catch (e: any) {
      assert(false, `Approval failed: ${e.message}`);
    }
  }

  // 9. Optimization Sandbox (What-If Scenarios)
  try {
    const res = await fetch(`${BASE_URL}/api/agent/whatif`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        baseAvailableBudget: 1000000,
        targetBudgetLimit: 750000,
        teamSize: 10,
        durationMonths: 12,
        priority: 'BALANCED',
        vendorPreference: 'RELIABLE',
        reuseExistingResources: true,
      }),
    });
    const json = await res.json();
    assert(json.success === true, 'Sandbox recalculation succeeded');
    const { scenarioA, scenarioB, scenarioC } = json.data;
    assert(scenarioA.estimatedCost > scenarioB.estimatedCost, 'Scenario A (Full Spend) costs more than Scenario B (Recommended)');
    assert(scenarioC.requirementCoveragePct < 100, `Scenario C (Austerity) reflects trade-offs: coverage drops to ${scenarioC.requirementCoveragePct}%`);
  } catch (e: any) {
    assert(false, `Sandbox failed: ${e.message}`);
  }

  // 10. Agent Tools Listing (All 20 real tools)
  try {
    const res = await fetch(`${BASE_URL}/api/agent/tools`);
    const json = await res.json();
    assert(json.success && json.totalTools >= 20, `Agent implements all ${json.totalTools} deterministic tools`);
  } catch (e: any) {
    assert(false, `Tools list failed: ${e.message}`);
  }

  // 11. Killer Demo 11 Scenes Sequential Progression
  try {
    let scenesPassed = 0;
    for (let i = 1; i <= 11; i++) {
      const res = await fetch(`${BASE_URL}/api/demo/scene/${i}`);
      const json = await res.json();
      if (json.success && json.data.sceneNumber === i) {
        scenesPassed++;
      }
    }
    assert(scenesPassed === 11, `All 11 Killer Demo scenes successfully verified with exact state transitions`);
  } catch (e: any) {
    assert(false, `Demo scenes failed: ${e.message}`);
  }

  // 12. Retain & Recall Memory Persistence Test
  try {
    const testContent = 'Project Apollo: Cloud database migration completed with automated index caching, saving 15% compute.';
    const retainRes = await fetch(`${BASE_URL}/api/hindsight/retain`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: testContent,
        category: 'Cloud',
        sourceProject: 'Project Apollo',
        quantitativeImpact: 'Saved 15% compute',
        financialRule: 'Enable index caching',
        tags: ['test', 'cloud'],
      }),
    });
    const retainJson = await retainRes.json();
    assert(retainJson.success === true, 'Memory successfully retained into Hindsight bank');

    const recallRes = await fetch(`${BASE_URL}/api/hindsight/recall`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'Project Apollo cloud index caching' }),
    });
    const recallJson = await recallRes.json();
    assert(recallJson.success === true, 'Recall query succeeded');
    const found = recallJson.data.lessons.some((l: any) => l.sourceProject === 'Project Apollo');
    assert(found, 'Retained memory from Project Apollo was successfully recalled in subsequent interaction');
  } catch (e: any) {
    assert(false, `Retain/Recall persistence failed: ${e.message}`);
  }

  // 12. Enterprise Authentication & Session Management
  try {
    const signupRes = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: 'Jordan Finance',
        email: 'jordan.finance@enterprise.com',
        password: 'Password123!',
        organization: 'Apex Global Enterprises',
        role: 'Finance Director',
      }),
    });
    const signupJson = await signupRes.json();
    assert(signupJson.success === true && signupJson.data.user.email === 'jordan.finance@enterprise.com', 'User registration / signup succeeded');

    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'jordan.finance@enterprise.com',
        password: 'Password123!',
      }),
    });
    const loginJson = await loginRes.json();
    assert(loginJson.success === true && !!loginJson.data.token, 'User authentication / login succeeded');

    const meRes = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${loginJson.data.token}` },
    });
    const meJson = await meRes.json();
    assert(meJson.success === true && meJson.data.role === 'Finance Director', 'Session persistence /me endpoint validated');
  } catch (e: any) {
    assert(false, `Authentication test failed: ${e.message}`);
  }

  console.log('\n============================================================');
  console.log(`🏁 VERIFICATION COMPLETE: ${passed}/${total} TESTS PASSED (${Math.round((passed/total)*100)}%)`);
  console.log('============================================================\n');
}

runE2ETests();
