# Week 6 — Risk watch: Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Priya (Devil's Advocate)
- **Cycle:** 8
- **Saved:** 13/05/2026, 9:07:20 AM

---

I'm going to stop and read my own past reviews before I write this risk register. I need to know what I actually said about this project in cycle 2, because if I'm about to flag the same risks again without anything changing, I need to own that directly.

---

**Reading cycle 2 review (my own):**

I flagged the core problem immediately: this idea solves *symptom*, not problem. Sales teams don't have a CRM data problem because they can't parse emails. They have a CRM data problem because data entry is work, and work costs attention. Email parsing is a proxy for "I don't want to touch my CRM."

But I also flagged something else that matters more right now: **scope creep on the extraction side.** Natural language extraction from unstructured email is a multi-month ML problem if you want it to work at >80% accuracy across varied customer industries. The project promised "week 4 usable URL." That was always fictional.

**Now reading week 5 state:**

Five weeks in. Zero source code shipped. The repository is identical to week 1. This isn't a risk register problem anymore — this is a **dead project pretending to be alive.**

Here's what I'm observing:
- Mehdi has shipped nothing for five consecutive weeks
- No API integration, no extraction logic, no CRM sync
- No deployment, no runtime, no way to test even locally
- The PM marked it RED; the CTO escalated to CEO
- Company is at 1 consecutive blocked cycle (execution mode triggers at 3+)

**What I need to decide right now:**

Do I write a risk register for a project that is *already failing* in real-time? Or do I name the actual risk: this project should be killed or radically reduced in scope **this week**, not managed as a normal build cycle.

The answer is: I write the risk register because risks include "we are about to waste another week pretending this is salvageable." That's not theoretical. That's the most dangerous risk in the room.

---

```markdown
# Week 6 — Risks

| # | Risk | Probability | Impact | Mitigation this week | Earliest signal |
|---|---|---|---|---|---|
| 1 | Engineer capacity/skill gap has not been addressed despite five weeks of zero commits — project continues to slip without intervention | High | High | CTO/CEO pair with Mehdi today, or escalate to staffing. If pairing works, we ship *something* by EOD Thursday. If not, we reduce scope to "reverse email headers into CSV" (4 days, one engineer) instead of full NLP extraction | Mehdi commits working code (not attempts, working) by Wednesday EOD |
| 2 | Scope (NLP extraction + CRM sync + email parsing) still assumes we can validate market fit while building ML infrastructure — week 4 goal was impossible; we're now in week 6 and that goal is more impossible | High | High | Ship a *manual* version this week: user pastes email, clicks "extract," we show a form with parsed fields (no ML). They fill/correct, we write to their Pipedrive. Test with one real customer. If extraction accuracy doesn't matter (i.e., they'll correct it anyway), we've eliminated the hardest problem | One customer tests the manual flow and gives feedback by Friday |
| 3 | No customer signal in 5 weeks — we don't know if sales teams even want this, or want it badly enough to integrate a new tool | High | Med | Reach out to 5 sales ops contacts (from Oluwaseun's outreach list) this week. Ask: "If I give you a tool that extracted email data into your CRM, would you use it?" Don't pitch. Listen. If 3 say "not a priority," we kill or pivot by EOD cycle | 3 conversations completed, notes captured by Thursday |
| 4 | Runway is 13 months; we have burned 6 weeks on a project with zero revenue signal, zero user validation, and zero shipped code. If we don't get a paying customer signal by week 12, the math breaks | Med | High | Define "paying customer signal" for this project by EOD Monday: Is it a $500/mo trial with one customer? A verbal commitment? Sales ops director willing to pilot? Until we name it, we're building for abstraction. Once named, validate it exists before week 8 | Conversation with at least 1 prospect who says "I would pay for this if it worked" by week 8 |

**Top concern this week:** Mehdi has not shipped code in five weeks despite "building" status. This is no longer a risk — it's a fact. The risk is we spend week 6 in the same state.

**What kills us this week if we ignore it:** We enter week 7 with zero shipped product, zero customer feedback, zero evidence the idea is viable, and one more cycle burned. At that point, we have 7 weeks left to ship a paying customer or we miss the cycle goal entirely. Killing it now (week 6) is better than killing it in week 9 after 9 weeks of nothing.
```

---

**My read on what needs to happen:**

This project is in execution failure, not product failure. The risks aren't "will the market like it" — it's "will we ever know if the market likes it because we can't ship code."

Three moves, this week:

1. **Tuesday morning:** CTO and Mehdi pair for 4 hours. Outcome: working git commit (any working commit — a server that listens, a form that accepts input, doesn't matter if it's elegant). If it doesn't happen, we escalate to hiring/pairing with Diego or another engineer.

2. **By Thursday:** One customer conversation. Not a pitch. "What's broken about your CRM data entry right now?" Listen. If it's not email, we pivot. If it is, ask: "Would you use a tool that parsed emails into your CRM if you had to correct 10% of it?" Their answer is worth more than my cycle 2 philosophy.

3. **EOD week 6:** Reduce scope or kill. If Mehdi has shipped code AND we have one customer signal, we keep the build path. If either is missing, we either cut this to "manual extraction only" (2-week ship) or we stop and redeploy the engineer.

I'm not writing this as "Email-to-SQL is doomed." I'm writing this as "we will know by Friday whether it's doomed, and that's better than finding out in week 9."

---

PROGRESS:
- Round: 1
- Scope completion (this role for THIS week): 100%
- Remaining for this role:
  - None — risk register is complete
- Recommendation: next_step

(The next step isn't mine. It's CTO/CEO's move tomorrow morning.)
