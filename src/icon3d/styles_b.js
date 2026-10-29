/* icon3d/styles_b.js: the other three styles (same contract as styles_a.js: (G, C, i) → [defs, body]).
   glossy: a solid, shiny object with a thick base (the template's own 3D icons use it) · clay: a soft tile with a puffy
   white glyph · glass: a translucent tile with a light glyph and a glow behind it. */
import { shade } from './color.js';
import { lin, rad, grad, use, pl, blur, vol } from './parts.js';

export function glossy(G, C, i) {
  const dk = C.hs ? C.s : C.p;
