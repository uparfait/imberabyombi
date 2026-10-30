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

## How a navigation works
1. A click on an internal link, `go(path)` from code, or Back / Forward (`popstate`) → `navigate()`.
2. On staff pages the navigation is a "get": the clicked sidebar link shows the spinner, the top loader shows if it
   takes more than 150 ms, and the page waits `cfg.latency` for its data like a real API would.
3. `render()` (src/store/app_state.js) clears the page's timers and overlays, then React draws the new page
   (`render_route()`), inside a View Transition where the browser supports it.
4. `run_after_render()` scrolls to the top, starts reveal animations, counters, charts and the typing effect, and
   shows any message that followed the navigation (signed in, signed out…).

## Links
Write normal anchors and build the address with `to()`, so it carries the base path:
```jsx
import { to, go } from '../router/index.js';
<a href={to('/about')}>About</a>
```
One delegated click listener (`src/behaviors/link_clicks.js`) turns clicks on internal links into `go()`, so the page
