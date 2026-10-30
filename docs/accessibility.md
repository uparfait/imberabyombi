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
