/* cartoons/shapes.js: SVG building blocks as strings. Numbers are rounded to one decimal so a picture stays a few
   kilobytes. Sky parts too: the sun with its glow, fluffy clouds, birds. */
export const n = v => Math.round(v * 10) / 10;
const attrs = more => (more ? ' ' + more : '');

export const circle = (cx, cy, r, fill, more) => `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}" fill="${fill}"${attrs(more)}/>`;
export const ellipse = (cx, cy, rx, ry, fill, more) => `<ellipse cx="${n(cx)}" cy="${n(cy)}" rx="${n(rx)}" ry="${n(ry)}" fill="${fill}"${attrs(more)}/>`;
export const rect = (x, y, w, h, rx, fill, more) =>
  `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}"${rx ? ` rx="${n(rx)}"` : ''} fill="${fill}"${attrs(more)}/>`;
export const path = (d, fill, more) => `<path d="${d}" fill="${fill}"${attrs(more)}/>`;
/* a line or curve with round ends (arms, legs, smiles, wings) */
export const stroke = (d, color, width, more) =>
  `<path d="${d}" fill="none" stroke="${color}" stroke-width="${n(width)}" stroke-linecap="round" stroke-linejoin="round"${attrs(more)}/>`;
/* points [[x, y], …] as a path: M x y L x y … */
export const pts = list => list.map(([x, y], i) => (i ? 'L' : 'M') + n(x) + ' ' + n(y)).join('');
export const line = (x1, y1, x2, y2) => `M${n(x1)} ${n(y1)}L${n(x2)} ${n(y2)}`;

/* the sun: a disc in two soft rings of glow (glow: the sun colour mixed with white) */
export const sun = (x, y, r, color, glow = ['#FFF6DA', '#FFE9AE']) =>
  circle(x, y, r * 1.7, glow[0], 'opacity=".55"') + circle(x, y, r * 1.3, glow[1], 'opacity=".7"') + circle(x, y, r, color);

/* a cloud s wide: overlapping puffs on a flat bottom */
export function cloud(x, y, s, fill = '#fff', opacity = .92) {
  const o = `opacity="${opacity}"`;
  return `<g ${o}>` + circle(x + s * .3, y, s * .2, fill) + circle(x + s * .55, y - s * .1, s * .26, fill) + circle(x + s * .78, y + s * .02, s * .17, fill)
    + rect(x + s * .1, y, s * .82, s * .17, s * .085, fill) + '</g>';
}

/* a bird in flight, s wide; flap 0…1 lifts the wings */
export const bird = (x, y, s, color, flap = .5) =>
  stroke(`M${n(x - s / 2)} ${n(y)}Q${n(x - s / 4)} ${n(y - s * (.15 + .35 * flap))} ${n(x)} ${n(y)}Q${n(x + s / 4)} ${n(y - s * (.15 + .35 * flap))} ${n(x + s / 2)} ${n(y)}`,
