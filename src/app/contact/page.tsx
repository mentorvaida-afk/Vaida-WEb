import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { BookingCallout } from "@/components/BookingCallout";
import { GeneralEnquiryForm } from "@/components/GeneralEnquiryForm";

export const metadata: Metadata = {
  title: "Contact | Always ENOUGH™",
  description: "Book a Clarity Call, ask a question, or get in touch about a speaking engagement.",
};

// Copy sourced from content/pages/contact.md (retrieved as a summary, not verbatim — see
// docs/BUILD_LOG.md). hello@alwaysenoughmethod.com and speaking@alwaysenoughmethod.com
// do not exist yet, both must be created via Hostinger before this page's contact details work.
export default function ContactPage() {
  return (
    <main>
      <section className="bg-forest px-6 py-20 text-center text-pearl">
        <div className="mx-auto max-w-xl">
          <Eyebrow tone="gold">Contact</Eyebrow>
          <h1 className="font-display mt-4 text-4xl italic md:text-5xl">Let&rsquo;s talk.</h1>
          <p className="mt-6 text-lg text-pearl/90">
            Whether you&rsquo;re ready to book a call, have a question first, or simply want to
            say hello, this is the place to start.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <BookingCallout
          eyebrow="The best place to begin"
          heading="A Clarity Call is a real conversation about where you are."
          body="And whether this is the right next step for you."
        />
      </section>

      <section className="bg-gold/10 px-6 py-20">
        <div className="mx-auto max-w-lg">
          <h2 className="font-display mb-2 text-2xl text-forest">Have a question first?</h2>
          <p className="mb-8 text-sm text-ink/70">
            I read every message personally, so replies may take a little longer than an
            automated system, usually within 2–3 working days.
          </p>
          <div className="rounded-sm bg-white p-8">
            <GeneralEnquiryForm />
          </div>
        </div>
      </section>

      <section className="px-6 py-16 text-center">
        <h2 className="font-display mb-4 text-2xl text-forest">Other ways to reach me</h2>
        <p className="text-ink">
          General enquiries:{" "}
          <a href="mailto:hello@alwaysenoughmethod.com" className="underline underline-offset-4">
            hello@alwaysenoughmethod.com
          </a>
        </p>
        <p className="mt-2 text-ink">
          Speaking enquiries:{" "}
          <Link href="/speaking" className="underline underline-offset-4">
            use the Speaking enquiry form
          </Link>{" "}
          or{" "}
          <a href="mailto:speaking@alwaysenoughmethod.com" className="underline underline-offset-4">
            speaking@alwaysenoughmethod.com
          </a>
        </p>
      </section>
    </main>
  );
}
