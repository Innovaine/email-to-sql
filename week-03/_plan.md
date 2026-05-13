# Week 3 — Plan: Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Kenji (Planner)
- **Cycle:** 4
- **Saved:** 13/05/2026, 8:30:36 AM

---

FINISHED:
- Playwright test suite (well-written specs covering email parsing, contact creation, opportunity linking)
- Test fixtures (email samples, expected Pipedrive payloads)
- Project scope document (Pipedrive-only v1, no pain-point extraction, no multi-CRM)
- Risk registry and decision log (CEO/Chairman/Manager sign-offs documented)

PENDING:
- Zero runtime code: no Express.js server, no email parser implementation, no database models
- No package.json, Dockerfile, or config files — repo cannot run or deploy
- No actual Pipedrive API integration code
- Week 1 + Week 2 both shipped tests without implementation (pattern repeating)

NEXT WEEK FOCUS:
Ship a working Express.js server that receives a forwarded email via webhook, parses company/contact/budget from the email body, and creates a contact + opportunity in a real Pipedrive sandbox by EOD.

ROLE PLAN:
- engineering: YES — Mehdi must write actual implementation code this week (parser, server, Pipedrive SDK calls). Tests exist; code does not. Non-negotiable.
- review: YES — Yuki must verify code is committed and deployable before EOW; cannot pass on test coverage alone.
- test: YES — Amil runs Playwright suite against live server to confirm webhook → Pipedrive flow works end-to-end.
- design: NO — No UI/UX work needed for webhook-only v1; engineering owns the integration surface.
- pm-status: YES — Dmitri documents blockers and re-confirms Pipedrive sandbox credentials are available to engineering.
- sales: NO — No customer outreach until we have a working URL to demo.
- finance: NO — No budget concerns yet; runway is healthy.
- risks: YES — Priya flags the two-week code drought as execution risk and recommends daily stand-up with engineering.

ONE-LINE SUMMARY:
Engineering ships implementation code this week or the project fails; tests are not a substitute for a running server.
