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
