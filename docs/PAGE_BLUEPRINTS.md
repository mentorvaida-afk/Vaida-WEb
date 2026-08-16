# PAGE_BLUEPRINTS.md — Stage 02 output

Section-by-section, plain-language blueprints for all eight pages plus Privacy Policy. Drawn
directly from Vaida's own "Structural & Visual Handoff" documents where they exist (Home, The
Method, The Reset, Books, Blog/Resources), and from the copy's own section headings where a
separate handoff was never produced (About, Speaking, Contact). No layout or component
decisions are made here, per Stage 02's own rule, this is structure only, platform-agnostic.

Shared visual principles across every page (from the Home handoff, confirmed repeated in every
other handoff): spacious, never cramped ("grounded luxury" reads through white space). One idea
per screen. Colour restraint, Forest Green + Antique Gold as accents, Pearl White as dominant
background. Cormorant Garamond headings, Jost body. Real photography of Vaida prioritised over
stock wherever available.

## 1. Home

1. **Hero** — full-width. A visitor should feel she has "just walked into a room and been seen." Headline + one paragraph + single primary CTA ("Book a Clarity Call"), no competing secondary link here.
2. **The Promise / Reframe** — narrower column, no image, no CTA. Purely rhythm and pause.
3. **Who This Is For** — a recognition moment, not a feature list. Simple text, optionally three short lines with spacing, not icon cards.
4. **The Method Preview** — the Money Tree graphic (Root/Stem/Branches/Blooms) alongside text. Secondary CTA as a text link: "Explore the Method →".
5. **Closing / Final CTA** — full-width bookend echoing the Hero. Primary "Book a Clarity Call" button, secondary smaller "Download the free workbook" text link beneath it.

## 2. About

1. **Opening** — "You are not the only one who has felt this way."
2. **The Story** — the immigrant, single-mother story: arrival, multiple jobs, buying a home within four years, the daily commitment to rebuild from within.
3. **Professional Overview** — 31 years designing behavioural-change learning, founder of the Always ENOUGH™ Method.
4. **Credentials** — the seven-item list (teacher since 1995, licensed financial protection adviser 2018–2023, master's-level qualification, international speaker, AI trainer, Amazon #1 bestselling author).
5. **Core Philosophy** — the "real change" quote, money as visible proof, not the goal.
6. **Closing CTA** — "You do not need permission to want more for yourself." → Book a Clarity Call.

*(No separate structural handoff exists for this page yet; layout should follow the same visual principles as Home, with a dedicated photo for the Story section per the project status notes.)*

## 3. The Method

1. **Opening** — text-led, full-width, optional subtle Money Tree icon transition.
2. **Reintroducing the Tree** — compact recap of the Root/Stem/Branches/Blooms metaphor from Home.
3. **The Flower in Full** — centrepiece. The Always E.N.O.U.G.H. Flower, six labelled petals (Empower, Nourish, Organise, Unleash, Grow, Harmonise), grid or six sequential cards. Needs a six-card mobile fallback.
4. **How It Works Together** — narrow prose column, plus a Learning Cycle diagram: Understand → See → Try → Apply → Grow.
5. **Authority Section** — brief, quiet, text-only.
6. **Closing/CTA** — "Book a Clarity Call" primary, "Download the free workbook" secondary.

**Gap**: word-for-word copy for each section still needs retrieving from Vaida, see
`content/pages/the-method.md`.

## 4. The Reset (primary-path sales page, longest on the site)

1. **Opening** — full-width, same weight as Home's Hero. May be a visitor's very first landing point (direct link from a speaking bio, ad, or referral).
2. **What the Reset Actually Is** — narrower column, clarity over decoration.
3. **The Journey, Week by Week** — visual timeline or numbered steps, Week 1 through Week 6, generously spaced, not cramped.
4. **What Changes** — emotional core of the page. The Vita T. quote gets a distinct pull-quote treatment.
5. **Who This Is For** — clean bulleted "is for" list; a visually distinct "not for" paragraph (background tint or rule), its own honest moment, not blended in.
6. **Investment** — price stated plainly and confidently in larger type. No discount badges, no urgency countdowns.
7. **The Clarity Call** — shorter, mid-page CTA moment, can sit slightly more prominently than a typical mid-page CTA.
8. **Closing** — full-width bookend. Single "Book a Clarity Call" button, deliberately no secondary workbook link here (unlike Home and The Method).

## 5. Speaking

1. **Opening** — the "emotional wellbeing and financial confidence are not two separate conversations" framing.
2. **The Unifying Philosophy** — one core message, four audiences, language changes, substance doesn't.
3. **Who I Speak For** — four audience tracks as distinct blocks: Corporate & HR; AI Confidence Training; Women's Empowerment & Midlife; Financial Services & Adviser Networks (each with its own short case/insight, not a plain credentials list).
4. **Formats** — keynote, half/full-day workshop, seminar, one-to-one/small group; in person or online.
5. **Reach, Languages & Credentials** — cities spoken in, English/Lithuanian, DBS certificate, QTS.
6. **Enquiry/CTA** — routes to the Speaking Enquiry form (`content/speaking-enquiry-form.html`), not a duplicate general form.

*(No separate structural handoff exists for this page yet.)*

## 6. Books

1. **Opening** — simple, centred, no imagery.
2. **Always Enough (live book)** — the page's commercial anchor. Image-and-text side by side (real photo prioritised over a flat cover graphic), title, description, prominent "Read Always Enough on Amazon" button, the one external-platform link on the whole site.
3. **What Readers Say** — three testimonials, three-column desktop / stacked mobile, star ratings, quote, attribution.
4. **The Power Of Enough (Coming 2026)** — deliberate tonal break: dark forest-green background, italic fragment lines, atmosphere over clarity. Built from `content/power-of-enough-notify-form.html` as-is or as the direct visual foundation. Email capture connects to SendPulse.
5. **Closing/CTA** — simple, shorter than other closings. "Read Vaida's Story →" routes to About, styled as a secondary link, not the primary CTA weight.

## 7. Contact

1. **Opening** — "Let's talk."
2. **The Primary Path** — Clarity Call framing, primary "Book a Clarity Call" button.
3. **Other Ways to Reach Me** — general enquiry form, link to the dedicated Speaking enquiry form (not duplicated here), two email addresses (`hello@` and `speaking@alwaysenoughmethod.com`, neither created yet, see BUILD_LOG.md).
4. **Response Time** — "I read every message personally," 2–3 working days, priority for flagged time-sensitive enquiries.

*(No separate structural handoff exists for this page yet.)*

## 8. Blog/Resources (the one page designed to keep growing)

1. **Opening** — simple, centred, standard treatment.
2. **Resource Library** — transactional zone. Two-card layout (expandable), each with thumbnail, title, description, "Download free" button triggering email capture. On submission: resource delivered (download link or automated email) and visitor added to Vaida's list.
3. **Blog Feed** — editorial zone, visually distinct from the Resource Library. Cards/list entries: title, excerpt, "Read more" link. Pagination or "load more" as it grows, not one infinite page.
4. **Individual Blog Post Pages (template)** — standard long-form article layout: title, byline/date, narrow readable column, consistent subheadings, closing CTA pair (two links) on every post. SEO essentials per post: page title, meta description, clean URL slug, all already specified for both launch posts in `content/pages/blog-resources.md`.

## 9. Privacy Policy

Standard UK privacy-policy sections (Introduction, What's Collected, Why, How Stored, Cookies,
Your Rights, Contact), see `content/pages/privacy-policy.md` in full. No distinct visual
handoff was produced for this page, it should read as a plain, readable legal page, not styled
as a marketing page. **Not ready to publish without solicitor/policy-service review.**

## Cross-site notes carried into every page

- Consistent "Book a Clarity Call" button styling wherever it appears, sitewide.
- Mobile-first check on every page before calling it done, per `docs/ENGINEERING_RULES.md`.
- The Money Tree and Flower graphics referenced throughout do not exist in finished form yet (a
  rough Flower graphic exists in Vaida's Drive; needs refining to the site's exact palette).
  Real photography (Home hero, About story section, Speaking stage photos, Books cover) is not
  yet sourced. Both are launch blockers, not Stage 02 concerns, tracked in `docs/BUILD_LOG.md`.
