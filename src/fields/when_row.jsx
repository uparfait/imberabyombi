/* fields/when_row.jsx: a date, its times and their time zone on one line, as soft blocks, like a calendar app: "Friday,
   October 30 · 12:00pm – 1:00pm · GMT+2 · Kigali". Each block is the real field (a text date or time input, or the time
   zone's select: the picker opens on click, below or above, and searches the zones; typing works as in any date field),
   over a small label ("Starts") and its value in words ("Pick a date" while empty), with an arrow that turns up while its
   list is open. A form's row starts empty but for the time zone (the device's; schema_events). A title above
   says what the row is ("Date, time and time zone"). It always stays on one line and the date and times always show in
   full: the words get smaller with the row, where it is narrow they get shorter ("Fri, Oct 30", "GMT+2"), then the arrows
   go (container queries). Only the time zone gives way; its whole name is on hover.
   A schema groups fields into one with row: 'when' (open_form). */
import { Fragment } from 'react';
import { ic } from '../icons/index.js';
import { pad, h24, zone_list, zone_short, page_tz } from '../lib/index.js';
import { dt_attrs, dt_show, to24 } from './date_formats.js';

/* a value in words, long and short: a date "Friday, October 30" / "Fri, Oct 30", a time "12:00pm" (or "12:00" on the
   24-hour clock) */
export function in_words(t, v) {
  if (!v) { const w = t === 'date' ? 'Pick a date' : 'Pick a time'; return [w, w.replace(' a ', ' ')]; }   /* empty: "Pick a date" / "Pick date" */
  if (t === 'date') { const d = new Date(`${v}T00:00`); if (isNaN(d)) return [v, v];
    return [d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }), d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })]; }
  const [h, m] = to24(v).split(':').map(Number); if (isNaN(h) || isNaN(m)) return [v, v];
  const w = h24() ? `${pad(h)}:${pad(m)}` : `${h % 12 || 12}:${pad(m)}${h < 12 ? 'am' : 'pm'}`; return [w, w];
}
/* a time zone in words on a date, long and short: "GMT+2 · Kigali" / "GMT+2" */
const tz_words_of = (tz, date) => { const w = zone_short(tz, date); return [w, w.split(' · ')[0]]; };

/* a block's small label, and its value in words (both lengths; CSS shows the one that fits) with the arrow */
const CHEV = ic('chev_d', 'when_chev shrink-0');
const inside = (f, id, w) => <><label htmlFor={id} className="when_lab">{f.l}</label>
  <span className="when_val" aria-hidden="true"><span className="when_text"><span className="when_long">{w[0]}</span><span className="when_short">{w[1]}</span></span>{CHEV}</span></>;
const say = (b, [l, s]) => { const t = b?.querySelector('.when_text'); if (t) { t.firstChild.textContent = l; t.lastChild.textContent = s; } };

/* the time zone's offset follows the row's date (summer and winter time differ); a new date updates it */
const day_of = r => { const v = r?.querySelector('.when_date input')?.value || ''; return /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : ''; };
const tz_say = r => { const s = r?.querySelector('.when_tz select'); if (!s) return;
  say(s.parentNode, tz_words_of(s.value, day_of(r))); s.parentNode.dataset.tip = s.selectedOptions[0]?.text || s.value; };

/* the time zone: a select of every zone ("(GMT+02:00) Central Africa Time - Kigali", also its hover text) */
const tz_block = (f, v, row) => { const id = 'field_' + f.k, tz = v || page_tz(), zs = zone_list();
  return <span key={f.k} className="pick when_block when_tz" data-tip={zs.find(z => z.tz === tz)?.label || tz}>
    <select id={id} name={f.k} defaultValue={tz} required={!!f.req} onChange={e => tz_say(e.target.closest('.when_row'))}>
      {zs.map(z => <option key={z.tz} value={z.tz}>{z.label}</option>)}</select>{inside(f, id, tz_words_of(tz, row.date))}</span>; };

const block = (f, v, row) => { if (f.t === 'tz') return tz_block(f, v, row); const id = 'field_' + f.k, shown = dt_show(f.t, v);
  return <span key={f.k} className={`pick when_block when_${f.t}`}><input id={id} name={f.k} {...dt_attrs(f.t)} defaultValue={shown} required={!!f.req}
    onInput={e => { say(e.target.parentNode, in_words(f.t, e.target.value)); if (f.t === 'date') tz_say(e.target.closest('.when_row')); }} />
    {inside(f, id, in_words(f.t, shown))}</span>; };

/* fs: the row's fields in order; a dash goes between two times (start – end) */
export const when_row = (fs, row) => { const cap = fs.some(f => f.t === 'tz') ? 'Date, time and time zone' : 'Date and time', id = 'when_' + fs[0].k;
  return <div key={id} className="when_wrap sm:col-span-2"><p id={id} className="when_cap">{cap}</p>
    <div className="when_row" role="group" aria-labelledby={id}>
      {fs.map((f, i) => <Fragment key={f.k}>{i && f.t === 'time' && fs[i - 1].t === 'time' ? <span className="when_dash" aria-hidden="true">–</span> : null}
