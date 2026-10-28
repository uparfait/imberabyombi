# Deploying

`npm run build` writes a static site to `dist/`. Any static host can serve it; no server code is needed.
Pages have real addresses (`/about`, `/admin/tasks`), so the host must answer every route with `index.html`
(a single-page fallback). The build also writes `dist/404.html`, a copy of `index.html`, for hosts that serve it for
unknown paths. `npm run dev` and `npm run preview` already do this.

## Root or folder
By default the site is built for the domain root (`https://example.com/`). To serve it from a folder, build with
`BASE_PATH` set to that folder, with a slash at both ends:
```bash
BASE_PATH=/my-site/ npm run build          # macOS, Linux, Git Bash
$env:BASE_PATH='/my-site/'; npm run build  # Windows PowerShell
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
```
Enable gzip or brotli compression for `.js`, `.css`, `.svg`, `.xml` and `.txt` files.

## Checklist
- Replace `example.com` in `index.html`, `public/robots.txt` and `public/sitemap.xml`.
- Run `npm run preview` and click through the public site, the sign-in and one admin module.
- See [before production](before_production.md) for security and content.
