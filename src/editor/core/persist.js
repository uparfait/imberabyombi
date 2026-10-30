/* editor/core/persist.js: the document kept in IndexedDB (idb.js) under 'editor_doc', or 'editor_doc:<name>' when the
   address names one (?doc=<name>, such as an event's minutes; read once, when the editor starts): title, page setup,
   active tab, comments, and every tab with ALL its fields (html with images as data URLs, folded headings, …) except the
   undo / redo stacks, in tab order. Saved ~600 ms after each history commit / tab change, and when the editor stops. */
import { db } from '../../store/index.js';
import { uid } from './utils.js';
import { state, default_setup, new_tab, set_on_change } from './state.js';
import { pages_el } from './refs.js';
import { bodies } from './dom.js';
import { collect_html } from './collect.js';
import { live_busy } from './live.js';
import { toast } from './toast.js';
import { idb_get, idb_set } from './idb.js';

export const DOC_KEY = 'editor_doc';
let save_timer = null, refused = false, ready = false, key = DOC_KEY;
/* the document the address names (?doc=<name>), or the editor's own */
export const doc_key = () => { const n = new URLSearchParams(location.search).get('doc'); return n ? `${DOC_KEY}:${n}` : DOC_KEY; };
export const set_ready = v => { ready = v; };   /* nothing is saved until the saved document has loaded */

/* the saved shape; the active tab's html comes from the pages (split parts re-joined) */
export function doc_data() {
  const html = pages_el && bodies().length ? collect_html() : null;
  return {
    title: state.title, setup: state.setup, active: state.active, comments: state.comments.filter(c => !c.draft),
    tabs: state.tabs.map(t => { const { undo, redo, ...rest } = t; return t.id === state.active && html != null ? { ...rest, html } : rest; })
  };
}
export function save_doc(force) {
  clearTimeout(save_timer); save_timer = null;
  if (force !== true && live_busy()) { save_soon(); return false; }   // never save a preview
  if (!ready) return false;
  idb_set(DOC_KEY, doc_data()).then(ok => {
    if (ok) { refused = false; if (db.get(DOC_KEY)) db.del(DOC_KEY); return; }   /* an older copy in localStorage is no longer needed */
    if (!refused) { refused = true; toast('This browser could not save the document. Download it to keep a copy.', 7000); }
  });
  return true;
}
export function save_soon() { clearTimeout(save_timer); save_timer = setTimeout(save_doc, 600); }
set_on_change(save_soon);

/* the saved document: IndexedDB first; a copy saved earlier in localStorage moves there */
export async function load_doc() {
  if (apply_doc(await idb_get(DOC_KEY))) return true;
  const old = db.get(DOC_KEY); if (!apply_doc(old)) return false;
  if (await idb_set(DOC_KEY, old)) db.del(DOC_KEY); return true;
}
/* fill state from a saved document; false when it is not a valid one */
export function apply_doc(d) {
  const tabs = d && Array.isArray(d.tabs) ? d.tabs.filter(t => t && typeof t === 'object') : [];
  if (!tabs.length) return false;
  const s = d.setup && typeof d.setup === 'object' ? d.setup : {};
  state.title = String(d.title || 'Untitled document');
  state.setup = Object.assign(default_setup(), s, { margins: Object.assign(default_setup().margins, s.margins || {}) });
  state.tabs = tabs.map(t => ({ ...t, id: t.id || uid(), name: String(t.name || 'Tab'), html: String(t.html || '') || '<p><br></p>', undo: [], redo: [] }));
  state.active = state.tabs.some(t => t.id === d.active) ? d.active : state.tabs[0].id;
  state.comments = Array.isArray(d.comments) ? d.comments.filter(c => c && c.id).map(c => Object.assign({ replies: [] }, c, { draft: false })) : [];
  return true;
}
/* a fresh blank document (nothing saved yet) */
export function reset_doc() {
  state.title = 'Untitled document'; state.setup = default_setup(); state.comments = [];
  state.tabs = [new_tab('Tab 1')]; state.active = state.tabs[0].id;
}
