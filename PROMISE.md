# PROMISE.md — What this system must always do, never do, and what "finished" means

Written before the code, as the rule requires. If a future decision contradicts this file, the
file wins until Vaida changes it.

## This system must ALWAYS

- Load fast and work perfectly on a mobile phone, first. Most of this audience will meet Vaida
  on their phone, often on a lunch break or after the kids are asleep.
- Present one clear next step per page. A confused visitor does not book a call.
- Be accessible: readable contrast, real alt text, keyboard navigable, works with a screen reader.
  This audience includes highly sensitive people; a site that is hard to use is a site that pushes
  them away.
- Protect any data a visitor gives it (email address, call booking details) — encrypted in
  transit, never sold, never shared, GDPR-compliant as a UK-based service handling UK/EU data.
- Keep British English, the confirmed brand colours and fonts, and the non-negotiables in
  CLAUDE.md, on every page, without exception.
- Be truthful. Every credential, statistic, and story on the site must be something Vaida has
  actually said is true.
- Be recoverable. Any deploy can be rolled back in minutes, not hours.

## This system must NEVER

- Mention flower psychometry, colour therapy, or any holistic 1:1 tool in public-facing content.
- Use "The Money Gardener" outside TikTok/informal social contexts.
- Use ® instead of ™, or drop the ™ entirely.
- Store secrets (API keys, credentials) in the repository. Ever.
- Ship a change to production without passing the inspection gate in
  `docs/INSPECTION_CHECKLIST.md`.
- Auto-publish AI-generated copy to the live site without Vaida's review. The AI suggests, Vaida
  decides.
- Collect more personal data from a visitor than the task in front of them requires.

## What "finished" means for this project (v1)

v1 is finished when:

1. A stranger can land on the homepage, understand within seconds who Vaida is and who she
   helps, and reach either the booking flow or the free workbook in two clicks or fewer.
2. The site passes every check in `docs/INSPECTION_CHECKLIST.md`.
3. It runs on real hosting, on a real domain, with monitoring and backups in place, as described
   in `docs/PRODUCT_HARDENING_AND_SCALING.md`.
4. Vaida has reviewed and approved every page of copy herself.

Anything beyond that (blog, member area, courses, multi-language) is v2+ and lives in its own
future stage folder, not bolted onto v1 under time pressure.
