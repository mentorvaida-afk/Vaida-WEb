# Inspection — 2026-08-13

Filled per `docs/INSPECTION_CHECKLIST.md`'s own rule: copied and dated, not overwritten. This is
the first inspection this project has had, run at the end of Stage 06, before Stage 07's own
"do not look at: new features" work continues. Nothing here has been shown to Vaida yet.

| # | Check | Grade | Evidence |
|---|---|---|---|
| 1 | Works correctly on a real mobile phone, not just a resized window | **GROWING** | Every page uses mobile-first Tailwind classes (stacking grids, a client-side hamburger nav in `src/components/Header.tsx`), and structure was checked in code, but no physical device test happened, this environment has no phone or browser automation tool available (`chromium-cli` confirmed absent, see `docs/BUILD_LOG.md`). |
| 2 | Largest Contentful Paint under 2.5s on throttled mobile | **MISSING** | No Lighthouse/throttled network test was run, no tooling available in this environment. Static generation and minimal client JS (only 3 components are `"use client"`: the two enquiry forms and `EmailCaptureForm`) should help, but this is unverified, not proven. |
| 3 | No broken links, no placeholder ("lorem ipsum") text anywhere | **GROWING** | No lorem ipsum anywhere. All 12 routes return 200 (verified via a live dev server, not just a build check, see `docs/BUILD_LOG.md`). But real, visible placeholders exist by design, not disguised as final: The Method page's three `[Needs Vaida: ...]` sections, and a literal placeholder Amazon URL in `src/app/books/page.tsx`. Both must be resolved before launch. |
| 4 | Accessible: contrast passes WCAG AA, keyboard navigable, real alt text | **GROWING** | Skip-to-content link, semantic headings, labelled form fields, visible focus states on every interactive element, honeypot fields hidden via off-screen positioning (not `display:none`, so they remain in the accessibility tree correctly). No automated contrast audit was run (no tooling available). No images exist yet to need alt text, real photography has not been sourced (see `docs/BUILD_LOG.md`), so this check is incomplete by definition, not passed. |
| 5 | All copy is British English, brand-consistent, ™ used correctly, no long dashes | **PASS** | British English throughout, sourced from Vaida's own approved documents. ™ correctly used after "Always ENOUGH" everywhere it appears. Em dash check: grepped all 12 pre-rendered static HTML files in `.next/server/app/` for the literal em dash character outside `<script>` tags, zero matches. Two rendering-side violations and one source-content violation were found and fixed during this stage, not merely inspected after the fact, see `docs/BUILD_LOG.md` for exactly what and where. |
| 6 | No mention of flower psychometry or "The Money Gardener" on the site | **PASS** | Grepped `src/` and `content/` for "flower psychometry", "colour therapy", and "Money Gardener" (case-insensitive), zero matches. |
| 7 | Booking flow (Calendly) tested end to end, including on mobile | **MISSING** | `Button` links out to `https://calendly.com/vaidastone` in a new tab (matches the pattern in Vaida's own approved `homepage-prototype.html`, a link-out, not an embedded widget). The URL itself was never confirmed live, it's taken from `docs/BRAND_CONTEXT.md`. No end-to-end test happened; this needs a human clicking it against a real Calendly account. |
| 8 | Email capture form tested: valid input, invalid input, spam resistance | **GROWING** | All four forms tested live against a running dev server: honeypot-tripped submissions get a silent fake success, invalid input (bad email, missing required fields, no audience selected) correctly returns 400 with a clear message, and missing SendPulse credentials correctly fail gracefully (502/503 with a real fallback email) rather than crashing, see `docs/BUILD_LOG.md`. What's not tested: the actual happy path with real SendPulse credentials, since none exist in this environment, and double-submission behaviour specifically. |
| 9 | No secrets/API keys committed to the repository | **PASS** | `.env.local` does not exist in the working tree (`Test-Path` confirmed false). Only `.env.example` exists, placeholders only. `.gitignore` already excludes `.env.local`/`.env`. All SendPulse calls in `src/lib/sendpulse.ts` read from `process.env`, nothing hardcoded. |
| 10 | HTTPS enforced, security headers set | **GROWING** | `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy: strict-origin-when-cross-origin` set in `next.config.ts` and verified present on live responses from the dev server. No Content-Security-Policy set yet, deferred until real third-party embeds are finalised. HTTPS/HSTS enforcement is a hosting-level concern (automatic on Vercel), unverified since nothing is deployed. |
| 11 | Analytics live and privacy-compliant (cookie banner if legally required) | **GROWING** | `@vercel/analytics` wired into `src/app/layout.tsx`, needs no API key on Vercel. Not "live" since nothing is deployed. Cookie consent banner not built, an open item Vaida's own prior review already flagged as unaddressed, see `docs/BUILD_LOG.md`. |
| 12 | Backup/rollback tested: can the previous version be restored in minutes | **MISSING** | Nothing is deployed to any hosting platform yet. This is explicitly Stage 08 (Launch) territory, out of scope for this session per the GATE 2 hard stop in the build brief. |
| 13 | Vaida has personally read and approved every page of copy | **MISSING** | This build sources her already-written, apparently-approved copy faithfully, but she has not reviewed this specific implementation of it. Per `PROMISE.md`, this blocks launch regardless of every other check's status. |

## Summary

**PASS**: 3 of 13 (checks 5, 6, 9). **GROWING**: 6 of 13 (checks 1, 3, 4, 8, 10, 11).
**MISSING**: 4 of 13 (checks 2, 7, 12, 13).

Nothing here is signed off. Per `docs/INSPECTION_CHECKLIST.md`'s own rules, anything not PASS
blocks launch unless Vaida explicitly signs off on shipping with it GROWING or MISSING, in
writing, with a named date it will be fixed by. No such sign-off has been requested or given.
This table is evidence for her review, not a launch decision.
