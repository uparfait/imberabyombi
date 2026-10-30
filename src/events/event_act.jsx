/* events/event_act.jsx: EV_ACT, the event page's buttons: edit one section, postpone (it opens with the event's date,
   times, zone and reason as they are now: change them to the new ones, or clear the date when the new one is not known
   yet, tbd), cancel (with a reason), back on schedule, mark as completed, stop repeating, delete, and the
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
import { MINUTES_ACT } from './event_minutes.jsx';
import { LIVE_ACT } from './live_page.jsx';
import { att_mins } from './att_window.js';
import { ev_state } from './ev_state.js';
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
  ...INVITE_ACT, ...QR_ACT, ...MINUTES_ACT, ...LIVE_ACT,
  /* when people can submit attendance, one setting at a time: before it starts, how early it opens; while it runs, how
     long it stays open after the end; once it has ended, reopen it from now for some minutes (its QR code comes back) */
  ev_att_set: t => { const c = t.dataset.c, e = db.find(c, t.dataset.id); if (!e) return; const [b, a] = att_mins(e), st = ev_state(e);
    const mode = ['Upcoming', 'Postponed', 'Recurring'].includes(st) ? 0 : st === 'Live' ? 1 : 2;
    const [k, l, v, hint, done] = [['att_before', 'Allow attendance before the start (minutes)', b, 'People can submit attendance this many minutes before it starts.', n => `Attendance opens ${n} min before the start.`],
      ['att_after', 'Allow attendance after the end (minutes)', a, 'People can still submit attendance this many minutes after it ends.', n => `Attendance stays open ${n} min after the end.`],
      ['att_more', 'Reopen attendance for (minutes)', 0, 'Attendance opens again now, with its QR code, for this many minutes.', n => +n ? `Attendance is open for ${n} min.` : 'Attendance is closed.']][mode];
    modal({ title: 'Attendance settings', body: [field(field_spec(k, l, 'number', 0, 1, { min: 0, max: 1440 }), v), <p key="hint" className="att_hint sm:col-span-2">{hint}</p>],
      submit: 'Save', on_submit: d => save(e.id, mode === 2 ? { att_until: +d[k] ? Date.now() + d[k] * 60e3 : 0 } : { [k]: +d[k] }, 'Attendance settings saved', done(d[k]), c) }); },
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
  ev_done: t => { const e = db.find('events', t.dataset.id); if (!e) return; const p = tz_parts(e.tz || page_tz(), Date.now());
    ask('Mark this event as completed? It ends now: its end time becomes the time now.', () =>
  ev_stop: t => { const e = db.find('events', t.dataset.id); if (!e) return; const p = tz_parts(e.tz, Date.now()), today = `${p.y}-${pad(p.mo)}-${pad(p.d)}`;
    ask('Stop repeating this event? It will not happen after today. The days it has already happened on stay as they are.', () =>
      save(e.id, { repeat: { ...e.repeat, end: 'on', until: today } }, 'No longer repeating', 'It will not happen after today.'), 'Stop repeating', true); },
  ev_del: t => ask('Delete this event? It is removed for everyone, with its invitations. You cannot undo this.', () => {
    db.remove('events', t.dataset.id); go('/admin/events'); notify('The event was removed.', 'ok', 'Deleted'); })
};
