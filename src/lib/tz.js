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
