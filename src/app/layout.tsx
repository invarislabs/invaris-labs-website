import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { site } from "@/lib/site";
import { canonicalUrl, keywords, ogImage, pageDescription, pageTitle, socialDescription } from "@/lib/seo";
import "./globals.css";

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
};

export const viewport: Viewport = {
  themeColor: "#000614",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/invaris-labs-logo.png`,
  description: site.description,
  founder: { "@type": "Person", name: "Arunima Chaudhuri" },
  sameAs: [
    "https://github.com/invarislabs",
    "https://x.com/InvarisLabs",
    "https://www.linkedin.com/company/invarislabs",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
