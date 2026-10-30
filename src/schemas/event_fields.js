/* schemas/event_fields.js: what activities and events share: their type (Upcoming, Live now, Recurring), how a recurring
   one repeats (lib/repeat.js), where it happens, who organises it, how many are expected, and the check that their timing
   makes sense. Choosing Live now fills an empty date and start with the time now. */
import { pad, tz_parts, zoned_to_utc, device_tz } from '../lib/index.js';
import { auth } from '../auth/index.js';
import { show_err } from '../feedback/index.js';
import { set_native_value } from '../fields/form_values.js';
import { dt_show } from '../fields/date_formats.js';
import { repeat_from } from '../fields/repeat_field.jsx';
import { agenda_from, agenda_ok } from '../fields/agenda_field.jsx';
import { people_from } from '../fields/people_field.jsx';
import { field_spec } from './fields.js';

export const KINDS = [['Upcoming', 'Upcoming'], ['Live', 'Live now'], ['Recurring', 'Recurring']];
const KIND_HELP = 'Upcoming: it starts later. Live now: it has already started, so its date and start time are filled in with '
  + 'the time now (change them if it started earlier). Recurring: it repeats on a schedule you choose.';

/* Live now: an empty date and start become the time now, in the form's time zone */
const live_now = f => { const tz = f.elements.tz?.value || device_tz(), p = tz_parts(tz, Date.now());
  for (const [k, v] of [['date', `${p.y}-${pad(p.mo)}-${pad(p.d)}`], ['start', `${pad(p.h)}:${pad(p.mi)}`]]) {
    const i = f.elements[k]; if (i && !i.value) { set_native_value(i, dt_show(i.dataset.type, v)); i.dispatchEvent(new Event('input', { bubbles: true })); } } };
export const kind_spec = () => field_spec('kind', 'Type', 'seg', KINDS, 1, { def: () => 'Upcoming', fill: kind_of, help: KIND_HELP,
  on: e => { if (e.target.value === 'Live') live_now(e.target.form); } });
/* a record saved before it had a type or a place (fill: what its form shows when it is edited): its type from its
   timing (a repeat rule: Recurring; running now: Live now; otherwise Upcoming), its place from its link */
export function kind_of(r) {
  if (r.kind) return r.kind; if (r.repeat) return 'Recurring'; if (!r.date) return 'Upcoming';
  const s = at(r.date, r.start, r.tz), now = Date.now(); return s <= now && now < (r.end ? at(r.date, r.end, r.tz) : s + 2 * 3600e3) ? 'Live' : 'Upcoming';
}
export const place_of = r => r.place || (r.link ? 'Virtual' : 'Physical');
export const kind_label = r => KINDS.find(k => k[0] === kind_of(r))?.[1];

/* where: in a place (a venue or address) or online (a meeting link and notes on joining, such as a passcode); all optional */
const PLACE_HELP = 'Physical: it happens in a place; add the venue or address. Virtual: it happens online; add the meeting link '
  + 'and any notes on joining, such as a passcode.';
export const where_f = () => [field_spec('place', 'Location', 'seg', [['Physical', 'Physical'], ['Virtual', 'Virtual']], 1, { def: () => 'Physical', fill: place_of, help: PLACE_HELP }),
  field_spec('venue', 'Venue or address', 'text', 0, 0, { when: 'place=Physical' }), field_spec('link', 'Meeting link', 'text', 0, 0, { when: 'place=Virtual' }),
  field_spec('join_note', 'Joining notes', 'textarea', 0, 0, { when: 'place=Virtual' })];
/* only the chosen kind of place is kept; a link without its https:// gets it */
const place_in = d => { if (!('place' in d)) return d;
  if (d.place === 'Virtual') { d.venue = ''; if (d.link && !/^[a-z][a-z0-9+.-]*:\/\//i.test(d.link)) d.link = 'https://' + d.link; } else { d.link = ''; d.join_note = ''; }
  return d; };
/* who organises it (the person signed in, to start with) and how many people are expected */
export const org_f = () => [field_spec('org_name', 'Name', 'text', 0, 1, { def: () => auth.user?.name || '' }),
  field_spec('org_email', 'Email', 'email', 0, 1, { def: () => auth.user?.email || '' }), field_spec('org_tel', 'Phone', 'tel'),
  field_spec('co_orgs', 'Co-organisers', 'people', 0, 0, { add: 'Add co-organiser' })];
/* the agenda: items with times, a title, a description and a presenter */
export const agenda_spec = () => field_spec('agenda', 'Agenda', 'agenda');
export const audience_spec = () => field_spec('audience', 'Expected audience', 'number', 0, 0, { min: 1 });

/* how a recurring one repeats (shown while the type is Recurring); saved as one rule, not as the form's rp_ fields */
export const repeat_spec = () => field_spec('repeat', 'Repeats', 'repeat');
const repeat_in = (d, f) => { for (const k of Object.keys(d)) if (/^(rp|ag|co_orgs)_/.test(k)) delete d[k];
  if ('kind' in d) d.repeat = d.kind === 'Recurring' ? repeat_from(f) : null;
/* a schema's before(): the timing checked, then the record as saved */
export const event_before = (d, row, f) => when_ok(d, row, f) ? place_in(repeat_in(d, f)) : false;

/* a wall-clock date and time in tz → the instant (ms) */
export const at = (date, time, tz) => { const [y, mo, d] = date.split('-').map(Number), [h, mi] = (time || '00:00').split(':').map(Number);
  return zoned_to_utc(y, mo, d, h, mi, tz || device_tz()); };

/* the timing makes sense: an end after the start; a recurring one that stops on a date stops on or after its first date;
   an upcoming one starts later than now; a live one has started and has not ended. The last two are checked for a new
   record, or when its timing changes (an old one can still be corrected) */
export function when_ok(d, row, f) {
  if (!d.date || !('kind' in d)) return true;   /* a form without the timing (one section) */
  const err = (k, m) => { const i = f.elements[k]; show_err(i, m); i?.focus(); return false; };
  if (d.start && d.end && d.end <= d.start) return err('end', 'Pick an end time after the start.');
  if (d.kind === 'Recurring' && f.elements.rp_end?.value === 'on') { const u = f.elements.rp_until?.value || '';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(u)) return err('rp_until', 'Pick the date it stops on.');
    if (u < d.date) return err('rp_until', 'Pick an end date on or after the first date.'); }
  if (row.id && ['kind', 'date', 'start', 'end', 'tz'].every(k => (d[k] ?? '') === (row[k] ?? ''))) return true;
  const s = at(d.date, d.start || (d.kind === 'Live' ? '00:00' : '23:59'), d.tz), now = Date.now();
  if (d.kind === 'Upcoming' && s <= now) return err(d.start ? 'start' : 'date', 'This time has already passed. Pick a later one, or choose Live now.');
  if (d.kind === 'Live' && s > now) return err(d.start ? 'start' : 'date', 'A live one has already started. Pick a time before now, or choose Upcoming.');
  if (d.kind === 'Live' && d.end && at(d.date, d.end, d.tz) <= now) return err('end', 'This end time has already passed. Pick a later one.');
  return true;
}
