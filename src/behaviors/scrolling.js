/* behaviors/scrolling.js: smooth wheel hand-over from inner scroll areas to the page (glide, chain_wheel), the header line and
   docked menu row (header_line), what scrolling and resizing close or move, and the debounced resize work (RZ). */
import { qs, qsa } from '../lib/index.js';
import { ui } from '../store/index.js';
import { pick, tip } from '../overlays/index.js';
import { viz_tip, redraw_charts } from '../charts/index.js';
import { place_tile } from '../actions/index.js';
