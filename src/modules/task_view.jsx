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
