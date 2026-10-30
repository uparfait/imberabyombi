/* events/org_act.jsx: ORG_ACT, the organisers table's buttons (ev_tables.jsx): add a co-organiser, edit one (or remove
   them), edit the organiser (their part of the form), and Transfer ownership: a co-organiser or someone new becomes the
   organiser, and the one before stays on as a co-organiser. An email is on the list once. */
import { qs } from '../lib/index.js';
import { db, rerender } from '../store/index.js';
import { notify, show_err } from '../feedback/index.js';
import { modal, ask } from '../overlays/index.js';
