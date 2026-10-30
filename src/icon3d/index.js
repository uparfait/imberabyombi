/* icon3d: the 3D icon engine. render(input, { style, colors, size, px, view }) turns a letter, number, symbol, SVG or
   Iconify icon into a 3D-looking SVG string (the look comes from SVG lighting filters).
     input   'A' | '#' | 'Hi' (up to 3 characters) · '<svg viewBox="0 0 24 24">…</svg>' · { body, width, height, left, top }
     style   'classic' | 'balloon' | 'ribbon' | 'glossy' | 'clay' | 'glass'
     colors  ['#primary', '#secondary', '#tertiary']: 1, 2 or 3 (missing ones are worked out from the first)
     size    pixels or any CSS size ('100%')
     px      the device pixels the icon is drawn at (default: size when it is a number, else 200). The lighting and the
             goo work per device pixel, so their numbers follow it (parts.js): render one SVG per size you show, with
             the real px (CSS px × devicePixelRatio), rather than scaling one SVG down.
     view    the part of the 200 × 200 picture to show, [x, y, w, h] (default [0, -4, 200, 200]); a tighter view makes
             the icon fill more of its box, and px then counts across that view
   Text is set in the site's own fonts. The template's 3D icons (i3, src/icons) use it in the glossy style; the Iconisus
   module (/admin/icons) is its playground. Import from here: import { render, STYLES } from '../icon3d/index.js' */
import { classic, balloon, ribbon } from './styles_a.js';
import { glossy, clay, glass } from './styles_b.js';
