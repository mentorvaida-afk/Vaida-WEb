# ARCHITECTURE.md

## Stack (v1 default — see CLAUDE.md for how to challenge this)

- **Framework**: Next.js (App Router, TypeScript). Static generation for every marketing page;
  server functions only where genuinely needed (form handling, booking webhook).
- **Styling**: Tailwind CSS, configured with the brand design tokens in `docs/BRAND_CONTEXT.md`.
- **Content**: Markdown files in `content/`, read at build time. No database for v1 — a personal
  brand site does not need one, and it removes an entire category of things that can break or
  need patching.
- **Hosting**: Vercel (or equivalent static/edge host). Automatic preview deploys on every change,
  one-click rollback, free TLS.
- **Booking**: Calendly embedded widget, pointing at `calendly.com/vaidastone`.
- **Email capture**: a simple form posting to an email provider's API (e.g. Mailchimp/ConvertKit —
  confirm which one Vaida already uses before building this, do not introduce a new provider
  without checking).
- **Analytics**: privacy-respecting, cookie-light analytics (e.g. Plausible or Vercel Analytics),
  not a heavy tracking suite. GDPR-friendly by default.
- **Domain**: alwaysenoughmethod.com, migrated from Hostinger DNS once the new site is tested
  and approved — the old WordPress site stays live and untouched until the new one has passed
  every check in `docs/INSPECTION_CHECKLIST.md`.

## Why this stack, working back from `USER_EXPERIENCE_FIRST.md`

- Static generation → the phone-first, patchy-signal visitor gets a fast page.
- No database in v1 → fewer things Vaida can break, fewer things to secure, fewer costs.
- Markdown content → Vaida (or Claude, on her instruction) can update golden sayings and copy
  without touching code, and every change is reviewable as a plain-text diff before it goes live.
- Preview deploys → nothing reaches the public site without being seen first.

## High-level structure

```
Visitor
  │
  ▼
Vercel Edge (static pages, cached, fast)
  │
  ├─▶ Booking: Calendly embed (Vaida's existing account, no new system to maintain)
  ├─▶ Email capture: serverless function → email provider API
  └─▶ Analytics: lightweight, privacy-respecting pageview tracking
```

## What does NOT belong in v1

A CMS admin panel, user accounts, a database, a course platform, multi-language support. Every
one of these adds ongoing maintenance and attack surface. Add them only when a real, named need
appears — see `PROMISE.md` for what "finished" means for v1.
