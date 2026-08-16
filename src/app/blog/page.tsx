import type { Metadata } from "next";
import Link from "next/link";
import { getPageMarkdown, proseBlocks, getBlogPosts } from "@/lib/content";
import { Eyebrow } from "@/components/Eyebrow";
import { Card } from "@/components/Card";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";

const TITLE = "Blog & Resources | Always ENOUGH™";
const DESCRIPTION = "Free downloadable resources and articles on money, confidence, and navigating change.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/blog" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

type Resource = { name: string; description: string };

function parseResource(block: string): Resource {
  const match = block.match(/^\*\*(.+?)\*\*\s*—\s*(.+?)\s*\[Download free/s);
  return { name: match?.[1] ?? block, description: match?.[2] ?? "" };
}

// Copy sourced verbatim from content/pages/blog-resources.md — see docs/PAGE_BLUEPRINTS.md,
// section 8. This is the one page in the sitemap explicitly designed to keep growing.
export default function BlogIndexPage() {
  const { body } = getPageMarkdown("blog-resources");
  const introSection = body.split("## Blog Post 1")[0] ?? body;
  const blocks = proseBlocks(introSection);

  const opening = blocks.filter(
    (b) => b.startsWith("Some of what you need") || b.startsWith("Below, a growing library"),
  );
  const resourceBlocks = blocks.filter((b) => b.includes("[Download free"));
  const resources = resourceBlocks.map(parseResource);
  const posts = getBlogPosts();

  return (
    <main>
      <section className="bg-forest px-6 py-20 text-center text-pearl">
        <div className="mx-auto max-w-2xl">
          <Eyebrow tone="gold">Blog &amp; Resources</Eyebrow>
          {opening.map((block, i) => (
            <p key={i} className="mt-4 text-lg text-pearl/90">
              {block}
            </p>
          ))}
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display mb-8 text-2xl text-forest">Free resources</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {resources.map((resource) => (
              <Card key={resource.name}>
                <h3 className="font-display mb-2 text-xl text-forest-deep">{resource.name}</h3>
                <p className="mb-6 text-sm text-ink/80">{resource.description}</p>
                <EmailCaptureForm
                  endpoint="/api/resource-download"
                  extraFields={{ resource: resource.name }}
                  requireConsentCheckbox
                  fieldLabel="Email address"
                  buttonLabel="Download free"
                  consentText="I'd like to receive this resource and occasional emails from Always ENOUGH™. I can unsubscribe at any time. See the Privacy Policy."
                  successHeading="On its way."
                  successBody={`Check your inbox for ${resource.name}.`}
                />
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gold/10 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display mb-8 text-2xl text-forest">Latest articles</h2>
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-sm border border-line bg-white p-6 transition-opacity hover:opacity-90"
              >
                <h3 className="font-display text-xl text-forest">{post.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{post.metaDescription}</p>
                <span className="mt-3 inline-block text-sm font-medium text-forest underline underline-offset-4">
                  Read more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
