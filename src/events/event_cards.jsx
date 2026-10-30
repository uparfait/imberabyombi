/* events/event_cards.jsx: an event's details as one table (Field | Value, like the details view), a row per section of
   its schema (Details, When, Location, Organiser, Audience) with an Edit button that changes that section only (ev_edit). */
import { Fragment } from 'react';
import { fmt_d, fmt_time, zone_short, page_tz, repeat_text, repeat_next, ymd } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { bar_cell, dash, tag } from '../ui/index.js';
import { kind_of, kind_label, place_of } from '../schemas/index.js';

const SECS = ['Details', 'When', 'Location', 'Organiser', 'Audience'];
const out = (href, text) => <a href={href} className="ev_link" target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{text}</a>;
const times = e => e.start ? `${fmt_time(e.start)}${e.end ? ` – ${fmt_time(e.end)}` : ''}` : null;

/* each section's rows: [label, value] (an empty value shows a dash; a null row is left out) */
const ROWS = {
  Details: e => [['Title', e.title], ['Description', e.about ? <p className="whitespace-pre-line">{e.about}</p> : null]],
  When: e => [['Type', tag(kind_label(e))],
    [kind_of(e) === 'Recurring' ? 'First date' : 'Date', e.tbd ? 'Not set yet (postponed)' : e.date ? fmt_d(e.date) : null],
    ['Time', e.tbd ? null : times(e)], ['Time zone', zone_short(e.tz || page_tz(), e.date)],
    e.kind === 'Recurring' && e.repeat ? ['Repeats', repeat_text(e.repeat, e.date)] : null,
    e.kind === 'Recurring' && e.repeat ? ['Next', (d => d ? fmt_d(d) : 'It has ended')(repeat_next(e.repeat, e.date, ymd()))] : null],
  Location: e => place_of(e) === 'Virtual'
    ? [['Where', 'Virtual'], ['Meeting link', e.link ? out(e.link, e.link) : null], ['Joining notes', e.join_note ? <p className="whitespace-pre-line">{e.join_note}</p> : null]]
    : [['Where', 'Physical'], ['Venue or address', e.venue]],
  Organiser: e => [['Name', e.org_name], ['Email', e.org_email ? out('mailto:' + e.org_email, e.org_email) : null], ['Phone', e.org_tel ? out('tel:' + e.org_tel.replace(/\s/g, ''), e.org_tel) : null]],
  Audience: e => [['Expected', e.audience ? `${e.audience} people` : null], ['Capacity', e.capacity], ['Registered', bar_cell(e.registered || 0, e.capacity)]]
};

const group = (e, s, can) => <Fragment key={s}><tr className="kv_group"><th scope="colgroup" colSpan={2}><div className="ev_group">{s}
  {can ? <button type="button" className="ev_edit" data-act="ev_edit" data-id={e.id} data-sec={s} aria-label={`Edit ${s.toLowerCase()}`}>{ic('edit', 'h-3.5 w-3.5')}Edit</button> : null}</div></th></tr>
  {ROWS[s](e).filter(Boolean).map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v === '' || v == null ? dash() : v}</td></tr>)}</Fragment>;

export const event_cards = (e, can) => <section className="card ev_table" aria-label="Details"><table className="kv">
