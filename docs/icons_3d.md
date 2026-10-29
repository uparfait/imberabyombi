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
