import type { Metadata } from "next";
import Image from "next/image";
import { getPageMarkdown, proseBlocks } from "@/lib/content";
import { Eyebrow } from "@/components/Eyebrow";
import { Prose } from "@/components/Prose";
import { Card } from "@/components/Card";
import { SpeakingEnquiryForm } from "@/components/SpeakingEnquiryForm";

const TITLE = "Speaking | Always ENOUGH™";
const DESCRIPTION =
  "Keynotes, workshops, and training on emotional and financial confidence, for corporate, HR, financial services, and women's empowerment audiences.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/speaking" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/speaking" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

const AUDIENCE_MARKERS = [
  "**Corporate & HR",
  "**AI Confidence Training",
  "**Women's Empowerment",
  "**Financial Services",
];
const FORMATS_MARKER = "Every session is shaped around your audience";
const REACH_MARKER = "I have spoken from stages in Paris";

// One entry per AUDIENCE_MARKERS position, in the same order. Every photo is shown at its
// natural, uncropped dimensions inside its Card, the same approach used throughout, no
// object-cover or forced aspect ratio. `null` means that card has no photo yet.
const AUDIENCE_IMAGES: ({ src: string; alt: string; width: number; height: number } | null)[] = [
  {
    src: "/photos/vaida-speaking-corporate.jpg",
    alt: "Vaida V. Stone presenting ‘Empowering Employees Through Financial Health’ to a corporate boardroom audience.",
    width: 1342,
    height: 866,
  },
  {
    src: "/photos/vaida-speaking-ai-confidence.jpg",
    alt: "Vaida V. Stone delivering AI confidence training.",
    width: 1802,
    height: 1802,
  },
  {
    src: "/photos/vaida-speaking-womens-empowerment.jpg",
    alt: "Vaida V. Stone speaking to a room of women at a women's empowerment event, ‘The Grove’.",
    width: 2048,
    height: 1060,
  },
  {
    src: "/photos/vaida-speaking-financial-advisers.jpg",
    alt: "Vaida V. Stone receiving a Quality Awards Adviser recognition at a financial services industry event.",
    width: 1024,
    height: 768,
  },
];

// Copy sourced verbatim from content/pages/speaking.md — see docs/PAGE_BLUEPRINTS.md, section 5.
// The AI worry/familiarity statistic in the AI Confidence Training block is flagged in
// docs/BUILD_LOG.md as not independently source-verified; do not remove this note before that's resolved.
export default function SpeakingPage() {
  const { body } = getPageMarkdown("speaking");
  const copy = body.split("## Decisions locked")[0] ?? body;
  const blocks = proseBlocks(copy);

  const opening = blocks.filter(
    (b) => b.startsWith("Emotional wellbeing") || b.startsWith("I speak to organisations"),
  );
  const philosophy = blocks.filter(
    (b) => b.startsWith("Every audience I speak to") || b.startsWith("Confidence, financial") || b.startsWith("What changes from room"),
  );

  const audienceStarts = AUDIENCE_MARKERS.map((m) => blocks.findIndex((b) => b.startsWith(m)));
  const formatsStart = blocks.findIndex((b) => b.startsWith(FORMATS_MARKER));
  const audienceGroups = audienceStarts.map((start, i) => {
    const end = audienceStarts[i + 1] ?? formatsStart;
    return blocks.slice(start, end === -1 ? undefined : end);
  });

  const reachStart = blocks.findIndex((b) => b.startsWith(REACH_MARKER));
  const formatsBlocks = blocks.slice(formatsStart, reachStart);
  const enquiryStart = blocks.findIndex((b) => b.startsWith("Ready to bring this conversation"));
  const reachBlocks = blocks.slice(reachStart, enquiryStart);

  return (
    <main>
      <section className="bg-forest px-6 py-20 text-pearl md:py-28">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <Eyebrow tone="gold">Speaking</Eyebrow>
            <h1 className="font-display mt-4 mb-8 text-4xl italic md:text-5xl">
              Bring this conversation into your room.
            </h1>
            <Prose blocks={opening} className="max-w-xl text-lg text-pearl/90" />
          </div>
          {/* Updated 2026-08-17: Vaida's final photo, 3120×1200, Forest Green background
              pre-matched to the section. Same exact pattern as the Home hero above (and Reset):
              a dedicated aspect-[4/5] box within this grid column, not a full-section background
              — that distinction matters, a true full-bleed-behind-the-text treatment is the
              pattern this session already found and fixed a real bug in (heading text landing on
              Vaida's face at mobile/tablet/laptop widths), so it deliberately isn't used here.
              object-right matches this photo's composition (Vaida in a narrow right-hand strip);
              the pre-matched green background means the crop edge is invisible against the
              section regardless. */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
            <Image
              src="/photos/vaida-speaking-hero.jpg"
              alt="Vaida V. Stone"
              fill
              priority
              quality={100}
              // See src/app/page.tsx for why this is 100vw rather than the box's own width —
              // object-cover needs enough resolution to cover the box's height, not just its
              // width, when cropping a wide source into a tall box, or it stretches and blurs.
              sizes="100vw"
              className="object-cover object-right"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <Prose blocks={philosophy} className="mx-auto max-w-2xl text-lg text-ink" />
      </section>

      <section className="bg-gold/10 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display mb-10 text-center text-2xl text-forest md:text-3xl">
            Who I speak for
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {audienceGroups.map((group, i) => {
              const heading = group[0]?.replace(/^\*\*|\*\*$/g, "");
              const image = AUDIENCE_IMAGES[i] ?? null;
              return (
                <Card key={i} className={image ? "overflow-hidden !p-0" : undefined}>
                  {image && (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      quality={100}
                      sizes="(min-width: 1024px) 440px, (min-width: 768px) 50vw, 100vw"
                      className="h-auto w-full"
                    />
                  )}
                  <div className={image ? "p-8" : undefined}>
                    <h3 className="font-display mb-3 text-xl text-forest-deep">{heading}</h3>
                    <Prose blocks={group.slice(1)} className="text-sm text-ink/85" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display mb-6 text-2xl text-forest">Formats</h2>
          <Prose blocks={formatsBlocks} className="text-lg text-ink" />
        </div>
      </section>

      <section className="bg-gold/10 px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display mb-6 text-2xl text-forest">Reach, languages &amp; credentials</h2>
          <Prose blocks={reachBlocks} className="text-lg text-ink" />
        </div>
      </section>

      <section className="bg-forest px-6 py-24 text-pearl">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display mb-4 text-3xl">
            Ready to bring this conversation into your organisation, conference, or event?
          </h2>
          <p className="mb-10 text-pearl/85">
            Tell me about your audience, your goals, and your timeline, and I&rsquo;ll get back to
            you with availability and options suited to your event.
          </p>
        </div>
        <div className="mx-auto max-w-xl rounded-sm bg-pearl p-8">
          <SpeakingEnquiryForm />
        </div>
      </section>
    </main>
  );
}
