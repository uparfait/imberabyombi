/* lib/tz.js: time zones, from the browser's own data (Intl): the list, offsets, and moving a wall-clock time from one zone
   to another. page_tz(): the zone every page shows (chosen in Settings, else the device's own); page_now(): now on that
   clock, as a Date whose local fields (getDate, getHours…) read it, so ymd(), hm() and the calendar follow it. */
