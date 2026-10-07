import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: "Arunima Chaudhuri", url: "https://github.com/tinniaru3005" }],
  creator: site.name,
  keywords: [
    "AI agent security",
    "agent security testing",
    "agent security research",
    "AI agent benchmarks",
    "prompt injection",
    "MCP security",
    "agent identity",
    "delegated authorization",
    "AgentSec",
    "AgentAuth",
    "open source",
  ],
  ...(site.hasPublicUrl ? { alternates: { canonical: "/" } } : {}),
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.name,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name}: ${site.tagline}` }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@InvarisLabs",
    title: site.name,
    description: site.description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
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
