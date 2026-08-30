// MailerLite API client — replacing SendPulse, 2026-08-30 (see docs/BUILD_LOG.md). Requires
// MAILERLITE_API_TOKEN in the environment (never in this repository, see .env.example and
// docs/ENGINEERING_RULES.md). Without it, every function here throws rather than silently
// pretending to succeed — callers must handle that as a graceful degradation case (see
// docs/ATTACK_ANALYSIS.md: "booking/capture should fail gracefully with a clear fallback").
const API_BASE = "https://connect.mailerlite.com/api";

function getToken(): string {
  const token = process.env.MAILERLITE_API_TOKEN;
  if (!token) {
    throw new Error("MAILERLITE_API_TOKEN is not configured.");
  }
  return token;
}

// Creates or updates a subscriber and puts them in the given group. Non-destructive per
// MailerLite's own API docs — omitted fields or existing other-group memberships are untouched.
export async function addSubscriberToGroup(params: {
  groupId: string;
  email: string;
  fields?: Record<string, string>;
}): Promise<void> {
  const response = await fetch(`${API_BASE}/subscribers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      email: params.email,
      fields: params.fields,
      groups: [params.groupId],
    }),
  });

  if (!response.ok) {
    throw new Error(`MailerLite subscribers request failed: ${response.status}`);
  }
}
