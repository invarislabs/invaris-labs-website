import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Required for `output: "export"`: generate this file once at build time.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Invaris Labs",
    description: site.tagline,
    start_url: "/",
    scope: "/",
    display: "browser",
    background_color: "#000614",
    theme_color: "#000614",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
