# What this template documents: the feature list

Every feature below is working code. Each line says what it is and where it lives; the guides in `docs/` explain how.

## Design system (`src/styles/`, `/ui`)
- Design tokens: brand, ink, surfaces, text, lines, status colours, radius, pill, spacing, fonts, motion, chart series.
- Device scaling: phones show the 360px design scaled; desktops 15px; screens wider than the reference scale up.
- Light, dark and system themes with no flash on load and instant switching; flat design (no shadows).
- Every native element restyled: inputs, selects, checkboxes, switches, radios, ranges, colour, file, progress, meter,
  details, tables, dialogs, kbd, blockquote, code.
- Components: buttons (primary, ink, outline, ghost, soft, danger, glass, small), icon buttons, cards, chips, kickers,
  tabs, segmented buttons, popover menus, choice pills, tiles, accordions, prose, hero artwork, theme band, pattern layer.
- Cartoon pictures drawn in the page from a seed (`src/cartoons/`): streets, parks, offices, event stages, mountains and
  portraits, in any shape, with no download; a cartoon sample video with its poster (`public/media/`).
- Flat stroke icons and glossy 3D icons from one path dictionary (`src/icons/`); the 3D ones in colours fixed per place
  (never changed by the theme), drawn by the Icon3D engine (`src/icon3d/`), with a glossy "#" brand mark.
- Iconisus (`/admin/icons`): a 3D icon maker for text, library icons (twelve sets) or SVG in six styles (classic, balloon,
  ribbon, glossy, clay, glass), three colours, any size; copy or download the SVG.

## Forms and input (`src/fields/`, `src/overlays/`, `src/files/`)
- Imberabyombi outlined fields with floating labels, help icons and custom validation (no browser bubbles).
- Text date, time, date-and-time, month and week fields: type freely (separators added) or pick from a mini calendar
  and a 15-minute time list; 12-hour or 24-hour clock.
- Searchable select menus, multiple selects with checkboxes, suggestions while typing (datalist).
- File fields that show chosen files as tiles; a viewer for images, video, audio, PDF and text files.
- Copy boxes, one-time code boxes, password rules, authenticator QR code.

## Feedback (`src/feedback/`)
- Inline messages in the component that caused them; bottom-right notifications on staff pages only.
- One segmented spinner for every request: in the clicked button and a top loader above any open dialog.
- Empty states, no-result states, broken-media fallbacks.

## Public website (`src/site/`)
- Header with section links and scroll spy, mobile drawer, footer with sitemap; hero with typing effect.
- Sections: about, mission, vision, strategies, staff, partners, thanks, contact (form + map), FAQ, pricing tiers.
- Detail pages, staff directory, long-form article pages, sitemap page, email design gallery.

## Account (`src/account/`)
- Sign in with a role picker and "Keep me signed in"; invite and personal access links.
- Forgot password, 2-step verification code with resend timer, authenticator app set-up, set a new password.

## Admin (`src/admin/`, `src/modules/`)
- Collapsible sidebar with groups and a mini calendar, apps grid, Create menu, account menu, side panels (notes,
  my tasks, help), command palette (Ctrl K / ⌘K), and a text-selection switch in the account menu.
- Nested navigation: three levels (this system, System 2, System 3) with "Your modules" style menus.
- Dashboard: welcome hero, counts, attendance chart, my tasks, agenda, low stock, parking.
- Calendar: week (hour grid, now line) and month views, mini calendar, click a slot to add, your tasks on their due day.
- Tasks: own / assigned / delegated / all tabs, dates with times by status, live countdown (red when overdue),
  subtasks with progress, attachments with inline previews, comments (edit and delete your own), a details view with
  a pen per row, status changes (Done records the time), only the creator edits or deletes.
- Staff, employees, attendance (live clock, check in/out, late rule), students (bulletins, payments), library (books,
  rentals, declarations), events, reservations and inventory (approve/reject, stock levels), smart parking (live slot
  grid, check-in/out with fees), roles and access (matrix, landing pages, invite links), email designs, settings
  (theme, live tokens, storage, backup export/import, demo reset, profile).

## Document editor (`src/editor/`, `/admin/docs`)
- A full word processor in the whole window with a Back button: paper sizes, margins, headers, footers, page numbers.
- Styles, fonts, sizes, colours, highlight, lists, checklists, tables, images with positions (in line, wrap, break,
  in front of or behind text) and drag to move, links, comments, find and replace, word count, zoom, editing modes.
- Live preview: hovering a formatting choice shows it at once; leaving restores; a click keeps it.
- Document tabs with outlines (fold, drag sections, move up / down; fold a whole tab's outline); import DOCX, PDF,
  XLSX, PPTX, EPUB, RTF, HTML, Markdown, JSON (at the cursor, in new tabs, or in place of one tab: the others are
  never touched); export DOCX, PDF, RTF, EPUB, XLSX, CSV, HTML, Markdown, TXT; saved in the browser (IndexedDB, so
  images are kept); rulers on demand with a margin reset.

## O-Doc Sign (`src/sign/`, `/admin/sign`)
- PDFs sent for signature, in the whole window with its own top bar and a lists menu: All, Drafts, Waiting, Completed
  and To sign, each with its count. Every account starts empty and sees what it prepared and what was sent to it.
- Upload a PDF (checked to really be one), add signers with a note for each, place signature and stamp fields (click or
  drag, move, resize, arrow keys), autosave, send.
- Sign with a drawn, typed (five handwriting fonts) or uploaded signature; a created or uploaded stamp; background
  removal makes the paper of an upload transparent. Next field, one-tap reuse, an agreement before signing.
- Progress per signer, a copyable signing link, activity, and a download with the marks written into the PDF and a
  signing certificate page once everyone has signed.

## Data tables (`src/table/`, `src/schemas/`)
- Generated from a schema: column search, sort, pages, rows per page (10/20/50), hide columns, full-tab view,
  Action Buttons column pinned first, details view (COLUMN NAME / VALUE), add, edit, delete.
- Export to CSV, JSON or Excel with a date-and-time range, filters for fixed-choice columns, chosen columns and
  their names in the file.

## Charts and KPIs (`src/charts/`)
- Many chart types and KPI designs in SVG, drawn at their real width in the system colours, with a date range,
