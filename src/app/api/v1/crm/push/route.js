import { NextResponse } from "next/server";
import { CrmBridgeService } from "@/lib/services/crmBridgeService";
import { ApiKeyService } from "@/lib/services/apiKeyService";

export async function POST(request) {
  const auth = ApiKeyService.validateRequest(request);
  if (!auth.isValid) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const {
      prospect_id,
      prospect,
      target_entity = "Lead",
      assigned_owner = "Unassigned",
      deduplication_strategy = "skip_if_exists",
      webhook_url
    } = body;

    if (!prospect_id && !prospect) {
      return NextResponse.json(
        { success: false, error: "Provide either 'prospect_id' or 'prospect' object in request body." },
        { status: 400 }
      );
    }

    const result = await CrmBridgeService.pushToCrm({
      prospectId: prospect_id,
      prospectData: prospect,
      targetEntity: target_entity,
      assignedOwner: assigned_owner,
      deduplicationStrategy: deduplication_strategy,
      webhookUrl: webhook_url
    });

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET(request) {
  const auth = ApiKeyService.validateRequest(request);
  if (!auth.isValid) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const records = CrmBridgeService.getCrmRecords();
    return NextResponse.json(records);
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

