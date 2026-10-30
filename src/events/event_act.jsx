/* events/event_act.jsx: EV_ACT, the event page's buttons: edit one section, postpone (it opens with the event's date,
   times, zone and reason as they are now: change them to the new ones, or clear the date when the new one is not known
   yet, tbd), cancel (with a reason), back on schedule, mark as completed, stop repeating, duplicate, delete, and the
   Invitations card's (INVITE_ACT: send, remove). They change
   the event's status (Scheduled, Postponed, Cancelled, Completed); where it stands follows (ev_state). */
import { tz_parts, pad, page_tz } from '../lib/index.js';
import { db, rerender } from '../store/index.js';
import { schemas, at } from '../schemas/index.js';
import { notify, show_err } from '../feedback/index.js';
import { modal, ask } from '../overlays/index.js';
import { open_form } from '../table/index.js';
import { when_row } from '../fields/index.js';
import { go } from '../router/index.js';
import { INVITE_ACT } from './event_invites.jsx';
import { QR_ACT } from './qr_full.jsx';
import { att_mins } from './att_window.js';
import { field } from '../fields/index.js';
import { field_spec } from '../schemas/index.js';

const SEC_TITLE = { Details: 'Edit details', When: 'Edit date and time', Location: 'Edit location', Organiser: 'Edit organiser', Agenda: 'Edit agenda',
  Audience: 'Edit audience' };
const save = (id, d, title, text, c = 'events') => { db.upsert(c, { id, ...d }); rerender(); notify(text, 'ok', title); };
const told = e => e.invites?.length ? ` The ${e.invites.length} people invited were told by email.` : '';
const reason = (v = '') => <div key="reason" className="field sm:col-span-2"><label htmlFor="ev_reason">Reason (optional)</label>
  <textarea id="ev_reason" name="reason" rows={3} placeholder=" " defaultValue={v} /></div>;
const WHEN = [{ k: 'date', l: 'Date', t: 'date' }, { k: 'start', l: 'Starts', t: 'time' }, { k: 'end', l: 'Ends', t: 'time' }, { k: 'tz', l: 'Time zone', t: 'tz' }];
const POSTPONE_HELP = 'It opens with its date and time as they are now. Change them to the new ones, or clear the date if the new one is not '
  + 'known yet. Everyone invited is told by email.';

export const EV_ACT = {
  ...INVITE_ACT, ...QR_ACT,
  /* when people can sign in: minutes before the start and after the end */
  ev_att_set: t => { const c = t.dataset.c, e = db.find(c, t.dataset.id); if (!e) return; const [b, a] = att_mins(e);
    const num = (k, l, v) => field(field_spec(k, l, 'number', 0, 1, { min: 0, max: 1440 }), v);
    modal({ title: 'Attendance settings', help: 'When people can sign in with the QR code: from some minutes before it starts to some minutes after it ends.',
      body: [num('att_before', 'Minutes before the start', b), num('att_after', 'Minutes after the end', a)], submit: 'Save',
      on_submit: d => save(e.id, { att_before: +d.att_before, att_after: +d.att_after }, 'Attendance settings saved',
  ev_edit: t => { const c = t.dataset.col || 'events'; open_form(c, t.dataset.id, {}, [SEC_TITLE[t.dataset.sec], schemas[c].sec[t.dataset.sec].split(',')]); },
  ev_postpone: t => { const e = db.find('events', t.dataset.id); if (!e) return;
    const tz = e.tz || page_tz(), was = e.tbd ? { tz } : { date: e.date, start: e.start, end: e.end, tz }, again = e.status === 'Postponed';   /* no zone saved: the page's */
    modal({ title: again ? 'Change the new date?' : 'Postpone this event?', help: POSTPONE_HELP,
      body: [when_row(WHEN, was), reason(again ? e.status_note : '')], submit: again ? 'Save changes' : 'Postpone',
      on_submit: (d, f) => {
        const same = ['date', 'start', 'end', 'tz'].every(k => (d[k] || '') === (was[k] || ''));
        if (same && !again && d.date) { show_err(f.elements.date, 'Pick a new date or time, or clear the date if the new one is not known yet.'); return false; }
        if (d.date && d.start && d.end && d.end <= d.start) { show_err(f.elements.end, 'Pick an end time after the start.'); return false; }
        if (d.date && !same && at(d.date, d.start || '23:59', d.tz) <= Date.now()) { show_err(f.elements[d.start ? 'start' : 'date'], 'Pick a time later than now.'); return false; }
        const moved = d.date ? { date: d.date, start: d.start || e.start, end: d.end || '', tz: d.tz, tbd: false, kind: e.kind === 'Live' ? 'Upcoming' : e.kind } : { tbd: true };
        save(e.id, { ...moved, status: 'Postponed', status_note: d.reason || '' }, again ? 'Changes saved' : 'Event postponed',
          (d.date ? (same ? 'Its date stays as it was.' : 'It has a new date.') : 'Its new date is not set yet.') + told(e));
      } }); },
  ev_cancel: t => { const e = db.find('events', t.dataset.id); if (!e) return;
    modal({ title: 'Cancel this event?', help: 'It stays in the list as cancelled, and you can put it back on schedule later. Everyone invited is told by email.',
      body: [reason()], submit: 'Cancel event', dismiss: 'Keep it', danger: true,
      on_submit: d => save(e.id, { status: 'Cancelled', status_note: d.reason || '' }, 'Event cancelled', 'It no longer shows on the calendar.' + told(e)) }); },
  ev_restore: t => save(t.dataset.id, { status: 'Scheduled', status_note: '', tbd: false }, 'Back on schedule', 'It shows on the calendar again.'),
  ev_done: t => save(t.dataset.id, { status: 'Completed' }, 'Event completed', 'It is now with the past events.'),
  ev_stop: t => { const e = db.find('events', t.dataset.id); if (!e) return; const p = tz_parts(e.tz, Date.now()), today = `${p.y}-${pad(p.mo)}-${pad(p.d)}`;
    ask('Stop repeating this event? It will not happen after today. The days it has already happened on stay as they are.', () =>
      save(e.id, { repeat: { ...e.repeat, end: 'on', until: today } }, 'No longer repeating', 'It will not happen after today.'), 'Stop repeating', true); },
  ev_copy: t => { const e = db.find('events', t.dataset.id); if (!e) return;
    const { id, date, start, end, status, status_note, invites, registered, ...keep } = e; open_form('events', null, keep); },
  ev_del: t => ask('Delete this event? It is removed for everyone, with its invitations. You cannot undo this.', () => {
    db.remove('events', t.dataset.id); go('/admin/events'); notify('The event was removed.', 'ok', 'Deleted'); })
};
