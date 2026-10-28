/* table/rows.js: the rows a table shows (the page's filter, the column searches, the sort) and refresh(c), which draws
   the table again. A table's first view in a page visit waits cfg.latency (simulated network) behind its loading row. */
import { cfg } from '../config/index.js';
import { db, ui, cur, loaded, before_render, rerender } from '../store/index.js';
import { schemas } from '../schemas/index.js';
import { plain } from '../ui/index.js';

export function rows_of(c) {
  const o = cur[c] || {}, s = schemas[c]; let rows = db.list(c); if (o.filter) rows = rows.filter(o.filter);
  Object.entries(ui.q[c] || {}).forEach(([k, q]) => { if (!q) return; const t = s.f.find(f => f.k === k)?.t || '', n = q.toLowerCase().trim();
    rows = rows.filter(r => t === 'select' ? String(r[k] ?? '') === q : /^date/.test(t) ? String(r[k] ?? '').startsWith(q) : plain(c, k, r).toLowerCase().includes(n)); });
  const st = ui.sort[c]; if (st) rows = [...rows].sort((a, b) => String(a[st.k] ?? '').localeCompare(String(b[st.k] ?? ''), undefined, { numeric: true }) * st.d);
  return rows;
}

/* Draw the table again from data + ui: rows, count, pager, Action Buttons column. The reference redrew only the table's
   body; here the page redraws (rerender) and React keeps every node that did not change. No table on screen: nothing. */
export function refresh(c) { if (!document.getElementById('table_body_' + c)) return; rerender(); }

/* First view: one timer per collection. It survives redraws of the same page (so a second table's spinner is not
   restarted by the first one's redraw) and is dropped when a new page draws. */
