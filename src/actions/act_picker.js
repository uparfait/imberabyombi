/* actions/act_picker.js: data-act handlers inside the shared #picker (plain JS, outside React): options, clear / done,
   calendar days, times, month and year paging, 12 / 24-hour switch and Today. The native control stays the source of truth. */
import { qsa, ymd, now_dt, parse_d, iso_week, page_now } from '../lib/index.js';
import { db } from '../store/index.js';
import { pick, FINE } from '../overlays/index.js';
import { kind_of, dt_show, dt_refresh } from '../fields/index.js';
