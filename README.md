<p align="center">
  <img src="public/og.png" alt="Invaris Labs: security infrastructure for autonomous AI agents" width="720" />
</p>

# Invaris Labs website

Source for the [Invaris Labs](https://github.com/invarislabs) website, live at **[www.invarislabs.com](https://www.invarislabs.com)**. Invaris Labs builds open-source security infrastructure for autonomous AI agents.

The site is one statically exported page that presents all three projects:

| Project | What it does | Repository |
|---|---|---|
| **AgentSec** | Adversarial security and reliability testing for AI agents | [invarislabs/invaris-agentsec](https://github.com/invarislabs/invaris-agentsec) |
| **AgentAuth** | Cryptographic identity and delegated authorization for agents | [invarislabs/agent-auth](https://github.com/invarislabs/agent-auth) |
| **AgentSec Dashboard** | Hosted dashboard for AgentSec reports: runs, findings, traces, history and comparisons | [invarislabs/invaris-agentsec-dashboard](https://github.com/invarislabs/invaris-agentsec-dashboard) |

## Quick start

Requires Node.js 20.9 or later.

```bash
npm install
npm run dev          # http://localhost:3000
```

Build and preview the production site:

```bash
npm run build        # writes the static site to out/
npm start            # serves out/ locally
```

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Static export to `out/` |
| `npm start` | Serve the built `out/` folder locally |
| `npm run lint` | ESLint (Next.js core-web-vitals and TypeScript rules) |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |

Before opening a pull request, run `npm run lint && npm run typecheck && npm run build`.

## Deploying

`next.config.ts` sets `output: "export"`, so `npm run build` produces plain HTML, CSS and JS in `out/`. That folder can be served by any static host (GitHub Pages, Cloudflare Pages, Netlify, Vercel, S3).

The live site runs on **Cloudflare Pages** (project `invaris-labs`), built from `main` on every push with the build command `npm run build` and output directory `out`. It is served at `https://www.invarislabs.com`; `invarislabs.com` redirects there with a Cloudflare Redirect Rule, and `invaris-labs.pages.dev` still serves the same build.

- The production address is built in (`src/lib/site.ts`). Set `NEXT_PUBLIC_SITE_URL` only to build for a different address, such as a staging domain.
- If the site is served from a subpath, for example `https://invarislabs.github.io/invaris-labs-website/`, also set `basePath` in `next.config.ts`. With a custom domain it isn't needed.
- Image optimisation is turned off (`images.unoptimized`) because a static export has no server to run it. The images are pre-sized instead: a 2x WebP logo in the footer and a 64px mark in the header.
- `public/_headers` sets Cloudflare Pages response headers: long-lived caching for hashed build files, basic security headers, and `X-Robots-Tag: noindex` on `*.pages.dev`, so only `www.invarislabs.com` appears in search results.

## Configuration

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Optional. Public origin without a trailing slash, e.g. `https://staging.example.com`. Used for absolute OpenGraph URLs, the canonical tag, `robots.txt` and `sitemap.xml`. Defaults to `https://www.invarislabs.com`. |
| `NODE_VERSION` | Set to `22` on Cloudflare Pages so the build uses a supported Node.js version. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional. Adds `<meta name="google-site-verification">`, for Google Search Console's URL-prefix method. Verifying the domain with a DNS record is preferred and needs no variable. |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Optional. Adds `<meta name="msvalidate.01">` for Bing Webmaster Tools. |

## Editing content

Most changes don't touch layout code:

| To change | Edit |
|---|---|
| Links (GitHub, socials, docs, contact) | `src/lib/site.ts` |
| AgentSec commands, terminal output, policy, check categories | `src/content/agentsec.ts` |
| AgentAuth flow, limits, comparison table, code snippets | `src/content/agentauth.ts` |
| Dashboard pipeline, views, security points, plan limits, snippets | `src/content/dashboard.ts` |
| Articles in the Writing section | `src/content/writing.ts` |
| Questions and answers in the FAQ (also published as FAQPage structured data) | `src/content/faq.ts` |
| Page title, meta description, keywords, social card text, per-product search copy | `src/lib/seo.ts` (and `public/og.png` for the image) |
| Summary for AI assistants | `public/llms.txt` |
| Colours, fonts, motion | the `@theme` block in `src/app/globals.css` |

**Adding an article:** add an object (`kind`, `title`, `description`, `topics`, `href`) to the top of `articles` in `src/content/writing.ts`, so the newest comes first. Write the description from the article itself. The grid is two columns, so an even number of articles fills it cleanly.

**Accuracy:** product claims, commands and snippets on the site are taken from the AgentSec, AgentAuth and AgentSec Dashboard READMEs. Check new copy against those READMEs so the site never describes a feature that isn't built.

## Search and AI discoverability

The site is one page at `https://www.invarislabs.com/`, so everything search engines and AI assistants need is generated from that page's content:

- **Metadata** (`src/app/layout.tsx`, copy in `src/lib/seo.ts`): title, meta description, canonical URL, Open Graph and Twitter cards, and robots directives that allow large image previews and full snippets.
- **Structured data** (`src/lib/structured-data.ts`): one JSON-LD graph with the Organization, its founder, the WebSite and WebPage, a SoftwareApplication for each project, the FAQPage and the articles. It's built from the same content files the page renders, so it can't describe something that isn't on the page. It has no ratings, reviews or customer numbers, and should never get any that aren't real.
- **Crawling**: `robots.txt` allows every crawler and points to `sitemap.xml`, which lists the canonical URL with its share image and last-modified date. A custom `404.html` is `noindex`.
- **Headings**: each section's label is part of its `<h2>` (`SectionHeader` in `src/components/ui/primitives.tsx`), so the outline names the product or topic.
- **AI assistants**: `public/llms.txt` is a plain-language summary of the projects with links, and the FAQ answers the questions people ask assistants in full sentences.

When you change what a product does, update the content file, `src/lib/seo.ts`, `src/content/faq.ts` and `public/llms.txt` together. To check the result, run `npm run build` and paste the JSON-LD from `out/index.html` into the [Schema Markup Validator](https://validator.schema.org/), or test the live URL with Google's [Rich Results Test](https://search.google.com/test/rich-results).

## Project structure

```
src/
  app/
    layout.tsx          metadata, Open Graph, Twitter card, fonts
    page.tsx            assembles the sections in order, plus the JSON-LD
    not-found.tsx       404 page (exported as 404.html, noindex)
    manifest.ts         manifest.webmanifest
    globals.css         design tokens and base styles
    robots.ts           robots.txt
    sitemap.ts          sitemap.xml
    icon.png            favicon and app icons
  components/
    layout/             header (with mobile menu) and footer
    sections/           one file per section: hero, products, agentsec,
                        agentauth, dashboard, stack, writing, community,
                        faq, about, founder, open-source
    seo/                the JSON-LD script element
    ui/                 buttons, code blocks and tabs, icons, client helpers
  content/              product copy and snippets, the article list and community quotes
  lib/
    site.ts             site constants and every outbound link
    seo.ts              title, description, keywords and per-product search copy
    structured-data.ts  the Schema.org graph for the home page
    highlight.tsx       small server-side syntax highlighter
public/
  brand/                Invaris Labs logo (original and 2x WebP) and mark (original and 64px)
  og.png                1200×630 social card
  llms.txt              summary for AI assistants (llmstxt.org)
  _headers              Cloudflare Pages caching, security and noindex headers
```

## Tech

- **Next.js 16** (App Router), statically exported
- **TypeScript** and **Tailwind CSS v4**
- **Geist Sans / Geist Mono** from the `geist` package, self-hosted with no requests to Google
- **No UI or animation libraries.** Motion is CSS plus a few small client components, and all of it is turned off under `prefers-reduced-motion`. Code highlighting runs at build time, so it ships no JavaScript.

## Accessibility

The page uses semantic landmarks, a skip link, visible focus states, keyboard-operable tabs and menu, and text alternatives for diagrams. Before merging visual changes, check keyboard navigation and run an accessibility audit (for example Lighthouse or axe).

## Related

- [AgentSec](https://github.com/invarislabs/invaris-agentsec)
- [AgentAuth](https://github.com/invarislabs/agent-auth)
- [AgentSec Dashboard](https://github.com/invarislabs/invaris-agentsec-dashboard)
- [Writing by Arunima Chaudhuri](https://arunima-chaudhuri.hashnode.dev)

## Contributing

Contributions are welcome. By opening a pull request you agree to the [Contributor License Agreement](CLA.md).

## License

The source code is licensed under the [Apache License 2.0](LICENSE). The Invaris Labs name, logo and the other brand assets are trademarks of Invaris Labs and are not covered by that license; see [NOTICE](NOTICE) for details, including third-party fonts and quoted community content.
