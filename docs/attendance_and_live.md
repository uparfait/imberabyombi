# Attendance, Open This Event, minutes and follow-ups

Code: [`src/events/`](../src/events/). Attendance records are the `attendees` collection
([`schema_attendees.jsx`](../src/schemas/schema_attendees.jsx)).

## Attendance
- Under an event's (or activity's) status: "Opens in" or "Closes in" (only when it differs from the status's own
  countdown), its **QR code** while attendance is open (before, an empty place; once over, "Finished"), how many
  attended (live; past 99 it shows 99+), **Copy link** and **Open** (the system's tile menu: Attendance page, in a new
  tab; Open This Event; Attendees; Attendance settings). A click on the QR code shows it on the whole screen, as large
  as the screen allows ([`qr_full.jsx`](../src/events/qr_full.jsx)), the same from either page. The QR encoder loads
  from the CDN.
- **The attendance page**, `/attend/<events|activities>/<id>` ([`attend_page.jsx`](../src/events/attend_page.jsx)):
  no header or sidebar; the title (three lines at most, whole on hover), then the form: full name, email, telephone, organisation or unit,
  position, and a signature, drawn (the O-Doc Sign pad) or digital. Once per email; a large tick says it was sent.
  Before it opens it counts down to opening; while open, to closing; after, it is closed.
- **When it is open** ([`att_window.js`](../src/events/att_window.js)): during the event, plus **Attendance settings**:
  before it starts, how many minutes early it opens; while it runs, how many minutes after the end it stays open; once
  it has ended, reopen it from now for some minutes (the QR code comes back). All 0 to start with.
- **Attendees**: no page of its own; the count, Attendees (in Open and in Menu) or the Attended row open the usual
  table in an overlay over the page ([`attendees_view.jsx`](../src/events/attendees_view.jsx)): search, sort, export to
  CSV, JSON or Excel (no filters). A row shows the signature. Only what people submit: no Add, Edit or Delete. A new
  sign-in shows at once on any open page (other tabs too).

## Open This Event
`…/<id>/live` ([`live_page.jsx`](../src/events/live_page.jsx)), also for a finished one: the whole window, no sidebar.
Made for a computer screen: every screen shows the same view, scaled to fit (`html.stage_page`), never rearranged.
Its title in the top bar (one line); its details; the agenda item running now: its title (two lines at most), its
description apart, its presenter, the time it has left and its progress; the agenda and the organisers as tables (Edit,
Add and Transfer until it is over); the time left above a large QR code (full screen on a click; an empty place before
attendance opens, "Finished" after), the count and the link. **Menu** (tiles): Record/View minutes, Add task
(Follow-ups), Attendees, Full screen.

## Minutes and follow-ups
- **Record/View minutes** (Open This Event) opens the document editor on that day's own document,
  `/admin/docs?doc=m_<id>`, titled "Minutes · <title> · <date>" and started with who attended and the agenda; a
  recurring one gets one per day. The minutes live in that document.
- **Add task (Follow-ups)** opens the task form, linked to the event (`ref`); follow-ups live in Tasks.
