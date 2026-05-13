# HR staffing plan: "Email-to-SQL: Automated customer data extraction for SaaS sales teams"

- **By:** Zara (HR)
- **Cycle:** 1
- **Saved:** 13/05/2026, 8:05:29 AM

---

# TEAM PLAN: Email-to-SQL

**Structure:** Extend the Product Engineering team (the only team that exists right now).

**Roles needed:**

1. **1 Full-stack engineer** — owns webhook ingestion, LLM prompt for structured extraction, Pipedrive API integration, and end-to-end testing. This is the core ship.
2. **1 Backend engineer** — focuses on email parsing reliability, retry logic, and error handling so we don't lose customer data mid-pipeline.
3. **1 Product manager (part-time, 50%)** — you take this. You already own hiring and onboarding; you do initial customer calls, define "done," run the 7-day shipping cycle.

**Total headcount added:** 2 FTE engineers. Both should be hired inside the next 3 days; both should land by day 5.

**Ship target:** Working Pipedrive webhook + extraction by day 14. One paying customer (any founder-led SaaS with a Pipedrive account) by day 21.

---

## CONCERNS (raised after plan delivery, as requested):

**Scope compression is correct, but the execution lock is tight.** You've narrowed to Pipedrive-only in v1, which is smart—it kills multi-CRM complexity and cuts shipping time in half. But "no pain-point extraction" means we're shipping metadata-only (company + email + budget/timeline if present), which is a narrower value prop than the pitch promised. That's fine—it's still useful and shippable—but it means our first customer won't see us as "the AI that reads sales emails"; they'll see us as "auto-contact-creation from forwards." Different positioning, smaller initial willingness-to-pay. I'd expect our first customer to be a one-off $99/month, not $299. That's survivable at our scale, but I want the team clear on what we're actually selling.

**One more constraint:** Both engineers need to be comfortable with "done is deployed, not perfect." The LLM extraction will hallucinate sometimes. The Pipedrive sync will occasionally fail. We ship a 90% solution with logging, we iterate on real failures, not hypothetical ones. If either hire is a perfectionist, they will slow us down. Prioritize scrappy judgment over CS degree polish.
