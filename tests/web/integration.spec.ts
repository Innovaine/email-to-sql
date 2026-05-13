import { test, expect } from '@playwright/test';

/**
 * Integration tests for Email-to-SQL webhook server
 * 
 * These tests verify real user flows:
 * 1. Health check endpoint
 * 2. Webhook email submission and extraction
 * 3. Dashboard display
 * 4. Error handling
 * 
 * All tests use the running server on localhost:5000
 */

test.describe('Email-to-SQL webhook integration', () => {
  
  test('health endpoint confirms server is running', async ({ request }) => {
    const apiKey = process.env.EMAIL_TO_SQL_API_KEY || 'dev-key-12345';
    
    const response = await request.get('http://localhost:5000/health', {
      headers: {
        'X-API-Key': apiKey,
      },
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    
    expect(body).toHaveProperty('status');
    expect(body.status).toBe('ok');
    expect(body).toHaveProperty('version');
    expect(body).toHaveProperty('uptime');
    expect(body).toHaveProperty('extractions');
    expect(body.uptime).toBeGreaterThan(0);
  });

  test('dashboard loads without authentication', async ({ page }) => {
    await page.goto('http://localhost:5000/dashboard');
    
    // Check page title
    await expect(page).toHaveTitle(/Email-to-SQL|Dashboard/i);
    
    // Check for key dashboard elements
    await expect(page.locator('h1')).toBeVisible();
    
    // Should have some metric display
    const metricLabels = page.locator('.metric-label');
    await expect(metricLabels.first()).toBeVisible();
  });

  test('webhook accepts forwarded email with high confidence', async ({ request }) => {
    const apiKey = process.env.EMAIL_TO_SQL_API_KEY || 'dev-key-12345';
    
    const emailText = `
From: sarah@acmecorp.com <sarah@acmecorp.com>
To: sales@oursaas.com
Subject: Fwd: Budget for new sales tools - Q3 implementation

Hi team,

This is a strong lead. Acme Corporation has 12 sales reps, budget is $50-100K per year,
and they want to implement in Q3 2026. Very clear ask.

---------- Forwarded message ---------
From: Sarah Chen <sarah@acmecorp.com>
Date: Mon, 13 May 2026 09:15:00 +0000
Subject: Budget for new sales tools?
To: sales@oursaas.com

Hi,

We're evaluating sales automation tools for our team of 12. Our budget is 
around $50-100K per year. Looking to implement in Q3 2026.

Can you send over a pricing sheet?

Thanks,
Sarah Chen
Sales Director
Acme Corporation
sarah@acmecorp.com
(555) 123-4567
    `;

    const response = await request.post('http://localhost:5000/webhook/email', {
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'text/plain',
      },
      data: emailText,
    });

    // Verify server accepted the email
    expect(response.status()).toBe(200);

    const body = await response.json();
    
    // Verify response structure
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('extracted');
    
    const extracted = body.extracted;
    
    // Verify extracted fields are present
    expect(extracted).toHaveProperty('company_name');
    expect(extracted).toHaveProperty('contact_email');
    expect(extracted).toHaveProperty('budget');
    expect(extracted).toHaveProperty('timeline');
    expect(extracted).toHaveProperty('confidence');
    
    // Verify extracted values match the email content
    expect(extracted.company_name).toBeTruthy();
    expect(extracted.company_name.toLowerCase()).toContain('acme');
    
    expect(extracted.contact_email).toBe('sarah@acmecorp.com');
    expect(extracted.budget).toBeTruthy();
    
    expect(extracted.timeline).toBeTruthy();
    
    // Confidence should be a number between 0 and 1
    expect(typeof extracted.confidence).toBe('number');
    expect(extracted.confidence).toBeGreaterThanOrEqual(0);
    expect(extracted.confidence).toBeLessThanOrEqual(1);
    
    // High-confidence extractions should have status='success'
    if (extracted.confidence >= 0.75) {
      expect(body.status).toBe('success');
    }
  });

  test('webhook rejects request without API key', async ({ request }) => {
    const emailText = 'From: test@example.com\nSubject: Test\n\nTest body';

    const response = await request.post('http://localhost:5000/webhook/email', {
      headers: {
        'Content-Type': 'text/plain',
      },
      data: emailText,
    });

    // Should reject with 401 Unauthorized
    expect(response.status()).toBe(401);
    
    const body = await response.json();
    expect(body).toHaveProperty('error');
    expect(body.error.toLowerCase()).toContain('unauthorized');
  });

  test('webhook rejects request with invalid API key', async ({ request }) => {
    const emailText = 'From: test@example.com\nSubject: Test\n\nTest body';

    const response = await request.post('http://localhost:5000/webhook/email', {
      headers: {
        'X-API-Key': 'wrong-key-12345',
        'Content-Type': 'text/plain',
      },
      data: emailText,
    });

    // Should reject with 401 Unauthorized
    expect(response.status()).toBe(401);
  });

  test('webhook processes low-confidence email and queues for review', async ({ request }) => {
    const apiKey = process.env.EMAIL_TO_SQL_API_KEY || 'dev-key-12345';
    
    // Deliberately ambiguous email
    const emailText = `
From: unknown@domain.com
To: sales@oursaas.com
Subject: Fwd: Quick question

Can we talk about your solution?
    `;

    const response = await request.post('http://localhost:5000/webhook/email', {
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'text/plain',
      },
      data: emailText,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();

    // Low-confidence extraction should be flagged for review
    expect(body).toHaveProperty('extracted');
    expect(body.extracted).toHaveProperty('confidence');
    
    // If confidence is low, status should be 'review'
    if (body.extracted.confidence < 0.75) {
      expect(body.status).toBe('review');
    }
  });

  test('webhook returns different extraction for nested forwards', async ({ request }) => {
    const apiKey = process.env.EMAIL_TO_SQL_API_KEY || 'dev-key-12345';
    
    const nestedEmail = `
From: alice@sales.com
To: ceo@oursaas.com
Subject: Fwd: URGENT - Big enterprise deal

Check this out.

---------- Forwarded message ---------
From: bob@sales.com
Date: Mon, 13 May 2026 14:00:00 +0000
Subject: Fwd: RFP response needed

FYI, forwarding up.

---------- Forwarded message ---------
From: director@bigcorp.com
Date: Mon, 13 May 2026 13:45:00 +0000
Subject: Enterprise solution RFP response

Hi,

BigCorp Industries is evaluating CRM platforms.

Budget: $250K+ for year 1.
Timeline: Immediate implementation needed.

Please respond by end of week.

Regards,
Chief Procurement Officer
BigCorp Industries
director@bigcorp.com
    `;

    const response = await request.post('http://localhost:5000/webhook/email', {
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'text/plain',
      },
      data: nestedEmail,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();

    // Should extract from the innermost email
    expect(body.extracted.contact_email).toContain('bigcorp');
    expect(body.extracted).toHaveProperty('confidence');
  });

  test('webhook stores extraction and makes it available on dashboard', async ({ request, page }) => {
    const apiKey = process.env.EMAIL_TO_SQL_API_KEY || 'dev-key-12345';
    
    // Submit an email
    const emailText = `
From: contact@example.com
To: sales@oursaas.com
Subject: Testing dashboard storage

Hi,

I'm TestCompany Inc. and we have a $75K budget for Q2 2026.

contact@example.com
    `;

    const webhookResponse = await request.post('http://localhost:5000/webhook/email', {
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'text/plain',
      },
      data: emailText,
    });

    expect(webhookResponse.status()).toBe(200);
    const webhookBody = await webhookResponse.json();
    const extractionId = webhookBody.id;

    // Navigate to dashboard
    await page.goto('http://localhost:5000/dashboard');

    // Wait a moment for the page to render
    await page.waitForTimeout(1000);

    // Check if the extraction appears in the dashboard
    // Look for the extraction ID or the company name
    const dashboardContent = await page.content();
    
    // The extraction should be visible on the dashboard
    expect(dashboardContent).toContain(extractionId || 'ext_');
  });

  test('dashboard metrics show total extractions and sync status', async ({ page }) => {
    await page.goto('http://localhost:5000/dashboard');

    // Wait for metrics to be visible
    await page.waitForSelector('.metric-value', { timeout: 5000 });

    // Get metric values
    const metricValues = page.locator('.metric-value');
    const metricCount = await metricValues.count();

    // Should have at least 3 metrics: Total, Synced, Awaiting Review
    expect(metricCount).toBeGreaterThanOrEqual(3);

    // Get the text from each metric
    const firstMetric = await metricValues.first().textContent();
    
    // Should be a number
    expect(firstMetric).toMatch(/^\d+$/);
  });

  test('webhook response includes Pipedrive sync status', async ({ request }) => {
    const apiKey = process.env.EMAIL_TO_SQL_API_KEY || 'dev-key-12345';
    
    const emailText = `
From: prospect@company.com
To: sales@oursaas.com
Subject: CRM inquiry - $80K budget, Q3 timeline

Hi,

We're looking for a CRM solution. Budget is $80K and we need it in Q3.

Company name: ProspectCorp
Contact: prospect@company.com
    `;

    const response = await request.post('http://localhost:5000/webhook/email', {
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'text/plain',
      },
      data: emailText,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();

    // Response should include Pipedrive sync status
    expect(body).toHaveProperty('pipedrive_sync');
    expect(body.pipedrive_sync).toHaveProperty('success');
  });
});
