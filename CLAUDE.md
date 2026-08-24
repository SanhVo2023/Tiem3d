# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for **Tiệm 3D**, a 3D-printing service in Thủ Đức, TP.HCM. Next.js 16 App Router + React 19 + Tailwind v4, statically exported and hosted on Netlify. All user-facing copy is Vietnamese.

## Commands

```bash
npm run dev      # dev server
npm run build    # generate-rss.mjs -> next build -> static export into out/
npm run lint     # eslint (flat config, next/core-web-vitals + typescript)
npm run rss      # regenerate public/feed.xml only
```

There is **no test suite**. `@playwright/test` and `lighthouse` are devDependencies but no specs, `playwright.config`, or `lighthouserc` exist — don't report tests as passing.

Asset-generation scripts (run manually, never part of the build):

```bash
node scripts/generate-images.mjs [samples|all|category <name>|list]
node scripts/generate-projects.mjs [all|project <name>|list]   # e.g. project tuong-phat
node scripts/upload-to-r2.mjs                                  # uploads public/assets to Cloudflare R2
```

`generate-images.mjs` and `upload-to-r2.mjs` are gitignored because they embed plaintext credentials; `generate-projects.mjs` is tracked and still contains a hardcoded Gemini key.

## Architecture

### Static export is the hard constraint

`next.config.ts` sets `output: "export"` and `trailingSlash: true`. No API routes, no server actions, no ISR, no `next/image` optimization (`images.unoptimized`). Anything interactive is client-side. `robots.ts` and `sitemap.ts` both need `export const dynamic = "force-static"`. Netlify publishes `out/`.

### page.tsx / XPageContent.tsx split

Every route except the homepage is a pair: `page.tsx` is a server component holding `metadata` + JSON-LD, and `XPageContent.tsx` is `"use client"` and holds the entire UI (`in-fdm/page.tsx` → `FDMPageContent.tsx`). This exists because `metadata` can't be exported from a client component. Follow the same split for new routes.

Routes: `/`, `/bao-gia`, `/portfolio`, `/blog`, `/blog/[slug]`, and eight `/dich-vu/*` services (`in-fdm`, `in-resin`, `in-kho-lon`, `in-ky-thuat`, `thiet-ke-3d`, `hoan-thien`, `in-hang-loat`, `du-an-tron-goi`). There is no `/dich-vu` index page even though breadcrumbs and nav link to it.

### The homepage is self-contained

`src/app/page.tsx` is a ~1660-line client component that defines all of its sections inline (`IntroLoader`, `FloatingHeader`, `CinematicHero`, `ServicesSection`, `ManifestoSection`, `ProcessTimeline`, `PortfolioBento`, `StatsReveal`, `MagneticCTA`). It has its own header — not `components/landing/Header` — and imports only `TestimonialsSection` and `FAQSection` from `components/home`. To change a homepage section, edit `page.tsx`; the similarly-named files in `components/home/` are not what renders.

### Unused components still exported from barrels

Not referenced by any route: `components/home/{HeroSection,ManifestoSection,ServicesSection,ShowcaseSection,ProcessSection,CTAFooter}`, all `components/landing/Landing*`, `components/services/ServiceTemplate`, `components/effects/{SpotlightGrid,PageTransition}`, `components/blog/{BlogSearch,Pagination}`. `ServiceTemplate` also references a deleted dark palette (`bg-void`, `text-signal`, `text-noise`). Verify a component is actually mounted before debugging or "fixing" it.

### Blog: two content layers, only one active

- **Active:** `src/lib/blog.ts` reads `content/blog/*.mdx` from the filesystem at build time with `gray-matter` + `reading-time`; `blog/[slug]/page.tsx` renders it via `next-mdx-remote/rsc` with a local `mdxComponents` map.
- **Dormant:** `contentlayer.config.ts` and `src/lib/blog-contentlayer.ts.example`. `contentlayer2` is installed but `next.config.ts` never wraps with `withContentlayer`, so `.contentlayer/generated` is stale. `rehype-slug`, `rehype-autolink-headings`, `rehype-pretty-code`, and `shiki` are wired only into that dormant config — MDX currently gets no rehype processing at all.

Adding a post: create `content/blog/<slug>.mdx` with frontmatter (`title`, `description`, `date` required; `author`, `image`, `tags`, `featured`, `draft` optional). Filename is the slug. `sitemap.ts` discovers it from the filesystem; `public/feed.xml` needs `npm run rss` (or a full build). `draft: true` posts render in dev and are filtered out in production.

### Images and CDN

`public/assets/generated/**` is AI-generated imagery organized by category (`hero`, `services`, `products`, `projects`, `portfolio`, ...). `NEXT_PUBLIC_CDN_URL` (a Cloudflare R2 public bucket, see `.env.local.cdn`) feeds both `assetPrefix` and `CdnImage`/`getImageSrc`, which rewrite `/assets/*` paths to the CDN. Most pages use plain `next/image` with local paths, so the CDN only applies where `CdnImage` is used. The R2 hostname is allowlisted in `images.remotePatterns`.

### SEO

`components/seo/JsonLd.tsx` exports `LocalBusinessJsonLd` / `OrganizationJsonLd` / `WebSiteJsonLd` (mounted once in `layout.tsx` head) plus `ServiceJsonLd`, `BreadcrumbJsonLd`, `FAQJsonLd`, `ProductJsonLd` for per-page use. `layout.tsx` carries the canonical metadata, a long Vietnamese keyword list, and `geo.*` meta for Thủ Đức.

The canonical domain is **tiem3d.com**, but `scripts/generate-rss.mjs` and the `BlogPosting` JSON-LD in `blog/[slug]/page.tsx` still hardcode the old `in3dplus.com` brand. Fix both together if you touch either.

### Styling

Tailwind v4 with no `tailwind.config` — tokens live in `@theme inline` in `src/app/globals.css` (zinc scale, orange primary `#f97316`, cyan secondary, duration/easing vars), followed by ~60 hand-written utility classes: `.text-display`, `.text-mono`, `.btn-primary`, `.card`, `.glass`, `.grid-bg`, `.animate-*`, `.hover-*`. Reuse these rather than inventing new ones. Fonts are Open Sans (`--font-sans`, includes the `vietnamese` subset) and JetBrains Mono (`--font-mono`).

### Motion stack

`LenisProvider` (root layout) creates the Lenis smooth-scroll instance and drives it from the GSAP ticker, syncing `lenis.on("scroll", ScrollTrigger.update)` and disabling lag smoothing; it also resets scroll on pathname change. GSAP and ScrollTrigger are imported dynamically inside client components. Framer Motion handles component-level animation. When adding scroll-pinned sections, register ScrollTrigger and let the existing Lenis/GSAP ticker drive it — don't start a second `requestAnimationFrame` loop.

### Contact flow (no backend)

`/bao-gia` validates client-side, formats the request into a Zalo message string, shows it for copy, and opens `https://zalo.me/0777863808`. Uploaded files are never transmitted — the message just lists their names. The phone number `0777863808` is hardcoded in `ZaloWidget`, `Footer`, service pages, and blog CTAs; grep for it when it changes.

## Deployment

`netlify.toml`: build `npm run build`, publish `out`, Node 20. Immutable one-year cache headers for `/assets/*`, `/images/*`, `*.js`, `*.css`, plus security headers and a `/*` → `/index.html` 200 fallback.

## Notes

- Windows dev environment; a stray zero-byte `nul` file at the repo root is shell-redirect debris.
- `src/lib/blog.ts` and the blog pages write Vietnamese without diacritics ("Tiem 3D", "phut doc") while the rest of the site uses full diacritics. New user-facing copy should use proper diacritics.
