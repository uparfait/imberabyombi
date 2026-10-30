# Accessibility

The template is built so that keyboard, screen-reader and low-vision users get the same experience.

## Structure
- Semantic landmarks on every page: `header`, `nav`, `main`, `aside`, `footer`; one `h1` per page.
- A "Skip to content" link is the first focusable element (`index.html`).
- `aria-current` marks the current link in every navigation; tables set `aria-sort` on sorted headers.
- Every control has a label: visible labels for fields, `aria-label` for icon buttons (also used as their tooltip).

## Keyboard
- Every action works from the keyboard: `Enter` / `Space` on anything with `data-act` and a `tabIndex`.
- `Esc` closes the open menu, picker or dialog (one layer at a time: the picker first, then the dialog).
- `Ctrl K` / `⌘K` opens the command palette; the hint shows the right key for the device (none on touch-only devices).
- Pickers: `Alt + ↓` or `F4` opens, arrows move, `Enter` picks, `Esc` closes only the picker.
- Focus is always visible (focus rings follow the brand colour) and returns to the trigger when a menu closes.

## Dialogs and overlays
- One native `<dialog>` per kind (`#modal`, `#confirm`, `#drawer`, `#viewer`): focus is trapped by the browser,
  the page behind is inert, and the title labels the dialog (`aria-labelledby`).
- Overlays close only from their own Close / × button or `Esc`, never by a stray click outside.
- A form with unsaved edits asks "Discard changes?" before closing.

## Messages
- Errors use `role="alert"`; other notifications `role="status"`; the notification region is `aria-live="polite"`.
- Field errors are written under the field, linked with `aria-invalid`, and the first bad field gets focus.
