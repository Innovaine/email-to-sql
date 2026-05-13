# Engineer review: "Email-to-SQL: Automated customer data extraction for SaaS sales teams"

- **By:** Mehdi (Engineer)
- **Cycle:** 1
- **Saved:** 13/05/2026, 8:02:12 AM

---

# How Long It Actually Takes

**Usable v1 (deploy-able, curl-able, one customer on it): 3 weeks.**

**Why not 4:** You don't need all CRMs in week 1. You need *one*—Pipedrive, because it has the cleanest API and the fewest edge cases. HubSpot and Salesforce can wait. That cuts two weeks of integration work.

The real skeleton is:
- Email webhook listener (2–3 days)
- LLM extraction prompt + fallback parsing (3 days)
- Pipedrive sync (3 days)
- Auth + database to track ingested emails (2 days)
- Basic dashboard showing what extracted and what failed (2 days)
- Hardening + deploy (3 days)

That's 18 days at a normal pace. Call it 21 with debugging and one integration surprise.

---

# Where I Hit a Wall

**Week 2, end of day 3:** Email parsing is messier than it looks.

You'll get forwarded chains, images as attachments, quoted replies nested three levels deep, HTML with broken tags, Outlook vs. Gmail formatting differences. A naive regex or even a simple LLM call will hallucinate when the email is a forward of a forward. You can't just feed raw email body to Claude and expect clean structured output.

**Solution I'd ship:** Parse the email with a lightweight library (python-email or similar), extract plain text, clean quoted sections, then send to LLM. Add a manual review queue for low-confidence extractions (confidence < 0.75) so you don't write garbage to CRM. This adds 2 days but saves your reputation in week 3.

**Week 3, end of day 2:** CRM field mapping.

Every CRM has different field names, required fields, and validation rules. Pipedrive deal stages aren't the same as HubSpot deal stages. You can't hardcode this. You need a lightweight config layer—basically a JSON file per CRM that maps extracted fields to native CRM fields. Doable but un-obvious until you hit it.

**Week 4 (if we're stretching):** Volume and LLM cost.

At scale, calling Claude or GPT-4 on every email gets expensive fast. You'll need to batch, cache prompts, or use a cheaper model for high-confidence cases. Not a blocker for v1—one customer won't hit it. But it'll come up in week 5 conversations about margin.

---

# What I'd Cut from the Spec

1. **Multi-CRM support in v1.** Ship Pipedrive only. HubSpot and Salesforce are nice-to-haves that sound impressive in demos but burn a week each. Once one CRM works bulletproof, the second one is a day.

2. **Custom extraction schemas.** The pitch says "extract company, deal size, timeline, pain points." That's the schema. Don't let sales or product talk you into letting customers define custom fields yet. You can't build a config UI and ship in 3 weeks. Hardcode it, prove the core works, add customization in v2.

3. **Approval workflows before CRM write.** The pitch doesn't mention this, but someone will ask for it: "Can we review before it hits the CRM?" No. Not in v1. You have the confidence score; low-confidence extractions go to a review queue and don't auto-sync. That's enough. A full approval workflow adds a week.

4. **Bulk re-processing.** "Can we re-extract old emails?" Not week 1. You're building forward-looking extraction for new emails only. Once it works, bulk processing is a day's work.

5. **Advanced scheduling or filtering.** "Only extract from certain senders" or "pause on Fridays." No. Accept all emails, extract all of them, let the customer turn it off if they want. Feature creep killer.

---

# Existing Tools That Save a Month

1. **LiteLLM** (Python wrapper around Claude, GPT, Bedrock, local models).
   - Why: Unified API. Switch models with one env var. If Claude gets expensive, flip to Llama 2 or GPT-3.5 in an afternoon. Saves you building abstraction layer.
   - Time saved: 2–3 days.

2. **Trigger.dev** (serverless task queue, webhooks, cron).
   - Why: You need async email processing, retries, and logs. Don't write your own queue. Trigger handles webhook → task → result with built-in observability.
   - Alternative: Bull.js (Node) or Celery (Python), but Trigger has better UX for non-infrastructure engineers.
   - Time saved: 3–4 days.

3. **Supabase** (Postgres + auth + real-time API).
   - Why: You need a database fast. Supabase gives you Postgres + auto-generated REST API + RLS. No schema migrations, no connection pooling headaches.
   - Time saved: 2 days.

4. **Pydantic** (Python data validation).
   - Why: Validate extracted fields before writing to CRM. Catches hallucinations, enforces types, auto-generates error messages. Dead simple.
   - Time saved: 1 day.

5. **Resend** or **SendGrid** (transactional email for your own notifications).
   - Why: You'll need to email the customer when extraction fails or confidence is low. Don't build SMTP yourself.
   - Time saved: half a day.

**Do NOT use:**
- Langchain (overkill for simple extraction; adds complexity, slows inference)
- A full BFF or GraphQL layer (just REST or gRPC; keep it simple)
- A complex vector DB (no RAG needed for this problem yet)

---

# What Actually Ships Week 1

Day 1: Webhook listener + LiteLLM extraction skeleton (you can curl it).
Day 2: Pipedrive sync + basic error logging.
Day 3: Auth (API key for now, fine for v1).
Day 4: Simple HTML dashboard showing recent extractions and success rate.
Day 5: Deploy to a real URL, test with real emails, fix the surprises.

By end of week 1, a paying customer could actually plug in their email forward rule and start seeing data in Pipedrive. It will be rough—you'll have 60–70% extraction quality, some fields will be empty, some will be wrong. But it *works*. And by week 3, you'll know which edge cases matter and which don't.

---

# My Real Worry

You're asking a sales team to forward emails to a webhook. That's not a hard integration, but it's also not automatic. Adoption depends on the customer actually remembering to set up a forwarding rule and building the habit of using it. That's a product/motion problem, not a technical one. But I need to know: **by week 3, do we have a customer willing to test this, or are we shipping blind?** If we're shipping blind, the timeline is fine, but the business risk is huge. I'd rather ship slower with one real user than fast with zero.

Given your runway and fresh execution energy, I say **go**. I can ship this. I just need clarity on whether we have a customer lined up before we write the first line of code.
