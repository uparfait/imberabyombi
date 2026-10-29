/* icons/icon_3d.jsx: 3D icons, glossy: each path of the dictionary drawn as a solid, shiny object with a thick base by the
   Icon3D engine (src/icon3d/). Their colours are fixed here, at development: the theme and the live design tokens never
   change them. The place that shows an icon picks its colour: a tone (brand, ink, ok, info, warn, bad), a hue (orange,
   amber, green, teal, sky, blue, indigo, violet, pink, red, slate) or a hex.
   i3(name, cls, color) draws it as an <img> (each name + colour is built once, then cached), i3_html(...) is the string
   twin, and mark3d(text, cls, color) draws a glossy letter or symbol inline, in the site's display font (the brand mark). */
import { icon_path } from './icon.jsx';
import { render } from '../icon3d/index.js';

export const HUES = { orange: '#E0661B', amber: '#E5A01A', green: '#17A34A', teal: '#0E9AA7', sky: '#0EA5E9', blue: '#2F6FDB',
  indigo: '#4F46E5', violet: '#7C5CFF', pink: '#E0457B', red: '#DC3545', slate: '#5B6475' };
export const TONES = { brand: HUES.orange, ink: HUES.slate, ok: HUES.green, info: HUES.blue, warn: HUES.amber, bad: HUES.red };
/* a run of hues for rows of icons that should each look different (tiles, cards): hue_at(i) */
export const HUE_RUN = ['orange', 'blue', 'green', 'violet', 'teal', 'pink', 'amber', 'indigo', 'sky', 'red'];
export const hue_at = i => HUE_RUN[((i % HUE_RUN.length) + HUE_RUN.length) % HUE_RUN.length];

const hex = c => TONES[c] || HUES[c] || (/^#[0-9a-f]{3,8}$/i.test(c || '') ? c : TONES.brand);
/* the icon fills more of its box than the engine's 200 × 200 frame leaves it (a single character, the brand mark, more still) */
const frame = (svg, vb = '18 12 164 164') => svg.replace('viewBox="0 -4 200 200"', `viewBox="${vb}"`);
const CACHE = new Map();
export function i3_src(n, color) {
  const c = hex(color), k = `${n}|${c}`;
  if (!CACHE.has(k)) {
    const glyph = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="${icon_path(n)}"/></svg>`;
    CACHE.set(k, 'data:image/svg+xml,' + encodeURIComponent(frame(render(glyph, { style: 'glossy', colors: [c], size: 200 }))));
  }
  return CACHE.get(k);
}

export const i3 = (n, c = 'w-14 h-14', color = 'brand') =>
  <img src={i3_src(n, color)} className={`i3 shrink-0 ${c}`} alt="" aria-hidden="true" draggable={false} decoding="async" />;
export const i3_html = (n, c = 'w-14 h-14', color = 'brand') =>
  `<img src="${i3_src(n, color)}" class="i3 shrink-0 ${c}" alt="" aria-hidden="true" draggable="false" decoding="async">`;

/* a glossy letter or symbol, inline so it uses the site's fonts (the brand mark is mark3d('#')) */
const MARKS = new Map();
export function mark3d(t, c = 'h-9 w-9', color = 'brand') {
  const k = `${t}|${hex(color)}`;
  if (!MARKS.has(k)) MARKS.set(k, frame(render(t, { style: 'glossy', colors: [hex(color)], size: '100%' }), '42 39 116 116'));
}
