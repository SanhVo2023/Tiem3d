# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for **Tiệm 3D**, a 3D-printing and design shop with two branches in Ho Chi Minh City (Thủ Đức and Sơn Kỳ / Tân Phú). Next.js 16 App Router + React 19 + Tailwind v4, statically exported and hosted on Netlify. All user-facing copy is Vietnamese.

## Commands

```bash
npm run dev      # dev server
npm run build    # generate-rss.mjs -> next build -> static export into out/
npm run lint     # eslint (flat config, next/core-web-vitals + typescript)
npm run rss      # regenerate public/feed.xml only
```

There is **no test suite**. `@playwright/test` and `lighthouse` are devDependencies with no specs or config — don't report tests as passing. Verification is done by building and inspecting `out/`.

```bash
npm run assets:check            # every referenced image exists in public/
node scripts/check-assets.mjs --orphans  # also list unreferenced files
npm run assets:optimize         # PNG/JPEG -> WebP, recompress social JPEGs, rewrite refs
npm run assets:social           # rebuild the 1200x630 JPEG og:image cards
npm run cdn:upload              # push public/assets to R2 via Wrangler
```

Asset generation (manual, never part of the build — needs `GEMINI_API_KEY`):

```bash
node scripts/generate-blog-assets.mjs [covers|brand|branch|all]
node scripts/generate-projects.mjs [all|project <name>|list|singles]
node scripts/upload-to-r2.mjs
```

## Secrets

All credentials live in `.env.local` (gitignored via `.env*`) and are read through `scripts/lib/env.mjs`. Nothing in tracked source holds a key. `.env.local.example` documents every variable.

**`NEXT_PUBLIC_CDN_URL` must stay blank** unless the build output is also uploaded to that CDN. Setting it points `assetPrefix` at the CDN, which routes every `/_next/*` file — including the self-hosted fonts — through it. `upload-to-r2.mjs` only uploads `public/assets`, so the fonts fail CORS and the site renders unstyled.

## Architecture

### Static export is the hard constraint

`next.config.ts` sets `output: "export"` and `trailingSlash: true`. No API routes, no server actions, no `next/image` optimization. Anything interactive is client-side. `robots.ts` and `sitemap.ts` both need `export const dynamic = "force-static"`.

A dynamic route whose `generateStaticParams()` returns an empty array **fails the build** under `output: "export"` — this is why `POSTS_PER_PAGE` is 6 rather than 9, so `/blog/trang/[trang]` always has at least page 2 to generate.

Netlify publishes `out/`. There is deliberately **no catch-all redirect** in `netlify.toml`: a `/* → /index.html 200` rule matches every request, which makes unknown URLs return 200 with homepage HTML and leaves `out/404.html` unreachable.

### Single sources of truth

Four modules exist specifically to stop values drifting apart. Read from them; never hardcode.

| Module | Owns |
|---|---|
| `src/lib/business.ts` | Phone (raw/display/E.164), Zalo URL, email, hours, and the `branches[]` array. `PRIMARY_BRANCH` is used wherever only one location can be expressed (geo meta tags). |
| `src/lib/navigation.ts` | `SERVICES` (8 entries with slug, tag badge, summary) and `NAV_ITEMS`. |
| `src/data/pricing.ts` | Every price on the site, plus `PRICE_DISCLAIMER` and `LAST_UPDATED`. |
| `src/lib/portfolio.ts` | The 10 case studies, their step sequences and image paths. |

Prices are always **ranges**, never point prices, and every table carries the disclaimer. The FDM figures are *finished-part* prices (material + machine time + finishing); `MATERIAL_FLOOR` holds the raw-filament reference separately.

### page.tsx / XPageContent.tsx split

Routes needing client interactivity are a pair: `page.tsx` is a server component holding `metadata` + JSON-LD, and `XPageContent.tsx` is `"use client"` with the UI. `metadata` cannot be exported from a client component — this is also why `not-found.tsx` wraps `NotFoundContent.tsx` (so the 404 can be `noindex`).

Routes: `/`, `/dich-vu` + 8 services, `/bang-gia`, `/bao-gia`, `/lien-he`, `/portfolio` + `[slug]`, `/blog` + `[slug]` + `/tag/[tag]` + `/trang/[trang]`.

### The homepage is self-contained

`src/app/page.tsx` defines all its sections inline (`FloatingHeader`, `CinematicHero`, `ServicesSection`, `ManifestoSection`, `ProcessTimeline`, `PortfolioBento`, `StatsReveal`, `MagneticCTA`). It has its own header — not `components/landing/Header` — and imports only `TestimonialsSection` and `FAQSection` from `components/home`. To change a homepage section, edit `page.tsx`. Both headers read `SERVICES`/`NAV_ITEMS` from the shared module.

### Blog

`src/lib/blog.ts` reads `content/blog/*.mdx` at build time with `gray-matter`; `blog/[slug]/page.tsx` renders via `next-mdx-remote/rsc` with `rehypeSlug` + `rehypeAutolinkHeadings` passed through `options.mdxOptions`.

Frontmatter: `title`, `description`, `date` (required); `updated`, `author`, `image`, `tags`, `featured`, `draft`, `faqs` (optional). Filename is the slug. `faqs` drives both the rendered accordion and `FAQJsonLd`, so markup and schema can't diverge. `draft: true` renders in dev only.

**Tags are the related-posts engine, not an SEO surface.** `getRelatedPosts()` scores by exact tag-string overlap and returns nothing at score 0, so the vocabulary is controlled: 18 canonical tags, 3–5 per post, and deliberately **no universal "in 3D" tag** (a tag on every post carries no signal). Tag pages with a single post are noindex'd and excluded from the sitemap.

Posts must not hardcode contact details or prices. Use the MDX components in `src/components/blog/MdxComponents.tsx`: `<TomTatNhanh>`, `<Callout>`, `<BangGia loai="fdm|resin|dich-vu-them">`, `<ZaloCTA>`, `<ThongTinLienHe>`, `<DocThem>`, `<Anh>`. The post page renders `<ThongTinLienHe />` automatically — don't repeat it in the MDX.

Adding a post: create the MDX, add a cover prompt to `COVERS` in `scripts/generate-blog-assets.mjs`, run `node scripts/generate-blog-assets.mjs covers`, then build.

### Portfolio case studies

Each study follows the shop's real workflow — customer sends a photo over Zalo → model built → printed → finished → shipped. Images live in `public/assets/generated/projects/<imageDir>/<file>.png`, and the same project keys exist in `scripts/data/projects-vn.mjs` so the generator can produce them. If you add a study, add its generator entry too or the page renders broken images.

### Images

Two formats, decided by destination — `scripts/optimize-images.mjs` enforces both.

**In-page images are WebP.** The generated assets arrived as 1024x1024 PNGs: 200 MB across 187 files, over 1 MB each. Nothing can make an LCP good behind a 1.9 MB hero. The optimiser resizes to 1400px and converts, which took the tree to 13.7 MB — 93% smaller — then rewrites every reference by reading the truth off disk, so a half-finished run is safe to re-run.

**Social cards stay JPEG.** Facebook, Zalo and X all decline to render a WebP `og:image`, so a shared link would preview as nothing. `scripts/generate-social-cards.mjs` cuts a 1200x630 JPEG into `public/assets/social/` for every image used as a card, and `src/lib/social.ts` `socialCard()` resolves the path. **Metadata must call `socialCard("/assets/…")` on the original path, never hardcode `/assets/social/x.jpg`** — the generator finds its work list by scanning for those call sites, so a hardcoded card path becomes ungeneratable.

Regenerating images means re-running the optimiser; the generators still write PNG.

### CDN

Images are served from Cloudflare R2 (`tiem3d-assets`) when `NEXT_PUBLIC_CDN_URL` is set.

`scripts/upload-to-r2.mjs` drives **Wrangler**, not the S3 API, so it reuses the `wrangler login` session and there are no long-lived R2 keys to leak. It hashes into `.cache/r2-manifest.json` and only uploads what changed.

The rewrite happens in `src/lib/cdn.ts` `asset()`, applied through `src/components/ui/Img.tsx` — a `next/image` wrapper that all 15 importers use instead of `next/image` directly. **Do not wire the CDN to `assetPrefix`.** That routes every `/_next/*` file through the CDN including the self-hosted fonts, which then fail CORS and the site renders unstyled; only `public/assets` is mirrored into the bucket. `public/assets` also ships in the deploy, so blanking the variable is a complete rollback.

`og:image` deliberately stays on the origin — scrapers should see the canonical host.

### AI search

`/llms.txt` and `/llms-full.txt` are static route handlers built by `src/lib/llms.ts`, which reads the same `business.ts` / `pricing.ts` / `navigation.ts` modules the pages render from, so the facts cannot drift from the site. The short file is the index plus hard facts (phone, both branches, hours, price bands); the full file is every article as plain text.

`robots.ts` names 16 answer-engine crawlers explicitly (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot…) rather than relying on the `*` rule.

`HowTo` schema is deliberately absent: Google removed those rich results in 2023, so it would be markup with no consumer.

### SEO

`src/components/seo/JsonLd.tsx` exports `SiteJsonLd` (one `@graph` with Organization + WebSite + one `LocalBusiness` per branch, linked by `department`/`parentOrganization`), plus `ServiceJsonLd`, `BreadcrumbJsonLd`, `FAQJsonLd`, `ArticleJsonLd`, `ItemListJsonLd`, `ProductJsonLd`.

Every route must set `alternates.canonical` explicitly. A child `alternates` object **replaces** the parent's rather than merging, so declaring only `types` silently drops the canonical.

No `aggregateRating` anywhere: shipping one without visible `Review` markup violates Google's structured data policy. Add it back only alongside real reviews.

### Styling

Tailwind v4, no `tailwind.config` — tokens live in `@theme inline` in `globals.css`. Three type roles: **Be Vietnam Pro** (`--font-display`, chosen because it sets Vietnamese diacritics correctly at display size), **Open Sans** (`--font-sans`, body), **JetBrains Mono** (`--font-mono`, every number, spec and price).

**One accent.** Orange `#f97316` is the brand colour. Cyan is *semantic only* — it marks Resin surfaces, so colour means something (FDM = orange, Resin = cyan). Don't reintroduce it as a general accent.

### Motion

`LenisProvider` drives Lenis smooth scroll from the GSAP ticker with ScrollTrigger synced. GSAP is imported dynamically inside client components. When adding scroll-pinned sections, register ScrollTrigger and let the existing ticker drive it — don't start a second `requestAnimationFrame` loop. `globals.css` has a `prefers-reduced-motion` block.

Keep hero animation delays short. The hero previously staggered out to 3.4s behind a 2s intro loader, so the primary CTA was invisible for ~3.9s and LCP couldn't fire before then.

### Contact flow (no backend)

`/bao-gia` validates client-side, formats the request into a Zalo message, copies it and opens `BUSINESS.zalo`. Uploaded files are never transmitted — the message lists their names. Blog CTAs use the same copy-paste pattern via `<ZaloCTA message={...}>`.

## Deployment

`netlify.toml`: build `npm run build`, publish `out`, Node 20. Immutable one-year cache headers for `/assets/*`, `/images/*`, `*.js`, `*.css`; content types for `sitemap.xml`, `robots.txt`, `feed.xml`; security headers.
