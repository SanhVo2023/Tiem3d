# Homepage visual and motion refresh

Verified against the static production export on 16 September 2026.

## Design

The homepage uses a graphite print chamber, orange controls, larger Vietnamese
headings, staggered service images, and an asymmetric product gallery. The
closing invitation includes a layered SVG sculpture that turns with scrolling.

The selected illustrative product builds in an eight-second loop. Visitors can
choose another sample or pause effects. Fine pointers tilt the chamber; touch
screens retain a stable layout. The moving service ribbon, process line, and
sculpture follow native scrolling.

## Rendering and accessibility

- The page remains a Server Component. `HomeExperience` enhances its rendered
  children; headings, descriptions, links, FAQ answers, and JSON-LD remain in HTML.
- The first product image is preloaded and eager. A visible base image stays
  underneath the animated color layer. No animation dependency was added.
- System reduced-motion settings disable the effects, including when changed
  while the page is open. The manual pause control stops the ongoing effects.
- The print loop pauses offscreen and when the document is hidden. Scroll work
  runs on demand for visible sections; observers and listeners are cleaned up.
- Existing business facts, canonical URLs, metadata, sitemap, native navigation,
  quotation flow, and illustrative-image disclosures are retained.

## Verification

- Production build: 73 generated outputs; export audit: 68 HTML pages and 61
  sitemap URLs, with no failures or warnings.
- ESLint, TypeScript, asset validation, and all five quotation tests pass.
- Production widths 320, 390, 768, 1025, and 1440 CSS pixels have no horizontal
  overflow. Desktop and 320/390-pixel phone layouts were visually reviewed.
- Production axe WCAG A/AA scan: 25 checks passed, zero violations. Sample
  selection, pause/resume, offscreen suspension, and menu focus were checked.
- With JavaScript disabled: the H1, seven section headings, five FAQ disclosures,
  quotation link, full-color product image, canonical URL, and both JSON-LD blocks
  remain available. Reduced-motion mode has no ongoing long animations.
- Cold local production load at 390 pixels, without throttling: FCP/LCP 824 ms,
  observed CLS 0, encoded HTML 18,699 bytes, and encoded JavaScript 188,403 bytes.

Screenshots are local, ignored artifacts in `.cache/audit/studio-*.png`.
These checks validate rendering and crawlability; production field performance
and search rankings are not inferred from local results.
