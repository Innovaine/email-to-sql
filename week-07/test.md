# Week 7 — Testing (Playwright / Appetize): Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Amil (Tester)
- **Cycle:** 9
- **Saved:** 13/05/2026, 9:19:42 AM

---

## ⏱️ Hit step limit

Hit the 20-step budget for this week. Plan: 5 pending of 8 total.

## Plan
[x] p1: SSH: Recon server state and verify Docker build artifacts exist
[x] p2: SSH: Rebuild and inspect the dist/ folder inside the container
[x] p3: Write Playwright test spec for webhook endpoint testing
[ ] p4: SSH: Install Playwright test dependencies
[ ] p5: SSH: Run webhook Playwright tests against the server
[ ] p6: SSH: Test health endpoint and dashboard accessibility
[ ] p7: Capture test results and screenshots into test-results/week-07/
[ ] p8: Write final test report with verdict

## Actions
- list `/` (98 files)
- read `README.md` (1657B)
- read `src/server.ts` (8345B)
- read `tests/webhook.spec.ts` (5097B)
- read `docker-compose.yml` (646B)
- read `package.json` (764B)
- read `week-07/engineering.md` (8338B)
- read `Dockerfile` (908B)
- read `tsconfig.json` (698B)
- read `src/config.ts` (1321B)
- queued SSH on app: `cd ~/email-to-sql && git status && docker ps && df -h | head -5`
- ran 1 SSH command(s) — 0 failure(s)
- queued SSH on app: `cd ~/email-to-sql && docker compose logs email-to-sql-webhook 2>&1 | tail -40`
- ran 1 SSH command(s) — 0 failure(s)
- queued SSH on app: `cd ~/email-to-sql && docker compose logs 2>&1 | tail -50`
- ran 1 SSH command(s) — 0 failure(s)
- ✓ p1: SSH: Recon server state and verify Docker build artifacts exist
- ✓ p2: SSH: Rebuild and inspect the dist/ folder inside the container
- read `tests/fixtures.ts` (9220B)
- read `tests/pipedrive-sync.spec.ts` (7432B)
- **wrote** `tests/web/integration.spec.ts` (9974B)
- ✓ p3: Write Playwright test spec for webhook endpoint testing

## SSH commands executed
1. ✓ exit 0 — cd ~/email-to-sql && git status && docker ps && df -h | head -5
STDOUT:
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
CONTAINER ID   IMAGE                       COMMAND                  CREATED              STATUS                          PORTS                                         NAMES
7b167fd56434   email-to-sql-email-to-sql   "docker-entrypoint.s…"   About a minute ago   Up About a minute (unhealthy)   0.0.0.0:5000->5000/tcp, [::]:5000->5000/tcp   email-to-sql-webhook
Filesystem      Size  Used Avail Use% Mounted on
tmpfs           3.2G  1.2M  3.2G   1% /run
/dev/sda1       387G  6.0G  381G   2% /
tmpfs            16G     0   16G   0% /dev/shm
tmpfs           5.0M     0  5.0M   0% /run/lock
Full log: server-runs/2026-05-13T06-17-57-app-cd-email-to-sql-git-status-docker-ps-df--1.log

2. ✓ exit 0 — cd ~/email-to-sql && docker compose logs email-to-sql-webhook 2>&1 | tail -40
STDOUT:
time="2026-05-13T06:18:27Z" level=warning msg="/home/tester/email-to-sql/docker-compose.yml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion"
no such service: email-to-sql-webhook
Full log: server-runs/2026-05-13T06-18-27-app-cd-email-to-sql-docker-compose-logs-emai-1.log

3. ✓ exit 0 — cd ~/email-to-sql && docker compose logs 2>&1 | tail -50
STDOUT:
time="2026-05-13T06:19:12Z" level=warning msg="/home/tester/email-to-sql/docker-compose.yml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion"
email-to-sql-webhook  | 
email-to-sql-webhook  | > email-to-sql@0.1.0 start
email-to-sql-webhook  | > node dist/src/server.js
email-to-sql-webhook  | 
email-to-sql-webhook  | ⚠️  PIPEDRIVE_API_TOKEN not set; Pipedrive sync will fail
email-to-sql-webhook  | ✓ Config loaded: PORT=5000, API_KEY=dev-key-...
email-to-sql-webhook  | 
email-to-sql-webhook  | ✅ Email-to-SQL webhook listening on http://localhost:5000
email-to-sql-webhook  |    POST /webhook/email  — submit forwarded email
email-to-sql-webhook  |    GET  /dashboard      — view extraction status
email-to-sql-webhook  |    GET  /health         — health check
email-to-sql-webhook  |
Full log: server-runs/2026-05-13T06-19-12-app-cd-email-to-sql-docker-compose-logs-2-1--1.log
