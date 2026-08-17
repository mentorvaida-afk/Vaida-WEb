import type { Metadata } from "next";
import Image from "next/image";
import { getPageMarkdown, proseBlocks } from "@/lib/content";
import { Eyebrow } from "@/components/Eyebrow";
import { Prose } from "@/components/Prose";
import { BookingCallout } from "@/components/BookingCallout";

const TITLE = "About Vaida V. Stone | Always ENOUGH™";
const DESCRIPTION =
  "31 years designing behavioural change, an immigrant story rebuilt from nothing, and the founder of the Always ENOUGH™ Method.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/about" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

// Copy sourced verbatim from content/pages/about.md, supplied directly by Vaida 2026-08-17 —
// see docs/PAGE_BLUEPRINTS.md for the section layout this follows.
const OPENING_LINE = "You are not the only one who has felt this way.";
const PULL_QUOTE = "I was unstoppable.";
const CREDENTIALS_INTRO = "The foundations behind the method:";
const CLOSING_HEADING = "You do not need permission to want more for yourself. You just need the courage to begin.";

export default function AboutPage() {
  const { body } = getPageMarkdown("about");
  const copy = body.split("**Note on this file**")[0] ?? body;
  const rawBlocks = proseBlocks(copy);

  // The opening line is already the hero's <h1> below — drop it here so it isn't repeated
  // verbatim as the first line of body copy too.
  const blocks = rawBlocks[0] === OPENING_LINE ? rawBlocks.slice(1) : rawBlocks;

  const pullQuoteIndex = blocks.findIndex((b) => b === PULL_QUOTE);
  const introIndex = blocks.findIndex((b) => b.startsWith(CREDENTIALS_INTRO));
  // Section 6's closing line is rendered once, below, through the styled BookingCallout band —
  // stop the plain-text flow before it so it isn't shown a second time as an unstyled paragraph.
  const closingIndex = blocks.findIndex((b) => b === CLOSING_HEADING);

  const storyBeforeQuote = blocks.slice(0, pullQuoteIndex);
  const storyAfterQuote = blocks.slice(pullQuoteIndex + 1, introIndex);
  const credentials = blocks.slice(introIndex, introIndex + 2);
  const afterCredentials = blocks.slice(introIndex + 2, closingIndex === -1 ? undefined : closingIndex);

  return (
    <main>
      <section className="bg-forest px-6 py-20 text-pearl">
        <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <Eyebrow tone="gold">About</Eyebrow>
            <h1 className="font-display mt-4 text-4xl italic md:text-5xl">
              You are not the only one who has felt this way.
            </h1>
          </div>
          <Image
            src="/photos/vaida-about-opening.jpg"
            alt="Vaida V. Stone, founder of the Always ENOUGH™ Method"
            width={1086}
            height={1392}
            priority
            quality={100}
            sizes="(min-width: 1024px) 440px, (min-width: 768px) 45vw, 90vw"
            className="h-auto w-full rounded-sm"
          />
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <Prose blocks={storyBeforeQuote} className="text-lg text-ink" />
          <p className="font-display my-10 text-center text-3xl italic text-gold md:text-4xl">
            {PULL_QUOTE}
          </p>
          <Prose blocks={storyAfterQuote} className="text-lg text-ink" />
        </div>
      </section>

      <section className="bg-gold/10 px-6 py-20">
        <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2 md:items-center">
          <Image
            src="/photos/vaida-about-credentials.jpg"
            alt="Vaida V. Stone, credentials and professional background"
            width={1363}
            height={1792}
            quality={100}
            sizes="(min-width: 1024px) 440px, (min-width: 768px) 45vw, 90vw"
            className="h-auto w-full rounded-sm md:order-2"
          />
          <div className="md:order-1">
            <h2 className="font-display mb-4 text-2xl text-forest">Credentials</h2>
            <Prose blocks={credentials} className="text-lg text-ink" />
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <Prose blocks={afterCredentials} className="mx-auto max-w-2xl text-lg text-ink" />
      </section>

      <section className="bg-forest px-6 py-24">
        <BookingCallout
          heading={CLOSING_HEADING}
          body="If any part of this feels familiar, that is not a coincidence, and it is not something you have to sit with alone. A Clarity Call is not a sales conversation. It is a space to be honest about where you are, and to decide, for yourself, whether now is the moment to change it. There is no obligation to work with me. There is only the question worth asking yourself today."
          tone="dark"
        />
      </section>
    </main>
  );
}
