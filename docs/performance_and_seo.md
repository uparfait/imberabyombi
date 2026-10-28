# Performance and SEO

The template is meant to run well on low-end phones, slow CPUs and small bandwidth.

## Lightweight by design
- Runtime dependencies: React and ReactDOM only. No UI kit, no router library, no state library, no date library.
- Tailwind generates only the utilities the code uses; the production CSS is small and cached.
- Fonts load without blocking the first paint (`display=swap`, stylesheet applied after load); text shows at once.
- Images are lazy (`loading="lazy"`), carry `width` / `height` (no layout shift) and fall back to a branded
  placeholder when they fail. Video and audio load only when played.
- One render per change: views read data directly while they draw; the router redraws once per navigation.
