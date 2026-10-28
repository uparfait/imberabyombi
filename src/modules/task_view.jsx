/* modules/task_view.jsx: One task, laid out like the details table (sections: Details, Assignment, Dates, Status) + comments.
   A pen on a row (on hover) turns it into an editor with Save / Cancel. Status: pick one, then Save (Done is completed now)
   or Cancel. <Task_view/> reads the task on every draw and holds what is open (editors, status buttons, preview) as state. */
import { useState } from 'react';
import { flushSync } from 'react-dom';
import { db, rerender } from '../store/index.js';
import { qs } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { notify } from '../feedback/index.js';
import { modal, snap } from '../overlays/index.js';
import { task_own, task_mine } from './task_data.js';
import { tv_rows } from './task_view_rows.jsx';
import { tv_comments } from './task_comments.jsx';
import { tv_tie } from './tv_state.js';

/* st: edit = rows in their editor, more = the status' Cancel / Save shown, prev = the attachment previewed, cedit = comments being edited */
export function Task_view({ id }) {
  const [st, set_st] = useState({ edit: {}, more: false, prev: null, cedit: {} });
  const r = db.find('tasks', id); if (!r) return null;
  const api = { id, st, put: p => flushSync(() => set_st(s => ({ ...s, ...(typeof p === 'function' ? p(s) : p) }))) };
  return <div className="grid min-w-0 gap-6 sm:col-span-2" data-task={r.id} ref={tv_tie(api)}>
    <div className="kv_wrap relative min-w-0 rounded-2xl border border-line"><table className="kv tv">
      <thead><tr><th scope="col">Column name</th><th scope="col">Value</th></tr></thead><tbody>{tv_rows(r, st)}</tbody></table></div>
    {tv_comments(r, st)}
  </div>;
}

const HELP = { own: 'You created this task: hover a row and use the pen to change it.', view: 'You can view this task and comment on it.',
  mine: 'Assigned to you: change its status and dates, tick items, add files and comment. Only the person who created it can change the rest.' };

export function task_view(id) {
  const r = db.find('tasks', id); if (!r) return notify('It may have been deleted in another tab. Refresh the list and try again.', 'bad', 'Task not found');
  const own = task_own(r), mine = task_mine(r);
  modal({ title: r.title, wide: true, help: own ? HELP.own : mine ? HELP.mine : HELP.view, body: () => <Task_view id={id} />,
    actions: own ? <><button type="button" className="btn btn_danger order-first mr-auto" data-act="del" data-col="tasks" data-id={r.id}>
      {ic('trash', 'h-4 w-4')}Delete</button>
      <button type="button" className="btn btn_outline" data-act="edit" data-col="tasks" data-id={r.id}>{ic('edit', 'h-4 w-4')}Edit all</button></> : null });
}

/* the redrawn view opens at the same scroll; its form focuses its first field 50 ms later, which would scroll that field into
   view, so the position is held for that moment */
function hold_scroll(top) {
  const b = qs('#modal form > div.overflow-y-auto'); if (!b) return;
  const pin = () => { b.scrollTop = top; }; pin(); b.addEventListener('scroll', pin); setTimeout(() => b.removeEventListener('scroll', pin), 300);
}

/* after a change in the task view: redraw the page behind and the view (same scroll), without "discard changes?" on close */
export function task_refresh(id, msg) {
  const top = qs('#modal form > div.overflow-y-auto')?.scrollTop || 0;
  rerender();
  if (qs('#modal')?.open && qs('#modal [data-task]')?.dataset.task === id) { task_view(id); hold_scroll(top); }
