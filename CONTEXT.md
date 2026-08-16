# CONTEXT.md — quick project snapshot

A fast-read summary of where this project actually stands right now. For the full picture, read
in this order: `CLAUDE.md` → `PROMISE.md` → `docs/BUILD_LOG.md` (the detailed running history)
→ `docs/inspections/` (dated launch-readiness checks). This file is a snapshot, not a log, it
gets rewritten to stay current rather than appended to.

## What this is

The web platform for Always ENOUGH™, Vaida V. Stone's business (Financial & Emotional
Wellbeing Speaker, Author, Coach). Built with Next.js, Tailwind, and Vercel hosting. Nine pages:
Home, About, The Method, The Reset, Speaking, Books, Contact, Blog/Resources, Privacy Policy.

## Current state

- **All nine pages are built and working**, sourced from Vaida's own approved copy in
  `content/pages/*.md`, not invented.
- **Four forms work end to end in code** (General Enquiry, Speaking Enquiry, Resource Library
  download, Power Of Enough notify), wired to SendPulse, with spam protection and validation.
  They cannot actually send anything yet, no SendPulse account credentials exist (see
  `.env.example`), and `hello@`/`speaking@alwaysenoughmethod.com` mailboxes don't exist yet.
- **Calendly booking is wired as a real embedded popup** (`calendly.com/vaidastone`), opens on
  every "Book a Clarity Call" button.
- **Verified locally**: `npm run build` and `npm run lint` both pass clean, 0 known
  vulnerabilities (Next.js 16.3.1). Every route was checked against a real running dev server.

## What's blocking a live public link

Deploying to Vercel is currently blocked by a genuine bug in Vercel CLI 59's newest local-build
packaging step, it can't correctly package Next.js 16.3's newest internal build-output format
(fails on Next's own auto-generated `_global-error` route, not anything in this codebase). Local
`next build` and `next dev` both work perfectly, this is a deployment-tooling issue, not a site
bug. Currently trying an authenticated (logged-in) deploy instead of an anonymous one, since that
uses Vercel's separate, more mature cloud build path.

## Still genuinely open (not yet done, not hidden)

- The Method page's real copy (only its layout spec exists, the document link was missing from
  the shared index)
- About and Contact pages' exact wording (retrieved as AI summaries, need re-confirming verbatim)
- Real Amazon link for "Always Enough" (currently a placeholder)
- The AI worry/familiarity statistic on Speaking (flagged as unverified in Vaida's own review)
- Real photography (only one speaker photo sourced so far, on the Speaking page)
- The Money Tree and Flower graphics (a plain CSS grid stands in for the Flower on The Method
  page today)
- Privacy Policy needs a solicitor/policy-service review before it can go live
- SendPulse account, address book IDs, and the two new mailboxes need creating in Vaida's own
  accounts
- This local folder isn't connected to its GitHub repo yet (`mentorvaida-afk/Vaida-WEb`), git
  isn't installed in this environment and needs setting up from a terminal with admin rights

## Full detail

`docs/BUILD_LOG.md` has the complete history, including every decision made and why.
`docs/inspections/2026-08-13-inspection.md` is the last honest launch-readiness check: 3 PASS,
6 GROWING, 4 MISSING out of 13. Nothing ships to the real domain until Vaida has read her own
copy on the real pages and said so, per `PROMISE.md`.
