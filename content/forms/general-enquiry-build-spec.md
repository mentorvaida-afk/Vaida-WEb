---
title: "General Enquiry Form — Build Spec"
source: "General Enquiry Form — Build Spec (Google Doc), fetched 2026-08-13"
companion_html: "content/general-enquiry-form.html"
---

Contact form for alwaysenoughmethod.com, designed as the lowest-friction entry point on the
site. Three fields only: name, email, message. "This is the lowest-commitment contact point on
the entire site, and adding more fields would work against its purpose."

**Routing**

- Primary: email notification to `hello@alwaysenoughmethod.com` — **this mailbox does not
  exist yet**, must be created via Hostinger email hosting before this form can go live.
- Secondary: every submission also logs to a Google Sheet (date, first name, email, message,
  status) as a backup and the seed of a future enquiry pipeline.

**Platform note**: written assuming Elementor/WPForms on WordPress. Needs re-specifying if this
build proceeds on the Next.js stack instead — see `docs/BUILD_LOG.md` for the open platform
decision.
