# Week 12 — Plan: Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Kenji (Planner)
- **Cycle:** 14
- **Saved:** 13/05/2026, 8:16:09 PM

---

# WEEK 12 BRIEFING — Email-to-SQL

## FINISHED:
- Dockerfile with devDependencies restored (Week 11 regression fixed)
- extraction.ts confidence scoring + company name casing logic (partial — unvalidated)
- Test selector updates (partial — 21/28 tests passing as of Week 11)

## PENDING:
- Full test suite validation (Week 11 plan items p4, p6, p7 never executed)
- Malformed email handling (p4 — skipped Week 11)
- API key header auth blocker (unresolved from Week 10)
- Docker build verification + end-to-end test run (blocking deployment)
- Zero customer signal for 11 weeks — no user contact, no feedback loop

## NEXT WEEK FOCUS:
Complete the Week 11 engineering plan (p4 + p6/p7), run full test suite to 28/28 passing, and ship a working URL + identify one real Pipedrive user to test the webhook against live data.

## ROLE PLAN:
- engineering: YES — Must finish incomplete Week 11 work (malformed email handling + full test validation) before shipping anything new. Docker rebuild + extraction fixes need validation, not iteration.
- review: YES — Cannot deploy without Yuki's approval on the completed test suite. This is the gate.
- test: YES — Run full Playwright suite to 28/28 passing. This is not optional. If tests fail, engineering debugs before shipping.
- pm-status: YES — Dmitri needs to document what "launched" means if we're shipping with known blockers, or confirm we're pulling it back to staging until tests pass.
- requirements: NO — No scope change until tests pass and we have customer validation. Scope is locked to Pipedrive webhook + deal metadata extraction.
- design: NO — No UI work needed this week. Webhook integration is API-first.
- sales: YES — Oluwaseun needs to identify one paying Pipedrive customer (or prospect with active account) who will let us test the webhook live. No more theoretical validation.
- risks: YES — Priya flags: 11 weeks with zero customer contact is a confidence killer. If we ship without a user to validate against, we're guessing.
- finance: NO — No budget question this week.

## ONE-LINE SUMMARY:
Fix the Docker/test blockers from Week 11 (don't ship broken), get to 28/28 passing tests, and land one live Pipedrive user to validate the webhook works on real email + deal data before end of week.
