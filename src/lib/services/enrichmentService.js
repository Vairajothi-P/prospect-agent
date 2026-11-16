import { ProspectService } from "./prospectService.js";

export class EnrichmentService {
  /**
   * Run waterfall verification on a single prospect
   */
  static enrichProspect(prospectId, requestedFields = ["work_email", "phone"]) {
    const rawProspect = ProspectService.getRawProspectById(prospectId);
    if (!rawProspect) {
      return { success: false, error: `Prospect with ID ${prospectId} not found.` };
    }

    // Simulate waterfall verification latency steps
    const waterfallSteps = [
      {
        step: 1,
        provider: "Primary B2B Graph Registry",
        target: "work_email",
        status: "matched",
        detail: `Found candidate pattern ${rawProspect.contact.workEmail}`
      },
      {
        step: 2,
        provider: "MX & SMTP Live Verification Handshake",
        target: "work_email",
        status: "verified",
        detail: `SMTP port 25 replied 250 OK. Deliverability score: ${rawProspect.contact.deliverabilityScore}%`
      },
      {
        step: 3,
        provider: "Telco Carrier & Line-Type Lookup",
        target: "direct_phone",
        status: "valid",
        detail: `Carrier confirmed active cellular line for ${rawProspect.contact.phoneType}`
      }
    ];

    // Mark as unlocked in the persistent store
    rawProspect.contact.isUnlocked = true;

    return {
      success: true,
      data: {
        prospectId: rawProspect.id,
        fullName: rawProspect.fullName,
        title: rawProspect.title,
        company: rawProspect.company.name,
        contact: {
          workEmail: {
            email: rawProspect.contact.workEmail,
            status: rawProspect.contact.emailStatus,
            deliverabilityScore: rawProspect.contact.deliverabilityScore,
            verificationProtocol: "SMTP_HANDSHAKE_250_OK"
          },
          directPhone: {
            number: rawProspect.contact.phone,
            type: rawProspect.contact.phoneType,
            status: rawProspect.contact.phoneStatus
          },
          socialProfiles: {
            linkedin: rawProspect.linkedinUrl
          }
        },
        waterfallAudit: waterfallSteps,
        enrichedAt: new Date().toISOString()
      }
    };
  }

  /**
   * Batch enrich multiple prospects ("Unlock All" feature)
   */
  static batchEnrich(prospectIds = []) {
    const results = [];
    const errors = [];

    for (const id of prospectIds) {
      const res = this.enrichProspect(id);
      if (res.success) {
        results.push(res.data);
      } else {
        errors.push({ id, error: res.error });
      }
    }

    return {
      success: true,
      totalRequested: prospectIds.length,
      totalEnriched: results.length,
      results,
      errors
    };
  }
}
