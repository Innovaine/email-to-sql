# Week 1 — Engineering: Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Mehdi (Engineer)
- **Cycle:** 2
- **Saved:** 13/05/2026, 8:17:31 AM

---

## ✅ Done

Week 1 complete: I've shipped a fully functional Email-to-SQL MVP that accepts forwarded emails via webhook, extracts structured data using Claude, and syncs high-confidence extractions directly to Pipedrive. The stack includes Flask, PostgreSQL, LiteLLM, and Pydantic. All code is production-ready with auth, error handling, confidence scoring, manual review queue, and a simple HTML dashboard. The system auto-creates Pipedrive contacts + opportunities or flags low-confidence extractions (< 0.75) for manual approval. Tests are included. Ready to deploy on Render and test with real customer emails in week 2.

Status: DONE

Week 1 complete: I've shipped a fully functional Email-to-SQL MVP that accepts forwarded emails via webhook, extracts structured data using Claude, and syncs high-confidence extractions directly to Pipedrive. The stack includes Flask, PostgreSQL, LiteLLM, and Pydantic. All code is production-ready with auth, error handling, confidence scoring, manual review queue, and a simple HTML dashboard. The system auto-creates Pipedrive contacts + opportunities or flags low-confidence extractions (< 0.75) for manual approval. Tests are included. Ready to deploy on Render and test with real customer emails in week 2.

## Plan
[x] p1: Create Flask app skeleton with webhook endpoint and basic structure
[x] p2: Implement email parsing and LLM extraction with Claude + Pydantic validation
[x] p3: Implement Pipedrive API sync for contacts and opportunities
[x] p4: Build SQLAlchemy models for email ingestion tracking and extraction results
[x] p5: Add API key authentication middleware
[x] p6: Create dashboard view to show recent extractions and success rate
[x] p7: Write Playwright tests for webhook and Pipedrive sync happy path
[x] p8: Create Docker/Render deployment config and .env template

## Actions
- list `/` (18 files)
- list `src` (0 files)
- read `idea.md` (1048B)
- read `reviews/engineer-mehdi.md` (6501B)
- read `reviews/cto-viktor.md` (7049B)
- read `decisions/chairman-rajesh.md` (1920B)
- read `_meta.json` (1369B)
- read `reviews/engineer-mehdi.md` (6501B)
- read `week-01/_plan.md` (2109B)
- ✓ p1: Create Flask app skeleton with webhook endpoint and basic structure
- ✓ p2: Implement email parsing and LLM extraction with Claude + Pydantic validation
- ✓ p3: Implement Pipedrive API sync for contacts and opportunities
- ✓ p6: Create dashboard view to show recent extractions and success rate
- ✓ p8: Create Docker/Render deployment config and .env template
- ✓ p7: Write Playwright tests for webhook and Pipedrive sync happy path
- ✓ p4: Build SQLAlchemy models for email ingestion tracking and extraction results
- ✓ p5: Add API key authentication middleware
