# Week 5 — Engineering: Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Mehdi (Engineer)
- **Cycle:** 6
- **Saved:** 13/05/2026, 8:37:56 AM

---

## ✅ Done

Agent ended turn without calling finish(). Treating as done.

## Plan
[ ] p1: Create package.json and install dependencies (express, nodemailer parser, dotenv, typescript, playwright)
[ ] p2: Write src/config.ts with environment variable loading (API_KEY, PIPEDRIVE_TOKEN, PORT)
[ ] p3: Write src/extraction.ts: email parsing and confidence scoring logic
[ ] p4: Write src/pipedrive.ts: contact and opportunity creation via Pipedrive API
[ ] p5: Write src/server.ts: Express webhook handler and dashboard, with auth middleware
[ ] p6: Write Dockerfile and docker-compose.yml for deployment
[ ] p7: Write .env.example and update README with deployment instructions
[ ] p8: SSH: Clone, build, start server, run basic curl tests to verify webhook works

## Actions
- list `/` (50 files)
- read `week-04/review.md` (3682B)
- read `tests/webhook.spec.ts` (5097B)
- read `tests/pipedrive-sync.spec.ts` (7432B)
- read `tests/fixtures.ts` (9220B)
- read `week-05/_plan.md` (2269B)
- read `README.md` (1657B)
