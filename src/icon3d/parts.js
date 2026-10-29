/* icon3d/parts.js: the SVG building blocks of the 3D styles: gradient stops and gradients (linear, radial, along the glyph),
   the glyph as a symbol and its copies (use), the glyph painted with a gradient (pl), a blur filter, and vol(), the
   "volume" filter: an optional goo (rounds and thickens), then diffuse shading and a specular highlight. */
const stop = ([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}"${a < 1 ? ` stop-opacity="${a}"` : ''}/>`;
const US = ' gradientUnits="userSpaceOnUse"';

export const lin = (id, st, [x1, y1, x2, y2] = [0, 0, 0, 1], u = '') =>
  `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"${u}>${st.map(stop).join('')}</linearGradient>`;
export const rad = (id, st, cx, cy, r, u = '') => `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}"${u}>${st.map(stop).join('')}</radialGradient>`;
/* gradients laid over the glyph's own box: diagonal, top to bottom, radial from the upper left */
