import { NextResponse } from "next/server";
import { addToAddressBook } from "@/lib/sendpulse";
import { isRateLimited, getClientIp } from "@/lib/rateLimit";
import { isValidEmail, isNonEmptyString, honeypotTripped } from "@/lib/validate";

// Backend for content/general-enquiry-form.html, per content/forms/general-enquiry-build-spec.md.
// Routes through a SendPulse mailing list + Automation (adds the enquiry as a contact, with the
// name/message as variables) rather than a direct transactional email — SendPulse's SMTP/
// Transactional Email product needs a separate manual application/approval that hasn't cleared
// yet (confirmed by testing directly against the API, see docs/BUILD_LOG.md), while list/
// address-book access already works with the senders Vaida has. Requires
// SENDPULSE_GENERAL_ENQUIRY_LIST_ID — see .env.example — and a one-time Automation set up in
// SendPulse's dashboard (trigger: contact added to this list → action: email Vaida the contact's
// variables) to actually notify her; this route only gets the data into SendPulse.
export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, message, website } = body as Record<string, unknown>;

  if (honeypotTripped(website)) {
    // Bots that fill every field get a fake success, real visitors never see this branch.
    return NextResponse.json({ ok: true });
  }

  if (!isNonEmptyString(name) || !isValidEmail(email) || !isNonEmptyString(message)) {
    return NextResponse.json({ error: "Please fill in every field with a valid email." }, { status: 400 });
  }

  const addressBookId = process.env.SENDPULSE_GENERAL_ENQUIRY_LIST_ID;
  if (!addressBookId) {
    return NextResponse.json(
      { error: "Enquiries are not connected yet. Please email hello@alwaysenoughmethod.com directly." },
      { status: 503 },
    );
  }

  try {
    await addToAddressBook({
      addressBookId,
      email,
      variables: { name, message },
    });
    return NextResponse.json({ ok: true });
  } catch {
    // Fails gracefully per docs/ATTACK_ANALYSIS.md — the client shows a fallback email address.
    return NextResponse.json(
      { error: "Something went wrong sending this. Please email hello@alwaysenoughmethod.com directly." },
      { status: 502 },
    );
  }
}
