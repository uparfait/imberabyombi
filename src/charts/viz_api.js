/* charts/viz_api.js: the reference's Viz object, for callers that use it as one: the page view, drawing, the date range,
   the data overlay (open, page) and the tooltip. viz.view = charts_view, viz.tip = viz_tip, … */
import { charts_view, viz_draw_all, viz_range } from './viz_view.jsx';
import { viz_open, viz_page } from './viz_data.jsx';
import { viz_tip } from './viz_tip.js';

export const viz = { view: charts_view, draw: viz_draw_all, range: viz_range, open: viz_open, page: viz_page, tip: viz_tip };
