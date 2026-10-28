/* editor/ui/dialogs.jsx: the source's dialog helpers on the template's dialogs: open_dialog() over modal() (JSX bodies),
   confirm_dialog() over ask(), and after_close(fn) to act on the document once #modal has closed (an open modal makes
   the page inert, so the caret and focus can only go back to the document after it closes). */
import { qs } from '../core/index.js';
import { modal, ask } from '../../overlays/index.js';

/* run fn once #modal has closed (the 'close' event comes after the closing animation) */
export function after_close(fn) {
