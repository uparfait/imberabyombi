/* events/event_cards.jsx: an event's details as one table (Field | Value, like the details view), a row per section of
   its schema (Details, When, Location, Organiser, Agenda, Audience) with an Edit button that changes that section only
   (ev_edit). The agenda item running now is marked. */
import { Fragment } from 'react';
import { fmt_d, fmt_time, zone_short, page_tz, repeat_text, repeat_next, ymd } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { bar_cell, dash, tag } from '../ui/index.js';
import { kind_of, kind_label, place_of } from '../schemas/index.js';
import { agenda_now } from './agenda_now.js';
import { att_count, BASE } from './attend_side.jsx';
import { to } from '../router/index.js';

const SECS = ['Details', 'When', 'Location', 'Organiser', 'Agenda', 'Audience'];
const out = (href, text) => <a href={href} className="ev_link" target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{text}</a>;
const times = e => e.start ? `${fmt_time(e.start)}${e.end ? ` – ${fmt_time(e.end)}` : ''}` : null;

/* each section's rows: [label, value] (an empty value shows a dash; a null row is left out) */
const ROWS = {
  Details: e => [['Title', e.title], e.category ? ['Category', e.category] : null,
    ['Description', e.about || e.note ? <p className="whitespace-pre-line">{e.about || e.note}</p> : null]],
  When: e => [['Type', tag(kind_label(e))],
    [kind_of(e) === 'Recurring' ? 'First date' : 'Date', e.tbd ? 'Not set yet (postponed)' : e.date ? fmt_d(e.date) : null],
    ['Time', e.tbd ? null : times(e)], ['Time zone', zone_short(e.tz || page_tz(), e.date)],
    e.kind === 'Recurring' && e.repeat ? ['Repeats', repeat_text(e.repeat, e.date)] : null,
    e.kind === 'Recurring' && e.repeat ? ['Next', (d => d ? fmt_d(d) : 'It has ended')(repeat_next(e.repeat, e.date, ymd()))] : null],
  Location: e => place_of(e) === 'Virtual'
    ? [['Where', 'Virtual'], ['Meeting link', e.link ? out(e.link, e.link) : null], ['Joining notes', e.join_note ? <p className="whitespace-pre-line">{e.join_note}</p> : null]]
    : [['Where', 'Physical'], ['Venue or address', e.venue]],
  Organiser: e => [['Name', e.org_name], ['Email', e.org_email ? out('mailto:' + e.org_email, e.org_email) : null], ['Phone', e.org_tel ? out('tel:' + e.org_tel.replace(/\s/g, ''), e.org_tel) : null],
    ['Co-organisers', e.co_orgs?.length ? <div className="grid gap-1">{e.co_orgs.map(p => <span key={p.email}>{p.name} · {out('mailto:' + p.email, p.email)}</span>)}</div> : null]],
  /* one row per item: its times, then its title, presenter and description; the one running now is marked */
  Agenda: e => { const now = agenda_now(e); return e.agenda?.length ? e.agenda.map((a, i) => [`${fmt_time(a.from)} – ${fmt_time(a.to)}`,
    <div className="grid gap-0.5"><span className="flex flex-wrap items-center gap-2 font-medium">{a.title}{i === now ? <span className="chip bg-ok/15 text-ok">Now</span> : null}</span>
      {a.p_name ? <span className="text-sm">{a.p_name}{a.p_title ? `, ${a.p_title}` : ''}</span> : null}{a.desc ? <span className="text-sm text-muted">{a.desc}</span> : null}</div>,
    i === now ? 'ag_now' : '']) : [['Items', null]]; },
  Audience: (e, c) => [['Expected', e.audience ? `${e.audience} people` : null], e.capacity ? ['Capacity', e.capacity] : null,
    ['Attended', <a href={to(`${BASE[c]}/${e.id}/attendance`)} className="ev_link">{`${att_count(e.id)} people`}</a>]]
};

const group = (e, s, can, c) => <Fragment key={s}><tr className="kv_group"><th scope="colgroup" colSpan={2}><div className="ev_group">{s}
  {can ? <button type="button" className="ev_edit" data-act="ev_edit" data-col={c} data-id={e.id} data-sec={s} aria-label={`Edit ${s.toLowerCase()}`}>{ic('edit', 'h-3.5 w-3.5')}Edit</button> : null}</div></th></tr>
  {ROWS[s](e).filter(Boolean).map(([k, v, cls], j) => <tr key={k + j} className={cls || undefined}><th scope="row">{k}</th><td>{v === '' || v == null ? dash() : v}</td></tr>)}</Fragment>;

export const event_cards = (e, can, c = 'events') => <section className="card ev_table" aria-label="Details"><table className="kv">
  <thead><tr><th scope="col">Field</th><th scope="col">Value</th></tr></thead><tbody>{SECS.map(s => group(e, s, can, c))}</tbody></table></section>;
