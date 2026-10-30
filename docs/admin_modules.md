# Admin modules

Each module is a view in [`src/modules/`](../src/modules/) registered in `VIEWS` and listed in `MODS` (src/auth).

| Module                   | Route                  | Features                                                         |
|--------------------------|------------------------|------------------------------------------------------------------|
| Dashboard                | `/admin/dashboard`     | Welcome hero, counts, attendance chart, my tasks, agenda, low stock, parking |
| Calendar & activities    | `/admin/calendar`      | Week (hour grid, now line) and month views, mini calendar, click a slot to add; your tasks on their due day (a click opens Tasks with it highlighted) |
| Tasks                    | `/admin/tasks`         | Own / assigned / delegated / all tabs; dates with times by status; live countdown (red when overdue); subtasks with progress; attachments with previews; comments (edit and delete your own); a details view with a pen per row; status Save / Cancel (Done records the time); only the creator edits or deletes |
| Document editor          | `/admin/docs`          | A full word processor in the whole window: pages, styles, tables, images (positions, drag to move), tabs and outline, comments, live preview on hover, import and export of DOCX, PDF and more (see [document editor](document_editor.md)) |
| O-Doc Sign               | `/admin/sign`          | PDFs sent for signature, in the whole window: upload a PDF, signers with a note each, signature and stamp fields, To sign list, draw / type / upload (background removal), signed PDF with a certificate (see [O-Doc Sign](o_doc_sign.md)) |
| Staff                    | `/admin/staff`         | System users with roles, personal access links                   |
| Employees                | `/admin/employees`     | Teachers, kitchen, cleaners, security and administration tabs    |
| Attendance               | `/admin/attendance`    | Live clock, check in / out (late after `cfg.work_start`), staff and student logs |
| Students                 | `/admin/students`      | Registration, bulletins (a report card per student), payments summary |
| Library                  | `/admin/library`       | Books, rentals (return, overdue), declarations, monitoring tiles |
| Events                   | `/admin/events`        | Upcoming cards with capacity progress, the full event list       |
| Reservations & inventory | `/admin/inventory`     | Approve / reject reservations, stock with minimum-level meters   |
| Smart parking            | `/admin/parking`       | Live slot grid, check-in, check-out with a fee (`cfg.parking_rate` per hour), movement log |
| Roles & access           | `/admin/roles`         | Permission matrix, landing page per role, invite links           |
| Email designs            | `/admin/emails`        | Invite, update, time change, reset link, sign-in code, access token in the brand |
