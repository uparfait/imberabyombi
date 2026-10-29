/* cartoons/scene.js: picks and draws the scene for a seed. A seed's start can ask for a kind (event… → a stage, a park
   or a street; about… → the office or the park); any other seed gets one of the five. */
import { rng } from './rng.js';
import { n } from './shapes.js';
import { city } from './scene_city.js';
import { park } from './scene_park.js';
import { office } from './scene_office.js';
import { stage } from './scene_stage.js';
import { mountains } from './scene_mountains.js';

export const SCENES = { city, park, office, stage, mountains };
const HINTS = [[/^event/, ['stage', 'stage', 'park', 'city']], [/^about/, ['office', 'park']]];

/* kind: one of SCENES to draw that scene whatever the seed */
export function scene_svg(seed, w = 900, h = 650, kind) {
  const r = rng(seed), hint = HINTS.find(([re]) => re.test(seed)), draw = SCENES[kind] || SCENES[r.pick(hint ? hint[1] : Object.keys(SCENES))];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n(w)} ${n(h)}" width="${n(w)}" height="${n(h)}">${draw(w, h, r)}</svg>`;
}
