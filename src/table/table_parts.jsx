/* table/table_parts.jsx: the small parts of a table card: the pager (Back · "p of n" · Next), the settings menu (rows per
   page, columns) and the full-screen button. Full screen: the table grows from its place to fill the tab and shrinks back. */
import { ic } from '../icons/index.js';
import { schemas } from '../schemas/index.js';
import { label } from '../ui/index.js';
import { tview } from './table_view.js';

export const pager = (c, p, n) => (
  <>
    <button className="btn btn_ghost btn_sm" data-act="page" data-col={c} data-n="-1" disabled={p <= 1}>{ic('chev_l', 'h-4 w-4')}Back</button>
    <span className="text-sm tabular-nums text-muted" aria-live="polite">{`${p} of ${n}`}</span>
    <button className="btn btn_ghost btn_sm" data-act="page" data-col={c} data-n="1" disabled={p >= n}>Next{ic('chev_r', 'h-4 w-4')}</button>
  </>
);

/* Table tools. Settings (left): rows per page (10, 20, 50) and which columns show, remembered per table in this browser.
   Full screen (right): the table grows from its place to fill the tab (not the browser's fullscreen) and shrinks back. */
export const table_menu = c => { const v = tview(c);
  return (
    <>
      <p className="px-3 pb-1.5 pt-2 text-xs font-medium uppercase tracking-wider text-muted">Rows per page</p>
      <div className="seg mx-2 mb-2 flex">{[10, 20, 50].map(n => (
        <label key={n} className="flex-1">
          <input type="radio" className="sr-only" name={`per_${c}`} value={n} data-table-per={c} defaultChecked={v.per === n} /><span className="text-center">{n}</span></label>))}
      </div>
      <p className="px-3 pb-1 pt-2 text-xs font-medium uppercase tracking-wider text-muted">Columns</p>
      {schemas[c].cols.map(k => (
        <label key={k} className="menu_item"><input type="checkbox" data-table-col={c} value={k} defaultChecked={!v.hide.includes(k)} />{` ${label(c, k)}`}</label>))}
      <hr className="my-1" /><button type="button" className="menu_item" data-act="table_cols_all" data-col={c}>Show all columns</button>
    </>
  ); };

export const full_btn = (c, on) => (
  <button className="icon_btn" data-act="table_full" data-col={c} aria-pressed={on} aria-label={on ? 'Exit full screen' : 'Open full screen'}>
