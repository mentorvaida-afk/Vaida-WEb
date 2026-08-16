import type { Config } from "tailwindcss";

// Design tokens sourced from Canva Brand Kit "Always Enough 2026" (ID: kAG-UBsomfs), plus
// the supporting shades already used consistently across Vaida's own approved page mockups
// (content/homepage-prototype.html and the three form artifacts) — not new colours, functional
// variants of the same three brand colours, for hover/border/error states.
// Do not add anything here without updating docs/BRAND_CONTEXT.md first —
// that file is the source of truth, this config follows it.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./content/**/*.md"],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#2E4612",
          soft: "#3D5C1A",
          deep: "#22350D",
        },
        gold: {
          DEFAULT: "#CDA74D",
          soft: "#D9C284",
        },
        pearl: "#F7F3ED",
        ink: "#2A2A24",
        line: "#E3DED0",
        error: "#A33B2B",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-jost)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
