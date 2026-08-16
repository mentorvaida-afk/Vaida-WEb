# CLAUDE.md — Always ENOUGH™ Web Application

This is the root context file. Read this before touching any code, in any session, every time.
If something you are about to do contradicts this file, stop and follow this file.

## What this project is

The official web platform for **Always ENOUGH™**, founded by **Vaida V. Stone**, a Financial
& Emotional Wellbeing Speaker, Author and Coach based in the UK. This is not a brochure site.
It is a conversion and authority platform with two jobs, in this order:

1. Make a visitor feel, within seconds, that this is a real leader with lived authority — not a
   generic coach site.
2. Move the right visitor towards one of two doors: **book a Money Clarity Call**, or
   **download the free workbook / join the list**.

Everything technical in this repository exists to serve those two jobs. If a technical decision
does not serve the user's experience of arriving, understanding, trusting, and acting — it does
not belong here yet. See `docs/USER_EXPERIENCE_FIRST.md`.

## Non-negotiables (brand — never break these, no exceptions)

- **British English only.** Never American spelling, anywhere — copy, comments, commit
  messages, error text.
- **No long dashes (—) in body copy.** Use commas, full stops, or short sentences instead.
- **™ always follows "Always ENOUGH"**. Never ®. Never drop it.
- **"The Money Gardener"** is restricted to TikTok and informal social content only. It must
  never appear on the site itself, in speaker materials, or anywhere professional.
- **Flower psychometry / holistic tools are never mentioned publicly.** They exist only in
  private 1:1 coaching. If any public copy, component, or page references flower psychometry,
  colour therapy, or similar, that is a bug — flag it and stop.
- Brand colours and fonts come from the Canva Brand Kit **"Always Enough 2026"**
  (ID: `kAG-UBsomfs`): Forest Green `#2E4612`, Gold `#CDA74D`, Pearl White `#F7F3ED`.
  Fonts: Cormorant Garamond (display), Jost (body/UI). These are hard-coded as design tokens —
  see `tailwind.config.ts`. Do not introduce other colours or fonts without Vaida's sign-off.
- Sentence case for headings and UI copy, not Title Case.
- No fabricated client names, testimonials, statistics, or credentials. If content needs a real
  detail (a stat, a date, a quote), ask rather than invent.

## Who this is for

Professional women 40+, often high-achieving, who give everything to others and neglect
themselves financially and emotionally. They are not looking for a hustle-culture coach. They
are looking for permission, clarity, and a leader who has lived what they are living.

Full positioning: "Human Confidence, Emotional Resilience & Reinvention in the AI Era" across
three pillars — financial confidence, midlife reinvention, AI & emotional adaptation.

## How this repository is organised (read this before adding files)

This project follows the **Interpretable Context Methodology (ICM)** — folders are the plan.
Each `stages/NN-name/` folder holds one short `STAGE.md` describing exactly what comes in,
what happens, what goes out, and how you know it's done. If you cannot say what a stage does
in one page, the stage is not understood yet, and no code should be written for it.

```
always-enough-web/
├── CLAUDE.md                    ← you are here
├── PROMISE.md                   ← what this system must always/never do
├── docs/                        ← architecture, engineering rules, hardening, brand context
├── stages/                      ← the build plan, one folder per stage, in order
├── src/app/                     ← Next.js routes
├── src/components/              ← UI components
├── src/lib/                     ← utilities, integrations (Calendly, email capture, analytics)
├── content/                     ← markdown content (golden sayings, pages, speaker bio)
└── public/brand/                ← exported brand assets
```

Read `docs/ARCHITECTURE.md` and `docs/ENGINEERING_RULES.md` before writing code.
Read `docs/PRODUCT_HARDENING_AND_SCALING.md` before anything touches production.
Read `docs/BRAND_CONTEXT.md` before writing or approving any user-facing copy or styling.

## The one rule that holds the whole method together

**The AI suggests, the human decides.** Nothing ships because it "looks right." It ships because
it passed the inspection gate in `docs/INSPECTION_CHECKLIST.md`, and because Vaida approved it.
No content, design, or architecture decision is final until she has said so.

## What NOT to look at (focus, by design)

When working inside a `stages/` folder, only read that folder's `STAGE.md` and the specific
`docs/` files it references. Do not read the whole repository "just in case." An AI given
everything gets lost in everything; an AI given only what the step needs works fast and stays
sharp.
