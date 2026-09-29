-- ============================================================
-- BUDGETMIND ENTERPRISE RELATIONAL SCHEMA
-- PostgreSQL / Supabase Compatible
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS & ORGANIZATIONS
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'FINANCE_MANAGER',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. PROJECTS
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    target_budget NUMERIC(15, 2) NOT NULL,
    duration_months INT DEFAULT 12,
    team_size INT DEFAULT 10,
    status VARCHAR(50) DEFAULT 'PLANNING', -- PLANNING, APPROVED, IN_EXECUTION, COMPLETED
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. BUDGET REQUIREMENTS
CREATE TABLE IF NOT EXISTS budget_requirements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- Hardware, Cloud, Software, Security, Training, Maintenance
    priority VARCHAR(50) NOT NULL, -- ESSENTIAL, IMPORTANT, OPTIONAL, DEFERRED
    estimated_cost NUMERIC(15, 2) NOT NULL,
    quantity INT DEFAULT 1,
    justification TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. BUDGET PLANS
CREATE TABLE IF NOT EXISTS budget_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    version INT DEFAULT 1,
    status VARCHAR(50) DEFAULT 'DRAFT', -- DRAFT, REVIEW_REQUESTED, APPROVED, REJECTED
    available_budget NUMERIC(15, 2) NOT NULL,
    minimum_effective_budget NUMERIC(15, 2) NOT NULL,
    recommended_budget NUMERIC(15, 2) NOT NULL,
    unallocated_reserve NUMERIC(15, 2) NOT NULL,
    potential_avoided_cost NUMERIC(15, 2) NOT NULL,
    verified_savings NUMERIC(15, 2) DEFAULT 0,
    contingency_amount NUMERIC(15, 2) NOT NULL,
    contingency_justification TEXT,
    one_time_cost NUMERIC(15, 2) NOT NULL,
    recurring_annual_cost NUMERIC(15, 2) NOT NULL,
    tco_3year NUMERIC(15, 2) NOT NULL,
    requirement_coverage_pct INT NOT NULL,
    why_unspent_explanation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. BUDGET ITEMS (CATEGORY ALLOCATIONS)
CREATE TABLE IF NOT EXISTS budget_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    budget_plan_id UUID REFERENCES budget_plans(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL,
    naive_amount NUMERIC(15, 2) NOT NULL,
    optimized_amount NUMERIC(15, 2) NOT NULL,
    delta_amount NUMERIC(15, 2) NOT NULL,
    percentage_of_budget NUMERIC(5, 2) NOT NULL,
    is_recurring BOOLEAN DEFAULT FALSE,
    rationale TEXT,
    historical_evidence TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. VENDORS & VENDOR QUOTES
CREATE TABLE IF NOT EXISTS vendors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    reliability_score_pct NUMERIC(5, 2) NOT NULL,
    support_sla_hours INT NOT NULL,
    historical_incidents INT DEFAULT 0,
    tco_3year NUMERIC(15, 2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vendor_quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    base_quote NUMERIC(15, 2) NOT NULL,
    recurring_annual NUMERIC(15, 2) NOT NULL,
    hidden_costs_estimate NUMERIC(15, 2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'RECEIVED', -- RECEIVED, SELECTED, REJECTED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. PROCUREMENTS & CONTRACTS
CREATE TABLE IF NOT EXISTS procurements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    vendor_id UUID REFERENCES vendors(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    amount NUMERIC(15, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'ACTIVE', -- ACTIVE, PENDING_APPROVAL, COMPLETED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. EXPENSES & ACTUAL SPENDING
CREATE TABLE IF NOT EXISTS actual_spending (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    budget_plan_id UUID REFERENCES budget_plans(id) ON DELETE SET NULL,
    category VARCHAR(100) NOT NULL,
    planned_amount NUMERIC(15, 2) NOT NULL,
    actual_amount NUMERIC(15, 2) NOT NULL,
    variance_amount NUMERIC(15, 2) NOT NULL,
    variance_pct NUMERIC(6, 2) NOT NULL,
    invoice_ref VARCHAR(100),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. BUDGET OUTCOMES & POSTMORTEMS
CREATE TABLE IF NOT EXISTS budget_outcomes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    budget_plan_id UUID REFERENCES budget_plans(id) ON DELETE SET NULL,
    outcome_summary TEXT NOT NULL,
    total_planned NUMERIC(15, 2) NOT NULL,
    total_actual NUMERIC(15, 2) NOT NULL,
    total_variance NUMERIC(15, 2) NOT NULL,
    unexpected_expenses TEXT,
    lessons_learned TEXT NOT NULL,
    hindsight_memory_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. SAVINGS LEDGER
CREATE TABLE IF NOT EXISTS savings_ledger (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    category VARCHAR(100) NOT NULL,
    vendor VARCHAR(255),
    type VARCHAR(50) NOT NULL, -- ESTIMATED, VERIFIED
    amount NUMERIC(15, 2) NOT NULL,
    reason TEXT NOT NULL,
    evidence_ref VARCHAR(255),
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. OPTIMIZATION DECISIONS & DELTAS
CREATE TABLE IF NOT EXISTS optimization_decisions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    budget_plan_id UUID REFERENCES budget_plans(id) ON DELETE CASCADE,
    item_name VARCHAR(255) NOT NULL,
    from_amount NUMERIC(15, 2) NOT NULL,
    to_amount NUMERIC(15, 2) NOT NULL,
    savings_amount NUMERIC(15, 2) NOT NULL,
    what_changed TEXT NOT NULL,
    why_explanation TEXT NOT NULL,
    evidence_reference TEXT NOT NULL,
    financial_impact TEXT NOT NULL,
    trade_off TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. HUMAN APPROVALS
CREATE TABLE IF NOT EXISTS approvals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    budget_plan_id UUID REFERENCES budget_plans(id) ON DELETE CASCADE,
    approved_by VARCHAR(255) NOT NULL,
    decision VARCHAR(50) NOT NULL, -- APPROVED, REJECTED, REVISION_REQUESTED
    notes TEXT,
    approved_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. AGENT RUNS & TRACES
CREATE TABLE IF NOT EXISTS agent_runs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    workflow_name VARCHAR(100) DEFAULT 'BudgetOptimizationGraph',
    status VARCHAR(50) DEFAULT 'COMPLETED',
    total_steps INT NOT NULL,
    tools_executed JSONB,
    execution_time_ms INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_budget_plans_project ON budget_plans(project_id);
CREATE INDEX IF NOT EXISTS idx_budget_items_plan ON budget_items(budget_plan_id);
CREATE INDEX IF NOT EXISTS idx_actual_spending_project ON actual_spending(project_id);
CREATE INDEX IF NOT EXISTS idx_savings_ledger_type ON savings_ledger(type);
CREATE INDEX IF NOT EXISTS idx_budget_outcomes_project ON budget_outcomes(project_id);
