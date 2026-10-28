/* modules/task_data.js: a task's parts and who may change it. Subtasks have a title and their own items; attachments are
   kept with the task (the file itself when ≤ 1 MB, else only its name). Only the person who created a task may edit or delete
   it; whoever it is assigned to can change its status and dates, tick items, add files and comment. */
import { qsa, uid } from '../lib/index.js';
import { auth, me } from '../auth/index.js';

/* Subtasks: [{ t: title, items: [{ t, done }] }] (an older flat list reads as one group) */
export const subs_of = r => { const a = Array.isArray(r?.subs) ? r.subs : []; return a.length && !Array.isArray(a[0]?.items) ? [{ t: 'Checklist', items: a }] : a; };
export const items_of = r => subs_of(r).flatMap(g => g.items || []);
export const files_of = r => Array.isArray(r?.files) ? r.files : [];
export const comments_of = r => Array.isArray(r?.comments) ? r.comments : [];

/* the subtasks an editor shows (form or task view), read back from its fields */
const read_item = x => ({ t: x.querySelector('.sub_text').value.trim(), done: x.querySelector('input[type=checkbox]').checked });
export const read_subs = root => qsa('[data-sub-group]', root)
