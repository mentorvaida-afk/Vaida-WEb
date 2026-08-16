# PRODUCT_HARDENING_AND_SCALING.md

## Security hardening

- HTTPS enforced everywhere, HTTP requests redirected, not just allowed.
- Security headers set at the host/edge level: Content-Security-Policy, X-Frame-Options,
  X-Content-Type-Options, Referrer-Policy.
- All form input validated and sanitised server-side (never trust client-side validation alone).
- Email capture and any contact form protected against bot spam (honeypot field at minimum;
  CAPTCHA if spam becomes a real problem).
- Dependencies kept current; automated alerts for known vulnerabilities (e.g. GitHub Dependabot)
  turned on from day one, not added later.
- No admin login exposed publicly unless a CMS is added later — and if it is, it gets two-factor
  authentication, no exceptions.

## Data protection (UK GDPR)

- Collect the minimum data needed for each action (an email address for the workbook, not a full
  profile).
- State clearly, at the point of collection, what the data will be used for.
- Email provider and Calendly are both established, GDPR-compliant processors — confirm current
  data processing agreements are in place, don't assume.
- Have a clear, simple privacy policy page, written in Vaida's actual voice, not boilerplate
  legalese pasted in wholesale.

## Resilience

- Static-first architecture (see `ARCHITECTURE.md`) means most of the site keeps working even if
  a third-party service (booking, email) is briefly down — only that specific feature degrades,
  not the whole site.
- Uptime monitoring with alerts (email/SMS) so an outage is caught before a client or bureau
  finds it first.
- Deploys are atomic and reversible: every release can be rolled back to the previous working
  version in minutes, not hours.
- Domain/DNS migration from Hostinger happens with a written rollback plan and is never done
  immediately before a live speaking engagement or launch push.

## Scaling (for when traffic or scope genuinely grows)

- CDN caching for all static assets (default behaviour on Vercel-class hosting) — a traffic spike
  from a viral talk or press mention should not take the site down.
- Image optimisation and responsive image sizing so growth in content doesn't mean growth in load
  time.
- If content volume grows past what's comfortable in flat markdown files, migrate to a headless
  CMS (e.g. Sanity) as its own scoped stage — do not let this creep into v1.
- If the business adds paid products (courses, memberships), that is a new architectural
  decision requiring authentication and payments, and deserves its own PROMISE.md and attack
  analysis, not a bolt-on to the marketing site.

## Monitoring & cost control

- Analytics dashboard reviewed monthly against the site's actual job: are visitors reaching
  booking or the workbook, not just visiting.
- Hosting costs on a predictable, capped plan — no surprise bills from an unexpected traffic
  spike or a misconfigured serverless function running in a loop.
