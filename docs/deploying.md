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
```
Asset paths and every link in the app follow it.

## GitHub Pages
1. Build for the repository folder: `BASE_PATH=/<repository>/ npm run build` (skip it for a custom domain or a
   `<user>.github.io` repository, which are served from the root).
2. Publish `dist/` to a `gh-pages` branch, or use a GitHub Actions workflow that runs `npm ci && npm run build` (with
   `BASE_PATH` set) and uploads `dist/` with `actions/upload-pages-artifact` and `actions/deploy-pages`.
3. In the repository settings, set Pages to deploy from that branch or from GitHub Actions.
GitHub Pages serves `404.html` for every unknown path, so deep links and reloads open the app on the right page.

## Netlify, Cloudflare Pages
Build command `npm run build`, output folder `dist`. Add `public/_redirects` (it is copied into `dist/`):
```
/*  /index.html  200
```

## Vercel
`vercel.json` at the project root is ready: build command `npm run build`, output folder `dist`, every route answered

## Nginx
```nginx
location / { try_files $uri $uri/ /index.html; }
location /assets/ { add_header Cache-Control "public, max-age=31536000, immutable"; }
location = /index.html { add_header Cache-Control "no-cache"; }
```

## Apache (`.htaccess` next to `index.html`)
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```
In a folder, use `RewriteBase /my-site/` and `RewriteRule . /my-site/index.html [L]`.

## IIS (`web.config` next to `index.html`)
```xml
<configuration><system.webServer><rewrite><rules>
  <rule name="app" stopProcessing="true"><match url=".*" />
    <conditions><add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
      <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" /></conditions>
    <action type="Rewrite" url="/index.html" /></rule>
</rules></rewrite></system.webServer></configuration>
```

## Caching and compression
Cache `assets/*` for a long time (their names contain a content hash) and keep `index.html` uncached so updates
show at once. Enable gzip or brotli compression for `.js`, `.css`, `.svg`, `.xml` and `.txt` files.

## Checklist
- Replace `example.com` in `index.html`, `public/robots.txt` and `public/sitemap.xml`.
- Run `npm run preview`, click through the public site, the sign-in and one admin module, and reload a deep page
  such as `/admin/tasks`.
- See [before production](before_production.md) for security and content.
