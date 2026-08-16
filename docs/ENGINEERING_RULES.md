# ENGINEERING_RULES.md

## Code standards

- TypeScript strict mode on. No `any` without a comment explaining why it's unavoidable.
- Components are small and named for what they show the user (`BookingCallout`, not
  `Section3`), per `frontend-design` naming discipline — name things by what the person sees,
  not by how the system is built.
- No inline hex colours or arbitrary font names in components — use the design tokens from
  `docs/BRAND_CONTEXT.md` / `tailwind.config.ts`.
- Every image has real, descriptive alt text. Decorative images use empty alt, not missing alt.
- Every interactive element is keyboard-reachable and has a visible focus state.
- Copy lives in `content/`, not hardcoded inside components, wherever it is likely to change.

## Git workflow

- `main` is always deployable. No direct commits to `main` — every change goes through a preview
  deploy first.
- Commit messages describe the user-facing effect ("Fix booking button not visible on mobile
  Safari"), not the mechanism ("update CSS").
- Every shortcut taken under time pressure gets written down in `docs/KNOWN_SHORTCUTS.md`
  (create this file the first time it's needed). A written shortcut is a debt that gets paid
  later. An unwritten one becomes a trap.

## Environment & secrets

- No API keys, tokens, or credentials in the repository, ever — not in code, not in commit
  history, not in comments. Use `.env.local` (already gitignored) locally and the hosting
  platform's environment variable settings in production.
- `.env.example` documents every variable the project needs, with placeholder values only.

## Testing, before anything is called finished

- Every page: does it work on a real phone (not just a resized browser window)?
- Every form (booking, email capture): what happens when it's submitted with bad data, no
  network, or twice quickly?
- Every deploy: does the previous version still roll back cleanly if this one breaks something?

## Performance budget

- Largest Contentful Paint under 2.5s on a throttled mobile connection.
- No page ships more JavaScript than it needs — most marketing pages should need almost none.
- Images served in modern formats (WebP/AVIF) and sized for their actual display size.

## Review before publish

No AI-generated or AI-edited copy goes live without Vaida reading it first. This applies to
every page, every button label, every error message.
