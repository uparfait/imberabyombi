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
  let f = `<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB">`, g = 'SourceGraphic';
  if (o.goo) { f += `<feGaussianBlur in="SourceGraphic" stdDeviation="${o.goo}"/><feComponentTransfer result="g"><feFuncA type="linear" slope="12" intercept="-1.6"/></feComponentTransfer>`; g = 'g'; }
  if (o.flat) return f + '</filter>';
  return f + `<feGaussianBlur in="${g}" stdDeviation="${o.bevel}" result="h"/>`
    + `<feDiffuseLighting in="h" surfaceScale="${o.surf}" diffuseConstant="1" lighting-color="#fff" result="d"><feDistantLight azimuth="225" elevation="60"/></feDiffuseLighting>`
    + `<feComposite in="${g}" in2="d" operator="arithmetic" k1="${o.shade}" k2="${1 - o.shade}" result="c"/>`
    + `<feSpecularLighting in="h" surfaceScale="${o.surf}" specularConstant="${o.spec}" specularExponent="${o.exp}" lighting-color="#fff" result="s"><fePointLight x="70" y="30" z="160"/></feSpecularLighting>`
    + `<feComposite in="s" in2="${g}" operator="in" result="s2"/><feComposite in="c" in2="s2" operator="arithmetic" k2="1" k3="1" result="o"/>`
    + `<feComposite in="o" in2="${g}" operator="in"/></filter>`;
}
