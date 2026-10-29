/* cartoons/person.js: a cartoon person standing on (x, y), s tall: legs, shoes, a top (or a dress), arms, neck, and a
   head with hair and a face. look(r) picks a look; pose: 'stand', 'wave', 'walk', 'point' or 'cheer'; phase 0…1 swings
   the arms and legs (the sample video animates it). from_back draws a member of an audience seen from behind. */
import { n, line, path, rect, circle, ellipse, stroke } from './shapes.js';
import { INK, SKINS, HAIRS, CLOTHES, PANTS, shade, lum } from './palette.js';
import { HAIR_STYLES, hair_back, hair_front } from './hair.js';
import { face_bits } from './features.js';

export function look(r) {
  const style = r.pick(HAIR_STYLES), skin = r.pick(SKINS);
  let hair = r.pick(HAIRS);
  if (Math.abs(lum(hair) - lum(skin)) < 45) hair = lum(skin) > 128 ? shade(hair, -.45) : '#1A120C';   // keep the face clear of the hair
  return { skin, hair, style, top: r.pick(CLOTHES), pants: r.pick(PANTS), glasses: r.chance(.2),
    beard: !['long', 'bob', 'bun'].includes(style) && r.chance(.15), dress: ['long', 'bob', 'bun'].includes(style) && r.chance(.4),
    happy: SKINS.indexOf(skin) < 4 && r.chance(.25) };   // closed eyes would vanish on the darkest skins
}

/* where the hands go for a pose (u: a tenth of the height; sw: -1…1 from the phase) */
function hands(x, y, u, pose, sw) {
  const low = y - 4.3 * u;
  if (pose === 'wave') return [[x - 1.75 * u, low], [x + 2.4 * u + sw * .45 * u, y - 9.4 * u]];
  if (pose === 'cheer') return [[x - 2.3 * u, y - 9.4 * u + sw * .3 * u], [x + 2.3 * u, y - 9.4 * u - sw * .3 * u]];
  if (pose === 'point') return [[x - 1.75 * u, low], [x + 3.3 * u, y - 7.1 * u + sw * .2 * u]];
  if (pose === 'walk') return [[x - 1.45 * u + sw * .8 * u, low], [x + 1.45 * u - sw * .8 * u, low]];
  return [[x - 1.75 * u, low], [x + 1.75 * u, low]];
}

export function person(x, y, s, o, pose = 'stand', phase = 0) {
  const u = s / 10, hy = y - 8.55 * u, R = 1.12 * u, sw = Math.sin(phase * 2 * Math.PI), step = pose === 'walk' ? sw * u : .2 * u;
  let out = stroke(line(x - .45 * u, y - 4.3 * u, x - .5 * u - step, y - .5 * u), o.pants, .95 * u)
    + stroke(line(x + .45 * u, y - 4.3 * u, x + .5 * u + step, y - .5 * u), o.pants, .95 * u)
    + ellipse(x - .7 * u - step, y - .28 * u, .62 * u, .3 * u, INK) + ellipse(x + .7 * u + step, y - .28 * u, .62 * u, .3 * u, INK);
  out += o.dress
    ? path(`M${n(x - 1.15 * u)} ${n(y - 7.2 * u)}L${n(x + 1.15 * u)} ${n(y - 7.2 * u)}L${n(x + 1.9 * u)} ${n(y - 3.2 * u)}L${n(x - 1.9 * u)} ${n(y - 3.2 * u)}Z`,
      o.top, `stroke="${o.top}" stroke-width="${n(.9 * u)}" stroke-linejoin="round"`)
    : rect(x - 1.3 * u, y - 7.4 * u, 2.6 * u, 3.6 * u, .95 * u, o.top);
  hands(x, y, u, pose, sw).forEach(([hx, hy2], i) => {
    const sx = x + (i ? 1 : -1) * 1.02 * u, sy = y - 6.85 * u;
    out += stroke(line(sx, sy, hx, hy2), shade(o.top, -.08), .82 * u) + circle(hx, hy2, .44 * u, o.skin);
  });
  out += rect(x - .36 * u, y - 8 * u, .72 * u, .95 * u, .2 * u, shade(o.skin, -.12));
  return out + head(x, hy, R, o);
}

/* a head with hair and a face, centre (x, y), radius R */
export const head = (x, y, R, o) => hair_back(x, y, R, o.style, o.hair) + circle(x, y, R, o.skin) + face_bits(x, y, R, o) + hair_front(x, y, R, o.style, o.hair);

/* an audience member seen from behind: shoulders and the back of the head (cheer: arms up) */
export function from_back(x, y, s, o, cheer = false) {
  const R = s * .17;
  let out = '';
  if (cheer) [-1, 1].forEach(k => { out += stroke(line(x + k * s * .25, y - s * .35, x + k * s * .42, y - s * 1.05), o.top, s * .12) + circle(x + k * s * .42, y - s * 1.05, s * .07, o.skin); });
  out += path(`M${n(x - s * .45)} ${n(y)}Q${n(x - s * .45)} ${n(y - s * .45)} ${n(x)} ${n(y - s * .45)}Q${n(x + s * .45)} ${n(y - s * .45)} ${n(x + s * .45)} ${n(y)}Z`, o.top);
