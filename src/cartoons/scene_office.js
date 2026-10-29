/* cartoons/scene_office.js: a bright workroom: a window on the sky and a shelf of books and a plant on the left, a board
   with a growing chart over a desk with a laptop and a mug on the right, and the team in the middle (pointing at it). */
import { n, path, rect, circle, ellipse, stroke, line, cloud, v_gradient } from './shapes.js';
import { BRAND, BUILDINGS, CLOTHES, TREES, SKIES, INK, shade } from './palette.js';
import { person, look } from './person.js';

const WALLS = ['#F7EDE2', '#EAF2F8', '#F1F5EC', '#F6EEF6', '#FFF6E5'];

function plant(x, y, s) {
  return ellipse(x - s * .18, y - s * .55, s * .14, s * .3, TREES[0], `transform="rotate(-25 ${n(x)} ${n(y - s * .4)})"`)
    + ellipse(x + s * .18, y - s * .55, s * .14, s * .3, TREES[1], `transform="rotate(25 ${n(x)} ${n(y - s * .4)})"`)
    + ellipse(x, y - s * .7, s * .13, s * .34, TREES[2]) + path(`M${n(x - s * .22)} ${n(y - s * .32)}L${n(x + s * .22)} ${n(y - s * .32)}L${n(x + s * .16)} ${n(y)}L${n(x - s * .16)} ${n(y)}Z`, BRAND);
}

function board(x, y, bw, bh, s, r) {
  let out = rect(x, y, bw, bh, s * .02, '#FFFFFF', `stroke="${shade('#DDE3EA', -.1)}" stroke-width="${n(s * .008)}"`);
  const bars = r.int(4, 6), gap = bw * .06, bar = (bw - gap * (bars + 1)) / bars, list = [];
  for (let i = 0; i < bars; i++) {
    const v = (i + 1) / bars * r.range(.55, .85), bx = x + gap + i * (bar + gap), by = y + bh * .9 - bh * .7 * v;
    out += rect(bx, by, bar, y + bh * .9 - by, bar * .25, i === bars - 1 ? BRAND : shade(r.pick(BUILDINGS.slice(2)), .25));
    list.push(`${n(bx + bar / 2)} ${n(by - bh * .06)}`);
  }
  return out + stroke('M' + list.join('L'), INK, s * .008, 'opacity=".55"');
