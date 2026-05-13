# Week 6 — Plan: Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Kenji (Planner)
- **Cycle:** 8
- **Saved:** 13/05/2026, 8:59:25 AM

---

FINISHED:
- Test specs written (webhook.spec.ts, pipedrive-sync.spec.ts exist in week-01 onward)
- Project scope narrowed to Pipedrive-only in week-05 (decisions/week-05-priya-conviction.md, execution/week-05-unblock-plan.md)
- Dockerfile, package.json, README.md, .env.example exist at root (infrastructure skeleton in place)

PENDING:
- Zero executable source code across 5 weeks — no src/ directory, no runtime, repo identical to week 1
- No Pipedrive API integration despite being core to scope
- No customer validation; owner has not interviewed a single sales team or confirmed pain point
- Block unresolved: Engineering shipped nothing for fourth consecutive week; cannot load in browser; violates company mission

NEXT WEEK FOCUS:
Ship a working webhook endpoint that accepts a forwarded email, extracts one deal field (company name), and logs it to stdout by EOD Tuesday — no Pipedrive integration yet, just proof of life.

ROLE PLAN:
- engineering: YES — Hard block requires immediate code output; pairing with CTO or scope reduction must be decided before week start
- review: YES — Code review is only valuable if code exists; this week will test whether engineering can produce a runnable artifact
- test: YES — Specs exist; need to validate webhook accepts HTTP POST and returns 200 before Pipedrive sync attempt
- design: NO — Scope is technical validation, not UX; design adds no velocity this week
- sales: NO — Customer validation is blocked until engineering proves the integration is real; validation work is premature
- pm-status: YES — Dmitri must log whether hard block was actually resolved or escalated; this is make-or-break visibility
- finance: NO — No hiring or cost decisions needed this week
- risks: YES — Priya must flag if this is a passive kill or a genuine unblock; five weeks of zero code is institutional pattern we need to name

ONE-LINE SUMMARY:
Engineering ships a working webhook endpoint that ingests email and extracts one field by Tuesday; everything else (Pipedrive, validation, polish) is blocked until that exists.
