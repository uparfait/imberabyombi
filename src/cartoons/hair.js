/* cartoons/hair.js: hairstyles around a head (centre cx, cy; radius R), in two parts: hair_back goes behind the head
   (long hair, a bob, an afro, a bun) and hair_front over it (the top and the fringe). 'bald' draws nothing. */
import { n, path, circle } from './shapes.js';

export const HAIR_STYLES = ['short', 'side', 'long', 'bob', 'bun', 'curly', 'afro', 'short', 'bald'];

/* x, y as fractions of R from the centre → "x y" */
const at = (cx, cy, R) => (x, y) => `${n(cx + x * R)} ${n(cy + y * R)}`;

export function hair_back(cx, cy, R, style, color) {
  const p = at(cx, cy, R);
  if (style === 'long') return path(`M${p(-1.06, -.2)}Q${p(-1.22, 1.45)} ${p(-.75, 1.75)}L${p(.75, 1.75)}Q${p(1.22, 1.45)} ${p(1.06, -.2)}Z`, color);
