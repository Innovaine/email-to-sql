# Week 12 — Code review: Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Yuki (Reviewer)
- **Cycle:** 14
- **Saved:** 13/05/2026, 8:22:06 PM

---

## ✅ Done

Week 12 code review complete. Mehdi made real progress—confidence scoring and company name fixes are working, improving test pass rate from 24/28 to 26/28. Two blockers remain: (1) low-confidence scoring has floating-point precision error (0.6549... vs < 0.65), and (2) test conflict on malformed email handling (webhook.spec expects 400, fixtures.spec expects 200). Both are fixable but require resolution before shipping. Docker build succeeds. Verdict: BLOCKED.

Status: DONE

Week 12 code review complete. Mehdi made real progress—confidence scoring and company name fixes are working, improving test pass rate from 24/28 to 26/28. Two blockers remain: (1) low-confidence scoring has floating-point precision error (0.6549... vs < 0.65), and (2) test conflict on malformed email handling (webhook.spec expects 400, fixtures.spec expects 200). Both are fixable but require resolution before shipping. Docker build succeeds. Verdict: BLOCKED.

## Plan
[x] p1: p1: Pull latest code and inspect diffs from Week 11/12
[x] p2: p2: Verify Docker build succeeds
[x] p3: p3: Run full test suite and capture output
[x] p4: p4: Verify test failure #6 (medium-confidence scoring too high)
[x] p5: p5: Verify test failure #12 (low-confidence scoring too high)
[x] p6: p6: Verify test failure #13 (TechRX company name extraction)
[x] p7: p7: Verify test failure #8 (malformed email should return 400)
[x] p8: p8: Write week-12/review.md with BLOCKED verdict and task creation

## Actions
- list `/` (190 files)
- read `week-12/engineering.md` (12733B)
- list `week-12` (2 files)
- read `week-11/review.md` (1501B)
- read `week-10/review.md` (7020B)
- read `week-12/_plan.md` (2439B)
- queued SSH on app: `cd ~/email-to-sql && git pull --ff-only && git log --oneline -3`
- ran 1 SSH command(s) — 0 failure(s)
- queued SSH on app: `cd ~/email-to-sql && git diff e829ee9^..e829ee9 --stat`
- ran 1 SSH command(s) — 0 failure(s)
- ✓ p1: p1: Pull latest code and inspect diffs from Week 11/12
- queued SSH on app: `cd ~/email-to-sql && docker compose down && docker compose build 2>&1 | tail -20`
- ran 1 SSH command(s) — 0 failure(s)
- ✓ p2: p2: Verify Docker build succeeds
- queued SSH on app: `cd ~/email-to-sql && docker compose up -d && sleep 3 && PLAYWRIGHT_BROWSERS_PATH=/usr/local/share/pl`
- ran 1 SSH command(s) — 1 failure(s)
- ✓ p3: p3: Run full test suite and capture output
- read `tests/web/fixtures.spec.ts` (10552B)
- read `tests/webhook.spec.ts` (5095B)
- read `tests/fixtures.ts` (9220B)
- ✓ p4: p4: Verify test failure #6 (medium-confidence scoring too high)
- ✓ p5: p5: Verify test failure #12 (low-confidence scoring too high)
- ✓ p6: p6: Verify test failure #13 (TechRX company name extraction)
- ✓ p7: p7: Verify test failure #8 (malformed email should return 400)
- **wrote** `week-12/review.md` (3172B)
- ✓ p8: p8: Write week-12/review.md with BLOCKED verdict and task creation

## SSH commands executed
1. ✓ exit 0 — cd ~/email-to-sql && git pull --ff-only && git log --oneline -3
STDOUT:
…                  |  16 +
 week-10/pm-status.md                               |  94 +++
 week-10/review.md                                  | 128 ++++
 week-10/test.md                                    | 218 +++++++
 week-11/_index.md                                  |  16 +
 week-11/_plan.md                                   |  38 ++
 week-11/engineering.md                             |  74 +++
 week-11/pm-status.md                               |  68 +++
 week-11/review.md                                  |  30 +
 week-11/test.md                                    | 262 ++++++++
 week-12/_plan.md                                   |  38 ++
 week-12/engineering.md                             | 196 ++++++
 24 files changed, 2723 insertions(+), 22 deletions(-)
 create mode 100644 server-runs/2026-05-13T16-31-50-app-cd-email-to-sql-git-pull---ff-only-npm-i-1.log
 create mode 100644 server-runs/2026-05-13T16-34-50-app-cd-email-to-sql-docker-ps---filter-name--1.log
 create mode 100644 server-runs/2026-05-13T16-35-08-app-cd-email-to-sql-git-pull---ff-only-docke-1.log
 create mode 100644 server-runs/2026-05-13T16-35-31-app-cd-email-to-sql-PLAYWRIGHT_BROWSERS_PATH-1.log
 create mode 100644 test-results/week-10/report.md
 create mode 100644 test-results/week-10/test-output.txt
 create mode 100644 test-results/week-11/report.md
 create mode 100644 test-results/week-11/test-output.txt
 create mode 100644 week-10/_index.md
 create mode 100644 week-10/pm-status.md
 create mode 100644 week-10/review.md
 create mode 100644 week-10/test.md
 create mode 100644 week-11/_index.md
 create mode 100644 week-11/_plan.md
 create mode 100644 week-11/engineering.md
 create mode 100644 week-11/pm-status.md
 create mode 100644 week-11/review.md
 create mode 100644 week-11/test.md
 create mode 100644 week-12/_plan.md
 create mode 100644 week-12/engineering.md
f36f96c Yuki (reviewer, week 12) — pre-SSH sync
e829ee9 Mehdi (engineer, week 12) — pre-SSH sync
c12d3e7 Week 11 — Email-to-SQL: Automated customer data extraction for SaaS sales teams
Full log: server-runs/2026-05-13T17-20-12-app-cd-email-to-sql-git-pull---ff-only-git-l-1.log

2. ✓ exit 0 — cd ~/email-to-sql && git diff e829ee9^..e829ee9 --stat
STDOUT:
 src/extraction.ts            | 74 +++++++++++++++++++++++++++++++++++---------
 tests/pipedrive-sync.spec.ts |  2 +-
 week-12/_plan.md             | 38 +++++++++++++++++++++++
 3 files changed, 98 insertions(+), 16 deletions(-)
Full log: server-runs/2026-05-13T17-20-27-app-cd-email-to-sql-git-diff-e829ee9-..e829e-1.log

3. ✓ exit 0 — cd ~/email-to-sql && docker compose down && docker compose build 2>&1 | tail -20
STDOUT:
#13 DONE 1.5s

#14 [stage-1 5/5] COPY --from=builder /app/dist ./dist
#14 DONE 0.0s

#15 exporting to image
#15 exporting layers
#15 exporting layers 0.6s done
#15 exporting manifest sha256:a1d9d211d2bf0d82ab96b73bcc9253b8e00f9091c33bf95170189853153cf6a6 done
#15 exporting config sha256:12faa6e7a400046364946b892441d0e5946a730aed3a62bf988377306dd90689 done
#15 exporting attestation manifest sha256:7d9bfdf5103a0c5957f7006b06c93b60559ff3b42775068295360f2664ba7f9c 0.0s done
#15 exporting manifest list sha256:e0e0f363e4acba3a69c5633e744172773fc9c5b7cfd5b323a759b26c132a20d6 done
#15 naming to docker.io/library/email-to-sql-email-to-sql:latest done
#15 unpacking to docker.io/library/email-to-sql-email-to-sql:latest
#15 unpacking to docker.io/library/email-to-sql-email-to-sql:latest 0.3s done
#15 DONE 0.9s

#16 resolving provenance for metadata file
#16 DONE 0.0s
 Image email-to-sql-email-to-sql Built
Full log: server-runs/2026-05-13T17-20-51-app-cd-email-to-sql-docker-compose-down-dock-1.log

4. ✗ fail (exit 1) — cd ~/email-to-sql && docker compose up -d && sleep 3 && PLAYWRIGHT_BROWSERS_PATH
STDOUT:

Running 28 tests using 4 workers

  ✓   2 tests/web/fixtures.spec.ts:14:7 › Email-to-SQL fixture-driven extraction tests › high-confidence forward: extracts all fields with high confidence (36ms)
  ✓   4 tests/web/integration.spec.ts:17:7 › Email-to-SQL webhook integration › health endpoint confirms server is running (31ms)
  ✓   3 tests/webhook.spec.ts:18:5 › webhook accepts forwarded email and extracts structured data (38ms)
  ✓   5 tests/web/fixtures.spec.ts:50:7 › Email-to-SQL fixture-driven extraction tests › medium-confidence forward: extracts core fields, flags for review (13ms)
  ✓   7 tests/webhook.spec.ts:105:5 › webhook rejects request without API key (9ms)
  ✘   8 tests/web/fixtures.spec.ts:79:7 › Email-to-SQL fixture-driven extraction tests › low-confidence forward: queues for review without extraction (23ms)
  ✓   9 tests/webhook.spec.ts:126:5 › webhook handles malformed email with error response (22ms)
  ✓   6 tests/web/integration.spec.ts:37:7 › Email-to-SQL webhook integration › dashboard loads without authentication (123ms)
  ✓  10 tests/web/integration.spec.ts:51:7 › Email-to-SQL webhook integration › webhook accepts forwarded email with high confidence (29ms)
  ✓  11 tests/web/integration.spec.ts:132:7 › Email-to-SQL webhook integration › webhook rejects request without API key (24ms)
  ✓  12 tests/web/integration.spec.ts:150:7 › Email-to-SQL webhook integration › webhook rejects request with invalid API key (4ms)
  ✓  13 tests/web/integration.spec.ts:165:7 › Email-to-SQL webhook integration › webhook processes low-confidence email and queues for review (7ms)
  ✓  14 tests/web/integration.spec.ts:198:7 › Email-to-SQL webhook integration › webhook returns different extraction for nested forwards (12ms)
  ✓  16 tests/web/fixtures.spec.ts:100:7 › Email-to-SQL fixture-driven extraction tests › nested forward: extracts from innermost email correctly (27ms)
  ✓  17 tests/web/fixtures.spec.ts:128:7 › Email-to-SQL fixture-driven extraction tests › email with quoted text: extracts from new content, ignores quotes (15ms)
  ✓  18 tests/web/fixtures.spec.ts:152:7 › Email-to-SQL fixture-driven extraction tests › email with attachment mention: extracts despite references to attachments (24ms)
  ✘  19 tests/web/fixtures.spec.ts:176:7 › Email-to-SQL fixture-driven extraction tests › malformed email: fails gracefully with error (10ms)
  ✓  20 tests/web/fixtures.spec.ts:197:7 › Email-to-SQL fixture-driven extraction tests › long quoted history: extracts from new content at top (10ms)
  ✓  21 tests/web/fixtures.spec.ts:220:7 › Email-to-SQL fixture-driven extraction tests › response includes all required fields (11ms)
  ✓  15 tests/web/integration.spec.ts:251:7 › Email-to-SQL webhook integration › webhook stores extraction and makes it available on dashboard (1.1s)
  ✓  22 tests/web/fixtures.spec.ts:254:7 › Email-to-SQL fixture-driven extraction tests › dashboard shows all submitted extractions (570ms)
  ✓  23 tests/web/integration.spec.ts:293:7 › Email-to-SQL webhook integration › dashboard metrics show total extractions and sync status (110ms)
  ✓  25 tests/web/integration.spec.ts:313:7 › Email-to-SQL webhook integration › webhook response includes Pipedrive sync status (8ms)
⚠️  Pipedrive API token not configured; skipping Pipedrive verification
  ✓   1 tests/pipedrive-sync.spec.ts:21:5 › webhook syncs high-confidence extraction to Pipedrive as contact + opportunity (2.1s)
  ✓  24 tests/web/fixtures.spec.ts:283:7 › Email-to-SQL fixture-driven extraction tests › dashboard displays confidence as visual bar (586ms)
  ✓  26 tests/pipedrive-sync.spec.ts:145:5 › low-confidence extraction goes to review queue instead of syncing (12ms)
  ✓  28 tests/pipedrive-sync.spec.ts:190:5 › dashboard displays recent extractions and sync status (118ms)
  ✓  27 tests/web/fixtures.spec.ts:299:7 › Email-to-SQL fixture-driven extraction tests › dashboard shows metrics correctly (580ms)


  1) tests/web/fixtures.spec.ts:79:7 › Email-to-SQL fixture-driven extraction tests › low-confidence forward: queues for review without extraction 

    Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeLessThan[2m([22m[32mexpected[39m[2m)[22m

    Expected: < [32m0.65[39m
    Received:   [31m0.6549999999999999[39m

      92 |     
      93 |     // Confidence should be low
    > 94 |     expect(extracted.confidence).toBeLessThan(0.65);
         |                                  ^
      95 |     
      96 |     // Status should be 'review' due to low confidence
      97 |     expect(body.status).toBe('review');
        at /home/reviewer/email-to-sql/tests/web/fixtures.spec.ts:94:34

    Error Context: test-results/tests-web-fixtures-Email-t-7ace5-r-review-without-extraction/error-context.md

  2) tests/web/fixtures.spec.ts:176:7 › Email-to-SQL fixture-driven extraction tests › malformed email: fails gracefully with error 

    Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m

    Expected: [32m200[39m
    Received: [31m400[39m

      183 |     });
      184 |
    > 185 |     expect(response.status()).toBe(200);
          |                               ^
      186 |     const body = await response.json();
      187 |
      188 |     // Even malformed should return response structure
        at /home/reviewer/email-to-sql/tests/web/fixtures.spec.ts:185:31

    Error Context: test-results/tests-web-fixtures-Email-t-b6d89-fails-gracefully-with-error/error-context.md

  2 failed
    tests/web/fixtures.spec.ts:79:7 › Email-to-SQL fixture-driven extraction tests › low-confidence forward: queues for review without extraction 
    tests/web/fixtures.spec.ts:176:7 › Email-to-SQL fixture-driven extraction tests › malformed email: fails gracefully with error 
  26 passed (3.4s)
ERROR: command exited 1
Full log: server-runs/2026-05-13T17-21-18-app-cd-email-to-sql-docker-compose-up--d-sle-1.log
