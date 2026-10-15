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
- Image optimisation is turned off (`images.unoptimized`) because a static export has no server to run it. The images are already small and pre-sized.

## Configuration

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Optional. Public origin without a trailing slash, e.g. `https://staging.example.com`. Used for absolute OpenGraph URLs, the canonical tag, `robots.txt` and `sitemap.xml`. Defaults to `https://www.invarislabs.com`. |
| `NODE_VERSION` | Set to `22` on Cloudflare Pages so the build uses a supported Node.js version. |

## Editing content

Most changes don't touch layout code:

| To change | Edit |
|---|---|
| Links (GitHub, socials, docs, contact) | `src/lib/site.ts` |
| AgentSec commands, terminal output, policy, check categories | `src/content/agentsec.ts` |
| AgentAuth flow, limits, comparison table, code snippets | `src/content/agentauth.ts` |
| Dashboard pipeline, views, security points, plan limits, snippets | `src/content/dashboard.ts` |
| Articles in the Writing section | `src/content/writing.ts` |
| Page title, description, social card text | `src/app/layout.tsx` and `public/og.png` |
| Colours, fonts, motion | the `@theme` block in `src/app/globals.css` |

**Adding an article:** add an object (`kind`, `title`, `description`, `topics`, `href`) to the top of `articles` in `src/content/writing.ts`, so the newest comes first. Write the description from the article itself. The grid is two columns, so an even number of articles fills it cleanly.

**Accuracy:** product claims, commands and snippets on the site are taken from the AgentSec, AgentAuth and AgentSec Dashboard READMEs. Check new copy against those READMEs so the site never describes a feature that isn't built.

## Project structure

```
src/
  app/
    layout.tsx          metadata, OpenGraph, JSON-LD, fonts
    page.tsx            assembles the sections in order
    globals.css         design tokens and base styles
    robots.ts           robots.txt
    sitemap.ts          sitemap.xml
    icon.png            favicon and app icons
  components/
    layout/             header (with mobile menu) and footer
    sections/           one file per section: hero, products, agentsec,
                        agentauth, dashboard, stack, writing, community,
                        about, founder, open-source
    ui/                 buttons, code blocks and tabs, icons, client helpers
  content/              product copy and snippets, the article list and community quotes
  lib/
    site.ts             site constants and every outbound link
    highlight.tsx       small server-side syntax highlighter
public/
  brand/                Invaris Labs logo (original) and mark crop
  og.png                1200×630 social card
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
