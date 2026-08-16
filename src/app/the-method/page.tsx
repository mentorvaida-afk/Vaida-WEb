import type { Metadata } from "next";
import Image from "next/image";
import { getPageMarkdown, proseBlocks } from "@/lib/content";
import { Eyebrow } from "@/components/Eyebrow";
import { Prose } from "@/components/Prose";
import { BookingCallout } from "@/components/BookingCallout";

export const metadata: Metadata = {
  title: "The Method | Always ENOUGH™",
  description:
    "The Always E.N.O.U.G.H.™ Flower: six steps, mind, heart and money working together rather than separately.",
};

// Every petal line in content/pages/the-method.md follows "Letter — Name. Tagline. Description."
// Parsed into parts rather than rendered as one string so the em dash in the source format never
// reaches the page, per PROMISE.md's no-long-dashes rule (same approach as the Reset page's
// week cards).
function parsePetal(line: string) {
  const match = line.match(/^(\w)\s+—\s+([^.]+)\.\s+([^.]+)\.\s+(.+)$/s);
  return {
    letter: match?.[1] ?? "",
    name: match?.[2] ?? line,
    tagline: match?.[3] ?? "",
    description: match?.[4] ?? "",
  };
}

// All five sections are now real, approved copy from Vaida (2026-08-15), sourced from
// content/pages/the-method.md, not hardcoded here, per docs/ENGINEERING_RULES.md. The Flower
// graphic itself is still a plain CSS grid stand-in, not the commissioned illustration, see
// docs/BUILD_LOG.md.
export default function TheMethodPage() {
  const { body } = getPageMarkdown("the-method");
  const sections = body.split(/\n---\n/).map((section) => proseBlocks(section));
  const [opening = [], treeRecap = [], flower = [], howItWorks = [], authority = []] = sections;
  const [openingHeadline, ...openingParagraphs] = opening;
  const petals = flower.map(parsePetal);

  return (
    <main>
      <section className="bg-forest px-6 py-20 text-pearl">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="gold">The Method</Eyebrow>
          <h1 className="font-display mt-4 text-4xl italic md:text-5xl">
            The Always E.N.O.U.G.H.™ Flower
          </h1>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-2xl">
          {openingHeadline && (
            <h2 className="font-display mb-4 text-3xl text-forest md:text-4xl">{openingHeadline}</h2>
          )}
          <Prose blocks={openingParagraphs} className="text-lg text-ink" />
        </div>
      </section>

      <section className="bg-gold/10 px-6 py-16">
        <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2 md:items-center">
          <Prose blocks={treeRecap} className="text-lg text-ink" />
          <Image
            src="/photos/vaida-method-tree.jpg"
            alt="Vaida V. Stone with the Money Tree, the Always ENOUGH™ Method's grounding metaphor"
            width={1152}
            height={2048}
            sizes="(min-width: 768px) 40vw, 90vw"
            className="h-auto w-full rounded-sm"
          />
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-4 md:grid-cols-3">
            {petals.map((petal) => (
              <div key={petal.letter} className="rounded-sm border border-line bg-white p-6">
                <span className="font-display block text-3xl text-gold">{petal.letter}</span>
                <h3 className="font-display mt-1 text-xl text-forest-deep">{petal.name}</h3>
                <p className="mt-1 text-sm font-medium uppercase tracking-wide text-ink/50">
                  {petal.tagline}
                </p>
                <p className="mt-3 text-sm text-ink/80">{petal.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <Prose blocks={howItWorks} className="mx-auto max-w-2xl text-lg text-ink" />
      </section>

      <section className="px-6 py-12">
        <Prose blocks={authority} className="mx-auto max-w-2xl text-lg text-ink" />
      </section>

      <section className="bg-forest px-6 py-24">
        <BookingCallout heading="See how the six steps apply to where you are." tone="dark" secondaryHref="/blog" secondaryLabel="Download the free workbook" />
      </section>
    </main>
  );
}
