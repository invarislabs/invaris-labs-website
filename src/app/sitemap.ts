import type { MetadataRoute } from "next";
import { canonicalUrl, ogImage } from "@/lib/seo";
import { site } from "@/lib/site";

// Required for `output: "export"`: generate this file once at build time.
export const dynamic = "force-static";

/**
 * One page, so one URL. `lastModified` is the build time: every deploy is a
 * content change, and search engines use it to decide when to recrawl.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: canonicalUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [`${site.url}${ogImage.url}`],
    },
  ];
}
