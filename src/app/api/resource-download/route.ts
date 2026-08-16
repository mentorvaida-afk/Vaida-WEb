import { NextResponse } from "next/server";
import { addToAddressBook } from "@/lib/sendpulse";
import { isRateLimited, getClientIp } from "@/lib/rateLimit";
import { isValidEmail, honeypotTripped } from "@/lib/validate";

// Backend for the Resource Library "Download free" forms on /blog, per
// content/forms/resource-library-download-build-spec.md. Requires a
// SENDPULSE_RESOURCE_LIBRARY_LIST_ID env var pointing at the address book Vaida creates in her
// SendPulse account — see .env.example. Actual file delivery (the download link/attachment) is
// not wired here: that needs the real resource files and a decision on delivery mechanism
// (instant link vs. triggered email), see docs/BUILD_LOG.md.
export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { email, resource, consent, website } = body as Record<string, unknown>;

  if (honeypotTripped(website)) {
    return NextResponse.json({ ok: true });
  }

  if (!isValidEmail(email) || consent !== true) {
    return NextResponse.json(
      { error: "Please provide a valid email and agree to receive the resource." },
      { status: 400 },
    );
  }

  const addressBookId = process.env.SENDPULSE_RESOURCE_LIBRARY_LIST_ID;
  if (!addressBookId) {
    return NextResponse.json(
      { error: "Downloads are not connected yet. Please email hello@alwaysenoughmethod.com directly." },
      { status: 503 },
    );
  }

  try {
    await addToAddressBook({
      addressBookId,
      email,
      variables: { resource: typeof resource === "string" ? resource : "unknown" },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please email hello@alwaysenoughmethod.com directly." },
      { status: 502 },
    );
  }
}
