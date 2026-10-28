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
