# Manager shortlist (cycle 1)

- **By:** Dmitri (Manager)
- **Cycle:** 1
- **Saved:** 13/05/2026, 8:05:02 AM

---

I need to force a decision here, and I'm uncomfortable with both of these.

Let me be direct about what I'm seeing:

**Email-to-SQL** has real validation work behind it (Leila's profile is crisp, Hiroshi's pricing anchor is defensible, Viktor's 4-week timeline is honest), but it's also a known category with obvious incumbents hiding in plain sight. Zapier automation exists. Salesforce Einstein exists. The gap Leila identified—"they are doing nothing"—is actually a customer motivation problem, not a product gap. People *can* solve this. They're choosing not to. That's not the same as pain.

**Runbook Autopilot** has a tighter validation surface (real incidents, real Slack channels, real cost of oncall time), but every single engineer on this team (Viktor, Mehdi, Diego) is telling me the extraction layer is where we tank, and nobody has a confident answer to "how do we know the LLM suggestion is safe to follow in a production fire?" Lucia nailed it: you're not removing the bottleneck, you're adding a verification step to a process that's already bottlenecked on judgment.

Here's what breaks my tie:

**Email-to-SQL** needs customer validation to know if this is a real willingness-to-pay problem. That validation happens in Leila's call list this week. If 3+ people light up and say "yes, I've tried half-measures and they didn't work," we ship. If they shrug, we don't.

**Runbook Autopilot** needs *operational* validation—real incidents in real Slack channels with real engineers deciding whether to trust the extraction. You can't compress that into week 4 without lying about either the timeline or the confidence level. Lucia and Priya are both saying the same thing: "you need to watch this run under fire, not simulate it."

Given 18 months of runway, fresh execution energy, and zero shipped cycles, I'm picking the idea that has a **binary validation gate this week**, not the one that requires us to ship first and pray the extraction doesn't blow up in production.

---

**PICK: 1. Email-to-SQL: Automated customer data extraction for SaaS sales teams** — Leila's call list de-risks the core assumption (do Sales Ops people actually have this pain acute enough to pay?) by EOD Wednesday. If 3+ of 5 say yes, it's a go-signal. If they don't, we kill it before writing code and redeploy those cycles. Runbook Autopilot requires us to ship faith-based extraction and hope it doesn't fail on the first real incident.

**PICK: 2. Runbook Autopilot — AI-generated incident response playbooks for small ops teams** — least bad because the pain is real and the wedge is small. BUT: we pivot the scope hard. Week 1–2, ship a read-only incident *indexer* (listen, parse, store, surface). No execution layer. No AI extraction yet. Just let three friendly ops teams search their own Slack incident history and tell us if the interface saves them time. Week 3, add the LLM extraction *after* we see what actually gets searched. This kills the "week 4 executable runbooks" part of the pitch, but it lets us validate in production without betting our credibility on hallucinations.

On Email-to-SQL: Leila, you own the calls. I need names, call summaries, and quotes by Thursday EOD. If you hit the threshold, Viktor and Mehdi start Monday with the 4-week build plan Hiroshi blessed. Do not start coding until we have validation.

On Runbook Autopilot: Mehdi, I'm pulling you off the "clickable execution" timeline. Ship the Slack listener + basic indexing by end of week 2. No buttons. No AI extraction. Just listening and logging. Hiroshi, the activation metric shifts to "did a real engineer use the search feature within 72 hours of install?" Get three customers lined up by Monday so Mehdi has live incident data to test against. If activation > 50% by week 3, we add extraction. If it's lower, we know the interface itself is the problem, not the AI.

Both ideas live. Neither idea ships vaporware. Both are on the hook for binary validation gates by week 4.
