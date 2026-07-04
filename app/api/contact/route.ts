import { NextResponse } from "next/server";
import { isValidTaiwanPhone } from "@/lib/validation";

interface ContactPayload {
  name?: string;
  phone?: string;
  service?: string;
  message?: string;
  botcheck?: string;
}

// Fallback endpoint used only when no Web3Forms access key is configured
// (production submits to Web3Forms directly from the browser — their free
// tier rejects server-side calls). Accepts and logs so the UX flow still
// works, but nothing is delivered.
export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  // Honeypot: bots fill hidden fields — pretend success and drop it
  if (body.botcheck) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const service = body.service?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (
    !name ||
    name.length > 100 ||
    !phone ||
    !isValidTaiwanPhone(phone) ||
    !message ||
    message.length > 2000 ||
    service.length > 100
  ) {
    return NextResponse.json(
      { ok: false, error: "validation" },
      { status: 400 },
    );
  }

  console.warn("[contact] no Web3Forms key — submission NOT delivered:", {
    name,
    phone,
    service,
  });
  return NextResponse.json({ ok: true, delivered: false });
}
