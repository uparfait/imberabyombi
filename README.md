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
Open `#/login`, pick a role, type any email and password, and explore the admin. No backend is needed: demo data
lives in the browser and can be reset from Settings.

## What is inside
| Area             | Highlights                                                                          |
|------------------|-------------------------------------------------------------------------------------|
| Public website   | Hero, about, mission, vision, strategies, staff, partners, thanks, contact, detail pages, sitemap |

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
