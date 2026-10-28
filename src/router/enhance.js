/* router/enhance.js: 14. PROGRESSIVE ENHANCEMENT, run after every draw: reveal-on-scroll, count-up numbers, typing headlines,
   range fills, multi-select labels, token swatches, wheel hand-over, calendar slides, file boxes, media players, section spy. */
import { qsa } from '../lib/index.js';
import { ui, route, TIMERS } from '../store/index.js';
import { ms_sync, slide_in } from '../overlays/index.js';
import { file_box } from '../files/index.js';
import { fill_range, hex_refresh, init_player } from '../actions/index.js';
