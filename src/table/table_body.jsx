/* table/table_body.jsx: the live part of a table card (what refresh(c) updates), computed while the card draws: the rows of
   the current page (Action Buttons first), the first-view loading row, the empty states, the row count and the pager. */
import { ic } from '../icons/index.js';
import { auth } from '../auth/index.js';
import { schemas } from '../schemas/index.js';
import { ui, cur, loaded, render_flags, after_render } from '../store/index.js';
import { loading } from '../feedback/index.js';
import { cell, empty } from '../ui/index.js';
import { tview } from './table_view.js';
import { pager } from './table_parts.jsx';
import { rows_of, wait_load } from './rows.js';

/* a row's buttons: the page's own (o.acts) + Edit and Delete for managers (unless o.can_row says no); null when none */
function row_acts(c, o, r, can) {
  const extra = o.acts ? o.acts(r, can) : null, own = can && (!o.can_row || o.can_row(r));
  if (!extra && !own) return null;
  return (
    <>
      {extra || null}
      {own ? <><button className="icon_btn h-8 w-8" data-act="edit" data-col={c} data-id={r.id} aria-label="Edit">{ic('edit', 'w-4 h-4')}</button>
        <button className="icon_btn h-8 w-8 hover:text-bad" data-act="del" data-col={c} data-id={r.id} aria-label="Delete">{ic('trash', 'w-4 h-4')}</button></> : null}
    </>
  );
}

/* the empty row: no matches (with Clear filters) or no records yet (with Add … for managers) */
function none_row(c, s, can, filtered, span) {
  const add = can ? <button className="btn btn_primary btn_sm" data-act="add" data-col={c}>{ic('plus', 'w-4 h-4')}{`Add ${s.l}`}</button> : null;
  return (
    <tr key="none" className="hover:bg-transparent"><td colSpan={span} className="table_none border-0">{filtered
      ? empty('No matches', '', <button className="btn btn_outline btn_sm" data-act="q_clear" data-col={c}>Clear filters</button>)
      : empty(`No ${s.l}s yet`, can ? `Add the first ${s.l} to get started.` : 'Records will appear here once they are added.', add)}</td></tr>
  );
}

/* → { rows (tbody content), count, pager (footer content), acts (the Action Buttons column shows) } */
export function table_body(c) {
  const s = schemas[c], o = cur[c] || {}, can = auth.can(o.mod, 2), v = tview(c), cols = s.cols.filter(k => !v.hide.includes(k));
  if (render_flags.nav_fetched) loaded.add(c);
  if (!loaded.has(c)) {
    after_render(() => wait_load(c));
    return { acts: false, count: 0, pager: null,
      rows: <tr key="wait" className="hover:bg-transparent"><td colSpan={cols.length} className="table_none border-0">{loading(`Loading ${s.l}s`)}</td></tr> };
  }
  const rows = rows_of(c), per = v.per, n = Math.max(1, Math.ceil(rows.length / per)), fi = ui.flash ? rows.findIndex(r => r.id === ui.flash) : -1;
  if (fi > -1) ui.page[c] = Math.floor(fi / per) + 1;
  const p = ui.page[c] = Math.min(Math.max(1, ui.page[c] || 1), n), filtered = Object.values(ui.q[c] || {}).some(Boolean);
  /* Action Buttons: the first column, pinned while the table scrolls sideways; left out when no row on this page has any */
  const shown = rows.slice((p - 1) * per, p * per), acts = shown.map(r => row_acts(c, o, r, can)), with_acts = acts.some(Boolean), span = cols.length + (with_acts ? 1 : 0);
  return {
    acts: with_acts, count: rows.length, pager: rows.length ? pager(c, p, n) : null,
    rows: rows.length ? shown.map((r, i) => (
      <tr key={r.id} data-row={r.id} data-act="view" data-col={c} data-id={r.id} tabIndex="0" className={ui.flash === r.id ? 'row_flash' : ''}>
        {with_acts ? <td className="table_acts"><div className="inline-flex items-center gap-1">{acts[i]}</div></td> : null}
        {cols.map(k => <td key={k} data-k={k}><div className="trunc">{cell(c, k, r)}</div></td>)}
