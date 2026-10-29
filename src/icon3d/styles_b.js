/* icon3d/styles_b.js: the other three styles (same contract as styles_a.js: (G, C, i) → [defs, body]).
   glossy: a solid, shiny object with a thick base (the template's own 3D icons use it) · clay: a soft tile with a puffy
   white glyph · glass: a translucent tile with a light glyph and a glow behind it. */
import { shade } from './color.js';
import { lin, rad, grad, use, pl, blur, vol } from './parts.js';

export function glossy(G, C, i) {
  const dk = C.hs ? C.s : C.p;
  let ext = ''; for (let k = 8; k >= 1; k--) ext += use(i + 'G', 35, 26 + k * 1.2, 130, shade(dk, -26, 4));
  return [grad(i + 'a', G, [[0, shade(C.p, 20, -6)], [.45, C.p], [1, shade(dk, -16, 4)]])
    + vol(i + 'v', { goo: 1.5, bevel: 3, surf: 5, spec: 1.3, exp: 34, shade: .5 }) + vol(i + 'e', { goo: 1.5, flat: 1 }),
    `<g filter="url(#${i}e)">${ext}</g><g filter="url(#${i}v)">${pl(G, 35, 26, 130, `url(#${i}a)`)}</g>`];
}

export function clay(G, C, i) {
  const dk = C.hs ? C.s : shade(C.p, -8), tile = y => `x="30" y="${y}" width="140" height="140" rx="44"`;
  return [lin(i + 'a', [[0, shade(C.p, 12, -4)], [.6, C.p], [1, dk]]) + lin(i + 'r', [[0, '#fff', .6], [.3, '#fff', 0]])
    + vol(i + 'v', { bevel: 9, surf: 4, spec: .4, exp: 10, shade: .7 }) + vol(i + 'w', { goo: 2.5, bevel: 3.5, surf: 4, spec: .9, exp: 20, shade: .45 })
    + `<filter id="${i}d" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="${shade(C.p, -32)}" flood-opacity=".5"/></filter>`,
    `<rect ${tile(33)} fill="${shade(dk, -20)}"/><g filter="url(#${i}v)"><rect ${tile(24)} fill="url(#${i}a)"/></g>`
