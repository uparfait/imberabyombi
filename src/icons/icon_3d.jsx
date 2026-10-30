/* icons/icon_3d.jsx: 3D icons, glossy: each path of the dictionary drawn as a solid, shiny object with a thick base by the
   Icon3D engine (src/icon3d/). Their colours are fixed here, at development: the theme and the live design tokens never
   change them. The place that shows an icon picks its colour: a tone (brand, ink, ok, info, warn, bad), a hue (orange,
   amber, green, teal, sky, blue, indigo, violet, pink, red, slate) or a hex.
   i3(name, cls, color) draws it as an <img>, built for the pixel size its classes give (h-11: 44 px, times the screen's
   pixel density; the engine tunes its lighting to it) and cached per name, colour and size; i3_html(...) is the string
   twin, and mark3d(text, cls, color) draws a glossy letter or symbol inline, in the site's display font. The brand mark is
   mark3d('#'): its "#" is the display font's own outline (HASH), so it looks the same before the fonts load and matches
   the favicon (public/favicon.svg, made from HASH with the same engine). */
import { icon_path } from './icon.jsx';
import { render, device_px } from '../icon3d/index.js';
