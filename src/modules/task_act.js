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

export const TASK_ACT = {
  task_open: t => { close_pops(); task_view(t.dataset.id); },
  cal_task: t => { const r = db.find('tasks', t.dataset.id); if (!r) return;
    ui.tab.tasks = r.by === me() ? 'mine' : 'assigned'; ui.page = {}; ui.flash = r.id; ui.scroll_flash = true; location.hash = '#/admin/tasks'; },
  ...SUB_ACT,
  /* an attachment previews inside the task view; Full view opens the file viewer */
  task_file: t => { const v = tv_api(t), i = +t.dataset.i, f = files_of(db.find('tasks', t.dataset.id))[i], box = t.closest('td')?.querySelector('[data-task-preview]');
    if (!v || !box || !f) return; v.put({ prev: { f, i, n: ++shown } }); fade_in(box, 220); },
  task_file_full: t => { const f = tv_api(t)?.st.prev?.f;
    if (f?.url) fetch(f.url).then(x => x.blob()).then(b => view_file(new File([b], f.name, { type: f.type || b.type }))); },
  task_file_close: t => tv_api(t)?.put({ prev: null }),
  task_file_rm: t => { const id = t.dataset.id, i = +t.dataset.i;
    request(() => { db.upsert('tasks', { id, files: files_of(db.find('tasks', id)).filter((_, j) => j !== i) }); task_refresh(id, 'Attachment removed.'); },
      { btn: t }); },
  /* the task view: a pen opens a row's editor (Save / Cancel); status shows Cancel / Save; comments */
  ...TV_ACT,
  task_comment: t => { const box = qs('#modal [data-comment-box]'), text = box?.value.trim(), id = t.dataset.id; if (!text) return box?.focus();
    comments(t, id, a => [...a, { id: uid(), by: me(), at: Date.now(), text }], 'Your comment was added.'); },
  comment_del: t => comments(t, t.dataset.id, a => a.filter(c => c.id !== t.dataset.c), 'Your comment was deleted.'),
