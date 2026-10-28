/* charts/viz_tip.js: the chart tooltip (#viz_tip in index.html, outside React): value first, then the series; a short line key
   in the series colour. Built with textContent. The behaviors' pointer listener calls show() for any [data-tt] mark;
   the router's before_page() hides it before every draw. */
import { scale_color } from './viz_math.js';
