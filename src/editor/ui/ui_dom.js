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
/* a one-row bar that scrolls sideways (toolbar, menu bar): the mouse wheel scrolls it too while it has more to show */
export function side_wheel(offs, t) {
  listen(offs, t, 'wheel', e => {
/* run every cleanup of a list, newest first */
export function run_offs(offs) { while (offs.length) { try { offs.pop()(); } catch (e) { console.error(e); } } }

/* the text of a label (a React text node keeps its identity; an empty element just gets the text) */
export function set_text(e, s) {
  if (!e) return; const f = e.firstChild; s = String(s);
  if (f && f.nodeType === 3 && !f.nextSibling) { if (f.nodeValue !== s) f.nodeValue = s; } else e.textContent = s;
}
/* swap an icon: e is the icon's svg, its <path> or an element around it (rendered EMPTY: it gets the icon markup) */
export function set_icon(e, name, cls = 'h-5 w-5') {
  if (!e) return; const p = e.tagName === 'path' ? e : e.querySelector('path');
  if (p) p.setAttribute('d', icon_path(name)); else e.innerHTML = ic_html(name, cls);
}
/* an icon for the plain-DOM menus and lists (icon keys = the source's icon names) */
export function mi(name, cls = 'h-4 w-4 shrink-0') { return ic_html(name, cls); }

/* the clean text of a node (no zero-width spaces), trimmed */
export function clean_text(n) { return (n ? n.textContent : '').replace(/​/g, '').trim(); }
/* a name not used yet among names: base, else "base (2)", "base (3)"… (base may already carry its own number) */
export function unique_name(base, names) {
  const used = new Set(names); if (!used.has(base)) return base;
  for (let n = 2; ; n++) if (!used.has(`${base} (${n})`)) return `${base} (${n})`;
}
