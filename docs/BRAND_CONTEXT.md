# BRAND_CONTEXT.md

Read this before writing or styling anything user-facing. This is the confirmed source of truth,
not a starting draft.

## Identity

- **Name**: Vaida V. Stone (also written Vaida Venckunienė)
- **Brand**: Always ENOUGH™ Method
- **Confirmed LinkedIn-style headline**: "Founder, Always ENOUGH™ Method | Helping women 40+
  build financial & emotional confidence | Learning Designer | Speaker | Author"
- **Speaker positioning umbrella**: "Human Confidence, Emotional Resilience & Reinvention in the
  AI Era" across three pillars: financial confidence, midlife reinvention, AI & emotional
  adaptation — all framed as applications of her 31-year learning design method.
- **Core reframe**: emotional safety and inner confidence are the primary goal. Financial outcome
  is the visible proof, not the goal itself. Lead with this, always.

## Method (public-facing)

- **The Always ENOUGH™ Method**: six steps — Empower, Nourish, Organise, Unleash, Grow,
  Harmonise — visualised as a flower.
- **The Money Tree**: an accessible entry-point metaphor — Roots (mindset), Stem (identity),
  Branches (emotional connection), Blooms (wealth). Safe for public content.
- Flower psychometry and colour therapy are **private 1:1 tools only** — never referenced on the
  public site. See PROMISE.md.

## Voice

Warm, direct, empowering, elegant, never corporate, never salesy, never generic coach language.
Vaida writes from lived experience: immigrant, single mother, former financial adviser, qualified
teacher since 1995. She has opinions and a strong voice, always respectful. No "game changer",
"hustle", "crush your goals", "unlock your potential", "leverage".

## Language rules

- British English only, everywhere, including code comments and CMS labels.
- No long dashes in body copy.
- Sentence case for headings, not Title Case.
- ™ always follows "Always ENOUGH". Never ®.
- "The Money Gardener" never appears on the website. Social-only.
- Plain vocabulary, short sentences by default (EAL-aware, no idioms that don't translate).

## Design tokens (from Canva Brand Kit "Always Enough 2026", ID: kAG-UBsomfs)

| Token | Value | Use |
|---|---|---|
| `--color-forest` | `#2E4612` | primary, headings, nav |
| `--color-gold` | `#CDA74D` | accent, CTAs, dividers |
| `--color-pearl` | `#F7F3ED` | background, light surfaces |
| Display font | Cormorant Garamond | headings, pull quotes |
| Body/UI font | Jost | body copy, buttons, navigation |

These are wired into `tailwind.config.ts` as design tokens. Do not hardcode hex values in
components; reference the tokens.

## Primary conversion paths (the "dual conversion architecture")

1. **Book a Clarity Call** — Calendly: `calendly.com/vaidastone`. Corrected 2026-08-13: the
   approved page copy locks this exact label sitewide (not "Money Clarity Call"), confirmed
   independently in the Home, Speaking, and Contact final-copy documents. See
   `docs/BUILD_LOG.md`.
2. **Free workbook / list join** — currently hosted at
   `https://always-enough-4djtfug.gamma.site/`; migrate this into the new site's own flow in a
   later stage, do not remove the working link until the replacement is live and tested.

## Content to keep out of any public copy

- Moneywiser Academy Ltd (dissolved) — do not reference.
- msvacademy.com — do not link or reference until Vaida confirms otherwise.
- Any client name, without explicit permission.
- Vaida's children's names, or any detail that could identify them.
- Ex-partners' names.
