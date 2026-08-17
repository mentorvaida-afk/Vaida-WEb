import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPageMarkdown, proseBlocks } from "@/lib/content";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Prose } from "@/components/Prose";
import { BookingCallout } from "@/components/BookingCallout";

const TITLE = "Always ENOUGH™ | Vaida V. Stone";
const DESCRIPTION =
  "Helping women 40+ build financial and emotional confidence, with Vaida V. Stone, creator of the Always ENOUGH™ Method.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/" },
  twitter: { title: TITLE, description: DESCRIPTION },
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
      <section className="bg-forest px-6 py-24 text-pearl md:py-32">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <Eyebrow tone="gold">Financial &amp; Emotional Wellbeing</Eyebrow>
            <h1 className="font-display mt-6 mb-8 text-4xl italic leading-tight md:text-5xl">
              Your confidence did not disappear.
            </h1>
            <Prose blocks={hero} className="mb-10 max-w-xl text-lg text-pearl/90" />
            <Button href="https://calendly.com/vaidastone" variant="primary">
              Book a Clarity Call
            </Button>
          </div>
          {/* A dedicated, fixed-aspect box for the photo, separate from the text column, so
              the two can never overlap at any viewport width. Native file is 3120×1200, mostly
              empty background either side of Vaida; object-right crops in to just her. */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
            <Image
              src="/photos/vaida-home-hero.jpg"
              alt="Vaida V. Stone"
              fill
              priority
              quality={100}
              // The box is a tall aspect-[4/5] crop of a wide 3120×1200 source (object-cover) —
              // sizes must account for the resolution needed to cover the box's *height*, not
              // just its width, or the browser fetches a variant too short and stretches it up,
              // reading as blur. 100vw forces the largest reasonable source variant every time.
              sizes="100vw"
              className="object-cover object-right"
            />
          </div>
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
