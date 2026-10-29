/* cartoons/scene_mountains.js: the great outdoors: snowy mountains behind a calm lake that mirrors them, a green shore with
   pine trees, and birds over the water. */
import { n, path, rect, bird } from './shapes.js';
import { INK, TREES, shade } from './palette.js';
import { sky, hill, tree } from './land.js';

const PEAKS = ['#9FB7D6', '#A9A3CF', '#8FB0C9'];
const SUNSETS = [['#FFC9A8', '#FFF0DC'], ['#C9D8F7', '#FFE9D6'], ['#BFE3F5', '#FDEBD8']];

/* a row of peaks with snowy tops along base y, from x0 to x1 */
function peaks(x0, x1, base, tall, color, r) {
  let out = '', x = x0;
  while (x < x1) {
    const half = tall * r.range(.7, 1.1), top = base - tall * r.range(.75, 1.05), cx = x + half;
    out += path(`M${n(x)} ${n(base)}L${n(cx - half * .12)} ${n(top + tall * .03)}Q${n(cx)} ${n(top - tall * .02)} ${n(cx + half * .12)} ${n(top + tall * .03)}L${n(x + half * 2)} ${n(base)}Z`, color);
    const sy = top + (base - top) * .28, k = (sy - top) / (base - top);
    out += path(`M${n(cx - half * k)} ${n(sy)}L${n(cx - half * .12)} ${n(top + tall * .03)}Q${n(cx)} ${n(top - tall * .02)} ${n(cx + half * .12)} ${n(top + tall * .03)}`
      + `L${n(cx + half * k)} ${n(sy)}L${n(cx + half * k * .4)} ${n(sy - tall * .05)}L${n(cx)} ${n(sy + tall * .02)}L${n(cx - half * k * .4)} ${n(sy - tall * .05)}Z`, '#FFFFFF');
    x += half * r.range(1.2, 1.7);
  }
  return out;
}

export function mountains(w, h, r) {
  const s = Math.min(w, h), lake = h * r.range(.6, .66), shore = h * .84, color = r.pick(PEAKS);
  let out = sky(w, h, r, lake, r.pick(SUNSETS));
  out += peaks(-s * .2, w, lake, s * .42, shade(color, .15), r) + peaks(-s * .4, w, lake, s * .3, color, r);
  out += rect(0, lake, w, shore - lake, 0, '#8FC9E8');
