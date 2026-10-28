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
