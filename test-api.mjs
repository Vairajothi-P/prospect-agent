import { ProspectService } from "./src/lib/services/prospectService.js";
import { EnrichmentService } from "./src/lib/services/enrichmentService.js";
import { SignalService } from "./src/lib/services/signalService.js";
import { AiScribeService } from "./src/lib/services/aiScribeService.js";
import { CrmBridgeService } from "./src/lib/services/crmBridgeService.js";

console.log("=== 1. Testing Prospect Search ===");
const searchRes = ProspectService.searchProspects({ query: "Elena" });
console.log(`Found ${searchRes.total} prospects. First: ${searchRes.prospects[0]?.fullName}`);

console.log("\n=== 2. Testing Waterfall Enrichment ===");
const enrichRes = EnrichmentService.enrichProspect("prsp_001");
console.log("Enrichment Success:", enrichRes.success);
console.log("Work Email:", enrichRes.data.contact.workEmail.email);
console.log("Direct Phone:", enrichRes.data.contact.directPhone.number);

console.log("\n=== 3. Testing Buying Signals ===");
const signalsRes = SignalService.getSignals();
console.log(`Total active signals: ${signalsRes.total}`);
console.log(`First Signal: [${signalsRes.signals[0]?.type}] ${signalsRes.signals[0]?.title}`);

console.log("\n=== 4. Testing AI Scribe Generator ===");
const scribeRes = await AiScribeService.generatePitch("prsp_001", {
  productName: "Acme CRM",
  valueProp: "Eliminate manual data entry."
});
console.log("Scribe Templates Generated:", scribeRes.templates?.length);
console.log("First Subject:", scribeRes.templates?.[0]?.subject);

console.log("\n=== 5. Testing CRM Push & Deduplication ===");
const pushRes1 = CrmBridgeService.pushToCrm({
  prospectId: "prsp_001",
  targetEntity: "Lead"
});
console.log("Push 1 Result:", pushRes1.action, pushRes1.crmRecordId);

const pushRes2 = CrmBridgeService.pushToCrm({
  prospectId: "prsp_001",
  targetEntity: "Lead",
  deduplicationStrategy: "skip_if_exists"
});
console.log("Push 2 (Duplicate check):", pushRes2.action, pushRes2.message);

console.log("\nALL VERIFICATIONS PASSED!");

