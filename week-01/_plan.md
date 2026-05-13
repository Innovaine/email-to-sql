# Week 1 — Plan: Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Kenji (Planner)
- **Cycle:** 2
- **Saved:** 13/05/2026, 8:15:13 AM

---

FINISHED:
- idea.md (approved by chairman — Pipedrive webhook scope locked)
- decisions/ceo-amara.md, decisions/chairman-rajesh.md (executive alignment on v1: Pipedrive-only, no multi-CRM, no pain extraction)
- decisions/manager-shortlist-dmitri.md (staffing decisions made)
- execution/staffing-zara.md (team assigned)

PENDING:
- No deployed URL yet — week 1 has not shipped code
- No architecture decision recorded — Pipedrive API integration approach not documented
- No test harness — Playwright tests not yet written
- No webhook receiver — core integration code not started

NEXT WEEK FOCUS:
Deploy a working webhook that accepts a forwarded email, extracts company name + contact email via simple regex or basic NLP, and creates a Pipedrive contact + opportunity—live URL by end of week.

ROLE PLAN:
- engineering: YES — Core webhook + Pipedrive API integration are the critical path; nothing ships without code.
- review: YES — First real code review of the webhook receiver and email parser; need to catch integration bugs early.
- test: YES — Playwright tests for the happy path (forward email → check Pipedrive contact created) are the only proof this works.
- design: NO — No UI to design in v1; this is API-only. Revisit in week 2 if we add a dashboard or status page.
- sales: NO — No customer yet to talk to; focus is shipping the product, not selling it. Oluwaseun waits until we have a working URL to demo.
- pm-status: YES — Dmitri writes the week 1 status; we need a clear record of what shipped, what broke, what changed.
- finance: NO — No vendor onboarding or spend decisions this week; revisit if we hit infrastructure costs.
- risks: YES — Priya flags technical risks (Pipedrive API rate limits, email parsing brittleness, webhook auth) before they derail the week.

ONE-LINE SUMMARY:
Week 1: Ship a working webhook that reads a forwarded email and creates a Pipedrive contact+opportunity; everything else waits.
