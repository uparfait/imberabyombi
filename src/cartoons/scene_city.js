/* cartoons/scene_city.js: a town street: sky, a far skyline, a row of colourful buildings with lit windows, a sidewalk
   with trees and people walking by, and the road. */
import { rect, circle, stroke, line } from './shapes.js';
import { BUILDINGS, LIT, GLASS, TREES, shade } from './palette.js';
import { sky, tree } from './land.js';
import { person, look } from './person.js';

function building(x, base, bw, bh, color, s, r) {
  const pad = bw * .14, win = Math.max(s * .028, bw * .14), gap = win * .7;
  const cols = Math.max(1, Math.floor((bw - pad * 2 + gap) / (win + gap))), x0 = x + (bw - cols * win - (cols - 1) * gap) / 2;
  let out = rect(x, base - bh, bw, bh + s * .02, s * .014, color) + rect(x, base - bh, bw, s * .02, s * .01, shade(color, -.12));
  for (let y = base - bh + pad; y < base - win * 2.4; y += win * 1.6)
