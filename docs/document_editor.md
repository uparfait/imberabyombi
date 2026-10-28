# Document editor

A full word processor at `/admin/docs` ("Document editor" in the sidebar, every role). It opens in the whole window,
without the admin sidebar and header; the Back arrow (title bar, or toolbar when the title bar is folded) returns to the
page you came from. Code: [`src/editor/`](../src/editor/) (loaded only when the editor opens), styles in
[`src/styles/editor/`](../src/styles/editor/), icons in `src/icons/editor_paths*.js`.

## What it does
- **Pages**: real paper sizes (Letter, Legal, Tabloid, Executive, A3, A4, A5, B5), portrait or landscape, margins,
