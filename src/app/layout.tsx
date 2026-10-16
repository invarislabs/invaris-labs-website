import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { site } from "@/lib/site";
import { canonicalUrl, keywords, ogImage, pageDescription, pageTitle, socialDescription } from "@/lib/seo";
import "./globals.css";

/**
 * Optional search-engine verification tokens, read at build time. Prefer
 * verifying the domain in Google Search Console with a DNS record (Cloudflare
 * can add it); these exist for the URL-prefix method or Bing Webmaster Tools.
 */
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: pageTitle,
    template: `%s | ${site.name}`,
  },
  description: pageDescription,
  applicationName: site.name,
  authors: [{ name: "Arunima Chaudhuri", url: "https://github.com/tinniaru3005" }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  keywords,
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    siteName: site.name,
    title: `${site.name}: ${site.tagline}`,
    description: socialDescription,
    images: [{ ...ogImage, type: "image/png" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@InvarisLabs",
    creator: "@arunimastwt",
    title: `${site.name}: ${site.tagline}`,
    description: socialDescription,
    images: [{ url: ogImage.url, alt: ogImage.alt }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(googleVerification || bingVerification
    ? {
        verification: {
          ...(googleVerification ? { google: googleVerification } : {}),
          ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
        },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#000614",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    // The inline script below adds a `js` class before React hydrates, so the
    // class list intentionally differs from the server render.
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Enables entrance animations only when JS runs, so content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
