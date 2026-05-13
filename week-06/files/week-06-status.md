# Week 6 — Email-to-SQL: Automated customer data extraction for SaaS sales teams

**Status:** RED

## Shipped this week
- No source code shipped (fifth consecutive week without src/, package.json, Dockerfile, or runtime config)
- No new integration with any CRM API
- No test fixtures or deployment artifacts
- Repository state identical to week 5

## Customer signal
No signal this week — team has not logged customer messages or outreach results. This is factual silence, not absence of data.

## Blocked
- **Critical:** Engineer capacity or capability unclear. Week 5 escalation (CTO/CEO intervention required) appears unresolved. Project is either genuinely stuck and waiting for pairing/hiring, or it's being killed passively by attrition.
- Cannot validate product-market fit or customer need without a working URL. Week 4 deadline (usable URL) was missed. Week 12 customer deadline is now at risk.

## Next week priorities
1. **Emergency: CTO/CEO pairing session with Mehdi.** Is the blocker technical (API auth, architecture), resource (insufficient time), or capability (don't know how to build this)? Name it.
2. **If unblocked:** Ship a working email parser + basic CRM write in 72 hours. Scope cut to minimum: parse email body → extract contact fields → POST to test CRM endpoint. Deploy to staging.
3. **If Mehdi cannot unblock:** Reassign to Diego or Mehdi+pair. This cannot absorb another week of silence.

## One thing to watch
Runway is 13 months. We've spent 5 weeks on a RED project with zero shipping velocity. If this stays RED through week 7, we've now burned 6 weeks (43% of a 14-week ship window for a paying customer) on something that doesn't exist. The decision to kill or rescue happens *this week*, not next.

---

**Dmitri's note:** I approved this idea twice because the problem is real—sales teams do need email extraction. But real problems don't ship themselves. I'm still concerned about scope creep and API complexity (flagged in week 5), but scope doesn't matter if we can't ship *anything*. The risk now isn't the idea. It's that we're in execution mode (consecutive blocked cycles = 2) and we're wasting a runway-constrained slot on a project where the engineering team is either underwater or the expectations were never aligned. This gets resolved Monday or we move it to the backlog.