import type { Metadata } from "next";
import Image from "next/image";
import { getPageMarkdown, proseBlocks } from "@/lib/content";
import { Eyebrow } from "@/components/Eyebrow";
import { Prose } from "@/components/Prose";
import { BookingCallout } from "@/components/BookingCallout";

export const metadata: Metadata = {
  title: "About Vaida V. Stone | Always ENOUGH™",
  description:
    "31 years designing behavioural change, an immigrant story rebuilt from nothing, and the founder of the Always ENOUGH™ Method.",
};

// Copy sourced from content/pages/about.md. NOTE: that file is an AI-generated summary, not
// verbatim text (see docs/BUILD_LOG.md) — re-confirm exact wording with Vaida before launch.
export default function AboutPage() {
  const { body } = getPageMarkdown("about");
  const copy = body.split("**Note on this file**")[0] ?? body;
  const blocks = proseBlocks(copy);

  const credentialsIndex = blocks.findIndex((b) => b.startsWith("- Teacher since 1995"));
  const credentials = blocks[credentialsIndex];
  const beforeCredentials = blocks.slice(0, credentialsIndex);
  const afterCredentials = blocks.slice(credentialsIndex + 1);

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
            sizes="(min-width: 768px) 40vw, 90vw"
            className="h-auto w-full rounded-sm"
          />
        </div>
      </section>

      <section className="px-6 py-20">
        <Prose blocks={beforeCredentials} className="mx-auto max-w-2xl text-lg text-ink" />
      </section>

      <section className="bg-gold/10 px-6 py-20">
        <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2 md:items-center">
          <Image
            src="/photos/vaida-about-credentials.jpg"
            alt="Vaida V. Stone, credentials and professional background"
            width={1363}
            height={1792}
            sizes="(min-width: 768px) 40vw, 90vw"
            className="h-auto w-full rounded-sm md:order-2"
          />
          <div className="md:order-1">
            <h2 className="font-display mb-4 text-2xl text-forest">Credentials</h2>
            {credentials && <Prose blocks={[credentials]} className="text-lg text-ink" />}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <Prose blocks={afterCredentials} className="mx-auto max-w-2xl text-lg text-ink" />
      </section>

      <section className="bg-forest px-6 py-24">
        <BookingCallout
          heading="You do not need permission to want more for yourself."
          body="A Clarity Call is an honest conversation, with no sales pressure and no obligation."
          tone="dark"
        />
      </section>
    </main>
  );
}
