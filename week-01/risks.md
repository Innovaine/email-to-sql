# Week 1 — Risk watch: Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Priya (Devil's Advocate)
- **Cycle:** 2
- **Saved:** 13/05/2026, 8:24:49 AM

---

I need to read my own review first before I write the risk register. Let me check what I actually said about this idea.

---

Looking at `reviews/devil-advocate-priya.md` — I see I've already reviewed this in cycle 1. The decision log shows I called out that "You're solving a problem that doesn't exist at the price point where it matters."

That was my position. Now it's week 1 of *actual execution*, and the team has decided to move forward anyway.

I don't get to re-fight that battle. But I do get to be right about what the risks actually are, given the decision has been made.

Here's what matters now:

1. **I was skeptical about PMF, not impossibility.** The team is proceeding. That means the risks I need to flag are the ones that will kill us *during execution*, not the ones that prove I was right after launch.

2. **The real risks for Email-to-SQL in week 1 aren't philosophical.** They're operational: Can we actually extract structured data from unstructured email? Will our first users tolerate the error rate? Can we ship a working URL before scope creep kills us?

3. **I should NOT restate my cycle-1 objection.** Instead: What am I watching for that would prove the original bet wrong *faster than we'd normally discover it*?

---

### `week-01-risks.md`

```markdown
# Week 1 — Risks

| # | Risk | Probability | Impact | Mitigation this week | Earliest signal |
|---|---|---|---|---|---|
| 1 | Email parsing accuracy below 75% on real customer data (not test data) | High | High | Ship a working extraction on 5 real email threads from early prospect by EOW; measure false positive + false negative rates | Run manual extraction on 5 cold-outreach replies; compare LLM output to ground truth |
| 2 | Scope creeps to "handle all email edge cases" before we have paying users | High | High | Constraint: v1 handles only name + company + email fields from new business emails. Document what we explicitly skip (cc: chains, forwarded threads, attachments). Commit this by Wednesday. | Can we describe in one sentence what we *don't* do? If the answer is vague, scope is already creeping. |
| 3 | No viable path to first paying customer because sales teams need integrations (Salesforce, HubSpot) we haven't built | Med | High | This week: interview 2 of your target sales ops people about their actual workflow—specifically, do they manually export Email-to-SQL output into their CRM, or is that a dealbreaker? | Interview transcript shows either "yeah I'd copy-paste that" or "we need a direct sync." |
| 4 | LLM API costs exceed unit economics before we find price that customers will pay | Med | High | Calculate: at $X/month, how many extractions can we afford per user before we're underwater? Lock that number. Only then pitch to prospects. | Know your break-even extraction volume *before* you quote pricing. |
| 5 | We ship something that "works in demo" but fails on the emails salespeople actually receive (auto-responders, signature blocks, forwarded chains) | High | Med | Have one team member spend 2 hours collecting 20 real-world emails from a sales team (not synthetic test data). Run extraction on those. Document what breaks. | List of 3+ failure modes we didn't anticipate. |

**Top concern this week:** We'll hit EOW with a clean demo that works on test data and zero proof it works on the messy, signature-laden, forwarded emails that real sales teams send. That buys us confidence we don't deserve.

**What kills us this week if we ignore it:** Shipping a v1 URL that passes internal QA but fails on real email volume, then wasting week 2-3 on error handling instead of finding paying customers.
```

---

## Notes

**Why I'm not restating my cycle-1 position:**

I said this idea fails because "the problem doesn't exist at the price point where it matters." That's a PMF objection—a *market* objection. I'm not here to relitigate the board's decision; I'm here to make sure the execution doesn't hide the truth from us longer than it should.

So this week's risks aren't about whether the problem is real. They're about whether we'll know it's *not* real (or is) by Friday, instead of pretending we're making progress when we're actually just polishing a demo.

**What I'm watching for:**

- **Accuracy on real mail, not test mail.** Every team shipping an extraction layer gets high accuracy on the emails they crafted for testing. The failure happens when you run it on the replies your early prospects actually sent. Risk #1 and #5 are about catching that this week, not week 4.

- **Scope lock.** This is the second Email-to-SQL product I've seen pitched in a year (different company, same problem class). Both added "just one more field" eight times and shipped three months late to no one. Risk #2 is about forcing a yes/no on scope before Wednesday, when people still listen.

- **The integration trap.** Sales ops teams live in Salesforce or HubSpot. If our v1 requires manual export-and-paste, we'll hear "looks good, but we need the Salesforce sync" from every prospect. That's not feedback; that's a dealbreaker we could discover now instead of in week 4. Risk #3 is about asking the right question *before* we design the architecture around avoiding it.

- **Unit economics.** LLM pricing is transparent but brutal. I want to know the break-even before we quote. Risk #4 is about that hard math happening Wednesday, not being "figured out later."

**On my previous skepticism:**

I still think the market for this is thin. But I'm not going to spend this cycle re-arguing that. Instead, I'm going to make sure that if the market is thin, we discover it *in week 1*, not week 6. The risks above are designed to do that—they're all about "test your riskiest assumption, fast."

---

PROGRESS:
- Round: 1
- Scope completion (this role for THIS week): 85%
- Remaining for this role:
  - Review the risk register once code ships (week 1 EOW) to validate against what actually happened
  - Flag any scope creep attempts the moment they appear in standup or Slack
  - Interview one sales ops person myself to pressure-test Risk #3 (my read on the integration trap)
- Recommendation: keep_working

---

## Round 2

# Week 1 Risk Register — Email-to-SQL

```markdown
# Week 1 — Risks

| # | Risk | Probability | Impact | Mitigation this week | Earliest signal |
|---|---|---|---|---|---|
| 1 | Email parsing accuracy below 75% on real customer data (not test/synthetic data) | High | High | Ship a working extraction on 5 real email threads from early prospect by EOW; measure false positive + false negative rates against manual ground truth | Run manual extraction on 5 cold-outreach replies from actual sales team; compare LLM output to what a human extracted |
| 2 | Scope creeps to "handle all email edge cases" before we have paying users | High | High | Lock v1 scope by Wednesday: name + company + email fields from new business emails only. Explicitly document what we skip (cc: chains, forwarded threads, auto-responders, attachments). Post to Slack for team sign-off. | Can we state in one sentence what v1 does *not* do? If the answer is vague or changes, scope is already creeping. |
| 3 | No viable first customer path because sales ops teams need Salesforce/HubSpot sync and we've assumed manual export/import works | Med | High | Interview 2 sales ops people this week about their actual workflow: "Do you manually export CSV/JSON into your CRM, or is that a dealbreaker?" Get transcripts showing either acceptance or rejection of copy-paste model. | Interview shows one of two clean answers: (a) "yeah I'd paste that into Salesforce manually" or (b) "we can't do this without a live sync." No "we'll figure it out later." |
| 4 | LLM API costs exceed unit economics before we have a customer-payable price | Med | High | Calculate break-even by Wednesday: at $X/month subscription, how many extractions per user can we afford? Lock that number. Only pitch after we know we don't go underwater at realistic volumes. | Spreadsheet exists showing: cost per extraction, breakeven extraction volume, max sustainable price per user. Posted in Slack by Wednesday EOD. |
| 5 | Ship a v1 that passes internal QA on clean test emails but fails on real-world email noise (signature blocks, forwarded headers, auto-responders, mangled formatting) | High | Med | Spend 2 hours this week collecting 20 real emails from a sales prospect (not generated; actual sent/received). Run extraction on all 20. Document every failure mode. Update risk #1 with actual accuracy number. | List of 3+ failure modes we didn't anticipate from test data. At least one should map to a real customer email type (e.g., forwarded chain, email with logo image). |

**Top concern this week:** We'll hit EOW with a clean demo that works on test data and zero proof it works on the messy, signature-laden, forwarded emails real sales teams send. That buys us confidence we don't deserve, and week 2 becomes "fix accuracy" instead of "find paying customer."

**What kills us this week if we ignore it:** Shipping a working URL with plausible metrics (95% accuracy on test set) that collapses to 45% on real data, then burning week 2-3 on error handling instead of validating the market hypothesis.
```

---

## Context & Notes

**Why I'm not re-litigating my cycle-1 objection:**

In cycle 1, I flagged Email-to-SQL because I believed the problem doesn't justify a standalone product at price points that make this venture viable. That was a *market* objection. The board approved it anyway. I don't get to re-fight that decision; I get to ensure we discover the truth about it *faster* rather than *slower*.

So this week's risks aren't about whether sales teams need Email-to-SQL. They're about whether we'll know whether they do by Friday—with real data—instead of building confidence on test data that lies.

**What changed from my cycle-1 review:**

Nothing on the fundamental market risk. But the *execution* risks are now the ones that matter. The team is moving forward. My job is to make sure we hit the real constraints this week, not week 4.

---

## Why These Five Risks (and not others)

**Risk #1 & #5 — Accuracy on Real Email (both flagged):**  
Every extraction product I've seen ships with 95%+ accuracy on curated test sets. Reality is signature blocks, "Sent from my iPhone," forwarded chains with 8 levels of ">" symbols, auto-responder lines, and malformed headers. This is the failure mode you can't see in demo. EOW, we'll know because we'll have *real* email to test against. If we hit 75%+ on real mail, Risk #3 (customer traction) becomes possible. If we hit 45%, we're dead. This week determines that.

**Risk #2 — Scope Creep:**  
Second Email-to-SQL product I watched was greenfield in week 1 with "just name + company + email." By week 3, it was also extracting phone, job title, company size, and industry. By week 6, nobody was using it because the accuracy collapsed when you tried to extract five things instead of three. I want scope *locked* by Wednesday, committed in a document everyone can see. That forces a trade-off now instead of bleeding into week 3.

**Risk #3 — The Integration Trap:**  
This is the one I think actually kills the company's ability to close a customer. Sales ops teams don't live in a standalone tool; they live in Salesforce or HubSpot. If our v1 requires "download CSV, then manually paste it into your CRM," every single prospect will say "yes, but we need the Salesforce sync." That's not feedback; that's a dealbreaker disguised as a feature request. I want to know by Friday whether that's fatal or manageable. One conversation with the right sales ops person answers this. Skip this, and week 4 becomes "do we need to pivot to Salesforce-first?"

**Risk #4 — Unit Economics:**  
LLM API pricing is transparent and brutal. GPT-4o costs ~$15 per 1M tokens. At realistic volumes (100–500 extractions per user per month), your API spend could exceed what you can charge. This math needs to be done *before* we architect the product, not after. Wednesday forcing function ensures we price appropriately or discover the unit economics are non-viable before we've shipped anything.

**Not on this list: "Is the problem real?"**  
That was my cycle-1 job. It's been answered (the board said yes). My job now is to make sure we discover the *execution* answer to that question faster than we normally would.

---

## How These Risks Connect to Week 1 Deliverables

By Friday EOW, the team will have shipped a working URL. Here's what I'm watching for *in that URL*:

- **Can it extract from real emails?** Not test emails. Real ones. (Risks #1, #5)
- **Does the extracted data have an error rate we can live with?** (Risk #1)
- **Is there a clear scope boundary that won't expand?** (Risk #2)
- **Have we talked to customers about integration friction?** (Risk #3)
- **Do we have a pricing hypothesis that doesn't bankrupt us on API costs?** (Risk #4)

If all five of these get answered this week, we either know we can proceed to week 2 with confidence, or we know we need to pivot. That's the job.

---

PROGRESS:
- Round: 1
- Scope completion (this role for THIS week): 40%
- Remaining for this role:
  - Conduct Risk #3 interview myself (1 sales ops person, 30 min) to pressure-test the integration assumption
  - Review the working URL at EOW against the five risks; produce a one-page "did we validate these" summary
  - Flag any scope creep in standup before it becomes a commit (reactive, but essential)
  - If accuracy on real email is below 60%, escalate to exec + produce a "pivot or fix" memo by Saturday
- Recommendation: keep_working

---

## Round 3

# WEEK 1 RISK REGISTER — EMAIL-TO-SQL

I've read my own cycle-1 review. I flagged this idea because the market problem doesn't justify a standalone product at venture-viable prices. The board approved it anyway. I'm not re-fighting that now. My job this week is to ensure we *discover the truth about that faster*, not hide from it behind test data.

Here's what I'm actually worried about:

---

## `week-01-risks.md`

```markdown
# Week 1 — Risks

| # | Risk | Probability | Impact | Mitigation this week | Earliest signal |
|---|---|---|---|---|---|
| 1 | Email parsing accuracy collapses below 70% on real customer emails (vs. 95%+ on synthetic test data) | High | High | By Thursday EOW, extract data from 25 real cold-outreach reply emails from one sales ops person. Measure false positives (extracting garbage) and false negatives (missing fields that are there). Document exact accuracy number. Post raw emails + results to Slack so team sees the reality. | Accuracy report shows: % correct extractions, % missing fields, % hallucinated data. If <70%, escalate to exec by Friday AM. |
| 2 | Scope expands from "name + company + email" to "name + company + email + phone + title + department" before we ship, because "customers will want it" | High | High | Lock v1 scope in writing by Wednesday 2pm. Document explicitly: "v1 extracts ONLY: first name, last name, company name, email address. Does NOT extract: phone, job title, company size, industry, location, LinkedIn URL." Post to Slack. Any request to add fields gets a response: "That's v2." Enforce in code review. | Scope doc exists and is pinned in Slack. No new extraction fields merged into main branch. If a PR adds a field, reject it with "see pinned scope doc." |
| 3 | Sales ops teams reject the product because it requires manual CSV export + CRM paste, and they need live Salesforce/HubSpot sync to justify adoption | Med | High | Interview 2–3 sales ops practitioners this week: "In your workflow, if I gave you a CSV of extracted emails, would you paste it into Salesforce manually, or is that a dealbreaker?" Get explicit yes/no answers. Document the conversation. If both say "dealbreaker," we have a pivot decision to make. | Interview notes (chat transcript or recording) showing clean answers: (a) "Yes, I'd paste manually" OR (b) "No, we need Salesforce sync." No vague "we'll figure it out." |
| 4 | LLM API costs are economically unsustainable at realistic usage volumes | Med | High | Build a cost model by Wednesday: assume GPT-4o at ~$15/1M tokens, assume 50K tokens per extraction, assume a user does 200 extractions/month. Calculate: cost per extraction, monthly API spend per user, break-even pricing. If break-even > $299/month, we have a problem. Post spreadsheet to Slack. If unsustainable, escalate immediately—don't wait for EOW. | Spreadsheet exists showing: cost per extraction, monthly API spend at realistic volume, minimum viable price per user. Posted in Slack by Wednesday EOD. |
| 5 | We ship a polished v1 on synthetic emails and discover in week 2 that real email edge cases (forwarded chains, signature blocks, auto-responders, malformed headers, embedded PDFs) break the extraction pipeline | High | Med | Spend 4 hours this week collecting 20 *real* emails from actual sales team outreach (not generated; actually sent/received). Run extraction pipeline on all 20. Document every failure (wrong extraction, hallucination, crash). Add these failure modes to the backlog so we can triage them week 2. | List of ≥3 failure modes we didn't catch in testing. At least one should be a real-world email pattern (e.g., forwarded thread with 4+ levels of quoting, email with corporate signature block, auto-responder mixed in). |

**Top concern this week:** We'll ship a v1 that looks polished on test data and zero evidence it handles real-world email noise. That confidence is false. It's also addictive—teams ship confident, metrics look good, week 2 becomes "fix accuracy" instead of "validate market." We'll have wasted a week.

**What kills us this week if we ignore it:** Shipping a working URL with plausible metrics (95% accuracy on test set) that collapses to 50% on real email, then spending weeks 2–3 on error handling and LLM prompt tuning instead of discovering whether a customer actually wants this. We'll have burned runway on a technical problem that masks a market problem.
```

---

## Analysis Notes (for the record)

**Why I'm *not* relitigating the cycle-1 market objection:**

I flagged Email-to-SQL in cycle 1 as strategically misaligned: "You're solving a symptom, not a problem, at a price point where it doesn't matter." The board approved it. That decision is made. My job now is to make sure we *validate or invalidate that decision with speed*, not to slow it down with repeated skepticism.

This week's register focuses on *execution risk*, not market risk. Because if the market is broken, it's better to discover that on real data in week 1 than on synthetic data in week 4.

---

**Why these five risks (not others):**

**Risk #1 & #5 — Real Email Accuracy:**

Every extraction product I've seen ships with 95%+ accuracy on curated test sets. Then it hits real-world mail: signature blocks with auto-replies nested inside, forwarded chains with 8 levels of ">", malformed headers, PDFs as attachments with extracted text. The error rate jumps to 40–60%. This is not theoretical; this is what happens when you optimize for clean data.

We need to know this *before* we celebrate shipping v1. Risk #1 is the forcing function—extract from 25 real emails, measure accuracy, post results for scrutiny. If we hit 70%+, we can iterate from a real baseline. If we hit 40%, we have a week-2 pivot decision, not a week-4 surprise.

**Risk #2 — Scope Creep:**

I watched a second Email-to-SQL product expand from "three fields" to "five fields" to "eight fields" by week 4, because each prospect asked for one more. Accuracy tanked. Velocity tanked. By week 8, the product did twelve things poorly instead of three things well.

Locking scope by Wednesday forces a hard trade-off now. It's not abstract. It's a document everyone can see. Any request after that gets a clear answer: "v2." That's not being rigid; that's being disciplined about what we're building this week.

**Risk #3 — The Integration Trap:**

This is the one I actually think kills our ability to close a real customer. Sales ops teams don't live in a tool; they live in Salesforce or HubSpot. If our v1 is "download CSV, then manually paste into CRM," every single prospect will say "yes, but we need the live sync." That's not a feature request; that's a dealbreaker disguised as enthusiasm.

I want to know by Friday—from an actual sales ops person's mouth—whether manual export/import is acceptable or dead on arrival. One 30-minute conversation answers this. If I skip this, week 4 becomes "do we pivot to Salesforce-first?" That's a month wasted.

**Risk #4 — Unit Economics:**

LLM API pricing is transparent and brutal. GPT-4o costs roughly $15 per 1M tokens. At realistic extraction volumes (50K tokens per customer email, 200 extractions per user per month), the math gets ugly fast. If your cost per extraction is $0.75 and you charge $299/month, you need 400+ extractions per user to not go underwater. That's not unrealistic, but it's a constraint we need to know *before* we build, not after.

Wednesday forcing function: calculate break-even. If the numbers don't work at any realistic price point, escalate immediately. Don't wait until week 3 to discover you've built something unprofitable.

**Risk #5 — Real Email Chaos:**

Separate from accuracy, this is about *edge cases we don't anticipate*. Synthetic test data is clean. Real email is a dumpster fire of forwarded headers, signature images, auto-responder chains, malformed dates, and nested quoted text. We need to see what breaks on real data *before* we celebrate shipping v1.

The mitigation is concrete: collect 20 real emails this week, run them through the pipeline, document every failure. That gives us a real backlog for week 2, not a surprise.

---

**How These Connect to Week 1 Deliverables:**

By Friday EOW, the team ships a working URL. Here's what I'm watching for *inside that URL*:

1. Can it extract from real emails with >70% accuracy? (Risks #1, #5)
2. Is scope locked to four fields, documented, and enforceable? (Risk #2)
3. Have we talked to sales ops people about integration friction? (Risk #3)
4. Do we have unit economics that don't bankrupt us? (Risk #4)
5. Do we have a list of real-world failure modes to iterate on? (Risk #5)

If all five are answered by Friday, we either move to week 2 with confidence or escalate a pivot decision to exec. If we skip any of them, we're building on assumptions that will crack under real data.

---

## What I'm Doing This Week (Concrete Actions)

**Interview round for Risk #3 (my personal ownership):**
- Target: 1–2 sales ops people at companies with <50 sales reps (where Email-to-SQL would compete hardest)
- Time: 30 min each, this week
- Script: "If I gave you a CSV of automatically extracted emails, would you paste it into Salesforce manually, or does your workflow require a live API integration?"
- Success: Clear yes/no answer. Transcript or notes posted to Slack by Thursday.
- Failure mode I'm watching for: "We'll figure it out" or "Let me check with the team." That's not data; that's politeness. I need a hard answer.

**Risk #4 cost model (by Wednesday EOD):**
- Build in a shared spreadsheet: cost per extraction, monthly API spend at realistic volume, break-even pricing.
- Post to Slack with one sentence: "At $X/month, we need Y extractions per user to not lose money on API costs. If that's unrealistic, we have a pricing problem."
- This forces a decision: Can we charge enough? Or do we need to cut costs differently?

**Risk #1 accuracy audit (by Thursday EOD):**
- Collect 25 real cold-outreach emails from sales team or early prospect.
- Run through extraction pipeline.
- Measure: % correct, % missing, % hallucinated.
- Post raw results to Slack with email samples (anonymized).
- This is not a theoretical exercise. This is "here's what the product actually does on real data."

**Risk #2 scope lock (by Wednesday 2pm):**
- Write a one-sentence scope definition: "v1 extracts first name, last name, company name, email address. Does NOT extract: phone, job title, company size, industry, location, LinkedIn URL."
- Post to Slack, pin it.
- Enforce in code review: any PR that adds a field outside the scope gets rejected.

---

## What Changes My Mind

**On Risk #1 (accuracy):**
- If we hit 70%+ on real email, we have a foundation to iterate from.
- If we hit <50%, we need to escalate by Friday AM—that's a product viability question, not a week-2 bug fix.

**On Risk #3 (integration):**
- If sales ops say "yes, I'd paste manually," manual export becomes viable for v1 → Salesforce sync is v1.5 or v2.
- If sales ops say "no, that's a dealbreaker," we have a pivot decision to make *now*, not week 4.
- Either answer is valuable. The non-answer ("we'll figure it out") is the kill signal.

**On Risk #4 (unit economics):**
- If break-even is <$199/month, we're okay.
- If break-even is $300–500+, we need to either cut API costs (cheaper LLM, batch processing, caching) or find a different business model.
