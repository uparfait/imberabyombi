# Deploying

`npm run build` writes a static site to `dist/`. Any static host can serve it; no server code is needed.
Asset paths are relative (`base: './'` in `vite.config.js`) and routes are hash-based (`#/about`), so the site works
from the domain root or any sub-folder without server rules.

## GitHub Pages
1. Build: `npm run build`.
2. Publish `dist/` to a `gh-pages` branch, or use a GitHub Actions workflow that runs `npm ci && npm run build` and
   uploads `dist/` with the official Pages actions (`actions/upload-pages-artifact`, `actions/deploy-pages`).
3. In the repository settings, set Pages to deploy from that branch or from GitHub Actions.
The site is then served at `https://<user>.github.io/<repository>/`.

## Netlify, Vercel, Cloudflare Pages
- Build command: `npm run build`
- Output folder: `dist`
- No redirects are needed (hash routes).

## Any web server (Apache, Nginx, IIS, a shared host)
Upload the contents of `dist/`. Serve `index.html` for `/`. Let the server cache `assets/*` files for a long time
(their names contain a content hash) and keep `index.html` uncached so updates show at once:
```nginx
location /assets/ { add_header Cache-Control "public, max-age=31536000, immutable"; }
location = /index.html { add_header Cache-Control "no-cache"; }
