/* editor/ui/outline.js: the outline under the active tab (source renderOutline): the document's headings as text rows
   like the admin sidebar links, indented per level, the heading the caret is in marked (.active, brand). A chevron folds a
   heading's sub-headings; folds are kept per tab (tab.folds, saved with the document). Row events: outline_rows.jsx. */
import { active_tab, last_range, el_of, el, qsa, save_soon } from '../core/index.js';
import { heading_els, level_of, is_top_head } from './sections.js';
import { clean_text, mi } from './ui_dom.js';
import { wire_outline_row } from './outline_rows.jsx';

/* a heading's fold key: level + text (+ #n for the n-th heading with the same text) */
function fold_key(h, seen) { const k = level_of(h) + ':' + clean_text(h), n = (seen[k] = (seen[k] || 0) + 1); return n > 1 ? k + '#' + n : k; }
export const outline_el = () => document.getElementById('outline');
export const outline_rows = ol => (ol ? qsa(':scope > .outline_row', ol) : []);

export function render_outline() {
  const ol = outline_el(); if (!ol) return;
  const hs = heading_els(), had = document.activeElement && document.activeElement.closest && document.activeElement.closest('.outline_row');
  if (!hs.length) { ol.innerHTML = '<p class="outline_hint">Headings you add to the document will appear here.</p>'; return; }
  const t = active_tab(), folds = new Set((t && t.folds) || []), seen = {};
  let ti = 0, refocus = null;
  ol.innerHTML = '';
  hs.forEach((h, i) => {
    const lvl = level_of(h), kids = i + 1 < hs.length && level_of(hs[i + 1]) > lvl, top = is_top_head(h);
    const row = el('div', { class: 'outline_row select-none', role: 'treeitem', tabindex: '-1', 'aria-level': String(lvl + 1), 'data-lvl': String(lvl),
      style: `padding-left:${0.25 + lvl * 0.875}rem` });
    row.innerHTML = (kids ? `<button type="button" class="outline_fold" tabindex="-1" aria-label="Fold or unfold">${mi('expand_more')}</button>` : '<span class="outline_fold_gap"></span>')
      + '<span class="outline_text min-w-0 flex-1 truncate"></span>'
      + (top ? `<button type="button" class="outline_more" tabindex="-1" aria-label="Section options" data-tip="Section options" aria-haspopup="menu">${mi('more_vert')}</button>` : '');
    row.querySelector('.outline_text').textContent = clean_text(h);
    row._h = h; row._ti = top ? ti++ : -1; row._key = fold_key(h, seen);
    if (kids) { const f = folds.has(row._key); row.classList.toggle('folded', f); row.setAttribute('aria-expanded', String(!f)); }
    if (had && had._h === h) refocus = row;
    wire_outline_row(row);
    ol.appendChild(row);
  });
  apply_folds(ol); mark_outline();
  if (refocus && !refocus.hidden) refocus.focus({ preventScroll: true });
}

/* hide the rows inside a folded heading */
export function apply_folds(ol) {
