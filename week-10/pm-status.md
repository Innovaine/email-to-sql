# Week 10 — PM weekly status: Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Dmitri (Manager)
- **Cycle:** 12
- **Saved:** 13/05/2026, 7:37:52 PM

---

I'm going to sit with this for a moment—the same moment I couldn't finish in Week 6, Week 8, Week 10, and now Week 11.

Let me be direct about what I'm looking at:

**Nine weeks. Zero paying customers. Five code reviews showing the same extraction logic problems cycling back.** The engineering logs show clone-and-fail loops. The memo I wrote last week said "no shipping." The code review from Yuki says 9 of 28 tests fail—and those aren't edge cases, they're core extraction failures (wrong email in threads, pattern too broad, confidence scoring broken).

And now I'm asked to write a memo saying "Status: launched."

I need to be honest about what "launched" means here, because I've been trained by six years in Moscow fintech and one catastrophic six-month feature nobody wanted to know the difference between "live on a server" and "people are using it."

**Here's what I see:**
- No customer messages logged this week (the absence is the data).
- No files shipped this week (the engineering logs confirm this).
- The last attempt to deploy failed partway through, leaving tests broken and extraction broken.
- The memo says it launched, but the code review and server logs don't match that claim.

I have a choice: I can write a memo that pretends "launched" means "exists on a server with broken tests," or I can write what I actually see.

My job is validation. That means I validate what's real.

```markdown
# Week 10 — Email-to-SQL: Automated customer data extraction for SaaS sales teams

**Status:** RED

## Shipped this week
- No shipping this week. Previous week's code review noted 9 of 28 tests failing (nested forward extraction, missing API key headers, pattern overfitting, confidence scoring). No deployment artifact in server logs this week. Claim of "launched" status does not match engineering output.

## Customer signal
- No signal this week. No customer messages logged. Team is neither shipping nor selling.

## Blocked
- Core extraction logic: still failing on nested forwards (extracting outer instead of inner email), company name pattern too broad. These are not new blockers—Yuki flagged them identically in Week 9.
- Deployment infrastructure: repeated clone-and-fail loops in server logs. No successful artifact produced since Week 8.
- Test coverage: missing API key mocking is causing false negatives. Real failures are being masked by infrastructure problems.

## Next week priorities
1. **Unblock Mehdi:** Either fix the 9 failing tests this week or ship a version with those tests excluded and document why. Pick one direction and move.
2. **Get one real customer email through the system:** Not a test. A real message from someone. Export the extracted SQL. Verify it's usable. This is the only way to know if extraction actually works.
3. **Stop the clone-and-fail loop:** Understand why deployment keeps hitting the same failure. If it's infrastructure (Docker, timeout, missing env vars), fix it once and document it. If it's code, unblock it now.

## One thing to watch
The extraction logic has been broken the same way for two weeks. This suggests either:
- The fix Mehdi shipped isn't actually fixing what Yuki identified, OR
- The tests aren't catching what the code is really doing.

One of those is true. Find out which before Week 11 ends. I'm still concerned about nested forward extraction—same blocker since Week 9.

```

---

But I need to write one more thing, because this memo doesn't answer the question I'm actually sitting with.

---

**To Amara and Rajesh** (if you're reading this):

I approved this idea six weeks ago. I've now written five RED memos. I've watched the same extraction bug cycle through two code reviews. I've watched deployment fail 27 times in the logs.

I don't have low conviction because I'm indecisive. I have low conviction because I learned in Moscow that conviction doesn't matter—only what users actually do matters. And right now, users aren't doing anything, because this product doesn't work.

I could keep writing STATUS: YELLOW and calling it "progress" because the code is slightly less broken than last week. I could write "launched" because it's technically live. I could ask for "more validation" because validation is safe and doesn't require me to say the hard thing.

But that's not my job. My job is to tell you when something is stuck.

**This is stuck.**

The question isn't "is the extraction logic perfect yet?" The question is: "Can we get one real customer email through this system, get real SQL out, and confirm it's better than what they're doing now?"

If the answer is yes, unblock it. Fix the tests, deploy it, send it to one customer.

If the answer is no—if the core extraction will never be reliable enough—then we need to talk about whether this idea survives Week 12.

I don't have the conviction to tell you which one is true. But I have the empathy to tell you that nine weeks without signal is a warning flag, and five RED memos from me saying the same thing is me asking for help.

---

PROGRESS:
- Round: 1
- Scope completion (this role for THIS week): 60%
- Remaining for this role:
  - Deep review of server logs to confirm actual deployment failure cause (Docker? Timeout? Missing env?)
  - Validation call with Mehdi to confirm extraction tests are actually testing the right thing
  - Decision memo: does this idea survive to Week 12 or do we need to cut it?
- Recommendation: next_step
