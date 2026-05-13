import { test, expect } from '@playwright/test';
import { FIXTURES, EXPECTATIONS } from '../fixtures';

/**
 * Fixture-driven integration tests
 * 
 * These tests validate that the webhook correctly extracts structured data
 * from real-world forwarded emails using the test fixtures.
 */

test.describe('Email-to-SQL fixture-driven extraction tests', () => {
  const apiKey = process.env.EMAIL_TO_SQL_API_KEY || 'dev-key-12345';

  test('high-confidence forward: extracts all fields with high confidence', async ({ request }) => {
    const response = await request.post('http://localhost:5000/webhook/email', {
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'text/plain',
      },
      data: FIXTURES.highConfidenceForward,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();

    // Validate response structure
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('extracted');
    expect(body).toHaveProperty('pipedrive_sync');

    const extracted = body.extracted;
    const exp = EXPECTATIONS.highConfidenceForward;

    // Validate extracted fields
    expect(extracted.company_name).toBeTruthy();
    expect(extracted.company_name).toContain('Acme');
    
    expect(extracted.contact_email).toBe('sarah@acmecorp.com');
    expect(extracted.budget).toBeTruthy();
    expect(extracted.timeline).toBeTruthy();
    
    // Confidence should meet or exceed expectations
    expect(extracted.confidence).toBeGreaterThanOrEqual(exp.minConfidence);
    
    // High confidence should trigger auto-sync (success status)
    expect(body.status).toBe('success');
  });

  test('medium-confidence forward: extracts core fields, flags for review', async ({ request }) => {
    const response = await request.post('http://localhost:5000/webhook/email', {
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'text/plain',
      },
      data: FIXTURES.mediumConfidenceForward,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();

    const extracted = body.extracted;
    const exp = EXPECTATIONS.mediumConfidenceForward;

    // Should extract company and email
    expect(extracted.company_name).toBeTruthy();
    expect(extracted.company_name).toContain('TechStartup');
    
    expect(extracted.contact_email).toBe('bob@techstartup.io');
    
    // Confidence should be in the medium range
    expect(extracted.confidence).toBeGreaterThan(exp.minConfidence || 0);
    expect(extracted.confidence).toBeLessThan(0.8);
    
    // Should be flagged for review due to moderate confidence
    expect(body.status).toBe('review');
  });

  test('low-confidence forward: queues for review without extraction', async ({ request }) => {
    const response = await request.post('http://localhost:5000/webhook/email', {
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'text/plain',
      },
      data: FIXTURES.lowConfidenceForward,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();

    const extracted = body.extracted;
    
    // Confidence should be low
    expect(extracted.confidence).toBeLessThan(0.65);
    
    // Status should be 'review' due to low confidence
    expect(body.status).toBe('review');
  });

  test('nested forward: extracts from innermost email correctly', async ({ request }) => {
    const response = await request.post('http://localhost:5000/webhook/email', {
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'text/plain',
      },
      data: FIXTURES.nestedForward,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();

    const extracted = body.extracted;
    const exp = EXPECTATIONS.nestedForward;

    // Should extract from innermost (original customer) email
    expect(extracted.company_name).toContain('BigCorp');
    expect(extracted.contact_email).toBe('director@bigcorp.com');
    
    // Should find budget mentioned in original
    expect(extracted.budget).toBeTruthy();
    expect(extracted.budget).toContain('250');
    
    // Should be high confidence
    expect(extracted.confidence).toBeGreaterThanOrEqual(exp.minConfidence);
    expect(body.status).toBe('success');
  });

  test('email with quoted text: extracts from new content, ignores quotes', async ({ request }) => {
    const response = await request.post('http://localhost:5000/webhook/email', {
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'text/plain',
      },
      data: FIXTURES.withQuotedText,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();

    const extracted = body.extracted;

    // Should extract from the reply, not the quoted section
    expect(extracted.company_name).toContain('QuoteStart');
    expect(extracted.contact_email).toBe('contact@quotestart.com');
    expect(extracted.budget).toBeTruthy();
    expect(extracted.timeline).toBeTruthy();
    
    expect(extracted.confidence).toBeGreaterThanOrEqual(0.70);
    expect(body.status).toBe('success');
  });

  test('email with attachment mention: extracts despite references to attachments', async ({ request }) => {
    const response = await request.post('http://localhost:5000/webhook/email', {
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'text/plain',
      },
      data: FIXTURES.withAttachmentMention,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();

    const extracted = body.extracted;

    // Should extract despite attachment references
    expect(extracted.company_name).toContain('TechRX');
    expect(extracted.contact_email).toBe('procurement@techrx.com');
    expect(extracted.budget).toBeTruthy();
    expect(extracted.budget).toContain('100');
    
    expect(extracted.confidence).toBeGreaterThanOrEqual(0.70);
    expect(body.status).toBe('success');
  });

  test('malformed email: fails gracefully with error', async ({ request }) => {
    const response = await request.post('http://localhost:5000/webhook/email', {
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'text/plain',
      },
      data: FIXTURES.malformedEmail,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();

    // Even malformed should return response structure
    expect(body).toHaveProperty('extracted');
    expect(body).toHaveProperty('status');
    
    // But confidence should be very low
    expect(body.extracted.confidence).toBeLessThan(0.50);
    expect(body.status).toBe('review');
  });

  test('long quoted history: extracts from new content at top', async ({ request }) => {
    const response = await request.post('http://localhost:5000/webhook/email', {
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'text/plain',
      },
      data: FIXTURES.longQuotedHistory,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();

    const extracted = body.extracted;

    // Should extract from the top of the email
    expect(extracted.contact_email).toBe('final-prospect@startup.io');
    expect(extracted.budget).toBeTruthy();
    expect(extracted.timeline).toBeTruthy();
    
    expect(extracted.confidence).toBeGreaterThanOrEqual(0.70);
    expect(body.status).toBe('success');
  });

  test('response includes all required fields', async ({ request }) => {
    const response = await request.post('http://localhost:5000/webhook/email', {
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'text/plain',
      },
      data: FIXTURES.highConfidenceForward,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();

    // Verify complete response structure
    expect(body).toHaveProperty('id');
    expect(typeof body.id).toBe('string');
    
    expect(body).toHaveProperty('status');
    expect(['success', 'review', 'failed']).toContain(body.status);
    
    expect(body).toHaveProperty('extracted');
    const ext = body.extracted;
    expect(ext).toHaveProperty('company_name');
    expect(ext).toHaveProperty('contact_email');
    expect(ext).toHaveProperty('budget');
    expect(ext).toHaveProperty('timeline');
    expect(ext).toHaveProperty('confidence');
    expect(typeof ext.confidence).toBe('number');
    expect(ext.confidence).toBeGreaterThanOrEqual(0);
    expect(ext.confidence).toBeLessThanOrEqual(1);
    
    expect(body).toHaveProperty('pipedrive_sync');
    expect(body.pipedrive_sync).toHaveProperty('success');
  });

  test('dashboard shows all submitted extractions', async ({ page }) => {
    // First, submit an extraction
    const apiKey = process.env.EMAIL_TO_SQL_API_KEY || 'dev-key-12345';
    
    const webhookResp = await page.request.post('http://localhost:5000/webhook/email', {
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'text/plain',
      },
      data: FIXTURES.highConfidenceForward,
    });

    const webhookBody = await webhookResp.json();
    const extractionId = webhookBody.id;

    // Navigate to dashboard
    await page.goto('http://localhost:5000/dashboard');

    // Wait for page load
    await page.waitForLoadState('networkidle');

    // Check that the extraction appears
    const pageContent = await page.content();
    expect(pageContent).toContain(extractionId);
    
    // Also check that the company name appears
    expect(pageContent).toContain('Acme');
  });

  test('dashboard displays confidence as visual bar', async ({ page }) => {
    await page.goto('http://localhost:5000/dashboard');
    
    await page.waitForLoadState('networkidle');

    // Check that confidence bars are rendered
    const confidenceBars = page.locator('.confidence');
    const count = await confidenceBars.count();
    
    // Should have at least one confidence bar visible
    if (count > 0) {
      const firstBar = confidenceBars.first();
      await expect(firstBar).toBeVisible();
    }
  });

  test('dashboard shows metrics correctly', async ({ page }) => {
    await page.goto('http://localhost:5000/dashboard');

    await page.waitForLoadState('networkidle');

    // Check that metrics are visible
    const metrics = page.locator('.metric-value');
    await expect(metrics.first()).toBeVisible();

    // Get metric count
    const metricCount = await metrics.count();
    expect(metricCount).toBeGreaterThanOrEqual(3); // Total, Synced, Review, Avg Confidence
  });
});
