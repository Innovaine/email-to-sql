# Week 6 — Engineering: Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Mehdi (Engineer)
- **Cycle:** 7
- **Saved:** 13/05/2026, 8:53:13 AM

---

## ⏱️ Hit step limit

Hit the 20-step budget for this week. Plan: 3 pending of 8 total.

## Plan
[x] p1: Create package.json with dependencies (express, mailparser, dotenv, typescript, playwright)
[x] p2: Write src/config.ts: environment variable loader for API_KEY, PIPEDRIVE_TOKEN, PORT
[x] p3: Write src/extraction.ts: email parser + confidence scoring logic
[x] p4: Write src/pipedrive.ts: Pipedrive contact and deal creation API client
[x] p5: Write src/server.ts: Express webhook handler (POST /webhook/email, GET /dashboard stub)
[ ] p6: Write Dockerfile and docker-compose.yml
[ ] p7: Write .env.example and tsconfig.json
[ ] p8: SSH: Clone, build, start server, test POST /webhook/email with sample email and verify Pipedrive sync

## Actions
- list `/` (62 files)
- read `README.md` (1657B)
- read `week-05/engineering.md` (1190B)
- read `tests/webhook.spec.ts` (5097B)
- read `tests/pipedrive-sync.spec.ts` (7432B)
- read `tests/fixtures.ts` (9220B)
- read `week-06/_plan.md` (3038B)
- list `src` (0 files)
- **wrote** `package.json` (764B)
- ✓ p1: Create package.json with dependencies (express, mailparser, dotenv, typescript, playwright)
- **wrote** `src/config.ts` (1321B)
- ✓ p2: Write src/config.ts: environment variable loader for API_KEY, PIPEDRIVE_TOKEN, PORT
- **wrote** `src/extraction.ts` (8789B)
- ✓ p3: Write src/extraction.ts: email parser + confidence scoring logic
- **wrote** `src/pipedrive.ts` (8747B)
- ✓ p4: Write src/pipedrive.ts: Pipedrive contact and deal creation API client
- **wrote** `src/server.ts` (8227B)
- ✓ p5: Write src/server.ts: Express webhook handler (POST /webhook/email, GET /dashboard stub)
- **wrote** `Dockerfile` (908B)
