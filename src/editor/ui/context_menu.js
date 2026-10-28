/* editor/ui/context_menu.js: the right-click menu on the pages (source "context menu"): on a picture, every image option;
   in the text: cut / copy / paste, comment, link, insert table (and the table's own items inside a table), clear
   formatting. A right-click outside the selection first moves the caret to the clicked point. */
import { state, editable_of, caret_from_point, set_caret, set_last } from '../core/index.js';
import { select_image, image_menu_items, open_link_dialog, add_comment, paste_from_clipboard } from '../content/index.js';
import { table_ctx, table_menu_items, table_grid_el, clear_formatting } from '../format/index.js';
import { open_menu } from './menu_engine.js';
import { cmd, native } from './menus_main.js';

export function on_context_menu(e) {
  const at = { x: e.clientX, y: e.clientY }, img = e.target.closest && e.target.closest('.pg_body img');
  if (img) {
    if (state.mode !== 'edit') return;
    e.preventDefault(); select_image(img); open_menu(null, image_menu_items(img), at); return;
  }
  const host = editable_of(e.target); if (!host || !host.classList.contains('pg_body')) return;
  e.preventDefault();
  const s = getSelection();
  if (s.isCollapsed || !s.rangeCount || !s.getRangeAt(0).intersectsNode(e.target)) {
    const p = caret_from_point(e.clientX, e.clientY); if (p && host.contains(p.node)) set_caret(p.node, p.off);
  } else set_last(s.getRangeAt(0).cloneRange(), host);
  const in_table = !!table_ctx();
  open_menu(null, [
    cmd('Cut', 'content_cut', native('cut'), 'Ctrl+X'), cmd('Copy', 'content_copy', native('copy'), 'Ctrl+C'),
    cmd('Paste', 'content_paste', () => paste_from_clipboard(false), 'Ctrl+V'),
    cmd('Paste without formatting', 'content_paste_go', () => paste_from_clipboard(true), 'Ctrl+Shift+V'),
    { sep: true },
    cmd('Comment', 'add_comment', () => add_comment(), 'Ctrl+Alt+M'),
    cmd('Insert link', 'link', () => open_link_dialog(), 'Ctrl+K'),
    { label: 'Insert table', icon: 'table', sub: () => [{ render: table_grid_el }] },
