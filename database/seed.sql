-- ============================================================
-- BUDGETMIND REALISTIC SEED DATA
-- Historical projects, vendors, spend, outcomes, savings
-- ============================================================

-- 1. USERS
INSERT INTO users (id, email, full_name, role) VALUES
('00000000-0000-0000-0000-000000000001', 'cfo@enterprise.io', 'Sarah Jenkins', 'CFO'),
('00000000-0000-0000-0000-000000000002', 'procurement@enterprise.io', 'Marcus Vance', 'VP_PROCUREMENT')
ON CONFLICT (id) DO NOTHING;

-- 2. HISTORICAL PROJECTS
INSERT INTO projects (id, title, description, target_budget, duration_months, team_size, status) VALUES
('11111111-1111-1111-1111-111111110001', 'AlphaCloud Infrastructure Scaling', 'Core backend compute and staging cluster migration.', 200000.00, 12, 10, 'COMPLETED'),
('11111111-1111-1111-1111-111111110002', 'SaaS License Rationalization', 'Enterprise-wide audit of developer tools and communication suites.', 300000.00, 12, 50, 'COMPLETED'),
('11111111-1111-1111-1111-111111110003', 'Core Platform Hosting Migration', 'Hosting provider selection and multi-cloud database setup.', 150000.00, 12, 8, 'COMPLETED'),
('11111111-1111-1111-1111-111111110004', 'Engineering Workstation Refresh', 'Procurement of developer laptops, monitors, and peripherals.', 350000.00, 12, 10, 'COMPLETED'),
('11111111-1111-1111-1111-111111110005', 'Engineering Team 1-Year Establishment', 'Baseline engineering squad deployment for new product line.', 1000000.00, 12, 10, 'APPROVED')
ON CONFLICT (id) DO NOTHING;

-- 3. VENDORS
INSERT INTO vendors (id, name, category, reliability_score_pct, support_sla_hours, historical_incidents, tco_3year, notes) VALUES
('22222222-2222-2222-2222-222222220001', 'CloudCore CheapHost', 'Cloud', 98.20, 48, 8, 312000.00, 'Lowest upfront price, but 48h support SLA and expensive unmonitored egress rates.'),
('22222222-2222-2222-2222-222222220002', 'ApexCloud Enterprise', 'Cloud', 99.95, 1, 1, 298000.00, '1h 24/7 SLA, bundled bandwidth, lower 3-year TCO despite +₹15k upfront quote.'),
('22222222-2222-2222-2222-222222220003', 'SecureNet Hardware Direct', 'Hardware', 99.10, 4, 0, 350000.00, 'Includes 3-year onsite hardware replacement warranty and damage protection.'),
('22222222-2222-2222-2222-222222220004', 'BudgetTech Refurb Outlet', 'Hardware', 92.40, 72, 6, 305000.00, '90-day warranty only with 18% historical failure rate in first 12 months.')
ON CONFLICT (id) DO NOTHING;

-- 4. SAVINGS LEDGER RECORDS (VERIFIED & ESTIMATED)
INSERT INTO savings_ledger (id, project_id, category, vendor, type, amount, reason, evidence_ref, date) VALUES
('33333333-3333-3333-3333-333333330001', '11111111-1111-1111-1111-111111110002', 'Software', 'Atlassian & Slack', 'VERIFIED', 90000.00, 'Pooled 45 unused Jira seats and 30 Slack seats instead of procuring new licenses.', 'Invoice Reconciliation #S-104', '2025-08-15'),
('33333333-3333-3333-3333-333333330002', '11111111-1111-1111-1111-111111110003', 'Cloud', 'ApexCloud Enterprise', 'VERIFIED', 14000.00, 'Bundled egress avoided excess data transfer surcharges over 3-year lifecycle.', 'Contract Appendix C #APX-3Y', '2025-11-10'),
('33333333-3333-3333-3333-333333330003', '11111111-1111-1111-1111-111111110004', 'Hardware', 'SecureNet Hardware', 'VERIFIED', 35000.00, 'Direct volume bundling included 3-year warranty at zero extra premium.', 'PO #SN-88192', '2026-02-18'),
('33333333-3333-3333-3333-333333330004', '11111111-1111-1111-1111-111111110005', 'Software', 'Jira & Slack Reuse', 'ESTIMATED', 50000.00, 'Utilizing 12 inactive existing licenses instead of procuring new subscriptions.', 'BudgetMind Memory Optimization Engine', '2026-09-29'),
('33333333-3333-3333-3333-333333330005', '11111111-1111-1111-1111-111111110005', 'Unallocated Reserve', 'Organizational Treasury', 'ESTIMATED', 188825.00, 'Requirements satisfied with ₹8.11L; preserved ₹1.89L uncommitted cash reserve.', 'BudgetMind Minimum Effective Cost Engine', '2026-09-29')
ON CONFLICT (id) DO NOTHING;

-- 5. HISTORICAL ACTUAL SPENDING & OVERRUNS
INSERT INTO actual_spending (id, project_id, category, planned_amount, actual_amount, variance_amount, variance_pct, invoice_ref) VALUES
('44444444-4444-4444-4444-444444440001', '11111111-1111-1111-1111-111111110001', 'Cloud', 200000.00, 248000.00, 48000.00, 24.00, 'INV-AWS-2025-06'),
('44444444-4444-4444-4444-444444440002', '11111111-1111-1111-1111-111111110002', 'Software', 300000.00, 210000.00, -90000.00, -30.00, 'INV-SAAS-2025-Q3'),
('44444444-4444-4444-4444-444444440003', '11111111-1111-1111-1111-111111110003', 'Cloud', 80000.00, 135000.00, 55000.00, 68.75, 'INV-HOST-2024-11'),
('44444444-4444-4444-4444-444444440004', '11111111-1111-1111-1111-111111110004', 'Hardware', 350000.00, 370000.00, 20000.00, 5.71, 'INV-DELL-2025-09')
ON CONFLICT (id) DO NOTHING;

-- 6. BUDGET OUTCOMES (POSTMORTEM LESSONS STORED IN HINDSIGHT)
INSERT INTO budget_outcomes (id, project_id, outcome_summary, total_planned, total_actual, total_variance, unexpected_expenses, lessons_learned, hindsight_memory_id) VALUES
('55555555-5555-5555-5555-555555550001', '11111111-1111-1111-1111-111111110001', 'Compute overage and unmonitored egress bandwidth.', 200000.00, 248000.00, 48000.00, 'Idle weekend test instances and egress data transfer spikes.', 'Usage-based cloud charges caused 24% overrun. Future cloud budgets must include 18-20% contingency and proactive automated monitoring.', 'mem-01'),
('55555555-5555-5555-5555-555555550002', '11111111-1111-1111-1111-111111110002', 'Discovered redundant subscriptions across engineering squads.', 300000.00, 210000.00, -90000.00, 'None. Successfully consolidated 45 seats.', 'Always inspect active organizational license inventory before purchasing software subscriptions.', 'mem-02'),
('55555555-5555-5555-5555-555555550003', '11111111-1111-1111-1111-111111110003', 'Selected low quote vendor but suffered 42 hours cumulative downtime.', 80000.00, 135000.00, 55000.00, 'Emergency engineering overtime and data recovery.', 'Vendor support SLA and uptime reliability should receive higher importance weighting than upfront price discount.', 'mem-03')
ON CONFLICT (id) DO NOTHING;
