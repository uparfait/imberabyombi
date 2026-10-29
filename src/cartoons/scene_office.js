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
}

export function office(w, h, r) {
  const s = Math.min(w, h), wall = r.pick(WALLS), floor = h * .8;
  let out = rect(0, 0, w, h, 0, wall) + rect(0, floor, w, h - floor, 0, shade(wall, -.1)) + rect(0, floor - s * .012, w, s * .012, 0, shade(wall, -.2));
  const wx = w * .06, ww = w * .32, wy = h * .1, wh = h * .38, sk = r.pick(SKIES);
  out += `<defs>${v_gradient('win', sk[0], sk[1])}</defs>` + rect(wx, wy, ww, wh, s * .015, 'url(#win)', `stroke="#FFFFFF" stroke-width="${n(s * .02)}"`)
    + cloud(wx + ww * .15, wy + wh * .4, Math.min(ww, wh) * .5) + stroke(line(wx + ww / 2, wy, wx + ww / 2, wy + wh), '#FFFFFF', s * .014);
  out += board(w * .52, h * .12, w * .36, h * .32, s, r);
  const shelf_x = w * .06, shelf_y = h * .62;
  out += rect(shelf_x, shelf_y, w * .3, s * .02, s * .006, '#B07A4E');
  for (let bx = shelf_x + s * .02, i = 0; i < 6 && bx < shelf_x + w * .2; i++) {
    const bh = s * r.range(.08, .12), bw = s * r.range(.025, .035);
    out += rect(bx, shelf_y - bh, bw, bh, s * .005, r.pick(CLOTHES)); bx += bw + s * .006;
  }
  out += plant(shelf_x + w * .26, shelf_y, s * .16);
  const dx = w * .54, dw = w * .36, dy = floor - s * .2;
