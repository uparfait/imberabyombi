# Time zones

Every date and time in the system follows one time zone, the **page time zone**, chosen in **Settings → Time zone**
(saved in this browser; until one is chosen it is the device's own). Code: [`src/lib/tz.js`](../src/lib/tz.js), built
on the browser's own time-zone data (Intl), so summer and winter time are always right.

## What follows it
- **Today and now**: `ymd()`, `hm()` and `now_dt()` read the page's clock (`page_now()`), so the calendar's today, the
  dashboard's date, the date picker's Today, new records' default dates and times, and the attendance clock follow it.
- **Moments** (signing times, notes, emails) show through `fmt_stamp(t, options)`.
