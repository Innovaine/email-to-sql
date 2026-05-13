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