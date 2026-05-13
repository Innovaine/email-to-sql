/**
 * Pipedrive API client: create contacts and opportunities (deals)
 * 
 * ASSUMPTION: We use the Pipedrive REST API v1 (https://developers.pipedrive.com/docs/api/v1)
 * ASSUMPTION: Contact creation is idempotent by email (we check for existing before creating)
 * ASSUMPTION: Opportunity (deal) is always created new, linked to contact
 * ASSUMPTION: Custom fields are not used in v1; we stick to standard Pipedrive fields
 */

import axios, { AxiosError } from 'axios';
import { PIPEDRIVE_TOKEN, PIPEDRIVE_BASE_URL } from './config';

export interface PipedriveContact {
  id?: number;
  name: string;
  email: string | string[];
  org_id?: number; // Organization ID (company)
  phone?: string;
}

export interface PipedriveDeal {
  title: string;
  value: number; // Deal value in cents
  person_id: number; // Contact ID
  org_id?: number; // Organization ID
  status?: 'open' | 'won' | 'lost';
}

export interface PipedriveResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Create or find a contact in Pipedrive by email
 * 
 * Returns: contact ID if successful, null if failed
 */
export async function findOrCreateContact(
  name: string,
  email: string,
  company?: string
): Promise<number | null> {
  if (!PIPEDRIVE_TOKEN) {
    console.error('❌ PIPEDRIVE_API_TOKEN not configured');
    return null;
  }

  try {
    // Step 1: Search for existing contact by email
    console.log(`🔍 Searching for contact with email: ${email}`);
    const searchResponse = await axios.get<PipedriveResponse>(
      `${PIPEDRIVE_BASE_URL}/persons/find`,
      {
        params: {
          term: email,
          api_token: PIPEDRIVE_TOKEN,
        },
      }
    );

    if (searchResponse.data.success && searchResponse.data.data) {
      const contacts = Array.isArray(searchResponse.data.data)
        ? searchResponse.data.data
        : [searchResponse.data.data];

      if (contacts.length > 0) {
        console.log(`✓ Found existing contact ID: ${contacts[0].id}`);
        return contacts[0].id;
      }
    }

    // Step 2: Contact does not exist; create new one
    console.log(`➕ Creating new contact: ${name} (${email})`);
    const createResponse = await axios.post<PipedriveResponse>(
      `${PIPEDRIVE_BASE_URL}/persons`,
      {
        name,
        email,
      },
      {
        params: {
          api_token: PIPEDRIVE_TOKEN,
        },
      }
    );

    if (createResponse.data.success && createResponse.data.data) {
      const contactId = createResponse.data.data.id;
      console.log(`✓ Created contact ID: ${contactId}`);
      return contactId;
    } else {
      console.error(`❌ Failed to create contact: ${createResponse.data.error}`);
      return null;
    }
  } catch (err) {
    const axiosErr = err as AxiosError;
    console.error(`❌ Contact operation failed:`, axiosErr.message);
    if (axiosErr.response) {
      console.error(`Response status: ${axiosErr.response.status}`);
      console.error(`Response data:`, axiosErr.response.data);
    }
    return null;
  }
}

/**
 * Create an organization (company) in Pipedrive
 * 
 * Returns: org ID if successful, null if failed
 * 
 * ASSUMPTION: We create org only if it doesn't exist
 */
export async function findOrCreateOrganization(companyName: string): Promise<number | null> {
  if (!PIPEDRIVE_TOKEN) {
    console.error('❌ PIPEDRIVE_API_TOKEN not configured');
    return null;
  }

  try {
    // Search for existing org by name
    console.log(`🔍 Searching for organization: ${companyName}`);
    const searchResponse = await axios.get<PipedriveResponse>(
      `${PIPEDRIVE_BASE_URL}/organizations/find`,
      {
        params: {
          term: companyName,
          api_token: PIPEDRIVE_TOKEN,
        },
      }
    );

    if (searchResponse.data.success && searchResponse.data.data) {
      const orgs = Array.isArray(searchResponse.data.data)
        ? searchResponse.data.data
        : [searchResponse.data.data];

      if (orgs.length > 0) {
        console.log(`✓ Found existing organization ID: ${orgs[0].id}`);
        return orgs[0].id;
      }
    }

    // Create new org
    console.log(`➕ Creating new organization: ${companyName}`);
    const createResponse = await axios.post<PipedriveResponse>(
      `${PIPEDRIVE_BASE_URL}/organizations`,
      {
        name: companyName,
      },
      {
        params: {
          api_token: PIPEDRIVE_TOKEN,
        },
      }
    );

    if (createResponse.data.success && createResponse.data.data) {
      const orgId = createResponse.data.data.id;
      console.log(`✓ Created organization ID: ${orgId}`);
      return orgId;
    } else {
      console.error(`❌ Failed to create organization: ${createResponse.data.error}`);
      return null;
    }
  } catch (err) {
    const axiosErr = err as AxiosError;
    console.error(`❌ Organization operation failed:`, axiosErr.message);
    return null;
  }
}

/**
 * Create a deal (opportunity) in Pipedrive
 * 
 * ASSUMPTION: Deal value is parsed from budget string (e.g., "$50K" -> 50000 cents)
 * ASSUMPTION: Deal is always in 'open' status initially
 */
export async function createDeal(
  title: string,
  personId: number,
  budgetString?: string,
  orgId?: number
): Promise<number | null> {
  if (!PIPEDRIVE_TOKEN) {
    console.error('❌ PIPEDRIVE_API_TOKEN not configured');
    return null;
  }

  try {
    // Parse budget from string like "$50K" -> 50000
    let dealValue = 0;
    if (budgetString && typeof budgetString === 'string') {
      dealValue = parseBudgetToValue(budgetString);
    }

    console.log(`➕ Creating deal: "${title}" for person ID ${personId}, value: $${dealValue}`);

    const dealPayload: any = {
      title,
      person_id: personId,
      status: 'open',
    };

    if (dealValue > 0) {
      dealValue = dealValue * 100; // Pipedrive wants value in cents
      dealPayload.value = dealValue;
    }

    if (orgId) {
      dealPayload.org_id = orgId;
    }

    const createResponse = await axios.post<PipedriveResponse>(
      `${PIPEDRIVE_BASE_URL}/deals`,
      dealPayload,
      {
        params: {
          api_token: PIPEDRIVE_TOKEN,
        },
      }
    );

    if (createResponse.data.success && createResponse.data.data) {
      const dealId = createResponse.data.data.id;
      console.log(`✓ Created deal ID: ${dealId}`);
      return dealId;
    } else {
      console.error(`❌ Failed to create deal: ${createResponse.data.error}`);
      return null;
    }
  } catch (err) {
    const axiosErr = err as AxiosError;
    console.error(`❌ Deal creation failed:`, axiosErr.message);
    return null;
  }
}

/**
 * Parse budget string to numeric value
 * Examples: "$50K" -> 50000, "$100-150K" -> 100000, "$50-100K/year" -> 50000
 * 
 * ASSUMPTION: We use the lower bound of a range as the deal value
 */
function parseBudgetToValue(budgetString: string): number {
  if (!budgetString) return 0;

  // Remove common suffixes
  const cleaned = budgetString
    .replace(/\/.*/, '') // Remove "/year", "/month", etc.
    .replace(/[^\d\-.,]/g, ' ') // Keep only digits, hyphen, dot, comma
    .trim();

  // Extract first number (handles both "$50K" -> "50" and "$100-150K" -> "100")
  const match = cleaned.match(/(\d+)/);
  if (match) {
    const value = parseInt(match[1], 10);
    // If the original string had "K", multiply by 1000
    if (/k/i.test(budgetString)) {
      return value * 1000;
    }
    return value;
  }

  return 0;
}

/**
 * End-to-end sync: extract data -> create contact -> create deal
 */
export async function syncToPipedrive(
  contactName: string,
  contactEmail: string,
  companyName: string | null | undefined,
  budget: string | null | undefined,
  timeline: string | null | undefined
): Promise<{ success: boolean; contactId?: number; dealId?: number; error?: string }> {
  try {
    // Step 1: Create organization
    let orgId: number | null = null;
    if (companyName && typeof companyName === 'string') {
      orgId = await findOrCreateOrganization(companyName);
    }

    // Step 2: Create contact
    const contactId = await findOrCreateContact(contactName, contactEmail);
    if (!contactId) {
      return { success: false, error: 'Failed to create/find contact' };
    }

    // Step 3: Create deal
    const dealTitle = companyName ? `${companyName} - Opportunity` : 'Sales Opportunity';
    const dealId = await createDeal(dealTitle, contactId, budget, orgId || undefined);

    if (!dealId) {
      return {
        success: false,
        contactId,
        error: 'Contact created but deal creation failed',
      };
    }

    console.log(`✅ Full sync successful: contact=${contactId}, deal=${dealId}`);
    return { success: true, contactId, dealId };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: message };
  }
}
