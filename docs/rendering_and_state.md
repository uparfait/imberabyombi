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
