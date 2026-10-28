/* charts/viz_map.js: maps: the choropleth tile map (one hexagon per region, darker = more).
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { round1, rnd, sequential } from './viz_math.js';
import { frame, svg, path_of, mark_group } from './viz_svg.js';
import { scale_legend } from './viz_legend.jsx';

export const VIZ_MAP = {
  choropleth: { t: 'Choropleth map (tile map)', g: 'map', d: 'A value per region on equal-size tiles. Darker = more.', f(w) {
    const rows = ['..XXX..', '.XXXXX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..'], tiles = [];
    rows.forEach((r, y) => [...r].forEach((c, x) => c === 'X' && tiles.push({ x, y, k: 'R' + (tiles.length + 1), v: Math.round(rnd(5, 100)) })));
