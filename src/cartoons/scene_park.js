/* cartoons/scene_park.js: a sunny park: three layers of rolling hills, trees and bushes, a winding path, birds in the
   sky and friends out for the day in front. */
import { n, path, bird } from './shapes.js';
import { HILLS, TREES, INK, shade } from './palette.js';
import { sky, hill, tree, bush } from './land.js';
import { person, look } from './person.js';

export function park(w, h, r) {
  const s = Math.min(w, h), g = h * r.range(.56, .64), hc = r.pick(HILLS);
  let out = sky(w, h, r, g);
