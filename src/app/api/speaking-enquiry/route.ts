import { NextResponse } from "next/server";
import { sendNotificationEmail } from "@/lib/sendpulse";
import { isRateLimited, getClientIp } from "@/lib/rateLimit";
import { isValidEmail, isNonEmptyString, honeypotTripped } from "@/lib/validate";

// Backend for content/speaking-enquiry-form.html, per content/forms/speaking-enquiry-build-spec.md.
// Notifies speaking@alwaysenoughmethod.com — that mailbox does not exist yet, see docs/BUILD_LOG.md.
export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const {
    name,
    organisation,
    email,
    phone,
    audience,
    format,
    delivery,
    audienceSize,
    eventDate,
    location,
    message,
    source,
    website,
  } = body as Record<string, unknown>;

  if (honeypotTripped(website)) {
    return NextResponse.json({ ok: true });
  }

  const audienceList = Array.isArray(audience) ? audience.filter((a) => typeof a === "string") : [];

  if (
    !isNonEmptyString(name) ||
    !isValidEmail(email) ||
    audienceList.length === 0 ||
    !isNonEmptyString(format) ||
    !isNonEmptyString(delivery) ||
    !isNonEmptyString(message)
  ) {
    return NextResponse.json({ error: "Please fill in every required field with a valid email." }, { status: 400 });
  }

  const rows: [string, unknown][] = [
    ["Name", name],
    ["Organisation", organisation],
    ["Email", email],
    ["Phone", phone],
    ["Audience", audienceList.join(", ")],
    ["Format", format],
    ["Delivery", delivery],
    ["Audience size", audienceSize],
    ["Event date", eventDate],
    ["Location", location],
    ["Message", message],
    ["Source", source],
  ];
  const html = rows
    .filter(([, value]) => isNonEmptyString(value))
    .map(([label, value]) => `<p><strong>${label}:</strong> ${value}</p>`)
    .join("");

  try {
    await sendNotificationEmail({
      to: "speaking@alwaysenoughmethod.com",
      subject: `Speaking enquiry from ${name}`,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong sending this. Please email speaking@alwaysenoughmethod.com directly." },
      { status: 502 },
    );
  }
}
