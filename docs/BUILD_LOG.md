# BUILD_LOG.md

Running log of autonomous build activity, per CLAUDE.md/PROMISE.md discipline: what was done,
what was found, and what is blocked pending Vaida's decision. Newest entry at the top.

## 2026-08-13 — Stages 03 through 06 built, environment set up from nothing

**Environment**: this machine had no `git`, no `gh` CLI, and no Node.js/npm at session start (all
confirmed via `Get-Command`). Git/GitHub CLI could not be installed, both require an interactive
administrator prompt this sandboxed session can't approve. Node.js LTS (v24.19.0) was installed
successfully via `winget --scope user` (no admin needed, portable zip), added to the persistent
user PATH. `npm install` then surfaced **5 high-severity CVEs** in the scaffolded Next.js 14.2
(DoS, SSRF, cache poisoning, XSS, request smuggling, across ~20 advisories). Since no pages
existed yet, upgraded immediately to the patched line rather than migrating later:
Next 14.2 → 16.3.0, React 18 → 19.2.8, ESLint 8 → 9 (with a native flat `eslint.config.mjs`,
replacing the deprecated `next lint` command which Next 16 removed entirely). `npm audit` now
reports 0 vulnerabilities. `npm run build` and `npm run lint` both pass clean.

**Stage 03 (Design System)**: `tailwind.config.ts` extended with functional shades (forest-soft/
deep, gold-soft, ink, line, error) already used consistently across Vaida's own approved HTML
mockups, not new colours. Cormorant Garamond and Jost wired via `next/font/google` at the exact
weights those mockups use. Eight core components built in `src/components/`: `Button`, `Eyebrow`,
`Card`, `PullQuote`, `BookingCallout`, `EmailCaptureForm`, `GeneralEnquiryForm`,
`SpeakingEnquiryForm`, plus `Header`/`Footer`/`Prose` for site chrome and content rendering. A
one-page style reference lives at `/style-guide` (noindex, not in the public sitemap).

**Stage 04 (Frontend Build)**: all nine pages built in `src/app/` (Home, About, The Method, The
Reset, Speaking, Books, Contact, Blog/Resources index + dynamic `[slug]` post template, Privacy
Policy), reading real copy from `content/pages/*.md` at build time via `src/lib/content.ts`
rather than hardcoding prose into components, per `docs/ENGINEERING_RULES.md`. Verified with a
real running dev server (not just `next build`): all 12 routes return 200, structured content
(the six Method petals, the six Reset weeks, the four Speaking audience cards, the two Blog
posts) all render with real extracted text, no literal "undefined" or stray `[bracket]` markers
reached the page. The Method page has no final copy to source (see prior entry below), so its
prose sections render a clearly labelled "[Needs Vaida: ...]" placeholder instead of inventing
copy, per PROMISE.md.

**A live discovery while verifying with the dev server**: Next.js 16 has a new feature that
re-injects an "agent rules" block into `CLAUDE.md` on every `next dev` run, a different, unrelated
convention from this project's own use of `CLAUDE.md` as its ICM root file. It doesn't corrupt
content, just appends after it, but it collided with a file this project treats as authoritative.
Disabled via `agentRules: false` in the newly created `next.config.ts`, and the one block that
had already been appended was removed to restore Vaida's authored file exactly.

**Two real non-negotiable violations found and fixed during verification, not by inspection
alone**: grepping the actual pre-rendered static HTML (`.next/server/app/*.html`) for the em
dash character found (1) `PullQuote` was hardcoding a "— " prefix in its own JSX before every
testimonial attribution, and (2) the Reset page's week cards were rendering "Week 1 — Understand"
literally from a regex capture group that included the dash. A third instance was in the source
content itself, not something this build introduced: `content/pages/speaking.md`'s Formats list
used em dashes in Vaida's own already-approved copy ("Keynote addresses — 30 to 60 minutes...").
All three fixed (dashes removed, replaced with layout/comma alternatives); the content fix is a
mechanical punctuation correction against an explicit written rule, not a rewording, logged here
rather than silently changed. After fixing, every one of the twelve static HTML files was
re-checked and confirmed to contain zero em dashes outside `<script>` payloads.

**Stage 06 (Conversion Architecture)**: all four forms (General Enquiry, Speaking Enquiry,
Resource Library download ×2, Power Of Enough notify) wired to real Next.js Route Handlers in
`src/app/api/*/route.ts`, all calling SendPulse (Vaida's Gate 1 choice) via a shared client in
`src/lib/sendpulse.ts`. Every route: checks a honeypot field first (bots get a silent fake
success), rate-limits by IP (in-memory, best-effort, noted in code as needing a durable store like
Vercel KV if spam becomes a real problem, a paid-dependency decision for Vaida), validates
required fields and email format server-side (never trusting client-side `type="email"` alone,
per `docs/ATTACK_ANALYSIS.md`), and fails gracefully with a real fallback email address rather
than a broken page if the SendPulse call errors. Verified live against the running dev server:
honeypot-tripped submissions return a silent success, malformed submissions return 400 with a
clear message, and valid submissions without configured SendPulse credentials return a clean
502/503 with the fallback email, exactly the "Email me directly at..." behaviour
`docs/ATTACK_ANALYSIS.md` asks for. **The general/speaking enquiry forms' Google Sheets backup
log (named in their own build specs) is not wired up** — that needs a Google service account set
up directly in Vaida's account, out of scope for what this session can safely provision without
her. Vercel Analytics (`@vercel/analytics`) added to the root layout, per `docs/ARCHITECTURE.md`'s
own stated default, needs no API key on Vercel.

**Security headers** (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`) added in
`next.config.ts`, per `docs/INSPECTION_CHECKLIST.md` check 10. HTTPS/HSTS enforcement is a
hosting-level concern (automatic on Vercel), unverified since nothing is deployed yet. No CSP
header set, a decision better made once real third-party embeds (Calendly, analytics) are final.

**Still genuinely open, carried forward**: The Method page's final copy (only its structural
handoff exists, see prior entry), About and Contact pages' copy (retrieved as AI summaries, not
verbatim, need re-confirming), the real Amazon link for "Always Enough" (currently a literal
placeholder URL in `src/app/books/page.tsx`), the AI worry/familiarity statistic on Speaking
(flagged as unverified by Vaida's own prior review), `hello@`/`speaking@alwaysenoughmethod.com`
mailboxes (don't exist yet, both required before any form notification can actually arrive),
SendPulse credentials and address book IDs (need creating in Vaida's account, see
`.env.example`), real photography (none sourced), and the Money Tree/Flower graphics (referenced
throughout, not finalised, currently a plain CSS grid standing in for the Flower on The Method
page).

---

## 2026-08-13 (earlier) — Content sourced, platform fork resolved

**Resolved from the previous blocker**, after Vaida's direct answers:

1. **GitHub repo `mentorvaida-afk/Vaida-WEb`**: confirmed public via the GitHub API. Contains
   only the two files GitHub auto-creates (`README.md`, `LICENSE`), pushed the same day this
   local scaffold was created. No competing work exists there. This local folder is the real,
   further-along source and should become the canonical version once connected.
   **Not yet connected**: neither `git` nor `gh` is installed in this environment (still true as
   of the Stage 03-06 entry above). Pushing to GitHub also needs authentication (SSH key or PAT)
   that hasn't been set up. **This needs to happen from Vaida's own machine/terminal.**

2. **Content access**: link sharing was already enabled on the Google Docs referenced in
   `content/Website content links.docx`. All were fetched directly. Full list and status below.

3. **Email provider (Gate 1)**: Vaida chose SendPulse. This matches what her own prior planning
   already assumed, SendPulse is referenced repeatedly across the build specs below as "already
   used elsewhere per your tool stack."

**What was retrieved from the Google Docs (all fetched 2026-08-13)**:

| Document | Saved to | Status |
|---|---|---|
| Home-Page-Copy-Final | `content/pages/homepage.md` | Verbatim, complete |
| About-Page-Copy-Final | `content/pages/about.md` | AI-summarised by the fetch tool, not verbatim — needs re-confirming |
| The Method Page — Structural & Visual Handoff | `content/pages/the-method.md` | Structure only. **No copy-final link exists in the source docx at all**, despite being referenced by name ("Method-Page-Copy-Final.md") as a companion piece in the Speaking and other pages. Ask Vaida directly for it. |
| The Always ENOUGH™ Emotional & Financial Reset — Final Copy | `content/pages/the-reset.md` | Verbatim, complete |
| The Reset Page — Structural & Visual Handoff | folded into `docs/PAGE_BLUEPRINTS.md` | Complete |
| Speaking-Page-Copy-Final | `content/pages/speaking.md` | Verbatim, complete (one punctuation correction, see entry above). One statistic (AI worry/familiarity figures) explicitly flagged by Vaida's own prior review as unverified |
| Speaking-Enquiry-Form-Build-Spec | `content/forms/speaking-enquiry-build-spec.md` | Complete |
| Books Page — Structural & Visual Handoff | folded into `docs/PAGE_BLUEPRINTS.md` | Complete |
| Books Page — Final Copy | `content/pages/books.md` | Verbatim, complete |
| General Enquiry Form — Build Spec (both links) | `content/forms/general-enquiry-build-spec.md` | Complete, both links returned the same document |
| Contact Page — Final Copy | `content/pages/contact.md` | AI-summarised, not verbatim — needs re-confirming |
| Blog/Resources Page — Structural & Visual Handoff | folded into `docs/PAGE_BLUEPRINTS.md` | Complete |
| Blog/Resources Page — Final Copy | `content/pages/blog-resources.md` | Verbatim, complete, including both full launch blog posts |
| Privacy Policy Page — Draft Copy | `content/pages/privacy-policy.md` | Verbatim. Explicitly marked by its own source as a draft needing UK solicitor/policy-service review, not just Vaida's read-through |
| Resource Library Download Form — Build Spec | `content/forms/resource-library-download-build-spec.md` | Complete, but the matching HTML artifact referenced elsewhere was never linked in the source docx, so it wasn't retrieved |
| Power Of Enough Notify Form — Build Spec | `content/forms/power-of-enough-notify-build-spec.md` | Complete |
| Always ENOUGH™ Website — Full Project Status & Next Steps (two links, two versions) | read in full, not saved as a standalone file, its findings are folded into this log | The second link is the newer, fuller version, see findings below |
| Website Agent Brief | read in full (AI-summarised) | **Confirms the platform is WordPress + Elementor on Hostinger, not Next.js.** See fork below |
| CEO Agent Brief | read in full (AI-summarised) | Business/brand brief, consistent with `docs/BRAND_CONTEXT.md`, no new conflicts found |

**Correction made**: `docs/BRAND_CONTEXT.md`'s CTA label, "Book a Money Clarity Call" →
"Book a Clarity Call", confirmed independently locked in three separate source documents
(Home, Speaking, and the Full Project Status doc itself flags this exact correction as still
outstanding in Vaida's own two brief documents).

**Correction to an earlier note in this log**: `content/The KYA Method v2.pdf` is confirmed
unrelated to Always ENOUGH, see the entry below. That finding stands.

### The platform fork — resolved

Vaida's own prior planning work, the "Website Agent Brief," states plainly the site was planned
for WordPress + Elementor on Hostinger, conflicting with this repo's own `docs/ARCHITECTURE.md`
(Next.js/Tailwind/Vercel). **Asked Vaida directly; she chose to keep building on Next.js here**
and treat the WordPress plan as superseded. Stages 03 through 06 above proceed on that basis.

## Other open items surfaced by Vaida's own prior review, still genuinely open

- `hello@alwaysenoughmethod.com` and `speaking@alwaysenoughmethod.com`: neither mailbox
  exists yet. Both need creating via Hostinger before any form can route to them.
- Cookie consent banner: not yet addressed, needed once analytics/tracking tools are chosen
  (Vercel Analytics is now wired, see entry above, revisit whether this triggers the requirement).
- Real photography: not sourced (Home hero, About story section, Speaking stage photos, Books
  cover). Currently placeholder guidance only in every structural handoff.
- Money Tree and Flower graphics: referenced throughout as the site's core visual system, not
  finalised. A rough Flower graphic exists in Vaida's Drive and needs refining to the exact
  brand palette and typography. The Method page currently uses a plain CSS grid as a stand-in.
- The AI worry/familiarity statistic on the Speaking page needs a source re-check before
  publishing.
- The two source brief documents (CEO Agent Brief, Website Agent Brief) still contain the old
  "Money Clarity Call" label and are missing the "grounded luxury" tone descriptor. Neither this
  session nor Vaida's prior AI collaborator could write back to those Google Docs (both are
  read-only fetches). Someone with edit access needs to paste the two corrections in directly.
- Privacy policy draft needs a UK solicitor or policy-generation service review before
  publishing, not just a read-through.

---

## 2026-08-13 (earliest) — Stage 01 Discovery: started, paused on the repo/content-access blocker

**Reviewed**: CLAUDE.md, PROMISE.md, README.md, all of docs/, all stages/*/STAGE.md, and every
raw material then in content/ (golden sayings, homepage-prototype.html, the three form HTML
files, The KYA Method v2.pdf, Website content links.docx).

**Correction to an earlier assumption**: `content/The KYA Method v2.pdf` is not Always ENOUGH
material. It is an unrelated methodology paper by a different author (Rume Dominic, "The KYA
Method") that this project's own folder discipline (Promise/Attack/Inspect/Prove, ICM) is
explicitly modelled on. It names its own sources (Interpretable Context Methodology by Jake Van
Clief and David McDermott; inspection thinking from Gabriel Millien). It must never be treated
as source copy for the Always ENOUGH site. Recommend moving it out of `content/` to avoid a
future pass mistaking it for brand material.

Two blockers were found and put to Vaida directly (relationship to the GitHub repo, access to
the approved copy, and the still-open email provider question). Her answers are recorded above.
