/* icon3d/parts.js: the SVG building blocks of the 3D styles: gradient stops and gradients (linear, radial, along the glyph),
   the glyph as a symbol and its copies (use), the glyph painted with a gradient (pl), a blur filter, vol() (the volume
   filter: rounds, shades and lights), extrude() (a stack of copies: the depth) and deep() (a depth colour).
   Size awareness: blurs are in user units (the picture is 200 across) and scale with the icon, but the lighting kernel
   and the goo's alpha threshold work on device pixels. Below ~64 px a blur of a few units is under a pixel, so the goo
   turns into a 1-bit mask (boxy circles) and the lighting sees a one-pixel cliff (a hard black rim). k, the device pixels
   per unit (px / 200, from render()), sets every number below so small icons get the same edges as large ones. */
import { shade } from './color.js';

const stop = ([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}"${a < 1 ? ` stop-opacity="${a}"` : ''}/>`;
const US = ' gradientUnits="userSpaceOnUse"';

export const lin = (id, st, [x1, y1, x2, y2] = [0, 0, 0, 1], u = '') =>
  `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"${u}>${st.map(stop).join('')}</linearGradient>`;
export const rad = (id, st, cx, cy, r, u = '') => `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}"${u}>${st.map(stop).join('')}</radialGradient>`;
/* gradients laid over the glyph's own box: diagonal, top to bottom, radial from the upper left */
export const glin = (id, G, st) => { const [x, y, w, h] = G.vb; return lin(id, st, [x, y + h * .2, x + w, y + h * .8], US); };
export const gvert = (id, G, st) => { const [x, y, , h] = G.vb; return lin(id, st, [x, y, x, y + h], US); };
export const grad = (id, G, st) => { const [x, y, w, h] = G.vb; return rad(id, st, x + w * .32, y + h * .2, Math.max(w, h) * .95, US); };

export const sym = (id, G, inner = G.inner) => `<symbol id="${id}" viewBox="${G.vb.join(' ')}" overflow="visible">${inner}</symbol>`;
export const use = (id, x, y, s, color, extra = '') => `<use xlink:href="#${id}" x="${x}" y="${y}" width="${s}" height="${s}" color="${color}" ${extra}/>`;
export const pl = (G, x, y, s, paint) => `<svg x="${x}" y="${y}" width="${s}" height="${s}" viewBox="${G.vb.join(' ')}" overflow="visible">${G.inner.replace(/currentColor/g, paint)}</svg>`;
export const blur = (id, sd, r = '-60%') =>
  `<filter id="${id}" x="${r}" y="${r}" width="${-2 * parseFloat(r) + 100}%" height="${-2 * parseFloat(r) + 100}%"><feGaussianBlur stdDeviation="${sd}"/></filter>`;

/* in device pixels: the goo's edge ramp, the smallest goo worth doing, the smallest bevel, the least extrusion depth, the
   largest gap between extrusion copies; and the fill light that keeps tiny icons' far rims from going black */
const PX = { edge: 1.4, goo: 1, bevel: 1.2, depth: 1.1, step: .7, ambient: .35 };
const nphi = z => .3989 * Math.exp(-z * z / 2), ncdf = z => 1 / (1 + Math.exp(-1.702 * z));   /* normal pdf, cdf (logistic) */
const num = v => +v.toFixed(3);
/* a depth or extrusion colour: less dark on small icons, so a sub-pixel extrusion does not read as a black outline */
export const deep = (c, dl, k, ds = 0) => shade(c, dl * (.6 + .4 * Math.min(k, 1)), ds);

/* vol(id, o, k): optional goo (round and thicken), then diffuse shading and a specular highlight.
   o = { goo, flat (goo only), bevel, surf, spec, exp, shade } */
export function vol(id, o, k = 1) {
  let f = `<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB">`, g = 'SourceGraphic';
  if (o.goo && o.goo * k >= PX.goo) {
    /* goo: blur, then a steep alpha ramp (threshold at alpha ≈ .17, which thickens the shape by ≈ .93 goo). The ramp is
       PX.edge device px wide at every size, a real anti-aliased edge; a goo under PX.goo px could neither round nor
       thicken anything visible, so it is skipped and the shape's own anti-aliased edge is kept. */
    const sd = o.goo, z = -.93, a0 = ncdf(z), slope = Math.max(sd * k / (nphi(z) * PX.edge), .5 / a0 + .02);
    f += `<feGaussianBlur in="SourceGraphic" stdDeviation="${num(sd)}"/><feComponentTransfer result="g"><feFuncA type="linear" slope="${num(slope)}" intercept="${num(.5 - slope * a0)}"/></feComponentTransfer>`;
    g = 'g';
  }
  if (o.flat) return f + (g === 'SourceGraphic' ? '<feMerge><feMergeNode in="SourceGraphic"/></feMerge>' : '') + '</filter>';   /* an empty filter draws nothing */
  /* the bevel (height map) is at least PX.bevel device px, and surfaceScale follows it, so the slope the lighting sees
     per pixel is the same at every size; a widened bevel spreads the highlight, so it is dimmed by the square of that */
  const bev = Math.max(o.bevel, PX.bevel / k), surf = num(o.surf * bev * k / o.bevel), spec = num(o.spec * Math.min(1, o.bevel / bev) ** 2);
  const amb = PX.ambient * (1 - Math.min(k, 1)), k1 = num(o.shade * (1 - amb));
  return f + `<feGaussianBlur in="${g}" stdDeviation="${num(bev)}" result="h"/>`
    + `<feDiffuseLighting in="h" surfaceScale="${surf}" diffuseConstant="1" lighting-color="#fff" result="d"><feDistantLight azimuth="225" elevation="60"/></feDiffuseLighting>`
    + `<feComposite in="${g}" in2="d" operator="arithmetic" k1="${k1}" k2="${num(1 - k1)}" result="c"/>`
    + `<feSpecularLighting in="h" surfaceScale="${surf}" specularConstant="${spec}" specularExponent="${o.exp}" lighting-color="#fff" result="s"><fePointLight x="70" y="30" z="160"/></feSpecularLighting>`
    + `<feComposite in="s" in2="${g}" operator="in" result="s2"/><feComposite in="c" in2="s2" operator="arithmetic" k2="1" k3="1" result="o"/>`
    + `<feComposite in="o" in2="${g}" operator="in"/></filter>`;
}

/* extrude(id, x, y, s, color, [dx, dy], k): copies of the glyph along [dx, dy] (units), no more than PX.step device px
   apart (no staircase on big icons), at least PX.depth px deep in all (a ledge, not a dark fringe, on tiny icons) */
