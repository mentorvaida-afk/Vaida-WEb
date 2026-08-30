import { NextResponse } from "next/server";
import { addSubscriberToGroup } from "@/lib/mailerlite";
import { sendSpeakingNotification } from "@/lib/smtp";
import { isRateLimited, getClientIp } from "@/lib/rateLimit";
import { isValidEmail, isNonEmptyString, honeypotTripped } from "@/lib/validate";

// Backend for content/speaking-enquiry-form.html, per content/forms/speaking-enquiry-build-spec.md.
// Two things happen on a valid submission: the enquiry is added to MailerLite's Speaking
// Enquiries group (MAILERLITE_SPEAKING_ENQUIRY_GROUP_ID, for record-keeping), and a notification
// email is sent directly through speaking@alwaysenoughmethod.com's own Hostinger SMTP login
// (src/lib/smtp.ts) — MailerLite's automations can only email the subscriber who triggered them,
// not a fixed staff address, so it can't handle the notification itself. See docs/BUILD_LOG.md.
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

  const asString = (value: unknown): string => (typeof value === "string" ? value : "");

  const groupId = process.env.MAILERLITE_SPEAKING_ENQUIRY_GROUP_ID;
  if (!groupId) {
    return NextResponse.json(
      { error: "Enquiries are not connected yet. Please email speaking@alwaysenoughmethod.com directly." },
      { status: 503 },
    );
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
    await addSubscriberToGroup({
      groupId,
      email,
      fields: {
        name,
        organisation: asString(organisation),
        phone: asString(phone),
        audience: audienceList.join(", "),
        format,
        delivery,
        audienceSize: asString(audienceSize),
        eventDate: asString(eventDate),
        location: asString(location),
        message,
        source: asString(source),
      },
    });
    await sendSpeakingNotification({ subject: `Speaking enquiry from ${name}`, html });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong sending this. Please email speaking@alwaysenoughmethod.com directly." },
      { status: 502 },
    );
  }
}
