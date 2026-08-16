// Minimal, deliberately permissive email check — server-side validation exists to catch
// obviously malformed input and bots, not to be a full RFC 5322 parser. Client-side
// type="email" validation is never trusted alone, per docs/ATTACK_ANALYSIS.md.
export function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

// Every form's honeypot field is named "website" — present in the DOM, hidden from sighted
// users via CSS, and never filled in by a real visitor. A bot that fills every field trips it.
export function honeypotTripped(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}
