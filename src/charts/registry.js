/* charts/registry.js: the canvas bar chart (drawChart) and its registry. CHARTS remembers what each canvas shows, so
   redraw_charts() draws them all again (sidebar resize, theme or brand change). The router empties it before every draw. */
import { css_var, rem } from '../lib/index.js';
