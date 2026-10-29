/* cartoons/land.js: the outdoors: a sky (soft gradient, the sun and clouds above the horizon), rolling hills, trees and
   bushes. Sizes follow s, the picture's shorter side, so a scene reads the same in any shape. */
import { n, pts, path, rect, circle, ellipse, sun, cloud, v_gradient } from './shapes.js';
import { SKIES, SUNS, TREES, TRUNK, shade } from './palette.js';

/* horizon: where the land starts (y); colours: [top, bottom] of the gradient */
export function sky(w, h, r, horizon, colors = r.pick(SKIES)) {
  const s = Math.min(w, h), count = r.int(2, 4);
  let out = `<defs>${v_gradient('sky', colors[0], colors[1])}</defs>` + rect(0, 0, w, h, 0, 'url(#sky)');
  if (r.chance(.85)) out += sun(r.range(w * .12, w * .88), r.range(horizon * .2, horizon * .45), s * r.range(.06, .085), r.pick(SUNS));
  for (let i = 0; i < count; i++) out += cloud(w * (i + r.range(0, .55)) / count, r.range(horizon * .15, horizon * .6), s * r.range(.16, .26));
  return out;
}

/* a band whose top rolls around y (± amp), filled down to the bottom of the picture */
export function hill(w, h, y, amp, fill, r) {
  const k = 2 * Math.PI / w, f1 = r.range(.7, 1.6) * k, f2 = r.range(2.2, 3.6) * k, p1 = r.range(0, 7), p2 = r.range(0, 7), list = [];
  for (let i = 0; i <= 48; i++) { const x = w * i / 48; list.push([x, y + amp * (.75 * Math.sin(x * f1 + p1) + .25 * Math.sin(x * f2 + p2))]); }
  return path(pts(list) + `L${n(w)} ${n(h)}L0 ${n(h)}Z`, fill);
}

/* a tree s tall standing on ground: 'round' (puffs), 'pine' (three tiers) or 'tall' (an oval) */
export function tree(x, ground, s, r, kind = r.pick(['round', 'round', 'pine', 'tall']), color = r.pick(TREES)) {
  const light = shade(color, .2), g = ground;
