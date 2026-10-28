/* charts/viz_svg.js: the SVG building blocks (frame, axes, bars, dots, hit areas), as trusted strings.
   Method: one axis per chart, thin marks (bars <= 24px, 4px rounded data-end, 2px lines, >= 8px dots), hairline grid.
   Every piece of text goes through esc(); the chart cards insert the finished SVG with dangerouslySetInnerHTML. */
import { esc } from '../lib/index.js';
