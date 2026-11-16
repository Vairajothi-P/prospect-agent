import { NextResponse } from "next/server";
import { AiScribeService } from "@/lib/services/aiScribeService";
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
      product_name,
      value_proposition,
      sender_name,
      sender_title,
      tone
    } = body;

    if (!prospect_id) {
      return NextResponse.json(
        { success: false, error: "Missing required parameter 'prospect_id'." },
        { status: 400 }
      );
    }

    const result = await AiScribeService.generatePitch(prospect_id, {
      productName: product_name,
      valueProp: value_proposition,
      senderName: sender_name,
      senderTitle: sender_title,
      tone
    });

    if (!result.success) {
      return NextResponse.json(result, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

