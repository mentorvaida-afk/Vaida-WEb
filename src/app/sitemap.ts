import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/content";

const BASE_URL = "https://alwaysenoughmethod.com";

// Static routes only — /style-guide is deliberately excluded, it's noindex (internal reference
// only, see src/app/style-guide/page.tsx), a sitemap should never list a page it tells crawlers
// not to index.
const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/the-method", priority: 0.8 },
  { path: "/the-reset", priority: 0.9 },
  { path: "/speaking", priority: 0.8 },
  { path: "/books", priority: 0.7 },
  { path: "/blog", priority: 0.8 },
  { path: "/contact", priority: 0.7 },
  { path: "/privacy-policy", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    changeFrequency: "monthly",
    priority: route.priority,
  }));

  const postEntries: MetadataRoute.Sitemap = getBlogPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
