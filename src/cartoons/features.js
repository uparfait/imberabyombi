/* cartoons/features.js: a friendly cartoon face on a head (centre cx, cy; radius R): eyes, brows, a small nose, a smile,
   rosy cheeks, and sometimes glasses or a beard (o: the person's look, see person.js). */
import { n, path, circle, stroke } from './shapes.js';
import { INK, BLUSH, shade } from './palette.js';

export function face_bits(cx, cy, R, o) {
  const ey = cy + R * .08, ex = R * .37, at = (x, y) => `${n(cx + x * R)} ${n(cy + y * R)}`;
  let out = '';
