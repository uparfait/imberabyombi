/* modules/task_view_rows.jsx: the task view's table rows (Details, Assignment, Dates, Status). A row with a pen shows its
   editor while st.edit[row] is on; the attachment preview and the status' Cancel / Save follow st.prev and st.more. */
import { Fragment } from 'react';
import { fmt_dt } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { badge, person_you } from '../ui/index.js';
import { STATUS } from '../schemas/index.js';
import { task_own, task_mine, subs_of, files_of } from './task_data.js';
import { due_tag } from './task_dates.jsx';
import { bar, status_more } from './task_bits.jsx';
import { file_chip, file_preview } from './task_files.jsx';
import { tv_cell } from './tv_editor.jsx';

const dash = () => <span className="text-muted">—</span>;
const sec = t => <tr className="kv_group"><th scope="colgroup" colSpan={2}>{t}</th></tr>;
const pen = f => <button type="button" className="kv_pen" data-act="tv_edit" data-f={f} aria-label="Edit">{ic('edit', 'h-4 w-4')}</button>;

/* one subtask with its items; ticking an item (data-sub-tick) saves at once */
const sub = (r, mine) => (g, gi) => <div key={gi} className="tv_sub"><div className="flex flex-wrap items-center justify-between gap-2">
  <b className="min-w-0 text-sm font-medium">{g.t}</b>{bar(g.items.filter(x => x.done).length, g.items.length)}</div>
  <ul className="mt-1 grid">{g.items.map((x, i) => <li key={i}><label className="check_row cursor-pointer py-1.5">
    <input type="checkbox" className="check_circle" data-sub-tick={r.id} data-g={gi} data-i={i} defaultChecked={!!x.done} disabled={!mine} />
    <span className={`min-w-0 text-sm [overflow-wrap:anywhere] ${x.done ? 'text-muted line-through' : ''}`}>{x.t}</span></label></li>)}</ul></div>;

export function tv_rows(r, st) {
  const own = task_own(r), mine = task_mine(r), done = r.status === 'Done', subs = subs_of(r), files = files_of(r);
  const row = (f, l, html, can) => <tr data-tv-row={f}><th scope="row">{l}</th><td><div className="kv_cell">
