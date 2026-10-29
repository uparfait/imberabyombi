/* icon3d/styles_a.js: three of the six styles. Each takes the glyph (G), the palette (C) and a unique id prefix (i) and
   returns [defs, body] for a 200 × 200 picture.
   classic: a coloured orb with an extruded white glyph · balloon: an inflated, glossy two-tone glyph ·
   ribbon: concentric striped bands with depth. */
import { shade, mix, blend } from './color.js';
import { lin, rad, glin, gvert, sym, use, pl, vol } from './parts.js';

export function classic(G, C, i) {
  const face = C.ht ? C.t : '#ffffff';
