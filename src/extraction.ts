/**
 * Email extraction logic: parse forwarded emails and extract structured deal metadata
 * 
 * ASSUMPTION: We parse raw email text using regex patterns and heuristics.
 * In v2, we'd use a proper ML-based extraction service (e.g., OpenAI, custom model).
 * 
 * ASSUMPTION: Confidence score is based on:
 * - Presence of key fields (company, email, budget, timeline)
 * - Clarity/explicitness of mentions (explicit budget vs. vague "looking to invest")
 * - Email structure validity
 */

export interface ExtractionResult {
  id: string;
  status: 'success' | 'review' | 'failed';
  extracted: {
    company_name: string | null;
    contact_email: string | null;
    contact_name: string | null;
    budget: string | null;
    timeline: string | null;
    confidence: number; // 0.0 to 1.0
  };
  raw_email?: string;
  error?: string;
}

/**
 * Main extraction function: parse email text and return structured data + confidence
 */
export function extractFromEmail(emailText: string): ExtractionResult {
  // Validate that input looks like an email
  if (!emailText || emailText.trim().length < 20) {
    return {
      id: 'unknown',
      status: 'failed',
      extracted: {
        company_name: null,
        contact_email: null,
        contact_name: null,
        budget: null,
        timeline: null,
        confidence: 0,
      },
      error: 'Email text too short or empty',
    };
  }

  // Extract email headers and body
  const fromMatch = emailText.match(/From:\s*(.+?)(?:\n|$)/i);
  const fromEmail = extractEmailAddress(fromMatch ? fromMatch[1] : '');
  const fromName = extractPersonName(fromMatch ? fromMatch[1] : '');
  
  const subjectMatch = emailText.match(/Subject:\s*(.+?)(?:\n|$)/i);
  const subject = subjectMatch ? subjectMatch[1].trim() : '';

  // Try to find forwarded message boundary (Gmail/Outlook pattern)
  const forwardedIndex = emailText.search(/------+\s*Forwarded\s+message/i);
  const messageBody = forwardedIndex !== -1 ? emailText.substring(forwardedIndex) : emailText;

  // Extract company name
  const company = extractCompanyName(messageBody, subject);

  // Extract budget mention
  const budget = extractBudget(messageBody);

  // Extract timeline mention
  const timeline = extractTimeline(messageBody);

  // Contact email: prefer extracted email, fall back to from address
  const contactEmail = extractEmailAddress(messageBody) || fromEmail;
  const contactName = extractPersonName(messageBody) || fromName;

  // Calculate confidence score
  const confidence = calculateConfidence({
    hasCompany: !!company,
    hasEmail: !!contactEmail,
    hasName: !!contactName,
    hasBudget: !!budget,
    hasTimeline: !!timeline,
    emailValidity: isValidEmail(contactEmail),
    contentQuality: messageBody.length > 200 ? 1 : messageBody.length > 100 ? 0.7 : 0.3,
  });

  // Determine status based on confidence threshold (0.75 = auto-sync, < 0.75 = review)
  const status = confidence >= 0.75 ? 'success' : 'review';

  return {
    id: 'unknown', // Will be set by caller
    status,
    extracted: {
      company_name: company,
      contact_email: contactEmail,
      contact_name: contactName,
      budget,
      timeline,
      confidence,
    },
    raw_email: emailText,
  };
}

/**
 * Extract email address from text (returns first valid email found)
 */
function extractEmailAddress(text: string): string | null {
  if (!text) return null;
  // ASSUMPTION: Simple regex for common email pattern
  const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  return match ? match[0] : null;
}

/**
 * Extract person name from email header or signature
 * Pattern: "Name <email@domain>" or "Name" or signature blocks like "Name\nTitle\nCompany"
 */
function extractPersonName(text: string): string | null {
  if (!text) return null;

  // Pattern 1: "Full Name <email@domain>"
  const angleMatch = text.match(/^([A-Za-z\s]+)\s*<[^>]+>/);
  if (angleMatch) return angleMatch[1].trim();

  // Pattern 2: Line starting with capital letter at start of text (likely a name)
  const lineMatch = text.match(/^([A-Z][A-Za-z]+ [A-Z][A-Za-z]+)/m);
  if (lineMatch) return lineMatch[1].trim();

  // Pattern 3: "Best,\nName" or "Thanks,\nName"
  const signatureMatch = text.match(/(Best|Thanks|Regards|Sincerely)[,\n]\s*([A-Z][A-Za-z]+(?:\s+[A-Z][a-z]+)*)/);
  if (signatureMatch) return signatureMatch[2].trim();

  return null;
}

/**
 * Extract company name from email content
 * Heuristics: "Company Inc.", "at [Company]", "[Company] is...", capitalized proper nouns
 */
function extractCompanyName(text: string, subject: string): string | null {
  if (!text) return null;

  const fullText = `${subject} ${text}`;

  // Pattern 1: "at [Company]" or "from [Company]"
  const atMatch = fullText.match(/(?:at|from|with)\s+([A-Z][A-Za-z0-9\s&]*(?:Inc|Corp|LLC|Ltd|Co|Inc\.|Corp\.|Ltd\.))/);
  if (atMatch) return atMatch[1].trim();

  // Pattern 2: "[Company] is|has|was" or "[Company] team"
  const isMatch = fullText.match(/\b([A-Z][A-Za-z0-9\s&]*(?:Inc|Corp|LLC|Ltd|Co)?)\s+(?:is|has|was|team|company|sales|CRM|solutions?)\b/);
  if (isMatch) return isMatch[1].trim();

  // Pattern 3: Look for capitalized phrases that might be company names (at least 2 words)
  // This is more aggressive but helps with "TechStartup Inc" patterns
  const capMatch = fullText.match(/\b([A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+(?:Inc|Corp|LLC|Ltd|Co))?)\b/);
  if (capMatch) return capMatch[1].trim();

  return null;
}

/**
 * Extract budget mention from email
 * Patterns: "$XXK", "$XX,XXX", "budget: $X", "investment: $X", etc.
 */
function extractBudget(text: string): string | null {
  if (!text) return null;

  // Pattern 1: Dollar amount with K suffix "$50K" "$100K-200K"
  const kMatch = text.match(/\$[\d,]+k?\s*(?:-\s*\$?[\d,]+k?)?/i);
  if (kMatch) return kMatch[0];

  // Pattern 2: "budget is $X" or "budget of $X"
  const budgetMatch = text.match(/budget\s+(?:of|is|around)?\s*(\$[\d,]+(?:k|K)?(?:\s*[-–]\s*\$?[\d,]+(?:k|K)?)?)/i);
  if (budgetMatch) return budgetMatch[1];

  // Pattern 3: "investment of $X" or similar
  const investMatch = text.match(/(?:investment|spend|cost|price).*?(\$[\d,]+(?:k|K)?)/i);
  if (investMatch) return investMatch[1];

  return null;
}

/**
 * Extract timeline mention from email
 * Patterns: "Q2 2026", "end of June", "next month", "immediately", "asap", etc.
 */
function extractTimeline(text: string): string | null {
  if (!text) return null;

  // Pattern 1: Quarter mentions "Q1 2026", "Q2 2026", etc.
  const quarterMatch = text.match(/\b(Q[1-4]\s+\d{4}|Q[1-4](?:\s*2026|\s*2025)?)\b/i);
  if (quarterMatch) return quarterMatch[0];

  // Pattern 2: Month mentions "January 2026", "end of Q3", etc.
  const monthMatch = text.match(/\b((?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}|(?:end|start)\s+of\s+(?:Q[1-4]|[A-Za-z]+))\b/i);
  if (monthMatch) return monthMatch[0];

  // Pattern 3: Relative timeline "immediately", "soon", "next month", "ASAP"
  const relativeMatch = text.match(/\b(immediately|asap|ASAP|soon|next\s+(?:week|month|quarter)|before\s+(?:[A-Za-z]+|end\s+of)|urgent|emergency)\b/i);
  if (relativeMatch) return relativeMatch[0];

  // Pattern 4: Explicit "timeline" mention "timeline is Q3", "timeline: end of June"
  const timelineMatch = text.match(/timeline\s*(?:is|:)?\s*(.+?)(?:\.|,|$)/i);
  if (timelineMatch) {
    const candidate = timelineMatch[1].trim().substring(0, 50); // Limit to reasonable length
    if (candidate.length > 3) return candidate;
  }

  return null;
}

/**
 * Validate email address format
 */
function isValidEmail(email: string | null): boolean {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Calculate confidence score based on extraction completeness and quality
 * 
 * Scoring logic:
 * - Each key field (company, email, budget, timeline) contributes to confidence
 * - Email validity is critical (0.1 penalty if invalid)
 * - Content quality (longer = more context = higher confidence)
 */
function calculateConfidence(factors: {
  hasCompany: boolean;
  hasEmail: boolean;
  hasName: boolean;
  hasBudget: boolean;
  hasTimeline: boolean;
  emailValidity: boolean;
  contentQuality: number; // 0–1 scale
}): number {
  let score = 0;

  // Base score from field presence
  if (factors.hasCompany) score += 0.15;
  if (factors.hasEmail) score += 0.20;
  if (factors.hasName) score += 0.10;
  if (factors.hasBudget) score += 0.20;
  if (factors.hasTimeline) score += 0.20;

  // Email validity check: critical for CRM sync
  if (!factors.emailValidity) score -= 0.15;

  // Content quality bonus
  score += factors.contentQuality * 0.10;

  // Clamp to [0, 1]
  return Math.max(0, Math.min(1, score));
}
