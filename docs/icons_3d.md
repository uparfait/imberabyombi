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
- Each name and colour is built once and cached; icons are `<img>` elements, see-through on every background.
- The brand mark is `mark3d('#')`: the sidebar's top row, the header (sidebar closed) and the email designs.

## Where the colours are used
Status: green (done, complete), amber (warnings, waiting), red (problems). Files and documents: blue. Roles and access:
violet. Tiles, cards and lists of pages: `hue_at(i)`. O-Doc Sign's lists: All orange, Drafts slate, Waiting amber,
Completed green, To sign violet.

## The engine (`src/icon3d/`)
`render(input, { style, colors, size })` returns an SVG string (vector; the look comes from SVG lighting filters).
| Argument | Values |
|---|---|
| input | `'A'`, `'7'`, `'#'` (up to 3 characters), any SVG string, or Iconify icon data `{ body, width, height, left, top }` |
| style | `classic` (orb, extruded glyph), `balloon` (inflated two-tone), `ribbon` (striped bands), `glossy` (solid, shiny), `clay` (soft tile), `glass` (translucent tile) |
| colors | `[primary, secondary, tertiary]`: 1 to 3; the missing ones are worked out from the first |
| size | pixels or any CSS size (`'100%'`) |

Text is set in the site's own fonts. Files: `color.js` (colour maths, palette), `glyph.js` (input → glyph), `parts.js`
