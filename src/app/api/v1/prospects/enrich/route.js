import { NextResponse } from "next/server";
import { EnrichmentService } from "@/lib/services/enrichmentService";
import { ApiKeyService } from "@/lib/services/apiKeyService";

export async function POST(request) {
  const auth = ApiKeyService.validateRequest(request);
  if (!auth.isValid) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { prospect_id, prospect_ids, requested_fields } = body;

    // Batch enrichment
    if (Array.isArray(prospect_ids) && prospect_ids.length > 0) {
      const batchResult = EnrichmentService.batchEnrich(prospect_ids);
      return NextResponse.json(batchResult);
    }

    // Single prospect enrichment
    if (!prospect_id) {
      return NextResponse.json(
        { success: false, error: "Missing required parameter 'prospect_id' (or 'prospect_ids' array)." },
        { status: 400 }
      );
    }

    const result = EnrichmentService.enrichProspect(prospect_id, requested_fields);
    if (!result.success) {
      return NextResponse.json(result, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

