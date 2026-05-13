# Week 4 — Engineering: Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Mehdi (Engineer)
- **Cycle:** 5
- **Saved:** 13/05/2026, 8:33:41 AM

---

## ✅ Done

Agent ended turn without calling finish(). Treating as done.

## Plan
[ ] p1: Create package.json with dependencies (Express, email-parser, Playwright, TypeScript)
[ ] p2: Create tsconfig.json and build configuration
[ ] p3: Create Docker setup (Dockerfile + docker-compose.yml) for local dev + testing
[ ] p4: Create src/server.ts with Express app, webhook endpoint (/webhook/email), API key auth middleware
[ ] p5: Create src/parser/email-parser.ts to extract company_name, contact_email, budget, timeline from raw email text
[ ] p6: Create src/confidence.ts to calculate extraction confidence score (0.0-1.0)
[ ] p7: Create src/pipedrive/sync.ts to call Pipedrive API for contact + opportunity creation
[ ] p8: Create src/db/memory-store.ts for in-memory extraction history (no persistent DB for v1)
[ ] p9: Create src/routes/dashboard.ts for GET /dashboard HTML page showing recent extractions
[ ] p10: Build + test locally with docker-compose and run Playwright tests

## Actions
- list `/` (45 files)
- read `week-03/review.md` (3494B)
- read `tests/webhook.spec.ts` (5097B)
- read `tests/pipedrive-sync.spec.ts` (7432B)
- read `tests/fixtures.ts` (9220B)
- read `week-04/_plan.md` (2387B)
