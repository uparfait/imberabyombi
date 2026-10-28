# Rendering and state

The template keeps React simple: pages are functions that return JSX and read the data they need while they draw.
There is one redraw switch, in [`src/store/app_state.js`](../src/store/app_state.js).

## The draw cycle
1. Something changes data (`db.upsert(...)`) or UI state (`ui.tab.tasks = 'mine'`).
2. The code calls `rerender()` (same page) or `render()` (a new page).
3. `<App/>` draws `render_route()`: the public, account or admin page for the current hash.
4. `run_after_render()` (src/router) does what needs the finished page: charts, reveal animations, count-ups,
   the typing effect, scroll position, messages that followed a navigation.

`render()` and `rerender()` redraw **synchronously** (React `flushSync`), so the next line can already use the new DOM:
```js
import { db, ui, rerender, qs } from '../store/index.js';
ui.flash = db.upsert('tasks', row);   // the new row will flash
rerender();
qs('#main .row_flash')?.scrollIntoView({ block: 'center' });
```

## The state that is not data: `ui`
`ui` holds what the screen shows: column searches (`q`), table pages (`page`), sorting (`sort`), open tabs (`tab`),
sidebar (`side`, `side_min`), calendar (`cal_date`, `cal_view`), side panel (`panel`), chart range (`viz_range`),
table settings (`tview`), the table in full screen (`table_full`), the row to flash (`flash`).
Change it, then call `rerender()`. Things that must survive a reload go to `db` instead (`db.set('sideMin', true)`).

## New page vs same page
- `render()` (a navigation): clears the page's timers, closes open dialogs, forgets which tables already loaded,
  scrolls to the top and draws a fresh tree (a new React key), like a full page load.
- `rerender()`: the same page updates in place; scroll positions, open menus and typed text stay.

## Queues
| Name             | Use                                                                        |
|------------------|----------------------------------------------------------------------------|
| `after_render(fn)` / `AFTER` | run once after the next draw (draw a chart, focus a field)     |
| `TIMERS`         | intervals that belong to the current page (`TIMERS.push(setInterval(...))`); cleared on every draw |
| `before_render(fn)` | a cleanup that runs before every draw (close the picker, hide tooltips) |

## Where state lives
| Kind                         | Where                                            |
|------------------------------|--------------------------------------------------|
| Records (tasks, staff …)     | `db` collections (`db.list('tasks')`)            |
| Settings (theme, tokens …)   | `db.get('theme')` / `db.set(...)`                |
| What the screen shows        | `ui`                                             |
| The current route            | `route` (`path`, `q` = query, `mod`, `title`)    |
| A small part's own state     | a component with `useState` (task view editors, export ticks, file tiles) |

## Forms
Inputs are uncontrolled (`defaultValue`, `defaultChecked`); values are read on submit with `form_obj(form)`. When a
control must follow data after a redraw, give it a `key` that changes with that data. To set a value from code before
firing events, use `set_native_value(input, value)` (src/fields), so React notices the change.
