# Attendance, the live screen, minutes and follow-ups

Code: [`src/events/`](../src/events/). Attendance records are the `attendees` collection
([`schema_attendees.jsx`](../src/schemas/schema_attendees.jsx)).

## Attendance
- Under an event's (or activity's) status: its **QR code** while attendance is open or about to open, "Opens in" or
  "Closes in", how many attended (live; past 99 it shows 99+), **Copy link** and **Open** (the system's tile menu:
  Attendance page, Live screen, Attendees, Attendance settings). A click on the QR code shows it on the whole screen,
  as large as the screen allows ([`qr_full.jsx`](../src/events/qr_full.jsx)). The QR encoder loads from the CDN.
- **The attendance page**, `/attend/<events|activities>/<id>` ([`attend_page.jsx`](../src/events/attend_page.jsx)):
  no header or sidebar; the name, when and where, then the form: full name, email, telephone, organisation or unit,
  position, and a signature, drawn (the O-Doc Sign pad) or digital. Once per email; a large tick says it was sent.
  Before it opens it counts down to opening; while open, to closing; after, it is closed.
- **When it is open** ([`att_window.js`](../src/events/att_window.js)): during the event, plus **Attendance settings**:
