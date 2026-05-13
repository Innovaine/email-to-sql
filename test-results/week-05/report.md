# Week 5 — Test Report

## Verdict: BLOCKED
**No source code shipped.** Cannot test a non-existent product.

---

## What I tested
- **Tool used:** N/A (no runtime to test)
- **Test files in repo:** 
  - `tests/webhook.spec.ts` (written in earlier cycles, expects a running server)
  - `tests/pipedrive-sync.spec.ts` (written in earlier cycles, end-to-end integration test)
  - `tests/fixtures.ts` (test data fixtures with realistic forwarded emails)

---

## Repo state confirmed
```
Repo contents (excluding .git/, week-*, reviews/, decisions/):
./README.md
./_meta.json
./idea.md
./server-log.md
./tests/fixtures.ts
./tests/pipedrive-sync.spec.ts
./tests/webhook.spec.ts
```

**Missing:**
- `src/` directory (no source code)
- `package.json` (no dependencies, no build config)
- `Dockerfile` / `docker-compose.yml` (no container config)
- `.env.example` (no environment template)

---

## Why this blocks testing

The test specs are **written and ready**, but they expect:
1. A running Express server on `http://localhost:5000`
2. Webhook endpoint at `/webhook/email` accepting forwarded emails
3. Email extraction logic that returns structured data (company, contact, budget, timeline, confidence score)
4. Pipedrive API integration (sync high-confidence extractions as contacts + opportunities)
5. Dashboard at `/dashboard` showing extraction status

**None of this code exists yet.** I cannot run Playwright tests against a non-existent server.

---

## What engineer (Mehdi) was supposed to ship this week

Per `week-05/_plan.md`:
- [ ] p1: Create package.json and install dependencies
- [ ] p2: Write src/config.ts with environment variable loading
- [ ] p3: Write src/extraction.ts: email parsing and confidence scoring
- [ ] p4: Write src/pipedrive.ts: Pipedrive API integration
- [ ] p5: Write src/server.ts: Express webhook handler and dashboard
- [ ] p6: Write Dockerfile and docker-compose.yml
- [ ] p7: Write .env.example and update README
- [ ] p8: Deploy and run basic curl tests

**Status:** Zero items completed. Zero commits.

---

## What to fix next round

**Blocker:** Mehdi must ship a runnable Node.js server with:

1. **Express webhook endpoint** (`POST /webhook/email`)
   - Accept raw email text (forwarded format)
   - Validate API key via `X-API-Key` header
   - Return JSON: `{ id, status, extracted: { company_name, contact_email, budget, timeline, confidence } }`

2. **Email parsing** (`src/extraction.ts`)
   - Parse forwarded emails (handle Gmail/Outlook forward format)
   - Extract: company name, contact email, budget mention, timeline mention
   - Compute confidence score (0.0–1.0) based on field clarity
   - Route to "success" (confidence >= 0.75) or "review" (< 0.75)

3. **Pipedrive sync** (`src/pipedrive.ts`)
   - For "success" extractions: auto-create contact + opportunity in Pipedrive
   - Use Pipedrive API token from environment
   - No duplicates: idempotency by email address

4. **Dashboard** (`GET /dashboard`)
   - Simple HTML showing recent extractions
   - Columns: email subject, company, contact, confidence, sync status
   - No auth required for v1

5. **Deployment**
   - Dockerfile (Node.js + npm install)
   - docker-compose.yml (expose port 5000)
   - `.env.example` (API_KEY, PIPEDRIVE_TOKEN, PORT)

**Then I can test:**
- Webhook accepts/rejects emails with API key auth
- Extraction accuracy on 8 fixture emails (high/medium/low confidence, nested forwards, quoted text, malformed)
- Pipedrive sync for high-confidence extractions
- Dashboard displays recent syncs
- Edge cases: malformed emails, missing fields, excessive quoted history

**Timeline:** This is Thursday (week 5). If code ships by Friday morning, I can run full test suite Friday afternoon and have verdict ready for Monday close-out.

---

## Evidence
- Confirmed repo state via `git pull` on app server at 2026-05-13T05:39:42Z
- Full server output: `server-runs/2026-05-13T05-39-42-app-cd-email-to-sql-git-pull-2-1-tail--3-ech-1.log`
- Test specs ready to run once code exists: `tests/webhook.spec.ts`, `tests/pipedrive-sync.spec.ts`, `tests/fixtures.ts`
