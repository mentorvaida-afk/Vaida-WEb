import type { Metadata } from "next";
import Script from "next/script";
import { Eyebrow } from "@/components/Eyebrow";

// Private landing page for participants of the VERTA DAUGIAU™ seminar series (Lithuanian).
// Reached by link only: noindex, and deliberately absent from sitemap.ts. It is not disallowed in
// robots.ts either, because a crawler that is blocked can never read the noindex instruction.
export const metadata: Metadata = {
  title: "VERTA DAUGIAU™ | Always ENOUGH™",
  robots: { index: false, follow: false },
};

export default function VertaDaugiauPage() {
  return (
    // lang="lt" tells screen readers and browsers this page is Lithuanian. The Lithuanian letters
    // (ą, č, ė, š, ū, ž) render in the brand fonts: layout.tsx already declares their latin-ext
    // faces, the browser just fetches them on demand.
    <main lang="lt">
      <section className="bg-forest px-6 py-24 text-center text-pearl md:py-32">
        <div className="mx-auto max-w-2xl">
          <Eyebrow tone="gold">VERTA DAUGIAU™</Eyebrow>
          <h1 className="font-display mt-4 text-4xl italic md:text-5xl">
            Pasiruošk mūsų susitikimui
          </h1>
          <div aria-hidden="true" className="mx-auto my-8 h-px w-16 bg-gold" />
          <p className="font-display text-xl italic leading-relaxed text-pearl/90 md:text-2xl">
            Ši darbo knyga lydės tave seminaro metu. Joje atliksime refleksijas ir praktines
            užduotis, todėl rekomenduoju ją atsisiųsti prieš mūsų susitikimą.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-lg rounded-sm border border-line bg-white p-8 md:p-10">
          {/* MailerLite fills this element with the signup form (name, email and the
              GAUTI DARBO KNYGĄ button) once its script below has loaded. */}
          <div className="ml-embedded" data-form="5nzOv3"></div>
        </div>
      </section>

      {/* MailerLite Universal snippet, loaded on this page only and not in the shared layout.
          It is MailerLite's own snippet, unchanged, wrapped in next/script. */}
      <Script id="mailerlite-universal" strategy="afterInteractive">
        {`
          (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
          .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
          n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
          (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
          ml('account', '2604890');
        `}
      </Script>
    </main>
  );
}
