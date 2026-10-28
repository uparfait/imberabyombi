/* overlays/pick_html.js: the picker's markup builders (HTML strings: #picker is plain JS, outside React): options with
   a search (selects), suggestions ([data-list] fields), the times list, the calendar, months and years. */
import { esc, pad, ymd, add_d, iso_week, fmt_d, to_min, h24, fmt_time } from '../lib/index.js';
import { ic_html } from '../icons/index.js';
import { search_ui_html } from '../ui/index.js';
