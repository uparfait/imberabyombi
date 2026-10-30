/* table/crud.jsx: generic CRUD: table + search + sort + export + add/edit/delete, from a schema.
   crud(c, o) draws a table card. o: { title, mod, filter(row), preset, acts(row, can) → JSX, can_row(row), view(id), full
   (false: no full-window button, as in an overlay), add (false: no Add button) }. */
import { cap } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { auth } from '../auth/index.js';
import { schemas } from '../schemas/index.js';
import { ui, cur, route, after_render } from '../store/index.js';
import { label } from '../ui/index.js';
import { tview, sync_tools } from './table_view.js';
import { col_filter } from './col_filter.jsx';
import { table_menu, full_btn } from './table_parts.jsx';
import { table_body } from './table_body.jsx';
import { EXPORTS } from './export_file.js';
import { ph_height } from './table_full.js';

/* Export ▾: CSV, JSON, Excel */
const export_menu = c => (
  <div className="relative">
    <button className="btn btn_outline btn_sm" data-act="pop" data-pop={`pop_export_${c}`} aria-haspopup="menu">{ic('download', 'w-4 h-4')}Export{ic('chev_d', 'h-4 w-4')}</button>
    <div id={`pop_export_${c}`} className="pop right-0 w-56" role="menu" hidden>{EXPORTS.map(([f, l, i]) => (
      <button key={f} type="button" className="menu_item" role="menuitem" data-act="export" data-col={c} data-fmt={f}>{ic(i, 'h-4 w-4 text-muted')}{l}</button>))}</div>
  </div>
);

/* a column title: sort button (with its direction) + the column search */
const col_head = (c, k, st, hide) => (
  <th key={k} scope="col" data-k={k} hidden={hide.includes(k)} aria-sort={st?.k === k ? (st.d > 0 ? 'ascending' : 'descending') : 'none'}>
    <div className="grid gap-2"><button className="inline-flex items-center gap-1 justify-self-start hover:text-fg" data-act="sort" data-col={c} data-k={k}>
      {label(c, k)}{st?.k === k ? ic(st.d > 0 ? 'chev_u' : 'chev_d', 'w-3.5 h-3.5') : null}</button>
      <div className="pick">{col_filter(c, k)}</div></div>
  </th>
);

export function crud(c, o = {}) {
  o.mod = o.mod || route.mod; cur[c] = o;
  const s = schemas[c], can = auth.can(o.mod, 2), st = ui.sort[c], hide = tview(c).hide, full = ui.table_full === c, b = table_body(c);
  after_render(() => sync_tools(c));
  return (
    <>
      {full ? <div className="table_ph" style={{ height: ph_height(c) }}></div> : null}
      <section id={`table_card_${c}`} className={`card ${full ? 'table_full' : ''}`} aria-labelledby={`table_title_${c}`}>
        <header className="flex flex-wrap items-center gap-3 border-b border-line p-4">
          <div className="relative"><button className="icon_btn" data-act="pop" data-pop={`pop_table_${c}`} aria-haspopup="true" aria-label="Table settings">{ic('sliders')}</button>
            <div id={`pop_table_${c}`} className="pop left-0 w-72" hidden>{table_menu(c)}</div></div>
          <h2 id={`table_title_${c}`} className="text-lg">{o.title || cap(s.l) + 's'}</h2>
          <span className="chip bg-surface-2 text-muted" id={`table_count_${c}`}>{b.count}</span>
          <div className="ml-auto flex items-center gap-2">{export_menu(c)}
            {can ? <button className="btn btn_primary btn_sm" data-act="add" data-col={c}>{ic('plus', 'w-4 h-4')}{`Add ${s.l}`}</button> : null}{full_btn(c, full)}</div>
        </header>
        <div className="table_scroll relative overflow-x-auto"><table className="table_data" id={`table_${c}`}>
          <thead><tr><th scope="col" id={`table_acts_${c}`} className="table_acts whitespace-nowrap" hidden={!b.acts}>Action Buttons</th>
            {s.cols.map(k => col_head(c, k, st, hide))}</tr></thead>
          <tbody id={`table_body_${c}`}>{b.rows}</tbody></table></div>
        <footer id={`table_pager_${c}`} className="pager">{b.pager}</footer>
      </section>
    </>
  );
}
