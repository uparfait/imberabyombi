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
| `tzconv/`    | TZ PlayGround, the time zone converter (`/admin/tz`; styles in `styles/tzconv/`); the time zone helpers are `lib/tz.js` |
| `store/`     | `db` (browser storage) and `app_state` (`ui`, `route`, `render`, `rerender`, `AFTER`, `TIMERS`) |
| `auth/`      | modules list (`MODS`), roles and levels, session (`auth`, `me`), landing pages, invite links |
| `schemas/`   | one schema per data type: fields, table columns, renderers, seed data                       |
| `ui/`        | small markup helpers: badge, tag, avatar, person, cells, tabs, stat row, empty state, logo, search pill |
| `fields/`    | `field()` (one form field from a schema field), date/time masks, `form_obj()`, `set_native_value()` |
| `feedback/`  | spinner, inline messages, notifications, validation, `request()`, the top loader            |
| `overlays/`  | `modal()`, `ask()`, dialogs host, the shared picker (selects, dates, times) and tooltip     |
| `files/`     | `File_box` (file field with tiles), file viewer, file helpers                                |
| `table/`     | `crud()` data tables, column filters, pager, table settings, full screen, details view, forms, export |
| `site/`      | public website: header, footer, home sections, detail pages, long-form pages                |
| `account/`   | sign in, forgot password, 2-step code, authenticator app, set password                      |
| `kit/`       | the design-system page (`/ui`), one file per specimen group                                |
| `admin/`     | admin shell: sidebar, header tools, side panels, apps menus, nested navigation              |
| `modules/`   | one view per admin module (`VIEWS`), the calendar and the task feature                      |
| `charts/`    | charts and KPIs (SVG), their data dialog and tooltip; the small canvas chart registry       |
| `emails/`    | email designs and the email gallery                                                         |
| `editor/`    | the document editor (`/admin/docs`): page frame, pagination, formatting, images, menus, import and export |
| `sign/`      | O-Doc Sign (`/admin/sign`): PDFs sent for signature, signers, fields, signing, the signed PDF (styles in `styles/sign/`) |
| `actions/`   | every `data-act` handler (`ACT`), which ones are requests (`REQ`), every `data-form` handler (`FORMS`) |
| `behaviors/` | the delegated document listeners: click, internal links, input, change, keys, pointer, scroll |
| `router/`    | path routes (`to`, `go`), page meta, `render_route()`, what runs after each draw, `boot()`  |

## How the pieces talk
- A page is a function that returns JSX and reads `db`, `ui` and `route` while it draws.
- A button declares its job with `data-act="name"`; `ACT.name(button, event)` runs it (see
  [actions and events](actions_and_events.md)). After changing data it calls `rerender()`.
- Folders import each other only through their `index.js` (`import { crud } from '../table/index.js'`).

See [rendering and state](rendering_and_state.md) for the draw cycle and [naming and files](naming_and_files.md) for the rules.
