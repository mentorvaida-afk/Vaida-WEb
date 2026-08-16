import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPageMarkdown, proseBlocks } from "@/lib/content";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Prose } from "@/components/Prose";
import { BookingCallout } from "@/components/BookingCallout";

export const metadata: Metadata = {
  title: "Always ENOUGH™ | Vaida V. Stone",
  description:
    "Helping women 40+ build financial and emotional confidence, with Vaida V. Stone, creator of the Always ENOUGH™ Method.",
};

// Copy sourced from content/pages/homepage.md — see docs/PAGE_BLUEPRINTS.md, section 1, for
// the five-section structure this layout follows.
export default function HomePage() {
  const { body } = getPageMarkdown("homepage");
  const copy = body.split("## Decisions locked")[0] ?? body;
  const sections = copy.split(/\n---\n/).map((section) => proseBlocks(section));
  const [hero = [], reframe = [], whoFor = [], methodPreview = [], closing = []] = sections;

  return (
    <main>
      <section className="relative flex min-h-[480px] items-center overflow-hidden bg-forest px-6 py-24 text-pearl md:min-h-[640px] md:py-32">
        <Image
          src="/photos/vaida-home-hero.jpg"
          alt="Vaida V. Stone"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[right_center]"
        />
        {/* Dark scrim over the photo so the pearl text keeps its contrast, per
            docs/ENGINEERING_RULES.md's readable-contrast rule. Native file is 3120×1200.
            object-cover + object-[right_center]: crops from the left (empty/green space in
            the source) as the section's rendered aspect ratio changes, keeping the right side
            of the photo anchored in frame so it never overlaps the text column on the left. */}
        <div className="absolute inset-0 bg-forest-deep/40" aria-hidden="true" />
        <div className="relative mx-auto max-w-2xl">
          <Eyebrow tone="gold">Financial &amp; Emotional Wellbeing</Eyebrow>
          <h1 className="font-display mt-6 mb-8 text-4xl italic leading-tight md:text-5xl">
            Your confidence did not disappear.
          </h1>
          <Prose blocks={hero} className="mb-10 max-w-xl text-lg text-pearl/90" />
          <Button href="https://calendly.com/vaidastone" variant="primary">
            Book a Clarity Call
          </Button>
        </div>
      </section>

      <section className="px-6 py-20">
        <Prose blocks={reframe} className="font-display mx-auto max-w-2xl text-xl text-forest md:text-2xl" />
      </section>

      <section className="bg-gold/10 px-6 py-20">
        <Prose blocks={whoFor} className="mx-auto max-w-2xl text-lg text-ink" />
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <Prose blocks={methodPreview} className="mb-6 text-lg text-ink" />
          <Link href="/the-method" className="text-sm font-medium text-forest underline underline-offset-4">
            Explore the Method →
          </Link>
        </div>
      </section>

      <section className="bg-forest px-6 py-24">
        <BookingCallout
          heading="You do not need to have it all figured out before we speak."
          body={closing.find((b) => b.startsWith("You just")) ?? closing[1]}
          tone="dark"
        />
        <p className="mt-6 text-center text-sm text-pearl/70">
          Not ready to talk yet?{" "}
          <Link href="/blog" className="underline underline-offset-4">
            Download the free workbook
          </Link>{" "}
          and start where you are.
        </p>
      </section>
    </main>
  );
}
