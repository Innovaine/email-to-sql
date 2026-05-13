/**
 * Express webhook server: accept forwarded emails, extract data, sync to Pipedrive
 * 
 * ASSUMPTION: API key auth via X-API-Key header (simple bearer token for v1)
 * ASSUMPTION: Webhook accepts raw email text as request body (Content-Type: text/plain)
 * ASSUMPTION: All responses are JSON
 */

import express, { Request, Response, NextFunction } from 'express';
import { API_KEY, PORT, validateConfig, EXTRACTION_STORE, generateExtractionId } from './config';
import { extractFromEmail, ExtractionResult } from './extraction';
import { syncToPipedrive } from './pipedrive';

const app = express();

// Middleware: parse raw text bodies
app.use(express.text({ type: 'text/plain', limit: '10mb' }));
app.use(express.json());

// Middleware: API key authentication
const apiKeyAuth = (req: Request, res: Response, next: NextFunction): void => {
  const providedKey = req.headers['x-api-key'] as string;

  // Allow dashboard without auth (GET /dashboard)
  if (req.path === '/dashboard' && req.method === 'GET') {
    next();
    return;
  }

  // Require API key for webhook and other endpoints
  if (!providedKey || providedKey !== API_KEY) {
    res.status(401).json({
      error: 'Unauthorized: missing or invalid X-API-Key header',
    });
    return;
  }

  next();
};

app.use(apiKeyAuth);

/**
 * POST /webhook/email
 * 
 * Accept a forwarded email, extract structured data, optionally sync to Pipedrive
 * 
 * Request: raw email text in body, Content-Type: text/plain
 * Response: JSON with extraction result + Pipedrive sync status
 */
app.post('/webhook/email', async (req: Request, res: Response): Promise<void> => {
  const emailText = req.body;

  if (!emailText || typeof emailText !== 'string') {
    res.status(400).json({
      error: 'Request body must be raw email text (Content-Type: text/plain)',
    });
    return;
  }

  console.log(`\n📩 Webhook received email (${emailText.length} bytes)`);

  // Step 1: Extract from email
  const extraction = extractFromEmail(emailText);
  const extractionId = generateExtractionId();
  extraction.id = extractionId;

  // Step 2: Store extraction in memory
  EXTRACTION_STORE.set(extractionId, extraction);

  // Step 3: If high confidence, sync to Pipedrive
  let pipedriveSync: { success: boolean; error?: string; contactId?: number; dealId?: number } = { success: false, error: 'Not attempted' };
  if (extraction.status === 'success') {
    console.log(`✅ Extraction confidence ${extraction.extracted.confidence.toFixed(2)} >= 0.75; attempting Pipedrive sync`);

    const extracted = extraction.extracted;
    if (!extracted.contact_email) {
      pipedriveSync = { success: false, error: 'No valid contact email; cannot sync' };
    } else {
      pipedriveSync = await syncToPipedrive(
        extracted.contact_name || extracted.contact_email.split('@')[0],
        extracted.contact_email,
        extracted.company_name,
        extracted.budget,
        extracted.timeline
      );
    }
  } else {
    console.log(`⏳ Extraction confidence ${extraction.extracted.confidence.toFixed(2)} < 0.75; queued for review`);
  }

  // Step 4: Return result
  const response = {
    id: extractionId,
    status: extraction.status,
    extracted: extraction.extracted,
    pipedrive_sync: pipedriveSync,
  };

  res.json(response);
});

/**
 * GET /dashboard
 * 
 * Simple HTML dashboard showing recent extractions and sync status
 * No authentication required for v1
 */
app.get('/dashboard', (req: Request, res: Response) => {
  const extractions = Array.from(EXTRACTION_STORE.values());

  // Sort by ID (rough chronological order)
  extractions.sort((a, b) => (a.id > b.id ? -1 : 1));

  const recentExtractions = extractions.slice(0, 50); // Show last 50

  let html = `
<!DOCTYPE html>
<html>
<head>
  <title>Email-to-SQL Dashboard</title>
  <style>
    body { font-family: sans-serif; margin: 20px; background: #f5f5f5; }
    .container { max-width: 1200px; margin: 0 auto; }
    h1 { color: #333; }
    table { width: 100%; border-collapse: collapse; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background: #f8f8f8; font-weight: bold; }
    tr:hover { background: #fafafa; }
    .status-success { color: green; font-weight: bold; }
    .status-review { color: orange; font-weight: bold; }
    .status-failed { color: red; font-weight: bold; }
    .confidence { display: inline-block; width: 100px; height: 20px; background: #f0f0f0; border-radius: 3px; overflow: hidden; }
    .confidence-fill { height: 100%; background: linear-gradient(to right, #ff6b6b, #ffd93d, #6bcf7f); }
    .metrics { display: flex; gap: 20px; margin-bottom: 20px; }
    .metric { padding: 15px; background: white; border-radius: 5px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .metric-value { font-size: 24px; font-weight: bold; }
    .metric-label { color: #999; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>📧 Email-to-SQL Dashboard</h1>
    
    <div class="metrics">
      <div class="metric">
        <div class="metric-value">${extractions.length}</div>
        <div class="metric-label">Total Extractions</div>
      </div>
      <div class="metric">
        <div class="metric-value">${extractions.filter((e) => e.status === 'success').length}</div>
        <div class="metric-label">Auto-Synced</div>
      </div>
      <div class="metric">
        <div class="metric-value">${extractions.filter((e) => e.status === 'review').length}</div>
        <div class="metric-label">Awaiting Review</div>
      </div>
      <div class="metric">
        <div class="metric-value">${(
          extractions.reduce((sum, e) => sum + e.extracted.confidence, 0) / Math.max(extractions.length, 1)
        ).toFixed(2)}</div>
        <div class="metric-label">Avg Confidence</div>
      </div>
    </div>

    ${
      extractions.length === 0
        ? '<p><em>No extractions yet. Send an email to the webhook to get started.</em></p>'
        : `
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Company</th>
          <th>Contact Email</th>
          <th>Budget</th>
          <th>Timeline</th>
          <th>Confidence</th>
        </tr>
      </thead>
      <tbody>
        ${recentExtractions
          .map(
            (ext) => `
        <tr>
          <td><code>${ext.id}</code></td>
          <td><span class="status-${ext.status}">${ext.status.toUpperCase()}</span></td>
          <td>${ext.extracted.company_name || '—'}</td>
          <td>${ext.extracted.contact_email || '—'}</td>
          <td>${ext.extracted.budget || '—'}</td>
          <td>${ext.extracted.timeline || '—'}</td>
          <td>
            <div class="confidence">
              <div class="confidence-fill" style="width: ${(ext.extracted.confidence * 100).toFixed(0)}%"></div>
            </div>
            ${(ext.extracted.confidence * 100).toFixed(0)}%
          </td>
        </tr>
        `
          )
          .join('')}
      </tbody>
    </table>
    `
    }

    <hr style="margin-top: 40px; border: none; border-top: 1px solid #ddd;" />
    <p style="color: #999; font-size: 12px;">Email-to-SQL v0.1.0 | Powered by Pipedrive API</p>
  </div>
</body>
</html>
  `;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

/**
 * GET /health
 * 
 * Health check endpoint (no auth required)
 */
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    version: '0.1.0',
    uptime: process.uptime(),
    extractions: EXTRACTION_STORE.size,
  });
});

/**
 * Error handler
 */
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('❌ Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

/**
 * Start server
 */
async function start() {
  validateConfig();

  app.listen(PORT, () => {
    console.log(`\n✅ Email-to-SQL webhook listening on http://localhost:${PORT}`);
    console.log(`   POST /webhook/email  — submit forwarded email`);
    console.log(`   GET  /dashboard      — view extraction status`);
    console.log(`   GET  /health         — health check\n`);
  });
}

start().catch(console.error);
