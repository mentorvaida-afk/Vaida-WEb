import type { Metadata } from "next";
import Image from "next/image";
import { getPageMarkdown, proseBlocks } from "@/lib/content";
import { Eyebrow } from "@/components/Eyebrow";
import { Prose } from "@/components/Prose";
import { PullQuote } from "@/components/PullQuote";
import { BookingCallout } from "@/components/BookingCallout";

const TITLE = "The Always ENOUGH™ Emotional & Financial Reset";
const DESCRIPTION =
  "A six-week, one-to-one programme to rebuild the inner steadiness that makes financial clarity possible. £2,000, or two payments of £1,050.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/the-reset" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/the-reset" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

// Copy sourced verbatim from content/pages/the-reset.md — see docs/PAGE_BLUEPRINTS.md, section 4,
// for the eight-section layout this page follows. This is the primary-path sales page.
export default function TheResetPage() {
  const { body } = getPageMarkdown("the-reset");
  const blocks = proseBlocks(body);

  const weeks = blocks.filter((b) => /^\*\*Week \d/.test(b));
  const quoteBlock = blocks.find((b) => b.includes("— Vita T.,"));
  const quote = quoteBlock?.match(/^"(.+)"\s*—\s*(.+)$/s);
  const isForList = blocks.find((b) => /^- You know, quietly/.test(b));
  const notFor = blocks.find((b) => b.startsWith("This is not for you if"));
  const includes = blocks.find((b) => b.startsWith("This includes"));
  const opening = blocks.filter(
    (b) =>
      b.startsWith("You already know") ||
      b.startsWith("This is not a six-week"),
  );
  const whatItIs = blocks.filter(
    (b) =>
      b.startsWith("The Always ENOUGH™ Emotional") ||
      b.startsWith("We work together") ||
      b.startsWith("This is not generic coaching") ||
      b.startsWith("No two journeys"),
  );
  const whatChanges = blocks.filter(
    (b) =>
      b.startsWith("By the end of the Reset") ||
      b.startsWith("The financial clarity is real") ||
      b.startsWith("One client came") ||
      b.startsWith("This is one journey"),
  );
  const clarityCall = blocks.find((b) => b.startsWith("Every Reset begins"));
  const closing = blocks.filter(
    (b) => b.startsWith("You do not need to have this") || b.startsWith("If you have read"),
  );

  return (
    <main>
      <section className="bg-forest px-6 py-24 text-pearl md:py-28">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <Eyebrow tone="gold">The Always ENOUGH™ Reset</Eyebrow>
            <h1 className="font-display mt-4 mb-8 text-4xl italic md:text-5xl">
              You already know something needs to change.
            </h1>
            <Prose blocks={opening} className="max-w-xl text-lg text-pearl/90" />
          </div>
          {/* Same treatment as the Home hero: a dedicated, fixed-aspect box for the photo,
              separate from the text column, so the two can never overlap at any viewport
              width. Native file is 3600×1200, mostly empty background either side of Vaida;
              object-right crops in to just her. See src/app/page.tsx for the matching pattern. */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
            <Image
              src="/photos/vaida-reset-opening.jpg"
              alt="Vaida V. Stone"
              fill
              priority
              quality={100}
              sizes="(min-width: 1024px) 500px, (min-width: 768px) 45vw, 90vw"
              className="object-cover object-right"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <Prose blocks={whatItIs} className="mx-auto max-w-2xl text-lg text-ink" />
      </section>

      <section className="bg-gold/10 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display mb-10 text-center text-2xl text-forest md:text-3xl">
            The journey, week by week
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {weeks.map((week) => {
              // No em dash in the rendered output, per PROMISE.md's brand rule — "Week N" and
              // the step name are shown as two separate lines instead of "Week N — Name".
              const match = week.match(/^\*\*Week (\d) — (\w+)\.\*\*\s*(.+)$/s);
              return (
                <div key={week} className="rounded-sm border border-line bg-white p-6">
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
                    Week {match?.[1]}
                  </span>
                  <p className="font-display mt-1 text-lg text-forest">{match?.[2]}</p>
                  <p className="mt-2 text-sm text-ink/80">{match?.[3]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <Prose blocks={whatChanges} className="mb-10 text-lg text-ink" />
          {quote && <PullQuote quote={quote[1] ?? ""} attribution={quote[2] ?? ""} />}
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display mb-6 text-2xl text-forest">The Reset is for you if:</h2>
          {isForList && <Prose blocks={[isForList]} className="mb-10 text-lg text-ink" />}
          {notFor && (
            <div className="border-t border-line pt-6">
              <Prose blocks={[notFor]} className="text-base text-ink/80" />
            </div>
          )}
        </div>
      </section>

      <section className="bg-forest/5 px-6 py-20">
        <div className="mx-auto max-w-lg rounded-sm border border-line bg-white p-10 text-center">
          <p className="font-display text-4xl text-forest">£2,000</p>
          <p className="mt-1 text-sm text-ink/70">or two payments of £1,050</p>
          {includes && <p className="mt-6 text-base text-ink">{includes}</p>}
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          {clarityCall && <p className="mb-6 text-lg text-ink">{clarityCall}</p>}
        </div>
      </section>

      <section className="bg-forest px-6 py-24">
        <div className="mx-auto max-w-xl">
          <Prose blocks={closing} className="mb-8 text-center text-lg text-pearl/90" />
          <BookingCallout heading="Book a Clarity Call" tone="dark" />
        </div>
      </section>
    </main>
  );
}
