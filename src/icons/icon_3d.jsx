/* icons/icon_3d.jsx: 3D "clay tile" icon, flat edition: gradient face + soft gloss + white glyph (no depth slab, no glyph
   shadow). Colours come from tokens. i3(name, cls, tone) draws it as JSX, i3_html(...) as a string; GID keeps gradient ids unique. */
import { icon_path } from './icon.jsx';

export let GID = 0;
export const TONES = { brand: ['brand', 'brand_2'], ink: ['muted', 'ink'], ok: ['ok', 'ok'], info: ['info', 'info'], warn: ['warn', 'brand_2'], bad: ['bad', 'bad'] };
const tile = (tone, n) => { const id = 'i3' + (++GID), [a] = TONES[tone] || TONES.brand; return { id, a, d: icon_path(n) }; };

export function i3(n, c = 'w-14 h-14', tone = 'brand') {
  const { id, a, d } = tile(tone, n);
  return (
