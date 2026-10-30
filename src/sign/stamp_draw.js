/* sign/stamp_draw.js: draws a company stamp into a 400 × 400 canvas, in the template's display font: round (two rings, the
   organisation along the top, today's date along the bottom, two stars, the centre text) or square (a double frame, the
   organisation, the centre text, the date). st = { org, mid, color, shape }; text shrinks until it fits. */
import { page_tz } from '../lib/index.js';

export const INKS = ['#1F3A93', '#B42318', '#0E7A55', '#6D28D9'];
const FONT = '"Bricolage Grotesque", system-ui, sans-serif', C = 200;

export function draw_stamp(c, { org, mid, color, shape }) {
  const x = c.getContext('2d', { willReadFrequently: true });
