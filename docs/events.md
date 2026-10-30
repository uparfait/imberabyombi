# Events and activities

Activities (the calendar) and events (`/admin/events`) share one form, in sections: **Details**, **When**,
**Location**, **Organiser** and **Audience**. Schemas: [`src/schemas/schema_events.js`](../src/schemas/schema_events.js),
shared fields in [`event_fields.js`](../src/schemas/event_fields.js).

## When
- **Type**: *Upcoming* (it starts later), *Live now* (it has already started: an empty date and start time are filled in
  with the time now) or *Recurring* (it repeats). An upcoming one must start later than now; a live one must have
  started and not ended. These two checks run for a new record, or when its timing changes.
- The date, start, end and time zone are on one line (the zone starts as the device's).
- **Repeats** (Recurring only): Daily, Every weekday (Mon–Fri), Weekly, Monthly or Yearly, every 1 to 99 days, weeks,
  months or years.
  - Weekly: on chosen weekdays.
  - Monthly: on dates (the 1st, the 15th, the last day) or on weeks (the second and the last Friday).
  - Yearly: in chosen months, then on dates or weeks as for monthly.
  - **Ends**: *Never* (it repeats until you delete it), *On a date* (it stops after that day) or *After* a number of times.
  - Nothing chosen means "as on the first date". The rule shows in words under the choices ("Every 2 weeks on Monday and
    Wednesday, 5 times"). Code: [`lib/repeat.js`](../src/lib/repeat.js) (the days) and
    [`lib/repeat_words.js`](../src/lib/repeat_words.js) (the words).
- The calendar shows a recurring one on each day it happens.

## Location, organiser, audience
- **Location**: *Physical* (venue or address) or *Virtual* (meeting link and joining notes, such as a passcode). All
  optional; a link without `https://` gets it.
- **Organiser**: name and email (required) and phone. They start as the person signed in.
- **Expected audience**: how many people are expected.

## The Events page
- Tabs sort events by where they stand ([`events/ev_state.js`](../src/events/ev_state.js)): **Live**, **Upcoming**,
  **Recurring**, **Postponed**, **Cancelled** and **Past**, each with its count. The table's Status column shows the same.
- A row, a card or an event on the calendar opens the event's page, `/admin/events/<id>`
  ([`events/event_page.jsx`](../src/events/event_page.jsx)). It shows one card per section, and each card's **Edit**
  changes that section only (`open_form(c, id, {}, [title, keys])`).
- On the right are the status and the actions that fit it:
  - **Postpone**: a new date, or none yet, and a reason.
  - **Cancel event**: with a reason. It leaves the calendar.
  - **Back on schedule**, **Mark as completed** (while live) and **Stop repeating**.
  - **Duplicate**: a new event with the same details and no date.
  - **Delete**.
