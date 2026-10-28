/* editor/ui/menu_keys.js: the keyboard in the open menus: ↑ ↓ Home End move (and preview the focused choice), → opens a
   submenu, ← closes it (or, in a menu-bar menu, ← → move along the bar), Enter / Space choose, Esc closes every menu and
   Tab closes them and moves on. menu_key(e) returns true when it handled the key. */
import { restore_focus } from '../core/index.js';
import { menu_stack, close_menus, menu_rows, focus_row } from './menu_engine.js';

/* ← → on a menu-bar menu: open the neighbouring menu of the bar from the keyboard */
function bar_step(d) {
  const a = menu_stack[0] && menu_stack[0].anchor, bar = a && a.closest && a.closest('#menubar'); if (!bar) return false;
  const bs = Array.from(bar.querySelectorAll('[data-menu]')), i = bs.indexOf(a), b = bs[(i + d + bs.length) % bs.length];
  close_menus(0); b.focus(); b.click();
  return true;
}

export function menu_key(e) {
  if (!menu_stack.length) return false;
  const k = e.key, top = menu_stack[menu_stack.length - 1], m = top.el, in_field = e.target.closest?.('input, textarea, select');
  if (k === 'Escape') {
    const a = menu_stack[0].anchor, inside = m.contains(document.activeElement) || menu_stack.some(x => x.el.contains(document.activeElement));
    close_menus(0);
    if (inside) { if (a && a.isConnected && a.focus) a.focus(); else restore_focus(); }
    return true;
  }
  if (k === 'Tab') { close_menus(0); return false; }
  if (in_field || e.ctrlKey || e.metaKey || e.altKey) return false;
  const rows = menu_rows(m), at = rows.indexOf(m._cur), n = rows.length;
  if (k === 'ArrowDown' || k === 'ArrowUp') {
    if (n) focus_row(m, rows[at < 0 ? (k === 'ArrowDown' ? 0 : n - 1) : (at + (k === 'ArrowDown' ? 1 : -1) + n) % n]);
    return true;
  }
  if (k === 'Home' || k === 'End') { if (n) focus_row(m, rows[k === 'Home' ? 0 : n - 1]); return true; }
  if (k === 'ArrowRight') {
    if (m._cur && m._cur._it.sub) { m._cur._open(true); return true; }
    return bar_step(1);
  }
  if (k === 'ArrowLeft') {
    if (menu_stack.length > 1) {
      const row = top.anchor, parent = menu_stack[menu_stack.length - 2].el;
      close_menus(menu_stack.length - 1); if (row) focus_row(parent, row, false);
