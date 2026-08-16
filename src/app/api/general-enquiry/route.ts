import { NextResponse } from "next/server";
import { sendNotificationEmail } from "@/lib/sendpulse";
import { isRateLimited, getClientIp } from "@/lib/rateLimit";
import { isValidEmail, isNonEmptyString, honeypotTripped } from "@/lib/validate";

// Backend for content/general-enquiry-form.html, per content/forms/general-enquiry-build-spec.md.
// Notifies hello@alwaysenoughmethod.com — that mailbox does not exist yet, see docs/BUILD_LOG.md.
// The build spec's Google Sheets backup log is not wired here; it needs setting up directly in
// Vaida's SendPulse/Google account, not something this codebase can provision on its own.
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

  try {
    await sendNotificationEmail({
      to: "hello@alwaysenoughmethod.com",
      subject: `General enquiry from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
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
