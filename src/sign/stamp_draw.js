/* sign/stamp_draw.js: draws a company stamp into a 400 × 400 canvas, in the template's display font: round (two rings, the
   organisation along the top, today's date along the bottom, two stars, the centre text) or square (a double frame, the
   organisation, the centre text, the date). st = { org, mid, color, shape }; text shrinks until it fits. */
import { page_tz } from '../lib/index.js';

export const INKS = ['#1F3A93', '#B42318', '#0E7A55', '#6D28D9'];
const FONT = '"Bricolage Grotesque", system-ui, sans-serif', C = 200;

export function draw_stamp(c, { org, mid, color, shape }) {
  const x = c.getContext('2d', { willReadFrequently: true });
  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: page_tz() }).toUpperCase();
  const font = s => { x.font = `800 ${s}px ${FONT}`; };
  const fit = (t, cx, cy, max, s) => { do font(s); while (x.measureText(t).width > max && --s > 10); x.fillText(t, cx, cy); };
  const ring = (r, w) => { x.lineWidth = w; x.beginPath(); x.arc(C, C, r, 0, Math.PI * 2); x.stroke(); };
  /* text along a circle of radius r, centred on angle at (top: reading left to right; bottom: upright too) */
  const arc = (t, r, at, bottom, s) => {
    let w; const sp = 3;
    do { font(s); w = [...t].reduce((a, ch) => a + x.measureText(ch).width + sp, 0); } while (w / r > Math.PI * .8 && --s > 10);
    let acc = 0;
    for (const ch of t) {
      const cw = x.measureText(ch).width, a = bottom ? at + (w / 2 - acc - cw / 2) / r : at - w / 2 / r + (acc + cw / 2) / r;
      x.save(); x.translate(C + r * Math.cos(a), C + r * Math.sin(a)); x.rotate(bottom ? a - Math.PI / 2 : a + Math.PI / 2);
      x.fillText(ch, 0, 0); x.restore(); acc += cw + sp;
    }
  };
  const star = (cx, cy, r) => { x.beginPath();
    for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, q = i % 2 ? r * .45 : r; x.lineTo(cx + q * Math.cos(a), cy + q * Math.sin(a)); }
    x.fill(); };

  x.clearRect(0, 0, 400, 400); x.strokeStyle = x.fillStyle = color; x.textAlign = 'center'; x.textBaseline = 'middle'; x.globalAlpha = .92;
  if (shape === 'round') {
    ring(186, 10); ring(170, 3); ring(112, 3);
    arc(org.trim().toUpperCase() || ' ', 141, -Math.PI / 2, false, 34); arc(date, 141, Math.PI / 2, true, 26);
    star(C - 141, C, 10); star(C + 141, C, 10); fit(mid.trim().toUpperCase(), C, C + 2, 188, 46);
