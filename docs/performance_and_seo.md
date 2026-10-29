# Performance and SEO

The template is meant to run well on low-end phones, slow CPUs and small bandwidth.

## Lightweight by design
- Runtime dependencies: React and ReactDOM only. No UI kit, no router library, no state library, no date library.
- Tailwind generates only the utilities the code uses; the production CSS is small and cached.
- Fonts load without blocking the first paint (`display=swap`, stylesheet applied after load); text shows at once.
- Images are lazy (`loading="lazy"`), carry `width` / `height` (no layout shift) and fall back to a branded
  placeholder when they fail. Video and audio load only when played.
- One render per change: views read data directly while they draw; the router redraws once per navigation.
- Events are delegated: a handful of document listeners serve every button, so pages create no listeners per row.
- Work that needs the screen (charts, reveal animations, count-ups) runs after the draw and only for what is visible.
- `prefers-reduced-motion` skips animations entirely, which also saves CPU on slow devices.
- `vite build` minifies JS and CSS, splits CSS per chunk and reports the gzip size of every file.

## Measuring
```bash
npm run build      # prints every file with its gzip size
npm run preview    # then run Lighthouse in Chrome DevTools on the preview address
```
Test on a throttled profile (DevTools → Performance → CPU 4× slowdown, Network "Slow 4G") to see the low-end experience.

## SEO
- `index.html` holds a real title, description, keywords, robots, author and canonical link, Open Graph and Twitter
  card tags, theme colours for light and dark, a favicon and JSON-LD structured data (Organization).
- Every page has a real address (`/about`, `/contact`), so each one can be crawled, shared and indexed on its own.
- Each route updates `<title>`, the meta description, `og:title` and the canonical link (`set_meta()` in src/router).
- `public/robots.txt` and `public/sitemap.xml` tell crawlers what to read; update the domain before publishing.
- The host must answer every address with `index.html` (see [deploying](deploying.md)), so a crawler that opens
  `/about` directly gets the page.
- Images carry `alt` text; headings follow one `h1` per page; links are real `<a href>` elements.
- A `<noscript>` message explains that the site needs JavaScript.

## Pre-rendering
Search engines render JavaScript pages. If the public pages must also show their text before any script runs, pre-render
them at build time; they only read static data, so this is straightforward.

## Before publishing
Sample pictures cost no download: they are cartoons drawn in the page ([cartoons](cartoons.md)); the sample video
(370 KB) loads only when played. Replace the canonical URL, the JSON-LD values, the social image and the sample media. See
[before production](before_production.md).
