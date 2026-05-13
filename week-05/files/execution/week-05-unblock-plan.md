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
