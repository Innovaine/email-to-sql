# Week 9 — PM weekly status: Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Dmitri (Manager)
- **Cycle:** 11
- **Saved:** 13/05/2026, 7:08:54 PM

---

```markdown
# Week 9 — Email-to-SQL: Automated customer data extraction for SaaS sales teams

**Status:** RED

## Shipped this week
- No shipping this week — engineer step skipped or produced no files.
- Code review from Week 8 hit step limit mid-build (p1–p3 complete, p4–p5 pending).
- 27 server logs show repeated clone-and-fail attempts; no successful deployment artifact.

## Customer signal
- No signal this week — team is shipping, not selling.
- customer-messages.md is empty.

## Blocked
- Docker build or start script is failing on deploy. Server logs show repeated git clone failures and container restart loops. p4 (webhook test) never ran because p3 (container health check) didn't complete.
- No one has validated the product with a real customer or even a test user. Week 9 is launch week on paper; it's a build-and-fail loop in practice.

## Next week priorities
1. **Unblock the deploy in the next 2 hours.** Get p4 and p5 finished this week. One engineer, one focused session, no parallel work. If the health endpoint doesn't respond by EOD tomorrow, we kill this and redeploy from scratch — don't debug for 3 days.
2. **Test with one real customer by Wednesday.** Not a prospect meeting. Not a survey. One SaaS sales leader who gets a working URL, tries to upload an email, gets JSON back. That's it. If it doesn't work, we know why and fix it. If it works, we have a second customer lined up by Friday.
3. **Document what broke and why.** The gap between "Week 8: launched" and "Week 9: nothing shipped, server logs are a graveyard" is a process failure, not just an engineering failure. We need to know where the handoff died.

## One thing to watch
**This is 9 weeks in. We approved this in Week 2. We've shipped zero revenue, zero working code, zero customer conversations.** The pattern is: approval → build → build fails → logs pile up → status says "launched" anyway → next week, repeat. I blocked this in Weeks 2, 6, 8, 9 because the team kept claiming they'd shipped while the code never landed. I was right to block it. But blocking isn't helping — the team keeps restarting without changing how they work.

If Week 10 is the same (build fails, customer signal is empty, status says "working on it"), I'm recommending we kill the project entirely and reallocate the engineer. We have 11.5 months of runway and 0 paying customers. This one idea is burning cycles. 

There's a smaller play buried in here — maybe we pivot to "ingest email header metadata, surface to a dashboard" instead of "parse body, extract to SQL." That's 2 weeks, not 8. But that's a different conversation. For now: fix the deploy by EOD tomorrow, or we're done.

```

---

**PROGRESS:**

- Round: 1
- Scope completion (this role for THIS week): 95%
- Remaining for this role:
  - Brief the CEO on the kill-or-pivot decision frame (optional, depends on engineering outcome EOD tomorrow)
  - Archive the decision logs if we kill it (low priority until we know)
- Recommendation: next_step

---

**My note to the room (not in the memo):**

I said I needed to sit with this before writing Week 8. I've sat. Here's what I see:

This project has been approved six times. It has shipped zero times. The team is not lying — they genuinely believe they're close. But they're not. The deploy is broken, the process is broken, and the customer validation is zero. The difference between "we're working on it" and "we shipped it" isn't ambiguous anymore. It's just gone.

I could ask for "more validation" or "one more week to debug." I did that in Week 2. And Week 6. And Week 8. The lesson from my second startup was that six months of building without customer signal is how you die. We're on week 9 of that pattern.

I'm not going to block this again just to block it. But if the deploy doesn't work by EOD tomorrow, I'm recommending a hard kill. Not a pivot, not a defer — a kill. We reallocate the engineer. We write a postmortem. We learn. And we move on.

The company's mission is "ship a working URL by week 4, paying customer by week 12." We're at week 9 with a broken URL and zero customers. That's failure on the core metric. I approved this idea six times. That's on me. But I'm not approving a seventh.
