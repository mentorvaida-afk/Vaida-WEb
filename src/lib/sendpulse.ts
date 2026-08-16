// SendPulse API client — the email provider Vaida chose, see docs/BUILD_LOG.md (Gate 1).
// Requires SENDPULSE_CLIENT_ID and SENDPULSE_CLIENT_SECRET in the environment (never in this
// repository, see .env.example and docs/ENGINEERING_RULES.md). Without them, every function
// here throws rather than silently pretending to succeed — callers must handle that as a
// graceful degradation case (see docs/ATTACK_ANALYSIS.md: "booking/capture should fail
// gracefully with a clear fallback").

const TOKEN_URL = "https://api.sendpulse.com/oauth/access_token";
const API_BASE = "https://api.sendpulse.com";

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  const clientId = process.env.SENDPULSE_CLIENT_ID;
  const clientSecret = process.env.SENDPULSE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("SENDPULSE_CLIENT_ID / SENDPULSE_CLIENT_SECRET are not configured.");
  }

  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.value;
  }

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!response.ok) {
    throw new Error(`SendPulse auth failed: ${response.status}`);
  }

  const data = (await response.json()) as { access_token: string; expires_in: number };
  cachedToken = { value: data.access_token, expiresAt: Date.now() + (data.expires_in - 60) * 1000 };
  return data.access_token;
}

// Adds an email to a SendPulse mailing list ("address book"), tagged with arbitrary variables
// (e.g. which resource was downloaded). List IDs are created in Vaida's SendPulse account and
// set via environment variables — see .env.example.
export async function addToAddressBook(params: {
  addressBookId: string;
  email: string;
  variables?: Record<string, string>;
}): Promise<void> {
  const token = await getAccessToken();
  const response = await fetch(`${API_BASE}/addressbooks/${params.addressBookId}/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      emails: [{ email: params.email, variables: params.variables ?? {} }],
    }),
  });

  if (!response.ok) {
    throw new Error(`SendPulse addressbook request failed: ${response.status}`);
  }
}

// Sends a transactional notification email (used for the General and Speaking enquiry forms,
// per content/forms/general-enquiry-build-spec.md and speaking-enquiry-build-spec.md). SendPulse
// also offers a Google-Sheets-style backup log via its own automations; that log is not wired up
// here, it needs configuring directly in Vaida's SendPulse account, see docs/BUILD_LOG.md.
export async function sendNotificationEmail(params: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  const token = await getAccessToken();
  const response = await fetch(`${API_BASE}/smtp/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email: {
        html: Buffer.from(params.html).toString("base64"),
        subject: params.subject,
        from: { name: "Always ENOUGH™ website", email: "noreply@alwaysenoughmethod.com" },
        to: [{ email: params.to }],
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`SendPulse SMTP request failed: ${response.status}`);
  }
}
