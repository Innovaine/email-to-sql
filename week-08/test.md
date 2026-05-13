# Week 8 — Testing (Playwright / Appetize): Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Amil (Tester)
- **Cycle:** 10
- **Saved:** 13/05/2026, 9:44:06 AM

---

## ⏱️ Hit step limit

Hit the 20-step budget for this week. Plan: 4 pending of 6 total.

## Plan
[x] p1: Verify build is live: recon server state + check docker-compose status
[ ] p2: Run existing Playwright integration tests against live server
[x] p3: Create comprehensive fixture-driven test spec using test-fixtures data
[ ] p4: Execute fixture-driven tests and capture results
[ ] p5: Pull screenshots and test output into test-results/week-08/
[ ] p6: Write final test report: verdict + evidence

## Actions
- list `/` (119 files)
- read `README.md` (1657B)
- read `src/server.ts` (8345B)
- read `package.json` (752B)
- read `docker-compose.yml` (646B)
- read `tests/web/integration.spec.ts` (9974B)
- read `tests/fixtures.ts` (9220B)
- read `server-runs/2026-05-13T06-27-45-app-cd-email-to-sql-docker-compose-up--d-sle-1.log` (882B)
- queued SSH on app: `cd ~/email-to-sql && git status && docker ps --filter "name=email-to-sql" --format "table {{.Names}}`
- ran 1 SSH command(s) — 0 failure(s)
- read `src/config.ts` (1321B)
- queued SSH on app: `curl -s -H "X-API-Key: dev-key-12345" http://localhost:5000/health | jq .`
- ran 1 SSH command(s) — 0 failure(s)
- ✓ p1: Verify build is live: recon server state + check docker-compose status
- **edited** `tests/web/integration.spec.ts`
- **wrote** `tests/web/fixtures.spec.ts` (10552B)
- ✓ p3: Create comprehensive fixture-driven test spec using test-fixtures data
- queued SSH on app: `cd ~/email-to-sql && git pull && npm install -D @playwright/test 2>&1 | tail -3`
- ran 1 SSH command(s) — 0 failure(s)
- queued SSH on app: `cd ~/email-to-sql && npx playwright test tests/web/integration.spec.ts tests/web/fixtures.spec.ts --`
- ran 1 SSH command(s) — 1 failure(s)
- queued SSH on app: `cd ~/email-to-sql && npx playwright install --with-deps 2>&1 | tail -5`
- ran 1 SSH command(s) — 0 failure(s)
- queued SSH on app: `ls -la /usr/local/share/playwright-browsers/chromium* 2>&1 | head -5`
- ran 1 SSH command(s) — 0 failure(s)

## SSH commands executed
1. ✓ exit 0 — cd ~/email-to-sql && git status && docker ps --filter "name=email-to-sql" --form
STDOUT:
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
NAMES                  STATUS
email-to-sql-webhook   Up 12 minutes (unhealthy)
{
  "error": "Unauthorized: missing or invalid X-API-Key header"
}
Full log: server-runs/2026-05-13T06-40-13-app-cd-email-to-sql-git-status-docker-ps---f-1.log

2. ✓ exit 0 — curl -s -H "X-API-Key: dev-key-12345" http://localhost:5000/health | jq .
STDOUT:
{
  "status": "ok",
  "version": "0.1.0",
  "uptime": 779.357602503,
  "extractions": 2
}
Full log: server-runs/2026-05-13T06-40-39-app-curl--s--H-X-API-Key-dev-key-12345-http--1.log

3. ✓ exit 0 — cd ~/email-to-sql && git pull && npm install -D @playwright/test 2>&1 | tail -3
STDOUT:
…mail-to-sql-docker-compose-logs-2-1--1.log
 create mode 100644 server-runs/2026-05-13T06-23-23-app-cd-email-to-sql-git-status-1.log
 create mode 100644 server-runs/2026-05-13T06-23-47-app-cd-email-to-sql-git-pull---ff-only-1.log
 create mode 100644 server-runs/2026-05-13T06-24-17-app-cd-email-to-sql-cat-tsconfig.json-grep-r-1.log
 create mode 100644 server-runs/2026-05-13T06-25-04-app-cd-email-to-sql-docker-compose-down-slee-1.log
 create mode 100644 server-runs/2026-05-13T06-25-40-app-cd-email-to-sql-docker-compose-up--d-sle-1.log
 create mode 100644 server-runs/2026-05-13T06-26-25-app-cd-email-to-sql-git-pull---ff-only-cat-p-1.log
 create mode 100644 server-runs/2026-05-13T06-27-45-app-cd-email-to-sql-docker-compose-up--d-sle-1.log
 create mode 100644 server-runs/2026-05-13T06-31-42-app-curl--s-http-localhost-5000-health-echo-1.log
 create mode 100644 server-runs/2026-05-13T06-33-09-app-curl--s--H-X-API-Key-dev-key-12345-http--1.log
 create mode 100644 server-runs/2026-05-13T06-33-50-app-curl--s--X-POST-1.log
 create mode 100644 server-runs/2026-05-13T06-34-39-app-curl--s-http-localhost-5000-dashboard-he-1.log
 create mode 100644 server-runs/2026-05-13T06-40-13-app-cd-email-to-sql-git-status-docker-ps---f-1.log
 create mode 100644 server-runs/2026-05-13T06-40-39-app-curl--s--H-X-API-Key-dev-key-12345-http--1.log
 create mode 100644 tests/web/fixtures.spec.ts
 create mode 100644 tests/web/integration.spec.ts
 create mode 100644 week-06/files/week-06-status.md
 create mode 100644 week-06/pm-status.md
 create mode 100644 week-06/risks.md
 create mode 100644 week-07/_index.md
 create mode 100644 week-07/_plan.md
 create mode 100644 week-07/engineering.md
 create mode 100644 week-07/pm-status.md
 create mode 100644 week-07/review.md
 create mode 100644 week-07/test.md
 create mode 100644 week-08/_plan.md
 create mode 100644 week-08/engineering.md
 create mode 100644 week-08/review.md
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.14.1
npm notice To update run: npm install -g npm@11.14.1
npm notice
Full log: server-runs/2026-05-13T06-41-41-app-cd-email-to-sql-git-pull-npm-install--D--1.log

4. ✗ fail (exit 1) — cd ~/email-to-sql && npx playwright test tests/web/integration.spec.ts tests/web
STDOUT:

Running 22 tests using 2 workers

  ✓   1 tests/web/integration.spec.ts:17:7 › Email-to-SQL webhook integration › health endpoint confirms server is running (36ms)
  ✘   2 tests/web/fixtures.spec.ts:14:7 › Email-to-SQL fixture-driven extraction tests › high-confidence forward: extracts all fields with high confidence (31ms)
  ✘   3 tests/web/integration.spec.ts:37:7 › Email-to-SQL webhook integration › dashboard loads without authentication (1ms)
  ✘   4 tests/web/fixtures.spec.ts:50:7 › Email-to-SQL fixture-driven extraction tests › medium-confidence forward: extracts core fields, flags for review (28ms)
  ✘   5 tests/web/integration.spec.ts:51:7 › Email-to-SQL webhook integration › webhook accepts forwarded email with high confidence (28ms)
  ✓   6 tests/web/fixtures.spec.ts:79:7 › Email-to-SQL fixture-driven extraction tests › low-confidence forward: queues for review without extraction (28ms)
  ✓   7 tests/web/integration.spec.ts:132:7 › Email-to-SQL webhook integration › webhook rejects request without API key (29ms)
  ✓   9 tests/web/integration.spec.ts:150:7 › Email-to-SQL webhook integration › webhook rejects request with invalid API key (7ms)
  ✘   8 tests/web/fixtures.spec.ts:100:7 › Email-to-SQL fixture-driven extraction tests › nested forward: extracts from innermost email correctly (14ms)
  ✓  10 tests/web/integration.spec.ts:165:7 › Email-to-SQL webhook integration › webhook processes low-confidence email and queues for review (15ms)
  ✘  11 tests/web/integration.spec.ts:198:7 › Email-to-SQL webhook integration › webhook returns different extraction for nested forwards (9ms)
  ✓  12 tests/web/fixtures.spec.ts:128:7 › Email-to-SQL fixture-driven extraction tests › email with quoted text: extracts from new content, ignores quotes (28ms)
  ✓  14 tests/web/fixtures.spec.ts:152:7 › Email-to-SQL fixture-driven extraction tests › email with attachment mention: extracts despite references to attachments (11ms)
  ✘  13 tests/web/integration.spec.ts:251:7 › Email-to-SQL webhook integration › webhook stores extraction and makes it available on dashboard (7ms)
  ✓  15 tests/web/fixtures.spec.ts:176:7 › Email-to-SQL fixture-driven extraction tests › malformed email: fails gracefully with error (17ms)
  ✓  16 tests/web/fixtures.spec.ts:197:7 › Email-to-SQL fixture-driven extraction tests › long quoted history: extracts from new content at top (12ms)
  ✓  17 tests/web/fixtures.spec.ts:220:7 › Email-to-SQL fixture-driven extraction tests › response includes all required fields (10ms)
  ✘  18 tests/web/fixtures.spec.ts:254:7 › Email-to-SQL fixture-driven extraction tests › dashboard shows all submitted extractions (0ms)
  ✘  19 tests/web/integration.spec.ts:293:7 › Email-to-SQL webhook integration › dashboard metrics show total extractions and sync status (2ms)
  ✘  20 tests/web/fixtures.spec.ts:283:7 › Email-to-SQL fixture-driven extraction tests › dashboard displays confidence as visual bar (2ms)
  ✓  21 tests/web/integration.spec.ts:313:7 › Email-to-SQL webhook integration › webhook response includes Pipedrive sync status (29ms)
  ✘  22 tests/web/fixtures.spec.ts:299:7 › Email-to-SQL fixture-driven extraction tests › dashboard shows metrics correctly (2ms)


  1) tests/web/fixtures.spec.ts:14:7 › Email-to-SQL fixture-driven extraction tests › high-confidence forward: extracts all fields with high confidence 

    Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoContain[2m([22m[32mexpected[39m[2m) // indexOf[22m

    Expected substring: [32m"Acme"[39m
    Received string:    [31m"Budget for new"[39m

      35 |     // Validate extracted fields
      36 |     expect(extracted.company_name).toBeTruthy();
    > 37 |     expect(extracted.company_name).toContain('Acme');
         |                                    ^
      38 |     
      39 |     expect(extracted.contact_email).toBe('sarah@acmecorp.com');
      40 |     expect(extracted.budget).toBeTruthy();
        at /home/tester/email-to-sql/tests/web/fixtures.spec.ts:37:36

    Error Context: test-results/tests-web-fixtures-Email-t-f2806-fields-with-high-confidence/error-context.md

  2) tests/web/fixtures.spec.ts:50:7 › Email-to-SQL fixture-driven extraction tests › medium-confidence forward: extracts core fields, flags for review 

    Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoContain[2m([22m[32mexpected[39m[2m) // indexOf[22m

    Expected substring: [32m"TechStartup"[39m
    Received string:    [31m"CRM"[39m

      65 |     // Should extract company and email
      66 |     expect(extracted.company_name).toBeTruthy();
    > 67 |     expect(extracted.company_name).toContain('TechStartup');
         |                                    ^
      68 |     
      69 |     expect(extracted.contact_email).toBe('bob@techstartup.io');
      70 |     
        at /home/tester/email-to-sql/tests/web/fixtures.spec.ts:67:36

    Error Context: test-results/tests-web-fixtures-Email-t-c4519-ore-fields-flags-for-review/error-context.md

  3) tests/web/fixtures.spec.ts:100:7 › Email-to-SQL fixture-driven extraction tests › nested forward: extracts from innermost email correctly 

    Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m

    Expected: [32m"[7mdirector@bigcorp[27m.com"[39m
    Received: [31m"[7msales-team-lead@oursaas[27m.com"[39m

      115 |     // Should extract from innermost (original customer) email
      116 |     expect(extracted.company_name).toContain('BigCorp');
    > 117 |     expect(extracted.contact_email).toBe('director@bigcorp.com');
          |                                     ^
      118 |     
      119 |     // Should find budget mentioned in original
      120 |     expect(extracted.budget).toBeTruthy();
        at /home/tester/email-to-sql/tests/web/fixtures.spec.ts:117:37

    Error Context: test-results/tests-web-fixtures-Email-t-fba65-m-innermost-email-correctly/error-context.md

  4) tests/web/fixtures.spec.ts:254:7 › Email-to-SQL fixture-driven extraction tests › dashboard shows all submitted extractions 

    Error: browserType.launch: Executable doesn't exist at /home/tester/.cache/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-linux64/chrome-headless-shell
    ╔════════════════════════════════════════════════════════════╗
    ║ Looks like Playwright was just installed or updated.       ║
    ║ Please run the following command to download new browsers: ║
    ║                                                            ║
    ║     npx playwright install                                 ║
    ║                                                            ║
    ║ <3 Playwright Team                                         ║
    ╚════════════════════════════════════════════════════════════╝

    Error Context: test-results/tests-web-fixtures-Email-t-8b4d0-s-all-submitted-extractions/error-context.md

  5) tests/web/fixtures.spec.ts:283:7 › Email-to-SQL fixture-driven extraction tests › dashboard displays confidence as visual bar 

    Error: browserType.launch: Executable doesn't exist at /home/tester/.cache/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-linux64/chrome-headless-shell
    ╔════════════════════════════════════════════════════════════╗
    ║ Looks like Playwright was just installed or updated.       ║
    ║ Please run the following command to download new browsers: ║
    ║                                                            ║
    ║     npx playwright install                                 ║
    ║                                                            ║
    ║ <3 Playwright Team                                         ║
    ╚════════════════════════════════════════════════════════════╝

    Error Context: test-results/tests-web-fixtures-Email-t-fbbe8-ys-confidence-as-visual-bar/error-context.md

  6) tests/web/fixtures.spec.ts:299:7 › Email-to-SQL fixture-driven extraction tests › dashboard shows metrics correctly 

    Error: browserType.launch: Executable doesn't exist at /home/tester/.cache/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-linux64/chrome-headless-shell
    ╔════════════════════════════════════════════════════════════╗
    ║ Looks like Playwright was just installed or updated.       ║
    ║ Please run the following command to download new browsers: ║
    ║                                                            ║
    ║     npx playwright install                                 ║
    ║                                                            ║
    ║ <3 Playwright Team                                         ║
    ╚════════════════════════════════════════════════════════════╝

    Error Context: test-results/tests-web-fixtures-Email-t-5d2bd-ard-shows-metrics-correctly/error-context.md

  7) tests/web/integration.spec.ts:37:7 › Email-to-SQL webhook integration › dashboard loads without authentication 

    Error: browserType.launch: Executable doesn't exist at /home/tester/.cache/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-linux64/chrome-headless-shell
    ╔════════════════════════════════════════════════════════════╗
    ║ Looks like Playwright was just installed or updated.       ║
    ║ Please run the following command to download new browsers: ║
    ║                                                            ║
    ║     npx playwright install                                 ║
    ║                                                            ║
    ║ <3 Playwright Team                                         ║
    ╚════════════════════════════════════════════════════════════╝

    Error Context: test-results/tests-web-integration-Emai-a0f9e-oads-without-authentication/error-context.md

  8) tests/web/integration.spec.ts:51:7 › Email-to-SQL webhook integration › webhook accepts forwarded email with high confidence 

    Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoContain[2m([22m[32mexpected[39m[2m) // indexOf[22m

    Expected substring: [32m"acme"[39m
    Received string:    [31m"budget for new"[39m

      112 |     // Verify extracted values match the email content
      113 |     expect(extracted.company_name).toBeTruthy();
    > 114 |     expect(extracted.company_name.toLowerCase()).toContain('acme');
          |                                                  ^
      115 |     
      116 |     expect(extracted.contact_email).toBe('sarah@acmecorp.com');
      117 |     expect(extracted.budget).toBeTruthy();
        at /home/tester/email-to-sql/tests/web/integration.spec.ts:114:50

    Error Context: test-results/tests-web-integration-Emai-01e4e--email-with-high-confidence/error-context.md

  9) tests/web/integration.spec.ts:198:7 › Email-to-SQL webhook integration › webhook returns different extraction for nested forwards 

    Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoContain[2m([22m[32mexpected[39m[2m) // indexOf[22m

    Expected substring: [32m"bigcorp"[39m
    Received string:    [31m"bob@sales.com"[39m

      245 |
      246 |     // Should extract from the innermost email
    > 247 |     expect(body.extracted.contact_email).toContain('bigcorp');
          |                                          ^
      248 |     expect(body.extracted).toHaveProperty('confidence');
      249 |   });
      250 |
        at /home/tester/email-to-sql/tests/web/integration.spec.ts:247:42

    Error Context: test-results/tests-web-integration-Emai-69a66-raction-for-nested-forwards/error-context.md

  10) tests/web/integration.spec.ts:251:7 › Email-to-SQL webhook integration › webhook stores extraction and makes it available on dashboard 

    Error: browserType.launch: Executable doesn't exist at /home/tester/.cache/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-linux64/chrome-headless-shell
    ╔════════════════════════════════════════════════════════════╗
    ║ Looks like Playwright was just installed or updated.       ║
    ║ Please run the following command to download new browsers: ║
    ║                                                            ║
    ║     npx playwright install                                 ║
    ║                                                            ║
    ║ <3 Playwright Team                                         ║
    ╚════════════════════════════════════════════════════════════╝

    Error Context: test-results/tests-web-integration-Emai-ced13-s-it-available-on-dashboard/error-context.md

  11) tests/web/integration.spec.ts:293:7 › Email-to-SQL webhook integration › dashboard metrics show total extractions and sync status 

    Error: browserType.launch: Executable doesn't exist at /home/tester/.cache/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-linux64/chrome-headless-shell
    ╔════════════════════════════════════════════════════════════╗
    ║ Looks like Playwright was just installed or updated.       ║
    ║ Please run the following command to download new browsers: ║
    ║                                                            ║
    ║     npx playwright install                                 ║
    ║                                                            ║
    ║ <3 Playwright Team                                         ║
    ╚════════════════════════════════════════════════════════════╝

    Error Context: test-results/tests-web-integration-Emai-7a81f-extractions-and-sync-status/error-context.md

  11 failed
    tests/web/fixtures.spec.ts:14:7 › Email-to-SQL fixture-driven extraction tests › high-confidence forward: extracts all fields with high confidence 
    tests/web/fixtures.spec.ts:50:7 › Email-to-SQL fixture-driven extraction tests › medium-confidence forward: extracts core fields, flags for review 
    tests/web/fixtures.spec.ts:100:7 › Email-to-SQL fixture-driven extraction tests › nested forward: extracts from innermost email correctly 
    tests/web/fixtures.spec.ts:254:7 › Email-to-SQL fixture-driven extraction tests › dashboard shows all submitted extractions 
    tests/web/fixtures.spec.ts:283:7 › Email-to-SQL fixture-driven extraction tests › dashboard displays confidence as visual bar 
    tests/web/fixtures.spec.ts:299:7 › Email-to-SQL fixture-driven extraction tests › dashboard shows metrics correctly 
    tests/web/integration.spec.ts:37:7 › Email-to-SQL webhook integration › dashboard loads without authentication 
    tests/web/integration.spec.ts:51:7 › Email-to-SQL webhook integration › webhook accepts forwarded email with high confidence 
    tests/web/integration.spec.ts:198:7 › Email-to-SQL webhook integration › webhook returns different extraction for nested forwards 
    tests/web/integration.spec.ts:251:7 › Email-to-SQL webhook integration › webhook stores extraction and makes it available on dashboard 
    tests/web/integration.spec.ts:293:7 › Email-to-SQL webhook integration › dashboard metrics show total extractions and sync status 
  11 passed (3.5s)
ERROR: command exited 1
Full log: server-runs/2026-05-13T06-42-45-app-cd-email-to-sql-npx-playwright-test-test-1.log

5. ✓ exit 0 — cd ~/email-to-sql && npx playwright install --with-deps 2>&1 | tail -5
STDOUT:
Switching to root user to install dependencies...
sudo: a terminal is required to read the password; either use the -S option to read from standard input or configure an askpass helper
sudo: a password is required
Failed to install browsers
Error: Installation process exited with code: 1
Full log: server-runs/2026-05-13T06-43-14-app-cd-email-to-sql-npx-playwright-install---1.log

6. ✓ exit 0 — ls -la /usr/local/share/playwright-browsers/chromium* 2>&1 | head -5
STDOUT:
/usr/local/share/playwright-browsers/chromium-1223:
total 12
drwxr-xr-x 3 root root 4096 May 13 04:31 .
drwxr-xr-x 6 root root 4096 May 13 05:11 ..
-rw-r--r-- 1 root root    0 May 13 04:31 DEPENDENCIES_VALIDATED
Full log: server-runs/2026-05-13T06-44-06-app-ls--la-usr-local-share-playwright-browse-1.log
