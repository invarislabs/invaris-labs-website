/**
 * Schema.org structured data for the home page, as one JSON-LD @graph.
 *
 * Entities reference each other by @id, so search engines and AI assistants
 * see one connected picture: the organization, its founder, the website and
 * page, the three projects, the FAQ and the articles. Everything is derived
 * from the same content files the page renders, so the markup always
 * describes what's visible.
 *
 * Deliberately absent: ratings, reviews, prices other than "free",
 * customer counts and version numbers that would go stale.
 */
import { faqPlainText, faqs } from "@/content/faq";
import { articles } from "@/content/writing";
import { canonicalUrl, ogImage, pageDescription, pageTitle, productSeo } from "@/lib/seo";
import { links, site } from "@/lib/site";

const id = (fragment: string) => `${canonicalUrl}#${fragment}`;

const ORG = id("organization");
const FOUNDER = id("founder");
const WEBSITE = id("website");
const WEBPAGE = id("webpage");

const organization = {
  "@type": "Organization",
  "@id": ORG,
  name: site.name,
  alternateName: "Invaris",
  url: canonicalUrl,
  logo: {
    "@type": "ImageObject",
    "@id": id("logo"),
    url: `${site.url}/brand/invaris-labs-logo.png`,
    width: 877,
    height: 877,
    caption: site.name,
  },
  image: { "@id": id("logo") },
  description: site.description,
  slogan: site.tagline,
  founder: { "@id": FOUNDER },
  email: links.email.replace("mailto:", ""),
  knowsAbout: [
    "AI agent security",
    "Adversarial testing of AI agents",
    "Prompt injection",
    "Model Context Protocol (MCP) security",
    "OWASP Top 10 for Agentic Applications",
    "Agent identity",
    "Delegated authorization",
  ],
  sameAs: [links.githubOrg, links.xOrg, links.linkedinOrg],
};

const founder = {
  "@type": "Person",
  "@id": FOUNDER,
  name: "Arunima Chaudhuri",
  jobTitle: "Founder",
  worksFor: { "@id": ORG },
  alumniOf: { "@type": "CollegeOrUniversity", name: "National Institute of Technology Warangal" },
  knowsAbout: ["AI agent security", "Distributed systems", "Peer-to-peer protocols", "Ethereum protocol research"],
  sameAs: [links.founder.github, links.founder.linkedin, links.founder.x, links.founder.blog],
};

const website = {
  "@type": "WebSite",
  "@id": WEBSITE,
  url: canonicalUrl,
  name: site.name,
  description: site.description,
  publisher: { "@id": ORG },
  inLanguage: "en",
};

const webpage = {
  "@type": "WebPage",
  "@id": WEBPAGE,
  url: canonicalUrl,
  name: pageTitle,
  description: pageDescription,
  isPartOf: { "@id": WEBSITE },
  about: { "@id": ORG },
  mainEntity: { "@id": ORG },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${site.url}${ogImage.url}`,
    width: ogImage.width,
    height: ogImage.height,
  },
  hasPart: productSeo.map((p) => ({ "@id": id(p.id) })),
  inLanguage: "en",
};

const products = productSeo.map((p) => ({
  "@type": "SoftwareApplication",
  "@id": id(p.id),
  name: p.name,
  ...(p.alternateName ? { alternateName: p.alternateName } : {}),
  url: id(p.id),
  description: p.description,
  applicationCategory: p.category,
  softwareRequirements: p.requirements,
  featureList: p.features,
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  ...(p.license ? { license: p.license } : {}),
  ...(p.downloadUrl ? { downloadUrl: p.downloadUrl } : {}),
  author: { "@id": ORG },
  publisher: { "@id": ORG },
  sameAs: [p.repo, ...(p.extraSameAs ?? [])],
}));

const faqPage = {
  "@type": "FAQPage",
  "@id": id("faq"),
  url: id("faq"),
  isPartOf: { "@id": WEBPAGE },
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: faqPlainText(f.answer) },
  })),
};

const writing = {
  "@type": "ItemList",
  "@id": id("writing"),
  name: "Research and writing by Arunima Chaudhuri",
  itemListElement: articles.map((a, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Article",
      headline: a.title,
      description: a.description,
      url: a.href,
      author: { "@id": FOUNDER },
      keywords: a.topics.join(", "),
    },
  })),
};

export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [organization, founder, website, webpage, ...products, faqPage, writing],
};
