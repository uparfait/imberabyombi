/* account/qr_svg.js: QR code look-alike for the authenticator demo (deterministic, with the three finder squares).
   Returns an SVG string (no user text in it); the page renders it with dangerouslySetInnerHTML. */
import { lorem, hash_str } from '../lib/index.js';

export function qr_svg(seed) {
  lorem.seed(hash_str(seed)); const n = 25, out = [];
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
