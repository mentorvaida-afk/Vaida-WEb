import { NextResponse } from "next/server";
import { addToAddressBook } from "@/lib/sendpulse";
import { isRateLimited, getClientIp } from "@/lib/rateLimit";
import { isValidEmail, isNonEmptyString, honeypotTripped } from "@/lib/validate";

// Backend for content/speaking-enquiry-form.html, per content/forms/speaking-enquiry-build-spec.md.
// Routes through a SendPulse mailing list + Automation, same reasoning as
// src/app/api/general-enquiry/route.ts — see that file's comment for why. Requires
// SENDPULSE_SPEAKING_ENQUIRY_LIST_ID — see .env.example — and its own Automation in SendPulse's
// dashboard notifying speaking@alwaysenoughmethod.com.
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

  const addressBookId = process.env.SENDPULSE_SPEAKING_ENQUIRY_LIST_ID;
  if (!addressBookId) {
    return NextResponse.json(
      { error: "Enquiries are not connected yet. Please email speaking@alwaysenoughmethod.com directly." },
      { status: 503 },
    );
  }

  try {
    await addToAddressBook({
      addressBookId,
      email,
      variables: {
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
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong sending this. Please email speaking@alwaysenoughmethod.com directly." },
      { status: 502 },
    );
  }
}
