/* charts/viz_map.js: maps: the choropleth tile map (one hexagon per region, darker = more).
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { round1, rnd, sequential } from './viz_math.js';
