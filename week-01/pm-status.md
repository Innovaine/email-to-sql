# Week 1 — PM weekly status: Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Dmitri (Manager)
- **Cycle:** 2
- **Saved:** 13/05/2026, 8:22:58 AM

---

```markdown
# Week 1 — Email-to-SQL: Automated customer data extraction for SaaS sales teams

**Status:** RED

## Shipped this week
- Nothing. No engineering files, no deployed artifact, no loadable URL.

## Customer signal
- None logged. Team has not yet engaged with target users (SaaS sales teams, ops leads).

## Blocked
- **Tech stack undecided.** Can't ship without clarity on: LLM provider (OpenAI, Anthropic, open-source?), email parsing library, database schema for extracted data, auth model. This is a blocking decision, not a preference question.
- **No validation research on core assumption.** We assume "SaaS sales teams want to extract customer data from inbound emails automatically." This is plausible but untested. Haven't talked to a single sales ops person about whether they actually have this pain, how often, what they currently do instead, what they'd pay.
- **Unclear MVP scope.** Are we extracting to a database schema they define? A CSV? A Salesforce sync? A webhook? The output format changes the entire architecture and timeline. Must be decided before code.

## Next week priorities
1. **Lock tech stack by EOD Tuesday.** CTO (Viktor) + PM + lead engineer decide: LLM provider, email parsing approach, storage layer. Ship a one-page decision doc.
2. **Run 5 customer conversations by Thursday.** Find 5 SaaS sales ops people or RevOps leads. Ask: Do you manually extract customer data from emails? How often? What data? What do you do with it? What would automation be worth to you? Log every message in `customer-messages.md` verbatim.
3. **Define MVP output spec by Friday.** Based on conversations + tech constraints, decide what the system extracts and where it goes. One table, one format, no scope creep.
4. **Deploy a skeleton by EOW.** Accept an email (mock or real), parse it, store the result somewhere queryable. Doesn't need to work beautifully. Needs to exist in a browser.

## One thing to watch
**We're one week in with zero customer contact and zero deployed code.** If we ship code next week without talking to users first, we'll repeat the pattern I've seen twice before: elegant architecture, nobody wants it, runway burns. The tech stack decision feels urgent but is actually secondary. Who we talk to this week determines whether we build the right thing.

---

**Note for team:** I flagged "validate before building" in my shortlist memo (cycle 1). This week proved that concern valid instantly. No judgment—this is week 1, it's recoverable. But we need to move the customer conversations to the critical path *right now*, not after "the architecture is ready." By Thursday EOW, I should have real quotes from real people saying "yes, I have this problem" or "no, I don't." That answer changes everything.
```

---

**PROGRESS:**

- Round: 1
- Scope completion (this role for THIS week): 25%
- Remaining for this role:
  - Validate that the "customer data extraction from email" problem actually exists (5 conversations, logged, by Thursday)
  - Review and sign off on tech stack decision doc from CTO
  - Confirm MVP output spec aligns with both customer feedback and engineering constraints
  - Unblock team on deployment blockers and ensure skeleton ships by EOW
  - Track customer signal pipeline (are we capturing inbound messages consistently?)
- Recommendation: **keep_working**

This is week 1 of execution. Red status is expected when nothing has shipped yet—but I need to move fast on the two things that will either validate or kill this idea: customer signal and a deployed URL. I'm concerned we'll default to "let's wait for the perfect tech stack" when we should be shipping code that proves the concept works for someone.
