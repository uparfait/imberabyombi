# Deploying

`npm run build` writes a static site to `dist/`. Any static host can serve it; no server code is needed.
Asset paths are relative (`base: './'` in `vite.config.js`) and routes are hash-based (`#/about`), so the site works
from the domain root or any sub-folder without server rules.

## GitHub Pages
1. Build: `npm run build`.
