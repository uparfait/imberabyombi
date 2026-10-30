/* events/org_act.jsx: ORG_ACT, the organisers table's buttons (ev_tables.jsx): add a co-organiser, edit one (or remove
   them), edit the organiser (their part of the form), and Transfer ownership: a co-organiser or someone new becomes the
   organiser, and the one before stays on as a co-organiser. An email is on the list once. */
import { qs } from '../lib/index.js';
import { db, rerender } from '../store/index.js';
import { notify, show_err } from '../feedback/index.js';
import { modal, ask } from '../overlays/index.js';
import { field } from '../fields/index.js';
import { field_spec } from '../schemas/index.js';
import { open_form, sync_when } from '../table/index.js';

const lc = s => String(s || '').trim().toLowerCase();
const put = (c, e, d, title, text) => { db.upsert(c, { id: e.id, ...d }); rerender(); notify(text, 'ok', title); };
const get = t => [t.dataset.c, db.find(t.dataset.c, t.dataset.id), +t.dataset.i];
