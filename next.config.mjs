/** @type {import('next').NextConfig} */
const config = {
  // Next.js 16 re-injects an "agent rules" block into CLAUDE.md on every `next dev` run.
  // CLAUDE.md is this project's own root context file (see CLAUDE.md itself, PROMISE.md,
  // README.md), a pre-existing convention this feature would otherwise collide with — disabled.
  agentRules: false,

  // Every photo on the site requests quality={100} explicitly (see e.g. src/app/page.tsx) —
  // Next.js 16 rejects any quality value not allow-listed here, per Vaida's hard rule that
  // photos load at their best quality, not the framework's compressed default.
  images: {
    qualities: [75, 100],
  },

  // Security headers, per docs/PRODUCT_HARDENING_AND_SCALING.md and
  // docs/INSPECTION_CHECKLIST.md check 10. HTTPS enforcement and HSTS are handled at the
  // hosting/edge level (Vercel), not here.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default config;
