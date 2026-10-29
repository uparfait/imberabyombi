/* icon3d: the 3D icon engine. render(input, { style, colors, size }) turns a letter, number, symbol, SVG or Iconify icon
   into a 3D-looking SVG string (vector: scale it freely; the look comes from SVG lighting filters).
     input   'A' | '#' | 'Hi' (up to 3 characters) · '<svg viewBox="0 0 24 24">…</svg>' · { body, width, height, left, top }
     style   'classic' | 'balloon' | 'ribbon' | 'glossy' | 'clay' | 'glass'
     colors  ['#primary', '#secondary', '#tertiary']: 1, 2 or 3 (missing ones are worked out from the first)
     size    pixels or any CSS size ('100%')
   Text is set in the site's own fonts. The template's 3D icons (i3, src/icons) use it in the glossy style; the Iconisus
   module (/admin/icons) is its playground. Import from here: import { render, STYLES } from '../icon3d/index.js' */
import { classic, balloon, ribbon } from './styles_a.js';
import { glossy, clay, glass } from './styles_b.js';
import { glyph } from './glyph.js';
import { sym } from './parts.js';
import { palette } from './color.js';

export { palette } from './color.js';
export { iconify_svg, clean_svg } from './glyph.js';

const MAKERS = { classic, balloon, ribbon, glossy, clay, glass };
export const STYLES = Object.keys(MAKERS);
