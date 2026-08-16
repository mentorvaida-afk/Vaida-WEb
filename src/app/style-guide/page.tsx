import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Card } from "@/components/Card";
import { PullQuote } from "@/components/PullQuote";
import { BookingCallout } from "@/components/BookingCallout";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";

// Internal reference only, built in Stage 03 (stages/03-design-system/STAGE.md). Not part of
// the public sitemap in docs/SITEMAP.md — noindex so it never gets treated as a real page.
export const metadata: Metadata = {
  title: "Style reference, Always ENOUGH™ (internal)",
  robots: { index: false, follow: false },
};

const swatches = [
  { name: "forest", className: "bg-forest", hex: "#2E4612" },
  { name: "forest-soft", className: "bg-forest-soft", hex: "#3D5C1A" },
  { name: "forest-deep", className: "bg-forest-deep", hex: "#22350D" },
  { name: "gold", className: "bg-gold", hex: "#CDA74D" },
  { name: "gold-soft", className: "bg-gold-soft", hex: "#D9C284" },
  { name: "pearl", className: "bg-pearl", hex: "#F7F3ED" },
  { name: "ink", className: "bg-ink", hex: "#2A2A24" },
  { name: "line", className: "bg-line", hex: "#E3DED0" },
  { name: "error", className: "bg-error", hex: "#A33B2B" },
];

export default function StyleGuidePage() {
  return (
    <main className="mx-auto max-w-4xl space-y-16 px-6 py-16">
      <section>
        <h1 className="font-display text-4xl text-forest">Style reference (internal)</h1>
        <p className="mt-2 text-sm text-ink/70">
          Built in Stage 03. Every colour and font traces back to docs/BRAND_CONTEXT.md. Not
          linked from any public page.
        </p>
      </section>

      <section>
        <h2 className="font-display mb-4 text-2xl text-forest">Colour tokens</h2>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
          {swatches.map((s) => (
            <div key={s.name}>
              <div className={`h-16 w-full rounded-sm border border-line ${s.className}`} />
              <p className="mt-2 text-xs text-ink/70">
                {s.name}
                <br />
                {s.hex}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display mb-4 text-2xl text-forest">Type</h2>
        <p className="font-display text-4xl text-forest">Cormorant Garamond, display</p>
        <p className="font-display text-4xl italic text-forest">Italic, for hero headlines</p>
        <p className="font-body mt-4 text-base text-ink">
          Jost, body and UI copy. Regular weight, used for paragraphs, labels, and buttons.
        </p>
      </section>

      <section>
        <h2 className="font-display mb-4 text-2xl text-forest">Eyebrow</h2>
        <Eyebrow tone="gold">On light backgrounds (gold)</Eyebrow>
        <div className="mt-3 bg-forest p-4">
          <Eyebrow tone="gold">On dark backgrounds (still gold)</Eyebrow>
        </div>
      </section>

      <section>
        <h2 className="font-display mb-4 text-2xl text-forest">Buttons</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/style-guide" variant="primary">
            Primary
          </Button>
          <Button href="/style-guide" variant="secondary">
            Secondary (light bg)
          </Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4 bg-forest p-6">
          <Button href="/style-guide" variant="secondaryOnDark">
            Secondary (dark bg)
          </Button>
        </div>
      </section>

      <section>
        <h2 className="font-display mb-4 text-2xl text-forest">Card</h2>
        <Card className="max-w-sm">
          <p className="text-sm text-ink">A generic bordered panel with the forest-to-gold top accent used across every approved form artifact.</p>
        </Card>
      </section>

      <section>
        <h2 className="font-display mb-4 text-2xl text-forest">Pull quote</h2>
        <PullQuote
          quote="Great book from a great author with plenty of practical tools and real life examples."
          attribution="Nerijus Z., Verified Amazon Purchase"
          rating={5}
        />
      </section>

      <section className="bg-pearl">
        <h2 className="font-display mb-4 text-2xl text-forest">Booking callout, light</h2>
        <BookingCallout
          eyebrow="Ready to begin"
          heading="You do not need to have it all figured out before we speak."
          body="A Clarity Call is a quiet, honest conversation about where you are and what could genuinely change from here."
          secondaryHref="/blog"
          secondaryLabel="Download the free workbook"
        />
      </section>

      <section className="bg-forest p-10">
        <h2 className="font-display mb-4 text-2xl text-pearl">Booking callout, dark</h2>
        <BookingCallout
          eyebrow="Ready to begin"
          heading="Be Always ENOUGH, and have more than enough."
          tone="dark"
        />
      </section>

      <section>
        <h2 className="font-display mb-4 text-2xl text-forest">Email capture form</h2>
        <div className="max-w-md">
          <EmailCaptureForm
            endpoint="/api/power-of-enough-notify"
            fieldLabel="Email address"
            buttonLabel="Notify Me"
            consentText="No spam, just one email, the moment it's real."
            successHeading="You're on the list."
            successBody="You'll be the first to know the moment The Power Of Enough is ready."
          />
        </div>
      </section>
    </main>
  );
}
