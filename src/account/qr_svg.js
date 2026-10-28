/* account/qr_svg.js: QR code look-alike for the authenticator demo (deterministic, with the three finder squares).
   Returns an SVG string (no user text in it); the page renders it with dangerouslySetInnerHTML. */
import { lorem, hash_str } from '../lib/index.js';

export function qr_svg(seed) {
  lorem.seed(hash_str(seed)); const n = 25, out = [];
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const box = [[0, 0], [n - 7, 0], [0, n - 7]].find(([a, b]) => x >= a - 1 && x < a + 8 && y >= b - 1 && y < b + 8);
    if (box) {
      const fx = x - box[0], fy = y - box[1]; if (fx < 0 || fy < 0 || fx > 6 || fy > 6) continue;
