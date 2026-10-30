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
