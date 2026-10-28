# Admin modules

Each module is a view in [`src/modules/`](../src/modules/) registered in `VIEWS` and listed in `MODS` (src/auth).

| Module                   | Route                  | Features                                                         |
|--------------------------|------------------------|------------------------------------------------------------------|
| Dashboard                | `/admin/dashboard`     | Welcome hero, counts, attendance chart, my tasks, agenda, low stock, parking |
| Calendar & activities    | `/admin/calendar`      | Week (hour grid, now line) and month views, mini calendar, click a slot to add; your tasks on their due day (a click opens Tasks with it highlighted) |
| Tasks                    | `/admin/tasks`         | Own / assigned / delegated / all tabs; dates with times by status; live countdown (red when overdue); subtasks with progress; attachments with previews; comments (edit and delete your own); a details view with a pen per row; status Save / Cancel (Done records the time); only the creator edits or deletes |
| Staff                    | `/admin/staff`         | System users with roles, personal access links                   |

## The admin shell ([`src/admin/`](../src/admin/))
- **Sidebar**: full height, collapsible on desktop (the logo turns into "open sidebar" on hover), a drawer on phones;
  groups and the mini calendar fold smoothly and remember their state; the clicked link shows a spinner while its page loads.
- **Header tools**: search (command palette), apps grid ("Your modules"), theme switch, account menu.
- **Side panels** beside the content: notes, my tasks (with Completed), searchable help. The page shrinks to make room.
- **Create menu**: adds a record in any module the role can manage, from any page.
- **Command palette**: `Ctrl K` / `⌘K`, every page the role can open, searchable.
- **Right-click menu**: quick links, Back, Reload, "Allow text selection".
- **Nested navigation**: "Your modules" style menus for System 2 and System 3, pinned under the header while scrolling.

## Permissions
Every module, sidebar link, widget, Create entry and button checks `auth.can(module, level)`. A module the role cannot
open shows "No access"; an unknown one shows "Page not found". See [roles and access](roles_and_access.md).

## Adding one
See [how to add a module](how_to_add_a_module.md).
