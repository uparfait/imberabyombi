/* table/rows.js: the rows a table shows (the page's filter, the column searches, the sort) and refresh(c), which draws
   the table again. A table's first view in a page visit waits cfg.latency (simulated network) behind its loading row. */
import { cfg } from '../config/index.js';
