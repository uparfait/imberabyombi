# How to add a public page

Public pages are detail pages: a branded hero, the page's own top content, then long-form text, all from one entry.

## 1. Write the content
Create a section in `src/site/`, for example `src/site/services_sec.jsx`:
```jsx
/* site/services_sec.jsx: the Services section (home) and the top of the Services page */
import { sec_head, spy_attrs } from './site_bits.jsx';

export const services_sec = (page = 0) => (
  <section className="section" {...spy_attrs('services', page)}>
    <div className="wrap">
      {sec_head('Services', 'What we offer', 'One sentence that explains the services.')}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {['Design', 'Build', 'Support'].map((t, i) => (
          <article key={t} className="card p-6" data-reveal="" style={{ '--d': `${i * 0.08}s` }}>
            <h3 className="text-lg">{t}</h3><p className="mt-2 text-muted">Lorem ipsum dolor sit amet.</p>
          </article>))}
      </div>
    </div>
  </section>);
```
Use the existing helpers (`sec_head`, `more`, `hero_shell`, `kicker` styles) so the page matches the others.

## 2. Register the page
In `src/site/pages.jsx` add an entry to `PAGES`:
```js
services: { t: 'Services', i: 'layers', top: () => services_sec(1) },
```
- `t` is the title (tab title, hero, menus), `i` an icon name from `src/icons/paths.js`, `top` the content above the
  long-form text. The route `/services` works at once, with its own `<title>` and description.

## 3. Show it in the menus (optional)
Add `['services', 'Services']` to `PUB` in `src/site/site_bits.jsx`: the header links, the mobile drawer and the footer
list it. To also show the section on the home page, add `{services_sec()}` to `home()` in `src/site/pages.jsx`.

## 4. Tell search engines
Add `<url><loc>https://example.com/services</loc></url>` to `public/sitemap.xml`.

## Tips
- Keep each file under 100 lines: one section per file.
- `data-reveal` fades content in on scroll; `data-count="120"` on a `<data>` element counts up.
- Long text: `longform()` (src/site/longform.jsx) builds the article with a table of contents.
- Images: `<img src={cfg.img('services', 900, 650)} alt="…" width="900" height="650" loading="lazy" />` draws a
  cartoon scene for the seed `'services'` ([cartoons](cartoons.md)).
