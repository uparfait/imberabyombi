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
