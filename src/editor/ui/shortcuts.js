/* editor/ui/shortcuts.js: the editor's keyboard (source "global shortcuts"), on the document's capture phase while the
   editor is on screen: the open menus first (menu_keys.js), Esc closes the editor's own overlays, then the Ctrl / ⌘
   shortcuts (editing ones only inside the document). A handled key stops there, so the template's own shortcuts (Ctrl+K:
   its command palette) do not also run. Keys inside a template dialog are left to it. */
import { pages_el, editable_of, undo, redo } from '../core/index.js';
import { hide_link_bubble, open_link_dialog, add_comment, set_paste_plain } from '../content/index.js';
import { paint, stop_paint, clear_formatting, set_block_style, toggle_list, toggle_checklist, exec, bump_size, indent } from '../format/index.js';
import { open_upload_dialog } from '../io_import/index.js';
import { save_project } from '../io_export/index.js';
import { menu_key } from './menu_keys.js';
import { find_state, open_find, close_find } from './find.js';
import { word_count_dialog, shortcuts_dialog } from './info_dialogs.jsx';
import { toggle_menus, do_print } from './view.js';
import { step_tab } from './tabs.jsx';

const ALIGN = { KeyL: 'justifyLeft', KeyE: 'justifyCenter', KeyR: 'justifyRight', KeyJ: 'justifyFull' };

/* shortcuts that work anywhere on the editor page */
function global_key(e, k) {
  if (k === 'pagedown' || k === 'pageup') return () => step_tab(k === 'pagedown' ? 1 : -1);
  if (k === 'p' && !e.shiftKey) return do_print;
  if ((k === 'f' && !e.shiftKey) || k === 'h') return open_find;
  if (k === 'f' && e.shiftKey) return toggle_menus;
  if (k === 'o') return () => open_upload_dialog();
  if (k === 's') return () => save_project();
  if (k === '/') return shortcuts_dialog;
  return null;
}
/* shortcuts that edit: only with the caret in the document */
function edit_key(e, k, code) {
  if (k === 'z' && !e.shiftKey) return undo;
  if ((k === 'z' && e.shiftKey) || k === 'y') return redo;
  if (k === 'k') return () => open_link_dialog();
  if (k === '\\') return clear_formatting;
  if (e.altKey && code === 'KeyM') return add_comment;
  if (e.altKey && /^Digit[0-4]$/.test(code)) return () => set_block_style(code === 'Digit0' ? 'p' : 'h' + code.slice(-1));
  if (e.shiftKey && code === 'Digit7') return () => toggle_list('OL');
  if (e.shiftKey && code === 'Digit8') return () => toggle_list('UL');
  if (e.shiftKey && code === 'Digit9') return () => toggle_checklist();
  if (e.shiftKey && code === 'KeyX') return () => exec('strikeThrough');
  if (e.shiftKey && code === 'KeyC') return word_count_dialog;
  if (e.shiftKey && code === 'Period') return () => bump_size(1);
  if (e.shiftKey && code === 'Comma') return () => bump_size(-1);
  if (!e.shiftKey && code === 'Period') return () => exec('superscript');
  if (!e.shiftKey && code === 'Comma') return () => exec('subscript');
  if (e.shiftKey && ALIGN[code]) return () => exec(ALIGN[code]);
  if (code === 'BracketRight') return () => indent(1);
  if (code === 'BracketLeft') return () => indent(-1);
  return null;
}

export function on_key(e) {
  const t = e.target, done = () => { e.preventDefault(); e.stopPropagation(); };
  if (t && t.closest && t.closest('dialog')) return;
  if (menu_key(e)) { done(); return; }
  if (e.key === 'Escape') {
    let closed = false;
    hide_link_bubble();
    if (find_state.open) { close_find(); closed = true; }
    if (paint) { stop_paint(); closed = true; }
    if (closed) e.stopPropagation();
