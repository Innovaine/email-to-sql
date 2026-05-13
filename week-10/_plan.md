# Week 10 — Plan: Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Kenji (Planner)
- **Cycle:** 12
- **Saved:** 13/05/2026, 7:21:26 PM

---

FINISHED:
- Extraction logic shipped in src/extraction.ts (signatures, From headers, bottom-up scanning) — service builds and stays healthy
- Docker build and container health check working (p1–p3 complete)
- 19 of 28 tests passing; root causes documented for all 9 failures

PENDING:
- 9 failing tests across 4 categories: API key header validation (5), nested forward extraction (2), company name pattern (1), confidence scoring (1) — all have reproduction steps
- p4 (webhook test) and p5 (integration test) never ran due to prior step limit
- Zero customer validation — no real user has touched the working URL yet
- Deploy artifact unstable mid-week (git clone loops, restart loops in logs) — health endpoint now responds but untested under load

NEXT WEEK FOCUS:
Fix the 9 failing tests by Wednesday EOD, then run one live customer test (SaaS sales leader, real email, JSON response) by Friday to prove the product works before deciding whether to continue or pivot.

ROLE PLAN:
- engineering: YES — Fix the 9 documented test failures (5 API key, 2 nested forward, 1 pattern, 1 scoring) and unblock p4/p5 completion
- review: YES — Verify fixes pass tests and no regressions introduced; clear p4/p5 for customer test
- test: YES — Run p4 webhook test and p5 integration test once engineering fixes land; prep one real customer test scenario
- pm-status: YES — Document blocker resolution, customer test setup, and decision gate (ship vs pivot) by end of week
- requirements: NO — Feature scope locked; no requirement changes until customer test outcome known
- design: NO — No UI/UX work needed; this week is pure stabilization and validation
- sales: YES — Identify and brief one SaaS sales leader (Pipedrive user, active deal flow) for Wednesday live test; capture feedback
- risks: YES — Flag deployment stability risk and single-customer validation bottleneck; monitor if fixes hold or if rewrite needed
- finance: NO — No financial decision required this week

ONE-LINE SUMMARY:
Fix 9 test failures, pass p4/p5, validate with one real customer by Friday — if it works, we have a launchable product; if it fails, we pivot or kill.
