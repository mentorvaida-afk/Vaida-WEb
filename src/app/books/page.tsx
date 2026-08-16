import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPageMarkdown, proseBlocks } from "@/lib/content";
import { Eyebrow } from "@/components/Eyebrow";
import { Prose } from "@/components/Prose";
import { PullQuote } from "@/components/PullQuote";
import { Button } from "@/components/Button";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";

const TITLE = "Books | Always ENOUGH™";
const DESCRIPTION =
  "Always Enough, an Amazon #1 bestseller, and The Power Of Enough, Vaida V. Stone's second book, coming in 2026.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/books" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/books" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

const AMAZON_URL = "https://amzn.eu/d/08Ghp2d9";

// Copy sourced verbatim from content/pages/books.md — see docs/PAGE_BLUEPRINTS.md, section 6.
export default function BooksPage() {
  const { body } = getPageMarkdown("books");
  const blocks = proseBlocks(body).filter((b) => !b.includes("— Email capture field"));

  const intro = blocks.filter(
    (b) => b.startsWith("Some books teach") || b.startsWith("Both of Vaida's books"),
  );
  const alwaysEnoughDesc = blocks.filter(
    (b) => b.startsWith("An Amazon #1 bestseller") || b.startsWith("This is not a budgeting book"),
  );
  const reviews = blocks
    .filter((b) => b.startsWith("★★★★★"))
    .map((b) => {
      const match = b.match(/^★+\s*"(.+)"\s*—\s*(.+)$/s);
      return { quote: match?.[1] ?? b, attribution: match?.[2] ?? "" };
    });
  const powerOfEnoughFragments = blocks.find((b) => b.startsWith("There is a frozen bucket"));
  const powerOfEnoughIntro = blocks.filter(
    (b) => b.startsWith("There is a £25") || b.startsWith("These are not the whole") || b.startsWith("Vaida's second book"),
  );
  const comingSoon = blocks.find((b) => b.startsWith("Coming in 2026"));
  const closing = blocks.filter(
    (b) => b.startsWith("Curious where") || b.startsWith("The About page"),
  );

  return (
    <main>
      <section className="px-6 py-20 text-center">
        <Prose blocks={intro} className="mx-auto max-w-2xl text-lg text-ink" />
      </section>

      <section className="bg-gold/10 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <Image
              src="/photos/vaida-books-always-enough.jpg"
              alt="Vaida V. Stone holding a physical copy of her book, Always Enough, cover visible."
              width={1457}
              height={1792}
              quality={100}
              sizes="(min-width: 1024px) 500px, (min-width: 768px) 45vw, 90vw"
              className="h-auto w-full rounded-sm"
            />
            <div>
              <Eyebrow tone="forest">Available now</Eyebrow>
              <h2 className="font-display mt-3 mb-4 text-3xl text-forest">
                Always Enough
              </h2>
              <p className="mb-4 text-sm uppercase tracking-wide text-ink/60">
                How to Achieve Financial Freedom and Live Your Dream Life Through the Always Enough
                Method
              </p>
              <Prose blocks={alwaysEnoughDesc} className="mb-8 text-base text-ink" />
              <Button href={AMAZON_URL} variant="primary">
                Read Always Enough on Amazon →
              </Button>
            </div>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {reviews.map((review, i) => (
              <PullQuote key={i} quote={review.quote} attribution={review.attribution} rating={5} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest px-6 py-24 text-pearl">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-center">
          <Image
            src="/photos/vaida-books-power-of-enough.jpg"
            alt="Vaida V. Stone holding an open copy of The Power Of Enough, its title facing the reader."
            width={1080}
            height={1787}
            quality={100}
            sizes="(min-width: 1024px) 500px, (min-width: 768px) 45vw, 90vw"
            className="h-auto w-full rounded-sm"
          />
          <div>
            <Eyebrow tone="gold">Coming in 2026</Eyebrow>
            {powerOfEnoughFragments && (
              <p className="font-display my-8 text-lg italic leading-relaxed text-pearl/75">
                {powerOfEnoughFragments.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            )}
            <h2 className="font-display mb-2 text-4xl">The Power Of Enough</h2>
            <p className="font-display mb-8 italic text-gold-soft">
              Why More Will Never Be Enough Until You Feel Enough Within
            </p>
            <Prose blocks={powerOfEnoughIntro} className="mb-10 text-pearl/90" />
            {comingSoon && <p className="mb-6 text-pearl/90">{comingSoon}</p>}
            <EmailCaptureForm
              endpoint="/api/power-of-enough-notify"
              fieldLabel="Your email address"
              buttonLabel="Notify Me"
              consentText="By submitting, you agree to be contacted about this book launch, in line with the Privacy Policy. No spam, just one email, the moment it's real."
              successHeading="You're on the list."
              successBody="You'll be the first to know the moment The Power Of Enough is ready."
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-16 text-center">
        <Prose blocks={closing} className="mx-auto mb-6 max-w-lg text-lg text-ink" />
        <Link href="/about" className="text-sm font-medium text-forest underline underline-offset-4">
          Read Vaida&rsquo;s Story →
        </Link>
      </section>
    </main>
  );
}
