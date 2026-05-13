/**
 * Test Fixtures: Real-world forwarded emails for testing
 * 
 * These fixtures represent actual forwarded emails that sales teams
 * would send to the webhook. Each has known expected extraction results.
 */

export const FIXTURES = {
  /**
   * High-confidence fixture: Clear, well-structured forward with all key fields
   * Expected extraction:
   * - company_name: "Acme Corporation"
   * - contact_email: "sarah@acmecorp.com"
   * - budget: "$50-100K per year"
   * - timeline: "Q3 2026"
   * - confidence: >= 0.85 (very clear)
   */
  highConfidenceForward: `
From: sales-alice@oursaas.com
To: sales-team@oursaas.com
Subject: Fwd: Acme Corp inquiry - Budget confirmed

Team, this is a hot lead. Acme Corp is ready to move. Budget and timeline are clear.
This one looks solid for closing in Q3.

---------- Forwarded message ---------
From: Sarah Chen <sarah@acmecorp.com>
Date: Mon, 13 May 2026 09:00:00 +0000
Subject: Budget for new sales tools?
To: sales@oursaas.com

Hi,

We're evaluating sales automation tools for our sales team of 12.
Our budget is $50-100K per year, and we're looking to implement in Q3 2026.

Can you send pricing and book a call?

Thanks,
Sarah Chen
Sales Director
Acme Corporation
sarah@acmecorp.com
(555) 123-4567
  `,

  /**
   * Medium-confidence fixture: Some fields clear, some ambiguous
   * Expected extraction:
   * - company_name: "TechStartup Inc." (mentioned in forward and email)
   * - contact_email: "bob@techstartup.io"
   * - budget: mentioned but vague ("looking to invest" rather than explicit number)
   * - timeline: mentioned but relative ("soon", "next month")
   * - confidence: 0.65-0.75 (moderate; needs human review)
   */
  mediumConfidenceForward: `
From: sales-bob@oursaas.com
To: sales-team@oursaas.com
Subject: Fwd: TechStartup Inc. - Initial inquiry

Hi,

TechStartup reached out. They seem interested but I'm not 100% sure on
budget and timeline. Can someone follow up?

---------- Forwarded message ---------
From: Bob Martinez <bob@techstartup.io>
Date: Mon, 13 May 2026 11:30:00 +0000
Subject: CRM solution inquiry
To: sales@oursaas.com

Hi,

We're TechStartup Inc., a SaaS company. We're looking to upgrade our sales
process soon. We're interested in learning more about your solution.

Looking to invest in a solid platform for our team.

Let me know next steps.

Bob
  `,

  /**
   * Low-confidence fixture: Minimal context, unclear details
   * Expected extraction:
   * - company_name: possibly empty or guessed
   * - contact_email: empty or ambiguous
   * - budget: not mentioned
   * - timeline: not mentioned
   * - confidence: < 0.60 (should be flagged for manual review)
   */
  lowConfidenceForward: `
From: sales-carol@oursaas.com
To: sales-team@oursaas.com
Subject: Fwd: Inquiry

Got this email. Thoughts?

---------- Forwarded message ---------
From: Unknown Sender <unknown@domain.com>
Date: Mon, 13 May 2026 02:15:00 +0000
Subject: Hello

Hi,

Can we discuss? 

Thanks
  `,

  /**
   * Complex nested forward: Forward of a forward (real-world pattern)
   * Expected extraction:
   * - Should extract from innermost email (original customer inquiry)
   * - company_name: "BigCorp Industries"
   * - contact_email: "director@bigcorp.com"
   * - budget: "$250K+"
   * - timeline: "immediate / asap"
   * - confidence: 0.80+ (clear inner message, but nested structure adds complexity)
   */
  nestedForward: `
From: sales-dave@oursaas.com
To: ceo@oursaas.com
Subject: Fwd: URGENT - Big opportunity at BigCorp

This is huge. Look at this.

---------- Forwarded message ---------
From: sales-team-lead@oursaas.com
Date: Mon, 13 May 2026 14:00:00 +0000
Subject: Fwd: Enterprise inquiry - BigCorp Industries

FYI, forwarding up. This could be our biggest deal yet.

---------- Forwarded message ---------
From: Chief Procurement Officer <director@bigcorp.com>
Date: Mon, 13 May 2026 13:45:00 +0000
Subject: Enterprise sales solution - RFP response needed
To: sales@oursaas.com

Hello,

BigCorp Industries is looking for an enterprise-grade CRM solution.

We're ready to move immediately. Budget: $250K+ for year 1, plus
implementation and training.

We need a response to our RFP by end of week.

Regards,
Chief Procurement Officer
BigCorp Industries
director@bigcorp.com
  `,

  /**
   * Email with quoted text (common Gmail/Outlook format)
   * Expected extraction:
   * - Should parse around quoted sections
   * - company_name: "QuoteStart LLC"
   * - contact_email: "contact@quotestart.com"
   * - budget, timeline: should be extracted from new context, not quotes
   */
  withQuotedText: `
From: sales-eva@oursaas.com
To: sales-team@oursaas.com
Subject: Fwd: QuoteStart LLC - Solid prospect

This came in today. Check it out.

---------- Forwarded message ---------
From: Contact Person <contact@quotestart.com>
Date: Mon, 13 May 2026 10:15:00 +0000
Subject: Re: CRM Demo
To: sales@oursaas.com

Hi,

Great demo yesterday. QuoteStart LLC is definitely interested.

We're a growing SaaS with 30 employees. Budget for tools is $40-60K yearly.
Looking to implement by end of Q2 2026.

Next step: can you send a proposal?

On Mon, May 13, 2026 at 9:00 AM you wrote:
> Thanks for booking the demo. We're excited to show you our platform
> designed for fast-growing SaaS companies. Looking forward to tomorrow!
  `,

  /**
   * Email with attachments mentioned (text only; real attachments would be separate)
   * Expected extraction:
   * - company_name: "TechRX Corp"
   * - contact_email: "procurement@techrx.com"
   * - Should ignore "See attached" references since we can't parse attachment content
   */
  withAttachmentMention: `
From: sales-frank@oursaas.com
To: sales-team@oursaas.com
Subject: Fwd: TechRX Corp - needs feature list

Prospect wants features + pricing.

---------- Forwarded message ---------
From: Procurement <procurement@techrx.com>
Date: Mon, 13 May 2026 16:30:00 +0000
Subject: Feature list and pricing request
To: sales@oursaas.com

Hi,

TechRX Corp is evaluating CRM solutions. We're a healthcare tech company
with 40 sales professionals.

Can you send:
1. Feature comparison vs. Salesforce
2. Pricing for 40 seats
3. Implementation timeline

See attached for our RFP document.

Budget: $100-150K annually.

Thanks,
Procurement Team
procurement@techrx.com
  `,

  /**
   * Malformed/broken email (should fail gracefully)
   * Expected: status='failed', error message in response
   */
  malformedEmail: `
This is not even close to an email format.
Just some random text that got sent to the webhook.
No From, To, Subject, or body structure.
  `,

  /**
   * Email with excessive quoted history (25+ lines of previous conversation)
   * Expected extraction:
   * - Should extract from first few lines of actual content
   * - company_name, contact_email: should be from new message, not buried in quotes
   */
  longQuotedHistory: `
From: final-prospect@startup.io
To: sales@oursaas.com
Subject: RE: RE: RE: CRM solution for startup

Yes, we're very interested. Our budget is $30K/year and we want to start in Q3.

On Mon, 13 May 2026 at 3:30 PM you wrote:
> Thanks for the update. What's your timeline?
>
> On Mon, 13 May 2026 at 2:00 PM you wrote:
> > Great questions. Let me address each one...
> >
> > On Mon, 13 May 2026 at 1:00 PM you wrote:
> > > Is this solution suitable for small teams?
> > >
> > > On Mon, 13 May 2026 at 12:00 PM you wrote:
> > > > We're very impressed with your demo. Our startup is 15 people.
> > > > We need CRM, sales coaching, and forecasting.
> > > >
> > > > Regards,
> > > > Final Prospect <final-prospect@startup.io>
  `,
};

/**
 * Expected extraction results for each fixture
 * Used by tests to validate correctness of extraction
 */
export const EXPECTATIONS = {
  highConfidenceForward: {
    shouldHaveStatus: 'success',
    minConfidence: 0.85,
    expectedCompany: 'Acme Corporation',
    expectedEmail: 'sarah@acmecorp.com',
    shouldMentionBudget: '$50',
    shouldMentionTimeline: 'Q3',
  },

  mediumConfidenceForward: {
    shouldHaveStatus: 'review', // Ambiguous enough to warrant review
    minConfidence: 0.50,
    maxConfidence: 0.75,
    expectedCompany: 'TechStartup',
    expectedEmail: 'bob@techstartup.io',
  },

  lowConfidenceForward: {
    shouldHaveStatus: 'review',
    maxConfidence: 0.60,
    // Other fields may be empty or incorrect
  },

  nestedForward: {
    shouldHaveStatus: 'success',
    minConfidence: 0.75,
    expectedCompany: 'BigCorp',
    expectedEmail: 'director@bigcorp.com',
    shouldMentionBudget: '$250',
  },

  withQuotedText: {
    shouldHaveStatus: 'success',
    minConfidence: 0.75,
    expectedCompany: 'QuoteStart',
    expectedEmail: 'contact@quotestart.com',
    shouldMentionTimeline: 'Q2',
  },

  withAttachmentMention: {
    shouldHaveStatus: 'success',
    minConfidence: 0.70,
    expectedCompany: 'TechRX',
    expectedEmail: 'procurement@techrx.com',
    shouldMentionBudget: '$100',
  },

  malformedEmail: {
    shouldHaveStatus: 'failed',
    shouldHaveError: true,
  },

  longQuotedHistory: {
    shouldHaveStatus: 'success',
    minConfidence: 0.70,
    expectedCompany: 'startup', // Vague but in the email
    expectedEmail: 'final-prospect@startup.io',
    shouldMentionBudget: '$30',
  },
};
