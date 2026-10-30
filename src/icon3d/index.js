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
import { glyph } from './glyph.js';
import { sym } from './parts.js';
import { palette } from './color.js';

export { palette } from './color.js';
export { iconify_svg, clean_svg } from './glyph.js';

const MAKERS = { classic, balloon, ribbon, glossy, clay, glass };
export const STYLES = Object.keys(MAKERS);
/* rounder letters for the inflated styles; the display font for the rest */
const ROUND = ["Figtree, 'Arial Rounded MT Bold', system-ui, sans-serif", 800], DISPLAY = ["'Bricolage Grotesque', Figtree, system-ui, sans-serif", 800];
const FONTS = { balloon: ROUND, ribbon: ROUND };
let n = 0;

/* the device pixels of a size in CSS pixels on this screen (devicePixelRatio, in quarter steps, 1 to 3) */
export const device_px = css => css * Math.min(3, Math.max(1, Math.round((globalThis.devicePixelRatio || 1) * 4) / 4));

export function render(input, o = {}) {
  const style = MAKERS[o.style] ? o.style : 'classic', C = palette(o.colors), s = o.size ?? 128, view = o.view || [0, -4, 200, 200];
  const G = glyph(input, FONTS[style] || DISPLAY), i = 'i3d' + (++n).toString(36) + Math.random().toString(36).slice(2, 5);
  const px = +o.px || (typeof s === 'number' && s > 0 ? s : 200), k = px / view[2];   /* device px per unit */
  const [defs, body] = MAKERS[style](G, C, i, k);
