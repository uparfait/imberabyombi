/* cartoons/scene_office.js: a bright workroom: a window on the sky and a shelf of books and a plant on the left, a board
   with a growing chart over a desk with a laptop and a mug on the right, and the team in the middle (pointing at it). */
import { n, path, rect, circle, ellipse, stroke, line, cloud, v_gradient } from './shapes.js';
import { BRAND, BUILDINGS, CLOTHES, TREES, SKIES, INK, shade } from './palette.js';
import { person, look } from './person.js';

const WALLS = ['#F7EDE2', '#EAF2F8', '#F1F5EC', '#F6EEF6', '#FFF6E5'];

function plant(x, y, s) {
  return ellipse(x - s * .18, y - s * .55, s * .14, s * .3, TREES[0], `transform="rotate(-25 ${n(x)} ${n(y - s * .4)})"`)
    + ellipse(x + s * .18, y - s * .55, s * .14, s * .3, TREES[1], `transform="rotate(25 ${n(x)} ${n(y - s * .4)})"`)
