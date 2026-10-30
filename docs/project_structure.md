# Project structure

```
index.html            SEO head, theme boot (no flash), overlay elements (#modal, #picker, #toasts …), templates
public/               favicon.svg, robots.txt, sitemap.xml (copied as they are into dist/)
public/media/         the cartoon sample video and its poster, the social share image, the PNG logo
src/main.jsx          entry: stylesheet (in order), mounts <App/> in #app, starts the router (boot)
src/app.jsx           root component: the page for the current route + the shared dialogs
src/styles/           the stylesheet: base/ (fonts, tokens, scaling, native elements), components/ (@layer components),
                      overrides/ (rules after the utilities); index.css and overrides.css import them in order
src/assets/fonts/     the three typefaces (woff2) and their licence
```

## Folders in `src/` (each has an `index.js` that re-exports its files)
| Folder       | Holds                                                                                       |
|--------------|---------------------------------------------------------------------------------------------|
| `config/`    | `cfg`: brand name and logo parts, storage prefix, currency, latency, page size, business rules, media URLs |
| `cartoons/`  | cartoon pictures drawn from a seed: scenes (`cartoon`) and portraits (`cartoon_face`), behind `cfg.img` / `cfg.face` |
| `lib/`       | small helpers (`esc`, `qs`, `uid`, `pad`), dates (`ymd`, `fmt_d`, `add_d`, `iso_week`), money, colours, download, `lorem` |
| `icons/`     | the path dictionary, flat icons `ic()` and glossy 3D icons `i3()` in fixed colours, the brand mark `mark3d()` (plus `_html` string twins) |
| `icon3d/`    | the 3D icon engine: `render(input, { style, colors, size })` in six styles |
| `iconisus/`  | Iconisus (`/admin/icons`): the 3D icon maker (styles in `styles/iconisus/`) |
| `store/`     | `db` (browser storage) and `app_state` (`ui`, `route`, `render`, `rerender`, `AFTER`, `TIMERS`) |
| `auth/`      | modules list (`MODS`), roles and levels, session (`auth`, `me`), landing pages, invite links |
