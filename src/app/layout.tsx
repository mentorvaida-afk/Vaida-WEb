import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import "./globals.css";

// Weights match those already used in Vaida's own approved page mockups
// (content/homepage-prototype.html and the three form artifacts) — see docs/BRAND_CONTEXT.md.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alwaysenoughmethod.com"),
  // A plain string, not a title template — every page already sets its own complete title
  // (ending "| Always ENOUGH™"), so a template here would double up that suffix.
  title: "Always ENOUGH™ | Vaida V. Stone",
  description:
    "Helping women 40+ build financial and emotional confidence, with Vaida V. Stone, creator of the Always ENOUGH™ Method.",
  // Every term here is drawn from docs/BRAND_CONTEXT.md's confirmed positioning, not invented —
  // see StructuredData.tsx for the same rule applied to JSON-LD.
  keywords: [
    "financial confidence coach",
    "emotional wellbeing speaker",
    "midlife reinvention coach",
    "confidence coach for women",
    "Always ENOUGH Method",
    "Vaida V. Stone",
  ],
  authors: [{ name: "Vaida V. Stone" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Always ENOUGH™",
    title: "Always ENOUGH™ | Vaida V. Stone",
    description:
      "Helping women 40+ build financial and emotional confidence, with Vaida V. Stone, creator of the Always ENOUGH™ Method.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Always ENOUGH™ | Vaida V. Stone",
    description:
      "Helping women 40+ build financial and emotional confidence, with Vaida V. Stone, creator of the Always ENOUGH™ Method.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${cormorant.variable} ${jost.variable}`}>
      <head>
        {/* Calendly's official embed stylesheet, for the popup widget triggered from
            src/components/Button.tsx — see docs/ARCHITECTURE.md's "Calendly embedded widget". */}
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        <StructuredData />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-gold focus:px-4 focus:py-2 focus:text-forest-deep"
        >
          Skip to content
        </a>
        <Header />
        <div id="main-content">{children}</div>
        <Footer />
        <Analytics />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
