import { NextResponse } from "next/server";
import { addToAddressBook } from "@/lib/sendpulse";
import { isRateLimited, getClientIp } from "@/lib/rateLimit";
import { isValidEmail, honeypotTripped } from "@/lib/validate";

// Backend for content/power-of-enough-notify-form.html, per
// content/forms/power-of-enough-notify-build-spec.md. Deliberately no name field, no spreadsheet
// backup, single-purpose list only, per that spec's own reasoning. Requires a
// SENDPULSE_POWER_OF_ENOUGH_LIST_ID env var — see .env.example.
export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { email, website } = body as Record<string, unknown>;

  if (honeypotTripped(website)) {
    return NextResponse.json({ ok: true });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
  }

  const addressBookId = process.env.SENDPULSE_POWER_OF_ENOUGH_LIST_ID;
  if (!addressBookId) {
    return NextResponse.json(
      { error: "This isn't connected yet. Please email hello@alwaysenoughmethod.com directly." },
      { status: 503 },
    );
  }

  try {
    await addToAddressBook({ addressBookId, email });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please email hello@alwaysenoughmethod.com directly." },
      { status: 502 },
    );
  }
}
