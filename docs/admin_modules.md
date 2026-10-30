# Admin modules

Each module is a view in [`src/modules/`](../src/modules/) registered in `VIEWS` and listed in `MODS` (src/auth).

| Module                   | Route                  | Features                                                         |
|--------------------------|------------------------|------------------------------------------------------------------|
| Dashboard                | `/admin/dashboard`     | Welcome hero, counts, attendance chart, my tasks, agenda, low stock, parking |
| Calendar & activities    | `/admin/calendar`      | Week (hour grid, now line) and month views, mini calendar, click a slot to add; your tasks on their due day (a click opens Tasks with it highlighted) |
| Tasks                    | `/admin/tasks`         | Own / assigned / delegated / all tabs; dates with times by status; live countdown (red when overdue); subtasks with progress; attachments with previews; comments (edit and delete your own); a details view with a pen per row; status Save / Cancel (Done records the time); only the creator edits or deletes |
