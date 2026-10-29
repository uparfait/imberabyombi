/* cartoons/scene_city.js: a town street: sky, a far skyline, a row of colourful buildings with lit windows, a sidewalk
   with trees and people walking by, and the road. */
import { rect, circle, stroke, line } from './shapes.js';
import { BUILDINGS, LIT, GLASS, TREES, shade } from './palette.js';
import { sky, tree } from './land.js';
import { person, look } from './person.js';

function building(x, base, bw, bh, color, s, r) {
