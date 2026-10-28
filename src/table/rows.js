/* table/rows.js: the rows a table shows (the page's filter, the column searches, the sort) and refresh(c), which draws
   the table again. A table's first view in a page visit waits cfg.latency (simulated network) behind its loading row. */
import { cfg } from '../config/index.js';
import { db, ui, cur, loaded, before_render, rerender } from '../store/index.js';
import { schemas } from '../schemas/index.js';
import { plain } from '../ui/index.js';

export function rows_of(c) {
