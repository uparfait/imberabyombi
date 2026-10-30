# Time zones

Every date and time in the system follows one time zone, the **page time zone**, chosen in **Settings → Time zone**
(saved in this browser; until one is chosen it is the device's own). Code: [`src/lib/tz.js`](../src/lib/tz.js), built
on the browser's own time-zone data (Intl), so summer and winter time are always right.

## What follows it
- **Today and now**: `ymd()`, `hm()` and `now_dt()` read the page's clock (`page_now()`), so the calendar's today, the
  dashboard's date, the date picker's Today, new records' default dates and times, and the attendance clock follow it.
- **Moments** (signing times, notes, emails) show through `fmt_stamp(t, options)`.
- The week view's corner shows its offset (GMT+2, GMT+5:30).

## Activities and events
- The form's date row ends with a **time zone** block ("Monday, November 2 · 9:00am – 10:00am · GMT-5 · New York"). It
  starts as the page time zone (the person's own) and opens a searchable list of every zone (city, name or offset, such
  as GMT+2). Its short name follows the row's date: New York is GMT-4 in summer and GMT-5 in winter.
- The record keeps its time zone (`tz`), and its date and times as they were entered.
- **The calendar converts**: each activity and event shows at its time in the page time zone, on the right day (a 9:00
  New York meeting shows at 16:00 in Kigali, at 23:00 in Tokyo). Tables show the zone it was set in (the `tz` column).
- Email designs give every time with its time zone: "2:00 PM – 4:30 PM (GMT+2 · Kigali)".

## TZ PlayGround (Timezone PlayGround, `/admin/tz`)
The time zone converter, in the sidebar under System as "TZ PlayGround". From: a time zone, a date, hour and minute (12h / 24h, Now); To: a time zone, and the
moment there in large type, its date, the offset, the difference and "Next day" / "Previous day". Swap turns them around.
Code: [`src/tzconv/`](../src/tzconv/), styles in `src/styles/tzconv/`; it loads the first time it is opened.

## The helpers (`src/lib/tz.js`)
| Helper | What it gives |
|---|---|
| `page_tz()`, `device_tz()` | the page's zone (Settings), the device's |
| `page_now()` | now on the page's clock, as a Date to read with `getDate()`, `getHours()`… |
