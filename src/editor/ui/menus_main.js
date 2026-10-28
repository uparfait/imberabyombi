/* editor/ui/menus_main.js: the File, Edit and View menus of the menu bar (source MENUS.file / edit / view). Commands and
   view switches carry no_preview (only formatting choices preview on hover). View › Theme uses the template's theme. */
import { state, refs, undo, redo, restore_focus, begin_op, commit, save_soon, toast } from '../core/index.js';
import { paste_from_clipboard, render_comments } from '../content/index.js';
import { open_upload_dialog, pick_file } from '../io_import/index.js';
import { open_download_dialog } from '../io_export/index.js';
import { set_theme } from '../../actions/index.js';
import { db } from '../../store/index.js';
import { download_items, zoom_items } from './menu_items.jsx';
import { page_setup_dialog } from './page_setup.jsx';
import { open_find } from './find.js';
import { apply_setup, set_mode, toggle_menus, do_print } from './view.js';
import { update_rulers } from './rulers.js';
import { apply_panels } from './pages_panel.js';
import { new_document } from './render.js';

/* a command: never previewed */
export function cmd(label, icon, action, shortcut) { return { label, icon, action, shortcut, no_preview: true }; }
const flip = (label, on, action, shortcut) => ({ label, checked: !!on, action, shortcut, no_preview: true });
/* a native editing command (cut, copy, delete) on the remembered selection */
export function native(c) { return () => { restore_focus(); document.execCommand(c); }; }

export function file_items() {
  return [
    cmd('New document', 'note_add', () => new_document()),
    cmd('Upload files…', 'upload_file', () => open_upload_dialog(), 'Ctrl+O'),
    cmd('Open and replace document…', 'folder_open', () => pick_file('open')),
    cmd('Import into new tab…', 'tab', () => pick_file('tab')),
    cmd('Insert file at cursor…', 'input', () => pick_file('insert')),
    { sep: true }, cmd('Download…', 'download', () => open_download_dialog()), { label: 'Download as', icon: 'file_download', sub: download_items },
    cmd('Rename', 'drive_file_rename_outline', () => { if (!state.menus) toggle_menus(); const t = refs.doc_title; if (t) { t.focus(); t.select(); } }),
    { sep: true }, cmd('Page setup', 'description', () => page_setup_dialog()),
    cmd('Print', 'print', () => do_print(), 'Ctrl+P')
  ];
}
export function edit_items() {
  return [
    cmd('Undo', 'undo', () => undo(), 'Ctrl+Z'), cmd('Redo', 'redo', () => redo(), 'Ctrl+Y'), { sep: true },
    cmd('Cut', 'content_cut', native('cut'), 'Ctrl+X'), cmd('Copy', 'content_copy', native('copy'), 'Ctrl+C'),
    cmd('Paste', 'content_paste', () => paste_from_clipboard(false), 'Ctrl+V'),
    cmd('Paste without formatting', 'content_paste_go', () => paste_from_clipboard(true), 'Ctrl+Shift+V'),
    { sep: true },
