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
