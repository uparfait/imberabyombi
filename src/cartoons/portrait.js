/* cartoons/portrait.js: a cartoon portrait (head and shoulders) on a soft background, for avatars and team cards.
   Drawn on a 100-wide canvas as tall as the picture's shape (100 × 125 for a 4:5 card); the face sits a little above the
   middle so round avatars crop well. */
import { n, path, rect, circle } from './shapes.js';
import { BACKS, WHITE, BRAND, shade } from './palette.js';
import { look, head } from './person.js';
import { rng } from './rng.js';

const COLLARS = ['crew', 'v', 'shirt', 'hood'];

export function portrait_svg(seed, w = 320, h = w) {
  const r = rng('face:' + seed), o = look(r), back = r.pick(BACKS), H = 100 * h / w, cx = 50, cy = H * .44, R = 20, top = cy + R + 9;
