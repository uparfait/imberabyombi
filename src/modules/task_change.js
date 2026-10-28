/* modules/task_change.js: task_change(t), the change listener's task branches (behaviors calls it first): a subtask ticked,
   the status picked in the task view, files added to a task, and the task form's status (its date fields follow it).
   Returns true when the event was handled here, so the listener stops. */
import { db } from '../store/index.js';
import { qs } from '../lib/index.js';
import { request, reduced } from '../feedback/index.js';
import { snap } from '../overlays/index.js';
import { sync_when } from '../table/index.js';
import { subs_of, files_of, read_files } from './task_data.js';
import { task_refresh } from './task_view.jsx';
import { tv_api } from './tv_state.js';

/* tick item i of subtask g (saved at once) */
const tick = (id, g, i, on) => request(() => {
  const subs = subs_of(db.find('tasks', id)).map((x, j) => j !== g ? x : { ...x, items: x.items.map((y, k) => k === i ? { ...y, done: on } : y) });
  db.upsert('tasks', { id, subs }); task_refresh(id); });

/* the status picked: the current one hides Cancel / Save (nothing to save), another shows them */
function status_pick(t) {
  const box = t.closest('[data-tv-status]'), v = tv_api(t), r = db.find('tasks', box.dataset.tvStatus);
  if (t.value === r.status) { v?.put({ more: false }); const f = qs('#modal form'); if (f) f._init = snap(f); return; }
  v?.put({ more: true }); const more = box.querySelector('.tv_status_more');
  if (more && !reduced()) more.animate([{ opacity: 0, transform: 'translateY(-.25rem)' }, { opacity: 1, transform: 'none' }], { duration: 220 });
}

export function task_change(t) {
  if (t.dataset?.subTick) { tick(t.dataset.subTick, +t.dataset.g, +t.dataset.i, t.checked); return true; }
  if (t.matches?.('[data-status-pick]')) { status_pick(t); return true; }
  if (t.name === 'status' && t.form?.querySelector('[data-when]')) { sync_when(t.form); return true; }
  if (t.dataset?.taskFiles) { const id = t.dataset.taskFiles, list = [...t.files]; if (!list.length) return true;
