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
