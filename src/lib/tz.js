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
const gmt_short = m => { const a = Math.abs(m); return `GMT${m < 0 ? '-' : '+'}${Math.floor(a / 60)}${a % 60 ? ':' + pad(a % 60) : ''}`; };
const city = tz => tz === 'UTC' ? 'UTC' : tz.split('/').pop().replace(/_/g, ' ');
function long_name(tz, t) {
  const p = F(tz, 'n', { timeZoneName: 'long' }).formatToParts(new Date(t)).find(x => x.type === 'timeZoneName'); return p ? p.value : '';
}

/* every zone at instant t, west to east: { tz, off, gmt, text ("Central Africa Time - Kigali"), label ("(GMT+02:00) …"),
   short ("GMT+2 · Kigali"), key (what a search matches: name, city, zone, "gmt+2", "utc+2") }; built once a day */
let LIST = null, LIST_DAY = '';
export function zone_list(t = Date.now()) {
  const day = new Date(t).toISOString().slice(0, 10); if (LIST && LIST_DAY === day) return LIST;
  LIST = zones().map(tz => { const off = offset_min(tz, t), g = gmt(off), s = gmt_short(off); let name = long_name(tz, t);
    if (/^GMT([+-]|$)/.test(name)) name = '';
    const text = [name, tz === 'UTC' ? '' : city(tz)].filter(Boolean).join(' - ') || tz;
    return { tz, off, gmt: g, text, label: `(${g}) ${text}`, short: `${s} · ${city(tz)}`,
      key: `${g} ${text} ${tz.replace(/_/g, ' ')} ${s} utc${s.slice(3)}`.toLowerCase() }; })
    .sort((a, b) => a.off - b.off || a.text.localeCompare(b.text));
  LIST_DAY = day; return LIST;
}
/* a zone's short name on a given day ("GMT-5 · New York" in winter, "GMT-4 · New York" in summer): date 'YYYY-MM-DD' or now */
export const zone_short = (tz, date) => `${gmt_short(offset_min(tz, date ? Date.parse(`${date}T12:00:00Z`) : Date.now()))} · ${city(tz)}`;
export const zone_of = (tz, t) => zone_list(t).find(z => z.tz === tz) || { tz, off: offset_min(tz, t ?? Date.now()), gmt: gmt(offset_min(tz, t ?? Date.now())),
  text: tz, label: tz, short: tz, key: tz.toLowerCase() };

/* a wall-clock date ('YYYY-MM-DD') and time ('HH:MM') in zone from, as it reads in zone to → { date, time } */
export function convert(date, time, from, to) {
  if (!date || !from || !to || from === to) return { date, time };
  const [y, mo, d] = String(date).split('-').map(Number), [h, mi] = String(time || '00:00').split(':').map(Number);
  const p = tz_parts(to, zoned_to_utc(y, mo, d, h || 0, mi || 0, from));
