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
| System 2 (nested)        | `/admin/nav`           | Three navigation levels: this system (sidebar) › System 2 (4 pages + System 3) › System 3 (14 pages) |
| Iconisus                 | `/admin/icons`         | The 3D icon maker: text, an icon from twelve libraries or an SVG, six styles, three colours, any size, copy or download (see [3D icons](icons_3d.md)) |
| Charts & KPIs            | `/admin/charts`        | Thirty chart types and KPI designs, a date range, hover values; a click on a card (or a mark) opens its data, 20 rows a page |
| Settings                 | `/admin/settings`      | Theme, live design tokens, storage use, backup export / import, demo reset, profile |

## The admin shell ([`src/admin/`](../src/admin/))
- **Sidebar**: full height, collapsible on desktop (the logo turns into "open sidebar" on hover), a drawer on phones;
  groups and the mini calendar fold smoothly and remember their state; the clicked link shows a spinner while its page loads.
- **Header tools**: search (command palette), apps grid ("Your modules"), theme switch, account menu.
- **Side panels** beside the content: notes, my tasks (with Completed), searchable help. The page shrinks to make room.
- **Create menu**: adds a record in any module the role can manage, from any page.
- **Command palette**: `Ctrl K` / `⌘K`, every page the role can open, searchable.
- **Account menu**: Settings, Public website, a small "Allow text selection" switch (its help icon says what it does),
  storage used, and Sign out at the very bottom.
- **Nested navigation**: "Your modules" style menus for System 2 and System 3, pinned under the header while scrolling.

## Permissions
Every module, sidebar link, widget, Create entry and button checks `auth.can(module, level)`. A module the role cannot
open shows "No access"; an unknown one shows "Page not found". See [roles and access](roles_and_access.md).

## Adding one
See [how to add a module](how_to_add_a_module.md).
