/* events/countdown.js: the time left until an event starts (or ends, while it is live) in short units, leading empty ones
   left out: "1y 2mo 3d 4h 5m 6s", "12h 32m 23s", "23s". count_to(e, state) is [label, moment] or null (past, cancelled, no
   date yet); tick() counts every [data-count-to] on screen down each second, and redraws the page when one reaches 0. */
import { pad, tz_parts, repeat_next, page_tz, ymd, add_d, parse_d } from '../lib/index.js';
import { rerender } from '../store/index.js';
import { at } from '../schemas/index.js';
