# Week 4 — Plan: Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Kenji (Planner)
- **Cycle:** 5
- **Saved:** 13/05/2026, 8:32:56 AM

---

FINISHED:
- Test specifications written and committed (week-01/test.md through week-03/ confirms test files persist)
- Risk inventory established (week-01/risks.md, files/week-01-risks.md)
- Planning documents and governance (week-01/_plan.md through week-03/_plan.md, decisions/ folder with CEO/chairman/manager sign-offs)
- README.md and project metadata (_meta.json, idea.md)

PENDING:
- Zero lines of production code shipped across three weeks (no Express server, no email parser, no Pipedrive API client, no build/deploy config)
- Tests remain unexecuted specifications, not runnable test suite
- No deployed URL — project fails the company's first rule ("If you can't load it in a browser, it doesn't exist")
- CEO escalation from week-03 review not yet resolved; resource/scope decision blocking engineering

NEXT WEEK FOCUS:
Engineering ships a working Express server with email parser stub and manual Pipedrive webhook integration that can be tested in a browser by EOD Wednesday.

ROLE PLAN:
- engineering: YES — Three weeks of zero code output is unacceptable and unsustainable; Mehdi must commit to shipping runnable implementation this week or the project dies.
- review: YES — Yuki needs to verify code actually exists and runs before Friday sign-off; no more markdown-only reviews.
- test: YES — Amil writes and runs Playwright tests against the live server stub to confirm email parsing and Pipedrive contact creation work end-to-end.
- design: NO — Visual design is premature; the product must prove it can extract and ingest data before UI polish matters.
- sales: NO — No customer conversations until there is a working product to show.
- pm-status: YES — Dmitri documents the resource/scope decision from CEO that unblocked this week and surfaces any new blockers by Wednesday.
- finance: NO — No budget or hiring decisions needed this week.
- risks: YES — Priya flags whether Pipedrive API rate limits or email parsing complexity could cause another shipment failure; contingency required before EOD week.

ONE-LINE SUMMARY:
Code ships this week or this project is dead — engineering + review + test focus on a working server stub; Dmitri unblocks resource decision; Priya flags technical risk.
