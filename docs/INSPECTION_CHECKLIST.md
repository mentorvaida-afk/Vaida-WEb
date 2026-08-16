# INSPECTION_CHECKLIST.md — Step 3: no score, no shipping

Before any version of this site goes live (or after any significant change), it faces this
inspection. Three grades only: **PASS** (point to the exact file/setting that proves it),
**GROWING** (started, name what's missing), **MISSING** (not there — fix it, or write down why
it can wait, and get Vaida's sign-off on that decision).

| # | Check | Grade | Evidence |
|---|---|---|---|
| 1 | Works correctly on a real mobile phone, not just a resized window | | |
| 2 | Largest Contentful Paint under 2.5s on throttled mobile | | |
| 3 | No broken links, no placeholder ("lorem ipsum") text anywhere | | |
| 4 | Accessible: contrast passes WCAG AA, keyboard navigable, real alt text | | |
| 5 | All copy is British English, brand-consistent, ™ used correctly, no long dashes | | |
| 6 | No mention of flower psychometry or "The Money Gardener" on the site | | |
| 7 | Booking flow (Calendly) tested end to end, including on mobile | | |
| 8 | Email capture form tested: valid input, invalid input, spam resistance | | |
| 9 | No secrets/API keys committed to the repository | | |
| 10 | HTTPS enforced, security headers set (see `PRODUCT_HARDENING_AND_SCALING.md`) | | |
| 11 | Analytics live and privacy-compliant (cookie banner if legally required) | | |
| 12 | Backup/rollback tested: can the previous version be restored in minutes | | |
| 13 | Vaida has personally read and approved every page of copy | | |

## Rules for this table

- **Pointing is required.** "We handle that" is not evidence. Point to the file, the setting, the
  test result.
- This table gets copied and filled in before every launch or major release, dated, and kept in
  version history — not overwritten each time.
- Anything not PASS blocks launch unless Vaida explicitly signs off on shipping with it GROWING
  or MISSING, in writing, with a named date it will be fixed by.
