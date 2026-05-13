# Week 12 — Engineering: Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Mehdi (Engineer)
- **Cycle:** 14
- **Saved:** 13/05/2026, 8:19:36 PM

---

## 🚧 Blocked

Fixed 1 of 5 regressions (dashboard selector strict mode). Made progress on confidence scoring and company name extraction but need iteration. The confidence formula needs more aggressive tuning - medium/low fixtures still score too high. The TechRX company name pattern needs debugging against actual fixture content. The malformed email test has conflicting expectations between webhook.spec.ts (expects 400) and fixtures.spec.ts (expects 200 with low confidence) - need product clarification on desired behavior. 24/28 tests passing (86%). Ready for next round to complete remaining fixes.

Status: BLOCKED

Fixed 1 of 5 regressions (dashboard selector strict mode). Made progress on confidence scoring and company name extraction but need iteration. The confidence formula needs more aggressive tuning - medium/low fixtures still score too high. The TechRX company name pattern needs debugging against actual fixture content. The malformed email test has conflicting expectations between webhook.spec.ts (expects 400) and fixtures.spec.ts (expects 200 with low confidence) - need product clarification on desired behavior. 24/28 tests passing (86%). Ready for next round to complete remaining fixes.

## Plan
[x] p1: Comment on high-priority tasks and start work
[x] p2: Fix confidence scoring formula - lower scoring to avoid false high-confidence (tasks #11, #12)
[x] p3: Fix company name extraction for TechRX case - prioritize proper nouns (task #13)
[x] p4: Add malformed email validation - return 400 for missing headers (tasks #8, #9)
[x] p5: Fix dashboard selector strict mode violation (task #10)
[x] p6: Pull latest code, rebuild, and run full test suite
[ ] p7: Review test results and complete tasks

## Actions
- read `week-12/requirements.md` (0B)
- read `README.md` (1657B)
- read `src/extraction.ts` (12346B)
- read `tests/webhook.spec.ts` (5095B)
- read `tests/web/integration.spec.ts` (10115B)
- read `tests/fixtures.ts` (9220B)
- read `test-results/week-11/report.md` (5044B)
- ✓ p1: Comment on high-priority tasks and start work
- **edited** `src/extraction.ts`
- ✓ p2: Fix confidence scoring formula - lower scoring to avoid false high-confidence (tasks #11, #12)
- **edited** `src/extraction.ts`
- ✓ p3: Fix company name extraction for TechRX case - prioritize proper nouns (task #13)
- read `src/server.ts` (8621B)
- **edited** `src/extraction.ts`
- ✓ p4: Add malformed email validation - return 400 for missing headers (tasks #8, #9)
- read `tests/pipedrive-sync.spec.ts` (7516B)
- **edited** `tests/pipedrive-sync.spec.ts`
- ✓ p5: Fix dashboard selector strict mode violation (task #10)
- queued SSH on app: `cd ~/email-to-sql && git pull --ff-only`
- queued SSH on app: `cd ~/email-to-sql && docker compose restart`
- queued SSH on app: `cd ~/email-to-sql && PLAYWRIGHT_BROWSERS_PATH=/usr/local/share/playwright-browsers npx playwright te`
- ✓ p6: Pull latest code, rebuild, and run full test suite
- ran 3 SSH command(s) — 1 failure(s)
- read `tests/web/fixtures.spec.ts` (10552B)

## SSH commands executed
1. ✓ exit 0 — cd ~/email-to-sql && git pull --ff-only
STDOUT:
Updating e9d7842..e829ee9
Fast-forward
 server-log.md                        | 270 +++++++++++++++++++++++++++++++++++
 src/extraction.ts                    |  74 ++++++++--
 test-results/week-11/report.md       | 114 +++++++++++++++
 test-results/week-11/test-output.txt |  98 +++++++++++++
 tests/pipedrive-sync.spec.ts         |   2 +-
 week-11/_index.md                    |  16 +++
 week-11/engineering.md               |  74 ++++++++++
 week-11/pm-status.md                 |  68 +++++++++
 week-11/review.md                    |  30 ++++
 week-11/test.md                      | 262 +++++++++++++++++++++++++++++++++
 week-12/_plan.md                     |  38 +++++
 11 files changed, 1030 insertions(+), 16 deletions(-)
 create mode 100644 test-results/week-11/report.md
 create mode 100644 test-results/week-11/test-output.txt
 create mode 100644 week-11/_index.md
 create mode 100644 week-11/engineering.md
 create mode 100644 week-11/pm-status.md
 create mode 100644 week-11/review.md
 create mode 100644 week-11/test.md
 create mode 100644 week-12/_plan.md
Full log: server-runs/2026-05-13T17-19-06-app-cd-email-to-sql-git-pull---ff-only-1.log

2. ✓ exit 0 — cd ~/email-to-sql && docker compose restart

3. ✗ fail (exit 1) — cd ~/email-to-sql && PLAYWRIGHT_BROWSERS_PATH=/usr/local/share/playwright-browse
STDOUT:

Running 28 tests using 4 workers

  ✓   1 tests/web/integration.spec.ts:17:7 › Email-to-SQL webhook integration › health endpoint confirms server is running (52ms)
  ✓   3 tests/web/fixtures.spec.ts:14:7 › Email-to-SQL fixture-driven extraction tests › high-confidence forward: extracts all fields with high confidence (39ms)
  ✓   4 tests/webhook.spec.ts:18:5 › webhook accepts forwarded email and extracts structured data (43ms)
  ✓   7 tests/webhook.spec.ts:105:5 › webhook rejects request without API key (7ms)
  ✘   6 tests/web/fixtures.spec.ts:50:7 › Email-to-SQL fixture-driven extraction tests › medium-confidence forward: extracts core fields, flags for review (18ms)
  ✘   8 tests/webhook.spec.ts:126:5 › webhook handles malformed email with error response (32ms)
  ✓   5 tests/web/integration.spec.ts:37:7 › Email-to-SQL webhook integration › dashboard loads without authentication (110ms)
  ✓   9 tests/web/integration.spec.ts:51:7 › Email-to-SQL webhook integration › webhook accepts forwarded email with high confidence (19ms)
  ✓  10 tests/web/integration.spec.ts:132:7 › Email-to-SQL webhook integration › webhook rejects request without API key (19ms)
  ✓  11 tests/web/integration.spec.ts:150:7 › Email-to-SQL webhook integration › webhook rejects request with invalid API key (4ms)
  ✓  12 tests/web/integration.spec.ts:165:7 › Email-to-SQL webhook integration › webhook processes low-confidence email and queues for review (6ms)
  ✓  13 tests/web/integration.spec.ts:198:7 › Email-to-SQL webhook integration › webhook returns different extraction for nested forwards (8ms)
  ✘  15 tests/web/fixtures.spec.ts:79:7 › Email-to-SQL fixture-driven extraction tests › low-confidence forward: queues for review without extraction (27ms)
  ✓  16 tests/web/fixtures.spec.ts:100:7 › Email-to-SQL fixture-driven extraction tests › nested forward: extracts from innermost email correctly (29ms)
  ✓  17 tests/web/fixtures.spec.ts:128:7 › Email-to-SQL fixture-driven extraction tests › email with quoted text: extracts from new content, ignores quotes (16ms)
  ✘  18 tests/web/fixtures.spec.ts:152:7 › Email-to-SQL fixture-driven extraction tests › email with attachment mention: extracts despite references to attachments (18ms)
  ✓  14 tests/web/integration.spec.ts:251:7 › Email-to-SQL webhook integration › webhook stores extraction and makes it available on dashboard (1.1s)
  ✓  19 tests/web/integration.spec.ts:293:7 › Email-to-SQL webhook integration › dashboard metrics show total extractions and sync status (102ms)
  ✓  20 tests/web/integration.spec.ts:313:7 › Email-to-SQL webhook integration › webhook response includes Pipedrive sync status (9ms)
  ✓  21 tests/web/fixtures.spec.ts:176:7 › Email-to-SQL fixture-driven extraction tests › malformed email: fails gracefully with error (30ms)
  ✓  22 tests/web/fixtures.spec.ts:197:7 › Email-to-SQL fixture-driven extraction tests › long quoted history: extracts from new content at top (12ms)
  ✓  23 tests/web/fixtures.spec.ts:220:7 › Email-to-SQL fixture-driven extraction tests › response includes all required fields (21ms)
⚠️  Pipedrive API token not configured; skipping Pipedrive verification
  ✓   2 tests/pipedrive-sync.spec.ts:21:5 › webhook syncs high-confidence extraction to Pipedrive as contact + opportunity (2.1s)
  ✓  25 tests/pipedrive-sync.spec.ts:145:5 › low-confidence extraction goes to review queue instead of syncing (10ms)
  ✓  26 tests/pipedrive-sync.spec.ts:190:5 › dashboard displays recent extractions and sync status (131ms)
  ✓  24 tests/web/fixtures.spec.ts:254:7 › Email-to-SQL fixture-driven extraction tests › dashboard shows all submitted extractions (578ms)
  ✓  27 tests/web/fixtures.spec.ts:283:7 › Email-to-SQL fixture-driven extraction tests › dashboard displays confidence as visual bar (573ms)
  ✓  28 tests/web/fixtures.spec.ts:299:7 › Email-to-SQL fixture-driven extraction tests › dashboard shows metrics correctly (570ms)


  1) tests/web/fixtures.spec.ts:50:7 › Email-to-SQL fixture-driven extraction tests › medium-confidence forward: extracts core fields, flags for review 

    Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeLessThan[2m([22m[32mexpected[39m[2m)[22m

    Expected: < [32m0.8[39m
    Received:   [31m0.84[39m

      71 |     // Confidence should be in the medium range
      72 |     expect(extracted.confidence).toBeGreaterThan(exp.minConfidence || 0);
    > 73 |     expect(extracted.confidence).toBeLessThan(0.8);
         |                                  ^
      74 |     
      75 |     // Should be flagged for review due to moderate confidence
      76 |     expect(body.status).toBe('review');
        at /home/engineer/email-to-sql/tests/web/fixtures.spec.ts:73:34

    Error Context: test-results/tests-web-fixtures-Email-t-c4519-ore-fields-flags-for-review/error-context.md

  2) tests/web/fixtures.spec.ts:79:7 › Email-to-SQL fixture-driven extraction tests › low-confidence forward: queues for review without extraction 

    Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeLessThan[2m([22m[32mexpected[39m[2m)[22m

    Expected: < [32m0.65[39m
    Received:   [31m0.8099999999999999[39m

      92 |     
      93 |     // Confidence should be low
    > 94 |     expect(extracted.confidence).toBeLessThan(0.65);
         |                                  ^
      95 |     
      96 |     // Status should be 'review' due to low confidence
      97 |     expect(body.status).toBe('review');
        at /home/engineer/email-to-sql/tests/web/fixtures.spec.ts:94:34

    Error Context: test-results/tests-web-fixtures-Email-t-7ace5-r-review-without-extraction/error-context.md

  3) tests/web/fixtures.spec.ts:152:7 › Email-to-SQL fixture-driven extraction tests › email with attachment mention: extracts despite references to attachments 

    Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoContain[2m([22m[32mexpected[39m[2m) // indexOf[22m

    Expected substring: [32m"TechRX"[39m
    Received string:    [31m"a healthcare tech co"[39m

      165 |
      166 |     // Should extract despite attachment references
    > 167 |     expect(extracted.company_name).toContain('TechRX');
          |                                    ^
      168 |     expect(extracted.contact_email).toBe('procurement@techrx.com');
      169 |     expect(extracted.budget).toBeTruthy();
      170 |     expect(extracted.budget).toContain('100');
        at /home/engineer/email-to-sql/tests/web/fixtures.spec.ts:167:36

    Error Context: test-results/tests-web-fixtures-Email-t-c0ece-e-references-to-attachments/error-context.md

  4) tests/webhook.spec.ts:126:5 › webhook handles malformed email with error response ─────────────

    Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m

    Expected: [32m400[39m
    Received: [31m200[39m

      139 |
      140 |   // Should return 400 Bad Request, not 500 Internal Server Error
    > 141 |   expect(response.status()).toBe(400);
          |                             ^
      142 |
      143 |   const body = await response.json();
      144 |   expect(body).toHaveProperty('error'); // Error message for debugging
        at /home/engineer/email-to-sql/tests/webhook.spec.ts:141:29

    Error Context: test-results/tests-webhook-webhook-hand-08050-d-email-with-error-response/error-context.md

  4 failed
    tests/web/fixtures.spec.ts:50:7 › Email-to-SQL fixture-driven extraction tests › medium-confidence forward: extracts core fields, flags for review 
    tests/web/fixtures.spec.ts:79:7 › Email-to-SQL fixture-driven extraction tests › low-confidence forward: queues for review without extraction 
    tests/web/fixtures.spec.ts:152:7 › Email-to-SQL fixture-driven extraction tests › email with attachment mention: extracts despite references to attachments 
    tests/webhook.spec.ts:126:5 › webhook handles malformed email with error response ──────────────
  24 passed (4.5s)
ERROR: command exited 1
Full log: server-runs/2026-05-13T17-19-14-app-cd-email-to-sql-PLAYWRIGHT_BROWSERS_PATH-3.log
