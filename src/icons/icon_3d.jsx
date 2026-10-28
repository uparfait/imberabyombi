/* icons/icon_3d.jsx: 3D "clay tile" icon, flat edition: gradient face + soft gloss + white glyph (no depth slab, no glyph
   shadow). Colours come from tokens. i3(name, cls, tone) draws it as JSX, i3_html(...) as a string; GID keeps gradient ids unique. */
import { icon_path } from './icon.jsx';

export let GID = 0;
export const TONES = { brand: ['brand', 'brand_2'], ink: ['muted', 'ink'], ok: ['ok', 'ok'], info: ['info', 'info'], warn: ['warn', 'brand_2'], bad: ['bad', 'bad'] };
const tile = (tone, n) => { const id = 'i3' + (++GID), [a] = TONES[tone] || TONES.brand; return { id, a, d: icon_path(n) }; };

export function i3(n, c = 'w-14 h-14', tone = 'brand') {
  const { id, a, d } = tile(tone, n);
  return (
    <svg viewBox="0 0 64 64" className={`i3 shrink-0 ${c}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}f`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: `color-mix(in srgb, rgb(var(--${a})) 55%, white)` }} />
          <stop offset="1" style={{ stopColor: `rgb(var(--${a}))` }} />
        </linearGradient>
        <radialGradient id={`${id}g`} cx=".28" cy=".18" r=".7">
          <stop offset="0" stopColor="#fff" stopOpacity=".5" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="7" y="9" width="50" height="46" rx="23" fill={`url(#${id}f)`} />
      <rect x="7" y="9" width="50" height="46" rx="23" fill={`url(#${id}g)`} />
      <g transform="translate(20 20)" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></g>
    </svg>
  );
}

export function i3_html(n, c = 'w-14 h-14', tone = 'brand') {
  const { id, a, d } = tile(tone, n);
  return `<svg viewBox="0 0 64 64" class="i3 shrink-0 ${c}" aria-hidden="true"><defs>
<linearGradient id="${id}f" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:color-mix(in srgb, rgb(var(--${a})) 55%, white)"/>` +
