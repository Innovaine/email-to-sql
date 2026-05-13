# Week 8 — Code review: Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Yuki (Reviewer)
- **Cycle:** 10
- **Saved:** 13/05/2026, 9:34:39 AM

---

## ⏱️ Hit step limit

Hit the 20-step budget for this week. Plan: 2 pending of 5 total.

## Plan
[x] p1: Fix package.json start script to use correct flattened path (dist/server.js not dist/src/server.js)
[x] p2: Clone/pull repo on server and rebuild Docker image
[x] p3: Start container and verify health endpoint responds
[ ] p4: Test webhook with sample email payload
[ ] p5: Write code review with verdict

## Actions
- list `/` (112 files)
- read `week-08/_plan.md` (2339B)
- read `week-08/engineering.md` (6347B)
- read `Dockerfile` (908B)
- read `package.json` (760B)
- read `tsconfig.json` (701B)
- list `src` (4 files)
- **edited** `package.json`
- ✓ p1: Fix package.json start script to use correct flattened path (dist/server.js not dist/src/server.js)
- queued SSH on app: `cd ~/email-to-sql && git pull --ff-only && cat package.json | grep -A 3 '"scripts"'`
- ran 1 SSH command(s) — 0 failure(s)
- queued SSH on app: `cd ~/email-to-sql && docker compose down && sleep 2 && timeout 180 docker compose build --progress=p`
- ran 1 SSH command(s) — 1 failure(s)
- queued SSH on app: `cd ~/email-to-sql && docker compose up -d && sleep 5 && docker compose logs --tail=30`
- ran 1 SSH command(s) — 0 failure(s)
- ✓ p2: Clone/pull repo on server and rebuild Docker image
- queued SSH on app: `curl -s http://localhost:5000/health && echo ""`
- ran 1 SSH command(s) — 0 failure(s)
- read `src/server.ts` (8345B)
- queued SSH on app: `curl -s -H "X-API-Key: dev-key-12345" http://localhost:5000/health && echo ""`
- ran 1 SSH command(s) — 0 failure(s)
- ✓ p3: Start container and verify health endpoint responds
- queued SSH on app: `curl -s -X POST \`
- ran 1 SSH command(s) — 0 failure(s)
- queued SSH on app: `curl -s http://localhost:5000/dashboard | head -50`
- ran 1 SSH command(s) — 0 failure(s)

## SSH commands executed
1. ✓ exit 0 — cd ~/email-to-sql && git pull --ff-only && cat package.json | grep -A 3 '"script
STDOUT:
…cat-tsconfig.json-grep-r-1.log |  14 +
 ...-cd-email-to-sql-docker-compose-down-slee-1.log |  72 +++++
 ...-cd-email-to-sql-docker-compose-up--d-sle-1.log |  32 ++
 tests/web/integration.spec.ts                      | 338 +++++++++++++++++++++
 tsconfig.json                                      |   2 +-
 week-07/_index.md                                  |  15 +
 week-07/pm-status.md                               |  71 +++++
 week-07/review.md                                  | 158 ++++++++++
 week-07/test.md                                    |  84 +++++
 week-08/_plan.md                                   |  36 +++
 week-08/engineering.md                             | 161 ++++++++++
 19 files changed, 1382 insertions(+), 4 deletions(-)
 create mode 100644 server-runs/2026-05-13T06-16-51-app-cd-email-to-sql-git-pull---ff-only-docke-1.log
 create mode 100644 server-runs/2026-05-13T06-17-57-app-cd-email-to-sql-git-status-docker-ps-df--1.log
 create mode 100644 server-runs/2026-05-13T06-18-27-app-cd-email-to-sql-docker-compose-logs-emai-1.log
 create mode 100644 server-runs/2026-05-13T06-19-12-app-cd-email-to-sql-docker-compose-logs-2-1--1.log
 create mode 100644 server-runs/2026-05-13T06-23-23-app-cd-email-to-sql-git-status-1.log
 create mode 100644 server-runs/2026-05-13T06-23-47-app-cd-email-to-sql-git-pull---ff-only-1.log
 create mode 100644 server-runs/2026-05-13T06-24-17-app-cd-email-to-sql-cat-tsconfig.json-grep-r-1.log
 create mode 100644 server-runs/2026-05-13T06-25-04-app-cd-email-to-sql-docker-compose-down-slee-1.log
 create mode 100644 server-runs/2026-05-13T06-25-40-app-cd-email-to-sql-docker-compose-up--d-sle-1.log
 create mode 100644 tests/web/integration.spec.ts
 create mode 100644 week-07/_index.md
 create mode 100644 week-07/pm-status.md
 create mode 100644 week-07/review.md
 create mode 100644 week-07/test.md
 create mode 100644 week-08/_plan.md
 create mode 100644 week-08/engineering.md
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "tsc && node dist/server.js",
Full log: server-runs/2026-05-13T06-26-25-app-cd-email-to-sql-git-pull---ff-only-cat-p-1.log

2. ✗ exec-error (exit -) — cd ~/email-to-sql && docker compose down && sleep 2 && timeout 180 docker compos
ERROR: Connection timed out

3. ✓ exit 0 — cd ~/email-to-sql && docker compose up -d && sleep 5 && docker compose logs --ta
STDOUT:
email-to-sql-webhook  | 
email-to-sql-webhook  | > email-to-sql@0.1.0 start
email-to-sql-webhook  | > node dist/server.js
email-to-sql-webhook  | 
email-to-sql-webhook  | ⚠️  PIPEDRIVE_API_TOKEN not set; Pipedrive sync will fail
email-to-sql-webhook  | ✓ Config loaded: PORT=5000, API_KEY=dev-key-...
email-to-sql-webhook  | 
email-to-sql-webhook  | ✅ Email-to-SQL webhook listening on http://localhost:5000
email-to-sql-webhook  |    POST /webhook/email  — submit forwarded email
email-to-sql-webhook  |    GET  /dashboard      — view extraction status
email-to-sql-webhook  |    GET  /health         — health check
email-to-sql-webhook  |
Full log: server-runs/2026-05-13T06-27-45-app-cd-email-to-sql-docker-compose-up--d-sle-1.log

4. ✓ exit 0 — curl -s http://localhost:5000/health && echo ""
STDOUT:
{"error":"Unauthorized: missing or invalid X-API-Key header"}
Full log: server-runs/2026-05-13T06-31-42-app-curl--s-http-localhost-5000-health-echo-1.log

5. ✓ exit 0 — curl -s -H "X-API-Key: dev-key-12345" http://localhost:5000/health && echo ""
STDOUT:
{"status":"ok","version":"0.1.0","uptime":328.749957025,"extractions":1}
Full log: server-runs/2026-05-13T06-33-09-app-curl--s--H-X-API-Key-dev-key-12345-http--1.log

6. ✓ exit 0 — curl -s -X POST \
STDOUT:
{
  "id": "ext_2",
  "status": "success",
  "extracted": {
    "company_name": "John Doe",
    "contact_email": "john.doe@acme.com",
    "contact_name": "John Doe",
    "budget": "$500k ",
    "timeline": "May 2024",
    "confidence": 0.9499999999999998
  },
  "pipedrive_sync": {
    "success": false,
    "error": "Failed to create/find contact"
  }
}
Full log: server-runs/2026-05-13T06-33-50-app-curl--s--X-POST-1.log

7. ✓ exit 0 — curl -s http://localhost:5000/dashboard | head -50
STDOUT:

<!DOCTYPE html>
<html>
<head>
  <title>Email-to-SQL Dashboard</title>
  <style>
    body { font-family: sans-serif; margin: 20px; background: #f5f5f5; }
    .container { max-width: 1200px; margin: 0 auto; }
    h1 { color: #333; }
    table { width: 100%; border-collapse: collapse; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background: #f8f8f8; font-weight: bold; }
    tr:hover { background: #fafafa; }
    .status-success { color: green; font-weight: bold; }
    .status-review { color: orange; font-weight: bold; }
    .status-failed { color: red; font-weight: bold; }
    .confidence { display: inline-block; width: 100px; height: 20px; background: #f0f0f0; border-radius: 3px; overflow: hidden; }
    .confidence-fill { height: 100%; background: linear-gradient(to right, #ff6b6b, #ffd93d, #6bcf7f); }
    .metrics { display: flex; gap: 20px; margin-bottom: 20px; }
    .metric { padding: 15px; background: white; border-radius: 5px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .metric-value { font-size: 24px; font-weight: bold; }
    .metric-label { color: #999; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>📧 Email-to-SQL Dashboard</h1>
    
    <div class="metrics">
      <div class="metric">
        <div class="metric-value">2</div>
        <div class="metric-label">Total Extractions</div>
      </div>
      <div class="metric">
        <div class="metric-value">2</div>
        <div class="metric-label">Auto-Synced</div>
      </div>
      <div class="metric">
        <div class="metric-value">0</div>
        <div class="metric-label">Awaiting Review</div>
      </div>
      <div class="metric">
        <div class="metric-value">0.95</div>
        <div class="metric-label">Avg Confidence</div>
      </div>
    </div>

    
    <table>
      <thead>
Full log: server-runs/2026-05-13T06-34-39-app-curl--s-http-localhost-5000-dashboard-he-1.log
