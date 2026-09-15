# Production audit and release report

Audited on 15 September 2026 against commit `d5f1770` and the original live site at https://tiem3d.com/. The existing `AGENTS.md` remains unchanged.

## Release status

Source changes and local release checks are complete. Publication through GitHub was approved on 15 September 2026. Netlify builds the `master` branch with Node 22 and publishes the static output in `out/`. The evidence below records the checks completed before publication; GitHub commit statuses and the Netlify deploy log record the live deployment result.

## Main corrections

| Area | Result |
| --- | --- |
| Homepage | Clear Vietnamese headings, visible product imagery, service choices, illustrative examples and a shorter path to requesting a quote. Responsive layouts use white, workshop grey, graphite and orange. |
| Navigation | Shared header/footer, a native mobile dialog with internal scrolling, keyboard access, Escape handling and focus restoration. Desktop services use an accessible disclosure. |
| Quotation | Associated labels, inline validation, optional phone number, reviewable message and separate copy/open-Zalo actions. Removed fake uploads and automatic popup/sent claims. Clipboard refusal has a manual-copy fallback; JavaScript-free visitors see direct contact options. |
| Services and portfolio | Eight service routes share a server-rendered template with specific preparation instructions and FAQs. Portfolio filtering works without hiding initial content behind animation. Generated scenarios are labeled as illustrations. |
| Blog | One H1 per article, heading anchors, real HTML tables through `remark-gfm`, readable code blocks, accessible horizontal scrolling and legible callouts. |
| Responsive/accessibility | Fixed 320px pricing overflow, low-contrast badges/numbers, excessive motion and the mobile floating contact control covering content. Preserved visible focus and native scrolling. |
| Search metadata | Page-specific canonical/social URLs, valid image targets, useful location pages, consistent visible FAQs and JSON-LD, a clean sitemap and a noindex 404. Removed unverified ratings and speculative Tân Phú coordinates. |
| Dependencies/tooling | Updated Next.js and MDX, removed unused Lighthouse tooling, added quote tests and an export audit. `npm start` serves the static export. Framework-generated agent rules are disabled to preserve `AGENTS.md`. |

## Verification evidence

Checks run against local production output, not just development rendering.

- `npm test`: **5/5 passed**, covering optional contact details, blank requests, Vietnamese phone formats and copied message contents.
- `npm run lint`: **passed with no warnings** after removing two unused generator constants. Targeted lint also passed for the final callout and quote changes.
- `npm run typecheck`: **passed**; the production build also checks TypeScript.
- `npm run assets:check`: **passed**, 40 literal asset references across 104 source files. The export audit also checks dynamically rendered image targets.
- `npm run build`: **passed**, including final callout and JavaScript-free form refinements; all 73 generated route outputs completed.
- `npm run audit:export`: **68 HTML pages and 61 sitemap URLs passed**, without failures or warnings on the final build. Checks cover headings, IDs, metadata, images, internal links, unrendered Markdown tables, JSON-LD, FAQ consistency and location rules.
- `npm audit`: **0 vulnerabilities**, including development dependencies.

The final browser report contains **46 passing route/width checks across 39 paths**, including an unknown URL returning the 404 page. Checks covered the homepage at 320, 390, 768, approximately 1024 and 1440 CSS pixels; quote/pricing/article templates at additional desktop/tablet widths; all eight services; both locations; portfolio; blog pagination/topics; and all 18 articles. Axe found **zero remaining violations** under WCAG 2 A/AA and 2.1 AA rules. No document overflow or failed loaded images remained. Automated checks do not constitute a complete accessibility certification.

Interactions passed for desktop services/Escape, the menu at **320 × 360**, product selection, portfolio filtering (10 total → 2 mechanical examples → 10), FAQ expansion and quote validation/preview/copy. Clipboard refusal selected the entire 175-character test message and displayed the manual-copy instruction; the populated preview also passed axe. No Zalo message or customer request was sent. With JavaScript disabled, homepage content and direct quotation contact remained available while the interactive form was hidden. Reduced-motion emulation confirmed native scrolling, visible content and near-zero transitions. An HTTP check confirmed an unknown URL returns **404**.

Ignored local evidence in `.cache/audit/`: `export-report.json`, `browser-checks.json` (including initial findings), `browser-final.json`, `performance.json`, `home-desktop.png` and `home-mobile.png`. Mobile screenshots use 320px and 390px iframe viewports because screenshots timed out with browser viewport emulation; interaction/layout checks use the emulated page.

## Performance and measurement limits

Critical content is server rendered. Removed global smooth-scroll processing and scroll-dependent content visibility; product images use stable containers, WebP assets and a prioritized hero image. Fonts are downloaded during an uncached build and served locally afterward.

One unthrottled localhost measurement at 390 CSS pixels, with browser cache disabled, recorded **352 ms first and largest contentful paint**, **0 observed layout shift**, a **15.8 KB encoded HTML document** and **186.3 KB encoded script resources**. The hero image was preloaded. No runtime exceptions or non-cancelled request failures were observed; four prefetch requests were cancelled by navigation.

These local measurements cannot establish real-user Core Web Vitals, mobile network performance, indexing or rankings. Validate the deployed site with PageSpeed Insights and Search Console after release.

## Tân Phú: owner-confirmed operation

The workshop does not receive customers; all orders use third-party couriers. It currently does **not** qualify for a Google Business Profile. A hidden address does not make an online-only operation eligible. The website states the no-visits policy and has no Tân Phú directions, estimated pin or storefront schema.

The current administrative ward and storefront sign name remain unconfirmed. Address helpers display the supplied street address with the familiar Tân Phú area instead of claiming a new ward. Thủ Đức retains its existing call-before-visiting model; eligibility there requires a separate review.

See [the Google Business and search visibility guide](google-business-tan-phu.md) for official sources, Search Console setup, a search-content plan and registration steps if the actual service model changes.

## Deployment handoff

1. Review the source changes and run the release commands in [README.md](../README.md). Publish `out/` through the existing Netlify site.
2. Check live homepage, services, prices, quotation, portfolio, blog and both location pages on phone and desktop. Verify unknown URLs return HTTP 404.
3. Verify `/sitemap.xml`, `/robots.txt`, social previews, images, phone/Zalo links and canonical URLs on the live domain.
4. Verify `tiem3d.com` in Search Console and submit the sitemap. Add real photographs and documented customer work as they become available; retain illustration labels meanwhile.
5. Monitor indexing, query impressions/clicks and actual quote enquiries. Restore the previous Netlify deploy if a release regression appears.
