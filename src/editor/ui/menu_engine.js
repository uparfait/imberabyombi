/* editor/ui/menu_engine.js: the editor's popup menus (source "menus"): plain DOM on document.body (outside React), styled
   like the template's .pop / .menu_item, with submenus, check marks and shortcuts. Items: { label, icon, shortcut, checked,
   disabled, label_style, action, sub, no_preview, peek } · { sep } · { header } · { render }. Hovering (or focusing) an item
   previews it (hover_preview.js) unless it opens a submenu or a dialog (no_preview, or a label ending in "…"); a click keeps
   it. peek: a view-only preview, () => undo function (zoom). */
import { el, esc_html } from '../core/index.js';
import { peek, peek_view, unpeek, unpeek_key, pick } from './hover_preview.js';
import { mi, scaled } from './ui_dom.js';

export const menu_stack = [];
let sub_timer = null;

export function close_menus(from = 0) {
  if (from === 0) { clearTimeout(sub_timer); unpeek(); }
  while (menu_stack.length > from) {
    const m = menu_stack.pop(); m.el.remove();
    if (m.anchor) { m.anchor.classList.remove('open'); if (m.anchor.hasAttribute('aria-expanded')) m.anchor.setAttribute('aria-expanded', 'false'); }
  }
}
/* can this item show its effect on hover? */
export function can_peek(it) {
  return !!(it && !it.sub && !it.disabled && !it.no_preview && it.action && !/…\s*$/.test(it.label || ''));
}
export function peek_item(it) {
  if (!it || it.disabled) return;
  if (it.peek) peek_view(it, it.peek); else if (can_peek(it)) peek(it, it.action);
}

function row_of(it, level) {
  const chk = 'checked' in it, r = el('div', { class: 'menu_item ed_mi whitespace-nowrap outline-none [&.cur]:bg-fg/5 [&.open]:bg-fg/5'
    + (it.disabled ? ' disabled pointer-events-none opacity-40' : ''),
    role: chk ? 'menuitemcheckbox' : 'menuitem', tabindex: '-1' });
  if (chk) r.setAttribute('aria-checked', String(!!it.checked));
  if (it.disabled) r.setAttribute('aria-disabled', 'true');
