/* charts/viz_legend.jsx: chart legends as JSX: a key per series (rect, dot or line in the series colour) and the colour
   scale of the heatmaps (lightest to darkest, with its two end labels). A legend shows for 2+ series only. */
import { scale_color } from './viz_math.js';

/* idx[i]: a series index (its --series colour) or a CSS colour string */
export const legend = (names, kind = 'rect', idx = names.map((_, i) => i)) => (
  <ul className="viz_legend">
