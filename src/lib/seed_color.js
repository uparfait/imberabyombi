/* lib/seed_color.js: a colour from any text (an email, a name, an id): the same text always gives the same colour.
   The hue comes from a hash of the text; lightness and chroma are fixed in OKLCH, so every colour looks equally bright
   and rich, white initials on it stay readable (4.5:1 or more), and it works as a soft tint on light and dark backgrounds
   (color-mix(in srgb, <colour> 10%, transparent)). Only hues from green through blue and violet to magenta are used:
   reds, oranges, ambers and yellows read as alerts (errors, warnings) next to a person, and olives look muddy.
   seed_color(text, avoid = []) → '#rrggbb'. avoid: colours already in use side by side (the other signers of a document);
   the text's next hues are tried until one is at least GAP degrees from each (less when many share the range), so
   neighbours never look alike.
   seed_hue(hex) → the OKLCH hue of a colour, in degrees. */
const L = .54, C = .15, GAP = 40, HUES = [150, 335];

/* FNV-1a, 32 bits: a quick, well-spread hash of the text */
function hash(s) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return h >>> 0;
}
/* a hue in the allowed span */
const hue_of = n => HUES[0] + n % (HUES[1] - HUES[0]);

const lin = v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4;
const gam = v => v <= .0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - .055;
/* OKLCH → sRGB hex; the chroma steps down until the colour fits in sRGB */
function oklch_hex(l, c, h) {
  const t = h * Math.PI / 180;
  for (; c > 0; c -= .005) {
    const a = c * Math.cos(t), b = c * Math.sin(t);
    const l3 = (l + .3963377774 * a + .2158037573 * b) ** 3, m3 = (l - .1055613458 * a - .0638541728 * b) ** 3, s3 = (l - .0894841775 * a - 1.291485548 * b) ** 3;
    const rgb = [4.0767416621 * l3 - 3.3077115913 * m3 + .2309699292 * s3, -1.2684380046 * l3 + 2.6097574011 * m3 - .3413193965 * s3,
      -.0041960863 * l3 - .7034186147 * m3 + 1.707614701 * s3];
    if (rgb.every(v => v >= -1e-4 && v <= 1 + 1e-4)) return '#' + rgb.map(v => Math.round(gam(Math.min(1, Math.max(0, v))) * 255).toString(16).padStart(2, '0')).join('');
  }
  return oklch_hex(l, 0, h);
}
export function seed_hue(hex) {
  const [r, g, b] = [1, 3, 5].map(i => lin(parseInt(hex.slice(i, i + 2), 16) / 255));
  const l = Math.cbrt(.4122214708 * r + .5363031674 * g + .0514459929 * b), m = Math.cbrt(.2119034982 * r + .6806995451 * g + .1073969566 * b),
    s = Math.cbrt(.0883024619 * r + .2817188376 * g + .6299787005 * b);
  const a = 1.9779984951 * l - 2.428592205 * m + .4505937099 * s, bb = .0259040371 * l + .7827717662 * m - .808675766 * s;
  return (Math.atan2(bb, a) * 180 / Math.PI + 360) % 360;
