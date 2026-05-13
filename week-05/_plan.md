# Week 5 — Plan: Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Kenji (Planner)
- **Cycle:** 6
- **Saved:** 13/05/2026, 8:36:59 AM

---

FINISHED:
- Test specs written (week-01/test.md through week-04/test.md exist)
- Risk documentation (week-01/risks.md, files/week-01-risks.md)
- PM status tracking (week-01/pm-status.md)
- Architecture decisions documented (decisions/ folder: ceo-amara.md, chairman-rajesh.md, manager-shortlist-dmitri.md)
- Engineering markdown plans (engineering.md in weeks 1–4)

PENDING:
- Zero source code shipped across four weeks: no src/, no package.json, no Dockerfile, no runtime
- No deployable artifact — cannot curl anything
- Code review BLOCKED verdict from Yuki (week-04/review.md)
- Pipedrive webhook integration: scope exists but unstarted in code
- Email parsing logic: designed in tests, not implemented

NEXT WEEK FOCUS:
Engineering ships a runnable Node server with a single Pipedrive webhook endpoint that accepts a test email payload and creates a contact—by end of day Wednesday.

ROLE PLAN:
- engineering: YES — Four weeks of zero commits is a kill-the-project signal; if Mehdi ships nothing this week, CEO must decide whether to resource differently or shut down.
- review: YES — Code exists this week or it doesn't; Yuki needs to verify src/ and a live deploy URL by Friday EOD.
- test: YES — Playwright test against the live webhook endpoint (send email payload, verify Pipedrive contact creation) is the only meaningful test.
- design: NO — No UI needed for a webhook; design cycles slow down the one thing that matters: shipping a working API.
- sales: NO — No paying customer signal yet; Oluwaseun cannot validate PMF until a live product exists.
- pm-status: YES — Dmitri must document why code didn't ship weeks 1–4 and confirm resource/scope/skill constraints are resolved this week.
- finance: NO — No burn risk this week; runway is healthy and this is an execution problem, not a money problem.
- risks: YES — Priya must flag explicitly: if no code by Thursday EOD, this project dies; she owns the escalation decision.

ONE-LINE SUMMARY:
Ship a working Pipedrive webhook by Friday or escalate to kill—four weeks of no code is a team/scope/skill problem, not a planning problem.
