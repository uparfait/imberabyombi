/* account/qr_svg.js: QR code look-alike for the authenticator demo (deterministic, with the three finder squares).
   Returns an SVG string (no user text in it); the page renders it with dangerouslySetInnerHTML. */
import { lorem, hash_str } from '../lib/index.js';

export function qr_svg(seed) {
  lorem.seed(hash_str(seed)); const n = 25, out = [];
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const box = [[0, 0], [n - 7, 0], [0, n - 7]].find(([a, b]) => x >= a - 1 && x < a + 8 && y >= b - 1 && y < b + 8);
    if (box) {
      const fx = x - box[0], fy = y - box[1]; if (fx < 0 || fy < 0 || fx > 6 || fy > 6) continue;
      if (Math.max(Math.abs(fx - 3), Math.abs(fy - 3)) !== 2) out.push([x, y]);
    }
    else if (lorem.r() > .5) out.push([x, y]);
  }
  return `<svg viewBox="-2 -2 29 29" class="qr" role="img" aria-label="QR code to scan with an authenticator app"><rect x="-2" y="-2" width="29" height="29" fill="#fff"/>`
    + `${out.map(([x, y]) => `<rect x="${x}" y="${y}" width="1.02" height="1.02"/>`).join('')}</svg>`;
}
