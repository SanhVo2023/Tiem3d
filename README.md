# Tiệm 3D

Vietnamese 3D-printing and design website for **tiem3d.com**. Next.js 16, React 19, TypeScript and Tailwind CSS 4. The site exports static HTML for Netlify.

## Run locally

Use Node.js 22.14 or newer and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Next.js downloads Google Fonts during an uncached build; network access is required. Fonts are then served from the site.

## Validate a release

```sh
npm test
npm run lint
npm run typecheck
npm run assets:check
npm run build
npm run audit:export
npm audit
npm run preview
```

- Tests cover quote validation and message construction; no external messages are sent.
- The export audit checks every HTML route, internal links, image targets, headings, Markdown table rendering, canonical/social metadata, JSON-LD, visible FAQ consistency, sitemap and Tân Phú location rules. Results go to `.cache/audit/export-report.json`.
- `npm run preview` (also `npm start`) serves `out/` at http://localhost:3000. Stop the development server first or use another port.
- Verify mobile/desktop navigation, keyboard focus, quote errors and preview, portfolio filters, FAQ accordions and unknown URLs in a browser. The export audit cannot prove visual quality or accessibility.
- Check Google’s live rendering after deployment; local checks cannot establish indexing or rankings.

## Content and shared data

| Path | Purpose |
| --- | --- |
| `src/app/` | Pages, metadata, sitemap and crawlable text endpoints |
| `src/lib/business.ts` | Contact details, hours and visit policy per location |
| `src/lib/navigation.ts` | Shared navigation and service names |
| `src/data/services.ts` | Eight service pages, rendered by one server component |
| `src/data/pricing.ts` | Maintained reference prices |
| `src/lib/portfolio.ts` | Explicitly illustrative scenarios and image paths |
| `content/blog/*.mdx` | Blog posts with dates, descriptions and optional FAQs |
| `tests/` | Node test runner regression tests |
| `docs/` | Audit findings and Google Business setup guidance |

Keep one page title in the route template; start MDX section headings at `##`. The MDX renderer uses `remark-gfm` for tables. Match displayed FAQs to structured data. Use trailing slashes for page links. Never present generated images as photographs of actual customers or premises.

## Quote workflow

The quote page prepares a message locally. Customers review it, copy it, and open Zalo to send it themselves. Photos and model files are attached in Zalo. There is no upload endpoint, stored lead database or automatic message submission.

## Configuration and deployment

Copy `.env.local.example` to `.env.local` only when optional generation/CDN tools are needed; never commit credentials. Normal site pages need no API keys. `GOOGLE_SITE_VERIFICATION` optionally supplies a Search Console HTML verification tag.

`NEXT_PUBLIC_CDN_URL` rewrites only `/assets/` images. Upload them before enabling a CDN; scripts, styles and fonts stay on the main host. Clear this variable and rebuild to use the files bundled in `public/`.

Netlify uses Node 22, runs `npm run build`, and publishes `out/`. Preserve `output: "export"` and the real 404 response; do not add a catch-all homepage rewrite. Keep `agentRules: false` so framework tooling leaves the existing `AGENTS.md` alone.

Deploy through the existing Netlify site after reviewing the release. Verify key URLs, `/sitemap.xml`, `/robots.txt`, contact links, images and the 404 status on the live domain. To roll back, restore the previous Netlify deploy.

## Tân Phú and search visibility

Tân Phú is a courier-only workshop with no customer visits. It is currently ineligible for a Google Business Profile. See [the setup and visibility guide](docs/google-business-tan-phu.md) for current facts, official sources, Search Console steps and what must change before registration.

See [the production audit](docs/production-audit.md) for verification evidence and release status.
