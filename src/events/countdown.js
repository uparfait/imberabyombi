/* events/countdown.js: the time left until an event starts (or ends, while it is live) in short units, leading empty ones
   left out: "1y 2mo 3d 4h 5m 6s", "12h 32m 23s", "23s". count_to(e, state) is [label, moment] or null (past, cancelled, no
   date yet); tick() counts every [data-count-to] on screen down each second, and redraws the page when one reaches 0. */
import { pad, tz_parts, repeat_next, page_tz, ymd, add_d, parse_d } from '../lib/index.js';
import { rerender } from '../store/index.js';
import { at } from '../schemas/index.js';

const UNITS = [['y', 31536000], ['mo', 2592000], ['d', 86400], ['h', 3600], ['m', 60], ['s', 1]];
export function left(ms) {
  let s = Math.max(0, Math.floor(ms / 1000)); const parts = UNITS.map(([u, n]) => { const v = Math.floor(s / n); s -= v * n; return [v, u]; });
  const i = parts.findIndex(([v]) => v > 0); return i < 0 ? '0s' : parts.slice(i).map(([v, u]) => v + u).join(' ');
}

export function count_to(e, st) {
  if (!e.date || e.tbd) return null;
