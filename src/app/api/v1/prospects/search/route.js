import { NextResponse } from "next/server";
import { ProspectService } from "@/lib/services/prospectService";
import { ApiKeyService } from "@/lib/services/apiKeyService";

export async function POST(request) {
  const auth = ApiKeyService.validateRequest(request);
  if (!auth.isValid) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const results = ProspectService.searchProspects(body);
    return NextResponse.json({ success: true, ...results });
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
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";
    const titles = searchParams.get("job_titles") ? searchParams.get("job_titles").split(",") : [];
    const seniority = searchParams.get("seniority") ? searchParams.get("seniority").split(",") : [];
    const industries = searchParams.get("industries") ? searchParams.get("industries").split(",") : [];
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "100", 10);

    const results = ProspectService.searchProspects({
      query,
      job_titles: titles,
      seniority,
      industries,
      page,
      limit
    });

    return NextResponse.json({ success: true, ...results });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

