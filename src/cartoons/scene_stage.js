/* cartoons/scene_stage.js: an event: a stage under spotlights, a big screen with a slide, a speaker at the microphone,
   confetti, and the audience seen from behind, some cheering. */
import { n, path, rect, circle, stroke, line, v_gradient } from './shapes.js';
import { BRAND, CLOTHES, LIT, shade } from './palette.js';
import { person, look, from_back } from './person.js';

const NIGHTS = ['#2E2A4F', '#23395B', '#3B2C4A', '#1F3B4D'], MIC = '#1B1A22';

export function stage(w, h, r) {
  const s = Math.min(w, h), bg = r.pick(NIGHTS), deck = h * .62;
  let out = `<defs>${v_gradient('night', bg, shade(bg, .18))}</defs>` + rect(0, 0, w, h, 0, 'url(#night)');
  [w * .15, w * .5, w * .85].forEach(x => {
