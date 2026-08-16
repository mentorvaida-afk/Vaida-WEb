# USER_EXPERIENCE_FIRST.md

Technology decisions in this project are made in this order: **who is here, what do they need to
feel and do, then what is the simplest technology that delivers that.** Never the reverse.

## The people who arrive here

**1. The overwhelmed professional woman, 40+**
Found Vaida through a talk, a LinkedIn post, or a friend's recommendation. She is tired, capable,
and has been managing everyone else's needs before her own for years. She does not want a sales
funnel. She wants to feel seen in the first ten seconds and trust that this is not generic
"girlboss" content.
*Needs from the site*: an opening line or image that names her exact feeling. A fast, calm,
uncluttered path to either "read/watch something that helps right now" or "talk to a real
person." Nothing that feels like pressure.

**2. The event bureau or corporate booker researching Vaida as a speaker**
Scanning quickly, comparing several speakers, needs credibility signals fast: topics, past
stages, format, how to make contact. Will leave in seconds if the site feels amateur.
*Needs from the site*: a speaker page that reads like authority, not like a hobby. Clear topics,
clear proof, a direct way to request availability.

**3. The potential 1:1 or programme client**
Already warm, wants to know if this is right for her specifically, and wants an easy way to have
a real conversation before committing.
*Needs from the site*: honest description of the offer, what changes for her, and a frictionless
route to the Money Clarity Call.

**4. Vaida herself, publishing and maintaining the site**
Not a developer. Needs to update golden sayings, offers, and copy without needing an engineer
every time, and needs to trust that nothing she does can break the site.
*Needs from the site*: content kept in plain markdown files she (or Claude) can edit safely,
changes previewed before they go live, and a rollback if something goes wrong.

## Working backward into technology

| What the user needs to feel/do | What that requires technically |
|---|---|
| Loads instantly on a phone in patchy signal | Static-first rendering, image optimisation, minimal JS on first load |
| Trusts this is a real, current business | Fast, no broken links, no placeholder text ever visible in production |
| Understands who this is for, in seconds | A deliberate, non-templated hero section — see `docs/BRAND_CONTEXT.md`, built per the studio-grade design process, not a generic coach-site layout |
| Can book a call without friction | Calendly embedded directly, not a redirect chain |
| Can get the free workbook without a hard sell | A simple, honest email capture, one field, clear on what she'll receive |
| Vaida can edit copy safely without breaking the site | Markdown content files separated from code, previewed on every change before publish |
| The site stays trustworthy over years, not just at launch | Everything in `docs/PRODUCT_HARDENING_AND_SCALING.md` |

If any future feature request cannot be traced back to one of the four people above, question
whether it belongs in v1.
