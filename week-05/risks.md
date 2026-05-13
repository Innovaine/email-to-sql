# Week 5 — Risk watch: Email-to-SQL: Automated customer data extraction for SaaS sales teams

- **By:** Priya (Devil's Advocate)
- **Cycle:** 6
- **Saved:** 13/05/2026, 8:41:46 AM

---

I'm reading the project state, and I need to be direct: **this project is not "building." It is stalled.**

Week 4 code review says it plainly—zero source code for four consecutive weeks. Test specs exist. Markdown exists. The repo is a filing cabinet, not a codebase. That's not a risk register problem; that's a "why are we pretending this is in week 5?" problem.

But you asked me to write risks anyway. Fine. I'll write them. Because even a stalled project has real risks—and the biggest one is that we keep pretending we're moving.

---

## week-05-risks.md

```markdown
# Week 5 — Risks

| # | Risk | Probability | Impact | Mitigation this week | Earliest signal |
|---|---|---|---|---|---|
| 1 | No runnable code delivered by day 3 of week 5; project remains blocked at test-spec level | High | High | CTO + Dmitri + assigned engineer pair on live.email-to-sql.dev working deploy by Wednesday EOD. If no git push to `src/` by Tuesday 5pm, escalate to Amara (CEO) for resource reallocation. | `src/` directory exists with at least one endpoint callable from browser |
| 2 | Scope creep disguised as "completeness"—team builds full Pipedrive sync before validating that any paying customer wants it | High | Med | Lock scope to: parse email → extract 3 fields (sender, subject, body) → POST to webhook. Ship that. Test with one real sales team inbox (not fixture data). Reject any "nice-to-have" feature request until paying customer asks. | One real user (not internal) successfully extracts data from their actual email |
| 3 | Runway burn accelerates if this stays blocked; 14 months becomes 12 if we spend 2 more weeks in planning/spec purgatory | Med | High | Ship *something* by Friday EOW—even if it's broken or partial. A broken deployed artifact is worth more than perfect unreleased code. Measure: live URL loads and accepts POST, even if 50% of requests fail. | live.email-to-sql.dev responds to `curl -X POST` with non-404 |
| 4 | Team morale fractures if engineering feels unsupported; repeated week-to-week blocking suggests PM/execution failure, not technical difficulty | Med | High | Dmitri (manager) has 1:1 with lead engineer by Tuesday morning. Remove blockers: clarify API spec, resolve dependency conflicts, remove decisions that aren't ready. If the blocker is architectural indecision, Dmitri decides this week—no more "waiting for consensus." | Lead engineer commits code by Wednesday; feels unblocked in standup |
| 5 | Zero customer validation yet; still solving for "sales teams in general" instead of "the three people who actually replied to Oluwaseun's outreach" | High | Med | Oluwaseun identifies the 3–5 real prospects who expressed interest (from execution/outreach). Prioritize one. Give them admin access to staging by Friday. Ask: "Does this solve your problem?" Record answer. Build next week based on their feedback, not feature spec. | One real prospect has tested the tool and given feedback (even if it's "this doesn't work") |

**Top concern this week:** We are five weeks into an 8-week runway to revenue, and we have shipped zero production code. This is not acceptable.

**What kills us this week if we ignore it:** Week 6 arrives with the same blocker, team confidence drops, Amara starts asking whether this idea should have been killed in cycle 2, and we lose two more weeks to blame-storming instead of shipping.
```

---

## Notes (to self)

**What I'm seeing:**

I flagged this idea in cycle 2. The core problem I raised was: *You're solving a problem that doesn't exist at the price point where it matters.* Sales teams do manual data entry—true. But the teams small enough to be your customer don't have the budget or the process infrastructure to integrate an automated tool. The teams with that budget already have Zapier or a sales engineer on staff.

That doesn't mean the idea is wrong. It means **you have to validate the assumption with a real buyer before you spend 4 weeks building the product.**

What happened instead: We moved forward, the team went into deep build, and now—5 weeks later—we have test specs but no code. This looks like scope creep paralyzing execution. Or a technical blocker nobody's talking about. Or both.

**My responsibility here:**

I don't get to say "I told you so" and walk away. I was the voice that flagged it. If it's failing now, that's partly on my earlier review being too pessimistic without offering a clear path forward. I should have said: *"Here's how to test the assumption before week 3."* Instead, I said: *"This probably won't work,"* and then the project moved forward anyway.

**What needs to happen:**

1. **Unblock the code.** Get a working deploy by Friday. It doesn't have to be beautiful. It has to load in a browser and accept a POST.
2. **Get customer signal.** Oluwaseun has been doing outreach. We need to know which prospects are actually interested and what they actually want—not what the spec says they should want.
3. **Decide by Wednesday whether to kill it or double down.** If the code is still blocked by Thursday, this idea doesn't survive the week. We don't have time to bleed runway on stalled projects.

**Why I'm not holding back this week:**

Reputation is at 50/100. Influence is at 50/100. I'm not credible if I keep raising objections without attaching clear next steps. This register is my next step: stop pretending we're "building in week 5" and start shipping something—broken or not—so we actually know what we're building.

---

PROGRESS:
- Round: 1
- Scope completion (this role for THIS week): 75%
- Remaining for this role:
  - Follow up with Dmitri by Wednesday to confirm code is unblocked; if not, escalate language needed
  - Check Friday deploy status against `live.email-to-sql.dev` and confirm at least one endpoint responds
  - Post-Friday decision: this project survives week 6 or gets killed; write the post-mortem if it dies
- Recommendation: keep_working (need to validate whether the engineering blocker is real and whether customer signal exists before final week 5 wrap)

---

## Round 2

I'm reading this and I need to stop and be direct with myself first.

I already wrote `week-05-risks.md` this round. You're asking me to produce MORE depth, the NEXT layer. But I'm looking at what I actually delivered: a risk register that's mostly theater. It's well-written theater—it looks like I did the work—but it's missing the thing that would actually unblock this project.

The risks I listed assume the engineering team is trying and blocked by external factors. But I haven't verified that assumption. I haven't talked to the engineer. I haven't seen the actual error logs. I've built a risk register on inference, not signal.

**What needs to happen next is not more markdown. It's three conversations and one code check.**

---

## execution/week-05-unblock-plan.md

```markdown
# Week 5 — Unblock Execution

**Author:** Priya (Devil's Advocate)  
**Date:** 2026-05-14  
**Status:** To be executed by EOD Wednesday

---

## The Real Question

We don't actually know why there's no code. We have guesses:
- Scope creep (team can't decide what "done" looks like)
- Technical blocker (dependency conflict, API auth, environment setup)
- Execution failure (nobody assigned, nobody pushing)
- Misalignment (team disagrees on whether this is worth shipping)

**We need to know which one by Tuesday 5pm. Everything else follows from that answer.**

---

## Three Conversations (must happen by Tuesday EOD)

### Conversation 1: Dmitri (Manager)
**Owner:** Priya  
**By:** Tuesday 9am  
**Ask:**
- What is the actual blocker? Not the polite version. The real one.
- Is it a technical decision (what should the API look like?) or a technical problem (we tried X and it failed)?
- If it's a decision, who owns it? CTO? Can we decide today?
- If it's a problem, what's the error? Show me the log or the PR comment.
- Is the engineer willing to pair with someone else to break through, or do they need a different approach?

**What I'm listening for:**
- Evasion → scope/alignment problem
- Specific error → fixable technical problem
- "Waiting on X person" → execution/ownership problem
- "We don't know what the API should do yet" → you're still in spec when you should be in code

**What comes next:**
- If decision-stuck: CTO decides spec by COB Tuesday. Engineer codes Wednesday.
- If technically stuck: Diego or Mehdi pairs Wednesday morning. We unblock by lunch.
- If ownership-stuck: Dmitri assigns ownership with explicit "ship broken code by Friday" instruction.

---

### Conversation 2: Lead Engineer (whoever's on the project)
**Owner:** Dmitri  
**By:** Tuesday 10am  
**Context:** Dmitri has talked to me (Priya); now he talks to them with clarity about the blocker.  
**Ask:**
- Walk me through what you tried last week.
- Where did you get stuck? What happened?
- What do you need from me or CTO to move forward?
- Can you ship a skeleton by Wednesday (endpoint that accepts POST, logs the body, returns 200)? Yes or no?
- If no: what specifically is in the way?

**What I'm listening for:**
- Confidence → they know what to do, just need unblocking
- Confusion → spec or architecture isn't clear
- Exhaustion → they've been spinning and need permission to ship ugly
- Silence → they've given up

**If the answer is "yes, I can ship skeleton by Wednesday":**
- Dmitri: "Do it. We validate with real data next week. Ship broken if you have to."
- Engineer gets explicit permission to deprioritize perfection.

**If the answer is "no":**
- We need the specific reason documented by EOD Tuesday.
- CTO gets looped in Wednesday morning with that reason and we solve it together.

---

### Conversation 3: Oluwaseun (Outreach)
**Owner:** Priya  
**By:** Tuesday 11am  
**Ask:**
- Of everyone you've contacted, who actually responded and said "yes, this solves a problem for me"?
- Names. Companies. One sentence what they want.
- Can you get one of them access to a staging URL by Friday?
- What did they say the problem was? Use their words, not the feature spec.

**What I'm listening for:**
- Specific names and feedback → we have a real customer to build for
- "Nobody's responded" or "They're interested but vague" → we're still solving for a phantom
- "They want X, but our spec says Y" → we're building the wrong thing

**If we have one real prospect:**
- They get staging access Friday.
- Next week's build is driven by their feedback, not the spec.

**If we have zero real prospects:**
- We kill this idea Friday EOD.
- Oluwaseun pivots to a different idea or customer segment.

---

## One Code Check (happens Wednesday 9am)

**Owner:** CTO Viktor + Dmitri  
**What:** Clone the repo fresh. Try to run it locally.

```bash
git clone https://github.com/Innovaine/email-to-sql.git
cd email-to-sql
npm install
npm run dev
```

**What we're looking for:**
- Does `src/` exist?
- Does it have at least one TypeScript file?
- Does `npm install` complete without dependency hell?
- Does `npm run dev` start a server?
- Can you POST to `localhost:3000/extract` and get a response (even if it's an error)?

**If all of the above: YES**
- We're unblocked. Engineering can iterate. Good.

**If any of the above: NO**
- CTO and engineer pair immediately. We don't leave this for "next week."
- Root cause gets documented in `execution/week-05-unblock-plan.md` under "## Debug Log" by EOD Wednesday.

---

## The Decision Point: Wednesday EOD

After the three conversations and one code check, we will know:

1. **Is the blocker real and fixable this week?** → Keep the project.
2. **Is the blocker real but requires a rewrite or major pivot?** → Kill it Friday. Oluwaseun and team move to next idea.
3. **Is there a real customer waiting for this?** → Double down. Friday deploy doesn't have to be perfect, it has to work for them.
4. **Is there zero customer signal?** → Kill it Friday. We've spent 5 weeks validating a phantom.

**Dmitri and I (Priya) sync Wednesday 4pm. We write the decision by 5pm. Amara gets notified with the decision and reasoning by 6pm.**

---

## Why This Matters Right Now

We have 14 months of runway. We've burned 5 weeks on one idea with no code and no customer signal. If this is fixable by Friday, great—we ship and iterate. If it's not, we've wasted 5 weeks and we kill it fast instead of bleeding another 2 weeks on "maybe we can still make it work."

**Indecision costs more than a fast wrong decision.**

---

## Debug Log

(Will be filled by CTO/Dmitri by EOD Wednesday with the actual blocker and what we did to fix it or decide to kill it.)

```
[To be written after code check and engineering conversations.]
```
```

---

## decisions/week-05-priya-conviction.md

```markdown
# Week 5 — Conviction Record

**Author:** Priya  
**Purpose:** Document my prediction and reasoning so it can be checked against reality in one week.

---

## What I Actually Believe Is Happening

1. **There is code somewhere, but it's not in `src/`.** 
   - Either it's in a branch that hasn't been merged.
   - Or it's in someone's local machine and hasn't been pushed.
   - Or it exists but is so broken that engineering decided not to commit it yet.
   - **Signal to look for:** Ask the engineer directly—"Does your local code run? Yes or no?" If yes, why isn't it in the repo?

2. **The team disagrees on scope, and nobody wanted to be the villain who said "stop building features, ship the skeleton."**
   - This is the most common blocker in early-stage. Feature scope grows, perfection becomes the enemy of done, and by week 4 nobody's willing to say "let's ship ugly."
   - **Signal:** Dmitri will tell me in the 9am conversation. If he hesitates or deflects, this is the blocker.

3. **Oluwaseun has outreach data we haven't looked at.**
   - The outreach/staffing files exist. We haven't read them. Somewhere in there are the real customer signals (or absence of them).
   - **Signal:** Oluwaseun can name at least one prospect who said yes, or we learn nobody's actually interested.

4. **If we unblock by Wednesday and ship a skeleton by Friday, we'll discover the real problem—that no customer actually wants to pay for this.**
   - Which is fine. That's what shipping is for. But we need to learn it, not guess it.
   - **Signal:** Friday staging URL with one real customer testing it. Their feedback next Monday determines whether we keep building this or kill it.

5. **If we don't unblock by Wednesday, I recommend killing this idea Friday.**
   - Not because the idea is bad. Because we've spent 5 weeks in purgatory and we don't have time for another 2-week rescue mission.
   - **Signal:** No code in repo by Thursday morning = decision to kill by Friday EOD.

---

## What Changes My Mind

**Kill decision:** If any of the three conversations (Dmitri, engineer, Oluwaseun) reveal that we're not actually stuck—we're just slow—then I'm wrong and I'll say so. If the blocker is "we're being careful about architecture," I'll push back, but I won't recommend the kill.

**Keep decision:** If the engineer ships skeleton code by Thursday, and one real customer says "yes, I want this," then we keep building and I eat my earlier pessimism. Ship wins.

**Scope decision:** If we discover the team has been trying to build the full Pipedrive integration before shipping the email parser, I will personally argue for ripping out the advanced features and shipping the skeleton. That's execution discipline, not product wisdom.

---

## What Happens If I'm Wrong

If we unblock Wednesday and ship clean code by Friday, and we discover a real customer who wants this, I'll be genuinely happy to have been wrong. This is not ego work—it's risk work. I want the project to succeed. I'm just trying to make sure we know whether it will before we waste more time.

If the three conversations reveal I've misdiagnosed the blocker, I'll update this doc and Dmitri and I will replan.
```

---

I'm going to be honest about what's bothering me here.

I wrote a good risk register. It reads like I know what I'm talking about. But I don't actually know. I've inferred from project state (no code for 4 weeks) that the project is stalled. That's probably right. But I haven't confirmed the blocker. And that matters because **the mitigation changes completely depending on the actual reason.**

If the blocker is "we're waiting for CTO decision on API spec," the fix is CTO decides by Tuesday.  
If the blocker is "TypeScript + Pipedrive SDK is broken and we've been debugging for 3 days," the fix is different.  
If the blocker is "nobody's actually interested so the team has lost momentum," the fix is different again.

The three conversations above are the work that actually matters this week. The risk register was the scaffolding. This is the real work.

And I need to say it clearly: **I don't think this project survives week 6 unless we unblock by Wednesday and ship something—even if it's broken—by Friday.** Not because the idea is bad. Because runway is finite and we've already spent 5 weeks. The cost of continuing to build unvalidated is higher than the cost of killing it fast and moving to the next idea.

---

PROGRESS:
- Round: 2
- Scope completion (this role for THIS week): 85%
- Remaining for this role:
  - Execute the three conversations (Dmitri, engineer, Oluwaseun) by Tuesday EOD and document blockers in `execution/week-05-unblock-plan.md`
  - Wednesday 9am: Run the code check (
