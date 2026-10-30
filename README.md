# Imberabyombi template

A complete, ready-to-brand **website + admin** template built with **React, Tailwind CSS and Vite**.
It gives you a public website, account pages, a role-based admin with fourteen working modules, a full design system,
charts and KPIs, all sharing one set of design tokens. Start any new website from it and change only what is yours.

- **Looks the same on every device**: phones show the 360px design scaled to the screen, large screens show the
  desktop design scaled up, and nothing ever scrolls sideways.
- **Light, dark or system theme**, switched instantly, with no flash on load.
- **One design language**: Imberabyombi-style fields, menus, pickers and tooltips, flat (no shadows), brand orange and ink.
- **Light and fast**: React is the only runtime dependency, lazy media, small CSS, works on low-end phones and slow networks.
- **Accessible and SEO-ready**: landmarks, keyboard support, live regions, per-page titles, Open Graph, JSON-LD.

## Quick start
```bash
npm install
npm run dev        # open the address it prints, e.g. http://localhost:5173
npm run build      # production site in dist/
npm run preview    # check the production build
```
Open `/login`, pick a role, type any email and password, and explore the admin. No backend is needed: demo data
lives in the browser and can be reset from Settings.

## What is inside
| Area             | Highlights                                                                          |
|------------------|-------------------------------------------------------------------------------------|
| Public website   | Hero, about, mission, vision, strategies, staff, partners, thanks, contact, detail pages, sitemap |
| Design system    | `/ui`: every component, field type, picker, feedback pattern and motion in one page  |
| Account pages    | Sign in (role picker), forgot password, 2-step code, authenticator app, set password |
| Admin shell      | Collapsible sidebar, apps grid, Create menu, side panels (notes, my tasks, help), Ctrl K palette, nested navigation |
| Modules          | Dashboard, calendar, tasks, document editor, staff, employees, attendance, students, library, events, reservations & inventory, smart parking, roles & access, email designs, charts & KPIs, settings |
| Data tables      | Column search, sort, pages, row settings, hide columns, full screen, details view, add / edit / delete, export to CSV, JSON or Excel |
| Feedback         | Inline messages, notifications, one spinner for every request, custom validation    |

The full feature list is in [whet-it-document.md](whet-it-document.md).

## Project map
```
index.html       SEO head, theme boot, overlay elements      src/styles/    tokens + stylesheet (≤100 lines per file)
src/main.jsx     entry: styles, app, router boot             src/store/     storage (db) and redraw (render, rerender)
src/app.jsx      root: current page + dialogs                src/router/    path routes, page meta, after-draw work
src/config/      brand, media, business rules                src/actions/   every data-act and data-form handler
src/cartoons/    cartoon pictures drawn from a seed          public/media/  sample video, poster, share image, logo
src/icon3d/      the 3D icon engine (six styles)             src/iconisus/  the 3D icon maker (/admin/icons)
src/lib/         small helpers, dates, lorem ipsum           src/behaviors/ delegated events, tooltips, gestures
src/icons/       flat and glossy 3D icons (fixed colours)    src/site/ src/account/ src/kit/   public, account, design pages
src/auth/        roles, permissions, session                 src/admin/ src/modules/ src/charts/ src/emails/  admin
src/schemas/     one schema per data type                    src/table/ src/fields/ src/files/ src/overlays/ src/feedback/ src/ui/
```

## Make it yours in five steps
1. **Brand**: name, logo parts, media and business rules in `src/config/site_config.js`.
2. **Colours, corners, spacing, fonts**: one line each in `src/styles/base/01_design_tokens.css`.
3. **Content**: replace the lorem text in the public sections (`src/site/`) and the detail pages.
4. **Data**: add or edit schemas in `src/schemas/`; tables, forms, export and seed data follow.
5. **SEO**: title, description, canonical URL and JSON-LD in `index.html`; domain in `public/robots.txt` and `sitemap.xml`.
