/* editor/ui/install.js: install_ui(): the source's top-level listeners of the ui area (menus, menu bar, find panel,
   selection, side panels, rulers, scroll / resize, context menu, toolbar, keyboard), added when the editor starts and
   removed by the returned cleanup (the keyboard only acts while the editor is on screen). */
import { state, refs, pages_el, scroller, hruler, vruler, qsa, current_page } from '../core/index.js';
import { hide_link_bubble, add_blank_page, render_comments } from '../content/index.js';
import { menu_stack, open_menu, toggle_menu, close_menus, on_outside_down } from './menu_engine.js';
import { unpeek } from './hover_preview.js';
import { MENUS } from './menus.js';
import { install_find } from './find.js';
import { on_selection, stop_sel_timer } from './toolbar_state.js';
import { install_toolbar } from './toolbar.js';
import { on_context_menu } from './context_menu.js';
import { on_key } from './shortcuts.js';
import { add_tab } from './tabs.jsx';
import { apply_panels } from './pages_panel.js';
import { update_rulers, ruler_drag, draw_h_ruler, draw_v_ruler } from './rulers.js';
import { drop_page_rule, page_rule_el } from './view.js';
import { listen, run_offs, side_wheel } from './ui_dom.js';

function install_menubar(offs) {
  const bar = refs.menubar; if (!bar) return;
  side_wheel(offs, bar);
  qsa('[data-menu]', bar).forEach(b => {
    const items = () => (MENUS[b.dataset.menu] ? MENUS[b.dataset.menu]() : []);
    listen(offs, b, 'mousedown', e => e.preventDefault());
    listen(offs, b, 'click', e => toggle_menu(b, items, { focus: e.detail === 0 }));
    listen(offs, b, 'mouseenter', () => {
      const a = menu_stack.length && menu_stack[0].anchor;
      if (a && a.closest && a.closest('#menubar') && a !== b) open_menu(b, items());
    });
  });
}
function install_panels(offs) {
  listen(offs, refs.sidebar_close, 'click', () => { state.sidebar = false; apply_panels(); });
  listen(offs, refs.sidebar_open, 'click', () => { state.sidebar = true; apply_panels(); });
  listen(offs, refs.comments_close, 'click', () => { state.show_comments = false; apply_panels(); });
  listen(offs, refs.top_comments, 'click', () => { state.show_comments = !state.show_comments; apply_panels(); render_comments(); });
  listen(offs, refs.add_tab_btn, 'click', () => add_tab());
  listen(offs, refs.add_page_btn, 'click', () => add_blank_page(current_page()));
}
function install_view(offs) {
  let raf = 0;
  listen(offs, hruler, 'pointerdown', ruler_drag); listen(offs, vruler, 'pointerdown', ruler_drag);
  listen(offs, scroller, 'scroll', () => {
    hide_link_bubble();
    if (!raf) raf = requestAnimationFrame(() => { raf = 0; if (state.show_ruler) { draw_v_ruler(); draw_h_ruler(); } });
  });
  offs.push(() => cancelAnimationFrame(raf));
  listen(offs, window, 'resize', () => { apply_panels(); close_menus(0); });
  /* the editor's room also changes when the template's own sidebar opens or closes */
  const area = refs.workspace || refs.root;
  if (area && typeof ResizeObserver === 'function') { const ro = new ResizeObserver(() => apply_panels()); ro.observe(area); offs.push(() => ro.disconnect()); }
}

export function install_ui() {
  const offs = [];
  page_rule_el(); offs.push(drop_page_rule);
  listen(offs, document, 'mousedown', on_outside_down, true);
  listen(offs, document, 'keydown', on_key, true);
  listen(offs, document, 'selectionchange', on_selection);
  listen(offs, pages_el, 'contextmenu', on_context_menu);
  install_menubar(offs); install_find(offs); install_panels(offs); install_view(offs); install_toolbar(offs);
  offs.push(() => { close_menus(0); unpeek(); stop_sel_timer(); });
  requestAnimationFrame(update_rulers);
  return () => run_offs(offs);
}
