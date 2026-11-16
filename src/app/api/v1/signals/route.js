import { NextResponse } from "next/server";
import { SignalService } from "@/lib/services/signalService";
import { ApiKeyService } from "@/lib/services/apiKeyService";

export async function GET(request) {
  const auth = ApiKeyService.validateRequest(request);
  if (!auth.isValid) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const weight = searchParams.get("weight");
    const company_id = searchParams.get("company_id");
    const limit = searchParams.get("limit");

    const result = SignalService.getSignals({
      type,
      weight,
      company_id,
      limit
    });

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

