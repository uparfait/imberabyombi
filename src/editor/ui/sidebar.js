/* editor/ui/sidebar.js: the tab list (source renderSidebar): a filter box once there are more than 5 tabs, the rows (click
   switches, double-click or F2 renames, ⋮ opens the tab menu, drag reorders with a drop line), the outline under the
   active tab. With many tabs the list scrolls inside itself (.tab_scroll.many) and keeps the active tab in view. */
import { state, refs, el, qsa, move_tab } from '../core/index.js';
import { toggle_menu } from './menu_engine.js';
import { switch_tab, tab_menu, start_rename } from './tabs.jsx';
import { render_outline } from './outline.js';
import { render_pages_panel } from './pages_panel.js';
import { row_drag } from './row_drag.js';
import { mi } from './ui_dom.js';

let tab_q = '';   // the filter text (kept while the list redraws)
const MANY = 5;
const idx = r => state.tabs.findIndex(t => t.id === r.dataset.id);

export function render_sidebar() {
  const list = refs.tab_list; if (!list) return;
  const old = list.querySelector('.tab_scroll'), top = old ? old.scrollTop : 0;
  const typing = !!list.querySelector('.tab_filter') && list.querySelector('.tab_filter') === document.activeElement;
  const many = state.tabs.length > MANY; if (!many) tab_q = '';
  list.innerHTML = '';
  if (many) list.appendChild(filter_box(typing));
  const box = el('div', { class: 'tab_scroll' + (many ? ' many' : '') });
  list.appendChild(box);
  state.tabs.forEach(t => {
    const active = t.id === state.active;
    const row = el('div', { class: 'tab_row select-none' + (active ? ' active' : ''), 'data-id': t.id, role: 'button', tabindex: '0' });
    if (active) row.setAttribute('aria-current', 'true');
    row.innerHTML = mi('description', 'h-5 w-5 shrink-0') + '<span class="tab_name min-w-0 flex-1 truncate"></span>'
      + `<button type="button" class="icon_btn tab_more h-8 w-8" aria-label="Tab options" aria-haspopup="menu">${mi('more_vert')}</button>`;
    row.querySelector('.tab_name').textContent = t.name;
    wire_row(row, t, box);
    box.appendChild(row);
    if (active) box.appendChild(el('div', { class: 'outline', id: 'outline', role: 'tree', 'aria-label': 'Document outline' }));
  });
  apply_filter(list);
  render_outline(); render_pages_panel();
  box.scrollTop = top; keep_in_view(box);
}

function wire_row(row, t, box) {
  row.addEventListener('click', e => { if (e.target.closest('.tab_more, .tab_rename')) return; switch_tab(t.id); });
  row.addEventListener('keydown', e => {
    if (e.target !== row) return;
    if (e.key === 'Enter') switch_tab(t.id);
    else if (e.key === 'F2') { e.preventDefault(); start_rename(t); }
    else if ((e.key === 'F10' && e.shiftKey) || e.key === 'ContextMenu') { e.preventDefault(); const b = row.querySelector('.tab_more'); toggle_menu(b, () => tab_menu(t), { focus: true }); }
  });
  row.addEventListener('dblclick', e => { if (!e.target.closest('.tab_more')) start_rename(t); });
  const more = row.querySelector('.tab_more');
  more.addEventListener('click', e => { e.stopPropagation(); toggle_menu(more, () => tab_menu(t), { focus: e.detail === 0 }); });
  row.addEventListener('pointerdown', e => {
    if (e.target.closest('button, input')) return;
    const from = state.tabs.indexOf(t);
    row_drag(e, {
      row, list: box, cls: 'tab_drag_over', scrollers: [box, refs.sidebar],
      rows: () => qsa(':scope > .tab_row', box).filter(r => !r.hidden),
      target: (g, rs) => { const j = g < rs.length ? idx(rs[g]) : idx(rs[rs.length - 1]) + 1, to = j > from ? j - 1 : j; return to === from || j < 0 ? null : to; },
