/* events/event_act.jsx: EV_ACT, the event page's buttons: edit one section, postpone (a new date, or none yet, and a
   reason), cancel (with a reason), back on schedule, mark as completed, stop repeating, duplicate and delete. They change
   the event's status (Scheduled, Postponed, Cancelled, Completed); where it stands follows (ev_state). */
import { tz_parts, pad } from '../lib/index.js';
import { db, rerender } from '../store/index.js';
import { schemas, at } from '../schemas/index.js';
import { notify, show_err } from '../feedback/index.js';
import { modal, ask } from '../overlays/index.js';
import { open_form } from '../table/index.js';
import { when_row } from '../fields/index.js';
import { go } from '../router/index.js';

const SEC_TITLE = { Details: 'Edit details', When: 'Edit date and time', Location: 'Edit location', Organiser: 'Edit organiser', Audience: 'Edit audience' };
const save = (id, d, title, text) => { db.upsert('events', { id, ...d }); rerender(); notify(text, 'ok', title); };
const told = e => e.invites?.length ? ` The ${e.invites.length} people invited were told by email.` : '';
const reason = (l = 'Reason (optional)') => <div key="reason" className="field sm:col-span-2"><label htmlFor="ev_reason">{l}</label>
  <textarea id="ev_reason" name="reason" rows={3} placeholder=" " /></div>;
const NEW_WHEN = [{ k: 'date', l: 'New date', t: 'date' }, { k: 'start', l: 'Starts', t: 'time' }, { k: 'end', l: 'Ends', t: 'time' }, { k: 'tz', l: 'Time zone', t: 'tz' }];

export const EV_ACT = {
  ev_edit: t => open_form('events', t.dataset.id, {}, [SEC_TITLE[t.dataset.sec], schemas.events.sec[t.dataset.sec].split(',')]),
  ev_postpone: t => { const e = db.find('events', t.dataset.id); if (!e) return;
    modal({ title: 'Postpone this event?', help: 'Move it to a new date, or leave the date empty if it is not known yet. Everyone invited is told by email.',
      body: [when_row(NEW_WHEN, { tz: e.tz }), reason()], submit: 'Postpone',
      on_submit: (d, f) => {
        if (d.date && d.start && d.end && d.end <= d.start) { show_err(f.elements.end, 'Pick an end time after the start.'); return false; }
        if (d.date && at(d.date, d.start || '23:59', d.tz) <= Date.now()) { show_err(f.elements[d.start ? 'start' : 'date'], 'Pick a time later than now.'); return false; }
