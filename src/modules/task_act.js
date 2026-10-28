/* modules/task_act.js: TASK_ACT, every task data-act handler, (t, e) like the rest of ACT (actions looks them up when a button
   is pressed). Tasks: open one (status, subtasks, files); the form's checklist rows; attachments; the view's rows; comments.
   Changes run through request() with the clicked button busy, then task_refresh() redraws the page and the view. */
import { db, ui } from '../store/index.js';
import { me } from '../auth/index.js';
import { qs, uid } from '../lib/index.js';
import { request, reduced } from '../feedback/index.js';
