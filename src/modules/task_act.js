/* modules/task_act.js: TASK_ACT, every task data-act handler, (t, e) like the rest of ACT (actions looks them up when a button
   is pressed). Tasks: open one (status, subtasks, files); the form's checklist rows; attachments; the view's rows; comments.
   Changes run through request() with the clicked button busy, then task_refresh() redraws the page and the view. */
import { db, ui } from '../store/index.js';
import { me } from '../auth/index.js';
import { qs, uid } from '../lib/index.js';
import { request, reduced } from '../feedback/index.js';
import { view_file } from '../files/index.js';
import { close_pops } from '../actions/index.js';
import { files_of, comments_of } from './task_data.js';
import { task_view, task_refresh } from './task_view.jsx';
import { tv_api } from './tv_state.js';
import { SUB_ACT } from './sub_act.js';
import { TV_ACT } from './tv_act.js';

let shown = 0;   /* each preview is new content (its text is read again, its media start over) */
const fade_in = (el, ms) => { if (!reduced()) el.animate([{ opacity: 0, transform: 'translateY(-.25rem)' }, { opacity: 1, transform: 'none' }], { duration: ms }); };
const comment_box = t => t.closest('[data-comment]');
/* change the task's comments (fn: the list → the new list), then redraw the view and say so */
const comments = (t, id, fn, msg) => request(() => { db.upsert('tasks', { id, comments: fn(comments_of(db.find('tasks', id))) }); task_refresh(id, msg); }, { btn: t });
