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

export const HUES = { orange: '#E0661B', amber: '#E5A01A', green: '#17A34A', teal: '#0E9AA7', sky: '#0EA5E9', blue: '#2F6FDB',
  indigo: '#4F46E5', violet: '#7C5CFF', pink: '#E0457B', red: '#DC3545', slate: '#5B6475' };
export const TONES = { brand: HUES.orange, ink: HUES.slate, ok: HUES.green, info: HUES.blue, warn: HUES.amber, bad: HUES.red };
/* a run of hues for rows of icons that should each look different (tiles, cards): hue_at(i) */
export const HUE_RUN = ['orange', 'blue', 'green', 'violet', 'teal', 'pink', 'amber', 'indigo', 'sky', 'red'];
export const hue_at = i => HUE_RUN[((i % HUE_RUN.length) + HUE_RUN.length) % HUE_RUN.length];

const hex = c => TONES[c] || HUES[c] || (/^#[0-9a-f]{3,8}$/i.test(c || '') ? c : TONES.brand);
/* the icon fills more of its box than the engine's 200 × 200 picture leaves it (a single character, the brand mark, more) */
const VIEW = [18, 12, 164, 164];
/* the CSS pixels a size class gives: h-11 → 44 (the largest when there are several, as in "h-11 sm:h-12") */
export const css_px = cls => Math.max(0, ...[...String(cls).matchAll(/(?:^|[\s:])(?:h|w|size)-(\d+(?:\.5)?)(?=\s|$)/g)].map(m => +m[1] * 4)) || 56;
const CACHE = new Map();
export function i3_src(n, color, css = 56) {
  const c = hex(color), px = Math.round(device_px(css)), k = `${n}|${c}|${px}`;
  if (!CACHE.has(k)) {
    const glyph = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="${icon_path(n)}"/></svg>`;
