# Week 7 — Plan: Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Kenji (Planner)
- **Cycle:** 9
- **Saved:** 13/05/2026, 9:08:52 AM

---

FINISHED:
- TypeScript compilation fixes (src/pipedrive.ts line 294, src/server.ts lines 49 + 77) — three blocking errors resolved
- No runtime deliverable; no deployed webhook; no Pipedrive integration tested end-to-end

PENDING:
- Docker image build and deployment to staging (queued SSH pull incomplete)
- Webhook endpoint functional test against sample email payload
- Pipedrive API integration verification (contacts + opportunities auto-creation)
- Dashboard accessibility check
- Review.md verdict document

NEXT WEEK FOCUS:
Ship a working webhook that accepts a forwarded email, extracts deal metadata, and creates a Pipedrive contact + opportunity in one request-response cycle—or kill the project.

ROLE PLAN:
- engineering: YES — Five weeks of compilation fixes without shipped runtime code is a staffing or architecture failure. Mehdi needs to either deploy working code by Wednesday or escalate the blocker with specifics. No more type safety work counts as progress.
- review: YES — Yuki stays because the code review is the only honest signal we have; if there's a deeper technical wall (Pipedrive API complexity, auth, schema mismatch), Yuki will spot it before Mehdi wastes another week.
- test: YES — Amil runs Playwright against the live webhook endpoint as soon as it's deployed. One real email in, one Pipedrive record out. If it works, we have a shipped product. If it fails, we know why.
- pm-status: YES — Dmitri writes the memo. Week 7 either produces a loadable, testable URL or this project is RED-flagged for decision.
- design: NO — No UI complexity in scope; Pipedrive's native dashboard is the interface.
- sales: NO — No customer conversations until the webhook works. Oluwaseun can wait.
- finance: NO — Runway impact is known; no new cost variance this week.
- risks: YES — Priya flags if this is a "wrong problem" bet (Pipedrive webhook strategy vs. email parsing complexity) before we burn week 8. One conversation with Mehdi about whether the architecture can ship by week 9 cutoff.

ONE-LINE SUMMARY:
Deploy and test the webhook end-to-end this week or formally kill the project — five weeks of compilation without runtime code means either the technical scope is wrong or the engineer assignment is wrong, and we need to know which by Friday.
