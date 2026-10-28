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
  if (it.sub) r.setAttribute('aria-haspopup', 'menu');
  r.innerHTML = `<span class="mi_check inline-flex w-4 shrink-0">${it.checked ? mi('check') : ''}</span>${it.icon ? mi(it.icon, 'mi_icon h-4 w-4 shrink-0 text-muted') : ''}`
    + `<span class="mi_label min-w-0 flex-1"></span>${it.shortcut ? `<span class="mi_short ml-6 text-xs text-muted">${esc_html(it.shortcut)}</span>` : ''}`
    + (it.sub ? mi('arrow_right', 'mi_arrow -mr-1 h-4 w-4 shrink-0 text-muted') : '');
  const lab = r.querySelector('.mi_label'); lab.textContent = it.label; if (it.label_style) lab.style.cssText = it.label_style;
  r._it = it;
  if (it.sub) {
    r._open = focus => { const b = r.getBoundingClientRect(), s = typeof it.sub === 'function' ? it.sub() : it.sub;
      open_menu(r, s, { level: level + 1, x: b.right - scaled(2), y: b.top - scaled(6), side: b.left, focus }); };
    r.addEventListener('pointerenter', () => { set_cur(r); clearTimeout(sub_timer); sub_timer = setTimeout(() => r._open(false), 120); });
    r.addEventListener('click', e => { if (!it.disabled) r._open(e.detail === 0); });
  } else {
    r.addEventListener('pointerenter', e => {
      set_cur(r); clearTimeout(sub_timer); sub_timer = setTimeout(() => close_menus(level + 1), 150);
      if (e.pointerType !== 'touch') peek_item(it);
    });
    r.addEventListener('pointerleave', () => unpeek_key(it));
    r.addEventListener('click', () => { if (!it.disabled) pick(it, () => { if (it.action) it.action(); }, () => close_menus(0)); });
  }
  return r;
}

/* anchor: the button the menu hangs from (null for a menu at a point: opts.x / opts.y). opts.level: submenu depth;
   opts.side: the parent row's left edge (a submenu flips to that side when it has no room); opts.focus: keyboard open */
export function open_menu(anchor, items, opts = {}) {
  const level = opts.level || 0; close_menus(level);
  const m = el('div', { class: 'pop ed_menu min-w-[12rem]', role: 'menu', style: 'position:fixed;margin:0;z-index:70' });
  m._out = 'editor';   // the template's close_pops() leaves a .pop with _out set alone: this engine closes its own menus
  m.addEventListener('mousedown', e => { if (!e.target.closest('input,select,textarea,label')) e.preventDefault(); });
  for (const it of items.filter(Boolean)) {
    if (it.sep) m.appendChild(el('hr', { class: 'my-1' }));
    else if (it.render) m.appendChild(it.render());
    else if (it.header) m.appendChild(el('p', { class: 'ctx_label' }, esc_html(it.header)));
    else m.appendChild(row_of(it, level));
  }
  document.body.appendChild(m);
