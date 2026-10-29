/* icon3d/styles_b.js: the other three styles (same contract as styles_a.js: (G, C, i) → [defs, body]).
   glossy: a solid, shiny object with a thick base (the template's own 3D icons use it) · clay: a soft tile with a puffy
   white glyph · glass: a translucent tile with a light glyph and a glow behind it. */
import { shade } from './color.js';
import { lin, rad, grad, use, pl, blur, vol } from './parts.js';

export function glossy(G, C, i) {
  const dk = C.hs ? C.s : C.p;
  let ext = ''; for (let k = 8; k >= 1; k--) ext += use(i + 'G', 35, 26 + k * 1.2, 130, shade(dk, -26, 4));
  return [grad(i + 'a', G, [[0, shade(C.p, 20, -6)], [.45, C.p], [1, shade(dk, -16, 4)]])
