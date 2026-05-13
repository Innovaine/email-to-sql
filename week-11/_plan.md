# Week 11 — Plan: Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Kenji (Planner)
- **Cycle:** 13
- **Saved:** 13/05/2026, 7:54:12 PM

---

# WEEK 11 BRIEF — Email-to-SQL

## FINISHED:
- Docker image builds and deploys to staging (week-10 Dockerfile fix applied)
- 21 of 28 core tests passing: API key auth, nested email forwards, company name extraction, confidence scoring all functional
- Pipedrive webhook integration live and receiving test payloads
- Test suite and review artifacts in week-10/ (no new code shipped week-11 yet — pipeline halted at review gate)

## PENDING:
- 7 failing tests blocking production deploy: API auth edge case, confidence threshold logic, company name casing mismatch, test selector breakage (4 bug tasks created in week-10 code review, still open)
- Docker build works; tests fail on run — root cause is confidence scoring returning null on some forwarded email patterns
- No customer signal collected (zero paid or trial signups this week; no customer emails attempted extraction)
- Memo discrepancy: pm-status claims "launched" but code review verdict was "FIX FIRST — do not ship"

## NEXT WEEK FOCUS:
Fix the 7 failing tests (confidence threshold + casing logic), verify Docker passes full test suite, and deploy to production; simultaneously run extraction against 5 real customer emails to validate pattern matching before claiming launch.

## ROLE PLAN:
- engineering: YES — 7 test failures are blocking deploy; Mehdi owns the fix path (confidence threshold null case + casing logic)
- review: YES — Yuki re-runs full test suite post-fix to confirm 28/28 pass and Docker build clean before production deploy approval
- requirements: NO — scope is locked (Pipedrive-only, no multi-CRM, no pain extraction); no new feature definition needed this week
- design: NO — webhook payload and UI are finalized; no new design work blocks execution
- test: YES — Amil runs extraction against 5 real customer forwarded emails (not synthetic test data) to validate pattern matching confidence before live traffic
- pm-status: YES — Dmitri logs actual customer signal (or absence of it) and clarifies what "launched" means: deployed to staging, or live with paying usage
- finance: NO — no budget or headcount decisions block this week
- risks: NO — no new risk surface; still concerned about pattern fragility if customer email formats diverge
- sales: NO — no outreach until extraction is confirmed working against real mail

## ONE-LINE SUMMARY:
Fix 7 failing tests, pass full test suite, validate extraction against 5 real customer emails, and move from staging to production with honest "launched" definition.
