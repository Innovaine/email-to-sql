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

  // Try to find forwarded message boundary (Gmail/Outlook pattern)
  // IMPORTANT: For nested forwards, find the INNERMOST forward (last occurrence)
  const forwardMatches = [];
  const forwardRegex = /------+\s*Forwarded\s+message/gi;
  let match;
  while ((match = forwardRegex.exec(emailText)) !== null) {
    forwardMatches.push(match.index);
  }
  
  // If multiple forwards found, use the LAST one (innermost/original customer email)
  const forwardedIndex = forwardMatches.length > 0 ? forwardMatches[forwardMatches.length - 1] : -1;
  const messageBody = forwardedIndex !== -1 ? emailText.substring(forwardedIndex) : emailText;

  // Extract email addresses and names from forwarded message body first
  // (This is the customer's email, not the sales person forwarding)
  const fromMatch = messageBody.match(/From:\s*(.+?)(?:\n|$)/i);
  const fromEmail = extractEmailAddress(fromMatch ? fromMatch[1] : '');
  const fromName = extractPersonName(fromMatch ? fromMatch[1] : '');
  
  const subjectMatch = messageBody.match(/Subject:\s*(.+?)(?:\n|$)/i);
  const subject = subjectMatch ? subjectMatch[1].trim() : '';

  // Extract company name (check signature + full body)
  const company = extractCompanyName(messageBody, subject);

  // Extract budget mention
  const budget = extractBudget(messageBody);

  // Extract timeline mention
  const timeline = extractTimeline(messageBody);

  // Contact email: prefer From header in forwarded message, scan body as fallback
  const bodyEmail = extractEmailAddress(messageBody);
  const contactEmail = fromEmail || bodyEmail;
  
  // Contact name: prefer From header, scan body/signature as fallback
  const bodyName = extractPersonName(messageBody);
  const contactName = fromName || bodyName;

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

  // Pattern 1: "Full Name <email@domain>" (most reliable)
  const angleMatch = text.match(/([A-Z][A-Za-z]+(?:\s+[A-Z][A-Za-z]+)+)\s*<[^>]+>/);
  if (angleMatch) return angleMatch[1].trim();

  // Pattern 2: Name in signature block (before title or company)
  // Looks for capitalized name followed by title or company on next line
  const sigNameMatch = text.match(/\n([A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s*\n(?:Sales|Director|Manager|CEO|CTO|CFO|VP|President|Head|Lead|Officer|[A-Z][a-z]+\s+(?:Director|Manager))/);
  if (sigNameMatch) return sigNameMatch[1].trim();

  // Pattern 3: "Best,\nName" or "Thanks,\nName" (common email closing)
  const closingMatch = text.match(/(Best|Thanks|Regards|Sincerely)[,\n]\s*([A-Z][A-Za-z]+(?:\s+[A-Z][A-Za-z]+)?)/i);
  if (closingMatch) return closingMatch[2].trim();

  // Pattern 4: Name alone on a line near end of email (likely signature)
  const lines = text.split('\n').reverse(); // Start from bottom
  for (let i = 0; i < Math.min(10, lines.length); i++) {
    const line = lines[i].trim();
    const nameOnlyMatch = line.match(/^([A-Z][a-z]+\s+[A-Z][a-z]+)$/);
    if (nameOnlyMatch && line.length < 40) { // Avoid matching long sentences
      return nameOnlyMatch[1];
    }
  }

  return null;
}

/**
 * Extract company name from email content
 * Heuristics: Signature blocks, "Company Inc.", "at [Company]", "[Company] is...", From header
 */
function extractCompanyName(text: string, subject: string): string | null {
  if (!text) return null;

  const fullText = `${subject} ${text}`;

  // Pattern 1: Company name in signature block (multi-line pattern)
  // Looks for company name following a title or person name near end of email
  const sigMatch = text.match(/(?:Director|Manager|CEO|CTO|CFO|VP|President|Head|Lead|Officer|Coordinator|Specialist)[^\n]*\n\s*([A-Z][A-Za-z0-9\s&]+(?:Inc|Corp|Corporation|LLC|Ltd|Co|Inc\.|Corp\.|Ltd\.))/i);
  if (sigMatch) return sigMatch[1].trim();

  // Pattern 2: Company name with suffix alone on line (typical signature format)
  const suffixMatch = text.match(/^([A-Z][A-Za-z0-9\s&]+(?:Inc|Corp|Corporation|LLC|Ltd|Co|Inc\.|Corp\.|Ltd\.))$/m);
  if (suffixMatch) return suffixMatch[1].trim();

  // Pattern 3: "at [Company]" or "from [Company]"
  const atMatch = fullText.match(/(?:at|from|with)\s+([A-Z][A-Za-z0-9\s&]+(?:Inc|Corp|Corporation|LLC|Ltd|Co))/i);
  if (atMatch) return atMatch[1].trim();

  // Pattern 4: "[Company] is|has|was|reached" or "[Company] team"
  const isMatch = fullText.match(/\b([A-Z][A-Za-z0-9\s&]+(?:Inc|Corp|Corporation|LLC|Ltd|Co)?)\s+(?:is|has|was|reached|team|company|sales|looking)\b/i);
  if (isMatch) {
    const candidate = isMatch[1].trim();
    // Filter out common false positives and overly generic phrases
    const blacklist = ['We', 'Our', 'The', 'This', 'That', 'a SaaS', 'a startup', 'SaaS'];
    const isBlacklisted = blacklist.some(word => candidate.toLowerCase().includes(word.toLowerCase()));
    if (!isBlacklisted && candidate.length > 2) {
      return candidate;
    }
  }

  // Pattern 5: Company in "From:" header line (e.g., "From: Name <email@company.com>")
  // Extract domain and capitalize it as fallback
  const fromMatch = text.match(/From:\s*[^<]*<[^@]+@([a-zA-Z0-9-]+)\./i);
  if (fromMatch) {
    const domain = fromMatch[1];
    // Capitalize first letter as company name guess
    return domain.charAt(0).toUpperCase() + domain.slice(1);
  }

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
 * 
 * UPDATED: Lowered scoring to avoid false high-confidence results
 * - Threshold for auto-sync is 0.75, so we need to be conservative
 * - Missing any key field should significantly lower confidence
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

  // Base score from field presence (lowered from previous values)
  if (factors.hasCompany) score += 0.12;
  if (factors.hasEmail) score += 0.18;
  if (factors.hasName) score += 0.08;
  if (factors.hasBudget) score += 0.18;
  if (factors.hasTimeline) score += 0.18;

  // Email validity check: critical for CRM sync
  if (!factors.emailValidity) score -= 0.15;

  // Content quality bonus (reduced from 0.10 to 0.08)
  score += factors.contentQuality * 0.08;

  // Clamp to [0, 1]
  return Math.max(0, Math.min(1, score));
}
