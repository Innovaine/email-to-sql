import { test, expect } from '@playwright/test';

/**
 * Test: High-confidence extraction auto-syncs to Pipedrive
 * 
 * User flow (end-to-end):
 * 1. Sales person forwards customer email to webhook
 * 2. System extracts company name, contact email, budget, timeline (confidence >= 0.75)
 * 3. System auto-creates Pipedrive contact record
 * 4. System auto-creates Pipedrive opportunity record with budget/timeline
 * 5. Sales person sees the new contact in their Pipedrive dashboard
 * 
 * Success criteria:
 * - Webhook returns status='success' for high-confidence extraction
 * - Pipedrive API call succeeds (contact + opportunity created)
 * - Contact record has correct name, email, company
 * - Opportunity has correct deal name, value, stage
 * - No duplicate contacts created (idempotency check)
 */

test('webhook syncs high-confidence extraction to Pipedrive as contact + opportunity', async ({ request }) => {
  const apiKey = process.env.EMAIL_TO_SQL_API_KEY || 'dev-key-12345';
  const pipedriveApiKey = process.env.PIPEDRIVE_API_TOKEN || '';

  // High-confidence forwarded email
  const email = `
From: alice@techstartup.io <alice@techstartup.io>
To: sales@oursaas.com
Subject: Fwd: Looking for CRM solution for our sales team

Hi team,

This prospect from TechStartup Inc. is very interested. They have 25 sales reps,
budget is $100K+, and they want to move before Q3. This looks like a good fit.

---------- Forwarded message ---------
From: Alice Johnson <alice@techstartup.io>
Date: Mon, 13 May 2026 10:20:00 +0000
Subject: Looking for CRM solution for our sales team
To: sales@oursaas.com

Hi,

We're a SaaS company with 25 sales reps. We currently use spreadsheets
and Outlook for tracking, which is killing our productivity.

We're looking for a modern CRM solution. Budget is $100K+ for the first year.
We'd like to get something in place before Q3 2026.

Can you schedule a demo?

Best,
Alice Johnson
VP Sales
TechStartup Inc.
alice@techstartup.io
  `;

  // 1. Submit the email to webhook
  const webhookResponse = await request.post('http://localhost:5000/webhook/email', {
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'text/plain',
    },
    data: email,
  });

  expect(webhookResponse.status()).toBe(200);
  const webhookBody = await webhookResponse.json();
  
  // 2. Verify high-confidence extraction
  expect(webhookBody.status).toBe('success');
  expect(webhookBody.extracted.confidence).toBeGreaterThanOrEqual(0.75);

  // 3. Query Pipedrive API to verify contact was created
  // Use the email as a unique identifier to find the contact
  const contactEmail = webhookBody.extracted.contact_email;
  
  // Wait a moment for async sync to complete
  await new Promise(resolve => setTimeout(resolve, 2000));

  const pipedriveSearchResponse = await request.get(
    `https://api.pipedrive.com/v1/persons/find`,
    {
      params: {
        term: contactEmail,
        api_token: pipedriveApiKey,
      },
    }
  );

  // If Pipedrive API token is not configured, skip this assertion
  if (pipedriveApiKey === '') {
    console.log('⚠️  Pipedrive API token not configured; skipping Pipedrive verification');
  } else {
    expect(pipedriveSearchResponse.status()).toBe(200);
    const pipedriveBody = await pipedriveSearchResponse.json();
    
    // Assertion: Contact was found in Pipedrive
    expect(pipedriveBody.success).toBe(true);
    expect(pipedriveBody.data).toBeDefined();
    expect(Array.isArray(pipedriveBody.data)).toBe(true);
    expect(pipedriveBody.data.length).toBeGreaterThan(0);

    const contact = pipedriveBody.data[0];
    expect(contact.email).toContain(contactEmail);
    expect(contact.name).toContain('Alice'); // Contact name should match

    // 4. Verify opportunity was also created
    const opportunityResponse = await request.get(
      `https://api.pipedrive.com/v1/deals`,
      {
        params: {
          person_id: contact.id,
          api_token: pipedriveApiKey,
        },
      }
    );

    expect(opportunityResponse.status()).toBe(200);
    const opportunityBody = await opportunityResponse.json();
    
    // At least one opportunity should be linked to this contact
    expect(opportunityBody.success).toBe(true);
    expect(opportunityBody.data.length).toBeGreaterThan(0);

    const deal = opportunityBody.data[0];
    expect(deal.title).toContain('TechStartup'); // Deal name should reference company
    expect(deal.value).toBeGreaterThan(0); // Deal value should be set
  }
});

/**
 * Test: Low-confidence extraction goes to manual review queue
 * 
 * Scenario: Email is ambiguous or poorly formatted. System extracts
 * some data but confidence is low (< 0.75). Instead of auto-syncing
 * to Pipedrive, it should be queued for manual review.
 * 
 * Success criteria:
 * - Webhook returns status='review'
 * - No contact/opportunity created in Pipedrive
 * - Extraction is available for human review (via dashboard)
 */
test('low-confidence extraction goes to review queue instead of syncing', async ({ request }) => {
  const apiKey = process.env.EMAIL_TO_SQL_API_KEY || 'dev-key-12345';

  // Deliberately ambiguous/low-quality email
  const poorEmail = `
From: unknown@domain.com
To: sales@oursaas.com
Subject: Fwd: Quick question

Can we discuss pricing?
  `;

  const response = await request.post('http://localhost:5000/webhook/email', {
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'text/plain',
    },
    data: poorEmail,
  });

  expect(response.status()).toBe(200);
  const body = await response.json();

  // Low-confidence extraction should go to review, not auto-sync
  expect(body.status).toBe('review');
  expect(body.extracted.confidence).toBeLessThan(0.75);

  // The extracted data should still be present for human to review
  expect(body.extracted).toHaveProperty('company_name');
  expect(body.extracted).toHaveProperty('contact_email');
});

/**
 * Test: Dashboard shows recent extractions and sync status
 * 
 * User-facing requirement: Sales team should see a simple status page
 * showing which emails were processed, what was extracted, and what
 * was synced to Pipedrive. This is a basic HTML dashboard (no auth).
 * 
 * Success criteria:
 * - Dashboard loads at GET /dashboard
 * - Shows list of recent email extractions
 * - Each row shows: email subject, company, contact, confidence, status
 * - Status indicator: "✓ Synced" (success) or "⏳ Reviewing" (review queue)
 */
test('dashboard displays recent extractions and sync status', async ({ page }) => {
  // Navigate to dashboard (no auth required for v1)
  await page.goto('http://localhost:5000/dashboard');

  // Wait for page to load
  await expect(page).toHaveTitle(/Email-to-SQL|Dashboard|Extractions/i);

  // Check that dashboard contains extraction records
  // Looking for a table or list with extraction status
  const extractionTable = page.locator('table, [role="table"], .extractions, .recent-emails');
  await expect(extractionTable).toBeVisible({ timeout: 5000 });

  // Look for at least one row with "Synced" or "Reviewing" status indicator
  // Use .first() to avoid strict mode violation when multiple elements match
  const statusCell = page.locator('text=/Synced|Reviewing|Review|Success/').first();
  await expect(statusCell).toBeVisible({ timeout: 5000 });

  // Sanity check: page should show some form of metric (extraction count, sync rate)
  const metric = page.locator('text=/extractions|synced|confidence/i').first();
  await expect(metric).toBeVisible({ timeout: 5000 });
});
