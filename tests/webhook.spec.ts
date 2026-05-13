import { test, expect } from '@playwright/test';

/**
 * Test: Webhook receives forwarded email and extracts structured data
 * 
 * User flow:
 * 1. Sales person forwards customer email to webhook endpoint
 * 2. Webhook accepts the email and returns 200 + extraction result
 * 3. Extracted data includes company name, contact email, budget/timeline mention
 * 4. Confidence score indicates if extraction is high-quality
 * 
 * Success criteria:
 * - HTTP 200 response
 * - Response body contains "extracted" field with structured data
 * - Confidence score present and >= 0 (0–1.0 scale)
 */

test('webhook accepts forwarded email and extracts structured data', async ({ request }) => {
  // Sample forwarded email that a sales person would receive
  // Real-world example: Gmail forward, includes original sender context
  const forwardedEmail = `
From: sarah@acmecorp.com <sarah@acmecorp.com>
To: sales@oursaas.com
Subject: Fwd: Budget for new sales tools?
Date: Mon, 13 May 2026 09:15:00 +0000

Hi team,

Check out this inquiry from Acme Corp. They're looking for sales automation.
Timeline is Q3. Budget mentioned: $50-100K/year. Let me know what you think.

---------- Forwarded message ---------
From: Sarah Chen <sarah@acmecorp.com>
Date: Mon, 13 May 2026 08:45:00 +0000
Subject: Budget for new sales tools?
To: <sales@oursaas.com>

Hi,

We're evaluating sales automation tools for our team of 12. Looking to
implement in Q3 2026. Our budget is around $50-100K per year.

Can you send over a pricing sheet?

Thanks,
Sarah Chen
Sales Director
Acme Corporation
sarah@acmecorp.com
(555) 123-4567
  `;

  // POST the forwarded email to the webhook endpoint
  // Expected: API key auth via X-API-Key header (per Mehdi's spec)
  const apiKey = process.env.EMAIL_TO_SQL_API_KEY || 'dev-key-12345';
  
  const response = await request.post('http://localhost:5000/webhook/email', {
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'text/plain',
    },
    data: forwardedEmail,
  });

  // Assertion 1: Server accepts the email
  expect(response.status()).toBe(200);

  // Assertion 2: Response body is valid JSON with expected structure
  const body = await response.json();
  expect(body).toHaveProperty('id'); // Unique email record ID
  expect(body).toHaveProperty('status'); // 'success' or 'review' or 'failed'
  expect(body).toHaveProperty('extracted'); // Structured extraction result

  // Assertion 3: Extracted fields match the email content
  const extracted = body.extracted;
  expect(extracted).toHaveProperty('company_name');
  expect(extracted).toHaveProperty('contact_email');
  expect(extracted).toHaveProperty('budget');
  expect(extracted).toHaveProperty('timeline');
  expect(extracted).toHaveProperty('confidence'); // 0.0 to 1.0

  // Assertion 4: Extracted values are reasonable
  expect(extracted.company_name).toContain('Acme'); // Should extract "Acme Corporation" or "Acme"
  expect(extracted.contact_email).toBe('sarah@acmecorp.com'); // Exact match
  expect(extracted.budget).toContain('50'); // Should mention $50-100K
  expect(extracted.timeline).toContain('Q3'); // Should mention Q3 2026
  expect(extracted.confidence).toBeGreaterThanOrEqual(0);
  expect(extracted.confidence).toBeLessThanOrEqual(1);

  // Assertion 5: If confidence is high (>= 0.75), status should be 'success'
  // If confidence is low (< 0.75), status should be 'review' (manual review queue)
  if (extracted.confidence >= 0.75) {
    expect(body.status).toBe('success');
  } else {
    expect(body.status).toBe('review');
  }
});

/**
 * Test: Webhook rejects requests without valid API key
 * 
 * Security requirement: only authorized callers (customers with valid API key)
 * should be able to submit emails.
 */
test('webhook rejects request without API key', async ({ request }) => {
  const email = 'From: test@example.com\nSubject: Test\n\nTest body';

  const response = await request.post('http://localhost:5000/webhook/email', {
    headers: {
      'Content-Type': 'text/plain',
    },
    data: email,
  });

  // Should reject with 401 Unauthorized or 403 Forbidden
  expect([401, 403]).toContain(response.status());
});

/**
 * Test: Webhook handles malformed email gracefully
 * 
 * Real-world scenario: user forwards a broken email chain, or plain text
 * that doesn't parse as email. System should not crash; should return
 * error response with helpful message.
 */
test('webhook handles malformed email with error response', async ({ request }) => {
  const apiKey = process.env.EMAIL_TO_SQL_API_KEY || 'dev-key-12345';
  
  // Intentionally malformed: no From/To headers
  const malformedEmail = 'This is not a valid email format at all.';

  const response = await request.post('http://localhost:5000/webhook/email', {
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'text/plain',
    },
    data: malformedEmail,
  });

  // Should return 400 Bad Request, not 500 Internal Server Error
  expect(response.status()).toBe(400);

  const body = await response.json();
  expect(body).toHaveProperty('error'); // Error message for debugging
});
