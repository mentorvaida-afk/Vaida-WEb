import type { Metadata } from "next";
import { getPageMarkdown, proseBlocks } from "@/lib/content";
import { Prose } from "@/components/Prose";

export const metadata: Metadata = {
  title: "Privacy Policy | Always ENOUGH™",
  alternates: { canonical: "/privacy-policy" },
};

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
