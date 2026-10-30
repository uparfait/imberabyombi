/* schemas/schema_tasks.js: the tasks collection: who does what by when, with subtasks (groups of items), attachments
   and comments. Cells show "You", a live due tag and subtask progress. */
import { lorem, uniq, ymd, add_d, now_dt } from '../lib/index.js';
import { me } from '../auth/index.js';
import { person_you } from '../ui/index.js';
import { due_tag, sub_progress, read_subs, read_files, files_of, comments_of } from '../modules/index.js';
import { field_spec, STATUS, people } from './fields.js';

export const tasks_schema = {
  l: 'task', n: 14, cols: ['title', 'assignee', 'by', 'start', 'due', 'subs', 'priority', 'status'],
  f: [
    field_spec('title', 'Title', 'text', 0, 1),
    field_spec('assignee', 'Assigned to', 'select', () => uniq([me(), ...people()]).map(n => [n, n === me() ? n + ' (You)' : n]), 1),
    field_spec('by', 'Assigned by', 'hidden', 0, 0, { def: () => me() }),
    field_spec('status', 'Status', 'select', STATUS.task, 1, { def: () => 'To do' }),
    field_spec('start', 'Start', 'datetime-local', 0, 0, { def: () => now_dt() }),
    field_spec('due', 'Due', 'datetime-local', 0, 0, { when: '!Done' }),
    field_spec('end', 'Completed on', 'datetime-local', 0, 0, { when: 'Done', def: () => now_dt() }),
    field_spec('priority', 'Priority', 'select', STATUS.prio), field_spec('notes', 'Notes', 'textarea'), field_spec('subs', 'Subtasks', 'subtasks'),
    field_spec('files', 'Attachments', 'files'), field_spec('ref', 'Event', 'hidden')   /* a follow-up: the event or activity it came from */
  ],
  r: { assignee: v => person_you(v), by: v => person_you(v), due: (v, r) => due_tag(r), subs: (v, r) => sub_progress(r) },
  /* the form's subtasks and new files become part of the record (files are read before saving); comments are kept */
  before: async (d, row, form) => ({ ...d, subs: read_subs(form), end: d.status === 'Done' ? d.end || now_dt() : '', comments: comments_of(row),
    files: [...files_of(row), ...await read_files(form.querySelector('[data-new-files]')?.files)] }),
  g: () => {
    const p = people(), st = lorem.pick(STATUS.task), due = `${ymd(add_d(new Date(), lorem.int(-3, 12)))}T${lorem.pick(['10:00', '12:00', '15:30', '17:00'])}`;
    return {
      title: lorem.t(4), assignee: lorem.pick(p), by: lorem.pick(p), start: `${ymd(add_d(new Date(), lorem.int(-12, -1)))}T${lorem.pick(['08:00', '09:00', '09:30'])}`,
      due, end: st === 'Done' ? due : '', priority: lorem.pick(STATUS.prio), status: st, notes: lorem.s(),
      subs: Array.from({ length: lorem.int(0, 2) }, () => ({
        t: lorem.t(2), items: Array.from({ length: lorem.int(1, 3) }, () => ({ t: lorem.t(3), done: lorem.r() < .4 }))
      })),
      files: [], comments: []
    };
  }
};
