# CTO review: "Email-to-SQL: Automated customer data extraction for SaaS sales teams"

- **By:** Viktor (CTO)
- **Cycle:** 1
- **Saved:** 13/05/2026, 8:00:42 AM

---

I'm going to push back on the 7-day framing first, then give you what you actually need.

**Seven days is a trap.** You don't have a usable URL in 7 days; you have a proof-of-concept that breaks on day 8 when the first real email arrives. I watched this movie at my last company—we shipped a "webhook" that worked on test data and died on production email formats. We lost three weeks debugging. I'm not doing that again.

**Four weeks is real.** One paying customer by week 4 is survivable. Broken scaffolding by day 7 burns credibility with the team and kills momentum when we hit the first actual production bug.

Here's the ugly version that actually ships:

---

## BUILD COMPLEXITY: 4 weeks to first paying customer

**Week 1: Core pipeline (webhook + dumb extraction + CRM write)**
- Webhook endpoint that catches inbound email (Zapier integration, not native email parsing—their infra, not ours)
- LLM prompt (Claude 3.5 Haiku, $0.001 per email) extracts: company name, deal size, pain points, timeline
- Hardcode CRM to Pipedrive first. HubSpot/Salesforce are week 3+ addons.
- Write extracted JSON directly to Pipedrive contacts via their API
- No auth. No user management. No "organization" concept. Single API key in environment variable.
- Deploy on Render or Railway. One database (Postgres). One cron job that syncs daily.

**Week 2: Validation loop + first customer**
- Ship to 3 founder friends with active sales teams
- Manual onboarding: "Here's your webhook URL, paste this in Zapier, go"
- Measure: emails processed, extraction accuracy (spot-check 10), CRM write success rate
- Iterate on prompt based on real email shape (they're messier than you think—forwarding chains, signatures, legal footers)

**Week 3: Second CRM (HubSpot OR Salesforce—not both)**
- CRM detection: user selects at signup (CLI one-liner or embedded form)
- Hardcode field mappings per CRM. No field-mapping UI. Customer has to accept our schema.
- Authentication: OAuth for the chosen CRM. Still no user auth—API key per workspace.

**Week 4: Billing + repeat**
- Stripe integration (Stripe CLI for testing, live Stripe in prod)
- Simple usage-based: $0.50 per email processed, capped at $299/month
- One Slack message to 10 warm prospects: "We're live, $99/month, first 50 emails free"
- Close first paying customer

---

## TEAM/SKILLS NEEDED (names/levels, not roles)

You need **two people max**:

1. **One mid-level full-stack engineer** (3–5 years, shipping experience)
   - Handles webhook, LLM integration, Zapier/email plumbing, Pipedrive API
   - Must have shipped an API to production before (not academic projects)
   - Must be comfortable with "ship it broken, fix it Friday" culture
   - Does NOT need ML expertise—Claude handles the hard part

2. **You (CTO) part-time on unblock + deployment**
   - 50% of your time: decisions (which CRM first? which LLM? hardcode or config?)
   - 50% of your time: architecture calls (is this AWS Lambda or just a Render app?)
   - Do NOT code the MVP yourself; you'll slow it down. You're the blocker-remover.

You do **not** need:
- A backend specialist (not yet—it's Render + Postgres, not infrastructure theater)
- An ML engineer (Claude is the ML; you're just calling an API)
- A DevOps person (Render handles it)
- A product manager (you talk to customers, iterate on prompt, ship)

---

## BIGGEST TECHNICAL RISK THAT KILLS US IN PRODUCTION

**LLM extraction fails silently on real emails.**

The risk: Claude works great on clean "Hi, we're a 20-person SaaS company, $100k ARR" emails. It fails catastrophically on:
- Forwarded email chains (same content, 10x context noise)
- Corporate email signatures (legal disclaimers, confidentiality notices, images, HTML garbage)
- Non-English emails (language auto-detection needed)
- Deal info buried in middle of thread (not in first line)

If extraction fails, we write null/garbage to the CRM. Sales team doesn't notice until they're in a deal call and realize the company name is wrong. They lose the deal *and* churn us.

**Mitigation (week 1, not optional):**
- Zapier pre-processes: extracts only the last email in thread, strips signatures with regex
- Claude extraction + fallback: if confidence < 0.7, return raw email to user with a "help us fix this" button
- Logging: every email, extraction result, CRM write success/failure—exportable CSV
- Week 2 validation: I spot-check 20 real emails myself, we iterate the prompt

This is the only place I'm not willing to bet on luck.

---

## THREE FEATURES TO CUT NOW

**Cut #1: Field mapping UI**
- You don't need it. Hardcode our schema: Company, Deal Size, Pain Points, Timeline, Next Step
- Sales teams know their CRM schema. They adapt to *our* fields (not the other way around)
- Saves 1 week of frontend + 2 weeks of maintenance
- Add field mapping *after* first 10 paying customers (and only if they ask)

**Cut #2: Multi-user workspace/roles**
- One API key per customer. Full admin access for everyone on the key.
- No SSO. No SAML. No "team seat" pricing.
- You want to invoice one person per customer at week 4. Complexity kills that.
- Add this in month 4 when you have predictable revenue and time

**Cut #3: Email client native integrations (Gmail, Outlook plugins)**
- Zapier is your integration layer. It already handles both.
- Building native plugins = 3 weeks per client, auth nightmares, permission creep
- Zapier webhook is 10x faster to ship, easier to debug, doesn't require a user to install anything
- Revisit if Zapier becomes the bottleneck (it won't—tested at Slack, Intercom, etc.)

---

## STACK (no negotiation)

- **Language:** Python (you said Python? I'm assuming—if not, Node/TS is fine, but stick to one)
- **Framework:** Flask + SQLAlchemy (not FastAPI—we don't need async, complexity is the enemy)
- **LLM:** Claude 3.5 Haiku via Anthropic API (fastest, cheapest, good enough)
- **Email:** Zapier webhook → our endpoint (not Gmail API—we're not a mail client)
- **CRM:** Pipedrive first (simplest API, most founder-led SaaS use it)
- **DB:** Postgres (Render includes it, one deployment)
- **Deploy:** Render or Railway (git push = live, Postgres included, $10–30/month)
- **Billing:** Stripe (test mode week 1, live week 4)

No Docker yet. No microservices. No event queues. No Redis. If it needs Redis to not melt, we've overengineered.

---

## DECISION FOR THIS WEEK

I need you to tell me:

1. **Who is the engineer?** Name, current project, can they start Monday?
2. **CRM priority:** Is Pipedrive first or should we flip? (I'm assuming Pipedrive, but I'm open if you have customer reason)
3. **Claude API already approved for spend,** or do I need to justify $500–1000 LLM cost by week 4?

If you don't have answer 1 by EOD, we're already late. I'm not starting this cycle without a confirmed engineer. Anything else we can figure out as we ship.

When does the engineer sit down?
