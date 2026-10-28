# Routes

The router (src/router) reads the hash: `#/path?key=value`. Hash routes work on every static host without rules.

| Area    | Routes                                                                                          |
|---------|-------------------------------------------------------------------------------------------------|
| Public  | `#/` `#/about` `#/mission` `#/vision` `#/strategies` `#/staff` `#/partners` `#/thanks` `#/contact` |
| Public  | `#/intro` (hero detail), `#/sitemap` (footer detail, legal), `#/ui` (design system)              |
| Account | `#/login` `#/forgot` `#/verify` `#/authenticator` `#/set-password` (one shared account shell)     |
| Admin   | `#/admin` and `#/admin/<module>`: dashboard, calendar, tasks, staff, employees, attendance, students, library, events, inventory, parking, roles, emails, charts, nav, settings |
| Nested  | `#/admin/nav/...`: System 2 and System 3 pages (three levels of navigation in all)               |

- Unknown routes show "Page not found".
- Admin routes without a session redirect to `#/login?next=...` and return there after sign-in.
- A module the role cannot open shows "No access" (forbidden view).
