/* cartoons/shapes.js: SVG building blocks as strings. Numbers are rounded to one decimal so a picture stays a few
   kilobytes. Sky parts too: the sun with its glow, fluffy clouds, birds. */
export const n = v => Math.round(v * 10) / 10;
const attrs = more => (more ? ' ' + more : '');

export const circle = (cx, cy, r, fill, more) => `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}" fill="${fill}"${attrs(more)}/>`;
export const ellipse = (cx, cy, rx, ry, fill, more) => `<ellipse cx="${n(cx)}" cy="${n(cy)}" rx="${n(rx)}" ry="${n(ry)}" fill="${fill}"${attrs(more)}/>`;
export const rect = (x, y, w, h, rx, fill, more) =>
