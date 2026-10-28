/* editor/ui/hover_preview.js: live preview of a formatting choice under the pointer or the keyboard focus (brief §3).
   peek(key, fn): fn runs as core's live.preview (content + selection come back on unpeek; nothing enters the undo stack).
   peek_view(key, apply): a view-only preview (zoom): apply() changes the view and returns the function that puts it back.
   keep(key): the preview shown for key becomes final (one undo step: live.keep(fn), which also just runs fn when core
   dropped the preview meanwhile, e.g. an undo). pick(key, fn, done) is the click on a choice. */
import { live } from '../core/index.js';

let cur = null;   // { key, undo, keep } of the preview on screen

export function peeking() { return cur ? cur.key : null; }
/* a text field outside the document has the focus (title, find, size box…): hovering the toolbar must not take it away */
export function field_has_focus() { const a = document.activeElement; return !!(a && a.matches && a.matches('input, textarea, select')); }

export function peek(key, fn) {
  if (cur && cur.key === key) return;
  unpeek();
  cur = { key, undo: () => live.cancel(), keep: () => live.keep(fn) };
  live.preview(fn);
}
export function peek_view(key, apply) {
  if (cur && cur.key === key) return;
  unpeek();
  const back = apply();
  cur = { key, undo: typeof back === 'function' ? back : () => {}, keep: () => {} };
}
/* put back what the preview changed */
export function unpeek() { const c = cur; cur = null; if (c) c.undo(); }
/* leaving key's element: only its own preview goes (keyboard focus may already preview another choice) */
