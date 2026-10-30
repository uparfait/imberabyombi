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
