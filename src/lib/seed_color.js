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
