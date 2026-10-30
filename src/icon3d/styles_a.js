/* icon3d/styles_a.js: three of the six styles. Each takes the glyph (G), the palette (C), a unique id prefix (i) and k
   (device px per unit, parts.js) and returns [defs, body] for a 200 × 200 picture.
   classic: a coloured orb with an extruded white glyph · balloon: an inflated, glossy two-tone glyph ·
   ribbon: concentric striped bands with depth. */
import { shade, mix, blend } from './color.js';
import { lin, rad, glin, gvert, sym, use, pl, vol, extrude, deep } from './parts.js';

export function classic(G, C, i, k) {
  const face = C.ht ? C.t : '#ffffff';
  const d = rad(i + 'b', [[0, shade(C.p, 16, -4)], [.5, C.p], [1, C.hs ? shade(C.s, -10) : shade(C.p, -17, 6)]], '34%', '22%', '88%')
    + lin(i + 'c', [[.55, shade(C.p, -30), 0], [1, shade(C.p, -30), .45]])
    + lin(i + 'g', [[0, '#fff', .55], [1, '#fff', 0]])
    + lin(i + 'r', [[0, '#fff', .75], [.45, '#fff', 0], [1, shade(C.p, -35), .5]])
    + gvert(i + 'l', G, [[0, face], [1, mix(face, C.p, .14)]])
    + `<clipPath id="${i}k"><circle cx="100" cy="92" r="72"/></clipPath>`
    + `<filter id="${i}t" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="${shade(C.p, -35)}" flood-opacity=".45"/></filter>`;
  const ext = extrude(i + 'G', 58, 50, 84, deep(C.p, -22, k, 6), [0, 5], k);
  return [d, `<circle cx="100" cy="92" r="72" fill="url(#${i}b)"/><circle cx="100" cy="92" r="72" fill="url(#${i}c)"/>`
    + `<g clip-path="url(#${i}k)"><ellipse cx="100" cy="46" rx="58" ry="34" fill="url(#${i}g)"/></g>`
    + `<circle cx="100" cy="92" r="72" fill="none" stroke="url(#${i}r)" stroke-width="2.5"/>`
    + `<g filter="url(#${i}t)">${ext}${pl(G, 58, 50, 84, `url(#${i}l)`)}</g>`];
}

export function balloon(G, C, i, k) {
  const st = C.ht ? [[0, C.p], [.5, C.t], [1, C.s]] : [[0, C.p], [1, C.s]];
  return [glin(i + 'a', G, st) + vol(i + 'v', { goo: 5, bevel: 5, surf: 7, spec: .85, exp: 30, shade: .55 }, k),
    `<g filter="url(#${i}v)">${pl(G, 28, 20, 144, `url(#${i}a)`)}</g>`];
}

export function ribbon(G, C, i) {
  const u = Math.max(G.vb[2], G.vb[3]) / 100, K = 5, bw = 2.2 * u, gw = .75 * u, base = G.sw, X = 42, Y = 36, S = 116, R = i + 'R';
  const col = k => blend([C.p, C.s, C.t], k / K);
  const at = w => `stroke="currentColor" stroke-width="${w.toFixed(3)}" stroke-linejoin="round" stroke-linecap="round"`;
  let ext = '', bands = '';
  for (let j = 7; j >= 1; j--) ext += use(R, X + j * .8, Y + j * 1.1, S, shade(col(K), -32), at(base + 2 * K * bw));
  for (let k = K - 1; k >= 0; k--) {
    const w = base + 2 * (k + 1) * bw; bands += use(R, X, Y, S, shade(col(k + 1), -38), at(w)) + use(R, X, Y, S, col(k + 1), at(w - 2 * gw));
  }
  bands += use(R, X, Y, S, col(0), at(base));
  const bare = G.inner.replace(/\sstroke-width="[^"]*"/g, '').replace(/stroke-width\s*:[^;"]+;?/g, '');
  return [sym(R, G, bare) + vol(i + 'v', { bevel: 2, surf: 3, spec: .7, exp: 18, shade: .45 }), ext + `<g filter="url(#${i}v)">${bands}</g>`];
}
