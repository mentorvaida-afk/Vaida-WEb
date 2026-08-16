// Best-effort in-memory rate limiting per IP, as a second layer alongside the honeypot field on
// every form (see docs/ATTACK_ANALYSIS.md: "needs basic rate limiting / a honeypot field"). This
// resets whenever the serverless function cold-starts, so it is not a durable guarantee — if
// spam becomes a real problem, upgrade to Vercel KV or Upstash Redis, a decision for Vaida since
// it adds a paid dependency, see docs/PRODUCT_HARDENING_AND_SCALING.md.
const attempts = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS_PER_WINDOW = 5;

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const recent = (attempts.get(ip) ?? []).filter((t) => t > windowStart);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > MAX_ATTEMPTS_PER_WINDOW;
}

export function getClientIp(headers: Headers): string {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}
