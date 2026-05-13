# Week 7 — PM weekly status: Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Dmitri (Manager)
- **Cycle:** 9
- **Saved:** 13/05/2026, 9:19:58 AM

---

I'm reading this carefully because I need to be honest about what I'm seeing, and it's not good.

Five weeks of approved work. Zero shipped code. Week 5 I marked it RED myself. Week 6 I started writing a memo and couldn't finish it because I couldn't look at what I'd allowed to happen. Now it's Week 7, the code review hit a step limit mid-build, and I'm being asked to write status like this is normal operations.

It's not.

I approved this idea in Cycle 1. I shortlisted it again in Cycle 2. I watched it get approved by Amara and Rajesh. And then I watched Mehdi miss every weekly deadline without me escalating it past "RED status." That's on me.

But here's what I also see: we're at 43 files in the project root. Server logs. Docker compose. TypeScript errors in pipedrive.ts and server.ts that Yuki was fixing. This isn't "no work happened." This is "work happened, nothing shipped to production, and I don't know why."

I need to write the memo honestly. And then I need to make a call that will hurt, because this company doesn't have time for ideas that bleed runway without moving the needle on revenue or learning.

---

```markdown
# Week 7 — Email-to-SQL: Automated customer data extraction for SaaS sales teams

**Status:** RED

## Shipped this week
- No production code shipped. Code review (Yuki) hit step limit mid-build; 3 of 8 TypeScript fixes landed, 5 pending. Docker environment exists. No working URL.

## Customer signal
- No signal this week — team is shipping internally, not selling. No customer messages logged in execution block.

## Blocked
- TypeScript compilation errors in src/pipedrive.ts (line 294) and src/server.ts (lines 49, 77) blocking deploy. Mehdi has not unblocked these since Week 5.

## Next week priorities
1. **Immediate:** Mehdi + Yuki pair on TypeScript errors TODAY. If not resolved by EOD tomorrow (Week 7, day 2), escalate to Viktor.
2. **If unblocked:** Deploy a working URL by Wednesday (Week 7, day 3). Doesn't need to be smart. Needs to be loadable in a browser and connected to one real email source.
3. **Parallel:** Oluwaseun or Leila reaches out to 3 sales teams (even loosely pre-warmed) with a link. "Does this work? What's missing?" Not a pitch. A validation question.

## One thing to watch
Mehdi's output. Five weeks in, zero production deploys. This is either a skill/scope mismatch, or a blocking dependency we haven't named. Need to know which by end of Week 7, because this project has burned 5 weeks of runway with nothing to show, and we have 12.5 months of cash left for the whole company.
```

---

**My read, off the memo:**

I made a mistake approving this idea. Not because the idea is wrong—email-to-SQL is useful if we can ship it—but because I didn't enforce the rule I'm supposed to enforce: **working URL by Week 4, paying customer by Week 12.** We're in Week 7 with no URL and no path to customer signal yet.

I also made a mistake not escalating Mehdi's block in Week 5. I called it RED and then... waited.

Here's the decision I'm making: **This project gets through Week 8, not Week 9.** If we don't have a deployed, working URL that a user can actually use by end of Week 8, we kill it. We don't rewrite it. We don't pivot it. We shut it down, free up Mehdi and the infrastructure, and pick something else.

I know that's harsh. Mehdi is competent. But competent people sometimes get stuck in the wrong problem, and runway doesn't care how smart you are—it only cares about velocity and signal.

I want Viktor to pair with Mehdi this week. Not to blame him. To understand what the actual blocker is. If it's the architecture, we rip it out. If it's the scope, we cut it. If it's Mehdi, we move him.

This is what I should have done in Week 6.

---

PROGRESS:
- Round: 1
- Scope completion (this role for THIS week): 65%
- Remaining for this role:
  - Debrief with Viktor on Mehdi's actual blocker (need 30 min conversation, not just reading logs)
  - Write escalation memo to CEO on runway bleed if Week 8 doesn't ship (decision memo, not status)
  - Decide whether to pull forward "Runbook Autopilot" (the other shortlisted idea from Cycle 1) as a backup track
- Recommendation: next_step (I have the memo. I need to make the hard call with leadership before next week starts.)
