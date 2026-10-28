/* overlays/dialog_store.js: what React draws inside the four shared dialogs of index.html (#modal, #confirm, #drawer,
   #viewer). set_dialog() stores a dialog's content and redraws <Dialog_hosts/> at once (flushSync), so code right
   after modal() / show_in_dialog() can already query the new DOM, as after the reference's innerHTML. */
import { flushSync } from 'react-dom';

export const DIALOGS = { modal: null, confirm: null, drawer: null, viewer: null };
let version = 0, n = 0;
const listeners = new Set();
export const subscribe_dialogs = fn => { listeners.add(fn); return () => listeners.delete(fn); };
export const get_dialog_version = () => version;

/* content: the dialog's options (or null = empty). Each call gets a new key, so the dialog's DOM is new (like innerHTML) */
export function set_dialog(id, content) {
  DIALOGS[id] = content ? { ...content, key: ++n } : null; version++;
  const emit = () => listeners.forEach(fn => fn());
  try { flushSync(emit); } catch { emit(); }
}
/* body / actions / render: JSX, or a function returning JSX (called on every draw, so rerender() refreshes an open view).
   An error there is logged and leaves the part empty instead of taking the page down. */
export const run_view = v => { try { return typeof v === 'function' ? v() : v; } catch (e) { console.error(e); return null; } };

/* A dialog that has closed drops its content (the reference emptied #viewer; the others are refilled when they open) */
for (const id of Object.keys(DIALOGS)) document.getElementById(id)?.addEventListener('close', e => { if (!e.target.open && DIALOGS[id]) set_dialog(id, null); });
