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
  if (kind === 'pine') {
    let out = rect(x - s * .05, g - s * .22, s * .1, s * .22, s * .02, TRUNK);
    [[.15, .5, .36], [.4, .42, .28], [.62, .38, .2]].forEach(([b, t, half]) => {   // tier: base height, tier height, half width
      const yb = g - s * b;
      out += path(`M${n(x - s * half)} ${n(yb)}L${n(x)} ${n(yb - s * t)}L${n(x + s * half)} ${n(yb)}Z`, color,
        `stroke="${color}" stroke-width="${n(s * .05)}" stroke-linejoin="round"`);
    });
    return out;
  }
  const trunk = rect(x - s * .05, g - s * .55, s * .1, s * .55, s * .03, TRUNK);
  if (kind === 'tall') return trunk + ellipse(x, g - s * .62, s * .2, s * .38, color) + ellipse(x - s * .06, g - s * .74, s * .07, s * .16, light);
  return trunk + circle(x - s * .19, g - s * .5, s * .2, color) + circle(x + s * .19, g - s * .5, s * .2, color)
    + circle(x, g - s * .7, s * .27, color) + circle(x, g - s * .46, s * .21, color) + circle(x - s * .09, g - s * .8, s * .09, light);
