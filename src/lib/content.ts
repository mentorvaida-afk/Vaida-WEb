import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const PAGES_DIR = path.join(process.cwd(), "content", "pages");

export type PageFrontmatter = {
  title: string;
  slug: string;
  source?: string;
  status?: string;
};

// Reads real, Vaida-sourced copy from content/pages/*.md at build time (server-only, never
// bundled to the client) — see docs/ENGINEERING_RULES.md: "Copy lives in content/, not
// hardcoded inside components." Pages parse the returned markdown body themselves, since each
// page's layout in docs/PAGE_BLUEPRINTS.md is bespoke enough that a generic renderer would
// hide more than it would save.
export function getPageMarkdown(slug: string): { frontmatter: PageFrontmatter; body: string } {
  const filePath = path.join(PAGES_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data as PageFrontmatter, body: content.trim() };
}

export type BlogPost = {
  seoTitle: string;
  metaDescription: string;
  slug: string;
  title: string;
  bodyBlocks: string[];
  closingLinks: { label: string; href: string }[];
};

// Every closing CTA phrase used across the two launch posts, mapped to its real route. Add an
// entry here if a future post's closing line uses a phrase not yet in this list.
const CTA_HREFS: Record<string, string> = {
  "Explore The Method →": "/the-method",
  "Download the free workbook →": "/blog",
  "Explore The Reset →": "/the-reset",
  "Learn about Speaking for financial services teams →": "/speaking",
};

// Parses the two launch posts out of content/pages/blog-resources.md. A dedicated parser is
// justified here (rather than ad hoc extraction in each page) because this same structured data
// is needed in two places: the blog index and each individual post page.
export function getBlogPosts(): BlogPost[] {
  const { body } = getPageMarkdown("blog-resources");
  const copy = body.split("## Decisions locked")[0] ?? body;
  const chunks = copy.split(/\n## Blog Post \d+ — Full Copy\n/).slice(1);

  return chunks.map((chunk) => {
    const seoTitle = chunk.match(/\*\*SEO Title\*\*:\s*(.+)/)?.[1]?.trim() ?? "";
    const metaDescription = chunk.match(/\*\*Meta Description\*\*:\s*(.+)/)?.[1]?.trim() ?? "";
    const slug = (chunk.match(/\*\*URL slug\*\*:\s*`([^`]+)`/)?.[1] ?? "").replace(/^\/blog\//, "");
    const title = chunk.match(/\n###\s+(.+)/)?.[1]?.trim() ?? seoTitle;
    const afterHeading = chunk.split(/\n###\s+.+\n/)[1] ?? "";

    const ctaLine = afterHeading.trim().split(/\n\s*\n/).pop() ?? "";
    const closingLinks: { label: string; href: string }[] = [...ctaLine.matchAll(/\[([^\]]+)\]/g)]
      .map((m) => m[1])
      .filter((label): label is string => label !== undefined && label in CTA_HREFS)
      .map((label) => ({ label, href: CTA_HREFS[label] ?? "/" }));

    return { seoTitle, metaDescription, slug, title, bodyBlocks: proseBlocks(afterHeading), closingLinks };
  });
}

// Splits a markdown body into paragraph-level blocks, dropping bare "[Button Label]" CTA
// markers (those are rendered as real <Button> components in each page's layout instead) and
// section dividers ("---"), heading lines, and the "Decisions locked" / "Note on this file"
// housekeeping blocks that belong in the .md file for reviewers, not on the live page.
export function proseBlocks(section: string): string[] {
  return section
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .filter((block) => !/^---+$/.test(block))
    .filter((block) => !/^\[.*\]$/.test(block))
    .filter((block) => !/^#{1,6}\s/.test(block));
}
