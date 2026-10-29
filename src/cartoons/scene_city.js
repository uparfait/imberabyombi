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
    for (let c = 0; c < cols; c++) out += rect(x0 + c * (win + gap), y, win, win * 1.1, win * .2, r.chance(.4) ? LIT : GLASS);
  out += rect(x + bw / 2 - win * .7, base - win * 2, win * 1.4, win * 2, win * .3, shade(color, -.3));
  if (r.chance(.3)) out += stroke(line(x + bw * .7, base - bh, x + bw * .7, base - bh - s * .07), shade(color, -.3), s * .008) + circle(x + bw * .7, base - bh - s * .07, s * .01, '#E0661B');
  return out;
}

export function city(w, h, r) {
  const s = Math.min(w, h), base = h * r.range(.7, .76), walk = s * .05;
  let out = sky(w, h, r, base - h * .3), x = -r.range(0, s * .06);
  const far = shade('#9FB3C8', r.range(-.05, .1));
  for (let fx = 0; fx < w; fx += s * r.range(.08, .14)) out += rect(fx, base - h * r.range(.38, .58), s * r.range(.08, .14), h * .6, s * .01, far, 'opacity=".55"');
  while (x < w) {
    const bw = s * r.range(.15, .26);
    out += building(x, base, bw, h * r.range(.26, .52), r.pick(BUILDINGS), s, r);
    x += bw + s * r.range(0, .025);
  }
  out += rect(0, base, w, walk, 0, '#D5DCE3') + rect(0, base + walk, w, h - base - walk, 0, '#5D6B7A');
  for (let dx = s * .04; dx < w; dx += s * .16) out += rect(dx, base + walk + (h - base - walk) / 2 - s * .006, s * .08, s * .012, s * .006, '#F5F7FA');
  const trees = r.int(1, 3);
  for (let i = 0; i < trees; i++) out += tree(w * (i + r.range(.2, .8)) / trees, base + walk * .6, s * .22, r, 'round', r.pick(TREES));
