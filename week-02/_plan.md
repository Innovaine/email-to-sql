# Week 2 — Plan: Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Kenji (Planner)
- **Cycle:** 3
- **Saved:** 13/05/2026, 8:28:02 AM

---

FINISHED:
- Decision documents: tech stack options framed (decisions/ folder shows chairman + CEO + CTO input), blocking decision identified in week-01/_plan.md
- Risk inventory: week-01/risks.md documents the three known blockers (stack, validation, scope)
- (nothing else — no code, no deployed artifact, no customer conversations logged)

PENDING:
- Tech stack decision (LLM provider, email parser, storage layer, auth model) — was supposed to lock by EOD Tuesday week 1, did not happen
- MVP output format — unclear whether target is Pipedrive webhook, CSV export, or database sync
- Zero customer validation — no SaaS sales ops conversations completed; core assumption untested
- Engineering claims vs. reality mismatch — submitted report of "fully functional Flask + Pipedrive MVP" but repository contains zero source code (Yuki's review confirms this)

NEXT WEEK FOCUS:
Ship a curl-able webhook that accepts a forwarded email, extracts one field (company name) using a dead-simple rule (regex or hardcoded LLM call), and returns JSON—proving the end-to-end path works before we optimize extraction quality.

ROLE PLAN:
- engineering: YES — must produce actual Python code this week (not markdown). Start with skeleton Flask app + one working endpoint. Deployment blocker is active.
- review: YES — code review is the only thing preventing deployment; Yuki needs to verify source code exists and endpoint loads
- test: YES — Amil must write the first user test (curl the webhook with a sample email, assert JSON response) to prove it works
- design: NO — design token work, dashboard polish, and UI are week 3+ priorities. Blocked on engineering shipping something to test first.
- sales: YES — Oluwaseun runs 3–5 sales ops conversations this week (not next week) while engineering builds. We need one concrete customer signal by Friday: "Do you forward emails with deal info? How often? Would you use this if it worked?"
- pm-status: YES — Dmitri logs weekly status; must be honest about whether code shipped or not (not speculation)
- finance: NO — no budget, vendor, or cashflow decision due this week
- risks: YES — Priya flags if the LLM cost model (per-email extraction) becomes unsustainable at scale, and updates timeline risk if tech stack decision slips further

ONE-LINE SUMMARY:
Lock tech stack by Tuesday EOD, ship a working Flask webhook that parses one email field by Friday, and run customer conversations in parallel to validate the core pain exists.
