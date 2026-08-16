# ATTACK_ANALYSIS.md — Step 2: attacking the plan before building it

Before building, the plan gets challenged from five angles. The goal is not agreement, it's
finding where the design is weakest, on paper, while fixing it still only costs minutes.

## The Planner — is the shape right?

Is a static Next.js site with no database actually enough for what Vaida needs in 12 months?
*Verdict*: yes for v1. Her actual needs (authority, booking, list-building) do not require a
database. If a course platform or member area becomes real, that is a new, separately-scoped
stage, not a reason to over-build now.

## The Builder — can it actually be built, by this team, in this time?

Vaida is not a developer. This repository must be buildable and maintainable by Claude Code
working from these markdown files, with Vaida reviewing outputs, not writing code herself.
*Risk*: if the architecture assumes ongoing hands-on engineering she doesn't have, it will decay.
*Mitigation*: keep the stack boring and static wherever possible (see `ARCHITECTURE.md`), so
"maintenance" mostly means editing markdown files.

## The Thief — how would someone abuse this?

- Email capture form could be spammed by bots → needs basic rate limiting / a honeypot field or
  CAPTCHA before going live.
- Contact/booking forms are a common phishing and spam target → validate and sanitise all input
  server-side, never trust the client.
- Brand assets (logos, colours) in `public/brand` should not include anything sensitive or
  unreleased.
*Mitigation*: see `PRODUCT_HARDENING_AND_SCALING.md`.

## The Firefighter — what breaks at 3am?

- Hosting provider outage → static site on a CDN is the most resilient option available; still
  needs an uptime monitor and alert so Vaida isn't the one who finds out from a client.
- Calendly or email provider API goes down → booking/capture should fail gracefully with a clear
  fallback (e.g. "Email me directly at ...") rather than a broken page.
- DNS migration from Hostinger → new host is the single highest-risk moment in this whole
  project. Do it with a tested rollback plan, at a low-traffic time, never on a Friday before a
  speaking engagement.

## The Doubter — what are we assuming?

- Assuming Vercel/Next.js is the right long-term home — reasonable for a marketing/coaching site,
  worth revisiting only if the site's job changes materially (e.g. becomes a paid course
  platform).
- Assuming no CMS is needed — true only as long as Vaida is comfortable with Claude Code editing
  markdown files on her instruction. If that stops being true, a lightweight headless CMS
  (e.g. Sanity) is the next step, not a full rebuild.
- Assuming the old WordPress site can stay live in parallel until the new one is fully tested —
  confirm this is technically possible with the current hosting/domain setup before relying on it.

## Where this leaves the plan

The weakest points are the DNS/domain migration and the forms (spam, failure handling). Both are
addressed explicitly in `PRODUCT_HARDENING_AND_SCALING.md` and must pass
`INSPECTION_CHECKLIST.md` before launch.
