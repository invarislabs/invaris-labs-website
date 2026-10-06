# invaris-labs-website

The website for [Invaris Labs](https://github.com/invarislabs): security infrastructure for autonomous AI agents.

## Stack

- Next.js 16 (App Router, fully static prerender)
- TypeScript
- Tailwind CSS v4 (design tokens in `src/app/globals.css`)
- Geist Sans / Geist Mono via the `geist` package (self-hosted, no runtime font requests)
- No animation or UI libraries. Motion is CSS plus a few small client components, and all of it respects `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` |

## Configuration

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public origin, e.g. `https://example.com`. Used for absolute OpenGraph URLs, the canonical tag, `robots.txt` and `sitemap.xml`. On Vercel, `VERCEL_PROJECT_PRODUCTION_URL` is used automatically if this is unset. The canonical tag is omitted until one of them is set. |

## Structure

```
src/
  app/                 layout (metadata, OG, JSON-LD), page, icons, robots, sitemap
  components/
    layout/            site header (mobile menu) and footer
    sections/          one file per page section
    ui/                primitives, code blocks/tabs, icons, client helpers
  content/             AgentSec and AgentAuth copy, commands and snippets
  lib/                 site constants + links, tiny server-side syntax highlighter
public/
  brand/               Invaris Labs logo (original) and mark crop
  og.png               1200×630 social card
```
