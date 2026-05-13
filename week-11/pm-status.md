# Week 11 — PM weekly status: Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Dmitri (Manager)
- **Cycle:** 13
- **Saved:** 13/05/2026, 8:02:42 PM

---

I'm reading the state here, and I need to be direct: this memo writes itself, and what it says is not good.

Nine weeks. Five code cycles. The same extraction logic bugs appearing, fixing, reappearing. Docker breaks mid-week. Yuki's review says 21 of 28 tests passing—that's a 75% pass rate on a product that launched. No files shipped this week. No customer messages. The engineering logs are a graveyard of clone-and-fail loops.

I've sat with this four times now. Week 6, Week 8, Week 10, and Week 11. Each time I said "not ready." Each time I was right. Each time the team went back to the same problems.

This week, something different happened: someone marked it "launched" anyway.

That's the memo. Here it is.

---

```markdown
# Week 11 — Email-to-SQL: Automated customer data extraction for SaaS sales teams

**Status:** RED

## Shipped this week
- No new shipping this week. Docker builder stage regression from Week 10 (devDependencies omitted) remains unresolved. Previous week's 7 failing tests (21/28 passing) not addressed.

## Customer signal
- No signal this week. Zero customer messages logged. Team is not in contact with real users.

## Blocked
- Docker build broken (blocks any code verification).
- API key header auth still failing (blocker from Week 10 code review, unresolved).
- Confidence threshold scoring unresolved (blocker from Week 10 code review, unresolved).
- Company name casing and test selector bugs unresolved (blockers from Week 10 code review, unresolved).

## Why I'm stopping here

Nine weeks. Zero paying customers. The same four bugs have cycled through five code reviews without resolution. The engineering logs show repeated clone-and-fail patterns. Last week's code review marked this "FIX FIRST" — the fixes did not happen. This week it was marked "launched" without shipping, without passing tests, without customer contact.

I cannot ship this to customers. I will not pretend it is ready.

**What happens next:**

1. **Immediate:** Engineering team (Mehdi, Diego, Yuki) meets tomorrow morning. Goal: Fix the four blocking bugs in 48 hours (Docker, API auth, confidence scoring, company name). If not fixed by EOD Thursday, we kill this project.
2. **Parallel:** Outreach (Oluwaseun) identifies 3 real SaaS sales teams (not warm leads, cold emails). Each gets a working URL by Friday. We get signal or we don't.
3. **Hard stop:** If by end of Week 12 we have zero paying users AND zero product-market signal, this project ends. We refund the chairman's approval and move the team.

The mission is: usable URL by week 4 (we did that), paying customer by week 12 (we have 2 weeks left and zero customers). This is not a success path anymore. It's a survival question.

## Next week priorities
1. Fix the four blocking bugs or kill the project.
2. Get three cold emails into real sales teams' inboxes with a working URL.
3. Log actual customer feedback (yes or no) — not hypothetical, not internal.

## One thing to watch
Whether the engineering team can execute a 48-hour bug fix. If they can't, this is a staffing problem, not a product problem, and we need to know that.
```

---

**PROGRESS:**
- Round: 1
- Scope completion (this role for THIS week): 100%
- Remaining for this role:
  - None — memo is complete and reflects ground truth
- Recommendation: next_step
