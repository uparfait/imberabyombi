# Document editor

A full word processor at `/admin/docs` ("Document editor" in the sidebar, every role). It opens in the whole window,
without the admin sidebar and header; the Back arrow (title bar, or toolbar when the title bar is folded) returns to the
page you came from. Code: [`src/editor/`](../src/editor/) (loaded only when the editor opens), styles in
[`src/styles/editor/`](../src/styles/editor/), icons in `src/icons/editor_paths*.js`.

## What it does
- **Pages**: real paper sizes (Letter, Legal, Tabloid, Executive, A3, A4, A5, B5), portrait or landscape, margins,
  page colour, header, footer, page numbers; text flows from page to page as you type; rulers set the margins.
- **Text**: styles (Normal, Title, Subtitle, Heading 1–4), fonts, sizes, bold, italic, underline, strikethrough,
  colour and highlight palettes, alignment, line and paragraph spacing, indents, case changes, clear formatting,
  paint format.
- **Lists**: bulleted and numbered (many marker styles) and checklists.
- **Tables**: grid picker, presets, rows and columns, merge and split, borders, cell colour, column resizing by drag.
- **Images**: insert from file or URL, resize, crop, rotate, flip, adjust, alt text, border, and positions:
  in line, wrap text left or right, break text, in front of text, behind text. Drag an image to move it.
- **Links, comments, find and replace, word count, special characters, spelling check, zoom, editing / viewing modes.**
- **Document tabs**: add, rename, duplicate, delete, drag to reorder, filter when there are many; each tab has its own
