/* overlays/pick.js: F. PICKERS. The one shared #picker (plain JS, outside React): open, draw, place, close, set a value,
   filter and keyboard. Its markup comes from PK (pick_html.js); the listeners that call it live in behaviors. */
import { qsa, ymd, add_d, parse_d, week_date, page_now } from '../lib/index.js';
import { kind_of, to24, set_native_value } from '../fields/index.js';
import { reduced } from '../feedback/index.js';
import { before_render } from '../store/index.js';
import { PK } from './pick_html.js';

/* F. PICKERS: one shared #picker serves every select (searchable, checkboxes when multiple), date, week, month,
      date & time, time and [data-list] suggestion field. The native control stays the source of truth, so forms,
