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
