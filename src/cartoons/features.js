/* cartoons/features.js: a friendly cartoon face on a head (centre cx, cy; radius R): eyes, brows, a small nose, a smile,
   rosy cheeks, and sometimes glasses or a beard (o: the person's look, see person.js). */
import { n, path, circle, stroke } from './shapes.js';
import { INK, BLUSH, shade } from './palette.js';

export function face_bits(cx, cy, R, o) {
  const ey = cy + R * .08, ex = R * .37, at = (x, y) => `${n(cx + x * R)} ${n(cy + y * R)}`;
  let out = '';
  if (o.beard) out += path(`M${at(-.97, .05)}Q${at(-.92, 1.18)} ${at(0, 1.14)}Q${at(.92, 1.18)} ${at(.97, .05)}`
    + `Q${at(.62, .5)} ${at(0, .46)}Q${at(-.62, .5)} ${at(-.97, .05)}Z`, o.hair);
  out += circle(cx - R * .6, cy + R * .4, R * .16, BLUSH, 'opacity=".35"') + circle(cx + R * .6, cy + R * .4, R * .16, BLUSH, 'opacity=".35"');
  if (o.happy) out += stroke(`M${at(-.5, .1)}Q${at(-.37, -.04)} ${at(-.24, .1)}M${at(.24, .1)}Q${at(.37, -.04)} ${at(.5, .1)}`, INK, R * .08);
  else out += circle(cx - ex, ey, R * .1, INK) + circle(cx + ex, ey, R * .1, INK)
    + circle(cx - ex + R * .035, ey - R * .035, R * .035, '#fff') + circle(cx + ex + R * .035, ey - R * .035, R * .035, '#fff');
  out += stroke(`M${at(-.5, -.2)}Q${at(-.37, -.28)} ${at(-.24, -.21)}M${at(.24, -.21)}Q${at(.37, -.28)} ${at(.5, -.2)}`, shade(o.hair, -.1), R * .07);
  out += stroke(`M${at(-.06, .24)}Q${at(0, .31)} ${at(.07, .24)}`, shade(o.skin, -.22), R * .06);
