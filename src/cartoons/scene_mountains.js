/* cartoons/scene_mountains.js: the great outdoors: snowy mountains behind a calm lake that mirrors them, a green shore with
   pine trees, and birds over the water. */
import { n, path, rect, bird } from './shapes.js';
import { INK, TREES, shade } from './palette.js';
import { sky, hill, tree } from './land.js';

const PEAKS = ['#9FB7D6', '#A9A3CF', '#8FB0C9'];
const SUNSETS = [['#FFC9A8', '#FFF0DC'], ['#C9D8F7', '#FFE9D6'], ['#BFE3F5', '#FDEBD8']];

/* a row of peaks with snowy tops along base y, from x0 to x1 */
