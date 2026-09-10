# DK Safety Solutions

Static Next.js site for `dksafetysolutions.com`. Every published page is generated
as HTML at build time, including city, area, service, and gated-community routes.
Production hosting only needs the contents of `out/`; no Next.js or Node.js server
is required to serve the website.

Active public pages:

- `/`
- `/chennai`
- `/chennai/[area]`
- `/chennai/[area]/[service]`
- `/chennai/[service]`
- `/chennai/gated-communities`
- `/chennai/[community]`
- `/chennai/[community]/[service]`
- `/about`
- `/gallery`
- `/contact-us`
- `/services`
- `/request-quote`

Shared brand, domain, contact, navigation, gallery, testimonial, and service focus content lives in:

```txt
app/config/site.config.ts
```

Chennai area and service coverage lives in:

```txt
app/config/chennai.config.ts
app/content/service-areas/
app/content/serviceAreaCatalog.ts
app/content/serviceDetails.ts
app/content/services/
```

The Chennai catalog now uses 1152 explicit service-area records from `app/content/service-areas/chennai-manual-service-areas.ts` for 72 areas x 16 services. Full long-form articles in `app/content/services/` override the shorter service-entry page for matching routes and must pass the 2450-2550 word gate in `app/content/manualPageRegistry.ts`.

Run locally:

```bash
npm install
npm run dev
```

Build and validate the complete static website:

```bash
npm run build
```

This creates 1,368 content pages plus the static 404 page, JavaScript, CSS, images,
`sitemap.xml`, and `robots.txt` in `out/`. The postbuild check verifies the complete
route catalog, exported local links and assets, sitemap coverage, and the absence
of runtime fallback or revalidation. `npm run export` and `npm run build:prod`
run this same workflow.

Preview the exported files locally:

```bash
npm start
# Optional alternate port:
npm start -- --port 3100
```

`npm start` and `npm run serve:out` serve only files from `out/`. Build first and
rebuild after content or image changes. The preview binds to `127.0.0.1` by default;
`HOST` and `PORT` can override its address. Use `npm run dev` during editing.

Deploy by uploading the **contents of `out/`** to your static host's document root
(for example `public_html`). Enable directory index files so a deep URL such as
`/chennai/adyar/balcony-safety-nets/` serves its own `index.html`. Configure the host
to use `404.html` for unknown URLs with HTTP status 404. No catch-all rewrite to the
homepage is needed. Vercel is configured to build the site and publish `out/`.

Static paths are defined in `app/content/staticRoutes.ts` and
`app/content/serviceAreaCatalog.ts`, and consumed by `generateStaticParams()` in
the dynamic route pages. `dynamicParams = false` disables unknown parameter
fallback; the root layout rejects request-time rendering. Add content to the
catalog and rebuild to publish new routes. See the
[Next.js static export documentation](https://nextjs.org/docs/13/app/building-your-application/deploying/static-exports).

The enquiry forms run in the browser and submit to the configured Formspree
endpoint. They do not require a Next.js API server. Live email delivery depends
on that external Formspree configuration.

Content, images, and export checks:

```bash
npm run validate:manual-pages
npm run validate:service-images
npm run validate:city-content
npm run typecheck
npm run validate:static
```

The 16 services use 80 optimized WebP files with desktop, mobile, detail, context,
and card variants. Reviewed source mappings live in
`scripts/service-image-sources.json`. Regenerate them with:

```bash
npm run generate:service-images
# Or regenerate one service:
npm run generate:service-images -- staircase-safety-nets
```

New staircase, building-covering, and terrace images were generated as service
illustrations. Their originals live in `assets/service-sources/`; exact prompts
and provenance are in `scripts/service-image-prompts.md`. They are illustrative
images, not photographs of completed client projects. Only optimized WebP
derivatives are needed by the published pages.

## Chennai city service guides

The main `/chennai/[service]/` landing pages have their own detailed content in
`app/content/city-services/`, separate from the neighborhood articles. Each guide
includes service-specific planning, comparisons, pricing factors, a quote
checklist, installation and maintenance guidance, local considerations, and eight
FAQs. Titles, descriptions, visible answers and FAQ structured data use the same
content records. The `/chennai/` directory explains how to choose a service and
links to all 16 guides and 72 neighborhoods.

`npm run build` checks city content before export and verifies that the exported
HTML contains the current copy, metadata and matching FAQ schema afterwards.
These are editorial completeness checks, not search-engine ranking targets.
Research notes and source links are in `docs/chennai-content-research-*.md`.
Prices, product specifications, warranty terms and business credentials should
only be added after confirmation from the business; competitor claims are not
evidence for this site's offerings.

## Brand colours, logo and favicons

The navy, ivory and brass palette is defined in `tailwind.config.js`. The logo
masters are outlined SVG files in `public/brand/`, with matching dark-background,
mobile and favicon variants. Header and footer image dimensions retain their
original proportions. See `docs/premium-brand.md` for colour roles and asset use.

After editing a logo SVG, run `npm run generate:brand` to regenerate PNG icons
and the ICO fallback, then `npm run build` to update the static export.

The home carousel supports swipe/drag, keyboard navigation, and pause/play with
reduced-motion support. Run `npm run test:carousel` for gesture regressions; see
`docs/carousel-interactions.md` for the interaction and browser-check details.
