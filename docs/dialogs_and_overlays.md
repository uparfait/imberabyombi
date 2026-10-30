# Dialogs and overlays

One element of each kind lives in `index.html`, outside the React root, and every module reuses it:
`#modal` (forms, details, views), `#confirm` (questions), `#drawer` (phone menu), `#viewer` (files), `#picker`,
`#tip` (tooltip), `#viz_tip` (chart tooltip), `#toasts`, `#loader`.
React draws the dialog contents through portals (`Dialog_hosts`, src/overlays); the rest is plain JavaScript.

## modal()
```jsx
import { modal } from '../overlays/index.js';
modal({
  title: 'Add a task',                 // text or JSX
  help: 'What this dialog is for.',    // shown behind a help icon by the title (or as the text of a dialog with no body)
  body: () => <Task_form />,           // JSX or a function returning JSX: a function is drawn again on every rerender()
  submit: 'Save',                      // the submit button's label (no submit = a view with no footer button)
  on_submit: (values, form) => { … }, // values = form_obj(form); return false to keep the dialog open
  danger: false,                       // red submit button
  actions: <button …>Delete</button>,  // extra footer buttons
  wide: true                           // at least 70% of a large screen (the task view)
});
```
- Submitting validates the form, runs `on_submit` inside `request()` (the button spins), then closes.
- Closing happens only from the header ×, a Cancel button or `Esc`, never by a click outside. A form with unsaved edits
  asks "Discard changes?" first.

## Questions and other dialogs
- `ask(message, on_yes, cta = 'Delete', danger)`: the part up to the first `?` is the title, the rest is the text.
- `show_in_dialog('drawer' | 'viewer', () => jsx)`: fills and opens the drawer or the file viewer.
- `close_dialog(el)` closes with the animation; `request_close(el)` asks first when a form changed.

## Always on top
Open dialogs sit in the browser's top layer. `#toasts` and `#loader` are manual popovers, and every dialog opens through
`show_dialog()`, which lifts them back above it, so notifications and the loader are never hidden behind a dialog.

## Popover menus
`<button data-pop="pop_menu">` toggles `<div id="pop_menu" className="pop" hidden>`. A click outside closes it, `Esc`
closes it, and on phones it stays inside the screen. "Your modules" style menus (`tile_menu()`) drop a grid of 3D tiles.

## Tooltip
Icon buttons show their `aria-label`; any element with `data-tip` shows that text; trimmed `.truncate` / `.trunc` text
shows the full text only when it is actually cut. On touch screens a tap shows it.

## Right click
A right click opens the browser's own menu everywhere (the document editor brings its own). "Allow text selection" is a
small switch in the account menu (remembered).

## Command palette
`Ctrl K` / `⌘K` (or the search button in the admin header) opens a searchable list of every page the role can open.
