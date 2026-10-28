/* schemas/schema_tasks.js: the tasks collection: who does what by when, with subtasks (groups of items), attachments
   and comments. Cells show "You", a live due tag and subtask progress. */
import { lorem, uniq, ymd, add_d, now_dt } from '../lib/index.js';
import { me } from '../auth/index.js';
import { person_you } from '../ui/index.js';
import { due_tag, sub_progress, read_subs, read_files, files_of, comments_of } from '../modules/index.js';
import { field_spec, STATUS, people } from './fields.js';

export const tasks_schema = {
