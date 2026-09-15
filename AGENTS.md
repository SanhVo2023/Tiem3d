# Repository Guidelines

## Project Structure & Module Organization

This Vietnamese 3D-printing marketing site uses Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS v4. Netlify serves its static export.

- `src/app/`: routes, layouts, metadata, and global styles.
- `src/components/`: shared UI, animations, blog, and home components.
- `src/lib/` and `src/data/pricing.ts`: content loaders and shared business, navigation, portfolio, and pricing data.
- `content/blog/*.mdx`: articles; filenames become URL slugs.
- `public/`: images, social cards, and generated RSS.
- `scripts/`: asset generation, optimization, validation, and R2 uploads.
- `out/` and `.next/`: generated output; do not edit.

## Build, Test, and Development Commands

- `npm ci`: install locked dependencies.
- `npm run dev`: start development at `http://localhost:3000`.
- `npm run build`: regenerate RSS and export the site into `out/`.
- `npm run lint`: run ESLint with Next.js Core Web Vitals and TypeScript rules.
- `npm run assets:check`: detect missing image references.
- `npm run rss`: regenerate `public/feed.xml`.
- `npm run assets:optimize` / `npm run assets:social`: optimize images or rebuild JPEG preview cards.

## Coding Style & Naming Conventions

Follow existing two-space indentation, double quotes, and semicolons. Use strict TypeScript, PascalCase component filenames, camelCase functions, and kebab-case route/MDX slugs. Import through `@/*` for `src/*`. No Prettier configuration exists.

Keep visible copy Vietnamese. Reuse shared business and pricing modules. Tailwind tokens live in `src/app/globals.css`; use `src/components/ui/Img.tsx` for CDN-aware images.

## Testing Guidelines

No automated test suite, test script, or coverage threshold is configured. Playwright is installed without specs or configuration. If introducing browser tests, use `*.spec.ts` and document their setup.

For application changes, run lint, asset checks, and build. Inspect affected routes on mobile and desktop, including navigation, Zalo quotation flow, images, and 404 behavior. Report actual checks and failures in the PR.

## Commit & Pull Request Guidelines

History uses prefixes such as `feat:`, `fix(hero):`, `docs:`, `design:`, and `chore:`. Write concise, action-oriented subjects. Keep PRs focused; describe the problem, resulting behavior, validation, linked issues when applicable, and screenshots for visual changes.

## Architecture & Configuration

Preserve `output: "export"`: avoid server actions and runtime API endpoints. Pre-render dynamic routes with `generateStaticParams()`.

Keep credentials in ignored `.env.local`; consult `.env.local.example`. CDN rewriting belongs in `src/lib/cdn.ts`, never `assetPrefix`.
