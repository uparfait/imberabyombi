/* editor/ui/sidebar.js: the tab list (source renderSidebar): a filter box once there are more than 5 tabs, the rows (click
   switches, double-click or F2 renames, ⋮ opens the tab menu, drag reorders with a drop line), the outline under the
   active tab, which its chevron (or ← / →) folds away so the other tabs come into view (kept with the document). With many tabs the list scrolls inside itself (.tab_scroll.many) and keeps the active tab in view. */
import { state, refs, el, qsa, move_tab, save_soon } from '../core/index.js';
import { toggle_menu } from './menu_engine.js';
import { switch_tab, tab_menu, start_rename } from './tabs.jsx';
import { render_outline } from './outline.js';
import { render_pages_panel } from './pages_panel.js';
import { row_drag } from './row_drag.js';
import { mi } from './ui_dom.js';

let tab_q = '';   // the filter text (kept while the list redraws)
const MANY = 5;
const idx = r => state.tabs.findIndex(t => t.id === r.dataset.id);
const fold_label = t => (t.folded ? 'Show' : 'Hide') + ' this tab’s outline';

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
      + (active ? `<button type="button" class="icon_btn tab_fold h-8 w-8" aria-expanded="${!t.folded}" aria-label="${fold_label(t)}" data-tip="${fold_label(t)}">${mi('expand_more')}</button>` : '')
      + `<button type="button" class="icon_btn tab_more h-8 w-8" aria-label="Tab options" aria-haspopup="menu">${mi('more_vert')}</button>`;
    row.querySelector('.tab_name').textContent = t.name;
    wire_row(row, t, box);
    box.appendChild(row);
    if (active) box.appendChild(el('div', { class: 'outline' + (t.folded ? ' folded' : ''), id: 'outline', role: 'tree', 'aria-label': 'Document outline' }));
  });
  apply_filter(list);
  render_outline(); render_pages_panel();
  box.scrollTop = top; keep_in_view(box);
}

function wire_row(row, t, box) {
  row.addEventListener('click', e => { if (e.target.closest('.tab_more, .tab_rename, .tab_fold')) return; switch_tab(t.id); });
  row.querySelector('.tab_fold')?.addEventListener('click', e => { e.stopPropagation(); fold_tab(row, t); });
  row.addEventListener('keydown', e => {
    if (e.target !== row) return;
    if (e.key === 'Enter') switch_tab(t.id);
    else if (e.key === 'F2') { e.preventDefault(); start_rename(t); }
    else if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && t.id === state.active) { e.preventDefault(); fold_tab(row, t, e.key === 'ArrowLeft'); }
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
      drop: to => { move_tab(from, to); render_sidebar(); }
    });
  });
}

/* on: true folds the outline away, false shows it (the row and its focus stay put) */
function fold_tab(row, t, on = !t.folded) {
function filter_box(focus) {
  const inp = el('input', { type: 'search', class: 'tab_filter', placeholder: 'Filter tabs', 'aria-label': 'Filter tabs', autocomplete: 'off' });
  inp.value = tab_q;
  inp.addEventListener('input', () => { tab_q = inp.value; apply_filter(refs.tab_list); });
  inp.addEventListener('keydown', e => {
    if (e.key === 'Escape' && inp.value) { e.stopPropagation(); inp.value = ''; tab_q = ''; apply_filter(refs.tab_list); }
    else if (e.key === 'Enter') { e.preventDefault(); const r = qsa('.tab_row', refs.tab_list).find(x => !x.hidden); if (r) switch_tab(r.dataset.id); }
  });
  if (focus) setTimeout(() => { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }, 0);
  return inp;
}
/* rows whose name does not contain the filter text hide (the outline goes with its tab) */
function apply_filter(list) {
  if (!list) return;
  const q = tab_q.trim().toLowerCase(); let shown = 0;
  qsa('.tab_row', list).forEach(r => { const t = state.tabs[idx(r)]; r.hidden = !!q && !!t && !t.name.toLowerCase().includes(q); if (!r.hidden) shown++; });
  const ol = list.querySelector('#outline'); if (ol) ol.hidden = !!(ol.previousElementSibling && ol.previousElementSibling.hidden);
  let none = list.querySelector('.tab_none');
  if (!shown && !none) { none = el('p', { class: 'tab_none outline_hint' }, 'No tab matches this filter.'); list.querySelector('.tab_scroll')?.appendChild(none); }
  if (shown && none) none.remove();
}
function keep_in_view(box) {
  const a = box.querySelector('.tab_row.active'); if (!a || box.scrollHeight <= box.clientHeight) return;
  const b = box.getBoundingClientRect(), r = a.getBoundingClientRect();
  if (r.top < b.top) box.scrollTop -= b.top - r.top; else if (r.bottom > b.bottom) box.scrollTop += r.bottom - b.bottom;
}
