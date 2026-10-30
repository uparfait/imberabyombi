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
  When: e => [['Type', tag(KINDS.find(k => k[0] === e.kind)?.[1] || e.kind)], [e.kind === 'Recurring' ? 'First date' : 'Date', e.date ? fmt_d(e.date) : null],
    ['Time', times(e)], ['Time zone', zone_short(e.tz || page_tz(), e.date)],
    e.kind === 'Recurring' && e.repeat ? ['Repeats', repeat_text(e.repeat, e.date)] : null,
    e.kind === 'Recurring' && e.repeat ? ['Next', (d => d ? fmt_d(d) : 'It has ended')(repeat_next(e.repeat, e.date, ymd()))] : null],
  Location: e => e.place === 'Virtual'
