# Before production

The template is a complete front end with demo data in the browser. Before real users rely on it:

## Security
- `localStorage` is not secure storage, and the demo sign-in accepts any details. Replace `db` (src/store/db.js)
  and `auth` (src/auth) with calls to your API; see [connecting a backend](connecting_a_backend.md).
- Enforce every permission on the server. `auth.can()` in the browser only decides what the interface shows.
- Keep secrets (API keys, tokens) on the server. Anything in `src/` ends up in the public bundle.

## Content
- Replace the lorem ipsum text, names and numbers (`lorem` in src/lib generates them; pages call it while drawing).
- Replace the sample media in `src/config/` (`cfg.img`, `cfg.face`, `cfg.hero`, `cfg.video`, `cfg.poster`, `cfg.audio`,
- Replace the brand name and logo parts (`cfg.name`, `cfg.logo`) and the favicon (`public/favicon.svg`).

## SEO and sharing
- Update `index.html`: title, description, keywords, author, canonical URL, Open Graph image, JSON-LD values.
- Update the domain in `public/robots.txt` and `public/sitemap.xml`.

## Accessibility
- White text on the default brand orange is about 3.4:1. For strict WCAG AA on small button text, use a darker
  `--brand` (around `184 74 12`) or switch primary buttons to `text-ink`.

## Performance
- Set `cfg.latency` to `0` (the simulated network delay) once real requests replace the demo store.
- Run `npm run build` and check the sizes it prints; run Lighthouse on `npm run preview`.

## Data
- The storage prefix `loremds:v1:` (`window.NS` in `index.html`) separates datasets; change it when your data shape
  changes so old browser data is not read by the new version.
