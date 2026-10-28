/* modules/tv_editor.jsx: inline editors for one row of the task view. A pen turns the row's cell into its editor with
   Save / Cancel beside it (tv_cell); the fields are named tv_<row> (tv_title, tv_due…) and saved by TASK_ACT.tv_save. */
import { ic } from '../icons/index.js';
import { uniq } from '../lib/index.js';
import { me } from '../auth/index.js';
import { field_spec, STATUS, people } from '../schemas/index.js';
import { field } from '../fields/index.js';
import { sub_editor } from './sub_editor.jsx';
import { subs_of } from './task_data.js';
import { dt_in } from './task_dates.jsx';

const assignees = () => uniq([me(), ...people()]).map(n => [n, n === me() ? n + ' (You)' : n]);

/* inline editors for one row of the task view */
export function tv_editor(f, r) {
  if (f === 'title') return field(field_spec('tv_title', 'Title', 'text', 0, 1), r.title);
  if (f === 'notes') return field({ ...field_spec('tv_notes', 'Notes', 'textarea') }, r.notes);
  if (f === 'priority') return field(field_spec('tv_priority', 'Priority', 'select', STATUS.prio), r.priority);
  if (f === 'assignee') return field(field_spec('tv_assignee', 'Assigned to', 'select', assignees, 1), r.assignee);
  if (f === 'subs') return sub_editor(subs_of(r));
