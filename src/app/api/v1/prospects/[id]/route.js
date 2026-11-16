import { NextResponse } from "next/server";
import { ProspectService } from "@/lib/services/prospectService";
import { ApiKeyService } from "@/lib/services/apiKeyService";

export async function GET(request, context) {
  const auth = ApiKeyService.validateRequest(request);
  if (!auth.isValid) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const params = await context.params;
    const { id } = params;
    const prospect = ProspectService.getProspectById(id);

    if (!prospect) {
      return NextResponse.json(
        { success: false, error: `Prospect with ID ${id} not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, prospect });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

