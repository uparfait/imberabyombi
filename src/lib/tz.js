/* lib/tz.js: time zones, from the browser's own data (Intl): the list, offsets, and moving a wall-clock time from one zone
   to another. page_tz(): the zone every page shows (chosen in Settings, else the device's own); page_now(): now on that
   clock, as a Date whose local fields (getDate, getHours…) read it, so ymd(), hm() and the calendar follow it. */
import { pad } from './text.js';
/* db straight from its file (not the store barrel), as in dates.js */
import { db } from '../store/db.js';

export const device_tz = () => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'; } catch { return 'UTC'; } };
export const page_tz = () => db.get('pageTz', '') || device_tz();

const FALLBACK = ['UTC', 'Africa/Kigali', 'Africa/Maputo', 'Africa/Lagos', 'Africa/Cairo', 'Africa/Nairobi', 'Europe/London', 'Europe/Paris',
  'Europe/Berlin', 'Europe/Moscow', 'Asia/Dubai', 'Asia/Kolkata', 'Asia/Shanghai', 'Asia/Tokyo', 'Asia/Singapore', 'Australia/Sydney',
  'Pacific/Auckland', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'America/Sao_Paulo'];
let ZONES = null;
export const zones = () => ZONES ||= (() => {
  let z = typeof Intl.supportedValuesOf === 'function' ? Intl.supportedValuesOf('timeZone') : FALLBACK.slice();
  z = z.filter(x => !x.startsWith('Etc/')); for (const x of ['UTC', device_tz()]) if (!z.includes(x)) z.push(x); return z; })();

const FMT = new Map();
const F = (tz, key, opts) => { const k = tz + '|' + key; let f = FMT.get(k);
  if (!f) { f = new Intl.DateTimeFormat('en-US', { timeZone: tz, ...opts }); FMT.set(k, f); } return f; };
const PARTS = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hourCycle: 'h23' };

/* the wall-clock parts of instant t in tz */
export function tz_parts(tz, t) {
  const o = {}; for (const p of F(tz, 'p', PARTS).formatToParts(new Date(t))) o[p.type] = p.value;
  return { y: +o.year, mo: +o.month, d: +o.day, h: (+o.hour) % 24, mi: +o.minute, s: +o.second };
}
/* tz's offset from UTC at instant t, in minutes */
export function offset_min(tz, t) {
  const p = tz_parts(tz, t); return Math.round((Date.UTC(p.y, p.mo - 1, p.d, p.h, p.mi, p.s) - Math.floor(t / 1000) * 1000) / 60000);
}
/* a wall-clock time in tz → the UTC instant */
export function zoned_to_utc(y, mo, d, h, mi, tz) {
  const guess = Date.UTC(y, mo - 1, d, h, mi); let t = guess - offset_min(tz, guess) * 60000;
  return guess - offset_min(tz, t) * 60000;
}
export const gmt = m => `GMT${m < 0 ? '-' : '+'}${pad(Math.floor(Math.abs(m) / 60))}:${pad(Math.abs(m) % 60)}`;
