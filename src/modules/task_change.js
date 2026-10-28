/* modules/task_change.js: task_change(t), the change listener's task branches (behaviors calls it first): a subtask ticked,
   the status picked in the task view, files added to a task, and the task form's status (its date fields follow it).
   Returns true when the event was handled here, so the listener stops. */
import { db } from '../store/index.js';
import { qs } from '../lib/index.js';
