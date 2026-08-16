---
title: "Speaking Enquiry Form — Build Spec"
source: "Speaking-Enquiry-Form-Build-Spec (Google Doc), fetched 2026-08-13"
companion_html: "content/speaking-enquiry-form.html"
---

**Routing**

- Primary: email notification to `speaking@alwaysenoughmethod.com` — a new, dedicated
  mailbox, distinct from Vaida's existing `vaida@msvacademy.com` (internal reference only, per
  `docs/BRAND_CONTEXT.md` this domain is never linked or referenced publicly). **This mailbox
  does not exist yet**, must be created via Hostinger email hosting before this form can go live.
- Secondary: every submission also writes a row to a Google Sheet. Suggested columns: Date
  submitted, Name, Organisation, Email, Phone, Audience type(s), Format, In-person/Online,
  Audience size, Event date, Location, Message, Source, Status.

**Explicitly not set up at this stage**: no shared inbox (Vaida is the sole point of contact),
no CRM integration (premature before the site has even launched).

**Reasoning**: Vaida runs this business solo. Direct email keeps enquiries visible immediately,
matching the form copy's own promise ("I read every enquiry personally"). The spreadsheet log is
a near-zero-effort safety net and the natural seed of a future CRM.

**Platform note**: written assuming Elementor/WPForms on WordPress, both of which support a
Google Sheets action natively or via a simple add-on. Needs re-specifying if this build proceeds
on the Next.js stack instead — see `docs/BUILD_LOG.md` for the open platform decision.
