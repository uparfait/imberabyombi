# Performance and SEO

The template is meant to run well on low-end phones, slow CPUs and small bandwidth.

## Lightweight by design
- Runtime dependencies: React and ReactDOM only. No UI kit, no router library, no state library, no date library.
- Tailwind generates only the utilities the code uses; the production CSS is small and cached.
- Fonts load without blocking the first paint (`display=swap`, stylesheet applied after load); text shows at once.
