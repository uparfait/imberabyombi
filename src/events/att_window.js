/* events/att_window.js: when attendance is open for an event or activity: from att_before minutes before it starts to
   att_after minutes after it ends (0 and 0 unless set in Attendance settings), on its day (a recurring one: today's or
   its next day); or, reopened after it ended, until att_until. att_phase(e) is ['soon', opens], ['open', closes] or
   ['closed']; no date yet or cancelled: closed. */
import { pad, tz_parts, page_tz, repeat_next, ymd, add_d, parse_d } from '../lib/index.js';
import { at } from '../schemas/index.js';

export const ATT_DEF = { before: 0, after: 0 };
const mins = (v, d) => v === '' || v == null || isNaN(+v) ? d : Math.max(0, +v);
export const att_mins = e => [mins(e.att_before, ATT_DEF.before), mins(e.att_after, ATT_DEF.after)];

/* the window on day d: [opens, closes] */
const win = (e, d) => { const [b, a] = att_mins(e), s = at(d, e.start, e.tz), end = e.end ? at(d, e.end, e.tz) : s + 2 * 3600e3;
  return [s - b * 60e3, end + a * 60e3]; };

export function att_phase(e, now = Date.now()) {
  if (!e?.date || e.tbd || e.status === 'Cancelled') return ['closed'];
  let d = e.date;
  if (e.repeat) { const p = tz_parts(e.tz || page_tz(), now), today = `${p.y}-${pad(p.mo)}-${pad(p.d)}`;
    d = repeat_next(e.repeat, e.date, today); if (!d) return ['closed'];
    if (d === today && win(e, d)[1] <= now) d = repeat_next(e.repeat, e.date, ymd(add_d(parse_d(today), 1))); if (!d) return ['closed']; }
  const [o, c] = win(e, d);
  return now < o ? ['soon', o] : now < c ? ['open', c] : ['closed'];
}
