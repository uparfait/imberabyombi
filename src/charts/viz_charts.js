/* charts/viz_charts.js: the charts (every common chart type, in page order) and the page's groups.
   VIZ[key] = { t: title, g: group, d: description, f(width) -> { svg, legend, table }, seed?: the reference key }.
   VIZGROUPS: [group key, heading, icon] — the KPI designs come first, then one section per chart group. */
import { VIZ_CMP_A } from './viz_cmp_a.js';
import { VIZ_CMP_B } from './viz_cmp_b.js';
import { VIZ_DIST } from './viz_dist.js';
