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
