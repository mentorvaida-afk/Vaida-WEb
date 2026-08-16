import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPosts } from "@/lib/content";
import { Prose } from "@/components/Prose";

// Two launch posts today, more added over time per docs/PAGE_BLUEPRINTS.md section 8 — both
// sourced verbatim from content/pages/blog-resources.md via src/lib/content.ts#getBlogPosts.
// Rendered on demand rather than pre-built (generateStaticParams removed): Vercel CLI 59's local
// build tracer fails to package multiple generateStaticParams outputs under one dynamic segment
// against Next.js 16.3's newest output format ("Unable to find lambda for route..."), a tooling
// bug, not a code bug (next build/dev both render this route correctly). On-demand rendering
// costs nothing meaningful for a low-traffic content page and sidesteps it entirely.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPosts().find((p) => p.slug === slug);
  if (!post) return {};
  return { title: `${post.seoTitle} | Always ENOUGH™`, description: post.metaDescription };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPosts().find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="px-6 py-20">
      <article className="mx-auto max-w-2xl">
        <h1 className="font-display mb-8 text-4xl text-forest">{post.title}</h1>
        <Prose blocks={post.bodyBlocks} className="text-lg text-ink" />
        <div className="mt-12 flex flex-wrap gap-6 border-t border-line pt-8 text-sm font-medium">
          {post.closingLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-forest underline underline-offset-4">
              {link.label}
            </Link>
          ))}
        </div>
      </article>
    </main>
  );
}
