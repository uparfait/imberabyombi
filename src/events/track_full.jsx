/* events/track_full.jsx: the agenda on the whole screen (the browser's own full screen; Esc or × closes it), from the
   "now" card of Open This Event: one item at a time, in the middle: its time, its title, then its description (smaller,
   apart), its presenter and, while it runs, the time it has left; the event's title on top, its time left bottom right. Back and
   Next (the arrow keys, the dots) step through the items; on its own it slides to the item running now (else the next):
   the page redraws every 30 seconds and when a countdown ends, and a picked item holds until the running one changes or
   two minutes pass. The text starts at the left, the block in the middle. The background is a soft tint from the
   item's title (hue(): the same title, the same colour; .tint), mixed into the page colour so it stays calm in both
   themes; the now card has it too. item_end(e, a): when an item ends (ms). TRACK_ACT: its buttons. */
import { qs, pad, tz_parts, page_tz, fmt_time } from '../lib/index.js';
import { rerender } from '../store/index.js';
import { at } from '../schemas/index.js';
import { ic } from '../icons/index.js';
import { left } from './countdown.js';

const today = e => { const p = tz_parts(e.tz || page_tz(), Date.now()); return [`${p.y}-${pad(p.mo)}-${pad(p.d)}`, `${pad(p.h)}:${pad(p.mi)}`]; };
export const item_end = (e, a) => at(e.repeat ? today(e)[0] : e.date, a.to, e.tz);
export const hue = s => [...String(s || '')].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7) % 360;
let pick = null;   /* { id, i, now, at }: the item picked with Back / Next */
