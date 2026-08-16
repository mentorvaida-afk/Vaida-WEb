---
title: "Power Of Enough Notify Form — Build Spec"
source: "Power Of Enough Notify Form — Build Spec (Google Doc), fetched 2026-08-13"
companion_html: "content/power-of-enough-notify-form.html"
---

Single-field email capture (no name field, deliberately, to keep friction at a minimum) for
people who want to be notified when The Power Of Enough is published.

**Routing**

- Every submission adds the email to a dedicated **SendPulse** list/tag, kept separate from the
  general newsletter list and the Resource Library leads, so this audience can be emailed once,
  on publish day, exactly as the copy promises ("No spam, just one email, the moment it's real").
- No spreadsheet backup for this one, intentionally: this is pure list-building, the email list
  itself is the record.

**Consent**: stated in the footnote rather than a checkbox, given the single-field, low-effort
design: "By submitting, you agree to be contacted about this book launch, in line with the
Privacy Policy." Revisit if legal review of `content/pages/privacy-policy.md` recommends an
explicit checkbox instead.

**Confirms Gate 1 decision**: SendPulse is already the intended provider for this form and is
referenced as "already used elsewhere per your tool stack" in the Books page structural handoff
— consistent with the SendPulse choice made for this build.
