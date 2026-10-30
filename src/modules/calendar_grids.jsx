/* modules/calendar_grids.jsx: the calendar's two grids. Week: day heads, an all-day row for your tasks, then 24 hours
   (3rem each) with timed chips and the red now-line. Month: 6 weeks of day cells with up to 3 items each. */
import { add_d, ymd, to_min, fmt_hour, zone_of, page_tz, page_now } from '../lib/index.js';
import { cal_task } from '../admin/index.js';

const cols = 'grid grid-cols-[3.5rem_repeat(7,minmax(0,1fr))]';
const INK = 'bg-ink text-white dark:bg-surface-3 dark:text-fg';
const wday = x => x.toLocaleDateString(undefined, { weekday: 'short' }).toUpperCase();
const more = (n, c) => n > 0 ? <span className={`${c} text-[0.6875rem] text-muted`}>{`+${n} more`}</span> : null;

/* a timed item in the week grid: placed by its start, as tall as it lasts (at least 30 minutes) */
const CHIP = 'absolute inset-x-1 z-[1] overflow-hidden rounded-lg px-2 py-1 text-left text-xs leading-tight transition hover:brightness-110';
const chip = i => { const a = to_min(i.start), b = Math.max(to_min(i.end), a + 30);
  return <button key={i.c + i.id} className={`${CHIP} ${i.tone === 'ink' ? INK : 'bg-brand text-white'}`} style={{ top: `${a / 20}rem`, height: `${(b - a) / 20}rem` }}
    data-act="ev" data-c={i.c} data-id={i.id}><b className="block truncate">{i.title}</b>{`${i.start} – ${i.end}`}</button>; };

export function week_grid(d, items) {
  const s = add_d(d, -d.getDay()), days = Array.from({ length: 7 }, (_, i) => add_d(s, i)), td = ymd(), gl = zone_of(page_tz()).short.split(' · ')[0], now = page_now();
  const head = x => { const k = ymd(x); return <button key={k} className="grid justify-items-center gap-1 py-3" data-act="goday" data-d={k}>
    <span className={`text-[0.6875rem] font-semibold tracking-widest ${k === td ? 'text-accent' : 'text-muted'}`}>{wday(x)}</span>
    <span className={`grid h-11 w-11 place-items-center rounded-full text-2xl transition ${k === td ? 'bg-brand text-white' : 'hover:bg-fg/5'}`}>{x.getDate()}</span>
  </button>; };
  const all_day = x => { const its = items.filter(i => i.all_day && i.date === ymd(x));
    return <div key={ymd(x)} className="min-w-0 border-l border-line p-1">{its.slice(0, 2).map(cal_task)}{more(its.length - 2, 'px-1')}</div>; };
  const now_line = <span className="pointer-events-none absolute inset-x-0 z-[2] h-0.5 bg-bad" style={{ top: `${(now.getHours() * 60 + now.getMinutes()) / 20}rem` }}>
    <span className="absolute -left-1.5 -top-1 h-2.5 w-2.5 rounded-full bg-bad"></span></span>;
  const hour = h => <span key={h} className="absolute right-2 -translate-y-1/2 text-[0.6875rem] text-muted" style={{ top: `${(h + 1) * 3}rem` }}>{fmt_hour(h + 1)}</span>;
  const day = x => { const k = ymd(x);
    return <div key={k} className={`hour_lines relative border-l border-line ${k === td ? 'bg-brand/[.03]' : ''}`} data-act="slot" data-d={k}>
      {items.filter(i => i.date === k && !i.all_day).map(chip)}{k === td ? now_line : null}</div>; };
  return <div className="overflow-x-auto"><div className="min-w-[44rem]">
    <div className={`${cols} border-b border-line`}>
      <div className="self-end pb-1 pl-1 text-[0.625rem] text-muted">{gl}</div>{days.map(head)}</div>
    {items.some(i => i.all_day && days.some(x => ymd(x) === i.date)) ? <div className={`${cols} border-b border-line`}>
      <div className="self-center pr-2 text-right text-[0.625rem] text-muted">Tasks</div>{days.map(all_day)}</div> : null}
    <div id="date_hours" className="max-h-[34rem] overflow-y-auto" data-chain=""><div className={`relative ${cols}`} style={{ height: '72rem' }}>
      <div className="relative">{Array.from({ length: 23 }, (_, h) => hour(h))}</div>
      {days.map(day)}
    </div></div></div></div>;
}

export function month_grid(d, items) {
  const f = new Date(d.getFullYear(), d.getMonth(), 1), s = add_d(f, -f.getDay()), td = ymd();
  const item = it => it.all_day ? cal_task(it) : <button key={it.c + it.id} data-act="ev" data-c={it.c} data-id={it.id}
    className={`mb-0.5 block w-full truncate rounded-md px-1.5 py-0.5 text-left text-[0.6875rem] ${it.tone === 'ink' ? INK : 'bg-brand/15 text-accent'}`}>
    {`${it.start} ${it.title}`}</button>;
  const cell = i => { const x = add_d(s, i), k = ymd(x), its = items.filter(it => it.date === k);
    const out = x.getMonth() !== d.getMonth() ? 'bg-surface-2/60' : '';
    return <div key={k} className={`min-h-[6.5rem] min-w-0 border-b border-r border-line p-1 sm:p-1.5 ${out}`} data-act="slot" data-d={k}>
      <span className={`mx-auto mb-1 grid h-7 w-7 place-items-center rounded-full text-xs ${k === td ? 'bg-brand text-white' : 'text-muted'}`}>{x.getDate()}</span>
      {its.slice(0, 3).map(item)}{more(its.length - 3, 'px-1.5')}</div>; };
