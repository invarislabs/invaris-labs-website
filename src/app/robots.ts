import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Required for `output: "export"`: generate this file once at build time.
export const dynamic = "force-static";

/**
 * Everything is public, including to AI search crawlers, so the site can be
 * cited accurately. Cloudflare may prepend its own managed rules ("Bot
 * Preference Sync"), which is set in the dashboard, not here.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
