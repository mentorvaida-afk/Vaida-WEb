# Stage 08 — Launch & observability

**In**: A fully passed inspection from Stage 07.

**Do**: Migrate DNS from Hostinger following the written rollback plan in
`docs/PRODUCT_HARDENING_AND_SCALING.md`, at a low-traffic time. Turn on uptime monitoring.
Confirm rollback works by testing it once, deliberately, before relying on it.

**Out**: live site on alwaysenoughmethod.com, monitored, with a tested rollback path.

**Done when**: the site is live, monitored, and Vaida has confirmed she can see it working from
her own phone, on her own network, not just in a browser preview.

**Do not look at**: new features. Launch is a checkpoint, not a finish line — v2 ideas go in a
new stage folder, not into this one.
