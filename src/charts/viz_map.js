/* charts/viz_map.js: maps: the choropleth tile map (one hexagon per region, darker = more).
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { round1, rnd, sequential } from './viz_math.js';
import { frame, svg, path_of, mark_group } from './viz_svg.js';
import { scale_legend } from './viz_legend.jsx';

export const VIZ_MAP = {
  choropleth: { t: 'Choropleth map (tile map)', g: 'map', d: 'A value per region on equal-size tiles. Darker = more.', f(w) {
    const rows = ['..XXX..', '.XXXXX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..'], tiles = [];
    rows.forEach((r, y) => [...r].forEach((c, x) => c === 'X' && tiles.push({ x, y, k: 'R' + (tiles.length + 1), v: Math.round(rnd(5, 100)) })));
    const f = frame(w, 260, { l: 0, r: 0, t: 8, b: 8 }), s = Math.min((f.iw - 20) / 7.6, f.ih / (6 * .88 + .3)) / 1.0, hw = s * .5, x0 = (f.w - s * 7.5) / 2;
    const hex = (cx, cy, r) => path_of(Array.from({ length: 6 }, (_, i) =>
      [cx + r * Math.cos(Math.PI / 6 + i * Math.PI / 3), cy + r * Math.sin(Math.PI / 6 + i * Math.PI / 3)])) + 'Z';
