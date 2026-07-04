import { NextResponse } from "next/server";
import { isValidTaiwanPhone } from "@/lib/validation";

interface ContactPayload {
  name?: string;
  phone?: string;
  service?: string;
  message?: string;
  botcheck?: string;
}

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

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    // Placeholder mode until a Web3Forms access key is configured in Vercel:
    // acknowledge the submission so the UX flow works, but log that it was
    // not delivered anywhere.
    console.warn(
      "[contact] WEB3FORMS_ACCESS_KEY not set — submission NOT delivered:",
      { name, phone, service },
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `網站聯絡表單：${name}`,
      from_name: "華騰工程行網站",
      name,
      phone,
      service,
      message,
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }
  return NextResponse.json({ ok: true, delivered: true });
}
