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
  const collar = r.pick(COLLARS), skin_dark = shade(o.skin, -.12);
  let out = rect(0, 0, 100, H, 0, back) + circle(r.range(15, 85), r.range(10, H - 10), r.range(28, 46), shade(back, -.05));
  if (collar === 'hood') out += path(`M${n(cx - 30)} ${n(top + 4)}Q${n(cx)} ${n(cy - 6)} ${n(cx + 30)} ${n(top + 4)}Z`, shade(o.top, -.15));
  out += rect(cx - 7, cy + R - 7, 14, top - cy - R + 12, 4, skin_dark);
  out += path(`M8 ${n(H)}C8 ${n(top + 9)} 24 ${n(top)} 50 ${n(top)}C76 ${n(top)} 92 ${n(top + 9)} 92 ${n(H)}Z`, o.top);
