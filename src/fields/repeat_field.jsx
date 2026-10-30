/* fields/repeat_field.jsx: how a recurring activity or event repeats (field type 'repeat', shown while its type is
   Recurring): how often and every how many, on which weekdays (weekly), in which months (yearly), on which dates or which
   weeks of the month (monthly and yearly), and when it stops (never, on a date, after a number of times). The rule in
   words shows under it and follows every change (repeat_say). repeat_from(form) reads the rule (lib/repeat.js). */
import { REPEAT_NEW, DAY_NAMES, MONTH_NAMES, WEEK_NAMES, repeat_text, cap } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { help_tip } from '../ui/index.js';
import { dt_attrs } from './date_formats.js';

const FREQS = [['daily', 'Daily'], ['weekdays', 'Every weekday (Mon–Fri)'], ['weekly', 'Weekly'], ['monthly', 'Monthly'], ['yearly', 'Yearly']];
const UNIT = { daily: 'day', weekly: 'week', monthly: 'month', yearly: 'year' };
const MON_FIRST = [1, 2, 3, 4, 5, 6, 0];
const BY_HELP = 'Dates: on days of the month, such as the 1st and the 15th. Weeks: on weekdays of chosen weeks, such as the second and the last Friday.';
const END_HELP = 'Never: it repeats until you delete it. On a date: it stops after that day. After: it stops once it has happened that many times.';

/* the rule in the form; lists left empty mean "as on the first date" */
export function repeat_from(f) {
  const v = n => f.elements[n]?.value ?? '', all = n => [...f.querySelectorAll(`[name=${n}]:checked`)].map(i => +i.value);
  const r = { freq: v('rp_freq') || 'weekly', every: Math.min(99, Math.max(1, +v('rp_every') || 1)), end: v('rp_end') || 'never' };
  if (r.freq === 'weekly') r.days = all('rp_days');
  if (r.freq === 'yearly') r.months = all('rp_months');
  if (r.freq === 'monthly' || r.freq === 'yearly') Object.assign(r, v('rp_by') === 'week' ? { by: 'week', weeks: all('rp_weeks'), wdays: all('rp_wdays') } : { by: 'date', dates: all('rp_dates') });
  if (r.end === 'on') r.until = v('rp_until');
  if (r.end === 'after') r.count = Math.min(999, Math.max(1, +v('rp_count') || 1));
  return r;
}
/* the unit after "Every" (week / weeks) and the rule in words follow the form */
export function repeat_say(f) {
  const box = f?.querySelector('[data-repeat]'); if (!box) return; const r = repeat_from(f);
  box.querySelector('[data-rp-unit]').textContent = UNIT[r.freq] ? UNIT[r.freq] + (r.every > 1 ? 's' : '') : '';
  box.querySelector('[data-rp-sum]').textContent = repeat_text(r, f.elements.date?.value);
}

const chip = (name, v, label, on, cls = '', tip) => <label key={v} className={`choice_pill rp_chip ${cls}`} data-tip={tip}>
  <input type="checkbox" className="sr-only" name={name} value={v} defaultChecked={on} aria-label={tip} />{label}</label>;
const choose = (name, opts, cur, label) => <div className="seg max-w-full" role="radiogroup" aria-label={label}>{opts.map(([v, l]) => <label key={v}>
  <input type="radio" className="sr-only" name={name} value={v} defaultChecked={cur === v} /><span>{l}</span></label>)}</div>;
const line = (label, body, when, help) => <div className="rp_row" data-when={when}>
  <p className="rp_lab">{label}{help ? help_tip(help, label.toLowerCase()) : null}</p><div className="rp_body">{body}</div></div>;
const weekdays = (name, on) => <div className="rp_chips">{MON_FIRST.map(d => chip(name, d, DAY_NAMES[d].slice(0, 3), on.includes(d), '', DAY_NAMES[d]))}</div>;
const num = (id, name, label, v, max) => <div className="field"><label htmlFor={id}>{label}</label>
  <input id={id} name={name} type="number" min="1" max={max} defaultValue={v} placeholder=" " /></div>;

export const repeat_field = (f, v, row = {}) => { const r = { ...REPEAT_NEW, ...(v || {}) }, id = 'field_' + f.k, say = e => repeat_say(e.currentTarget.closest('form'));
  return <div key={f.k} className="rp sm:col-span-2" data-when="kind=Recurring" data-repeat="" onChange={say} onInput={say}>
    <div className="rp_top">
      <div className="field"><label htmlFor={id}>{f.l}</label><select id={id} name="rp_freq" defaultValue={r.freq}>{FREQS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></div>
      <div className="rp_every" data-when="rp_freq!=weekdays">{num(id + '_every', 'rp_every', 'Every', r.every, 99)}
        <span className="rp_unit" data-rp-unit="">{UNIT[r.freq] ? UNIT[r.freq] + (r.every > 1 ? 's' : '') : ''}</span></div></div>
    {line('On', weekdays('rp_days', r.days), 'rp_freq=weekly')}
    {line('In', <div className="rp_chips">{MONTH_NAMES.map((m, i) => chip('rp_months', i + 1, m.slice(0, 3), r.months.includes(i + 1), '', m))}</div>, 'rp_freq=yearly')}
    {line('On', <>{choose('rp_by', [['date', 'Dates'], ['week', 'Weeks']], r.by, 'On dates or weeks')}
      <div className="rp_dates" data-when="rp_by=date">{Array.from({ length: 31 }, (_, i) => chip('rp_dates', i + 1, i + 1, r.dates.includes(i + 1), 'rp_round', `The ${i + 1}`))}
        {chip('rp_dates', -1, 'Last day', r.dates.includes(-1), 'rp_last', 'The last day of the month')}</div>
      <div className="grid gap-2" data-when="rp_by=week"><div className="rp_chips">{[1, 2, 3, 4, -1].map(w => chip('rp_weeks', w, cap(WEEK_NAMES[w]), r.weeks.includes(w), '', `The ${WEEK_NAMES[w]} week`))}</div>
        {weekdays('rp_wdays', r.wdays)}</div></>, 'rp_freq=monthly|yearly', BY_HELP)}
    {line('Ends', <>{choose('rp_end', [['never', 'Never'], ['on', 'On a date'], ['after', 'After']], r.end, 'Ends')}
      <div className="field rp_until" data-when="rp_end=on"><label htmlFor={id + '_until'}>End date</label>
        <input id={id + '_until'} name="rp_until" {...dt_attrs('date')} defaultValue={r.until} /><span className="date_hint" aria-hidden="true"></span></div>
      <div className="rp_count" data-when="rp_end=after">{num(id + '_count', 'rp_count', 'Number of times', r.count, 999)}</div></>, undefined, END_HELP)}
    <p className="rp_sum">{ic('refresh', 'h-4 w-4 shrink-0')}<span data-rp-sum="">{repeat_text(r, row.date)}</span></p>
  </div>; };
