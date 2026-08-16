import type { Metadata } from "next";
import { getPageMarkdown, proseBlocks } from "@/lib/content";
import { Prose } from "@/components/Prose";

export const metadata: Metadata = {
  title: "Privacy Policy | Always ENOUGH™",
  robots: { index: false, follow: true },
};

// DRAFT ONLY — see content/pages/privacy-policy.md and docs/BUILD_LOG.md. This page is
// deliberately excluded from search indexing (robots.index: false) until it has had a UK
// solicitor or policy-service review, per the source document's own explicit instruction.
// Rendered plainly, as a legal document, not styled as a marketing page.
export default function PrivacyPolicyPage() {
  const { body } = getPageMarkdown("privacy-policy");
  const sections = body.split(/\n## /).slice(1).map((chunk) => {
    const [heading, ...rest] = chunk.split("\n");
    return { heading, blocks: proseBlocks(rest.join("\n")) };
  });

  return (
    <main className="px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 rounded-sm border border-dashed border-gold/60 bg-gold/5 p-6 text-sm text-forest-soft">
          <strong>Draft only.</strong> This policy has not yet been reviewed by a UK solicitor or
          policy-generation service. Do not treat as ready to publish, per its own source
          document&rsquo;s instruction — see docs/BUILD_LOG.md.
        </div>
        <h1 className="font-display mb-10 text-4xl text-forest">Privacy Policy</h1>
        {sections.map((section) => (
          <section key={section.heading} className="mb-10">
            <h2 className="font-display mb-4 text-2xl text-forest">{section.heading}</h2>
            <Prose blocks={section.blocks} className="text-base text-ink" />
          </section>
        ))}
      </div>
    </main>
  );
}
