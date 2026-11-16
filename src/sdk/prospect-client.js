/**
 * Prospecting Hub Client SDK
 * Lightweight, zero-dependency client for integrating the Prospecting Service into your CRM.
 * 
 * Usage in your CRM Backend / Frontend:
 * ```javascript
 * import { ProspectClient } from './prospect-client';
 * 
 * const client = new ProspectClient({
 *   baseUrl: 'http://localhost:3000/api/v1',
 *   apiKey: 'phub_live_sec_9942a1b7e'
 * });
 * 
 * // 1. Search prospects
 * const results = await client.searchProspects({
 *   job_titles: ['VP of Sales', 'Director of Operations'],
 *   industries: ['Software & SaaS']
 * });
 * 
 * // 2. Enrich contact (waterfall unlock email & phone)
 * const enriched = await client.enrichProspect('prsp_001');
 * 
 * // 3. Generate AI outreach pitch (Scribe)
 * const pitch = await client.generateScribePitch('prsp_001', {
 *   product_name: 'Our CRM Product',
 *   value_proposition: 'Cuts outbound research time in half.'
 * });
 * 
 * // 4. Push to CRM
 * const crmRecord = await client.pushToCrm({
 *   prospect_id: 'prsp_001',
 *   target_entity: 'Lead'
 * });
 * ```
 */

export class ProspectClient {
  constructor({ baseUrl = "http://localhost:3000/api/v1", apiKey = "phub_live_sec_9942a1b7e" } = {}) {
    this.baseUrl = baseUrl.replace(/\/+$/, "");
    this.apiKey = apiKey;
  }

  async _request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint.startsWith("/") ? endpoint : "/" + endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
      ...options.headers
    };

    const response = await fetch(url, {
      ...options,
      headers
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg = data?.error || `Request failed with status ${response.status}`;
      const error = new Error(errorMsg);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  }

  /**
   * Search prospects with multi-attribute filtering
   */
  async searchProspects(filters = {}) {
    return this._request("/prospects/search", {
      method: "POST",
      body: JSON.stringify(filters)
    });
  }

  /**
   * Get prospect by ID
   */
  async getProspect(id) {
    return this._request(`/prospects/${id}`, {
      method: "GET"
    });
  }

  /**
   * Run waterfall contact enrichment (unlock emails & direct dials)
   */
  async enrichProspect(prospectId, requestedFields = ["work_email", "phone"]) {
    return this._request("/prospects/enrich", {
      method: "POST",
      body: JSON.stringify({
        prospect_id: prospectId,
        requested_fields: requestedFields
      })
    });
  }

  /**
   * Batch enrich multiple prospects
   */
  async batchEnrich(prospectIds) {
    return this._request("/prospects/enrich", {
      method: "POST",
      body: JSON.stringify({
        prospect_ids: prospectIds
      })
    });
  }

  /**
   * Fetch active buying signals and triggers
   */
  async getSignals(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this._request(`/signals${query ? "?" + query : ""}`, {
      method: "GET"
    });
  }

  /**
   * Generate AI personalized outreach copy (LeadIQ Scribe equivalent)
   */
  async generateScribePitch(prospectId, options = {}) {
    return this._request("/ai/scribe", {
      method: "POST",
      body: JSON.stringify({
        prospect_id: prospectId,
        ...options
      })
    });
  }

  /**
   * Push prospect into CRM with duplicate detection
   */
  async pushToCrm(options = {}) {
    return this._request("/crm/push", {
      method: "POST",
      body: JSON.stringify(options)
    });
  }

  /**
   * List CRM synced records
   */
  async getCrmRecords() {
    return this._request("/crm/push", {
      method: "GET"
    });
  }
}

