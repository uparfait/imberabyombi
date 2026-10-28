# Rendering and state

The template keeps React simple: pages are functions that return JSX and read the data they need while they draw.
There is one redraw switch, in [`src/store/app_state.js`](../src/store/app_state.js).

## The draw cycle
1. Something changes data (`db.upsert(...)`) or UI state (`ui.tab.tasks = 'mine'`).
2. The code calls `rerender()` (same page) or `render()` (a new page).
