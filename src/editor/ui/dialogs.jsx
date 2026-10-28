/* editor/ui/dialogs.jsx: the source's dialog helpers on the template's dialogs: open_dialog() over modal() (JSX bodies),
   confirm_dialog() over ask(), and after_close(fn) to act on the document once #modal has closed (an open modal makes
   the page inert, so the caret and focus can only go back to the document after it closes). */
import { qs } from '../core/index.js';
import { modal, ask } from '../../overlays/index.js';

/* run fn once #modal has closed (the 'close' event comes after the closing animation) */
export function after_close(fn) {
  const d = document.getElementById('modal');
  if (!d || !d.open) { fn(); return; }
  d.addEventListener('close', () => fn(), { once: true });
}

/* { title, content (JSX), buttons: [{ label, primary, action(form) }], width, on_open(form) }: Cancel comes with the
   primary button; an action returning false keeps the dialog open. A dialog with no primary button is a view (closed
   by its x or Esc, like every template overlay). The action runs while the modal is open: use after_close() for work
   that needs the caret. */
