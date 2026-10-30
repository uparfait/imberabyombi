# Routes

Every page has its own address: `/path?key=value`. The router ([`src/router/`](../src/router/)) reads `location.pathname`
(after the base path, see below) and `location.search`, and moves between pages with the browser History API.

| Area    | Routes                                                                                          |
|---------|-------------------------------------------------------------------------------------------------|
| Public  | `/` `/about` `/mission` `/vision` `/strategies` `/staff` `/partners` `/thanks` `/contact`       |
| Public  | `/intro` (hero detail), `/sitemap` (footer detail, legal), `/ui` (design system)                |
| Account | `/login` `/forgot` `/verify` `/authenticator` `/set-password` (one shared account shell)        |
| Admin   | `/admin` and `/admin/<module>`: dashboard, calendar, tasks, docs (document editor, whole window), sign (O-Doc Sign, whole window, with pages under `/admin/sign/…`), staff, employees, attendance, students, library, events, inventory, parking, roles, emails, charts, icons (Iconisus), tz (time zone converter), nav, settings |
| Nested  | `/admin/nav/...`: System 2 and System 3 pages (three levels of navigation in all)               |

- Unknown routes show "Page not found".
- Admin routes without a session redirect to `/login?next=/admin/...` and return there after sign-in.
- A module the role cannot open shows "No access" (forbidden view).
- Each route sets `<title>`, the meta description, `og:title` and the canonical link (`set_meta()`).
- `/login?role=<id>` locks the sign-in form to a role (invite link); `&email=..&name=..` pre-fills it (access link).
