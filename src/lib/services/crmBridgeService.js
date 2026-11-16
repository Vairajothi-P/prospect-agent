import { ProspectService } from "./prospectService.js";

// In-memory CRM database simulator representing your existing CRM's leads table
export const CRM_SIMULATED_DATABASE = [
  {
    crmRecordId: "crm_lead_001",
    email: "existing.client@acme.com",
    fullName: "Arthur Pendelton",
    company: "Acme Corp",
    status: "Customer"
  }
];

export class CrmBridgeService {
  /**
   * Push a prospect into CRM as a Lead or Contact
   */
  static pushToCrm(params) {
    const {
      prospectId,
      prospectData,
      targetEntity = "Lead", // "Lead" | "Contact"
      assignedOwner = "Unassigned (Round Robin)",
      deduplicationStrategy = "skip_if_exists", // "skip_if_exists" | "update_existing" | "force_create"
      webhookUrl = null
    } = params;

    let prospect = null;
    if (prospectId) {
      prospect = ProspectService.getRawProspectById(prospectId);
    } else if (prospectData) {
      prospect = prospectData;
    }

    if (!prospect) {
      return {
        success: false,
        error: "Prospect not found or no prospect data provided."
      };
    }

    const email = prospect.contact?.workEmail || prospect.email;
    const phone = prospect.contact?.phone || prospect.phone;
    const fullName = prospect.fullName || `${prospect.firstName} ${prospect.lastName}`;
    const companyName = prospect.company?.name || prospect.companyName || "Unknown Company";

    // Deduplication Check
    const existingIndex = CRM_SIMULATED_DATABASE.findIndex(
      record => record.email && email && record.email.toLowerCase() === email.toLowerCase()
    );

    let syncResult = {};

    if (existingIndex !== -1 && deduplicationStrategy === "skip_if_exists") {
      const existing = CRM_SIMULATED_DATABASE[existingIndex];
      return {
        success: true,
        action: "skipped_duplicate",
        message: `Prospect already exists in CRM with ID ${existing.crmRecordId} (${existing.email}). No duplicate record created.`,
        crmRecordId: existing.crmRecordId,
        existingRecord: existing
      };
    }

    if (existingIndex !== -1 && deduplicationStrategy === "update_existing") {
      const existing = CRM_SIMULATED_DATABASE[existingIndex];
      existing.fullName = fullName;
      existing.title = prospect.title;
      existing.phone = phone;
      existing.updatedAt = new Date().toISOString();

      syncResult = {
        success: true,
        action: "updated_existing",
        message: `Updated existing CRM record ${existing.crmRecordId}.`,
        crmRecordId: existing.crmRecordId,
        record: existing
      };
    } else {
      // Create new Lead/Contact record
      const newRecordId = `crm_${targetEntity.toLowerCase()}_${Date.now().toString().slice(-6)}`;
      const newRecord = {
        crmRecordId: newRecordId,
        entityType: targetEntity,
        fullName,
        firstName: prospect.firstName,
        lastName: prospect.lastName,
        title: prospect.title,
        company: companyName,
        email,
        phone,
        leadSource: "Prospecting Hub API",
        signalsSummary: prospect.signals?.map(s => s.title).join("; ") || "Direct Search",
        assignedOwner,
        createdAt: new Date().toISOString()
      };

      CRM_SIMULATED_DATABASE.push(newRecord);

      // Update in-memory prospect store if prospectId was passed
      if (prospectId && prospect.crmStatus) {
        prospect.crmStatus.isSynced = true;
        prospect.crmStatus.syncedLeadId = newRecordId;
        prospect.crmStatus.syncedAt = new Date().toISOString();
      }

      syncResult = {
        success: true,
        action: "created",
        message: `Successfully created new ${targetEntity} in CRM.`,
        crmRecordId: newRecordId,
        record: newRecord
      };
    }

    // Optional Webhook Trigger
    if (webhookUrl) {
      this.dispatchWebhook(webhookUrl, {
        event: "prospect.crm_synced",
        timestamp: new Date().toISOString(),
        payload: syncResult
      }).catch(err => console.error("Webhook dispatch failed:", err));
    }

    return syncResult;
  }

  /**
   * Retrieve list of leads currently in the CRM
   */
  static getCrmRecords() {
    return {
      success: true,
      total: CRM_SIMULATED_DATABASE.length,
      records: CRM_SIMULATED_DATABASE
    };
  }

  /**
   * Asynchronous Webhook Dispatcher
   */
  static async dispatchWebhook(url, payload) {
    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      console.warn(`Webhook failed to ${url}: ${e.message}`);
    }
  }
}
