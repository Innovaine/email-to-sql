import dotenv from 'dotenv';

dotenv.config();

// ASSUMPTION: API_KEY is a simple bearer token; in production this would be a proper auth scheme
export const API_KEY = process.env.EMAIL_TO_SQL_API_KEY || 'dev-key-12345';

// ASSUMPTION: PIPEDRIVE_TOKEN is the API token obtained from Pipedrive account settings
export const PIPEDRIVE_TOKEN = process.env.PIPEDRIVE_API_TOKEN || '';

// ASSUMPTION: PORT defaults to 5000; can be overridden for testing
export const PORT = parseInt(process.env.PORT || '5000', 10);

// ASSUMPTION: PIPEDRIVE_BASE_URL is the standard Pipedrive API endpoint; multi-region support deferred to v2
export const PIPEDRIVE_BASE_URL = 'https://api.pipedrive.com/v1';

// In-memory store for extractions (v1 only; real db in v2)
// ASSUMPTION: We can afford to lose data on restart during POV phase
export const EXTRACTION_STORE: Map<string, any> = new Map();

// Simple in-memory ID generator
let extractionIdCounter = 1;
export function generateExtractionId(): string {
  return `ext_${extractionIdCounter++}`;
}

// Validate that critical config is present
export function validateConfig(): void {
  if (!PIPEDRIVE_TOKEN) {
    console.warn('⚠️  PIPEDRIVE_API_TOKEN not set; Pipedrive sync will fail');
  }
  console.log(`✓ Config loaded: PORT=${PORT}, API_KEY=${API_KEY.substring(0, 8)}...`);
}
