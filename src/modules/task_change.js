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
