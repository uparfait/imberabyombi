# 3D icons and Iconisus

The template's 3D icons are drawn by the Icon3D engine ([`src/icon3d/`](../src/icon3d/)) in its **glossy** style: each
icon of the path dictionary becomes a solid, shiny object with a thick base. The same engine powers **Iconisus**, the
admin module that turns any letter, symbol, SVG or library icon into a 3D icon.

## Using them
```jsx
import { i3, i3_html, mark3d, hue_at } from '../icons/index.js';
i3('calendar', 'h-12 w-12', 'teal')        // an <img>; any name from src/icons/paths.js
i3_html('file', 'h-10 w-10', 'info')       // the same as a string (plain-JS parts)
mark3d('#', 'h-9 w-9')                     // a glossy letter or symbol, inline (the brand mark)
items.map((x, i) => i3(x.icon, 'h-11 w-11', hue_at(i)))   // a row of tiles, each its own colour
```
- **Colours are fixed in code**, so the theme and the live design tokens (Settings) never change them. The place that
  shows an icon picks its colour, as the third argument:
  - a tone: `brand` (orange, the default), `ink`, `ok`, `info`, `warn`, `bad`;
  - a hue: `orange`, `amber`, `green`, `teal`, `sky`, `blue`, `indigo`, `violet`, `pink`, `red`, `slate`;
  - or a hex, e.g. `'#0E9AA7'`.
- `hue_at(i)` gives rows of tiles and cards a different hue each, always the same for the same position.
- The values live in `src/icons/icon_3d.jsx` (`HUES`, `TONES`, `HUE_RUN`): change a colour there and every icon that uses
  it follows.
- Each icon is built for the pixel size it is shown at: `i3()` reads it from its size classes (`h-11` is 44 px; the largest
  of `h-11 sm:h-12`), times the screen's pixel density, and caches one image per name, colour and size. Icons are `<img>`
  elements, see-through on every background.
- The brand mark is `mark3d('#')`: the sidebar's top row, the header (sidebar closed) and the email designs. Its "#" is
  the display font's own outline (`HASH`, Bricolage Grotesque extra bold), so it looks the same before fonts load.
- The **favicon** is the same glossy "#": `public/favicon.svg` (browsers that take SVG), `public/favicon.ico` (16, 32 and
  48 px, each drawn for its size), `public/apple-touch-icon.png` (180 px) and `public/media/logo.png` (512 px, the logo
  in the structured data). They are made with the engine; remake them the same way if the mark changes.

## Where the colours are used
Status: green (done, complete), amber (warnings, waiting), red (problems). Files and documents: blue. Roles and access:
violet. Tiles, cards and lists of pages: `hue_at(i)`. O-Doc Sign's lists: All orange, Drafts slate, Waiting amber,
Completed green, Archived indigo, To sign violet.

## The engine (`src/icon3d/`)
`render(input, { style, colors, size, px, view })` returns an SVG string (the look comes from SVG lighting filters).
| Argument | Values |
|---|---|
| input | `'A'`, `'7'`, `'#'` (up to 3 characters), any SVG string, or Iconify icon data `{ body, width, height, left, top }` |
| style | `classic` (orb, extruded glyph), `balloon` (inflated two-tone), `ribbon` (striped bands), `glossy` (solid, shiny), `clay` (soft tile), `glass` (translucent tile) |
| colors | `[primary, secondary, tertiary]`: 1 to 3; the missing ones are worked out from the first |
| size | pixels or any CSS size (`'100%'`) |
| px | the device pixels it is drawn at (default: `size` when it is a number). `device_px(css)` gives it for this screen |
| view | the part of the 200 × 200 picture to show, `[x, y, w, h]` (default `[0, -4, 200, 200]`) |

**Small sizes.** The lighting and the "goo" (the step that rounds and thickens) work per device pixel, so one set of
numbers cannot look right at both 24 px and 300 px: small icons came out boxy, with hard black rims. The engine takes
`k`, device pixels per unit, and sets every number from it (`parts.js`): the goo's edge ramp stays about 1.4 px wide and
is skipped when it would be under a pixel; the bevel is at least 1.2 px, with the lighting's slope rescaled to match; a
widened bevel dims the highlight; small icons get a little fill light so far rims never go black; the extrusion's copies
are at most 0.7 px apart and at least 1.1 px deep in all. So render one SVG per size you show, with its real `px`, rather
than scaling one SVG down.
Text is set in the site's own fonts. Files: `color.js` (colour maths, palette), `glyph.js` (input → glyph), `parts.js`
(gradients, filters), `styles_a.js` and `styles_b.js` (the six styles), `index.js` (`render`).

## Iconisus (`/admin/icons`)
In the sidebar under System. Source: Text, Library (twelve icon sets, Lucide to Simple Icons, loaded from jsDelivr only
when picked, searchable, shown in batches) or SVG (pasted). Then a style with a live preview of all six, up to three
colours, a size, and Copy SVG, Download or the code. The preview shows the icon large and at 64, 40 and 24 pixels.
Code: [`src/iconisus/`](../src/iconisus/), styles in `src/styles/iconisus/`; it loads the first time it is opened.
