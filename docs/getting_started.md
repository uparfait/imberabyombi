# Getting started

## Requirements
- Node.js 20.19 or newer (22 or 24 recommended) and npm.
- A modern browser: Chrome, Edge, Firefox or Safari (desktop or phone).

## Install and run
```bash
npm install        # installs React, Vite and Tailwind (exact versions from package.json)
npm run dev        # starts the dev server; open the address it prints (usually http://localhost:5173)
```
The page reloads as you save files. Nothing else is needed: there is no backend, data lives in the browser.

## Build for production
```bash
npm run build      # writes the optimised site to dist/
npm run preview    # serves dist/ locally to check the build
```
`dist/` is a static site: upload it to any host (GitHub Pages, Netlify, Vercel, a plain web server).
Asset paths are relative (`base: './'` in `vite.config.js`), so it also works from a sub-folder.

## First tour
1. The public website opens at `#/` (home, about, mission, vision, strategies, staff, partners, thanks, contact).
2. The design-system page is at `#/ui`: every component, field, picker and feedback pattern in one place.
3. Press **Sign in** (or go to `#/login`). Pick a role, type any email and any password, press **Continue**.
4. You land on the first admin module that role can open (or the role's landing page).
5. Sign out from the avatar menu, pick another role and sign in again to see what that role can do.

Internet access is used for fonts, sample photos (picsum.photos, i.pravatar.cc), the sample video and audio
and the map embed. Broken images fall back to a branded placeholder.

## Reset the demo
Settings → Data → **Reset demo data** restores the sample records. Theme, session and tokens stay.
All storage keys start with `loremds:v1:` (`window.NS` in `index.html`); change it to start a fresh dataset.

## Next
- [Project structure](project_structure.md): where everything lives.
