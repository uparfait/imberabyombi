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
  for (let i = 0; i < 3; i++) out += rect(sx + sw * .5, sy + sh * (.38 + i * .17), sw * (.38 - i * .08), sh * .07, sh * .035, '#C9D1D9');
  for (let i = 0; i < 26; i++) {
    const cx = r.range(0, w), cy = r.range(0, deck * .9), c = r.pick(CLOTHES), z = s * r.range(.008, .016);
    out += r.chance(.5) ? circle(cx, cy, z, c) : rect(cx, cy, z * 1.6, z * .9, z * .3, c, `transform="rotate(${r.int(0, 90)} ${n(cx)} ${n(cy)})"`);
  }
  out += rect(0, deck, w, h * .08, 0, shade(BRAND, -.12)) + rect(0, deck, w, h * .015, 0, shade(BRAND, .15)) + rect(0, deck + h * .08, w, h, 0, shade(bg, -.25));
  const px = w * r.range(.3, .7);
  out += person(px, deck, s * .3, look(r), r.pick(['point', 'wave', 'cheer']), r());
  out += stroke(line(px + s * .1, deck, px + s * .1, deck - s * .17), '#55607A', s * .01) + stroke(line(px + s * .1, deck - s * .17, px + s * .07, deck - s * .2), '#55607A', s * .008)
    + circle(px + s * .065, deck - s * .205, s * .014, MIC);
  [[h * .93, .16, .1], [h * 1.04, .2, .02]].forEach(([y, size, shift]) => {
    const step = s * size * 1.05;
    for (let x = step / 2 - shift * step * 4; x < w + step; x += step) out += from_back(x + r.range(-step, step) * .1, y, s * size, look(r), r.chance(.25));
  });
  return out;
}
