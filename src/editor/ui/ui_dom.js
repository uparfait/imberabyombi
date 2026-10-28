/* editor/ui/ui_dom.js: small DOM helpers of the ui area: listener bookkeeping for install_ui()'s cleanup, and text / icon
   changes on nodes React rendered (only a text node's value or a <path>'s d attribute change: React keeps its nodes). */
import { icon_path, ic_html } from '../../icons/index.js';
import { rem } from '../../lib/index.js';

/* n px at the default 16px root font, scaled with the root font (interface sizes follow the app-wide scaling) */
export function scaled(n) { return n * rem() / 16; }

/* add a listener and remember how to remove it (offs: the cleanup list of an installer) */
export function listen(offs, t, type, fn, o) {
  if (!t) return;
  t.addEventListener(type, fn, o); offs.push(() => t.removeEventListener(type, fn, o));
}
/* run every cleanup of a list, newest first */
export function run_offs(offs) { while (offs.length) { try { offs.pop()(); } catch (e) { console.error(e); } } }

/* the text of a label (a React text node keeps its identity; an empty element just gets the text) */
export function set_text(e, s) {
