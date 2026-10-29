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
    out += path(`M${n(x - s * .03)} 0L${n(x + s * .03)} 0L${n(x + s * .22)} ${n(deck)}L${n(x - s * .22)} ${n(deck)}Z`, LIT, 'opacity=".14"') + rect(x - s * .04, 0, s * .08, s * .03, s * .01, '#55607A');
  });
  const sw = w * .44, sh = h * .3, sx = (w - sw) / 2, sy = h * .1;
  out += rect(sx, sy, sw, sh, s * .02, '#F7F4EF') + rect(sx, sy, sw, sh * .18, s * .02, BRAND) + rect(sx, sy + sh * .1, sw, sh * .08, 0, BRAND);
  out += circle(sx + sw * .24, sy + sh * .6, sh * .22, shade(BRAND, .35)) + path(`M${n(sx + sw * .24)} ${n(sy + sh * .6)}L${n(sx + sw * .24)} ${n(sy + sh * .38)}A${n(sh * .22)} ${n(sh * .22)} 0 0 1 ${n(sx + sw * .24 + sh * .22)} ${n(sy + sh * .6)}Z`, BRAND);
