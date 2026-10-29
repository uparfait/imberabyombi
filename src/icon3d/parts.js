/* icon3d/parts.js: the SVG building blocks of the 3D styles: gradient stops and gradients (linear, radial, along the glyph),
   the glyph as a symbol and its copies (use), the glyph painted with a gradient (pl), a blur filter, and vol(), the
   "volume" filter: an optional goo (rounds and thickens), then diffuse shading and a specular highlight. */
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
