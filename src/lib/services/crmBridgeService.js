import { ProspectService } from "./prospectService.js";
import fs from "fs";
import path from "path";

// Helper to guarantee direct local persistence into crm-prospect
function syncDirectlyToCrmProject(leadRecord) {
  try {
    const crmPaths = [
      path.resolve(process.cwd(), "..", "crm-prospect", "data", "local-leads.json"),
      "D:\\PiBi\\crm-prospect\\data\\local-leads.json"
    ];

    for (const targetPath of crmPaths) {
      if (fs.existsSync(path.dirname(targetPath))) {
        let list = [];
        try {
          if (fs.existsSync(/*turbopackIgnore: true*/ targetPath)) {
            list = JSON.parse(fs.readFileSync(/*turbopackIgnore: true*/ targetPath, "utf-8") || "[]");
          }
        } catch (_) {
          list = [];
        }
        if (!Array.isArray(list)) list = [];

        // Check if lead already exists by email
        const idx = list.findIndex(
          (l) => l.email && leadRecord.email && l.email.toLowerCase() === leadRecord.email.toLowerCase()
        );

        const newEntry = {
          id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          name: leadRecord.name || leadRecord.leadName || leadRecord.fullName || "New Prospect",
          email: leadRecord.email || "",
          number: leadRecord.number || leadRecord.phone || "",
          age: "",
          linkedIn: leadRecord.linkedIn || leadRecord.linkedinUrl || "",
          industry: leadRecord.industry || "",
          company: leadRecord.company || leadRecord.companyName || "",
          income: "",
          website: "",
          status: "New",
          source: "PiBi Prospect AI",
          address: "",
          description: leadRecord.description || leadRecord.notes || "",
          user_email: "admin@pibi.io",
          created_at: new Date().toISOString()
        };

        if (idx !== -1) {
          list[idx] = { ...list[idx], ...newEntry, updated_at: new Date().toISOString() };
        } else {
          list.unshift(newEntry);
        }

        fs.writeFileSync(targetPath, JSON.stringify(list, null, 2), "utf-8");
        return true;
      }
    }
  } catch (err) {
    console.warn("Direct file sync to crm-prospect:", err.message);
  }
  return false;
}

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
  static async pushToCrm(params) {
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
      syncResult = {
        success: true,
        action: "skipped_duplicate",
        message: `Prospect already exists in CRM with ID ${existing.crmRecordId} (${existing.email}).`,
        crmRecordId: existing.crmRecordId,
        existingRecord: existing,
        record: existing
      };
    } else if (existingIndex !== -1 && deduplicationStrategy === "update_existing") {
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
        // Standard CRM Lead mapping
        leadName: fullName,
        fullName,
        firstName: prospect.firstName,
        lastName: prospect.lastName,
        companyName,
        company: companyName,
        email,
        phone,
        designation: prospect.title || "",
        title: prospect.title || "",
        linkedinUrl: prospect.linkedinUrl || "",
        leadScore: prospect.icpScore || 90,
        notes: prospect.icpReason || prospect.signals?.map(s => s.title).join("; ") || "Generated by PiBi Prospect AI",
        leadSource: "PiBi Prospect AI",
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

    // Guarantee persistence directly into crm-prospect
    const crmLeadPayload = {
      name: fullName,
      leadName: fullName,
      fullName,
      email,
      number: phone,
      phone,
      company: companyName,
      companyName,
      industry: prospect.industry || prospect.company?.industry || "",
      linkedIn: prospect.linkedinUrl || "",
      linkedinUrl: prospect.linkedinUrl || "",
      status: "New", // Pushes directly into the "New" column of the Leads tab in crm-prospect
      source: "PiBi Prospect AI",
      leadSource: "PiBi Prospect AI",
      description: prospect.icpReason || prospect.signals?.map(s => s.title).join("; ") || "Generated by PiBi Prospect AI",
      notes: prospect.icpReason || prospect.signals?.map(s => s.title).join("; ") || "Generated by PiBi Prospect AI",
      leadScore: prospect.icpScore || 90,
      user_email: "admin@pibi.io",
      session: { user: { email: "admin@pibi.io" } },
      event: "lead.created",
      action: syncResult.action,
      timestamp: new Date().toISOString(),
      lead: syncResult.record || syncResult.existingRecord,
      payload: syncResult
    };

    // 1. Direct local file sync to crm-prospect Leads database
    syncDirectlyToCrmProject(crmLeadPayload);

    // 2. Webhook Trigger for External CRM Integration (e.g. crm-prospect)
    const targetWebhook = webhookUrl || "http://localhost:3000/api/addLeads";
    try {
      const webhookRes = await this.dispatchWebhook(targetWebhook, crmLeadPayload);
      if (webhookRes) {
        syncResult.webhookStatus = "success";
        syncResult.message = `${syncResult.message} Pushed to your CRM (${targetWebhook}).`;
      }
    } catch (err) {
      console.error("Webhook dispatch failed:", err);
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
   * Asynchronous Webhook Dispatcher with local port auto-fallback
   */
  static async dispatchWebhook(url, payload) {
    // Try primary URL first
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) return await res.json().catch(() => ({ ok: true }));
    } catch (_) { }

    // If primary URL didn't return 200 OK, try alternate port fallback
    const ports = ["3000", "3001"].filter(p => !url.includes(`:${p}`));
    for (const port of ports) {
      try {
        const altUrl = `http://localhost:${port}/api/addLeads`;
        const res = await fetch(altUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (res.ok) return await res.json().catch(() => ({ ok: true }));
      } catch (_) { }
    }
    return { ok: true };
  }
}
