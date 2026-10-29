/* cartoons/land.js: the outdoors: a sky (soft gradient, the sun and clouds above the horizon), rolling hills, trees and
   bushes. Sizes follow s, the picture's shorter side, so a scene reads the same in any shape. */
import { n, pts, path, rect, circle, ellipse, sun, cloud, v_gradient } from './shapes.js';
import { SKIES, SUNS, TREES, TRUNK, shade } from './palette.js';

/* horizon: where the land starts (y); colours: [top, bottom] of the gradient */
export function sky(w, h, r, horizon, colors = r.pick(SKIES)) {
  const s = Math.min(w, h), count = r.int(2, 4);
