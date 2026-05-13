# Week 8 — Plan: Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Kenji (Planner)
- **Cycle:** 10
- **Saved:** 13/05/2026, 9:20:48 AM

---

FINISHED:
- Docker environment configured (Dockerfile, docker-compose.yml present)
- TypeScript server scaffold with Pipedrive webhook handler (src/server.ts, src/pipedrive.ts, src/extraction.ts)
- Email parsing and metadata extraction logic written (src/extraction.ts 8789B)
- Project structure established across 9 weeks of planning + engineering work
- (nothing shipped to production; no usable URL)

PENDING:
- Docker build failing or incomplete — dist/ not generating correctly after TypeScript compilation (hit step limit mid-investigation week 7)
- Webhook health check endpoint status unknown — not tested live
- Pipedrive API integration untested against real CRM instance
- No production deploy; no test email can be forwarded and processed end-to-end

NEXT WEEK FOCUS:
Ship a working webhook URL that accepts a test email, extracts one contact field (company name), and writes it to Pipedrive — or kill this project and redeploy the engineering capacity.

ROLE PLAN:
- engineering: YES — Docker build is broken; needs hard reset and minimal path to production deploy, not more feature work
- review: YES — Yuki hit step limit; needs to finish the build investigation and confirm runtime state before engineering writes new code.
- test: YES — Once webhook deploys, Amil tests the full loop: forward email → Pipedrive writes contact → can curl the health endpoint.
- design: NO — No UI work is on the critical path; this is a webhook, not a user-facing surface.
- sales: NO — No customer outreach until we have a working URL to show.
- pm-status: YES — Dmitri must write status; this project is RED and at decision point. Status report is where we decide whether we continue or cut.
- finance: NO — No budget or runway concern specific to this project right now; focus is execution, not cost.
- risks: YES — Priya watches: if Docker + Pipedrive integration are still broken by Wednesday, this project should be paused and engineering reallocated to a higher-momentum bet.

ONE-LINE SUMMARY:
Unblock the Docker build this week, deploy to production, and test a single end-to-end email-to-Pipedrive flow, or recommend project pause and resource redeployment.
