/* events/event_cards.jsx: an event's details as cards, one per section of its schema (Details, When, Location, Organiser,
   Audience): label and value rows, and an Edit button that changes that section only (ev_edit). */
import { Fragment } from 'react';
import { fmt_d, fmt_time, zone_short, page_tz, repeat_text, repeat_next, ymd } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { bar_cell, dash, tag } from '../ui/index.js';
import { KINDS } from '../schemas/index.js';

const SECS = ['Details', 'When', 'Location', 'Organiser', 'Audience'];
const out = (href, text) => <a href={href} className="ev_link" target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{text}</a>;
const times = e => e.start ? `${fmt_time(e.start)}${e.end ? ` – ${fmt_time(e.end)}` : ''}` : null;

/* each section's rows: [label, value] (an empty value shows a dash; a null row is left out) */
const ROWS = {
  Details: e => [['Title', e.title], ['Description', e.about ? <p className="whitespace-pre-line">{e.about}</p> : null]],
  When: e => [['Type', tag(KINDS.find(k => k[0] === e.kind)?.[1] || e.kind)],
    [e.kind === 'Recurring' ? 'First date' : 'Date', e.tbd ? 'Not set yet (postponed)' : e.date ? fmt_d(e.date) : null],
    e.kind === 'Recurring' && e.repeat ? ['Repeats', repeat_text(e.repeat, e.date)] : null,
    e.kind === 'Recurring' && e.repeat ? ['Next', (d => d ? fmt_d(d) : 'It has ended')(repeat_next(e.repeat, e.date, ymd()))] : null],
  Location: e => e.place === 'Virtual'
    ? [['Where', 'Virtual'], ['Meeting link', e.link ? out(e.link, e.link) : null], ['Joining notes', e.join_note ? <p className="whitespace-pre-line">{e.join_note}</p> : null]]
    : [['Where', 'Physical'], ['Venue or address', e.venue]],
  Organiser: e => [['Name', e.org_name], ['Email', e.org_email ? out('mailto:' + e.org_email, e.org_email) : null], ['Phone', e.org_tel ? out('tel:' + e.org_tel.replace(/\s/g, ''), e.org_tel) : null]],
  Audience: e => [['Expected', e.audience ? `${e.audience} people` : null], ['Capacity', e.capacity], ['Registered', bar_cell(e.registered || 0, e.capacity)]]
};

const card = (e, s, can) => <section key={s} className="card ev_card" aria-labelledby={`ev_sec_${s}`}>
  <header className="ev_card_head"><h3 id={`ev_sec_${s}`}>{s}</h3>
    {can ? <button type="button" className="btn btn_ghost btn_sm" data-act="ev_edit" data-id={e.id} data-sec={s}>{ic('edit', 'h-4 w-4')}Edit</button> : null}</header>
  <dl className="ev_dl">{ROWS[s](e).filter(Boolean).map(([k, v]) => <Fragment key={k}><dt>{k}</dt><dd>{v === '' || v == null ? dash() : v}</dd></Fragment>)}</dl></section>;

export const event_cards = (e, can) => SECS.map(s => card(e, s, can));
