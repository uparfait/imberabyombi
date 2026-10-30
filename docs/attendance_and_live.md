# Attendance, View This Event, minutes and follow-ups

Code: [`src/events/`](../src/events/). Attendance records are the `attendees` collection
([`schema_attendees.jsx`](../src/schemas/schema_attendees.jsx)).

## Attendance
- Under an event's (or activity's) status: "Opens in" or "Closes in" (only when it differs from the status's own
  countdown), its **QR code** while attendance is open (before, an empty place; once over, "Finished"), how many
  attended (live; past 99 it shows 99+), **Copy link** and **Open** (the system's tile menu: Attendance page, in a new
  tab; View This Event; Attendees; Attendance settings). A click on the QR code shows it on the whole screen, as large
  as the screen allows ([`qr_full.jsx`](../src/events/qr_full.jsx)), the same from either page. The QR encoder loads
  from the CDN.
- **The attendance page**, `/attend/<events|activities>/<id>` ([`attend_page.jsx`](../src/events/attend_page.jsx)):
  no header or sidebar; the title (a long one wraps), then the form: full name, email, telephone, organisation or unit,
  position, and a signature, drawn (the O-Doc Sign pad) or digital. Once per email; a large tick says it was sent.
  Before it opens it counts down to opening; while open, to closing; after, it is closed.
- **When it is open** ([`att_window.js`](../src/events/att_window.js)): during the event, plus **Attendance settings**:
  before it starts, how many minutes early it opens; while it runs, how many minutes after the end it stays open; once
  it has ended, reopen it from now for some minutes (the QR code comes back). All 0 to start with.
- **Attendees**: `…/<id>/attendance`, the usual table (search, sort, export to CSV, JSON or Excel). A row shows the
  signature. A new sign-in shows at once on any open page (other tabs too).

## View This Event
`…/<id>/live` ([`live_page.jsx`](../src/events/live_page.jsx)), also for a finished one: the whole window, no sidebar.
Its title in the top bar (one line); its details, the agenda item running now (large, with its presenter and
progress), the agenda, the organiser and co-organisers (each with Edit until it is over), its minutes and follow-ups;
the time left above a large QR code (full screen on a click; an empty place before attendance opens, "Finished"

## Minutes and follow-ups
- **Record minutes** (live screen) opens the document editor on that day's own document, `/admin/docs?doc=m_<id>`,
  titled "Minutes · <title> · <date>" and started with who attended and the agenda. The event's page lists its minutes
  by date with who wrote them, to open or copy the link; a recurring one gathers one per day.
- **Add task** opens the task form, linked to the event (`ref`); its page lists these follow-ups with who does them.
