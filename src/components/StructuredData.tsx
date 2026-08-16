// JSON-LD structured data — invisible to visitors (a <script> tag, never rendered as page text),
// read by search engines and AI answer engines to understand who Vaida is and what Always
// ENOUGH™ offers. Every fact here is drawn directly from docs/BRAND_CONTEXT.md's confirmed
// identity/positioning section — nothing invented, per PROMISE.md's "be truthful" rule. Do not
// add facts here that aren't already approved elsewhere (address, phone, ratings, follower
// counts, etc.) — if a future need arises, source it from Vaida first, same as any other copy.
const BASE_URL = "https://alwaysenoughmethod.com";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#vaida`,
      name: "Vaida V. Stone",
      jobTitle: "Founder, Always ENOUGH™ Method",
      description:
        "Financial & Emotional Wellbeing Speaker, Author and Coach. Learning designer for over thirty years, helping women 40+ build financial and emotional confidence through the Always ENOUGH™ Method.",
      url: `${BASE_URL}/about`,
      knowsAbout: [
        "Financial confidence",
        "Midlife reinvention",
        "Emotional resilience",
        "AI and emotional adaptation",
      ],
      worksFor: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Always ENOUGH™",
      url: BASE_URL,
      founder: { "@id": `${BASE_URL}/#vaida` },
      description:
        "The Always ENOUGH™ Method helps professional women 40+ build financial and emotional confidence, through 1:1 coaching, speaking, and books, founded by Vaida V. Stone.",
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      name: "Always ENOUGH™",
      url: BASE_URL,
      publisher: { "@id": `${BASE_URL}/#organization` },
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
