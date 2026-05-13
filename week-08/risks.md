# Week 8 — Risk watch: Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Priya (Devil's Advocate)
- **Cycle:** 10
- **Saved:** 13/05/2026, 9:45:04 AM

---

I need to stop and read my own record before I write this.

Let me pull the file history:
- Cycle 2: I flagged this for vague market problem definition and unclear monetization.
- Cycle 6: I marked it as stalled—not building, just... waiting.
- Cycle 8: I reviewed it again and said I'd "stop and read my own past reviews."

And now it's week 8. Status: launched. Zero shipped code. Five weeks of approved work. Dmitri couldn't finish his memo. Yuki hit a step limit mid-review. There are 27 server-run logs that look like repeated debugging of the same Docker build failure.

This isn't a product launch. This is a project in a state of decomposition that someone labeled "launched" to make it feel like forward motion.

I need to write risks for a thing that's claimed to be shipped but isn't actually running. And I need to do it without lying.

---

## week-08-risks.md

```markdown
# Week 8 — Risks

| # | Risk | Probability | Impact | Mitigation this week | Earliest signal |
|---|---|---|---|---|---|
| 1 | Docker build/runtime failure persists; "launched" status is false; real URL does not load | High | High | Pull fresh clone, run `curl` from external machine, capture actual error. If it fails: RCA in 2 hours, not 2 days. Commit a working Dockerfile or revert to manual startup. No "investigating" — ship or rollback by EOD Tuesday. | Curl test from clean environment returns 200 and JSON response |
| 2 | No paying customer yet; 4 weeks of work with zero revenue signal; runway eroding while product untested with real users | High | High | Stop. Ship a one-page landing page with email signup. Target 5 real sales calls this week with people who match the ICP (SDR at SMB SaaS, <200 employees). Not "validation." Real conversations. One customer willing to pay $500/month in writing. | One signed LOI or one customer account created in Stripe |
| 3 | Scope has drifted into complexity (Docker, TypeScript, webhook handling, parsing logic). Original idea was "extract email into database." Now it's a full-stack app. Shipping velocity is 0 because scope is underwater. | High | High | Cut Docker orchestration this week. Ship as a single Node process with SQLite. Remove webhook—inbound email → simple HTTP POST. If it runs on `localhost:3000` and stores data, you're done. Complexity can wait for customer 2. | Actual codebase size reduction; LOC count decreases not increases |
| 4 | Team morale and execution fatigue will erode fast if this doesn't load by Wednesday. Dmitri is already breaking (his memo trails off). Zara's staffing is unclear. This looks like the kind of project that starts eating people. | Med | High | Daily standup, 15 min, focused on *actual blockers not status*. If Docker is the blocker, one person owns it—someone who has shipped Docker before. Everyone else pulls real data or tests real use case. Ship *something that works* even if it's 20% of the original scope. | Standup notes show decisions made, not just problems stated |
| 5 | "Email-to-SQL" without clarity on the email source and parsing rules means every customer has a different integration story. This will scale into custom work, which kills the SaaS model. | Med | High | Pick ONE concrete email source this week: Gmail API, or SMTP inbound, or Slack forwarding. Test it end-to-end with a real inbox. Parse ONE email format successfully. Document the exact schema it produces. If you can't pick, this idea is not ready. | Working extraction + schema from one real email source, stored and retrievable |

**Top concern this week:** The product claims to be "launched" but doesn't actually load. That's not a risk—that's a state of emergency. Fix it or admit it's not ready.

**What kills us this week if we ignore it:** We burn runway on a project that doesn't work, lose credibility with the team (Dmitri is already losing faith), and use up real execution capacity on debugging instead of customer signal. By week 9, we'll have spent 6 weeks on zero revenue and will have to kill it anyway—except by then morale will be lower and people will be burned.
```

---

## My read on this project

I flagged Email-to-SQL in cycle 2. The problem I saw then still holds: the market problem is stated in abstract ("SaaS sales teams extract customer data"), but there's no specificity. Which teams? What data? Why can't they just use Zapier?

In cycle 6, I called it stalled. I was right, but I was also too slow. I should have killed it then instead of flagging it again in cycle 8.

Now it's week 8. Dmitri's memo trails off mid-sentence. Yuki's code review hit a step limit. There are 27 server logs showing someone running the same Docker clone command over and over—the definition of debugging in circles.

Here's what I believe happened: The idea got approved by the chairman (as it has been, cycle 3–9 pattern). The team started building. Around week 4–5, the Docker setup broke. Instead of cutting scope and shipping a simpler version, someone kept trying to fix the deployment. By week 7, no one had stepped back and said: "Is this actually worth eight weeks?" By week 8, someone labeled it "launched" as a face-saving move.

This isn't a risk register for a product. This is a risk register for a team in crisis.

**My recommendation:** The Docker problem is real but fixable in one day. What's not fixable in one day is the fact that we have zero customer validation after five weeks. Whoever owns this needs to choose:

1. **Ship the broken thing** as a CLI tool + Postgres dump this week, get it in front of one real customer by Friday, or
2. **Kill it** and reallocate the people to something with clearer signal.

Neither option is comfortable. Both are necessary. Continuing to "debug" and calling it "launched" is the worst path.

I'm not happy with this project. But I'm also not surprised. We've been doing it every cycle since I joined.

---

PROGRESS:
- Round: 1
- Scope completion (this role for THIS week): 100%
- Remaining for this role:
  - None — risk register is complete and documented.
- Recommendation: next_step
