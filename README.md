# BudgetMind 🧠💰

> **"Don't spend the budget. Optimize it."**  
> *"Learn from every purchase. Spend smarter every time."*

BudgetMind is an enterprise-grade **AI Budget Optimizer & Procurement Memory Agent** built for finance managers, procurement leads, project managers, and startup founders. Unlike traditional expense calculators or generic chatbots, BudgetMind is powered by persistent biomimetic memory (**Hindsight**) to eliminate unnecessary expenditures, harvest underutilized software assets, prevent costly vendor traps, and continuously learn from historical financial outcomes.

---

## 💡 The Central Idea

Traditional budget tools assume:
$$\text{Available Budget} = \text{Target Spending}$$

BudgetMind operates on a fundamentally different financial premise:
$$\text{Available Budget} \neq \text{Target Spending}$$

The agent's objective is:
$$\text{Objective} = \min(\text{Effective Cost}) \quad \text{subject to} \quad \text{Coverage} \ge 100\%, \; \text{Security} \ge \text{Req}, \; \text{Risk} \le \text{Acceptable}$$

When a user provides **₹10 Lakh** to establish an engineering squad, BudgetMind calculates the **Minimum Effective Budget** (~₹8.11 Lakh) needed to fulfill 100% of essential requirements and preserves the remaining **₹1.89 Lakh as an Unallocated Strategic Reserve**.

> **"Not spending money is also an optimization."**

---

## 🔄 The Continuous Learning Loop

```
       PLAN
        ↓
      SPEND
        ↓
  ACTUAL OUTCOME
        ↓
      LEARN
        ↓
HINDSIGHT MEMORY BANK
        ↓
 OPTIMIZE NEXT PLAN
        ↓
LOWER COST / HIGHER VALUE
        ↓
     SPEND
        ↓
   LEARN AGAIN
```

BudgetMind bridges past financial outcomes with active planning decisions:
1. **Cloud Project Overrun:** Project AlphaCloud experienced a **24% budget overrun** due to variable egress and unmonitored weekend instances. *Hindsight applies this lesson to raise cloud contingency dynamically to 18-20% and configure idle shutdown alerts.*
2. **Duplicate License Elimination:** The organization holds **45 unused Jira seats** and **30 unused Slack seats** from a legacy migration. *BudgetMind detects duplicate procurement requests and harvests existing seats, immediately avoiding ₹50,000+ in redundant spend.*
3. **Vendor False Economy:** Vendor A was selected for being ₹15,000 cheaper upfront, but caused 42 hours of downtime due to a 48h support SLA. *BudgetMind prioritizes Vendor B (ApexCloud) with 1h SLA and 99.95% uptime, proving a lower 3-year TCO.*
4. **Unbudgeted Hardware Maintenance:** Engineering laptops historically suffer a 5-8% accidental damage rate. When maintenance is budgeted at ₹0, *BudgetMind automatically injects an evidence-backed ₹20,000 repair reserve.*

---

## 🏛️ System Architecture

```
[User Natural Language Prompt]
             │
             ▼
[LLM Service: Requirement & Constraint Intake]
 (Google Gemini 2.5 Flash / Deterministic NLP Fallback)
             │
             ▼
[Hindsight Memory Bank: Recall Relevant Procurement History]
 (Official @vectorize-io/hindsight-client + Local Enterprise Store)
             │
             ▼
[Deterministic Financial Engine: Single Source of Truth]
 ├── Duplicate Subscription & License Harvesting
 ├── 3-Year Total Cost of Ownership (TCO) Engine
 ├── Evidence-Based Contingency Modeler
 └── Constraint Optimization & Unallocated Reserve Calculator
             │
             ▼
[Transparent Optimization Report & 20+ Agent Tools]
             │
             ▼
[Human Review & Explicit Stakeholder Approval]
 (No financial commitment is silently executed)
             │
             ▼
[Spending Tracking ➔ Variance Analysis ➔ Retain to Hindsight]
```

### Source of Truth
Critical arithmetic is **never delegated to the LLM**. The deterministic backend calculation engine executes all calculations for totals, percentages, budget allocations, recurring costs, one-time costs, TCO, variance, and savings.

---

## 🛠️ 21 Agent Deterministic Tools

BudgetMind implements all 20+ real agent tools:
1. `searchHistoricalBudgets` — Query historical project budgets and outcomes.
2. `searchHistoricalSpending` — Retrieve actual category expenditures.
3. `searchProcurements` — Inspect active organizational procurement contracts.
4. `searchVendors` — Query qualified vendor profiles and ratings.
5. `getVendorHistory` — Audit historical downtime incidents and support SLAs.
6. `getExistingResources` — Audit active enterprise software and cloud assets.
7. `findDuplicateSubscriptions` — Match requested tools against unassigned licenses.
8. `calculateTCO` — Model 3-year Total Cost of Ownership including hidden fees.
9. `calculateBudgetAllocation` — Deterministically compute minimum effective spend.
10. `calculateBudgetVariance` — Track planned vs actuals with percentage overruns.
11. `detectHiddenCosts` — Flag egress, renewal price locks, and repair risks.
12. `detectUnusedResources` — Harvest idle seats and reserved instance capacity.
13. `calculateContingency` — Evidence-based reserve based on past variance.
14. `compareVendors` — Evaluate upfront bids vs operational SLA and uptime.
15. `runWhatIfScenario` — Generate Scenarios A, B, and C with trade-offs.
16. `calculateExpectedSavings` — Measure avoided costs against full allocations.
17. `createBudgetPlan` — Draft structured plan awaiting explicit review.
18. `recordBudgetApproval` — Transition draft to approved and retain in Hindsight.
19. `recordSpending` — Log actual invoice line-items for variance auditing.
20. `recordOutcome` — Synthesize postmortem observations into actionable lessons.
21. `extractLesson` — Retain quantitative rules into the memory bank.

---

## 🗺️ Multi-Page Enterprise SaaS Architecture

BudgetMind is built as a complete multi-page enterprise web application with React Router and dark/light themes:
- **`/`** — Premium SaaS Landing Page with visual financial comparison, learning loop, and CTAs.
- **`/login`** — Split-screen authentication with animated financial intelligence graphic.
- **`/signup`** — Enterprise registration with role and organization intake.
- **`/onboarding`** — Multi-step onboarding to establish organizational optimization priorities.
- **`/dashboard`** — Executive workspace: AI budget intelligence card, 6 KPI metrics, variance chart, allocation donut, Hindsight recent lessons.
- **`/budgets` & `/budgets/:id`** — Budget optimizer workspace: natural language intake, 4 financial pillars, Memory Influence widget, "Why didn't you spend the remaining money?" modal, and human approval.
- **`/projects` & `/projects/:id`** — Enterprise projects portfolio with target budgets, actual expenditures, and postmortem outcome retention.
- **`/procurement` & `/procurement/:id`** — Software asset harvesting (45 unused Jira seats, 30 unused Slack seats) and purchase contracts.
- **`/vendors` & `/vendors/:id`** — Vendor directory & head-to-head 3-year Total Cost of Ownership (TCO) evaluator.
- **`/memory` & `/memory/:id`** — Hindsight long-term memory bank, visual influence graph, and manual retention.
- **`/sandbox`** — Multi-parameter what-if simulator with Scenarios A, B, and C.
- **`/savings`** — Relational savings ledger distinguishing Potential Avoided Cost from Verified Savings.
- **`/insights`** — Multi-category financial intelligence (Cost Optimization, Vendor Intelligence, Recurring Costs, Budget Variance, Risk, Memory).
- **`/settings`** — Profile, Theme toggle (Dark/Light), and safe System Integrations status (**NO client-side API key inputs**).
- **`/demo`** — Internal test route executing the 11-scene sequential state verification.

---

## 🧪 Optimization Sandbox

A dedicated workspace where users can tweak variables without altering approved budgets:
- **Sliders:** Target Budget Limit (₹6L to ₹15L), Team Size (5 to 30), Duration (6 to 24 mos).
- **Priorities:** Balanced, Lowest Cost, Reliability (SLA), Enterprise Security (SOC2).
- **Scenarios A, B, C:**
  - *Scenario A:* Full Target Allocation (100% coverage, 0% reserve).
  - *Scenario B (Recommended):* Optimized with license reuse and evidence contingency.
  - *Scenario C (Austerity):* High risk, coverage drops to 88%, deferred training.

---

## 📒 Savings Ledger (Estimated vs Verified)

A persistent organizational ledger distinguishing:
- **Total Potential Avoided Cost:** Aggregate value preserved across all initiatives.
- **Total Verified Realized Savings:** Audited against actual supplier invoices.
- **Total Estimated Projected Savings:** Active pipeline optimizations.

---

## 💻 Tech Stack

- **Frontend:** React 19, TypeScript, Vite 8, Tailwind CSS, Framer Motion, Recharts, Lucide React.
- **Backend API:** Node.js, Express 5, TypeScript (`tsx`).
- **AI Agent Orchestration:** LangGraph (Stateful Agent Workflow with Annotation state) & LangChain.
- **Relational Database:** PostgreSQL / Supabase with 13 relational tables, UUID keys, foreign key constraints, indexes, and comprehensive synthetic seed data (`database/schema.sql`, `database/seed.sql`).
- **Data Access Layer:** Repository pattern (`server/data/dbRepository.ts`).
- **Organizational Memory Engine:** `@vectorize-io/hindsight-client` with live cloud sync + local enterprise memory fallback.
- **LLM Engine:** `@google/genai` (Google Gemini 2.5 Flash) with deterministic financial parser fallback.
- **Financial Arithmetic Engine:** Single source of truth for all mathematical calculations (`financialEngine.ts`, `calculator.ts`).

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js v20+ or v24+
- npm v10+

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-org/budgetmind.git
cd budgetmind

# Install dependencies
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory (see `.env.example`):
```env
PORT=3001

# Supabase / PostgreSQL Database
DATABASE_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Hindsight Cloud Credentials (Optional - Local store active if unset)
HINDSIGHT_API_KEY=
HINDSIGHT_URL=https://api.hindsight.vectorize.io
HINDSIGHT_BANK_ID=budgetmind-procurement-bank

# Google Gemini API Key (Optional - Deterministic parser active if unset)
GEMINI_API_KEY=
```

*Note: BudgetMind runs out-of-the-box in local development with full data persistence. Service credentials are securely configured via backend environment variables.*

### 4. Run Development Server
```bash
npm run dev
```
- Frontend UI: `http://localhost:5173`
- Backend API: `http://localhost:3001`

### 5. Run End-to-End Verification Tests
```bash
npx tsx scripts/verify-e2e.ts
```

---

## 🛡️ Financial Safety & Transparency Guarantees

- **No Silently Executed Decisions:** Every optimized budget requires human stakeholder review and explicit approval.
- **No Hallucinated Financial Figures:** Every recommendation is labeled as `ESTIMATE`, `ASSUMPTION`, `RECOMMENDATION`, or `HISTORICAL EVIDENCE`.
- **Never Represent Estimated Savings as Guaranteed:** Always designated as *Estimated Savings* or *Potential Avoided Cost*.
- **The "Why didn't you spend the remaining money?" Interaction:** Provides mathematical and operational justification for preserved capital rather than treating unspent money as arbitrary.

---

## 📄 License
MIT © 2026 BudgetMind. Enterprise Financial Intelligence & Continuous Procurement Optimization System.
