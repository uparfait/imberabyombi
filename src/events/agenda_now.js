/* events/agenda_now.js: which agenda item runs now (its index, or -1): on the event's day (a recurring one's, today), in
   the event's time zone, the item whose from – to holds the time now. Used by the event page and its live screen. */
import { pad, tz_parts, page_tz, repeat_next } from '../lib/index.js';

export function agenda_now(e, now = Date.now()) {
  if (!e?.agenda?.length || !e.date || e.status === 'Cancelled' || e.tbd) return -1;
  const p = tz_parts(e.tz || page_tz(), now), today = `${p.y}-${pad(p.mo)}-${pad(p.d)}`, hm = `${pad(p.h)}:${pad(p.mi)}`;
